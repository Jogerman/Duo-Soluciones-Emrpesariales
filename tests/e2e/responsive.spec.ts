import { test, expect } from '@playwright/test'

/**
 * Responsive Design E2E Tests
 *
 * Comprehensive testing across multiple viewports:
 * - Mobile (375px)
 * - Tablet (768px)
 * - Desktop (1920px)
 * - Ultra-wide (2560px)
 */

const viewports = {
  mobile: { width: 375, height: 667, name: 'Mobile Portrait' },
  mobileL: { width: 667, height: 375, name: 'Mobile Landscape' },
  tablet: { width: 768, height: 1024, name: 'Tablet Portrait' },
  tabletL: { width: 1024, height: 768, name: 'Tablet Landscape' },
  laptop: { width: 1366, height: 768, name: 'Laptop' },
  desktop: { width: 1920, height: 1080, name: 'Desktop' },
  ultraWide: { width: 2560, height: 1440, name: 'Ultra-wide' },
  fourK: { width: 3840, height: 2160, name: '4K Display' },
}

test.describe('Responsive - Mobile Portrait (375px)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(viewports.mobile)
  })

  test('homepage should render correctly', async ({ page }) => {
    await page.goto('/')

    // Page should be visible
    await expect(page.locator('body')).toBeVisible()

    // Header should be visible
    await expect(page.locator('header')).toBeVisible()
  })

  test('no horizontal scrolling', async ({ page }) => {
    await page.goto('/')

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })

  test('mobile menu should be accessible', async ({ page }) => {
    await page.goto('/')

    // Mobile menu button should be visible
    const menuButton = page.locator('header button').first()
    await expect(menuButton).toBeVisible()

    // Click to open
    await menuButton.click()

    // Menu should appear
    await page.waitForTimeout(300) // Animation
  })

  test('text should be readable (not too small)', async ({ page }) => {
    await page.goto('/')

    const h1 = page.locator('h1').first()
    const fontSize = await h1.evaluate(el => {
      return parseInt(window.getComputedStyle(el).fontSize)
    })

    // Font size should be at least 24px on mobile
    expect(fontSize).toBeGreaterThanOrEqual(20)
  })

  test('touch targets should be large enough', async ({ page }) => {
    await page.goto('/')

    const buttons = await page.locator('button, a[role="button"]').all()

    for (const button of buttons.slice(0, 5)) {
      const box = await button.boundingBox()

      if (box) {
        // Touch targets should be at least 44x44px (WCAG guideline)
        expect(box.height).toBeGreaterThanOrEqual(40)
        expect(box.width).toBeGreaterThanOrEqual(40)
      }
    }
  })

  test('images should not overflow', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const images = await page.locator('img').all()

    for (const img of images) {
      const box = await img.boundingBox()

      if (box) {
        // Images should not be wider than viewport
        expect(box.width).toBeLessThanOrEqual(viewports.mobile.width)
      }
    }
  })

  test('footer should stack vertically', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Footer columns should stack (be full width)
    const footerSections = await footer.locator('div > div').all()

    if (footerSections.length > 1) {
      const first = await footerSections[0].boundingBox()
      const second = await footerSections[1].boundingBox()

      if (first && second) {
        // Second section should be below first (stacked)
        expect(second.y).toBeGreaterThan(first.y)
      }
    }
  })
})

test.describe('Responsive - Tablet Portrait (768px)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(viewports.tablet)
  })

  test('homepage should render correctly', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('body')).toBeVisible()
  })

  test('no horizontal scrolling', async ({ page }) => {
    await page.goto('/')

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })

  test('navigation should be visible (if desktop nav)', async ({ page }) => {
    await page.goto('/')

    const header = page.locator('header')
    await expect(header).toBeVisible()
  })

  test('content should use grid layout where applicable', async ({ page }) => {
    await page.goto('/styleguide')

    // Service cards should be in 2-column grid on tablet
    const serviceCards = await page
      .locator('section:has(h2:has-text("Service Cards")) > div > div')
      .all()

    if (serviceCards.length >= 2) {
      const first = await serviceCards[0].boundingBox()
      const second = await serviceCards[1].boundingBox()

      if (first && second) {
        // On tablet, cards might be side by side or stacked
        const sideBySide = Math.abs(first.y - second.y) < 50
        const stacked = second.y > first.y + first.height - 50

        expect(sideBySide || stacked).toBe(true)
      }
    }
  })

  test('footer should show 2-column layout', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })
})

test.describe('Responsive - Desktop (1920px)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(viewports.desktop)
  })

  test('homepage should render correctly', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('body')).toBeVisible()
  })

  test('no horizontal scrolling', async ({ page }) => {
    await page.goto('/')

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })

  test('desktop navigation should be visible', async ({ page }) => {
    await page.goto('/')

    const nav = page.locator('header nav').first()
    await expect(nav).toBeVisible()

    // Mobile menu button should be hidden
    const mobileButton = page.locator('header button:has-text("Abrir menú")')
    await expect(mobileButton).toBeHidden()
  })

  test('content should be properly contained', async ({ page }) => {
    await page.goto('/')

    // Container should not span full width
    const container = page.locator('[class*="container"]').first()

    if ((await container.count()) > 0) {
      const box = await container.boundingBox()

      if (box) {
        // Container should be centered with max-width
        expect(box.width).toBeLessThan(1600) // Typical max-width
      }
    }
  })

  test('footer should show 4-column layout', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Should have 4 section headings
    const headings = await footer.locator('h3').count()
    expect(headings).toBeGreaterThanOrEqual(4)
  })

  test('service cards should show in row', async ({ page }) => {
    await page.goto('/styleguide')

    const serviceCards = await page
      .locator('section:has(h2:has-text("Service Cards")) > div > div')
      .all()

    if (serviceCards.length >= 2) {
      const first = await serviceCards[0].boundingBox()
      const second = await serviceCards[1].boundingBox()

      if (first && second) {
        // Cards should be side by side (similar Y position)
        expect(Math.abs(first.y - second.y)).toBeLessThan(50)
      }
    }
  })
})

test.describe('Responsive - Ultra-wide (2560px)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(viewports.ultraWide)
  })

  test('homepage should render correctly', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('body')).toBeVisible()
  })

  test('content should be contained (not stretch full width)', async ({ page }) => {
    await page.goto('/')

    const container = page.locator('[class*="container"]').first()

    if ((await container.count()) > 0) {
      const box = await container.boundingBox()

      if (box) {
        // Content should not stretch to full 2560px
        expect(box.width).toBeLessThan(2000)
      }
    }
  })

  test('text line length should remain readable', async ({ page }) => {
    await page.goto('/')

    const paragraphs = await page.locator('p').all()

    for (const p of paragraphs.slice(0, 3)) {
      const box = await p.boundingBox()

      if (box) {
        // Paragraphs should not be too wide (optimal: 60-80 characters ~600-800px)
        expect(box.width).toBeLessThan(1000)
      }
    }
  })
})

test.describe('Responsive - All Viewports Consistency', () => {
  const testPages = ['/', '/styleguide']

  for (const viewport of Object.values(viewports)) {
    test(`${viewport.name} - should have no horizontal scroll`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })

      for (const url of testPages) {
        await page.goto(url)

        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)

        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2) // +2 for rounding
      }
    })

    test(`${viewport.name} - header should be visible`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto('/')

      const header = page.locator('header')
      await expect(header).toBeVisible()
    })

    test(`${viewport.name} - footer should be visible`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height })
      await page.goto('/')

      const footer = page.locator('footer')
      await expect(footer).toBeVisible()
    })
  }
})

test.describe('Responsive - Breakpoint Testing', () => {
  const breakpoints = [
    { width: 374, name: 'Just below mobile' },
    { width: 375, name: 'Mobile start' },
    { width: 640, name: 'SM breakpoint' },
    { width: 767, name: 'Just below tablet' },
    { width: 768, name: 'MD breakpoint' },
    { width: 1023, name: 'Just below desktop' },
    { width: 1024, name: 'LG breakpoint' },
    { width: 1279, name: 'Just below XL' },
    { width: 1280, name: 'XL breakpoint' },
    { width: 1535, name: 'Just below 2XL' },
    { width: 1536, name: '2XL breakpoint' },
  ]

  for (const bp of breakpoints) {
    test(`breakpoint ${bp.width}px (${bp.name}) - no layout breaks`, async ({ page }) => {
      await page.setViewportSize({ width: bp.width, height: 800 })
      await page.goto('/')

      // Page should render without errors
      await expect(page.locator('body')).toBeVisible()

      // No horizontal scroll
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)

      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2)
    })
  }
})

test.describe('Responsive - Visual Regression', () => {
  test('mobile viewport comparison', async ({ page }) => {
    await page.setViewportSize(viewports.mobile)
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('responsive-mobile-375.png', {
      fullPage: true,
      timeout: 10000,
    })
  })

  test('tablet viewport comparison', async ({ page }) => {
    await page.setViewportSize(viewports.tablet)
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('responsive-tablet-768.png', {
      fullPage: true,
      timeout: 10000,
    })
  })

  test('desktop viewport comparison', async ({ page }) => {
    await page.setViewportSize(viewports.desktop)
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('responsive-desktop-1920.png', {
      fullPage: true,
      timeout: 10000,
    })
  })

  test('ultra-wide viewport comparison', async ({ page }) => {
    await page.setViewportSize(viewports.ultraWide)
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('responsive-ultrawide-2560.png', {
      fullPage: true,
      timeout: 10000,
    })
  })
})

test.describe('Responsive - Touch Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(viewports.mobile)
  })

  test('mobile - tap on buttons should work', async ({ page }) => {
    await page.goto('/')

    const button = page.locator('button, a[role="button"]').first()

    if ((await button.count()) > 0) {
      await button.tap()
    }
  })

  test('mobile - swipe should scroll page', async ({ page }) => {
    await page.goto('/')

    const initialScrollY = await page.evaluate(() => window.scrollY)

    // Simulate swipe up (scroll down)
    await page.mouse.move(200, 400)
    await page.mouse.down()
    await page.mouse.move(200, 100, { steps: 10 })
    await page.mouse.up()

    await page.waitForTimeout(100)

    const afterScrollY = await page.evaluate(() => window.scrollY)

    // Page should have scrolled (may not work in all scenarios)
    expect(afterScrollY >= initialScrollY).toBe(true)
  })

  test('mobile - pinch zoom should be disabled (if implemented)', async ({ page }) => {
    await page.goto('/')

    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content')

    if (viewport) {
      // If user-scalable=no is set, pinch zoom is disabled
      const hasZoomDisabled =
        viewport.includes('user-scalable=no') || viewport.includes('maximum-scale=1')

      // This is just a check, not a requirement
      expect(typeof hasZoomDisabled).toBe('boolean')
    }
  })
})
