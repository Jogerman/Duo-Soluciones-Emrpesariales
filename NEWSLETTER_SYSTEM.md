# Newsletter System Documentation

## Overview

Complete newsletter subscription system for DUO Soluciones Empresariales with double opt-in confirmation, GDPR compliance, and full unsubscribe functionality.

## Features

- Double opt-in email confirmation
- GDPR-compliant consent checkbox
- Rate limiting (5 requests/hour per IP)
- Email validation with Zod
- Loading states and error handling
- Responsive design
- Database storage with Drizzle ORM
- Email sending via Resend
- Unsubscribe with optional feedback

## Components Created

### UI Components (Shadcn/ui)

1. **Checkbox** (`src/components/ui/Checkbox.tsx`)
   - Radix UI-based checkbox with DUO brand styling
   - Accessibility support
   - Checked/unchecked states

2. **Label** (`src/components/ui/Label.tsx`)
   - Radix UI-based label component
   - Proper form association

3. **Alert** (`src/components/ui/Alert.tsx`)
   - Alert container with variants: default, destructive, success, warning, info
   - AlertTitle and AlertDescription subcomponents

### Marketing Components

4. **NewsletterSignup** (`src/components/marketing/newsletter/NewsletterSignup.tsx`)
   - Main newsletter subscription form
   - Props:
     - `source`: tracking identifier (default: 'homepage')
     - `inline`: horizontal layout option
     - `placeholder`: custom email placeholder
     - `buttonText`: custom button text
     - `showDescription`: toggle description text
   - Features:
     - Email validation
     - GDPR consent checkbox
     - Loading states
     - Success/error messages
     - Auto-reset after success

### Email Templates

5. **NewsletterConfirmationEmail** (`src/components/emails/NewsletterConfirmationEmail.tsx`)
   - Double opt-in confirmation email
   - Includes verification link
   - 24-hour expiration notice
   - Professional branded design

6. **NewsletterWelcomeEmail** (`src/components/emails/NewsletterWelcomeEmail.tsx`)
   - Welcome email after confirmation
   - What to expect section
   - Unsubscribe link included
   - Call-to-action buttons

### API Endpoints

7. **POST /api/newsletter** (`src/app/api/newsletter/route.ts`)
   - Accept newsletter subscriptions
   - Validate email and consent
   - Check for existing subscriptions
   - Generate verification token
   - Send confirmation email
   - Rate limiting applied

8. **GET /api/newsletter/confirm** (`src/app/api/newsletter/confirm/route.ts`)
   - Validate confirmation token
   - Activate subscription
   - Send welcome email
   - Return success HTML page

9. **GET/POST /api/newsletter/unsubscribe** (`src/app/api/newsletter/unsubscribe/route.ts`)
   - GET: Show unsubscribe confirmation form
   - POST: Process unsubscribe with optional reason
   - Update database status
   - Return confirmation page

### Database Schema

10. **Newsletter Subscribers** (`src/lib/db/schema/newsletter.ts`)
    - Updated with GDPR compliance fields:
      - `consentGiven` (boolean)
      - `consentGivenAt` (timestamp)
      - `verificationToken` (text)
      - `verificationTokenExpiry` (timestamp)
      - `unsubscribeToken` (text, unique)
      - `unsubscribeReason` (text, optional)

## Installation

### 1. Install Missing Dependencies

```bash
npm install @radix-ui/react-checkbox @radix-ui/react-label
```

### 2. Run Database Migration

The schema has been updated. Generate and run the migration:

```bash
npm run db:generate
npm run db:migrate
```

Or push directly to database:

```bash
npm run db:push
```

### 3. Environment Variables

Ensure these variables are set in `.env.local`:

```bash
# Required
DATABASE_URL=your_database_url
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=no-reply@duo-soluciones.com
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional (for rate limiting)
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

## Usage

### Basic Usage (Homepage Footer)

```tsx
import { NewsletterSignup } from '@/components/marketing/newsletter/NewsletterSignup'

export default function Footer() {
  return (
    <footer>
      <NewsletterSignup
        source="footer"
        showDescription={true}
      />
    </footer>
  )
}
```

### Inline Layout (Sidebar)

```tsx
<NewsletterSignup
  source="blog-sidebar"
  inline={true}
  placeholder="Enter your email"
  buttonText="Subscribe"
  showDescription={false}
/>
```

### Custom Styling

```tsx
<NewsletterSignup
  source="landing-page"
  className="bg-white p-6 rounded-lg shadow-lg"
  buttonText="Get Updates"
/>
```

## User Flow

### Subscription Flow

1. User enters email and accepts consent checkbox
2. Form validates data with Zod
3. API checks rate limiting
4. API checks if email already exists
5. API creates subscriber record (inactive)
6. API sends confirmation email with token
7. User clicks confirmation link in email
8. API validates token and activates subscription
9. API sends welcome email
10. User sees success page

### Unsubscribe Flow

1. User clicks unsubscribe link in email
2. Shows confirmation form with optional feedback
3. User confirms unsubscription
4. API updates database (isActive = false)
5. User sees goodbye page

## API Response Examples

### POST /api/newsletter - Success

```json
{
  "success": true,
  "message": "Te hemos enviado un email de confirmación. Por favor revisa tu bandeja de entrada y haz clic en el enlace para completar tu suscripción."
}
```

### POST /api/newsletter - Already Subscribed

```json
{
  "success": true,
  "message": "Ya estás suscrito a nuestro newsletter."
}
```

### POST /api/newsletter - Rate Limited

```json
{
  "success": false,
  "error": "Demasiadas solicitudes. Por favor intenta de nuevo más tarde.",
  "retryAfter": 45
}
```

### POST /api/newsletter - Validation Error

```json
{
  "success": false,
  "error": "Datos inválidos",
  "errors": [
    {
      "field": "email",
      "message": "Por favor ingresa un email válido"
    },
    {
      "field": "consent",
      "message": "Debes aceptar los términos para continuar"
    }
  ]
}
```

## Security Features

1. **Rate Limiting**: 5 requests per hour per IP address
2. **Double Opt-in**: Email verification required before activation
3. **Token Expiration**: Verification tokens expire after 24 hours
4. **GDPR Compliance**: Explicit consent required and tracked
5. **Secure Tokens**: Cryptographically secure random tokens
6. **SQL Injection Protection**: Drizzle ORM parameterized queries
7. **CORS Protection**: Restricted to configured origins

## Database Queries

### Get Active Subscribers

```typescript
import { db, newsletterSubscribers } from '@/lib/db'
import { eq } from 'drizzle-orm'

const activeSubscribers = await db
  .select()
  .from(newsletterSubscribers)
  .where(eq(newsletterSubscribers.isActive, true))
```

### Get Subscribers by Source

```typescript
const blogSubscribers = await db
  .select()
  .from(newsletterSubscribers)
  .where(eq(newsletterSubscribers.source, 'blog'))
```

### Get Unsubscribe Reasons

```typescript
import { isNotNull } from 'drizzle-orm'

const unsubscribeReasons = await db
  .select({
    email: newsletterSubscribers.email,
    reason: newsletterSubscribers.unsubscribeReason,
    unsubscribedAt: newsletterSubscribers.unsubscribedAt,
  })
  .from(newsletterSubscribers)
  .where(isNotNull(newsletterSubscribers.unsubscribeReason))
```

## Testing Checklist

- [ ] Form validates email correctly
- [ ] Form requires consent checkbox
- [ ] Submission shows loading state
- [ ] Success message appears after submission
- [ ] Confirmation email received
- [ ] Confirmation link activates subscription
- [ ] Welcome email received after confirmation
- [ ] Duplicate subscription handled gracefully
- [ ] Rate limiting prevents abuse
- [ ] Unsubscribe link works
- [ ] Unsubscribe confirmation page shows
- [ ] Database records created/updated correctly
- [ ] All emails have unsubscribe links
- [ ] Mobile responsive design works
- [ ] Accessibility standards met

## Troubleshooting

### Email Not Received

1. Check RESEND_API_KEY is configured
2. Verify domain is verified in Resend dashboard
3. Check spam folder
4. Verify RESEND_FROM_EMAIL uses verified domain

### Rate Limit Issues

1. Configure Upstash Redis for production
2. In development, rate limiter uses in-memory fallback
3. Adjust rate limit in `src/lib/rate-limiter.ts` if needed

### Database Connection Issues

1. Verify DATABASE_URL is correct
2. Run migrations: `npm run db:migrate`
3. Check database connection permissions

### Token Expired

- Tokens expire after 24 hours
- User must request new confirmation email
- Delete expired tokens periodically (add cron job)

## Future Enhancements

1. **Admin Dashboard**: Manage subscribers, view analytics
2. **Segments**: Group subscribers by interests
3. **Email Templates**: Create/send newsletters from admin
4. **A/B Testing**: Test different signup forms
5. **Import/Export**: CSV import/export functionality
6. **Analytics**: Track open rates, click rates
7. **Automation**: Welcome series, drip campaigns
8. **Preferences**: Allow users to select topics of interest

## Files Created

```
src/
├── components/
│   ├── ui/
│   │   ├── Alert.tsx (NEW)
│   │   ├── Checkbox.tsx (NEW)
│   │   └── Label.tsx (NEW)
│   ├── marketing/
│   │   └── newsletter/
│   │       └── NewsletterSignup.tsx (NEW)
│   └── emails/
│       ├── NewsletterConfirmationEmail.tsx (NEW)
│       └── NewsletterWelcomeEmail.tsx (NEW)
├── app/
│   └── api/
│       └── newsletter/
│           ├── route.ts (NEW)
│           ├── confirm/
│           │   └── route.ts (NEW)
│           └── unsubscribe/
│               └── route.ts (NEW)
└── lib/
    └── db/
        └── schema/
            └── newsletter.ts (UPDATED)
```

## Support

For issues or questions:
- Review this documentation
- Check Setup_Docs/CLAUDE.md for project patterns
- Review existing API endpoints for similar patterns
- Check Resend dashboard for email delivery issues

## License

Part of DUO Soluciones Empresariales - Proprietary
