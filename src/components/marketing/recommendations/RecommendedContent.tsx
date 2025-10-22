'use client'

import { useMemo, useEffect, useState } from 'react'
import { BlogPost, PodcastEpisode } from '@/types/content'
import { BlogPostCard } from '@/components/marketing/blog/BlogPostCard'
import { PodcastEpisodeCard } from '@/components/marketing/podcast/PodcastEpisodeCard'
import { getRecommendations, getMixedRecommendations } from '@/lib/algorithms/content-recommendations'
import { getViewedContentIds } from '@/lib/utils/personalization'
import { trackRecommendationImpression } from '@/lib/analytics/content-analytics'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/utils'

export interface RecommendedContentProps {
  sourceContent: BlogPost | PodcastEpisode
  blogPosts?: BlogPost[]
  podcastEpisodes?: PodcastEpisode[]
  maxResults?: number
  title?: string
  description?: string
  mixContentTypes?: boolean
  className?: string
}

/**
 * RecommendedContent component
 *
 * Displays "You might also like" section with related content
 * Features:
 * - Multi-factor recommendation algorithm
 * - Responsive grid layout (3 cols desktop, 2 tablet, 1 mobile)
 * - Loading states with skeleton loaders
 * - Empty state handling
 * - Personalization based on view history
 */
export function RecommendedContent({
  sourceContent,
  blogPosts = [],
  podcastEpisodes = [],
  maxResults = 6,
  title = 'También te podría interesar',
  description,
  mixContentTypes = true,
  className,
}: RecommendedContentProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [viewHistory, setViewHistory] = useState<string[]>([])

  // Load view history on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const history = getViewedContentIds()
      setViewHistory(history)
      setIsLoading(false)
    }
  }, [])

  // Calculate recommendations with memoization
  const recommendations = useMemo(() => {
    if (isLoading) return []

    if (mixContentTypes && blogPosts.length > 0 && podcastEpisodes.length > 0) {
      // Get mixed recommendations (both blog posts and podcasts)
      const mixed = getMixedRecommendations(
        sourceContent,
        blogPosts,
        podcastEpisodes,
        viewHistory,
        {
          maxResults,
          diversityEnabled: true,
          maxPerAuthor: 2,
          recentMonths: 6,
          includeViewHistory: true,
        }
      )
      return mixed
    } else {
      // Get recommendations from single content type
      const isBlog = 'readingTime' in sourceContent
      // Type assertion needed due to union type constraints
      const pool = isBlog ? blogPosts : (podcastEpisodes as typeof blogPosts)
      const recs = getRecommendations(sourceContent, pool, viewHistory, {
        maxResults,
        diversityEnabled: true,
        maxPerAuthor: 2,
        recentMonths: 6,
        includeViewHistory: true,
      })

      return recs.map(rec => ({
        item: rec.item,
        type: 'readingTime' in rec.item ? ('blog' as const) : ('podcast' as const),
        score: rec.score,
      }))
    }
  }, [sourceContent, blogPosts, podcastEpisodes, viewHistory, maxResults, mixContentTypes, isLoading])

  // Track impression when recommendations are displayed
  useEffect(() => {
    if (recommendations.length > 0 && !isLoading) {
      const contentIds = recommendations.map(rec => rec.item.id)
      trackRecommendationImpression(contentIds, sourceContent.id, {
        recommendationCount: recommendations.length,
        mixedTypes: mixContentTypes,
      })
    }
  }, [recommendations, sourceContent.id, mixContentTypes, isLoading])

  // Loading state
  if (isLoading) {
    return (
      <section className={cn('py-12', className)} aria-busy="true" aria-label="Cargando recomendaciones">
        <div className="container mx-auto px-4">
          <div className="mb-8" aria-hidden="true">
            <Skeleton className="h-8 w-64 mb-2" />
            {description && <Skeleton className="h-4 w-96" />}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-hidden="true">
            {Array.from({ length: Math.min(maxResults, 6) }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="aspect-[16/9] w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
          <span className="sr-only">Cargando contenido recomendado...</span>
        </div>
      </section>
    )
  }

  // Empty state
  if (recommendations.length === 0) {
    return null // Don't show anything if no recommendations
  }

  return (
    <section className={cn('py-12 bg-neutral-50', className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">{title}</h2>
          {description && (
            <p className="text-lg text-neutral-600">{description}</p>
          )}
        </div>

        {/* Recommendations Grid */}
        <div
          className={cn(
            'grid gap-6',
            'grid-cols-1',
            'md:grid-cols-2',
            recommendations.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
          )}
        >
          {recommendations.map(rec => {
            if (rec.type === 'blog') {
              return (
                <BlogPostCard
                  key={rec.item.id}
                  post={rec.item as BlogPost}
                  featured={false}
                />
              )
            } else {
              return (
                <PodcastEpisodeCard
                  key={rec.item.id}
                  episode={rec.item as PodcastEpisode}
                  featured={false}
                />
              )
            }
          })}
        </div>

        {/* Debug info (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 p-4 bg-white border border-neutral-200 rounded-lg">
            <summary className="cursor-pointer font-medium text-sm text-neutral-700">
              Debug: Recommendation Scores
            </summary>
            <div className="mt-4 space-y-2">
              {recommendations.map(rec => (
                <div key={rec.item.id} className="text-xs text-neutral-600">
                  <strong>{rec.item.title}</strong>
                  <br />
                  Score: {rec.score.toFixed(2)} | Type: {rec.type}
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </section>
  )
}

/**
 * Skeleton loader for RecommendedContent
 */
export function RecommendedContentSkeleton({
  maxResults = 6,
  className,
}: {
  maxResults?: number
  className?: string
}) {
  return (
    <section className={cn('py-12 bg-neutral-50', className)}>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
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
