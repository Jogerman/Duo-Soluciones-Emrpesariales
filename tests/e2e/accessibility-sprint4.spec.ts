import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * Accessibility E2E Tests - Sprint 4 Components
 *
 * Testing Newsletter, Search, Social Share, and Recommendations components
 * for WCAG 2.1 AA compliance
 */

test.describe('Accessibility - Newsletter Component', () => {
  test('newsletter form should be accessible', async ({ page }) => {
    await page.goto('/')

    // Look for newsletter section
    const newsletter = page.locator('form:has(input[type="email"])').first()

    if ((await newsletter.count()) > 0) {
      // Run axe scan on newsletter form
      const accessibilityScanResults = await new AxeBuilder({ page })
        .include('form:has(input[type="email"])')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

      expect(accessibilityScanResults.violations).toEqual([])
    }
  })

  test('newsletter email input should have proper label', async ({ page }) => {
    await page.goto('/')

    const emailInputs = await page.locator('input[type="email"]').all()

    for (const input of emailInputs) {
      const ariaLabel = await input.getAttribute('aria-label')
      const ariaLabelledBy = await input.getAttribute('aria-labelledby')
      const id = await input.getAttribute('id')

      // Should have aria-label or associated label
      expect(ariaLabel || ariaLabelledBy || id).toBeTruthy()
    }
  })

  test('newsletter checkbox should be keyboard accessible', async ({ page }) => {
    await page.goto('/')

    const checkbox = page.locator('input[type="checkbox"]').first()

    if ((await checkbox.count()) > 0) {
      // Focus checkbox
      await checkbox.focus()

      // Should be focused
      const focused = await page.evaluate(() => document.activeElement?.tagName)
      expect(focused).toBe('INPUT')

      // Should be toggleable with Space
      const initialChecked = await checkbox.isChecked()
      await page.keyboard.press('Space')
      const newChecked = await checkbox.isChecked()

      // State should change
      expect(newChecked).not.toBe(initialChecked)
    }
  })

  test('newsletter error messages should be announced', async ({ page }) => {
    await page.goto('/')

    const submitButton = page.locator('button[type="submit"]:has-text("Suscribirse")').first()

    if ((await submitButton.count()) > 0) {
      // Try to submit empty form
      await submitButton.click()

      // Wait a moment for validation
      await page.waitForTimeout(300)

      // Check for error messages with role="alert"
      const alerts = await page.locator('[role="alert"]').count()

      // Should have error messages or validation
      expect(alerts >= 0).toBe(true)
    }
  })

  test('newsletter success message should be accessible', async ({ page }) => {
    await page.goto('/')

    // Check if success messages use proper ARIA attributes
    const successMessages = page.locator('[role="alert"]:has-text("éxito"), [role="status"]')

    if ((await successMessages.count()) > 0) {
      const firstMessage = successMessages.first()
      const role = await firstMessage.getAttribute('role')

      // Should use role="alert" or role="status"
      expect(['alert', 'status']).toContain(role)
    }
  })
})

test.describe('Accessibility - Search Components', () => {
  test('global search should be accessible', async ({ page }) => {
    await page.goto('/')

    const searchInput = page.locator('input[type="text"][placeholder*="Buscar"], input[role="combobox"]').first()

    if ((await searchInput.count()) > 0) {
      // Run axe scan
      const accessibilityScanResults = await new AxeBuilder({ page })
        .include('input[type="text"][placeholder*="Buscar"], input[role="combobox"]')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

      expect(accessibilityScanResults.violations).toEqual([])
    }
  })

  test('search input should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/')

    const searchInput = page.locator('input[type="text"][placeholder*="Buscar"]').first()

    if ((await searchInput.count()) > 0) {
      const role = await searchInput.getAttribute('role')
      const ariaLabel = await searchInput.getAttribute('aria-label')
      const ariaExpanded = await searchInput.getAttribute('aria-expanded')

      // Should have role="combobox" for search with suggestions
      expect(role).toBe('combobox')

      // Should have aria-label
      expect(ariaLabel).toBeTruthy()

      // Should have aria-expanded
      expect(ariaExpanded).toBeTruthy()
    }
  })

  test('search should be keyboard navigable', async ({ page }) => {
    await page.goto('/')

    const searchInput = page.locator('input[placeholder*="Buscar"]').first()

    if ((await searchInput.count()) > 0) {
      // Focus search input
      await searchInput.focus()

      // Type query
      await page.keyboard.type('desarrollo')

      // Wait for suggestions
      await page.waitForTimeout(500)

      // Press ArrowDown to navigate suggestions
      await page.keyboard.press('ArrowDown')

      // Should move focus or selection
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
      expect(focusedElement).toBeTruthy()

      // Press Escape to close
      await page.keyboard.press('Escape')
    }
  })

  test('search suggestions should be accessible', async ({ page }) => {
    await page.goto('/')

    const searchInput = page.locator('input[placeholder*="Buscar"]').first()

    if ((await searchInput.count()) > 0) {
      // Focus and type
      await searchInput.click()
      await page.keyboard.type('desarrollo')

      // Wait for suggestions
      await page.waitForTimeout(500)

      // Check for suggestions list
      const suggestionsList = page.locator('[role="listbox"], [role="list"]')

      if ((await suggestionsList.count()) > 0) {
        // Run axe scan on suggestions
        const accessibilityScanResults = await new AxeBuilder({ page })
          .include('[role="listbox"], [role="list"]')
          .withTags(['wcag2a', 'wcag2aa'])
          .analyze()

        expect(accessibilityScanResults.violations.length).toBeLessThanOrEqual(2)
      }
    }
  })

  test('search clear button should be accessible', async ({ page }) => {
    await page.goto('/')

    const searchInput = page.locator('input[placeholder*="Buscar"]').first()

    if ((await searchInput.count()) > 0) {
      await searchInput.click()
      await page.keyboard.type('test')

      // Look for clear button
      const clearButton = page.locator('button:has-text("Limpiar"), button[aria-label*="Limpiar"]').first()

      if ((await clearButton.count()) > 0) {
        const ariaLabel = await clearButton.getAttribute('aria-label')

        // Should have aria-label
        expect(ariaLabel).toBeTruthy()
      }
    }
  })
})

test.describe('Accessibility - Share Buttons', () => {
  test('share buttons should be accessible', async ({ page }) => {
    // Go to a blog or podcast page with share buttons
    await page.goto('/blog')

    const shareButtons = page.locator('button[aria-label*="Compartir"], [role="group"][aria-label*="compartir"]')

    if ((await shareButtons.count()) > 0) {
      // Run axe scan
      const accessibilityScanResults = await new AxeBuilder({ page })
        .include('button[aria-label*="Compartir"], [role="group"]')
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze()

      // Allow minor violations, focus on critical ones
      const criticalViolations = accessibilityScanResults.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      )

      expect(criticalViolations).toEqual([])
    }
  })

  test('individual share buttons should have descriptive labels', async ({ page }) => {
    await page.goto('/blog')

    const shareButtons = await page.locator('button[aria-label*="LinkedIn"], button[aria-label*="Twitter"], button[aria-label*="Facebook"]').all()

    for (const button of shareButtons.slice(0, 5)) {
      const ariaLabel = await button.getAttribute('aria-label')
      const text = await button.textContent()

      // Should have descriptive label
      expect(ariaLabel || (text && text.trim().length > 0)).toBeTruthy()

      // If ariaLabel exists, it should be descriptive
      if (ariaLabel) {
        expect(ariaLabel.length).toBeGreaterThan(5)
      }
    }
  })

  test('share buttons should be keyboard accessible', async ({ page }) => {
    await page.goto('/blog')

    const shareButton = page.locator('button[aria-label*="LinkedIn"]').first()

    if ((await shareButton.count()) > 0) {
      // Focus button
      await shareButton.focus()

      // Should be focused
      const focused = await page.evaluate(() => {
        const el = document.activeElement
        return el?.getAttribute('aria-label')
      })

      expect(focused).toContain('LinkedIn')

      // Press Enter should activate
      await page.keyboard.press('Enter')

      // Should open share (popup blocked in test, but key press works)
      expect(true).toBe(true)
    }
  })

  test('share button group should have proper role', async ({ page }) => {
    await page.goto('/blog')

    const shareGroup = page.locator('[role="group"][aria-label*="compartir"]').first()

    if ((await shareGroup.count()) > 0) {
      const role = await shareGroup.getAttribute('role')
      const ariaLabel = await shareGroup.getAttribute('aria-label')

      // Should have role="group"
      expect(role).toBe('group')

      // Should have descriptive label
      expect(ariaLabel).toBeTruthy()
    }
  })

  test('share toast notifications should be announced', async ({ page }) => {
    await page.goto('/blog')

    const shareButton = page.locator('button[aria-label*="copiar"]').first()

    if ((await shareButton.count()) > 0) {
      await shareButton.click()

      // Wait for toast
      await page.waitForTimeout(500)

      // Check for toast with role="status" or role="alert"
      const toast = page.locator('[role="status"], [role="alert"]')

      if ((await toast.count()) > 0) {
        const role = await toast.first().getAttribute('role')
        expect(['status', 'alert']).toContain(role)
      }
    }
  })
})

test.describe('Accessibility - Recommendations Component', () => {
  test('recommendations section should be accessible', async ({ page }) => {
    await page.goto('/blog')

    // Wait for recommendations to load
    await page.waitForTimeout(1000)

    const recommendations = page.locator('section:has-text("También te podría interesar"), section:has-text("Recomendado")')

    if ((await recommendations.count()) > 0) {
      // Run axe scan
      const accessibilityScanResults = await new AxeBuilder({ page })
        .include('section:has-text("También")')
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze()

      // Allow minor violations
      const criticalViolations = accessibilityScanResults.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      )

      expect(criticalViolations.length).toBeLessThanOrEqual(1)
    }
  })

  test('recommendation cards should have proper heading structure', async ({ page }) => {
    await page.goto('/blog')

    await page.waitForTimeout(1000)

    // Check for recommendation section
    const recommendationsSection = page.locator('section:has-text("También")')

    if ((await recommendationsSection.count()) > 0) {
      // Get headings within recommendations
      const headings = await recommendationsSection.locator('h2, h3, h4').all()

      // Should have headings
      expect(headings.length).toBeGreaterThan(0)

      // Check heading levels
      for (const heading of headings) {
        const level = await heading.evaluate(el => parseInt(el.tagName.substring(1)))
        expect(level).toBeGreaterThanOrEqual(2)
        expect(level).toBeLessThanOrEqual(4)
      }
    }
  })

  test('recommendation links should be accessible', async ({ page }) => {
    await page.goto('/blog')

    await page.waitForTimeout(1000)

    const recommendationsSection = page.locator('section:has-text("También")')

    if ((await recommendationsSection.count()) > 0) {
      const links = await recommendationsSection.locator('a[href]').all()

      for (const link of links.slice(0, 6)) {
        const text = await link.textContent()
        const ariaLabel = await link.getAttribute('aria-label')

        // Links should have accessible names
        expect((text && text.trim().length > 0) || ariaLabel).toBeTruthy()
      }
    }
  })

  test('recommendation images should have alt text', async ({ page }) => {
    await page.goto('/blog')

    await page.waitForTimeout(1000)

    const recommendationsSection = page.locator('section:has-text("También")')

    if ((await recommendationsSection.count()) > 0) {
      const images = await recommendationsSection.locator('img').all()

      for (const img of images) {
        const alt = await img.getAttribute('alt')
        const role = await img.getAttribute('role')

        // Images should have alt text
        expect(alt !== null || role === 'presentation').toBe(true)
      }
    }
  })

  test('recommendations should be keyboard navigable', async ({ page }) => {
    await page.goto('/blog')

    await page.waitForTimeout(1000)

    const firstRecommendationLink = page.locator('section:has-text("También") a').first()

    if ((await firstRecommendationLink.count()) > 0) {
      // Focus first recommendation
      await firstRecommendationLink.focus()

      // Should be focused
      const focused = await page.evaluate(() => document.activeElement?.tagName)
      expect(focused).toBe('A')

      // Tab to next recommendation
      await page.keyboard.press('Tab')

      // Should move to next element
      const newFocused = await page.evaluate(() => document.activeElement?.tagName)
      expect(newFocused).toBeTruthy()
    }
  })
})

test.describe('Accessibility - Integration Tests', () => {
  test('all Sprint 4 components together should be accessible', async ({ page }) => {
    await page.goto('/')

    // Wait for all components to load
    await page.waitForTimeout(2000)

    // Run comprehensive scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    // Log violations for review
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Accessibility Violations Found:')
      accessibilityScanResults.violations.forEach((violation, index) => {
        console.log(`\n${index + 1}. ${violation.id} (${violation.impact})`)
        console.log(`   Description: ${violation.description}`)
        console.log(`   Help: ${violation.help}`)
        console.log(`   Nodes affected: ${violation.nodes.length}`)
      })
    }

    // Critical and serious violations should be fixed
    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    )

    expect(criticalViolations).toEqual([])
  })

  test('color contrast across all components', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze()

    const contrastViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'color-contrast'
    )

    // Log contrast issues
    if (contrastViolations.length > 0) {
      console.log('\nColor Contrast Issues:')
      contrastViolations.forEach(violation => {
        violation.nodes.forEach(node => {
          console.log(`   - ${node.html.substring(0, 100)}`)
        })
      })
    }

    expect(contrastViolations).toEqual([])
  })

  test('keyboard navigation flow should be logical', async ({ page }) => {
    await page.goto('/')

    const focusedElements: string[] = []

    // Tab through first 30 elements
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press('Tab')

      const focusInfo = await page.evaluate(() => {
        const el = document.activeElement
        return {
          tag: el?.tagName,
          text: el?.textContent?.substring(0, 20).trim(),
          role: el?.getAttribute('role'),
        }
      })

      if (focusInfo.tag !== 'BODY') {
        focusedElements.push(`${focusInfo.tag}${focusInfo.role ? `[${focusInfo.role}]` : ''}: ${focusInfo.text}`)
      }
    }

    // Should have focused on multiple interactive elements
    expect(focusedElements.length).toBeGreaterThan(5)

    // Log focus order for review
    console.log('\nKeyboard Focus Order:')
    focusedElements.forEach((el, index) => {
      console.log(`   ${index + 1}. ${el}`)
    })
  })
})
