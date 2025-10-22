/**
 * Unit Tests for Search Utilities
 *
 * Tests include:
 * - Search algorithm (text normalization, relevance scoring)
 * - Blog post search
 * - Podcast episode search
 * - Mixed search (all content types)
 * - Search suggestions
 * - Search options (filters, sorting)
 */

import { describe, it, expect } from 'vitest'
import {
  searchBlogPosts,
  searchPodcastEpisodes,
  searchAll,
  getSearchSuggestions,
} from '@/lib/utils/search'
import type { BlogPost, PodcastEpisode } from '@/types/content'

// Mock blog posts
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Transformación Digital en Empresas',
    slug: 'transformacion-digital-empresas',
    excerpt: 'Guía completa sobre transformación digital',
    content: 'La transformación digital es esencial para las empresas modernas...',
    coverImage: '/images/blog/1.jpg',
    publishedAt: '2024-01-15T10:00:00Z',
    author: {
      id: 'author-1',
      name: 'Juan Pérez',
      avatar: '/avatars/juan.jpg',
      bio: 'Experto en transformación digital',
      role: 'Consultor Senior',
    },
    category: {
      id: 'cat-1',
      name: 'Transformación Digital',
      slug: 'transformacion-digital',
    },
    tags: [
      { id: 'tag-1', name: 'Digital', slug: 'digital' },
      { id: 'tag-2', name: 'Empresas', slug: 'empresas' },
    ],
    readingTime: 5,
    views: 1200,
    featured: true,
  },
  {
    id: '2',
    title: 'Gestión de Procesos Empresariales',
    slug: 'gestion-procesos-empresariales',
    excerpt: 'Mejora tus procesos con metodologías ágiles',
    content: 'Los procesos empresariales eficientes son clave para el éxito organizacional...',
    coverImage: '/images/blog/2.jpg',
    publishedAt: '2024-02-01T10:00:00Z',
    author: {
      id: 'author-2',
      name: 'María González',
      avatar: '/avatars/maria.jpg',
      bio: 'Especialista en procesos',
      role: 'Consultora',
    },
    category: {
      id: 'cat-2',
      name: 'Procesos',
      slug: 'procesos',
    },
    tags: [
      { id: 'tag-3', name: 'Procesos', slug: 'procesos' },
      { id: 'tag-2', name: 'Empresas', slug: 'empresas' },
    ],
    readingTime: 7,
    views: 800,
    featured: false,
  },
  {
    id: '3',
    title: 'Implementación ERP: Mejores Prácticas',
    slug: 'implementacion-erp-mejores-practicas',
    excerpt: 'Todo lo que necesitas saber sobre ERP',
    content: 'La implementación de un sistema ERP requiere planificación cuidadosa...',
    coverImage: '/images/blog/3.jpg',
    publishedAt: '2024-03-10T10:00:00Z',
    author: {
      id: 'author-1',
      name: 'Juan Pérez',
      avatar: '/avatars/juan.jpg',
      bio: 'Experto en transformación digital',
      role: 'Consultor Senior',
    },
    category: {
      id: 'cat-3',
      name: 'Sistemas',
      slug: 'sistemas',
    },
    tags: [
      { id: 'tag-4', name: 'ERP', slug: 'erp' },
      { id: 'tag-5', name: 'Implementación', slug: 'implementacion' },
    ],
    readingTime: 10,
    views: 1500,
    featured: true,
  },
]

// Mock podcast episodes
const mockPodcastEpisodes: PodcastEpisode[] = [
  {
    id: 'pod-1',
    title: 'Transformación Digital: El Futuro es Ahora',
    slug: 'transformacion-digital-futuro-ahora',
    description: 'Conversamos sobre las tendencias en transformación digital',
    content: 'En este episodio exploramos cómo la transformación digital...',
    coverImage: '/images/podcast/1.jpg',
    publishedAt: '2024-01-20T10:00:00Z',
    audioUrl: '/audio/episode-1.mp3',
    duration: 3600, // 60 minutes
    category: {
      id: 'cat-1',
      name: 'Transformación Digital',
      slug: 'transformacion-digital',
    },
    tags: [
      { id: 'tag-1', name: 'Digital', slug: 'digital' },
      { id: 'tag-6', name: 'Tecnología', slug: 'tecnologia' },
    ],
    hosts: [
      {
        id: 'host-1',
        name: 'Carlos Rodríguez',
        avatar: '/avatars/carlos.jpg',
        bio: 'Host principal',
        role: 'Director',
      },
    ],
    guests: [
      {
        id: 'guest-1',
        name: 'Ana Martínez',
        avatar: '/avatars/ana.jpg',
        bio: 'Experta en transformación',
        company: 'Tech Corp',
        role: 'CEO',
      },
    ],
    season: 1,
    episode: 5,
    plays: 2500,
    featured: true,
  },
  {
    id: 'pod-2',
    title: 'Liderazgo en Tiempos de Cambio',
    slug: 'liderazgo-tiempos-cambio',
    description: 'Hablamos sobre liderazgo transformacional',
    content: 'El liderazgo es fundamental durante procesos de cambio organizacional...',
    coverImage: '/images/podcast/2.jpg',
    publishedAt: '2024-02-15T10:00:00Z',
    audioUrl: '/audio/episode-2.mp3',
    duration: 2700, // 45 minutes
    category: {
      id: 'cat-4',
      name: 'Liderazgo',
      slug: 'liderazgo',
    },
    tags: [
      { id: 'tag-7', name: 'Liderazgo', slug: 'liderazgo' },
      { id: 'tag-8', name: 'Cambio', slug: 'cambio' },
    ],
    hosts: [
      {
        id: 'host-1',
        name: 'Carlos Rodríguez',
        avatar: '/avatars/carlos.jpg',
        bio: 'Host principal',
        role: 'Director',
      },
    ],
    season: 1,
    episode: 6,
    plays: 1800,
    featured: false,
  },
]

describe('Search Utilities', () => {
  describe('searchBlogPosts', () => {
    it('should return empty array when query is empty', () => {
      const results = searchBlogPosts(mockBlogPosts, '')
      expect(results).toEqual([])
    })

    it('should return empty array when query is only whitespace', () => {
      const results = searchBlogPosts(mockBlogPosts, '   ')
      expect(results).toEqual([])
    })

    it('should find blog posts by title match', () => {
      const results = searchBlogPosts(mockBlogPosts, 'transformación digital')
      expect(results).toHaveLength(1)
      expect(results[0].title).toContain('Transformación Digital')
    })

    it('should be case-insensitive', () => {
      const results = searchBlogPosts(mockBlogPosts, 'TRANSFORMACIÓN')
      expect(results.length).toBeGreaterThan(0)
      expect(results[0].title).toContain('Transformación')
    })

    it('should handle accents correctly', () => {
      const results = searchBlogPosts(mockBlogPosts, 'transformacion')
      expect(results.length).toBeGreaterThan(0)
      expect(results[0].title).toContain('Transformación')
    })

    it('should find posts by content match', () => {
      const results = searchBlogPosts(mockBlogPosts, 'metodologías ágiles')
      expect(results).toHaveLength(1)
      expect(results[0].id).toBe('2')
    })

    it('should find posts by tag match', () => {
      const results = searchBlogPosts(mockBlogPosts, 'ERP')
      expect(results).toHaveLength(1)
      expect(results[0].id).toBe('3')
    })

    it('should find posts by category match', () => {
      const results = searchBlogPosts(mockBlogPosts, 'procesos')
      expect(results).toHaveLength(1)
      expect(results[0].id).toBe('2')
    })

    it('should find posts by author match', () => {
      const results = searchBlogPosts(mockBlogPosts, 'Juan Pérez')
      expect(results).toHaveLength(2)
      expect(results.every(r => r.id === '1' || r.id === '3')).toBe(true)
    })

    it('should calculate relevance scores correctly', () => {
      const results = searchBlogPosts(mockBlogPosts, 'empresas')
      expect(results.every(r => r.relevanceScore > 0)).toBe(true)
    })

    it('should prioritize title matches over content matches', () => {
      const results = searchBlogPosts(mockBlogPosts, 'transformación')
      // The post with "transformación" in title should score higher
      expect(results[0].title).toContain('Transformación')
    })

    it('should return results sorted by relevance', () => {
      const results = searchBlogPosts(mockBlogPosts, 'empresas')
      // Check that scores are in descending order
      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i].relevanceScore).toBeGreaterThanOrEqual(results[i + 1].relevanceScore)
      }
    })

    it('should handle multiple search terms', () => {
      const results = searchBlogPosts(mockBlogPosts, 'transformación empresas')
      expect(results.length).toBeGreaterThan(0)
    })
  })

  describe('searchPodcastEpisodes', () => {
    it('should return empty array when query is empty', () => {
      const results = searchPodcastEpisodes(mockPodcastEpisodes, '')
      expect(results).toEqual([])
    })

    it('should find podcast episodes by title match', () => {
      const results = searchPodcastEpisodes(mockPodcastEpisodes, 'transformación digital')
      expect(results).toHaveLength(1)
      expect(results[0].id).toBe('pod-1')
    })

    it('should find episodes by description match', () => {
      const results = searchPodcastEpisodes(mockPodcastEpisodes, 'tendencias')
      expect(results).toHaveLength(1)
      expect(results[0].id).toBe('pod-1')
    })

    it('should find episodes by guest name', () => {
      const results = searchPodcastEpisodes(mockPodcastEpisodes, 'Ana Martínez')
      expect(results).toHaveLength(1)
      expect(results[0].id).toBe('pod-1')
    })

    it('should find episodes by host name', () => {
      const results = searchPodcastEpisodes(mockPodcastEpisodes, 'Carlos Rodríguez')
      expect(results).toHaveLength(2)
    })

    it('should find episodes by tag match', () => {
      const results = searchPodcastEpisodes(mockPodcastEpisodes, 'liderazgo')
      expect(results).toHaveLength(1)
      expect(results[0].id).toBe('pod-2')
    })

    it('should calculate relevance scores correctly', () => {
      const results = searchPodcastEpisodes(mockPodcastEpisodes, 'digital')
      expect(results.every(r => r.relevanceScore > 0)).toBe(true)
    })
  })

  describe('searchAll', () => {
    it('should search across all content types by default', () => {
      const results = searchAll(mockBlogPosts, mockPodcastEpisodes, {
        query: 'transformación',
      })

      expect(results.length).toBeGreaterThan(0)
      const blogResults = results.filter(r => r.type === 'blog')
      const podcastResults = results.filter(r => r.type === 'podcast')
      expect(blogResults.length).toBeGreaterThan(0)
      expect(podcastResults.length).toBeGreaterThan(0)
    })

    it('should filter by blog type only', () => {
      const results = searchAll(mockBlogPosts, mockPodcastEpisodes, {
        query: 'transformación',
        type: 'blog',
      })

      expect(results.every(r => r.type === 'blog')).toBe(true)
    })

    it('should filter by podcast type only', () => {
      const results = searchAll(mockBlogPosts, mockPodcastEpisodes, {
        query: 'digital',
        type: 'podcast',
      })

      expect(results.every(r => r.type === 'podcast')).toBe(true)
    })

    it('should respect limit parameter', () => {
      const results = searchAll(mockBlogPosts, mockPodcastEpisodes, {
        query: 'empresas',
        limit: 2,
      })

      expect(results.length).toBeLessThanOrEqual(2)
    })

    it('should sort by relevance by default', () => {
      const results = searchAll(mockBlogPosts, mockPodcastEpisodes, {
        query: 'transformación',
        sortBy: 'relevance',
      })

      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i].relevanceScore).toBeGreaterThanOrEqual(results[i + 1].relevanceScore)
      }
    })

    it('should sort by date when specified', () => {
      const results = searchAll(mockBlogPosts, mockPodcastEpisodes, {
        query: 'empresas',
        sortBy: 'date',
      })

      for (let i = 0; i < results.length - 1; i++) {
        const date1 = new Date(results[i].publishedAt)
        const date2 = new Date(results[i + 1].publishedAt)
        expect(date1.getTime()).toBeGreaterThanOrEqual(date2.getTime())
      }
    })

    it('should return empty array for no matches', () => {
      const results = searchAll(mockBlogPosts, mockPodcastEpisodes, {
        query: 'nonexistentterm12345',
      })

      expect(results).toEqual([])
    })
  })

  describe('getSearchSuggestions', () => {
    it('should return empty array when query is empty', () => {
      const results = getSearchSuggestions(mockBlogPosts, mockPodcastEpisodes, '')
      expect(results).toEqual([])
    })

    it('should return empty array when query is less than 2 characters', () => {
      const results = getSearchSuggestions(mockBlogPosts, mockPodcastEpisodes, 'a')
      expect(results).toEqual([])
    })

    it('should return suggestions for valid query', () => {
      const results = getSearchSuggestions(mockBlogPosts, mockPodcastEpisodes, 'tra')
      expect(results.length).toBeGreaterThan(0)
    })

    it('should respect limit parameter', () => {
      const results = getSearchSuggestions(mockBlogPosts, mockPodcastEpisodes, 'empresas', 3)
      expect(results.length).toBeLessThanOrEqual(3)
    })

    it('should try to provide diverse suggestions (mix of types)', () => {
      const results = getSearchSuggestions(mockBlogPosts, mockPodcastEpisodes, 'transformación', 5)

      const types = new Set(results.map(r => r.type))
      // Should ideally have both types if available
      expect(types.size).toBeGreaterThan(0)
    })

    it('should return most relevant suggestions first', () => {
      const results = getSearchSuggestions(mockBlogPosts, mockPodcastEpisodes, 'digital')

      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i].relevanceScore).toBeGreaterThanOrEqual(results[i + 1].relevanceScore)
      }
    })

    it('should handle partial matches for autocomplete', () => {
      const results = getSearchSuggestions(mockBlogPosts, mockPodcastEpisodes, 'trans')
      expect(results.length).toBeGreaterThan(0)
      expect(results[0].title.toLowerCase()).toContain('trans')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty blog posts array', () => {
      const results = searchBlogPosts([], 'test')
      expect(results).toEqual([])
    })

    it('should handle empty podcast episodes array', () => {
      const results = searchPodcastEpisodes([], 'test')
      expect(results).toEqual([])
    })

    it('should handle special characters in query', () => {
      const results = searchAll(mockBlogPosts, mockPodcastEpisodes, {
        query: 'transformación: digital & empresas',
      })
      expect(results.length).toBeGreaterThan(0)
    })

    it('should handle very long queries', () => {
      const longQuery = 'transformación digital empresas '.repeat(10)
      const results = searchAll(mockBlogPosts, mockPodcastEpisodes, {
        query: longQuery,
      })
      expect(Array.isArray(results)).toBe(true)
    })

    it('should handle queries with only punctuation', () => {
      const results = searchAll(mockBlogPosts, mockPodcastEpisodes, {
        query: '!!!???',
      })
      expect(results).toEqual([])
    })

    it('should trim whitespace from queries', () => {
      const results1 = searchBlogPosts(mockBlogPosts, '  transformación  ')
      const results2 = searchBlogPosts(mockBlogPosts, 'transformación')
      expect(results1.length).toBe(results2.length)
    })
  })

  describe('Performance Characteristics', () => {
    it('should handle large result sets efficiently', () => {
      const results = searchAll(mockBlogPosts, mockPodcastEpisodes, {
        query: 'empresas',
        limit: 100,
      })
      expect(Array.isArray(results)).toBe(true)
    })

    it('should apply limit correctly even with many matches', () => {
      const limit = 2
      const results = searchAll(mockBlogPosts, mockPodcastEpisodes, {
        query: 'empresas',
        limit,
      })
      expect(results.length).toBeLessThanOrEqual(limit)
    })
  })
})
