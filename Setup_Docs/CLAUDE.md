# 🤖 Claude Development Guide - DUO Soluciones Empresariales

## 📋 Instrucciones para Claude

Este documento contiene instrucciones específicas para Claude sobre cómo asistir en el desarrollo del proyecto DUO Soluciones Empresariales. Incluye patrones de código, mejores prácticas, y ejemplos específicos para este proyecto.

---

## 🎯 Contexto del Proyecto

### Resumen Ejecutivo
**Proyecto**: Web App institucional para DUO Soluciones Empresariales  
**Objetivo**: Crear presencia digital moderna que posicione a DUO como líder en desarrollo organizacional  
**Stack Principal**: Next.js 15 + TypeScript + TailwindCSS + Payload CMS + PostgreSQL  
**Timeline**: 9 semanas (MVP + Integraciones)  

### Principios de Desarrollo
1. **Mobile-First**: Diseño responsive desde mobile hacia desktop
2. **Performance-First**: Optimización desde el primer commit
3. **Accessibility-First**: WCAG 2.1 AA compliance obligatorio
4. **SEO-First**: Estructura semántica y metadatos desde el inicio
5. **TypeScript-First**: Type safety en todo el código

---

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios
```
src/
├── app/                          # Next.js 15 App Router
│   ├── (marketing)/             # Marketing pages group
│   │   ├── page.tsx             # Homepage
│   │   ├── about/page.tsx       # About page
│   │   ├── services/            # Services pages
│   │   ├── blog/               # Blog pages
│   │   ├── podcast/            # Podcast pages
│   │   └── contact/page.tsx    # Contact page
│   ├── (admin)/                # Admin dashboard group
│   │   └── admin/              # CMS admin pages
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── contact/           # Contact form endpoint
│   │   ├── linkedin/          # LinkedIn integration
│   │   └── spotify/           # Spotify integration
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── not-found.tsx          # 404 page
├── components/                 # React components
│   ├── ui/                    # Shadcn/ui base components
│   ├── marketing/             # Marketing-specific components
│   │   ├── hero/             # Hero sections
│   │   ├── services/         # Service components
│   │   ├── testimonials/     # Testimonial components
│   │   └── cta/              # Call-to-action components
│   ├── blog/                 # Blog components
│   ├── podcast/              # Podcast components
│   ├── forms/                # Form components
│   └── layout/               # Layout components
├── lib/                      # Utilities and configurations
│   ├── db/                   # Database configuration
│   ├── auth/                 # Authentication utilities
│   ├── integrations/         # API integrations
│   │   ├── linkedin.ts       # LinkedIn API client
│   │   └── spotify.ts        # Spotify API client
│   ├── utils.ts              # General utilities
│   ├── validations.ts        # Zod schemas
│   └── constants.ts          # App constants
├── types/                    # TypeScript type definitions
│   ├── database.ts           # Database types
│   ├── api.ts               # API types
│   └── components.ts        # Component types
└── styles/                   # Additional styles
    ├── components.css        # Component-specific styles
    └── utilities.css         # Utility classes
```

---

## 💻 Patrones de Código y Ejemplos

### 1. Componentes React con TypeScript

#### Componente de Página (Page Component)
```tsx
// src/app/(marketing)/services/page.tsx
import type { Metadata } from 'next'
import { ServiceHero } from '@/components/marketing/services/service-hero'
import { ServiceGrid } from '@/components/marketing/services/service-grid'
import { ServiceCTA } from '@/components/marketing/services/service-cta'

export const metadata: Metadata = {
  title: 'Servicios - DUO Soluciones Empresariales',
  description: 'Desarrollo organizacional, mejora de procesos, implementación ERP y gobernanza corporativa. Transformamos desafíos en oportunidades sostenibles.',
  openGraph: {
    title: 'Servicios - DUO Soluciones Empresariales',
    description: 'Desarrollo organizacional, mejora de procesos, implementación ERP y gobernanza corporativa.',
    url: 'https://duo-soluciones.com/services',
    type: 'website',
  },
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServiceHero />
      <ServiceGrid />
      <ServiceCTA />
    </main>
  )
}
```

#### Componente Reutilizable
```tsx
// src/components/marketing/services/service-card.tsx
import type { Service } from '@/types/database'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  service: Service
  className?: string
  featured?: boolean
}

export function ServiceCard({ service, className, featured = false }: ServiceCardProps) {
  return (
    <Card className={cn(
      "group hover:shadow-lg transition-all duration-300 border-border/50",
      featured && "border-primary/50 bg-primary/5",
      className
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className={cn(
            "p-2 rounded-lg",
            featured ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
          )}>
            {service.icon && <service.icon className="h-5 w-5" />}
          </div>
          {featured && (
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
              Destacado
            </span>
          )}
        </div>
        <CardTitle className="text-xl font-semibold leading-tight">
          {service.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {service.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        {service.benefits && service.benefits.length > 0 && (
          <ul className="space-y-2 mb-6">
            {service.benefits.slice(0, 3).map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        )}
        
        <Button asChild className="w-full group">
          <Link href={`/services/${service.slug}`}>
            Conocer más
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
```

### 2. API Routes con Next.js 15

#### Endpoint de Contacto
```tsx
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { ContactEmail } from '@/components/emails/contact-email'
import { rateLimiter } from '@/lib/rate-limiter'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  company: z.string().optional(),
  message: z.string().min(10, 'Mensaje debe tener al menos 10 caracteres'),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = request.ip ?? 'anonymous'
    const { success } = await rateLimiter.limit(identifier)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Intenta nuevamente en unos minutos.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'no-reply@duo-soluciones.com',
      to: ['info@duo-soluciones.com'],
      subject: `Nuevo contacto de ${validatedData.name}`,
      react: ContactEmail(validatedData),
    })

    if (error) {
      console.error('Error sending email:', error)
      return NextResponse.json(
        { error: 'Error enviando el mensaje. Intenta nuevamente.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Mensaje enviado correctamente', id: data?.id },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
```

### 3. Integración LinkedIn API

```tsx
// src/lib/integrations/linkedin.ts
import { z } from 'zod'

const linkedinPostSchema = z.object({
  id: z.string(),
  text: z.string(),
  publishedAt: z.string(),
  author: z.string(),
  permalink: z.string(),
  engagement: z.object({
    likes: z.number(),
    comments: z.number(),
    shares: z.number(),
  }),
})

export type LinkedinPost = z.infer<typeof linkedinPostSchema>

export class LinkedinClient {
  private accessToken: string
  private baseUrl = 'https://api.linkedin.com/v2'

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  async getCompanyPosts(companyId: string, limit = 20): Promise<LinkedinPost[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/shares?q=owners&owners=urn:li:organization:${companyId}&count=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`LinkedIn API error: ${response.status}`)
      }

      const data = await response.json()
      return data.elements.map(this.transformPost)
    } catch (error) {
      console.error('Error fetching LinkedIn posts:', error)
      throw error
    }
  }

  private transformPost(post: any): LinkedinPost {
    return linkedinPostSchema.parse({
      id: post.id,
      text: post.text?.text || '',
      publishedAt: new Date(post.publishedAt).toISOString(),
      author: post.owner,
      permalink: `https://linkedin.com/feed/update/${post.id}`,
      engagement: {
        likes: post.socialDetail?.totalShareStatistics?.likeCount || 0,
        comments: post.socialDetail?.totalShareStatistics?.commentCount || 0,
        shares: post.socialDetail?.totalShareStatistics?.shareCount || 0,
      },
    })
  }
}

// Hook para usar en componentes
export function useLinkedinPosts() {
  const [posts, setPosts] = useState<LinkedinPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/linkedin/posts')
        if (!response.ok) throw new Error('Failed to fetch posts')
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return { posts, loading, error }
}
```

### 4. Formularios con React Hook Form + Zod

```tsx
// src/components/forms/contact-form.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Send, CheckCircle } from 'lucide-react'

const contactFormSchema = z.object({
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  company: z.string().optional(),
  message: z.string().min(10, 'Mensaje debe tener al menos 10 caracteres'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error enviando el mensaje')
      }

      setIsSubmitted(true)
      reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          ¡Mensaje enviado correctamente! Te contactaremos pronto.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Tu nombre completo"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="tu@email.com"
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Empresa</Label>
        <Input
          id="company"
          {...register('company')}
          placeholder="Nombre de tu empresa (opcional)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensaje *</Label>
        <Textarea
          id="message"
          rows={4}
          {...register('message')}
          placeholder="Cuéntanos cómo podemos ayudarte..."
          className={errors.message ? 'border-red-500' : ''}
        />
        {errors.message && (
          <p className="text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {error && (
        <Alert className="bg-red-50 border-red-200">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Enviar mensaje
          </>
        )}
      </Button>
    </form>
  )
}
```

### 5. SEO y Metadatos

```tsx
// src/lib/seo.ts
import type { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}

export function generateSEO({
  title,
  description,
  path = '',
  image = '/images/og-default.jpg',
  type = 'website',
  publishedTime,
  modifiedTime,
}: SEOProps): Metadata {
  const url = `https://duo-soluciones.com${path}`
  const fullTitle = title.includes('DUO') ? title : `${title} - DUO Soluciones Empresariales`

  return {
    title: fullTitle,
    description,
    keywords: [
      'desarrollo organizacional',
      'mejora de procesos',
      'gobernanza corporativa',
      'ERP implementation',
      'MS Dynamics',
      'Power BI',
      'consultoría empresarial',
      'transformación digital',
    ],
    authors: [{ name: 'DUO Soluciones Empresariales' }],
    creator: 'DUO Soluciones Empresariales',
    publisher: 'DUO Soluciones Empresariales',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url,
      siteName: 'DUO Soluciones Empresariales',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@duosoluciones',
    },
    alternates: {
      canonical: url,
      languages: {
        'es': url,
        'en': `${url}/en`,
      },
    },
  }
}

// JSON-LD structured data
export function generateJsonLD(type: 'Organization' | 'Article', data: any) {
  const baseSchema = {
    '@context': 'https://schema.org',
  }

  switch (type) {
    case 'Organization':
      return {
        ...baseSchema,
        '@type': 'Organization',
        name: 'DUO Soluciones Empresariales',
        url: 'https://duo-soluciones.com',
        logo: 'https://duo-soluciones.com/images/logo.png',
        description: 'Transformamos desafíos en oportunidades sostenibles',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'DO',
          addressRegion: 'Santo Domingo',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'info@duo-soluciones.com',
          contactType: 'customer service',
        },
        sameAs: [
          'https://linkedin.com/company/duo-soluciones',
          'https://open.spotify.com/show/duo-podcast',
        ],
      }

    case 'Article':
      return {
        ...baseSchema,
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image,
        author: {
          '@type': 'Organization',
          name: 'DUO Soluciones Empresariales',
        },
        publisher: {
          '@type': 'Organization',
          name: 'DUO Soluciones Empresariales',
          logo: {
            '@type': 'ImageObject',
            url: 'https://duo-soluciones.com/images/logo.png',
          },
        },
        datePublished: data.publishedAt,
        dateModified: data.updatedAt,
      }

    default:
      return baseSchema
  }
}
```

---

## 🎨 Componentes de UI y Styling

### Patrones de TailwindCSS

#### Clases Reutilizables
```css
/* src/app/globals.css */

/* Layout */
.container-duo {
  @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
}

.section-duo {
  @apply py-16 lg:py-24;
}

/* Typography */
.heading-xl {
  @apply text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl;
}

.heading-lg {
  @apply text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl;
}

.heading-md {
  @apply text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl;
}

.body-lg {
  @apply text-lg leading-8 text-gray-600;
}

.body-base {
  @apply text-base leading-7 text-gray-600;
}

/* Buttons */
.btn-primary {
  @apply inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors;
}

.btn-secondary {
  @apply inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-sm ring-1 ring-inset ring-blue-200 hover:bg-blue-50 transition-colors;
}

/* Cards */
.card-duo {
  @apply rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow;
}

/* Animations */
.fade-in {
  @apply animate-in fade-in duration-700;
}

.slide-up {
  @apply animate-in slide-in-from-bottom-4 duration-700;
}

.stagger-children > * {
  @apply animate-in fade-in slide-in-from-bottom-2 duration-700;
}

.stagger-children > *:nth-child(1) { animation-delay: 0.1s; }
.stagger-children > *:nth-child(2) { animation-delay: 0.2s; }
.stagger-children > *:nth-child(3) { animation-delay: 0.3s; }
.stagger-children > *:nth-child(4) { animation-delay: 0.4s; }
```

#### Tema de Colores
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Brand colors basados en el logo DUO
        primary: {
          50: '#eff8ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Primary blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Secondary green
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
}
```

---

## 🔧 Herramientas y Configuración

### VS Code Settings
```json
// .vscode/settings.json
{
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### ESLint Configuration
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/self-closing-comp': 'error',
  },
}
```

---

## 📚 Guías Específicas para Claude

### 1. Cuando crear componentes
**CREAR componente cuando**:
- Se reutiliza en 2+ lugares
- Tiene lógica compleja (>50 líneas)
- Maneja estado específico
- Es una funcionalidad discreta

**NO CREAR componente cuando**:
- Es solo markup simple (<20 líneas)
- Se usa solo una vez
- No tiene lógica propia

### 2. Estructura de carpetas por funcionalidad
```
components/
├── ui/              # Componentes base (Button, Input, etc.)
├── marketing/       # Componentes de marketing
│   ├── hero/       # Hero sections específicos
│   ├── services/   # Todo lo relacionado con servicios
│   └── testimonials/ # Testimoniales y reviews
├── blog/           # Componentes específicos del blog
├── podcast/        # Componentes del podcast
└── layout/         # Layout y navegación
```

### 3. Convenciones de nombres
- **Componentes**: PascalCase (`ServiceCard`)
- **Archivos**: kebab-case (`service-card.tsx`)
- **Variables**: camelCase (`isLoading`)
- **Constantes**: SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes**: kebab-case (`hero-section`)

### 4. Props y TypeScript
```tsx
// ✅ BIEN: Props interface específica
interface ServiceCardProps {
  service: Service
  featured?: boolean
  onCTAClick?: () => void
  className?: string
}

// ❌ MAL: Props genéricas
interface Props {
  data: any
  config?: object
}
```

### 5. Gestión de Estado
```tsx
// ✅ BIEN: Estado local para UI simple
const [isOpen, setIsOpen] = useState(false)

// ✅ BIEN: React Query para datos de servidor
const { data: services, isLoading } = useQuery({
  queryKey: ['services'],
  queryFn: fetchServices
})

// ✅ BIEN: Zustand para estado global
const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
```

### 6. Manejo de Errores
```tsx
// ✅ BIEN: Error boundaries y fallbacks
export function ServiceCard({ service }: ServiceCardProps) {
  if (!service) {
    return <ServiceCardSkeleton />
  }

  return (
    <ErrorBoundary fallback={<ServiceCardError />}>
      {/* Component content */}
    </ErrorBoundary>
  )
}
```

### 7. Performance Optimization
```tsx
// ✅ BIEN: Lazy loading para componentes pesados
const PodcastPlayer = lazy(() => import('./podcast-player'))

// ✅ BIEN: useMemo para cálculos costosos
const filteredServices = useMemo(() => 
  services.filter(service => service.category === selectedCategory),
  [services, selectedCategory]
)

// ✅ BIEN: useCallback para funciones en dependencies
const handleServiceClick = useCallback((serviceId: string) => {
  // Handle click
}, [])
```

---

## 🚨 Reglas Importantes para Claude

### ❌ NUNCA hacer:
1. Usar `any` type sin justificación
2. Componentes >200 líneas sin dividir
3. Inline styles (usar TailwindCSS)
4. Fetch directo en componentes (usar React Query)
5. console.log en producción
6. Hardcodear URLs o textos

### ✅ SIEMPRE hacer:
1. TypeScript strict mode
2. Props interface definida
3. Error handling apropiado
4. Loading states
5. Responsive design
6. Accessibility (aria-labels, semantic HTML)
7. SEO metadata en páginas

### 🎯 Prioridades de desarrollo:
1. **Funcionalidad** - Que funcione correctamente
2. **Type Safety** - TypeScript sin errores
3. **Performance** - Optimizado y rápido
4. **Accessibility** - WCAG 2.1 AA compliant
5. **SEO** - Metadatos y estructura semántica
6. **UX** - Loading states y error handling

---

## 📞 Contacto y Support

Para dudas específicas del proyecto:
- **Technical Lead**: [Nombre del developer principal]
- **Design System**: Referirse a Shadcn/ui docs
- **API Integration**: Ver documentación en `/docs/api`
- **Deployment**: Seguir guía en Vercel docs

**Recursos útiles**:
- [Next.js 15 Docs](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Payload CMS Docs](https://payloadcms.com/docs)

---

**Última actualización**: Octubre 2025  
**Versión del documento**: 1.0  
**Responsable**: Project Manager DUO Soluciones
