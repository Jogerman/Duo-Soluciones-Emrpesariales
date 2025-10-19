import { db } from './index'
import { services, team, clients, users } from './schema'
import * as bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

/**
 * Seed Data Script
 * Populates the database with initial data for DUO Soluciones Empresariales
 */

const seedServices = async () => {
  console.log('📦 Seeding services...')

  const servicesData = [
    {
      title: 'Desarrollo Organizacional',
      slug: 'desarrollo-organizacional',
      category: 'AS1',
      shortDescription:
        'Diseño e implementación de estructuras organizacionales efectivas y procesos de mejora continua.',
      longDescription:
        'Trabajamos junto a su organización para desarrollar estructuras organizacionales sólidas, políticas claras y procedimientos eficientes que impulsen el crecimiento y la efectividad operacional.',
      icon: 'Building2',
      featured: true,
      order: 1,
      benefits: [
        'Mejora en la eficiencia operacional',
        'Claridad en roles y responsabilidades',
        'Cultura organizacional fortalecida',
        'Mejor toma de decisiones',
      ],
      deliverables: [
        'Planificación Estratégica Organizacional',
        'Desarrollo de Políticas y Manuales',
        'Estructuras Organizacionales y Perfiles',
        'Flujos de funciones cruzadas',
      ],
      keyFeatures: [
        'Análisis organizacional profundo',
        'Diseño de estructuras personalizadas',
        'Implementación guiada',
      ],
      metaTitle: 'Desarrollo Organizacional - DUO Soluciones',
      metaDescription:
        'Servicios de consultoría en desarrollo organizacional para empresas en República Dominicana.',
      isActive: true,
    },
    {
      title: 'Mejora de Procesos y Cadena de Abastecimiento',
      slug: 'mejora-procesos-cadena-abastecimiento',
      category: 'AS2',
      shortDescription:
        'Optimización de procesos operacionales y cadena de suministro para maximizar eficiencia.',
      longDescription:
        'Aplicamos metodologías probadas para mapear, analizar y optimizar sus procesos de negocio y cadena de abastecimiento, eliminando desperdicios y maximizando valor.',
      icon: 'GitBranch',
      featured: true,
      order: 2,
      benefits: [
        'Reducción de costos operacionales',
        'Mejora en tiempos de entrega',
        'Mayor satisfacción del cliente',
        'Optimización de inventarios',
      ],
      deliverables: [
        'Mapa de Macroprocesos',
        'Cadena de Valor institucional',
        'Procesos Misionales de segundo nivel',
        'Diseño de redistribución física y rutas',
        'Optimización de procesos logísticos',
      ],
      keyFeatures: ['Mapeo de procesos', 'Análisis de cadena de valor', 'Diseño logístico'],
      metaTitle: 'Mejora de Procesos - DUO Soluciones',
      metaDescription: 'Optimización de procesos y cadena de abastecimiento para empresas.',
      isActive: true,
    },
    {
      title: 'Implementación ERP / MS Dynamics / Power BI',
      slug: 'implementacion-erp-dynamics-powerbi',
      category: 'AS3',
      shortDescription:
        'Acompañamiento en proyectos de implementación tecnológica y desarrollo de dashboards analíticos.',
      longDescription:
        'Guiamos su organización en la implementación exitosa de sistemas ERP como Microsoft Dynamics y desarrollo de dashboards en Power BI para toma de decisiones basada en datos.',
      icon: 'BarChart3',
      featured: true,
      order: 3,
      benefits: [
        'Implementación exitosa de tecnología',
        'Visibilidad en tiempo real',
        'Mejores decisiones basadas en datos',
        'ROI medible',
      ],
      deliverables: [
        'Desarrollo de Ruta de Proyecto',
        'Documentos Constitutivos del Proyecto',
        'Dashboards en MS Power BI',
        'Indicadores de Gestión (Financieros, Operativos, Ventas)',
      ],
      keyFeatures: [
        'Gestión de proyectos tecnológicos',
        'Desarrollo de BI',
        'Capacitación de usuarios',
      ],
      metaTitle: 'Implementación ERP y Power BI - DUO Soluciones',
      metaDescription:
        'Servicios de implementación de Microsoft Dynamics y desarrollo de dashboards en Power BI.',
      isActive: true,
    },
    {
      title: 'Gobernanza Corporativa',
      slug: 'gobernanza-corporativa',
      category: 'AS4',
      shortDescription: 'Diseño e implementación de modelos de gobierno corporativo y compliance.',
      longDescription:
        'Desarrollamos modelos de gobernanza corporativa adaptados a su empresa, incluyendo políticas de compliance, gestión de riesgos y protocolos familiares para empresas familiares.',
      icon: 'Shield',
      featured: true,
      order: 4,
      benefits: [
        'Mayor transparencia organizacional',
        'Mejor gestión de riesgos',
        'Cumplimiento normativo',
        'Continuidad empresarial',
      ],
      deliverables: [
        'Modelos de Gobierno Corporativos',
        'Reglamento Interno del Consejo',
        'Políticas de Conflicto de Interés',
        'Manual de Ética',
        'Planes Estratégicos Institucionales',
        'Políticas de Compliance',
        'Protocolos Familiares',
        'Análisis de riesgo',
      ],
      keyFeatures: ['Diseño de gobernanza', 'Compliance y ética', 'Gestión de riesgos'],
      metaTitle: 'Gobernanza Corporativa - DUO Soluciones',
      metaDescription: 'Consultoría en gobierno corporativo, compliance y gestión de riesgos.',
      isActive: true,
    },
  ]

  await db.insert(services).values(servicesData)
  console.log('✅ Services seeded successfully')
}

const seedTeam = async () => {
  console.log('👥 Seeding team members...')

  const teamData = [
    {
      name: 'Miguel Rodriguez Viñas',
      role: 'Director General',
      bio: 'Experto en Gerencia de Operaciones con más de 28 años de experiencia en diversos sectores industriales. Post-grado en Alta Gestión Empresarial de George Washington University.',
      email: 'miguel.rodriguez@duosoluciones.com',
      linkedin: 'https://www.linkedin.com/in/miguel-rodriguez',
      experienceYears: 28,
      specialties: [
        'Gerencia de Operaciones',
        'Desarrollo Organizacional',
        'Mejora de Procesos',
        'Gestión de Proyectos',
      ],
      certifications: [
        {
          name: 'Post-grado Alta Gestión Empresarial',
          issuer: 'George Washington University',
        },
        {
          name: 'Certified Project Manager',
          issuer: 'CPM',
        },
      ],
      education: [
        {
          degree: 'Post-grado en Alta Gestión Empresarial',
          institution: 'George Washington University',
        },
      ],
      industries: ['Educación', 'Seguridad Pública', 'Salud', 'Farmacéutico', 'Energía'],
      featured: true,
      order: 1,
      isActive: true,
    },
    {
      name: 'Angelina Burgos Dominguez',
      role: 'Directora de Operaciones',
      bio: 'Experta en Ingeniería Logística con más de 20 años de experiencia. Becaria Fullbright, Ingeniera Industrial PUCMM con especialización de Ohio State University.',
      email: 'angelina.burgos@duosoluciones.com',
      linkedin: 'https://www.linkedin.com/in/angelina-burgos',
      experienceYears: 20,
      specialties: [
        'Ingeniería Logística',
        'Cadena de Abastecimiento',
        'Mejora de Procesos',
        'Gestión de Operaciones',
      ],
      certifications: [
        {
          name: 'Becaria Fullbright',
          issuer: 'Fullbright Program',
        },
        {
          name: 'Microsoft Certified Power Platform Fundamentals',
          issuer: 'Microsoft',
        },
      ],
      education: [
        {
          degree: 'Ingeniería Logística',
          institution: 'Ohio State University',
        },
        {
          degree: 'Ingeniería Industrial',
          institution: 'PUCMM',
        },
      ],
      industries: [
        'Cadena de Abastecimiento',
        'Educación Superior',
        'Retail',
        'Farmacéutico',
        'Construcción',
        'Manufactura',
      ],
      featured: true,
      order: 2,
      isActive: true,
    },
  ]

  await db.insert(team).values(teamData)
  console.log('✅ Team members seeded successfully')
}

const seedClients = async () => {
  console.log('🏢 Seeding clients...')

  const clientsData = [
    {
      name: 'Torres 2',
      slug: 'torres-2',
      industry: 'Construcción',
      featured: true,
      order: 1,
      isActive: true,
    },
    {
      name: 'Rizek Peralta',
      slug: 'rizek-peralta',
      industry: 'Legal',
      featured: true,
      order: 2,
      isActive: true,
    },
    {
      name: 'Mallen',
      slug: 'mallen',
      industry: 'Retail',
      featured: true,
      order: 3,
      isActive: true,
    },
    {
      name: 'Hospital Antonio Ochoa',
      slug: 'hospital-antonio-ochoa',
      industry: 'Salud',
      featured: true,
      order: 4,
      isActive: true,
    },
    {
      name: 'Colegio San Judas Tadeo',
      slug: 'colegio-san-judas-tadeo',
      industry: 'Educación',
      featured: true,
      order: 5,
      isActive: true,
    },
    {
      name: 'Grupo Cometa',
      slug: 'grupo-cometa',
      industry: 'Manufactura',
      featured: false,
      order: 6,
      isActive: true,
    },
    {
      name: 'grabo+estilo',
      slug: 'grabo-estilo',
      industry: 'Retail',
      featured: false,
      order: 7,
      isActive: true,
    },
    {
      name: 'Nucleus',
      slug: 'nucleus',
      industry: 'Tecnología',
      featured: false,
      order: 8,
      isActive: true,
    },
    {
      name: 'Orlando Comercial',
      slug: 'orlando-comercial',
      industry: 'Comercio',
      featured: false,
      order: 9,
      isActive: true,
    },
    {
      name: 'Greenwise',
      slug: 'greenwise',
      industry: 'Agricultura',
      featured: false,
      order: 10,
      isActive: true,
    },
    {
      name: 'APCRES',
      slug: 'apcres',
      industry: 'Energía',
      featured: false,
      order: 11,
      isActive: true,
    },
    {
      name: 'Centro Médico Batista',
      slug: 'centro-medico-batista',
      industry: 'Salud',
      featured: false,
      order: 12,
      isActive: true,
    },
    {
      name: 'Centro Médico Guadalupe',
      slug: 'centro-medico-guadalupe',
      industry: 'Salud',
      featured: false,
      order: 13,
      isActive: true,
    },
    {
      name: 'Smart Foam',
      slug: 'smart-foam',
      industry: 'Manufactura',
      featured: false,
      order: 14,
      isActive: true,
    },
    { name: 'HEMA', slug: 'hema', industry: 'Salud', featured: false, order: 15, isActive: true },
  ]

  await db.insert(clients).values(clientsData)
  console.log('✅ Clients seeded successfully')
}

const seedUsers = async () => {
  console.log('🔐 Seeding admin user...')

  // Create default admin user (password: admin123 - CHANGE IN PRODUCTION!)
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const userData = [
    {
      name: 'Admin User',
      email: 'admin@duosoluciones.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    },
  ]

  await db.insert(users).values(userData)
  console.log('✅ Admin user seeded successfully')
  console.log('⚠️  Default credentials: admin@duosoluciones.com / admin123')
  console.log('⚠️  IMPORTANT: Change the password immediately in production!')
}

const runSeed = async () => {
  try {
    console.log('🌱 Starting database seed...\n')

    await seedServices()
    await seedTeam()
    await seedClients()
    await seedUsers()

    console.log('\n✅ Database seeded successfully!')
    console.log('📊 Summary:')
    console.log('   - 4 Services (AS1-AS4)')
    console.log('   - 2 Team members')
    console.log('   - 15 Clients')
    console.log('   - 1 Admin user')
  } catch (error) {
    console.error('❌ Seed failed:', error)
    throw error
  } finally {
    process.exit(0)
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  runSeed()
}

export default runSeed
