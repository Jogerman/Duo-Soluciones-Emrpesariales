import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { GoogleAnalytics } from '@/components/seo/GoogleAnalytics'
import { ToastProvider, ToastContainer } from '@/components/ui/Toast'
import { generateOrganizationSchema, generateStructuredDataScript, SITE_CONFIG } from '@/lib/seo'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'DUO Soluciones Empresariales - Transformamos desafíos en oportunidades sostenibles',
    template: '%s | DUO Soluciones',
  },
  description:
    'Consultora especializada en desarrollo organizacional, mejora de procesos, implementación ERP y gobernanza corporativa en República Dominicana. Transformamos desafíos organizacionales en oportunidades sostenibles.',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  keywords: [
    'desarrollo organizacional',
    'mejora de procesos',
    'gobernanza corporativa',
    'ERP',
    'MS Dynamics',
    'Microsoft Dynamics 365',
    'Power BI',
    'consultoría empresarial',
    'transformación digital',
    'República Dominicana',
    'Santo Domingo',
    'consultora empresarial',
    'Business Process Improvement',
    'implementación ERP',
    'gestión de procesos',
    'optimización de procesos',
    'consultoría organizacional',
  ],
  authors: [{ name: 'DUO Soluciones Empresariales' }],
  creator: 'DUO Soluciones Empresariales',
  publisher: 'DUO Soluciones Empresariales',
  robots: {
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
    type: 'website',
    locale: 'es_DO',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: 'DUO Soluciones Empresariales - Transformamos desafíos en oportunidades sostenibles',
    description:
      'Consultora especializada en desarrollo organizacional, mejora de procesos, implementación ERP y gobernanza corporativa en República Dominicana.',
    images: [
      {
        url: SITE_CONFIG.defaultImage,
        width: 1200,
        height: 630,
        alt: 'DUO Soluciones Empresariales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DUO Soluciones Empresariales',
    description: 'Transformamos desafíos en oportunidades sostenibles',
    images: [SITE_CONFIG.defaultImage],
    creator: SITE_CONFIG.socialMedia.twitter,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      'es-DO': SITE_CONFIG.url,
      'en-US': `${SITE_CONFIG.url}/en`,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    // yandex: '',
    // yahoo: '',
    // other: '',
  },
  category: 'Business Consulting',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Generate Organization schema for the entire site
  const organizationSchema = generateOrganizationSchema()

  return (
    <html lang="es" className={poppins.variable}>
      <head>
        <meta charSet="utf-8" />
        {/* Organization JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateStructuredDataScript(organizationSchema)}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Google Analytics */}
        <GoogleAnalytics />

        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:rounded-md focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
        >
          Saltar al contenido principal
        </a>

        {/* Toast Provider for notifications */}
        <ToastProvider>
          {/* Main Layout */}
          <Header />
          <main id="main-content">{children}</main>
          <Footer />

          {/* Toast Container */}
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  )
}
