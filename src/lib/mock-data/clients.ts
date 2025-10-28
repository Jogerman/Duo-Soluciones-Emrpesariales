/**
 * Mock client data for DUO Soluciones
 * Portfolio of companies we've worked with in República Dominicana and the Caribbean
 */

export type IndustryType = 'Banca' | 'Salud' | 'Manufactura' | 'Retail' | 'Tecnología'

export interface Client {
  id: string
  name: string
  logo: string
  industry: IndustryType
  description?: string
  featured?: boolean
}

export interface Industry {
  id: string
  name: string
  description: string
  clientCount: number
  icon: string // lucide-react icon name
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
  companyLogo?: string
  rating: number
  featured?: boolean
}

export interface CaseStudy {
  id: string
  clientName: string
  industry: IndustryType
  challenge: string
  solution: string
  result: string
  resultMetric: string
  image: string
  featured?: boolean
}

// Client stats
export const clientStats = {
  totalClients: 20,
  projectsCompleted: 25,
  yearsExperience: 15,
  satisfactionRate: 98,
}

// Clients portfolio - República Dominicana companies
export const clients: Client[] = [
  {
    id: '1',
    name: 'Banco Popular Dominicano',
    logo: '/clients/banco-popular.svg',
    industry: 'Banca',
    description: 'Implementación de Dynamics 365 Finance & Operations',
    featured: true,
  },
  {
    id: '2',
    name: 'Grupo Ramos',
    logo: '/clients/grupo-ramos.svg',
    industry: 'Retail',
    description: 'Mejora de procesos en cadena de suministro',
    featured: true,
  },
  {
    id: '3',
    name: 'Centro Médico Dominicano',
    logo: '/clients/centro-medico.svg',
    industry: 'Salud',
    description: 'Transformación digital y optimización operacional',
    featured: true,
  },
  {
    id: '4',
    name: 'Cervecería Nacional Dominicana',
    logo: '/clients/cerveceria-nacional.svg',
    industry: 'Manufactura',
    description: 'Implementación Lean Six Sigma en producción',
    featured: false,
  },
  {
    id: '5',
    name: 'Banco BHD León',
    logo: '/clients/bhd-leon.svg',
    industry: 'Banca',
    description: 'Gobernanza corporativa y compliance',
    featured: false,
  },
  {
    id: '6',
    name: 'La Sirena',
    logo: '/clients/la-sirena.svg',
    industry: 'Retail',
    description: 'Power BI analytics y business intelligence',
    featured: false,
  },
  {
    id: '7',
    name: 'Clínica Corazones Unidos',
    logo: '/clients/corazones-unidos.svg',
    industry: 'Salud',
    description: 'Sistema ERP integrado para gestión hospitalaria',
    featured: false,
  },
  {
    id: '8',
    name: 'Ingenio Azucarero del Este',
    logo: '/clients/ingenio-este.svg',
    industry: 'Manufactura',
    description: 'Excelencia operacional y reducción de desperdicios',
    featured: false,
  },
  {
    id: '10',
    name: 'Altice Dominicana',
    logo: '/clients/altice.svg',
    industry: 'Tecnología',
    description: 'Transformación ágil y gestión de proyectos',
    featured: false,
  },
  {
    id: '11',
    name: 'Grupo Punta Cana',
    logo: '/clients/punta-cana.svg',
    industry: 'Retail',
    description: 'Customer experience y mejora de procesos',
    featured: false,
  },
  {
    id: '12',
    name: 'Farmacia Carol',
    logo: '/clients/farmacia-carol.svg',
    industry: 'Retail',
    description: 'Automatización de inventario con Power Apps',
    featured: false,
  },
  {
    id: '13',
    name: 'Industrias San Miguel',
    logo: '/clients/san-miguel.svg',
    industry: 'Manufactura',
    description: 'ISO 9001 certification y sistemas de calidad',
    featured: false,
  },
  {
    id: '14',
    name: 'Seguros Banreservas',
    logo: '/clients/seguros-banreservas.svg',
    industry: 'Banca',
    description: 'Desarrollo organizacional y cultura de innovación',
    featured: false,
  },
  {
    id: '15',
    name: 'Hospital General Plaza de la Salud',
    logo: '/clients/plaza-salud.svg',
    industry: 'Salud',
    description: 'Gestión del cambio organizacional',
    featured: false,
  },
  {
    id: '16',
    name: 'Tech Solutions RD',
    logo: '/clients/tech-solutions.svg',
    industry: 'Tecnología',
    description: 'Implementación de metodologías ágiles (Scrum)',
    featured: false,
  },
]

// Industries we serve
export const industries: Industry[] = [
  {
    id: 'banca',
    name: 'Banca y Finanzas',
    description:
      'Soluciones especializadas para instituciones financieras: gobernanza, compliance, transformación digital y gestión de riesgos.',
    clientCount: 12,
    icon: 'building-2',
  },
  {
    id: 'salud',
    name: 'Salud',
    description:
      'Optimización de procesos hospitalarios, sistemas ERP médicos, gestión del cambio y mejora de experiencia del paciente.',
    clientCount: 8,
    icon: 'heart-pulse',
  },
  {
    id: 'manufactura',
    name: 'Manufactura',
    description:
      'Lean Six Sigma, excelencia operacional, reducción de desperdicios, ISO certifications y optimización de producción.',
    clientCount: 10,
    icon: 'factory',
  },
  {
    id: 'retail',
    name: 'Retail',
    description:
      'Cadena de suministro, customer experience, business intelligence, automatización de inventario y omnichannel.',
    clientCount: 14,
    icon: 'shopping-cart',
  },
  {
    id: 'tecnologia',
    name: 'Tecnología',
    description:
      'Metodologías ágiles, gestión de proyectos de software, transformación digital y desarrollo de capacidades técnicas.',
    clientCount: 4,
    icon: 'laptop',
  },
]

// Featured testimonials
export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      'En el caso particular de DUO en Ochoa Hermanos, vivimos una experiencia de mucho profesionalismo, donde todos nuestros procedimientos fueron mejorados y documentados y realmente las líneas de autoridad fueron clarificadas, los diferentes estamentos jerárquicos fueron claramente definidos y realmente deficiencias o carencias que la empresa arrastraba de décadas, en cuestión de meses fueron corregidas, la experiencia nos permitió actualizar nuestra empresa al siglo XXI.',
    author: 'Julián Ochoa',
    role: 'Presidente',
    company: 'Ochoa Hermanos',
    rating: 5,
    featured: true,
  },
  {
    id: '2',
    quote:
      'El apoyo brindado por DUO Soluciones Empresariales, ha sido fundamental para que nuestra institución adopte y consolide buenas prácticas en gobierno corporativo. Gracias a su acompañamiento experto, hemos logrado además, fortalecer nuestros procesos internos, diseñar una estructura organizacional adecuada y fomentar una cultura de responsabilidad y ética en todos los niveles.',
    author: 'Dra. Natalia García',
    role: 'Neumóloga - Consejo de Administración',
    company: 'Unión Médica del Norte',
    rating: 5,
    featured: true,
  },
  {
    id: '3',
    quote:
      'La asesoría de DUO, bajo la dirección del Lic. Miguel Rodríguez Viña, representó un proceso transformador para HEMA, fortaleciendo su estructura de gobernanza y definiendo con claridad meridiana la relación entre dirección médica, dirección general y el Consejo de Administración. Gracias a su acompañamiento, el hospital consolidó una cultura institucional basada en ética, transparencia y participación, articulando la excelencia médica con una visión empresarial sostenible.',
    author: 'Dr. Guillermo Angeles Fernández',
    role: 'Pediatra y Alergólogo - Consejo de Administración',
    company: 'HEMA - Hospital de Especialización Médica Avanzada',
    rating: 5,
    featured: true,
  },
]

// Case studies
export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    clientName: 'Banco Popular Dominicano',
    industry: 'Banca',
    challenge:
      'Procesos manuales fragmentados generaban errores, tiempos de ciclo largos y experiencia deficiente del cliente',
    solution:
      'Implementación completa de Microsoft Dynamics 365 Finance & Operations con integración a sistemas core bancarios',
    result:
      'Reducción de 40% en tiempos de procesamiento, 95% menos errores operacionales, y mejora de 35 puntos en NPS',
    resultMetric: '40% reducción de tiempos',
    image: '/case-studies/banco-popular.jpg',
    featured: true,
  },
  {
    id: '2',
    clientName: 'Cervecería Nacional Dominicana',
    industry: 'Manufactura',
    challenge:
      'Alta variabilidad en procesos de producción causando desperdicios y costos elevados',
    solution:
      'Implementación Lean Six Sigma con 8 proyectos DMAIC y capacitación Black Belt a 12 líderes',
    result:
      'Reducción de 35% en desperdicios, aumento de 28% en productividad, ahorro anual de $2.4M',
    resultMetric: '35% reducción de costos',
    image: '/case-studies/cerveceria.jpg',
    featured: true,
  },
]

// Trust indicators - certifications and partnerships
export const certifications = [
  {
    id: '1',
    name: 'Microsoft Gold Partner',
    description: 'Business Applications',
    logo: '/certifications/microsoft-gold.svg',
  },
  {
    id: '2',
    name: 'Lean Six Sigma',
    description: 'Black Belt Certified',
    logo: '/certifications/lean-six-sigma.svg',
  },
  {
    id: '3',
    name: 'ISO 9001:2015',
    description: 'Quality Management',
    logo: '/certifications/iso-9001.svg',
  },
  {
    id: '4',
    name: 'PMI',
    description: 'Project Management Institute',
    logo: '/certifications/pmi.svg',
  },
  {
    id: '5',
    name: 'SAFe 5 Agilist',
    description: 'Scaled Agile Framework',
    logo: '/certifications/safe.svg',
  },
  {
    id: '6',
    name: 'Scrum Alliance',
    description: 'Certified ScrumMaster',
    logo: '/certifications/scrum.svg',
  },
]
