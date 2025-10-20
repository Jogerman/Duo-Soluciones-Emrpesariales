import { MetadataRoute } from 'next'

/**
 * Robots.txt Configuration for DUO Soluciones Empresariales
 *
 * This file generates robots.txt directives for search engine crawlers.
 * Next.js 15 will automatically serve this at /robots.txt
 *
 * Purpose:
 * - Allow all user agents to crawl public pages
 * - Disallow admin, API, and private routes
 * - Reference sitemap for efficient crawling
 * - Set crawl delay if needed (for resource-intensive sites)
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://duo-soluciones.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',          // Payload CMS admin panel
          '/api/',            // API routes (except public endpoints)
          '/auth/',           // Authentication pages
          '/_next/',          // Next.js internal files
          '/private/',        // Any private content
          '/*.json$',         // JSON files
          '/*?*',             // Query parameters (optional - comment out if you want params crawled)
        ],
      },
      // Special rules for AI crawlers (optional - uncomment if needed)
      // {
      //   userAgent: 'GPTBot',
      //   disallow: ['/'],
      // },
      // {
      //   userAgent: 'ChatGPT-User',
      //   disallow: ['/'],
      // },
      // {
      //   userAgent: 'Google-Extended',
      //   disallow: ['/'],
      // },
      // {
      //   userAgent: 'CCBot',
      //   disallow: ['/'],
      // },
      // {
      //   userAgent: 'anthropic-ai',
      //   disallow: ['/'],
      // },
      // {
      //   userAgent: 'Claude-Web',
      //   disallow: ['/'],
      // },
      // Special crawlers allowed (good bots)
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/auth/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/auth/'],
      },
      // Allow only public API endpoints
      {
        userAgent: '*',
        allow: [
          '/api/health',      // Health check endpoint
          '/api/contact',     // Contact form (if public)
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}

/**
 * IMPLEMENTATION NOTES:
 *
 * 1. Testing robots.txt:
 *    - Visit http://localhost:3000/robots.txt
 *    - Verify all disallow rules are present
 *    - Test with Google's robots.txt Tester in Search Console
 *
 * 2. Common additions:
 *
 *    a) Crawl delay (if server resources are limited):
 *    {
 *      userAgent: '*',
 *      crawlDelay: 10, // seconds between requests
 *    }
 *
 *    b) Block specific bad bots:
 *    {
 *      userAgent: 'BadBot',
 *      disallow: ['/'],
 *    }
 *
 *    c) Allow staging/development:
 *    if (process.env.NODE_ENV === 'development') {
 *      return {
 *        rules: [{ userAgent: '*', disallow: ['/'] }],
 *      }
 *    }
 *
 * 3. Multi-language sites:
 *    - No changes needed in robots.txt
 *    - Language routing is handled by sitemap.xml
 *
 * 4. CDN considerations:
 *    - If using Cloudflare/CDN, ensure robots.txt is cached properly
 *    - Set appropriate cache headers
 *
 * 5. Security:
 *    - Don't use robots.txt as security mechanism
 *    - Still implement proper authentication
 *    - Robots.txt is publicly readable
 *
 * 6. Monitoring:
 *    - Check Google Search Console for crawl errors
 *    - Monitor server logs for blocked bot attempts
 *    - Review Bing Webmaster Tools
 *
 * 7. AI Crawler Management:
 *    - Uncomment AI crawler rules if you want to block AI training
 *    - Consider the trade-offs (SEO vs. AI training)
 *    - This is a business decision, not technical
 *
 * 8. Dynamic disallow rules:
 *    - Can fetch from CMS if needed
 *    - Useful for temporarily blocking sections
 *    - Cache appropriately to avoid performance issues
 */
