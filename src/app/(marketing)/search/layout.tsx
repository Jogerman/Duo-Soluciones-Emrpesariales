import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Búsqueda | DUO Soluciones Empresariales',
  description:
    'Busca artículos de blog y episodios de podcast sobre desarrollo organizacional, mejora de procesos, ERP, y más.',
  openGraph: {
    title: 'Búsqueda | DUO Soluciones Empresariales',
    description:
      'Busca artículos de blog y episodios de podcast sobre desarrollo organizacional, mejora de procesos, ERP, y más.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children
}
