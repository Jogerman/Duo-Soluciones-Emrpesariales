# Production Security Checklist

**DUO Soluciones Empresariales**

**Version:** 1.0.0
**Last Updated:** October 2025
**Sprint:** Sprint 5 - Wave 2

---

## Table of Contents

1. [Overview](#overview)
2. [Pre-Deployment Security](#pre-deployment-security)
3. [Environment Variables Security](#environment-variables-security)
4. [Authentication & Authorization](#authentication--authorization)
5. [API Security](#api-security)
6. [Database Security](#database-security)
7. [Network Security](#network-security)
8. [Application Security](#application-security)
9. [Third-Party Services](#third-party-services)
10. [Monitoring & Incident Response](#monitoring--incident-response)
11. [Compliance & Privacy](#compliance--privacy)
12. [Post-Deployment Security](#post-deployment-security)

---

## Overview

This security checklist ensures that the DUO Soluciones Empresariales application is deployed with proper security measures in place. Complete all items before production deployment.

### Security Priority Levels

- **CRITICAL:** Must be completed before deployment
- **HIGH:** Should be completed before deployment
- **MEDIUM:** Complete within 7 days of deployment
- **LOW:** Complete within 30 days of deployment

### Security Contact

- **Security Team:** security@duosoluciones.com
- **Emergency:** [On-call phone number]

---

## Pre-Deployment Security

### Code Security

- [ ] **CRITICAL:** No hardcoded secrets, API keys, or passwords in code
- [ ] **CRITICAL:** All sensitive data removed from Git history
- [ ] **CRITICAL:** `.env.local` files not committed to repository
- [ ] **CRITICAL:** `.gitignore` includes all sensitive files
- [ ] **HIGH:** Dependencies updated to latest secure versions
- [ ] **HIGH:** No known vulnerabilities in dependencies (`npm audit`)
- [ ] **HIGH:** Code reviewed for security issues
- [ ] **MEDIUM:** Static code analysis completed (ESLint security rules)
- [ ] **MEDIUM:** No console.log statements in production code

**Verification:**
```bash
# Check for hardcoded secrets
git grep -E "(password|secret|key|token)\s*=\s*['\"][^'\"]+['\"]" --ignore-case

# Check dependencies for vulnerabilities
npm audit

# Check for console.log
npm run build  # Should remove console.log in production

# Verify .gitignore
cat .gitignore | grep -E "^\.env"
```

### Repository Security

- [ ] **CRITICAL:** GitHub repository is private (for proprietary code)
- [ ] **HIGH:** Branch protection enabled on `main` branch
- [ ] **HIGH:** Require pull request reviews before merging
- [ ] **HIGH:** Require status checks to pass before merging
- [ ] **MEDIUM:** Signed commits enabled (optional but recommended)
- [ ] **MEDIUM:** Repository security advisories enabled
- [ ] **LOW:** Dependabot alerts enabled

---

## Environment Variables Security

### Critical Variables

- [ ] **CRITICAL:** `NEXTAUTH_SECRET` generated with `openssl rand -base64 32`
- [ ] **CRITICAL:** `PAYLOAD_SECRET` generated with `openssl rand -base64 32`
- [ ] **CRITICAL:** Production secrets are DIFFERENT from development
- [ ] **CRITICAL:** `NEXTAUTH_SECRET` length >= 32 characters
- [ ] **CRITICAL:** `PAYLOAD_SECRET` length >= 32 characters
- [ ] **CRITICAL:** `DATABASE_URL` password is strong (16+ characters)

**Generate Secure Secrets:**
```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### Variable Configuration

- [ ] **CRITICAL:** All required environment variables set in Vercel
- [ ] **CRITICAL:** No `NEXT_PUBLIC_` prefix on sensitive variables
- [ ] **CRITICAL:** `NEXT_PUBLIC_` only used for non-sensitive client data
- [ ] **HIGH:** Environment variables documented in `.env.production.example`
- [ ] **HIGH:** Production environment selected for all sensitive variables
- [ ] **MEDIUM:** Preview environment configured appropriately
- [ ] **LOW:** Development environment uses different credentials

### Secret Management

- [ ] **CRITICAL:** Secrets stored in Vercel dashboard (encrypted at rest)
- [ ] **CRITICAL:** Secrets not shared via email, Slack, or other insecure channels
- [ ] **HIGH:** Team access to secrets limited to necessary personnel
- [ ] **HIGH:** Secrets rotation schedule established (90 days)
- [ ] **MEDIUM:** Password manager used for team secret sharing (1Password, etc.)
- [ ] **LOW:** Audit log of secret access reviewed regularly

---

## Authentication & Authorization

### NextAuth.js Configuration

- [ ] **CRITICAL:** `NEXTAUTH_URL` matches production domain exactly
- [ ] **CRITICAL:** `NEXTAUTH_URL` uses HTTPS protocol
- [ ] **CRITICAL:** Secure cookies enabled in production
- [ ] **CRITICAL:** Session token encryption enabled
- [ ] **HIGH:** Session timeout configured appropriately (30 minutes idle)
- [ ] **HIGH:** Password requirements enforced (8+ chars, complexity)
- [ ] **MEDIUM:** Rate limiting on login attempts
- [ ] **MEDIUM:** Account lockout after failed login attempts
- [ ] **LOW:** Multi-factor authentication available (future)

**Verify Configuration:**
```typescript
// In auth.config.ts
export const authConfig = {
  providers: [/* ... */],
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes
  },
  cookies: {
    sessionToken: {
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // ✓ HTTPS only
        sameSite: "lax",
      },
    },
  },
};
```

### Password Security

- [ ] **CRITICAL:** Passwords hashed with bcrypt (work factor >= 10)
- [ ] **CRITICAL:** No plain-text password storage
- [ ] **HIGH:** Password reset tokens expire (1 hour)
- [ ] **HIGH:** Password reset tokens single-use only
- [ ] **MEDIUM:** Password history prevents reuse (last 5 passwords)
- [ ] **LOW:** Password strength meter on registration

### Access Control

- [ ] **CRITICAL:** Admin panel (`/admin`) requires authentication
- [ ] **CRITICAL:** API routes validate authentication tokens
- [ ] **HIGH:** Role-based access control (RBAC) implemented
- [ ] **HIGH:** Principle of least privilege applied
- [ ] **MEDIUM:** Session invalidation on logout
- [ ] **MEDIUM:** Concurrent session limits enforced

---

## API Security

### Rate Limiting

- [ ] **CRITICAL:** Rate limiting enabled on all public API endpoints
- [ ] **CRITICAL:** Contact form API rate limited (5 requests/hour/IP)
- [ ] **CRITICAL:** Newsletter API rate limited (3 requests/hour/IP)
- [ ] **HIGH:** Rate limiting uses Redis (Upstash) for distributed tracking
- [ ] **HIGH:** Rate limit headers returned (`X-RateLimit-*`)
- [ ] **MEDIUM:** Different rate limits for authenticated vs anonymous users
- [ ] **LOW:** Rate limit exceeded responses logged for analysis

**Verify Rate Limiting:**
```bash
# Test rate limiting
for i in {1..10}; do
  curl -w "\nStatus: %{http_code}\n" \
    -X POST https://your-domain.com/api/contact \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com"}'
  sleep 1
done

# Should return 429 after limit exceeded
```

### Input Validation

- [ ] **CRITICAL:** All API inputs validated with Zod schemas
- [ ] **CRITICAL:** Email addresses validated (format and DNS)
- [ ] **CRITICAL:** SQL injection prevention via parameterized queries (Drizzle ORM)
- [ ] **HIGH:** XSS prevention via input sanitization
- [ ] **HIGH:** CSRF protection enabled (NextAuth.js default)
- [ ] **MEDIUM:** File upload validation (type, size, content)
- [ ] **MEDIUM:** JSON payload size limits enforced

**Example Validation:**
```typescript
// API route with validation
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
});

export async function POST(req: Request) {
  const body = await req.json();
  const validatedData = schema.parse(body); // Throws if invalid
  // ... proceed with validated data
}
```

### CORS Configuration

- [ ] **CRITICAL:** CORS configured to allow only trusted domains
- [ ] **CRITICAL:** Wildcard `*` origins NOT used in production
- [ ] **HIGH:** CORS credentials restricted appropriately
- [ ] **MEDIUM:** Preflight requests handled correctly

**Verify CORS:**
```bash
# Test CORS headers
curl -I -X OPTIONS https://your-domain.com/api/contact \
  -H "Origin: https://malicious-site.com"

# Should NOT include Access-Control-Allow-Origin for untrusted origins
```

### API Authentication

- [ ] **CRITICAL:** API keys required for administrative endpoints
- [ ] **HIGH:** Bearer token authentication for user-specific endpoints
- [ ] **HIGH:** API key rotation capability
- [ ] **MEDIUM:** API versioning strategy defined
- [ ] **LOW:** API usage analytics enabled

---

## Database Security

### Connection Security

- [ ] **CRITICAL:** Database connection uses SSL/TLS encryption
- [ ] **CRITICAL:** Connection pooling enabled to prevent exhaustion
- [ ] **CRITICAL:** Database password is strong and unique
- [ ] **HIGH:** Connection string stored securely (Vercel env vars)
- [ ] **HIGH:** Database accessible only from Vercel IP ranges (if possible)
- [ ] **MEDIUM:** Connection timeout configured
- [ ] **LOW:** Idle connection cleanup enabled

**Verify Connection:**
```bash
# Check SSL connection
psql "$DATABASE_URL" -c "SHOW ssl;"
# Expected: on

# Check connection details
psql "$DATABASE_URL" -c "SELECT version();"
```

### Data Security

- [ ] **CRITICAL:** Sensitive data encrypted at rest (Supabase default)
- [ ] **CRITICAL:** Personal data (PII) identified and protected
- [ ] **HIGH:** Database backups encrypted
- [ ] **HIGH:** Backup retention policy defined (7-30 days)
- [ ] **MEDIUM:** Database access logged and monitored
- [ ] **MEDIUM:** Regular security audits of database permissions
- [ ] **LOW:** Data masking for non-production environments

### Query Security

- [ ] **CRITICAL:** All queries use parameterized statements (Drizzle ORM)
- [ ] **CRITICAL:** No raw SQL with user input
- [ ] **HIGH:** Database user has minimal required permissions
- [ ] **HIGH:** No `SELECT *` in production queries (specify columns)
- [ ] **MEDIUM:** Query performance monitored for anomalies
- [ ] **LOW:** Prepared statements cached for performance

---

## Network Security

### HTTPS/TLS

- [ ] **CRITICAL:** HTTPS enabled on all production domains
- [ ] **CRITICAL:** TLS 1.2+ required (TLS 1.0/1.1 disabled)
- [ ] **CRITICAL:** Valid SSL certificate installed (Vercel auto-provisioned)
- [ ] **HIGH:** HTTP redirects to HTTPS automatically
- [ ] **HIGH:** SSL certificate auto-renewal configured (Vercel default)
- [ ] **MEDIUM:** Certificate expiration monitoring enabled
- [ ] **LOW:** SSL Labs rating A or higher

**Verify HTTPS:**
```bash
# Test HTTPS redirect
curl -I http://your-domain.com
# Should return 301/302 redirect to https://

# Test SSL certificate
curl -vI https://your-domain.com 2>&1 | grep "SSL certificate"

# Or use online tool
# https://www.ssllabs.com/ssltest/analyze.html?d=your-domain.com
```

### Security Headers

- [ ] **CRITICAL:** `Strict-Transport-Security` (HSTS) enabled
- [ ] **CRITICAL:** `X-Frame-Options` set to `SAMEORIGIN`
- [ ] **CRITICAL:** `X-Content-Type-Options` set to `nosniff`
- [ ] **HIGH:** `X-XSS-Protection` enabled
- [ ] **HIGH:** `Referrer-Policy` configured
- [ ] **MEDIUM:** `Content-Security-Policy` (CSP) configured
- [ ] **MEDIUM:** `Permissions-Policy` configured
- [ ] **LOW:** Security headers tested with securityheaders.com

**Verify Security Headers:**
```bash
curl -I https://your-domain.com

# Expected headers:
# Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
# X-Frame-Options: SAMEORIGIN
# X-Content-Type-Options: nosniff
# X-XSS-Protection: 1; mode=block
# Referrer-Policy: origin-when-cross-origin
```

### DNS Security

- [ ] **HIGH:** DNSSEC enabled on domain
- [ ] **HIGH:** CAA records configured (Certificate Authority Authorization)
- [ ] **MEDIUM:** SPF records configured for email
- [ ] **MEDIUM:** DKIM configured for email (Resend)
- [ ] **MEDIUM:** DMARC configured for email
- [ ] **LOW:** DNS monitoring for unauthorized changes

---

## Application Security

### Content Security

- [ ] **CRITICAL:** No inline scripts in production (CSP violation)
- [ ] **HIGH:** User-generated content sanitized (React escapes by default)
- [ ] **HIGH:** Markdown rendering sanitized (remark-gfm)
- [ ] **MEDIUM:** File upload types validated
- [ ] **MEDIUM:** Image optimization and processing secure
- [ ] **LOW:** Click-jacking protection enabled

### Session Security

- [ ] **CRITICAL:** Session tokens stored in HTTP-only cookies
- [ ] **CRITICAL:** Session tokens use secure flag in production
- [ ] **HIGH:** SameSite cookie attribute set to `lax` or `strict`
- [ ] **HIGH:** Session fixation prevention
- [ ] **MEDIUM:** Session token rotation on privilege escalation
- [ ] **LOW:** Absolute session timeout (24 hours)

### Error Handling

- [ ] **CRITICAL:** No sensitive data in error messages
- [ ] **CRITICAL:** Stack traces not exposed in production
- [ ] **HIGH:** Generic error pages for production users
- [ ] **HIGH:** Detailed errors logged server-side only
- [ ] **MEDIUM:** Error monitoring configured (Sentry)
- [ ] **LOW:** Error rate alerts configured

**Verify Error Handling:**
```typescript
// In next.config.ts
export default {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // ✓
  },
  // ...
}

// Custom error pages
// /pages/500.tsx exists
```

### Client-Side Security

- [ ] **HIGH:** No sensitive data in client-side JavaScript
- [ ] **HIGH:** localStorage/sessionStorage not used for sensitive data
- [ ] **MEDIUM:** Subresource Integrity (SRI) for external scripts
- [ ] **MEDIUM:** Third-party script sources limited (CSP)
- [ ] **LOW:** Client-side crypto uses secure algorithms

---

## Third-Party Services

### Service Provider Security

- [ ] **CRITICAL:** All third-party services use API keys (not passwords)
- [ ] **CRITICAL:** API keys stored in environment variables (not code)
- [ ] **HIGH:** Two-factor authentication enabled on all service accounts
- [ ] **HIGH:** Service provider security certifications verified
- [ ] **MEDIUM:** Data processing agreements (DPA) signed where required
- [ ] **LOW:** Regular review of third-party access

### Specific Services

#### Supabase (Database)

- [ ] **CRITICAL:** Row Level Security (RLS) configured (if applicable)
- [ ] **HIGH:** Database password rotated regularly
- [ ] **HIGH:** API keys regenerated after exposure
- [ ] **MEDIUM:** Email confirmations enabled for schema changes
- [ ] **LOW:** Database metrics monitored

#### Resend (Email)

- [ ] **CRITICAL:** Domain verified in Resend dashboard
- [ ] **HIGH:** SPF, DKIM, DMARC configured for domain
- [ ] **HIGH:** API key limited to sending permissions only
- [ ] **MEDIUM:** Email sending limits monitored
- [ ] **LOW:** Bounce and complaint rates tracked

#### Cloudinary (Media)

- [ ] **CRITICAL:** Upload presets configured with restrictions
- [ ] **HIGH:** Transformation URLs signed (prevents abuse)
- [ ] **HIGH:** Storage limits monitored
- [ ] **MEDIUM:** Auto-moderation enabled (AI content check)
- [ ] **LOW:** Usage analytics reviewed monthly

#### Upstash (Redis)

- [ ] **CRITICAL:** REST API token rotated regularly
- [ ] **HIGH:** Redis accessible only from allowed IPs
- [ ] **MEDIUM:** Connection encryption enabled
- [ ] **LOW:** Memory usage monitored

---

## Monitoring & Incident Response

### Logging

- [ ] **CRITICAL:** Application errors logged (Sentry or equivalent)
- [ ] **CRITICAL:** Security events logged (failed logins, etc.)
- [ ] **HIGH:** Log retention policy defined (90 days)
- [ ] **HIGH:** Logs stored securely (encrypted at rest)
- [ ] **MEDIUM:** Log access audited
- [ ] **LOW:** Log analysis automated for anomalies

### Monitoring

- [ ] **CRITICAL:** Uptime monitoring configured (UptimeRobot, etc.)
- [ ] **CRITICAL:** Error rate alerts configured
- [ ] **HIGH:** Performance monitoring enabled (Vercel Analytics)
- [ ] **HIGH:** Database performance monitored
- [ ] **MEDIUM:** Security incident alerts configured
- [ ] **MEDIUM:** Unusual traffic patterns detected
- [ ] **LOW:** Weekly security metrics reviewed

### Incident Response

- [ ] **HIGH:** Incident response plan documented
- [ ] **HIGH:** Security incident contacts identified
- [ ] **HIGH:** Escalation procedures defined
- [ ] **MEDIUM:** Incident communication templates prepared
- [ ] **MEDIUM:** Post-incident review process established
- [ ] **LOW:** Annual incident response drill conducted

---

## Compliance & Privacy

### GDPR Compliance

- [ ] **CRITICAL:** Privacy policy published and accessible
- [ ] **CRITICAL:** Cookie consent banner implemented (if EU users)
- [ ] **CRITICAL:** User data deletion capability implemented
- [ ] **HIGH:** Data processing records maintained
- [ ] **HIGH:** Data breach notification procedures defined
- [ ] **MEDIUM:** Data protection impact assessment (DPIA) completed
- [ ] **MEDIUM:** Data minimization principles applied
- [ ] **LOW:** DPO (Data Protection Officer) appointed if required

### Newsletter Compliance

- [ ] **CRITICAL:** Double opt-in verification implemented
- [ ] **CRITICAL:** Unsubscribe link in all emails
- [ ] **CRITICAL:** One-click unsubscribe functional
- [ ] **HIGH:** Consent timestamp recorded
- [ ] **HIGH:** Consent source tracked
- [ ] **MEDIUM:** Email preferences center available
- [ ] **LOW:** Unsubscribe reasons collected (optional)

### Data Retention

- [ ] **HIGH:** Data retention policy documented
- [ ] **HIGH:** Inactive accounts purged after defined period
- [ ] **MEDIUM:** Newsletter unsubscribers data retained per legal requirements
- [ ] **MEDIUM:** Backup retention aligns with policy
- [ ] **LOW:** Annual data retention audit

---

## Post-Deployment Security

### Immediate (Day 1)

- [ ] **CRITICAL:** Security headers verified with securityheaders.com
- [ ] **CRITICAL:** SSL certificate valid and properly configured
- [ ] **CRITICAL:** All critical security items from checklist completed
- [ ] **HIGH:** Penetration testing scheduled (within 7 days)
- [ ] **HIGH:** Security monitoring alerts tested
- [ ] **MEDIUM:** Deployment announcement includes security contact

### Week 1

- [ ] **HIGH:** Security scan completed (OWASP ZAP, Burp Suite)
- [ ] **HIGH:** Vulnerability assessment performed
- [ ] **MEDIUM:** Security metrics baseline established
- [ ] **MEDIUM:** Team security training completed
- [ ] **LOW:** Security documentation reviewed by team

### Month 1

- [ ] **HIGH:** External security audit (if budget allows)
- [ ] **MEDIUM:** Penetration testing results addressed
- [ ] **MEDIUM:** Security incident response plan tested
- [ ] **LOW:** Bug bounty program consideration
- [ ] **LOW:** Security roadmap for next quarter

### Ongoing

- [ ] **CRITICAL:** Monthly dependency updates and security patches
- [ ] **HIGH:** Quarterly security reviews
- [ ] **HIGH:** Annual penetration testing
- [ ] **MEDIUM:** Continuous security monitoring
- [ ] **LOW:** Security awareness training for team

---

## Security Testing Tools

### Automated Testing

```bash
# Dependency vulnerabilities
npm audit
npm audit fix

# Security headers
curl -I https://your-domain.com | grep -i "security\|x-frame\|x-content"

# SSL/TLS configuration
nmap --script ssl-enum-ciphers -p 443 your-domain.com

# OWASP ZAP (GUI tool)
# Download from: https://www.zaproxy.org/

# Lighthouse security audit
lighthouse https://your-domain.com --only-categories=best-practices
```

### Manual Testing

- [ ] Test authentication bypass attempts
- [ ] Test authorization escalation
- [ ] Test SQL injection (should be prevented by Drizzle ORM)
- [ ] Test XSS vulnerabilities
- [ ] Test CSRF protection
- [ ] Test rate limiting effectiveness
- [ ] Test session management
- [ ] Test file upload restrictions

### Online Tools

1. **Security Headers:** https://securityheaders.com
2. **SSL Labs:** https://www.ssllabs.com/ssltest/
3. **Observatory:** https://observatory.mozilla.org/
4. **Hardenize:** https://www.hardenize.com/
5. **ImmuniWeb:** https://www.immuniweb.com/websec/

---

## Security Checklist Summary

### Critical Items (Must Complete)

Total: 47 critical items

**Top 10 Most Important:**
1. No hardcoded secrets in code
2. Production secrets different from development
3. NEXTAUTH_SECRET and PAYLOAD_SECRET properly generated
4. HTTPS enabled on all domains
5. Security headers configured (HSTS, X-Frame-Options, etc.)
6. Rate limiting on all public APIs
7. Database connection encrypted (SSL/TLS)
8. Admin panel requires authentication
9. All API inputs validated
10. Session tokens in HTTP-only secure cookies

### Completion Status

Track your progress:

```
Critical: [___/47] (___%)
High:     [___/XX] (___%)
Medium:   [___/XX] (___%)
Low:      [___/XX] (___%)

Overall:  [___/XXX] (___%)
```

**Minimum for Deployment:** 100% of Critical + 80% of High items

---

## Sign-Off

### Deployment Approval

**Security Review Completed By:**
- Name: ___________________________
- Role: ___________________________
- Date: ___________________________
- Signature: ___________________________

**Deployment Approved By:**
- Name: ___________________________
- Role: ___________________________
- Date: ___________________________
- Signature: ___________________________

**Notes:**
_____________________________________________________________________
_____________________________________________________________________
_____________________________________________________________________

---

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/deploying/production-checklist)
- [Vercel Security Documentation](https://vercel.com/docs/security)
- [Web Security Guidelines - MDN](https://developer.mozilla.org/en-US/docs/Web/Security)

---

**Document Version:** 1.0.0
**Last Updated:** October 2025
**Next Review:** Monthly or after security incidents
