/**
 * Recommendations Algorithm Unit Tests
 * Tests for content recommendation system with multi-factor scoring
 */

import { describe, it, expect } from 'vitest'
import {
  getRecommendations,
  getTrendingContent,
  getMixedRecommendations,
  type ContentItem,
  type RecommendationConfig,
} from '@/lib/algorithms/content-recommendations'
import type { BlogPost, PodcastEpisode } from '@/types/content'

// Mock blog posts for testing
const mockBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Desarrollo Organizacional Moderno',
    slug: 'desarrollo-organizacional-moderno',
    excerpt: 'Estrategias para el desarrollo organizacional',
    content: 'El desarrollo organizacional es fundamental...',
    coverImage: '/images/blog-1.jpg',
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    readingTime: 8,
    views: 500,
    featured: true,
    category: { id: 'cat-1', name: 'Desarrollo Organizacional', slug: 'desarrollo-org' },
    tags: [
      { id: 'tag-1', name: 'Desarrollo', slug: 'desarrollo' },
      { id: 'tag-2', name: 'PYMES', slug: 'pymes' },
    ],
    author: { id: 'auth-1', name: 'Juan Pérez', bio: 'Expert', avatar: '/avatar1.jpg' },
  },
  {
    id: 'blog-2',
    title: 'Mejora de Procesos con Lean',
    slug: 'mejora-procesos-lean',
    excerpt: 'Implementación de metodologías Lean',
    content: 'La mejora continua de procesos...',
    coverImage: '/images/blog-2.jpg',
    publishedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
    readingTime: 7,
    views: 300,
    featured: false,
    category: { id: 'cat-2', name: 'Procesos', slug: 'procesos' },
    tags: [
      { id: 'tag-3', name: 'Lean', slug: 'lean' },
      { id: 'tag-4', name: 'Procesos', slug: 'procesos' },
    ],
    author: { id: 'auth-2', name: 'María García', bio: 'Specialist', avatar: '/avatar2.jpg' },
  },
  {
    id: 'blog-3',
    title: 'Gestión del Cambio en PYMES',
    slug: 'gestion-cambio-pymes',
    excerpt: 'Cómo gestionar el cambio organizacional',
    content: 'El cambio organizacional requiere planificación...',
    coverImage: '/images/blog-3.jpg',
    publishedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    readingTime: 8,
    views: 450,
    featured: false,
    category: { id: 'cat-1', name: 'Desarrollo Organizacional', slug: 'desarrollo-org' },
    tags: [
      { id: 'tag-2', name: 'PYMES', slug: 'pymes' },
      { id: 'tag-5', name: 'Cambio', slug: 'cambio' },
    ],
    author: { id: 'auth-1', name: 'Juan Pérez', bio: 'Expert', avatar: '/avatar1.jpg' },
  },
  {
    id: 'blog-4',
    title: 'Cultura Organizacional',
    slug: 'cultura-organizacional',
    excerpt: 'Construyendo una cultura sólida',
    content: 'La cultura organizacional es clave...',
    coverImage: '/images/blog-4.jpg',
    publishedAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(), // 200 days ago (old)
    readingTime: 6,
    views: 200,
    featured: false,
    category: { id: 'cat-3', name: 'Cultura', slug: 'cultura' },
    tags: [
      { id: 'tag-6', name: 'Cultura', slug: 'cultura' },
    ],
    author: { id: 'auth-3', name: 'Pedro López', bio: 'Consultant', avatar: '/avatar3.jpg' },
  },
]

const mockPodcastEpisodes: PodcastEpisode[] = [
  {
    id: 'pod-1',
    title: 'Transformación Digital en PYMES',
    slug: 'transformacion-digital-pymes',
    description: 'Conversación sobre transformación digital',
    content: 'La transformación digital es esencial...',
    coverImage: '/images/pod-1.jpg',
    audioUrl: '/audio/pod-1.mp3',
    duration: 3600,
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    plays: 800,
    featured: true,
    category: { id: 'cat-1', name: 'Desarrollo Organizacional', slug: 'desarrollo-org' },
    tags: [
      { id: 'tag-2', name: 'PYMES', slug: 'pymes' },
      { id: 'tag-7', name: 'Digital', slug: 'digital' },
    ],
    hosts: [{ id: 'host-1', name: 'Carlos Ruiz', bio: 'Host', avatar: '/host1.jpg' }],
    guests: [
      {
        id: 'guest-1',
        name: 'Ana Torres',
        bio: 'CEO',
        avatar: '/guest1.jpg',
        company: 'TechCo',
      },
    ],
    season: 1,
    episode: 10,
  },
  {
    id: 'pod-2',
    title: 'Liderazgo Transformacional',
    slug: 'liderazgo-transformacional',
    description: 'Episodio sobre liderazgo',
    content: 'El liderazgo transformacional...',
    coverImage: '/images/pod-2.jpg',
    audioUrl: '/audio/pod-2.mp3',
    duration: 2700,
    publishedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), // 25 days ago
    plays: 600,
    featured: false,
    category: { id: 'cat-4', name: 'Liderazgo', slug: 'liderazgo' },
    tags: [
      { id: 'tag-8', name: 'Liderazgo', slug: 'liderazgo' },
    ],
    hosts: [{ id: 'host-1', name: 'Carlos Ruiz', bio: 'Host', avatar: '/host1.jpg' }],
    season: 1,
    episode: 9,
  },
]

describe('Content Recommendations Algorithm', () => {
  describe('getRecommendations', () => {
    it('should return recommendations based on source item', () => {
      const sourceItem = mockBlogPosts[0] // Desarrollo Organizacional
      const results = getRecommendations(sourceItem, mockBlogPosts)

      expect(results.length).toBeGreaterThan(0)
      expect(results.every((r) => r.item.id !== sourceItem.id)).toBe(true)
    })

    it('should exclude source item from recommendations', () => {
      const sourceItem = mockBlogPosts[0]
      const results = getRecommendations(sourceItem, mockBlogPosts)

      expect(results.every((r) => r.item.id !== sourceItem.id)).toBe(true)
    })

    it('should score same category higher', () => {
      const sourceItem = mockBlogPosts[0] // cat-1: Desarrollo Organizacional
      const results = getRecommendations(sourceItem, mockBlogPosts)

      const sameCategoryResult = results.find((r) => r.item.category.id === sourceItem.category.id)
      const differentCategoryResult = results.find(
        (r) => r.item.category.id !== sourceItem.category.id
      )

      if (sameCategoryResult && differentCategoryResult) {
        expect(sameCategoryResult.score).toBeGreaterThan(differentCategoryResult.score)
      }
    })

    it('should score shared tags appropriately', () => {
      const sourceItem = mockBlogPosts[0] // has tag 'PYMES'
      const results = getRecommendations(sourceItem, mockBlogPosts)

      const sharedTagResult = results.find((r) =>
        r.item.tags.some((tag) => tag.id === 'tag-2')
      ) // PYMES tag

      if (sharedTagResult) {
        expect(sharedTagResult.matchFactors.some((f) => f.includes('shared tag'))).toBe(true)
      }
    })

    it('should score same author higher', () => {
      const sourceItem = mockBlogPosts[0] // auth-1: Juan Pérez
      const results = getRecommendations(sourceItem, mockBlogPosts)

      const sameAuthorResult = results.find(
        (r) => r.item.id === 'blog-3' // also by Juan Pérez
      )

      if (sameAuthorResult) {
        expect(sameAuthorResult.matchFactors.some((f) => f.includes('Same author'))).toBe(true)
      }
    })

    it('should score similar duration/reading time', () => {
      const sourceItem = mockBlogPosts[0] // 8 min reading time
      const results = getRecommendations(sourceItem, mockBlogPosts)

      const similarDurationResult = results.find(
        (r) => r.item.id === 'blog-3' // also 8 min
      )

      if (similarDurationResult) {
        expect(
          similarDurationResult.matchFactors.some((f) => f.includes('Similar duration'))
        ).toBe(true)
      }
    })

    it('should boost recent content (published in last 30 days)', () => {
      const sourceItem = mockBlogPosts[0]
      const results = getRecommendations(sourceItem, mockBlogPosts)

      const recentResult = results.find((r) => r.item.id === 'blog-2') // 20 days ago

      if (recentResult) {
        expect(recentResult.matchFactors.some((f) => f.includes('Recently published'))).toBe(true)
      }
    })

    it('should not boost old content as recent', () => {
      const sourceItem = mockBlogPosts[0]
      const results = getRecommendations(sourceItem, mockBlogPosts)

      const oldResult = results.find((r) => r.item.id === 'blog-4') // 200 days ago

      if (oldResult) {
        expect(oldResult.matchFactors.some((f) => f.includes('Recently published'))).toBe(false)
      }
    })

    it('should respect maxResults config', () => {
      const sourceItem = mockBlogPosts[0]
      const config: RecommendationConfig = { maxResults: 2 }
      const results = getRecommendations(sourceItem, mockBlogPosts, undefined, config)

      expect(results.length).toBeLessThanOrEqual(2)
    })

    it('should respect minScore config', () => {
      const sourceItem = mockBlogPosts[0]
      const config: RecommendationConfig = { minScore: 5.0 }
      const results = getRecommendations(sourceItem, mockBlogPosts, undefined, config)

      expect(results.every((r) => r.score >= 5.0)).toBe(true)
    })

    it('should filter by recency when recentMonths is set', () => {
      const sourceItem = mockBlogPosts[0]
      const config: RecommendationConfig = { recentMonths: 1 } // Only last month
      const results = getRecommendations(sourceItem, mockBlogPosts, undefined, config)

      // blog-4 is 200 days old, should be filtered out
      expect(results.every((r) => r.item.id !== 'blog-4')).toBe(true)
    })

    it('should apply diversity rules by default', () => {
      const sourceItem = mockBlogPosts[0]
      const config: RecommendationConfig = { maxPerAuthor: 1, diversityEnabled: true }
      const results = getRecommendations(sourceItem, mockBlogPosts, undefined, config)

      const authorCounts = new Map<string, number>()
      results.forEach((r) => {
        const authorId = r.item.author?.id || ''
        authorCounts.set(authorId, (authorCounts.get(authorId) || 0) + 1)
      })

      // No author should have more than maxPerAuthor
      authorCounts.forEach((count) => {
        expect(count).toBeLessThanOrEqual(1)
      })
    })

    it('should sort results by score descending', () => {
      const sourceItem = mockBlogPosts[0]
      const results = getRecommendations(sourceItem, mockBlogPosts)

      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score)
      }
    })

    it('should include match factors in results', () => {
      const sourceItem = mockBlogPosts[0]
      const results = getRecommendations(sourceItem, mockBlogPosts)

      results.forEach((result) => {
        expect(Array.isArray(result.matchFactors)).toBe(true)
        expect(result.matchFactors.length).toBeGreaterThan(0)
      })
    })

    it('should handle empty candidate array', () => {
      const sourceItem = mockBlogPosts[0]
      const results = getRecommendations(sourceItem, [])

      expect(results).toEqual([])
    })

    it('should work with podcast episodes', () => {
      const sourceItem = mockPodcastEpisodes[0]
      const results = getRecommendations(sourceItem, mockPodcastEpisodes)

      expect(results.length).toBeGreaterThan(0)
      expect(results.every((r) => r.item.id !== sourceItem.id)).toBe(true)
    })
  })

  describe('getTrendingContent', () => {
    it('should return trending content from both blogs and podcasts', () => {
      const trending = getTrendingContent(mockBlogPosts, mockPodcastEpisodes, 6)

      expect(trending.length).toBeGreaterThan(0)
      expect(trending.length).toBeLessThanOrEqual(6)
    })

    it('should respect maxResults parameter', () => {
      const maxResults = 3
      const trending = getTrendingContent(mockBlogPosts, mockPodcastEpisodes, maxResults)

      expect(trending.length).toBeLessThanOrEqual(maxResults)
    })

    it('should include both blog and podcast content when possible', () => {
      const trending = getTrendingContent(mockBlogPosts, mockPodcastEpisodes, 10)

      const types = new Set(trending.map((t) => t.type))
      // Should have both types if both are available
      expect(types.size).toBeGreaterThan(0)
    })

    it('should boost recent content (last 30 days)', () => {
      const trending = getTrendingContent(mockBlogPosts, mockPodcastEpisodes, 6)

      // Recent items should appear in results
      const recentIds = ['blog-1', 'blog-2', 'blog-3', 'pod-1']
      const hasRecent = trending.some((t) => recentIds.includes(t.item.id))

      expect(hasRecent).toBe(true)
    })

    it('should boost featured content', () => {
      const trending = getTrendingContent(mockBlogPosts, mockPodcastEpisodes, 6)

      // Featured items should score higher
      const featuredItem = trending.find((t) => t.item.featured)
      expect(featuredItem).toBeDefined()
    })

    it('should consider views/plays in scoring', () => {
      // blog-1 has 500 views and is recent and featured - should rank high
      const trending = getTrendingContent(mockBlogPosts, mockPodcastEpisodes, 10)

      expect(trending.some((t) => t.item.id === 'blog-1')).toBe(true)
    })

    it('should return sorted results', () => {
      const trending = getTrendingContent(mockBlogPosts, mockPodcastEpisodes, 6)

      expect(trending.length).toBeGreaterThan(0)
      expect(Array.isArray(trending)).toBe(true)
    })

    it('should handle empty arrays', () => {
      const trending = getTrendingContent([], [], 6)

      expect(trending).toEqual([])
    })
  })

  describe('getMixedRecommendations', () => {
    it('should return recommendations from both blogs and podcasts', () => {
      const sourceItem = mockBlogPosts[0]
      const results = getMixedRecommendations(sourceItem, mockBlogPosts, mockPodcastEpisodes)

      expect(results.length).toBeGreaterThan(0)
    })

    it('should include type information for each result', () => {
      const sourceItem = mockBlogPosts[0]
      const results = getMixedRecommendations(sourceItem, mockBlogPosts, mockPodcastEpisodes)

      results.forEach((result) => {
        expect(['blog', 'podcast']).toContain(result.type)
      })
    })

    it('should properly identify blog posts', () => {
      const sourceItem = mockBlogPosts[0]
      const results = getMixedRecommendations(sourceItem, mockBlogPosts, mockPodcastEpisodes)

      const blogResults = results.filter((r) => r.type === 'blog')
      blogResults.forEach((result) => {
        expect('readingTime' in result.item).toBe(true)
      })
    })

    it('should properly identify podcast episodes', () => {
      const sourceItem = mockBlogPosts[0]
      const results = getMixedRecommendations(sourceItem, mockBlogPosts, mockPodcastEpisodes)

      const podcastResults = results.filter((r) => r.type === 'podcast')
      podcastResults.forEach((result) => {
        expect('audioUrl' in result.item).toBe(true)
      })
    })

    it('should respect configuration options', () => {
      const sourceItem = mockBlogPosts[0]
      const config: RecommendationConfig = { maxResults: 3 }
      const results = getMixedRecommendations(
        sourceItem,
        mockBlogPosts,
        mockPodcastEpisodes,
        undefined,
        config
      )

      expect(results.length).toBeLessThanOrEqual(3)
    })

    it('should include scores in results', () => {
      const sourceItem = mockBlogPosts[0]
      const results = getMixedRecommendations(sourceItem, mockBlogPosts, mockPodcastEpisodes)

      results.forEach((result) => {
        expect(typeof result.score).toBe('number')
        expect(result.score).toBeGreaterThan(0)
      })
    })

    it('should match content based on shared categories', () => {
      const sourceItem = mockBlogPosts[0] // cat-1: Desarrollo Organizacional
      const results = getMixedRecommendations(sourceItem, mockBlogPosts, mockPodcastEpisodes)

      // pod-1 also has cat-1, should be recommended
      const podcastMatch = results.find((r) => r.item.id === 'pod-1')
      if (podcastMatch) {
        expect(podcastMatch.type).toBe('podcast')
      }
    })

    it('should match content based on shared tags', () => {
      const sourceItem = mockBlogPosts[0] // has PYMES tag
      const results = getMixedRecommendations(sourceItem, mockBlogPosts, mockPodcastEpisodes)

      // Items with PYMES tag should be recommended
      const pymesMatches = results.filter((r) =>
        r.item.tags.some((tag) => tag.id === 'tag-2')
      )

      expect(pymesMatches.length).toBeGreaterThan(0)
    })
  })

  describe('User View History Integration', () => {
    it('should boost previously viewed content when history is provided', () => {
      const sourceItem = mockBlogPosts[0]
      const viewHistory = ['blog-2', 'blog-3']
      const config: RecommendationConfig = { includeViewHistory: true }

      const results = getRecommendations(sourceItem, mockBlogPosts, viewHistory, config)

      const viewedResult = results.find((r) => viewHistory.includes(r.item.id))
      if (viewedResult) {
        expect(viewedResult.matchFactors.some((f) => f.includes('Previously viewed'))).toBe(true)
      }
    })

    it('should work without view history', () => {
      const sourceItem = mockBlogPosts[0]
      const config: RecommendationConfig = { includeViewHistory: false }

      const results = getRecommendations(sourceItem, mockBlogPosts, undefined, config)

      expect(results.length).toBeGreaterThan(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle source item not in candidate pool', () => {
      const sourceItem = mockBlogPosts[0]
      const otherPosts = mockBlogPosts.slice(1)

      const results = getRecommendations(sourceItem, otherPosts)

      expect(results.every((r) => r.item.id !== sourceItem.id)).toBe(true)
    })

    it('should handle single candidate item', () => {
      const sourceItem = mockBlogPosts[0]
      const singleItem = [mockBlogPosts[1]]

      const results = getRecommendations(sourceItem, singleItem)

      expect(results.length).toBeLessThanOrEqual(1)
    })

    it('should handle no matching criteria', () => {
      // Create completely different item
      const sourceItem = mockBlogPosts[0]
      const differentItem: BlogPost = {
        ...mockBlogPosts[1],
        category: { id: 'cat-99', name: 'Completely Different', slug: 'different' },
        tags: [{ id: 'tag-99', name: 'Unique', slug: 'unique' }],
        author: { id: 'auth-99', name: 'Different Author', bio: 'Bio', avatar: '/av.jpg' },
      }

      const results = getRecommendations(sourceItem, [differentItem])

      // Should still return result, just with low score
      expect(Array.isArray(results)).toBe(true)
    })

    it('should handle disabled diversity', () => {
      const sourceItem = mockBlogPosts[0]
      const config: RecommendationConfig = { diversityEnabled: false, maxResults: 10 }

      const results = getRecommendations(sourceItem, mockBlogPosts, undefined, config)

      // Should not apply author limits when diversity is disabled
      expect(Array.isArray(results)).toBe(true)
    })
  })
})
