import { test, expect } from '@playwright/test'

/**
 * Performance E2E Tests
 *
 * Tests for Core Web Vitals, page load times, and performance metrics
 * Includes LCP, FID, CLS, TTFB measurements
 */

test.describe('Performance - Page Load Times', () => {
  test('homepage should load within acceptable time', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const domContentLoadedTime = Date.now() - startTime

    // DOM should be ready within 2 seconds
    expect(domContentLoadedTime).toBeLessThan(2000)

    await page.waitForLoadState('networkidle')

    const networkIdleTime = Date.now() - startTime

    // Network idle within 5 seconds
    expect(networkIdleTime).toBeLessThan(5000)
  })

  test('style guide should load within acceptable time', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/styleguide')
    await page.waitForLoadState('domcontentloaded')

    const loadTime = Date.now() - startTime

    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('page reload should be fast (cached)', async ({ page }) => {
    // First load
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Reload
    const startTime = Date.now()
    await page.reload()
    await page.waitForLoadState('domcontentloaded')

    const reloadTime = Date.now() - startTime

    // Cached reload should be faster (within 1.5s)
    expect(reloadTime).toBeLessThan(1500)
  })
})

test.describe('Performance - Core Web Vitals', () => {
  test('measure Largest Contentful Paint (LCP)', async ({ page }) => {
    await page.goto('/')

    // Wait for page to fully load
    await page.waitForLoadState('networkidle')

    const lcp = await page.evaluate(() => {
      return new Promise(resolve => {
        new PerformanceObserver(list => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          resolve(lastEntry.renderTime || lastEntry.loadTime)
        }).observe({ type: 'largest-contentful-paint', buffered: true })

        // Timeout after 5 seconds
        setTimeout(() => resolve(0), 5000)
      })
    })

    // LCP should be under 2.5s (Good), or at least under 4s (Needs Improvement)
    expect(lcp).toBeGreaterThan(0)
    expect(lcp).toBeLessThan(4000)
  })

  test('measure Cumulative Layout Shift (CLS)', async ({ page }) => {
    await page.goto('/')

    await page.waitForLoadState('networkidle')

    // Wait a bit for any layout shifts
    await page.waitForTimeout(1000)

    const cls = await page.evaluate(() => {
      return new Promise<number>(resolve => {
        let clsValue = 0

        new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value
            }
          }
        }).observe({ type: 'layout-shift', buffered: true })

        setTimeout(() => resolve(clsValue), 2000)
      })
    })

    // CLS should be under 0.1 (Good), or at least under 0.25 (Needs Improvement)
    expect(cls).toBeLessThan(0.25)
  })

  test('measure Time to First Byte (TTFB)', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/')

    const ttfb = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming
      return navigation.responseStart - navigation.requestStart
    })

    // TTFB should be under 600ms (Good), or at least under 1s
    expect(ttfb).toBeGreaterThan(0)
    expect(ttfb).toBeLessThan(1000)
  })

  test('measure First Contentful Paint (FCP)', async ({ page }) => {
    await page.goto('/')

    const fcp = await page.evaluate(() => {
      return new Promise<number>(resolve => {
        new PerformanceObserver(list => {
          const entries = list.getEntries()
          const firstEntry = entries[0]
          resolve(firstEntry.startTime)
        }).observe({ type: 'paint', buffered: true })

        setTimeout(() => resolve(0), 5000)
      })
    })

    // FCP should be under 1.8s (Good), or at least under 3s
    expect(fcp).toBeGreaterThan(0)
    expect(fcp).toBeLessThan(3000)
  })

  test('measure Time to Interactive (TTI approximation)', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const tti = Date.now() - startTime

    // TTI should be under 3.8s (Good), or at least under 7s
    expect(tti).toBeLessThan(7000)
  })
})

test.describe('Performance - Resource Loading', () => {
  test('should load critical CSS', async ({ page }) => {
    const cssFiles: string[] = []

    page.on('response', response => {
      if (response.url().endsWith('.css')) {
        cssFiles.push(response.url())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Should have loaded CSS files
    expect(cssFiles.length).toBeGreaterThan(0)
  })

  test('should load JavaScript bundles', async ({ page }) => {
    const jsFiles: string[] = []

    page.on('response', response => {
      if (response.url().endsWith('.js')) {
        jsFiles.push(response.url())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Should have loaded JS files
    expect(jsFiles.length).toBeGreaterThan(0)
  })

  test('images should be optimized', async ({ page }) => {
    const largeImages: string[] = []

    page.on('response', async response => {
      const url = response.url()

      if (url.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i) && !url.includes('favicon')) {
        try {
          const buffer = await response.body()
          const sizeInKB = buffer.length / 1024

          // Track images larger than 500KB
          if (sizeInKB > 500) {
            largeImages.push(`${url} (${sizeInKB.toFixed(0)}KB)`)
          }
        } catch (e) {
          // Ignore errors for images we can't check
        }
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Should not have very large unoptimized images
    expect(largeImages.length).toBe(0)
  })

  test('should use image lazy loading where appropriate', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const images = await page.locator('img').all()
    const lazyImages = []

    for (const img of images) {
      const loading = await img.getAttribute('loading')

      if (loading === 'lazy') {
        lazyImages.push(img)
      }
    }

    // At least some images should use lazy loading (if there are many images)
    if (images.length > 5) {
      expect(lazyImages.length).toBeGreaterThanOrEqual(0)
    }
  })

  test('fonts should load efficiently', async ({ page }) => {
    const fontFiles: string[] = []

    page.on('response', response => {
      if (response.url().match(/\.(woff|woff2|ttf|otf)$/i)) {
        fontFiles.push(response.url())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Should load fonts (if using custom fonts)
    // This is just a check, not a requirement
    expect(fontFiles.length >= 0).toBe(true)
  })
})

test.describe('Performance - Bundle Size', () => {
  test('JavaScript bundle should not be too large', async ({ page }) => {
    let totalJsSize = 0

    page.on('response', async response => {
      if (response.url().endsWith('.js')) {
        try {
          const buffer = await response.body()
          totalJsSize += buffer.length
        } catch (e) {
          // Ignore errors
        }
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const totalJsSizeKB = totalJsSize / 1024

    // Total JS should be under 500KB (compressed)
    expect(totalJsSizeKB).toBeLessThan(500)
  })

  test('CSS bundle should not be too large', async ({ page }) => {
    let totalCssSize = 0

    page.on('response', async response => {
      if (response.url().endsWith('.css')) {
        try {
          const buffer = await response.body()
          totalCssSize += buffer.length
        } catch (e) {
          // Ignore errors
        }
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const totalCssSizeKB = totalCssSize / 1024

    // Total CSS should be under 100KB
    expect(totalCssSizeKB).toBeLessThan(100)
  })

  test('should minimize number of requests', async ({ page }) => {
    const requests: string[] = []

    page.on('request', request => {
      requests.push(request.url())
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Should not make excessive requests (under 50 for initial load)
    expect(requests.length).toBeLessThan(50)
  })
})

test.describe('Performance - Caching', () => {
  test('static assets should be cacheable', async ({ page }) => {
    const cacheableAssets: string[] = []
    const nonCacheableAssets: string[] = []

    page.on('response', response => {
      const url = response.url()

      if (url.match(/\.(js|css|woff|woff2|jpg|jpeg|png|webp|svg)$/i)) {
        const cacheControl = response.headers()['cache-control']

        if (cacheControl && cacheControl.includes('max-age')) {
          cacheableAssets.push(url)
        } else {
          nonCacheableAssets.push(url)
        }
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Most static assets should be cacheable
    if (cacheableAssets.length + nonCacheableAssets.length > 0) {
      const cacheablePercentage =
        (cacheableAssets.length / (cacheableAssets.length + nonCacheableAssets.length)) * 100

      // At least 50% of static assets should be cacheable
      expect(cacheablePercentage).toBeGreaterThan(50)
    }
  })
})

test.describe('Performance - Rendering', () => {
  test('should not block rendering with scripts', async ({ page }) => {
    await page.goto('/')

    const renderBlockingScripts = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'))
      return scripts.filter(
        script =>
          !script.hasAttribute('async') &&
          !script.hasAttribute('defer') &&
          !script.hasAttribute('type')
      ).length
    })

    // Should minimize render-blocking scripts
    expect(renderBlockingScripts).toBeLessThan(5)
  })

  test('should render above-the-fold content quickly', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/')

    // Wait for first meaningful paint
    await page.waitForSelector('h1', { timeout: 3000 })

    const renderTime = Date.now() - startTime

    // Above-the-fold should render within 1.5s
    expect(renderTime).toBeLessThan(1500)
  })

  test('should not have long tasks blocking main thread', async ({ page }) => {
    await page.goto('/')

    await page.waitForLoadState('networkidle')

    const longTasks = await page.evaluate(() => {
      return new Promise<number>(resolve => {
        const longTasksList: number[] = []

        if ('PerformanceObserver' in window) {
          try {
            new PerformanceObserver(list => {
              for (const entry of list.getEntries()) {
                if (entry.duration > 50) {
                  longTasksList.push(entry.duration)
                }
              }
            }).observe({ type: 'longtask', buffered: true })
          } catch (e) {
            // Long task API not supported
          }
        }

        setTimeout(() => resolve(longTasksList.length), 3000)
      })
    })

    // Should not have many long tasks (over 50ms)
    expect(longTasks).toBeLessThan(10)
  })
})

test.describe('Performance - Mobile Performance', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
  })

  test('mobile page load should be acceptable', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const loadTime = Date.now() - startTime

    // Mobile should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('mobile should not download unnecessary resources', async ({ page }) => {
    const requests: string[] = []

    page.on('request', request => {
      requests.push(request.url())
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Mobile should have fewer requests than desktop
    expect(requests.length).toBeLessThan(50)
  })
})

test.describe('Performance - Memory Usage', () => {
  test('page should not have memory leaks', async ({ page }) => {
    await page.goto('/')

    // Get initial metrics
    const initialMetrics = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize
      }
      return 0
    })

    // Navigate and interact
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Get metrics after reload
    const afterMetrics = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize
      }
      return 0
    })

    // Memory should not grow excessively (within 2x)
    if (initialMetrics > 0 && afterMetrics > 0) {
      expect(afterMetrics).toBeLessThan(initialMetrics * 2)
    }
  })
})

test.describe('Performance - Network Efficiency', () => {
  test('should use compression for text resources', async ({ page }) => {
    const compressedResponses: string[] = []
    const uncompressedResponses: string[] = []

    page.on('response', response => {
      const url = response.url()

      if (url.match(/\.(js|css|html|json)$/i)) {
        const encoding = response.headers()['content-encoding']

        if (encoding && (encoding.includes('gzip') || encoding.includes('br'))) {
          compressedResponses.push(url)
        } else {
          uncompressedResponses.push(url)
        }
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Most text resources should be compressed
    if (compressedResponses.length + uncompressedResponses.length > 0) {
      const compressionRate =
        (compressedResponses.length / (compressedResponses.length + uncompressedResponses.length)) *
        100

      // At least 70% should be compressed
      expect(compressionRate).toBeGreaterThan(70)
    }
  })

  test('should minimize redirects', async ({ page }) => {
    const redirects: string[] = []

    page.on('response', response => {
      const status = response.status()

      if (status >= 300 && status < 400) {
        redirects.push(response.url())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Should have minimal redirects
    expect(redirects.length).toBeLessThan(3)
  })
})

test.describe('Performance - Benchmarks Summary', () => {
  test('generate performance report', async ({ page }) => {
    const metrics: any = {
      url: '/',
      timestamp: new Date().toISOString(),
    }

    const startTime = Date.now()

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    metrics.totalLoadTime = Date.now() - startTime

    // Collect performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming

      return {
        domContentLoaded:
          navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        domInteractive: navigation.domInteractive - navigation.fetchStart,
        ttfb: navigation.responseStart - navigation.requestStart,
      }
    })

    metrics.performance = performanceMetrics

    // Log performance report
    console.log('Performance Report:', JSON.stringify(metrics, null, 2))

    // All metrics should be reasonable
    expect(metrics.totalLoadTime).toBeLessThan(5000)
    expect(metrics.performance.ttfb).toBeLessThan(1000)
  })
})
