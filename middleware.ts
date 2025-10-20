import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth/config'

/**
 * Middleware for authentication and route protection
 * Runs on every request to protected routes
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get session using NextAuth
  const session = await auth()

  // Protected routes configuration
  const protectedPaths = ['/admin', '/api/auth/session']
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

  // Allow access to auth routes (signin, signup, etc.)
  if (pathname.startsWith('/api/auth') && !pathname.startsWith('/api/auth/session')) {
    return NextResponse.next()
  }

  // Protect admin and API routes
  if (isProtectedPath) {
    if (!session || !session.user) {
      // Redirect to signin page
      const signInUrl = new URL('/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signInUrl)
    }

    // Check if user is active
    if (!session.user.isActive) {
      const errorUrl = new URL('/auth/error', request.url)
      errorUrl.searchParams.set('error', 'AccountDeactivated')
      return NextResponse.redirect(errorUrl)
    }

    // Role-based access control for admin routes
    if (pathname.startsWith('/admin')) {
      const allowedRoles = ['admin', 'editor', 'contributor']
      if (!allowedRoles.includes(session.user.role)) {
        return NextResponse.redirect(new URL('/auth/unauthorized', request.url))
      }
    }
  }

  // Continue to the requested page
  return NextResponse.next()
}

/**
 * Matcher configuration
 * Specifies which routes the middleware should run on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - files with extensions (e.g., .png, .jpg, .css, .js)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
  ],
}
