'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { generateBreadcrumbSchema, generateStructuredDataScript } from '@/lib/seo'

/**
 * Breadcrumbs Component with JSON-LD Structured Data
 *
 * Features:
 * - Automatic breadcrumb generation from URL path
 * - JSON-LD BreadcrumbList schema for SEO
 * - Accessible navigation with ARIA labels
 * - Responsive design
 * - Custom labels for specific routes
 *
 * Usage:
 * ```tsx
 * <Breadcrumbs />
 * ```
 *
 * Or with custom labels:
 * ```tsx
 * <Breadcrumbs
 *   customLabels={{
 *     'desarrollo-organizacional': 'Desarrollo Organizacional',
 *     'implementacion-erp': 'Implementación ERP'
 *   }}
 * />
 * ```
 */

interface BreadcrumbsProps {
  customLabels?: Record<string, string>
  className?: string
  showHome?: boolean
}

interface BreadcrumbItem {
  name: string
  url: string
}

// Default labels for common routes
const DEFAULT_LABELS: Record<string, string> = {
  // Main sections
  about: 'Nosotros',
  services: 'Servicios',
  contact: 'Contacto',
  blog: 'Blog',
  podcast: 'Podcast',
  projects: 'Proyectos',
  team: 'Equipo',

  // Services
  'desarrollo-organizacional': 'Desarrollo Organizacional',
  'mejora-procesos': 'Mejora de Procesos',
  'implementacion-erp': 'Implementación ERP',
  'gobernanza-corporativa': 'Gobernanza Corporativa',

  // Auth pages (usually not shown but included for completeness)
  auth: 'Autenticación',
  signin: 'Iniciar Sesión',
  signup: 'Registrarse',
  admin: 'Administración',
}

/**
 * Convert slug to human-readable title
 */
function slugToTitle(slug: string, customLabels?: Record<string, string>): string {
  // Check custom labels first
  if (customLabels?.[slug]) {
    return customLabels[slug]
  }

  // Check default labels
  if (DEFAULT_LABELS[slug]) {
    return DEFAULT_LABELS[slug]
  }

  // Fallback: capitalize and replace hyphens with spaces
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Generate breadcrumb items from pathname
 */
function generateBreadcrumbs(
  pathname: string,
  customLabels?: Record<string, string>
): BreadcrumbItem[] {
  // Remove trailing slash and split path
  const pathSegments = pathname.replace(/^\/|\/$/g, '').split('/')

  // Filter out empty segments
  const validSegments = pathSegments.filter((segment) => segment.length > 0)

  // Build breadcrumb items
  const breadcrumbs: BreadcrumbItem[] = []
  let currentPath = ''

  for (const segment of validSegments) {
    currentPath += `/${segment}`
    breadcrumbs.push({
      name: slugToTitle(segment, customLabels),
      url: currentPath,
    })
  }

  return breadcrumbs
}

export function Breadcrumbs({
  customLabels,
  className = '',
  showHome = true,
}: BreadcrumbsProps) {
  const pathname = usePathname()

  // Don't show breadcrumbs on homepage
  if (pathname === '/') {
    return null
  }

  // Generate breadcrumb items
  const breadcrumbItems = generateBreadcrumbs(pathname, customLabels)

  // If no items (shouldn't happen but safety check)
  if (breadcrumbItems.length === 0) {
    return null
  }

  // Prepare items for JSON-LD (include home if showHome is true)
  const jsonLdItems: BreadcrumbItem[] = showHome
    ? [{ name: 'Inicio', url: '/' }, ...breadcrumbItems]
    : breadcrumbItems

  // Generate JSON-LD schema
  const breadcrumbSchema = generateBreadcrumbSchema(jsonLdItems)

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateStructuredDataScript(breadcrumbSchema)}
      />

      {/* Visual Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className={`py-4 ${className}`}
      >
        <ol className="flex items-center space-x-2 text-sm">
          {/* Home link */}
          {showHome && (
            <li className="flex items-center">
              <Link
                href="/"
                className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center"
                aria-label="Inicio"
              >
                <Home className="w-4 h-4" />
                <span className="sr-only">Inicio</span>
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400 mx-2" aria-hidden="true" />
            </li>
          )}

          {/* Breadcrumb items */}
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1

            return (
              <li key={item.url} className="flex items-center">
                {isLast ? (
                  // Last item - current page (no link)
                  <span
                    className="text-gray-900 font-medium"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  // Intermediate items - links
                  <>
                    <Link
                      href={item.url}
                      className="text-gray-600 hover:text-primary transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400 mx-2" aria-hidden="true" />
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

/**
 * USAGE EXAMPLES:
 *
 * 1. Basic usage (in any page):
 * ```tsx
 * import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
 *
 * export default function ServicesPage() {
 *   return (
 *     <div>
 *       <Breadcrumbs />
 *       <h1>Nuestros Servicios</h1>
 *     </div>
 *   )
 * }
 * ```
 *
 * 2. With custom labels:
 * ```tsx
 * <Breadcrumbs
 *   customLabels={{
 *     'bi-analytics': 'BI & Analytics',
 *     'custom-slug': 'Custom Title'
 *   }}
 * />
 * ```
 *
 * 3. In a layout (for consistent placement):
 * ```tsx
 * // app/services/layout.tsx
 * import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
 *
 * export default function ServicesLayout({ children }) {
 *   return (
 *     <div>
 *       <Breadcrumbs className="container mx-auto px-4" />
 *       {children}
 *     </div>
 *   )
 * }
 * ```
 *
 * 4. Without home link:
 * ```tsx
 * <Breadcrumbs showHome={false} />
 * ```
 *
 * 5. Styled breadcrumbs:
 * ```tsx
 * <Breadcrumbs className="bg-gray-50 rounded-lg px-6" />
 * ```
 */

/**
 * ACCESSIBILITY FEATURES:
 *
 * - Semantic HTML with <nav> and <ol>
 * - aria-label="Breadcrumb" on nav element
 * - aria-current="page" on current page
 * - Screen reader text with sr-only class
 * - Keyboard navigation support via links
 * - ARIA hidden icons (decorative only)
 */

/**
 * SEO BENEFITS:
 *
 * - BreadcrumbList structured data for rich snippets
 * - Clear site hierarchy for search engines
 * - Improved internal linking
 * - Enhanced user navigation (UX signal)
 * - Better crawlability
 * - Potential for breadcrumb rich results in SERPs
 */
