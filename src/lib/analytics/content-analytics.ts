/**
 * Content Analytics
 *
 * Track content views and recommendation interactions
 * Privacy-friendly analytics without external services
 *
 * Features:
 * - Track page views
 * - Track recommendation clicks
 * - Track recommendation impressions
 * - Aggregate statistics
 */

import { addToViewHistory } from '@/lib/utils/personalization'

const ANALYTICS_STORAGE_KEY = 'duo_content_analytics'
const MAX_ANALYTICS_ENTRIES = 100

export interface AnalyticsEvent {
  id: string
  timestamp: string
  eventType: 'view' | 'recommendation_click' | 'recommendation_impression'
  contentId: string
  contentType: 'blog' | 'podcast'
  sourceContentId?: string // For recommendation events
  metadata?: Record<string, unknown>
}

export interface ContentAnalytics {
  events: AnalyticsEvent[]
  lastUpdated: string
}

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

/**
 * Get analytics data from localStorage
 */
export function getAnalytics(): ContentAnalytics {
  if (!isLocalStorageAvailable()) {
    return { events: [], lastUpdated: new Date().toISOString() }
  }

  try {
    const stored = localStorage.getItem(ANALYTICS_STORAGE_KEY)
    if (!stored) {
      return { events: [], lastUpdated: new Date().toISOString() }
    }

    return JSON.parse(stored)
  } catch (error) {
    console.error('Error reading analytics:', error)
    return { events: [], lastUpdated: new Date().toISOString() }
  }
}

/**
 * Save analytics event
 */
function saveAnalyticsEvent(event: AnalyticsEvent): void {
  if (!isLocalStorageAvailable()) {
    return
  }

  try {
    const analytics = getAnalytics()

    // Add new event
    const updatedEvents = [event, ...analytics.events].slice(0, MAX_ANALYTICS_ENTRIES)

    const updatedAnalytics: ContentAnalytics = {
      events: updatedEvents,
      lastUpdated: new Date().toISOString(),
    }

    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(updatedAnalytics))
  } catch (error) {
    console.error('Error saving analytics event:', error)
  }
}

/**
 * Generate unique event ID
 */
function generateEventId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Track content view
 */
export function trackContentView(
  contentId: string,
  contentType: 'blog' | 'podcast',
  title: string,
  metadata?: Record<string, unknown>
): void {
  // Add to view history
  addToViewHistory(contentId, contentType, title)

  // Track analytics event
  const event: AnalyticsEvent = {
    id: generateEventId(),
    timestamp: new Date().toISOString(),
    eventType: 'view',
    contentId,
    contentType,
    metadata,
  }

  saveAnalyticsEvent(event)

  // Log for debugging (can be removed in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Content view:', { contentId, contentType, title })
  }
}

/**
 * Track recommendation click
 */
export function trackRecommendationClick(
  contentId: string,
  contentType: 'blog' | 'podcast',
  sourceContentId: string,
  metadata?: Record<string, unknown>
): void {
  const event: AnalyticsEvent = {
    id: generateEventId(),
    timestamp: new Date().toISOString(),
    eventType: 'recommendation_click',
    contentId,
    contentType,
    sourceContentId,
    metadata,
  }

  saveAnalyticsEvent(event)

  // Log for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Recommendation click:', {
      contentId,
      contentType,
      sourceContentId,
    })
  }
}

/**
 * Track recommendation impression
 */
export function trackRecommendationImpression(
  contentIds: string[],
  sourceContentId: string,
  metadata?: Record<string, unknown>
): void {
  contentIds.forEach(contentId => {
    const event: AnalyticsEvent = {
      id: generateEventId(),
      timestamp: new Date().toISOString(),
      eventType: 'recommendation_impression',
      contentId,
      contentType: 'blog', // We don't know the type in impression, will be updated on click
      sourceContentId,
      metadata,
    }

    saveAnalyticsEvent(event)
  })

  // Log for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Recommendation impression:', {
      count: contentIds.length,
      sourceContentId,
    })
  }
}

/**
 * Get analytics statistics
 */
export function getAnalyticsStatistics(days: number = 30): {
  totalViews: number
  blogViews: number
  podcastViews: number
  recommendationClicks: number
  recommendationImpressions: number
  clickThroughRate: number
} {
  const analytics = getAnalytics()

  // Filter events from last N days
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  const recentEvents = analytics.events.filter(event => {
    const eventDate = new Date(event.timestamp)
    return eventDate >= cutoffDate
  })

  const viewEvents = recentEvents.filter(e => e.eventType === 'view')
  const clickEvents = recentEvents.filter(e => e.eventType === 'recommendation_click')
  const impressionEvents = recentEvents.filter(e => e.eventType === 'recommendation_impression')

  const blogViews = viewEvents.filter(e => e.contentType === 'blog').length
  const podcastViews = viewEvents.filter(e => e.contentType === 'podcast').length

  const clickThroughRate =
    impressionEvents.length > 0
      ? (clickEvents.length / impressionEvents.length) * 100
      : 0

  return {
    totalViews: viewEvents.length,
    blogViews,
    podcastViews,
    recommendationClicks: clickEvents.length,
    recommendationImpressions: impressionEvents.length,
    clickThroughRate: Math.round(clickThroughRate * 100) / 100,
  }
}

/**
 * Get most viewed content
 */
export function getMostViewedContent(
  limit: number = 10,
  days: number = 30
): Array<{
  contentId: string
  contentType: 'blog' | 'podcast'
  views: number
}> {
  const analytics = getAnalytics()

  // Filter events from last N days
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  const viewEvents = analytics.events.filter(event => {
    const eventDate = new Date(event.timestamp)
    return eventDate >= cutoffDate && event.eventType === 'view'
  })

  // Count views per content
  const viewCounts = new Map<string, { contentType: 'blog' | 'podcast'; count: number }>()

  viewEvents.forEach(event => {
    const key = event.contentId
    const existing = viewCounts.get(key)

    if (existing) {
      existing.count++
    } else {
      viewCounts.set(key, {
        contentType: event.contentType,
        count: 1,
      })
    }
  })

  // Convert to array and sort
  const sorted = Array.from(viewCounts.entries())
    .map(([contentId, data]) => ({
      contentId,
      contentType: data.contentType,
      views: data.count,
    }))
    .sort((a, b) => b.views - a.views)

  return sorted.slice(0, limit)
}

/**
 * Get recommendation effectiveness
 */
export function getRecommendationEffectiveness(): {
  totalRecommendations: number
  clickedRecommendations: number
  topSources: Array<{ contentId: string; clicks: number }>
} {
  const analytics = getAnalytics()

  const impressions = analytics.events.filter(
    e => e.eventType === 'recommendation_impression'
  )
  const clicks = analytics.events.filter(e => e.eventType === 'recommendation_click')

  // Count clicks by source
  const clicksBySource = new Map<string, number>()

  clicks.forEach(event => {
    if (event.sourceContentId) {
      const count = clicksBySource.get(event.sourceContentId) || 0
      clicksBySource.set(event.sourceContentId, count + 1)
    }
  })

  const topSources = Array.from(clicksBySource.entries())
    .map(([contentId, clicks]) => ({ contentId, clicks }))
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10)

  return {
    totalRecommendations: impressions.length,
    clickedRecommendations: clicks.length,
    topSources,
  }
}

/**
 * Clear analytics data
 */
export function clearAnalytics(): void {
  if (!isLocalStorageAvailable()) {
    return
  }

  try {
    localStorage.removeItem(ANALYTICS_STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing analytics:', error)
  }
}

/**
 * Export analytics data (for debugging or analysis)
 */
export function exportAnalytics(): string {
  const analytics = getAnalytics()
  return JSON.stringify(analytics, null, 2)
}

/**
 * React hook for analytics (if using in components)
 */
export function useContentAnalytics() {
  if (typeof window === 'undefined') {
    return {
      trackView: () => {},
      trackClick: () => {},
      trackImpression: () => {},
      statistics: {
        totalViews: 0,
        blogViews: 0,
        podcastViews: 0,
        recommendationClicks: 0,
        recommendationImpressions: 0,
        clickThroughRate: 0,
      },
    }
  }

  return {
    trackView: trackContentView,
    trackClick: trackRecommendationClick,
    trackImpression: trackRecommendationImpression,
    statistics: getAnalyticsStatistics(),
  }
}
