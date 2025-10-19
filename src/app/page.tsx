import { Hero } from '@/components/sections/Hero'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Target, Settings, Laptop, Building2 } from 'lucide-react'

const services = [
  {
    icon: Target,
    title: 'Desarrollo Organizacional',
    description:
      'Optimizamos la estructura y procesos de tu organización para maximizar el rendimiento',
  },
  {
    icon: Settings,
    title: 'Mejora de Procesos',
    description: 'Eficiencia operativa y optimización de la cadena de abastecimiento',
  },
  {
    icon: Laptop,
    title: 'Implementación ERP',
    description: 'MS Dynamics, Power BI e inteligencia de negocio para transformación digital',
  },
  {
    icon: Building2,
    title: 'Gobernanza Corporativa',
    description: 'Estructura de gobierno, compliance y mejores prácticas empresariales',
  },
]

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Services Section */}
      <section className="section-duo bg-white">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Nuestros Servicios
            </Badge>
            <h2 className="heading-lg mb-4">Soluciones Integrales para tu Empresa</h2>
            <p className="body-lg max-w-2xl mx-auto">
              Ofrecemos consultoría estratégica en cuatro áreas clave para impulsar el crecimiento
              sostenible de tu organización
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-secondary-700">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Status Section - Development only */}
      <section className="section-duo bg-neutral-50">
        <Container>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-green-800">
                Next.js 15 + Shadcn/ui + TailwindCSS configurado exitosamente
              </span>
            </div>
            <div className="mt-4 text-sm text-neutral-500">
              <p>Powered by Next.js 15 • React 19 • TypeScript • TailwindCSS • Shadcn/ui</p>
              <p className="mt-2">Sprint 1: UI Foundation completado</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
