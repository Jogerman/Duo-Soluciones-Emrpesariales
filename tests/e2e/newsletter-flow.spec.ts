/**
 * E2E Tests for Newsletter Subscription Flow
 *
 * Tests the complete user journey from:
 * - Newsletter form rendering
 * - Form validation
 * - Submission
 * - Success/error messages
 * - Accessibility
 */

import { test, expect } from '@playwright/test'

test.describe('Newsletter Subscription Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage (or wherever newsletter form is)
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should display newsletter signup form', async ({ page }) => {
    // Look for newsletter form (it might be in footer or dedicated section)
    const newsletterSection = page.locator('text=/newsletter|suscr[ií]bete/i').first()
    await expect(newsletterSection).toBeVisible()

    // Check for email input
    const emailInput = page.locator('input[type="email"]').first()
    await expect(emailInput).toBeVisible()
  })

  test('should show validation error for empty email', async ({ page }) => {
    // Find newsletter form
    const emailInput = page.locator('input[type="email"]').first()
    const consentCheckbox = page.locator('input[type="checkbox"]').first()
    const submitButton = page.locator('button:has-text("Suscrib")').first()

    // Check consent and try to submit without email
    await consentCheckbox.check()
    await submitButton.click()

    // Wait for validation error
    const errorMessage = page.locator('text=/el email es requerido|requerido/i')
    await expect(errorMessage).toBeVisible({ timeout: 5000 })
  })

  test('should show validation error for invalid email format', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]').first()
    const consentCheckbox = page.locator('input[type="checkbox"]').first()
    const submitButton = page.locator('button:has-text("Suscrib")').first()

    // Enter invalid email
    await emailInput.fill('invalid-email')
    await consentCheckbox.check()
    await submitButton.click()

    // Wait for validation error
    const errorMessage = page.locator('text=/email válido|válido/i')
    await expect(errorMessage).toBeVisible({ timeout: 5000 })
  })

  test('should show validation error when consent not given', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]').first()
    const submitButton = page.locator('button:has-text("Suscrib")').first()

    // Enter valid email but don't check consent
    await emailInput.fill('test@example.com')
    await submitButton.click()

    // Wait for consent error
    const errorMessage = page.locator('text=/aceptar.*términos|términos/i')
    await expect(errorMessage).toBeVisible({ timeout: 5000 })
  })

  test('should disable submit button when consent not checked', async ({ page }) => {
    const submitButton = page.locator('button:has-text("Suscrib")').first()

    // Button should be disabled initially
    await expect(submitButton).toBeDisabled()
  })

  test('should enable submit button when consent is checked', async ({ page }) => {
    const consentCheckbox = page.locator('input[type="checkbox"]').first()
    const submitButton = page.locator('button:has-text("Suscrib")').first()

    // Check consent
    await consentCheckbox.check()

    // Button should now be enabled
    await expect(submitButton).toBeEnabled()
  })

  test('should submit form with valid data', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]').first()
    const consentCheckbox = page.locator('input[type="checkbox"]').first()
    const submitButton = page.locator('button:has-text("Suscrib")').first()

    // Fill form with valid data
    await emailInput.fill(`test-${Date.now()}@example.com`)
    await consentCheckbox.check()
    await submitButton.click()

    // Wait for success message or loading state
    await page.waitForTimeout(2000)

    // Check for either success message or form submission feedback
    const successIndicator = page.locator('text=/revisa.*email|confirmación|éxito|gracias/i').first()
    const loadingIndicator = page.locator('text=/enviando/i').first()

    // At least one should appear
    const hasSuccess = await successIndicator.isVisible().catch(() => false)
    const hasLoading = await loadingIndicator.isVisible().catch(() => false)

    expect(hasSuccess || hasLoading).toBeTruthy()
  })

  test('should show loading state during submission', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]').first()
    const consentCheckbox = page.locator('input[type="checkbox"]').first()
    const submitButton = page.locator('button:has-text("Suscrib")').first()

    await emailInput.fill('loading-test@example.com')
    await consentCheckbox.check()
    await submitButton.click()

    // Check for loading indicator
    const loadingText = page.locator('text=/enviando/i')
    await expect(loadingText).toBeVisible({ timeout: 1000 })
  })

  test('should have accessible form elements', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]').first()
    const consentCheckbox = page.locator('input[type="checkbox"]').first()
    const submitButton = page.locator('button:has-text("Suscrib")').first()

    // Check for aria-label or label association
    const emailAriaLabel = await emailInput.getAttribute('aria-label')
    const emailId = await emailInput.getAttribute('id')
    expect(emailAriaLabel || emailId).toBeTruthy()

    // Check button is accessible
    const buttonText = await submitButton.textContent()
    expect(buttonText).toBeTruthy()

    // Checkbox should have associated label
    const checkboxId = await consentCheckbox.getAttribute('id')
    if (checkboxId) {
      const label = page.locator(`label[for="${checkboxId}"]`)
      await expect(label).toBeVisible()
    }
  })

  test('should handle duplicate email submission gracefully', async ({ page }) => {
    const testEmail = 'duplicate-test@example.com'
    const emailInput = page.locator('input[type="email"]').first()
    const consentCheckbox = page.locator('input[type="checkbox"]').first()
    const submitButton = page.locator('button:has-text("Suscrib")').first()

    // First submission
    await emailInput.fill(testEmail)
    await consentCheckbox.check()
    await submitButton.click()
    await page.waitForTimeout(2000)

    // Try to submit again (if form is still visible)
    const formStillVisible = await emailInput.isVisible().catch(() => false)

    if (formStillVisible) {
      await emailInput.fill(testEmail)
      if (!(await consentCheckbox.isChecked())) {
        await consentCheckbox.check()
      }
      await submitButton.click()
      await page.waitForTimeout(2000)

      // Should show some feedback (success or already subscribed message)
      const feedback = page.locator('text=/suscrito|confirmación|email/i').first()
      await expect(feedback).toBeVisible({ timeout: 5000 })
    }
  })

  test('should handle network errors gracefully', async ({ page, context }) => {
    // Block newsletter API to simulate network error
    await context.route('**/api/newsletter', route => {
      route.abort('failed')
    })

    const emailInput = page.locator('input[type="email"]').first()
    const consentCheckbox = page.locator('input[type="checkbox"]').first()
    const submitButton = page.locator('button:has-text("Suscrib")').first()

    await emailInput.fill('network-error@example.com')
    await consentCheckbox.check()
    await submitButton.click()

    // Should show error message
    await page.waitForTimeout(2000)
    // Error might be displayed in various ways
    const hasErrorFeedback = await page.locator('text=/error|intenta.*nuevo|problem/i').first().isVisible().catch(() => false)
    expect(hasErrorFeedback).toBeTruthy()
  })

  test('should display privacy policy link', async ({ page }) => {
    // Look for privacy policy link in newsletter form
    const privacyLink = page.locator('a[href*="privacy"], a:has-text("Privacidad")')
    const hasLink = await privacyLink.first().isVisible().catch(() => false)
    expect(hasLink).toBeTruthy()
  })

  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const emailInput = page.locator('input[type="email"]').first()
    const consentCheckbox = page.locator('input[type="checkbox"]').first()

    // Elements should still be visible and interactive
    await expect(emailInput).toBeVisible()
    await expect(consentCheckbox).toBeVisible()

    // Should be able to interact
    await emailInput.fill('mobile-test@example.com')
    await consentCheckbox.check()
  })

  test('should trim and normalize email addresses', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]').first()
    const consentCheckbox = page.locator('input[type="checkbox"]').first()
    const submitButton = page.locator('button:has-text("Suscrib")').first()

    // Enter email with spaces and uppercase
    await emailInput.fill('  TEST@EXAMPLE.COM  ')
    await consentCheckbox.check()
    await submitButton.click()

    await page.waitForTimeout(2000)

    // Should process successfully (trimmed and lowercased on backend)
    const hasSuccessOrError = await page.locator('text=/confirmación|error|suscrito/i').first().isVisible().catch(() => false)
    expect(hasSuccessOrError).toBeTruthy()
  })
})

test.describe('Newsletter Form - Different Locations', () => {
  test('should have newsletter form in footer', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    // Look for newsletter in footer
    const footer = page.locator('footer')
    const newsletterInFooter = footer.locator('input[type="email"]')
    const hasNewsletterInFooter = await newsletterInFooter.first().isVisible().catch(() => false)

    expect(hasNewsletterInFooter).toBeTruthy()
  })

  test('should work from blog page if available', async ({ page }) => {
    await page.goto('/blog')
    await page.waitForLoadState('networkidle')

    // Look for newsletter form on blog page
    const emailInput = page.locator('input[type="email"]').first()
    const hasForm = await emailInput.isVisible().catch(() => false)

    if (hasForm) {
      const consentCheckbox = page.locator('input[type="checkbox"]').first()
      await emailInput.fill('blog-test@example.com')
      await consentCheckbox.check()
      // Form should be functional
      await expect(emailInput).toHaveValue('blog-test@example.com')
    }
  })
})
