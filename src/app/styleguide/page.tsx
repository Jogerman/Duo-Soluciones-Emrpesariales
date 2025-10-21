import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { ServiceCard } from '@/components/visual/ServiceCard'
import { StatCard } from '@/components/visual/StatCard'
import { TestimonialCard } from '@/components/visual/TestimonialCard'
import { GradientBox } from '@/components/visual/GradientBox'
import { Target, Settings, Laptop, Building2 } from 'lucide-react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Style Guide',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <Container>
        <div className="mb-12 text-center">
          <h1 className="heading-xl mb-4">DUO Design System</h1>
          <p className="body-lg">
            Componentes, colores y patrones de diseño para DUO Soluciones Empresariales
          </p>
        </div>

        <div className="space-y-16">
          {/* Colors */}
          <section>
            <h2 className="heading-lg mb-8">Paleta de Colores</h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-xl font-semibold">Primary - Verde Azulado</h3>
                <div className="grid grid-cols-5 gap-4 md:grid-cols-11">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => (
                    <div key={shade} className="text-center">
                      <div
                        className={`mb-2 h-16 rounded-lg bg-primary-${shade} shadow`}
                        style={{
                          backgroundColor: `var(--tw-color-primary-${shade})`,
                        }}
                      />
                      <div className="text-xs font-medium">{shade}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-semibold">Secondary - Azul Marino</h3>
                <div className="grid grid-cols-5 gap-4 md:grid-cols-11">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => (
                    <div key={shade} className="text-center">
                      <div
                        className={`mb-2 h-16 rounded-lg bg-secondary-${shade} shadow`}
                        style={{
                          backgroundColor: `var(--tw-color-secondary-${shade})`,
                        }}
                      />
                      <div className="text-xs font-medium">{shade}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section>
            <h2 className="heading-lg mb-8">Tipografía</h2>
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <div className="mb-2 text-sm font-medium text-neutral-600">
                    Heading XL - Bold 700
                  </div>
                  <h1 className="heading-xl">DUO Soluciones Empresariales</h1>
                </div>
                <div>
                  <div className="mb-2 text-sm font-medium text-neutral-600">
                    Heading LG - Bold 700
                  </div>
                  <h2 className="heading-lg">Transformamos Desafíos</h2>
                </div>
                <div>
                  <div className="mb-2 text-sm font-medium text-neutral-600">
                    Heading MD - Semi-Bold 600
                  </div>
                  <h3 className="heading-md">Desarrollo Organizacional</h3>
                </div>
                <div>
                  <div className="mb-2 text-sm font-medium text-neutral-600">
                    Body LG - Regular 400
                  </div>
                  <p className="body-lg">
                    Consultoría estratégica especializada en mejora de procesos y transformación
                    digital.
                  </p>
                </div>
                <div>
                  <div className="mb-2 text-sm font-medium text-neutral-600">
                    Body - Regular 400
                  </div>
                  <p className="body-base">
                    Más de 28 años impulsando el éxito organizacional en República Dominicana.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Buttons */}
          <section>
            <h2 className="heading-lg mb-8">Botones</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <div className="mb-3 text-sm font-medium text-neutral-600">Primary</div>
                    <div className="space-y-3">
                      <Button variant="primary" size="sm">
                        Small
                      </Button>
                      <Button variant="primary" size="md">
                        Medium
                      </Button>
                      <Button variant="primary" size="lg">
                        Large
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 text-sm font-medium text-neutral-600">Secondary</div>
                    <div className="space-y-3">
                      <Button variant="secondary">Secondary Button</Button>
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 text-sm font-medium text-neutral-600">Outline</div>
                    <div className="space-y-3">
                      <Button variant="outline">Outline Button</Button>
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 text-sm font-medium text-neutral-600">Ghost</div>
                    <div className="space-y-3">
                      <Button variant="ghost">Ghost Button</Button>
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 text-sm font-medium text-neutral-600">Link</div>
                    <div className="space-y-3">
                      <Button variant="link">Link Button</Button>
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 text-sm font-medium text-neutral-600">Disabled</div>
                    <div className="space-y-3">
                      <Button disabled>Disabled Button</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Inputs */}
          <section>
            <h2 className="heading-lg mb-8">Inputs</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Default Input</label>
                    <Input placeholder="Enter text..." />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Error State</label>
                    <Input placeholder="Error input" error />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Disabled Input</label>
                    <Input placeholder="Disabled" disabled />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">With Value</label>
                    <Input defaultValue="Sample value" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Badges */}
          <section>
            <h2 className="heading-lg mb-8">Badges</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Cards */}
          <section>
            <h2 className="heading-lg mb-8">Cards</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Simple Card</CardTitle>
                  <CardDescription>This is a card description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600">
                    Card content goes here. Cards can contain any type of content.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>With Icon</CardTitle>
                  <CardDescription>Card with visual element</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600">Card with icon example</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Service Cards */}
          <section>
            <h2 className="heading-lg mb-8">Service Cards</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <ServiceCard
                icon={Target}
                title="Desarrollo Organizacional"
                description="Optimización de estructura y procesos"
              />
              <ServiceCard
                icon={Settings}
                title="Mejora de Procesos"
                description="Eficiencia operativa"
              />
              <ServiceCard
                icon={Laptop}
                title="Implementación ERP"
                description="MS Dynamics y Power BI"
              />
              <ServiceCard
                icon={Building2}
                title="Gobernanza Corporativa"
                description="Estructura y compliance"
              />
            </div>
          </section>

          {/* Stat Cards */}
          <section>
            <h2 className="heading-lg mb-8">Stat Cards</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <StatCard value="28+" label="Años de Experiencia" trend="up" trendValue="+15%" />
              <StatCard value="200+" label="Proyectos Completados" trend="up" trendValue="+25%" />
              <StatCard value="95%" label="Satisfacción del Cliente" trend="neutral" />
            </div>
          </section>

          {/* Testimonial Cards */}
          <section>
            <h2 className="heading-lg mb-8">Testimonial Cards</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <TestimonialCard
                quote="DUO transformó completamente nuestra operación. Su expertise en MS Dynamics fue invaluable."
                author="Carlos Rodríguez"
                role="CEO"
                company="Torres 2"
              />
              <TestimonialCard
                quote="Profesionalismo y resultados excepcionales. Recomendamos DUO sin dudarlo."
                author="María Pérez"
                role="Directora de Operaciones"
                company="Rizek Peralta"
              />
            </div>
          </section>

          {/* Gradient Boxes */}
          <section>
            <h2 className="heading-lg mb-8">Gradient Boxes</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <GradientBox variant="primary" className="rounded-xl p-8 text-center text-white">
                <h3 className="mb-2 text-2xl font-bold">Primary Gradient</h3>
                <p>Verde azulado a azul marino</p>
              </GradientBox>
              <GradientBox variant="subtle" className="rounded-xl p-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-neutral-900">Subtle Gradient</h3>
                <p className="text-neutral-600">Fondo suave para secciones</p>
              </GradientBox>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-16 rounded-lg bg-yellow-50 p-6 text-center">
          <p className="text-sm font-medium text-yellow-800">
            Esta página es solo para desarrollo. No aparecerá en producción.
          </p>
        </div>
      </Container>
    </div>
  )
}
