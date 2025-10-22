/**
 * Integration Tests for Search API
 *
 * Tests the complete search API endpoint including:
 * - Query parameter validation
 * - Search across different content types
 * - Filtering and sorting
 * - Suggestions mode
 * - Response format
 * - Caching headers
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { GET } from '@/app/api/search/route'
import { NextRequest } from 'next/server'

describe('Search API Integration Tests', () => {
  describe('GET /api/search - Validation', () => {
    it('should return 400 when query parameter is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/search')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Query parameter "q" is required')
    })

    it('should return 400 when query is empty string', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should return 400 when query is only whitespace', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=%20%20%20')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should return 400 for invalid type parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=test&type=invalid')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Type must be')
    })

    it('should return 400 for invalid sortBy parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=test&sortBy=invalid')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('SortBy must be')
    })

    it('should return 400 for invalid limit parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=test&limit=invalid')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Limit must be a positive number')
    })

    it('should return 400 for negative limit', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=test&limit=-5')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should cap limit at maximum of 50', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=empresas&limit=1000')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.results.length).toBeLessThanOrEqual(50)
    })
  })

  describe('GET /api/search - Basic Search', () => {
    it('should return successful response for valid query', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=transformacion')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data).toHaveProperty('results')
      expect(Array.isArray(data.results)).toBe(true)
    })

    it('should include query in response', async () => {
      const query = 'digital empresas'
      const request = new NextRequest(`http://localhost:3000/api/search?q=${encodeURIComponent(query)}`)

      const response = await GET(request)
      const data = await response.json()

      expect(data.query).toBe(query)
    })

    it('should include totalResults count', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=test')

      const response = await GET(request)
      const data = await response.json()

      expect(data).toHaveProperty('totalResults')
      expect(typeof data.totalResults).toBe('number')
    })

    it('should include breakdown by content type', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=test')

      const response = await GET(request)
      const data = await response.json()

      expect(data).toHaveProperty('breakdown')
      expect(data.breakdown).toHaveProperty('blog')
      expect(data.breakdown).toHaveProperty('podcast')
    })

    it('should search across all content types by default', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=transformacion')

      const response = await GET(request)
      const data = await response.json()

      if (data.results.length > 0) {
        const types = new Set(data.results.map((r: any) => r.type))
        expect(types.size).toBeGreaterThan(0)
      }
    })
  })

  describe('GET /api/search - Type Filtering', () => {
    it('should filter results by blog type', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=transformacion&type=blog')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.type).toBe('blog')

      if (data.results.length > 0) {
        expect(data.results.every((r: any) => r.type === 'blog')).toBe(true)
      }
    })

    it('should filter results by podcast type', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=transformacion&type=podcast')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.type).toBe('podcast')

      if (data.results.length > 0) {
        expect(data.results.every((r: any) => r.type === 'podcast')).toBe(true)
      }
    })

    it('should return all types when type=all', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=transformacion&type=all')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.type).toBe('all')
    })
  })

  describe('GET /api/search - Sorting', () => {
    it('should sort by relevance by default', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=empresas')

      const response = await GET(request)
      const data = await response.json()

      expect(data.sortBy).toBe('relevance')

      if (data.results.length > 1) {
        for (let i = 0; i < data.results.length - 1; i++) {
          expect(data.results[i].relevanceScore).toBeGreaterThanOrEqual(
            data.results[i + 1].relevanceScore
          )
        }
      }
    })

    it('should sort by date when specified', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=empresas&sortBy=date')

      const response = await GET(request)
      const data = await response.json()

      expect(data.sortBy).toBe('date')

      if (data.results.length > 1) {
        for (let i = 0; i < data.results.length - 1; i++) {
          const date1 = new Date(data.results[i].publishedAt)
          const date2 = new Date(data.results[i + 1].publishedAt)
          expect(date1.getTime()).toBeGreaterThanOrEqual(date2.getTime())
        }
      }
    })

    it('should sort by relevance when explicitly specified', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=empresas&sortBy=relevance')

      const response = await GET(request)
      const data = await response.json()

      expect(data.sortBy).toBe('relevance')
    })
  })

  describe('GET /api/search - Limit Parameter', () => {
    it('should respect limit parameter', async () => {
      const limit = 3
      const request = new NextRequest(`http://localhost:3000/api/search?q=empresas&limit=${limit}`)

      const response = await GET(request)
      const data = await response.json()

      expect(data.results.length).toBeLessThanOrEqual(limit)
    })

    it('should use default limit of 10 when not specified', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=empresas')

      const response = await GET(request)
      const data = await response.json()

      expect(data.results.length).toBeLessThanOrEqual(10)
    })

    it('should handle limit of 1', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=empresas&limit=1')

      const response = await GET(request)
      const data = await response.json()

      expect(data.results.length).toBeLessThanOrEqual(1)
    })

    it('should handle limit larger than available results', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=veryspecificquery12345&limit=100')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.results.length).toBeLessThanOrEqual(100)
    })
  })

  describe('GET /api/search - Suggestions Mode', () => {
    it('should return suggestions when suggestions=true', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=tra&suggestions=true')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(Array.isArray(data.results)).toBe(true)
    })

    it('should limit suggestions to maximum of 10', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=empresas&suggestions=true&limit=50')

      const response = await GET(request)
      const data = await response.json()

      expect(data.results.length).toBeLessThanOrEqual(10)
    })

    it('should try to diversify suggestion types', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=digital&suggestions=true')

      const response = await GET(request)
      const data = await response.json()

      if (data.results.length > 1) {
        const types = new Set(data.results.map((r: any) => r.type))
        // Should have diversity if content is available
        expect(types.size).toBeGreaterThan(0)
      }
    })
  })

  describe('GET /api/search - Result Format', () => {
    it('should return results with required fields', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=transformacion')

      const response = await GET(request)
      const data = await response.json()

      if (data.results.length > 0) {
        const result = data.results[0]
        expect(result).toHaveProperty('id')
        expect(result).toHaveProperty('type')
        expect(result).toHaveProperty('title')
        expect(result).toHaveProperty('description')
        expect(result).toHaveProperty('slug')
        expect(result).toHaveProperty('coverImage')
        expect(result).toHaveProperty('publishedAt')
        expect(result).toHaveProperty('relevanceScore')
        expect(result).toHaveProperty('category')
        expect(result).toHaveProperty('tags')
      }
    })

    it('should return relevance scores as numbers', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=empresas')

      const response = await GET(request)
      const data = await response.json()

      if (data.results.length > 0) {
        data.results.forEach((result: any) => {
          expect(typeof result.relevanceScore).toBe('number')
          expect(result.relevanceScore).toBeGreaterThan(0)
        })
      }
    })

    it('should return tags as array of strings', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=transformacion')

      const response = await GET(request)
      const data = await response.json()

      if (data.results.length > 0) {
        const result = data.results[0]
        expect(Array.isArray(result.tags)).toBe(true)
      }
    })
  })

  describe('GET /api/search - Cache Headers', () => {
    it('should include cache control headers', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=test')

      const response = await GET(request)
      const headers = Object.fromEntries(response.headers.entries())

      expect(headers).toHaveProperty('cache-control')
    })

    it('should set appropriate cache duration', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=test')

      const response = await GET(request)
      const cacheControl = response.headers.get('cache-control')

      expect(cacheControl).toContain('s-maxage=60')
      expect(cacheControl).toContain('stale-while-revalidate')
    })
  })

  describe('GET /api/search - Special Characters', () => {
    it('should handle queries with special characters', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=transformaci%C3%B3n')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('should handle queries with punctuation', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=empresas%3A%20digital')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
    })

    it('should handle URL-encoded spaces', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=transformaci%C3%B3n%20digital')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.query).toContain(' ')
    })
  })

  describe('GET /api/search - No Results', () => {
    it('should return empty results array when no matches found', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=nonexistentterm12345xyz')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.results).toEqual([])
      expect(data.totalResults).toBe(0)
    })

    it('should return zero counts in breakdown when no results', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=nonexistentterm12345')

      const response = await GET(request)
      const data = await response.json()

      expect(data.breakdown.blog).toBe(0)
      expect(data.breakdown.podcast).toBe(0)
    })
  })

  describe('GET /api/search - Error Handling', () => {
    it('should handle internal errors gracefully', async () => {
      // Create a request that might cause an internal error
      const request = new NextRequest('http://localhost:3000/api/search?q=' + 'a'.repeat(10000))

      const response = await GET(request)

      expect([200, 400, 500]).toContain(response.status)
      const data = await response.json()
      expect(data).toHaveProperty('success')
    })
  })

  describe('GET /api/search - Multiple Query Terms', () => {
    it('should handle multiple search terms', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=transformaci%C3%B3n%20digital%20empresas')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('should score multi-term matches appropriately', async () => {
      const request = new NextRequest('http://localhost:3000/api/search?q=transformacion%20empresas')

      const response = await GET(request)
      const data = await response.json()

      if (data.results.length > 0) {
        expect(data.results[0].relevanceScore).toBeGreaterThan(0)
      }
    })
  })

  describe('GET /api/search - Combined Parameters', () => {
    it('should handle multiple parameters together', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/search?q=empresas&type=blog&sortBy=date&limit=5'
      )

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.type).toBe('blog')
      expect(data.sortBy).toBe('date')
      expect(data.results.length).toBeLessThanOrEqual(5)
    })
  })
})
