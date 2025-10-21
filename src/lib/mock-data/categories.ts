import { Category } from '@/types/content'

export const categories: Category[] = [
  {
    id: '1',
    name: 'Desarrollo Organizacional',
    slug: 'desarrollo-organizacional',
    description:
      'Estrategias y metodologías para el diseño y evolución de estructuras organizacionales efectivas',
    color: '#1b5e5e',
  },
  {
    id: '2',
    name: 'Mejora de Procesos',
    slug: 'mejora-procesos',
    description:
      'Optimización de procesos empresariales, Lean, Six Sigma y metodologías de mejora continua',
    color: '#2563eb',
  },
  {
    id: '3',
    name: 'Sistemas ERP',
    slug: 'sistemas-erp',
    description:
      'Implementación, configuración y optimización de sistemas de planificación de recursos empresariales',
    color: '#7c3aed',
  },
  {
    id: '4',
    name: 'Gobernanza Corporativa',
    slug: 'gobernanza-corporativa',
    description:
      'Estructuras de gobierno, gestión de riesgos, cumplimiento normativo y transparencia empresarial',
    color: '#dc2626',
  },
  {
    id: '5',
    name: 'Liderazgo',
    slug: 'liderazgo',
    description:
      'Desarrollo de habilidades directivas, gestión de equipos y cultura organizacional',
    color: '#ea580c',
  },
  {
    id: '6',
    name: 'Transformación Digital',
    slug: 'transformacion-digital',
    description: 'Digitalización de procesos, automatización y adopción de tecnologías emergentes',
    color: '#059669',
  },
]

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id)
}

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug)
}
