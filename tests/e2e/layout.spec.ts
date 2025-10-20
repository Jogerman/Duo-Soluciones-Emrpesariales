import { test, expect } from '@playwright/test'

/**
 * Layout Components E2E Tests
 *
 * Tests for Header, Footer, Navigation components
 * Includes responsive behavior testing across viewports
 */

test.describe('Header Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should render header with logo and navigation', async ({ page }) => {
    // Check header is visible
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Check logo is present
    const logo = page.locator('header a[href="/"]')
    await expect(logo).toBeVisible()
    await expect(logo.locator('text=DUO')).toBeVisible()
  })

  test('should have sticky positioning', async ({ page }) => {
    const header = page.locator('header')

    // Check sticky class is applied
    await expect(header).toHaveClass(/sticky/)

    // Scroll and verify header is still visible
    await page.evaluate(() => window.scrollBy(0, 500))
    await expect(header).toBeVisible()
  })

  test('should show desktop navigation on large screens', async ({ page, viewport }) => {
    if (!viewport || viewport.width < 768) {
      test.skip()
      return
    }

    // Desktop navigation should be visible
    const desktopNav = page.locator('header nav').first()
    await expect(desktopNav).toBeVisible()

    // Mobile menu button should be hidden
    const mobileMenuButton = page.locator('header button:has-text("Abrir menú")')
    await expect(mobileMenuButton).toBeHidden()
  })

  test('should show mobile menu button on small screens', async ({ page, viewport }) => {
    if (!viewport || viewport.width >= 768) {
      test.skip()
      return
    }

    // Mobile menu button should be visible
    const mobileMenuButton = page.locator('header button')
    await expect(mobileMenuButton.first()).toBeVisible()
  })

  test('should toggle mobile menu on click', async ({ page, viewport }) => {
    if (!viewport || viewport.width >= 768) {
      test.skip()
      return
    }

    const mobileMenuButton = page.locator('header button').first()

    // Click to open menu
    await mobileMenuButton.click()

    // Menu should be visible
    const mobileMenu = page.locator('header div:has-text("Contáctanos")')
    await expect(mobileMenu).toBeVisible()

    // Click to close menu
    await mobileMenuButton.click()

    // Menu should be hidden
    await expect(mobileMenu).toBeHidden()
  })

  test('should have CTA button linking to contact', async ({ page }) => {
    const ctaButton = page.locator('header a[href="/contacto"]')
    await expect(ctaButton).toBeVisible()
    await expect(ctaButton).toContainText('Contáctanos')
  })

  test('logo should navigate to homepage', async ({ page }) => {
    // Click logo
    const logo = page.locator('header a[href="/"]').first()
    await logo.click()

    // Should navigate to home
    await expect(page).toHaveURL('/')
  })
})

test.describe('Navigation Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should render navigation links', async ({ page, viewport }) => {
    if (!viewport || viewport.width < 768) {
      test.skip()
      return
    }

    const nav = page.locator('header nav').first()

    // Check common navigation items exist
    await expect(nav.locator('a[href*="servicios"], a:has-text("Servicios")')).toBeVisible()
    await expect(nav.locator('a[href*="nosotros"], a:has-text("Nosotros")')).toBeVisible()
  })

  test('navigation links should be clickable', async ({ page, viewport }) => {
    if (!viewport || viewport.width < 768) {
      test.skip()
      return
    }

    const nav = page.locator('header nav').first()
    const links = await nav.locator('a').all()

    // All links should have href attribute
    for (const link of links) {
      const href = await link.getAttribute('href')
      expect(href).toBeTruthy()
    }
  })
})

test.describe('Footer Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should render footer with all sections', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('should have 4 columns: Services, Company, Legal, Contact', async ({ page, viewport }) => {
    if (!viewport || viewport.width < 1024) {
      test.skip()
      return
    }

    const footer = page.locator('footer')

    // Check section headings
    await expect(footer.locator('h3:has-text("Servicios")')).toBeVisible()
    await expect(footer.locator('h3:has-text("Empresa")')).toBeVisible()
    await expect(footer.locator('h3:has-text("Legal")')).toBeVisible()
    await expect(footer.locator('h3:has-text("Contacto")')).toBeVisible()
  })

  test('should display contact information', async ({ page }) => {
    const footer = page.locator('footer')

    // Email
    await expect(footer.locator('a[href^="mailto:"]')).toBeVisible()

    // Phone
    await expect(footer.locator('a[href^="tel:"]')).toBeVisible()

    // Location text
    await expect(footer.locator('text=Santo Domingo')).toBeVisible()
  })

  test('should have social media links', async ({ page }) => {
    const footer = page.locator('footer')

    // Check social links with aria-labels
    await expect(footer.locator('a[aria-label="LinkedIn"]')).toBeVisible()
    await expect(footer.locator('a[aria-label="Facebook"]')).toBeVisible()
    await expect(footer.locator('a[aria-label="Instagram"]')).toBeVisible()
  })

  test('social media links should open in new tab', async ({ page }) => {
    const footer = page.locator('footer')
    const linkedinLink = footer.locator('a[aria-label="LinkedIn"]')

    // Should have target="_blank"
    await expect(linkedinLink).toHaveAttribute('target', '_blank')
    await expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('should display copyright with current year', async ({ page }) => {
    const footer = page.locator('footer')
    const currentYear = new Date().getFullYear()

    await expect(footer.locator(`text=© ${currentYear}`)).toBeVisible()
    await expect(footer.locator('text=DUO Soluciones Empresariales')).toBeVisible()
  })

  test('footer links should be accessible and clickable', async ({ page }) => {
    const footer = page.locator('footer')
    const footerLinks = await footer.locator('a[href^="/"]').all()

    // Verify each link has proper href
    for (const link of footerLinks) {
      const href = await link.getAttribute('href')
      expect(href).toBeTruthy()
      expect(href).toMatch(/^\/\w+/)
    }
  })
})

test.describe('Responsive Layout Behavior', () => {
  test('mobile layout (375px) - stacked navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Header should be full width
    const header = page.locator('header')
    const headerBox = await header.boundingBox()
    expect(headerBox?.width).toBeLessThanOrEqual(375)

    // Mobile menu button should be visible
    const mobileMenuButton = page.locator('header button').first()
    await expect(mobileMenuButton).toBeVisible()
  })

  test('tablet layout (768px) - responsive columns', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')

    // Desktop navigation should start appearing
    const header = page.locator('header')
    await expect(header).toBeVisible()
  })

  test('desktop layout (1920px) - full layout', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')

    // Desktop navigation visible
    const nav = page.locator('header nav').first()
    await expect(nav).toBeVisible()

    // Footer should have 4 columns
    const footer = page.locator('footer')
    await expect(footer.locator('h3:has-text("Servicios")')).toBeVisible()
    await expect(footer.locator('h3:has-text("Contacto")')).toBeVisible()
  })

  test('no horizontal scroll on any viewport', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 }, // Desktop
    ]

    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      await page.goto('/')

      // Check document width doesn't exceed viewport
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)

      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1) // +1 for rounding
    }
  })
})

test.describe('Layout Accessibility', () => {
  test('header should have proper semantic HTML', async ({ page }) => {
    await page.goto('/')

    // Should use <header> element
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Should have navigation landmark
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
  })

  test('footer should have proper semantic HTML', async ({ page }) => {
    await page.goto('/')

    // Should use <footer> element
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Headings should use proper hierarchy
    const footerHeadings = await footer.locator('h3').all()
    expect(footerHeadings.length).toBeGreaterThan(0)
  })

  test('mobile menu button should have accessible label', async ({ page, viewport }) => {
    if (!viewport || viewport.width >= 768) {
      test.skip()
      return
    }

    await page.goto('/')

    const mobileMenuButton = page.locator('header button').first()

    // Should have sr-only text for screen readers
    await expect(mobileMenuButton.locator('.sr-only')).toBeVisible()
  })

  test('social media links should have aria-labels', async ({ page }) => {
    await page.goto('/')

    const footer = page.locator('footer')

    // All social links should have aria-label
    const socialLinks = await footer
      .locator('a[aria-label*="LinkedIn"], a[aria-label*="Facebook"], a[aria-label*="Instagram"]')
      .all()
    expect(socialLinks.length).toBeGreaterThanOrEqual(3)
  })
})
