import { PodcastGuest } from '@/types/content'

export const podcastGuests: PodcastGuest[] = [
  {
    id: 'g1',
    name: 'Roberto Sánchez',
    role: 'CEO',
    company: 'TechCorp Latam',
    avatar: '/images/guests/roberto-sanchez.jpg',
    bio: 'Emprendedor serial y CEO de TechCorp Latam. Experto en transformacián digital y escalamiento de startups B2B.',
    linkedin: 'https://linkedin.com/in/roberto-sanchez',
  },
  {
    id: 'g2',
    name: 'Patricia Morales',
    role: 'Directora de Operaciones',
    company: 'IndustriaXYZ',
    avatar: '/images/guests/patricia-morales.jpg',
    bio: 'Ingeniera Industrial con 20 aáos de experiencia en manufactura. Láder en implementacián de Lean Manufacturing en Amárica Latina.',
    linkedin: 'https://linkedin.com/in/patricia-morales',
  },
  {
    id: 'g3',
    name: 'Dr. Fernando García',
    role: 'Profesor de Estrategia',
    company: 'Universidad Nacional',
    avatar: '/images/guests/fernando-garcia.jpg',
    bio: 'PhD en Administracián Estratágica. Profesor universitario y consultor en estrategia corporativa para empresas Fortune 500.',
    linkedin: 'https://linkedin.com/in/fernando-garcia',
  },
  {
    id: 'g4',
    name: 'Laura Jimánez',
    role: 'CFO',
    company: 'Grupo Financiero Delta',
    avatar: '/images/guests/laura-jimenez.jpg',
    bio: 'Contadora Páblica y CFO. Especialista en reestructuracián financiera y gestián de crisis en empresas familiares.',
    linkedin: 'https://linkedin.com/in/laura-jimenez',
  },
  {
    id: 'g5',
    name: 'Miguel ángel Torres',
    role: 'Founder & CTO',
    company: 'CloudSolutions',
    avatar: '/images/guests/miguel-torres.jpg',
    bio: 'Ingeniero en Sistemas y emprendedor tecnolágico. Fundador de 3 startups exitosas en el sector SaaS.',
    linkedin: 'https://linkedin.com/in/miguel-torres',
  },
  {
    id: 'g6',
    name: 'Sandra Ramárez',
    role: 'Directora de RRHH',
    company: 'Retail Nacional',
    avatar: '/images/guests/sandra-ramirez.jpg',
    bio: 'Psicáloga Organizacional con MBA. Experta en desarrollo de talento y transformacián cultural en empresas de retail.',
    linkedin: 'https://linkedin.com/in/sandra-ramirez',
  },
]

export const getPodcastGuestById = (id: string): PodcastGuest | undefined => {
  return podcastGuests.find(guest => guest.id === id)
}

export const getPodcastGuestsByIds = (ids: string[]): PodcastGuest[] => {
  return podcastGuests.filter(guest => ids.includes(guest.id))
}
