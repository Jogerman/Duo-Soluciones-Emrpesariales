'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clock, TrendingUp, X, FileText, Mic } from 'lucide-react'
import { SearchResult } from '@/lib/utils/search'
import { getRecentSearches, removeRecentSearch } from '@/lib/utils/search-analytics'

interface SearchSuggestionsProps {
  query: string
  results: SearchResult[]
  isLoading: boolean
  selectedIndex?: number
  onSelectSuggestion: (query: string) => void
  onClose: () => void
}

/**
 * SearchSuggestions component
 * Displays search suggestions dropdown with:
 * - Live search results
 * - Recent searches
 * - Quick navigation
 */
export function SearchSuggestions({
  query,
  results,
  isLoading,
  selectedIndex = -1,
  onSelectSuggestion,
  onClose,
}: SearchSuggestionsProps) {
  const [recentSearches, setRecentSearches] = React.useState<string[]>([])

  React.useEffect(() => {
    // Load recent searches
    const recent = getRecentSearches()
    setRecentSearches(recent.slice(0, 5).map(s => s.query))
  }, [])

  const handleRemoveRecent = (searchQuery: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    removeRecentSearch(searchQuery)
    setRecentSearches(prev => prev.filter(q => q !== searchQuery))
  }

  const showRecentSearches = !query.trim() && recentSearches.length > 0
  const showResults = query.trim().length > 0 && results.length > 0
  const showNoResults = query.trim().length > 0 && !isLoading && results.length === 0

  if (!showRecentSearches && !showResults && !showNoResults && !isLoading) {
    return null
  }

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-xl">
      <div className="max-h-[500px] overflow-y-auto">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center p-8" role="status" aria-live="polite">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-primary-600" aria-hidden="true"></div>
            <span className="sr-only">Cargando resultados...</span>
          </div>
        )}

        {/* Recent Searches */}
        {showRecentSearches && (
          <div className="p-2">
            <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <Clock className="h-4 w-4" aria-hidden="true" />
              Búsquedas recientes
            </div>
            <div className="space-y-1" role="list">
              {recentSearches.map(searchQuery => (
                <div key={searchQuery} role="listitem" className="group flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100">
                  <button
                    onClick={() => onSelectSuggestion(searchQuery)}
                    className="flex-1 text-left"
                    aria-label={`Buscar nuevamente: ${searchQuery}`}
                  >
                    {searchQuery}
                  </button>
                  <button
                    onClick={e => handleRemoveRecent(searchQuery, e)}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label={`Eliminar "${searchQuery}" del historial`}
                  >
                    <X className="h-4 w-4 text-neutral-400 hover:text-neutral-600" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {showResults && (
          <div className="p-2">
            <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              Resultados ({results.length})
            </div>
            <div role="listbox" id="search-suggestions" className="space-y-1">
              {results.map((result, index) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  id={`search-result-${index}`}
                  href={`/${result.type === 'blog' ? 'blog' : 'podcast'}/${result.slug}`}
                  onClick={onClose}
                  role="option"
                  aria-selected={index === selectedIndex}
                  className="flex items-start gap-3 rounded-md px-3 py-2 text-left transition-colors hover:bg-neutral-100"
                >
                  <div className="flex-shrink-0 pt-0.5">
                    {result.type === 'blog' ? (
                      <FileText className="h-4 w-4 text-primary-600" aria-hidden="true" />
                    ) : (
                      <Mic className="h-4 w-4 text-secondary-600" aria-hidden="true" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-neutral-900 line-clamp-1">
                        {result.title}
                      </h4>
                    </div>
                    <p className="mt-0.5 text-xs text-neutral-500 line-clamp-1">
                      {result.description}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                        {result.type === 'blog' ? 'Blog' : 'Podcast'}
                      </span>
                      <span className="text-xs text-neutral-400">{result.category}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {results.length > 0 && (
              <div className="mt-2 border-t border-neutral-100 p-2">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="block rounded-md px-3 py-2 text-center text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50"
                >
                  Ver todos los resultados
                </Link>
              </div>
            )}
          </div>
        )}

        {/* No Results */}
        {showNoResults && (
          <div className="p-8 text-center">
            <p className="text-sm text-neutral-500">
              No se encontraron resultados para &quot;{query}&quot;
            </p>
            <p className="mt-2 text-xs text-neutral-400">
              Intenta con otras palabras clave
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
