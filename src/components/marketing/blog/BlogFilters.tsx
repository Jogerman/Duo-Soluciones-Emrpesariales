'use client'

import { useState } from 'react'
import { Category } from '@/types/content'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogFiltersProps {
  categories: Category[]
  activeCategory?: string
  searchQuery?: string
  onFilterChange: (filters: { category?: string; search?: string }) => void
}

export function BlogFilters({
  categories,
  activeCategory,
  searchQuery = '',
  onFilterChange,
}: BlogFiltersProps) {
  const [search, setSearch] = useState(searchQuery)

  const handleCategoryClick = (categoryId: string) => {
    const newCategory = activeCategory === categoryId ? undefined : categoryId
    onFilterChange({ category: newCategory, search })
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onFilterChange({ category: activeCategory, search: value })
  }

  const handleClearFilters = () => {
    setSearch('')
    onFilterChange({ category: undefined, search: '' })
  }

  const activeFiltersCount = (activeCategory ? 1 : 0) + (search ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <Input
          type="search"
          placeholder="Buscar artículos..."
          value={search}
          onChange={e => handleSearchChange(e.target.value)}
          className="pl-10 pr-4"
        />
      </div>

      {/* Category Filters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-neutral-900">Categorías</h3>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-xs">
              <X className="w-3 h-3 mr-1" />
              Limpiar ({activeFiltersCount})
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => {
            const isActive = activeCategory === category.id
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  'inline-flex items-center px-4 py-2 rounded-full text-sm font-medium',
                  'transition-all duration-200',
                  'border-2',
                  isActive
                    ? 'border-current shadow-md scale-105'
                    : 'border-transparent hover:scale-105 hover:shadow-sm'
                )}
                style={{
                  backgroundColor: isActive ? category.color : `${category.color}15`,
                  color: isActive ? '#ffffff' : category.color,
                }}
              >
                {category.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
