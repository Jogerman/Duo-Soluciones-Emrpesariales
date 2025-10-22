# Newsletter System - Usage Examples

## Table of Contents
1. [Homepage Footer Integration](#homepage-footer-integration)
2. [Blog Sidebar Integration](#blog-sidebar-integration)
3. [Landing Page CTA](#landing-page-cta)
4. [Modal Popup](#modal-popup)
5. [Inline Form](#inline-form)

---

## Homepage Footer Integration

**Location**: `src/app/(marketing)/page.tsx` or Footer component

```tsx
import { NewsletterSignup } from '@/components/marketing/newsletter/NewsletterSignup'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="container-duo">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">DUO Soluciones</h3>
            <p className="text-neutral-400">
              Transformamos desafíos en oportunidades sostenibles
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-2">
            <NewsletterSignup
              source="footer"
              showDescription={true}
              className="max-w-2xl"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
```

---

## Blog Sidebar Integration

**Location**: `src/app/(marketing)/blog/[slug]/page.tsx` or Blog Layout

```tsx
import { NewsletterSignup } from '@/components/marketing/newsletter/NewsletterSignup'

export default function BlogSidebar() {
  return (
    <aside className="space-y-8">
      {/* Other sidebar widgets */}

      {/* Newsletter CTA */}
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
        <NewsletterSignup
          source="blog-sidebar"
          showDescription={true}
          buttonText="Suscribirme"
          placeholder="tu@email.com"
        />
      </div>
    </aside>
  )
}
```

---

## Landing Page CTA

**Location**: Service page or landing page hero section

```tsx
import { NewsletterSignup } from '@/components/marketing/newsletter/NewsletterSignup'

export default function ServiceCTA() {
  return (
    <section className="section-duo bg-gradient-to-br from-primary-600 to-secondary-700">
      <div className="container-duo">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-lg text-white mb-6">
            Mantente Actualizado con las Últimas Tendencias
          </h2>
          <p className="body-lg text-white/90 mb-8">
            Suscríbete para recibir insights exclusivos sobre desarrollo organizacional,
            mejora de procesos y transformación digital.
          </p>

          {/* Newsletter Form - Inline on desktop */}
          <div className="bg-white rounded-xl p-8 shadow-2xl">
            <NewsletterSignup
              source="services-cta"
              inline={true}
              showDescription={false}
              buttonText="Comenzar"
              className="max-w-2xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## Modal Popup

**Location**: Create a popup modal component

```tsx
'use client'

import { useState, useEffect } from 'react'
import { NewsletterSignup } from '@/components/marketing/newsletter/NewsletterSignup'
import { X } from 'lucide-react'

export function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show modal after 30 seconds if not already shown
    const hasShown = localStorage.getItem('newsletter-modal-shown')
    if (!hasShown) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        localStorage.setItem('newsletter-modal-shown', 'true')
      }, 30000) // 30 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full relative animate-in fade-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5 text-neutral-600" />
        </button>

        {/* Modal Content */}
        <div className="p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">
              No te pierdas nuestros mejores contenidos
            </h2>
            <p className="text-lg text-neutral-600">
              Únete a +500 profesionales que reciben insights exclusivos sobre desarrollo organizacional
            </p>
          </div>

          <NewsletterSignup
            source="modal-popup"
            showDescription={false}
            buttonText="Quiero Suscribirme"
          />

          <p className="text-xs text-center text-neutral-500 mt-4">
            Sin spam. Cancela cuando quieras.
          </p>
        </div>
      </div>
    </div>
  )
}

// Add to your root layout or page:
// import { NewsletterModal } from '@/components/marketing/newsletter/NewsletterModal'
// <NewsletterModal />
```

---

## Inline Form

**Location**: Content marketing pages, end of blog posts

```tsx
import { NewsletterSignup } from '@/components/marketing/newsletter/NewsletterSignup'

export default function BlogPostNewsletter() {
  return (
    <div className="my-12 border-t border-b border-neutral-200 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-start gap-6">
          {/* Icon or Image */}
          <div className="hidden md:block shrink-0">
            <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-3xl">📧</span>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-neutral-900 mb-2">
              ¿Te gustó este artículo?
            </h3>
            <p className="text-neutral-600 mb-4">
              Recibe contenido similar directamente en tu inbox cada semana.
            </p>

            <NewsletterSignup
              source="blog-post-inline"
              inline={true}
              showDescription={false}
              buttonText="Suscribirme"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## Advanced: Sticky Bottom Bar (Mobile)

**Location**: Create a sticky newsletter bar for mobile

```tsx
'use client'

import { useState, useEffect } from 'react'
import { NewsletterSignup } from '@/components/marketing/newsletter/NewsletterSignup'
import { X } from 'lucide-react'

export function StickyNewsletterBar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      // Show when user scrolls 50% of the page
      if (scrolled > docHeight * 0.5 && !isDismissed) {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-primary-600 shadow-2xl z-40 md:hidden animate-in slide-in-from-bottom duration-500">
      <div className="container-duo py-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <NewsletterSignup
              source="sticky-mobile-bar"
              showDescription={false}
              inline={true}
              buttonText="Suscribirme"
              placeholder="Email"
            />
          </div>

          <button
            onClick={() => {
              setIsDismissed(true)
              setIsVisible(false)
            }}
            className="shrink-0 p-2 rounded-full hover:bg-neutral-100"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Add to your root layout
```

---

## Props Reference

```typescript
interface NewsletterSignupProps {
  source?: string        // Tracking identifier (default: 'homepage')
  className?: string     // Custom CSS classes
  inline?: boolean       // Horizontal layout (default: false)
  placeholder?: string   // Email input placeholder (default: 'tu@email.com')
  buttonText?: string    // Submit button text (default: 'Suscribirse')
  showDescription?: boolean // Show form description (default: true)
}
```

---

## Best Practices

### 1. Source Tracking
Always use descriptive source values to track where subscriptions come from:

```tsx
// Good
<NewsletterSignup source="blog-post-bottom" />
<NewsletterSignup source="services-page-hero" />
<NewsletterSignup source="podcast-episode-123" />

// Bad
<NewsletterSignup source="form1" />
<NewsletterSignup source="newsletter" />
```

### 2. Mobile Optimization
Use inline layout on desktop, stacked on mobile:

```tsx
<NewsletterSignup
  inline={false}  // Stack on mobile
  className="lg:inline"  // Inline on desktop via CSS
/>
```

### 3. Context-Appropriate Copy
Customize the button text based on context:

```tsx
// Homepage: Generic
<NewsletterSignup buttonText="Suscribirse" />

// Blog: Engaging
<NewsletterSignup buttonText="Quiero Aprender Más" />

// Service page: Action-oriented
<NewsletterSignup buttonText="Comenzar Ahora" />

// Exit intent: Urgent
<NewsletterSignup buttonText="No Me Lo Quiero Perder" />
```

### 4. A/B Testing
Test different placements and copy:

```tsx
// Variant A: Above the fold
<section className="hero">
  <NewsletterSignup source="hero-variant-a" />
</section>

// Variant B: After first section
<section className="after-intro">
  <NewsletterSignup source="hero-variant-b" />
</section>
```

---

## Analytics & Tracking

Track newsletter signups in your analytics:

```typescript
// In NewsletterSignup component, after successful submission:
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'newsletter_signup', {
    method: source,
    event_category: 'engagement',
    event_label: source
  })
}
```

---

## Testing Locally

1. Start the development server:
```bash
npm run dev
```

2. Navigate to your page with the newsletter form

3. Test the flow:
   - Enter email and check consent
   - Submit form
   - Check console for confirmation email (if using test mode)
   - Click confirmation link
   - Verify welcome email

4. Test unsubscribe:
   - Use the unsubscribe link from welcome email
   - Verify confirmation form
   - Complete unsubscribe
   - Check database

---

## Common Issues

### Form not submitting
- Check that Resend API key is configured
- Verify database connection
- Check browser console for errors

### Email not received
- Check spam folder
- Verify Resend domain is verified
- Check Resend dashboard for delivery status

### Styling issues
- Ensure Tailwind CSS is properly configured
- Check for CSS conflicts
- Verify all UI components are imported

---

## Need Help?

Review:
- [NEWSLETTER_SYSTEM.md](./NEWSLETTER_SYSTEM.md) - Complete system documentation
- [Setup_Docs/CLAUDE.md](./Setup_Docs/CLAUDE.md) - Project coding standards
- Resend Dashboard - Email delivery logs
- Database - Subscriber records

---

**Last Updated**: Sprint 4 - Wave 1
**Component Version**: 1.0.0
