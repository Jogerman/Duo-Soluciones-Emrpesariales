/**
 * Newsletter Unsubscribe API Endpoint
 *
 * Handles newsletter unsubscriptions with optional feedback.
 * Provides one-click unsubscribe and optional reason form.
 *
 * @route GET /api/newsletter/unsubscribe?token=xxx
 * @route POST /api/newsletter/unsubscribe (with reason)
 * @module app/api/newsletter/unsubscribe
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db, newsletterSubscribers } from '@/lib/db'

/**
 * Unsubscribe with reason schema
 */
const unsubscribeSchema = z.object({
  token: z.string().min(1, 'Token requerido'),
  reason: z.string().max(500).optional(),
})

/**
 * Handle GET request for one-click unsubscribe
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
    const confirmed = searchParams.get('confirmed')

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
            <p>El enlace de cancelación no es válido.</p>
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

    // 3. Find subscriber with token
    const subscribers = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.unsubscribeToken, token))
      .limit(1)

    if (subscribers.length === 0) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Token No Encontrado - DUO Soluciones</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body { font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; }
              h1 { color: #dc2626; }
              p { color: #4b5563; line-height: 1.6; }
              a { color: #1b5e5e; text-decoration: none; font-weight: 600; }
            </style>
          </head>
          <body>
            <h1>Token No Encontrado</h1>
            <p>No pudimos encontrar una suscripción asociada a este enlace.</p>
            <p><a href="/">Volver al inicio</a></p>
          </body>
        </html>
        `,
        {
          status: 404,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }
      )
    }

    const subscriber = subscribers[0]

    // 4. If confirmed=true, show success page
    if (confirmed === 'true') {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Suscripción Cancelada - DUO Soluciones</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body {
                font-family: system-ui, -apple-system, sans-serif;
                max-width: 600px;
                margin: 50px auto;
                padding: 20px;
                background-color: #f6f9fc;
              }
              .container {
                background: white;
                border-radius: 12px;
                padding: 40px 20px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                text-align: center;
              }
              h1 {
                color: #1f2937;
                font-size: 28px;
                margin-bottom: 16px;
              }
              .icon {
                font-size: 48px;
                margin-bottom: 20px;
              }
              p {
                color: #4b5563;
                line-height: 1.6;
                margin-bottom: 12px;
              }
              .highlight {
                background-color: #f3f4f6;
                padding: 12px;
                border-radius: 8px;
                margin: 20px 0;
                font-weight: 600;
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
              <div class="icon">👋</div>
              <h1>Suscripción Cancelada</h1>
              <p>Tu suscripción al newsletter de DUO Soluciones ha sido cancelada exitosamente.</p>
              <div class="highlight">${subscriber.email}</div>
              <p>Ya no recibirás emails de nuestro newsletter.</p>
              <p>Lamentamos verte partir. Si cambias de opinión, siempre puedes volver a suscribirte en nuestra página web.</p>
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
    }

    // 5. Check if already unsubscribed
    if (subscriber.unsubscribedAt && !subscriber.isActive) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Ya Cancelado - DUO Soluciones</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body { font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; text-align: center; }
              h1 { color: #6b7280; }
              p { color: #4b5563; line-height: 1.6; }
              a { color: #1b5e5e; text-decoration: none; font-weight: 600; }
            </style>
          </head>
          <body>
            <h1>Ya Te Diste de Baja</h1>
            <p>Tu suscripción ya fue cancelada anteriormente.</p>
            <p>No recibirás más emails de nuestro newsletter.</p>
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

    // 6. Show unsubscribe confirmation form
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Cancelar Suscripción - DUO Soluciones</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              max-width: 600px;
              margin: 50px auto;
              padding: 20px;
              background-color: #f6f9fc;
            }
            .container {
              background: white;
              border-radius: 12px;
              padding: 40px 30px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #1f2937;
              font-size: 28px;
              margin-bottom: 16px;
              text-align: center;
            }
            p {
              color: #4b5563;
              line-height: 1.6;
              margin-bottom: 16px;
              text-align: center;
            }
            .email-box {
              background-color: #f3f4f6;
              padding: 12px;
              border-radius: 8px;
              text-align: center;
              margin: 24px 0;
              font-weight: 600;
              color: #1f2937;
            }
            .form-group {
              margin-bottom: 20px;
            }
            label {
              display: block;
              color: #374151;
              font-weight: 500;
              margin-bottom: 8px;
            }
            textarea {
              width: 100%;
              min-height: 100px;
              padding: 12px;
              border: 1px solid #d1d5db;
              border-radius: 8px;
              font-family: inherit;
              font-size: 14px;
              resize: vertical;
              box-sizing: border-box;
            }
            .button-group {
              display: flex;
              gap: 12px;
              margin-top: 24px;
            }
            button {
              flex: 1;
              padding: 12px 24px;
              border-radius: 8px;
              font-weight: 600;
              font-size: 15px;
              cursor: pointer;
              border: none;
              transition: all 0.2s;
            }
            .btn-unsubscribe {
              background-color: #dc2626;
              color: white;
            }
            .btn-unsubscribe:hover {
              background-color: #b91c1c;
            }
            .btn-cancel {
              background-color: #f3f4f6;
              color: #374151;
            }
            .btn-cancel:hover {
              background-color: #e5e7eb;
            }
            .loading {
              display: none;
              text-align: center;
              padding: 20px;
            }
            .spinner {
              border: 3px solid #f3f4f6;
              border-top: 3px solid #1b5e5e;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin: 0 auto;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>¿Cancelar Suscripción?</h1>
            <p>Lamentamos que quieras dejar de recibir nuestro newsletter.</p>
            <div class="email-box">${subscriber.email}</div>
            <p style="font-size: 14px; color: #6b7280;">
              Si cancelas tu suscripción, no recibirás más actualizaciones sobre desarrollo organizacional, mejora de procesos y contenido exclusivo de DUO Soluciones.
            </p>

            <form id="unsubscribeForm">
              <div class="form-group">
                <label for="reason">¿Por qué te das de baja? (Opcional)</label>
                <textarea
                  id="reason"
                  name="reason"
                  placeholder="Tu feedback nos ayuda a mejorar..."
                  maxlength="500"
                ></textarea>
              </div>

              <div class="button-group">
                <button type="button" class="btn-cancel" onclick="window.location.href='/'">
                  Mantener Suscripción
                </button>
                <button type="submit" class="btn-unsubscribe">
                  Confirmar Cancelación
                </button>
              </div>
            </form>

            <div class="loading" id="loading">
              <div class="spinner"></div>
              <p>Procesando...</p>
            </div>
          </div>

          <script>
            document.getElementById('unsubscribeForm').addEventListener('submit', async (e) => {
              e.preventDefault();

              const form = e.target;
              const loading = document.getElementById('loading');
              const reason = document.getElementById('reason').value;

              form.style.display = 'none';
              loading.style.display = 'block';

              try {
                const response = await fetch('/api/newsletter/unsubscribe', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    token: '${token}',
                    reason: reason
                  })
                });

                if (response.ok) {
                  window.location.href = '/api/newsletter/unsubscribe?token=${token}&confirmed=true';
                } else {
                  alert('Ocurrió un error. Por favor intenta nuevamente.');
                  form.style.display = 'block';
                  loading.style.display = 'none';
                }
              } catch (error) {
                alert('Ocurrió un error. Por favor intenta nuevamente.');
                form.style.display = 'block';
                loading.style.display = 'none';
              }
            });
          </script>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }
    )
  } catch (error) {
    console.error('[Newsletter Unsubscribe] Unexpected error:', error)

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
          <p>Ocurrió un error al procesar tu solicitud. Por favor intenta nuevamente más tarde.</p>
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

/**
 * Handle POST request for unsubscribe with reason
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Check database connection
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Servicio no disponible' },
        { status: 503 }
      )
    }

    // 2. Parse and validate request body
    const body = await request.json()
    const validationResult = unsubscribeSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Datos inválidos' },
        { status: 400 }
      )
    }

    const { token, reason } = validationResult.data

    // 3. Find subscriber
    const subscribers = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.unsubscribeToken, token))
      .limit(1)

    if (subscribers.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Suscripción no encontrada' },
        { status: 404 }
      )
    }

    const subscriber = subscribers[0]

    // 4. Update subscription status
    await db
      .update(newsletterSubscribers)
      .set({
        isActive: false,
        unsubscribedAt: new Date(),
        unsubscribeReason: reason || null,
        updatedAt: new Date(),
      })
      .where(eq(newsletterSubscribers.id, subscriber.id))

    console.log('[Newsletter Unsubscribe] User unsubscribed:', subscriber.email, reason)

    // 5. Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Suscripción cancelada exitosamente',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Newsletter Unsubscribe POST] Unexpected error:', error)

    return NextResponse.json(
      { success: false, error: 'Error inesperado' },
      { status: 500 }
    )
  }
}
