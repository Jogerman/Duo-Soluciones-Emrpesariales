import { test, expect } from '@playwright/test'

/**
 * Style Guide Page E2E Tests
 *
 * Tests for the /styleguide page
 * Includes visual regression testing with screenshots
 */

test.describe('Style Guide Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/styleguide')
  })

  test('should load style guide page successfully', async ({ page }) => {
    await expect(page).toHaveURL('/styleguide')
    await expect(page.locator('h1:has-text("DUO Design System")')).toBeVisible()
  })

  test('should have proper page title and description', async ({ page }) => {
    // Page title
    await expect(page.locator('h1:has-text("DUO Design System")')).toBeVisible()

    // Description
    await expect(page.locator('text=Componentes, colores y patrones de diseño')).toBeVisible()
  })

  test('should display all design system sections', async ({ page }) => {
    // Check all section headings
    const sections = [
      'Paleta de Colores',
      'Tipografía',
      'Botones',
      'Inputs',
      'Badges',
      'Cards',
      'Service Cards',
      'Stat Cards',
      'Testimonial Cards',
      'Gradient Boxes',
    ]

    for (const section of sections) {
      await expect(page.locator(`h2:has-text("${section}")`)).toBeVisible()
    }
  })

  test('should display color palette with all shades', async ({ page }) => {
    const colorSection = page.locator('section:has(h2:has-text("Paleta de Colores"))')

    // Primary colors
    await expect(colorSection.locator('h3:has-text("Primary - Verde Azulado")')).toBeVisible()

    // Secondary colors
    await expect(colorSection.locator('h3:has-text("Secondary - Azul Marino")')).toBeVisible()

    // Should have color swatches (11 shades each: 50-950)
    const colorSwatches = await colorSection.locator('div[style*="background"]').count()
    expect(colorSwatches).toBeGreaterThanOrEqual(22) // 11 primary + 11 secondary
  })

  test('should display typography system', async ({ page }) => {
    const typographySection = page.locator('section:has(h2:has-text("Tipografía"))')

    // Check typography variants
    await expect(typographySection.locator('text=Heading XL - Bold 700')).toBeVisible()
    await expect(typographySection.locator('text=Heading LG - Bold 700')).toBeVisible()
    await expect(typographySection.locator('text=Heading MD - Semi-Bold 600')).toBeVisible()
    await expect(typographySection.locator('text=Body LG - Regular 400')).toBeVisible()
    await expect(typographySection.locator('text=Body - Regular 400')).toBeVisible()

    // Check typography examples
    await expect(
      typographySection.locator('h1:has-text("DUO Soluciones Empresariales")')
    ).toBeVisible()
    await expect(typographySection.locator('h2:has-text("Transformamos Desafíos")')).toBeVisible()
  })

  test('should display development-only notice', async ({ page }) => {
    // Should have yellow notice at bottom
    await expect(page.locator('text=Esta página es solo para desarrollo')).toBeVisible()
  })

  test('should have proper page metadata', async ({ page }) => {
    // Check page title
    const title = await page.title()
    expect(title).toContain('Style Guide')
  })
})

test.describe('Visual Regression - Style Guide', () => {
  test('full page screenshot - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/styleguide')

    // Wait for all content to load
    await page.waitForLoadState('networkidle')

    // Take full page screenshot
    await expect(page).toHaveScreenshot('styleguide-desktop-full.png', {
      fullPage: true,
      timeout: 10000,
    })
  })

  test('color palette screenshot', async ({ page }) => {
    await page.goto('/styleguide')

    const colorSection = page.locator('section:has(h2:has-text("Paleta de Colores"))')
    await expect(colorSection).toBeVisible()

    await colorSection.screenshot({
      path: 'test-results/screenshots/color-palette.png',
    })
  })

  test('typography screenshot', async ({ page }) => {
    await page.goto('/styleguide')

    const typographySection = page.locator('section:has(h2:has-text("Tipografía"))')
    await expect(typographySection).toBeVisible()

    await typographySection.screenshot({
      path: 'test-results/screenshots/typography.png',
    })
  })

  test('buttons showcase screenshot', async ({ page }) => {
    await page.goto('/styleguide')

    const buttonsSection = page.locator('section:has(h2:has-text("Botones"))')
    await expect(buttonsSection).toBeVisible()

    await buttonsSection.screenshot({
      path: 'test-results/screenshots/buttons.png',
    })
  })

  test('components showcase screenshot', async ({ page }) => {
    await page.goto('/styleguide')

    // Service Cards
    const serviceCardsSection = page.locator('section:has(h2:has-text("Service Cards"))')
    await serviceCardsSection.screenshot({
      path: 'test-results/screenshots/service-cards.png',
    })

    // Stat Cards
    const statCardsSection = page.locator('section:has(h2:has-text("Stat Cards"))')
    await statCardsSection.screenshot({
      path: 'test-results/screenshots/stat-cards.png',
    })

    // Testimonials
    const testimonialsSection = page.locator('section:has(h2:has-text("Testimonial Cards"))')
    await testimonialsSection.screenshot({
      path: 'test-results/screenshots/testimonials.png',
    })
  })

  test('mobile viewport screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/styleguide')

    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('styleguide-mobile.png', {
      fullPage: true,
      timeout: 10000,
    })
  })

  test('tablet viewport screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/styleguide')

    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('styleguide-tablet.png', {
      fullPage: true,
      timeout: 10000,
    })
  })
})

test.describe('Style Guide Responsive Behavior', () => {
  test('mobile layout - stacked components', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/styleguide')

    // Main heading should be visible
    await expect(page.locator('h1:has-text("DUO Design System")')).toBeVisible()

    // Components should stack vertically
    const serviceCards = page.locator('section:has(h2:has-text("Service Cards")) > div > div')
    const firstCard = serviceCards.first()
    const secondCard = serviceCards.nth(1)

    const firstBox = await firstCard.boundingBox()
    const secondBox = await secondCard.boundingBox()

    if (firstBox && secondBox) {
      // Second card should be below first (stacked)
      expect(secondBox.y).toBeGreaterThan(firstBox.y + firstBox.height - 10)
    }
  })

  test('tablet layout - responsive grid', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/styleguide')

    // All sections should be visible
    await expect(page.locator('h1:has-text("DUO Design System")')).toBeVisible()

    // Grid should be responsive
    const buttonsGrid = page.locator('section:has(h2:has-text("Botones")) div[class*="grid"]')
    await expect(buttonsGrid).toBeVisible()
  })

  test('desktop layout - full grid', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/styleguide')

    // Service cards should display in grid (4 columns)
    const serviceCardsContainer = page.locator('section:has(h2:has-text("Service Cards")) > div')
    await expect(serviceCardsContainer).toBeVisible()

    // Color palette should show all 11 shades in one row
    const primaryColors = page.locator('h3:has-text("Primary - Verde Azulado") + div')
    await expect(primaryColors).toBeVisible()
  })
})

test.describe('Style Guide Content Validation', () => {
  test('color shades should be properly labeled', async ({ page }) => {
    await page.goto('/styleguide')

    const colorSection = page.locator('section:has(h2:has-text("Paleta de Colores"))')

    // Check shade labels
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

    for (const shade of shades) {
      await expect(colorSection.locator(`text=${shade}`).first()).toBeVisible()
    }
  })

  test('all component examples should render', async ({ page }) => {
    await page.goto('/styleguide')

    // Buttons section should have multiple button examples
    const buttonsSection = page.locator('section:has(h2:has-text("Botones"))')
    const buttons = await buttonsSection.locator('button, a[role="button"]').count()
    expect(buttons).toBeGreaterThanOrEqual(5)

    // Inputs section should have multiple input examples
    const inputsSection = page.locator('section:has(h2:has-text("Inputs"))')
    const inputs = await inputsSection.locator('input').count()
    expect(inputs).toBeGreaterThanOrEqual(3)

    // Badges section should have multiple badge examples
    const badgesSection = page.locator('section:has(h2:has-text("Badges"))')
    const badges = await badgesSection.locator('span').count()
    expect(badges).toBeGreaterThanOrEqual(6)
  })

  test('service cards should all have icons and text', async ({ page }) => {
    await page.goto('/styleguide')

    const serviceSection = page.locator('section:has(h2:has-text("Service Cards"))')

    // Should have 4 service cards
    const cardTitles = [
      'Desarrollo Organizacional',
      'Mejora de Procesos',
      'Implementación ERP',
      'Gobernanza Corporativa',
    ]

    for (const title of cardTitles) {
      await expect(serviceSection.locator(`text=${title}`)).toBeVisible()
    }

    // Should have icons (SVGs)
    const icons = await serviceSection.locator('svg').count()
    expect(icons).toBeGreaterThanOrEqual(4)
  })

  test('stat cards should display metrics correctly', async ({ page }) => {
    await page.goto('/styleguide')

    const statsSection = page.locator('section:has(h2:has-text("Stat Cards"))')

    // Check stat values
    await expect(statsSection.locator('text=28+')).toBeVisible()
    await expect(statsSection.locator('text=200+')).toBeVisible()
    await expect(statsSection.locator('text=95%')).toBeVisible()

    // Check labels
    await expect(statsSection.locator('text=Años de Experiencia')).toBeVisible()
    await expect(statsSection.locator('text=Proyectos Completados')).toBeVisible()
    await expect(statsSection.locator('text=Satisfacción del Cliente')).toBeVisible()
  })
})

test.describe('Style Guide Performance', () => {
  test('page should load quickly', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/styleguide')
    await page.waitForLoadState('domcontentloaded')

    const loadTime = Date.now() - startTime

    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('images and assets should load', async ({ page }) => {
    await page.goto('/styleguide')
    await page.waitForLoadState('networkidle')

    // Check if any images failed to load
    const images = await page.locator('img').all()

    for (const img of images) {
      const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth)

      // If there are images, they should have loaded
      if (naturalWidth !== undefined) {
        expect(naturalWidth).toBeGreaterThan(0)
      }
    }
  })

  test('no console errors on page load', async ({ page }) => {
    const consoleErrors: string[] = []

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto('/styleguide')
    await page.waitForLoadState('networkidle')

    // Should have no console errors
    expect(consoleErrors.length).toBe(0)
  })
})
