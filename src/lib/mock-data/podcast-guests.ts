import { PodcastGuest } from '@/types/content'

export const podcastGuests: PodcastGuest[] = [
  {
    id: 'g1',
    name: 'Roberto S�nchez',
    role: 'CEO',
    company: 'TechCorp Latam',
    avatar: '/images/guests/roberto-sanchez.jpg',
    bio: 'Emprendedor serial y CEO de TechCorp Latam. Experto en transformaci�n digital y escalamiento de startups B2B.',
    linkedin: 'https://linkedin.com/in/roberto-sanchez',
  },
  {
    id: 'g2',
    name: 'Patricia Morales',
    role: 'Directora de Operaciones',
    company: 'IndustriaXYZ',
    avatar: '/images/guests/patricia-morales.jpg',
    bio: 'Ingeniera Industrial con 20 a�os de experiencia en manufactura. L�der en implementaci�n de Lean Manufacturing en Am�rica Latina.',
    linkedin: 'https://linkedin.com/in/patricia-morales',
  },
  {
    id: 'g3',
    name: 'Dr. Fernando Garc�a',
    role: 'Profesor de Estrategia',
    company: 'Universidad Nacional',
    avatar: '/images/guests/fernando-garcia.jpg',
    bio: 'PhD en Administraci�n Estrat�gica. Profesor universitario y consultor en estrategia corporativa para empresas Fortune 500.',
    linkedin: 'https://linkedin.com/in/fernando-garcia',
  },
  {
    id: 'g4',
    name: 'Laura Jim�nez',
    role: 'CFO',
    company: 'Grupo Financiero Delta',
    avatar: '/images/guests/laura-jimenez.jpg',
    bio: 'Contadora P�blica y CFO. Especialista en reestructuraci�n financiera y gesti�n de crisis en empresas familiares.',
    linkedin: 'https://linkedin.com/in/laura-jimenez',
  },
  {
    id: 'g5',
    name: 'Miguel �ngel Torres',
    role: 'Founder & CTO',
    company: 'CloudSolutions',
    avatar: '/images/guests/miguel-torres.jpg',
    bio: 'Ingeniero en Sistemas y emprendedor tecnol�gico. Fundador de 3 startups exitosas en el sector SaaS.',
    linkedin: 'https://linkedin.com/in/miguel-torres',
  },
  {
    id: 'g6',
    name: 'Sandra Ram�rez',
    role: 'Directora de RRHH',
    company: 'Retail Nacional',
    avatar: '/images/guests/sandra-ramirez.jpg',
    bio: 'Psic�loga Organizacional con MBA. Experta en desarrollo de talento y transformaci�n cultural en empresas de retail.',
    linkedin: 'https://linkedin.com/in/sandra-ramirez',
  },
]

export const getPodcastGuestById = (id: string): PodcastGuest | undefined => {
  return podcastGuests.find(guest => guest.id === id)
}

export const getPodcastGuestsByIds = (ids: string[]): PodcastGuest[] => {
  return podcastGuests.filter(guest => ids.includes(guest.id))
}
