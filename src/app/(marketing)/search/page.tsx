'use client'

import * as React from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { SearchResults } from '@/components/marketing/search/SearchResults'
import { SearchResult } from '@/lib/utils/search'
import { addRecentSearch } from '@/lib/utils/search-analytics'

/**
 * Search Results Page Component (wrapped in Suspense)
 */
function SearchPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const query = searchParams.get('q') || ''
  const type = (searchParams.get('type') || 'all') as 'all' | 'blog' | 'podcast'
  const sortBy = (searchParams.get('sortBy') || 'relevance') as 'relevance' | 'date'
  const page = parseInt(searchParams.get('page') || '1', 10)

  const [results, setResults] = React.useState<SearchResult[]>([])
  const [totalResults, setTotalResults] = React.useState(0)
  const [breakdown, setBreakdown] = React.useState({ blog: 0, podcast: 0 })
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const itemsPerPage = 10
  const totalPages = Math.ceil(totalResults / itemsPerPage)

  // Fetch search results
  React.useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([])
        setTotalResults(0)
        setBreakdown({ blog: 0, podcast: 0 })
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}&type=${type}&sortBy=${sortBy}&limit=50`
        )

        if (!response.ok) {
          throw new Error('Search failed')
        }

        const data = await response.json()

        if (data.success) {
          const allResults = data.results || []

          // Apply pagination
          const startIndex = (page - 1) * itemsPerPage
          const endIndex = startIndex + itemsPerPage
          const paginatedResults = allResults.slice(startIndex, endIndex)

          setResults(paginatedResults)
          setTotalResults(allResults.length)
          setBreakdown(data.breakdown || { blog: 0, podcast: 0 })

          // Track search in analytics
          if (page === 1) {
            addRecentSearch(query, allResults.length)
          }
        } else {
          throw new Error(data.error || 'Search failed')
        }
      } catch (err) {
        console.error('Search error:', err)
        setError('Hubo un error al realizar la búsqueda. Por favor, intenta nuevamente.')
        setResults([])
        setTotalResults(0)
        setBreakdown({ blog: 0, podcast: 0 })
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query, type, sortBy, page])

  // Update URL when filters change
  const updateUrl = (params: {
    type?: 'all' | 'blog' | 'podcast'
    sortBy?: 'relevance' | 'date'
    page?: number
  }) => {
    const newParams = new URLSearchParams(searchParams.toString())

    if (params.type !== undefined) {
      newParams.set('type', params.type)
      newParams.set('page', '1') // Reset to page 1 when changing type
    }

    if (params.sortBy !== undefined) {
      newParams.set('sortBy', params.sortBy)
      newParams.set('page', '1') // Reset to page 1 when changing sort
    }

    if (params.page !== undefined) {
      newParams.set('page', params.page.toString())
    }

    router.push(`/search?${newParams.toString()}`)
  }

  const handleTypeChange = (newType: 'all' | 'blog' | 'podcast') => {
    updateUrl({ type: newType })
  }

  const handleSortChange = (newSortBy: 'relevance' | 'date') => {
    updateUrl({ sortBy: newSortBy })
  }

  const handlePageChange = (newPage: number) => {
    updateUrl({ page: newPage })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <Container>
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-neutral-600">
          <Link href="/" className="hover:text-neutral-900">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-neutral-900">Búsqueda</span>
        </nav>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-300 border-t-primary-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Search Results */}
        {!isLoading && !error && (
          <SearchResults
            query={query}
            results={results}
            totalResults={totalResults}
            breakdown={breakdown}
            type={type}
            sortBy={sortBy}
            currentPage={page}
            totalPages={totalPages}
            onTypeChange={handleTypeChange}
            onSortChange={handleSortChange}
            onPageChange={handlePageChange}
          />
        )}

        {/* No query state */}
        {!query && !isLoading && (
          <div className="py-16 text-center">
            <h1 className="text-3xl font-bold text-neutral-900">Búsqueda</h1>
            <p className="mt-4 text-lg text-neutral-600">
              Ingresa un término de búsqueda para encontrar artículos y episodios de
              podcast.
            </p>
          </div>
        )}
      </Container>
    </div>
  )
}

/**
 * Search Results Page
 * Route: /search?q=query&type=all&sortBy=relevance&page=1
 */
export default function SearchPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-neutral-50 py-12">
          <Container>
            <div className="flex items-center justify-center py-16">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-300 border-t-primary-600"></div>
            </div>
          </Container>
        </div>
      }
    >
      <SearchPageContent />
    </React.Suspense>
  )
}
