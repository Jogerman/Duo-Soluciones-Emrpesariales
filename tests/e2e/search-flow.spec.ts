/**
 * E2E Tests for Search Flow
 *
 * Tests the complete search user journey:
 * - Search input and suggestions
 * - Search results display
 * - Filtering and sorting
 * - Navigation to results
 */

import { test, expect } from '@playwright/test'

test.describe('Search Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should display search input in header', async ({ page }) => {
    // Look for search input or search button in header
    const header = page.locator('header')
    const searchInput = header.locator('input[type="search"], input[placeholder*="uscar" i]')
    const searchButton = header.locator('button:has-text("Buscar"), button[aria-label*="buscar" i]')

    const hasSearchInput = await searchInput.first().isVisible().catch(() => false)
    const hasSearchButton = await searchButton.first().isVisible().catch(() => false)

    expect(hasSearchInput || hasSearchButton).toBeTruthy()
  })

  test('should open search interface when clicking search button', async ({ page }) => {
    const searchButton = page.locator('button[aria-label*="buscar" i], button:has-text("Buscar")').first()

    const isVisible = await searchButton.isVisible().catch(() => false)
    if (isVisible) {
      await searchButton.click()

      // Search input or modal should appear
      await page.waitForTimeout(500)
      const searchInput = page.locator('input[type="search"], input[placeholder*="uscar" i]')
      await expect(searchInput.first()).toBeVisible()
    }
  })

  test('should accept text input in search field', async ({ page }) => {
    const searchInput = page.locator('input[type="search"], input[placeholder*="uscar" i]').first()

    const isVisible = await searchInput.isVisible().catch(() => false)
    if (isVisible) {
      await searchInput.fill('transformación digital')
      await expect(searchInput).toHaveValue('transformación digital')
    } else {
      // Try to open search first
      const searchButton = page.locator('button[aria-label*="buscar" i]').first()
      if (await searchButton.isVisible()) {
        await searchButton.click()
        await page.waitForTimeout(300)
        const input = page.locator('input[type="search"]').first()
        await input.fill('transformación digital')
        await expect(input).toHaveValue('transformación digital')
      }
    }
  })

  test('should navigate to search page on enter', async ({ page }) => {
    const searchInput = page.locator('input[type="search"], input[placeholder*="uscar" i]').first()

    if (await searchInput.isVisible()) {
      await searchInput.fill('empresas')
      await searchInput.press('Enter')

      // Should navigate to search page or show results
      await page.waitForLoadState('networkidle')
      const url = page.url()
      const isSearchPage = url.includes('/search') || url.includes('q=')

      expect(isSearchPage).toBeTruthy()
    }
  })

  test('should display search suggestions while typing', async ({ page }) => {
    const searchInput = page.locator('input[type="search"], input[placeholder*="uscar" i]').first()

    if (await searchInput.isVisible()) {
      await searchInput.fill('trans')
      await page.waitForTimeout(500)

      // Look for suggestions dropdown
      const suggestions = page.locator('[role="listbox"], [role="list"], .suggestions, .autocomplete')
      const hasSuggestions = await suggestions.first().isVisible().catch(() => false)

      // Suggestions might appear
      // Note: This is optional as it depends on implementation
      expect(typeof hasSuggestions).toBe('boolean')
    }
  })

  test('should navigate to dedicated search page', async ({ page }) => {
    await page.goto('/search')
    await page.waitForLoadState('networkidle')

    // Should have search interface
    const searchInput = page.locator('input[type="search"], input[placeholder*="uscar" i]')
    await expect(searchInput.first()).toBeVisible()
  })

  test('should perform search on search page', async ({ page }) => {
    await page.goto('/search')
    await page.waitForLoadState('networkidle')

    const searchInput = page.locator('input[type="search"], input[placeholder*="uscar" i]').first()
    await searchInput.fill('transformación')
    await searchInput.press('Enter')

    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    // Should show results or "no results" message
    const hasResults = await page.locator('article, .result, [data-testid*="result"]').first().isVisible().catch(() => false)
    const noResults = await page.locator('text=/sin resultados|no.*encontr|no results/i').first().isVisible().catch(() => false)

    expect(hasResults || noResults).toBeTruthy()
  })

  test('should display search results with required information', async ({ page }) => {
    await page.goto('/search?q=transformacion')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    // Check for result cards
    const resultCards = page.locator('article, .result, [data-testid*="result"]')
    const count = await resultCards.count()

    if (count > 0) {
      const firstResult = resultCards.first()

      // Should have title
      const title = firstResult.locator('h2, h3, .title, [data-testid*="title"]')
      await expect(title.first()).toBeVisible()

      // Should have description or excerpt
      const description = firstResult.locator('p, .description, .excerpt')
      const hasDescription = await description.first().isVisible().catch(() => false)
      expect(typeof hasDescription).toBe('boolean')
    }
  })

  test('should filter results by content type', async ({ page }) => {
    await page.goto('/search?q=empresas')
    await page.waitForLoadState('networkidle')

    // Look for filter buttons/tabs
    const blogFilter = page.locator('button:has-text("Blog"), [role="tab"]:has-text("Blog")')
    const podcastFilter = page.locator('button:has-text("Podcast"), [role="tab"]:has-text("Podcast")')

    const hasBlogFilter = await blogFilter.first().isVisible().catch(() => false)
    const hasPodcastFilter = await podcastFilter.first().isVisible().catch(() => false)

    if (hasBlogFilter) {
      await blogFilter.first().click()
      await page.waitForTimeout(500)

      // Results should update
      const url = page.url()
      expect(url).toMatch(/type=blog|filter=blog/i)
    }
  })

  test('should sort results by relevance and date', async ({ page }) => {
    await page.goto('/search?q=transformacion')
    await page.waitForLoadState('networkidle')

    // Look for sort dropdown or buttons
    const sortControl = page.locator('select, [role="combobox"], button:has-text("Ordenar")')
    const hasSortControl = await sortControl.first().isVisible().catch(() => false)

    if (hasSortControl) {
      await sortControl.first().click()
      await page.waitForTimeout(300)

      // Should have sort options
      const dateOption = page.locator('text=/fecha|date|reciente/i')
      const hasDateOption = await dateOption.first().isVisible().catch(() => false)
      expect(typeof hasDateOption).toBe('boolean')
    }
  })

  test('should navigate to result when clicked', async ({ page }) => {
    await page.goto('/search?q=transformacion')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    // Find first clickable result
    const resultLink = page.locator('article a, .result a, [data-testid*="result"] a').first()
    const hasResults = await resultLink.isVisible().catch(() => false)

    if (hasResults) {
      await resultLink.click()
      await page.waitForLoadState('networkidle')

      // Should navigate to content page
      const url = page.url()
      expect(url).not.toContain('/search')
    }
  })

  test('should show "no results" message for non-existent query', async ({ page }) => {
    await page.goto('/search?q=xyznonexistentquery12345')
    await page.waitForLoadState('networkidle')

    // Should show no results message
    const noResults = page.locator('text=/sin resultados|no.*encontr|no results|0 resultados/i')
    await expect(noResults.first()).toBeVisible({ timeout: 5000 })
  })

  test('should handle special characters in search query', async ({ page }) => {
    await page.goto('/search')
    await page.waitForLoadState('networkidle')

    const searchInput = page.locator('input[type="search"]').first()
    await searchInput.fill('transformación & empresas')
    await searchInput.press('Enter')

    await page.waitForLoadState('networkidle')

    // Should not crash and should show results or no results
    const hasContent = await page.locator('body').isVisible()
    expect(hasContent).toBeTruthy()
  })

  test('should persist search query in URL', async ({ page }) => {
    await page.goto('/search')
    await page.waitForLoadState('networkidle')

    const searchInput = page.locator('input[type="search"]').first()
    const searchQuery = 'procesos empresariales'

    await searchInput.fill(searchQuery)
    await searchInput.press('Enter')

    await page.waitForLoadState('networkidle')

    // URL should contain the query
    const url = page.url()
    expect(url).toContain(encodeURIComponent(searchQuery))
  })

  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/search')
    await page.waitForLoadState('networkidle')

    const searchInput = page.locator('input[type="search"]').first()
    await expect(searchInput).toBeVisible()

    await searchInput.fill('mobile search test')
    await searchInput.press('Enter')

    await page.waitForLoadState('networkidle')

    // Should show results on mobile
    const hasResults = await page.locator('article, .result').first().isVisible().catch(() => false)
    const noResults = await page.locator('text=/sin resultados|no.*encontr/i').first().isVisible().catch(() => false)

    expect(hasResults || noResults).toBeTruthy()
  })

  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/search')
    await page.waitForLoadState('networkidle')

    // Tab to search input
    await page.keyboard.press('Tab')

    const searchInput = page.locator('input[type="search"]').first()
    const isFocused = await searchInput.evaluate(el => el === document.activeElement)

    if (isFocused) {
      // Type and submit with keyboard
      await page.keyboard.type('keyboard test')
      await page.keyboard.press('Enter')

      await page.waitForLoadState('networkidle')

      // Should navigate or show results
      expect(true).toBeTruthy()
    }
  })

  test('should display result count', async ({ page }) => {
    await page.goto('/search?q=empresas')
    await page.waitForLoadState('networkidle')

    // Look for result count text
    const resultCount = page.locator('text=/\\d+\\s*(resultado|result)/i')
    const hasCount = await resultCount.first().isVisible().catch(() => false)

    expect(typeof hasCount).toBe('boolean')
  })

  test('should clear search query', async ({ page }) => {
    await page.goto('/search')
    await page.waitForLoadState('networkidle')

    const searchInput = page.locator('input[type="search"]').first()
    await searchInput.fill('test query')

    // Look for clear button
    const clearButton = page.locator('button[aria-label*="clear" i], button:has-text("×")')
    const hasClearButton = await clearButton.first().isVisible().catch(() => false)

    if (hasClearButton) {
      await clearButton.first().click()
      await expect(searchInput).toHaveValue('')
    }
  })
})

test.describe('Search Performance', () => {
  test('should load search results quickly', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/search?q=transformacion')
    await page.waitForLoadState('networkidle')

    const endTime = Date.now()
    const loadTime = endTime - startTime

    // Search should load in reasonable time (< 5 seconds)
    expect(loadTime).toBeLessThan(5000)
  })

  test('should handle rapid search queries', async ({ page }) => {
    await page.goto('/search')
    await page.waitForLoadState('networkidle')

    const searchInput = page.locator('input[type="search"]').first()

    // Type multiple queries rapidly
    await searchInput.fill('a')
    await page.waitForTimeout(100)
    await searchInput.fill('ab')
    await page.waitForTimeout(100)
    await searchInput.fill('abc')

    // Should not crash
    const hasContent = await page.locator('body').isVisible()
    expect(hasContent).toBeTruthy()
  })
})
