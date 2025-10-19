import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: {
    default: 'DUO Soluciones Empresariales',
    template: '%s | DUO Soluciones Empresariales',
  },
  description:
    'Transformamos desafíos en oportunidades sostenibles. Consultora especializada en desarrollo organizacional, mejora de procesos, implementación ERP y gobernanza corporativa.',
  keywords: [
    'desarrollo organizacional',
    'mejora de procesos',
    'gobernanza corporativa',
    'ERP implementation',
    'MS Dynamics',
    'Power BI',
    'consultoría empresarial',
    'transformación digital',
    'República Dominicana',
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
    url: 'https://duosoluciones.com.do',
    siteName: 'DUO Soluciones Empresariales',
    title: 'DUO Soluciones Empresariales',
    description: 'Transformamos desafíos en oportunidades sostenibles',
    images: [
      {
        url: '/og-image.jpg',
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
    images: ['/og-image.jpg'],
    creator: '@duosoluciones',
  },
  alternates: {
    canonical: 'https://duosoluciones.com.do',
    languages: {
      'es-DO': 'https://duosoluciones.com.do',
      'en-US': 'https://duosoluciones.com.do/en',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
