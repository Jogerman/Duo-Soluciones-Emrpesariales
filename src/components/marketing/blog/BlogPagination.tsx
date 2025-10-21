import { Button } from '@/components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function BlogPagination({ currentPage, totalPages, onPageChange }: BlogPaginationProps) {
  if (totalPages <= 1) return null

  const pages = generatePaginationPages(currentPage, totalPages)

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Paginaci�n">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="P�gina anterior"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline ml-1">Anterior</span>
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-neutral-400">
                ...
              </span>
            )
          }

          const pageNum = Number(page)
          const isActive = pageNum === currentPage

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              disabled={isActive}
              aria-label={`P�gina ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'min-w-[2.5rem] h-10 px-3 rounded-md text-sm font-medium',
                'transition-colors duration-200',
                isActive
                  ? 'bg-primary-600 text-white shadow-md cursor-default'
                  : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
              )}
            >
              {pageNum}
            </button>
          )
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="P�gina siguiente"
      >
        <span className="hidden sm:inline mr-1">Siguiente</span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </nav>
  )
}

/**
 * Generate pagination pages with ellipsis
 * Shows: 1 ... 4 5 6 ... 10
 */
function generatePaginationPages(currentPage: number, totalPages: number): (number | string)[] {
  const pages: (number | string)[] = []

  if (totalPages <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)

    if (currentPage > 3) {
      pages.push('...')
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push('...')
    }

    // Always show last page
    pages.push(totalPages)
  }

  return pages
}
