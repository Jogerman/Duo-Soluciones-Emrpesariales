'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Card, CardContent } from '@/components/ui/Card'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

// Zod validation schema (matches API route schema)
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),
  email: z
    .string()
    .email('Por favor ingresa un email válido')
    .max(255, 'El email no puede exceder 255 caracteres')
    .toLowerCase()
    .trim(),
  company: z
    .string()
    .max(200, 'El nombre de la empresa no puede exceder 200 caracteres')
    .trim()
    .optional(),
  phone: z.string().optional(),
  service: z.string().min(1, 'Por favor selecciona un servicio'),
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje no puede exceder 2000 caracteres')
    .trim(),
  honeypot: z.string().optional(), // Should be empty (spam protection)
})

type ContactFormData = z.infer<typeof contactFormSchema>

interface ContactFormProps {
  className?: string
}

export function ContactForm({ className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al enviar el mensaje')
      }

      setSubmitStatus('success')
      reset() // Reset form after successful submission
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Error desconocido')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className={className}>
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Solicita una Consulta Gratuita</h2>
          <p className="mt-2 text-gray-600">
            Completa el formulario y un miembro de nuestro equipo te contactará dentro de 24 horas
            para agendar tu consulta gratuita de 30 minutos.
          </p>
        </div>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900">¡Mensaje enviado exitosamente!</h3>
                <p className="mt-1 text-sm text-green-700">
                  Gracias por contactarnos. Un miembro de nuestro equipo revisará tu solicitud y te
                  contactará dentro de 24 horas para agendar tu consulta gratuita.
                </p>
                <p className="mt-2 text-sm text-green-700">
                  ¿Necesitas ayuda inmediata? Llámanos al +1 (809) 555-0100 o envíanos un WhatsApp.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900">Error al enviar el mensaje</h3>
                <p className="mt-1 text-sm text-red-700">
                  {errorMessage ||
                    'Hubo un problema enviando tu solicitud. Por favor intenta nuevamente o contáctanos directamente por teléfono o WhatsApp.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Honeypot Field (hidden) */}
          <input
            type="text"
            {...register('honeypot')}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Juan Pérez"
              {...register('name')}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email corporativo <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="juan.perez@empresa.com"
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Company and Phone Row */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Company Field */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Empresa
              </label>
              <Input
                id="company"
                type="text"
                placeholder="Nombre de tu empresa"
                {...register('company')}
              />
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <Input id="phone" type="tel" placeholder="+1 (809) 555-1234" {...register('phone')} />
            </div>
          </div>

          {/* Service Field */}
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
              Servicio de interés <span className="text-red-500">*</span>
            </label>
            <Select
              id="service"
              {...register('service')}
              aria-invalid={errors.service ? 'true' : 'false'}
              aria-describedby={errors.service ? 'service-error' : undefined}
            >
              <option value="">Selecciona un servicio</option>
              <option value="desarrollo-organizacional">Desarrollo Organizacional</option>
              <option value="mejora-procesos">Mejora de Procesos</option>
              <option value="implementacion-erp">Implementación ERP</option>
              <option value="gobernanza-corporativa">Gobernanza Corporativa</option>
              <option value="no-seguro">No estoy seguro / Consulta general</option>
            </Select>
            {errors.service && (
              <p id="service-error" className="mt-1 text-sm text-red-600">
                {errors.service.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Mensaje <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="message"
              rows={5}
              placeholder="Cuéntanos brevemente sobre tu desafío u objetivo..."
              {...register('message')}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-600">
                {errors.message.message}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">Máximo 2000 caracteres</p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
            aria-label={isSubmitting ? 'Enviando solicitud...' : 'Enviar solicitud'}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Solicitud'
            )}
          </Button>

          <p className="text-xs text-center text-gray-500">
            Al enviar este formulario, aceptas nuestra Política de Privacidad y Términos de
            Servicio.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
