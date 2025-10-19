'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Navigation } from './Navigation'

/**
 * Header component - Main navigation header
 * Features: Logo, navigation menu, CTA button, responsive mobile menu
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-secondary-700">
              <span className="text-lg font-bold text-white">DUO</span>
            </div>
            <span className="hidden text-lg font-semibold text-neutral-900 sm:inline-block">
              Soluciones Empresariales
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <Navigation />
            <Button asChild size="md">
              <Link href="/contacto">Contáctanos</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-100 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Abrir menú</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-neutral-200 py-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <Navigation mobile />
              <Button asChild size="md" className="w-full">
                <Link href="/contacto">Contáctanos</Link>
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
