'use client'

import { Headphones } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

interface PodcastHeroProps {
  totalEpisodes: number
  onSubscribeClick?: () => void
}

/**
 * PodcastHero component displays hero section for podcast listing page
 * Features: gradient background, title, tagline, subscribe CTAs
 */
export function PodcastHero({ totalEpisodes, onSubscribeClick }: PodcastHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-700 py-20 md:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <Headphones className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-4 font-bold text-4xl text-white md:text-5xl lg:text-6xl">
            Podcast DUO
          </h1>

          {/* Tagline */}
          <p className="mb-8 text-lg text-white/90 md:text-xl lg:text-2xl">
            Conversaciones sobre transformación empresarial
          </p>

          {/* Description */}
          <p className="mb-10 text-base text-white/80 md:text-lg">
            Explora estrategias prácticas, casos de éxito y lecciones aprendidas con líderes
            empresariales, expertos en gestión y consultores especializados.
          </p>

          {/* Stats */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-6 text-white">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#1DB954]" />
              <span className="text-sm font-medium">
                {totalEpisodes} episodio{totalEpisodes !== 1 ? 's' : ''} disponible
                {totalEpisodes !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="h-4 w-px bg-white/30" />
            <div className="text-sm font-medium">Nuevos episodios cada viernes</div>
          </div>

          {/* Subscribe Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full bg-[#1DB954] text-white hover:bg-[#1ed760] sm:w-auto"
              onClick={onSubscribeClick}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Escuchar en Spotify
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 sm:w-auto"
              onClick={onSubscribeClick}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.5c-5.238 0-9.5-4.262-9.5-9.5S6.762 2.5 12 2.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5zm3.038-13.5c-.878 0-1.462.374-1.796.65-.276-.577-.87-1.15-1.848-1.15-.748 0-1.25.3-1.552.583V8h-1.3v8h1.3v-4.45c0-.724.45-1.245 1.088-1.245.638 0 .975.505.975 1.22V16h1.3v-4.45c0-.724.45-1.245 1.088-1.245.638 0 .975.505.975 1.22V16h1.3v-4.925c0-1.676-.875-2.575-2.53-2.575z" />
              </svg>
              Apple Podcasts
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
