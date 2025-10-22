'use client'

import dynamic from 'next/dynamic'

// Loading skeleton for BlogPostContent
function BlogPostContentSkeleton() {
  return (
    <div className="prose prose-lg max-w-none">
      <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        <div className="h-8 bg-gray-200 rounded w-2/3 mt-8"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  )
}

// Dynamic import for BlogPostContent with loading skeleton
const BlogPostContent = dynamic(
  () => import('./BlogPostContent').then((mod) => mod.BlogPostContent),
  {
    loading: () => <BlogPostContentSkeleton />,
    ssr: false,
  }
)

interface BlogPostContentWrapperProps {
  content: string
  className?: string
}

export function BlogPostContentWrapper({ content, className }: BlogPostContentWrapperProps) {
  return <BlogPostContent content={content} className={className} />
}
