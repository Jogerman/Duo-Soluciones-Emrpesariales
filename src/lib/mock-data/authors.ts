import { Author } from '@/types/content'

export const authors: Author[] = [
  {
    id: '1',
    name: 'Mar�a Gonz�lez',
    role: 'Directora de Consultor�a',
    avatar: '/images/team/maria-gonzalez.jpg',
    bio: 'Especialista en transformaci�n organizacional con m�s de 15 a�os de experiencia. Experta en dise�o de estructuras organizacionales y desarrollo de capacidades empresariales.',
    linkedin: 'https://linkedin.com/in/maria-gonzalez',
    twitter: 'https://twitter.com/mariagonzalez',
  },
  {
    id: '2',
    name: 'Carlos Rodr�guez',
    role: 'Consultor Senior en Mejora de Procesos',
    avatar: '/images/team/carlos-rodriguez.jpg',
    bio: 'Ingeniero Industrial con especializaci�n en Lean Six Sigma Black Belt. L�der en proyectos de optimizaci�n de procesos y gesti�n del cambio organizacional.',
    linkedin: 'https://linkedin.com/in/carlos-rodriguez',
  },
  {
    id: '3',
    name: 'Ana Mart�nez',
    role: 'Consultora de Gobernanza Corporativa',
    avatar: '/images/team/ana-martinez.jpg',
    bio: 'Abogada corporativa y consultora en gobierno corporativo. Especializada en estructuras de gobierno, gesti�n de riesgos y cumplimiento normativo.',
    linkedin: 'https://linkedin.com/in/ana-martinez',
  },
  {
    id: '4',
    name: 'Diego Fern�ndez',
    role: 'Especialista en Transformaci�n Digital',
    avatar: '/images/team/diego-fernandez.jpg',
    bio: 'Ingeniero de Sistemas con MBA. Experto en implementaci�n de ERP, automatizaci�n de procesos y estrategias de transformaci�n digital para PYMES.',
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
