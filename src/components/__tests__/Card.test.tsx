import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card'

describe('Card Component', () => {
  describe('Card', () => {
    it('should render card with children', () => {
      render(<Card>Card Content</Card>)
      expect(screen.getByText('Card Content')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(<Card className="custom-card">Content</Card>)
      const card = screen.getByText('Content').parentElement
      expect(card).toHaveClass('custom-card')
    })

    it('should have default styles', () => {
      render(<Card data-testid="card">Content</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('rounded-xl', 'border', 'bg-white', 'shadow-sm')
    })

    it('should have hover effect', () => {
      render(<Card data-testid="card">Content</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('hover:shadow-md')
    })
  })

  describe('CardHeader', () => {
    it('should render header with children', () => {
      render(<CardHeader>Header Content</CardHeader>)
      expect(screen.getByText('Header Content')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(<CardHeader className="custom-header">Header</CardHeader>)
      const header = screen.getByText('Header').parentElement
      expect(header).toHaveClass('custom-header')
    })

    it('should have proper padding and spacing', () => {
      render(<CardHeader data-testid="header">Header</CardHeader>)
      const header = screen.getByTestId('header')
      expect(header).toHaveClass('p-6', 'space-y-1.5')
    })
  })

  describe('CardTitle', () => {
    it('should render title as h3', () => {
      render(<CardTitle>Card Title</CardTitle>)
      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toHaveTextContent('Card Title')
    })

    it('should apply custom className', () => {
      render(<CardTitle className="custom-title">Title</CardTitle>)
      const title = screen.getByRole('heading')
      expect(title).toHaveClass('custom-title')
    })

    it('should have proper typography styles', () => {
      render(<CardTitle>Title</CardTitle>)
      const title = screen.getByRole('heading')
      expect(title).toHaveClass('font-semibold', 'text-2xl', 'text-neutral-900')
    })
  })

  describe('CardDescription', () => {
    it('should render description', () => {
      render(<CardDescription>Card description text</CardDescription>)
      expect(screen.getByText('Card description text')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(<CardDescription className="custom-desc">Description</CardDescription>)
      const desc = screen.getByText('Description')
      expect(desc).toHaveClass('custom-desc')
    })

    it('should have proper typography styles', () => {
      render(<CardDescription>Description</CardDescription>)
      const desc = screen.getByText('Description')
      expect(desc).toHaveClass('text-sm', 'text-neutral-600')
    })
  })

  describe('CardContent', () => {
    it('should render content with children', () => {
      render(<CardContent>Main content here</CardContent>)
      expect(screen.getByText('Main content here')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(<CardContent className="custom-content">Content</CardContent>)
      const content = screen.getByText('Content').parentElement
      expect(content).toHaveClass('custom-content')
    })

    it('should have proper padding', () => {
      render(<CardContent data-testid="content">Content</CardContent>)
      const content = screen.getByTestId('content')
      expect(content).toHaveClass('p-6', 'pt-0')
    })
  })

  describe('CardFooter', () => {
    it('should render footer with children', () => {
      render(<CardFooter>Footer content</CardFooter>)
      expect(screen.getByText('Footer content')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(<CardFooter className="custom-footer">Footer</CardFooter>)
      const footer = screen.getByText('Footer').parentElement
      expect(footer).toHaveClass('custom-footer')
    })

    it('should have proper layout styles', () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>)
      const footer = screen.getByTestId('footer')
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
    })
  })

  describe('Complete Card Structure', () => {
    it('should render full card with all subcomponents', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
            <CardDescription>This is a test description</CardDescription>
          </CardHeader>
          <CardContent>Main content area</CardContent>
          <CardFooter>Footer actions</CardFooter>
        </Card>
      )

      expect(screen.getByRole('heading', { name: /test card/i })).toBeInTheDocument()
      expect(screen.getByText('This is a test description')).toBeInTheDocument()
      expect(screen.getByText('Main content area')).toBeInTheDocument()
      expect(screen.getByText('Footer actions')).toBeInTheDocument()
    })

    it('should work with partial components', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Minimal Card</CardTitle>
          </CardHeader>
          <CardContent>Just content, no footer</CardContent>
        </Card>
      )

      expect(screen.getByRole('heading')).toBeInTheDocument()
      expect(screen.getByText('Just content, no footer')).toBeInTheDocument()
    })
  })

  describe('HTML Attributes', () => {
    it('should accept data attributes', () => {
      render(<Card data-testid="test-card">Content</Card>)
      expect(screen.getByTestId('test-card')).toBeInTheDocument()
    })

    it('should accept onClick handler', () => {
      const handleClick = vi.fn()
      render(<Card onClick={handleClick}>Clickable Card</Card>)
      const card = screen.getByText('Clickable Card').parentElement
      fireEvent.click(card!)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should accept id attribute', () => {
      render(<Card id="unique-card">Content</Card>)
      const card = screen.getByText('Content').parentElement
      expect(card).toHaveAttribute('id', 'unique-card')
    })
  })
})

import { fireEvent } from '@testing-library/react'
