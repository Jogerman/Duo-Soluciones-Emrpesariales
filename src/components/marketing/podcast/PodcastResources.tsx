'use client'

import Link from 'next/link'
import { ExternalLink, Download, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

interface Resource {
  title: string
  url: string
  description?: string
}

interface PodcastResourcesProps {
  resources?: Resource[]
}

/**
 * PodcastResources component displays episode resources
 * Features: resource cards with icons, external link indicators
 */
export function PodcastResources({ resources }: PodcastResourcesProps) {
  if (!resources || resources.length === 0) {
    return null
  }

  // Determine icon based on URL or title
  const getResourceIcon = (resource: Resource) => {
    const url = resource.url.toLowerCase()
    const title = resource.title.toLowerCase()

    if (url.includes('.pdf') || title.includes('pdf') || title.includes('descarg')) {
      return <Download className="h-5 w-5 text-primary-600" />
    }

    if (title.includes('libro') || title.includes('book')) {
      return <BookOpen className="h-5 w-5 text-primary-600" />
    }

    return <ExternalLink className="h-5 w-5 text-primary-600" />
  }

  const isExternalLink = (url: string) => {
    return url.startsWith('http://') || url.startsWith('https://')
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-xl text-neutral-900">Recursos Mencionados</h3>

      <div className="space-y-3">
        {resources.map((resource, index) => (
          <Card key={index} className="transition-all duration-200 hover:shadow-md">
            <CardContent className="p-4">
              <Link
                href={resource.url}
                target={isExternalLink(resource.url) ? '_blank' : undefined}
                rel={isExternalLink(resource.url) ? 'noopener noreferrer' : undefined}
                className="group flex items-start gap-3"
              >
                {/* Icon */}
                <div className="shrink-0 pt-0.5">{getResourceIcon(resource)}</div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h4 className="mb-1 font-medium text-neutral-900 group-hover:text-primary-600">
                    {resource.title}
                  </h4>
                  {resource.description && (
                    <p className="text-sm text-neutral-600">{resource.description}</p>
                  )}
                </div>

                {/* External Link Indicator */}
                {isExternalLink(resource.url) && (
                  <ExternalLink className="h-4 w-4 shrink-0 text-neutral-400 transition-colors group-hover:text-primary-600" />
                )}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
