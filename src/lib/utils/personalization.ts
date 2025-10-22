/**
 * Personalization Utilities
 *
 * Privacy-friendly content personalization using localStorage/cookies
 * Tracks viewed content to provide personalized recommendations
 *
 * Features:
 * - Store last 20 viewed items
 * - Privacy-friendly (no external tracking)
 * - Clear history option
 * - Automatic expiration (30 days)
 */

const STORAGE_KEY = 'duo_content_history'
const MAX_HISTORY_ITEMS = 20
const HISTORY_EXPIRATION_DAYS = 30

export interface ViewHistoryItem {
  id: string
  type: 'blog' | 'podcast'
  viewedAt: string
  title: string
}

export interface ViewHistory {
  items: ViewHistoryItem[]
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
 * Get view history from localStorage
 */
export function getViewHistory(): ViewHistory {
  if (!isLocalStorageAvailable()) {
    return { items: [], lastUpdated: new Date().toISOString() }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return { items: [], lastUpdated: new Date().toISOString() }
    }

    const history: ViewHistory = JSON.parse(stored)

    // Filter out expired items
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() - HISTORY_EXPIRATION_DAYS)

    const validItems = history.items.filter(item => {
      const viewedDate = new Date(item.viewedAt)
      return viewedDate >= expirationDate
    })

    return {
      items: validItems,
      lastUpdated: history.lastUpdated,
    }
  } catch (error) {
    console.error('Error reading view history:', error)
    return { items: [], lastUpdated: new Date().toISOString() }
  }
}

/**
 * Add item to view history
 */
export function addToViewHistory(
  id: string,
  type: 'blog' | 'podcast',
  title: string
): void {
  if (!isLocalStorageAvailable()) {
    return
  }

  try {
    const history = getViewHistory()

    // Remove existing entry if it exists (to update timestamp)
    const filteredItems = history.items.filter(item => item.id !== id)

    // Add new entry at the beginning
    const newItem: ViewHistoryItem = {
      id,
      type,
      viewedAt: new Date().toISOString(),
      title,
    }

    const updatedItems = [newItem, ...filteredItems].slice(0, MAX_HISTORY_ITEMS)

    const updatedHistory: ViewHistory = {
      items: updatedItems,
      lastUpdated: new Date().toISOString(),
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
  } catch (error) {
    console.error('Error adding to view history:', error)
  }
}

/**
 * Get array of viewed content IDs
 */
export function getViewedContentIds(): string[] {
  const history = getViewHistory()
  return history.items.map(item => item.id)
}

/**
 * Get recently viewed items of a specific type
 */
export function getRecentlyViewedByType(
  type: 'blog' | 'podcast',
  limit: number = 5
): ViewHistoryItem[] {
  const history = getViewHistory()
  return history.items
    .filter(item => item.type === type)
    .slice(0, limit)
}

/**
 * Check if content has been viewed
 */
export function hasViewed(id: string): boolean {
  const history = getViewHistory()
  return history.items.some(item => item.id === id)
}

/**
 * Clear all view history
 */
export function clearViewHistory(): void {
  if (!isLocalStorageAvailable()) {
    return
  }

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing view history:', error)
  }
}

/**
 * Get view statistics
 */
export function getViewStatistics(): {
  totalViews: number
  blogViews: number
  podcastViews: number
  oldestView: string | null
  newestView: string | null
} {
  const history = getViewHistory()

  if (history.items.length === 0) {
    return {
      totalViews: 0,
      blogViews: 0,
      podcastViews: 0,
      oldestView: null,
      newestView: null,
    }
  }

  const blogViews = history.items.filter(item => item.type === 'blog').length
  const podcastViews = history.items.filter(item => item.type === 'podcast').length

  // Items are sorted newest first
  const newestView = history.items[0].viewedAt
  const oldestView = history.items[history.items.length - 1].viewedAt

  return {
    totalViews: history.items.length,
    blogViews,
    podcastViews,
    oldestView,
    newestView,
  }
}

/**
 * Export view history (for user download)
 */
export function exportViewHistory(): string {
  const history = getViewHistory()
  return JSON.stringify(history, null, 2)
}

/**
 * Get most viewed categories based on history
 */
export function getViewPreferences(): {
  blogIds: string[]
  podcastIds: string[]
  totalItems: number
} {
  const history = getViewHistory()

  const blogIds = history.items
    .filter(item => item.type === 'blog')
    .map(item => item.id)

  const podcastIds = history.items
    .filter(item => item.type === 'podcast')
    .map(item => item.id)

  return {
    blogIds,
    podcastIds,
    totalItems: history.items.length,
  }
}

/**
 * React hook for view history (if using in components)
 */
export function useViewHistory() {
  if (typeof window === 'undefined') {
    return {
      history: { items: [], lastUpdated: new Date().toISOString() },
      addView: () => {},
      clearHistory: () => {},
      hasViewed: () => false,
      statistics: {
        totalViews: 0,
        blogViews: 0,
        podcastViews: 0,
        oldestView: null,
        newestView: null,
      },
    }
  }

  return {
    history: getViewHistory(),
    addView: addToViewHistory,
    clearHistory: clearViewHistory,
    hasViewed,
    statistics: getViewStatistics(),
  }
}
