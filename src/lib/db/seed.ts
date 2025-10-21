import { db } from './index'
import {
  services,
  team,
  clients,
  users,
  categories,
  tags,
  blog,
  podcast,
  testimonials,
  projects,
  newsletterSubscribers,
} from './schema'
import * as bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

/**
 * Enhanced Seed Data Script
 * Populates the database with comprehensive initial data for DUO Soluciones Empresariales
 * Including: services, team, clients, users, categories, tags, blog posts, podcasts, testimonials, projects
 */

// ============================================================================
// CATEGORIES
// ============================================================================
const seedCategories = async () => {
  console.log('📁 Seeding categories...')

  const categoriesData = [
    {
      name: 'Desarrollo Organizacional',
      slug: 'desarrollo-organizacional',
      description:
        'Estrategias y metodologías para el diseño y evolución de estructuras organizacionales efectivas',
      color: '#1b5e5e',
    },
    {
      name: 'Mejora de Procesos',
      slug: 'mejora-procesos',
      description:
        'Optimización de procesos empresariales, Lean, Six Sigma y metodologías de mejora continua',
      color: '#2563eb',
    },
    {
      name: 'Sistemas ERP',
      slug: 'sistemas-erp',
      description:
        'Implementación, configuración y optimización de sistemas de planificación de recursos empresariales',
      color: '#7c3aed',
    },
    {
      name: 'Gobernanza Corporativa',
      slug: 'gobernanza-corporativa',
      description:
        'Estructuras de gobierno, gestión de riesgos, cumplimiento normativo y transparencia empresarial',
      color: '#dc2626',
    },
    {
      name: 'Liderazgo',
      slug: 'liderazgo',
      description:
        'Desarrollo de habilidades directivas, gestión de equipos y cultura organizacional',
      color: '#ea580c',
    },
    {
      name: 'Transformación Digital',
      slug: 'transformacion-digital',
      description:
        'Digitalización de procesos, automatización y adopción de tecnologías emergentes',
      color: '#059669',
    },
  ]

  const insertedCategories = await db.insert(categories).values(categoriesData).returning()
  console.log(`✅ ${insertedCategories.length} categories seeded successfully`)
  return insertedCategories
}

// ============================================================================
// TAGS
// ============================================================================
const seedTags = async () => {
  console.log('🏷️  Seeding tags...')

  const tagsData = [
    { name: 'Estrategia', slug: 'estrategia' },
    { name: 'Cambio Organizacional', slug: 'cambio-organizacional' },
    { name: 'KPIs', slug: 'kpis' },
    { name: 'Lean Manufacturing', slug: 'lean-manufacturing' },
    { name: 'Six Sigma', slug: 'six-sigma' },
    { name: 'Automatización', slug: 'automatizacion' },
    { name: 'Odoo', slug: 'odoo' },
    { name: 'SAP', slug: 'sap' },
    { name: 'Implementación ERP', slug: 'implementacion-erp' },
    { name: 'Gestión de Riesgos', slug: 'gestion-riesgos' },
    { name: 'Cumplimiento', slug: 'cumplimiento' },
    { name: 'Cultura Organizacional', slug: 'cultura-organizacional' },
    { name: 'Gestión del Cambio', slug: 'gestion-cambio' },
    { name: 'Innovación', slug: 'innovacion' },
    { name: 'PYMES', slug: 'pymes' },
    { name: 'Productividad', slug: 'productividad' },
    { name: 'Indicadores', slug: 'indicadores' },
    { name: 'Análisis de Datos', slug: 'analisis-datos' },
    { name: 'Mejora Continua', slug: 'mejora-continua' },
    { name: 'Transformación', slug: 'transformacion' },
  ]

  const insertedTags = await db.insert(tags).values(tagsData).returning()
  console.log(`✅ ${insertedTags.length} tags seeded successfully`)
  return insertedTags
}

// ============================================================================
// SERVICES
// ============================================================================
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

  const insertedServices = await db.insert(services).values(servicesData).returning()
  console.log(`✅ ${insertedServices.length} services seeded successfully`)
  return insertedServices
}

// ============================================================================
// TEAM
// ============================================================================
const seedTeam = async () => {
  console.log('👥 Seeding team members...')

  const teamData = [
    {
      name: 'Miguel Rodriguez Viñas',
      role: 'Director General',
      bio: 'Experto en Gerencia de Operaciones con más de 28 años de experiencia en diversos sectores industriales. Post-grado en Alta Gestión Empresarial de George Washington University.',
      email: 'miguel.rodriguez@duosoluciones.com',
      linkedin: 'https://www.linkedin.com/in/miguel-rodriguez',
      image: '/images/team/miguel-rodriguez.jpg',
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
      image: '/images/team/angelina-burgos.jpg',
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

  const insertedTeam = await db.insert(team).values(teamData).returning()
  console.log(`✅ ${insertedTeam.length} team members seeded successfully`)
  return insertedTeam
}

// ============================================================================
// CLIENTS
// ============================================================================
const seedClients = async () => {
  console.log('🏢 Seeding clients...')

  const clientsData = [
    {
      name: 'Torres 2',
      slug: 'torres-2',
      industry: 'Construcción',
      description: 'Empresa líder en construcción y desarrollo inmobiliario',
      featured: true,
      order: 1,
      isActive: true,
    },
    {
      name: 'Rizek Peralta',
      slug: 'rizek-peralta',
      industry: 'Legal',
      description: 'Firma de abogados especializada en derecho corporativo',
      featured: true,
      order: 2,
      isActive: true,
    },
    {
      name: 'Mallen',
      slug: 'mallen',
      industry: 'Retail',
      description: 'Cadena de tiendas retail especializada',
      featured: true,
      order: 3,
      isActive: true,
    },
    {
      name: 'Hospital Antonio Ochoa',
      slug: 'hospital-antonio-ochoa',
      industry: 'Salud',
      description: 'Centro médico de referencia regional',
      featured: true,
      order: 4,
      isActive: true,
    },
    {
      name: 'Colegio San Judas Tadeo',
      slug: 'colegio-san-judas-tadeo',
      industry: 'Educación',
      description: 'Institución educativa de excelencia',
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

  const insertedClients = await db.insert(clients).values(clientsData).returning()
  console.log(`✅ ${insertedClients.length} clients seeded successfully`)
  return insertedClients
}

// ============================================================================
// USERS
// ============================================================================
const seedUsers = async () => {
  console.log('🔐 Seeding admin users...')

  const hashedPassword = await bcrypt.hash('admin123', 10)

  const userData = [
    {
      name: 'Admin DUO',
      email: 'admin@duosoluciones.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    },
    {
      name: 'Editor DUO',
      email: 'editor@duosoluciones.com',
      password: hashedPassword,
      role: 'editor',
      isActive: true,
    },
  ]

  const insertedUsers = await db.insert(users).values(userData).returning()
  console.log(`✅ ${insertedUsers.length} admin users seeded successfully`)
  console.log('⚠️  Default credentials:')
  console.log('   - admin@duosoluciones.com / admin123')
  console.log('   - editor@duosoluciones.com / admin123')
  console.log('⚠️  IMPORTANT: Change these passwords immediately in production!')
  return insertedUsers
}

// ============================================================================
// BLOG POSTS
// ============================================================================
const seedBlogPosts = async (insertedCategories: Awaited<ReturnType<typeof seedCategories>>) => {
  console.log('📝 Seeding blog posts...')

  // Helper to get category by slug
  const getCategoryBySlug = (slug: string) => {
    return insertedCategories.find(c => c.slug === slug)
  }

  const blogData = [
    {
      title: 'Cómo Implementar un Sistema ERP en tu PYME sin Morir en el Intento',
      slug: 'como-implementar-erp-pyme',
      excerpt:
        'Descubre las mejores prácticas y errores comunes a evitar al implementar un sistema ERP en pequeñas y medianas empresas.',
      content: `# Cómo Implementar un Sistema ERP en tu PYME sin Morir en el Intento

La implementación de un sistema ERP (Enterprise Resource Planning) es uno de los proyectos más críticos que puede enfrentar una PYME. Según estudios recientes, el 70% de las implementaciones ERP fallan o no cumplen con las expectativas iniciales.

[Contenido completo del artículo...]`,
      featuredImage: '/images/blog/erp-implementation.jpg',
      authorName: 'Diego Fernández',
      categories: ['Sistemas ERP', 'Transformación Digital'],
      tags: ['Odoo', 'Implementación ERP', 'PYMES', 'Gestión del Cambio'],
      status: 'published',
      publishedAt: new Date('2025-01-15T10:00:00Z'),
      readingTime: 12,
      featured: true,
      metaTitle: 'Cómo Implementar un ERP en tu PYME - Guía Completa 2025',
      metaDescription:
        'Guía paso a paso para implementar un sistema ERP en tu PYME. Evita errores comunes y asegura el éxito de tu proyecto.',
      metaKeywords: ['implementación ERP', 'ERP PYMES', 'Odoo', 'SAP', 'transformación digital'],
    },
    {
      title: 'Lean Six Sigma para Servicios: Más Allá de la Manufactura',
      slug: 'lean-six-sigma-servicios',
      excerpt:
        'Aprende cómo aplicar metodologías Lean Six Sigma en empresas de servicios para mejorar eficiencia y satisfacción del cliente.',
      content: `# Lean Six Sigma para Servicios: Más Allá de la Manufactura

Cuando pensamos en Lean Six Sigma, inmediatamente viene a la mente la manufactura...

[Contenido completo del artículo...]`,
      featuredImage: '/images/blog/lean-six-sigma.jpg',
      authorName: 'Carlos Rodríguez',
      categories: ['Mejora de Procesos'],
      tags: ['Lean Manufacturing', 'Six Sigma', 'Productividad', 'Mejora Continua'],
      status: 'published',
      publishedAt: new Date('2025-01-10T09:00:00Z'),
      readingTime: 10,
      featured: true,
      metaTitle: 'Lean Six Sigma para Empresas de Servicios - Guía Práctica',
      metaDescription:
        'Aprende cómo aplicar Lean Six Sigma en empresas de servicios. Casos reales, herramientas y resultados comprobados.',
      metaKeywords: ['Lean Six Sigma', 'servicios', 'mejora de procesos', 'eficiencia', 'DMAIC'],
    },
    {
      title: 'Diseño Organizacional: La Base del Alto Desempeño',
      slug: 'diseno-organizacional-alto-desempeno',
      excerpt:
        'Una estructura organizacional bien diseñada es la diferencia entre el éxito y el estancamiento.',
      content: `# Diseño Organizacional: La Base del Alto Desempeño

El diseño organizacional no es un organigrama bonito...

[Contenido completo del artículo...]`,
      featuredImage: '/images/blog/organizational-design.jpg',
      authorName: 'María González',
      categories: ['Desarrollo Organizacional'],
      tags: ['Estrategia', 'Cambio Organizacional', 'Cultura Organizacional', 'Transformación'],
      status: 'published',
      publishedAt: new Date('2025-01-05T08:00:00Z'),
      readingTime: 14,
      featured: true,
      metaTitle: 'Diseño Organizacional para Alto Desempeño - Guía Completa',
      metaDescription:
        'Aprende a diseñar estructuras organizacionales que habiliten tu estrategia. Modelos, metodología y casos reales.',
      metaKeywords: [
        'diseño organizacional',
        'estructura organizacional',
        'alto desempeño',
        'estrategia',
      ],
    },
    {
      title: 'Gobierno Corporativo en PYMES: No Es Solo para Grandes Empresas',
      slug: 'gobierno-corporativo-pymes',
      excerpt:
        'El gobierno corporativo robusto no es exclusivo de corporaciones. Descubre cómo implementar buenas prácticas de gobernanza en tu PYME.',
      content: `# Gobierno Corporativo en PYMES: No Es Solo para Grandes Empresas

El término "gobierno corporativo" suena intimidante...

[Contenido completo del artículo...]`,
      featuredImage: '/images/blog/corporate-governance.jpg',
      authorName: 'Ana Martínez',
      categories: ['Gobernanza Corporativa'],
      tags: ['Estrategia', 'Gestión de Riesgos', 'Cumplimiento', 'PYMES'],
      status: 'published',
      publishedAt: new Date('2024-12-28T10:00:00Z'),
      readingTime: 13,
      featured: false,
      metaTitle: 'Gobierno Corporativo para PYMES - Guía Práctica 2025',
      metaDescription:
        'Implementa buenas prácticas de gobierno corporativo en tu PYME. Estructuras, políticas y casos reales de éxito.',
      metaKeywords: [
        'gobierno corporativo',
        'PYMES',
        'junta directiva',
        'gobernanza',
        'accionistas',
      ],
    },
    {
      title: '10 KPIs que Toda PYME Debe Monitorear',
      slug: 'kpis-esenciales-pymes',
      excerpt:
        'No puedes mejorar lo que no mides. Descubre los indicadores clave que todo dueño de PYME debe monitorear religiosamente.',
      content: `# 10 KPIs que Toda PYME Debe Monitorear

"Lo que no se mide, no se puede mejorar" - Peter Drucker

[Contenido completo del artículo...]`,
      featuredImage: '/images/blog/kpis-dashboard.jpg',
      authorName: 'Carlos Rodríguez',
      categories: ['Mejora de Procesos'],
      tags: ['KPIs', 'Indicadores', 'Análisis de Datos', 'Productividad'],
      status: 'published',
      publishedAt: new Date('2024-12-20T09:00:00Z'),
      readingTime: 15,
      featured: false,
      metaTitle: '10 KPIs Esenciales para PYMES - Guía Completa 2025',
      metaDescription:
        'Descubre los indicadores clave que toda PYME debe monitorear. Fórmulas, metas y cómo implementar un dashboard ejecutivo.',
      metaKeywords: [
        'KPIs',
        'indicadores',
        'métricas',
        'PYMES',
        'dashboard',
        'business intelligence',
      ],
    },
    {
      title: 'Cultura Organizacional: El ADN Invisible de tu Empresa',
      slug: 'cultura-organizacional-adn-empresa',
      excerpt:
        'La cultura se come la estrategia en el desayuno. Aprende cómo diagnosticar, diseñar e implementar una cultura de alto desempeño.',
      content: `# Cultura Organizacional: El ADN Invisible de tu Empresa

"Culture eats strategy for breakfast" - Peter Drucker

[Contenido completo del artículo...]`,
      featuredImage: '/images/blog/organizational-culture.jpg',
      authorName: 'María González',
      categories: ['Liderazgo'],
      tags: ['Cultura Organizacional', 'Cambio Organizacional', 'Innovación', 'Gestión del Cambio'],
      status: 'published',
      publishedAt: new Date('2024-12-15T10:00:00Z'),
      readingTime: 16,
      featured: false,
      metaTitle: 'Cultura Organizacional de Alto Desempeño - Guía Completa',
      metaDescription:
        'Aprende a diagnosticar, diseñar e implementar una cultura organizacional de alto desempeño. Modelos, casos y herramientas prácticas.',
      metaKeywords: [
        'cultura organizacional',
        'cambio cultural',
        'employee engagement',
        'valores',
        'liderazgo',
      ],
    },
  ]

  const insertedBlog = await db.insert(blog).values(blogData).returning()
  console.log(`✅ ${insertedBlog.length} blog posts seeded successfully`)
  return insertedBlog
}

// ============================================================================
// PODCAST EPISODES
// ============================================================================
const seedPodcasts = async (insertedCategories: Awaited<ReturnType<typeof seedCategories>>) => {
  console.log('🎙️  Seeding podcast episodes...')

  const podcastData = [
    {
      title: 'De PYME Familiar a Corporación: El Viaje de Transformación',
      slug: 'pyme-familiar-a-corporacion',
      description:
        'Conversamos con Roberto Sánchez sobre su experiencia transformando una empresa familiar de 20 empleados a una corporación de 200+ colaboradores.',
      coverImage: '/images/podcast/ep1-pyme-corporacion.jpg',
      audioUrl: 'https://anchor.fm/duo-soluciones/episodes/ep1',
      spotifyUrl: 'https://open.spotify.com/episode/xxx',
      duration: 2850,
      publishedAt: new Date('2025-01-18T10:00:00Z'),
      season: 1,
      episodeNumber: 8,
      hosts: [{ id: '1', name: 'María González' }],
      guests: [{ name: 'Roberto Sánchez', role: 'CEO', company: 'TechCorp Latam' }],
      topics: ['Desarrollo Organizacional', 'Empresa Familiar', 'Gobierno Corporativo'],
      tags: ['Estrategia', 'Cambio Organizacional', 'Gestión del Cambio', 'PYMES'],
      status: 'published',
      featured: true,
      metaTitle: 'De PYME Familiar a Corporación - Podcast DUO Ep. 8',
      metaDescription:
        'Roberto Sánchez comparte su experiencia transformando una empresa familiar en corporación profesional.',
    },
    {
      title: 'Lean Manufacturing en la Era Digital',
      slug: 'lean-manufacturing-era-digital',
      description:
        'Patricia Morales, Directora de Operaciones de IndustriaXYZ, nos cuenta cómo implementó Lean en una planta de manufactura integrando tecnologías 4.0.',
      coverImage: '/images/podcast/ep2-lean-digital.jpg',
      audioUrl: 'https://anchor.fm/duo-soluciones/episodes/ep2',
      spotifyUrl: 'https://open.spotify.com/episode/yyy',
      duration: 3120,
      publishedAt: new Date('2025-01-11T10:00:00Z'),
      season: 1,
      episodeNumber: 7,
      hosts: [{ id: '2', name: 'Carlos Rodríguez' }],
      guests: [
        { name: 'Patricia Morales', role: 'Directora de Operaciones', company: 'IndustriaXYZ' },
      ],
      topics: ['Lean Manufacturing', 'Industria 4.0', 'Mejora de Procesos'],
      tags: ['Lean Manufacturing', 'Automatización', 'Productividad', 'Mejora Continua'],
      status: 'published',
      featured: true,
      metaTitle: 'Lean Manufacturing en la Era Digital - Podcast DUO Ep. 7',
      metaDescription:
        'Aprende cómo combinar Lean Manufacturing con tecnologías digitales para maximizar eficiencia.',
    },
    {
      title: 'Estrategia en Tiempos de Incertidumbre',
      slug: 'estrategia-tiempos-incertidumbre',
      description:
        'El Dr. Fernando García, profesor de estrategia, discute cómo las empresas pueden desarrollar estrategias resilientes en entornos VUCA.',
      coverImage: '/images/podcast/ep3-estrategia-vuca.jpg',
      audioUrl: 'https://anchor.fm/duo-soluciones/episodes/ep3',
      duration: 2940,
      publishedAt: new Date('2025-01-04T10:00:00Z'),
      season: 1,
      episodeNumber: 6,
      hosts: [{ id: '1', name: 'María González' }],
      guests: [{ name: 'Dr. Fernando García', role: 'Profesor de Estrategia' }],
      topics: ['Estrategia', 'VUCA', 'Planificación'],
      tags: ['Estrategia', 'Innovación', 'Transformación'],
      status: 'published',
      featured: true,
      metaTitle: 'Estrategia en Tiempos de Incertidumbre - Podcast DUO Ep. 6',
      metaDescription:
        'Aprende a desarrollar estrategias resilientes en entornos VUCA con el Dr. Fernando García.',
    },
    {
      title: 'Reestructuración Financiera: Salvar tu Empresa de la Crisis',
      slug: 'reestructuracion-financiera-crisis',
      description:
        'Laura Jiménez, CFO experta, comparte estrategias para reestructurar financieramente empresas en crisis y recuperar rentabilidad.',
      coverImage: '/images/podcast/ep4-reestructuracion.jpg',
      audioUrl: 'https://anchor.fm/duo-soluciones/episodes/ep4',
      duration: 2760,
      publishedAt: new Date('2024-12-28T10:00:00Z'),
      season: 1,
      episodeNumber: 5,
      hosts: [{ id: '3', name: 'Ana Martínez' }],
      guests: [{ name: 'Laura Jiménez', role: 'CFO Experta' }],
      topics: ['Finanzas', 'Crisis', 'Reestructuración'],
      tags: ['Estrategia', 'Gestión de Riesgos', 'PYMES'],
      status: 'published',
      featured: false,
      metaTitle: 'Reestructuración Financiera en Crisis - Podcast DUO Ep. 5',
      metaDescription:
        'Estrategias probadas para reestructurar financieramente tu empresa y superar crisis.',
    },
  ]

  const insertedPodcasts = await db.insert(podcast).values(podcastData).returning()
  console.log(`✅ ${insertedPodcasts.length} podcast episodes seeded successfully`)
  return insertedPodcasts
}

// ============================================================================
// TESTIMONIALS
// ============================================================================
const seedTestimonials = async (insertedServices: Awaited<ReturnType<typeof seedServices>>) => {
  console.log('💬 Seeding testimonials...')

  const testimonialsData = [
    {
      clientName: 'Roberto Torres',
      company: 'Torres 2',
      role: 'CEO',
      content:
        'DUO Soluciones transformó completamente nuestra operación. Su enfoque práctico y metodología nos ayudó a reducir costos en un 30% y mejorar la eficiencia significativamente.',
      rating: 5,
      featured: true,
      isActive: true,
    },
    {
      clientName: 'María Peralta',
      company: 'Rizek Peralta',
      role: 'Socia Directora',
      content:
        'La implementación del modelo de gobernanza corporativa fue excelente. El equipo de DUO mostró profesionalismo y profundo conocimiento del sector legal.',
      rating: 5,
      featured: true,
      isActive: true,
    },
    {
      clientName: 'Juan Mallen',
      company: 'Mallen',
      role: 'Gerente General',
      content:
        'Gracias a DUO optimizamos nuestra cadena de suministro y mejoramos los tiempos de entrega en un 40%. Su experiencia en retail fue invaluable.',
      rating: 5,
      featured: true,
      isActive: true,
    },
    {
      clientName: 'Dr. Antonio Ochoa',
      company: 'Hospital Antonio Ochoa',
      role: 'Director Médico',
      content:
        'La reestructuración organizacional que realizó DUO nos permitió mejorar la atención al paciente y optimizar nuestros recursos hospitalarios.',
      rating: 5,
      featured: false,
      isActive: true,
    },
    {
      clientName: 'Prof. Tadeo Guzmán',
      company: 'Colegio San Judas Tadeo',
      role: 'Director General',
      content:
        'DUO nos ayudó a implementar procesos académicos y administrativos más eficientes. La satisfacción de padres y estudiantes aumentó notablemente.',
      rating: 5,
      featured: false,
      isActive: true,
    },
  ]

  const insertedTestimonials = await db.insert(testimonials).values(testimonialsData).returning()
  console.log(`✅ ${insertedTestimonials.length} testimonials seeded successfully`)
  return insertedTestimonials
}

// ============================================================================
// PROJECTS (CASE STUDIES)
// ============================================================================
const seedProjects = async () => {
  console.log('💼 Seeding case study projects...')

  const projectsData = [
    {
      title: 'Optimización de Cadena de Suministro - Retail',
      slug: 'optimizacion-cadena-suministro-retail',
      client: 'Mallen',
      industry: 'Retail',
      shortDescription:
        'Reducción de tiempos de entrega y costos logísticos mediante rediseño de procesos y redistribución física.',
      challenge:
        'Altos costos logísticos, tiempos de entrega inconsistentes, y falta de visibilidad en inventarios ocasionaban pérdidas de ventas y baja satisfacción del cliente.',
      solution:
        'Implementamos un Value Stream Mapping completo, rediseñamos rutas de distribución, optimizamos el layout de almacén y establecimos KPIs de desempeño logístico en tiempo real.',
      results:
        'Reducción de 40% en tiempos de entrega, disminución de 25% en costos logísticos, mejora de 35% en rotación de inventario, y aumento de 20% en satisfacción del cliente.',
      duration: '4 meses',
      year: 2024,
      metrics: [
        { label: 'Reducción Tiempos Entrega', value: '40%', icon: 'TrendingDown' },
        { label: 'Ahorro Costos Logísticos', value: '25%', icon: 'DollarSign' },
        { label: 'Mejora Rotación Inventario', value: '35%', icon: 'Package' },
      ],
      technologies: ['Power BI', 'Excel Avanzado', 'Odoo Inventory'],
      featuredImage: '/images/projects/retail-supply-chain.jpg',
      featured: true,
      isActive: true,
      metaTitle: 'Caso de Éxito: Optimización Cadena de Suministro Retail',
      metaDescription:
        'Cómo redujimos 40% los tiempos de entrega y 25% los costos logísticos en una cadena retail.',
    },
    {
      title: 'Implementación ERP Hospital Regional',
      slug: 'implementacion-erp-hospital-regional',
      client: 'Hospital Antonio Ochoa',
      industry: 'Salud',
      shortDescription:
        'Implementación exitosa de sistema ERP para gestión hospitalaria integral incluyendo facturación, inventarios y expediente electrónico.',
      challenge:
        'Procesos manuales de facturación, control de inventarios deficiente, falta de trazabilidad de pacientes, y reportes financieros tardíos.',
      solution:
        'Implementamos Odoo Healthcare con módulos de facturación, inventario farmacéutico, citas médicas, y expediente electrónico. Capacitamos a 85 usuarios en 3 oleadas.',
      results:
        'Automatización del 90% de procesos administrativos, reducción de 70% en tiempo de facturación, eliminación de errores en inventarios, y reportes financieros en tiempo real.',
      duration: '6 meses',
      year: 2023,
      metrics: [
        { label: 'Automatización Procesos', value: '90%', icon: 'Zap' },
        { label: 'Reducción Tiempo Facturación', value: '70%', icon: 'Clock' },
        { label: 'Precisión Inventarios', value: '99%', icon: 'Check' },
      ],
      technologies: ['Odoo', 'PostgreSQL', 'Power BI'],
      featuredImage: '/images/projects/hospital-erp.jpg',
      featured: true,
      isActive: true,
      metaTitle: 'Caso de Éxito: Implementación ERP Hospital',
      metaDescription:
        'Automatización de 90% de procesos y reducción de 70% en tiempos de facturación hospitalaria.',
    },
    {
      title: 'Modelo de Gobierno Corporativo - Empresa Familiar',
      slug: 'modelo-gobierno-corporativo-empresa-familiar',
      client: 'Torres 2',
      industry: 'Construcción',
      shortDescription:
        'Diseño e implementación de modelo de gobierno corporativo para profesionalizar empresa familiar de tercera generación.',
      challenge:
        'Conflictos entre socios familiares, falta de claridad en roles, decisiones lentas, ausencia de planificación sucesoria, y dificultad para atraer talento externo.',
      solution:
        'Facilitamos acuerdo de accionistas, creamos consejo consultivo con 2 consejeros externos, definimos protocolo familiar, establecimos comités ejecutivos, y diseñamos plan de sucesión a 5 años.',
      results:
        'Resolución de conflictos societarios, reducción de 80% en tiempo de decisiones críticas, implementación exitosa de gobierno corporativo, y atracción de 3 ejecutivos externos senior.',
      duration: '8 meses',
      year: 2023,
      metrics: [
        { label: 'Reducción Tiempo Decisiones', value: '80%', icon: 'Timer' },
        { label: 'Consejeros Externos', value: '2', icon: 'Users' },
        { label: 'Plan Sucesión', value: '5 años', icon: 'Calendar' },
      ],
      technologies: [],
      featuredImage: '/images/projects/corporate-governance.jpg',
      featured: true,
      isActive: true,
      metaTitle: 'Caso de Éxito: Gobierno Corporativo Empresa Familiar',
      metaDescription:
        'Profesionalización de empresa familiar mediante modelo de gobierno corporativo robusto.',
    },
  ]

  const insertedProjects = await db.insert(projects).values(projectsData).returning()
  console.log(`✅ ${insertedProjects.length} case study projects seeded successfully`)
  return insertedProjects
}

// ============================================================================
// NEWSLETTER SUBSCRIBERS (Sample data)
// ============================================================================
const seedNewsletterSubscribers = async () => {
  console.log('📧 Seeding newsletter subscribers...')

  const subscribersData = [
    {
      email: 'juan.perez@empresa.com',
      name: 'Juan Pérez',
      source: 'blog',
      isActive: true,
      confirmedAt: new Date(),
    },
    {
      email: 'maria.garcia@negocio.com',
      name: 'María García',
      source: 'homepage',
      isActive: true,
      confirmedAt: new Date(),
    },
    {
      email: 'pedro.rodriguez@company.com',
      name: 'Pedro Rodríguez',
      source: 'footer',
      isActive: true,
      confirmedAt: new Date(),
    },
  ]

  const insertedSubscribers = await db
    .insert(newsletterSubscribers)
    .values(subscribersData)
    .returning()
  console.log(`✅ ${insertedSubscribers.length} newsletter subscribers seeded successfully`)
  return insertedSubscribers
}

// ============================================================================
// MAIN SEED FUNCTION
// ============================================================================
const runSeed = async () => {
  try {
    console.log('🌱 Starting comprehensive database seed...\n')

    // Seed in order (respecting dependencies)
    const insertedCategories = await seedCategories()
    const insertedTags = await seedTags()
    const insertedServices = await seedServices()
    const insertedTeam = await seedTeam()
    const insertedClients = await seedClients()
    const insertedUsers = await seedUsers()
    const insertedBlog = await seedBlogPosts(insertedCategories)
    const insertedPodcasts = await seedPodcasts(insertedCategories)
    const insertedTestimonials = await seedTestimonials(insertedServices)
    const insertedProjects = await seedProjects()
    const insertedSubscribers = await seedNewsletterSubscribers()

    console.log('\n✅ Database seeded successfully!')
    console.log('📊 Summary:')
    console.log(`   - ${insertedCategories.length} Categories`)
    console.log(`   - ${insertedTags.length} Tags`)
    console.log(`   - ${insertedServices.length} Services`)
    console.log(`   - ${insertedTeam.length} Team members`)
    console.log(`   - ${insertedClients.length} Clients`)
    console.log(`   - ${insertedUsers.length} Admin users`)
    console.log(`   - ${insertedBlog.length} Blog posts`)
    console.log(`   - ${insertedPodcasts.length} Podcast episodes`)
    console.log(`   - ${insertedTestimonials.length} Testimonials`)
    console.log(`   - ${insertedProjects.length} Case study projects`)
    console.log(`   - ${insertedSubscribers.length} Newsletter subscribers`)
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
