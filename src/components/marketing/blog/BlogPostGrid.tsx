import { BlogPost } from '@/types/content'
import { BlogPostCard } from './BlogPostCard'
import { FileText } from 'lucide-react'

interface BlogPostGridProps {
  posts: BlogPost[]
  featured?: boolean
}

export function BlogPostGrid({ posts, featured = false }: BlogPostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4">
          <FileText className="w-8 h-8 text-neutral-400" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
          No hay art�culos disponibles
        </h3>
        <p className="text-neutral-600">
          No se encontraron art�culos que coincidan con tu b�squeda.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {posts.map(post => (
        <BlogPostCard key={post.id} post={post} featured={featured} />
      ))}
    </div>
  )
}
