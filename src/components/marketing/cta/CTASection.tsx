'use client'

import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Calendar, Download } from 'lucide-react'
import Link from 'next/link'

interface CTASectionProps {
  title: string
  subtitle?: string
  primaryCTA?: {
    text: string
    href: string
    icon?: 'arrow' | 'calendar' | 'download'
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  variant?: 'gradient' | 'solid' | 'outline'
}

export function CTASection({
  title,
  subtitle,
  primaryCTA = {
    text: 'Agenda tu Consulta Gratuita',
    href: '/contact',
    icon: 'calendar',
  },
  secondaryCTA,
  variant = 'gradient',
}: CTASectionProps) {
  const backgroundClasses = {
    gradient: 'bg-gradient-to-r from-primary-600 to-primary-900',
    solid: 'bg-primary-700',
    outline: 'bg-white border-2 border-primary-600',
  }

  const textColorClasses = {
    gradient: 'text-white',
    solid: 'text-white',
    outline: 'text-gray-900',
  }

  const subtitleColorClasses = {
    gradient: 'text-primary-100',
    solid: 'text-primary-200',
    outline: 'text-gray-600',
  }

  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case 'calendar':
        return <Calendar className="h-5 w-5" />
      case 'download':
        return <Download className="h-5 w-5" />
      case 'arrow':
      default:
        return <ArrowRight className="h-5 w-5" />
    }
  }

  return (
    <section className="py-16">
      <Container>
        <div
          className={`${backgroundClasses[variant]} relative overflow-hidden rounded-3xl px-8 py-16 shadow-2xl md:px-16 md:py-20`}
        >
          {/* Background Pattern */}
          {variant !== 'outline' && (
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          )}

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${textColorClasses[variant]}`}>
              {title}
            </h2>

            {subtitle && (
              <p className={`mt-4 text-lg ${subtitleColorClasses[variant]}`}>{subtitle}</p>
            )}

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* Primary CTA */}
              <Button
                asChild
                size="lg"
                variant={variant === 'outline' ? 'primary' : 'secondary'}
                className="group"
              >
                <Link href={primaryCTA.href}>
                  {primaryCTA.icon && getIcon(primaryCTA.icon)}
                  <span className="mx-2">{primaryCTA.text}</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              {/* Secondary CTA (optional) */}
              {secondaryCTA && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className={
                    variant !== 'outline'
                      ? 'border-white/30 text-white hover:bg-white/10'
                      : ''
                  }
                >
                  <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
                </Button>
              )}
            </div>

            {/* Supporting Text */}
            {variant !== 'outline' && (
              <p className="mt-6 text-sm text-primary-200">
                Sin compromiso. Sin costo. Solo una conversación honesta sobre tus desafíos y
                oportunidades.
              </p>
            )}
          </div>

          {/* Decorative Elements */}
          {variant !== 'outline' && (
            <>
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            </>
          )}
        </div>
      </Container>
    </section>
  )
}
