import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Container } from '../ui/Container'

describe('Container Component', () => {
  describe('Rendering', () => {
    it('should render container with children', () => {
      render(<Container>Container Content</Container>)
      expect(screen.getByText('Container Content')).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      render(<Container className="custom-container">Content</Container>)
      const container = screen.getByText('Content').parentElement
      expect(container).toHaveClass('custom-container')
    })

    it('should have default responsive padding', () => {
      render(<Container data-testid="container">Content</Container>)
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')
    })

    it('should be centered with mx-auto', () => {
      render(<Container data-testid="container">Content</Container>)
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('mx-auto')
    })
  })

  describe('Max Width Variants', () => {
    it('should render with default 7xl max-width', () => {
      render(<Container data-testid="container">Content</Container>)
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('max-w-7xl')
    })

    it('should render with sm max-width', () => {
      render(
        <Container maxWidth="sm" data-testid="container">
          Content
        </Container>
      )
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('max-w-screen-sm')
    })

    it('should render with md max-width', () => {
      render(
        <Container maxWidth="md" data-testid="container">
          Content
        </Container>
      )
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('max-w-screen-md')
    })

    it('should render with lg max-width', () => {
      render(
        <Container maxWidth="lg" data-testid="container">
          Content
        </Container>
      )
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('max-w-screen-lg')
    })

    it('should render with xl max-width', () => {
      render(
        <Container maxWidth="xl" data-testid="container">
          Content
        </Container>
      )
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('max-w-screen-xl')
    })

    it('should render with 2xl max-width', () => {
      render(
        <Container maxWidth="2xl" data-testid="container">
          Content
        </Container>
      )
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('max-w-screen-2xl')
    })

    it('should render with full max-width', () => {
      render(
        <Container maxWidth="full" data-testid="container">
          Content
        </Container>
      )
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('max-w-full')
    })
  })

  describe('HTML Attributes', () => {
    it('should accept data attributes', () => {
      render(<Container data-testid="test-container">Content</Container>)
      expect(screen.getByTestId('test-container')).toBeInTheDocument()
    })

    it('should accept id attribute', () => {
      render(<Container id="main-container">Content</Container>)
      const container = screen.getByText('Content').parentElement
      expect(container).toHaveAttribute('id', 'main-container')
    })

    it('should accept onClick handler', () => {
      const handleClick = vi.fn()
      render(<Container onClick={handleClick}>Clickable Container</Container>)
      const container = screen.getByText('Clickable Container').parentElement
      fireEvent.click(container!)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should accept style prop', () => {
      render(<Container style={{ backgroundColor: 'red' }}>Styled</Container>)
      const container = screen.getByText('Styled').parentElement
      expect(container).toHaveStyle({ backgroundColor: 'red' })
    })
  })

  describe('Content Rendering', () => {
    it('should render nested elements', () => {
      render(
        <Container>
          <h1>Title</h1>
          <p>Paragraph</p>
        </Container>
      )
      expect(screen.getByRole('heading', { name: /title/i })).toBeInTheDocument()
      expect(screen.getByText('Paragraph')).toBeInTheDocument()
    })

    it('should render complex component tree', () => {
      render(
        <Container>
          <div data-testid="section1">Section 1</div>
          <div data-testid="section2">Section 2</div>
          <div data-testid="section3">Section 3</div>
        </Container>
      )
      expect(screen.getByTestId('section1')).toBeInTheDocument()
      expect(screen.getByTestId('section2')).toBeInTheDocument()
      expect(screen.getByTestId('section3')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty container', () => {
      render(<Container data-testid="empty-container"></Container>)
      expect(screen.getByTestId('empty-container')).toBeInTheDocument()
    })

    it('should handle very long content', () => {
      const longText = 'Lorem ipsum '.repeat(100)
      render(<Container>{longText}</Container>)
      expect(screen.getByText(longText)).toBeInTheDocument()
    })

    it('should maintain width class with custom className', () => {
      render(
        <Container maxWidth="md" className="bg-gray-100" data-testid="container">
          Content
        </Container>
      )
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('max-w-screen-md', 'bg-gray-100')
    })
  })

  describe('Responsive Behavior', () => {
    it('should have all responsive padding classes', () => {
      render(<Container data-testid="container">Content</Container>)
      const container = screen.getByTestId('container')
      // Check for mobile padding
      expect(container).toHaveClass('px-4')
      // Check for small screen padding
      expect(container).toHaveClass('sm:px-6')
      // Check for large screen padding
      expect(container).toHaveClass('lg:px-8')
    })

    it('should maintain full width', () => {
      render(<Container data-testid="container">Content</Container>)
      const container = screen.getByTestId('container')
      expect(container).toHaveClass('w-full')
    })
  })
})

import { fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
