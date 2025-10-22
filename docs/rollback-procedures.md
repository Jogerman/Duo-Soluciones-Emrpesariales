# Rollback Procedures

**DUO Soluciones Empresariales - Emergency Recovery Guide**

**Version:** 1.0.0
**Last Updated:** October 2025

---

## Table of Contents

1. [Overview](#overview)
2. [Quick Rollback Guide](#quick-rollback-guide)
3. [Application Rollback](#application-rollback)
4. [Database Rollback](#database-rollback)
5. [Configuration Rollback](#configuration-rollback)
6. [Partial Rollback Procedures](#partial-rollback-procedures)
7. [Post-Rollback Verification](#post-rollback-verification)
8. [Incident Documentation](#incident-documentation)

---

## Overview

Rollback procedures provide step-by-step instructions for reverting deployments when issues are detected in production.

### When to Rollback

**Immediate Rollback Required:**
- Application completely down (500 errors across all pages)
- Critical security vulnerability discovered
- Data corruption occurring
- Database connection failures
- Authentication completely broken
- Payment processing failures (if applicable)

**Consider Rollback:**
- High error rate (>10% of requests)
- Significant performance degradation (>5s response times)
- Critical feature broken
- Multiple user reports of issues
- Failed database migration

**Monitor and Fix Forward:**
- Minor UI issues
- Low error rate (<1%)
- Non-critical feature bugs
- Analytics tracking issues
- Cosmetic problems

### Rollback Decision Matrix

```
┌─────────────────┬──────────────┬─────────────────┐
│ Impact          │ Severity     │ Action          │
├─────────────────┼──────────────┼─────────────────┤
│ All users       │ Site down    │ ROLLBACK NOW    │
│ All users       │ Major bug    │ Rollback        │
│ Some users      │ Critical     │ Rollback        │
│ Some users      │ Major        │ Consider        │
│ Few users       │ Minor        │ Fix forward     │
│ All users       │ Cosmetic     │ Fix forward     │
└─────────────────┴──────────────┴─────────────────┘
```

---

## Quick Rollback Guide

**For emergencies - detailed procedures below**

### 30-Second Rollback (Vercel)

```bash
# Via Vercel Dashboard
1. Go to https://vercel.com/your-team/duo-soluciones/deployments
2. Find last successful deployment (green checkmark)
3. Click "..." menu
4. Click "Promote to Production"
5. Confirm rollback
```

### 2-Minute Rollback (Git + Vercel)

```bash
# Via Git revert
git revert HEAD
git push origin main
# Vercel auto-deploys
```

### 5-Minute Rollback (Database + Application)

```bash
# 1. Rollback application (Vercel dashboard)
# 2. Rollback database (Supabase dashboard)
#    - Database > Backups > Select backup > Restore
# 3. Verify health check
curl https://duosoluciones.com/api/health
```

---

## Application Rollback

### Method 1: Vercel Dashboard Rollback (Recommended)

**Time:** ~30 seconds
**Risk:** Very low
**Scope:** Application code only

**Procedure:**

1. **Access Vercel Dashboard:**
   ```
   https://vercel.com/your-team/duo-soluciones-empresariales
   ```

2. **Navigate to Deployments:**
   - Click "Deployments" tab
   - View deployment history

3. **Identify Last Good Deployment:**
   - Look for green checkmark (successful deployment)
   - Check deployment time (before issue started)
   - Verify commit message

4. **Promote to Production:**
   - Click "..." menu on selected deployment
   - Select "Promote to Production"
   - Confirm action in modal

5. **Monitor Rollback:**
   - Watch deployment logs
   - Wait for "Deployment successful" message
   - Typically completes in 30-60 seconds

6. **Verify:**
   ```bash
   # Check health endpoint
   curl https://duosoluciones.com/api/health

   # Check homepage
   curl -I https://duosoluciones.com

   # Test critical paths
   curl -I https://duosoluciones.com/servicios
   ```

**Screenshot for reference:**
```
Deployments Page:
┌────────────────────────────────────────────────┐
│ ● v1.2.1 - main - 2 hours ago     [...]  ←─┐  │
│   ✓ Deployed successfully               │  │
│                                          │  │
│ ● v1.2.0 - main - 1 day ago              │  │
│   ✓ Deployed successfully     [Promote]─┘  │
│                                              │
│ ● v1.1.9 - main - 2 days ago                │
└──────────────────────────────────────────────┘
```

### Method 2: Vercel CLI Rollback

**Time:** ~1 minute
**Requirements:** Vercel CLI installed

**Procedure:**

```bash
# 1. Install Vercel CLI (if not installed)
npm i -g vercel

# 2. Login
vercel login

# 3. List deployments
vercel ls

# Output:
# Age    Deployment                          Status
# 2h     duo-soluciones-abc123.vercel.app   READY
# 1d     duo-soluciones-xyz789.vercel.app   READY ← Last good

# 4. Get deployment URL of last good deployment
# Then promote it
vercel promote duo-soluciones-xyz789.vercel.app

# 5. Confirm when prompted
```

### Method 3: Git Revert Rollback

**Time:** ~2-3 minutes
**Risk:** Low
**Best for:** When you want to keep Git history clean

**Procedure:**

```bash
# 1. Identify problematic commit
git log --oneline -10

# Output:
# abc1234 (HEAD -> main) Fix: Updated contact form
# xyz5678 Feat: Added newsletter feature ← Problem here
# def9012 Fix: Performance improvements

# 2. Revert the commit
git revert abc1234

# Or revert multiple commits
git revert abc1234..xyz5678

# 3. Push to trigger auto-deployment
git push origin main

# 4. Monitor Vercel deployment
# Vercel will automatically deploy the revert

# 5. Verify deployment
vercel logs
```

**Advantages:**
- Preserves Git history
- Clear record of what was reverted
- Easy to re-apply later

**Disadvantages:**
- Takes longer than direct promotion
- Requires Git access
- May have conflicts if multiple commits

### Method 4: Git Reset Rollback (Use with Caution)

**Time:** ~2 minutes
**Risk:** HIGH - rewrites history
**Use only when:** Revert is not possible or multiple bad commits

**Procedure:**

```bash
# WARNING: This rewrites Git history!
# Only use if you understand the implications

# 1. Find last good commit
git log --oneline -10

# 2. Reset to that commit (DESTRUCTIVE)
git reset --hard xyz5678

# 3. Force push (DANGEROUS)
git push origin main --force

# 4. Vercel auto-deploys

# 5. Verify
curl https://duosoluciones.com/api/health
```

**⚠️ WARNINGS:**
- Rewrites Git history
- Other team members will have issues pulling
- Lost commits are not easily recoverable
- Only use in emergency
- Notify entire team immediately

---

## Database Rollback

### Point-in-Time Recovery (Preferred)

**Time:** ~10-15 minutes
**Available:** Supabase Pro plan
**Risk:** Medium (data loss from selected time forward)

**Procedure:**

1. **Access Supabase Dashboard:**
   ```
   https://app.supabase.com/project/[your-project-id]
   ```

2. **Navigate to Backups:**
   - Database > Backups
   - Select "Point-in-Time Recovery" tab

3. **Select Recovery Point:**
   - Choose date and time (before issue occurred)
   - Example: If issue started at 14:30, select 14:25
   - Shows preview of recovery point

4. **Review Impact:**
   - Data added after recovery point will be lost
   - Document what will be lost
   - Consider if manual data re-entry is needed

5. **Create Pre-Restore Backup:**
   - Click "Create backup" first
   - Name: "Pre-PITR-recovery-[timestamp]"
   - Wait for completion

6. **Execute Recovery:**
   - Click "Restore to this point"
   - Enter project name to confirm
   - Click "Restore database"

7. **Monitor Progress:**
   - Recovery typically takes 5-15 minutes
   - Database will be read-only during recovery
   - Application may show errors during this time

8. **Post-Recovery Verification:**
   ```sql
   -- Connect to database
   psql $DATABASE_URL

   -- Verify tables exist
   \dt

   -- Check critical data
   SELECT COUNT(*) FROM newsletter_subscribers;
   SELECT COUNT(*) FROM blog_posts;

   -- Verify latest entries
   SELECT * FROM audit_log ORDER BY created_at DESC LIMIT 10;
   ```

### Backup Restoration

**Time:** ~20-30 minutes
**Available:** All Supabase plans
**Risk:** Medium-High (data loss from backup time forward)

**Procedure:**

1. **Access Backups:**
   - Supabase Dashboard > Database > Backups
   - View available backups

2. **Select Backup:**
   - Choose backup before issue (e.g., yesterday's backup)
   - Note: All changes after backup will be lost
   - Document recent changes to re-apply if needed

3. **Download Backup (Optional):**
   ```bash
   # Download for local testing first
   # Via Supabase dashboard - click download button
   ```

4. **Test Restoration Locally (Recommended):**
   ```bash
   # Create test database
   createdb test_restore

   # Restore backup
   psql test_restore < downloaded-backup.sql

   # Verify data
   psql test_restore -c "SELECT COUNT(*) FROM newsletter_subscribers;"

   # Cleanup
   dropdb test_restore
   ```

5. **Execute Production Restore:**
   - Click "Restore" button on selected backup
   - Confirm project name
   - Wait for completion (10-20 minutes)

6. **Verify Database:**
   ```bash
   # Check application connectivity
   curl https://duosoluciones.com/api/health

   # Test database operations
   # Try logging in, creating test newsletter signup, etc.
   ```

### Manual SQL Rollback

**Time:** ~5 minutes
**Use for:** Specific data changes
**Risk:** Low (surgical fix)

**Scenario:** Accidentally deleted records

**Procedure:**

```sql
-- 1. Identify deleted records (if you have audit log)
SELECT * FROM audit_log
WHERE action = 'DELETE'
  AND table_name = 'newsletter_subscribers'
  AND created_at > NOW() - INTERVAL '1 hour'
ORDER BY created_at DESC;

-- 2. If you have soft deletes, restore:
UPDATE newsletter_subscribers
SET deleted_at = NULL, is_active = TRUE
WHERE deleted_at > NOW() - INTERVAL '1 hour';

-- 3. Verify restoration
SELECT COUNT(*) FROM newsletter_subscribers WHERE is_active = TRUE;

-- 4. Or re-insert from backup
-- (if you have specific data to restore)
INSERT INTO newsletter_subscribers (email, name, ...)
VALUES
  ('recovered@example.com', 'Recovered User', ...),
  (...);
```

### Migration Rollback

**Time:** ~10 minutes
**Use for:** Failed or problematic migrations

**Procedure:**

1. **Identify Migration:**
   ```bash
   # Check migration history
   npm run db:studio
   # Or check drizzle_migrations table
   ```

2. **Restore from Pre-Migration Backup:**
   ```bash
   # You should have created this before migration
   psql $DATABASE_URL < backups/pre-migration-20251022.sql
   ```

3. **Or Run Down Migration (if available):**
   ```bash
   # If your migration has a down function
   npm run db:migrate:down
   ```

4. **Verify Schema:**
   ```sql
   -- Check tables
   \dt

   -- Verify structure
   \d newsletter_subscribers

   -- Check constraints
   SELECT * FROM information_schema.table_constraints
   WHERE table_name = 'newsletter_subscribers';
   ```

5. **Fix Migration:**
   - Update migration file
   - Test in development
   - Re-run with monitoring

---

## Configuration Rollback

### Environment Variables Rollback

**Scenario:** Incorrect environment variable causing issues

**Procedure:**

1. **Identify Problematic Variable:**
   - Check recent changes in Vercel dashboard
   - Review deployment logs for errors
   - Check Sentry for configuration-related errors

2. **Restore Previous Value:**
   ```
   Vercel Dashboard:
   1. Settings > Environment Variables
   2. Find changed variable
   3. Click "Edit"
   4. Restore previous value (from documentation)
   5. Click "Save"
   ```

3. **Redeploy:**
   - Deployments > Latest deployment
   - Click "Redeploy"
   - Select "Use existing build cache" if possible

4. **Verify:**
   ```bash
   # Check if issue resolved
   curl https://duosoluciones.com/api/health

   # Check application functionality
   ```

### next.config.ts Rollback

**Scenario:** Configuration change causing build or runtime issues

**Procedure:**

```bash
# 1. Check git history
git log --oneline next.config.ts

# 2. View previous version
git show HEAD~1:next.config.ts

# 3. Revert to previous version
git checkout HEAD~1 -- next.config.ts

# 4. Commit and push
git commit -m "Rollback: Revert next.config.ts changes"
git push origin main

# 5. Monitor deployment
vercel logs
```

---

## Partial Rollback Procedures

### Feature Flag Rollback

**Best for:** Disabling specific features without full rollback

**Procedure:**

1. **Update Feature Flag:**
   ```
   Vercel Dashboard > Environment Variables:

   # Disable problematic feature
   NEXT_PUBLIC_ENABLE_NEWSLETTER=false
   ```

2. **Redeploy:**
   - Quick redeploy (1-2 minutes)
   - Feature disabled, rest of application unaffected

3. **Or use runtime feature flags:**
   ```typescript
   // In code, add kill switch
   if (process.env.NEXT_PUBLIC_ENABLE_NEWSLETTER !== 'true') {
     return null; // Feature disabled
   }
   ```

### API Endpoint Rollback

**Scenario:** Specific API endpoint failing

**Procedure:**

1. **Identify Endpoint:**
   ```
   Example: /api/newsletter
   ```

2. **Quick Fix Options:**

   **Option A: Add maintenance mode:**
   ```typescript
   // src/app/api/newsletter/route.ts
   export async function POST() {
     return Response.json(
       { error: 'Service temporarily unavailable' },
       { status: 503 }
     );
   }
   ```

   **Option B: Revert just that file:**
   ```bash
   git checkout HEAD~1 -- src/app/api/newsletter/route.ts
   git commit -m "Rollback: Revert newsletter API"
   git push
   ```

### Component Rollback

**Scenario:** Specific component causing issues

**Procedure:**

```bash
# 1. Identify component
# Example: NewsletterForm component

# 2. Revert component file
git checkout HEAD~5 -- src/components/NewsletterForm.tsx

# 3. Or replace with fallback
# Edit file to show simple message:
# "Newsletter signup temporarily unavailable"

# 4. Commit and deploy
git commit -m "Rollback: Revert NewsletterForm component"
git push
```

---

## Post-Rollback Verification

### Critical Verification Steps

**Immediately After Rollback (5 minutes):**

```bash
# 1. Health check
curl https://duosoluciones.com/api/health
# Expected: {"status":"healthy",...}

# 2. Homepage
curl -I https://duosoluciones.com
# Expected: HTTP/2 200

# 3. Critical pages
curl -I https://duosoluciones.com/servicios
curl -I https://duosoluciones.com/blog
curl -I https://duosoluciones.com/contacto

# 4. API endpoints (if applicable)
curl -X POST https://duosoluciones.com/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com"}'
```

**Functional Testing (10 minutes):**

1. **Authentication:**
   - Log in to admin panel
   - Verify session persists
   - Test logout

2. **Core Features:**
   - Navigate between pages
   - Submit contact form
   - Sign up for newsletter
   - View blog posts

3. **Database Operations:**
   - Create test data
   - Update existing data
   - Verify data persistence

4. **Media:**
   - Images load correctly
   - Cloudinary integration works
   - Upload test (in admin)

**Monitoring Check (15 minutes):**

1. **Error Rates:**
   - Check Sentry: Should be minimal errors
   - Vercel logs: No 500 errors
   - No new error types

2. **Performance:**
   - Response times back to normal (<1s)
   - Core Web Vitals acceptable
   - No timeouts

3. **User Reports:**
   - Monitor support channels
   - Check social media mentions
   - Review user feedback

### Verification Checklist

**Application Status:**
- [ ] Health check endpoint returns 200
- [ ] Homepage loads without errors
- [ ] All critical pages accessible
- [ ] No 500 errors in logs
- [ ] JavaScript loads and executes
- [ ] No console errors

**Database Status:**
- [ ] Database connection successful
- [ ] Queries executing normally
- [ ] Data integrity verified
- [ ] No connection pool errors
- [ ] Migrations table correct state

**External Services:**
- [ ] Email sending works (Resend)
- [ ] Media uploads work (Cloudinary)
- [ ] Authentication works (NextAuth)
- [ ] Rate limiting active (Upstash)

**Performance:**
- [ ] Response times <1s average
- [ ] No timeout errors
- [ ] Core Web Vitals acceptable
- [ ] No memory leaks

**Monitoring:**
- [ ] Sentry receiving events
- [ ] Vercel Analytics tracking
- [ ] Uptime monitor shows UP
- [ ] No new alerts triggered

---

## Incident Documentation

### Required Documentation

After every rollback, document:

1. **Incident Summary:**
   ```markdown
   # Rollback Incident - 2025-10-22

   ## Issue Description
   Newsletter signup API returning 500 errors for all requests

   ## Impact
   - Affected: 100% of newsletter signups
   - Duration: 14:30 - 14:45 (15 minutes)
   - Affected users: ~50 attempted signups

   ## Root Cause
   Database migration added NOT NULL constraint without default value

   ## Rollback Performed
   - Application: Reverted to v1.2.0
   - Database: Point-in-time recovery to 14:25
   - Duration: 5 minutes
   ```

2. **Timeline:**
   ```
   14:30 - Deployment v1.2.1 completed
   14:32 - First error reports via Sentry
   14:35 - Issue confirmed, rollback initiated
   14:37 - Application rolled back to v1.2.0
   14:40 - Database PITR to 14:25 completed
   14:42 - Verification complete
   14:45 - All systems normal
   ```

3. **Actions Taken:**
   - Immediate: Rollback to v1.2.0
   - Database: Point-in-time recovery
   - Communication: Team notified via Slack
   - Monitoring: Increased alerting sensitivity

4. **Prevention:**
   - Add migration validation in CI/CD
   - Require manual testing of migrations
   - Add rollback test to deployment checklist
   - Update migration documentation

### Post-Incident Review

Schedule within 24 hours of rollback:

**Participants:**
- Person who initiated rollback
- Person who deployed problematic version
- Technical lead
- DevOps/Infrastructure team

**Discussion Points:**
1. What went wrong?
2. Why did it get to production?
3. How was it detected?
4. How quickly was it resolved?
5. What can we improve?

**Outcome:**
- Updated procedures
- New tests/checks added
- Documentation updated
- Training identified

---

## Rollback Authorization

### Who Can Perform Rollback

**Tier 1: Emergency Rollback (anyone on-call):**
- Application rollback via Vercel dashboard
- Disable feature flags
- Basic troubleshooting

**Tier 2: Full Rollback (Senior developers, DevOps):**
- Database point-in-time recovery
- Git force push (if necessary)
- Environment variable changes
- Infrastructure changes

**Tier 3: Disaster Recovery (Technical lead, CTO):**
- Complete system restoration
- Provider switching
- Major infrastructure changes

### Notification Requirements

**Immediately Notify:**
- On-call engineer (if not performing rollback)
- Technical lead
- Team via Slack #incidents

**Within 1 Hour:**
- Complete team
- Stakeholders (if customer-facing)
- Support team

**Within 24 Hours:**
- Post-incident review scheduled
- Documentation updated
- Lessons learned shared

---

## Best Practices

1. **Always create backup before risky operations**
2. **Test rollback procedures regularly** (quarterly drill)
3. **Document every rollback** (incident log)
4. **Monitor closely after rollback** (first 30 minutes critical)
5. **Prefer partial rollback** (feature flags) over full rollback when possible
6. **Never rush** - take time to verify what you're rolling back to
7. **Communicate clearly** - keep team informed
8. **Learn from incidents** - update procedures based on experience
9. **Maintain calm** - rollbacks are normal, not failures
10. **Fix forward when possible** - rollback is for emergencies

---

## Additional Resources

**Internal Documentation:**
- [Deployment Guide](./deployment-guide.md)
- [Backup Strategy](./backup-strategy.md)
- [Monitoring Setup](./monitoring-setup.md)
- [Security Checklist](./security-checklist.md)

**External Resources:**
- Vercel Deployments: https://vercel.com/docs/deployments/overview
- Supabase Backups: https://supabase.com/docs/guides/platform/backups
- Git Revert: https://git-scm.com/docs/git-revert

---

**Document Version:** 1.0.0
**Last Updated:** October 2025
**Next Review:** January 2026
**Incident Response Owner:** DevOps Team
