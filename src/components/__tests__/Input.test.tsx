import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../ui/Input'

describe('Input Component', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
    })

    it('should render with placeholder', () => {
      render(<Input placeholder="Enter text" />)
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      render(<Input className="custom-input" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('custom-input')
    })

    it('should render with initial value', () => {
      render(<Input value="Initial value" readOnly />)
      const input = screen.getByRole('textbox') as HTMLInputElement
      expect(input.value).toBe('Initial value')
    })
  })

  describe('Input Types', () => {
    it('should render as text input by default', () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', 'text')
    })

    it('should render as email input', () => {
      render(<Input type="email" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', 'email')
    })

    it('should render as password input', () => {
      render(<Input type="password" />)
      const input = document.querySelector('input[type="password"]')
      expect(input).toBeInTheDocument()
    })

    it('should render as number input', () => {
      render(<Input type="number" />)
      const input = screen.getByRole('spinbutton')
      expect(input).toHaveAttribute('type', 'number')
    })
  })

  describe('Error State', () => {
    it('should apply error styles when error prop is true', () => {
      render(<Input error />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-red-500')
    })

    it('should not have error styles by default', () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      expect(input).not.toHaveClass('border-red-500')
    })

    it('should have error focus ring when error is true', () => {
      render(<Input error />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('focus-visible:ring-red-500')
    })
  })

  describe('States', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Input disabled />)
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('disabled:opacity-50')
    })

    it('should be readonly when readOnly prop is true', () => {
      render(<Input readOnly />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('readonly')
    })

    it('should be required when required prop is true', () => {
      render(<Input required />)
      const input = screen.getByRole('textbox')
      expect(input).toBeRequired()
    })
  })

  describe('User Interactions', () => {
    it('should handle onChange events', () => {
      const handleChange = vi.fn()
      render(<Input onChange={handleChange} />)
      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'test input' } })
      expect(handleChange).toHaveBeenCalled()
    })

    it('should update value on input', () => {
      const handleChange = vi.fn()
      render(<Input onChange={handleChange} />)
      const input = screen.getByRole('textbox') as HTMLInputElement
      fireEvent.change(input, { target: { value: 'new value' } })
      expect(input.value).toBe('new value')
    })

    it('should handle onFocus events', () => {
      const handleFocus = vi.fn()
      render(<Input onFocus={handleFocus} />)
      const input = screen.getByRole('textbox')
      fireEvent.focus(input)
      expect(handleFocus).toHaveBeenCalledTimes(1)
    })

    it('should handle onBlur events', () => {
      const handleBlur = vi.fn()
      render(<Input onBlur={handleBlur} />)
      const input = screen.getByRole('textbox')
      fireEvent.blur(input)
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })
  })

  describe('Validation', () => {
    it('should accept maxLength attribute', () => {
      render(<Input maxLength={10} />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('maxLength', '10')
    })

    it('should accept minLength attribute', () => {
      render(<Input minLength={5} />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('minLength', '5')
    })

    it('should accept pattern attribute', () => {
      render(<Input pattern="[0-9]*" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('pattern', '[0-9]*')
    })
  })

  describe('Accessibility', () => {
    it('should have proper focus styles', () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('focus-visible:outline-none')
      expect(input).toHaveClass('focus-visible:ring-2')
    })

    it('should accept aria-label', () => {
      render(<Input aria-label="Email address" />)
      const input = screen.getByRole('textbox', { name: /email address/i })
      expect(input).toBeInTheDocument()
    })

    it('should accept aria-describedby', () => {
      render(<Input aria-describedby="email-error" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-describedby', 'email-error')
    })

    it('should accept aria-invalid', () => {
      render(<Input aria-invalid />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-invalid')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty string value', () => {
      render(<Input value="" readOnly />)
      const input = screen.getByRole('textbox') as HTMLInputElement
      expect(input.value).toBe('')
    })

    it('should handle very long placeholder', () => {
      const longPlaceholder = 'A'.repeat(100)
      render(<Input placeholder={longPlaceholder} />)
      expect(screen.getByPlaceholderText(longPlaceholder)).toBeInTheDocument()
    })

    it('should handle special characters in value', () => {
      const specialValue = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      render(<Input value={specialValue} readOnly />)
      const input = screen.getByRole('textbox') as HTMLInputElement
      expect(input.value).toBe(specialValue)
    })
  })
})
