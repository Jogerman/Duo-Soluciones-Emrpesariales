import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from '../ui/Badge'

describe('Badge Component', () => {
  describe('Rendering', () => {
    it('should render badge with children', () => {
      render(<Badge>New</Badge>)
      expect(screen.getByText('New')).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      render(<Badge className="custom-badge">Badge</Badge>)
      const badge = screen.getByText('Badge')
      expect(badge).toHaveClass('custom-badge')
    })

    it('should have default styles', () => {
      render(<Badge>Test</Badge>)
      const badge = screen.getByText('Test')
      expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full', 'px-2.5', 'py-0.5')
    })
  })

  describe('Variants', () => {
    it('should render default variant', () => {
      render(<Badge variant="default">Default</Badge>)
      const badge = screen.getByText('Default')
      expect(badge).toHaveClass('bg-primary-600', 'text-white')
    })

    it('should render secondary variant', () => {
      render(<Badge variant="secondary">Secondary</Badge>)
      const badge = screen.getByText('Secondary')
      expect(badge).toHaveClass('bg-secondary-700', 'text-white')
    })

    it('should render outline variant', () => {
      render(<Badge variant="outline">Outline</Badge>)
      const badge = screen.getByText('Outline')
      expect(badge).toHaveClass('border-neutral-300', 'text-neutral-900')
    })

    it('should render success variant', () => {
      render(<Badge variant="success">Success</Badge>)
      const badge = screen.getByText('Success')
      expect(badge).toHaveClass('bg-green-500', 'text-white')
    })

    it('should render warning variant', () => {
      render(<Badge variant="warning">Warning</Badge>)
      const badge = screen.getByText('Warning')
      expect(badge).toHaveClass('bg-yellow-500', 'text-white')
    })

    it('should render error variant', () => {
      render(<Badge variant="error">Error</Badge>)
      const badge = screen.getByText('Error')
      expect(badge).toHaveClass('bg-red-500', 'text-white')
    })
  })

  describe('Content Types', () => {
    it('should render text content', () => {
      render(<Badge>Text Badge</Badge>)
      expect(screen.getByText('Text Badge')).toBeInTheDocument()
    })

    it('should render number content', () => {
      render(<Badge>42</Badge>)
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('should render with icon', () => {
      render(
        <Badge>
          <span data-testid="icon">✓</span> Verified
        </Badge>
      )
      expect(screen.getByTestId('icon')).toBeInTheDocument()
      expect(screen.getByText('Verified')).toBeInTheDocument()
    })
  })

  describe('HTML Attributes', () => {
    it('should accept data attributes', () => {
      render(<Badge data-testid="test-badge">Badge</Badge>)
      expect(screen.getByTestId('test-badge')).toBeInTheDocument()
    })

    it('should accept id attribute', () => {
      render(<Badge id="unique-badge">Badge</Badge>)
      const badge = screen.getByText('Badge')
      expect(badge).toHaveAttribute('id', 'unique-badge')
    })

    it('should accept onClick handler', () => {
      const handleClick = vi.fn()
      render(<Badge onClick={handleClick}>Clickable</Badge>)
      const badge = screen.getByText('Clickable')
      fireEvent.click(badge)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('should have focus ring styles', () => {
      render(<Badge>Focus Test</Badge>)
      const badge = screen.getByText('Focus Test')
      expect(badge).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-primary-600')
    })

    it('should accept aria-label', () => {
      render(<Badge aria-label="Status indicator">Active</Badge>)
      const badge = screen.getByText('Active')
      expect(badge).toHaveAttribute('aria-label', 'Status indicator')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty content', () => {
      render(<Badge data-testid="empty-badge"></Badge>)
      expect(screen.getByTestId('empty-badge')).toBeInTheDocument()
    })

    it('should handle very long text', () => {
      const longText = 'This is a very long badge text that should still render'
      render(<Badge>{longText}</Badge>)
      expect(screen.getByText(longText)).toBeInTheDocument()
    })

    it('should handle special characters', () => {
      render(<Badge>© 2025 • v1.0</Badge>)
      expect(screen.getByText('© 2025 • v1.0')).toBeInTheDocument()
    })
  })
})

import { fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
