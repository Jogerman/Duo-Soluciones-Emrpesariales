/**
 * Unsplash Image Utility
 * Generates Unsplash image URLs based on keywords and dimensions
 * Uses Unsplash Source API (no API key required)
 */

export interface UnsplashImageOptions {
  width?: number
  height?: number
  query?: string
  featured?: boolean
}

/**
 * Get an Unsplash image URL
 * @param options - Image options (width, height, query terms)
 * @returns Unsplash image URL
 */
export function getUnsplashImage(options: UnsplashImageOptions = {}): string {
  const { width = 1600, height = 900, query = '', featured = false } = options

  // Use Unsplash API - random photo endpoint
  // Note: This uses random photos from Unsplash based on search query
  const baseUrl = 'https://images.unsplash.com/photo-1'

  // Predefined photo IDs for consistent images (avoids random changes)
  const photoIds: Record<string, string> = {
    'business,meeting,professional': '560264047971-b8505f320fe',
    'office,professionals,teamwork': '542744173-489d4b8d04',
    'business,consulting,strategy': '542061267-cc3e4a9a-02',
    'dashboard,analytics,business': '551288127-53c3a4fa-d',
    'process,workflow,efficiency': '581091870-4ebd8d-a85',
    'governance,corporate,compliance': '450101217-57bfb66d-e',
    'business,executive,professional,portrait': '507003211-56ff0b53-b',
    'business,woman,technology,professional': '573496359-d9f5e57-b3',
    'business,consultant,professional,portrait': '519389026-f06e1d-c4a',
    'business,lawyer,professional,woman': '573497035-fd57a57-e2',
    'business,man,professional,portrait': '556761175-c14b6c-a8e',
    'business,woman,professional,portrait': '573496158-d42ee82-f5',
  }

  const photoId = photoIds[query] || '560264047971-b8505f320fe'

  return `${baseUrl}${photoId}?w=${width}&h=${height}&fit=crop&auto=format&q=80`
}

/**
 * Predefined image queries for specific use cases
 */
export const UnsplashQueries = {
  // Business & Professional
  businessMeeting: 'business,meeting,professional',
  officeProfessionals: 'office,professionals,teamwork',
  businessConsulting: 'business,consulting,strategy',
  corporateTeam: 'corporate,team,collaboration',
  executiveMeeting: 'executive,meeting,boardroom',

  // Technology & Digital
  erpDashboard: 'dashboard,analytics,business',
  technologyOffice: 'technology,office,modern',
  dataVisualization: 'data,visualization,analytics',
  softwareImplementation: 'software,computer,business',
  digitalTransformation: 'digital,technology,transformation',

  // Process & Operations
  processImprovement: 'process,workflow,efficiency',
  leanManufacturing: 'manufacturing,process,quality',
  operationsManagement: 'operations,management,logistics',
  qualityControl: 'quality,inspection,manufacturing',

  // Organizational
  organizationalStructure: 'organization,structure,hierarchy',
  teamCollaboration: 'team,collaboration,meeting',
  leadershipDevelopment: 'leadership,development,training',
  corporateCulture: 'corporate,culture,workplace',

  // Governance & Compliance
  corporateGovernance: 'governance,corporate,compliance',
  complianceAudit: 'compliance,audit,legal',
  riskManagement: 'risk,management,strategy',

  // Growth & Strategy
  businessGrowth: 'business,growth,success',
  strategicPlanning: 'strategy,planning,business',
  innovation: 'innovation,creative,business',

  // People & Team
  professionalHeadshot: 'professional,portrait,business',
  teamMeeting: 'team,meeting,discussion',
  businessPeople: 'business,people,professional',

  // Industry Specific
  healthcare: 'healthcare,medical,hospital',
  manufacturing: 'manufacturing,factory,production',
  banking: 'banking,finance,financial',
  retail: 'retail,store,business',
  government: 'government,building,official',
}

/**
 * Get a service-specific image
 */
export function getServiceImage(
  service:
    | 'desarrollo-organizacional'
    | 'mejora-procesos'
    | 'implementacion-erp'
    | 'gobernanza-corporativa',
  width = 800,
  height = 500
): string {
  const queryMap = {
    'desarrollo-organizacional': UnsplashQueries.organizationalStructure,
    'mejora-procesos': UnsplashQueries.processImprovement,
    'implementacion-erp': UnsplashQueries.erpDashboard,
    'gobernanza-corporativa': UnsplashQueries.corporateGovernance,
  }

  return getUnsplashImage({
    width,
    height,
    query: queryMap[service],
    featured: true,
  })
}

/**
 * Get a blog category image
 */
export function getCategoryImage(category: string, width = 600, height = 400): string {
  const categoryQueries: Record<string, string> = {
    'Desarrollo Organizacional': UnsplashQueries.organizationalStructure,
    'Mejora de Procesos': UnsplashQueries.processImprovement,
    'Sistemas ERP': UnsplashQueries.erpDashboard,
    'Gobernanza Corporativa': UnsplashQueries.corporateGovernance,
    Liderazgo: UnsplashQueries.leadershipDevelopment,
    'Transformación Digital': UnsplashQueries.digitalTransformation,
  }

  const query = categoryQueries[category] || UnsplashQueries.businessConsulting

  return getUnsplashImage({
    width,
    height,
    query,
    featured: true,
  })
}

/**
 * Get a professional headshot for team members
 */
export function getTeamMemberImage(seed: string, width = 400, height = 400): string {
  // Use a specific seed to get consistent images for each team member
  return `https://source.unsplash.com/${width}x${height}/?${UnsplashQueries.professionalHeadshot}&sig=${seed}`
}

/**
 * Get a hero banner image
 */
export function getHeroBanner(page: string, width = 1920, height = 600): string {
  const pageQueries: Record<string, string> = {
    services: UnsplashQueries.businessConsulting,
    about: UnsplashQueries.corporateTeam,
    blog: 'blog,writing,content',
    clients: UnsplashQueries.businessGrowth,
    contact: UnsplashQueries.businessMeeting,
  }

  const query = pageQueries[page] || UnsplashQueries.businessMeeting

  return getUnsplashImage({
    width,
    height,
    query,
    featured: true,
  })
}
