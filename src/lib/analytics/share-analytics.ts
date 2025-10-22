/**
 * Share Analytics Tracking
 * Tracks social sharing events for analytics purposes
 */

import type { SharePlatform } from '@/lib/utils/social-share'

export interface ShareEvent {
  id: string
  contentId: string
  contentType: 'blog' | 'podcast'
  platform: SharePlatform
  timestamp: number
  url: string
  success: boolean
}

export interface ShareStats {
  contentId: string
  contentType: 'blog' | 'podcast'
  totalShares: number
  sharesByPlatform: Record<SharePlatform, number>
  lastShared: number
}

const STORAGE_KEY = 'duo_share_analytics'
const RATE_LIMIT_KEY = 'duo_share_rate_limit'
const MAX_EVENTS = 1000 // Maximum events to store in localStorage
const RATE_LIMIT_WINDOW = 60000 // 1 minute in milliseconds
const RATE_LIMIT_MAX = 10 // Maximum shares per window

/**
 * Get all share events from localStorage
 */
function getShareEvents(): ShareEvent[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) {
      return []
    }

    const events = JSON.parse(data)
    return Array.isArray(events) ? events : []
  } catch (error) {
    console.error('Error reading share analytics:', error)
    return []
  }
}

/**
 * Save share events to localStorage
 */
function saveShareEvents(events: ShareEvent[]): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    // Keep only the most recent events to prevent localStorage overflow
    const recentEvents = events.slice(-MAX_EVENTS)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentEvents))
  } catch (error) {
    console.error('Error saving share analytics:', error)
  }
}

/**
 * Check if rate limit is exceeded
 * Returns true if user has shared too many times recently
 */
function isRateLimited(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    const data = localStorage.getItem(RATE_LIMIT_KEY)
    if (!data) {
      return false
    }

    const rateLimitData = JSON.parse(data)
    const now = Date.now()

    // Check if we're still within the rate limit window
    if (now - rateLimitData.windowStart < RATE_LIMIT_WINDOW) {
      return rateLimitData.count >= RATE_LIMIT_MAX
    }

    return false
  } catch (error) {
    console.error('Error checking rate limit:', error)
    return false
  }
}

/**
 * Update rate limit counter
 */
function updateRateLimit(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const data = localStorage.getItem(RATE_LIMIT_KEY)
    const now = Date.now()

    if (!data) {
      localStorage.setItem(
        RATE_LIMIT_KEY,
        JSON.stringify({
          windowStart: now,
          count: 1,
        })
      )
      return
    }

    const rateLimitData = JSON.parse(data)

    // If we're in a new window, reset the counter
    if (now - rateLimitData.windowStart >= RATE_LIMIT_WINDOW) {
      localStorage.setItem(
        RATE_LIMIT_KEY,
        JSON.stringify({
          windowStart: now,
          count: 1,
        })
      )
    } else {
      // Increment the counter
      rateLimitData.count += 1
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(rateLimitData))
    }
  } catch (error) {
    console.error('Error updating rate limit:', error)
  }
}

/**
 * Track a share event
 * Stores the event in localStorage and returns success status
 */
export async function trackShare(
  contentId: string,
  contentType: 'blog' | 'podcast',
  platform: SharePlatform,
  url: string
): Promise<{ success: boolean; error?: string }> {
  // Check rate limit
  if (isRateLimited()) {
    return {
      success: false,
      error: 'Rate limit exceeded. Please wait before sharing again.',
    }
  }

  try {
    // Create share event
    const event: ShareEvent = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      contentId,
      contentType,
      platform,
      timestamp: Date.now(),
      url,
      success: true,
    }

    // Get existing events and add new one
    const events = getShareEvents()
    events.push(event)
    saveShareEvents(events)

    // Update rate limit
    updateRateLimit()

    // Send to API if available (fire and forget)
    try {
      await fetch('/api/social/track-share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentId,
          contentType,
          platform,
          url,
        }),
      }).catch(() => {
        // Ignore API errors - we still have localStorage tracking
      })
    } catch {
      // Ignore API errors
    }

    return { success: true }
  } catch (_error) {
    console.error('Error tracking share:', _error)
    return {
      success: false,
      error: 'Failed to track share event',
    }
  }
}

/**
 * Get share statistics for a specific content
 */
export function getShareStats(contentId: string, contentType: 'blog' | 'podcast'): ShareStats {
  const events = getShareEvents()
  const contentEvents = events.filter(
    event => event.contentId === contentId && event.contentType === contentType && event.success
  )

  // Count shares by platform
  const sharesByPlatform: Record<SharePlatform, number> = {
    linkedin: 0,
    twitter: 0,
    facebook: 0,
    whatsapp: 0,
    email: 0,
    copy: 0,
    native: 0,
  }

  contentEvents.forEach(event => {
    sharesByPlatform[event.platform] = (sharesByPlatform[event.platform] || 0) + 1
  })

  // Get last shared timestamp
  const lastShared =
    contentEvents.length > 0 ? Math.max(...contentEvents.map(e => e.timestamp)) : 0

  return {
    contentId,
    contentType,
    totalShares: contentEvents.length,
    sharesByPlatform,
    lastShared,
  }
}

/**
 * Get total shares across all content
 */
export function getTotalShares(): number {
  const events = getShareEvents()
  return events.filter(event => event.success).length
}

/**
 * Get most shared content
 * Returns top N content items by share count
 */
export function getMostSharedContent(limit = 10): Array<{
  contentId: string
  contentType: 'blog' | 'podcast'
  shares: number
}> {
  const events = getShareEvents().filter(event => event.success)

  // Group by content
  const contentMap = new Map<string, number>()

  events.forEach(event => {
    const key = `${event.contentType}:${event.contentId}`
    contentMap.set(key, (contentMap.get(key) || 0) + 1)
  })

  // Convert to array and sort
  const contentArray = Array.from(contentMap.entries()).map(([key, shares]) => {
    const [contentType, contentId] = key.split(':')
    return {
      contentId,
      contentType: contentType as 'blog' | 'podcast',
      shares,
    }
  })

  return contentArray.sort((a, b) => b.shares - a.shares).slice(0, limit)
}

/**
 * Get share trends over time
 * Returns share counts grouped by day
 */
export function getShareTrends(days = 30): Array<{
  date: string
  shares: number
}> {
  const events = getShareEvents().filter(event => event.success)
  const now = Date.now()
  const cutoff = now - days * 24 * 60 * 60 * 1000

  // Filter events within the time range
  const recentEvents = events.filter(event => event.timestamp >= cutoff)

  // Group by day
  const dayMap = new Map<string, number>()

  recentEvents.forEach(event => {
    const date = new Date(event.timestamp).toISOString().split('T')[0]
    dayMap.set(date, (dayMap.get(date) || 0) + 1)
  })

  // Convert to array and sort
  return Array.from(dayMap.entries())
    .map(([date, shares]) => ({ date, shares }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

/**
 * Clear all analytics data
 * Useful for testing or privacy
 */
export function clearAnalytics(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(RATE_LIMIT_KEY)
  } catch (_error) {
    console.error('Error clearing analytics:', _error)
  }
}

/**
 * Export analytics data
 * Returns all events for backup or analysis
 */
export function exportAnalytics(): ShareEvent[] {
  return getShareEvents()
}
