'use client'

import { Container } from '@/components/ui/Container'
import type { LucideIcon } from 'lucide-react'

export interface Stat {
  id: string
  value: string
  label: string
  description?: string
  icon?: LucideIcon
}

interface StatsSectionProps {
  title?: string
  subtitle?: string
  stats: Stat[]
  variant?: 'default' | 'gradient' | 'minimal'
}

export function StatsSection({
  title = 'Resultados que Hablan por Sí Mismos',
  subtitle,
  stats,
  variant = 'default',
}: StatsSectionProps) {
  const backgroundClasses = {
    default: 'bg-white',
    gradient: 'bg-gradient-to-br from-primary-600 to-primary-900',
    minimal: 'bg-gray-50',
  }

  const textColorClasses = {
    default: {
      title: 'text-gray-900',
      subtitle: 'text-gray-600',
      value: 'text-primary-600',
      label: 'text-gray-900',
      description: 'text-gray-600',
    },
    gradient: {
      title: 'text-white',
      subtitle: 'text-primary-100',
      value: 'text-white',
      label: 'text-white',
      description: 'text-primary-200',
    },
    minimal: {
      title: 'text-gray-900',
      subtitle: 'text-gray-600',
      value: 'text-primary-600',
      label: 'text-gray-800',
      description: 'text-gray-500',
    },
  }

  const colors = textColorClasses[variant]

  return (
    <section className={`${backgroundClasses[variant]} py-16 lg:py-24`}>
      <Container>
        {/* Section Header */}
        {title && (
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${colors.title}`}>
              {title}
            </h2>
            {subtitle && <p className={`mt-4 text-lg ${colors.subtitle}`}>{subtitle}</p>}
          </div>
        )}

        {/* Stats Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.id}
                className={`flex flex-col items-center text-center ${
                  variant === 'gradient' ? 'rounded-xl bg-white/10 p-6 backdrop-blur-sm' : ''
                }`}
              >
                {/* Icon (optional) */}
                {Icon && (
                  <div
                    className={`mb-4 inline-flex rounded-lg p-3 ${
                      variant === 'gradient'
                        ? 'bg-white/20 text-white'
                        : 'bg-primary-100 text-primary-700'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                )}

                {/* Value */}
                <div className={`text-5xl font-bold tracking-tight ${colors.value}`}>
                  {stat.value}
                </div>

                {/* Label */}
                <div className={`mt-2 text-lg font-semibold ${colors.label}`}>{stat.label}</div>

                {/* Description (optional) */}
                {stat.description && (
                  <p className={`mt-2 text-sm ${colors.description}`}>{stat.description}</p>
                )}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
