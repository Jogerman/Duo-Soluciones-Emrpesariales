/**
 * Newsletter Subscription API Endpoint
 *
 * Handles newsletter subscriptions with:
 * - Zod validation
 * - GDPR compliance (explicit consent)
 * - Rate limiting (5 requests per hour per IP)
 * - Double opt-in (email confirmation required)
 * - Email sending with Resend
 * - Database storage with Drizzle
 *
 * @route POST /api/newsletter
 * @module app/api/newsletter
 */

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import crypto from 'crypto'
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter'
import { db, newsletterSubscribers } from '@/lib/db'
import NewsletterConfirmationEmail from '@/components/emails/NewsletterConfirmationEmail'

/**
 * Newsletter Subscription Schema with Zod validation
 */
const newsletterSchema = z.object({
  email: z
    .string()
    .email('Email inválido')
    .max(255, 'El email no puede exceder 255 caracteres')
    .toLowerCase()
    .trim(),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Debes aceptar los términos y condiciones',
    }),
  source: z.string().max(100).optional().default('homepage'),
})

type NewsletterData = z.infer<typeof newsletterSchema>

/**
 * Initialize Resend client
 */
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || apiKey === '') {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return new Resend(apiKey)
}

/**
 * Generate secure random token
 */
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * CORS headers configuration
 */
const corsHeaders = {
  'Access-Control-Allow-Origin':
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_APP_URL || 'https://duo-soluciones.com'
      : '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

/**
 * Handle OPTIONS request for CORS preflight
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  })
}

/**
 * Handle POST request for newsletter subscription
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Check database connection
    if (!db) {
      console.error('[Newsletter API] Database not configured')
      return NextResponse.json(
        {
          success: false,
          error: 'El servicio no está disponible temporalmente.',
        },
        { status: 503, headers: corsHeaders }
      )
    }

    // 2. Rate Limiting (5 per hour to prevent abuse)
    const clientIp = getClientIp(request)
    const rateLimitResult = await checkRateLimit(`newsletter:${clientIp}`)

    if (!rateLimitResult.success) {
      console.warn(`[Newsletter API] Rate limit exceeded for IP: ${clientIp}`)

      return NextResponse.json(
        {
          success: false,
          error: 'Demasiadas solicitudes. Por favor intenta de nuevo más tarde.',
          retryAfter: Math.ceil((rateLimitResult.reset.getTime() - Date.now()) / 1000 / 60),
        },
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Retry-After': Math.ceil(
              (rateLimitResult.reset.getTime() - Date.now()) / 1000
            ).toString(),
          },
        }
      )
    }

    // 3. Parse and validate request body
    let body: unknown
    try {
      body = await request.json()
    } catch (error) {
      console.error('[Newsletter API] Invalid JSON:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Datos inválidos.',
        },
        { status: 400, headers: corsHeaders }
      )
    }

    // 4. Validate with Zod schema
    const validationResult = newsletterSchema.safeParse(body)

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }))

      console.warn('[Newsletter API] Validation failed:', errors)

      return NextResponse.json(
        {
          success: false,
          error: 'Datos inválidos',
          errors,
        },
        { status: 400, headers: corsHeaders }
      )
    }

    const data: NewsletterData = validationResult.data

    // 5. Validate Resend API key
    if (!process.env.RESEND_API_KEY) {
      console.error('[Newsletter API] RESEND_API_KEY not configured')
      return NextResponse.json(
        {
          success: false,
          error: 'El servicio de email no está configurado.',
        },
        { status: 500, headers: corsHeaders }
      )
    }

    // 6. Check if email already exists
    const existingSubscriber = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, data.email))
      .limit(1)

    if (existingSubscriber.length > 0) {
      const subscriber = existingSubscriber[0]

      // If already active, return success
      if (subscriber.isActive) {
        return NextResponse.json(
          {
            success: true,
            message: 'Ya estás suscrito a nuestro newsletter.',
          },
          { status: 200, headers: corsHeaders }
        )
      }

      // If previously unsubscribed, allow re-subscription
      if (subscriber.unsubscribedAt) {
        // Generate new tokens
        const verificationToken = generateToken()
        const unsubscribeToken = generateToken()
        const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

        // Update existing record
        await db
          .update(newsletterSubscribers)
          .set({
            verificationToken,
            verificationTokenExpiry,
            unsubscribeToken,
            consentGiven: true,
            consentGivenAt: new Date(),
            source: data.source,
            unsubscribedAt: null,
            unsubscribeReason: null,
            updatedAt: new Date(),
          })
          .where(eq(newsletterSubscribers.email, data.email))

        // Send confirmation email
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://duo-soluciones.com'
        const confirmationUrl = `${baseUrl}/api/newsletter/confirm?token=${verificationToken}`

        try {
          const resend = getResendClient()
          const fromEmail = process.env.RESEND_FROM_EMAIL || 'no-reply@duo-soluciones.com'

          await resend.emails.send({
            from: `DUO Soluciones <${fromEmail}>`,
            to: [data.email],
            subject: 'Confirma tu suscripción al newsletter de DUO Soluciones',
            react: NewsletterConfirmationEmail({
              email: data.email,
              confirmationUrl,
            }),
          })

          console.log('[Newsletter API] Re-subscription confirmation sent:', data.email)

          return NextResponse.json(
            {
              success: true,
              message:
                'Te hemos enviado un email de confirmación. Por favor revisa tu bandeja de entrada.',
            },
            { status: 200, headers: corsHeaders }
          )
        } catch (emailError) {
          console.error('[Newsletter API] Email sending failed:', emailError)
          return NextResponse.json(
            {
              success: false,
              error: 'No pudimos enviar el email de confirmación. Intenta nuevamente.',
            },
            { status: 500, headers: corsHeaders }
          )
        }
      }

      // If pending confirmation, resend email
      return NextResponse.json(
        {
          success: true,
          message:
            'Ya te hemos enviado un email de confirmación. Por favor revisa tu bandeja de entrada.',
        },
        { status: 200, headers: corsHeaders }
      )
    }

    // 7. Create new subscription
    const verificationToken = generateToken()
    const unsubscribeToken = generateToken()
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    await db.insert(newsletterSubscribers).values({
      email: data.email,
      consentGiven: true,
      consentGivenAt: new Date(),
      verificationToken,
      verificationTokenExpiry,
      unsubscribeToken,
      source: data.source,
      isActive: false, // Will be activated after confirmation
    })

    // 8. Send confirmation email
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://duo-soluciones.com'
    const confirmationUrl = `${baseUrl}/api/newsletter/confirm?token=${verificationToken}`

    try {
      const resend = getResendClient()
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'no-reply@duo-soluciones.com'

      await resend.emails.send({
        from: `DUO Soluciones <${fromEmail}>`,
        to: [data.email],
        subject: 'Confirma tu suscripción al newsletter de DUO Soluciones',
        react: NewsletterConfirmationEmail({
          email: data.email,
          confirmationUrl,
        }),
      })

      console.log('[Newsletter API] Confirmation email sent:', data.email)

      // 9. Return success response
      return NextResponse.json(
        {
          success: true,
          message:
            'Te hemos enviado un email de confirmación. Por favor revisa tu bandeja de entrada y haz clic en el enlace para completar tu suscripción.',
        },
        { status: 200, headers: corsHeaders }
      )
    } catch (emailError) {
      console.error('[Newsletter API] Email sending failed:', emailError)

      // Delete the subscriber record if email failed
      await db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.email, data.email))

      return NextResponse.json(
        {
          success: false,
          error: 'No pudimos enviar el email de confirmación. Por favor intenta nuevamente.',
        },
        { status: 500, headers: corsHeaders }
      )
    }
  } catch (error) {
    console.error('[Newsletter API] Unexpected error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Ocurrió un error inesperado. Por favor intenta de nuevo más tarde.',
      },
      { status: 500, headers: corsHeaders }
    )
  }
}

/**
 * Reject other HTTP methods
 */
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: 'Método no permitido. Usa POST para suscribirte.',
    },
    { status: 405, headers: corsHeaders }
  )
}
