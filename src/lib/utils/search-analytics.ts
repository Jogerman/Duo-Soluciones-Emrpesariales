/**
 * Search Analytics
 * Manages search history and popular searches using localStorage
 */

const RECENT_SEARCHES_KEY = 'duo_recent_searches'
const POPULAR_SEARCHES_KEY = 'duo_popular_searches'
const MAX_RECENT_SEARCHES = 10
const MAX_POPULAR_SEARCHES = 20

export interface SearchHistory {
  query: string
  timestamp: number
  resultsCount?: number
}

export interface PopularSearch {
  query: string
  count: number
  lastSearched: number
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
 * Get recent searches from localStorage
 */
export function getRecentSearches(): SearchHistory[] {
  if (!isLocalStorageAvailable()) {
    return []
  }

  try {
    const data = localStorage.getItem(RECENT_SEARCHES_KEY)
    if (!data) {
      return []
    }

    const searches: SearchHistory[] = JSON.parse(data)
    return searches.sort((a, b) => b.timestamp - a.timestamp)
  } catch (error) {
    console.error('Error reading recent searches:', error)
    return []
  }
}

/**
 * Add a search to recent searches
 */
export function addRecentSearch(query: string, resultsCount?: number): void {
  if (!isLocalStorageAvailable() || !query.trim()) {
    return
  }

  try {
    const searches = getRecentSearches()

    // Remove duplicate if exists
    const filtered = searches.filter(
      s => s.query.toLowerCase() !== query.toLowerCase()
    )

    // Add new search at the beginning
    const newSearch: SearchHistory = {
      query: query.trim(),
      timestamp: Date.now(),
      resultsCount,
    }

    const updated = [newSearch, ...filtered].slice(0, MAX_RECENT_SEARCHES)

    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))

    // Also update popular searches
    updatePopularSearch(query)
  } catch (error) {
    console.error('Error saving recent search:', error)
  }
}

/**
 * Clear recent searches
 */
export function clearRecentSearches(): void {
  if (!isLocalStorageAvailable()) {
    return
  }

  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  } catch (error) {
    console.error('Error clearing recent searches:', error)
  }
}

/**
 * Remove a specific recent search
 */
export function removeRecentSearch(query: string): void {
  if (!isLocalStorageAvailable()) {
    return
  }

  try {
    const searches = getRecentSearches()
    const filtered = searches.filter(
      s => s.query.toLowerCase() !== query.toLowerCase()
    )
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Error removing recent search:', error)
  }
}

/**
 * Get popular searches from localStorage
 */
export function getPopularSearches(): PopularSearch[] {
  if (!isLocalStorageAvailable()) {
    return []
  }

  try {
    const data = localStorage.getItem(POPULAR_SEARCHES_KEY)
    if (!data) {
      return []
    }

    const searches: PopularSearch[] = JSON.parse(data)
    return searches.sort((a, b) => b.count - a.count)
  } catch (error) {
    console.error('Error reading popular searches:', error)
    return []
  }
}

/**
 * Update popular searches count
 */
function updatePopularSearch(query: string): void {
  if (!isLocalStorageAvailable() || !query.trim()) {
    return
  }

  try {
    const searches = getPopularSearches()
    const normalizedQuery = query.trim().toLowerCase()

    // Find existing search
    const existing = searches.find(
      s => s.query.toLowerCase() === normalizedQuery
    )

    if (existing) {
      // Update count and timestamp
      existing.count += 1
      existing.lastSearched = Date.now()
    } else {
      // Add new popular search
      searches.push({
        query: query.trim(),
        count: 1,
        lastSearched: Date.now(),
      })
    }

    // Sort by count and keep top items
    const sorted = searches.sort((a, b) => b.count - a.count)
    const limited = sorted.slice(0, MAX_POPULAR_SEARCHES)

    localStorage.setItem(POPULAR_SEARCHES_KEY, JSON.stringify(limited))
  } catch (error) {
    console.error('Error updating popular search:', error)
  }
}

/**
 * Get top popular searches
 */
export function getTopPopularSearches(limit: number = 5): PopularSearch[] {
  const searches = getPopularSearches()
  return searches.slice(0, limit)
}

/**
 * Clear popular searches
 */
export function clearPopularSearches(): void {
  if (!isLocalStorageAvailable()) {
    return
  }

  try {
    localStorage.removeItem(POPULAR_SEARCHES_KEY)
  } catch (error) {
    console.error('Error clearing popular searches:', error)
  }
}

/**
 * Clear all search analytics data
 */
export function clearAllSearchData(): void {
  clearRecentSearches()
  clearPopularSearches()
}

/**
 * Get suggested queries based on partial input and history
 */
export function getSuggestedQueries(
  partialQuery: string,
  limit: number = 5
): string[] {
  if (!partialQuery.trim()) {
    // Return recent searches if no query
    const recent = getRecentSearches()
    return recent.slice(0, limit).map(s => s.query)
  }

  const normalizedInput = partialQuery.toLowerCase().trim()

  // Get all searches (recent + popular)
  const recent = getRecentSearches()
  const popular = getPopularSearches()

  // Combine and deduplicate
  const allQueries = new Set<string>()

  recent.forEach(s => allQueries.add(s.query))
  popular.forEach(s => allQueries.add(s.query))

  // Filter matches
  const matches = Array.from(allQueries).filter(query =>
    query.toLowerCase().includes(normalizedInput)
  )

  // Sort by popularity (if available) and recency
  const sorted = matches.sort((a, b) => {
    const popA = popular.find(p => p.query === a)
    const popB = popular.find(p => p.query === b)

    if (popA && popB) {
      return popB.count - popA.count
    }
    if (popA) return -1
    if (popB) return 1

    const recentA = recent.find(r => r.query === a)
    const recentB = recent.find(r => r.query === b)

    if (recentA && recentB) {
      return recentB.timestamp - recentA.timestamp
    }

    return 0
  })

  return sorted.slice(0, limit)
}
