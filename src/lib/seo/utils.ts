/**
 * SEO Utility Functions for Content Metadata Generation
 *
 * This module provides utilities for:
 * - Reading time calculation
 * - Word count estimation
 * - Metadata generation for blog posts
 * - Metadata generation for podcast episodes
 * - Open Graph and Twitter Card metadata
 */

import type { Metadata } from 'next'
import type { BlogPost, PodcastEpisode } from '@/types/content'
import { SITE_CONFIG } from '@/lib/seo'

// ============================================================================
// READING TIME & WORD COUNT
// ============================================================================

/**
 * Calculate reading time for content
 * Based on average reading speed of 200 words per minute
 *
 * @param content - The text content to analyze
 * @returns Reading time in minutes (rounded up)
 *
 * @example
 * ```ts
 * const readingTime = calculateReadingTime(post.content) // 8 minutes
 * ```
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * Estimate word count in content
 * Useful for schema.org wordCount property
 *
 * @param content - The text content to count
 * @returns Number of words
 */
export function estimateWordCount(content: string): number {
  return content.trim().split(/\s+/).length
}

/**
 * Format duration from seconds to human-readable format
 *
 * @param seconds - Duration in seconds
 * @returns Formatted string like "45:30" or "1:23:45"
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

// ============================================================================
// BLOG POST METADATA
// ============================================================================

/**
 * Generate comprehensive Next.js Metadata for blog posts
 *
 * Includes:
 * - Title and description
 * - Keywords
 * - Authors
 * - Open Graph tags
 * - Twitter Card
 * - Canonical URL
 *
 * @param post - The blog post object
 * @returns Next.js Metadata object
 *
 * @example
 * ```tsx
 * // In app/blog/[slug]/page.tsx
 * export async function generateMetadata({ params }): Promise<Metadata> {
 *   const post = await getPostBySlug(params.slug)
 *   return generateBlogPostMetadata(post)
 * }
 * ```
 */
export function generateBlogPostMetadata(post: BlogPost): Metadata {
  const url = `${SITE_CONFIG.url}/blog/${post.slug}`
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `${SITE_CONFIG.url}${post.coverImage}`

  // Use SEO fields if available, otherwise fall back to post data
  const title = post.seo?.metaTitle || `${post.title} | Blog DUO Soluciones`
  const description = post.seo?.metaDescription || post.excerpt
  const keywords = post.seo?.keywords || post.tags.map(t => t.name)

  return {
    title,
    description,
    keywords: [...keywords, ...SITE_CONFIG.defaultKeywords],
    authors: [{ name: post.author.name }],
    creator: post.author.name,
    publisher: SITE_CONFIG.name,
    category: post.category.name,
    openGraph: {
      type: 'article',
      locale: SITE_CONFIG.locale,
      url,
      siteName: SITE_CONFIG.name,
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      tags: post.tags.map(t => t.name),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
      creator: SITE_CONFIG.socialMedia.twitter,
      site: SITE_CONFIG.socialMedia.twitter,
    },
    alternates: {
      canonical: url,
      languages: {
        'es-DO': url,
        'en-US': `${url}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// ============================================================================
// PODCAST EPISODE METADATA
// ============================================================================

/**
 * Generate comprehensive Next.js Metadata for podcast episodes
 *
 * Includes:
 * - Title and description
 * - Keywords
 * - Open Graph tags (music.song type for audio content)
 * - Twitter Card
 * - Canonical URL
 * - Audio URL
 *
 * @param episode - The podcast episode object
 * @returns Next.js Metadata object
 *
 * @example
 * ```tsx
 * // In app/podcast/[slug]/page.tsx
 * export async function generateMetadata({ params }): Promise<Metadata> {
 *   const episode = await getEpisodeBySlug(params.slug)
 *   return generatePodcastEpisodeMetadata(episode)
 * }
 * ```
 */
export function generatePodcastEpisodeMetadata(episode: PodcastEpisode): Metadata {
  const url = `${SITE_CONFIG.url}/podcast/${episode.slug}`
  const imageUrl = episode.coverImage.startsWith('http')
    ? episode.coverImage
    : `${SITE_CONFIG.url}${episode.coverImage}`

  // Use SEO fields if available, otherwise fall back to episode data
  const title = episode.seo?.metaTitle || `${episode.title} | Podcast DUO`
  const description = episode.seo?.metaDescription || episode.description
  const keywords = episode.seo?.keywords || episode.tags.map(t => t.name)

  // Format episode number for title
  const episodeInfo = episode.season
    ? `T${episode.season}E${episode.episode}`
    : `Ep. ${episode.episode}`

  return {
    title,
    description,
    keywords: [...keywords, 'podcast', 'audio', ...SITE_CONFIG.defaultKeywords],
    authors: episode.hosts.map(host => ({ name: host.name })),
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    category: episode.category.name,
    openGraph: {
      type: 'music.song', // Best OG type for audio content
      locale: SITE_CONFIG.locale,
      url,
      siteName: SITE_CONFIG.name,
      title: `${episodeInfo}: ${episode.title}`,
      description: episode.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: episode.title,
        },
      ],
      audio: episode.audioUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: episode.title,
      description: episode.description,
      images: [imageUrl],
      creator: SITE_CONFIG.socialMedia.twitter,
      site: SITE_CONFIG.socialMedia.twitter,
    },
    alternates: {
      canonical: url,
      languages: {
        'es-DO': url,
        'en-US': `${url}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...(episode.spotifyUrl && {
      other: {
        'spotify:episode': episode.spotifyUrl,
      },
    }),
  }
}

// ============================================================================
// LISTING PAGE METADATA
// ============================================================================

/**
 * Generate metadata for blog listing page
 */
export function generateBlogListingMetadata(): Metadata {
  return {
    title: 'Blog | DUO Soluciones Empresariales',
    description:
      'Artículos sobre desarrollo organizacional, mejora de procesos, implementación ERP, gobernanza corporativa y transformación digital.',
    keywords: [
      'blog empresarial',
      'artículos consultoría',
      'mejores prácticas',
      ...SITE_CONFIG.defaultKeywords,
    ],
    openGraph: {
      type: 'website',
      url: `${SITE_CONFIG.url}/blog`,
      title: 'Blog DUO Soluciones',
      description:
        'Estrategias prácticas para transformar tu negocio. Artículos sobre consultoría empresarial, ERP, procesos y más.',
      images: [
        {
          url: SITE_CONFIG.defaultImage,
          width: 1200,
          height: 630,
          alt: 'Blog DUO Soluciones',
        },
      ],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog`,
    },
  }
}

/**
 * Generate metadata for podcast listing page
 */
export function generatePodcastListingMetadata(): Metadata {
  return {
    title: 'Podcast DUO | Estrategias para Transformar tu Negocio',
    description:
      'Conversaciones con líderes empresariales sobre estrategia, operaciones, tecnología y liderazgo. Casos reales, lecciones prácticas.',
    keywords: [
      'podcast empresarial',
      'podcast negocios',
      'consultoría',
      'liderazgo',
      ...SITE_CONFIG.defaultKeywords,
    ],
    openGraph: {
      type: 'website',
      url: `${SITE_CONFIG.url}/podcast`,
      title: 'Podcast DUO',
      description: 'Estrategias prácticas para transformar tu negocio',
      images: [
        {
          url: `${SITE_CONFIG.url}/images/podcast-cover.jpg`,
          width: 1200,
          height: 630,
          alt: 'Podcast DUO',
        },
      ],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/podcast`,
    },
  }
}

// ============================================================================
// URL HELPERS
// ============================================================================

/**
 * Generate canonical URL for a path
 */
export function getCanonicalUrl(path: string): string {
  return `${SITE_CONFIG.url}${path}`
}

/**
 * Ensure image URL is absolute
 */
export function getAbsoluteImageUrl(imageUrl: string): string {
  if (imageUrl.startsWith('http')) {
    return imageUrl
  }
  return `${SITE_CONFIG.url}${imageUrl}`
}

// ============================================================================
// EXCERPT GENERATION
// ============================================================================

/**
 * Generate excerpt from content if not provided
 *
 * @param content - Full content text
 * @param maxLength - Maximum length in characters (default: 160)
 * @returns Truncated excerpt
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown syntax
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()

  if (plainText.length <= maxLength) {
    return plainText
  }

  // Truncate at last complete word before maxLength
  const truncated = plainText.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  return truncated.substring(0, lastSpace) + '...'
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validate that SEO metadata meets best practices
 * Useful for content authoring tools
 *
 * @returns Array of validation errors (empty if valid)
 */
export function validateSEOMetadata(metadata: {
  title: string
  description: string
  keywords?: string[]
  image?: string
}): string[] {
  const errors: string[] = []

  // Title validation
  if (!metadata.title) {
    errors.push('Title is required')
  } else if (metadata.title.length < 30) {
    errors.push('Title should be at least 30 characters')
  } else if (metadata.title.length > 60) {
    errors.push('Title should not exceed 60 characters')
  }

  // Description validation
  if (!metadata.description) {
    errors.push('Description is required')
  } else if (metadata.description.length < 120) {
    errors.push('Description should be at least 120 characters')
  } else if (metadata.description.length > 160) {
    errors.push('Description should not exceed 160 characters')
  }

  // Keywords validation
  if (metadata.keywords && metadata.keywords.length === 0) {
    errors.push('At least one keyword is recommended')
  }

  // Image validation
  if (!metadata.image) {
    errors.push('Featured image is required')
  }

  return errors
}
