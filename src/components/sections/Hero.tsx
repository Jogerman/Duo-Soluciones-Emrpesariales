import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

const benefits = [
  'Más de 28 años de experiencia',
  'Expertos certificados',
  'Resultados medibles',
  'Compromiso con la excelencia',
]

/**
 * Hero component - Main landing section
 * Features: Headline, subheadline, dual CTAs, benefits list
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-200 opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary-200 opacity-20 blur-3xl" />
      </div>

      <Container>
        <div className="grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
                Transformamos{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-700 bg-clip-text text-transparent">
                  desafíos
                </span>{' '}
                en oportunidades sostenibles
              </h1>
              <p className="text-lg text-neutral-600 md:text-xl">
                Consultoría estratégica en desarrollo organizacional, mejora de procesos,
                implementación ERP y gobernanza corporativa para empresas líderes en República
                Dominicana.
              </p>
            </div>

            {/* Benefits list */}
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-neutral-700">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary-600" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  Contáctanos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/servicios">Ver Servicios</Link>
              </Button>
            </div>
          </div>

          {/* Visual element */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-700 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="mb-4 text-8xl font-bold">DUO</div>
                  <div className="text-xl font-medium">Soluciones Empresariales</div>
                </div>
              </div>
              {/* Decorative grid */}
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
