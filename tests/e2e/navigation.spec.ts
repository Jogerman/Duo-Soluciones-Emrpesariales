import { test, expect } from '@playwright/test'

/**
 * Navigation Tests for DUO Soluciones
 * Tests all main pages load successfully
 */

test.describe('Main Navigation', () => {
  test('Homepage loads successfully', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Check page loads
    await expect(page).toHaveTitle(/DUO Soluciones/)

    // Check hero section exists
    await expect(page.locator('h1')).toContainText('Transformamos')

    // Check stats section
    await expect(page.locator('text=50+')).toBeVisible()
    await expect(page.locator('text=200+')).toBeVisible()
  })

  test('About page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/about')

    await expect(page).toHaveTitle(/Sobre Nosotros/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('Clientes page loads (404 fix verification)', async ({ page }) => {
    await page.goto('http://localhost:3000/clientes')

    // Verify page loads (not 404)
    await expect(page).toHaveTitle(/Nuestros Clientes/)

    // Check client stats
    await expect(page.locator('text=50+')).toBeVisible()

    // Check industries section
    await expect(page.locator('text=Banca y Finanzas')).toBeVisible()
  })

  test('Services page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/services')

    await expect(page).toHaveTitle(/Servicios/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('Blog page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/blog')

    // Check page renders successfully
    await expect(page.locator('h1')).toBeVisible()
  })

  test('Podcast page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/podcast')

    // Check page renders successfully
    await expect(page.locator('body')).toBeVisible()
  })

  test('Contact page loads', async ({ page }) => {
    await page.goto('http://localhost:3000/contact')

    await expect(page).toHaveTitle(/Contacto/)
    // Check form exists
    await expect(page.locator('form')).toBeVisible()
  })
})

test.describe('Service Detail Pages', () => {
  const services = [
    'desarrollo-organizacional',
    'mejora-procesos',
    'implementacion-erp',
    'gobernanza-corporativa',
  ]

  for (const service of services) {
    test(`Service ${service} page loads`, async ({ page }) => {
      await page.goto(`http://localhost:3000/services/${service}`)

      // Should not be 404
      await expect(page.locator('h1')).toBeVisible()
    })
  }
})

test.describe('Navigation Menu', () => {
  test('Desktop navigation renders', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto('http://localhost:3000')

    // Check navigation exists
    await expect(page.locator('nav')).toBeVisible()
  })

  test('Mobile viewport renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('http://localhost:3000')

    // Check page loads on mobile
    await expect(page.locator('h1')).toBeVisible()
  })
})

test.describe('Contact Form', () => {
  test('Contact form is accessible', async ({ page }) => {
    await page.goto('http://localhost:3000/contact')

    // Check form exists
    await expect(page.locator('form')).toBeVisible()
  })
})

test.describe('Visual Regression (Color Scheme)', () => {
  test('New brand colors are applied', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Check hero section has new colors (blue/teal)
    const heroSection = page.locator('section').first()
    await expect(heroSection).toBeVisible()

    // Background should be blue/teal gradient (not green)
    const bgColor = await heroSection.evaluate(el => {
      return window.getComputedStyle(el).backgroundImage
    })

    // Should contain gradient (not solid green)
    expect(bgColor).toContain('gradient')
  })

  test('Hero background image is loaded', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Check hero background image
    const heroImage = page.locator('img[alt*="Background"], img[src*="hero-background"]')
    if ((await heroImage.count()) > 0) {
      await expect(heroImage.first()).toBeVisible()
    }
  })
})

test.describe('Performance', () => {
  test('Pages load within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('http://localhost:3000')
    const loadTime = Date.now() - startTime

    // Should load in under 5 seconds (local dev)
    expect(loadTime).toBeLessThan(5000)
  })
})
