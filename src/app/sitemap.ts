import { MetadataRoute } from 'next'
import { getAllBlogPosts } from '@/lib/mock-data/blog-posts'
import { getAllPodcastEpisodes } from '@/lib/mock-data/podcast-episodes'

/**
 * Dynamic Sitemap Generation for DUO Soluciones Empresariales
 *
 * This file generates an XML sitemap for search engines.
 * Next.js 15 will automatically serve this at /sitemap.xml
 *
 * Priority guidelines:
 * - 1.0: Homepage (most important)
 * - 0.9: Key service pages
 * - 0.8: Individual service pages, About
 * - 0.7: Contact, secondary pages
 * - 0.6: Blog posts
 * - 0.5: Podcast episodes
 *
 * Change frequency guidelines:
 * - daily: Homepage, blog listing
 * - weekly: Services listing, podcast
 * - monthly: Service pages, about, team
 * - yearly: Static informational pages
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://duo-soluciones.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Current date for lastModified
  const currentDate = new Date()

  // ============================================================================
  // STATIC ROUTES
  // ============================================================================

  const staticRoutes: MetadataRoute.Sitemap = [
    // Homepage - Highest priority
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },

    // About pages
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Services listing page
    {
      url: `${SITE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Individual service pages
    {
      url: `${SITE_URL}/services/desarrollo-organizacional`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services/mejora-procesos`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services/implementacion-erp`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services/gobernanza-corporativa`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    // Contact page
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Blog listing
    {
      url: `${SITE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.7,
    },

    // Podcast listing
    {
      url: `${SITE_URL}/podcast`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    // Projects/Portfolio
    {
      url: `${SITE_URL}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    // Team page (if separate from About)
    {
      url: `${SITE_URL}/team`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // Search page (Sprint 4)
    {
      url: `${SITE_URL}/search`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]

  // ============================================================================
  // DYNAMIC ROUTES FROM CMS
  // ============================================================================
  // Using mock data until Payload CMS is connected

  let blogPosts: MetadataRoute.Sitemap = []
  let podcastEpisodes: MetadataRoute.Sitemap = []
  const projects: MetadataRoute.Sitemap = []

  try {
    // Fetch blog posts (using mock data for now)
    const posts = getAllBlogPosts()
    blogPosts = posts.map(post => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Fetch podcast episodes (using mock data for now)
    const episodes = getAllPodcastEpisodes()
    podcastEpisodes = episodes.map(episode => ({
      url: `${SITE_URL}/podcast/${episode.slug}`,
      lastModified: new Date(episode.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Fetch case studies/projects from CMS (to be implemented)
    // projects = projectsList.map((project: any) => ({
    //   url: `${SITE_URL}/projects/${project.slug}`,
    //   lastModified: new Date(project.updatedAt),
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.6,
    // }))
  } catch (error) {
    console.error('Error fetching dynamic routes for sitemap:', error)
    // If data is not available, continue with static routes only
  }

  // ============================================================================
  // COMBINE ALL ROUTES
  // ============================================================================

  return [...staticRoutes, ...blogPosts, ...podcastEpisodes, ...projects]
}

/**
 * IMPLEMENTATION NOTES:
 *
 * 1. To add dynamic blog posts once CMS is connected:
 *    - Import Payload client
 *    - Fetch published blog posts
 *    - Map to sitemap entries
 *
 * 2. To add multi-language support:
 *    - Duplicate routes with /en prefix
 *    - Add alternates in each entry
 *
 * 3. To exclude certain pages:
 *    - Add them to a blacklist array
 *    - Filter them out before returning
 *
 * 4. To add images to sitemap:
 *    - Use MetadataRoute.Sitemap's images property
 *    - Include featured images from blog posts
 *
 * Example with images:
 * {
 *   url: `${SITE_URL}/blog/post-slug`,
 *   lastModified: new Date(),
 *   images: ['https://example.com/image.jpg'],
 * }
 *
 * 5. To test locally:
 *    - Visit http://localhost:3000/sitemap.xml
 *    - Verify all URLs are present and correctly formatted
 *
 * 6. To submit to Google:
 *    - Google Search Console > Sitemaps
 *    - Add: https://duo-soluciones.com/sitemap.xml
 *
 * 7. Performance considerations:
 *    - This function runs at build time (for static export)
 *    - For ISR, consider caching CMS queries
 *    - Use revalidate option if needed
 */
