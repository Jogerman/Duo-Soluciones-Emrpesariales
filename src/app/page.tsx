import type { Metadata } from 'next'
import {
  HeroSection,
  ServiceGrid,
  StatsSection,
  TestimonialsCarousel,
  CTASection,
} from '@/components/marketing'
import type { ServiceItem, Stat, Testimonial } from '@/components/marketing'
import { Target, Settings, Laptop, Building2, Users, Award, TrendingUp, Briefcase } from 'lucide-react'

export const metadata: Metadata = {
  title: 'DUO Soluciones Empresariales | Consultoría Estratégica y Transformación Digital',
  description:
    'Transformamos desafíos organizacionales en oportunidades sostenibles. Especialistas en desarrollo organizacional, mejora de procesos, ERP y gobernanza. 15+ años de experiencia.',
  keywords: [
    'consultoría empresarial',
    'desarrollo organizacional',
    'mejora de procesos',
    'implementación ERP',
    'MS Dynamics',
    'Power BI',
    'gobernanza corporativa',
    'transformación digital',
    'República Dominicana',
  ],
  openGraph: {
    title: 'DUO Soluciones Empresariales | Transformamos Desafíos en Oportunidades',
    description:
      'Consultoría estratégica en desarrollo organizacional, mejora de procesos, implementación ERP y gobernanza. 15+ años transformando empresas.',
    url: 'https://duo-soluciones.com',
    siteName: 'DUO Soluciones Empresariales',
    type: 'website',
    images: [
      {
        url: '/images/og-homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'DUO Soluciones Empresariales - Consultoría Estratégica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DUO Soluciones Empresariales | Consultoría Estratégica',
    description: 'Transformamos desafíos organizacionales en oportunidades sostenibles. 15+ años de experiencia.',
    images: ['/images/og-homepage.jpg'],
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

// Stats data
const stats: Stat[] = [
  {
    id: '1',
    value: '200+',
    label: 'Proyectos Exitosos',
    description: 'Implementaciones completadas en toda la región',
    icon: Briefcase,
  },
  {
    id: '2',
    value: '15+',
    label: 'Años de Experiencia',
    description: 'Liderando transformación organizacional',
    icon: Award,
  },
  {
    id: '3',
    value: '98%',
    label: 'Satisfacción de Clientes',
    description: 'Comprometidos con la excelencia',
    icon: TrendingUp,
  },
  {
    id: '4',
    value: '50+',
    label: 'Empresas Transformadas',
    description: 'Desde startups hasta Fortune 500',
    icon: Users,
  },
]

// Testimonials data
const testimonials: Testimonial[] = [
  {
    id: '1',
    content:
      'DUO Soluciones transformó completamente nuestra operación. Su enfoque estratégico y metodología probada nos permitió reducir costos en 30% mientras mejorábamos la satisfacción del cliente. Un verdadero socio de confianza.',
    clientName: 'María Fernández',
    role: 'CEO',
    company: 'Grupo Empresarial del Caribe',
    rating: 5,
  },
  {
    id: '2',
    content:
      'La implementación de MS Dynamics 365 con DUO fue impecable. Cumplieron cada milestone a tiempo y dentro del presupuesto. Ahora tenemos visibilidad real-time de toda nuestra operación. Altamente recomendados.',
    clientName: 'Roberto Martínez',
    role: 'Director de Operaciones',
    company: 'Industrias Manufactureras RD',
    rating: 5,
  },
  {
    id: '3',
    content:
      'Su expertise en gobernanza corporativa nos ayudó a establecer controles robustos y cumplir con regulaciones internacionales. El equipo de DUO es profesional, conocedor y siempre disponible. Excelente inversión.',
    clientName: 'Ana Rodríguez',
    role: 'CFO',
    company: 'Servicios Financieros Premium',
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Transformamos Desafíos Organizacionales en Oportunidades Sostenibles"
        subtitle="Soluciones integrales de desarrollo organizacional, mejora de procesos y gobernanza corporativa que impulsan el crecimiento sostenible de tu empresa."
        description="Más de 15 años transformando organizaciones en República Dominicana y el Caribe. Expertos certificados en MS Dynamics, Power BI y metodologías ágiles."
        variant="gradient"
      />

      {/* Services Grid */}
      <ServiceGrid services={services} variant="2-col" />

      {/* Stats Section */}
      <StatsSection stats={stats} variant="gradient" />

      {/* Testimonials Carousel */}
      <TestimonialsCarousel testimonials={testimonials} />

      {/* Final CTA */}
      <CTASection
        title="¿Listo para Transformar tu Organización?"
        subtitle="Agenda una consulta gratuita de 30 minutos y descubre cómo podemos ayudarte a alcanzar tus objetivos."
        variant="gradient"
        primaryCTA={{
          text: 'Agenda tu Consulta Gratuita',
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
