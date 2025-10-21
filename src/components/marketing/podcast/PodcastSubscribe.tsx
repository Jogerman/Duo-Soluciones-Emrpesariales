'use client'

import Link from 'next/link'
import { Rss, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

interface PodcastSubscribeProps {
  spotifyUrl?: string
  applePodcastsUrl?: string
  rssUrl?: string
  className?: string
}

/**
 * PodcastSubscribe component displays subscribe buttons for various platforms
 * Features: Spotify (primary), Apple Podcasts, RSS, social share
 */
export function PodcastSubscribe({
  spotifyUrl,
  applePodcastsUrl,
  rssUrl,
  className = '',
}: PodcastSubscribeProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Podcast DUO',
          text: 'Escucha el Podcast DUO - Conversaciones sobre transformación empresarial',
          url: window.location.href,
        })
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed')
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Enlace copiado al portapapeles')
    }
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="text-center">
            <h3 className="mb-2 font-semibold text-xl text-neutral-900">Suscríbete al Podcast</h3>
            <p className="text-sm text-neutral-600">
              Escucha todos los episodios en tu plataforma favorita
            </p>
          </div>

          {/* Subscribe Buttons */}
          <div className="space-y-3">
            {/* Spotify - Primary */}
            {spotifyUrl && (
              <Button
                className="w-full bg-[#1DB954] text-white hover:bg-[#1ed760]"
                size="lg"
                asChild
              >
                <Link href={spotifyUrl} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  Escuchar en Spotify
                </Link>
              </Button>
            )}

            {/* Apple Podcasts - Secondary */}
            {applePodcastsUrl && (
              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link href={applePodcastsUrl} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.5c-5.238 0-9.5-4.262-9.5-9.5S6.762 2.5 12 2.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5zm3.038-13.5c-.878 0-1.462.374-1.796.65-.276-.577-.87-1.15-1.848-1.15-.748 0-1.25.3-1.552.583V8h-1.3v8h1.3v-4.45c0-.724.45-1.245 1.088-1.245.638 0 .975.505.975 1.22V16h1.3v-4.45c0-.724.45-1.245 1.088-1.245.638 0 .975.505.975 1.22V16h1.3v-4.925c0-1.676-.875-2.575-2.53-2.575z" />
                  </svg>
                  Apple Podcasts
                </Link>
              </Button>
            )}

            {/* RSS Feed - Optional */}
            {rssUrl && (
              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link href={rssUrl} target="_blank" rel="noopener noreferrer">
                  <Rss className="h-5 w-5" />
                  Feed RSS
                </Link>
              </Button>
            )}
          </div>

          {/* Share Button */}
          <div className="border-t border-neutral-200 pt-4">
            <Button variant="ghost" size="sm" className="w-full" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              Compartir este podcast
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
