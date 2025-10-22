/**
 * Analytics & Tracking Utilities for DUO Soluciones Empresariales
 *
 * This module provides comprehensive analytics integration including:
 * - Google Analytics 4 (GA4) tracking
 * - Google Tag Manager (GTM) support
 * - Custom event tracking
 * - Page view tracking
 * - Conversion tracking
 * - Form submission tracking
 * - Error tracking
 *
 * Setup Instructions:
 * 1. Add NEXT_PUBLIC_GA_MEASUREMENT_ID to .env.local
 * 2. Add NEXT_PUBLIC_GTM_ID to .env.local (optional)
 * 3. Import GoogleAnalytics component in root layout
 * 4. Use trackEvent() for custom events
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void
    dataLayer?: Array<Record<string, unknown>>
  }
}

export interface EventParams {
  action?: string
  category?: string
  label?: string
  value?: number
  [key: string]: unknown
}

export interface PageViewParams {
  page_title?: string
  page_location?: string
  page_path?: string
  [key: string]: unknown
}

// ============================================================================
// CONFIGURATION
// ============================================================================

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ''

export const isProduction = process.env.NODE_ENV === 'production'
export const isAnalyticsEnabled = isProduction && !!GA_MEASUREMENT_ID

// ============================================================================
// GOOGLE ANALYTICS FUNCTIONS
// ============================================================================

/**
 * Track page views
 * Automatically called on route changes
 */
export function trackPageView(params?: PageViewParams): void {
  if (!isAnalyticsEnabled || typeof window === 'undefined') return

  if (window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
      page_title: document.title,
      page_location: window.location.href,
      ...params,
    })
  }
}

/**
 * Track custom events
 *
 * @example
 * ```ts
 * trackEvent('contact_form_submit', {
 *   category: 'engagement',
 *   label: 'Contact Form',
 *   value: 1
 * })
 * ```
 */
export function trackEvent(eventName: string, params?: EventParams): void {
  if (!isAnalyticsEnabled || typeof window === 'undefined') return

  if (window.gtag) {
    window.gtag('event', eventName, params)
  }

  // Also log to console in development
  if (!isProduction) {
    console.log('[Analytics Event]', eventName, params)
  }
}

/**
 * Track form submissions
 */
export function trackFormSubmit(formName: string, formData?: Record<string, unknown>): void {
  trackEvent('form_submit', {
    category: 'engagement',
    label: formName,
    form_name: formName,
    ...formData,
  })
}

/**
 * Track button/link clicks
 */
export function trackClick(elementName: string, elementType: 'button' | 'link', destination?: string): void {
  trackEvent('click', {
    category: 'engagement',
    label: elementName,
    element_type: elementType,
    ...(destination && { destination }),
  })
}

/**
 * Track downloads (PDFs, documents, etc.)
 */
export function trackDownload(fileName: string, fileType?: string): void {
  trackEvent('file_download', {
    category: 'engagement',
    label: fileName,
    file_name: fileName,
    file_type: fileType,
  })
}

/**
 * Track outbound links
 */
export function trackOutboundLink(url: string, linkText?: string): void {
  trackEvent('outbound_link', {
    category: 'engagement',
    label: url,
    destination: url,
    link_text: linkText,
  })
}

/**
 * Track video interactions
 */
export function trackVideo(action: 'play' | 'pause' | 'complete', videoTitle: string, currentTime?: number): void {
  trackEvent('video_' + action, {
    category: 'engagement',
    label: videoTitle,
    video_title: videoTitle,
    ...(currentTime && { video_current_time: currentTime }),
  })
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: number): void {
  trackEvent('scroll', {
    category: 'engagement',
    label: `${depth}%`,
    scroll_depth: depth,
  })
}

/**
 * Track errors
 */
export function trackError(errorName: string, errorMessage?: string, errorStack?: string): void {
  trackEvent('exception', {
    category: 'error',
    label: errorName,
    description: errorMessage,
    fatal: false,
    error_name: errorName,
    error_message: errorMessage,
    error_stack: errorStack,
  })
}

/**
 * Track conversions (goals)
 */
export function trackConversion(conversionName: string, value?: number, currency = 'DOP'): void {
  trackEvent('conversion', {
    category: 'conversion',
    label: conversionName,
    value,
    currency,
    conversion_name: conversionName,
  })
}

/**
 * Track service inquiries
 */
export function trackServiceInquiry(serviceName: string): void {
  trackEvent('service_inquiry', {
    category: 'lead',
    label: serviceName,
    service_name: serviceName,
  })
}

/**
 * Track blog/content engagement
 */
export function trackContentEngagement(
  contentType: 'blog' | 'podcast' | 'case_study',
  contentTitle: string,
  action: 'view' | 'read' | 'share'
): void {
  trackEvent(`content_${action}`, {
    category: 'engagement',
    label: contentTitle,
    content_type: contentType,
    content_title: contentTitle,
  })
}

// ============================================================================
// CUSTOM EVENTS - SPRINT 5 WAVE 2
// ============================================================================

/**
 * Track newsletter signup
 *
 * @example
 * ```ts
 * trackNewsletterSignup('footer_form')
 * trackNewsletterSignup('blog_inline')
 * ```
 */
export function trackNewsletterSignup(method: string = 'footer_form'): void {
  trackEvent('newsletter_signup', {
    category: 'engagement',
    label: 'Newsletter Signup',
    method,
  })
}

/**
 * Track search queries
 *
 * @example
 * ```ts
 * trackSearch('desarrollo organizacional')
 * trackSearch('ERP implementation', { results_count: 5 })
 * ```
 */
export function trackSearch(searchTerm: string, params?: { results_count?: number; category?: string }): void {
  trackEvent('search', {
    category: 'engagement',
    label: searchTerm,
    search_term: searchTerm,
    ...params,
  })
}

/**
 * Track social shares
 *
 * @example
 * ```ts
 * trackShare('linkedin', 'blog', 'post-slug-123')
 * trackShare('twitter', 'podcast', 'episode-5')
 * ```
 */
export function trackShare(
  platform: 'linkedin' | 'twitter' | 'facebook' | 'whatsapp' | 'email',
  contentType: 'blog' | 'podcast' | 'service' | 'page',
  contentId: string
): void {
  trackEvent('share', {
    category: 'engagement',
    label: `Share on ${platform}`,
    method: platform,
    content_type: contentType,
    content_id: contentId,
  })
}

/**
 * Track recommendation/related content clicks
 *
 * @example
 * ```ts
 * trackRecommendationClick('blog-post-123', 'blog')
 * trackRecommendationClick('episode-5', 'podcast')
 * ```
 */
export function trackRecommendationClick(
  contentId: string,
  contentType: 'blog' | 'podcast' | 'service'
): void {
  trackEvent('recommendation_click', {
    category: 'engagement',
    label: `Recommendation: ${contentId}`,
    content_id: contentId,
    content_type: contentType,
  })
}

/**
 * Track contact form submissions
 *
 * @example
 * ```ts
 * trackContactFormSubmit()
 * trackContactFormSubmit({ service_interest: 'Desarrollo Organizacional' })
 * ```
 */
export function trackContactFormSubmit(params?: { service_interest?: string; source?: string }): void {
  trackEvent('contact_form_submit', {
    category: 'lead',
    label: 'Contact Form Submission',
    ...params,
  })
}

// ============================================================================
// SCROLL TRACKING UTILITY
// ============================================================================

/**
 * Initialize scroll depth tracking
 * Call this once in root layout or app wrapper
 */
export function initScrollTracking(): void {
  if (typeof window === 'undefined' || !isAnalyticsEnabled) return

  const scrollDepths = [25, 50, 75, 100]
  const trackedDepths = new Set<number>()

  const handleScroll = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = Math.round((scrollTop / docHeight) * 100)

    for (const depth of scrollDepths) {
      if (scrollPercent >= depth && !trackedDepths.has(depth)) {
        trackedDepths.add(depth)
        trackScrollDepth(depth)
      }
    }
  }

  // Throttle scroll events
  let ticking = false
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll()
        ticking = false
      })
      ticking = true
    }
  })
}

// ============================================================================
// GOOGLE TAG MANAGER FUNCTIONS
// ============================================================================

/**
 * Push data to GTM dataLayer
 */
export function pushToDataLayer(data: Record<string, unknown>): void {
  if (typeof window === 'undefined' || !GTM_ID) return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(data)

  if (!isProduction) {
    console.log('[GTM DataLayer]', data)
  }
}

/**
 * Track GTM event
 */
export function trackGTMEvent(event: string, data?: Record<string, unknown>): void {
  pushToDataLayer({
    event,
    ...data,
  })
}

// ============================================================================
// USER IDENTIFICATION (for logged-in users)
// ============================================================================

/**
 * Set user ID for cross-session tracking
 * Call this after user authentication
 */
export function setUserId(userId: string): void {
  if (!isAnalyticsEnabled || typeof window === 'undefined') return

  if (window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      user_id: userId,
    })
  }

  pushToDataLayer({
    userId,
  })
}

/**
 * Set user properties
 */
export function setUserProperties(properties: Record<string, string>): void {
  if (!isAnalyticsEnabled || typeof window === 'undefined') return

  if (window.gtag) {
    window.gtag('set', 'user_properties', properties)
  }
}

// ============================================================================
// CONSENT MANAGEMENT
// ============================================================================

/**
 * Update analytics consent
 * Call this based on user cookie preferences
 */
export function updateConsent(consent: {
  analytics: boolean
  marketing: boolean
}): void {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
  })
}

/**
 * Initialize default consent state
 * Call this before GA loads
 */
export function initConsent(): void {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    wait_for_update: 500,
  })
}

// ============================================================================
// PERFORMANCE TRACKING
// ============================================================================

/**
 * Track Core Web Vitals
 */
export function trackWebVitals(metric: {
  name: string
  value: number
  id: string
  rating?: string
}): void {
  trackEvent('web_vitals', {
    category: 'performance',
    label: metric.name,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.value,
    metric_rating: metric.rating,
  })
}

// ============================================================================
// EXPORTS
// ============================================================================

export const analytics = {
  // Page tracking
  trackPageView,

  // Event tracking
  trackEvent,
  trackFormSubmit,
  trackClick,
  trackDownload,
  trackOutboundLink,
  trackVideo,
  trackScrollDepth,
  trackError,
  trackConversion,
  trackServiceInquiry,
  trackContentEngagement,

  // Custom Sprint 5 events
  trackNewsletterSignup,
  trackSearch,
  trackShare,
  trackRecommendationClick,
  trackContactFormSubmit,

  // Scroll tracking
  initScrollTracking,

  // GTM
  pushToDataLayer,
  trackGTMEvent,

  // User tracking
  setUserId,
  setUserProperties,

  // Consent
  updateConsent,
  initConsent,

  // Performance
  trackWebVitals,
}

/**
 * USAGE EXAMPLES:
 *
 * 1. Track page views (automatic in app wrapper):
 * ```tsx
 * import { trackPageView } from '@/lib/analytics'
 *
 * useEffect(() => {
 *   trackPageView()
 * }, [pathname])
 * ```
 *
 * 2. Track form submission:
 * ```tsx
 * import { trackFormSubmit } from '@/lib/analytics'
 *
 * const handleSubmit = (data) => {
 *   trackFormSubmit('contact_form', {
 *     service_type: data.serviceType
 *   })
 *   // ... submit form
 * }
 * ```
 *
 * 3. Track button clicks:
 * ```tsx
 * import { trackClick } from '@/lib/analytics'
 *
 * <button onClick={() => {
 *   trackClick('cta_button', 'button', '/services')
 * }}>
 *   Ver Servicios
 * </button>
 * ```
 *
 * 4. Track service inquiries:
 * ```tsx
 * import { trackServiceInquiry } from '@/lib/analytics'
 *
 * trackServiceInquiry('Desarrollo Organizacional')
 * ```
 *
 * 5. Track blog post reading:
 * ```tsx
 * import { trackContentEngagement } from '@/lib/analytics'
 *
 * trackContentEngagement('blog', 'Post Title', 'read')
 * ```
 */
