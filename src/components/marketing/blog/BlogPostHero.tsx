import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/types/content'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { formatDate } from '@/lib/utils/blog'
import { Clock, Calendar, ChevronRight } from 'lucide-react'

interface BlogPostHeroProps {
  post: BlogPost
}

export function BlogPostHero({ post }: BlogPostHeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-primary-900/80" />
      </div>

      {/* Content */}
      <Container className="relative py-16 lg:py-24">
        {/* Breadcrumbs */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-white/80">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
            </li>
            <ChevronRight className="w-4 h-4" />
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <ChevronRight className="w-4 h-4" />
            <li>
              <Link
                href={`/blog?category=${post.category.slug}`}
                className="hover:text-white transition-colors"
              >
                {post.category.name}
              </Link>
            </li>
          </ol>
        </nav>

        {/* Category Badge */}
        <div className="mb-6">
          <Badge
            style={{
              backgroundColor: post.category.color,
              borderColor: post.category.color,
            }}
            className="text-white shadow-lg"
          >
            {post.category.name}
          </Badge>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-white/90">
          {/* Author - Only show if exists */}
          {post.author && (
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/30">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white">{post.author.name}</span>
                <span className="text-sm text-white/70">{post.author.role}</span>
              </div>
            </div>
          )}

          {/* Date & Reading Time */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
            <span className="text-white/50">•</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} min de lectura</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
