/**
 * Contact Form API Endpoint
 *
 * Handles contact form submissions with:
 * - Zod validation
 * - Rate limiting (5 requests per 10 minutes per IP)
 * - Spam protection (honeypot field)
 * - Email sending with Resend
 * - Auto-response to user
 * - Notification to company
 *
 * @route POST /api/contact
 * @module app/api/contact
 */

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { checkRateLimit, getClientIp } from '@/lib/rate-limiter';
import ContactEmail from '@/components/emails/ContactEmail';
import AutoResponseEmail from '@/components/emails/AutoResponseEmail';

/**
 * Contact Form Schema with Zod validation
 */
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),
  email: z
    .string()
    .email('Email inválido')
    .max(255, 'El email no puede exceder 255 caracteres')
    .toLowerCase()
    .trim(),
  company: z
    .string()
    .max(200, 'El nombre de la empresa no puede exceder 200 caracteres')
    .trim()
    .optional(),
  service: z
    .string()
    .min(1, 'Por favor selecciona un servicio')
    .max(200, 'El servicio no puede exceder 200 caracteres'),
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje no puede exceder 2000 caracteres')
    .trim(),
  honeypot: z
    .string()
    .max(0, 'Spam detected')
    .optional()
    .default(''), // Anti-spam honeypot field (should be empty)
});

type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Initialize Resend client
 */
const resend = new Resend(process.env.RESEND_API_KEY);

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
};

/**
 * Handle OPTIONS request for CORS preflight
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

/**
 * Handle POST request for contact form submission
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting
    const clientIp = getClientIp(request);
    const rateLimitResult = await checkRateLimit(clientIp);

    if (!rateLimitResult.success) {
      console.warn(`[Contact API] Rate limit exceeded for IP: ${clientIp}`);

      return NextResponse.json(
        {
          success: false,
          error: 'Demasiadas solicitudes. Por favor intenta de nuevo más tarde.',
          retryAfter: Math.ceil(
            (rateLimitResult.reset.getTime() - Date.now()) / 1000 / 60
          ), // minutes
        },
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Retry-After': Math.ceil(
              (rateLimitResult.reset.getTime() - Date.now()) / 1000
            ).toString(),
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toISOString(),
          },
        }
      );
    }

    // 2. Parse and validate request body
    let body: unknown;
    try {
      body = await request.json();
    } catch (error) {
      console.error('[Contact API] Invalid JSON:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Datos inválidos. Por favor verifica la información enviada.',
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // 3. Validate with Zod schema
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      console.warn('[Contact API] Validation failed:', errors);

      return NextResponse.json(
        {
          success: false,
          error: 'Datos inválidos',
          errors,
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const formData: ContactFormData = validationResult.data;

    // 4. Spam Protection - Check honeypot field
    if (formData.honeypot && formData.honeypot.length > 0) {
      console.warn(
        `[Contact API] Spam detected from IP: ${clientIp}, honeypot filled`
      );

      // Return success to prevent spam bot detection
      // But don't actually send emails
      return NextResponse.json(
        {
          success: true,
          message: 'Mensaje enviado correctamente',
        },
        { status: 200, headers: corsHeaders }
      );
    }

    // 5. Validate Resend API key
    if (!process.env.RESEND_API_KEY) {
      console.error('[Contact API] RESEND_API_KEY not configured');
      return NextResponse.json(
        {
          success: false,
          error:
            'El servicio de email no está configurado. Por favor contacta al administrador.',
        },
        { status: 500, headers: corsHeaders }
      );
    }

    // 6. Prepare email data
    const submittedAt = new Date().toLocaleString('es-MX', {
      timeZone: 'America/Mexico_City',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    const companyEmail =
      process.env.CONTACT_EMAIL_TO || 'info@duo-soluciones.com';
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || 'no-reply@duo-soluciones.com';

    // 7. Send emails (company notification + auto-response)
    try {
      // Send notification to company
      const companyEmailResult = await resend.emails.send({
        from: `DUO Soluciones <${fromEmail}>`,
        to: [companyEmail],
        replyTo: formData.email, // Allow direct reply to customer
        subject: `Nuevo contacto de ${formData.name}`,
        react: ContactEmail({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          service: formData.service,
          message: formData.message,
          submittedAt,
        }),
      });

      console.log(
        '[Contact API] Company notification sent:',
        companyEmailResult.data?.id || 'unknown'
      );

      // Send auto-response to user
      const autoResponseResult = await resend.emails.send({
        from: `DUO Soluciones <${fromEmail}>`,
        to: [formData.email],
        subject: 'Gracias por contactar a DUO Soluciones Empresariales',
        react: AutoResponseEmail({
          name: formData.name,
        }),
      });

      console.log(
        '[Contact API] Auto-response sent:',
        autoResponseResult.data?.id || 'unknown'
      );

      // 8. Log successful submission
      console.log('[Contact API] Form submitted successfully:', {
        name: formData.name,
        email: formData.email,
        service: formData.service,
        company: formData.company,
        ip: clientIp,
        timestamp: submittedAt,
      });

      // 9. Return success response
      return NextResponse.json(
        {
          success: true,
          message:
            'Mensaje enviado correctamente. Te responderemos en breve.',
        },
        {
          status: 200,
          headers: {
            ...corsHeaders,
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toISOString(),
          },
        }
      );
    } catch (emailError) {
      // Email sending failed
      console.error('[Contact API] Email sending failed:', emailError);

      // Check if it's a Resend API error
      if (emailError instanceof Error) {
        console.error('[Contact API] Email error details:', {
          message: emailError.message,
          stack: emailError.stack,
        });
      }

      return NextResponse.json(
        {
          success: false,
          error:
            'No pudimos enviar tu mensaje. Por favor intenta de nuevo o contáctanos directamente.',
        },
        { status: 500, headers: corsHeaders }
      );
    }
  } catch (error) {
    // Catch-all error handler
    console.error('[Contact API] Unexpected error:', error);

    return NextResponse.json(
      {
        success: false,
        error:
          'Ocurrió un error inesperado. Por favor intenta de nuevo más tarde.',
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * Reject other HTTP methods
 */
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: 'Método no permitido. Usa POST para enviar el formulario.',
    },
    { status: 405, headers: corsHeaders }
  );
}

export async function PUT() {
  return GET();
}

export async function DELETE() {
  return GET();
}

export async function PATCH() {
  return GET();
}
