'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { SearchSuggestions } from './SearchSuggestions'
import { SearchResult } from '@/lib/utils/search'
import { addRecentSearch } from '@/lib/utils/search-analytics'

interface GlobalSearchProps {
  className?: string
  placeholder?: string
}

/**
 * GlobalSearch component
 * Main search interface with:
 * - Debounced search input (300ms)
 * - Real-time suggestions
 * - Keyboard navigation (arrows, enter, esc)
 * - Mobile optimized
 */
export function GlobalSearch({
  className = '',
  placeholder = 'Buscar artículos, podcasts...',
}: GlobalSearchProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState('')
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const [resultsAnnouncement, setResultsAnnouncement] = React.useState('')

  const searchRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const debounceTimerRef = React.useRef<NodeJS.Timeout>()

  // Fetch suggestions from API
  const fetchSuggestions = React.useCallback(async (searchQuery: string): Promise<void> => {
    if (!searchQuery.trim()) {
      setResults([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}&suggestions=true&limit=5`
      )

      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()

      if (data.success) {
        const resultsList = data.results || []
        setResults(resultsList)
        // Announce results to screen readers
        if (resultsList.length > 0) {
          setResultsAnnouncement(`${resultsList.length} resultado${resultsList.length !== 1 ? 's' : ''} encontrado${resultsList.length !== 1 ? 's' : ''}`)
        } else {
          setResultsAnnouncement('No se encontraron resultados')
        }
      } else {
        setResults([])
        setResultsAnnouncement('No se encontraron resultados')
      }
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
      setResultsAnnouncement('Error en la búsqueda')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounced search
  React.useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    if (query.trim()) {
      debounceTimerRef.current = setTimeout(() => {
        fetchSuggestions(query)
      }, 300)
    } else {
      setResults([])
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [query, fetchSuggestions])

  // Handle click outside to close
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle search submission
  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query
    if (!finalQuery.trim()) return

    addRecentSearch(finalQuery, results.length)
    setIsOpen(false)
    setQuery('')
    router.push(`/search?q=${encodeURIComponent(finalQuery)}`)
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setIsOpen(true)
    setSelectedIndex(-1)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'Enter') {
        handleSearch()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
        break

      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, -1))
        break

      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          const result = results[selectedIndex]
          const url = `/${result.type === 'blog' ? 'blog' : 'podcast'}/${result.slug}`
          addRecentSearch(query, results.length)
          setIsOpen(false)
          setQuery('')
          router.push(url)
        } else {
          handleSearch()
        }
        break

      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        inputRef.current?.blur()
        break

      default:
        break
    }
  }

  // Handle clear
  const handleClear = () => {
    setQuery('')
    setResults([])
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  // Handle focus
  const handleFocus = () => {
    setIsOpen(true)
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-neutral-400" aria-hidden="true" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder}
          className="block w-full rounded-lg border border-neutral-300 bg-white py-2.5 pl-10 pr-10 text-sm text-neutral-900 placeholder-neutral-500 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          aria-label="Buscar"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          aria-activedescendant={selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-600"
            aria-label="Limpiar búsqueda"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (
        <SearchSuggestions
          query={query}
          results={results}
          isLoading={isLoading}
          selectedIndex={selectedIndex}
          onSelectSuggestion={handleSearch}
          onClose={() => setIsOpen(false)}
        />
      )}

      {/* Screen reader announcement for search results */}
      <div role="status" aria-live="polite" className="sr-only">
        {resultsAnnouncement}
      </div>
    </div>
  )
}
