import { Tag } from '@/types/content'

export const tags: Tag[] = [
  { id: '1', name: 'Estrategia', slug: 'estrategia' },
  { id: '2', name: 'Cambio Organizacional', slug: 'cambio-organizacional' },
  { id: '3', name: 'KPIs', slug: 'kpis' },
  { id: '4', name: 'Lean Manufacturing', slug: 'lean-manufacturing' },
  { id: '5', name: 'Six Sigma', slug: 'six-sigma' },
  { id: '6', name: 'Automatizaci�n', slug: 'automatizacion' },
  { id: '7', name: 'Odoo', slug: 'odoo' },
  { id: '8', name: 'SAP', slug: 'sap' },
  { id: '9', name: 'Implementaci�n ERP', slug: 'implementacion-erp' },
  { id: '10', name: 'Gesti�n de Riesgos', slug: 'gestion-riesgos' },
  { id: '11', name: 'Cumplimiento', slug: 'cumplimiento' },
  { id: '12', name: 'Cultura Organizacional', slug: 'cultura-organizacional' },
  { id: '13', name: 'Gesti�n del Cambio', slug: 'gestion-cambio' },
  { id: '14', name: 'Innovaci�n', slug: 'innovacion' },
  { id: '15', name: 'PYMES', slug: 'pymes' },
  { id: '16', name: 'Productividad', slug: 'productividad' },
  { id: '17', name: 'Indicadores', slug: 'indicadores' },
  { id: '18', name: 'An�lisis de Datos', slug: 'analisis-datos' },
  { id: '19', name: 'Mejora Continua', slug: 'mejora-continua' },
  { id: '20', name: 'Transformaci�n', slug: 'transformacion' },
]

export const getTagById = (id: string): Tag | undefined => {
  return tags.find(tag => tag.id === id)
}

export const getTagBySlug = (slug: string): Tag | undefined => {
  return tags.find(tag => tag.slug === slug)
}

export const getTagsByIds = (ids: string[]): Tag[] => {
  return tags.filter(tag => ids.includes(tag.id))
}
