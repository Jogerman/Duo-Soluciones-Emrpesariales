# Railway Deployment Guide - DUO Soluciones Empresariales

Complete guide for deploying the DUO Soluciones Empresariales Next.js 15 application to Railway with Supabase PostgreSQL database.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Railway Setup](#initial-railway-setup)
3. [Environment Variables Configuration](#environment-variables-configuration)
4. [Database Connection (Supabase)](#database-connection-supabase)
5. [GitHub Integration & CI/CD](#github-integration--cicd)
6. [Custom Domain Configuration](#custom-domain-configuration)
7. [Post-Deployment Verification](#post-deployment-verification)
8. [Monitoring & Logging](#monitoring--logging)
9. [Troubleshooting](#troubleshooting)
10. [Production Optimization](#production-optimization)

---

## Prerequisites

Before deploying to Railway, ensure you have:

- [ ] Railway account (sign up at https://railway.app)
- [ ] Supabase project with PostgreSQL database
- [ ] GitHub repository with the project code
- [ ] Cloudinary account for media storage
- [ ] NextAuth secrets generated
- [ ] All required environment variables ready

### Required Tools

```bash
# Install Railway CLI (optional but recommended)
npm i -g @railway/cli

# Login to Railway
railway login
```

---

## Initial Railway Setup

### Option 1: Deploy via Railway Dashboard (Recommended for First-Time)

1. **Create New Project**
   - Go to https://railway.app/dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize Railway to access your GitHub account
   - Select the repository: `Jogerman/Duo-Soluciones-Emrpesariales`

2. **Configure Build Settings**
   - Railway will auto-detect Next.js
   - Verify build command: `npm run build`
   - Verify start command: `npm run start`
   - Node version will be automatically set to latest LTS (20.x+)

3. **Initial Deployment**
   - Click "Deploy Now"
   - Railway will attempt first build (it may fail due to missing env vars - this is expected)

### Option 2: Deploy via Railway CLI

```bash
# Navigate to project directory
cd "D:\Code\Duo Soluciones"

# Initialize Railway project
railway init

# Link to your Railway project
railway link

# Deploy
railway up
```

---

## Environment Variables Configuration

### Step 1: Generate Required Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate PAYLOAD_SECRET
openssl rand -base64 32
```

### Step 2: Configure Variables in Railway Dashboard

1. Navigate to your Railway project
2. Click on your service
3. Go to "Variables" tab
4. Add the following variables:

#### CRITICAL Variables (Must Set First)

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://[your-project-name].railway.app
```

#### Database Connection

```env
DATABASE_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**How to get Supabase DATABASE_URL:**

1. Go to Supabase Dashboard > Project Settings > Database
2. Scroll to "Connection String"
3. Select "Pooler" mode (Connection pooling)
4. Copy the URI connection string
5. Replace `[YOUR-PASSWORD]` with your database password

**Important:** Use the **Pooler** mode connection string for production deployments to handle connection pooling efficiently.

#### NextAuth Configuration

```env
NEXTAUTH_URL=https://[your-project-name].railway.app
NEXTAUTH_SECRET=[generated-secret-from-step-1]
```

#### Payload CMS

```env
PAYLOAD_SECRET=[generated-secret-from-step-1]
```

#### Cloudinary Configuration

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

**How to get Cloudinary credentials:**

1. Go to https://cloudinary.com/console
2. Navigate to Dashboard
3. Copy Cloud Name, API Key, and API Secret

#### Optional: Google OAuth (if using social login)

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

**Setup Google OAuth:**

1. Go to https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 Client ID
3. Add authorized redirect URI: `https://[your-domain]/api/auth/callback/google`

#### Optional: Email Service (Resend)

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=no-reply@your-domain.com
```

#### Optional: Analytics

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### Step 3: Verify Environment Variables

Railway Dashboard > Variables tab should show all configured variables. Click "Deploy" after adding all variables to trigger a new deployment.

---

## Database Connection (Supabase)

### Connection String Formats

Supabase provides two connection modes:

#### 1. Direct Connection (Development)

```
postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
```

- Use for: Local development, migrations
- Limitations: Limited connections (max 60)

#### 2. Pooler Connection (Production) - RECOMMENDED

```
postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

- Use for: Production deployments, Railway
- Benefits: Connection pooling, better performance, handles thousands of connections

### Configure Database in Railway

1. **No need to create Railway PostgreSQL** - You're using Supabase
2. **Set DATABASE_URL** with Supabase Pooler connection string
3. **Verify Connection** after deployment using Railway logs

### Database Migration

If you need to run migrations:

```bash
# Using Railway CLI
railway run npm run db:migrate

# Or connect directly to Supabase
npx drizzle-kit push:pg
```

---

## GitHub Integration & CI/CD

### Automatic Deployments

Railway automatically deploys on every push to your main branch.

#### Configure Auto-Deploy Settings

1. Railway Dashboard > Service > Settings
2. **Watch Paths** (optional): Configure to deploy only on specific file changes

   ```
   src/**
   public/**
   package.json
   next.config.ts
   ```

3. **Branch**: Ensure it's set to `main`

4. **Deploy Triggers**:
   - ✓ Enable automatic deployments on push
   - ✓ Enable PR deployments (optional)

### Manual Deployments

```bash
# Via Railway CLI
railway up

# Via Dashboard
Railway Dashboard > Service > Click "Deploy"
```

### Deployment Workflow

```
Git Push → GitHub → Railway Webhook → Build Triggered → Tests → Build → Deploy → Healthcheck
```

---

## Custom Domain Configuration

### Step 1: Add Domain in Railway

1. Railway Dashboard > Service > Settings
2. Scroll to "Domains"
3. Click "Add Domain"
4. Choose:
   - **Custom Domain**: Enter your domain (e.g., `duo-soluciones.com`)
   - **Subdomain**: Or use Railway subdomain

### Step 2: Configure DNS Records

Add these DNS records in your domain registrar (e.g., Cloudflare, GoDaddy):

#### For Root Domain (duo-soluciones.com)

**Option A: A Record (Recommended)**

```
Type: A
Name: @
Value: [Railway IP address provided]
TTL: Auto or 3600
```

**Option B: CNAME Flattening**

```
Type: CNAME
Name: @
Value: [your-project].railway.app
TTL: Auto or 3600
```

#### For Subdomain (www.duo-soluciones.com)

```
Type: CNAME
Name: www
Value: [your-project].railway.app
TTL: Auto or 3600
```

### Step 3: Update Environment Variables

After adding custom domain, update:

```env
NEXT_PUBLIC_APP_URL=https://duo-soluciones.com
NEXTAUTH_URL=https://duo-soluciones.com
```

### Step 4: SSL Certificate

Railway automatically provisions SSL certificates via Let's Encrypt. This process takes 1-5 minutes after DNS propagation.

**Verify SSL:**

- Railway shows "Active" status with green checkmark
- Visit your domain with `https://`

### Step 5: Update OAuth Redirect URIs

If using Google OAuth or other providers, update redirect URIs:

```
https://duo-soluciones.com/api/auth/callback/google
```

---

## Post-Deployment Verification

### 1. Check Deployment Status

```bash
# Via Railway CLI
railway status

# Via Dashboard
Railway Dashboard > Service > Deployments
```

### 2. Verify Application Health

```bash
# Test homepage
curl https://[your-domain].railway.app

# Check health endpoint
curl https://[your-domain].railway.app/api/health
```

### 3. Test Critical Functionality

- [ ] Homepage loads correctly
- [ ] Static assets (images, CSS) load from CDN
- [ ] Database connection works (try login/signup)
- [ ] Payload CMS admin accessible at `/admin`
- [ ] API routes respond correctly
- [ ] NextAuth authentication works
- [ ] Cloudinary image uploads work

### 4. Check Logs

```bash
# Via Railway CLI
railway logs

# Via Dashboard
Railway Dashboard > Service > Deployments > View Logs
```

Look for:

- No critical errors
- Successful database connections
- Next.js server started successfully
- Port binding successful

### 5. Performance Check

Test performance using:

- Lighthouse (Chrome DevTools)
- WebPageTest (https://www.webpagetest.org)
- GTmetrix (https://gtmetrix.com)

Target Metrics:

- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Cumulative Layout Shift (CLS): < 0.1

---

## Monitoring & Logging

### Railway Built-in Monitoring

Railway provides basic monitoring:

1. **Deployment Logs**
   - Real-time build and deployment logs
   - Application runtime logs
   - Error tracking

2. **Metrics**
   - CPU usage
   - Memory usage
   - Network traffic
   - Response times

Access: Railway Dashboard > Service > Metrics

### Enhanced Monitoring (Recommended)

#### 1. Sentry (Error Tracking)

```env
SENTRY_DSN=https://xxxx@xxxx.ingest.sentry.io/xxxx
SENTRY_AUTH_TOKEN=your-auth-token
```

**Setup:**

1. Create Sentry project: https://sentry.io
2. Get DSN from Project Settings
3. Add to Railway environment variables
4. Deploy

#### 2. LogTail / BetterStack (Centralized Logging)

```bash
# Add to package.json dependencies
npm install @logtail/node @logtail/winston
```

#### 3. Uptime Monitoring

Use external services:

- **Uptime Robot**: https://uptimerobot.com
- **Pingdom**: https://www.pingdom.com
- **Better Uptime**: https://betteruptime.com

Configure checks:

- HTTP(S) check every 5 minutes
- Alert on downtime via email/Slack
- Monitor from multiple regions

### Custom Health Check Endpoint

Create a health check endpoint for better monitoring:

**File:** `src/app/api/health/route.ts`

```typescript
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Check database connection
    await db.execute('SELECT 1')

    return NextResponse.json(
      {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: 'connected',
        environment: process.env.NODE_ENV,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error.message,
      },
      { status: 503 }
    )
  }
}
```

Monitor this endpoint with your uptime service.

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Build Fails - "Module not found"

**Cause:** Missing dependencies

**Solution:**

```bash
# Ensure all dependencies in package.json
npm install

# Commit package-lock.json
git add package-lock.json
git commit -m "fix: update package-lock.json"
git push
```

#### 2. Application Crashes - "Cannot connect to database"

**Cause:** Incorrect DATABASE_URL or network issues

**Solution:**

1. Verify DATABASE_URL format (use Pooler connection)
2. Check Supabase project is active
3. Verify Supabase allows connections from Railway
4. Test connection locally:
   ```bash
   railway run node -e "require('postgres').default(process.env.DATABASE_URL)"
   ```

#### 3. NextAuth Error - "Invalid URL"

**Cause:** NEXTAUTH_URL not set correctly

**Solution:**

```env
NEXTAUTH_URL=https://your-exact-domain.railway.app
# No trailing slash
# Must match exactly
```

#### 4. 502 Bad Gateway

**Cause:** Application not binding to correct port

**Solution:**
Railway provides PORT env var automatically. Next.js uses it by default. Verify:

- No hardcoded ports in code
- `next start` command in package.json
- Check logs for port binding messages

#### 5. Static Assets (Images) Not Loading

**Cause:** Cloudinary misconfiguration or Next.js image optimization issues

**Solution:**

1. Verify Cloudinary env vars set correctly
2. Check `next.config.ts` has correct `remotePatterns`
3. Test Cloudinary connection:
   ```bash
   railway run node -e "console.log(process.env.CLOUDINARY_CLOUD_NAME)"
   ```

#### 6. "Out of Memory" During Build

**Cause:** Insufficient memory for build process

**Solution:**

```env
# Add to Railway environment variables
NODE_OPTIONS=--max-old-space-size=4096
```

Already configured in `railway.toml`.

#### 7. Slow Build Times

**Cause:** Installing unnecessary dependencies

**Solution:**

1. Review `.railwayignore` - ensure dev deps excluded
2. Use Railway build cache
3. Optimize dependencies:
   ```bash
   # Remove unused dependencies
   npm prune --production
   ```

#### 8. Environment Variables Not Updating

**Cause:** Need to redeploy after variable changes

**Solution:**

1. Railway Dashboard > Variables > Add/Update variable
2. Click "Deploy" to trigger new deployment
3. Variables only update on new deployments, not hot-reload

### Getting Help

#### Railway Support Channels

1. **Railway Discord**: https://discord.gg/railway
   - Active community
   - Railway team members respond quickly

2. **Railway Documentation**: https://docs.railway.app

3. **Railway Status**: https://status.railway.app
   - Check for ongoing incidents

#### Debugging Commands

```bash
# View real-time logs
railway logs --follow

# Check environment variables
railway variables

# Open project in browser
railway open

# Run commands in Railway environment
railway run [command]

# SSH into deployment (if enabled)
railway shell
```

---

## Production Optimization

### Performance Optimizations

#### 1. Enable Output File Tracing

Already configured in `next.config.ts`:

```typescript
output: 'standalone'
```

This creates a minimal production build.

#### 2. Image Optimization

Using Cloudinary for external image optimization (configured).

Next.js Image component automatically optimizes:

- AVIF/WebP formats
- Responsive sizes
- Lazy loading

#### 3. Compression

Railway automatically enables gzip/brotli compression.

#### 4. Caching Strategy

Add cache headers for static assets:

```typescript
// next.config.ts - already configured
async headers() {
  return [
    {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
}
```

#### 5. Database Connection Pooling

Using Supabase Pooler connection (configured via DATABASE_URL).

#### 6. Redis Caching (Optional)

For enhanced performance, add Redis:

```bash
# Use Upstash Redis (serverless)
# Add to Railway environment variables:
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

### Security Hardening

#### 1. Security Headers

Already configured in `next.config.ts`:

- HSTS (HTTP Strict Transport Security)
- X-Frame-Options
- X-Content-Type-Options
- CSP (Content Security Policy) - recommended to add

#### 2. Rate Limiting

Implement rate limiting for API routes:

```bash
npm install @upstash/ratelimit @upstash/redis
```

#### 3. Environment Variable Security

- Never commit `.env.local` to git
- Use Railway's encrypted variable storage
- Rotate secrets regularly (every 90 days)

#### 4. Dependency Security

```bash
# Run security audit
npm audit

# Fix vulnerabilities
npm audit fix

# Check for updates
npm outdated
```

### Cost Optimization

#### Railway Pricing

- **Starter Plan**: $5/month includes $5 usage credit
- **Pro Plan**: $20/month includes $20 usage credit
- Additional usage: Pay as you go

**Estimated Monthly Cost:**

- Small app (<10k requests/month): $5-10
- Medium app (100k requests/month): $15-25
- Large app (1M requests/month): $40-60

#### Optimization Tips

1. **Enable Sleep on Inactivity**
   - Railway Dashboard > Settings > Enable sleep mode
   - App sleeps after 10 min inactivity
   - Saves costs for low-traffic apps

2. **Monitor Resource Usage**
   - Check Railway Dashboard > Metrics
   - Optimize memory usage if consistently high
   - Use serverless functions for background tasks

3. **CDN for Static Assets**
   - Cloudinary for images (already configured)
   - Consider Vercel Edge Network or Cloudflare for additional static assets

4. **Database Optimization**
   - Use Supabase free tier (500MB, good for MVP)
   - Upgrade to paid tier only when needed
   - Optimize queries and add indexes

---

## Deployment Checklist

### Pre-Deployment Checklist

- [ ] All code committed and pushed to GitHub
- [ ] `package.json` scripts configured correctly
- [ ] `next.config.ts` has `output: 'standalone'`
- [ ] All required environment variables documented
- [ ] Supabase database created and accessible
- [ ] Cloudinary account configured
- [ ] Secrets generated (NEXTAUTH_SECRET, PAYLOAD_SECRET)
- [ ] `.railwayignore` created
- [ ] `railway.toml` configured

### Deployment Checklist

- [ ] Railway project created
- [ ] GitHub repository connected
- [ ] All environment variables set in Railway
- [ ] DATABASE_URL uses Pooler connection
- [ ] NEXTAUTH_URL matches deployment URL
- [ ] Initial deployment triggered
- [ ] Build successful (check logs)
- [ ] Application starts without errors

### Post-Deployment Checklist

- [ ] Homepage loads correctly
- [ ] Database connection verified
- [ ] Authentication works
- [ ] Payload CMS admin accessible
- [ ] Image uploads work (Cloudinary)
- [ ] API routes respond
- [ ] No critical errors in logs
- [ ] SSL certificate active
- [ ] Performance metrics acceptable (Lighthouse)
- [ ] Monitoring configured (Sentry/Uptime)
- [ ] Custom domain configured (if applicable)
- [ ] Google OAuth redirect URIs updated (if applicable)

### Ongoing Maintenance

- [ ] Monitor Railway logs weekly
- [ ] Check Railway metrics monthly
- [ ] Update dependencies monthly (security patches)
- [ ] Rotate secrets quarterly
- [ ] Review and optimize costs monthly
- [ ] Test backups quarterly
- [ ] Review error logs in Sentry weekly

---

## Next Steps After Successful Deployment

1. **Configure Monitoring**
   - Set up Sentry for error tracking
   - Configure uptime monitoring
   - Set up alerting (email/Slack)

2. **Performance Optimization**
   - Run Lighthouse audit
   - Optimize based on recommendations
   - Configure CDN if needed

3. **Content Population**
   - Access Payload CMS at `/admin`
   - Create initial content
   - Upload media assets

4. **SEO Setup**
   - Configure sitemap
   - Add robots.txt
   - Set up Google Search Console
   - Configure Analytics

5. **User Testing**
   - Test all user flows
   - Verify mobile responsiveness
   - Check cross-browser compatibility

6. **Documentation**
   - Document deployment process
   - Create runbook for common tasks
   - Document environment variables

7. **Backup Strategy**
   - Configure Supabase automated backups
   - Test restore process
   - Document backup procedures

---

## Additional Resources

- **Railway Documentation**: https://docs.railway.app
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Supabase Documentation**: https://supabase.com/docs
- **Railway Discord**: https://discord.gg/railway
- **Next.js Discord**: https://discord.gg/nextjs

---

## Support

For deployment issues:

1. Check this documentation first
2. Review Railway logs
3. Search Railway Discord
4. Contact Railway support via Discord or dashboard
5. Check Supabase status if database issues

---

**Last Updated:** October 2025
**Version:** 1.0.0
**Maintained by:** DUO Soluciones DevOps Team
