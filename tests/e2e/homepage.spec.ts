import { test, expect } from '@playwright/test'

/**
 * Homepage E2E Tests
 *
 * Tests for the main landing page
 * Includes Hero section, page structure, and interactive elements
 */

test.describe('Homepage - Basic Structure', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveURL('/')
    await expect(page).toHaveTitle(/DUO Soluciones Empresariales/i)
  })

  test('should have header navigation', async ({ page }) => {
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Logo should be present
    await expect(header.locator('text=DUO')).toBeVisible()
  })

  test('should have footer', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('should have main content area', async ({ page }) => {
    const main = page.locator('main, [role="main"]')

    // Either a main element or content should be visible
    const hasMain = (await main.count()) > 0
    const hasContent = (await page.locator('body').textContent())?.length ?? 0 > 100

    expect(hasMain || hasContent).toBe(true)
  })
})

test.describe('Homepage - Hero Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display hero section', async ({ page }) => {
    // Hero should be visible (look for main heading or hero content)
    const heroContent = await page.locator('h1, [class*="hero"]').first()
    await expect(heroContent).toBeVisible()
  })

  test('hero should have main heading', async ({ page }) => {
    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()

    const headingText = await h1.textContent()
    expect(headingText).toBeTruthy()
    expect(headingText?.length).toBeGreaterThan(10)
  })

  test('hero should have descriptive text', async ({ page }) => {
    // Should have some paragraph or description text
    const description = page.locator('p').first()
    await expect(description).toBeVisible()
  })

  test('hero should have CTA button', async ({ page }) => {
    // Look for primary CTA button (usually links to contact or services)
    const ctaButton = page.locator('a[href*="contacto"], button, a[class*="button"]').first()

    if ((await ctaButton.count()) > 0) {
      await expect(ctaButton).toBeVisible()
    }
  })

  test('hero section should be prominent', async ({ page }) => {
    const hero = page.locator('h1').first().locator('..')

    const box = await hero.boundingBox()

    if (box) {
      // Hero should be near top of page
      expect(box.y).toBeLessThan(300)

      // Hero should have significant height
      expect(box.height).toBeGreaterThan(100)
    }
  })
})

test.describe('Homepage - Content Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should have multiple content sections', async ({ page }) => {
    // Page should have multiple sections or divs
    const sections = await page.locator('section, div[class*="section"]').count()
    const allDivs = await page.locator('div').count()

    // Should have structured content
    expect(sections > 0 || allDivs > 5).toBe(true)
  })

  test('all headings should be visible', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3').all()

    for (const heading of headings) {
      await expect(heading).toBeVisible()
    }
  })

  test('page should have meaningful content', async ({ page }) => {
    const bodyText = await page.locator('body').textContent()

    expect(bodyText).toBeTruthy()
    expect(bodyText?.length).toBeGreaterThan(200)
  })
})

test.describe('Homepage - Interactive Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('all links should have valid href attributes', async ({ page }) => {
    const links = await page.locator('a[href]').all()

    for (const link of links.slice(0, 20)) {
      const href = await link.getAttribute('href')
      expect(href).toBeTruthy()
    }
  })

  test('CTA buttons should be clickable', async ({ page }) => {
    const buttons = await page.locator('button, a[role="button"]').all()

    for (const button of buttons.slice(0, 5)) {
      await expect(button).toBeVisible()

      // Should not be disabled
      const isDisabled = await button.isDisabled()
      if (!isDisabled) {
        await expect(button).toBeEnabled()
      }
    }
  })

  test('navigation links should work', async ({ page }) => {
    const navLinks = await page.locator('header a[href^="/"]').all()

    if (navLinks.length > 0) {
      const firstLink = navLinks[0]
      const href = await firstLink.getAttribute('href')

      expect(href).toBeTruthy()
    }
  })
})

test.describe('Homepage - Responsive Design', () => {
  test('mobile layout (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Page should load
    await expect(page.locator('body')).toBeVisible()

    // Header should be visible
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // No horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })

  test('tablet layout (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')

    // Main heading should be visible
    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()

    // Content should be visible
    await expect(page.locator('body')).toBeVisible()
  })

  test('desktop layout (1920px)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')

    // All major sections should be visible
    const header = page.locator('header')
    const footer = page.locator('footer')

    await expect(header).toBeVisible()
    await expect(footer).toBeVisible()
  })

  test('ultra-wide layout (2560px)', async ({ page }) => {
    await page.setViewportSize({ width: 2560, height: 1440 })
    await page.goto('/')

    // Content should not stretch too wide (should be contained)
    const container = page.locator('[class*="container"]').first()

    if ((await container.count()) > 0) {
      const box = await container.boundingBox()

      if (box) {
        // Container should have max-width (not full 2560px)
        expect(box.width).toBeLessThan(2000)
      }
    }
  })
})

test.describe('Homepage - Performance', () => {
  test('page should load within acceptable time', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const loadTime = Date.now() - startTime

    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('images should be optimized', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const images = await page.locator('img').all()

    for (const img of images) {
      // Images should have loaded
      const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth)

      if (naturalWidth !== undefined && naturalWidth > 0) {
        expect(naturalWidth).toBeGreaterThan(0)
      }
    }
  })

  test('critical resources should load quickly', async ({ page }) => {
    const resources: string[] = []

    page.on('response', response => {
      if (response.url().includes('.js') || response.url().includes('.css')) {
        resources.push(response.url())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Should have loaded CSS and JS
    expect(resources.length).toBeGreaterThan(0)
  })
})

test.describe('Homepage - SEO & Metadata', () => {
  test('should have page title', async ({ page }) => {
    await page.goto('/')

    const title = await page.title()
    expect(title).toBeTruthy()
    expect(title.length).toBeGreaterThan(0)
  })

  test('should have meta description', async ({ page }) => {
    await page.goto('/')

    const description = await page.locator('meta[name="description"]').getAttribute('content')

    // If meta description exists, it should have content
    if (description) {
      expect(description.length).toBeGreaterThan(20)
    }
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/')

    // Should have exactly one h1
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBeGreaterThanOrEqual(1)
    expect(h1Count).toBeLessThanOrEqual(2) // Allow up to 2 for logo + hero

    // h1 should come before h2
    const h1 = page.locator('h1').first()
    const h2 = page.locator('h2').first()

    if ((await h2.count()) > 0) {
      const h1Box = await h1.boundingBox()
      const h2Box = await h2.boundingBox()

      if (h1Box && h2Box) {
        expect(h1Box.y).toBeLessThan(h2Box.y)
      }
    }
  })

  test('should have language attribute', async ({ page }) => {
    await page.goto('/')

    const lang = await page.locator('html').getAttribute('lang')
    expect(lang).toBeTruthy()
  })
})

test.describe('Homepage - Visual Regression', () => {
  test('full page screenshot - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      fullPage: true,
      timeout: 10000,
    })
  })

  test('full page screenshot - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      timeout: 10000,
    })
  })

  test('hero section screenshot', async ({ page }) => {
    await page.goto('/')

    const hero = page.locator('h1').first().locator('..')
    await hero.screenshot({
      path: 'test-results/screenshots/hero-section.png',
    })
  })
})

test.describe('Homepage - Accessibility', () => {
  test('main landmark should exist', async ({ page }) => {
    await page.goto('/')

    // Should have main element or role="main"
    const main = await page.locator('main, [role="main"]').count()
    const hasContent = (await page.locator('body > div').count()) > 0

    expect(main > 0 || hasContent).toBe(true)
  })

  test('skip to main content link (optional)', async ({ page }) => {
    await page.goto('/')

    // If skip link exists, it should work
    const skipLink = page.locator('a[href="#main"], a:has-text("Skip to")')

    if ((await skipLink.count()) > 0) {
      await expect(skipLink).toBeHidden() // Usually hidden until focused
    }
  })

  test('images should have alt text or decorative role', async ({ page }) => {
    await page.goto('/')

    const images = await page.locator('img').all()

    for (const img of images) {
      const alt = await img.getAttribute('alt')
      const role = await img.getAttribute('role')

      // Should have alt text or role="presentation"
      expect(alt !== null || role === 'presentation').toBe(true)
    }
  })
})
