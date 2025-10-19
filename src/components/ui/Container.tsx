import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum width variant
   * @default '7xl'
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full'
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  '3xl': 'max-w-7xl',
  '4xl': 'max-w-8xl',
  '5xl': 'max-w-9xl',
  '6xl': 'max-w-10xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
}

/**
 * Container component - Responsive container with max-width
 * Default max-width follows DUO design system (7xl)
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth = '7xl', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', maxWidthClasses[maxWidth], className)}
        {...props}
      />
    )
  }
)
Container.displayName = 'Container'

export { Container }
