# Contact Form API Documentation

**Version:** 1.0.0
**Last Updated:** October 2025
**Status:** Production Ready

---

## Table of Contents

1. [Overview](#overview)
2. [API Endpoint](#api-endpoint)
3. [Authentication](#authentication)
4. [Request Schema](#request-schema)
5. [Response Formats](#response-formats)
6. [Rate Limiting](#rate-limiting)
7. [Security Features](#security-features)
8. [Error Handling](#error-handling)
9. [Email Templates](#email-templates)
10. [Setup Instructions](#setup-instructions)
11. [Testing Guide](#testing-guide)
12. [Troubleshooting](#troubleshooting)
13. [Best Practices](#best-practices)

---

## Overview

The Contact Form API provides a secure, production-ready endpoint for handling contact form submissions on the DUO Soluciones Empresariales website.

### Key Features

- **Validation:** Zod schema validation for all inputs
- **Rate Limiting:** 5 requests per 10 minutes per IP address
- **Spam Protection:** Honeypot field to detect bots
- **Email Delivery:** Dual emails via Resend (company notification + auto-response)
- **Security:** CORS protection, input sanitization, error masking
- **Reliability:** Comprehensive error handling and logging
- **Scalability:** Redis-based rate limiting with in-memory fallback

---

## API Endpoint

### Base URL

```
Development: http://localhost:3000/api/contact
Production:  https://duo-soluciones.com/api/contact
```

### Method

```http
POST /api/contact
```

### Content-Type

```
application/json
```

---

## Authentication

**No authentication required** - This is a public endpoint.

However, it implements:
- IP-based rate limiting
- Honeypot spam detection
- CORS restrictions (production only)

---

## Request Schema

### Request Body

```typescript
{
  name: string;       // 2-100 characters, required
  email: string;      // Valid email format, required
  company?: string;   // 0-200 characters, optional
  service: string;    // 1-200 characters, required
  message: string;    // 10-2000 characters, required
  honeypot?: string;  // Must be empty (anti-spam field)
}
```

### Field Validation Rules

| Field      | Required | Min Length | Max Length | Validation                    |
| ---------- | -------- | ---------- | ---------- | ----------------------------- |
| name       | Yes      | 2          | 100        | Trimmed string                |
| email      | Yes      | -          | 255        | Valid email, lowercase        |
| company    | No       | -          | 200        | Trimmed string                |
| service    | Yes      | 1          | 200        | Non-empty string              |
| message    | Yes      | 10         | 2000       | Trimmed string                |
| honeypot   | No       | 0          | 0          | Must be empty (anti-spam)     |

### Example Request

```bash
curl -X POST https://duo-soluciones.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan.perez@example.com",
    "company": "Acme Corporation",
    "service": "Implementación ERP",
    "message": "Me gustaría obtener más información sobre sus servicios de implementación ERP.",
    "honeypot": ""
  }'
```

### Example Request (JavaScript/Fetch)

```javascript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    company: 'Acme Corporation',
    service: 'Implementación ERP',
    message: 'Me gustaría obtener más información sobre sus servicios de implementación ERP.',
    honeypot: '', // Important: leave empty
  }),
});

const data = await response.json();

if (data.success) {
  console.log('Email sent successfully!');
} else {
  console.error('Error:', data.error);
}
```

---

## Response Formats

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Mensaje enviado correctamente. Te responderemos en breve."
}
```

### Validation Error (400 Bad Request)

```json
{
  "success": false,
  "error": "Datos inválidos",
  "errors": [
    {
      "field": "email",
      "message": "Email inválido"
    },
    {
      "field": "message",
      "message": "El mensaje debe tener al menos 10 caracteres"
    }
  ]
}
```

### Rate Limit Exceeded (429 Too Many Requests)

```json
{
  "success": false,
  "error": "Demasiadas solicitudes. Por favor intenta de nuevo más tarde.",
  "retryAfter": 8
}
```

**Headers:**
```
Retry-After: 480
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 2025-10-20T10:30:00.000Z
```

### Email Service Error (500 Internal Server Error)

```json
{
  "success": false,
  "error": "No pudimos enviar tu mensaje. Por favor intenta de nuevo o contáctanos directamente."
}
```

### Method Not Allowed (405 Method Not Allowed)

```json
{
  "success": false,
  "error": "Método no permitido. Usa POST para enviar el formulario."
}
```

---

## Rate Limiting

### Configuration

- **Window:** 10 minutes (sliding window)
- **Limit:** 5 requests per IP address
- **Implementation:** Upstash Redis (with in-memory fallback)

### How It Works

1. Client IP is extracted from request headers (`x-forwarded-for`, `x-real-ip`, `cf-connecting-ip`)
2. Rate limiter checks if IP has exceeded limit
3. If exceeded, returns `429 Too Many Requests` with retry information
4. If allowed, request proceeds and counter is incremented

### Rate Limit Headers

All successful responses include:

```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
X-RateLimit-Reset: 2025-10-20T10:30:00.000Z
```

### Bypassing Rate Limits (Development)

For testing, you can:

1. **Use different IP addresses** (VPN, different networks)
2. **Wait 10 minutes** for the window to reset
3. **Clear Redis** (if using Upstash): Delete the key `ratelimit:contact:*`
4. **Restart server** (if using in-memory fallback)

---

## Security Features

### 1. Honeypot Anti-Spam

The `honeypot` field should be:
- Hidden with CSS (`display: none` or `position: absolute; left: -9999px`)
- Left empty by real users
- Filled by spam bots

If honeypot is filled, the API returns success but **does not send emails**.

### 2. Input Sanitization

All inputs are:
- Trimmed (whitespace removed)
- Validated with strict length limits
- Email addresses are lowercased
- Special characters are preserved (for names with accents, etc.)

### 3. CORS Protection

In production:
- Only allows requests from `NEXT_PUBLIC_APP_URL` or `duo-soluciones.com`
- Blocks cross-origin requests from other domains

In development:
- Allows all origins (`Access-Control-Allow-Origin: *`)

### 4. Error Masking

- Generic error messages for users
- Detailed errors logged to console (server-side only)
- Never exposes sensitive information (API keys, server details)

### 5. Rate Limiting

- Prevents brute force attacks
- Protects against email bombing
- Reduces server load from malicious actors

---

## Error Handling

### Client-Side Error Handling

```javascript
try {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    // Handle different error types
    if (response.status === 429) {
      alert(`Rate limit exceeded. Please try again in ${data.retryAfter} minutes.`);
    } else if (response.status === 400) {
      // Display validation errors
      data.errors?.forEach(err => {
        console.error(`${err.field}: ${err.message}`);
      });
    } else {
      alert(data.error || 'An error occurred');
    }
    return;
  }

  // Success
  alert(data.message);
} catch (error) {
  console.error('Network error:', error);
  alert('Network error. Please check your connection.');
}
```

### Server-Side Logging

All errors are logged with context:

```typescript
console.error('[Contact API] Email sending failed:', {
  error: error.message,
  name: formData.name,
  email: formData.email,
  ip: clientIp,
  timestamp: new Date().toISOString(),
});
```

---

## Email Templates

### 1. Company Notification Email

**Sent to:** `CONTACT_EMAIL_TO` (default: `info@duo-soluciones.com`)
**From:** `RESEND_FROM_EMAIL` (default: `no-reply@duo-soluciones.com`)
**Reply-To:** User's email address

**Template:** `src/components/emails/ContactEmail.tsx`

**Contains:**
- Contact information (name, email, company, service)
- Full message text
- Submission timestamp
- Action items for follow-up

### 2. Auto-Response Email

**Sent to:** User's email address
**From:** `RESEND_FROM_EMAIL`

**Template:** `src/components/emails/AutoResponseEmail.tsx`

**Contains:**
- Personalized greeting (uses first name)
- Confirmation of receipt
- Expected response time (24-48 hours)
- Next steps in the process
- Company contact information
- Links to services, blog, podcast

---

## Setup Instructions

### 1. Install Dependencies

Dependencies are already installed:

```bash
npm install resend @upstash/ratelimit react-email zod
```

### 2. Configure Environment Variables

Create `.env.local` and add:

```bash
# Required
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=no-reply@duo-soluciones.com
CONTACT_EMAIL_TO=info@duo-soluciones.com

# Optional (for Redis-based rate limiting)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here

# Optional (for CORS in production)
NEXT_PUBLIC_APP_URL=https://duo-soluciones.com
```

### 3. Get Resend API Key

1. Sign up at [https://resend.com](https://resend.com)
2. Verify your email
3. Add and verify your domain (or use `resend.dev` for testing)
4. Create an API key
5. Copy the key to `RESEND_API_KEY`

**For testing:** You can use `onboarding@resend.dev` as the from address.

### 4. Get Upstash Redis Credentials (Optional)

1. Sign up at [https://upstash.com](https://upstash.com)
2. Create a new Redis database
3. Copy the REST URL and REST TOKEN
4. Add to `.env.local`

**Note:** If not configured, the system uses in-memory rate limiting.

### 5. Verify Setup

```bash
npm run dev
```

Open [http://localhost:3000/api/contact](http://localhost:3000/api/contact)

You should see:
```json
{
  "success": false,
  "error": "Método no permitido. Usa POST para enviar el formulario."
}
```

---

## Testing Guide

### Manual Testing

#### 1. Test Successful Submission

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "service": "Desarrollo Organizacional",
    "message": "This is a test message from the contact form API.",
    "honeypot": ""
  }'
```

**Expected:**
- HTTP 200 OK
- Success message
- 2 emails sent (check Resend dashboard)

#### 2. Test Validation Errors

```bash
# Invalid email
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "invalid-email",
    "service": "Test",
    "message": "Short",
    "honeypot": ""
  }'
```

**Expected:**
- HTTP 400 Bad Request
- Validation errors array

#### 3. Test Rate Limiting

Submit 6 requests in quick succession:

```bash
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"Test $i\",\"email\":\"test$i@example.com\",\"service\":\"Test\",\"message\":\"Test message number $i\",\"honeypot\":\"\"}"
  echo "\n---"
done
```

**Expected:**
- First 5 requests: HTTP 200 OK
- 6th request: HTTP 429 Too Many Requests

#### 4. Test Honeypot (Spam Detection)

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Spam Bot",
    "email": "spam@example.com",
    "service": "Spam",
    "message": "This is spam",
    "honeypot": "I am a bot"
  }'
```

**Expected:**
- HTTP 200 OK (to trick bots)
- Success message
- **No emails sent** (check Resend dashboard)

### Automated Testing

Create a test file: `src/app/api/contact/route.test.ts`

```typescript
import { describe, it, expect, vi } from 'vitest';
import { POST } from './route';

describe('Contact Form API', () => {
  it('should validate required fields', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'A' }), // Too short
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should reject invalid email', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid',
        service: 'Test',
        message: 'Test message',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.errors).toBeDefined();
  });
});
```

Run tests:

```bash
npm run test
```

---

## Troubleshooting

### Issue: Emails not being sent

**Symptoms:**
- API returns success
- No emails received

**Solutions:**

1. **Check Resend API key:**
   ```bash
   echo $RESEND_API_KEY
   ```
   Should not be empty

2. **Check Resend dashboard:**
   - Go to [https://resend.com/emails](https://resend.com/emails)
   - Check for failed sends
   - Review error messages

3. **Verify domain:**
   - For production, domain must be verified
   - For testing, use `onboarding@resend.dev`

4. **Check server logs:**
   ```bash
   npm run dev
   ```
   Look for `[Contact API]` logs

### Issue: Rate limit errors

**Symptoms:**
- HTTP 429 after a few requests

**Solutions:**

1. **Wait 10 minutes** for the window to reset

2. **Clear Redis cache** (if using Upstash):
   ```bash
   # Using Upstash CLI or dashboard
   ```

3. **Restart development server** (if using in-memory):
   ```bash
   # Stop (Ctrl+C)
   npm run dev
   ```

### Issue: CORS errors in production

**Symptoms:**
- Blocked by CORS policy

**Solutions:**

1. **Check environment variables:**
   ```bash
   NEXT_PUBLIC_APP_URL=https://duo-soluciones.com
   ```

2. **Verify request origin** matches allowed origin

3. **Check browser console** for exact error

### Issue: Honeypot false positives

**Symptoms:**
- Real users being blocked

**Solutions:**

1. **Check CSS hiding:**
   ```css
   .honeypot {
     position: absolute;
     left: -9999px;
     opacity: 0;
     pointer-events: none;
   }
   ```

2. **Ensure field is empty** in form submission

3. **Check browser autofill** isn't filling the honeypot

---

## Best Practices

### Frontend Integration

1. **Progressive Enhancement:**
   - Disable submit button during API call
   - Show loading state
   - Display success/error messages

2. **Error Handling:**
   - Display field-specific validation errors
   - Handle network errors gracefully
   - Show retry option for rate limit errors

3. **User Experience:**
   - Clear form on success
   - Focus on first error field
   - Provide clear feedback

### Example Implementation

```jsx
'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setMessage('¡Mensaje enviado! Te contactaremos pronto.');
        e.target.reset();
      } else {
        setMessage(result.error || 'Error al enviar mensaje');
      }
    } catch (error) {
      setMessage('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" required minLength={2} />
      <input name="email" type="email" required />
      <input name="company" />
      <select name="service" required>
        <option value="">Selecciona un servicio</option>
        <option value="Desarrollo Organizacional">Desarrollo Organizacional</option>
        <option value="Mejora de Procesos">Mejora de Procesos</option>
        <option value="Implementación ERP">Implementación ERP</option>
        <option value="Gobernanza Corporativa">Gobernanza Corporativa</option>
      </select>
      <textarea name="message" required minLength={10} />

      {/* Honeypot field - hidden from users */}
      <input
        name="honeypot"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: 'absolute', left: '-9999px' }}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Mensaje'}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}
```

### Security Recommendations

1. **Always use HTTPS in production**
2. **Keep API keys in environment variables**
3. **Monitor rate limit violations**
4. **Review Resend logs regularly**
5. **Update dependencies monthly**
6. **Implement CSP headers** (Content Security Policy)
7. **Use Vercel/Railway secrets** for production

### Performance Optimization

1. **Use Redis for rate limiting** (Upstash) instead of in-memory
2. **Enable Resend analytics** to monitor delivery rates
3. **Implement request caching** for static content
4. **Monitor API response times** with logging
5. **Set up error tracking** (Sentry, LogRocket)

---

## API Reference Summary

### Endpoint

```
POST /api/contact
```

### Request Body

```typescript
{
  name: string (2-100 chars)
  email: string (valid email)
  company?: string (0-200 chars)
  service: string (1-200 chars)
  message: string (10-2000 chars)
  honeypot?: string (must be empty)
}
```

### Response Codes

- **200 OK:** Success
- **400 Bad Request:** Validation error
- **429 Too Many Requests:** Rate limit exceeded
- **500 Internal Server Error:** Server/email error
- **405 Method Not Allowed:** Wrong HTTP method

### Rate Limits

- 5 requests per 10 minutes per IP
- Sliding window algorithm

### Headers

```
Content-Type: application/json
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
X-RateLimit-Reset: <ISO 8601 timestamp>
```

---

## Support

For questions or issues:

- **Email:** dev@duo-soluciones.com
- **Documentation:** `/docs/contact-form-api.md`
- **Issue Tracker:** GitHub Issues

---

**Last Updated:** October 2025
**API Version:** 1.0.0
**Maintained by:** DUO Soluciones Empresariales Development Team
