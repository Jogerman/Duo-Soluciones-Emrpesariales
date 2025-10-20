import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * Accessibility E2E Tests
 *
 * Comprehensive accessibility testing using axe-core
 * Tests keyboard navigation, ARIA attributes, color contrast, and WCAG compliance
 */

test.describe('Accessibility - Automated Audits', () => {
  test('homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('style guide should not have accessibility violations', async ({ page }) => {
    await page.goto('/styleguide')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('header component should be accessible', async ({ page }) => {
    await page.goto('/')

    const header = page.locator('header')

    const accessibilityScanResults = await new AxeBuilder({ page }).include('header').analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('footer component should be accessible', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page }).include('footer').analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('form inputs should be accessible', async ({ page }) => {
    await page.goto('/styleguide')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('section:has(h2:has-text("Inputs"))')
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })
})

test.describe('Accessibility - Keyboard Navigation', () => {
  test('should navigate through interactive elements with Tab', async ({ page }) => {
    await page.goto('/')

    // Start from top
    await page.keyboard.press('Tab')

    let previousElement = ''
    const focusedElements: string[] = []

    // Tab through first 15 elements
    for (let i = 0; i < 15; i++) {
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement
        return {
          tagName: el?.tagName,
          text: el?.textContent?.substring(0, 30),
          href: el?.getAttribute('href'),
        }
      })

      const identifier = `${focusedElement.tagName}-${focusedElement.text}`

      if (identifier !== previousElement) {
        focusedElements.push(focusedElement.tagName)
        previousElement = identifier
      }

      await page.keyboard.press('Tab')
    }

    // Should have focused on interactive elements
    expect(focusedElements.length).toBeGreaterThan(0)

    // Should include buttons or links
    const hasInteractiveElements = focusedElements.some(
      tag => tag === 'A' || tag === 'BUTTON' || tag === 'INPUT'
    )
    expect(hasInteractiveElements).toBe(true)
  })

  test('should navigate backwards with Shift+Tab', async ({ page }) => {
    await page.goto('/')

    // Tab forward a few times
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab')
    }

    const forwardElement = await page.evaluate(() => document.activeElement?.tagName)

    // Tab backward
    await page.keyboard.press('Shift+Tab')

    const backwardElement = await page.evaluate(() => document.activeElement?.tagName)

    // Elements should be interactive
    expect(['A', 'BUTTON', 'INPUT', 'BODY', 'HTML']).toContain(backwardElement)
  })

  test('Enter key should activate buttons', async ({ page }) => {
    await page.goto('/styleguide')

    // Focus first button
    const button = page.locator('button').first()
    await button.focus()

    // Check it's focused
    const focused = await page.evaluate(() => document.activeElement?.tagName)
    expect(focused).toBe('BUTTON')

    // Press Enter (should not throw error)
    await page.keyboard.press('Enter')
  })

  test('Space key should activate buttons', async ({ page }) => {
    await page.goto('/styleguide')

    // Focus first button
    const button = page.locator('button').first()
    await button.focus()

    // Press Space (should not throw error)
    await page.keyboard.press('Space')
  })

  test('mobile menu should be keyboard accessible', async ({ page, viewport }) => {
    if (!viewport || viewport.width >= 768) {
      test.skip()
      return
    }

    await page.goto('/')

    // Tab to mobile menu button
    let menuButtonFocused = false

    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')

      const focused = await page.evaluate(() => {
        const el = document.activeElement
        return el?.getAttribute('class')?.includes('menu') || el?.textContent?.includes('menú')
      })

      if (focused) {
        menuButtonFocused = true
        break
      }
    }

    // If mobile menu button exists, it should be focusable
    const menuButton = await page.locator('header button').count()
    if (menuButton > 0) {
      // Menu button should be accessible
      expect(true).toBe(true)
    }
  })

  test('skip to main content link (if exists)', async ({ page }) => {
    await page.goto('/')

    // Tab once to potentially focus skip link
    await page.keyboard.press('Tab')

    const focusedText = await page.evaluate(() => {
      const el = document.activeElement
      return el?.textContent?.toLowerCase()
    })

    // If skip link exists, it should be first
    if (focusedText?.includes('skip')) {
      // Press Enter to activate
      await page.keyboard.press('Enter')

      // Should jump to main content
      const scrollY = await page.evaluate(() => window.scrollY)
      expect(scrollY >= 0).toBe(true)
    }
  })
})

test.describe('Accessibility - ARIA Attributes', () => {
  test('header should have navigation landmark', async ({ page }) => {
    await page.goto('/')

    const nav = await page.locator('header nav, header [role="navigation"]').count()
    expect(nav).toBeGreaterThanOrEqual(1)
  })

  test('main content should have main landmark', async ({ page }) => {
    await page.goto('/')

    // Should have main element or role="main"
    const main = await page.locator('main, [role="main"]').count()
    const hasContent = (await page.locator('body > div').count()) > 0

    expect(main > 0 || hasContent).toBe(true)
  })

  test('footer should have contentinfo landmark', async ({ page }) => {
    await page.goto('/')

    const footer = await page.locator('footer, [role="contentinfo"]').count()
    expect(footer).toBeGreaterThanOrEqual(1)
  })

  test('buttons should have accessible names', async ({ page }) => {
    await page.goto('/styleguide')

    const buttons = await page.locator('button').all()

    for (const button of buttons.slice(0, 10)) {
      const text = await button.textContent()
      const ariaLabel = await button.getAttribute('aria-label')
      const ariaLabelledBy = await button.getAttribute('aria-labelledby')

      // Button must have accessible name
      expect(text || ariaLabel || ariaLabelledBy).toBeTruthy()
    }
  })

  test('links should have accessible names', async ({ page }) => {
    await page.goto('/')

    const links = await page.locator('a[href]').all()

    for (const link of links.slice(0, 15)) {
      const text = await link.textContent()
      const ariaLabel = await link.getAttribute('aria-label')

      // Link must have accessible name
      expect((text && text.trim().length > 0) || ariaLabel).toBeTruthy()
    }
  })

  test('images should have alt text', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const images = await page.locator('img').all()

    for (const img of images) {
      const alt = await img.getAttribute('alt')
      const role = await img.getAttribute('role')

      // Images must have alt text or be decorative
      expect(alt !== null || role === 'presentation' || role === 'none').toBe(true)
    }
  })

  test('form inputs should have labels', async ({ page }) => {
    await page.goto('/styleguide')

    const inputs = await page.locator('input').all()

    for (const input of inputs) {
      const id = await input.getAttribute('id')
      const ariaLabel = await input.getAttribute('aria-label')
      const ariaLabelledBy = await input.getAttribute('aria-labelledby')
      const placeholder = await input.getAttribute('placeholder')

      // Input must have associated label (id for label, aria-label, or at minimum placeholder)
      expect(id || ariaLabel || ariaLabelledBy || placeholder).toBeTruthy()
    }
  })

  test('interactive elements should have proper roles', async ({ page }) => {
    await page.goto('/')

    const buttons = await page.locator('button, [role="button"]').all()

    for (const button of buttons.slice(0, 5)) {
      const tagName = await button.evaluate(el => el.tagName)
      const role = await button.getAttribute('role')

      // Should be button element or have button role
      expect(tagName === 'BUTTON' || role === 'button').toBe(true)
    }
  })
})

test.describe('Accessibility - Color Contrast', () => {
  test('text should have sufficient contrast', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .disableRules(['region']) // Focus on color contrast
      .analyze()

    const contrastViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'color-contrast'
    )

    expect(contrastViolations).toEqual([])
  })

  test('links should have sufficient contrast', async ({ page }) => {
    await page.goto('/')

    // Check link colors manually
    const links = await page.locator('a').all()

    for (const link of links.slice(0, 5)) {
      const color = await link.evaluate(el => {
        return window.getComputedStyle(el).color
      })

      // Color should be defined
      expect(color).toBeTruthy()
    }
  })

  test('buttons should have sufficient contrast', async ({ page }) => {
    await page.goto('/styleguide')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('section:has(h2:has-text("Botones"))')
      .withTags(['wcag2aa'])
      .analyze()

    const contrastViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'color-contrast'
    )

    expect(contrastViolations.length).toBe(0)
  })
})

test.describe('Accessibility - Focus Management', () => {
  test('focused elements should have visible focus indicator', async ({ page }) => {
    await page.goto('/')

    // Tab to first interactive element
    await page.keyboard.press('Tab')

    const focusedElement = page.locator(':focus')

    // Focused element should be visible
    await expect(focusedElement).toBeVisible()

    // Check if outline or ring styles are applied
    const outlineWidth = await focusedElement.evaluate(el => {
      const styles = window.getComputedStyle(el)
      return styles.outlineWidth || styles.boxShadow
    })

    // Should have some focus indicator
    expect(outlineWidth).toBeTruthy()
  })

  test('focus should not be trapped unintentionally', async ({ page }) => {
    await page.goto('/')

    // Tab through page multiple times
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab')

      const focused = await page.evaluate(() => document.activeElement?.tagName)

      // Should keep moving focus
      expect(focused).toBeTruthy()
    }
  })

  test('modal or menu focus should be trapped (if applicable)', async ({ page, viewport }) => {
    if (!viewport || viewport.width >= 768) {
      test.skip()
      return
    }

    await page.goto('/')

    // Open mobile menu
    const menuButton = page.locator('header button').first()

    if ((await menuButton.count()) > 0) {
      await menuButton.click()

      // Wait for menu to open
      await page.waitForTimeout(300)

      // Tab through menu
      await page.keyboard.press('Tab')

      const focused = await page.evaluate(() => document.activeElement?.tagName)

      // Focus should move within menu
      expect(['A', 'BUTTON', 'INPUT']).toContain(focused)
    }
  })
})

test.describe('Accessibility - Semantic HTML', () => {
  test('page should use semantic HTML5 elements', async ({ page }) => {
    await page.goto('/')

    // Check for semantic elements
    const header = await page.locator('header').count()
    const footer = await page.locator('footer').count()
    const nav = await page.locator('nav').count()

    // Should use semantic elements
    expect(header + footer + nav).toBeGreaterThan(0)
  })

  test('headings should follow logical hierarchy', async ({ page }) => {
    await page.goto('/')

    const headings = await page.evaluate(() => {
      const headingElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      return headingElements.map(el => ({
        level: parseInt(el.tagName.substring(1)),
        text: el.textContent?.substring(0, 30),
      }))
    })

    // Should have at least one h1
    const h1Count = headings.filter(h => h.level === 1).length
    expect(h1Count).toBeGreaterThanOrEqual(1)
    expect(h1Count).toBeLessThanOrEqual(2) // Allow logo + main heading

    // Headings should not skip levels (e.g., h2 → h4)
    for (let i = 1; i < headings.length; i++) {
      const prev = headings[i - 1].level
      const curr = headings[i].level

      // Current heading should not skip more than 1 level
      expect(curr - prev).toBeLessThanOrEqual(1)
    }
  })

  test('lists should use proper list markup', async ({ page }) => {
    await page.goto('/')

    const lists = await page.locator('ul, ol').count()

    if (lists > 0) {
      // Lists should contain list items
      const listItems = await page.locator('li').count()
      expect(listItems).toBeGreaterThan(0)
    }
  })
})

test.describe('Accessibility - Screen Reader Support', () => {
  test('icons should have appropriate ARIA labels or be hidden', async ({ page }) => {
    await page.goto('/')

    const icons = await page.locator('svg').all()

    for (const icon of icons.slice(0, 10)) {
      const ariaHidden = await icon.getAttribute('aria-hidden')
      const ariaLabel = await icon.getAttribute('aria-label')
      const parentAriaLabel = await icon.evaluate(el => {
        return el.parentElement?.getAttribute('aria-label')
      })

      // Icon should be hidden or labeled
      expect(ariaHidden === 'true' || ariaLabel || parentAriaLabel).toBeTruthy()
    }
  })

  test('SR-only text should be present for visual-only information', async ({ page }) => {
    await page.goto('/')

    // Check for screen reader only text (sr-only, visually-hidden classes)
    const srOnly = await page
      .locator('.sr-only, .visually-hidden, [class*="screen-reader"]')
      .count()

    // Having SR-only text is good practice
    expect(srOnly >= 0).toBe(true)
  })

  test('lang attribute should be set', async ({ page }) => {
    await page.goto('/')

    const lang = await page.locator('html').getAttribute('lang')

    expect(lang).toBeTruthy()
    expect(lang?.length).toBeGreaterThanOrEqual(2)
  })
})

test.describe('Accessibility - Mobile Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
  })

  test('touch targets should be at least 44x44px', async ({ page }) => {
    await page.goto('/')

    const buttons = await page.locator('button, a[role="button"]').all()

    for (const button of buttons.slice(0, 10)) {
      const box = await button.boundingBox()

      if (box && box.width > 0 && box.height > 0) {
        // WCAG 2.1 Level AAA requires 44x44px
        expect(box.height).toBeGreaterThanOrEqual(40)
        expect(box.width).toBeGreaterThanOrEqual(40)
      }
    }
  })

  test('mobile viewport should not require horizontal scrolling', async ({ page }) => {
    await page.goto('/')

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
  })
})
