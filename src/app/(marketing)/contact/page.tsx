import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/forms/ContactForm'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
} from 'lucide-react'
import Link from 'next/link'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contacto | Agenda tu Consulta Gratuita | DUO Soluciones',
  description:
    'Agenda una consulta gratuita de 30 minutos. Cuéntanos tus desafíos y descubre cómo podemos ayudarte. Disponible por teléfono, email y WhatsApp.',
  keywords: [
    'contacto',
    'consulta gratuita',
    'agendar consulta',
    'teléfono',
    'WhatsApp',
    'email',
    'DUO Soluciones',
    'consultoría República Dominicana',
  ],
  openGraph: {
    title: 'Contacto | Agenda tu Consulta Gratuita | DUO Soluciones',
    description:
      'Cuéntanos sobre tus desafíos y descubre cómo podemos ayudarte. Consulta gratuita de 30 minutos.',
    url: 'https://duo-soluciones.com/contact',
    siteName: 'DUO Soluciones Empresariales',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | DUO Soluciones',
    description: 'Agenda tu consulta gratuita de 30 minutos',
  },
}

const contactInfo = [
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+1 (809) 555-0100',
    href: 'tel:+18095550100',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@duo-soluciones.com',
    href: 'mailto:info@duo-soluciones.com',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+1 (809) 555-0100',
    href: 'https://wa.me/18095550100?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20los%20servicios%20de%20DUO%20Soluciones.%20¿Podrían%20ayudarme?',
  },
]

const officeHours = [
  { days: 'Lunes a Viernes', hours: '8:00 AM - 6:00 PM' },
  { days: 'Sábados', hours: '9:00 AM - 1:00 PM' },
  { days: 'Domingos', hours: 'Cerrado' },
]

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/company/duo-soluciones',
    color: 'hover:text-blue-700',
  },
  {
    name: 'Facebook',
    icon: Facebook,
    href: 'https://facebook.com/duosoluciones',
    color: 'hover:text-blue-600',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/duosoluciones',
    color: 'hover:text-blue-400',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/duosoluciones',
    color: 'hover:text-pink-600',
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Comencemos la Conversación
            </h1>
            <p className="mt-6 text-lg leading-8 text-primary-100 sm:text-xl">
              Cuéntanos sobre tus desafíos y descubre cómo podemos ayudarte a alcanzar tus objetivos
              organizacionales.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Form - 2/3 width */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Company Info Sidebar - 1/3 width */}
            <div className="space-y-8">
              {/* Company Information Card */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Información de Contacto</h2>

                  {/* Contact Methods */}
                  <div className="space-y-4">
                    {contactInfo.map((item, index) => {
                      const Icon = item.icon
                      return (
                        <a
                          key={index}
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-primary-50 group"
                        >
                          <div className="flex-shrink-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                              <Icon className="h-5 w-5" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">{item.label}</p>
                            <p className="mt-1 text-gray-900 font-medium">{item.value}</p>
                          </div>
                        </a>
                      )
                    })}
                  </div>

                  {/* Office Address */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                          <MapPin className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Oficina</p>
                        <p className="text-sm text-gray-900 leading-relaxed">
                          Torre Empresarial, Piso 12
                          <br />
                          Av. Winston Churchill #1099
                          <br />
                          Santo Domingo, República Dominicana
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Office Hours Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                      <Clock className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Horario de Atención</h2>
                  </div>

                  <div className="space-y-3">
                    {officeHours.map((schedule, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                      >
                        <span className="text-sm font-medium text-gray-700">{schedule.days}</span>
                        <span className="text-sm text-gray-600">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp CTA Card */}
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    ¿Necesitas ayuda inmediata?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Chatea con nosotros por WhatsApp y te responderemos lo antes posible
                  </p>
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <a
                      href="https://wa.me/18095550100?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20los%20servicios%20de%20DUO%20Soluciones.%20¿Podrían%20ayudarme?"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Chatea con Nosotros
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Social Media Card */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Síguenos</h2>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon
                      return (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-all duration-300 hover:bg-gray-200 ${social.color}`}
                          aria-label={social.name}
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      )
                    })}
                  </div>
                  <p className="mt-4 text-xs text-gray-500">
                    Mantente actualizado con nuestros últimos insights, casos de estudio y podcast.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Map Placeholder Section (Optional) */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <Container>
          <div className="mx-auto max-w-4xl">
            <Card>
              <CardContent className="p-0 overflow-hidden">
                {/* Placeholder for Map - You can replace this with an actual map component */}
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto h-16 w-16 text-primary-600 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Nuestra Ubicación</h3>
                    <p className="text-gray-600">
                      Torre Empresarial, Piso 12
                      <br />
                      Av. Winston Churchill #1099, Santo Domingo
                    </p>
                    <Button asChild variant="outline" className="mt-4">
                      <a
                        href="https://maps.google.com/?q=Torre+Empresarial+Santo+Domingo"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver en Google Maps
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              ¿Qué puedes esperar?
            </h2>
            <div className="grid gap-8 md:grid-cols-3 text-left">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-lg bg-primary-600 p-3 text-white">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Respuesta Rápida</h3>
                  <p className="text-sm text-gray-600">
                    Te contactaremos dentro de 24 horas para agendar tu consulta
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-lg bg-primary-600 p-3 text-white">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Consulta Gratuita</h3>
                  <p className="text-sm text-gray-600">
                    30 minutos para entender tus desafíos y explorar soluciones
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-lg bg-primary-600 p-3 text-white">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Propuesta Personalizada
                  </h3>
                  <p className="text-sm text-gray-600">
                    Recibe un plan de acción adaptado a tus necesidades específicas
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
