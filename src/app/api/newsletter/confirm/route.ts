/**
 * Newsletter Confirmation API Endpoint
 *
 * Handles email confirmation for newsletter subscriptions.
 * Validates token, activates subscription, and sends welcome email.
 *
 * @route GET /api/newsletter/confirm?token=xxx
 * @module app/api/newsletter/confirm
 */

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { eq, and, gt } from 'drizzle-orm'
import { db, newsletterSubscribers } from '@/lib/db'
import NewsletterWelcomeEmail from '@/components/emails/NewsletterWelcomeEmail'

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
 * Handle GET request for email confirmation
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Check database connection
    if (!db) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Error - DUO Soluciones</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body { font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; }
              h1 { color: #dc2626; }
              p { color: #4b5563; line-height: 1.6; }
              a { color: #1b5e5e; text-decoration: none; }
            </style>
          </head>
          <body>
            <h1>Servicio no disponible</h1>
            <p>El servicio no está disponible temporalmente. Por favor intenta nuevamente más tarde.</p>
            <p><a href="/">Volver al inicio</a></p>
          </body>
        </html>
        `,
        {
          status: 503,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }
      )
    }

    // 2. Extract token from query parameters
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Token Inválido - DUO Soluciones</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body { font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; }
              h1 { color: #dc2626; }
              p { color: #4b5563; line-height: 1.6; }
              a { color: #1b5e5e; text-decoration: none; font-weight: 600; }
            </style>
          </head>
          <body>
            <h1>Token Inválido</h1>
            <p>El enlace de confirmación no es válido.</p>
            <p><a href="/">Volver al inicio</a></p>
          </body>
        </html>
        `,
        {
          status: 400,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }
      )
    }

    // 3. Find subscriber with valid token
    const subscribers = await db
      .select()
      .from(newsletterSubscribers)
      .where(
        and(
          eq(newsletterSubscribers.verificationToken, token),
          gt(newsletterSubscribers.verificationTokenExpiry, new Date())
        )
      )
      .limit(1)

    if (subscribers.length === 0) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Token Expirado - DUO Soluciones</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body { font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; }
              h1 { color: #dc2626; }
              p { color: #4b5563; line-height: 1.6; }
              a { color: #1b5e5e; text-decoration: none; font-weight: 600; }
            </style>
          </head>
          <body>
            <h1>Token Expirado</h1>
            <p>El enlace de confirmación ha expirado o no es válido.</p>
            <p>Por favor, suscríbete nuevamente en nuestra página web.</p>
            <p><a href="/">Volver al inicio</a></p>
          </body>
        </html>
        `,
        {
          status: 400,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }
      )
    }

    const subscriber = subscribers[0]

    // 4. Check if already confirmed
    if (subscriber.isActive && subscriber.confirmedAt) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Ya Confirmado - DUO Soluciones</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body { font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; }
              h1 { color: #10b981; }
              p { color: #4b5563; line-height: 1.6; }
              a { color: #1b5e5e; text-decoration: none; font-weight: 600; }
            </style>
          </head>
          <body>
            <h1>Ya Estás Suscrito</h1>
            <p>Tu suscripción ya fue confirmada anteriormente.</p>
            <p>Recibirás nuestros próximos newsletters.</p>
            <p><a href="/">Volver al inicio</a></p>
          </body>
        </html>
        `,
        {
          status: 200,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }
      )
    }

    // 5. Activate subscription
    await db
      .update(newsletterSubscribers)
      .set({
        isActive: true,
        confirmedAt: new Date(),
        verificationToken: null,
        verificationTokenExpiry: null,
        updatedAt: new Date(),
      })
      .where(eq(newsletterSubscribers.id, subscriber.id))

    // 6. Send welcome email
    try {
      const resend = getResendClient()
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'no-reply@duo-soluciones.com'
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://duo-soluciones.com'
      const unsubscribeUrl = `${baseUrl}/api/newsletter/unsubscribe?token=${subscriber.unsubscribeToken}`

      await resend.emails.send({
        from: `DUO Soluciones <${fromEmail}>`,
        to: [subscriber.email],
        subject: 'Bienvenido al newsletter de DUO Soluciones Empresariales',
        react: NewsletterWelcomeEmail({
          email: subscriber.email,
          unsubscribeUrl,
        }),
      })

      console.log('[Newsletter Confirm] Welcome email sent:', subscriber.email)
    } catch (emailError) {
      // Log error but don't fail the confirmation
      console.error('[Newsletter Confirm] Welcome email failed:', emailError)
    }

    // 7. Return success page
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Suscripción Confirmada - DUO Soluciones</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              max-width: 600px;
              margin: 50px auto;
              padding: 20px;
              text-align: center;
              background-color: #f6f9fc;
            }
            .container {
              background: white;
              border-radius: 12px;
              padding: 40px 20px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #10b981;
              font-size: 32px;
              margin-bottom: 16px;
            }
            .checkmark {
              font-size: 64px;
              margin-bottom: 20px;
            }
            p {
              color: #4b5563;
              line-height: 1.6;
              margin-bottom: 12px;
            }
            .highlight {
              background-color: #f0fdf4;
              padding: 16px;
              border-radius: 8px;
              margin: 24px 0;
              border: 1px solid #86efac;
            }
            .highlight strong {
              color: #166534;
            }
            a {
              display: inline-block;
              background-color: #1b5e5e;
              color: white;
              text-decoration: none;
              font-weight: 600;
              padding: 12px 24px;
              border-radius: 8px;
              margin-top: 20px;
              transition: background-color 0.2s;
            }
            a:hover {
              background-color: #15504f;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="checkmark">✓</div>
            <h1>¡Suscripción Confirmada!</h1>
            <p>Tu suscripción al newsletter de DUO Soluciones Empresariales ha sido confirmada exitosamente.</p>
            <div class="highlight">
              <p><strong>${subscriber.email}</strong></p>
            </div>
            <p>Recibirás contenido exclusivo sobre desarrollo organizacional, mejora de procesos y transformación empresarial.</p>
            <p>Te hemos enviado un email de bienvenida con más información.</p>
            <a href="/">Volver al inicio</a>
          </div>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }
    )
  } catch (error) {
    console.error('[Newsletter Confirm] Unexpected error:', error)

    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Error - DUO Soluciones</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; }
            h1 { color: #dc2626; }
            p { color: #4b5563; line-height: 1.6; }
            a { color: #1b5e5e; text-decoration: none; font-weight: 600; }
          </style>
        </head>
        <body>
          <h1>Error Inesperado</h1>
          <p>Ocurrió un error al confirmar tu suscripción. Por favor intenta nuevamente más tarde.</p>
          <p><a href="/">Volver al inicio</a></p>
        </body>
      </html>
      `,
      {
        status: 500,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }
    )
  }
}
