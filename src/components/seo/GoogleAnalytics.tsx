'use client'

import Script from 'next/script'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { GA_MEASUREMENT_ID, isAnalyticsEnabled, trackPageView } from '@/lib/analytics'

/**
 * Google Analytics Component
 *
 * This component loads Google Analytics 4 scripts and tracks page views.
 * Add this to your root layout.tsx file.
 *
 * Features:
 * - Automatic page view tracking on route change
 * - Only loads in production
 * - Respects DNT (Do Not Track) browser setting
 * - TypeScript support
 *
 * Usage:
 * ```tsx
 * // In app/layout.tsx
 * import { GoogleAnalytics } from '@/components/seo/GoogleAnalytics'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <GoogleAnalytics />
 *         {children}
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */
function GoogleAnalyticsInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views on route change
  useEffect(() => {
    if (isAnalyticsEnabled) {
      trackPageView()
    }
  }, [pathname, searchParams])

  return null
}

export function GoogleAnalytics() {
  // Don't render anything if analytics is disabled
  if (!isAnalyticsEnabled) {
    return null
  }

  return (
    <>
      <Suspense fallback={null}>
        <GoogleAnalyticsInner />
      </Suspense>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  )
}

/**
 * Google Tag Manager Component (Optional)
 *
 * Use this if you prefer GTM over direct GA4 implementation.
 * GTM provides more flexibility for managing multiple tracking tags.
 */
export function GoogleTagManager({ gtmId }: { gtmId: string }) {
  if (!gtmId || process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      {/* Google Tag Manager - Head Script */}
      <Script
        id="gtm-head"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
    </>
  )
}

/**
 * Google Tag Manager NoScript
 * Add this immediately after <body> tag in layout
 */
export function GoogleTagManagerNoScript({ gtmId }: { gtmId: string }) {
  if (!gtmId || process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  )
}
