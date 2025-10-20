import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CTASection } from '@/components/marketing/cta/CTASection'
import {
  Building2,
  CheckCircle,
  Shield,
  Scale,
  Users,
  ArrowRight,
  FileText,
  BarChart3,
  AlertTriangle,
  Target,
} from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gobernanza Corporativa | Compliance & Risk Management | DUO Soluciones',
  description:
    'Diseño e implementación de estructuras de gobernanza corporativa. Políticas, compliance, gestión de riesgos y juntas directivas efectivas en República Dominicana.',
  keywords: [
    'gobernanza corporativa',
    'compliance',
    'gestión de riesgos',
    'juntas directivas',
    'políticas corporativas',
    'auditoría interna',
    'gobierno corporativo',
    'consultoría República Dominicana',
  ],
  openGraph: {
    title: 'Gobernanza Corporativa | DUO Soluciones',
    description:
      'Marcos de gobierno que aseguran transparencia, compliance y sostenibilidad empresarial.',
    url: 'https://duo-soluciones.com/services/gobernanza-corporativa',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gobernanza Corporativa | DUO Soluciones',
    description: 'Marcos de gobierno que aseguran transparencia, compliance y sostenibilidad',
  },
}

const benefits = [
  {
    icon: Shield,
    title: 'Mayor Transparencia',
    description: 'Accountability clara en toda la organización',
  },
  {
    icon: AlertTriangle,
    title: 'Reducción de Riesgos',
    description: 'Identificación proactiva y mitigación de riesgos',
  },
  {
    icon: Target,
    title: 'Decisiones Efectivas',
    description: 'Procesos de toma de decisiones claros y estructurados',
  },
  {
    icon: Scale,
    title: 'Compliance Asegurado',
    description: 'Cumplimiento con regulaciones locales e internacionales',
  },
  {
    icon: Users,
    title: 'Confianza con Stakeholders',
    description: 'Relaciones fortalecidas con inversionistas y reguladores',
  },
  {
    icon: BarChart3,
    title: 'Preparación para Auditorías',
    description: 'Controles y documentación lista para revisión externa',
  },
]

const services = [
  {
    title: 'Diseño de Estructuras de Gobierno',
    description:
      'Creamos marcos de gobernanza adaptados a tu tamaño, industria y objetivos estratégicos. Definimos roles, comités y procesos de escalamiento.',
  },
  {
    title: 'Políticas y Procedimientos',
    description:
      'Desarrollamos políticas corporativas, códigos de ética, manuales de procedimientos y controles internos alineados con best practices internacionales.',
  },
  {
    title: 'Compliance y Gestión de Riesgos',
    description:
      'Implementamos programas de compliance, matrices de riesgos y controles que aseguran adherencia a regulaciones locales e internacionales.',
  },
  {
    title: 'Efectividad de Juntas Directivas',
    description:
      'Capacitamos juntas directivas en mejores prácticas de gobierno, facilitamos reuniones estratégicas y diseñamos procesos de evaluación de desempeño.',
  },
]

const deliverables = [
  'Marco de gobernanza corporativa',
  'Manual de políticas y procedimientos',
  'Matriz de riesgos y controles',
  'Programa de compliance',
  'Evaluación de junta directiva',
  'Roadmap de mejora continua',
]

const methodology = [
  {
    step: '1',
    title: 'Assessment',
    description: 'Evaluamos el estado actual de gobernanza y compliance',
  },
  {
    step: '2',
    title: 'Design',
    description: 'Diseñamos el marco de gobierno y políticas necesarias',
  },
  {
    step: '3',
    title: 'Implement',
    description: 'Implementamos estructuras, políticas y programas',
  },
  {
    step: '4',
    title: 'Monitor',
    description: 'Establecemos monitoreo continuo y mejora',
  },
]

const focusAreas = [
  {
    title: 'Estructura de Gobierno',
    items: [
      'Diseño de comités (Auditoría, Riesgos, Compensación)',
      'Definición de roles y responsabilidades',
      'Procesos de escalamiento y toma de decisiones',
      'Evaluación de juntas directivas',
    ],
  },
  {
    title: 'Compliance y Legal',
    items: [
      'Programas de compliance regulatorio',
      'Políticas anti-corrupción y anti-lavado',
      'Gestión de conflictos de interés',
      'Due diligence de terceros',
    ],
  },
  {
    title: 'Gestión de Riesgos',
    items: [
      'Identificación y evaluación de riesgos',
      'Matrices de riesgos empresariales',
      'Controles y planes de mitigación',
      'Reporting de riesgos a junta directiva',
    ],
  },
  {
    title: 'Auditoría Interna',
    items: [
      'Diseño de función de auditoría interna',
      'Plan anual de auditoría basado en riesgos',
      'Procedimientos de auditoría',
      'Seguimiento de hallazgos y remediation',
    ],
  },
]

const relatedServices = [
  {
    title: 'Desarrollo Organizacional',
    slug: 'desarrollo-organizacional',
    description: 'Fortalece la estructura y cultura para soportar la gobernanza',
  },
  {
    title: 'Mejora de Procesos',
    slug: 'mejora-procesos',
    description: 'Optimiza procesos de control y compliance',
  },
]

export default function GobernanzaCorporativaPage() {
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
              Gobernanza Corporativa
            </h1>
            <p className="mt-6 text-xl leading-8 text-primary-100">
              Marcos de gobierno que aseguran transparencia, compliance y sostenibilidad
            </p>
            <p className="mt-4 text-lg text-primary-200">
              Diseñamos e implementamos estructuras de gobernanza robustas que fortalecen la toma
              de decisiones, aseguran compliance y generan confianza con stakeholders.
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
                <a href="#areas-enfoque">Ver Áreas de Enfoque</a>
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
              Beneficios de una Gobernanza Sólida
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Protege tu organización y genera confianza con stakeholders
            </p>
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
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Qué Hacemos
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Un enfoque integral de gobernanza corporativa
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

      {/* Focus Areas Section */}
      <section id="areas-enfoque" className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Áreas de Enfoque
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Cobertura completa de todos los aspectos de gobernanza
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {focusAreas.map((area, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{area.title}</h3>
                  <ul className="space-y-3">
                    {area.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Methodology Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Nuestra Metodología
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Un enfoque estructurado para implementar gobernanza efectiva
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
      <section className="py-16 lg:py-24">
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
                      Duración
                    </h3>
                    <p className="text-2xl font-bold text-primary-700">3-5 meses</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Tamaño del Equipo
                    </h3>
                    <p className="text-2xl font-bold text-primary-700">2-3 consultores</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Inversión
                    </h3>
                    <p className="text-2xl font-bold text-primary-700">Desde USD $20,000</p>
                  </div>
                  <div className="pt-4 border-t border-primary-200">
                    <p className="text-sm text-gray-600">
                      * Incluye diseño de marco de gobierno, políticas, capacitación de junta y
                      soporte inicial
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Success Metrics Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Impacto Medible
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Resultados de nuestras implementaciones de gobernanza
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary-700 mb-2">50%+</div>
                <p className="text-gray-600">Reducción en tiempo de aprobaciones</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary-700 mb-2">100%</div>
                <p className="text-gray-600">Compliance con regulaciones</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary-700 mb-2">70%+</div>
                <p className="text-gray-600">Mejora en efectividad de junta</p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Related Services Section */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Servicios Complementarios
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Fortalece tu gobernanza con estos servicios
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {relatedServices.map((service, index) => (
              <Card key={index} className="group transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Button asChild variant="outline" className="w-full group-hover:border-primary-600">
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
        title="¿Listo para Fortalecer tu Gobernanza Corporativa?"
        subtitle="Agenda una consulta gratuita y descubre cómo podemos ayudarte a establecer marcos de gobierno sólidos."
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
