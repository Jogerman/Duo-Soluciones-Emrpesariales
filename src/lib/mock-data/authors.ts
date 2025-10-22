import { Author } from '@/types/content'

export const authors: Author[] = [
  {
    id: '1',
    name: 'María González',
    role: 'Directora de Consultoría',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format&q=80',
    bio: 'Especialista en transformación organizacional con más de 15 años de experiencia. Experta en diseño de estructuras organizacionales y desarrollo de capacidades empresariales.',
    linkedin: 'https://linkedin.com/in/maria-gonzalez',
    twitter: 'https://twitter.com/mariagonzalez',
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    role: 'Consultor Senior en Mejora de Procesos',
    avatar:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop&auto=format&q=80',
    bio: 'Ingeniero Industrial con especialización en Lean Six Sigma Black Belt. Líder en proyectos de optimización de procesos y gestión del cambio organizacional.',
    linkedin: 'https://linkedin.com/in/carlos-rodriguez',
  },
  {
    id: '3',
    name: 'Ana Martínez',
    role: 'Consultora de Gobernanza Corporativa',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format&q=80',
    bio: 'Abogada corporativa y consultora en gobierno corporativo. Especializada en estructuras de gobierno, gestión de riesgos y cumplimiento normativo.',
    linkedin: 'https://linkedin.com/in/ana-martinez',
  },
  {
    id: '4',
    name: 'Diego Fernández',
    role: 'Especialista en Transformación Digital',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&auto=format&q=80',
    bio: 'Ingeniero de Sistemas con MBA. Experto en implementación de ERP, automatización de procesos y estrategias de transformación digital para PYMES.',
    linkedin: 'https://linkedin.com/in/diego-fernandez',
    twitter: 'https://twitter.com/diegofernandez',
  },
]

export const getAuthorById = (id: string): Author | undefined => {
  return authors.find(author => author.id === id)
}

export const getAuthorByName = (name: string): Author | undefined => {
  return authors.find(author => author.name.toLowerCase() === name.toLowerCase())
}
