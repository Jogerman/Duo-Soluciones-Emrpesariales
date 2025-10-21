'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface BlogPostContentProps {
  content: string
  className?: string
}

export function BlogPostContent({ content, className }: BlogPostContentProps) {
  return (
    <article
      className={cn(
        'prose prose-lg max-w-none',
        // Headings
        'prose-headings:font-bold prose-headings:text-neutral-900 prose-headings:tracking-tight',
        'prose-h1:text-4xl prose-h1:mt-0 prose-h1:mb-8',
        'prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6',
        'prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4',
        'prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3',
        // Paragraphs
        'prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:mb-6',
        // Links
        'prose-a:text-primary-600 prose-a:no-underline prose-a:font-medium',
        'hover:prose-a:text-primary-700 hover:prose-a:underline',
        // Lists
        'prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6',
        'prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6',
        'prose-li:text-neutral-700 prose-li:my-2 prose-li:leading-relaxed',
        // Blockquotes
        'prose-blockquote:border-l-4 prose-blockquote:border-primary-600',
        'prose-blockquote:pl-6 prose-blockquote:py-1',
        'prose-blockquote:my-8 prose-blockquote:italic',
        'prose-blockquote:bg-primary-50/50',
        'prose-blockquote:text-neutral-800',
        // Code
        'prose-code:text-sm prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5',
        'prose-code:rounded prose-code:text-primary-700 prose-code:font-mono',
        'prose-code:before:content-[""] prose-code:after:content-[""]',
        // Pre (code blocks)
        'prose-pre:bg-neutral-900 prose-pre:text-neutral-100',
        'prose-pre:p-6 prose-pre:rounded-lg prose-pre:my-8',
        'prose-pre:overflow-x-auto prose-pre:text-sm',
        // Strong & Em
        'prose-strong:text-neutral-900 prose-strong:font-bold',
        'prose-em:text-neutral-800 prose-em:italic',
        // HR
        'prose-hr:border-neutral-200 prose-hr:my-12',
        // Images
        'prose-img:rounded-lg prose-img:shadow-md prose-img:my-8',
        // Tables
        'prose-table:border-collapse prose-table:my-8',
        'prose-th:bg-neutral-100 prose-th:font-semibold prose-th:p-3 prose-th:text-left',
        'prose-td:p-3 prose-td:border-t prose-td:border-neutral-200',
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  )
}
