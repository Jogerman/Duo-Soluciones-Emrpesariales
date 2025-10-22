'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FileText, Mic, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react'
import { SearchResult } from '@/lib/utils/search'

interface SearchResultsProps {
  query: string
  results: SearchResult[]
  totalResults: number
  breakdown: {
    blog: number
    podcast: number
  }
  type?: 'all' | 'blog' | 'podcast'
  sortBy?: 'relevance' | 'date'
  currentPage?: number
  totalPages?: number
  onTypeChange?: (type: 'all' | 'blog' | 'podcast') => void
  onSortChange?: (sortBy: 'relevance' | 'date') => void
  onPageChange?: (page: number) => void
}

/**
 * SearchResults component
 * Displays search results with:
 * - Filter by type (all/blog/podcast)
 * - Sort by relevance/date
 * - Pagination
 * - Results grouped by type
 */
export function SearchResults({
  query,
  results,
  totalResults,
  breakdown,
  type = 'all',
  sortBy = 'relevance',
  currentPage = 1,
  totalPages = 1,
  onTypeChange,
  onSortChange,
  onPageChange,
}: SearchResultsProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  // Group results by type
  const blogResults = results.filter(r => r.type === 'blog')
  const podcastResults = results.filter(r => r.type === 'podcast')

  return (
    <div className="space-y-8">
      {/* Header with filters */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">
            Resultados de búsqueda
          </h1>
          <p className="mt-2 text-lg text-neutral-600">
            {totalResults > 0 ? (
              <>
                {totalResults} resultado{totalResults !== 1 ? 's' : ''} para &quot;
                <span className="font-semibold">{query}</span>&quot;
              </>
            ) : (
              <>No se encontraron resultados para &quot;{query}&quot;</>
            )}
          </p>
        </div>

        {/* Filters */}
        {totalResults > 0 && (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Type Filter */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar resultados por tipo de contenido">
              <button
                onClick={() => onTypeChange?.('all')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  type === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                aria-pressed={type === 'all'}
                aria-label={`Mostrar todos los resultados (${totalResults})`}
              >
                Todos ({totalResults})
              </button>
              <button
                onClick={() => onTypeChange?.('blog')}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  type === 'blog'
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                aria-pressed={type === 'blog'}
                aria-label={`Mostrar solo artículos del blog (${breakdown.blog})`}
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Blog ({breakdown.blog})
              </button>
              <button
                onClick={() => onTypeChange?.('podcast')}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  type === 'podcast'
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                aria-pressed={type === 'podcast'}
                aria-label={`Mostrar solo episodios de podcast (${breakdown.podcast})`}
              >
                <Mic className="h-4 w-4" aria-hidden="true" />
                Podcast ({breakdown.podcast})
              </button>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-by" className="text-sm text-neutral-600">Ordenar por:</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={e => onSortChange?.(e.target.value as 'relevance' | 'date')}
                className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                aria-label="Ordenar resultados por relevancia o fecha"
              >
                <option value="relevance">Relevancia</option>
                <option value="date">Fecha</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {totalResults > 0 ? (
        <div className="space-y-8">
          {/* Blog Results Section */}
          {(type === 'all' || type === 'blog') && blogResults.length > 0 && (
            <section>
              {type === 'all' && (
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-neutral-900">
                  <FileText className="h-5 w-5 text-primary-600" aria-hidden="true" />
                  Artículos del Blog ({blogResults.length})
                </h2>
              )}
              <div className="space-y-6">
                {blogResults.map(result => (
                  <SearchResultCard key={`blog-${result.id}`} result={result} formatDate={formatDate} />
                ))}
              </div>
            </section>
          )}

          {/* Podcast Results Section */}
          {(type === 'all' || type === 'podcast') && podcastResults.length > 0 && (
            <section>
              {type === 'all' && (
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-neutral-900">
                  <Mic className="h-5 w-5 text-secondary-600" aria-hidden="true" />
                  Episodios de Podcast ({podcastResults.length})
                </h2>
              )}
              <div className="space-y-6">
                {podcastResults.map(result => (
                  <SearchResultCard key={`podcast-${result.id}`} result={result} formatDate={formatDate} />
                ))}
              </div>
            </section>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-2 pt-8" aria-label="Paginación de resultados de búsqueda">
              <button
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Ir a página anterior"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Anterior
              </button>
              <span className="px-4 py-2 text-sm text-neutral-600" aria-current="page">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Ir a página siguiente"
              >
                Siguiente
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </nav>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
            <Search className="h-8 w-8 text-neutral-400" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900">
            No se encontraron resultados
          </h2>
          <p className="mt-2 text-neutral-600">
            Intenta con otras palabras clave o explora nuestro contenido:
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              <FileText className="h-4 w-4" />
              Ver Blog
            </Link>
            <Link
              href="/podcast"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              <Mic className="h-4 w-4" />
              Ver Podcast
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Individual search result card
 */
function SearchResultCard({
  result,
  formatDate,
}: {
  result: SearchResult
  formatDate: (date: string) => string
}) {
  const linkHref = `/${result.type === 'blog' ? 'blog' : 'podcast'}/${result.slug}`

  return (
    <article className="group overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow hover:shadow-lg">
      <Link href={linkHref} className="flex flex-col gap-4 p-6 sm:flex-row">
        {/* Image */}
        <div className="relative h-48 flex-shrink-0 overflow-hidden rounded-lg sm:h-32 sm:w-48">
          <Image
            src={result.coverImage}
            alt=""
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute left-2 top-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                result.type === 'blog'
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-600 text-white'
              }`}
            >
              {result.type === 'blog' ? (
                <>
                  <FileText className="h-3 w-3" aria-hidden="true" />
                  Blog
                </>
              ) : (
                <>
                  <Mic className="h-3 w-3" aria-hidden="true" />
                  Podcast
                </>
              )}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-neutral-900 transition-colors group-hover:text-primary-600">
              {result.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
              {result.description}
            </p>
          </div>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={result.publishedAt}>{formatDate(result.publishedAt)}</time>
            </span>
            <span className="flex items-center gap-1">
              <Tag className="h-4 w-4" aria-hidden="true" />
              {result.category}
            </span>
            {result.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {result.tags.slice(0, 2).map(tag => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  )
}
