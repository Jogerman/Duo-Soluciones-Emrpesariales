import { PodcastEpisode } from '@/types/content'
import { authors } from './authors'
import { categories } from './categories'
import { tags, getTagsByIds } from './tags'
import { podcastGuests, getPodcastGuestsByIds } from './podcast-guests'

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 'p1',
    title: 'De PYME Familiar a Corporaci�n: El Viaje de Transformaci�n',
    slug: 'pyme-familiar-a-corporacion',
    description:
      'Conversamos con Roberto S�nchez sobre su experiencia transformando una empresa familiar de 20 empleados a una corporaci�n de 200+ colaboradores.',
    content: `
En este episodio conversamos con Roberto S�nchez, CEO de TechCorp Latam, sobre su viaje transformando una PYME familiar en una corporaci�n profesional.

## Temas Principales

- Desaf�os de profesionalizar una empresa familiar
- C�mo implementar gobierno corporativo sin perder la cultura
- Transici�n de fundador-operador a CEO estrat�gico
- Atracci�n de talento profesional en empresas familiares
- Preparaci�n para rondas de inversi�n

## Momentos Destacados

**[05:30]** El momento en que Roberto se dio cuenta que necesitaba ayuda externa

**[12:15]** Implementaci�n de su primer consejo consultivo

**[18:45]** La resistencia inicial de la familia al cambio

**[28:30]** C�mo atraer talento top a una empresa familiar

**[35:20]** Preparaci�n para levantar Serie A

**[42:10]** Lecciones aprendidas y consejos para otros emprendedores

## Recursos Mencionados

- Libro: "The Founder's Dilemmas" de Noam Wasserman
- Framework: EOS (Entrepreneurial Operating System)
- Herramienta: OKRs para alineaci�n estrat�gica

## Conclusiones Clave

1. La profesionalizaci�n no significa perder la cultura, significa fortalecerla
2. Los consejeros externos aportan perspectiva invaluable
3. La familia debe estar alineada antes de traer inversores
4. El founder debe evolucionar de operador a estratega
5. Invertir en talento es la mejor inversi�n que puedes hacer
    `,
    coverImage: '/images/podcast/ep1-pyme-corporacion.jpg',
    audioUrl: 'https://anchor.fm/duo-soluciones/episodes/ep1',
    spotifyUrl: 'https://open.spotify.com/episode/xxx',
    applePodcastsUrl: 'https://podcasts.apple.com/podcast/duo/episode-1',
    duration: 2850, // 47:30 minutes in seconds
    publishedAt: '2025-01-18T10:00:00Z',
    season: 1,
    episode: 8,
    hosts: [authors[0]], // Mar�a Gonz�lez
    guests: [podcastGuests[0]], // Roberto S�nchez
    transcript: `
[00:00] Mar�a Gonz�lez: Bienvenidos a un nuevo episodio del Podcast DUO, donde exploramos estrategias pr�cticas para transformar tu negocio. Soy Mar�a Gonz�lez, y hoy tenemos un invitado muy especial...

[00:15] Mar�a: Roberto, bienvenido al podcast. Cu�ntanos un poco sobre tu trayectoria.

[00:22] Roberto S�nchez: Gracias Mar�a por la invitaci�n. Mi historia comienza hace 15 a�os cuando mi padre me invit� a unirme al negocio familiar...

[contin�a transcript completo aqu�...]
    `,
    showNotes: `
## Show Notes

Conversaci�n con Roberto S�nchez, CEO de TechCorp Latam, sobre transformaci�n de PYME familiar a corporaci�n.

### Timeline

- 00:00 - Introducci�n
- 02:30 - Background de Roberto
- 05:30 - El punto de quiebre
- 12:15 - Primer consejo consultivo
- 18:45 - Resistencia al cambio
- 25:00 - Implementaci�n de gobierno corporativo
- 28:30 - Atracci�n de talento
- 35:20 - Preparaci�n para inversi�n
- 42:10 - Consejos para emprendedores
- 45:00 - Cierre y recursos

### Guest Bio

Roberto S�nchez es CEO de TechCorp Latam, una empresa que pas� de ser una PYME familiar de 20 empleados a una corporaci�n de 200+ colaboradores con presencia en 5 pa�ses. Roberto tiene un MBA de INCAE y es mentor de emprendedores en programas de aceleraci�n.

### Contacto

- LinkedIn: linkedin.com/in/roberto-sanchez
- Email: roberto@techcorplatam.com
    `,
    resources: [
      {
        title: "The Founder's Dilemmas - Noam Wasserman",
        url: 'https://www.amazon.com/Founders-Dilemmas-Anticipating-Foundation-Entrepreneurship/dp/0691158304',
        description: 'Libro esencial sobre dilemas que enfrentan fundadores',
      },
      {
        title: 'EOS - Entrepreneurial Operating System',
        url: 'https://www.eosworldwide.com/',
        description: 'Sistema operativo para empresas en crecimiento',
      },
      {
        title: 'Gu�a de OKRs para PYMES',
        url: '/blog/okrs-para-pymes',
        description: 'Art�culo sobre implementaci�n de OKRs',
      },
    ],
    tags: getTagsByIds(['1', '2', '13', '15']), // Estrategia, Cambio Organizacional, Gesti�n del Cambio, PYMES
    category: categories[0], // Desarrollo Organizacional
    featured: true,
    seo: {
      metaTitle: 'De PYME Familiar a Corporaci�n - Podcast DUO Ep. 8',
      metaDescription:
        'Roberto S�nchez comparte su experiencia transformando una empresa familiar en corporaci�n profesional.',
      keywords: [
        'empresa familiar',
        'profesionalizaci�n',
        'gobierno corporativo',
        'PYME',
        'transformaci�n',
      ],
    },
  },
  {
    id: 'p2',
    title: 'Lean Manufacturing en la Era Digital',
    slug: 'lean-manufacturing-era-digital',
    description:
      'Patricia Morales, Directora de Operaciones de IndustriaXYZ, nos cuenta c�mo implement� Lean en una planta de manufactura integrando tecnolog�as 4.0.',
    content: `
Patricia Morales, con 20 a�os de experiencia en manufactura, comparte su experiencia implementando Lean Manufacturing combinado con tecnolog�as de Industria 4.0.

## Temas Principales

- Fundamentos de Lean Manufacturing
- Integraci�n de Lean con tecnolog�as digitales
- IoT y sensores en planta
- An�lisis de datos en tiempo real
- Gesti�n del cambio con operadores de planta

## Momentos Destacados

**[08:20]** Los 7 desperdicios en manufactura moderna

**[15:40]** Implementaci�n de Andon digital

**[22:15]** Resistencia de supervisores de planta

**[30:25]** ROI de la implementaci�n Lean+Digital

**[38:50]** Casos de �xito concretos

## Recursos Mencionados

- Libro: "The Toyota Way" de Jeffrey Liker
- Software: Tulip - No-code platform para manufactura
- Metodolog�a: Value Stream Mapping digital

## Conclusiones Clave

1. Lean no es solo eliminar desperdicios, es crear cultura de mejora continua
2. La tecnolog�a habilita Lean, no lo reemplaza
3. El cambio debe empezar desde el piso de producci�n
4. Los datos en tiempo real aceleran la toma de decisiones
5. El payback de Lean+Digital es de 12-18 meses t�picamente
    `,
    coverImage: '/images/podcast/ep2-lean-digital.jpg',
    audioUrl: 'https://anchor.fm/duo-soluciones/episodes/ep2',
    spotifyUrl: 'https://open.spotify.com/episode/yyy',
    applePodcastsUrl: 'https://podcasts.apple.com/podcast/duo/episode-2',
    duration: 3120, // 52 minutes
    publishedAt: '2025-01-11T10:00:00Z',
    season: 1,
    episode: 7,
    hosts: [authors[1]], // Carlos Rodr�guez
    guests: [podcastGuests[1]], // Patricia Morales
    category: categories[1], // Mejora de Procesos
    tags: getTagsByIds(['4', '6', '16', '19']), // Lean Manufacturing, Automatizaci�n, Productividad, Mejora Continua
    featured: true,
    seo: {
      metaTitle: 'Lean Manufacturing en la Era Digital - Podcast DUO Ep. 7',
      metaDescription:
        'Aprende c�mo combinar Lean Manufacturing con tecnolog�as digitales para maximizar eficiencia.',
      keywords: ['lean manufacturing', 'industria 4.0', 'manufactura', 'mejora continua', 'IoT'],
    },
  },
  {
    id: 'p3',
    title: 'Estrategia en Tiempos de Incertidumbre',
    slug: 'estrategia-tiempos-incertidumbre',
    description:
      'El Dr. Fernando Garc�a, profesor de estrategia, discute c�mo las empresas pueden desarrollar estrategias resilientes en entornos VUCA.',
    content: `
Conversaci�n con el Dr. Fernando Garc�a sobre planificaci�n estrat�gica en entornos vol�tiles, inciertos, complejos y ambiguos (VUCA).

## Temas Principales

- Qu� significa realmente VUCA
- Limitaciones de la planificaci�n estrat�gica tradicional
- Estrategia emergente vs. deliberada
- Portfolio de opciones estrat�gicas
- Gesti�n de escenarios
- Indicadores tempranos de cambio

## Momentos Destacados

**[06:45]** Por qu� fallan los planes estrat�gicos de 5 a�os

**[14:30]** El framework de estrategia adaptativa

**[23:15]** Caso: Empresa que pivot� exitosamente en pandemia

**[32:40]** C�mo construir opciones estrat�gicas

**[41:20]** El rol del CEO como Chief Strategy Officer

## Recursos Mencionados

- Libro: "Good Strategy Bad Strategy" de Richard Rumelt
- Framework: Ansoff Matrix para opciones de crecimiento
- Metodolog�a: Scenario Planning de Shell

## Conclusiones Clave

1. La estrategia debe ser din�mica, no est�tica
2. Construye opciones, no planes r�gidos
3. Los escenarios te preparan para m�ltiples futuros
4. La ejecuci�n r�pida gana a la planificaci�n perfecta
5. Monitorea se�ales d�biles de cambio constantemente
    `,
    coverImage: '/images/podcast/ep3-estrategia-vuca.jpg',
    audioUrl: 'https://anchor.fm/duo-soluciones/episodes/ep3',
    spotifyUrl: 'https://open.spotify.com/episode/zzz',
    applePodcastsUrl: 'https://podcasts.apple.com/podcast/duo/episode-3',
    duration: 2940, // 49 minutes
    publishedAt: '2025-01-04T10:00:00Z',
    season: 1,
    episode: 6,
    hosts: [authors[0]], // Mar�a Gonz�lez
    guests: [podcastGuests[2]], // Dr. Fernando Garc�a
    category: categories[0], // Desarrollo Organizacional
    tags: getTagsByIds(['1', '14', '20']), // Estrategia, Innovaci�n, Transformaci�n
    featured: true,
    seo: {
      metaTitle: 'Estrategia en Tiempos de Incertidumbre - Podcast DUO Ep. 6',
      metaDescription:
        'Aprende a desarrollar estrategias resilientes en entornos VUCA con el Dr. Fernando Garc�a.',
      keywords: ['estrategia', 'VUCA', 'planificaci�n estrat�gica', 'resiliencia', 'adaptaci�n'],
    },
  },
  {
    id: 'p4',
    title: 'Reestructuraci�n Financiera: Salvar tu Empresa de la Crisis',
    slug: 'reestructuracion-financiera-crisis',
    description:
      'Laura Jim�nez, CFO experta, comparte estrategias para reestructurar financieramente empresas en crisis y recuperar rentabilidad.',
    content: `
Laura Jim�nez, CFO con amplia experiencia en turnarounds, nos gu�a a trav�s del proceso de reestructuraci�n financiera.

## Temas Principales

- Se�ales tempranas de problemas financieros
- Diagn�stico financiero r�pido
- Gesti�n de flujo de caja en crisis
- Negociaci�n con acreedores
- Reestructuraci�n de deuda
- Plan de viabilidad financiera

## Momentos Destacados

**[07:15]** Las 5 se�ales de alerta financiera

**[15:30]** C�mo gestionar el p�nico del equipo directivo

**[24:10]** Negociaci�n exitosa con banco principal

**[33:45]** Recortes inteligentes vs. recortes desesperados

**[42:00]** Historia de recuperaci�n en 18 meses

## Recursos Mencionados

- Herramienta: Cash Flow Forecasting template
- Framework: 13-week cash flow model
- Libro: "Turnaround" de William Bratton

## Conclusiones Clave

1. Actuar temprano es la diferencia entre reestructuraci�n y liquidaci�n
2. El cash flow es m�s importante que la rentabilidad en crisis
3. La comunicaci�n transparente con stakeholders es cr�tica
4. Los recortes deben ser estrat�gicos, no horizontales
5. Toda reestructuraci�n requiere plan de crecimiento post-crisis
    `,
    coverImage: '/images/podcast/ep4-reestructuracion.jpg',
    audioUrl: 'https://anchor.fm/duo-soluciones/episodes/ep4',
    duration: 2760, // 46 minutes
    publishedAt: '2024-12-28T10:00:00Z',
    season: 1,
    episode: 5,
    hosts: [authors[2]], // Ana Mart�nez
    guests: [podcastGuests[3]], // Laura Jim�nez
    category: categories[3], // Gobernanza Corporativa
    tags: getTagsByIds(['1', '10', '15']), // Estrategia, Gesti�n de Riesgos, PYMES
    featured: false,
    seo: {
      metaTitle: 'Reestructuraci�n Financiera en Crisis - Podcast DUO Ep. 5',
      metaDescription:
        'Estrategias probadas para reestructurar financieramente tu empresa y superar crisis.',
      keywords: ['reestructuraci�n', 'crisis financiera', 'turnaround', 'CFO', 'flujo de caja'],
    },
  },
  {
    id: 'p5',
    title: 'Escalando un SaaS: De 0 a $1M ARR',
    slug: 'escalando-saas-0-1m-arr',
    description:
      'Miguel �ngel Torres comparte su experiencia llevando su startup SaaS de cero a un mill�n de d�lares en ingresos recurrentes.',
    content: `
Conversaci�n con Miguel �ngel Torres, fundador de CloudSolutions, sobre c�mo escalar un negocio SaaS B2B desde cero.

## Temas Principales

- Validaci�n del problema y soluci�n
- Primeros 10 clientes: c�mo conseguirlos
- Pricing y modelos de negocio SaaS
- Product-led growth vs. sales-led growth
- M�tricas clave: MRR, CAC, LTV, Churn
- Levantamiento de capital vs. bootstrap

## Momentos Destacados

**[09:30]** El pivote que cambi� todo

**[17:20]** Conseguir los primeros 10 clientes pagando

**[26:45]** Pricing: los 3 experimentos que corrimos

**[35:10]** Cu�ndo contratar tu primer vendedor

**[44:30]** Series A: preparaci�n y pitch

## Recursos Mencionados

- Libro: "Traction" de Gabriel Weinberg
- Framework: Sean Ellis test para product-market fit
- Herramienta: ChartMogul para m�tricas SaaS

## Conclusiones Clave

1. Product-market fit es lo �nico que importa al inicio
2. Tus primeros 10 clientes deben ser hands-on
3. Precio bajo no acelera adopci�n, la retrasa
4. Enf�cate en 1-2 canales de adquisici�n, no 10
5. Unit economics deben funcionar antes de escalar
    `,
    coverImage: '/images/podcast/ep5-saas-scaling.jpg',
    audioUrl: 'https://anchor.fm/duo-soluciones/episodes/ep5',
    duration: 3240, // 54 minutes
    publishedAt: '2024-12-21T10:00:00Z',
    season: 1,
    episode: 4,
    hosts: [authors[3]], // Diego Fern�ndez
    guests: [podcastGuests[4]], // Miguel �ngel Torres
    category: categories[5], // Transformaci�n Digital
    tags: getTagsByIds(['14', '20', '3']), // Innovaci�n, Transformaci�n, KPIs
    featured: false,
    seo: {
      metaTitle: 'Escalando un SaaS de 0 a $1M ARR - Podcast DUO Ep. 4',
      metaDescription:
        'Aprende c�mo escalar un negocio SaaS B2B desde cero con Miguel �ngel Torres.',
      keywords: ['SaaS', 'startup', 'escalamiento', 'product-market fit', 'm�tricas'],
    },
  },
  {
    id: 'p6',
    title: 'Gesti�n del Talento en la Nueva Normalidad',
    slug: 'gestion-talento-nueva-normalidad',
    description:
      'Sandra Ram�rez, Directora de RRHH, explora estrategias modernas de gesti�n de talento en modelos h�bridos y remotos.',
    content: `
Sandra Ram�rez comparte estrategias para atraer, retener y desarrollar talento en el contexto post-pandemia.

## Temas Principales

- Trabajo remoto vs. h�brido: qu� funciona
- Atracci�n de talento millennial y Gen Z
- Programas de desarrollo acelerado
- Cultura organizacional en entornos distribuidos
- Evaluaci�n de desempe�o moderna
- Compensaci�n total: m�s all� del salario

## Momentos Destacados

**[10:15]** Por qu� perdimos 30% del equipo en 6 meses

**[19:30]** Redise�o del modelo de trabajo h�brido

**[28:40]** Employee Value Proposition que funciona

**[37:20]** Programa de desarrollo fast-track

**[46:15]** Retenci�n: qu� realmente funciona

## Recursos Mencionados

- Libro: "Powerful" de Patty McCord (ex-Netflix)
- Framework: Gallup Q12 para engagement
- Herramienta: 15Five para check-ins continuos

## Conclusiones Clave

1. Flexibilidad es el nuevo beneficio #1
2. Los j�venes talentos buscan prop�sito, no solo salario
3. El desarrollo de carrera debe ser personalizado
4. La cultura se construye intencionalmente en remoto
5. Los managers son la clave del engagement
    `,
    coverImage: '/images/podcast/ep6-talento.jpg',
    audioUrl: 'https://anchor.fm/duo-soluciones/episodes/ep6',
    duration: 2880, // 48 minutes
    publishedAt: '2024-12-14T10:00:00Z',
    season: 1,
    episode: 3,
    hosts: [authors[0]], // Mar�a Gonz�lez
    guests: [podcastGuests[5]], // Sandra Ram�rez
    category: categories[4], // Liderazgo
    tags: getTagsByIds(['12', '13', '2']), // Cultura Organizacional, Gesti�n del Cambio, Cambio Organizacional
    featured: false,
    seo: {
      metaTitle: 'Gesti�n del Talento en la Nueva Normalidad - Podcast DUO Ep. 3',
      metaDescription:
        'Estrategias modernas para atraer y retener talento en entornos h�bridos y remotos.',
      keywords: ['gesti�n talento', 'RRHH', 'trabajo remoto', 'h�brido', 'retenci�n'],
    },
  },
  {
    id: 'p7',
    title: 'Implementaci�n de Odoo: Lecciones de 50+ Proyectos',
    slug: 'implementacion-odoo-lecciones',
    description:
      'Diego Fern�ndez comparte las lecciones aprendidas implementando Odoo ERP en m�s de 50 empresas de diversos tama�os e industrias.',
    content: `
Diego comparte sus aprendizajes implementando Odoo ERP en PYMES de manufactura, distribuci�n, servicios y retail.

## Temas Principales

- Por qu� Odoo es ideal para PYMES
- Errores comunes en implementaci�n
- M�dulos core vs. personalizaciones
- Gesti�n del cambio con usuarios
- Migraci�n de datos sin dolor
- Soporte post go-live

## Momentos Destacados

**[08:40]** Los 3 errores m�s comunes (y costosos)

**[16:25]** Odoo vs. SAP vs. soluciones locales

**[25:30]** Caso: implementaci�n en 12 semanas

**[34:15]** Cu�ndo personalizar y cu�ndo adaptarse

**[43:00]** ROI real: casos con n�meros

## Recursos Mencionados

- Demo: Odoo online demo
- Comunidad: Odoo Community Association
- Certificaci�n: Odoo Functional Consultant

## Conclusiones Clave

1. La implementaci�n es 30% tecnolog�a, 70% cambio organizacional
2. Empezar con m�dulos est�ndar, personalizar despu�s
3. La limpieza de datos es cr�tica
4. Los super-users son tu mejor inversi�n
5. El go-live no es el final, es el inicio
    `,
    coverImage: '/images/podcast/ep7-odoo.jpg',
    audioUrl: 'https://anchor.fm/duo-soluciones/episodes/ep7',
    duration: 2700, // 45 minutes
    publishedAt: '2024-12-07T10:00:00Z',
    season: 1,
    episode: 2,
    hosts: [authors[3]], // Diego Fern�ndez
    guests: [],
    category: categories[2], // Sistemas ERP
    tags: getTagsByIds(['7', '9', '13', '15']), // Odoo, Implementaci�n ERP, Gesti�n del Cambio, PYMES
    featured: false,
    seo: {
      metaTitle: 'Implementaci�n de Odoo: Lecciones Aprendidas - Podcast DUO Ep. 2',
      metaDescription:
        'Aprende de 50+ implementaciones de Odoo ERP. Errores comunes, mejores pr�cticas y casos reales.',
      keywords: ['Odoo', 'ERP', 'implementaci�n', 'PYMES', 'software empresarial'],
    },
  },
  {
    id: 'p8',
    title: 'Bienvenidos al Podcast DUO - Episodio de Lanzamiento',
    slug: 'bienvenidos-podcast-duo-lanzamiento',
    description:
      'En nuestro episodio inaugural, el equipo de DUO presenta el podcast, comparte su visi�n y adelanta los temas que exploraremos en la primera temporada.',
    content: `
Episodio inaugural del Podcast DUO donde presentamos el show, el equipo y nuestra misi�n.

## Temas Principales

- Qui�nes somos y por qu� este podcast
- Nuestra visi�n sobre consultor�a empresarial
- Filosof�a DUO: pr�ctica sobre teor�a
- Temas que cubriremos en temporada 1
- C�mo puedes participar

## Momentos Destacados

**[03:30]** La historia de DUO Soluciones

**[08:45]** Por qu� la consultor�a tradicional est� rota

**[14:20]** Nuestro enfoque: hands-on y pr�ctico

**[21:30]** Preview de episodios temporada 1

**[27:15]** Invitaci�n a la audiencia

## Lo que Viene

En los pr�ximos episodios exploraremos:
- Implementaciones ERP exitosas
- Gesti�n del talento moderna
- Escalamiento de startups
- Reestructuraciones financieras
- Lean Manufacturing digital
- Estrategia en tiempos de incertidumbre
- Y mucho m�s...

## Conclusiones Clave

1. Este es un podcast pr�ctico, no acad�mico
2. Traeremos invitados con experiencia real
3. Compartiremos casos, n�meros y lecciones
4. Tu feedback guiar� el contenido
5. Publicamos cada viernes
    `,
    coverImage: '/images/podcast/ep8-lanzamiento.jpg',
    audioUrl: 'https://anchor.fm/duo-soluciones/episodes/ep8',
    duration: 1800, // 30 minutes
    publishedAt: '2024-11-30T10:00:00Z',
    season: 1,
    episode: 1,
    hosts: [authors[0], authors[1], authors[2], authors[3]], // Todo el equipo
    guests: [],
    category: categories[0], // Desarrollo Organizacional
    tags: getTagsByIds(['1', '14']), // Estrategia, Innovaci�n
    featured: false,
    seo: {
      metaTitle: 'Bienvenidos al Podcast DUO - Episodio de Lanzamiento',
      metaDescription:
        'Conoce el Podcast DUO, tu fuente de estrategias pr�cticas para transformar tu negocio.',
      keywords: ['podcast empresarial', 'consultor�a', 'negocios', 'PYMES', 'DUO'],
    },
  },
]

// Helper functions
export const getAllPodcastEpisodes = (): PodcastEpisode[] => {
  return podcastEpisodes.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export const getFeaturedPodcastEpisodes = (): PodcastEpisode[] => {
  return podcastEpisodes
    .filter(ep => ep.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export const getPodcastEpisodeBySlug = (slug: string): PodcastEpisode | undefined => {
  return podcastEpisodes.find(ep => ep.slug === slug)
}

export const getPodcastEpisodesByCategory = (categorySlug: string): PodcastEpisode[] => {
  return podcastEpisodes
    .filter(ep => ep.category.slug === categorySlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export const getPodcastEpisodesBySeason = (season: number): PodcastEpisode[] => {
  return podcastEpisodes
    .filter(ep => ep.season === season)
    .sort((a, b) => (b.episode || 0) - (a.episode || 0))
}

export const getPodcastEpisodesByTag = (tagSlug: string): PodcastEpisode[] => {
  return podcastEpisodes
    .filter(ep => ep.tags.some(tag => tag.slug === tagSlug))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export const getRelatedPodcastEpisodes = (
  episode: PodcastEpisode,
  limit: number = 3
): PodcastEpisode[] => {
  const related = podcastEpisodes
    .filter(ep => ep.id !== episode.id)
    .filter(
      ep =>
        ep.category.id === episode.category.id ||
        ep.tags.some(tag => episode.tags.some(t => t.id === tag.id))
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return related.slice(0, limit)
}

export const getLatestPodcastEpisode = (): PodcastEpisode | undefined => {
  const sorted = getAllPodcastEpisodes()
  return sorted[0]
}

// Format duration helper
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}
