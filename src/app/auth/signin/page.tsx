import { Suspense } from 'react'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata = {
  title: 'Sign In - DUO Soluciones Admin',
  description: 'Sign in to access the DUO Soluciones admin panel',
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="w-full max-w-md">
            <div className="animate-pulse">
              <div className="h-8 w-32 rounded bg-gray-200"></div>
              <div className="mt-4 h-64 rounded bg-gray-200"></div>
            </div>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  )
}
