import { BlogPost, Category } from '@/types/content'

/**
 * Format date to Spanish locale
 */
export function formatDate(date: string): string {
  const dateObj = new Date(date)
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj)
}

/**
 * Format date in short format (e.g., "15 Ene 2025")
 */
export function formatDateShort(date: string): string {
  const dateObj = new Date(date)
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj)
}

/**
 * Calculate reading time based on content
 * Average reading speed: 200 words per minute in Spanish
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}

/**
 * Get related blog posts based on category and tags
 */
export function getRelatedPosts(
  currentPostId: string,
  category: Category,
  allPosts: BlogPost[],
  limit: number = 3
): BlogPost[] {
  const currentPost = allPosts.find(post => post.id === currentPostId)
  if (!currentPost) return []

  // Get posts with same category or tags
  const related = allPosts
    .filter(post => post.id !== currentPostId)
    .map(post => {
      let score = 0

      // Same category = 10 points
      if (post.category.id === category.id) {
        score += 10
      }

      // Each matching tag = 5 points
      const matchingTags = post.tags.filter(tag => currentPost.tags.some(t => t.id === tag.id))
      score += matchingTags.length * 5

      return { post, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      // Sort by score first, then by date
      if (b.score === a.score) {
        return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime()
      }
      return b.score - a.score
    })
    .slice(0, limit)
    .map(({ post }) => post)

  return related
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Get time ago in Spanish (e.g., "hace 2 días")
 */
export function getTimeAgo(date: string): string {
  const now = new Date()
  const dateObj = new Date(date)
  const diffInMs = now.getTime() - dateObj.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return 'Hoy'
  if (diffInDays === 1) return 'Ayer'
  if (diffInDays < 7) return `Hace ${diffInDays} días`
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `Hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`
  }
  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30)
    return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`
  }
  const years = Math.floor(diffInDays / 365)
  return `Hace ${years} ${years === 1 ? 'año' : 'años'}`
}

/**
 * Create SEO-friendly URL slug
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
}
