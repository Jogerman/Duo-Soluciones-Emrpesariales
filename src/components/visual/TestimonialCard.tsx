import * as React from 'react'
import Image from 'next/image'
import { Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

export interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
  image?: string
  className?: string
}

/**
 * TestimonialCard - Display client testimonials
 * Features quote icon, client info, and optional photo
 */
export function TestimonialCard({
  quote,
  author,
  role,
  company,
  image,
  className,
}: TestimonialCardProps) {
  return (
    <Card className={cn('relative', className)}>
      <CardContent className="pt-6">
        {/* Quote icon */}
        <Quote className="mb-4 h-8 w-8 text-primary-600 opacity-20" />

        {/* Quote text */}
        <blockquote className="mb-6 text-base italic text-neutral-700">
          &ldquo;{quote}&rdquo;
        </blockquote>

        {/* Author info */}
        <div className="flex items-center gap-4">
          {image ? (
            <Image
              src={image}
              alt={author}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-secondary-700 text-white font-semibold">
              {author.charAt(0)}
            </div>
          )}

          <div>
            <div className="font-semibold text-neutral-900">{author}</div>
            <div className="text-sm text-neutral-600">
              {role} • {company}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
