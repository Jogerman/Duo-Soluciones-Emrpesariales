# Database Migration Plan - Production Deployment

**DUO Soluciones Empresariales**

**Version:** 1.0.0
**Last Updated:** October 2025
**Sprint:** Sprint 5 - Wave 2

---

## Table of Contents

1. [Overview](#overview)
2. [Sprint 4 Database Changes](#sprint-4-database-changes)
3. [Migration Strategy](#migration-strategy)
4. [Pre-Migration Checklist](#pre-migration-checklist)
5. [Backup Procedures](#backup-procedures)
6. [Migration Execution](#migration-execution)
7. [Verification Steps](#verification-steps)
8. [Rollback Procedures](#rollback-procedures)
9. [Post-Migration Tasks](#post-migration-tasks)
10. [Troubleshooting](#troubleshooting)

---

## Overview

This document outlines the database migration plan for deploying Sprint 4 and Sprint 5 changes to production. The migrations include schema changes, new tables, and data integrity updates.

### Database Technology Stack

- **Database:** PostgreSQL 15+
- **Provider:** Supabase (managed PostgreSQL)
- **ORM:** Drizzle ORM v0.44.6
- **Migration Tool:** Drizzle Kit v0.31.5
- **Connection:** Connection pooling (port 5432)

### Migration Timeline

- **Estimated Duration:** 5-10 minutes
- **Downtime Required:** None (schema changes are additive)
- **Best Time:** Low-traffic period (recommended: Sunday 2-4 AM local time)

---

## Sprint 4 Database Changes

### New Tables

#### 1. Newsletter Subscribers Table

**Table Name:** `newsletter_subscribers`

**Schema:**
```sql
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),

  -- Subscription status
  is_active BOOLEAN DEFAULT false NOT NULL,
  confirmed_at TIMESTAMP,

  -- GDPR Compliance
  consent_given BOOLEAN DEFAULT false NOT NULL,
  consent_given_at TIMESTAMP,

  -- Double opt-in tokens
  verification_token TEXT,
  verification_token_expiry TIMESTAMP,
  unsubscribe_token TEXT NOT NULL,

  -- Source tracking
  source VARCHAR(100),

  -- Unsubscribe tracking
  unsubscribed_at TIMESTAMP,
  unsubscribe_reason TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

**Indexes:**
- Primary key on `id`
- Unique index on `email`
- Index on `unsubscribe_token` (for fast lookups)
- Index on `is_active` (for filtering active subscribers)
- Index on `created_at` (for chronological queries)

**Purpose:**
- Store newsletter email subscribers
- Support double opt-in verification flow
- GDPR compliance with explicit consent tracking
- Unsubscribe functionality with unique tokens
- Source attribution for marketing analysis

### Modified Tables

No existing tables were modified in Sprint 4. All changes are additive (new table only).

### Data Migration

No existing data needs to be migrated. The `newsletter_subscribers` table starts empty.

---

## Migration Strategy

### Approach: Online Schema Migration

**Type:** Additive-only changes
**Downtime:** Zero downtime required
**Risk Level:** Low (no data modification or schema alterations)

### Migration Philosophy

1. **Additive Changes Only:** Only new tables and columns (safe)
2. **No Breaking Changes:** No deletions or renames
3. **Backward Compatible:** Application works before and after migration
4. **Idempotent:** Safe to run multiple times
5. **Reversible:** Can rollback without data loss

### Migration Modes

**Development:**
```bash
npm run db:push
# Quick push for development (not recommended for production)
```

**Production:**
```bash
npm run db:generate  # Generate migration files
npm run db:migrate   # Run migrations
```

---

## Pre-Migration Checklist

### 1. Environment Verification

- [ ] Production database credentials verified
- [ ] Database connection string tested
- [ ] Connection pooling enabled (port 5432)
- [ ] Database accessible from deployment environment
- [ ] Sufficient database permissions (CREATE TABLE, CREATE INDEX)

### 2. Backup Verification

- [ ] Full database backup created
- [ ] Backup tested and verified
- [ ] Backup retention policy confirmed
- [ ] Point-in-time recovery (PITR) available
- [ ] Backup location documented

### 3. Application State

- [ ] Current production version noted
- [ ] No ongoing deployments
- [ ] Traffic at acceptable level
- [ ] Monitoring systems active
- [ ] Team members on standby

### 4. Migration Files

- [ ] Migration files generated (`npm run db:generate`)
- [ ] Migration files reviewed
- [ ] SQL syntax validated
- [ ] No destructive operations present
- [ ] Migration order verified

### 5. Communication

- [ ] Team notified of migration window
- [ ] Stakeholders informed
- [ ] Support team on alert
- [ ] Rollback plan communicated
- [ ] Emergency contacts available

---

## Backup Procedures

### Automatic Backups (Supabase)

Supabase provides automatic backups:

1. **Daily Backups:** Retained for 7 days (Free tier) or 30 days (Pro tier)
2. **Point-in-Time Recovery (PITR):** Available on Pro tier and above
3. **Access:** Supabase Dashboard > Database > Backups

### Manual Pre-Migration Backup

#### Option 1: Via Supabase Dashboard

1. Log in to Supabase dashboard
2. Navigate to **Project** > **Database** > **Backups**
3. Click **"Create Backup"**
4. Name: `pre-sprint5-deployment-YYYY-MM-DD`
5. Wait for completion (~2-5 minutes depending on database size)
6. Verify backup created successfully

#### Option 2: Via pg_dump (Advanced)

```bash
# Export full database
pg_dump "$DATABASE_URL" > backup-$(date +%Y%m%d-%H%M%S).sql

# Export schema only
pg_dump --schema-only "$DATABASE_URL" > schema-backup-$(date +%Y%m%d-%H%M%S).sql

# Export data only
pg_dump --data-only "$DATABASE_URL" > data-backup-$(date +%Y%m%d-%H%M%S).sql

# Compressed backup
pg_dump "$DATABASE_URL" | gzip > backup-$(date +%Y%m%d-%H%M%S).sql.gz
```

#### Option 3: Via Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref your-project-ref

# Create backup
supabase db dump -f backup-$(date +%Y%m%d-%H%M%S).sql
```

### Backup Verification

```bash
# Verify backup file size
ls -lh backup-*.sql

# Check backup contents (first 20 lines)
head -n 20 backup-*.sql

# Verify tables included
grep "CREATE TABLE" backup-*.sql
```

### Backup Storage

Store backups in multiple locations:

1. **Local:** Developer machine
2. **Cloud Storage:** AWS S3, Google Cloud Storage, or Dropbox
3. **Supabase:** Automatic backups in Supabase dashboard
4. **Version Control:** Schema snapshots in Git (no data)

---

## Migration Execution

### Step 1: Generate Migration Files

```bash
# Ensure you're on the correct branch
git checkout main
git pull origin main

# Generate migration files from schema
npm run db:generate

# Review generated migration files
ls -la drizzle/
```

**Expected Output:**
```
drizzle/
├── 0000_initial_schema.sql
├── 0001_add_newsletter_subscribers.sql
└── meta/
    ├── _journal.json
    └── 0001_snapshot.json
```

### Step 2: Review Migration SQL

```bash
# Review the migration SQL
cat drizzle/0001_add_newsletter_subscribers.sql
```

**Verify:**
- [ ] Only CREATE TABLE statements (no DROP, ALTER dangerous operations)
- [ ] Correct column types
- [ ] Proper constraints (NOT NULL, UNIQUE, DEFAULT)
- [ ] Indexes defined
- [ ] No syntax errors

### Step 3: Test Migration Locally

```bash
# Test against local development database
npm run db:migrate

# Verify tables created
npm run db:studio

# Or via psql
psql "$DATABASE_URL" -c "\dt"
psql "$DATABASE_URL" -c "\d newsletter_subscribers"
```

### Step 4: Execute Production Migration

**Important:** Ensure DATABASE_URL points to production database.

#### Option A: Via Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Pull production environment variables
vercel env pull .env.production.local

# Run migration with production DATABASE_URL
npm run db:migrate
```

#### Option B: Via GitHub Actions

Create `.github/workflows/migrate-database.yml`:

```yaml
name: Database Migration

on:
  workflow_dispatch:
    inputs:
      confirm:
        description: 'Type "MIGRATE" to confirm'
        required: true

jobs:
  migrate:
    runs-on: ubuntu-latest
    if: github.event.inputs.confirm == 'MIGRATE'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run database migrations
        run: npm run db:migrate
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}

      - name: Verify migration
        run: |
          node -e "
          const { db } = require('./src/lib/db');
          db.execute('SELECT COUNT(*) FROM newsletter_subscribers')
            .then(() => console.log('✓ Migration successful'))
            .catch(err => { console.error('✗ Migration failed:', err); process.exit(1); });
          "
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

Run via GitHub:
1. Go to **Actions** tab
2. Select **Database Migration** workflow
3. Click **Run workflow**
4. Type `MIGRATE` to confirm
5. Monitor execution

#### Option C: Direct SQL Execution

If migration tools fail, manually execute SQL:

```bash
# Connect to database
psql "$DATABASE_URL"

# Run migration SQL
\i drizzle/0001_add_newsletter_subscribers.sql

# Verify
\dt newsletter_subscribers
\d newsletter_subscribers
```

---

## Verification Steps

### 1. Table Existence Check

```sql
-- Check if table exists
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name = 'newsletter_subscribers';

-- Expected: 1 row returned
```

### 2. Schema Verification

```sql
-- Check table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'newsletter_subscribers'
ORDER BY ordinal_position;

-- Expected: 14 columns (id, email, name, is_active, etc.)
```

### 3. Constraints Check

```sql
-- Check constraints
SELECT constraint_name, constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'newsletter_subscribers';

-- Expected: PRIMARY KEY, UNIQUE (email)
```

### 4. Indexes Check

```sql
-- Check indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'newsletter_subscribers';

-- Expected: Primary key index, unique email index
```

### 5. Application-Level Test

```bash
# Test via API endpoint
curl -X POST https://your-domain.com/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "source": "homepage"
  }'

# Expected: 200 OK response with subscriber data
```

### 6. Database Studio Verification

```bash
# Open Drizzle Studio
npm run db:studio

# Navigate to: http://localhost:4983
# Verify: newsletter_subscribers table appears
# Check: Schema matches expected structure
```

### 7. Row Count Verification

```sql
-- Check initial state (should be 0 or small number)
SELECT COUNT(*) FROM newsletter_subscribers;

-- Check table is empty or has test data only
SELECT * FROM newsletter_subscribers LIMIT 10;
```

---

## Rollback Procedures

### When to Rollback

Consider rollback if:
- Migration fails with errors
- Data corruption detected
- Application errors after migration
- Performance degradation
- Unexpected schema changes

### Rollback Options

#### Option 1: Drop New Table (Safest)

Since the table is new and empty:

```sql
-- Simple rollback: drop the table
DROP TABLE IF EXISTS newsletter_subscribers;

-- Verify
SELECT table_name
FROM information_schema.tables
WHERE table_name = 'newsletter_subscribers';
-- Expected: 0 rows
```

**Pros:**
- Fast (< 1 second)
- No data loss (table was empty)
- No dependencies to worry about

**Cons:**
- Must recreate if needed later

#### Option 2: Restore from Backup

If data was added and needs to be preserved:

**Via Supabase Dashboard:**
1. Navigate to **Database** > **Backups**
2. Find pre-migration backup
3. Click **"Restore"**
4. Confirm restoration
5. Wait for completion (~5-10 minutes)

**Via pg_restore:**
```bash
# Restore from backup file
psql "$DATABASE_URL" < backup-YYYYMMDD-HHMMSS.sql

# Or from compressed backup
gunzip -c backup-YYYYMMDD-HHMMSS.sql.gz | psql "$DATABASE_URL"
```

#### Option 3: Drizzle Rollback (If Supported)

```bash
# Check migration status
npm run db:migrate:status

# Rollback last migration
npm run db:migrate:down

# Verify rollback
npm run db:studio
```

### Post-Rollback Verification

After rollback:

1. **Application Test:**
```bash
# Verify application still works
curl https://your-domain.com/api/health
```

2. **Database State:**
```sql
-- Verify table is removed
\dt

-- Check other tables intact
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM posts;
```

3. **Error Logs:**
```bash
# Check for new errors
vercel logs --follow
```

---

## Post-Migration Tasks

### 1. Verification Report

Document migration results:

```markdown
## Migration Report

- **Date:** 2025-10-22
- **Duration:** X minutes
- **Tables Added:** newsletter_subscribers
- **Rows Affected:** 0 (new table)
- **Status:** ✓ Success / ✗ Failed
- **Issues:** None / [List any issues]
- **Rollback Required:** No / Yes
```

### 2. Update Documentation

- [ ] Update database schema documentation
- [ ] Update API documentation
- [ ] Update developer onboarding docs
- [ ] Update ERD diagrams (if applicable)

### 3. Team Notification

Notify team of successful migration:

```
Subject: ✓ Production Database Migration Complete

The database migration for Sprint 5 deployment has completed successfully.

Changes:
- Added newsletter_subscribers table
- All verification tests passed
- Zero downtime achieved
- Application functioning normally

Next Steps:
- Deploy application updates
- Test newsletter subscription flow
- Monitor for 24 hours

Rollback: Available if needed (backup created: backup-20251022-020000.sql)
```

### 4. Monitoring

Monitor for 24-48 hours:

- Database performance metrics
- Query execution times
- Connection pool usage
- Error rates
- Application logs

### 5. Cleanup

After 7 days of stable operation:

- [ ] Remove local backup files (keep cloud backups)
- [ ] Archive migration logs
- [ ] Update runbook if needed
- [ ] Schedule next review

---

## Troubleshooting

### Migration Fails: "Permission Denied"

**Error:**
```
ERROR: permission denied for schema public
```

**Solution:**
```sql
-- Grant necessary permissions
GRANT CREATE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO postgres;
```

### Migration Fails: "Table Already Exists"

**Error:**
```
ERROR: relation "newsletter_subscribers" already exists
```

**Solution:**
```sql
-- Check if table exists
\dt newsletter_subscribers

-- If it's a partial migration, drop and retry
DROP TABLE newsletter_subscribers;

-- Re-run migration
npm run db:migrate
```

### Migration Hangs

**Symptom:** Migration process stuck, no progress

**Solution:**
```sql
-- Check for locks
SELECT * FROM pg_locks WHERE NOT granted;

-- Check active queries
SELECT pid, query, state, wait_event_type
FROM pg_stat_activity
WHERE state != 'idle';

-- Cancel if needed (replace <pid>)
SELECT pg_cancel_backend(<pid>);

-- Or terminate
SELECT pg_terminate_backend(<pid>);
```

### Connection Pool Exhausted

**Error:**
```
ERROR: remaining connection slots are reserved for non-replication superuser connections
```

**Solution:**
1. Use connection pooling URL (port 5432)
2. Increase connection pool size in Supabase
3. Close idle connections
4. Retry migration

### Data Validation Errors

**Error:**
```
ERROR: duplicate key value violates unique constraint
```

**Solution:**
```sql
-- Check for duplicates
SELECT email, COUNT(*)
FROM newsletter_subscribers
GROUP BY email
HAVING COUNT(*) > 1;

-- Remove duplicates (keep newest)
DELETE FROM newsletter_subscribers a
USING newsletter_subscribers b
WHERE a.id < b.id AND a.email = b.email;
```

---

## Migration Checklist

### Pre-Migration
- [ ] Full database backup created and verified
- [ ] Migration files generated and reviewed
- [ ] Team notified of migration window
- [ ] Monitoring systems active
- [ ] Rollback plan documented
- [ ] Emergency contacts available

### During Migration
- [ ] Database connection verified
- [ ] Migration executed successfully
- [ ] No errors in migration logs
- [ ] Tables created as expected
- [ ] Indexes created successfully

### Post-Migration
- [ ] Table structure verified
- [ ] Constraints checked
- [ ] Application tests passing
- [ ] API endpoints functioning
- [ ] No new errors in logs
- [ ] Performance metrics normal
- [ ] Team notified of success
- [ ] Documentation updated

---

## Emergency Contacts

**Database Issues:**
- Database Admin: dba@duosoluciones.com
- Supabase Support: https://supabase.com/support

**Application Issues:**
- DevOps Team: devops@duosoluciones.com
- Technical Lead: tech@duosoluciones.com

**Critical Escalation:**
- On-Call Engineer: [Phone number]
- Management: [Phone number]

---

## Additional Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Supabase Database Guide](https://supabase.com/docs/guides/database)
- [PostgreSQL Migration Best Practices](https://www.postgresql.org/docs/current/ddl.html)
- [Backup Strategy Documentation](./backup-strategy.md)
- [Rollback Procedures](./rollback-procedures.md)

---

**Document Version:** 1.0.0
**Last Updated:** October 2025
**Next Review:** After successful production migration
