/**
 * Track Share API Route
 * POST /api/social/track-share
 * Records social sharing events for analytics
 */

import { NextRequest, NextResponse } from 'next/server'
import type { SharePlatform } from '@/lib/utils/social-share'

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60000 // 1 minute
const RATE_LIMIT_MAX = 20 // Max requests per window
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

interface TrackShareRequest {
  contentId: string
  contentType: 'blog' | 'podcast'
  platform: SharePlatform
  url: string
}

/**
 * Check if request is rate limited
 */
function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const limitData = rateLimitMap.get(ip)

  if (!limitData || now > limitData.resetTime) {
    // Reset or initialize rate limit
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    })
    return false
  }

  if (limitData.count >= RATE_LIMIT_MAX) {
    return true
  }

  // Increment count
  limitData.count += 1
  return false
}

/**
 * Get client IP address
 */
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIp) {
    return realIp
  }

  return 'unknown'
}

/**
 * Validate request body
 */
function validateRequest(body: unknown): body is TrackShareRequest {
  if (!body || typeof body !== 'object') {
    return false
  }

  const req = body as Partial<TrackShareRequest>

  if (
    !req.contentId ||
    typeof req.contentId !== 'string' ||
    !req.contentType ||
    !['blog', 'podcast'].includes(req.contentType) ||
    !req.platform ||
    typeof req.platform !== 'string' ||
    !req.url ||
    typeof req.url !== 'string'
  ) {
    return false
  }

  const validPlatforms: SharePlatform[] = [
    'linkedin',
    'twitter',
    'facebook',
    'whatsapp',
    'email',
    'copy',
    'native',
  ]

  return validPlatforms.includes(req.platform as SharePlatform)
}

/**
 * POST /api/social/track-share
 * Track a social share event
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request)

    // Check rate limit
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please try again later.',
        },
        { status: 429 }
      )
    }

    // Parse request body
    let body: unknown
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid JSON in request body',
        },
        { status: 400 }
      )
    }

    // Validate request
    if (!validateRequest(body)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request. Missing or invalid required fields.',
        },
        { status: 400 }
      )
    }

    const { contentId, contentType, platform, url } = body

    // Log the share event (in production, this would save to a database)
    console.log('[Share Tracking]', {
      contentId,
      contentType,
      platform,
      url,
      timestamp: new Date().toISOString(),
      ip: clientIp,
    })

    // TODO: In production, save to database
    // Example:
    // await db.shareEvents.create({
    //   data: {
    //     contentId,
    //     contentType,
    //     platform,
    //     url,
    //     ip: clientIp,
    //     userAgent: request.headers.get('user-agent') || 'unknown',
    //     timestamp: new Date(),
    //   },
    // })

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Share event tracked successfully',
        data: {
          contentId,
          contentType,
          platform,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    )
  } catch (_error) {
    console.error('[Share Tracking Error]', _error)

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/social/track-share
 * Get share statistics (optional endpoint for future use)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const contentId = searchParams.get('contentId')
    const contentType = searchParams.get('contentType')

    if (!contentId || !contentType || !['blog', 'podcast'].includes(contentType)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing or invalid contentId or contentType parameter',
        },
        { status: 400 }
      )
    }

    // TODO: In production, fetch from database
    // For now, return mock data
    const mockStats = {
      contentId,
      contentType,
      totalShares: 0,
      sharesByPlatform: {
        linkedin: 0,
        twitter: 0,
        facebook: 0,
        whatsapp: 0,
        email: 0,
        copy: 0,
        native: 0,
      },
    }

    return NextResponse.json(
      {
        success: true,
        data: mockStats,
      },
      { status: 200 }
    )
  } catch (_error) {
    console.error('[Share Stats Error]', _error)

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    )
  }
}

/**
 * OPTIONS /api/social/track-share
 * CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}
