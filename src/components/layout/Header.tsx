'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Navigation } from './Navigation'
import { GlobalSearch } from '@/components/marketing/search/GlobalSearch'

/**
 * Header component - Main navigation header
 * Features: Logo, navigation menu, CTA button, responsive mobile menu
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-duo-soluciones.png"
              alt="DUO Soluciones Empresariales"
              width={200}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Search */}
          <div className="hidden flex-1 max-w-md md:block">
            <GlobalSearch />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <Navigation />
            <Button asChild size="md">
              <Link href="/contact">Contáctanos</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 hover:bg-neutral-100 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span className="sr-only">{mobileMenuOpen ? 'Cerrar' : 'Abrir'} menú</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="border-t border-neutral-200 py-4 md:hidden">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="px-2">
                <GlobalSearch />
              </div>
              <Navigation mobile />
              <Button asChild size="md" className="w-full">
                <Link href="/contact">Contáctanos</Link>
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
