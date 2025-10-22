import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CTASection } from '@/components/marketing/cta/CTASection'
import {
  Target,
  CheckCircle,
  Users,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  FileText,
  BarChart3,
} from 'lucide-react'
import Link from 'next/link'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Desarrollo Organizacional | Transformación Cultural | DUO Soluciones',
  description:
    'Construye una organización resiliente, ágil y preparada para el futuro. Servicios de diagnóstico organizacional, diseño de estructuras, desarrollo de cultura y gestión del cambio.',
  keywords: [
    'desarrollo organizacional',
    'transformación organizacional',
    'diseño organizacional',
    'cultura empresarial',
    'gestión del cambio',
    'consultoría República Dominicana',
  ],
  openGraph: {
    title: 'Desarrollo Organizacional | DUO Soluciones',
    description:
      'Transformamos estructuras, procesos y culturas organizacionales para crear empresas más eficientes, innovadoras y ágiles.',
    url: 'https://duo-soluciones.com/services/desarrollo-organizacional',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desarrollo Organizacional | DUO Soluciones',
    description: 'Construye una organización resiliente, ágil y preparada para el futuro',
  },
}

const benefits = [
  {
    icon: Users,
    title: 'Estructuras Más Eficientes',
    description: 'Organizaciones optimizadas que eliminan silos y duplicación de esfuerzos',
  },
  {
    icon: TrendingUp,
    title: 'Mayor Agilidad',
    description: 'Capacidad de respuesta rápida a cambios del mercado y oportunidades',
  },
  {
    icon: Lightbulb,
    title: 'Cultura Alineada',
    description: 'Valores y comportamientos que impulsan los objetivos estratégicos',
  },
  {
    icon: Target,
    title: 'Retención de Talento',
    description: 'Ambiente de trabajo que atrae y retiene a los mejores profesionales',
  },
  {
    icon: CheckCircle,
    title: 'Colaboración Mejorada',
    description: 'Equipos inter-funcionales que trabajan de manera efectiva',
  },
  {
    icon: BarChart3,
    title: 'Decisiones Más Rápidas',
    description: 'Procesos de toma de decisiones claros y efectivos',
  },
]

const services = [
  {
    title: 'Diagnóstico Organizacional',
    description:
      'Evaluación profunda de tu estructura actual, cultura, procesos y capacidades. Identificamos brechas y oportunidades de mejora con metodologías probadas.',
  },
  {
    title: 'Diseño Organizacional',
    description:
      'Creamos estructuras organizacionales óptimas alineadas con tu estrategia de negocio. Definimos roles, responsabilidades y líneas de reporte claras.',
  },
  {
    title: 'Desarrollo de Cultura',
    description:
      'Diseñamos e implementamos programas de transformación cultural que fomentan los comportamientos y valores necesarios para el éxito.',
  },
  {
    title: 'Gestión del Cambio',
    description:
      'Lideramos procesos de cambio organizacional complejos con un enfoque estructurado que minimiza resistencia y maximiza adopción.',
  },
]

const deliverables = [
  'Diagnóstico organizacional completo',
  'Diseño de nueva estructura organizacional',
  'Plan de gestión del cambio',
  'Programa de desarrollo cultural',
  'KPIs y métricas de seguimiento',
  'Capacitación y acompañamiento',
]

const methodology = [
  {
    step: '1',
    title: 'Diagnóstico',
    description: 'Evaluamos la situación actual mediante entrevistas, surveys y análisis de datos',
  },
  {
    step: '2',
    title: 'Diseño',
    description: 'Co-creamos la solución organizacional con tu equipo de liderazgo',
  },
  {
    step: '3',
    title: 'Implementación',
    description: 'Ejecutamos el plan de transformación con gestión del cambio estructurada',
  },
  {
    step: '4',
    title: 'Sostenibilidad',
    description: 'Aseguramos la adopción y generamos capacidad interna para mejora continua',
  },
]

const relatedServices = [
  {
    title: 'Mejora de Procesos',
    slug: 'mejora-procesos',
    description: 'Complementa tu transformación optimizando procesos operativos',
  },
  {
    title: 'Gobernanza Corporativa',
    slug: 'gobernanza-corporativa',
    description: 'Fortalece las estructuras de gobierno y toma de decisiones',
  },
]

export default function DesarrolloOrganizacionalPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-6">
              <Link
                href="/services"
                className="inline-flex items-center text-sm text-primary-100 hover:text-white transition-colors"
              >
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Volver a Servicios
              </Link>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Desarrollo Organizacional
            </h1>
            <p className="mt-6 text-xl leading-8 text-primary-100">
              Construye una organización resiliente, ágil y preparada para el futuro
            </p>
            <p className="mt-4 text-lg text-primary-200">
              Transformamos estructuras, procesos y culturas organizacionales para crear empresas
              más eficientes, innovadoras y capaces de adaptarse rápidamente a los cambios del
              mercado.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Solicitar Consulta</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white text-primary-700 hover:bg-primary-50"
              >
                <a href="#que-hacemos">Conocer Más</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Beneficios Clave
            </h2>
            <p className="mt-4 text-lg text-gray-600">Impacto real y medible en tu organización</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card
                  key={index}
                  className="group transition-all duration-300 hover:shadow-xl hover:border-primary-300"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex rounded-lg bg-primary-100 p-3 text-primary-700 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="mt-2 text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* What We Do Section */}
      <section id="que-hacemos" className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Qué Hacemos
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Un enfoque integral para transformar tu organización
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Methodology Section */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Nuestra Metodología
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Un proceso probado para asegurar resultados sostenibles
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {methodology.map((phase, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-white">
                    <span className="text-2xl font-bold">{phase.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{phase.title}</h3>
                  <p className="text-gray-600 text-sm">{phase.description}</p>
                </div>
                {index < methodology.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-primary-200" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Deliverables & Engagement Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Deliverables */}
            <Card className="border-2 border-primary-200">
              <CardContent className="p-8">
                <div className="mb-6 inline-flex rounded-lg bg-primary-600 p-3 text-white">
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Entregables</h2>
                <ul className="space-y-3">
                  {deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      <span className="text-gray-700">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Typical Engagement */}
            <Card className="border-2 border-primary-200 bg-gradient-to-br from-white to-primary-50">
              <CardContent className="p-8">
                <div className="mb-6 inline-flex rounded-lg bg-primary-600 p-3 text-white">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Proyecto Típico</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Tamaño del Equipo
                    </h3>
                    <p className="text-2xl font-bold text-primary-700">2-4 consultores</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Alcance
                    </h3>
                    <p className="text-gray-700">
                      Proyecto personalizado según tamaño de la organización y objetivos
                      estratégicos
                    </p>
                  </div>
                  <div className="pt-4 border-t border-primary-200">
                    <p className="text-sm text-gray-600">
                      * Cada proyecto es único. Solicita una cotización personalizada basada en tus
                      necesidades específicas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Success Metrics Section */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Resultados Típicos
            </h2>
            <p className="mt-4 text-lg text-gray-600">Métricas reales de proyectos completados</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary-700 mb-2">30-40%</div>
                <p className="text-gray-600">Reducción en tiempo de toma de decisiones</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary-700 mb-2">25%+</div>
                <p className="text-gray-600">Mejora en satisfacción de empleados</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary-700 mb-2">ROI</div>
                <p className="text-gray-600">Retorno de inversión comprobado</p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Related Services Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Servicios Relacionados
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Potencia tu transformación con estos servicios complementarios
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {relatedServices.map((service, index) => (
              <Card key={index} className="group transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:border-primary-600"
                  >
                    <Link href={`/services/${service.slug}`}>
                      Ver Detalles
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection
        title="¿Listo para Transformar tu Organización?"
        subtitle="Agenda una consulta gratuita de 30 minutos y descubre cómo podemos ayudarte a alcanzar tus objetivos."
        variant="gradient"
        primaryCTA={{
          text: 'Solicitar Consulta',
          href: '/contact',
          icon: 'calendar',
        }}
        secondaryCTA={{
          text: 'Ver Todos los Servicios',
          href: '/services',
        }}
      />
    </main>
  )
}
