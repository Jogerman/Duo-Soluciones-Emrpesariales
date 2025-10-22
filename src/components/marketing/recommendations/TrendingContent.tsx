'use client'

import { useMemo, useState } from 'react'
import { BlogPost, PodcastEpisode } from '@/types/content'
import { BlogPostCard } from '@/components/marketing/blog/BlogPostCard'
import { PodcastEpisodeCard } from '@/components/marketing/podcast/PodcastEpisodeCard'
import { getTrendingContent } from '@/lib/algorithms/content-recommendations'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TrendingContentProps {
  blogPosts: BlogPost[]
  podcastEpisodes: PodcastEpisode[]
  maxResults?: number
  title?: string
  description?: string
  showCarousel?: boolean
  className?: string
}

/**
 * TrendingContent component
 *
 * Displays trending content on homepage
 * Features:
 * - Mix of blog posts and podcast episodes
 * - Trending badge/indicator
 * - Carousel or grid layout
 * - Sort by engagement/popularity
 */
export function TrendingContent({
  blogPosts,
  podcastEpisodes,
  maxResults = 6,
  title = 'Contenido en Tendencia',
  description = 'Lo más popular esta semana',
  showCarousel = false,
  className,
}: TrendingContentProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = showCarousel ? 3 : maxResults

  // Calculate trending content with memoization
  const trendingItems = useMemo(() => {
    return getTrendingContent(blogPosts, podcastEpisodes, maxResults)
  }, [blogPosts, podcastEpisodes, maxResults])

  // Pagination for carousel
  const totalPages = Math.ceil(trendingItems.length / itemsPerPage)
  const currentItems = showCarousel
    ? trendingItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : trendingItems

  const handlePrevPage = () => {
    setCurrentPage(prev => (prev > 0 ? prev - 1 : totalPages - 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : 0))
  }

  // Empty state
  if (trendingItems.length === 0) {
    return null
  }

  return (
    <section className={cn('py-16 bg-gradient-to-b from-white to-neutral-50', className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6 text-primary-600" />
              <h2 className="text-3xl font-bold text-neutral-900">{title}</h2>
            </div>
            {description && (
              <p className="text-lg text-neutral-600">{description}</p>
            )}
          </div>

          {/* Carousel Controls */}
          {showCarousel && totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-neutral-600">
                {currentPage + 1} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div
          className={cn(
            'grid gap-6',
            'grid-cols-1',
            'md:grid-cols-2',
            currentItems.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2',
            showCarousel && 'transition-all duration-300'
          )}
        >
          {currentItems.map((trending, index) => {
            const content = trending.item

            return (
              <div key={trending.item.id} className="relative group">
                {/* Trending Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge
                    variant="default"
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg flex items-center gap-1"
                  >
                    <TrendingUp className="w-3 h-3" />
                    <span>Trending</span>
                  </Badge>
                </div>

                {/* Content Card */}
                {trending.type === 'blog' ? (
                  <BlogPostCard post={content as BlogPost} featured={index === 0} />
                ) : (
                  <PodcastEpisodeCard episode={content as PodcastEpisode} featured={index === 0} />
                )}
              </div>
            )
          })}
        </div>

        {/* Pagination Dots (for carousel) */}
        {showCarousel && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  index === currentPage
                    ? 'bg-primary-600 w-8'
                    : 'bg-neutral-300 hover:bg-neutral-400'
                )}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Debug info (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 p-4 bg-white border border-neutral-200 rounded-lg">
            <summary className="cursor-pointer font-medium text-sm text-neutral-700">
              Debug: Trending Scores
            </summary>
            <div className="mt-4 space-y-2">
              {trendingItems.map(trending => {
                const item = trending.item
                const views = 'views' in item ? item.views : 'plays' in item ? item.plays : 0
                return (
                  <div key={item.id} className="text-xs text-neutral-600">
                    <strong>{item.title}</strong>
                    <br />
                    Type: {trending.type} | Views/Plays: {views || 0} | Featured:{' '}
                    {item.featured ? 'Yes' : 'No'}
                  </div>
                )
              })}
            </div>
          </details>
        )}
      </div>
    </section>
  )
}

/**
 * Skeleton loader for TrendingContent
 */
export function TrendingContentSkeleton({
  maxResults = 6,
  className,
}: {
  maxResults?: number
  className?: string
}) {
  return (
    <section className={cn('py-16 bg-gradient-to-b from-white to-neutral-50', className)}>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="h-8 w-64" />
          </div>
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: Math.min(maxResults, 6) }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="aspect-[16/9] w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Compact version for homepage hero section
 */
export function TrendingContentCompact({
  blogPosts,
  podcastEpisodes,
  maxResults = 3,
  className,
}: Omit<TrendingContentProps, 'title' | 'description' | 'showCarousel'>) {
  const trendingItems = useMemo(() => {
    return getTrendingContent(blogPosts, podcastEpisodes, maxResults)
  }, [blogPosts, podcastEpisodes, maxResults])

  if (trendingItems.length === 0) {
    return null
  }

  return (
    <div className={cn('space-y-4', className)}>
      {trendingItems.map(trending => {
        const item = trending.item
        return (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors group cursor-pointer"
          >
            <div className="flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-neutral-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {trending.type === 'blog' ? 'Blog' : 'Podcast'}
                </Badge>
                <span className="text-xs text-neutral-500">
                  {trending.type === 'blog'
                    ? `${(item as BlogPost).readingTime} min`
                    : `${Math.round((item as PodcastEpisode).duration / 60)} min`}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
