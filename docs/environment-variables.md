# Environment Variables Documentation

**DUO Soluciones Empresariales**

Complete reference for all environment variables required for production deployment.

**Last Updated:** October 2025
**Version:** 1.0.0

---

## Table of Contents

1. [Overview](#overview)
2. [Required Variables](#required-variables)
3. [Optional Variables](#optional-variables)
4. [Variable Categories](#variable-categories)
5. [How to Configure in Vercel](#how-to-configure-in-vercel)
6. [Security Best Practices](#security-best-practices)
7. [Secrets Management](#secrets-management)

---

## Overview

This document lists all environment variables used in the DUO Soluciones Empresariales application. Variables are categorized by:

- **Priority:** CRITICAL, HIGH, MEDIUM, LOW
- **Environment:** Development, Production, or Both
- **Visibility:** Server-only or Client-exposed (NEXT_PUBLIC_*)

**Total Variables:** 28 documented variables

---

## Required Variables

These variables MUST be set for the application to function in production.

### Application Configuration

#### NODE_ENV
- **Priority:** CRITICAL
- **Type:** String
- **Environment:** Production
- **Value:** `production`
- **Description:** Sets the Node.js environment mode
- **Required:** Yes

```bash
NODE_ENV=production
```

#### NEXT_PUBLIC_APP_URL
- **Priority:** CRITICAL
- **Type:** String (URL)
- **Environment:** Both
- **Format:** `https://your-domain.com` (no trailing slash)
- **Description:** Public URL of your application
- **Required:** Yes
- **Client Exposed:** Yes

```bash
NEXT_PUBLIC_APP_URL=https://duosoluciones.com
```

### Database

#### DATABASE_URL
- **Priority:** CRITICAL
- **Type:** String (Connection String)
- **Environment:** Both
- **Format:** `postgresql://user:password@host:port/database`
- **Description:** PostgreSQL database connection string (Supabase)
- **Required:** Yes
- **Security:** Server-only (DO NOT expose with NEXT_PUBLIC_)

**Get from:** Supabase Dashboard > Project Settings > Database > Connection String > Connection Pooling

```bash
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

**Important Notes:**
- Use "Connection pooling" mode (port 5432) for production
- Use "Transaction" mode for better compatibility
- Never commit this value to Git
- Use connection pooling to avoid exhausting database connections

### Authentication

#### NEXTAUTH_URL
- **Priority:** CRITICAL
- **Type:** String (URL)
- **Environment:** Production
- **Format:** `https://your-domain.com` (no trailing slash)
- **Description:** Canonical URL for NextAuth.js
- **Required:** Yes
- **Must Match:** NEXT_PUBLIC_APP_URL

```bash
NEXTAUTH_URL=https://duosoluciones.com
```

**Important:** Must exactly match your production domain (including https://)

#### NEXTAUTH_SECRET
- **Priority:** CRITICAL
- **Type:** String (Base64)
- **Environment:** Both
- **Generate:** `openssl rand -base64 32`
- **Description:** Secret key for encrypting JWT tokens and sessions
- **Required:** Yes
- **Security:** NEVER reuse between environments

```bash
NEXTAUTH_SECRET=OZVRrebPIUzV88kPEa798imw97q4mvD8U/OrF2xGzIE=
```

**Generation:**
```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### Payload CMS

#### PAYLOAD_SECRET
- **Priority:** CRITICAL
- **Type:** String (Base64)
- **Environment:** Both
- **Generate:** `openssl rand -base64 32`
- **Description:** Secret key for Payload CMS JWT tokens
- **Required:** Yes
- **Security:** MUST be different from NEXTAUTH_SECRET

```bash
PAYLOAD_SECRET=J/sP/1z8HdtkyUV8zi9v0qjHvj4Qyn2jHQ/g4u0LkBY=
```

#### PAYLOAD_PUBLIC_SERVER_URL
- **Priority:** HIGH
- **Type:** String (URL)
- **Environment:** Both
- **Value:** Same as NEXT_PUBLIC_APP_URL
- **Description:** Public URL for Payload CMS
- **Required:** Yes

```bash
PAYLOAD_PUBLIC_SERVER_URL=https://duosoluciones.com
```

### Media Storage (Cloudinary)

#### CLOUDINARY_CLOUD_NAME
- **Priority:** HIGH
- **Type:** String
- **Environment:** Both
- **Get from:** Cloudinary Dashboard
- **Description:** Your Cloudinary cloud name
- **Required:** Yes for media uploads

```bash
CLOUDINARY_CLOUD_NAME=duo-soluciones
```

#### CLOUDINARY_API_KEY
- **Priority:** HIGH
- **Type:** String
- **Environment:** Both
- **Get from:** Cloudinary Dashboard > Account Details
- **Description:** Cloudinary API key
- **Required:** Yes for server-side uploads

```bash
CLOUDINARY_API_KEY=123456789012345
```

#### CLOUDINARY_API_SECRET
- **Priority:** HIGH
- **Type:** String
- **Environment:** Production
- **Get from:** Cloudinary Dashboard > Account Details
- **Description:** Cloudinary API secret
- **Required:** Yes for server-side uploads
- **Security:** Server-only

```bash
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

#### NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- **Priority:** HIGH
- **Type:** String
- **Environment:** Both
- **Value:** Same as CLOUDINARY_CLOUD_NAME
- **Description:** Public cloud name for client-side operations
- **Required:** Yes for client uploads
- **Client Exposed:** Yes

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=duo-soluciones
```

### Email Service (Resend)

#### RESEND_API_KEY
- **Priority:** HIGH
- **Type:** String
- **Environment:** Both
- **Get from:** Resend Dashboard > API Keys
- **Description:** API key for sending emails
- **Required:** Yes for contact form and notifications
- **Security:** Server-only

```bash
RESEND_API_KEY=re_123456789_abcdefghijklmnopqrstuvwxyz
```

**Get from:** https://resend.com/api-keys

#### RESEND_FROM_EMAIL
- **Priority:** HIGH
- **Type:** String (Email)
- **Environment:** Both
- **Format:** `name@verified-domain.com`
- **Description:** Sender email address
- **Required:** Yes
- **Important:** Must use a verified domain in Resend

```bash
RESEND_FROM_EMAIL=no-reply@duosoluciones.com
```

#### CONTACT_EMAIL_TO
- **Priority:** MEDIUM
- **Type:** String (Email)
- **Environment:** Both
- **Description:** Recipient email for contact form submissions
- **Required:** No (defaults to RESEND_FROM_EMAIL)

```bash
CONTACT_EMAIL_TO=info@duosoluciones.com
```

---

## Optional Variables

These variables enhance functionality but are not required for basic operation.

### Rate Limiting (Upstash Redis)

#### UPSTASH_REDIS_REST_URL
- **Priority:** MEDIUM
- **Type:** String (URL)
- **Environment:** Production
- **Get from:** Upstash Dashboard > Redis Database > REST API
- **Description:** Redis REST API URL for rate limiting
- **Required:** No (falls back to in-memory rate limiting)
- **Recommended:** Yes for production (multi-server deployments)

```bash
UPSTASH_REDIS_REST_URL=https://your-redis-instance.upstash.io
```

#### UPSTASH_REDIS_REST_TOKEN
- **Priority:** MEDIUM
- **Type:** String
- **Environment:** Production
- **Get from:** Upstash Dashboard > Redis Database > REST API
- **Description:** Redis REST API token
- **Required:** No (if URL is not set)
- **Security:** Server-only

```bash
UPSTASH_REDIS_REST_TOKEN=AaaaBbbCcccDdddEeeeeFffffGgggggHhhhhIiiii=
```

**Note:** Without Upstash Redis, rate limiting will use in-memory storage (works for single-instance deployments but doesn't scale across multiple servers).

### Analytics

#### NEXT_PUBLIC_GA_MEASUREMENT_ID
- **Priority:** MEDIUM
- **Type:** String
- **Environment:** Production
- **Format:** `G-XXXXXXXXXX`
- **Get from:** Google Analytics > Admin > Data Streams
- **Description:** Google Analytics 4 measurement ID
- **Required:** No
- **Client Exposed:** Yes

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123DEF4
```

#### NEXT_PUBLIC_GTM_ID
- **Priority:** LOW
- **Type:** String
- **Environment:** Production
- **Format:** `GTM-XXXXXXX`
- **Get from:** Google Tag Manager
- **Description:** Google Tag Manager container ID
- **Required:** No (alternative to GA4)
- **Client Exposed:** Yes

```bash
NEXT_PUBLIC_GTM_ID=GTM-ABCD123
```

#### NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
- **Priority:** LOW
- **Type:** String
- **Environment:** Production
- **Get from:** Google Search Console > Settings > Ownership verification
- **Description:** Google Search Console verification code
- **Required:** No
- **Client Exposed:** Yes

```bash
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abcdefghijklmnopqrstuvwxyz123456789
```

#### NEXT_PUBLIC_VERCEL_ANALYTICS_ID
- **Priority:** LOW
- **Type:** String
- **Environment:** Production
- **Description:** Vercel Analytics ID (auto-configured if using Vercel Analytics)
- **Required:** No
- **Client Exposed:** Yes

```bash
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=auto
```

### Monitoring

#### SENTRY_DSN
- **Priority:** MEDIUM
- **Type:** String (URL)
- **Environment:** Production
- **Get from:** Sentry.io > Project Settings > Client Keys (DSN)
- **Description:** Sentry Data Source Name for error tracking
- **Required:** No
- **Recommended:** Yes for production

```bash
SENTRY_DSN=https://abc123def456@o123456.ingest.sentry.io/789012
```

#### SENTRY_AUTH_TOKEN
- **Priority:** LOW
- **Type:** String
- **Environment:** Production
- **Get from:** Sentry.io > Settings > Auth Tokens
- **Description:** Auth token for uploading source maps
- **Required:** No (only for source map uploads)
- **Security:** Server-only

```bash
SENTRY_AUTH_TOKEN=sntrys_abc123def456...
```

### OAuth Providers (Optional)

#### GOOGLE_CLIENT_ID
- **Priority:** LOW
- **Type:** String
- **Environment:** Both
- **Get from:** Google Cloud Console > Credentials
- **Description:** Google OAuth client ID
- **Required:** No (only if using Google sign-in)

```bash
GOOGLE_CLIENT_ID=123456789012-abc123def456.apps.googleusercontent.com
```

#### GOOGLE_CLIENT_SECRET
- **Priority:** LOW
- **Type:** String
- **Environment:** Both
- **Get from:** Google Cloud Console > Credentials
- **Description:** Google OAuth client secret
- **Required:** No (only if using Google sign-in)
- **Security:** Server-only

```bash
GOOGLE_CLIENT_SECRET=GOCSPX-abc123def456ghi789jkl012
```

### Social Integration (Future)

#### LINKEDIN_CLIENT_ID
- **Priority:** LOW
- **Type:** String
- **Environment:** Production
- **Description:** LinkedIn API client ID for blog sync
- **Required:** No (future feature)

```bash
LINKEDIN_CLIENT_ID=
```

#### LINKEDIN_CLIENT_SECRET
- **Priority:** LOW
- **Type:** String
- **Environment:** Production
- **Description:** LinkedIn API client secret
- **Required:** No (future feature)
- **Security:** Server-only

```bash
LINKEDIN_CLIENT_SECRET=
```

#### SPOTIFY_CLIENT_ID
- **Priority:** LOW
- **Type:** String
- **Environment:** Production
- **Description:** Spotify API client ID for podcast sync
- **Required:** No (future feature)

```bash
SPOTIFY_CLIENT_ID=
```

#### SPOTIFY_CLIENT_SECRET
- **Priority:** LOW
- **Type:** String
- **Environment:** Production
- **Description:** Spotify API client secret
- **Required:** No (future feature)
- **Security:** Server-only

```bash
SPOTIFY_CLIENT_SECRET=
```

### Feature Flags

#### NEXT_PUBLIC_ENABLE_ANALYTICS
- **Priority:** LOW
- **Type:** Boolean
- **Environment:** Both
- **Values:** `true` or `false`
- **Description:** Enable/disable analytics tracking
- **Default:** `false`
- **Client Exposed:** Yes

```bash
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

#### NEXT_PUBLIC_ENABLE_LINKEDIN_SYNC
- **Priority:** LOW
- **Type:** Boolean
- **Environment:** Both
- **Values:** `true` or `false`
- **Description:** Enable LinkedIn blog synchronization
- **Default:** `false`
- **Client Exposed:** Yes

```bash
NEXT_PUBLIC_ENABLE_LINKEDIN_SYNC=false
```

#### NEXT_PUBLIC_ENABLE_SPOTIFY_SYNC
- **Priority:** LOW
- **Type:** Boolean
- **Environment:** Both
- **Values:** `true` or `false`
- **Description:** Enable Spotify podcast synchronization
- **Default:** `false`
- **Client Exposed:** Yes

```bash
NEXT_PUBLIC_ENABLE_SPOTIFY_SYNC=false
```

### Development Tools

#### DEBUG
- **Priority:** LOW
- **Type:** Boolean
- **Environment:** Development
- **Values:** `true` or `false`
- **Description:** Enable debug logging
- **Default:** `false`
- **Production:** Should be `false`

```bash
DEBUG=false
```

#### LOG_LEVEL
- **Priority:** LOW
- **Type:** String
- **Environment:** Both
- **Values:** `error`, `warn`, `info`, `debug`
- **Description:** Logging level
- **Default:** `info`

```bash
LOG_LEVEL=info
```

---

## Variable Categories

### By Priority

#### CRITICAL (Must Set)
1. `NODE_ENV`
2. `NEXT_PUBLIC_APP_URL`
3. `DATABASE_URL`
4. `NEXTAUTH_URL`
5. `NEXTAUTH_SECRET`
6. `PAYLOAD_SECRET`

#### HIGH (Should Set)
7. `CLOUDINARY_CLOUD_NAME`
8. `CLOUDINARY_API_KEY`
9. `CLOUDINARY_API_SECRET`
10. `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
11. `RESEND_API_KEY`
12. `RESEND_FROM_EMAIL`

#### MEDIUM (Recommended)
13. `UPSTASH_REDIS_REST_URL`
14. `UPSTASH_REDIS_REST_TOKEN`
15. `SENTRY_DSN`
16. `NEXT_PUBLIC_GA_MEASUREMENT_ID`
17. `CONTACT_EMAIL_TO`

#### LOW (Optional)
18. All other variables

### By Service

#### Database
- `DATABASE_URL`

#### Authentication
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

#### CMS
- `PAYLOAD_SECRET`
- `PAYLOAD_PUBLIC_SERVER_URL`

#### Media Storage
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

#### Email
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_EMAIL_TO`

#### Rate Limiting
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

#### Analytics
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_VERCEL_ANALYTICS_ID`

#### Monitoring
- `SENTRY_DSN`
- `SENTRY_AUTH_TOKEN`

#### OAuth
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

---

## How to Configure in Vercel

### Step 1: Access Environment Variables

1. Log in to Vercel dashboard
2. Select your project
3. Navigate to "Settings"
4. Click "Environment Variables" in sidebar

### Step 2: Add Variables

For each variable:

1. Click "Add" or "Add Another"
2. Enter variable name (e.g., `DATABASE_URL`)
3. Enter variable value
4. Select environments:
   - Production: For production deployments
   - Preview: For PR preview deployments
   - Development: For local `vercel dev`

**Recommended Environment Selection:**

- **All Environments:** Feature flags, non-sensitive config
- **Production + Preview:** Most variables
- **Production Only:** Production-specific API keys, credentials

### Step 3: Redeploy

After adding/updating variables:

1. Click "Save"
2. Trigger redeploy:
   - Option A: Push to GitHub (auto-deploy)
   - Option B: Click "Redeploy" in Deployments tab

### Step 4: Verify

Check deployment logs to confirm variables are loaded:

```
✓ Environment variables loaded
✓ Database connection successful
✓ External services configured
```

---

## Security Best Practices

### 1. Never Commit Secrets

**DO:**
- Use `.env.local` for local secrets (in .gitignore)
- Use `.env.example` for documentation (with placeholder values)
- Store production secrets in Vercel dashboard

**DON'T:**
- Commit `.env.local` to Git
- Hardcode secrets in code
- Share secrets in public channels

### 2. Use Strong Secrets

**Requirements:**
- Minimum 32 characters for `NEXTAUTH_SECRET` and `PAYLOAD_SECRET`
- Use cryptographically secure random generation
- Different secrets for each environment

**Generate:**
```bash
# Strong secret (recommended)
openssl rand -base64 32

# Or use online generator
# https://generate-secret.vercel.app
```

### 3. Client vs Server Variables

**NEXT_PUBLIC_* Variables:**
- Exposed to browser
- Visible in client-side code
- Use ONLY for non-sensitive data

**Server-Only Variables:**
- Never exposed to client
- Use for API keys, secrets, credentials
- Never prefix with `NEXT_PUBLIC_`

### 4. Environment Separation

**Production Secrets:**
- Unique secrets for production
- Never reuse development secrets
- Rotate regularly (every 90 days)

**Development Secrets:**
- Separate secrets for development
- Safe to share with team
- Different API keys (use test/sandbox modes)

### 5. Access Control

**Limit Access:**
- Only necessary team members
- Use Vercel team roles
- Enable 2FA on all accounts
- Regular access reviews

### 6. Secrets Rotation

**Rotation Schedule:**
- `NEXTAUTH_SECRET`: Every 90 days
- `PAYLOAD_SECRET`: Every 90 days
- API Keys: When compromised or annually
- Database passwords: Every 180 days

**Rotation Process:**
1. Generate new secret
2. Update in Vercel
3. Deploy with new secret
4. Verify application works
5. Invalidate old secret

### 7. Monitoring

**Track Usage:**
- API key usage (Resend, Cloudinary dashboards)
- Unusual access patterns
- Failed authentication attempts
- Error logs for exposed secrets

---

## Secrets Management

### Vercel Environment Variables

**Advantages:**
- Encrypted at rest
- Secure transmission
- Access control
- Audit logs
- Easy rotation

**Best for:**
- Production secrets
- Team collaboration
- Multi-environment deployments

### Local Development

**Use `.env.local`:**
```bash
# Copy example file
cp .env.example .env.local

# Edit with your values
nano .env.local

# Never commit!
git status # Should not show .env.local
```

### CI/CD Secrets

**GitHub Actions:**
Store secrets in: Repository Settings > Secrets and variables > Actions

```yaml
# In workflow file
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
```

### Team Sharing

**Secure Methods:**
1. **Password Manager** (1Password, LastPass)
   - Share via team vault
   - Access control
   - Audit trail

2. **Vercel Team Access**
   - Team members can access via Vercel CLI
   - No need to share secrets directly

3. **Encrypted Communication**
   - Use Signal, encrypted email
   - Never via Slack, Discord, regular email

---

## Validation Checklist

Before deploying, verify:

- [ ] All CRITICAL variables set
- [ ] All HIGH priority variables configured
- [ ] Secrets generated with `openssl rand -base64 32`
- [ ] Production secrets different from development
- [ ] No secrets committed to Git
- [ ] `.env.local` in `.gitignore`
- [ ] `NEXTAUTH_URL` matches `NEXT_PUBLIC_APP_URL`
- [ ] Database connection string uses connection pooling
- [ ] Cloudinary credentials verified
- [ ] Resend domain verified and API key active
- [ ] Client-exposed variables use `NEXT_PUBLIC_` prefix
- [ ] Sensitive variables do NOT use `NEXT_PUBLIC_` prefix

---

## Troubleshooting

### Variable Not Loading

**Symptoms:**
- `undefined` when accessing variable
- Application errors about missing config

**Solutions:**
1. Check spelling (case-sensitive!)
2. Verify set in correct environment (Production/Preview/Development)
3. Redeploy after adding variable
4. Check Vercel deployment logs
5. For `NEXT_PUBLIC_` variables, rebuild is required

### Database Connection Fails

**Check:**
1. `DATABASE_URL` format correct
2. Password doesn't contain special characters that need encoding
3. Using connection pooling URL (port 5432)
4. Supabase project is active
5. No trailing spaces in value

### Authentication Issues

**Check:**
1. `NEXTAUTH_URL` exactly matches domain (including protocol)
2. `NEXTAUTH_SECRET` is set and has sufficient length
3. No CORS issues (check browser console)
4. Cookies enabled in browser
5. Secure cookies configured for HTTPS

---

## Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Security Best Practices](./security-checklist.md)
- [Deployment Guide](./deployment-guide.md)

---

**Document Version:** 1.0.0
**Total Variables Documented:** 28
**Last Updated:** October 2025
**Next Review:** January 2026
