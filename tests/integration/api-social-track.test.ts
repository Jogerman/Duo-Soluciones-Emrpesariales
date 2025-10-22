/**
 * Integration Tests for Social Share Tracking API
 *
 * Tests the complete social tracking API including:
 * - Request validation
 * - Rate limiting
 * - Event tracking
 * - Statistics retrieval
 * - CORS headers
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST, GET, OPTIONS } from '@/app/api/social/track-share/route'
import { NextRequest } from 'next/server'

describe('Social Track Share API Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('OPTIONS /api/social/track-share (CORS)', () => {
    it('should return CORS headers', async () => {
      const response = await OPTIONS()
      const headers = Object.fromEntries(response.headers.entries())

      expect(response.status).toBe(200)
      expect(headers).toHaveProperty('access-control-allow-origin')
      expect(headers['access-control-allow-origin']).toBe('*')
    })

    it('should allow required HTTP methods', async () => {
      const response = await OPTIONS()
      const headers = Object.fromEntries(response.headers.entries())

      const allowedMethods = headers['access-control-allow-methods']
      expect(allowedMethods).toContain('GET')
      expect(allowedMethods).toContain('POST')
      expect(allowedMethods).toContain('OPTIONS')
    })

    it('should allow Content-Type header', async () => {
      const response = await OPTIONS()
      const headers = Object.fromEntries(response.headers.entries())

      expect(headers['access-control-allow-headers']).toContain('Content-Type')
    })
  })

  describe('POST /api/social/track-share - Validation', () => {
    it('should return 400 for missing body', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should return 400 for invalid JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid{json',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Invalid JSON')
    })

    it('should return 400 for missing contentId', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: 'blog',
          platform: 'twitter',
          url: 'https://example.com',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Missing or invalid required fields')
    })

    it('should return 400 for missing contentType', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId: 'blog-1',
          platform: 'twitter',
          url: 'https://example.com',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should return 400 for invalid contentType', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId: 'test-1',
          contentType: 'invalid',
          platform: 'twitter',
          url: 'https://example.com',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should return 400 for missing platform', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId: 'blog-1',
          contentType: 'blog',
          url: 'https://example.com',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should return 400 for invalid platform', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId: 'blog-1',
          contentType: 'blog',
          platform: 'invalid-platform',
          url: 'https://example.com',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should return 400 for missing url', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId: 'blog-1',
          contentType: 'blog',
          platform: 'twitter',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should accept contentType as "blog"', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId: 'blog-1',
          contentType: 'blog',
          platform: 'twitter',
          url: 'https://example.com/blog/1',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('should accept contentType as "podcast"', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId: 'podcast-1',
          contentType: 'podcast',
          platform: 'facebook',
          url: 'https://example.com/podcast/1',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('should accept all valid platforms', async () => {
      const platforms = ['linkedin', 'twitter', 'facebook', 'whatsapp', 'email', 'copy', 'native']

      for (const platform of platforms) {
        const request = new NextRequest('http://localhost:3000/api/social/track-share', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contentId: 'test-1',
            contentType: 'blog',
            platform,
            url: 'https://example.com',
          }),
        })

        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data.success).toBe(true)
      }
    })
  })

  describe('POST /api/social/track-share - Rate Limiting', () => {
    it('should track requests from same IP', async () => {
      const requestBody = {
        contentId: 'blog-1',
        contentType: 'blog',
        platform: 'twitter',
        url: 'https://example.com',
      }

      // First request should succeed
      const request1 = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '192.168.1.1',
        },
        body: JSON.stringify(requestBody),
      })

      const response1 = await POST(request1)
      expect(response1.status).toBe(200)
    })

    it('should return 429 when rate limit exceeded', async () => {
      const requestBody = {
        contentId: 'blog-1',
        contentType: 'blog',
        platform: 'twitter',
        url: 'https://example.com',
      }

      // Make 21 requests (more than the limit of 20)
      for (let i = 0; i < 21; i++) {
        const request = new NextRequest('http://localhost:3000/api/social/track-share', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': '192.168.1.100',
          },
          body: JSON.stringify(requestBody),
        })

        const response = await POST(request)

        if (i < 20) {
          expect(response.status).toBe(200)
        } else {
          expect(response.status).toBe(429)
          const data = await response.json()
          expect(data.error).toContain('Rate limit exceeded')
        }
      }
    })

    it('should extract IP from x-forwarded-for header', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '203.0.113.1, 198.51.100.1',
        },
        body: JSON.stringify({
          contentId: 'blog-1',
          contentType: 'blog',
          platform: 'twitter',
          url: 'https://example.com',
        }),
      })

      const response = await POST(request)
      expect(response.status).toBe(200)
    })

    it('should extract IP from x-real-ip header', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-real-ip': '203.0.113.1',
        },
        body: JSON.stringify({
          contentId: 'blog-1',
          contentType: 'blog',
          platform: 'twitter',
          url: 'https://example.com',
        }),
      })

      const response = await POST(request)
      expect(response.status).toBe(200)
    })
  })

  describe('POST /api/social/track-share - Successful Tracking', () => {
    it('should return success response for valid request', async () => {
      const requestBody = {
        contentId: 'blog-123',
        contentType: 'blog',
        platform: 'linkedin',
        url: 'https://example.com/blog/123',
      }

      const request = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toBe('Share event tracked successfully')
    })

    it('should return tracked event data in response', async () => {
      const requestBody = {
        contentId: 'podcast-456',
        contentType: 'podcast',
        platform: 'whatsapp',
        url: 'https://example.com/podcast/456',
      }

      const request = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data.data).toBeDefined()
      expect(data.data.contentId).toBe(requestBody.contentId)
      expect(data.data.contentType).toBe(requestBody.contentType)
      expect(data.data.platform).toBe(requestBody.platform)
      expect(data.data.timestamp).toBeDefined()
    })

    it('should include ISO timestamp in response', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId: 'blog-1',
          contentType: 'blog',
          platform: 'twitter',
          url: 'https://example.com',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data.data.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    })

    it('should track shares for different platforms', async () => {
      const platforms = ['linkedin', 'twitter', 'facebook']

      for (const platform of platforms) {
        const request = new NextRequest('http://localhost:3000/api/social/track-share', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contentId: 'blog-1',
            contentType: 'blog',
            platform,
            url: 'https://example.com',
          }),
        })

        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data.data.platform).toBe(platform)
      }
    })

    it('should track shares for different content types', async () => {
      const contentTypes: Array<'blog' | 'podcast'> = ['blog', 'podcast']

      for (const contentType of contentTypes) {
        const request = new NextRequest('http://localhost:3000/api/social/track-share', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contentId: `${contentType}-1`,
            contentType,
            platform: 'twitter',
            url: 'https://example.com',
          }),
        })

        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(data.data.contentType).toBe(contentType)
      }
    })
  })

  describe('GET /api/social/track-share - Statistics', () => {
    it('should return 400 for missing contentId parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share?contentType=blog')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Missing or invalid')
    })

    it('should return 400 for missing contentType parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share?contentId=blog-1')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should return 400 for invalid contentType', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share?contentId=test-1&contentType=invalid')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should return statistics for valid request', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share?contentId=blog-1&contentType=blog')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toBeDefined()
    })

    it('should return statistics structure', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share?contentId=blog-1&contentType=blog')

      const response = await GET(request)
      const data = await response.json()

      expect(data.data).toHaveProperty('contentId')
      expect(data.data).toHaveProperty('contentType')
      expect(data.data).toHaveProperty('totalShares')
      expect(data.data).toHaveProperty('sharesByPlatform')
    })

    it('should include all platforms in sharesByPlatform', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share?contentId=blog-1&contentType=blog')

      const response = await GET(request)
      const data = await response.json()

      const platforms = data.data.sharesByPlatform
      expect(platforms).toHaveProperty('linkedin')
      expect(platforms).toHaveProperty('twitter')
      expect(platforms).toHaveProperty('facebook')
      expect(platforms).toHaveProperty('whatsapp')
      expect(platforms).toHaveProperty('email')
      expect(platforms).toHaveProperty('copy')
      expect(platforms).toHaveProperty('native')
    })

    it('should return numeric values for share counts', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share?contentId=blog-1&contentType=blog')

      const response = await GET(request)
      const data = await response.json()

      expect(typeof data.data.totalShares).toBe('number')
      Object.values(data.data.sharesByPlatform).forEach((count) => {
        expect(typeof count).toBe('number')
      })
    })

    it('should accept contentType as "podcast"', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share?contentId=podcast-1&contentType=podcast')

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.contentType).toBe('podcast')
    })
  })

  describe('Error Handling', () => {
    it('should handle unexpected errors in POST', async () => {
      // Create a request that causes an error (e.g., malformed data type)
      const request = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId: 123, // Should be string
          contentType: 'blog',
          platform: 'twitter',
          url: 'https://example.com',
        }),
      })

      const response = await POST(request)

      expect([400, 500]).toContain(response.status)
    })

    it('should handle unexpected errors in GET gracefully', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share?contentId=test&contentType=blog')

      const response = await GET(request)

      expect([200, 500]).toContain(response.status)
    })

    it('should not expose sensitive error information', async () => {
      const request = new NextRequest('http://localhost:3000/api/social/track-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data.error).not.toContain('stack')
      expect(data.error).not.toContain('internal')
    })
  })
})
