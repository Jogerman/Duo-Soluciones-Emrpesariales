/**
 * Newsletter Signup Component
 *
 * Reusable newsletter subscription form with:
 * - Email validation with Zod
 * - GDPR-compliant consent checkbox
 * - Loading states
 * - Success/error messages
 * - Responsive design
 * - Integration with newsletter API
 *
 * @module components/marketing/newsletter/NewsletterSignup
 */

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Checkbox } from '@/components/ui/Checkbox'
import { Label } from '@/components/ui/Label'
import { Alert, AlertDescription } from '@/components/ui/Alert'
import { Loader2, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Newsletter signup form schema
 */
const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Por favor ingresa un email válido')
    .toLowerCase()
    .trim(),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Debes aceptar los términos para continuar',
    }),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

interface NewsletterSignupProps {
  /** Source identifier for tracking (e.g., 'homepage', 'blog', 'footer') */
  source?: string
  /** Custom className for styling */
  className?: string
  /** Show inline layout (horizontal) instead of stacked */
  inline?: boolean
  /** Custom placeholder text */
  placeholder?: string
  /** Custom button text */
  buttonText?: string
  /** Show description text */
  showDescription?: boolean
}

/**
 * NewsletterSignup Component
 *
 * Allows users to subscribe to the newsletter with email validation
 * and GDPR-compliant consent checkbox.
 */
export function NewsletterSignup({
  source = 'homepage',
  className,
  inline = false,
  placeholder = 'tu@email.com',
  buttonText = 'Suscribirse',
  showDescription = true,
}: NewsletterSignupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      consent: false,
    },
  })

  const consentValue = watch('consent')

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          consent: data.consent,
          source,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Error al suscribirse')
      }

      setIsSubmitted(true)
      reset()

      // Auto-hide success message after 10 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 10000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className={cn('w-full', className)}>
        <Alert variant="success" className="animate-in fade-in slide-in-from-bottom-2 duration-500" role="status" aria-live="polite">
          <CheckCircle className="h-4 w-4" aria-hidden="true" />
          <AlertDescription>
            <strong>Revisa tu email</strong>
            <br />
            Te hemos enviado un enlace de confirmación. Por favor revisa tu bandeja de entrada (y spam) para completar tu suscripción.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      {showDescription && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-neutral-900 mb-1">
            Suscríbete a nuestro Newsletter
          </h3>
          <p className="text-sm text-neutral-600">
            Recibe contenido exclusivo sobre desarrollo organizacional, mejora de procesos y transformación empresarial.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <div className={cn('flex gap-3', inline ? 'flex-row items-start' : 'flex-col')}>
          <div className={cn('flex-1', !inline && 'w-full')}>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400"
                aria-hidden="true"
              />
              <Input
                type="email"
                placeholder={placeholder}
                className={cn('pl-10', errors.email && 'border-red-500')}
                disabled={isSubmitting}
                aria-label="Email"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {inline && (
            <Button
              type="submit"
              disabled={isSubmitting || !consentValue}
              size="md"
              variant="primary"
              className="shrink-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                buttonText
              )}
            </Button>
          )}
        </div>

        {/* GDPR Consent Checkbox */}
        <div className="flex items-start gap-2">
          <Checkbox
            id={`consent-${source}`}
            disabled={isSubmitting}
            aria-invalid={errors.consent ? 'true' : 'false'}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            {...register('consent')}
          />
          <div className="flex-1">
            <Label
              htmlFor={`consent-${source}`}
              className="text-xs leading-relaxed text-neutral-600 cursor-pointer"
            >
              Acepto recibir comunicaciones de DUO Soluciones Empresariales. Puedo cancelar mi suscripción en cualquier momento. Lee nuestra{' '}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 underline underline-offset-2"
              >
                Política de Privacidad
              </a>
              .
            </Label>
            {errors.consent && (
              <p id="consent-error" className="mt-1 text-xs text-red-600" role="alert">
                {errors.consent.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button (Stacked Layout) */}
        {!inline && (
          <Button
            type="submit"
            disabled={isSubmitting || !consentValue}
            size="md"
            variant="primary"
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              buttonText
            )}
          </Button>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2 duration-300" role="alert" aria-live="assertive">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </form>

      {/* Additional Info */}
      <p className="mt-3 text-xs text-neutral-500">
        Frecuencia: 1-2 emails por semana. Sin spam. Puedes cancelar cuando quieras.
      </p>
    </div>
  )
}
