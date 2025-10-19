import * as React from 'react'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

export interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  href?: string
  className?: string
}

/**
 * ServiceCard - Specialized card for displaying services
 * Features brand gradient icon container and hover effects
 */
export function ServiceCard({ icon: Icon, title, description, href, className }: ServiceCardProps) {
  const CardWrapper = href ? 'a' : 'div'

  return (
    <Card
      className={cn(
        'group text-center transition-all duration-300',
        href && 'cursor-pointer hover:-translate-y-1',
        className
      )}
      {...(href && { as: CardWrapper, href })}
    >
      <CardHeader>
        {/* Icon with brand gradient background */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-700 shadow-md transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
