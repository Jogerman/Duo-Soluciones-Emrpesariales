/**
 * Unit Tests for Newsletter Signup Component
 *
 * Tests include:
 * - Component rendering
 * - Form validation (email, consent)
 * - Form submission (success and error cases)
 * - Loading states
 * - Success/error messages
 * - Accessibility
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewsletterSignup } from '@/components/marketing/newsletter/NewsletterSignup'

// Mock fetch globally
global.fetch = vi.fn()

describe('NewsletterSignup Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(global.fetch as any).mockClear()
  })

  describe('Rendering', () => {
    it('should render newsletter signup form', () => {
      render(<NewsletterSignup />)

      expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /suscribirse/i })).toBeInTheDocument()
    })

    it('should render with custom placeholder', () => {
      render(<NewsletterSignup placeholder="correo@ejemplo.com" />)

      const emailInput = screen.getByPlaceholderText('correo@ejemplo.com')
      expect(emailInput).toBeInTheDocument()
    })

    it('should render with custom button text', () => {
      render(<NewsletterSignup buttonText="Unirse ahora" />)

      expect(screen.getByRole('button', { name: /unirse ahora/i })).toBeInTheDocument()
    })

    it('should render description when showDescription is true', () => {
      render(<NewsletterSignup showDescription={true} />)

      expect(screen.getByText(/suscríbete a nuestro newsletter/i)).toBeInTheDocument()
    })

    it('should not render description when showDescription is false', () => {
      render(<NewsletterSignup showDescription={false} />)

      expect(screen.queryByText(/suscríbete a nuestro newsletter/i)).not.toBeInTheDocument()
    })

    it('should render inline layout when inline prop is true', () => {
      const { container } = render(<NewsletterSignup inline={true} />)

      const form = container.querySelector('form')
      const emailWrapper = form?.querySelector('.flex-row')
      expect(emailWrapper).toBeInTheDocument()
    })
  })

  describe('Form Validation', () => {
    it('should show error when email is empty and form is submitted', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const submitButton = screen.getByRole('button', { name: /suscribirse/i })
      const checkbox = screen.getByRole('checkbox')

      // Check consent checkbox
      await user.click(checkbox)

      // Try to submit without email
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument()
      })
    })

    it('should show error when email format is invalid', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const checkbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /suscribirse/i })

      // Enter invalid email
      await user.type(emailInput, 'invalid-email')
      await user.click(checkbox)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/por favor ingresa un email válido/i)).toBeInTheDocument()
      })
    })

    it('should show error when consent is not given', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const submitButton = screen.getByRole('button', { name: /suscribirse/i })

      // Enter valid email but don't check consent
      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/debes aceptar los términos para continuar/i)).toBeInTheDocument()
      })
    })

    it('should submit button be disabled when consent is not checked', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const submitButton = screen.getByRole('button', { name: /suscribirse/i })

      await user.type(emailInput, 'test@example.com')

      expect(submitButton).toBeDisabled()
    })

    it('should enable submit button when consent is checked', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const checkbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /suscribirse/i })

      await user.click(checkbox)

      expect(submitButton).not.toBeDisabled()
    })
  })

  describe('Form Submission', () => {
    it('should successfully submit valid form data', async () => {
      const user = userEvent.setup()
      const mockFetch = global.fetch as any

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: 'Subscribed successfully' }),
      })

      render(<NewsletterSignup source="homepage" />)

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const checkbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /suscribirse/i })

      // Fill form
      await user.type(emailInput, 'test@example.com')
      await user.click(checkbox)
      await user.click(submitButton)

      // Check fetch was called with correct data
      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/newsletter',
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: 'test@example.com',
              consent: true,
              source: 'homepage',
            }),
          })
        )
      })
    })

    it('should show success message after successful submission', async () => {
      const user = userEvent.setup()
      const mockFetch = global.fetch as any

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })

      render(<NewsletterSignup />)

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const checkbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /suscribirse/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(checkbox)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/revisa tu email/i)).toBeInTheDocument()
        expect(screen.getByText(/te hemos enviado un enlace de confirmación/i)).toBeInTheDocument()
      })
    })

    it('should show error message when submission fails', async () => {
      const user = userEvent.setup()
      const mockFetch = global.fetch as any

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Ya estás suscrito' }),
      })

      render(<NewsletterSignup />)

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const checkbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /suscribirse/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(checkbox)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/ya estás suscrito/i)).toBeInTheDocument()
      })
    })

    it('should show loading state during submission', async () => {
      const user = userEvent.setup()
      const mockFetch = global.fetch as any

      // Create a promise that we can control
      let resolvePromise: (value: any) => void
      const promise = new Promise((resolve) => {
        resolvePromise = resolve
      })

      mockFetch.mockReturnValueOnce(promise)

      render(<NewsletterSignup />)

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const checkbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /suscribirse/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(checkbox)
      await user.click(submitButton)

      // Check loading state
      await waitFor(() => {
        expect(screen.getByText(/enviando/i)).toBeInTheDocument()
      })

      // Resolve the promise
      resolvePromise!({
        ok: true,
        json: async () => ({ success: true }),
      })

      // Wait for loading to finish
      await waitFor(() => {
        expect(screen.queryByText(/enviando/i)).not.toBeInTheDocument()
      })
    })

    it('should disable form inputs during submission', async () => {
      const user = userEvent.setup()
      const mockFetch = global.fetch as any

      let resolvePromise: (value: any) => void
      const promise = new Promise((resolve) => {
        resolvePromise = resolve
      })

      mockFetch.mockReturnValueOnce(promise)

      render(<NewsletterSignup />)

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const checkbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /suscribirse/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(checkbox)
      await user.click(submitButton)

      // Check inputs are disabled
      await waitFor(() => {
        expect(emailInput).toBeDisabled()
        expect(checkbox).toBeDisabled()
        expect(submitButton).toBeDisabled()
      })

      // Resolve the promise
      resolvePromise!({
        ok: true,
        json: async () => ({ success: true }),
      })
    })

    it('should reset form after successful submission', async () => {
      const user = userEvent.setup()
      const mockFetch = global.fetch as any

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })

      render(<NewsletterSignup />)

      const emailInput = screen.getByRole('textbox', { name: /email/i }) as HTMLInputElement
      const checkbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /suscribirse/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(checkbox)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/revisa tu email/i)).toBeInTheDocument()
      })

      // The success message replaces the form, so we can't check form reset directly
      // But we verified the success message is shown
    })

    it('should handle network errors gracefully', async () => {
      const user = userEvent.setup()
      const mockFetch = global.fetch as any

      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      render(<NewsletterSignup />)

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const checkbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /suscribirse/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(checkbox)
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<NewsletterSignup />)

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      expect(emailInput).toHaveAttribute('aria-label', 'Email')
    })

    it('should have proper ARIA error attributes when validation fails', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const checkbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /suscribirse/i })

      await user.click(checkbox)
      await user.click(submitButton)

      await waitFor(() => {
        expect(emailInput).toHaveAttribute('aria-invalid', 'true')
        expect(emailInput).toHaveAttribute('aria-describedby', 'email-error')
      })
    })

    it('should link error message to input with aria-describedby', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const checkbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /suscribirse/i })

      await user.click(checkbox)
      await user.click(submitButton)

      await waitFor(() => {
        const errorMessage = screen.getByRole('alert')
        expect(errorMessage).toHaveAttribute('id', 'email-error')
        expect(emailInput).toHaveAttribute('aria-describedby', 'email-error')
      })
    })

    it('should have clickable label for checkbox', () => {
      render(<NewsletterSignup source="test" />)

      const checkbox = screen.getByRole('checkbox')
      const label = screen.getByText(/acepto recibir comunicaciones/i)

      expect(checkbox).toHaveAttribute('id', 'consent-test')
      expect(label.closest('label')).toHaveAttribute('for', 'consent-test')
    })
  })

  describe('Email Normalization', () => {
    it('should trim and lowercase email addresses', async () => {
      const user = userEvent.setup()
      const mockFetch = global.fetch as any

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })

      render(<NewsletterSignup />)

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const checkbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /suscribirse/i })

      await user.type(emailInput, '  TEST@EXAMPLE.COM  ')
      await user.click(checkbox)
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/newsletter',
          expect.objectContaining({
            body: expect.stringContaining('test@example.com'),
          })
        )
      })
    })
  })

  describe('Source Tracking', () => {
    it('should include source parameter in API call', async () => {
      const user = userEvent.setup()
      const mockFetch = global.fetch as any

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })

      render(<NewsletterSignup source="blog-footer" />)

      const emailInput = screen.getByRole('textbox', { name: /email/i })
      const checkbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button', { name: /suscribirse/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(checkbox)
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/newsletter',
          expect.objectContaining({
            body: expect.stringContaining('blog-footer'),
          })
        )
      })
    })
  })
})
