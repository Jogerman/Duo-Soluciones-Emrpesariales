/**
 * JSON-LD Schema Generators for Blog and Podcast Content
 *
 * This module provides structured data schemas for:
 * - Blog articles (BlogPosting)
 * - Podcast episodes (PodcastEpisode)
 * - Breadcrumb navigation (BreadcrumbList)
 *
 * These schemas improve search engine understanding and enable rich results.
 */

import type { BlogPost, PodcastEpisode } from '@/types/content'
import { estimateWordCount } from './utils'
import { SITE_CONFIG } from '@/lib/seo'

// ============================================================================
// BLOG ARTICLE SCHEMA
// ============================================================================

/**
 * Generate BlogPosting schema for blog posts
 *
 * @see https://schema.org/BlogPosting
 * @see https://developers.google.com/search/docs/appearance/structured-data/article
 *
 * @example
 * ```tsx
 * const schema = generateBlogArticleSchema(post)
 * <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 * ```
 */
export function generateBlogArticleSchema(post: BlogPost) {
  const url = `${SITE_CONFIG.url}/blog/${post.slug}`
  const imageUrl = post.coverImage.startsWith('http')
    ? post.coverImage
    : `${SITE_CONFIG.url}${post.coverImage}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    headline: post.title,
    description: post.excerpt,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      ...(post.author.avatar && {
        image: post.author.avatar.startsWith('http')
          ? post.author.avatar
          : `${SITE_CONFIG.url}${post.author.avatar}`,
      }),
      ...(post.author.linkedin && {
        sameAs: [post.author.linkedin],
      }),
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
      },
      url: SITE_CONFIG.url,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    articleSection: post.category.name,
    keywords: post.tags.map(t => t.name).join(', '),
    wordCount: estimateWordCount(post.content),
    timeRequired: `PT${post.readingTime}M`,
    inLanguage: 'es-DO',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(post.tags.length > 0 && {
      about: post.tags.map(tag => ({
        '@type': 'Thing',
        name: tag.name,
      })),
    }),
  }
}

// ============================================================================
// PODCAST EPISODE SCHEMA
// ============================================================================

/**
 * Generate PodcastEpisode schema for podcast content
 *
 * @see https://schema.org/PodcastEpisode
 * @see https://developers.google.com/search/docs/appearance/structured-data/podcast
 *
 * @example
 * ```tsx
 * const schema = generatePodcastEpisodeSchema(episode)
 * <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 * ```
 */
export function generatePodcastEpisodeSchema(episode: PodcastEpisode) {
  const url = `${SITE_CONFIG.url}/podcast/${episode.slug}`
  const imageUrl = episode.coverImage.startsWith('http')
    ? episode.coverImage
    : `${SITE_CONFIG.url}${episode.coverImage}`

  // Format duration as ISO 8601 duration (PT##M##S)
  const hours = Math.floor(episode.duration / 3600)
  const minutes = Math.floor((episode.duration % 3600) / 60)
  const seconds = episode.duration % 60

  let durationISO = 'PT'
  if (hours > 0) durationISO += `${hours}H`
  if (minutes > 0) durationISO += `${minutes}M`
  if (seconds > 0) durationISO += `${seconds}S`

  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    '@id': url,
    name: episode.title,
    description: episode.description,
    url,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: episode.publishedAt,
    duration: durationISO,
    ...(episode.episode && { episodeNumber: episode.episode }),
    ...(episode.season && { seasonNumber: episode.season }),
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: 'Podcast DUO',
      description: 'Estrategias prácticas para transformar tu negocio',
      url: `${SITE_CONFIG.url}/podcast`,
      webFeed: `${SITE_CONFIG.url}/podcast/feed.xml`,
      image: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/images/podcast-cover.jpg`,
      },
    },
    ...(episode.hosts &&
      episode.hosts.length > 0 && {
        actor: episode.hosts.map(host => ({
          '@type': 'Person',
          name: host.name,
          jobTitle: host.role,
        })),
      }),
    ...(episode.guests &&
      episode.guests.length > 0 && {
        guest: episode.guests.map(guest => ({
          '@type': 'Person',
          name: guest.name,
          ...(guest.role && { jobTitle: guest.role }),
          ...(guest.company && { worksFor: { '@type': 'Organization', name: guest.company } }),
        })),
      }),
    producer: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    inLanguage: 'es-DO',
    ...(episode.audioUrl && {
      associatedMedia: {
        '@type': 'MediaObject',
        contentUrl: episode.audioUrl,
      },
    }),
    ...(episode.transcript && {
      transcript: {
        '@type': 'MediaObject',
        text: episode.transcript,
      },
    }),
  }
}

// ============================================================================
// BREADCRUMB SCHEMA
// ============================================================================

export interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Generate BreadcrumbList schema for navigation
 *
 * @see https://schema.org/BreadcrumbList
 * @see https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 *
 * @example
 * ```tsx
 * const items = [
 *   { name: 'Home', url: '/' },
 *   { name: 'Blog', url: '/blog' },
 *   { name: 'Post Title', url: '/blog/post-slug' }
 * ]
 * const schema = generateBreadcrumbSchema(items)
 * ```
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Generate JSON-LD script props for React
 * Use with dangerouslySetInnerHTML
 */
export function generateStructuredDataScript(schema: object) {
  return {
    __html: JSON.stringify(schema, null, 0), // Minified for production
  }
}

/**
 * Combine multiple schemas into a single JSON-LD script
 * Useful when you need multiple schemas on one page
 *
 * @example
 * ```tsx
 * const schemas = combineSchemas([
 *   generateBlogArticleSchema(post),
 *   generateBreadcrumbSchema(breadcrumbs)
 * ])
 * ```
 */
export function combineSchemas(schemas: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }
}
