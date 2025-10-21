import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Calendar, ChevronLeft, User } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  PodcastPlayer,
  PodcastSubscribe,
  PodcastShowNotes,
  PodcastTranscript,
  PodcastResources,
  PodcastGuests,
  PodcastEpisodeCard,
} from '@/components/marketing/podcast'
import {
  getAllPodcastEpisodes,
  getPodcastEpisodeBySlug,
  getRelatedPodcastEpisodes,
} from '@/lib/mock-data/podcast-episodes'
import { formatDuration, formatSeasonEpisode, formatPodcastDate } from '@/lib/utils/podcast'

export const dynamic = 'force-dynamic'

interface PodcastEpisodePageProps {
  params: {
    slug: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PodcastEpisodePageProps): Promise<Metadata> {
  const episode = getPodcastEpisodeBySlug(params.slug)

  if (!episode) {
    return {
      title: 'Episodio no encontrado',
    }
  }

  const title = episode.seo?.metaTitle || `${episode.title} | Podcast DUO`
  const description =
    episode.seo?.metaDescription ||
    episode.description ||
    'Escucha este episodio del Podcast DUO sobre transformación empresarial'

  return {
    title,
    description,
    keywords: episode.seo?.keywords || [
      'podcast',
      'empresarial',
      episode.category.name,
      ...episode.tags.map(tag => tag.name),
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'es_ES',
      images: [
        {
          url: episode.coverImage,
          alt: episode.title,
        },
      ],
    },
  }
}

// Generate static params for all episodes
export async function generateStaticParams() {
  const episodes = getAllPodcastEpisodes()

  return episodes.map(episode => ({
    slug: episode.slug,
  }))
}

/**
 * Podcast Episode Detail Page
 * Features: hero, player, content, guests, transcript, resources, related episodes
 */
export default function PodcastEpisodePage({ params }: PodcastEpisodePageProps) {
  const episode = getPodcastEpisodeBySlug(params.slug)

  if (!episode) {
    notFound()
  }

  const relatedEpisodes = getRelatedPodcastEpisodes(episode, 3)

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="border-b border-neutral-200 bg-white py-12 md:py-16">
        <Container>
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/podcast">
                <ChevronLeft className="h-4 w-4" />
                Todos los episodios
              </Link>
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Cover Image */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
              <Image
                src={episode.coverImage}
                alt={episode.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Episode Info */}
            <div className="flex flex-col justify-center">
              {/* Badges */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="default">
                  {formatSeasonEpisode(episode.season, episode.episode)}
                </Badge>
                <Badge variant="outline">{episode.category.name}</Badge>
              </div>

              {/* Title */}
              <h1 className="mb-4 font-bold text-3xl text-neutral-900 md:text-4xl">
                {episode.title}
              </h1>

              {/* Meta Info */}
              <div className="mb-6 flex flex-wrap items-center gap-4 text-neutral-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{formatDuration(episode.duration)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formatPodcastDate(episode.publishedAt)}</span>
                </div>
              </div>

              {/* Hosts */}
              <div className="mb-6">
                <div className="mb-2 text-sm font-medium text-neutral-700">Conducido por:</div>
                <div className="flex flex-wrap gap-3">
                  {episode.hosts.map(host => (
                    <div key={host.id} className="flex items-center gap-2">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full bg-neutral-200">
                        <Image src={host.avatar} alt={host.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-neutral-900">{host.name}</div>
                        <div className="text-xs text-neutral-600">{host.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="mb-6 text-neutral-700 leading-relaxed">{episode.description}</p>

              {/* Tags */}
              {episode.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {episode.tags.map(tag => (
                    <Badge key={tag.id} variant="outline" className="text-xs">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Player Section */}
      <section className="border-b border-neutral-200 bg-neutral-900 py-12">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 text-center">
              <h2 className="mb-2 font-bold text-2xl text-white">Escuchar Episodio</h2>
              <p className="text-neutral-300">Disponible en Spotify y otras plataformas</p>
            </div>

            <PodcastPlayer spotifyUrl={episode.spotifyUrl} title={episode.title} />

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <PodcastSubscribe
                spotifyUrl={episode.spotifyUrl}
                applePodcastsUrl={episode.applePodcastsUrl}
              />

              <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="mb-2 font-semibold text-white">¿Te gustó este episodio?</h3>
                <p className="mb-4 text-sm text-neutral-300">
                  Comparte con tu equipo y déjanos una reseña en tu plataforma favorita
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-white text-white hover:bg-white hover:text-neutral-900"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: episode.title,
                        text: episode.description,
                        url: window.location.href,
                      })
                    }
                  }}
                >
                  Compartir episodio
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Main Content (8 cols) */}
            <div className="space-y-8 lg:col-span-2">
              {/* Episode Content */}
              <div className="rounded-xl bg-white p-8 shadow-sm">
                <div className="prose prose-neutral max-w-none">
                  {episode.content.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={index} className="mb-4 mt-8 font-bold text-2xl">
                          {paragraph.replace('## ', '')}
                        </h2>
                      )
                    }

                    if (paragraph.startsWith('**[')) {
                      const match = paragraph.match(/\*\*\[(.*?)\]\*\*(.*)/)
                      if (match) {
                        return (
                          <p key={index} className="mb-3">
                            <span className="font-mono text-sm text-primary-600">{match[1]}</span>
                            <span className="ml-2">{match[2]}</span>
                          </p>
                        )
                      }
                    }

                    if (paragraph.trim().startsWith('- ')) {
                      return (
                        <li key={index} className="ml-6 text-neutral-700">
                          {paragraph.replace(/^-\s*/, '')}
                        </li>
                      )
                    }

                    if (paragraph.trim()) {
                      return (
                        <p key={index} className="mb-4 text-neutral-700">
                          {paragraph}
                        </p>
                      )
                    }

                    return null
                  })}
                </div>
              </div>

              {/* Show Notes */}
              {episode.showNotes && <PodcastShowNotes showNotes={episode.showNotes} />}

              {/* Transcript */}
              {episode.transcript && <PodcastTranscript transcript={episode.transcript} />}

              {/* Resources */}
              {episode.resources && episode.resources.length > 0 && (
                <div className="rounded-xl bg-white p-8 shadow-sm">
                  <PodcastResources resources={episode.resources} />
                </div>
              )}
            </div>

            {/* Right Column - Sidebar (4 cols) */}
            <div className="space-y-8">
              {/* Guests */}
              {episode.guests && episode.guests.length > 0 && (
                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <PodcastGuests guests={episode.guests} />
                </div>
              )}

              {/* Hosts Info Card */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-xl text-neutral-900">
                  <User className="h-5 w-5 text-primary-600" />
                  {episode.hosts.length === 1 ? 'Conductor' : 'Conductores'}
                </h3>
                <div className="space-y-4">
                  {episode.hosts.map(host => (
                    <div key={host.id} className="flex items-start gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-neutral-100">
                        <Image src={host.avatar} alt={host.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-neutral-900">{host.name}</div>
                        <div className="text-sm text-neutral-600">{host.role}</div>
                        {host.bio && (
                          <p className="mt-2 text-xs text-neutral-600 line-clamp-2">{host.bio}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscribe CTA */}
              <PodcastSubscribe
                spotifyUrl={episode.spotifyUrl}
                applePodcastsUrl={episode.applePodcastsUrl}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Related Episodes Section */}
      {relatedEpisodes.length > 0 && (
        <section className="border-t border-neutral-200 bg-white py-12 md:py-16">
          <Container>
            <div className="mb-8">
              <h2 className="mb-2 font-bold text-2xl text-neutral-900 md:text-3xl">
                Episodios Relacionados
              </h2>
              <p className="text-neutral-600">
                Más conversaciones sobre {episode.category.name.toLowerCase()}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedEpisodes.map(relatedEpisode => (
                <PodcastEpisodeCard key={relatedEpisode.id} episode={relatedEpisode} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="border-t border-neutral-200 bg-gradient-to-br from-primary-600 to-secondary-700 py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center text-white">
            <h2 className="mb-4 font-bold text-3xl md:text-4xl">
              ¿Quieres aparecer en el podcast?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Si tienes una historia interesante sobre transformación empresarial o casos de éxito,
              nos encantaría conversar contigo en el próximo episodio.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:podcast@duosoluciones.com"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-medium text-primary-700 transition-colors hover:bg-neutral-100"
              >
                Contáctanos por email
              </a>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                Formulario de contacto
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
