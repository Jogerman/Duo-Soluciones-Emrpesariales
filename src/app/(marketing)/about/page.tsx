import type { Metadata } from 'next'
import { Timeline, TeamGrid } from '@/components/marketing'
import type { TimelineItem, TeamMember } from '@/components/marketing'
import { Container } from '@/components/ui/Container'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CTASection } from '@/components/marketing/cta/CTASection'
import { Award, Target, Heart, Users, Lightbulb, TrendingUp } from 'lucide-react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Sobre Nosotros | DUO Soluciones Empresariales',
  description:
    'Conoce al equipo de expertos certificados detrás de DUO Soluciones. 15 años transformando empresas en República Dominicana y el Caribe con soluciones probadas.',
  keywords: [
    'equipo consultoría',
    'expertos certificados',
    'Microsoft Gold Partner',
    'Lean Six Sigma',
    'consultoría República Dominicana',
    'transformación empresarial',
  ],
  openGraph: {
    title: 'Sobre Nosotros | DUO Soluciones Empresariales',
    description:
      'Socios en tu transformación organizacional. 15 años de experiencia y más de 200 proyectos exitosos.',
    url: 'https://duo-soluciones.com/about',
    siteName: 'DUO Soluciones Empresariales',
    type: 'website',
    images: [
      {
        url: '/images/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'Equipo DUO Soluciones Empresariales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Nosotros | DUO Soluciones',
    description: 'Socios en tu transformación organizacional desde 2010',
    images: ['/images/og-about.jpg'],
    creator: '@duosoluciones',
  },
}

// Timeline data
const timelineItems: TimelineItem[] = [
  {
    year: '2010',
    title: 'Los Inicios',
    description:
      'DUO Soluciones nace con la visión de transformar el panorama empresarial dominicano a través de consultoría estratégica de clase mundial.',
  },
  {
    year: '2013',
    title: 'Expansión Regional',
    description:
      'Expandimos operaciones al Caribe, trabajando con empresas líderes en Puerto Rico, Jamaica y Trinidad & Tobago.',
  },
  {
    year: '2016',
    title: 'Partnership Microsoft',
    description:
      'Nos convertimos en Microsoft Gold Partner, especializándonos en implementaciones de Dynamics 365 y Power Platform.',
  },
  {
    year: '2020',
    title: 'Certificaciones Internacionales',
    description:
      'Obtenemos certificaciones Lean Six Sigma Black Belt y metodologías ágiles (SAFe, Scrum).',
  },
  {
    year: '2024',
    title: 'Líder del Mercado',
    description:
      'Reconocidos como la consultora #1 en transformación digital empresarial en República Dominicana con más de 200 proyectos exitosos.',
  },
]

// Team members data
const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Carlos Méndez',
    role: 'Founder & CEO',
    bio: 'PhD en Administración de Empresas con 20+ años de experiencia en consultoría estratégica. Especializado en transformación organizacional y desarrollo de liderazgo. Profesor invitado en INTEC y PUCMM.',
    specialties: [
      'Estrategia corporativa',
      'Transformación organizacional',
      'Desarrollo de liderazgo',
      'Gestión del cambio',
    ],
  },
  {
    id: '2',
    name: 'Ing. Patricia Santana',
    role: 'CTO & Microsoft Dynamics Lead',
    bio: 'Ingeniera de Sistemas con 15+ años implementando soluciones Microsoft. MVP de Microsoft en Business Applications. Ha liderado más de 100 implementaciones exitosas en toda la región.',
    specialties: [
      'MS Dynamics 365',
      'Power BI y Power Apps',
      'Azure Cloud Architecture',
      'Integraciones empresariales',
    ],
  },
  {
    id: '3',
    name: 'Lic. Roberto Fernández',
    role: 'Director de Consultoría Estratégica',
    bio: 'MBA con concentración en Operaciones y Estrategia. 18 años de experiencia en mejora de procesos y excelencia operacional. Certificado Lean Six Sigma Black Belt y SAFe Agilist.',
    specialties: [
      'Mejora de procesos',
      'Lean Six Sigma',
      'Excelencia operacional',
      'Metodologías ágiles',
    ],
  },
  {
    id: '4',
    name: 'Dra. Laura Jiménez',
    role: 'Directora de Gobernanza y Compliance',
    bio: 'Abogada corporativa y CPA con maestría en Gobernanza Corporativa. 12 años asesorando juntas directivas en República Dominicana y Puerto Rico.',
    specialties: [
      'Gobernanza corporativa',
      'Compliance y riesgos',
      'Auditoría interna',
      'Juntas directivas',
    ],
  },
]

// Values data
const values = [
  {
    icon: Award,
    title: 'Excelencia',
    description:
      'Nos comprometemos con los más altos estándares de calidad en cada proyecto, entregable y interacción con nuestros clientes.',
  },
  {
    icon: Heart,
    title: 'Integridad',
    description:
      'Actuamos con honestidad, transparencia y ética profesional en todas nuestras relaciones comerciales.',
  },
  {
    icon: Lightbulb,
    title: 'Innovación',
    description:
      'Adoptamos y promovemos las mejores prácticas y tecnologías emergentes para mantener a nuestros clientes a la vanguardia.',
  },
  {
    icon: Users,
    title: 'Colaboración',
    description:
      'Creemos en el poder de trabajar como socios, no como proveedores, construyendo relaciones de confianza duraderas.',
  },
  {
    icon: TrendingUp,
    title: 'Resultados',
    description:
      'Nos enfocamos obsesivamente en generar valor medible y tangible para nuestros clientes.',
  },
]

// Certifications data
const certifications = [
  'Microsoft Gold Partner (Business Applications)',
  'Lean Six Sigma Black Belt Certified',
  'Project Management Professional (PMP)',
  'SAFe 5 Agilist Certified',
  'Scrum Master Certified (CSM)',
  'ISO 9001:2015 Consultant Certification',
]

const partnerships = [
  'Microsoft Partner Network (Gold)',
  'Gartner Advisory Services',
  'PMI (Project Management Institute)',
  'APQC (American Productivity & Quality Center)',
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Socios en tu Transformación Organizacional
            </h1>
            <p className="mt-6 text-lg leading-8 text-primary-100 sm:text-xl">
              Desde 2010, ayudamos a empresas en República Dominicana y el Caribe a alcanzar su
              máximo potencial a través de soluciones estratégicas y sostenibles.
            </p>
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <Timeline items={timelineItems} />

      {/* Mission, Vision, Values Section */}
      <section className="py-16 lg:py-24">
        <Container>
          {/* Mission & Vision */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <Card className="border-2 border-primary-200 bg-gradient-to-br from-white to-primary-50">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex rounded-lg bg-primary-600 p-3 text-white">
                  <Target className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Nuestra Misión</h2>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  Empoderar a las organizaciones para que alcancen la excelencia operacional y
                  estratégica a través de soluciones innovadoras, metodologías probadas y un
                  compromiso inquebrantable con resultados sostenibles.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="border-2 border-primary-200 bg-gradient-to-br from-white to-primary-50">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex rounded-lg bg-primary-600 p-3 text-white">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Nuestra Visión</h2>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  Ser el socio estratégico preferido de las empresas líderes en el Caribe,
                  reconocidos por nuestra capacidad de generar transformación real, medible y
                  duradera.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="mt-16">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Nuestros Valores
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Los principios que guían cada decisión y acción en DUO Soluciones
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card
                    key={index}
                    className="group transition-all duration-300 hover:shadow-xl hover:border-primary-300"
                  >
                    <CardContent className="p-6">
                      <div className="mb-4 inline-flex rounded-lg bg-primary-100 p-3 text-primary-700 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                      <p className="mt-3 text-gray-600 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Team Grid Section */}
      <TeamGrid members={teamMembers} variant="2-col" />

      {/* Certifications & Partnerships Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Certificaciones y Alianzas Estratégicas
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Respaldados por las organizaciones más prestigiosas de la industria
            </p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            {/* Certifications */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Certificaciones</h3>
                <ul className="space-y-3">
                  {certifications.map((cert, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Award className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                      <span className="text-gray-700">{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Partnerships */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Alianzas Estratégicas</h3>
                <ul className="space-y-3">
                  {partnerships.map((partner, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                      <span className="text-gray-700">{partner}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Culture Highlights */}
          <div className="mt-16">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900">Nuestra Cultura</h3>
              <p className="mt-2 text-gray-600">
                Un ambiente que fomenta la excelencia, el aprendizaje continuo y el balance de vida
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Badge variant="secondary" className="p-4 text-sm text-center justify-center h-auto">
                Aprendizaje Continuo
              </Badge>
              <Badge variant="secondary" className="p-4 text-sm text-center justify-center h-auto">
                Balance Vida-Trabajo
              </Badge>
              <Badge variant="secondary" className="p-4 text-sm text-center justify-center h-auto">
                Diversidad e Inclusión
              </Badge>
              <Badge variant="secondary" className="p-4 text-sm text-center justify-center h-auto">
                Responsabilidad Social
              </Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection
        title="¿Listo para Trabajar con Expertos Certificados?"
        subtitle="Descubre cómo nuestro equipo puede ayudarte a alcanzar tus objetivos organizacionales."
        variant="gradient"
        primaryCTA={{
          text: 'Agenda una Consulta',
          href: '/contact',
          icon: 'calendar',
        }}
        secondaryCTA={{
          text: 'Ver Servicios',
          href: '/services',
        }}
      />
    </main>
  )
}
