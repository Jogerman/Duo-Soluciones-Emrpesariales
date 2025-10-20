/**
 * Rate Limiter Utility
 *
 * Implements rate limiting for API endpoints using Upstash Redis.
 * Falls back to in-memory rate limiting if Redis is unavailable.
 *
 * Configuration:
 * - Sliding window: 5 requests per 10 minutes per IP
 * - Graceful degradation: Falls back to Map-based limiter if Redis unavailable
 *
 * @module lib/rate-limiter
 */

import { Ratelimit } from '@upstash/ratelimit';

/**
 * In-memory rate limiter fallback
 * Used when Redis is not available or not configured
 */
class InMemoryRateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  async limit(identifier: string): Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    reset: Date;
  }> {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Get existing requests for this identifier
    const timestamps = this.requests.get(identifier) || [];

    // Filter out requests outside the current window
    const validTimestamps = timestamps.filter((ts) => ts > windowStart);

    // Check if limit exceeded
    const success = validTimestamps.length < this.maxRequests;

    if (success) {
      // Add current request timestamp
      validTimestamps.push(now);
      this.requests.set(identifier, validTimestamps);
    }

    // Calculate reset time (end of current window)
    const oldestTimestamp = validTimestamps[0] || now;
    const reset = new Date(oldestTimestamp + this.windowMs);

    return {
      success,
      limit: this.maxRequests,
      remaining: Math.max(0, this.maxRequests - validTimestamps.length),
      reset,
    };
  }

  /**
   * Clean up old entries to prevent memory leaks
   * Should be called periodically (e.g., every hour)
   */
  cleanup(): void {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    for (const [identifier, timestamps] of this.requests.entries()) {
      const validTimestamps = timestamps.filter((ts) => ts > windowStart);

      if (validTimestamps.length === 0) {
        this.requests.delete(identifier);
      } else {
        this.requests.set(identifier, validTimestamps);
      }
    }
  }
}

/**
 * Initialize rate limiter with Redis or in-memory fallback
 */
function createRateLimiter() {
  // Check if Upstash Redis credentials are available
  const hasRedis =
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

  if (hasRedis) {
    try {
      // Import Redis dynamically to avoid errors if @upstash/redis is not installed
      const { Redis } = require('@upstash/redis');

      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      });

      // Create Upstash Ratelimit instance
      const ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '10 m'),
        analytics: true,
        prefix: 'ratelimit:contact',
      });

      console.log('[Rate Limiter] Using Upstash Redis');

      return ratelimit;
    } catch (error) {
      console.warn(
        '[Rate Limiter] Failed to initialize Upstash Redis, falling back to in-memory:',
        error
      );
    }
  } else {
    console.warn(
      '[Rate Limiter] Redis credentials not found, using in-memory fallback'
    );
  }

  // Fallback to in-memory rate limiter
  const inMemoryLimiter = new InMemoryRateLimiter(5, 10 * 60 * 1000); // 5 requests per 10 minutes

  // Set up periodic cleanup (every hour)
  if (typeof setInterval !== 'undefined') {
    setInterval(() => {
      inMemoryLimiter.cleanup();
    }, 60 * 60 * 1000);
  }

  console.log('[Rate Limiter] Using in-memory fallback');

  return inMemoryLimiter;
}

/**
 * Global rate limiter instance
 * Automatically uses Redis if available, otherwise falls back to in-memory
 */
export const rateLimiter = createRateLimiter();

/**
 * Check rate limit for a given identifier (usually IP address)
 *
 * @param identifier - Unique identifier (e.g., IP address)
 * @returns Rate limit result with success status and metadata
 *
 * @example
 * ```ts
 * const result = await checkRateLimit('192.168.1.1');
 * if (!result.success) {
 *   return new Response('Too many requests', { status: 429 });
 * }
 * ```
 */
export async function checkRateLimit(identifier: string): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: Date;
}> {
  try {
    const result = await rateLimiter.limit(identifier);

    // Normalize the result (Upstash uses number for reset, we want Date)
    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: typeof result.reset === 'number' ? new Date(result.reset) : result.reset,
    };
  } catch (error) {
    console.error('[Rate Limiter] Error checking rate limit:', error);

    // In case of error, allow the request but log it
    // You can change this behavior based on your security requirements
    return {
      success: true,
      limit: 5,
      remaining: 0,
      reset: new Date(Date.now() + 10 * 60 * 1000),
    };
  }
}

/**
 * Get client IP address from request headers
 * Handles various reverse proxy scenarios (Vercel, Cloudflare, etc.)
 *
 * @param request - Next.js Request object
 * @returns Client IP address
 */
export function getClientIp(request: Request): string {
  // Try to get IP from various headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');

  // x-forwarded-for can contain multiple IPs, take the first one
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  // Cloudflare provides the client IP in this header
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Fallback to x-real-ip
  if (realIp) {
    return realIp;
  }

  // Final fallback (should not happen in production)
  return 'unknown';
}
