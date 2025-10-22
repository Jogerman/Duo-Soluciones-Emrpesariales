# Production Deployment Guide

**DUO Soluciones Empresariales - Next.js 15 Application**

**Version:** 1.0.0
**Last Updated:** October 2025
**Sprint:** Sprint 5 - Wave 2

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Pre-Deployment Preparation](#pre-deployment-preparation)
4. [Vercel Deployment](#vercel-deployment)
5. [Database Setup](#database-setup)
6. [Environment Configuration](#environment-configuration)
7. [Post-Deployment Verification](#post-deployment-verification)
8. [Custom Domain Setup](#custom-domain-setup)
9. [Troubleshooting](#troubleshooting)
10. [Rollback Procedures](#rollback-procedures)

---

## Overview

This guide provides step-by-step instructions for deploying the DUO Soluciones Empresariales web platform to production. The application is built with:

- **Framework:** Next.js 15 with TypeScript
- **Styling:** TailwindCSS + Shadcn/ui
- **Database:** PostgreSQL (Supabase)
- **CMS:** Payload CMS 3
- **Authentication:** NextAuth.js v5
- **Email:** Resend
- **Media Storage:** Cloudinary
- **Deployment:** Vercel (Primary) / Railway (Alternative)

### Deployment Architecture

```
Client Request
    ↓
Vercel Edge Network (CDN)
    ↓
Next.js Application (Vercel)
    ↓
├── Database (Supabase PostgreSQL)
├── Media Storage (Cloudinary)
├── Email Service (Resend)
└── Redis Cache (Upstash - Rate Limiting)
```

---

## Prerequisites

### Required Accounts

1. **Vercel Account** - https://vercel.com (Recommended deployment platform)
2. **Supabase Account** - https://supabase.com (PostgreSQL database)
3. **Cloudinary Account** - https://cloudinary.com (Media storage)
4. **Resend Account** - https://resend.com (Email service)
5. **GitHub Account** - https://github.com (Code repository)

### Optional Services

6. **Upstash Account** - https://upstash.com (Redis for rate limiting)
7. **Sentry Account** - https://sentry.io (Error monitoring)
8. **Google Analytics** - https://analytics.google.com (Website analytics)

### Local Development Tools

- Node.js 20.x or higher
- npm or yarn package manager
- Git version control
- Text editor (VS Code recommended)

---

## Pre-Deployment Preparation

### 1. Code Quality Verification

Run these commands locally to ensure code quality:

```bash
# Install dependencies
npm install

# Type checking
npm run type-check

# Linting
npm run lint

# Format checking
npm run format:check

# Run tests
npm test

# Build verification
npm run build
```

All commands should complete without errors before proceeding.

### 2. Git Repository Setup

```bash
# Ensure all changes are committed
git status

# Commit any pending changes
git add .
git commit -m "Pre-deployment: Final production-ready code"

# Push to GitHub
git push origin main

# Tag the release
git tag -a v1.0.0 -m "Production release v1.0.0"
git push origin v1.0.0
```

### 3. Environment Variables Preparation

Create a checklist of all required environment variables. See [environment-variables.md](./environment-variables.md) for complete documentation.

**Critical Variables:**
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Production URL
- `NEXTAUTH_SECRET` - Authentication secret
- `PAYLOAD_SECRET` - CMS secret
- `RESEND_API_KEY` - Email API key
- `CLOUDINARY_*` - Media storage credentials

### 4. Database Backup

Before deployment, create a database backup:

```bash
# Export current database schema
npm run db:generate

# Create backup (via Supabase Dashboard)
# Navigate to: Database > Backups > Create backup
```

---

## Vercel Deployment

### Step 1: Connect Repository

1. Log in to Vercel at https://vercel.com
2. Click "New Project"
3. Import your GitHub repository:
   - Select `Duo-Soluciones-Emrpesariales`
   - Click "Import"

### Step 2: Configure Project

**Framework Preset:** Next.js (auto-detected)

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `.next` (auto-detected)
- Install Command: `npm install`
- Development Command: `npm run dev`

**Root Directory:** `./` (default)

**Node.js Version:** 20.x (recommended)

### Step 3: Configure Environment Variables

In the Vercel project settings, add all environment variables. Click "Add Another" for each variable:

#### Required Variables

```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
DATABASE_URL=postgresql://... (from Supabase)
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=... (generate with: openssl rand -base64 32)
PAYLOAD_SECRET=... (generate with: openssl rand -base64 32)
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
RESEND_API_KEY=...
RESEND_FROM_EMAIL=no-reply@your-domain.com
```

**Important:**
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Never expose sensitive keys with `NEXT_PUBLIC_` prefix
- Generate unique secrets for production (never reuse development secrets)

### Step 4: Deploy

1. Click "Deploy" button
2. Monitor deployment logs in real-time
3. Wait for deployment to complete (typically 2-5 minutes)
4. Vercel will provide a deployment URL: `https://your-project.vercel.app`

### Step 5: Verify Deployment

Once deployed, test the following:

```bash
# Health check endpoint
curl https://your-project.vercel.app/api/health

# Expected response:
# {"status":"healthy","timestamp":"...","environment":"production"}
```

Open the deployment URL in browser:
- Homepage loads correctly
- Navigation works
- Images load from Cloudinary
- No console errors

---

## Database Setup

### 1. Supabase Project Setup

1. Log in to Supabase at https://supabase.com
2. Create new project:
   - Project name: `duo-soluciones-production`
   - Database password: (strong password - save securely)
   - Region: Choose closest to your users (e.g., `us-east-1`)
3. Wait for project provisioning (2-3 minutes)

### 2. Get Connection String

1. Navigate to: Project Settings > Database
2. Find "Connection string" section
3. Choose "Connection pooling" mode (recommended for production)
4. Copy the URI and replace `[YOUR-PASSWORD]` with your database password

**Format:**
```
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
```

### 3. Run Database Migrations

After deploying to Vercel, run migrations:

**Option A: Via Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Run migration
vercel env pull .env.production.local
npm run db:migrate
```

**Option B: Via GitHub Actions (Recommended)**

Create `.github/workflows/deploy-db.yml`:

```yaml
name: Deploy Database Migrations

on:
  workflow_dispatch:

jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run db:migrate
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### 4. Verify Database Connection

Check Vercel deployment logs for database connection:

```
✓ Connected to database
✓ Database migrations completed
✓ Tables created successfully
```

---

## Environment Configuration

### Required Services Setup

#### 1. Resend (Email Service)

1. Sign up at https://resend.com
2. Verify your domain:
   - Add DNS records (TXT, MX, CNAME)
   - Wait for verification (can take up to 48 hours)
3. Create API key:
   - Navigate to: API Keys > Create API Key
   - Name: `Production - DUO Soluciones`
   - Copy key and add to Vercel environment variables

**Test Email:**
```bash
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "no-reply@your-domain.com",
    "to": "test@example.com",
    "subject": "Test Email",
    "html": "<p>Test successful</p>"
  }'
```

#### 2. Cloudinary (Media Storage)

1. Sign up at https://cloudinary.com
2. Go to Dashboard:
   - Copy Cloud Name
   - Copy API Key
   - Copy API Secret
3. Add to Vercel environment variables
4. Configure upload presets (optional):
   - Settings > Upload > Upload presets
   - Create preset: `duo-soluciones-uploads`
   - Mode: Unsigned (for client uploads) or Signed (for server uploads)

**Test Upload:**
```javascript
// Test in browser console or API route
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('upload_preset', 'duo-soluciones-uploads');

fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
  method: 'POST',
  body: formData
}).then(r => r.json()).then(console.log);
```

#### 3. Upstash Redis (Rate Limiting)

1. Sign up at https://upstash.com
2. Create Redis database:
   - Name: `duo-soluciones-ratelimit`
   - Region: Same as Vercel deployment
   - Type: Regional (for better latency)
3. Copy credentials:
   - REST URL
   - REST Token
4. Add to Vercel environment variables

**Test Connection:**
```bash
curl -X POST https://[your-redis].upstash.io/set/testkey/testvalue \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### 4. Google Analytics (Optional)

1. Create GA4 property at https://analytics.google.com
2. Get Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to Vercel: `NEXT_PUBLIC_GA_MEASUREMENT_ID`

#### 5. Sentry (Error Monitoring - Optional)

1. Create project at https://sentry.io
2. Get DSN from project settings
3. Add to Vercel: `SENTRY_DSN`
4. Configure source maps upload: `SENTRY_AUTH_TOKEN`

---

## Post-Deployment Verification

### 1. Health Check

```bash
# Test health endpoint
curl https://your-domain.com/api/health

# Expected response
{
  "status": "healthy",
  "timestamp": "2025-10-22T...",
  "environment": "production",
  "uptime": 12345,
  "memory": {
    "used": 45,
    "total": 128,
    "unit": "MB"
  }
}
```

### 2. Page Load Tests

Test all critical pages:

```bash
# Homepage
curl -I https://your-domain.com/

# Services page
curl -I https://your-domain.com/servicios

# Blog
curl -I https://your-domain.com/blog

# Contact
curl -I https://your-domain.com/contacto

# Admin panel
curl -I https://your-domain.com/admin
```

All should return `200 OK` status.

### 3. API Endpoint Tests

```bash
# Newsletter subscription (should fail without data, but endpoint should exist)
curl -X POST https://your-domain.com/api/newsletter

# Contact form (should validate)
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### 4. Performance Audit

Run Lighthouse audit:

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://your-domain.com --view
```

**Target Scores:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

### 5. Security Headers Check

Use https://securityheaders.com to verify security headers:

```bash
# Test security headers
curl -I https://your-domain.com/

# Should include:
# Strict-Transport-Security: max-age=63072000
# X-Frame-Options: SAMEORIGIN
# X-Content-Type-Options: nosniff
# X-XSS-Protection: 1; mode=block
```

### 6. Database Connectivity

Check Vercel logs for database operations:

```bash
vercel logs --follow
```

Look for:
- Successful database connections
- No connection pool errors
- Successful queries
- No timeout errors

### 7. Email Functionality

Test email sending:

1. Submit contact form on website
2. Check Resend dashboard for sent emails
3. Verify email received
4. Check email content and formatting

### 8. Media Upload

Test Cloudinary integration:

1. Log into Payload CMS at `/admin`
2. Upload an image
3. Verify upload successful
4. Check Cloudinary dashboard for uploaded file
5. Verify image displays on frontend

---

## Custom Domain Setup

### 1. Domain Configuration in Vercel

1. Go to Vercel project settings
2. Navigate to "Domains"
3. Click "Add Domain"
4. Enter your domain: `duosoluciones.com`
5. Add www subdomain: `www.duosoluciones.com`

### 2. DNS Configuration

Add these DNS records in your domain registrar:

**For root domain (duosoluciones.com):**
```
Type: A
Name: @
Value: 76.76.19.19 (Vercel IP)
TTL: 3600
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Verify DNS propagation:**
```bash
# Check A record
dig duosoluciones.com

# Check CNAME
dig www.duosoluciones.com

# Or use online tool
# https://dnschecker.org
```

### 3. SSL Certificate

Vercel automatically provisions SSL certificates via Let's Encrypt:

1. Wait for DNS propagation (can take up to 48 hours)
2. Vercel will automatically issue SSL certificate
3. Verify HTTPS works: https://your-domain.com
4. Check SSL certificate details in browser

### 4. Update Environment Variables

After domain is active:

1. Update in Vercel:
   ```
   NEXT_PUBLIC_APP_URL=https://duosoluciones.com
   NEXTAUTH_URL=https://duosoluciones.com
   ```
2. Redeploy application for changes to take effect

### 5. Redirect Configuration

Ensure www redirects to non-www (or vice versa):

In Vercel domain settings:
- Set primary domain: `duosoluciones.com`
- Enable redirect: `www.duosoluciones.com` → `duosoluciones.com`

### 6. Update OAuth Providers

If using OAuth (Google, LinkedIn, etc.):

1. Update authorized redirect URIs in each provider:
   - Old: `https://your-project.vercel.app/api/auth/callback/google`
   - New: `https://duosoluciones.com/api/auth/callback/google`
2. Test OAuth flow with new domain

---

## Troubleshooting

### Build Failures

**Symptom:** Vercel build fails

**Solutions:**
1. Check build logs in Vercel dashboard
2. Verify `package.json` dependencies
3. Test build locally: `npm run build`
4. Check Node version compatibility
5. Verify environment variables are set

**Common Issues:**
- Missing environment variables
- TypeScript errors
- Dependency conflicts
- Out of memory (increase in Vercel settings)

### Runtime Errors

**Symptom:** Application crashes or returns 500 errors

**Solutions:**
1. Check Vercel runtime logs
2. Verify all environment variables are set
3. Check database connection
4. Review recent code changes
5. Test in local production mode: `npm run build && npm start`

### Database Connection Issues

**Symptom:** "Unable to connect to database" errors

**Solutions:**
1. Verify `DATABASE_URL` format is correct
2. Check Supabase project status
3. Verify database password is correct
4. Test connection pooling mode (port 5432)
5. Check IP allowlisting (Supabase allows all by default)

**Test Connection:**
```javascript
// Create test API route: /api/test-db
import { db } from '@/lib/db';

export async function GET() {
  try {
    await db.execute('SELECT 1');
    return Response.json({ status: 'connected' });
  } catch (error) {
    return Response.json({ status: 'error', error: error.message }, { status: 500 });
  }
}
```

### Authentication Issues

**Symptom:** Users cannot log in or sessions don't persist

**Solutions:**
1. Verify `NEXTAUTH_URL` exactly matches your domain (including https://)
2. Check `NEXTAUTH_SECRET` is set
3. Clear browser cookies and try again
4. Check secure cookie settings for production
5. Verify OAuth redirect URIs match

### Image Loading Issues

**Symptom:** Images don't load or show 403 errors

**Solutions:**
1. Verify Cloudinary environment variables
2. Check `next.config.ts` remotePatterns includes Cloudinary
3. Test Cloudinary API directly
4. Verify image URLs are correct
5. Check browser console for CORS errors

### Email Not Sending

**Symptom:** Emails not being sent or received

**Solutions:**
1. Verify `RESEND_API_KEY` is correct
2. Check domain verification in Resend dashboard
3. Verify sender email uses verified domain
4. Check Resend logs for errors
5. Test API directly with curl

### Performance Issues

**Symptom:** Slow page loads or high resource usage

**Solutions:**
1. Run Lighthouse audit to identify bottlenecks
2. Check Vercel analytics for slow functions
3. Optimize images (ensure using Next.js Image component)
4. Enable caching headers
5. Consider upgrading Vercel plan for more resources

---

## Rollback Procedures

### Quick Rollback (Recommended)

**Via Vercel Dashboard:**
1. Go to Deployments tab
2. Find the last known good deployment
3. Click "..." menu
4. Select "Promote to Production"
5. Confirm rollback

**Time:** ~30 seconds

### Git-Based Rollback

**If you need to revert code:**

```bash
# Find the last good commit
git log --oneline

# Revert to previous commit
git revert HEAD

# Or reset to specific commit (be careful!)
git reset --hard <commit-hash>

# Force push (only if necessary and safe)
git push origin main --force

# Vercel will auto-deploy
```

### Database Rollback

**If database changes need to be reverted:**

1. Access Supabase dashboard
2. Navigate to Database > Backups
3. Select backup before problematic deployment
4. Click "Restore"
5. Confirm restoration

**Warning:** This will overwrite current data. Export current state first if needed.

### Environment Variables Rollback

**If environment variable changes caused issues:**

1. Go to Vercel project settings
2. Navigate to Environment Variables
3. Edit problematic variables
4. Click "Save"
5. Trigger redeploy

---

## Post-Rollback Verification

After rollback, verify:

1. Application loads correctly
2. No critical errors in logs
3. Database operations work
4. Authentication functions
5. Core user flows work

If issues persist:
1. Check Vercel logs
2. Compare with working deployment
3. Verify environment variables
4. Contact team for assistance

---

## Maintenance Mode

To enable maintenance mode during critical updates:

**Option 1: Via Middleware**

Create `src/middleware.ts`:

```typescript
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const maintenanceMode = process.env.MAINTENANCE_MODE === 'true';

  if (maintenanceMode) {
    return new NextResponse(
      '<h1>Under Maintenance</h1><p>We\'ll be back soon.</p>',
      { status: 503, headers: { 'Content-Type': 'text/html' } }
    );
  }

  return NextResponse.next();
}
```

Set `MAINTENANCE_MODE=true` in Vercel to enable.

**Option 2: Via Vercel Protection Password**

1. Go to Vercel project settings
2. Navigate to "Deployment Protection"
3. Enable "Password Protection"
4. Set password
5. Users will need password to access site

---

## Deployment Checklist Summary

- [ ] Code quality verified (tests, lint, build)
- [ ] Git repository tagged
- [ ] Database backup created
- [ ] Environment variables documented
- [ ] Vercel project created and configured
- [ ] All environment variables set in Vercel
- [ ] Deployment successful
- [ ] Health check endpoint responding
- [ ] Database migrations run
- [ ] All pages loading correctly
- [ ] API endpoints working
- [ ] Email sending functional
- [ ] Media uploads working
- [ ] Performance audit passed
- [ ] Security headers verified
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Monitoring configured
- [ ] Team notified of deployment
- [ ] Documentation updated

---

## Additional Resources

- [Environment Variables Documentation](./environment-variables.md)
- [Monitoring Setup Guide](./monitoring-setup.md)
- [Backup Strategy](./backup-strategy.md)
- [Security Checklist](./security-checklist.md)
- [Rollback Procedures](./rollback-procedures.md)

---

## Support

**Internal Support:**
- DevOps Team: devops@duosoluciones.com
- Technical Lead: tech@duosoluciones.com

**External Support:**
- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support
- Resend Support: support@resend.com

---

**Document Version:** 1.0.0
**Last Updated:** October 2025
**Next Review:** January 2026
