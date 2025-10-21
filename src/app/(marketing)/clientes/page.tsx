import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CTASection } from '@/components/marketing/cta/CTASection'
import {
  Building2,
  HeartPulse,
  Factory,
  ShoppingCart,
  Laptop,
  Landmark,
  Star,
  Award,
  Users,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react'
import {
  clientStats,
  industries,
  testimonials,
  caseStudies,
  certifications,
} from '@/lib/mock-data/clients'
import { ClientGrid } from './components/ClientGrid'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// SEO Metadata
export const metadata: Metadata = {
  title: 'Nuestros Clientes | Portfolio de Empresas | DUO Soluciones',
  description:
    'Más de 50 empresas en República Dominicana confían en DUO Soluciones. Conoce nuestros clientes y casos de éxito en banca, salud, manufactura y más.',
  keywords: [
    'clientes DUO Soluciones',
    'portfolio consultoría',
    'casos de éxito',
    'empresas República Dominicana',
    'testimonios clientes',
    'transformación digital',
    'consultoría empresarial',
  ],
  openGraph: {
    title: 'Nuestros Clientes | DUO Soluciones',
    description:
      'Más de 50 empresas transformadas. Conoce nuestros clientes y casos de éxito en República Dominicana.',
    url: 'https://duo-soluciones.com/clientes',
    siteName: 'DUO Soluciones Empresariales',
    type: 'website',
    images: [
      {
        url: '/images/og-clientes.jpg',
        width: 1200,
        height: 630,
        alt: 'Clientes DUO Soluciones Empresariales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nuestros Clientes | DUO Soluciones',
    description: 'Más de 50 empresas transformadas con soluciones probadas',
    images: ['/images/og-clientes.jpg'],
    creator: '@duosoluciones',
  },
}

// Icon mapping for industries
const industryIcons = {
  'building-2': Building2,
  'heart-pulse': HeartPulse,
  factory: Factory,
  'shopping-cart': ShoppingCart,
  laptop: Laptop,
  landmark: Landmark,
}

export default function ClientesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Nuestros Clientes
            </h1>
            <p className="mt-6 text-lg leading-8 text-primary-100 sm:text-xl">
              Más de 50 empresas líderes en República Dominicana y el Caribe confían en DUO
              Soluciones para transformar sus organizaciones
            </p>
            <p className="mt-4 text-base leading-7 text-primary-200">
              Trabajamos con empresas de todos los tamaños y sectores, entregando soluciones que
              generan resultados medibles, sostenibles y transformadores.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 lg:py-16">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Stat 1 */}
            <div className="text-center">
              <div className="inline-flex rounded-full bg-primary-100 p-4 mb-4">
                <Users className="h-8 w-8 text-primary-700" />
              </div>
              <div className="text-4xl font-bold text-primary-700">{clientStats.totalClients}+</div>
              <div className="mt-2 text-sm font-medium text-gray-600">Clientes Satisfechos</div>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className="inline-flex rounded-full bg-secondary-100 p-4 mb-4">
                <CheckCircle2 className="h-8 w-8 text-secondary-700" />
              </div>
              <div className="text-4xl font-bold text-secondary-700">
                {clientStats.projectsCompleted}+
              </div>
              <div className="mt-2 text-sm font-medium text-gray-600">Proyectos Completados</div>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className="inline-flex rounded-full bg-primary-100 p-4 mb-4">
                <Award className="h-8 w-8 text-primary-700" />
              </div>
              <div className="text-4xl font-bold text-primary-700">
                {clientStats.yearsExperience}+
              </div>
              <div className="mt-2 text-sm font-medium text-gray-600">Años de Experiencia</div>
            </div>

            {/* Stat 4 */}
            <div className="text-center">
              <div className="inline-flex rounded-full bg-secondary-100 p-4 mb-4">
                <TrendingUp className="h-8 w-8 text-secondary-700" />
              </div>
              <div className="text-4xl font-bold text-secondary-700">
                {clientStats.satisfactionRate}%
              </div>
              <div className="mt-2 text-sm font-medium text-gray-600">Tasa de Satisfacción</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Client Logo Grid Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Empresas que Confían en Nosotros
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Selecciona una industria para ver nuestros clientes en ese sector
            </p>
          </div>

          <ClientGrid />
        </Container>
      </section>

      {/* Featured Testimonials Section */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Lo que Dicen Nuestros Clientes
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Testimonios reales de líderes empresariales que han transformado sus organizaciones
              con DUO
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials
              .filter(t => t.featured)
              .map(testimonial => (
                <Card
                  key={testimonial.id}
                  className="transition-all duration-300 hover:shadow-xl border-2 border-gray-200 hover:border-primary-300"
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="flex-1 text-gray-700 italic leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="border-t pt-4">
                      <div className="flex items-start gap-3">
                        {/* Company Logo Placeholder */}
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary-700">
                            {testimonial.company
                              .split(' ')
                              .slice(0, 2)
                              .map(word => word[0])
                              .join('')}
                          </span>
                        </div>

                        <div>
                          <div className="font-semibold text-gray-900">{testimonial.author}</div>
                          <div className="text-sm text-gray-600">{testimonial.role}</div>
                          <div className="text-sm font-medium text-primary-700 mt-1">
                            {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </Container>
      </section>

      {/* Industries We Serve Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Industrias que Servimos
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Experiencia comprobada en los sectores más importantes de la economía dominicana
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {industries.map(industry => {
              const Icon = industryIcons[industry.icon as keyof typeof industryIcons]
              return (
                <Card
                  key={industry.id}
                  className="group transition-all duration-300 hover:shadow-xl hover:border-primary-300"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex rounded-lg bg-primary-100 p-3 text-primary-700 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                      {Icon && <Icon className="h-6 w-6" />}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{industry.name}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{industry.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {industry.clientCount} clientes
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Case Studies Teaser Section */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Casos de Éxito
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Resultados reales y medibles que demuestran el impacto de nuestro trabajo
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies
              .filter(cs => cs.featured)
              .map(caseStudy => (
                <Card
                  key={caseStudy.id}
                  className="group transition-all duration-300 hover:shadow-xl overflow-hidden"
                >
                  {/* Image Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                    <div className="text-white text-center p-6">
                      <div className="text-3xl font-bold mb-2">{caseStudy.resultMetric}</div>
                      <div className="text-sm text-primary-100">{caseStudy.clientName}</div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3">
                      {caseStudy.industry}
                    </Badge>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {caseStudy.clientName}
                    </h3>

                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Desafío:</span>
                        <p className="text-gray-600 mt-1 line-clamp-2">{caseStudy.challenge}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Resultado:</span>
                        <p className="text-gray-600 mt-1 line-clamp-2">{caseStudy.result}</p>
                      </div>
                    </div>

                    <Link
                      href="#"
                      className="inline-flex items-center gap-2 text-primary-700 font-medium mt-4 hover:text-primary-800 transition-colors"
                    >
                      Ver Caso Completo
                      <TrendingUp className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </div>
        </Container>
      </section>

      {/* Trust Indicators - Certifications Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Certificaciones y Reconocimientos
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Respaldados por las organizaciones más prestigiosas de la industria
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {certifications.map(cert => (
              <Card
                key={cert.id}
                className="group transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[140px]">
                  {/* Certification Icon Placeholder */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mb-3 group-hover:from-primary-200 group-hover:to-primary-300 transition-colors">
                    <Award className="h-8 w-8 text-primary-700" />
                  </div>
                  <h4 className="text-xs font-semibold text-gray-900 text-center line-clamp-2">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 text-center">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection
        title="¿Listo para Transformar tu Organización?"
        subtitle="Únete a más de 50 empresas líderes que han confiado en DUO Soluciones para alcanzar sus objetivos estratégicos."
        variant="gradient"
        primaryCTA={{
          text: 'Agenda una Consulta Gratuita',
          href: '/contact',
          icon: 'calendar',
        }}
        secondaryCTA={{
          text: 'Conoce Nuestros Servicios',
          href: '/services',
        }}
      />
    </main>
  )
}
