/**
 * Content Recommendation Algorithm
 *
 * Multi-factor recommendation system that scores content based on:
 * - Same category: weight 3.0
 * - Shared tags: weight 2.0 (per matching tag)
 * - Same author: weight 1.5
 * - Similar duration/reading time: weight 1.0
 * - Recent popularity (last 30 days): weight 2.0
 * - User view history: weight 1.0 (if available)
 *
 * Diversity rules:
 * - No duplicate content
 * - Mix content types (blog + podcast) when possible
 * - Limit to max 2 items from same author
 * - Prioritize recent content (published in last 6 months)
 */

import { BlogPost, PodcastEpisode } from '@/types/content'

// Scoring weights
const WEIGHTS = {
  SAME_CATEGORY: 3.0,
  SHARED_TAG: 2.0,
  SAME_AUTHOR: 1.5,
  SIMILAR_DURATION: 1.0,
  RECENT_POPULARITY: 2.0,
  USER_HISTORY: 1.0,
} as const

// Content type for unified scoring
export type ContentItem = BlogPost | PodcastEpisode

// Recommendation result with score
export interface RecommendationResult<T = ContentItem> {
  item: T
  score: number
  matchFactors: string[]
}

// Configuration for recommendation algorithm
export interface RecommendationConfig {
  maxResults?: number
  diversityEnabled?: boolean
  maxPerAuthor?: number
  recentMonths?: number
  includeViewHistory?: boolean
  minScore?: number
}

const DEFAULT_CONFIG: Required<RecommendationConfig> = {
  maxResults: 6,
  diversityEnabled: true,
  maxPerAuthor: 2,
  recentMonths: 6,
  includeViewHistory: true,
  minScore: 0.5,
}

/**
 * Check if item is a blog post
 */
function isBlogPost(item: ContentItem): item is BlogPost {
  return 'readingTime' in item
}

/**
 * Check if item is a podcast episode
 * Note: Currently unused but kept for API completeness
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isPodcastEpisode(item: ContentItem): item is PodcastEpisode {
  return 'duration' in item && 'audioUrl' in item
}

/**
 * Get content author ID (handles both blog posts and podcast episodes)
 */
function getAuthorId(item: ContentItem): string {
  if (isBlogPost(item)) {
    return item.author.id
  }
  // For podcasts, use first host as primary author
  return item.hosts[0]?.id || ''
}

/**
 * Get content duration/reading time in minutes
 */
function getContentDuration(item: ContentItem): number {
  if (isBlogPost(item)) {
    return item.readingTime
  }
  // Convert seconds to minutes for podcasts
  return Math.round(item.duration / 60)
}

/**
 * Get content publication date
 */
function getPublishedDate(item: ContentItem): Date {
  return new Date(item.publishedAt)
}

/**
 * Calculate similarity score between two content items
 */
function calculateSimilarityScore(
  sourceItem: ContentItem,
  candidateItem: ContentItem,
  userViewHistory?: string[],
  config: Required<RecommendationConfig> = DEFAULT_CONFIG
): { score: number; factors: string[] } {
  let score = 0
  const factors: string[] = []

  // 1. Same category (weight: 3.0)
  if (sourceItem.category.id === candidateItem.category.id) {
    score += WEIGHTS.SAME_CATEGORY
    factors.push(`Same category: ${sourceItem.category.name}`)
  }

  // 2. Shared tags (weight: 2.0 per tag)
  const sourceTags = new Set(sourceItem.tags.map(t => t.id))
  const sharedTags = candidateItem.tags.filter(t => sourceTags.has(t.id))
  if (sharedTags.length > 0) {
    const tagScore = sharedTags.length * WEIGHTS.SHARED_TAG
    score += tagScore
    factors.push(`${sharedTags.length} shared tag(s): ${sharedTags.map(t => t.name).join(', ')}`)
  }

  // 3. Same author (weight: 1.5)
  const sourceAuthorId = getAuthorId(sourceItem)
  const candidateAuthorId = getAuthorId(candidateItem)
  if (sourceAuthorId === candidateAuthorId && sourceAuthorId) {
    score += WEIGHTS.SAME_AUTHOR
    factors.push('Same author')
  }

  // 4. Similar duration/reading time (weight: 1.0)
  const sourceDuration = getContentDuration(sourceItem)
  const candidateDuration = getContentDuration(candidateItem)
  const durationDiff = Math.abs(sourceDuration - candidateDuration)

  // Consider similar if within ±3 minutes for blog posts or ±10 minutes for podcasts
  const threshold = isBlogPost(sourceItem) ? 3 : 10
  if (durationDiff <= threshold) {
    score += WEIGHTS.SIMILAR_DURATION
    factors.push(`Similar duration: ~${candidateDuration} min`)
  }

  // 5. Recent popularity (weight: 2.0)
  // Check if content was published in the last 30 days (proxy for "trending")
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const publishedDate = getPublishedDate(candidateItem)

  if (publishedDate >= thirtyDaysAgo) {
    score += WEIGHTS.RECENT_POPULARITY
    factors.push('Recently published')
  }

  // 6. User view history (weight: 1.0)
  if (config.includeViewHistory && userViewHistory && userViewHistory.length > 0) {
    const wasViewed = userViewHistory.includes(candidateItem.id)
    if (wasViewed) {
      score += WEIGHTS.USER_HISTORY
      factors.push('Previously viewed')
    }
  }

  return { score, factors }
}

/**
 * Filter content based on recency (last N months)
 */
function filterRecentContent<T extends ContentItem>(
  items: T[],
  months: number
): T[] {
  const now = new Date()
  const cutoffDate = new Date(now.getFullYear(), now.getMonth() - months, now.getDate())

  return items.filter(item => {
    const publishedDate = getPublishedDate(item)
    return publishedDate >= cutoffDate
  })
}

/**
 * Apply diversity rules to recommendations
 */
function applyDiversityRules<T extends ContentItem>(
  recommendations: RecommendationResult<T>[],
  config: Required<RecommendationConfig>
): RecommendationResult<T>[] {
  if (!config.diversityEnabled) {
    return recommendations.slice(0, config.maxResults)
  }

  const result: RecommendationResult<T>[] = []
  const authorCounts = new Map<string, number>()

  for (const rec of recommendations) {
    // Stop if we have enough results
    if (result.length >= config.maxResults) {
      break
    }

    // Check author diversity
    const authorId = getAuthorId(rec.item)
    const currentCount = authorCounts.get(authorId) || 0

    if (currentCount < config.maxPerAuthor) {
      result.push(rec)
      authorCounts.set(authorId, currentCount + 1)
    }
  }

  return result
}

/**
 * Get recommended content based on a source item
 *
 * @param sourceItem The content item to base recommendations on
 * @param candidateItems Pool of items to recommend from
 * @param userViewHistory Optional array of viewed content IDs
 * @param config Configuration for the recommendation algorithm
 * @returns Array of recommended items with scores
 */
export function getRecommendations<T extends ContentItem>(
  sourceItem: ContentItem,
  candidateItems: T[],
  userViewHistory?: string[],
  config: Partial<RecommendationConfig> = {}
): RecommendationResult<T>[] {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }

  // Filter out the source item itself
  let pool = candidateItems.filter(item => item.id !== sourceItem.id)

  // Filter by recency if configured
  if (finalConfig.recentMonths > 0) {
    pool = filterRecentContent(pool, finalConfig.recentMonths)
  }

  // Calculate scores for all candidates
  const scored: RecommendationResult<T>[] = pool.map(item => {
    const { score, factors } = calculateSimilarityScore(
      sourceItem,
      item,
      userViewHistory,
      finalConfig
    )

    return {
      item,
      score,
      matchFactors: factors,
    }
  })

  // Sort by score (descending)
  const sorted = scored.sort((a, b) => b.score - a.score)

  // Filter by minimum score
  const filtered = sorted.filter(rec => rec.score >= finalConfig.minScore)

  // Apply diversity rules
  return applyDiversityRules(filtered, finalConfig)
}

/**
 * Get trending content based on popularity metrics
 *
 * @param blogPosts Array of blog posts
 * @param podcastEpisodes Array of podcast episodes
 * @param maxResults Maximum number of results (default: 6)
 * @returns Mixed array of trending content
 */
export function getTrendingContent(
  blogPosts: BlogPost[],
  podcastEpisodes: PodcastEpisode[],
  maxResults: number = 6
): { item: ContentItem; type: 'blog' | 'podcast' }[] {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  // Calculate trending score for blog posts
  const trendingBlogs = blogPosts
    .map(post => {
      const publishedDate = new Date(post.publishedAt)
      const daysSincePublished = Math.max(
        1,
        Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24))
      )

      // Score based on views, recency, and featured status
      let score = (post.views || 0) / daysSincePublished

      if (publishedDate >= thirtyDaysAgo) {
        score *= 2 // Boost recent content
      }

      if (post.featured) {
        score *= 1.5 // Boost featured content
      }

      return { item: post as ContentItem, type: 'blog' as const, score }
    })

  // Calculate trending score for podcast episodes
  const trendingPodcasts = podcastEpisodes
    .map(episode => {
      const publishedDate = new Date(episode.publishedAt)
      const daysSincePublished = Math.max(
        1,
        Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24))
      )

      // Score based on plays, recency, and featured status
      let score = (episode.plays || 0) / daysSincePublished

      if (publishedDate >= thirtyDaysAgo) {
        score *= 2 // Boost recent content
      }

      if (episode.featured) {
        score *= 1.5 // Boost featured content
      }

      return { item: episode as ContentItem, type: 'podcast' as const, score }
    })

  // Combine and sort by score
  const allTrending = [...trendingBlogs, ...trendingPodcasts]
    .sort((a, b) => b.score - a.score)

  // Apply diversity - try to mix content types
  const result: { item: ContentItem; type: 'blog' | 'podcast' }[] = []
  const blogCount = { count: 0 }
  const podcastCount = { count: 0 }
  const maxPerType = Math.ceil(maxResults / 2)

  // First pass: alternate between types when possible
  for (const trending of allTrending) {
    if (result.length >= maxResults) break

    if (trending.type === 'blog' && blogCount.count < maxPerType) {
      result.push(trending)
      blogCount.count++
    } else if (trending.type === 'podcast' && podcastCount.count < maxPerType) {
      result.push(trending)
      podcastCount.count++
    }
  }

  // Second pass: fill remaining slots with highest scores
  for (const trending of allTrending) {
    if (result.length >= maxResults) break
    if (!result.find(r => r.item.id === trending.item.id)) {
      result.push(trending)
    }
  }

  return result.slice(0, maxResults)
}

/**
 * Get mixed recommendations (both blog posts and podcasts)
 *
 * @param sourceItem The content item to base recommendations on
 * @param blogPosts Pool of blog posts
 * @param podcastEpisodes Pool of podcast episodes
 * @param userViewHistory Optional array of viewed content IDs
 * @param config Configuration for the recommendation algorithm
 * @returns Array of mixed recommended items
 */
export function getMixedRecommendations(
  sourceItem: ContentItem,
  blogPosts: BlogPost[],
  podcastEpisodes: PodcastEpisode[],
  userViewHistory?: string[],
  config: Partial<RecommendationConfig> = {}
): { item: ContentItem; type: 'blog' | 'podcast'; score: number }[] {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }

  // Get recommendations from both pools
  const allCandidates: ContentItem[] = [...blogPosts, ...podcastEpisodes]
  const recommendations = getRecommendations(
    sourceItem,
    allCandidates,
    userViewHistory,
    finalConfig
  )

  // Add type information
  return recommendations.map(rec => ({
    item: rec.item,
    type: isBlogPost(rec.item) ? ('blog' as const) : ('podcast' as const),
    score: rec.score,
  }))
}
