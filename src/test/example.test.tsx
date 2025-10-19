import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

// Simple test to verify Vitest is working
describe('Test Environment Setup', () => {
  it('should render a basic component', () => {
    const TestComponent = () => <div>Hello Test</div>
    render(<TestComponent />)
    expect(screen.getByText('Hello Test')).toBeInTheDocument()
  })

  it('should pass basic assertion', () => {
    expect(1 + 1).toBe(2)
  })
})
