'use client'

import { getSpotifyEmbedUrl } from '@/lib/utils/podcast'

interface PodcastPlayerProps {
  spotifyUrl?: string
  title: string
  className?: string
}

/**
 * PodcastPlayer component displays a Spotify embedded player
 * Falls back to a message if no URL is provided
 */
export function PodcastPlayer({ spotifyUrl, title, className = '' }: PodcastPlayerProps) {
  // If no Spotify URL, show fallback
  if (!spotifyUrl) {
    return (
      <div
        className={`flex h-[232px] items-center justify-center rounded-lg bg-neutral-100 ${className}`}
      >
        <div className="text-center">
          <p className="text-neutral-600">Reproductor no disponible</p>
          <p className="mt-1 text-sm text-neutral-500">
            El episodio aún no está publicado en Spotify
          </p>
        </div>
      </div>
    )
  }

  const embedUrl = getSpotifyEmbedUrl(spotifyUrl)

  return (
    <div className={`w-full ${className}`}>
      <iframe
        src={embedUrl}
        width="100%"
        height="232"
        frameBorder="0"
        allowFullScreen={false}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={`Podcast: ${title}`}
        className="rounded-lg"
      />
    </div>
  )
}
