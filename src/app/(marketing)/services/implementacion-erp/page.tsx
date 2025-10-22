import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { CTASection } from '@/components/marketing/cta/CTASection'
import {
  Laptop,
  CheckCircle,
  Database,
  LineChart,
  Boxes,
  ArrowRight,
  FileText,
  BarChart3,
  Cloud,
  Zap,
} from 'lucide-react'
import Link from 'next/link'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Implementación ERP | MS Dynamics 365 & Power BI | DUO Soluciones',
  description:
    'Implementación Microsoft Dynamics 365 y Power BI. Integra tus sistemas, automatiza operaciones y obtén insights en tiempo real. Microsoft Gold Partner.',
  keywords: [
    'MS Dynamics 365',
    'Power BI',
    'implementación ERP',
    'Microsoft Gold Partner',
    'Dynamics Finance',
    'Dynamics Supply Chain',
    'Power Platform',
    'consultoría ERP República Dominicana',
  ],
  openGraph: {
    title: 'Implementación ERP | MS Dynamics 365 | DUO Soluciones',
    description:
      'Visibilidad completa, decisiones inteligentes, crecimiento acelerado. Implementaciones Dynamics 365 y Power BI.',
    url: 'https://duo-soluciones.com/services/implementacion-erp',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Implementación ERP | DUO Soluciones',
    description: 'Visibilidad completa, decisiones inteligentes, crecimiento acelerado',
  },
}

const benefits = [
  {
    icon: Boxes,
    title: 'Integración Completa',
    description: 'Un solo sistema que conecta finanzas, operaciones, ventas y servicio',
  },
  {
    icon: LineChart,
    title: 'Visibilidad Real-Time',
    description: 'Dashboards y reportes actualizados en tiempo real',
  },
  {
    icon: Zap,
    title: 'Automatización',
    description: 'Procesos manuales automatizados para mayor eficiencia',
  },
  {
    icon: Database,
    title: 'Datos Centralizados',
    description: 'Una sola fuente de verdad para toda la organización',
  },
  {
    icon: BarChart3,
    title: 'Decisiones Basadas en Datos',
    description: 'Analytics avanzado con Power BI y AI integrado',
  },
  {
    icon: Cloud,
    title: 'ROI Comprobado',
    description: 'Retorno de inversión demostrado en implementaciones exitosas',
  },
]

const services = [
  {
    title: 'Consultoría y Diseño',
    description:
      'Analizamos tus requisitos de negocio y diseñamos una solución Dynamics 365 personalizada que se adapta perfectamente a tus procesos únicos.',
  },
  {
    title: 'Implementación Dynamics 365',
    description:
      'Configuramos e implementamos módulos de Finance, Supply Chain, Sales, Customer Service y Field Service con metodologías ágiles probadas.',
  },
  {
    title: 'Power BI y Analítica',
    description:
      'Creamos dashboards interactivos y reportes automatizados que te dan visibilidad real-time de tu negocio para decisiones basadas en datos.',
  },
  {
    title: 'Integraciones',
    description:
      'Conectamos Dynamics con tus sistemas existentes (CRM, ERP legacy, e-commerce, etc.) para un flujo de datos sin fricción.',
  },
]

const modules = [
  {
    name: 'Dynamics 365 Finance',
    description: 'Gestión financiera completa',
  },
  {
    name: 'Dynamics 365 Supply Chain',
    description: 'Optimización de cadena de suministro',
  },
  {
    name: 'Dynamics 365 Sales',
    description: 'CRM y gestión de ventas',
  },
  {
    name: 'Dynamics 365 Customer Service',
    description: 'Servicio al cliente excepcional',
  },
  {
    name: 'Power BI',
    description: 'Business Intelligence avanzado',
  },
  {
    name: 'Power Apps',
    description: 'Aplicaciones personalizadas low-code',
  },
  {
    name: 'Power Automate',
    description: 'Automatización de workflows',
  },
  {
    name: 'Azure Integration Services',
    description: 'Integraciones cloud',
  },
]

const deliverables = [
  'Dynamics 365 configurado y en producción',
  'Dashboards Power BI personalizados',
  'Integraciones con sistemas legacy',
  'Documentación técnica y funcional',
  'Capacitación de usuarios end-to-end',
  'Soporte post-go-live extendido',
]

const methodology = [
  {
    step: '1',
    title: 'Discovery',
    description: 'Análisis de requisitos y diseño de solución',
  },
  {
    step: '2',
    title: 'Build',
    description: 'Configuración, desarrollo y testing en sprints ágiles',
  },
  {
    step: '3',
    title: 'Deploy',
    description: 'Go-live con cutover estructurado',
  },
  {
    step: '4',
    title: 'Support',
    description: 'Soporte continuo y optimización',
  },
]

const relatedServices = [
  {
    title: 'Mejora de Procesos',
    slug: 'mejora-procesos',
    description: 'Optimiza procesos antes de automatizar con ERP',
  },
  {
    title: 'Desarrollo Organizacional',
    slug: 'desarrollo-organizacional',
    description: 'Prepara tu organización para la transformación digital',
  },
]

export default function ImplementacionERPPage() {
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
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-yellow-500 text-black hover:bg-yellow-400">
                Microsoft Gold Partner
              </Badge>
              <Badge className="bg-white text-primary-700 hover:bg-primary-50">
                200+ Implementaciones
              </Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Implementación ERP
            </h1>
            <p className="mt-6 text-xl leading-8 text-primary-100">
              Visibilidad completa, decisiones inteligentes, crecimiento acelerado
            </p>
            <p className="mt-4 text-lg text-primary-200">
              Implementamos Microsoft Dynamics 365 y Power BI para integrar tus sistemas,
              automatizar operaciones y obtener insights en tiempo real que impulsan el crecimiento.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Solicitar Demo</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white text-primary-700 hover:bg-primary-50"
              >
                <a href="#modulos">Ver Módulos</a>
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
              Beneficios de Dynamics 365
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Tecnología líder de Microsoft para transformar tu negocio
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
            <p className="mt-4 text-lg text-gray-600">De la estrategia a la ejecución</p>
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

      {/* Modules Section */}
      <section id="modulos" className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Módulos y Tecnologías
            </h2>
            <p className="mt-4 text-lg text-gray-600">Soluciones Microsoft que implementamos</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {modules.map((module, index) => (
              <Card
                key={index}
                className="group transition-all duration-300 hover:shadow-lg hover:border-primary-300"
              >
                <CardContent className="p-6 text-center">
                  <CheckCircle className="mx-auto h-8 w-8 text-primary-600 mb-3 transition-transform group-hover:scale-110" />
                  <h3 className="font-semibold text-gray-900 mb-1">{module.name}</h3>
                  <p className="text-sm text-gray-600">{module.description}</p>
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
              Nuestra Metodología Ágil
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Implementaciones predecibles con metodología Microsoft FastTrack
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
                      Tamaño del Equipo
                    </h3>
                    <p className="text-2xl font-bold text-primary-700">3-6 consultores</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Alcance
                    </h3>
                    <p className="text-gray-700">
                      Proyecto personalizado según las necesidades específicas de tu empresa
                    </p>
                  </div>
                  <div className="pt-4 border-t border-primary-200">
                    <p className="text-sm text-gray-600">
                      * Cada proyecto es único. Solicita una cotización personalizada que incluye
                      licencias Microsoft, configuración, integraciones, capacitación y soporte
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
              Resultados Comprobados
            </h2>
            <p className="mt-4 text-lg text-gray-600">Impacto real de nuestras implementaciones</p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary-700 mb-2">100+</div>
                <p className="text-gray-600">Implementaciones D365 exitosas</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary-700 mb-2">98%</div>
                <p className="text-gray-600">Proyectos a tiempo y presupuesto</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary-700 mb-2">40%</div>
                <p className="text-gray-600">Reducción tiempo de cierre mensual</p>
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
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Servicios Complementarios
            </h2>
            <p className="mt-4 text-lg text-gray-600">Maximiza el valor de tu implementación ERP</p>
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
        title="¿Listo para Transformar tu Negocio con Dynamics 365?"
        subtitle="Solicita una demo personalizada y descubre cómo Dynamics 365 puede impulsar tu crecimiento."
        variant="gradient"
        primaryCTA={{
          text: 'Solicitar Demo',
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
