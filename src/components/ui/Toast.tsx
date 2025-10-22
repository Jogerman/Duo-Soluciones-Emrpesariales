'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastContextValue {
  toasts: Toast[]
  showToast: (message: string, type?: ToastType, duration?: number) => void
  hideToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

/**
 * Toast Provider Component
 * Manages toast notifications state
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const showToast = React.useCallback(
    (message: string, type: ToastType = 'info', duration = 3000) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const newToast: Toast = { id, type, message, duration }

      setToasts(prev => [...prev, newToast])

      // Auto-dismiss after duration
      if (duration > 0) {
        setTimeout(() => {
          setToasts(prev => prev.filter(toast => toast.id !== id))
        }, duration)
      }
    },
    []
  )

  const hideToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const value = React.useMemo(
    () => ({ toasts, showToast, hideToast }),
    [toasts, showToast, hideToast]
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

/**
 * Hook to access toast functionality
 */
export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

/**
 * Toast Container Component
 * Renders all active toasts
 */
export function ToastContainer() {
  const { toasts, hideToast } = useToast()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || typeof window === 'undefined') {
    return null
  }

  return createPortal(
    <div
      className="pointer-events-none fixed inset-0 z-50 flex flex-col items-end justify-end gap-2 p-4 md:p-6"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onClose={() => hideToast(toast.id)} />
      ))}
    </div>,
    document.body
  )
}

/**
 * Individual Toast Item Component
 */
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const [isExiting, setIsExiting] = React.useState(false)

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(onClose, 300) // Wait for animation to complete
  }

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertTriangle,
  }

  const Icon = icons[toast.type]

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  }

  const iconColors = {
    success: 'text-green-600',
    error: 'text-red-600',
    info: 'text-blue-600',
    warning: 'text-yellow-600',
  }

  return (
    <div
      className={cn(
        'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300',
        colors[toast.type],
        isExiting
          ? 'translate-x-full opacity-0'
          : 'translate-x-0 opacity-100 animate-in slide-in-from-right'
      )}
      role="alert"
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconColors[toast.type])} />
      <div className="flex-1 text-sm font-medium">{toast.message}</div>
      <button
        onClick={handleClose}
        className={cn(
          'flex-shrink-0 rounded-md p-1 transition-colors hover:bg-black/5',
          iconColors[toast.type]
        )}
        aria-label="Cerrar notificación"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
