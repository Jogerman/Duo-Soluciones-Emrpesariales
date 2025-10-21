import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Página no encontrada</h2>
          <p className="mt-4 text-lg text-gray-600">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild>
              <Link href="/">Volver al inicio</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/services">Ver servicios</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
