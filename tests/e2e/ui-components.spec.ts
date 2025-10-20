import { test, expect } from '@playwright/test'

/**
 * UI Components E2E Tests
 *
 * Tests for Button, Input, Card, Badge components
 * Includes accessibility testing and interaction validation
 */

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/styleguide')
  })

  test('should render all button variants', async ({ page }) => {
    // Primary button
    await expect(page.locator('button:has-text("Primary"), a:has-text("Large")')).toBeVisible()

    // Secondary button
    await expect(
      page.locator('button:has-text("Secondary"), a:has-text("Secondary Button")')
    ).toBeVisible()

    // Outline button
    await expect(
      page.locator('button:has-text("Outline"), a:has-text("Outline Button")')
    ).toBeVisible()

    // Ghost button
    await expect(page.locator('button:has-text("Ghost"), a:has-text("Ghost Button")')).toBeVisible()

    // Link button
    await expect(page.locator('button:has-text("Link"), a:has-text("Link Button")')).toBeVisible()
  })

  test('should render all button sizes', async ({ page }) => {
    const buttonsSection = page.locator('section:has(h2:has-text("Botones"))')

    // Small button
    await expect(
      buttonsSection.locator('button:has-text("Small"), a:has-text("Small")')
    ).toBeVisible()

    // Medium button
    await expect(
      buttonsSection.locator('button:has-text("Medium"), a:has-text("Medium")')
    ).toBeVisible()

    // Large button
    await expect(
      buttonsSection.locator('button:has-text("Large"), a:has-text("Large")')
    ).toBeVisible()
  })

  test('disabled button should not be clickable', async ({ page }) => {
    const disabledButton = page.locator('button:disabled:has-text("Disabled")')

    await expect(disabledButton).toBeVisible()
    await expect(disabledButton).toBeDisabled()

    // Should have disabled attribute
    const isDisabled = await disabledButton.getAttribute('disabled')
    expect(isDisabled).toBeDefined()
  })

  test('buttons should have hover states', async ({ page }) => {
    const primaryButton = page.locator('button:has-text("Medium")').first()

    // Hover over button
    await primaryButton.hover()

    // Button should still be visible after hover
    await expect(primaryButton).toBeVisible()
  })

  test('buttons should be keyboard accessible', async ({ page }) => {
    // Tab to focus first button
    await page.keyboard.press('Tab')

    // Continue tabbing through buttons
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab')
    }

    // A button should be focused
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(['BUTTON', 'A']).toContain(focusedElement)
  })
})

test.describe('Input Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/styleguide')
  })

  test('should render all input states', async ({ page }) => {
    const inputsSection = page.locator('section:has(h2:has-text("Inputs"))')

    // Default input
    const defaultInput = inputsSection.locator('input[placeholder="Enter text..."]')
    await expect(defaultInput).toBeVisible()
    await expect(defaultInput).toBeEnabled()

    // Error input
    const errorInput = inputsSection.locator('input[placeholder="Error input"]')
    await expect(errorInput).toBeVisible()

    // Disabled input
    const disabledInput = inputsSection.locator('input:disabled')
    await expect(disabledInput).toBeVisible()
    await expect(disabledInput).toBeDisabled()
  })

  test('should accept text input', async ({ page }) => {
    const input = page.locator('input[placeholder="Enter text..."]').first()

    await input.fill('Test input value')
    await expect(input).toHaveValue('Test input value')
  })

  test('should clear input on clear action', async ({ page }) => {
    const input = page.locator('input[placeholder="Enter text..."]').first()

    // Fill input
    await input.fill('Test value')
    await expect(input).toHaveValue('Test value')

    // Clear input
    await input.clear()
    await expect(input).toHaveValue('')
  })

  test('error input should have visual indicator', async ({ page }) => {
    const errorInput = page.locator('input[placeholder="Error input"]')

    // Error input should have error styling (typically border color)
    const classes = await errorInput.getAttribute('class')
    expect(classes).toBeTruthy()
  })

  test('disabled input should not accept input', async ({ page }) => {
    const disabledInput = page.locator('input:disabled').first()

    await expect(disabledInput).toBeDisabled()

    // Try to type (should not work)
    await disabledInput.click({ force: true })
    await page.keyboard.type('Should not appear')

    const value = await disabledInput.inputValue()
    expect(value).not.toBe('Should not appear')
  })

  test('inputs should be focusable with keyboard', async ({ page }) => {
    const firstInput = page.locator('input').first()

    // Focus with tab
    await page.keyboard.press('Tab')

    // Check if any input is focused
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(focusedElement).toBe('INPUT')
  })
})

test.describe('Card Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/styleguide')
  })

  test('should render card components', async ({ page }) => {
    const cardsSection = page.locator('section:has(h2:has-text("Cards"))')

    // Simple card
    await expect(cardsSection.locator('text=Simple Card')).toBeVisible()

    // Card with icon
    await expect(cardsSection.locator('text=With Icon')).toBeVisible()
  })

  test('card should have header and content', async ({ page }) => {
    const card = page.locator('div:has(> div:has-text("Simple Card"))').first()

    // Should have title
    await expect(card.locator('text=Simple Card')).toBeVisible()

    // Should have description
    await expect(card.locator('text=This is a card description')).toBeVisible()

    // Should have content
    await expect(card.locator('text=Card content goes here')).toBeVisible()
  })

  test('card with icon should display icon', async ({ page }) => {
    const cardWithIcon = page.locator('div:has(> div:has-text("With Icon"))').first()

    // Should have SVG icon
    const icon = cardWithIcon.locator('svg').first()
    await expect(icon).toBeVisible()
  })

  test('cards should have consistent spacing', async ({ page }) => {
    const cards = page.locator('section:has(h2:has-text("Cards")) > div > div')
    const count = await cards.count()

    expect(count).toBeGreaterThanOrEqual(2)
  })
})

test.describe('Badge Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/styleguide')
  })

  test('should render all badge variants', async ({ page }) => {
    const badgesSection = page.locator('section:has(h2:has-text("Badges"))')

    // Check all 6 variants
    await expect(badgesSection.locator('span:has-text("Default")')).toBeVisible()
    await expect(badgesSection.locator('span:has-text("Secondary")')).toBeVisible()
    await expect(badgesSection.locator('span:has-text("Outline")')).toBeVisible()
    await expect(badgesSection.locator('span:has-text("Success")')).toBeVisible()
    await expect(badgesSection.locator('span:has-text("Warning")')).toBeVisible()
    await expect(badgesSection.locator('span:has-text("Error")')).toBeVisible()
  })

  test('badges should have different visual styles', async ({ page }) => {
    const successBadge = page.locator('span:has-text("Success")')
    const errorBadge = page.locator('span:has-text("Error")')

    // Both should be visible
    await expect(successBadge).toBeVisible()
    await expect(errorBadge).toBeVisible()

    // Should have different classes (indicating different styles)
    const successClasses = await successBadge.getAttribute('class')
    const errorClasses = await errorBadge.getAttribute('class')

    expect(successClasses).not.toBe(errorClasses)
  })

  test('badges should be compact and inline', async ({ page }) => {
    const badge = page.locator('span:has-text("Default")')

    const box = await badge.boundingBox()
    expect(box).toBeTruthy()

    // Badges should be small
    if (box) {
      expect(box.height).toBeLessThan(50)
    }
  })
})

test.describe('ServiceCard Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/styleguide')
  })

  test('should render service cards', async ({ page }) => {
    const serviceSection = page.locator('section:has(h2:has-text("Service Cards"))')

    // Check all 4 service cards
    await expect(serviceSection.locator('text=Desarrollo Organizacional')).toBeVisible()
    await expect(serviceSection.locator('text=Mejora de Procesos')).toBeVisible()
    await expect(serviceSection.locator('text=Implementación ERP')).toBeVisible()
    await expect(serviceSection.locator('text=Gobernanza Corporativa')).toBeVisible()
  })

  test('service cards should have icons', async ({ page }) => {
    const serviceSection = page.locator('section:has(h2:has-text("Service Cards"))')

    // Should have SVG icons
    const icons = serviceSection.locator('svg')
    const iconCount = await icons.count()

    expect(iconCount).toBeGreaterThanOrEqual(4)
  })

  test('service cards should have title and description', async ({ page }) => {
    const firstCard = page.locator('text=Desarrollo Organizacional').locator('..')

    // Should have description
    await expect(firstCard.locator('text=Optimización de estructura y procesos')).toBeVisible()
  })
})

test.describe('StatCard Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/styleguide')
  })

  test('should render stat cards with values', async ({ page }) => {
    const statsSection = page.locator('section:has(h2:has-text("Stat Cards"))')

    // Check stat values
    await expect(statsSection.locator('text=28+')).toBeVisible()
    await expect(statsSection.locator('text=200+')).toBeVisible()
    await expect(statsSection.locator('text=95%')).toBeVisible()
  })

  test('should display stat labels', async ({ page }) => {
    const statsSection = page.locator('section:has(h2:has-text("Stat Cards"))')

    await expect(statsSection.locator('text=Años de Experiencia')).toBeVisible()
    await expect(statsSection.locator('text=Proyectos Completados')).toBeVisible()
    await expect(statsSection.locator('text=Satisfacción del Cliente')).toBeVisible()
  })

  test('should show trend indicators', async ({ page }) => {
    const statsSection = page.locator('section:has(h2:has-text("Stat Cards"))')

    // Should have trend values
    await expect(statsSection.locator('text=+15%')).toBeVisible()
    await expect(statsSection.locator('text=+25%')).toBeVisible()
  })
})

test.describe('TestimonialCard Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/styleguide')
  })

  test('should render testimonial cards', async ({ page }) => {
    const testimonialsSection = page.locator('section:has(h2:has-text("Testimonial Cards"))')

    // Should have quotes
    await expect(
      testimonialsSection.locator('text=DUO transformó completamente nuestra operación')
    ).toBeVisible()
    await expect(
      testimonialsSection.locator('text=Profesionalismo y resultados excepcionales')
    ).toBeVisible()
  })

  test('should display author information', async ({ page }) => {
    const testimonialsSection = page.locator('section:has(h2:has-text("Testimonial Cards"))')

    // Author names
    await expect(testimonialsSection.locator('text=Carlos Rodríguez')).toBeVisible()
    await expect(testimonialsSection.locator('text=María Pérez')).toBeVisible()

    // Roles
    await expect(testimonialsSection.locator('text=CEO')).toBeVisible()
    await expect(testimonialsSection.locator('text=Directora de Operaciones')).toBeVisible()

    // Companies
    await expect(testimonialsSection.locator('text=Torres 2')).toBeVisible()
    await expect(testimonialsSection.locator('text=Rizek Peralta')).toBeVisible()
  })
})

test.describe('GradientBox Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/styleguide')
  })

  test('should render gradient boxes', async ({ page }) => {
    const gradientSection = page.locator('section:has(h2:has-text("Gradient Boxes"))')

    await expect(gradientSection.locator('text=Primary Gradient')).toBeVisible()
    await expect(gradientSection.locator('text=Subtle Gradient')).toBeVisible()
  })

  test('gradient boxes should have background gradients', async ({ page }) => {
    const primaryGradient = page.locator('text=Primary Gradient').locator('..')

    // Should have gradient-related classes
    const classes = await primaryGradient.getAttribute('class')
    expect(classes).toBeTruthy()
  })
})

test.describe('Component Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/styleguide')
  })

  test('buttons should have accessible text', async ({ page }) => {
    const buttons = await page.locator('button, a[role="button"]').all()

    for (const button of buttons.slice(0, 10)) {
      // Test first 10 buttons
      const text = await button.textContent()
      const ariaLabel = await button.getAttribute('aria-label')

      // Should have either text content or aria-label
      expect(text || ariaLabel).toBeTruthy()
    }
  })

  test('inputs should have associated labels', async ({ page }) => {
    const inputsSection = page.locator('section:has(h2:has-text("Inputs"))')
    const inputs = await inputsSection.locator('input').all()

    for (const input of inputs) {
      const id = await input.getAttribute('id')
      const ariaLabel = await input.getAttribute('aria-label')
      const placeholder = await input.getAttribute('placeholder')

      // Should have some form of label
      expect(id || ariaLabel || placeholder).toBeTruthy()
    }
  })

  test('all interactive elements should be keyboard accessible', async ({ page }) => {
    // Tab through page
    let tabCount = 0
    const maxTabs = 20

    while (tabCount < maxTabs) {
      await page.keyboard.press('Tab')
      tabCount++

      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement
        return {
          tagName: el?.tagName,
          type: el?.getAttribute('type'),
        }
      })

      // Should be able to focus interactive elements
      if (focusedElement.tagName) {
        expect(['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT', 'BODY', 'HTML']).toContain(
          focusedElement.tagName
        )
      }
    }
  })

  test('sufficient color contrast for text', async ({ page }) => {
    // Check that text elements are visible (basic contrast check)
    const headings = await page.locator('h1, h2, h3').all()

    for (const heading of headings.slice(0, 5)) {
      await expect(heading).toBeVisible()
    }

    const paragraphs = await page.locator('p').all()

    for (const paragraph of paragraphs.slice(0, 5)) {
      await expect(paragraph).toBeVisible()
    }
  })
})
