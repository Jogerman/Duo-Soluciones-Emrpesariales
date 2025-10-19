'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  title: string
  href?: string
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: 'Servicios',
    children: [
      {
        title: 'Desarrollo Organizacional',
        href: '/servicios/desarrollo-organizacional',
      },
      {
        title: 'Mejora de Procesos',
        href: '/servicios/mejora-procesos',
      },
      {
        title: 'Implementación ERP',
        href: '/servicios/implementacion-erp',
      },
      {
        title: 'Gobernanza Corporativa',
        href: '/servicios/gobernanza-corporativa',
      },
    ],
  },
  { title: 'Clientes', href: '/clientes' },
  { title: 'Nosotros', href: '/nosotros' },
  { title: 'Blog', href: '/blog' },
]

interface NavigationProps {
  mobile?: boolean
}

/**
 * Navigation component - Main navigation menu
 * Supports dropdown for services
 */
export function Navigation({ mobile = false }: NavigationProps) {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)

  if (mobile) {
    return (
      <nav className="flex flex-col space-y-4">
        {navItems.map(item => (
          <div key={item.title}>
            {item.children ? (
              <div>
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.title ? null : item.title)}
                  className="flex w-full items-center justify-between text-base font-medium text-neutral-900"
                >
                  {item.title}
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform',
                      openDropdown === item.title && 'rotate-180'
                    )}
                  />
                </button>
                {openDropdown === item.title && (
                  <div className="mt-2 space-y-2 pl-4">
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href!}
                        className={cn(
                          'block text-sm text-neutral-600 hover:text-primary-600',
                          pathname === child.href && 'font-semibold text-primary-600'
                        )}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href!}
                className={cn(
                  'text-base font-medium text-neutral-900 hover:text-primary-600',
                  pathname === item.href && 'text-primary-600'
                )}
              >
                {item.title}
              </Link>
            )}
          </div>
        ))}
      </nav>
    )
  }

  return (
    <nav className="flex items-center gap-6">
      {navItems.map(item => (
        <div key={item.title} className="relative group">
          {item.children ? (
            <>
              <button className="flex items-center gap-1 text-sm font-medium text-neutral-900 hover:text-primary-600">
                {item.title}
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-neutral-200 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-2">
                  {item.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href!}
                      className={cn(
                        'block rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-700',
                        pathname === child.href && 'bg-primary-50 font-semibold text-primary-700'
                      )}
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <Link
              href={item.href!}
              className={cn(
                'text-sm font-medium text-neutral-900 hover:text-primary-600',
                pathname === item.href && 'text-primary-600'
              )}
            >
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
