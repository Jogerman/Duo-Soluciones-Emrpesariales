import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import {
  PodcastHero,
  PodcastEpisodeCard,
  PodcastPlayer,
  PodcastSubscribe,
} from '@/components/marketing/podcast'
import { getAllPodcastEpisodes, getLatestPodcastEpisode } from '@/lib/mock-data/podcast-episodes'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Podcast DUO | Conversaciones sobre Transformación Empresarial',
  description:
    'Escucha entrevistas con líderes empresariales, expertos en gestión y casos de éxito en desarrollo organizacional. Nuevos episodios cada viernes.',
  keywords: [
    'podcast empresarial',
    'transformación empresarial',
    'liderazgo',
    'gestión',
    'consultoría',
    'desarrollo organizacional',
    'PYMES',
    'estrategia',
  ],
  openGraph: {
    title: 'Podcast DUO | Conversaciones sobre Transformación Empresarial',
    description:
      'Escucha entrevistas con líderes empresariales y expertos en gestión. Estrategias prácticas para transformar tu negocio.',
    type: 'website',
    locale: 'es_ES',
  },
}

/**
 * Podcast Listing Page
 * Features: Hero section, latest episode player, episode grid, subscribe section
 */
export default function PodcastPage() {
  const allEpisodes = getAllPodcastEpisodes()
  const latestEpisode = getLatestPodcastEpisode()

  // Episodes after the latest one for the grid
  const otherEpisodes = allEpisodes.slice(1)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PodcastHero
        totalEpisodes={allEpisodes.length}
        onSubscribeClick={() => {
          // Scroll to subscribe section
          const subscribeSection = document.getElementById('subscribe')
          subscribeSection?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      {/* Latest Episode Section */}
      {latestEpisode && (
        <section className="border-b border-neutral-200 bg-white py-16 md:py-20">
          <Container>
            <div className="mb-8 text-center">
              <h2 className="mb-2 font-bold text-3xl text-neutral-900 md:text-4xl">
                Último Episodio
              </h2>
              <p className="text-neutral-600">Escucha nuestro episodio más reciente</p>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Episode Card */}
                <div>
                  <PodcastEpisodeCard episode={latestEpisode} featured />
                </div>

                {/* Player + Quick Info */}
                <div className="space-y-6">
                  {/* Player */}
                  <div className="rounded-xl bg-neutral-900 p-6">
                    <PodcastPlayer
                      spotifyUrl={latestEpisode.spotifyUrl}
                      title={latestEpisode.title}
                    />
                  </div>

                  {/* Subscribe */}
                  <PodcastSubscribe
                    spotifyUrl={latestEpisode.spotifyUrl}
                    applePodcastsUrl={latestEpisode.applePodcastsUrl}
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* All Episodes Section */}
      <section className="bg-neutral-50 py-16 md:py-20">
        <Container>
          <div className="mb-12">
            <h2 className="mb-2 font-bold text-3xl text-neutral-900 md:text-4xl">
              Todos los Episodios
            </h2>
            <p className="text-neutral-600">Explora nuestra colección completa de conversaciones</p>
          </div>

          {/* Episodes Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherEpisodes.map(episode => (
              <PodcastEpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>

          {/* Empty State (if no other episodes) */}
          {otherEpisodes.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-neutral-600">
                Más episodios próximamente. ¡Suscríbete para no perderte ninguno!
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Subscribe Section */}
      <section id="subscribe" className="bg-white py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <h2 className="mb-3 font-bold text-3xl text-neutral-900 md:text-4xl">
                Suscríbete al Podcast
              </h2>
              <p className="text-lg text-neutral-600">
                No te pierdas ningún episodio. Nuevos episodios cada viernes.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <PodcastSubscribe
                spotifyUrl="https://open.spotify.com/show/duo-podcast"
                applePodcastsUrl="https://podcasts.apple.com/podcast/duo"
                rssUrl="/podcast/feed.xml"
              />

              {/* CTA Card */}
              <div className="rounded-xl bg-gradient-to-br from-primary-600 to-secondary-700 p-8 text-white">
                <h3 className="mb-3 font-semibold text-2xl">¿Quieres aparecer en el podcast?</h3>
                <p className="mb-6 text-white/90">
                  Si tienes una historia interesante sobre transformación empresarial, nos
                  encantaría conversar contigo.
                </p>
                <a
                  href="mailto:podcast@duosoluciones.com"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-medium text-primary-700 transition-colors hover:bg-neutral-100"
                >
                  Contáctanos
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
