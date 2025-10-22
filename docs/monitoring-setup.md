# Monitoring Setup Guide

**DUO Soluciones Empresariales - Production Monitoring**

**Version:** 1.0.0
**Last Updated:** October 2025

---

## Table of Contents

1. [Overview](#overview)
2. [Sentry Error Tracking](#sentry-error-tracking)
3. [Vercel Analytics](#vercel-analytics)
4. [Uptime Monitoring](#uptime-monitoring)
5. [Alert Configuration](#alert-configuration)
6. [Monitoring Dashboard](#monitoring-dashboard)
7. [Error Response Procedures](#error-response-procedures)

---

## Overview

Comprehensive monitoring ensures your application stays healthy and issues are detected early. This guide covers setting up:

- **Error Tracking:** Sentry for runtime errors and exceptions
- **Performance Monitoring:** Vercel Analytics for Core Web Vitals
- **Uptime Monitoring:** External services to ensure availability
- **Alert System:** Notifications for critical issues

### Monitoring Architecture

```
Application
    ↓
├── Sentry (Error & Performance Tracking)
│   ├── JavaScript Errors
│   ├── API Errors
│   ├── Performance Issues
│   └── Source Maps
│
├── Vercel Analytics (Web Vitals)
│   ├── Core Web Vitals (LCP, FID, CLS)
│   ├── Page Load Times
│   ├── Geographic Performance
│   └── Real User Monitoring
│
└── Uptime Monitor (Availability)
    ├── HTTP Checks
    ├── Health Endpoint
    ├── Response Time
    └── SSL Certificate Monitoring
```

---

## Sentry Error Tracking

### Overview

Sentry provides real-time error tracking and performance monitoring for your Next.js application.

**Features:**
- Real-time error notifications
- Stack traces with source maps
- User impact tracking
- Performance monitoring
- Release tracking
- Custom error context

### Step 1: Create Sentry Account

1. Sign up at https://sentry.io
2. Create new organization (if needed)
3. Choose plan:
   - **Developer:** Free, 5K errors/month (good for starting)
   - **Team:** $26/month, 50K errors/month
   - **Business:** $80/month, 500K errors/month

### Step 2: Create Project

1. Click "Create Project"
2. Choose platform: **Next.js**
3. Set alert frequency: **Default** or **Custom**
4. Project name: `duo-soluciones-production`
5. Team: Choose or create team
6. Click "Create Project"

### Step 3: Get DSN

Your DSN (Data Source Name) is automatically displayed:

```
https://abc123def456@o123456.ingest.sentry.io/789012
```

**Security Note:** The DSN is public-safe (can be exposed in client code)

### Step 4: Install Sentry SDK

```bash
# Install Sentry SDK for Next.js
npm install @sentry/nextjs
```

### Step 5: Configure Sentry

Run the Sentry wizard:

```bash
npx @sentry/wizard@latest -i nextjs
```

This creates:
- `sentry.client.config.ts` - Client-side config
- `sentry.server.config.ts` - Server-side config
- `sentry.edge.config.ts` - Edge runtime config
- `next.config.ts` updates - Sentry integration

### Step 6: Configure Environment Variables

Add to Vercel environment variables:

```bash
# Sentry DSN (can be public)
SENTRY_DSN=https://abc123def456@o123456.ingest.sentry.io/789012

# Sentry Auth Token (for source maps - keep secret)
SENTRY_AUTH_TOKEN=sntrys_abc123def456ghi789jkl012mno345pqr678

# Sentry Organization (your organization slug)
SENTRY_ORG=duo-soluciones

# Sentry Project (your project slug)
SENTRY_PROJECT=duo-soluciones-production
```

**Get Auth Token:**
1. Go to Sentry.io > Settings > Auth Tokens
2. Create new token with scopes:
   - `project:read`
   - `project:releases`
   - `org:read`

### Step 7: Update Sentry Configuration

**sentry.client.config.ts:**
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions
  // Lower for production to reduce quota usage
  tracesSampleRate: 0.1,

  // Set sampling rate for profiling
  profilesSampleRate: 0.1,

  // Set environment
  environment: process.env.NODE_ENV,

  // Enable session replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Filter out sensitive data
  beforeSend(event, hint) {
    // Don't send passwords, tokens, etc.
    if (event.request?.headers) {
      delete event.request.headers.authorization;
      delete event.request.headers.cookie;
    }
    return event;
  },
});
```

**sentry.server.config.ts:**
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,

  // Server-specific configuration
  beforeSend(event, hint) {
    // Filter sensitive server data
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers?.authorization;
    }
    return event;
  },
});
```

### Step 8: Test Sentry Integration

Create a test error button in development:

```typescript
// components/SentryTestButton.tsx (development only)
'use client';

export function SentryTestButton() {
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <button onClick={() => {
      throw new Error('Test Sentry Error');
    }}>
      Test Sentry
    </button>
  );
}
```

**Deploy and verify:**
1. Deploy to production
2. Check Sentry dashboard for test error
3. Verify stack traces are readable (source maps working)

### Step 9: Configure Alerts

In Sentry dashboard:

1. Go to Alerts > Create Alert
2. Choose alert type:
   - **Issues:** New error or regression
   - **Metric Alerts:** Performance degradation
   - **Uptime Monitoring:** Cron job failures

**Recommended Alerts:**

**Critical Errors Alert:**
- Condition: New issue is created
- Filters: level:error OR level:fatal
- Actions: Send email + Slack notification
- Frequency: Immediately

**High Error Rate Alert:**
- Condition: Error count > 100 in 1 hour
- Actions: Send email to on-call engineer
- Frequency: Once per hour

**Performance Degradation:**
- Condition: p95 response time > 2 seconds
- Actions: Send Slack notification
- Frequency: Once per 30 minutes

### Step 10: Source Maps Configuration

Ensure source maps are uploaded for readable stack traces:

**next.config.ts:**
```typescript
const nextConfig = {
  // ... other config

  // Enable source maps for Sentry
  productionBrowserSourceMaps: true,

  sentry: {
    hideSourceMaps: true, // Hide source maps from public
    widenClientFileUpload: true,
    disableServerWebpackPlugin: false,
    disableClientWebpackPlugin: false,
  },
};
```

**Verify source maps:**
1. Deploy to production
2. Trigger an error
3. Check Sentry dashboard - stack traces should show actual code

---

## Vercel Analytics

### Overview

Vercel Analytics provides real-time insights into Core Web Vitals and user experience metrics.

**Features:**
- Core Web Vitals tracking (LCP, FID, CLS, TTFB, FCP)
- Real User Monitoring (RUM)
- Geographic performance data
- Device and browser breakdown
- No impact on performance (uses Navigation Timing API)

### Step 1: Enable in Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Navigate to "Analytics" tab
4. Click "Enable Analytics"
5. Choose plan:
   - **Hobby:** Free, includes basic analytics
   - **Pro:** $20/month, 100K page views
   - **Enterprise:** Custom pricing

### Step 2: Install Package (Optional)

For custom events and enhanced tracking:

```bash
npm install @vercel/analytics
```

### Step 3: Add Analytics Component

**app/layout.tsx:**
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Step 4: View Analytics

Access analytics at:
```
https://vercel.com/your-team/your-project/analytics
```

**Key Metrics to Monitor:**

**Core Web Vitals:**
- **LCP (Largest Contentful Paint):** Target < 2.5s
- **FID (First Input Delay):** Target < 100ms
- **CLS (Cumulative Layout Shift):** Target < 0.1
- **TTFB (Time to First Byte):** Target < 600ms

**Audience Insights:**
- Top pages by traffic
- Geographic distribution
- Device breakdown
- Browser distribution

### Step 5: Set Up Alerts (Pro Plan)

Configure performance alerts:

1. Go to Analytics > Settings
2. Configure thresholds:
   - LCP warning: > 2.5s
   - LCP critical: > 4.0s
   - Error rate: > 5%
3. Set notification channel (email/Slack)

### Step 6: Custom Events (Optional)

Track custom user actions:

```typescript
import { track } from '@vercel/analytics';

// Track button click
function handleContactClick() {
  track('contact_form_opened', {
    location: 'homepage',
    timestamp: new Date().toISOString(),
  });
}

// Track feature usage
function handleNewsletterSignup() {
  track('newsletter_signup', {
    source: 'footer',
  });
}
```

---

## Uptime Monitoring

### Overview

External uptime monitoring ensures your application is accessible and responding correctly.

**Recommended Services:**
- **UptimeRobot:** Free, checks every 5 minutes
- **Pingdom:** Paid, advanced features
- **Better Uptime:** Modern UI, status pages
- **StatusCake:** Free tier available

### Option 1: UptimeRobot (Recommended - Free)

#### Setup Instructions

1. Sign up at https://uptimerobot.com
2. Click "Add New Monitor"
3. Configure monitor:

**HTTP(S) Monitor:**
```
Monitor Type: HTTP(s)
Friendly Name: DUO Soluciones - Homepage
URL: https://duosoluciones.com
Monitoring Interval: 5 minutes
Monitor Timeout: 30 seconds
```

**Health Check Monitor:**
```
Monitor Type: HTTP(s)
Friendly Name: DUO Soluciones - Health Check
URL: https://duosoluciones.com/api/health
Monitoring Interval: 5 minutes
Expected Status: 200
Keyword: "healthy"
```

**SSL Monitor:**
```
Monitor Type: HTTP(s)
Friendly Name: DUO Soluciones - SSL Certificate
URL: https://duosoluciones.com
Alert me: 30 days before SSL expires
```

4. Configure alert contacts:
   - Add email addresses
   - Add Slack webhook (optional)
   - Add SMS (paid feature)

5. Create alerts:
   - Down alert: Immediately
   - Up alert: After 2 checks (avoid false positives)

### Option 2: Better Uptime

1. Sign up at https://betteruptime.com
2. Create monitor:
   - URL: `https://duosoluciones.com`
   - Check frequency: 30 seconds (paid) or 3 minutes (free)
3. Configure incident management
4. Set up status page (public or private)

### Recommended Monitors

**Priority 1 - Critical:**
1. **Homepage:** `https://duosoluciones.com/`
2. **Health Check:** `https://duosoluciones.com/api/health`
3. **Admin Panel:** `https://duosoluciones.com/admin` (should return 200 or 401)

**Priority 2 - Important:**
4. **Services Page:** `https://duosoluciones.com/servicios`
5. **Blog:** `https://duosoluciones.com/blog`
6. **Contact:** `https://duosoluciones.com/contacto`

**Priority 3 - API Endpoints:**
7. **Newsletter API:** `https://duosoluciones.com/api/newsletter` (POST check)
8. **Contact API:** `https://duosoluciones.com/api/contact` (POST check)

### Health Check Endpoint Configuration

Your application already has a health check endpoint at `/api/health`.

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-22T12:00:00.000Z",
  "environment": "production",
  "uptime": 12345,
  "memory": {
    "used": 45,
    "total": 128,
    "unit": "MB"
  }
}
```

**Configure Monitor:**
- Check for status 200
- Verify response contains `"status":"healthy"`
- Response time < 1000ms

---

## Alert Configuration

### Alert Channels

**Email Alerts:**
- Fastest setup
- Good for low-frequency alerts
- Free on all platforms

**Slack Integration:**
1. Create Slack webhook at https://api.slack.com/apps
2. Choose channel (e.g., `#alerts` or `#production-monitoring`)
3. Add webhook URL to monitoring services

**Example Slack Webhook:**
```
https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX
```

**SMS Alerts (Optional):**
- Paid feature on most platforms
- Use for critical alerts only
- Configure for high-severity issues

### Alert Priority Levels

**P1 - Critical (Immediate Response):**
- Application completely down
- Health check failing
- Database connection lost
- Error rate > 50%

**Actions:** Email + SMS + Slack

**P2 - High (Response within 1 hour):**
- Performance degradation
- Error rate > 10%
- Slow response times (> 5s)
- SSL certificate expiring soon

**Actions:** Email + Slack

**P3 - Medium (Response within 4 hours):**
- New error types detected
- Performance warning thresholds
- Non-critical API failures

**Actions:** Email

**P4 - Low (Response within 24 hours):**
- Informational alerts
- Usage threshold warnings
- Optimization opportunities

**Actions:** Email (daily digest)

### Alert Rules

**Avoid Alert Fatigue:**
1. Set appropriate thresholds
2. Use alert aggregation (group similar alerts)
3. Configure cooldown periods
4. Filter out expected errors (e.g., 404s)
5. Regular alert review and tuning

**Recommended Thresholds:**
```
Uptime Check Failures: Alert after 2 consecutive failures
Error Rate: Alert if >5% of requests fail in 5 minutes
Response Time: Alert if p95 >3s for 5 minutes
Memory Usage: Alert if >85% for 10 minutes
CPU Usage: Alert if >90% for 5 minutes
```

---

## Monitoring Dashboard

### Unified Dashboard Setup

Create a centralized monitoring dashboard using:

**Option 1: Grafana (Self-hosted)**
- Connect Sentry, Vercel, Uptime data
- Custom visualization
- Free and open-source

**Option 2: Datadog (Paid)**
- All-in-one monitoring
- Advanced features
- Expensive but comprehensive

**Option 3: Custom Dashboard**
- Use Vercel Analytics API
- Sentry API
- Display on internal page

### Key Metrics to Display

**System Health:**
- Uptime percentage (last 24h, 7d, 30d)
- Current status (up/down)
- Response time (average, p95, p99)

**Error Tracking:**
- Error count (last 24h)
- New error types
- Most common errors
- Affected users

**Performance:**
- Core Web Vitals (LCP, FID, CLS)
- Page load times
- API response times
- Database query performance

**Business Metrics:**
- Page views
- Newsletter signups
- Contact form submissions
- Admin logins

### Dashboard Example Layout

```
┌─────────────────────────────────────────────┐
│  System Status: 🟢 All Systems Operational  │
├─────────────────────────────────────────────┤
│  Uptime: 99.95%  |  Response Time: 245ms    │
│  Errors: 3       |  Users Affected: 0       │
└─────────────────────────────────────────────┘

┌──────────────┬──────────────┬──────────────┐
│ LCP: 1.2s ✓  │ FID: 45ms ✓  │ CLS: 0.05 ✓  │
└──────────────┴──────────────┴──────────────┘

Recent Errors:
  1. TypeError in ContactForm - 2 occurrences
  2. API timeout in /api/newsletter - 1 occurrence

Performance Trends:
  [Graph: Response time over last 24h]
  [Graph: Error rate over last 7d]
```

---

## Error Response Procedures

### Incident Response Workflow

**Step 1: Alert Received**
1. Acknowledge alert in monitoring system
2. Check severity level
3. Assign to on-call engineer

**Step 2: Initial Investigation (5 minutes)**
1. Check application status (is it down?)
2. Check health endpoint
3. Review recent deployments
4. Check Vercel deployment logs
5. Check Sentry for errors

**Step 3: Triage (10 minutes)**
Determine:
- Scope: All users or subset?
- Impact: What functionality is affected?
- Root cause: Code, infrastructure, external service?
- Urgency: Can it wait or needs immediate fix?

**Step 4: Communication**
- **P1:** Notify team immediately
- **P2:** Update in team chat
- **P3/P4:** Log in issue tracker

**Step 5: Resolution**
- Apply hotfix if available
- Roll back to previous deployment if needed
- Contact external service provider if issue is external
- Scale resources if performance issue

**Step 6: Post-Incident**
1. Document incident
2. Root cause analysis
3. Create prevention tasks
4. Update runbooks

### Common Issues and Solutions

**Issue: Application Down (500 errors)**
```
Symptoms: Health check failing, all pages return 500
Quick Check:
  1. Vercel deployment status
  2. Database connection
  3. Recent deployments
Solution:
  - Rollback to previous deployment
  - Check environment variables
  - Verify database is accessible
```

**Issue: High Error Rate**
```
Symptoms: Sentry showing spike in errors
Quick Check:
  1. Check error types in Sentry
  2. Check affected endpoints
  3. Check external service status
Solution:
  - If specific endpoint: Disable feature flag
  - If external service: Add fallback or retry logic
  - If code bug: Hotfix and deploy
```

**Issue: Slow Performance**
```
Symptoms: Response times >5s, timeout errors
Quick Check:
  1. Vercel metrics
  2. Database query performance
  3. External API response times
Solution:
  - Scale Vercel plan if traffic spike
  - Optimize slow database queries
  - Add caching
  - Contact Supabase support if database issue
```

**Issue: SSL Certificate Issues**
```
Symptoms: SSL warnings, HTTPS not working
Quick Check:
  1. Vercel domain settings
  2. DNS configuration
  3. Certificate expiry
Solution:
  - Vercel auto-renews Let's Encrypt certs
  - If custom cert: Renew and upload
  - Check DNS propagation
```

### Escalation Path

**Level 1: On-call Engineer**
- Initial response
- Basic troubleshooting
- Can rollback deployments

**Level 2: Technical Lead**
- Complex issues
- Architecture decisions
- Database issues

**Level 3: External Support**
- Vercel Support (infrastructure)
- Supabase Support (database)
- Service-specific support

---

## Monitoring Checklist

### Initial Setup

- [ ] Sentry account created
- [ ] Sentry SDK installed and configured
- [ ] Sentry DSN added to environment variables
- [ ] Source maps uploading correctly
- [ ] Test error sent and received in Sentry
- [ ] Sentry alerts configured
- [ ] Vercel Analytics enabled
- [ ] Analytics package installed (if using custom events)
- [ ] Uptime monitor configured (UptimeRobot or alternative)
- [ ] Health check endpoint monitored
- [ ] SSL certificate monitoring enabled
- [ ] Alert channels configured (email, Slack)
- [ ] Alert rules set with appropriate thresholds
- [ ] Incident response procedures documented
- [ ] Team trained on monitoring tools

### Ongoing Maintenance

- [ ] Review alerts weekly
- [ ] Tune alert thresholds monthly
- [ ] Review error trends monthly
- [ ] Update monitoring documentation quarterly
- [ ] Test alert channels quarterly
- [ ] Review and update incident procedures annually

---

## Additional Resources

**Sentry:**
- Documentation: https://docs.sentry.io/platforms/javascript/guides/nextjs/
- Best Practices: https://docs.sentry.io/product/best-practices/

**Vercel Analytics:**
- Documentation: https://vercel.com/docs/analytics
- Core Web Vitals: https://web.dev/vitals/

**Uptime Monitoring:**
- UptimeRobot: https://uptimerobot.com
- Better Uptime: https://betteruptime.com

**Internal Documentation:**
- [Deployment Guide](./deployment-guide.md)
- [Security Checklist](./security-checklist.md)
- [Rollback Procedures](./rollback-procedures.md)

---

**Document Version:** 1.0.0
**Last Updated:** October 2025
**Next Review:** January 2026
