import { Suspense } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Authentication Error - DUO Soluciones',
  description: 'An error occurred during authentication',
}

function ErrorContent({ searchParams }: { searchParams: { error?: string } }) {
  const error = searchParams.error || 'Unknown'

  const errorMessages: Record<string, { title: string; description: string }> = {
    Configuration: {
      title: 'Configuration Error',
      description: 'There is a problem with the server configuration. Please contact support.',
    },
    AccessDenied: {
      title: 'Access Denied',
      description: 'You do not have permission to access this resource.',
    },
    Verification: {
      title: 'Verification Error',
      description: 'The verification link is invalid or has expired.',
    },
    AccountDeactivated: {
      title: 'Account Deactivated',
      description: 'Your account has been deactivated. Please contact an administrator.',
    },
    Default: {
      title: 'Authentication Error',
      description: 'An error occurred during authentication. Please try again.',
    },
  }

  const errorInfo = errorMessages[error] || errorMessages.Default

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">{errorInfo.title}</h1>
          <p className="mt-2 text-sm text-gray-600">{errorInfo.description}</p>

          <div className="mt-6 space-y-3">
            <Button asChild className="w-full">
              <Link href="/auth/signin">Back to Sign In</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Go to Homepage</Link>
            </Button>
          </div>

          {error !== 'Unknown' && <p className="mt-4 text-xs text-gray-500">Error code: {error}</p>}
        </div>
      </Card>
    </div>
  )
}

export default function AuthErrorPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent searchParams={searchParams} />
    </Suspense>
  )
}
