import * as React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react'
import { Container } from '@/components/ui/Container'

const footerSections = [
  {
    title: 'Servicios',
    links: [
      { title: 'Desarrollo Organizacional', href: '/servicios/desarrollo-organizacional' },
      { title: 'Mejora de Procesos', href: '/servicios/mejora-procesos' },
      { title: 'Implementación ERP', href: '/servicios/implementacion-erp' },
      { title: 'Gobernanza Corporativa', href: '/servicios/gobernanza-corporativa' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { title: 'Nosotros', href: '/nosotros' },
      { title: 'Equipo', href: '/equipo' },
      { title: 'Clientes', href: '/clientes' },
      { title: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { title: 'Términos y Condiciones', href: '/terminos' },
      { title: 'Política de Privacidad', href: '/privacidad' },
      { title: 'Aviso Legal', href: '/aviso-legal' },
    ],
  },
]

/**
 * Footer component - Site footer with links and contact info
 * 4 columns: Services, Company, Legal, Contact
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <Container>
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Services, Company, Legal columns */}
          {footerSections.map(section => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-900">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 hover:text-primary-600"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-900">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-neutral-600">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@duosoluciones.com.do" className="hover:text-primary-600">
                  info@duosoluciones.com.do
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-600">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <a href="tel:+18095551234" className="hover:text-primary-600">
                  +1 (809) 555-1234
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-neutral-600">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>Santo Domingo, República Dominicana</span>
              </li>
            </ul>

            {/* Social media */}
            <div className="mt-6 flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-primary-600"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-primary-600"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-primary-600"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-neutral-200 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-neutral-600 md:flex-row">
            <p>&copy; {currentYear} DUO Soluciones Empresariales. Todos los derechos reservados.</p>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary-600 to-secondary-700 flex items-center justify-center">
                <span className="text-xs font-bold text-white">DUO</span>
              </div>
              <span className="text-xs text-neutral-500">
                Transformamos desafíos en oportunidades
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
