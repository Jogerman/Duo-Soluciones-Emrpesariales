import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('Utils - cn() function', () => {
  describe('Basic Functionality', () => {
    it('should merge single class name', () => {
      expect(cn('class1')).toBe('class1')
    })

    it('should merge multiple class names', () => {
      const result = cn('class1', 'class2', 'class3')
      expect(result).toContain('class1')
      expect(result).toContain('class2')
      expect(result).toContain('class3')
    })

    it('should handle empty input', () => {
      expect(cn()).toBe('')
    })

    it('should handle undefined values', () => {
      expect(cn('class1', undefined, 'class2')).toBe('class1 class2')
    })

    it('should handle null values', () => {
      expect(cn('class1', null, 'class2')).toBe('class1 class2')
    })

    it('should handle false values', () => {
      expect(cn('class1', false, 'class2')).toBe('class1 class2')
    })
  })

  describe('Conditional Classes', () => {
    it('should handle conditional class names with true condition', () => {
      const isActive = true
      expect(cn('base', isActive && 'active')).toBe('base active')
    })

    it('should handle conditional class names with false condition', () => {
      const isActive = false
      expect(cn('base', isActive && 'active')).toBe('base')
    })

    it('should handle multiple conditional classes', () => {
      const isActive = true
      const isDisabled = false
      const result = cn('base', isActive && 'active', isDisabled && 'disabled')
      expect(result).toBe('base active')
    })
  })

  describe('TailwindCSS Conflict Resolution', () => {
    it('should resolve conflicting padding classes', () => {
      const result = cn('p-4', 'p-6')
      // twMerge should keep the last class
      expect(result).toBe('p-6')
    })

    it('should resolve conflicting margin classes', () => {
      const result = cn('m-2', 'm-4')
      expect(result).toBe('m-4')
    })

    it('should resolve conflicting background colors', () => {
      const result = cn('bg-red-500', 'bg-blue-500')
      expect(result).toBe('bg-blue-500')
    })

    it('should resolve conflicting text colors', () => {
      const result = cn('text-gray-500', 'text-black')
      expect(result).toBe('text-black')
    })

    it('should keep non-conflicting classes', () => {
      const result = cn('p-4', 'text-red-500', 'bg-blue-500')
      expect(result).toContain('p-4')
      expect(result).toContain('text-red-500')
      expect(result).toContain('bg-blue-500')
    })
  })

  describe('Object Notation', () => {
    it('should handle object with boolean values', () => {
      const result = cn({
        active: true,
        disabled: false,
        pending: true,
      })
      expect(result).toContain('active')
      expect(result).not.toContain('disabled')
      expect(result).toContain('pending')
    })

    it('should combine string and object inputs', () => {
      const result = cn('base', { active: true, disabled: false })
      expect(result).toContain('base')
      expect(result).toContain('active')
      expect(result).not.toContain('disabled')
    })
  })

  describe('Array Inputs', () => {
    it('should handle array of class names', () => {
      const result = cn(['class1', 'class2', 'class3'])
      expect(result).toContain('class1')
      expect(result).toContain('class2')
      expect(result).toContain('class3')
    })

    it('should handle nested arrays', () => {
      const result = cn(['class1', ['class2', 'class3']])
      expect(result).toContain('class1')
      expect(result).toContain('class2')
      expect(result).toContain('class3')
    })

    it('should handle array with conditional classes', () => {
      const isActive = true
      const result = cn(['base', isActive && 'active'])
      expect(result).toBe('base active')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty strings', () => {
      expect(cn('', 'class1', '')).toBe('class1')
    })

    it('should handle whitespace strings', () => {
      expect(cn('  ', 'class1', '  ')).toBe('class1')
    })

    it('should handle duplicate classes', () => {
      const result = cn('class1', 'class1', 'class1')
      // Should deduplicate
      const classCount = (result.match(/class1/g) || []).length
      expect(classCount).toBe(1)
    })

    it('should handle very long class strings', () => {
      const longClass = 'a'.repeat(1000)
      expect(cn(longClass)).toBe(longClass)
    })

    it('should handle special characters in class names', () => {
      const result = cn('hover:bg-red-500', 'focus:ring-2')
      expect(result).toContain('hover:bg-red-500')
      expect(result).toContain('focus:ring-2')
    })
  })

  describe('Real-world Use Cases', () => {
    it('should merge base and variant classes', () => {
      const baseClasses = 'px-4 py-2 rounded'
      const variantClasses = 'bg-blue-500 text-white'
      const result = cn(baseClasses, variantClasses)
      expect(result).toContain('px-4')
      expect(result).toContain('bg-blue-500')
      expect(result).toContain('text-white')
    })

    it('should handle component prop classes', () => {
      const defaultClasses = 'p-4 bg-white'
      const propClasses = 'bg-gray-100' // Override background
      const result = cn(defaultClasses, propClasses)
      expect(result).toBe('p-4 bg-gray-100')
    })

    it('should handle state-based classes', () => {
      const isDisabled = true
      const isActive = false
      const result = cn(
        'base-class',
        isDisabled && 'opacity-50 cursor-not-allowed',
        isActive && 'bg-blue-500',
        !isDisabled && 'hover:bg-gray-100'
      )
      expect(result).toContain('base-class')
      expect(result).toContain('opacity-50')
      expect(result).not.toContain('bg-blue-500')
    })

    it('should handle responsive classes', () => {
      const result = cn('w-full', 'md:w-1/2', 'lg:w-1/3', 'xl:w-1/4')
      expect(result).toContain('w-full')
      expect(result).toContain('md:w-1/2')
      expect(result).toContain('lg:w-1/3')
      expect(result).toContain('xl:w-1/4')
    })
  })

  describe('Type Safety', () => {
    it('should accept string type', () => {
      const classes: string = 'class1'
      expect(cn(classes)).toBe('class1')
    })

    it('should accept multiple arguments', () => {
      expect(cn('class1', 'class2', 'class3')).toContain('class1')
    })

    it('should accept mixed types', () => {
      const result = cn('class1', { active: true }, ['class2'], undefined, null)
      expect(result).toContain('class1')
      expect(result).toContain('active')
      expect(result).toContain('class2')
    })
  })
})
