import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/types/content'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDateShort } from '@/lib/utils/blog'
import { Clock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogPostCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card
        className={cn(
          'h-full overflow-hidden transition-all duration-300',
          'hover:shadow-xl hover:-translate-y-1',
          featured && 'md:flex md:flex-row'
        )}
      >
        {/* Cover Image */}
        <div
          className={cn(
            'relative overflow-hidden bg-neutral-100',
            featured ? 'md:w-1/2' : 'aspect-[16/9]'
          )}
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes={
              featured
                ? '(max-width: 768px) 100vw, 50vw'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            }
            priority={featured}
          />

          {/* Category Badge Overlay */}
          <div className="absolute top-4 left-4">
            <Badge
              style={{
                backgroundColor: post.category.color,
                borderColor: post.category.color,
              }}
              className="text-white shadow-md"
            >
              {post.category.name}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className={cn('flex flex-col p-6', featured && 'md:w-1/2 md:p-8')}>
          {/* Title */}
          <h3
            className={cn(
              'font-bold text-neutral-900 transition-colors group-hover:text-primary-600',
              'line-clamp-2 mb-3',
              featured ? 'text-2xl md:text-3xl' : 'text-xl'
            )}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p
            className={cn(
              'text-neutral-600 leading-relaxed mb-4 flex-grow',
              featured ? 'line-clamp-3 text-base' : 'line-clamp-2 text-sm'
            )}
          >
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-3">
              {/* Author */}
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-neutral-200">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-neutral-900">{post.author.name}</span>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span>{formatDateShort(post.publishedAt)}</span>
                    <span>"</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readingTime} min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Read More */}
            <Button
              variant="ghost"
              size="sm"
              className="group-hover:text-primary-600 group-hover:translate-x-1 transition-transform"
            >
              <span className="sr-only">Leer más</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}
