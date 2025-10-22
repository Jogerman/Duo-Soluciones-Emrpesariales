import { BlogPost, PodcastEpisode } from '@/types/content'

/**
 * Search result with relevance score
 */
export interface SearchResult {
  id: string
  type: 'blog' | 'podcast'
  title: string
  description: string
  slug: string
  coverImage: string
  publishedAt: string
  relevanceScore: number
  category: string
  tags: string[]
}

/**
 * Search options for filtering and sorting
 */
export interface SearchOptions {
  query: string
  type?: 'all' | 'blog' | 'podcast'
  limit?: number
  sortBy?: 'relevance' | 'date'
}

/**
 * Normalized text for search matching
 * Removes accents, converts to lowercase, and trims
 */
function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

/**
 * Calculate relevance score based on weighted matches
 *
 * Weights:
 * - Title match: 3
 * - Content/description match: 2
 * - Tags/guest names match: 1.5
 */
function calculateRelevanceScore(
  item: BlogPost | PodcastEpisode,
  query: string,
  type: 'blog' | 'podcast'
): number {
  const normalizedQuery = normalizeText(query)
  const queryTerms = normalizedQuery.split(/\s+/)

  let score = 0

  // Title match (weight: 3)
  const normalizedTitle = normalizeText(item.title)
  queryTerms.forEach(term => {
    if (normalizedTitle.includes(term)) {
      score += 3
      // Bonus for exact title match
      if (normalizedTitle === normalizedQuery) {
        score += 5
      }
      // Bonus for title starts with query
      if (normalizedTitle.startsWith(normalizedQuery)) {
        score += 2
      }
    }
  })

  // Content/Description match (weight: 2)
  if (type === 'blog') {
    const blogPost = item as BlogPost
    const normalizedContent = normalizeText(blogPost.content + ' ' + blogPost.excerpt)
    queryTerms.forEach(term => {
      const matches = (normalizedContent.match(new RegExp(term, 'g')) || []).length
      score += Math.min(matches, 10) * 2 // Cap at 10 matches per term
    })
  } else {
    const episode = item as PodcastEpisode
    const normalizedDescription = normalizeText(episode.description + ' ' + episode.content)
    queryTerms.forEach(term => {
      const matches = (normalizedDescription.match(new RegExp(term, 'g')) || []).length
      score += Math.min(matches, 10) * 2 // Cap at 10 matches per term
    })
  }

  // Tags match (weight: 1.5)
  item.tags.forEach(tag => {
    const normalizedTag = normalizeText(tag.name)
    queryTerms.forEach(term => {
      if (normalizedTag.includes(term)) {
        score += 1.5
      }
    })
  })

  // Category match (weight: 1.5)
  const normalizedCategory = normalizeText(item.category.name)
  queryTerms.forEach(term => {
    if (normalizedCategory.includes(term)) {
      score += 1.5
    }
  })

  // Guest names match for podcasts (weight: 1.5)
  if (type === 'podcast') {
    const episode = item as PodcastEpisode
    episode.guests?.forEach(guest => {
      const normalizedGuestName = normalizeText(guest.name)
      queryTerms.forEach(term => {
        if (normalizedGuestName.includes(term)) {
          score += 1.5
        }
      })
    })

    // Host names match
    episode.hosts.forEach(host => {
      const normalizedHostName = normalizeText(host.name)
      queryTerms.forEach(term => {
        if (normalizedHostName.includes(term)) {
          score += 1.5
        }
      })
    })
  }

  // Author match for blog posts (weight: 1.5)
  if (type === 'blog') {
    const blogPost = item as BlogPost
    const normalizedAuthor = normalizeText(blogPost.author.name)
    queryTerms.forEach(term => {
      if (normalizedAuthor.includes(term)) {
        score += 1.5
      }
    })
  }

  return score
}

/**
 * Search across blog posts
 */
export function searchBlogPosts(
  posts: BlogPost[],
  query: string
): SearchResult[] {
  if (!query.trim()) {
    return []
  }

  const results: SearchResult[] = []

  posts.forEach(post => {
    const score = calculateRelevanceScore(post, query, 'blog')

    if (score > 0) {
      results.push({
        id: post.id,
        type: 'blog',
        title: post.title,
        description: post.excerpt,
        slug: post.slug,
        coverImage: post.coverImage,
        publishedAt: post.publishedAt,
        relevanceScore: score,
        category: post.category.name,
        tags: post.tags.map(tag => tag.name),
      })
    }
  })

  return results
}

/**
 * Search across podcast episodes
 */
export function searchPodcastEpisodes(
  episodes: PodcastEpisode[],
  query: string
): SearchResult[] {
  if (!query.trim()) {
    return []
  }

  const results: SearchResult[] = []

  episodes.forEach(episode => {
    const score = calculateRelevanceScore(episode, query, 'podcast')

    if (score > 0) {
      results.push({
        id: episode.id,
        type: 'podcast',
        title: episode.title,
        description: episode.description,
        slug: episode.slug,
        coverImage: episode.coverImage,
        publishedAt: episode.publishedAt,
        relevanceScore: score,
        category: episode.category.name,
        tags: episode.tags.map(tag => tag.name),
      })
    }
  })

  return results
}

/**
 * Search across all content (blog + podcast)
 */
export function searchAll(
  posts: BlogPost[],
  episodes: PodcastEpisode[],
  options: SearchOptions
): SearchResult[] {
  const { query, type = 'all', limit = 10, sortBy = 'relevance' } = options

  if (!query.trim()) {
    return []
  }

  let results: SearchResult[] = []

  // Search based on type filter
  if (type === 'all' || type === 'blog') {
    results = [...results, ...searchBlogPosts(posts, query)]
  }

  if (type === 'all' || type === 'podcast') {
    results = [...results, ...searchPodcastEpisodes(episodes, query)]
  }

  // Sort results
  if (sortBy === 'relevance') {
    results.sort((a, b) => b.relevanceScore - a.relevanceScore)
  } else if (sortBy === 'date') {
    results.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  }

  // Apply limit
  return results.slice(0, limit)
}

/**
 * Get search suggestions based on partial query
 * Returns top matches for autocomplete
 */
export function getSearchSuggestions(
  posts: BlogPost[],
  episodes: PodcastEpisode[],
  query: string,
  limit: number = 5
): SearchResult[] {
  if (!query.trim() || query.length < 2) {
    return []
  }

  const results = searchAll(posts, episodes, {
    query,
    type: 'all',
    limit: limit * 2, // Get more results to ensure variety
    sortBy: 'relevance',
  })

  // Ensure we have a mix of blog and podcast suggestions
  const blogResults = results.filter(r => r.type === 'blog')
  const podcastResults = results.filter(r => r.type === 'podcast')

  const suggestions: SearchResult[] = []
  const halfLimit = Math.ceil(limit / 2)

  // Add top blog results
  suggestions.push(...blogResults.slice(0, halfLimit))

  // Add top podcast results
  suggestions.push(...podcastResults.slice(0, halfLimit))

  // If we don't have enough, fill with remaining results
  if (suggestions.length < limit) {
    const remaining = results.filter(r => !suggestions.includes(r))
    suggestions.push(...remaining.slice(0, limit - suggestions.length))
  }

  return suggestions.slice(0, limit)
}
