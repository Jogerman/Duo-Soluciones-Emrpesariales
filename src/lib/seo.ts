import type { Metadata } from 'next'

/**
 * SEO Utility Functions for DUO Soluciones Empresariales
 *
 * This module provides comprehensive SEO utilities including:
 * - Dynamic metadata generation
 * - JSON-LD structured data schemas
 * - Organization, LocalBusiness, Service, and Article schemas
 * - OpenGraph and Twitter Card support
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface SEOProps {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  keywords?: string[]
  author?: string
  noindex?: boolean
}

export interface ServiceSchemaProps {
  name: string
  description: string
  serviceType: string
  provider: string
  areaServed: string
  url?: string
  image?: string
}

export interface ArticleSchemaProps {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author: string
  authorUrl?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface BreadcrumbItem {
  name: string
  url: string
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const SITE_CONFIG = {
  name: 'DUO Soluciones Empresariales',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://duo-soluciones.com',
  description: 'Consultora especializada en desarrollo organizacional, mejora de procesos, implementación ERP y gobernanza corporativa en República Dominicana.',
  locale: 'es_DO',
  alternateLocale: 'en_US',
  defaultImage: '/logo-duo.png',
  logo: '/logo-duo.png',
  email: 'info@duo-soluciones.com',
  phone: '+1-809-XXX-XXXX', // To be updated
  address: {
    streetAddress: 'Dirección oficina',
    addressLocality: 'Santo Domingo',
    addressRegion: 'Distrito Nacional',
    postalCode: '10100',
    addressCountry: 'DO',
  },
  socialMedia: {
    linkedin: 'https://linkedin.com/company/duo-soluciones',
    spotify: 'https://open.spotify.com/show/duo-podcast',
    twitter: '@duosoluciones',
  },
  defaultKeywords: [
    'desarrollo organizacional',
    'mejora de procesos',
    'gobernanza corporativa',
    'ERP',
    'MS Dynamics',
    'Power BI',
    'consultoría empresarial',
    'transformación digital',
    'República Dominicana',
    'Santo Domingo',
  ],
} as const

// ============================================================================
// METADATA GENERATION
// ============================================================================

/**
 * Generate comprehensive SEO metadata for pages
 *
 * @example
 * ```tsx
 * export const metadata = generateSEO({
 *   title: 'Desarrollo Organizacional',
 *   description: 'Servicios de desarrollo organizacional...',
 *   path: '/services/desarrollo-organizacional',
 * })
 * ```
 */
export function generateSEO(props: SEOProps): Metadata {
  const {
    title,
    description,
    path = '',
    image,
    type = 'website',
    publishedTime,
    modifiedTime,
    keywords = [],
    author,
    noindex = false,
  } = props

  const url = `${SITE_CONFIG.url}${path}`
  const ogImage = image || SITE_CONFIG.defaultImage
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_CONFIG.url}${ogImage}`

  const allKeywords = [...new Set([...SITE_CONFIG.defaultKeywords, ...keywords])]

  return {
    title,
    description,
    keywords: allKeywords,
    authors: author ? [{ name: author }] : [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    alternates: {
      canonical: url,
      languages: {
        'es-DO': url,
        'en-US': `${url}/en`,
      },
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      type,
      locale: SITE_CONFIG.locale,
      url,
      siteName: SITE_CONFIG.name,
      title,
      description,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      creator: SITE_CONFIG.socialMedia.twitter,
      site: SITE_CONFIG.socialMedia.twitter,
    },
  }
}

// ============================================================================
// JSON-LD STRUCTURED DATA SCHEMAS
// ============================================================================

/**
 * Generate Organization schema for the company
 * Should be included in root layout
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: SITE_CONFIG.address.addressLocality,
      addressRegion: SITE_CONFIG.address.addressRegion,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.addressCountry,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.phone,
      contactType: 'customer service',
      areaServed: 'DO',
      availableLanguage: ['es', 'en'],
    },
    sameAs: [
      SITE_CONFIG.socialMedia.linkedin,
      SITE_CONFIG.socialMedia.spotify,
    ],
    foundingDate: '2020', // Update with actual founding date
    slogan: 'Transformamos desafíos en oportunidades sostenibles',
  }
}

/**
 * Generate LocalBusiness schema
 * Used for contact page and local SEO
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: SITE_CONFIG.address.addressLocality,
      addressRegion: SITE_CONFIG.address.addressRegion,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 18.4861, // Santo Domingo coordinates (update with actual)
      longitude: -69.9312,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Dominican Republic',
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 18.4861,
        longitude: -69.9312,
      },
      geoRadius: '100000', // 100km radius
    },
  }
}

/**
 * Generate Service schema for individual service pages
 */
export function generateServiceSchema(props: ServiceSchemaProps) {
  const { name, description, serviceType, provider, areaServed, url, image } = props

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: SITE_CONFIG.url,
    },
    areaServed: {
      '@type': 'Country',
      name: areaServed,
    },
    url: url || SITE_CONFIG.url,
    ...(image && {
      image: image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`,
    }),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'DOP',
      },
    },
  }
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  }
}

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(props: ArticleSchemaProps) {
  const {
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author,
    authorUrl,
  } = props

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
      ...(authorUrl && { url: authorUrl }),
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': SITE_CONFIG.url,
    },
  }
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate ItemList schema for services listing
 */
export function generateItemListSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: `${SITE_CONFIG.url}${item.url}`,
    })),
  }
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema(props: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: props.name,
    description: props.description,
    url: `${SITE_CONFIG.url}${props.url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
  }
}

// ============================================================================
// SERVICE-SPECIFIC SCHEMAS
// ============================================================================

/**
 * Pre-configured schemas for DUO Soluciones services
 */
export const SERVICE_SCHEMAS = {
  desarrolloOrganizacional: () =>
    generateServiceSchema({
      name: 'Desarrollo Organizacional',
      description:
        'Diseño y optimización de estructuras organizacionales alineadas con la estrategia empresarial.',
      serviceType: 'Organizational Development Consulting',
      provider: SITE_CONFIG.name,
      areaServed: 'República Dominicana',
      url: '/services/desarrollo-organizacional',
    }),

  mejoraProcesos: () =>
    generateServiceSchema({
      name: 'Mejora de Procesos',
      description:
        'Análisis, rediseño y optimización de procesos de negocio para mayor eficiencia operacional.',
      serviceType: 'Business Process Improvement',
      provider: SITE_CONFIG.name,
      areaServed: 'República Dominicana',
      url: '/services/mejora-procesos',
    }),

  implementacionERP: () =>
    generateServiceSchema({
      name: 'Implementación ERP',
      description:
        'Implementación de Microsoft Dynamics 365 y soluciones ERP empresariales.',
      serviceType: 'ERP Implementation Consulting',
      provider: SITE_CONFIG.name,
      areaServed: 'República Dominicana',
      url: '/services/implementacion-erp',
    }),

  gobernanzaCorporativa: () =>
    generateServiceSchema({
      name: 'Gobernanza Corporativa',
      description:
        'Estructuración de sistemas de gobierno corporativo y gestión de riesgos empresariales.',
      serviceType: 'Corporate Governance Consulting',
      provider: SITE_CONFIG.name,
      areaServed: 'República Dominicana',
      url: '/services/gobernanza-corporativa',
    }),
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate JSON-LD script tag
 * Use this to inject structured data into pages
 */
export function generateStructuredDataScript(schema: object) {
  return {
    __html: JSON.stringify(schema),
  }
}

/**
 * Get reading time estimation for blog posts
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string): string {
  return `${SITE_CONFIG.url}${path}`
}

/**
 * Export site config for use in other components
 */
export { SITE_CONFIG }
