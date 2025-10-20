# Railway Deployment Checklist

Quick reference checklist for deploying DUO Soluciones Empresariales to Railway.

## Pre-Deployment Setup

### 1. Code Preparation

- [ ] All changes committed to Git
- [ ] All tests passing locally
- [ ] Build succeeds locally (`npm run build`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No linting errors (`npm run lint`)
- [ ] Code formatted (`npm run format`)

### 2. Dependencies

- [ ] All dependencies in `package.json`
- [ ] `package-lock.json` committed
- [ ] No security vulnerabilities (`npm audit`)
- [ ] Unused dependencies removed

### 3. Configuration Files

- [ ] `next.config.ts` has `output: 'standalone'`
- [ ] `railway.toml` exists and configured
- [ ] `.railwayignore` created
- [ ] `railway.env.example` reviewed
- [ ] `.env.local` NOT committed (verify `.gitignore`)

### 4. External Services Setup

#### Supabase Database

- [ ] Supabase project created
- [ ] Database initialized
- [ ] Connection string obtained (Pooler mode)
- [ ] Database migrations ready (if applicable)
- [ ] Database password secure and saved

#### Cloudinary

- [ ] Cloudinary account created
- [ ] Cloud name obtained
- [ ] API key and secret generated
- [ ] Upload presets configured (optional)

#### Authentication

- [ ] NEXTAUTH_SECRET generated (`openssl rand -base64 32`)
- [ ] PAYLOAD_SECRET generated (`openssl rand -base64 32`)
- [ ] Google OAuth configured (if using)
- [ ] OAuth redirect URIs prepared

---

## Railway Setup

### 1. Account & Project

- [ ] Railway account created/logged in
- [ ] GitHub account connected to Railway
- [ ] New project created in Railway
- [ ] Repository connected to Railway project
- [ ] Service created (auto-detected as Next.js)

### 2. Build Configuration

- [ ] Build command verified: `npm run build`
- [ ] Start command verified: `npm run start`
- [ ] Node version: 20.x or higher (auto-detected)
- [ ] Root directory correct (default: `/`)

### 3. Environment Variables

#### Critical Variables (Deploy will fail without these)

- [ ] `NODE_ENV=production`
- [ ] `NEXT_PUBLIC_APP_URL` (Railway URL or custom domain)
- [ ] `DATABASE_URL` (Supabase Pooler connection)
- [ ] `NEXTAUTH_URL` (must match app URL)
- [ ] `NEXTAUTH_SECRET` (generated secret)
- [ ] `PAYLOAD_SECRET` (generated secret)
- [ ] `CLOUDINARY_CLOUD_NAME`
- [ ] `CLOUDINARY_API_KEY`
- [ ] `CLOUDINARY_API_SECRET`
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

#### Optional Variables

- [ ] `GOOGLE_CLIENT_ID` (if using OAuth)
- [ ] `GOOGLE_CLIENT_SECRET` (if using OAuth)
- [ ] `RESEND_API_KEY` (if using email)
- [ ] `RESEND_FROM_EMAIL` (if using email)
- [ ] Analytics variables (GA, etc.)
- [ ] Monitoring variables (Sentry, etc.)

### 4. Deployment Settings

- [ ] Auto-deploy enabled on main branch
- [ ] Watch paths configured (optional)
- [ ] PR deployments configured (optional)
- [ ] Health check endpoint configured

---

## Initial Deployment

### 1. Trigger Deployment

- [ ] Environment variables saved in Railway
- [ ] Click "Deploy" or push to main branch
- [ ] Monitor build logs in Railway dashboard

### 2. Build Verification

- [ ] Build started successfully
- [ ] Dependencies installed (check logs)
- [ ] Next.js build completed
- [ ] No build errors
- [ ] Standalone output created
- [ ] Build time reasonable (<5 minutes typical)

### 3. Deployment Verification

- [ ] Deployment completed successfully
- [ ] Service started
- [ ] Port binding successful (check logs for "Ready on...")
- [ ] No crash loops
- [ ] Health check passing

---

## Post-Deployment Testing

### 1. Basic Functionality

- [ ] Homepage loads (`https://[your-app].railway.app`)
- [ ] No 404 or 500 errors
- [ ] Static assets load (CSS, images)
- [ ] JavaScript loads and executes
- [ ] Console has no critical errors

### 2. Database Connectivity

- [ ] Database connection successful (check logs)
- [ ] Can query database (test a DB-dependent page)
- [ ] No connection pool errors
- [ ] Payload CMS accessible at `/admin`

### 3. Authentication

- [ ] Login page loads
- [ ] Can create account (if registration enabled)
- [ ] Can login with credentials
- [ ] Session persists across pages
- [ ] Google OAuth works (if configured)
- [ ] Logout works

### 4. CMS Functionality

- [ ] Payload admin accessible (`/admin`)
- [ ] Can login to Payload
- [ ] Can create/edit content
- [ ] Media upload works (Cloudinary)
- [ ] Changes save successfully

### 5. API Endpoints

- [ ] API routes respond (`/api/health` if created)
- [ ] GraphQL endpoint works (if using)
- [ ] No 401/403 errors on public endpoints
- [ ] Rate limiting works (if configured)

### 6. Performance

- [ ] Page load time acceptable (<3s)
- [ ] No excessive loading states
- [ ] Images load and optimize
- [ ] No console warnings about performance
- [ ] Run Lighthouse audit (target: >90 performance)

---

## Custom Domain Configuration

### 1. Domain Setup

- [ ] Custom domain purchased
- [ ] Domain added in Railway dashboard
- [ ] DNS records configured:
  - [ ] A record or CNAME for root domain
  - [ ] CNAME for www subdomain
- [ ] DNS propagation complete (check with `dig` or online tools)
- [ ] SSL certificate provisioned (Railway auto-generates)
- [ ] HTTPS working

### 2. Update Environment Variables

- [ ] `NEXT_PUBLIC_APP_URL` updated to custom domain
- [ ] `NEXTAUTH_URL` updated to custom domain
- [ ] Redeploy after updating variables

### 3. OAuth Redirect URIs

- [ ] Google OAuth redirect URIs updated (if using)
- [ ] Other OAuth providers updated (if any)
- [ ] Test OAuth flow with new domain

---

## Monitoring & Logging

### 1. Railway Monitoring

- [ ] Deployment logs reviewed (no errors)
- [ ] Application logs monitored
- [ ] Metrics dashboard checked (CPU, memory)
- [ ] No resource warnings

### 2. External Monitoring (Recommended)

- [ ] Sentry error tracking configured
- [ ] Sentry test error sent and received
- [ ] Uptime monitoring configured (UptimeRobot, Pingdom, etc.)
- [ ] Alert notifications configured (email/Slack)
- [ ] Health check endpoint monitored

### 3. Analytics

- [ ] Google Analytics configured (if using)
- [ ] Analytics tracking verified
- [ ] No tracking errors in console

---

## Security Verification

### 1. Headers & SSL

- [ ] HTTPS enforced (HTTP redirects to HTTPS)
- [ ] SSL certificate valid
- [ ] Security headers present (check with securityheaders.com)
- [ ] No mixed content warnings

### 2. Secrets & Environment

- [ ] No secrets in client-side code
- [ ] `.env.local` not committed to repo
- [ ] All secrets use strong values (>32 characters)
- [ ] Environment variables not exposed in logs

### 3. Access Control

- [ ] Payload admin requires authentication
- [ ] API routes have proper authorization
- [ ] No public access to sensitive endpoints
- [ ] CORS configured correctly (if using external APIs)

---

## Performance Optimization

### 1. Lighthouse Audit

- [ ] Run Lighthouse audit
- [ ] Performance score >90
- [ ] Accessibility score >90
- [ ] Best Practices score >90
- [ ] SEO score >90
- [ ] Address any critical issues

### 2. Core Web Vitals

- [ ] LCP (Largest Contentful Paint) <2.5s
- [ ] FID (First Input Delay) <100ms
- [ ] CLS (Cumulative Layout Shift) <0.1
- [ ] FCP (First Contentful Paint) <1.8s
- [ ] TTFB (Time to First Byte) <600ms

### 3. Optimization Applied

- [ ] Image optimization working (WebP/AVIF)
- [ ] Lazy loading enabled
- [ ] Code splitting effective
- [ ] Compression enabled (gzip/brotli)
- [ ] Caching headers configured

---

## Backup & Recovery

### 1. Database Backups

- [ ] Supabase automatic backups enabled
- [ ] Backup retention policy reviewed
- [ ] Test backup restore process
- [ ] Document restore procedure

### 2. Code Backups

- [ ] Code in GitHub (version controlled)
- [ ] Recent commit tagged (e.g., `v1.0.0`)
- [ ] Deployment commit hash recorded

### 3. Configuration Backups

- [ ] Environment variables documented
- [ ] `railway.env.example` up to date
- [ ] Deployment documentation current

---

## User Acceptance Testing

### 1. Core User Flows

- [ ] Homepage navigation
- [ ] Service pages load
- [ ] Contact form submission (if applicable)
- [ ] Blog/content browsing
- [ ] Search functionality (if applicable)

### 2. Mobile Testing

- [ ] Responsive design works
- [ ] Touch interactions work
- [ ] Mobile navigation functional
- [ ] No horizontal scroll issues
- [ ] Forms usable on mobile

### 3. Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## Documentation

### 1. Update Documentation

- [ ] Deployment URL documented
- [ ] Environment variables documented
- [ ] Custom domain documented (if configured)
- [ ] Update README.md with deployment info

### 2. Runbooks Created

- [ ] Common tasks documented
- [ ] Troubleshooting guide reviewed
- [ ] Rollback procedure documented
- [ ] Incident response plan created

### 3. Team Knowledge Transfer

- [ ] Deployment process shared with team
- [ ] Railway access granted to team members
- [ ] Credentials securely shared (use password manager)
- [ ] Emergency contacts updated

---

## Production Readiness

### Final Checks

- [ ] All tests passing
- [ ] No known bugs in production
- [ ] Performance acceptable
- [ ] Security hardened
- [ ] Monitoring active
- [ ] Backups configured
- [ ] Team trained
- [ ] Documentation complete

### Go-Live Communication

- [ ] Stakeholders notified of deployment
- [ ] Support team briefed
- [ ] Marketing team informed (if public launch)
- [ ] Social media updated (if applicable)

---

## Post-Launch Monitoring (First 24 Hours)

### Immediate Monitoring (First Hour)

- [ ] Check logs every 15 minutes
- [ ] Monitor error rates
- [ ] Watch resource usage
- [ ] Test critical flows
- [ ] Monitor uptime

### First 24 Hours

- [ ] Review logs at 6, 12, 24 hour marks
- [ ] Check error tracking (Sentry)
- [ ] Monitor performance metrics
- [ ] Review user feedback
- [ ] Address any critical issues immediately

### First Week

- [ ] Daily log reviews
- [ ] Weekly performance report
- [ ] User feedback analysis
- [ ] Optimization opportunities identified
- [ ] Plan for improvements

---

## Troubleshooting Quick Reference

### Build Fails

1. Check Railway build logs
2. Verify all dependencies in package.json
3. Test build locally: `npm run build`
4. Check Node version compatibility
5. Review `.railwayignore` - ensure not excluding necessary files

### Application Crashes

1. Check Railway application logs
2. Verify all required environment variables set
3. Test database connection
4. Check for memory issues (increase if needed)
5. Review recent code changes

### Database Connection Issues

1. Verify DATABASE_URL format (Pooler connection)
2. Check Supabase project status
3. Test connection from Railway CLI: `railway run node -e "..."`
4. Review connection pool settings
5. Check for network/firewall issues

### Authentication Not Working

1. Verify NEXTAUTH_URL matches deployment URL exactly
2. Check NEXTAUTH_SECRET is set
3. Verify OAuth redirect URIs (if using)
4. Check session configuration
5. Review NextAuth logs

### Images Not Loading

1. Verify Cloudinary environment variables
2. Check `next.config.ts` remotePatterns
3. Test Cloudinary upload manually
4. Review browser console for errors
5. Check network tab for failed requests

---

## Rollback Procedure

### If Deployment Fails

1. **Immediate Rollback**

   ```bash
   # Via Railway CLI
   railway rollback

   # Or via Dashboard
   Railway > Deployments > Previous Deployment > Redeploy
   ```

2. **Verify Rollback**
   - Check application loads
   - Test critical functionality
   - Monitor logs

3. **Investigate Issue**
   - Review failed deployment logs
   - Identify root cause
   - Fix in development
   - Test thoroughly before redeploying

### Emergency Contacts

- **Railway Support**: Discord - https://discord.gg/railway
- **Supabase Support**: https://supabase.com/support
- **Team Lead**: [Add contact]
- **DevOps Engineer**: [Add contact]

---

## Success Criteria

Deployment is considered successful when:

- [ ] Application accessible at production URL
- [ ] All critical user flows working
- [ ] No critical errors in logs
- [ ] Performance metrics acceptable
- [ ] Security headers configured
- [ ] Monitoring active and alerting
- [ ] Team can access and manage deployment
- [ ] Documentation complete and accessible
- [ ] Rollback procedure tested and documented
- [ ] Stakeholders satisfied with deployment

---

**Checklist Version:** 1.0.0
**Last Updated:** October 2025
**Maintained by:** DUO Soluciones DevOps Team

**Notes:**

- Print this checklist for deployment day
- Use as a guide, not a strict requirement
- Adapt to your specific needs
- Update as processes evolve
