'use client'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ArrowRight, Calendar } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface HeroSectionProps {
  title: string
  subtitle: string
  description?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  variant?: 'gradient' | 'solid' | 'minimal'
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryCTA = { text: 'Agenda una Consulta', href: '/contact' },
  secondaryCTA = { text: 'Conoce Nuestros Servicios', href: '/services' },
  variant = 'gradient',
}: HeroSectionProps) {
  const gradientClasses = {
    gradient: 'bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900',
    solid: 'bg-primary-700',
    minimal: 'bg-white',
  }

  const textColorClasses = {
    gradient: 'text-white',
    solid: 'text-white',
    minimal: 'text-gray-900',
  }

  return (
    <section className={`relative overflow-hidden ${gradientClasses[variant]} py-20 lg:py-32`}>
      {/* Background Image - only for gradient/solid variants */}
      {variant !== 'minimal' && (
        <>
          <div className="absolute inset-0">
            <Image
              src="/hero-background.jpg"
              alt="DUO Soluciones Background"
              fill
              priority
              className="object-cover object-center"
              quality={85}
            />
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/80 to-secondary-900/85" />
          </div>
        </>
      )}

      {/* Content */}
      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Title */}
          <h1
            className={`text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl ${textColorClasses[variant]}`}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            className={`mt-6 text-lg leading-8 sm:text-xl ${
              variant === 'minimal' ? 'text-gray-600' : 'text-primary-100'
            }`}
          >
            {subtitle}
          </p>

          {/* Optional Description */}
          {description && (
            <p
              className={`mt-4 text-base ${
                variant === 'minimal' ? 'text-gray-500' : 'text-primary-200'
              }`}
            >
              {description}
            </p>
          )}

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant={variant === 'minimal' ? 'primary' : 'secondary'}>
              <Link href={primaryCTA.href} className="group">
                <Calendar className="mr-2 h-5 w-5" />
                {primaryCTA.text}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant={variant === 'minimal' ? 'outline' : 'outline'}
              className={
                variant !== 'minimal' ? 'border-white/30 text-white hover:bg-white/10' : ''
              }
            >
              <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
            </Button>
          </div>

          {/* Supporting Text - Only for gradient/solid */}
          {variant !== 'minimal' && (
            <p className="mt-8 text-sm text-primary-200">
              Más de 15 años transformando organizaciones en República Dominicana y el Caribe
            </p>
          )}
        </div>
      </Container>

      {/* Decorative Gradient Overlays */}
      {variant !== 'minimal' && (
        <>
          <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-black/20 to-transparent" />
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
        </>
      )}
    </section>
  )
}
