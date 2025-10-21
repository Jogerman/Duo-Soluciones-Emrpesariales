'use client'

import { useState, useMemo } from 'react'
import { Container } from '@/components/ui/Container'
import { BlogPostCard } from '@/components/marketing/blog/BlogPostCard'
import { BlogPostGrid } from '@/components/marketing/blog/BlogPostGrid'
import { BlogFilters } from '@/components/marketing/blog/BlogFilters'
import { BlogPagination } from '@/components/marketing/blog/BlogPagination'
import { blogPosts, getFeaturedBlogPosts } from '@/lib/mock-data/blog-posts'
import { categories } from '@/lib/mock-data/categories'
import { BookOpen } from 'lucide-react'

const POSTS_PER_PAGE = 12

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<{ category?: string; search?: string }>({})

  // Get featured posts
  const featuredPosts = getFeaturedBlogPosts()

  // Filter posts
  const filteredPosts = useMemo(() => {
    let filtered = [...blogPosts]

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(post => post.category.id === filters.category)
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower) ||
          post.author.name.toLowerCase().includes(searchLower) ||
          post.tags.some(tag => tag.name.toLowerCase().includes(searchLower))
      )
    }

    // Sort by date
    return filtered.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  }, [filters])

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

  // Reset page when filters change
  const handleFilterChange = (newFilters: { category?: string; search?: string }) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-16 lg:py-24">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">Blog</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Insights y Recursos</h1>

            <p className="text-xl text-white/90 leading-relaxed">
              Art�culos, gu�as y mejores pr�cticas sobre desarrollo organizacional, mejora de
              procesos, implementaci�n de ERP, gobernanza corporativa y transformaci�n digital.
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Posts Section */}
      {currentPage === 1 && !filters.category && !filters.search && (
        <section className="py-16 bg-neutral-50">
          <Container>
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">Art�culos destacados</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Main Featured Post */}
              {featuredPosts[0] && (
                <div className="lg:row-span-2">
                  <BlogPostCard post={featuredPosts[0]} featured />
                </div>
              )}

              {/* Secondary Featured Posts */}
              <div className="grid grid-cols-1 gap-8">
                {featuredPosts.slice(1, 3).map(post => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Main Content Section */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-3">
              <div className="sticky top-8">
                <BlogFilters
                  categories={categories}
                  activeCategory={filters.category}
                  searchQuery={filters.search}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </aside>

            {/* Posts Grid */}
            <main className="lg:col-span-9">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900">
                  {filters.category || filters.search
                    ? `${filteredPosts.length} ${
                        filteredPosts.length === 1 ? 'art�culo encontrado' : 'art�culos encontrados'
                      }`
                    : 'Todos los art�culos'}
                </h2>
              </div>

              <BlogPostGrid posts={paginatedPosts} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <BlogPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </main>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-900 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              �Necesitas ayuda con tu proyecto?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Nuestro equipo de expertos est� listo para acompa�arte en tu proceso de transformaci�n
              empresarial.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-white text-primary-600 font-semibold hover:bg-neutral-100 transition-colors"
            >
              Cont�ctanos
            </a>
          </div>
        </Container>
      </section>
    </div>
  )
}
