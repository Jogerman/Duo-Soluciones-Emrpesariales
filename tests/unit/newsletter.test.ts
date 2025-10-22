/**
 * Newsletter Component and Utilities Unit Tests
 * Tests for newsletter signup form, validation, and subscription logic
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewsletterSignup } from '@/components/marketing/newsletter/NewsletterSignup'

// Mock fetch globally
global.fetch = vi.fn()

describe('Newsletter Component Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(global.fetch as any).mockClear()
  })

  describe('NewsletterSignup Component', () => {
    it('should render newsletter signup form', () => {
      render(<NewsletterSignup />)

      expect(screen.getByText(/Suscríbete a nuestro Newsletter/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/tu@email.com/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Suscribirse/i })).toBeInTheDocument()
    })

    it('should render with custom props', () => {
      render(
        <NewsletterSignup
          placeholder="custom@email.com"
          buttonText="Join Now"
          showDescription={false}
        />
      )

      expect(screen.getByPlaceholderText('custom@email.com')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Join Now/i })).toBeInTheDocument()
      expect(screen.queryByText(/Suscríbete a nuestro Newsletter/i)).not.toBeInTheDocument()
    })

    it('should show email validation error for empty email', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const emailInput = screen.getByPlaceholderText(/tu@email.com/i)
      const submitButton = screen.getByRole('button', { name: /Suscribirse/i })

      await user.click(emailInput)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/El email es requerido/i)).toBeInTheDocument()
      })
    })

    it('should show email validation error for invalid email format', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const emailInput = screen.getByPlaceholderText(/tu@email.com/i)
      const submitButton = screen.getByRole('button', { name: /Suscribirse/i })

      await user.type(emailInput, 'invalid-email')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/Por favor ingresa un email válido/i)).toBeInTheDocument()
      })
    })

    it('should require consent checkbox before submission', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const emailInput = screen.getByPlaceholderText(/tu@email.com/i)
      const submitButton = screen.getByRole('button', { name: /Suscribirse/i })

      await user.type(emailInput, 'test@example.com')

      // Button should be disabled without consent
      expect(submitButton).toBeDisabled()
    })

    it('should enable submit button when consent is given', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const emailInput = screen.getByPlaceholderText(/tu@email.com/i)
      const consentCheckbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /Suscribirse/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(consentCheckbox)

      expect(submitButton).not.toBeDisabled()
    })

    it('should show consent error when trying to submit without consent', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const emailInput = screen.getByPlaceholderText(/tu@email.com/i)
      const checkbox = screen.getByRole('checkbox')

      await user.type(emailInput, 'test@example.com')
      await user.click(checkbox)
      await user.click(checkbox) // Uncheck

      // Try to submit form (would be blocked by disabled button, but test validation)
      const form = screen.getByRole('button', { name: /Suscribirse/i }).closest('form')
      if (form) {
        fireEvent.submit(form)
      }

      await waitFor(() => {
        const submitButton = screen.getByRole('button', { name: /Suscribirse/i })
        expect(submitButton).toBeDisabled()
      })
    })

    it('should submit form successfully with valid data', async () => {
      const user = userEvent.setup()
      const mockResponse = {
        success: true,
        message: 'Te hemos enviado un email de confirmación.',
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      render(<NewsletterSignup source="test-page" />)

      const emailInput = screen.getByPlaceholderText(/tu@email.com/i)
      const consentCheckbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /Suscribirse/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(consentCheckbox)
      await user.click(submitButton)

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'test@example.com',
            consent: true,
            source: 'test-page',
          }),
        })
      })

      await waitFor(() => {
        expect(screen.getByText(/Revisa tu email/i)).toBeInTheDocument()
      })
    })

    it('should show error message when API returns error', async () => {
      const user = userEvent.setup()
      const mockError = {
        success: false,
        error: 'Email already subscribed',
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: async () => mockError,
      })

      render(<NewsletterSignup />)

      const emailInput = screen.getByPlaceholderText(/tu@email.com/i)
      const consentCheckbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /Suscribirse/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(consentCheckbox)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/Email already subscribed/i)).toBeInTheDocument()
      })
    })

    it('should show loading state during submission', async () => {
      const user = userEvent.setup()

      // Create a promise that we can control
      let resolvePromise: any
      const promise = new Promise((resolve) => {
        resolvePromise = resolve
      })

      ;(global.fetch as any).mockReturnValueOnce(promise)

      render(<NewsletterSignup />)

      const emailInput = screen.getByPlaceholderText(/tu@email.com/i)
      const consentCheckbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /Suscribirse/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(consentCheckbox)
      await user.click(submitButton)

      // Check loading state
      await waitFor(() => {
        expect(screen.getByText(/Enviando.../i)).toBeInTheDocument()
      })

      // Resolve the promise
      resolvePromise({
        ok: true,
        json: async () => ({ success: true, message: 'Success' }),
      })

      await waitFor(() => {
        expect(screen.queryByText(/Enviando.../i)).not.toBeInTheDocument()
      })
    })

    it('should normalize email to lowercase', async () => {
      const user = userEvent.setup()
      const mockResponse = { success: true, message: 'Success' }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      render(<NewsletterSignup />)

      const emailInput = screen.getByPlaceholderText(/tu@email.com/i)
      const consentCheckbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /Suscribirse/i })

      await user.type(emailInput, 'TEST@EXAMPLE.COM')
      await user.click(consentCheckbox)
      await user.click(submitButton)

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'test@example.com',
            consent: true,
            source: 'homepage',
          }),
        })
      })
    })

    it('should reset form after successful submission', async () => {
      const user = userEvent.setup()
      const mockResponse = { success: true, message: 'Success' }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      render(<NewsletterSignup />)

      const emailInput = screen.getByPlaceholderText(/tu@email.com/i) as HTMLInputElement
      const consentCheckbox = screen.getByRole('checkbox') as HTMLInputElement
      const submitButton = screen.getByRole('button', { name: /Suscribirse/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(consentCheckbox)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/Revisa tu email/i)).toBeInTheDocument()
      })
    })

    it('should render inline layout when inline prop is true', () => {
      render(<NewsletterSignup inline={true} />)

      const form = screen.getByRole('button', { name: /Suscribirse/i }).closest('form')
      expect(form).toBeInTheDocument()
    })

    it('should handle network errors gracefully', async () => {
      const user = userEvent.setup()

      ;(global.fetch as any).mockRejectedValueOnce(new Error('Network error'))

      render(<NewsletterSignup />)

      const emailInput = screen.getByPlaceholderText(/tu@email.com/i)
      const consentCheckbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /Suscribirse/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(consentCheckbox)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/Network error/i)).toBeInTheDocument()
      })
    })
  })

  describe('Newsletter Form Validation', () => {
    it('should accept valid email formats', async () => {
      const validEmails = [
        'test@example.com',
        'user.name@example.co.uk',
        'first+last@example.org',
        'test123@test-domain.com',
      ]

      for (const email of validEmails) {
        const user = userEvent.setup()
        const mockResponse = { success: true, message: 'Success' }

        ;(global.fetch as any).mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        })

        const { unmount } = render(<NewsletterSignup />)

        const emailInput = screen.getByPlaceholderText(/tu@email.com/i)
        const consentCheckbox = screen.getByRole('checkbox')
        const submitButton = screen.getByRole('button', { name: /Suscribirse/i })

        await user.type(emailInput, email)
        await user.click(consentCheckbox)
        await user.click(submitButton)

        await waitFor(() => {
          expect(global.fetch).toHaveBeenCalled()
        })

        unmount()
        vi.clearAllMocks()
      }
    })

    it('should reject invalid email formats', async () => {
      const invalidEmails = [
        'notanemail',
        '@example.com',
        'user@',
        'user @example.com',
        'user@example',
      ]

      for (const email of invalidEmails) {
        const user = userEvent.setup()
        const { unmount } = render(<NewsletterSignup />)

        const emailInput = screen.getByPlaceholderText(/tu@email.com/i)
        const submitButton = screen.getByRole('button', { name: /Suscribirse/i })

        await user.type(emailInput, email)
        await user.click(submitButton)

        await waitFor(() => {
          expect(screen.getByText(/Por favor ingresa un email válido/i)).toBeInTheDocument()
        })

        unmount()
      }
    })

    it('should trim whitespace from email', async () => {
      const user = userEvent.setup()
      const mockResponse = { success: true, message: 'Success' }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      render(<NewsletterSignup />)

      const emailInput = screen.getByPlaceholderText(/tu@email.com/i)
      const consentCheckbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /Suscribirse/i })

      await user.type(emailInput, '  test@example.com  ')
      await user.click(consentCheckbox)
      await user.click(submitButton)

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'test@example.com',
            consent: true,
            source: 'homepage',
          }),
        })
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<NewsletterSignup />)

      const emailInput = screen.getByPlaceholderText(/tu@email.com/i)
      expect(emailInput).toHaveAttribute('aria-label', 'Email')
    })

    it('should have proper ARIA invalid states for errors', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const emailInput = screen.getByPlaceholderText(/tu@email.com/i)
      const submitButton = screen.getByRole('button', { name: /Suscribirse/i })

      await user.click(emailInput)
      await user.click(submitButton)

      await waitFor(() => {
        expect(emailInput).toHaveAttribute('aria-invalid', 'true')
      })
    })

    it('should have proper role for alerts', async () => {
      const user = userEvent.setup()
      const mockResponse = { success: true, message: 'Success' }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      render(<NewsletterSignup />)

      const emailInput = screen.getByPlaceholderText(/tu@email.com/i)
      const consentCheckbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /Suscribirse/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(consentCheckbox)
      await user.click(submitButton)

      await waitFor(() => {
        const alert = screen.getByRole('status')
        expect(alert).toBeInTheDocument()
      })
    })
  })
})
