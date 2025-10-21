'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Play, Clock, Calendar, Users } from 'lucide-react'
import { PodcastEpisode } from '@/types/content'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDuration, formatSeasonEpisode, formatPodcastDate } from '@/lib/utils/podcast'
import { cn } from '@/lib/utils'

interface PodcastEpisodeCardProps {
  episode: PodcastEpisode
  featured?: boolean
}

/**
 * PodcastEpisodeCard component displays a podcast episode card
 * Features: cover image, title, duration, guests, play button
 */
export function PodcastEpisodeCard({ episode, featured = false }: PodcastEpisodeCardProps) {
  const maxGuestsDisplay = 3
  const displayGuests = episode.guests?.slice(0, maxGuestsDisplay) || []
  const remainingGuests = (episode.guests?.length || 0) - maxGuestsDisplay

  return (
    <Card
      className={cn(
        'group overflow-hidden transition-all duration-300 hover:shadow-xl',
        featured && 'md:col-span-2 md:row-span-2'
      )}
    >
      <Link href={`/podcast/${episode.slug}`} className="block">
        {/* Cover Image */}
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <Image
            src={episode.coverImage}
            alt={episode.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
            <div className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1DB954] shadow-lg transition-transform hover:scale-110">
                <Play className="h-8 w-8 fill-white text-white" />
              </div>
            </div>
          </div>

          {/* Season/Episode Badge */}
          <div className="absolute left-3 top-3">
            <Badge variant="default" className="bg-black/70 text-white backdrop-blur-sm">
              {formatSeasonEpisode(episode.season, episode.episode)}
            </Badge>
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute right-3 top-3">
              <Badge variant="success" className="bg-[#1DB954] text-white">
                Destacado
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={cn('p-4', featured && 'md:p-6')}>
          {/* Category */}
          <div className="mb-2">
            <Badge variant="outline" className="text-xs">
              {episode.category.name}
            </Badge>
          </div>

          {/* Title */}
          <h3
            className={cn(
              'mb-3 font-bold text-neutral-900 line-clamp-2',
              featured ? 'text-xl md:text-2xl' : 'text-lg'
            )}
          >
            {episode.title}
          </h3>

          {/* Description (only for featured) */}
          {featured && (
            <p className="mb-4 text-sm text-neutral-600 line-clamp-2">{episode.description}</p>
          )}

          {/* Metadata */}
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
            {/* Duration */}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(episode.duration)}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatPodcastDate(episode.publishedAt)}</span>
            </div>

            {/* Guests Count */}
            {episode.guests && episode.guests.length > 0 && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>
                  {episode.guests.length} invitado{episode.guests.length > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>

          {/* Guest Avatars */}
          {displayGuests.length > 0 && (
            <div className="mb-4 flex items-center gap-2">
              <div className="flex -space-x-2">
                {displayGuests.map(guest => (
                  <div
                    key={guest.id}
                    className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-neutral-200"
                  >
                    <Image src={guest.avatar} alt={guest.name} fill className="object-cover" />
                  </div>
                ))}
              </div>
              {remainingGuests > 0 && (
                <span className="text-xs text-neutral-500">+{remainingGuests} más</span>
              )}
            </div>
          )}

          {/* CTA Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-full group-hover:border-[#1DB954] group-hover:text-[#1DB954]"
          >
            <Play className="h-4 w-4" />
            Escuchar episodio
          </Button>
        </div>
      </Link>
    </Card>
  )
}
