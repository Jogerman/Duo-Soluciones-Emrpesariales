import type { Metadata } from 'next'
import { ServiceGrid, CTASection } from '@/components/marketing'
import type { ServiceItem } from '@/components/marketing'
import { Container } from '@/components/ui/Container'
import { Card, CardContent } from '@/components/ui/Card'
import { Target, Settings, Laptop, Building2, CheckCircle, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Servicios de Consultoría Empresarial | DUO Soluciones',
  description:
    'Desarrollo organizacional, mejora de procesos Lean Six Sigma, implementación MS Dynamics 365 y gobernanza corporativa. Soluciones integrales para tu empresa.',
  keywords: [
    'servicios consultoría',
    'desarrollo organizacional',
    'mejora procesos',
    'Lean Six Sigma',
    'MS Dynamics 365',
    'Power BI',
    'gobernanza corporativa',
    'ERP implementation',
    'consultoría República Dominicana',
  ],
  openGraph: {
    title: 'Servicios de Consultoría Empresarial | DUO Soluciones',
    description:
      'Soluciones integrales para cada etapa de tu transformación. Desde el diagnóstico hasta la implementación y mejora continua.',
    url: 'https://duo-soluciones.com/services',
    siteName: 'DUO Soluciones Empresariales',
    type: 'website',
    images: [
      {
        url: '/images/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Servicios DUO Soluciones Empresariales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servicios de Consultoría | DUO Soluciones',
    description: 'Soluciones integrales para cada etapa de tu transformación organizacional',
    images: ['/images/og-services.jpg'],
    creator: '@duosoluciones',
  },
}

// Services data
const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Desarrollo Organizacional',
    description:
      'Fortalece tu estructura organizacional y cultura empresarial para alcanzar objetivos estratégicos de manera sostenible.',
    slug: 'desarrollo-organizacional',
    benefits: [
      'Diagnóstico organizacional profundo',
      'Diseño de estructuras eficientes',
      'Desarrollo de cultura y valores',
      'Gestión del cambio organizacional',
    ],
    icon: Target,
    featured: true,
  },
  {
    id: '2',
    title: 'Mejora de Procesos',
    description:
      'Optimiza tus operaciones eliminando ineficiencias y maximizando el valor entregado a tus clientes.',
    slug: 'mejora-procesos',
    benefits: [
      'Mapeo y análisis de procesos',
      'Implementación Lean y Six Sigma',
      'Automatización inteligente',
      'Reducción de costos operativos',
    ],
    icon: Settings,
  },
  {
    id: '3',
    title: 'Implementación ERP',
    description:
      'Integra tus sistemas y obtén visibilidad completa de tu negocio con tecnología Microsoft líder en la industria.',
    slug: 'implementacion-erp',
    benefits: [
      'MS Dynamics 365 implementación',
      'Dashboards Power BI',
      'Integración de sistemas',
      'Capacitación y soporte',
    ],
    icon: Laptop,
  },
  {
    id: '4',
    title: 'Gobernanza Corporativa',
    description:
      'Establece marcos de gobierno robustos que aseguren compliance, transparencia y toma de decisiones efectiva.',
    slug: 'gobernanza-corporativa',
    benefits: [
      'Estructuras de gobierno',
      'Políticas y procedimientos',
      'Compliance y riesgos',
      'Juntas directivas efectivas',
    ],
    icon: Building2,
  },
]

// FAQ data
const faqs = [
  {
    question: '¿Cuánto tiempo toma un proyecto típico?',
    answer:
      'La duración varía según el servicio: Desarrollo Organizacional (3-6 meses), Mejora de Procesos (2-4 meses), Implementación ERP (4-9 meses), Gobernanza Corporativa (3-5 meses). Cada proyecto se personaliza según las necesidades específicas de tu empresa.',
  },
  {
    question: '¿Trabajan con empresas de todos los tamaños?',
    answer:
      'Sí, trabajamos con empresas de todos los tamaños, desde startups en crecimiento hasta corporaciones Fortune 500. Adaptamos nuestros servicios y enfoque según el tamaño, industria y necesidades específicas de cada cliente.',
  },
  {
    question: '¿Qué incluye la consulta inicial gratuita?',
    answer:
      'La consulta inicial de 30 minutos incluye: análisis preliminar de tus desafíos, recomendaciones iniciales, discusión de posibles enfoques, y estimación de alcance y timeline. Sin compromiso y sin costo.',
  },
  {
    question: '¿Ofrecen soporte post-implementación?',
    answer:
      'Absolutamente. Todos nuestros proyectos incluyen soporte post-implementación que varía de 3-6 meses. Además, ofrecemos contratos de soporte continuo y servicios de mejora continua para asegurar resultados sostenibles.',
  },
  {
    question: '¿Pueden trabajar de forma remota o híbrida?',
    answer:
      'Sí, ofrecemos tres modalidades: 100% remota, híbrida (combinación de remoto y presencial), y 100% presencial. La modalidad se define según tus preferencias y las necesidades del proyecto.',
  },
  {
    question: '¿Qué diferencia a DUO de otras consultoras?',
    answer:
      'Nuestra diferenciación está en: 15+ años de experiencia local, certificaciones internacionales (Microsoft Gold Partner, Lean Six Sigma), enfoque en resultados medibles, metodologías probadas, y compromiso con la transferencia de conocimiento para generar capacidad interna.',
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Soluciones Integrales para cada Etapa de tu Transformación
            </h1>
            <p className="mt-6 text-lg leading-8 text-primary-100 sm:text-xl">
              Desde el diagnóstico hasta la implementación y mejora continua, te acompañamos en
              cada paso del camino.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <ServiceGrid services={services} variant="2-col" />

      {/* Service Comparison Table */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Compara Nuestros Servicios
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Encuentra la solución que mejor se adapta a tus necesidades
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg bg-white shadow-lg overflow-hidden">
              <thead className="bg-primary-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Característica</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Desarrollo Org.
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Mejora Procesos</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Implementación ERP
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Gobernanza</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Duración</td>
                  <td className="px-6 py-4 text-sm text-gray-700">3-6 meses</td>
                  <td className="px-6 py-4 text-sm text-gray-700">2-4 meses</td>
                  <td className="px-6 py-4 text-sm text-gray-700">4-9 meses</td>
                  <td className="px-6 py-4 text-sm text-gray-700">3-5 meses</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Inversión</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Desde $25K</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Desde $18K</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Desde $50K</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Desde $20K</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">ROI Típico</td>
                  <td className="px-6 py-4 text-sm text-gray-700">200-300%</td>
                  <td className="px-6 py-4 text-sm text-gray-700">300-500%</td>
                  <td className="px-6 py-4 text-sm text-gray-700">150-250%</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Risk reduction</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Tamaño Equipo</td>
                  <td className="px-6 py-4 text-sm text-gray-700">2-4</td>
                  <td className="px-6 py-4 text-sm text-gray-700">2-3</td>
                  <td className="px-6 py-4 text-sm text-gray-700">3-6</td>
                  <td className="px-6 py-4 text-sm text-gray-700">2-3</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Ideal Para</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Restructuring</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Cost reduction</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Digital transformation</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Compliance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Preguntas Frecuentes
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Respuestas a las preguntas más comunes sobre nuestros servicios
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                        <HelpCircle className="h-5 w-5 text-primary-700" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection
        title="¿No estás seguro cuál servicio necesitas?"
        subtitle="Agenda una consulta gratuita y te ayudaremos a identificar la mejor solución para tus desafíos."
        variant="gradient"
        primaryCTA={{
          text: 'Agenda tu Consulta Gratuita',
          href: '/contact',
          icon: 'calendar',
        }}
        secondaryCTA={{
          text: 'Conoce Nuestro Equipo',
          href: '/about',
        }}
      />
    </main>
  )
}
