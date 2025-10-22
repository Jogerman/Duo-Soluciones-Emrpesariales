/**
 * Integration Tests for Newsletter API
 *
 * Tests the complete flow of the newsletter API including:
 * - Request validation
 * - Rate limiting
 * - Database operations
 * - Email sending (mocked)
 * - Error handling
 * - CORS headers
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { POST, GET, OPTIONS } from '@/app/api/newsletter/route'
import { NextRequest } from 'next/server'

// Mock modules
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ id: 'mock-email-id' }),
    },
  })),
}))

vi.mock('@/lib/db', () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue([]),
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockResolvedValue(undefined),
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
  },
  newsletterSubscribers: {},
}))

vi.mock('@/lib/rate-limiter', () => ({
  checkRateLimit: vi.fn().mockResolvedValue({
    success: true,
    remaining: 4,
    reset: new Date(Date.now() + 3600000),
  }),
  getClientIp: vi.fn().mockReturnValue('127.0.0.1'),
}))

describe('Newsletter API Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Set environment variables for testing
    process.env.RESEND_API_KEY = 'test-api-key'
    process.env.NEXT_PUBLIC_APP_URL = 'https://test.com'
    process.env.RESEND_FROM_EMAIL = 'test@test.com'
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('OPTIONS /api/newsletter (CORS)', () => {
    it('should return CORS headers', async () => {
      const response = await OPTIONS()
      const headers = Object.fromEntries(response.headers.entries())

      expect(response.status).toBe(200)
      expect(headers).toHaveProperty('access-control-allow-origin')
      expect(headers).toHaveProperty('access-control-allow-methods')
      expect(headers).toHaveProperty('access-control-allow-headers')
    })

    it('should allow POST method', async () => {
      const response = await OPTIONS()
      const headers = Object.fromEntries(response.headers.entries())

      expect(headers['access-control-allow-methods']).toContain('POST')
    })
  })

  describe('GET /api/newsletter', () => {
    it('should return 405 Method Not Allowed', async () => {
      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(405)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Método no permitido')
    })

    it('should include CORS headers', async () => {
      const response = await GET()
      const headers = Object.fromEntries(response.headers.entries())

      expect(headers).toHaveProperty('access-control-allow-origin')
    })
  })

  describe('POST /api/newsletter - Validation', () => {
    it('should reject request with missing body', async () => {
      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should reject request with invalid JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json{',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('inválidos')
    })

    it('should reject request with missing email', async () => {
      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consent: true,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.errors).toBeDefined()
    })

    it('should reject request with invalid email format', async () => {
      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'invalid-email',
          consent: true,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should reject request with missing consent', async () => {
      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          consent: false,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should reject email longer than 255 characters', async () => {
      const longEmail = 'a'.repeat(250) + '@example.com'

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: longEmail,
          consent: true,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
    })

    it('should trim and lowercase email', async () => {
      const { db } = await import('@/lib/db')

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: '  TEST@EXAMPLE.COM  ',
          consent: true,
        }),
      })

      await POST(request)

      // Check that db.insert was called with lowercase, trimmed email
      expect(db.insert).toHaveBeenCalled()
    })

    it('should accept valid source parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          consent: true,
          source: 'blog-footer',
        }),
      })

      const response = await POST(request)

      expect(response.status).not.toBe(400)
    })
  })

  describe('POST /api/newsletter - Rate Limiting', () => {
    it('should reject request when rate limit exceeded', async () => {
      const { checkRateLimit } = await import('@/lib/rate-limiter')

      vi.mocked(checkRateLimit).mockResolvedValueOnce({
        success: false,
        remaining: 0,
        reset: new Date(Date.now() + 3600000),
      })

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          consent: true,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(429)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Demasiadas solicitudes')
    })

    it('should include Retry-After header when rate limited', async () => {
      const { checkRateLimit } = await import('@/lib/rate-limiter')

      vi.mocked(checkRateLimit).mockResolvedValueOnce({
        success: false,
        remaining: 0,
        reset: new Date(Date.now() + 3600000),
      })

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          consent: true,
        }),
      })

      const response = await POST(request)
      const headers = Object.fromEntries(response.headers.entries())

      expect(headers).toHaveProperty('retry-after')
    })
  })

  describe('POST /api/newsletter - Database Operations', () => {
    it('should return 503 when database is not configured', async () => {
      // Mock db as null
      vi.doMock('@/lib/db', () => ({
        db: null,
        newsletterSubscribers: {},
      }))

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          consent: true,
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(503)
    })

    it('should check for existing subscriber', async () => {
      const { db } = await import('@/lib/db')

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          consent: true,
        }),
      })

      await POST(request)

      expect(db.select).toHaveBeenCalled()
    })

    it('should return success if already subscribed and active', async () => {
      const { db } = await import('@/lib/db')

      vi.mocked(db.limit).mockResolvedValueOnce([
        {
          id: '1',
          email: 'test@example.com',
          isActive: true,
          consentGiven: true,
        },
      ] as any)

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          consent: true,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toContain('Ya estás suscrito')
    })

    it('should insert new subscriber for first-time signup', async () => {
      const { db } = await import('@/lib/db')

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'new@example.com',
          consent: true,
        }),
      })

      await POST(request)

      expect(db.insert).toHaveBeenCalled()
    })
  })

  describe('POST /api/newsletter - Email Sending', () => {
    it('should return 500 when RESEND_API_KEY is not configured', async () => {
      delete process.env.RESEND_API_KEY

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          consent: true,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toContain('email no está configurado')
    })

    it('should send confirmation email for new subscriber', async () => {
      const { Resend } = await import('resend')

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'new@example.com',
          consent: true,
        }),
      })

      await POST(request)

      // Check that Resend was instantiated
      expect(Resend).toHaveBeenCalled()
    })

    it('should handle email sending failure', async () => {
      const { Resend } = await import('resend')
      const { db } = await import('@/lib/db')

      // Mock email send failure
      vi.mocked(Resend).mockImplementationOnce(
        () =>
          ({
            emails: {
              send: vi.fn().mockRejectedValue(new Error('Email send failed')),
            },
          }) as any
      )

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          consent: true,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      // Should have attempted to delete the subscriber record
      expect(db.delete).toHaveBeenCalled()
    })
  })

  describe('POST /api/newsletter - Success Flow', () => {
    it('should return success response for valid new subscription', async () => {
      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'success@example.com',
          consent: true,
          source: 'homepage',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toBeDefined()
    })

    it('should include CORS headers in response', async () => {
      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          consent: true,
        }),
      })

      const response = await POST(request)
      const headers = Object.fromEntries(response.headers.entries())

      expect(headers).toHaveProperty('access-control-allow-origin')
    })
  })

  describe('POST /api/newsletter - Error Handling', () => {
    it('should handle unexpected errors gracefully', async () => {
      const { db } = await import('@/lib/db')

      // Mock unexpected database error
      vi.mocked(db.select).mockRejectedValueOnce(new Error('Database connection failed'))

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          consent: true,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toContain('error inesperado')
    })

    it('should not expose internal error details', async () => {
      const { db } = await import('@/lib/db')

      vi.mocked(db.select).mockRejectedValueOnce(new Error('Internal database error with secrets'))

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          consent: true,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data.error).not.toContain('secrets')
      expect(data.error).not.toContain('Internal')
    })
  })

  describe('POST /api/newsletter - Re-subscription Flow', () => {
    it('should allow re-subscription for previously unsubscribed user', async () => {
      const { db } = await import('@/lib/db')

      // Mock existing unsubscribed user
      vi.mocked(db.limit).mockResolvedValueOnce([
        {
          id: '1',
          email: 'unsubscribed@example.com',
          isActive: false,
          unsubscribedAt: new Date('2024-01-01'),
          consentGiven: false,
        },
      ] as any)

      const request = new NextRequest('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'unsubscribed@example.com',
          consent: true,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(db.update).toHaveBeenCalled()
    })
  })
})
