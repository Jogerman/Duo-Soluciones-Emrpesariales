'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface ServiceItem {
  id: string
  title: string
  description: string
  slug: string
  benefits: string[]
  icon?: string | LucideIcon // Support both string and component
  featured?: boolean
}

interface ServiceGridProps {
  title?: string
  subtitle?: string
  services: ServiceItem[]
  showBenefits?: boolean
  variant?: '2-col' | '3-col' | '4-col'
}

export function ServiceGrid({
  title = 'Servicios que Impulsan tu Crecimiento',
  subtitle = 'Soluciones personalizadas que se adaptan a las necesidades únicas de tu organización',
  services,
  showBenefits = true,
  variant = '2-col',
}: ServiceGridProps) {
  const gridClasses = {
    '2-col': 'md:grid-cols-2',
    '3-col': 'md:grid-cols-2 lg:grid-cols-3',
    '4-col': 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className="py-16 lg:py-24">
      <Container>
        {/* Section Header */}
        {title && (
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
            {subtitle && <p className="mt-4 text-lg text-gray-600">{subtitle}</p>}
          </div>
        )}

        {/* Services Grid */}
        <div className={`mt-12 grid gap-8 ${gridClasses[variant]}`}>
          {services.map(service => (
            <ServiceCard key={service.id} service={service} showBenefits={showBenefits} />
          ))}
        </div>
      </Container>
    </section>
  )
}

interface ServiceCardProps {
  service: ServiceItem
  showBenefits?: boolean
}

function ServiceCard({ service, showBenefits = true }: ServiceCardProps) {
  // Support both string (icon name) and component (LucideIcon)
  const getIconComponent = () => {
    if (!service.icon) return null

    if (typeof service.icon === 'string') {
      // Convert string to PascalCase icon name (e.g., 'target' -> 'Target')
      const iconName = service.icon.charAt(0).toUpperCase() + service.icon.slice(1)
      const IconComponent = Icons[iconName as keyof typeof Icons] as LucideIcon
      return IconComponent || null
    }

    return service.icon
  }

  const Icon = getIconComponent()

  return (
    <Card
      className={`group h-full transition-all duration-300 hover:shadow-xl ${
        service.featured
          ? 'border-primary-300 bg-primary-50/30 ring-2 ring-primary-200'
          : 'hover:border-primary-200'
      }`}
    >
      <CardHeader>
        {/* Icon and Featured Badge */}
        <div className="flex items-start justify-between">
          {Icon && (
            <div
              className={`mb-4 inline-flex rounded-lg p-3 ${
                service.featured
                  ? 'bg-primary-600 text-white'
                  : 'bg-primary-100 text-primary-700 group-hover:bg-primary-200'
              } transition-colors`}
            >
              <Icon className="h-6 w-6" />
            </div>
          )}

          {service.featured && (
            <span className="inline-flex items-center rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white">
              Destacado
            </span>
          )}
        </div>

        {/* Title and Description */}
        <CardTitle className="text-xl font-semibold leading-tight text-gray-900">
          {service.title}
        </CardTitle>
        <CardDescription className="mt-2 text-gray-600">{service.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Benefits List */}
        {showBenefits && service.benefits && service.benefits.length > 0 && (
          <ul className="space-y-3">
            {service.benefits.slice(0, 4).map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <span className="text-sm text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA Button */}
        <Button asChild variant="outline" className="w-full group-hover:border-primary-600">
          <Link href={`/services/${service.slug}`} className="group/btn">
            Conocer más
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
