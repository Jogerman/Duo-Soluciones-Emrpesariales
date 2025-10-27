import type { Metadata } from 'next'
import {
  HeroSection,
  ServiceGrid,
  StatsSection,
  TestimonialsCarousel,
  CTASection,
} from '@/components/marketing'
import type { ServiceItem, Stat, Testimonial } from '@/components/marketing'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

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
    description:
      'Transformamos desafíos organizacionales en oportunidades sostenibles. 15+ años de experiencia.',
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
    icon: 'target',
    image:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&auto=format&q=80',
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
    icon: 'settings',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&auto=format&q=80',
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
    icon: 'laptop',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format&q=80',
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
    icon: 'building2',
    image:
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop&auto=format&q=80',
  },
]

// Stats data
const stats: Stat[] = [
  {
    id: '1',
    value: '200+',
    label: 'Proyectos Exitosos',
    description: 'Implementaciones completadas en toda la región',
    icon: 'briefcase',
  },
  {
    id: '2',
    value: '15+',
    label: 'Años de Experiencia',
    description: 'Liderando transformación organizacional',
    icon: 'award',
  },
  {
    id: '3',
    value: '98%',
    label: 'Satisfacción de Clientes',
    description: 'Comprometidos con la excelencia',
    icon: 'trendingUp',
  },
  {
    id: '4',
    value: '50+',
    label: 'Empresas Transformadas',
    description: 'Desde startups hasta Fortune 500',
    icon: 'users',
  },
]

// Testimonials data
const testimonials: Testimonial[] = [
  {
    id: '1',
    content:
      'En el caso particular de DUO en Ochoa Hermanos, vivimos una experiencia de mucho profesionalismo, donde todos nuestros procedimientos fueron mejorados y documentados y realmente las líneas de autoridad fueron clarificadas, los diferentes estamentos jerárquicos fueron claramente definidos y realmente deficiencias o carencias que la empresa arrastraba de décadas, en cuestión de meses fueron corregidas, la experiencia nos permitió actualizar nuestra empresa al siglo XXI.',
    clientName: 'Julián Ochoa',
    role: 'Presidente',
    company: 'Ochoa Hermanos',
    rating: 5,
  },
  {
    id: '2',
    content:
      'El apoyo brindado por DUO Soluciones Empresariales, ha sido fundamental para que nuestra institución adopte y consolide buenas prácticas en gobierno corporativo. Gracias a su acompañamiento experto, hemos logrado además, fortalecer nuestros procesos internos, diseñar una estructura organizacional adecuada y fomentar una cultura de responsabilidad y ética en todos los niveles.',
    clientName: 'Dra. Natalia García',
    role: 'Neumóloga - Consejo de Administración',
    company: 'Unión Médica del Norte',
    rating: 5,
  },
  {
    id: '3',
    content:
      'La asesoría de DUO, bajo la dirección del Lic. Miguel Rodríguez Viña, representó un proceso transformador para HEMA, fortaleciendo su estructura de gobernanza y definiendo con claridad meridiana la relación entre dirección médica, dirección general y el Consejo de Administración. Gracias a su acompañamiento, el hospital consolidó una cultura institucional basada en ética, transparencia y participación, articulando la excelencia médica con una visión empresarial sostenible.',
    clientName: 'Dr. Guillermo Angeles Fernández',
    role: 'Pediatra y Alergólogo - Consejo de Administración',
    company: 'HEMA - Hospital de Especialización Médica Avanzada',
    rating: 5,
  },
]

export default function HomePage() {
  // Hero carousel images
  const heroImages = [
    '/images/hero/background-1.jpg',
    '/images/hero/background-2.jpg',
    '/images/hero/background-3.jpg',
    '/images/hero/background-4.jpg',
    '/images/hero/background-5.jpg',
    '/images/hero/background-6.jpg',
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Transformamos Desafíos en Oportunidades Sostenibles"
        subtitle=""
        variant="photo-focus"
        heroImages={heroImages}
        carouselInterval={5000}
        primaryCTA={{
          text: 'Conocer Más',
          href: '/services',
        }}
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
