import * as React from 'react'
import { cn } from '@/lib/utils'

export interface GradientBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Gradient variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'subtle' | 'reverse'
  /**
   * Enable animation
   */
  animated?: boolean
}

const gradients = {
  primary: 'bg-gradient-to-br from-primary-600 to-secondary-700',
  secondary: 'bg-gradient-to-br from-secondary-600 to-primary-700',
  subtle: 'bg-gradient-to-br from-primary-50 via-white to-secondary-50',
  reverse: 'bg-gradient-to-tl from-primary-600 to-secondary-700',
}

/**
 * GradientBox - Container with brand gradient background
 * Useful for hero sections, feature highlights, and decorative elements
 */
export function GradientBox({
  variant = 'primary',
  animated = false,
  className,
  children,
  ...props
}: GradientBoxProps) {
  return (
    <div
      className={cn(
        gradients[variant],
        animated && 'animate-gradient-x bg-gradient-to-r',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
