/**
 * Migration Utilities
 * Helper functions to transform mock data to database format
 * This will facilitate the future migration from mock data to database-driven content
 */

import type { NewBlogPost, NewPodcastEpisode, NewCategory, NewTag } from '@/lib/db/schema'

// ============================================================================
// BLOG POST TRANSFORMATION
// ============================================================================

/**
 * Transforms a mock blog post to database format
 * @param mockPost - Blog post from mock data
 * @param authorName - Name of the author (will replace author object)
 * @param categoryNames - Array of category names
 * @param tagNames - Array of tag names
 * @returns Database-ready blog post object
 */
export function transformBlogPost(
  mockPost: {
    title: string
    slug: string
    excerpt: string
    content: string
    coverImage?: string
    author?: { name: string; [key: string]: any }
    category?: { name: string; [key: string]: any }
    categories?: string[]
    tags?: Array<{ name: string; [key: string]: any } | string>
    publishedAt: string | Date
    readingTime?: number
    featured?: boolean
    seo?: {
      metaTitle?: string
      metaDescription?: string
      keywords?: string[]
      [key: string]: any
    }
    [key: string]: any
  },
  options?: {
    authorName?: string
    categoryNames?: string[]
    tagNames?: string[]
  }
): Omit<NewBlogPost, 'id' | 'createdAt' | 'updatedAt'> {
  // Extract category names
  const categories =
    options?.categoryNames ||
    (mockPost.categories as string[]) ||
    (mockPost.category ? [mockPost.category.name] : [])

  // Extract tag names
  const tags =
    options?.tagNames ||
    (mockPost.tags?.map(tag => (typeof tag === 'string' ? tag : tag.name)) as string[]) ||
    []

  return {
    title: mockPost.title,
    slug: mockPost.slug,
    excerpt: mockPost.excerpt,
    content: mockPost.content,
    featuredImage: mockPost.coverImage,
    featuredImageAlt: mockPost.coverImage ? `Imagen de ${mockPost.title}` : undefined,
    authorName:
      options?.authorName || mockPost.author?.name || mockPost.authorName || 'DUO Soluciones',
    categories,
    tags,
    status: 'published',
    publishedAt: new Date(mockPost.publishedAt),
    readingTime: mockPost.readingTime,
    featured: mockPost.featured || false,
    metaTitle: mockPost.seo?.metaTitle,
    metaDescription: mockPost.seo?.metaDescription,
    metaKeywords: mockPost.seo?.keywords || [],
    viewCount: 0,
  }
}

/**
 * Batch transform multiple blog posts
 */
export function transformBlogPosts(
  mockPosts: Array<any>,
  options?: {
    defaultAuthor?: string
  }
): Omit<NewBlogPost, 'id' | 'createdAt' | 'updatedAt'>[] {
  return mockPosts.map(post =>
    transformBlogPost(post, {
      authorName: options?.defaultAuthor,
    })
  )
}

// ============================================================================
// PODCAST EPISODE TRANSFORMATION
// ============================================================================

/**
 * Transforms a mock podcast episode to database format
 * @param mockEpisode - Podcast episode from mock data
 * @returns Database-ready podcast episode object
 */
export function transformPodcastEpisode(mockEpisode: {
  title: string
  slug: string
  description: string
  content?: string
  coverImage?: string
  audioUrl?: string
  spotifyUrl?: string
  applePodcastsUrl?: string
  duration: number
  publishedAt: string | Date
  season?: number
  episode?: number
  episodeNumber?: number
  hosts?: Array<{ id?: string; name: string; [key: string]: any }>
  guests?: Array<{ name: string; role?: string; company?: string; [key: string]: any }>
  topics?: string[]
  tags?: Array<{ name: string; [key: string]: any } | string>
  transcript?: string
  showNotes?: string
  resources?: Array<{ title: string; url: string; description?: string }>
  category?: { name: string; [key: string]: any }
  featured?: boolean
  seo?: {
    metaTitle?: string
    metaDescription?: string
    [key: string]: any
  }
  [key: string]: any
}): Omit<NewPodcastEpisode, 'id' | 'createdAt' | 'updatedAt'> {
  // Extract tag names
  const tags =
    mockEpisode.tags?.map(tag => (typeof tag === 'string' ? tag : tag.name)) || ([] as string[])

  // Extract topics
  const topics = mockEpisode.topics || []

  return {
    title: mockEpisode.title,
    slug: mockEpisode.slug,
    description: mockEpisode.description,
    episodeNumber: mockEpisode.episode || mockEpisode.episodeNumber,
    season: mockEpisode.season,
    duration: mockEpisode.duration,
    audioUrl: mockEpisode.audioUrl,
    coverImage: mockEpisode.coverImage,
    spotifyEpisodeId: undefined,
    spotifyUrl: mockEpisode.spotifyUrl,
    hosts: mockEpisode.hosts || [],
    guests: mockEpisode.guests || [],
    topics,
    tags,
    transcript: mockEpisode.transcript,
    hasTranscript: !!mockEpisode.transcript,
    showNotes: mockEpisode.showNotes || mockEpisode.content,
    resources: mockEpisode.resources || [],
    status: 'published',
    publishedAt: new Date(mockEpisode.publishedAt),
    metaTitle: mockEpisode.seo?.metaTitle,
    metaDescription: mockEpisode.seo?.metaDescription,
    featured: mockEpisode.featured || false,
    playCount: 0,
  }
}

/**
 * Batch transform multiple podcast episodes
 */
export function transformPodcastEpisodes(
  mockEpisodes: Array<any>
): Omit<NewPodcastEpisode, 'id' | 'createdAt' | 'updatedAt'>[] {
  return mockEpisodes.map(episode => transformPodcastEpisode(episode))
}

// ============================================================================
// CATEGORY TRANSFORMATION
// ============================================================================

/**
 * Transforms a mock category to database format
 */
export function transformCategory(mockCategory: {
  id?: string
  name: string
  slug: string
  description?: string
  color?: string
  [key: string]: any
}): Omit<NewCategory, 'id' | 'createdAt' | 'updatedAt'> {
  return {
    name: mockCategory.name,
    slug: mockCategory.slug,
    description: mockCategory.description,
    color: mockCategory.color,
  }
}

/**
 * Batch transform multiple categories
 */
export function transformCategories(
  mockCategories: Array<any>
): Omit<NewCategory, 'id' | 'createdAt' | 'updatedAt'>[] {
  return mockCategories.map(category => transformCategory(category))
}

// ============================================================================
// TAG TRANSFORMATION
// ============================================================================

/**
 * Transforms a mock tag to database format
 */
export function transformTag(mockTag: {
  id?: string
  name: string
  slug: string
  [key: string]: any
}): Omit<NewTag, 'id' | 'createdAt' | 'updatedAt'> {
  return {
    name: mockTag.name,
    slug: mockTag.slug,
  }
}

/**
 * Batch transform multiple tags
 */
export function transformTags(
  mockTags: Array<any>
): Omit<NewTag, 'id' | 'createdAt' | 'updatedAt'>[] {
  return mockTags.map(tag => transformTag(tag))
}

// ============================================================================
// UTILITY HELPERS
// ============================================================================

/**
 * Convert reading time text to minutes
 * @example "8 min read" -> 8
 */
export function parseReadingTime(readingTimeText?: string): number | undefined {
  if (!readingTimeText) return undefined
  const match = readingTimeText.match(/(\d+)/)
  return match ? parseInt(match[1], 10) : undefined
}

/**
 * Convert duration text to seconds
 * @example "45:30" -> 2730
 * @example "1:15:20" -> 4520
 */
export function parseDuration(durationText: string): number {
  const parts = durationText.split(':').map(Number)

  if (parts.length === 2) {
    // MM:SS format
    return parts[0] * 60 + parts[1]
  } else if (parts.length === 3) {
    // HH:MM:SS format
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  }

  return 0
}

/**
 * Format seconds to HH:MM:SS or MM:SS
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

/**
 * Slugify a string (convert to URL-friendly format)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Normalize unicode characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove consecutive hyphens
}

/**
 * Extract plain text from markdown (simple version)
 */
export function extractPlainText(markdown: string, maxLength?: number): string {
  // Remove markdown syntax (simplified)
  let text = markdown
    .replace(/#{1,6}\s/g, '') // Headers
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1') // Bold/Italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Links
    .replace(/`{1,3}[^`]+`{1,3}/g, '') // Code
    .replace(/>\s/g, '') // Blockquotes
    .replace(/[-*+]\s/g, '') // Lists
    .trim()

  if (maxLength && text.length > maxLength) {
    text = text.substring(0, maxLength) + '...'
  }

  return text
}

/**
 * Generate excerpt from content if not provided
 */
export function generateExcerpt(content: string, maxLength: number = 200): string {
  const plainText = extractPlainText(content)
  return plainText.length > maxLength ? plainText.substring(0, maxLength).trim() + '...' : plainText
}

/**
 * Estimate reading time based on word count
 * Average reading speed: 200-250 words per minute
 */
export function estimateReadingTime(content: string, wordsPerMinute: number = 225): number {
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Validate required fields for blog post
 */
export function validateBlogPost(post: any): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!post.title || post.title.trim() === '') {
    errors.push('Title is required')
  }

  if (!post.slug || post.slug.trim() === '') {
    errors.push('Slug is required')
  }

  if (!post.content || post.content.trim() === '') {
    errors.push('Content is required')
  }

  if (!post.excerpt || post.excerpt.trim() === '') {
    errors.push('Excerpt is required')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Validate required fields for podcast episode
 */
export function validatePodcastEpisode(episode: any): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!episode.title || episode.title.trim() === '') {
    errors.push('Title is required')
  }

  if (!episode.slug || episode.slug.trim() === '') {
    errors.push('Slug is required')
  }

  if (!episode.description || episode.description.trim() === '') {
    errors.push('Description is required')
  }

  if (!episode.duration || episode.duration <= 0) {
    errors.push('Valid duration is required')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// ============================================================================
// EXAMPLE USAGE
// ============================================================================

/**
 * Example usage of migration utilities
 * This demonstrates how to migrate mock data to database
 */
export async function exampleMigration() {
  /*
  import { blogPosts } from '@/lib/mock-data/blog-posts'
  import { podcastEpisodes } from '@/lib/mock-data/podcast-episodes'
  import { categories } from '@/lib/mock-data/categories'
  import { tags } from '@/lib/mock-data/tags'
  import { db } from '@/lib/db'
  import * as schema from '@/lib/db/schema'

  // 1. Migrate categories
  const dbCategories = transformCategories(categories)
  await db.insert(schema.categories).values(dbCategories)

  // 2. Migrate tags
  const dbTags = transformTags(tags)
  await db.insert(schema.tags).values(dbTags)

  // 3. Migrate blog posts
  const dbBlogPosts = transformBlogPosts(blogPosts, {
    defaultAuthor: 'DUO Soluciones'
  })
  await db.insert(schema.blog).values(dbBlogPosts)

  // 4. Migrate podcast episodes
  const dbPodcastEpisodes = transformPodcastEpisodes(podcastEpisodes)
  await db.insert(schema.podcast).values(dbPodcastEpisodes)

  console.log('Migration completed successfully!')
  */
}
