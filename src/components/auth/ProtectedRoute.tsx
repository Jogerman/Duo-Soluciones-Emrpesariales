'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

/**
 * Protected Route Component
 * Wraps components that require authentication
 */
export function ProtectedRoute({
  children,
  allowedRoles = ['admin', 'editor', 'contributor'],
}: ProtectedRouteProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading session

    if (!session) {
      // Not authenticated, redirect to signin
      router.push('/auth/signin')
      return
    }

    if (!session.user.isActive) {
      // User account is deactivated
      router.push('/auth/error?error=AccountDeactivated')
      return
    }

    if (allowedRoles && !allowedRoles.includes(session.user.role)) {
      // User doesn't have required role
      router.push('/auth/unauthorized')
      return
    }
  }, [session, status, router, allowedRoles])

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render children if not authenticated or authorized
  if (
    !session ||
    !session.user.isActive ||
    (allowedRoles && !allowedRoles.includes(session.user.role))
  ) {
    return null
  }

  // Render protected content
  return <>{children}</>
}
