# Backup Strategy

**DUO Soluciones Empresariales - Data Protection & Recovery**

**Version:** 1.0.0
**Last Updated:** October 2025

---

## Table of Contents

1. [Overview](#overview)
2. [Database Backup](#database-backup)
3. [Code & Configuration Backup](#code--configuration-backup)
4. [Media Storage Backup](#media-storage-backup)
5. [Environment Variables Backup](#environment-variables-backup)
6. [Recovery Procedures](#recovery-procedures)
7. [Disaster Recovery Plan](#disaster-recovery-plan)
8. [Testing & Validation](#testing--validation)

---

## Overview

A comprehensive backup strategy ensures business continuity and data protection against:
- Accidental data deletion
- Malicious attacks
- Hardware failures
- Human errors
- Natural disasters

### Backup Types

**Full Backup:** Complete copy of all data (weekly)
**Incremental Backup:** Only changes since last backup (daily)
**Point-in-Time Recovery:** Restore to specific moment (enabled)

### Retention Policy

- **Daily backups:** Retained for 7 days
- **Weekly backups:** Retained for 4 weeks
- **Monthly backups:** Retained for 12 months
- **Yearly backups:** Retained indefinitely (compliance)

### Recovery Time Objectives (RTO)

- **Critical systems:** 1 hour
- **Database:** 2 hours
- **Media files:** 4 hours
- **Full system:** 8 hours

### Recovery Point Objectives (RPO)

- **Database:** 15 minutes (point-in-time recovery)
- **Code:** No data loss (Git versioning)
- **Media:** 24 hours
- **Configuration:** No data loss (documented)

---

## Database Backup

### Supabase Automatic Backups

Supabase provides automatic daily backups for all paid plans.

#### Backup Configuration

**Enable Automatic Backups:**
1. Log in to Supabase Dashboard
2. Select your project: `duo-soluciones-production`
3. Navigate to: Database > Backups
4. Verify backup schedule is active

**Backup Details:**
- **Frequency:** Daily at 2:00 AM UTC
- **Retention:** 7 days (Pro plan), 30 days (Team plan)
- **Type:** Full database backup
- **Format:** PostgreSQL dump (.sql)
- **Encryption:** Encrypted at rest

#### Manual Backup Creation

**When to Create Manual Backups:**
- Before major deployments
- Before database migrations
- Before structural changes
- Before bulk data operations

**Create Manual Backup:**

1. **Via Supabase Dashboard:**
   ```
   1. Go to Database > Backups
   2. Click "Create backup"
   3. Add description: "Pre-deployment backup - [date]"
   4. Wait for backup to complete (1-5 minutes)
   ```

2. **Via CLI (pg_dump):**
   ```bash
   # Install PostgreSQL client tools
   # On macOS: brew install postgresql
   # On Ubuntu: apt-get install postgresql-client

   # Create backup
   pg_dump postgresql://postgres:[password]@[host]:5432/postgres > backup-$(date +%Y%m%d-%H%M%S).sql

   # With compression
   pg_dump postgresql://postgres:[password]@[host]:5432/postgres | gzip > backup-$(date +%Y%m%d-%H%M%S).sql.gz
   ```

3. **Via Supabase CLI:**
   ```bash
   # Install Supabase CLI
   npm install -g supabase

   # Login
   supabase login

   # Create backup
   supabase db dump -f backup-$(date +%Y%m%d).sql
   ```

#### Backup Verification

**Verify Backup Integrity:**

```bash
# Test restore to local database
createdb test_restore
psql test_restore < backup.sql

# Verify tables exist
psql test_restore -c "\dt"

# Verify row counts
psql test_restore -c "SELECT COUNT(*) FROM newsletter_subscribers;"

# Cleanup
dropdb test_restore
```

#### Point-in-Time Recovery (PITR)

Supabase Pro plan includes Point-in-Time Recovery.

**Enable PITR:**
1. Upgrade to Pro plan if needed
2. Go to Database > Backups > Settings
3. Enable "Point-in-Time Recovery"
4. Set retention period (up to 7 days)

**Restore to Specific Point:**
1. Go to Database > Backups
2. Select "Point-in-Time Recovery"
3. Choose date and time
4. Click "Restore"
5. Confirm restoration (WARNING: Cannot undo)

### Database Migration Backup

**Before Each Migration:**

```bash
# Create pre-migration backup
npm run db:generate

# Create manual backup in Supabase
# Document migration in changelog

# Run migration
npm run db:migrate

# Verify migration success
# Test application functionality
```

**Migration Backup Script:**

Create `scripts/backup-before-migration.sh`:

```bash
#!/bin/bash

# backup-before-migration.sh
# Creates backup before running database migrations

TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="backups/pre-migration-$TIMESTAMP.sql"

echo "Creating pre-migration backup..."

# Create backups directory if it doesn't exist
mkdir -p backups

# Create backup
pg_dump $DATABASE_URL > $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo "✓ Backup created: $BACKUP_FILE"
    echo "✓ Backup size: $(du -h $BACKUP_FILE | cut -f1)"

    # Compress backup
    gzip $BACKUP_FILE
    echo "✓ Backup compressed: $BACKUP_FILE.gz"

    echo ""
    echo "Safe to proceed with migration"
else
    echo "✗ Backup failed!"
    echo "✗ DO NOT proceed with migration"
    exit 1
fi
```

### Backup Storage Locations

**Primary Storage:** Supabase (automatic backups)
**Secondary Storage:** Local/S3 (manual backups)
**Tertiary Storage:** External service (monthly archives)

**Recommended External Storage:**
- AWS S3 (with versioning enabled)
- Google Cloud Storage
- Azure Blob Storage
- Backblaze B2 (cost-effective)

---

## Code & Configuration Backup

### Git Repository

**Primary Backup:** GitHub repository

**Best Practices:**
1. Commit all code changes regularly
2. Use meaningful commit messages
3. Tag releases for easy rollback
4. Never commit sensitive data
5. Enable branch protection on main

**Backup Verification:**

```bash
# Verify remote repository
git remote -v

# Check latest commits
git log --oneline -10

# Verify all branches pushed
git branch -r

# Create release tag
git tag -a v1.0.0 -m "Production release v1.0.0"
git push origin v1.0.0
```

### Configuration Files

**Critical Files to Backup:**
- `package.json` (dependencies)
- `package-lock.json` (dependency versions)
- `next.config.ts` (Next.js configuration)
- `tailwind.config.ts` (styling configuration)
- `tsconfig.json` (TypeScript configuration)
- `drizzle.config.ts` (database configuration)
- `.env.example` (environment variable template)
- `.env.production.example` (production template)

**Backup Method:** Stored in Git repository

### Environment Variables

**DO NOT store in Git:** Actual values (secrets)
**DO store in Git:** Templates with placeholders

**Backup Actual Values:**

1. **Export from Vercel:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login
   vercel login

   # Pull environment variables
   vercel env pull .env.production.local

   # Store securely (NOT in Git)
   ```

2. **Manual Documentation:**
   Create secure document with:
   - Variable name
   - Value
   - Where to get it
   - Last updated date

3. **Password Manager:**
   - Store in 1Password, LastPass, or similar
   - Share via team vault
   - Include retrieval instructions

### Deployment Configuration

**Vercel Settings Backup:**
- Build command
- Output directory
- Environment variables
- Custom domains
- Serverless function configuration

**Document in:** `docs/vercel-configuration.md`

**Railway Settings Backup (if applicable):**
- Build command
- Start command
- Health check path
- Environment variables

**Document in:** `docs/railway-configuration.md`

---

## Media Storage Backup

### Cloudinary Backup

Cloudinary stores all uploaded media. Additional backup recommended for critical assets.

#### Enable Cloudinary Backup

**Option 1: Cloudinary Auto-Backup (Paid feature)**
1. Upgrade to Advanced plan or higher
2. Enable automatic backup to S3
3. Configure backup schedule

**Option 2: Manual Backup Script**

Create `scripts/backup-cloudinary.js`:

```javascript
// backup-cloudinary.js
// Backs up all Cloudinary assets to local storage

import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import https from 'https';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function backupAllAssets() {
  const backupDir = `backups/cloudinary-${new Date().toISOString().split('T')[0]}`;
  fs.mkdirSync(backupDir, { recursive: true });

  let nextCursor = null;
  let totalAssets = 0;

  do {
    const result = await cloudinary.v2.api.resources({
      type: 'upload',
      max_results: 500,
      next_cursor: nextCursor,
    });

    for (const asset of result.resources) {
      const filename = path.join(backupDir, `${asset.public_id}.${asset.format}`);
      await downloadFile(asset.secure_url, filename);
      totalAssets++;
      console.log(`Downloaded: ${asset.public_id}`);
    }

    nextCursor = result.next_cursor;
  } while (nextCursor);

  console.log(`✓ Backup complete: ${totalAssets} assets backed up to ${backupDir}`);
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', err => {
      fs.unlink(dest);
      reject(err);
    });
  });
}

backupAllAssets().catch(console.error);
```

**Run Backup:**
```bash
node scripts/backup-cloudinary.js
```

#### Media Backup Schedule

**Frequency:**
- Manual backup: Before major content updates
- Automated backup: Weekly (if using paid feature)
- Archive: Monthly to long-term storage

**Retention:**
- Weekly backups: 4 weeks
- Monthly backups: 12 months
- Critical assets: Indefinitely

---

## Environment Variables Backup

### Secure Storage Methods

**Method 1: Password Manager (Recommended)**
1. Create secure note in 1Password/LastPass
2. Title: "DUO Soluciones - Production Environment Variables"
3. Store all variable names and values
4. Share with authorized team members only
5. Update when variables change

**Method 2: Encrypted File**
1. Create file: `production-env-vars.txt`
2. Add all environment variables
3. Encrypt: `gpg -c production-env-vars.txt`
4. Store encrypted file in secure location
5. Share decryption password separately

**Method 3: Vercel CLI Export**
```bash
# Export all environment variables
vercel env pull .env.production.backup

# Encrypt the file
gpg -c .env.production.backup

# Store .env.production.backup.gpg securely
# Delete unencrypted file
rm .env.production.backup
```

### Environment Variables Documentation

**Maintain documentation with:**
- Variable name
- Purpose
- Where to obtain value
- When last updated
- Who has access

**Location:** `docs/environment-variables.md` (already created)

---

## Recovery Procedures

### Database Recovery

#### Scenario 1: Accidental Data Deletion

**Recovery Steps:**

1. **Identify deletion time:**
   ```sql
   -- Check audit logs if available
   SELECT * FROM audit_log WHERE action = 'DELETE' ORDER BY created_at DESC;
   ```

2. **Restore from point-in-time backup:**
   - Go to Supabase Dashboard > Database > Backups
   - Select "Point-in-Time Recovery"
   - Choose time before deletion
   - Restore to new project or staging first (test)

3. **Verify restored data:**
   ```sql
   -- Check row count
   SELECT COUNT(*) FROM affected_table;

   -- Verify specific records
   SELECT * FROM affected_table WHERE id IN (...);
   ```

4. **Apply to production:**
   - If restored to staging: Export and import data
   - If restored directly: Verify application functionality

#### Scenario 2: Database Corruption

**Recovery Steps:**

1. **Create backup of current state** (even if corrupted)
2. **Restore from latest good backup**
3. **Apply any necessary migrations**
4. **Verify data integrity**
5. **Update application connection**

#### Scenario 3: Failed Migration

**Recovery Steps:**

```bash
# 1. Check migration status
npm run db:studio

# 2. Restore from pre-migration backup
psql $DATABASE_URL < backups/pre-migration-20251022-120000.sql

# 3. Verify database state
psql $DATABASE_URL -c "\dt"

# 4. Fix migration script
# 5. Test in development
# 6. Re-run migration with monitoring
```

### Code Recovery

#### Scenario 1: Bad Deployment

**Recovery Steps:**

1. **Rollback via Vercel:**
   - Go to Vercel Dashboard > Deployments
   - Find last working deployment
   - Click "..." > "Promote to Production"

2. **Verify rollback:**
   ```bash
   curl https://duosoluciones.com/api/health
   ```

3. **Fix issue in development:**
   ```bash
   git revert HEAD
   # Or fix the bug
   git commit -m "Fix: [issue description]"
   git push
   ```

#### Scenario 2: Lost Local Changes

**Recovery Steps:**

```bash
# Check Git reflog
git reflog

# Recover lost commit
git checkout <commit-hash>

# Create branch from recovered commit
git checkout -b recovery-branch

# Merge back to main
git checkout main
git merge recovery-branch
```

### Media Recovery

#### Scenario 1: Deleted Media Files

**Recovery Steps:**

1. **Check Cloudinary trash** (available for 30 days)
   - Go to Cloudinary Dashboard > Media Library
   - Click "Trash"
   - Restore deleted assets

2. **Restore from backup:**
   ```bash
   # Find backup
   ls backups/cloudinary-*

   # Re-upload to Cloudinary
   node scripts/restore-cloudinary.js
   ```

### Configuration Recovery

#### Scenario 1: Lost Environment Variables

**Recovery Steps:**

1. **Retrieve from password manager**
2. **Or decrypt backup:**
   ```bash
   gpg -d .env.production.backup.gpg > .env.production.local
   ```
3. **Add to Vercel:**
   ```bash
   vercel env add
   # Enter each variable
   ```
4. **Redeploy application**

---

## Disaster Recovery Plan

### Complete System Failure

**Scenario:** All Vercel infrastructure lost (extremely rare)

**Recovery Steps:**

1. **Deploy to alternative platform (Railway):**
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli

   # Login
   railway login

   # Create new project
   railway init

   # Add environment variables
   railway variables set DATABASE_URL=...

   # Deploy
   railway up
   ```

2. **Update DNS:**
   - Point domain to new deployment
   - Update A/CNAME records

3. **Restore database** (if also lost):
   - Create new Supabase project
   - Restore from latest backup
   - Update DATABASE_URL

4. **Restore media:**
   - Re-upload to Cloudinary from backup

5. **Verify functionality:**
   - Test all critical features
   - Monitor for issues

### Database Catastrophic Failure

**Scenario:** Supabase database completely lost

**Recovery Steps:**

1. **Create new Supabase project**
2. **Restore from latest backup:**
   ```bash
   psql new-database-url < backups/latest-backup.sql
   ```
3. **Update DATABASE_URL in Vercel**
4. **Redeploy application**
5. **Verify data integrity**

### Recovery Time Estimate

**Best Case Scenario:**
- New deployment: 15 minutes
- Database restoration: 30 minutes
- DNS propagation: 5 minutes
- Testing: 10 minutes
- **Total: ~1 hour**

**Worst Case Scenario:**
- New infrastructure setup: 2 hours
- Database restoration: 1 hour
- DNS propagation: 48 hours (with old DNS cache)
- Media restoration: 2 hours
- Full testing: 2 hours
- **Total: ~7 hours (plus DNS propagation)**

---

## Testing & Validation

### Monthly Backup Test

**Procedure:**

1. **Test database backup restoration:**
   ```bash
   # Create test database
   createdb test_restore_$(date +%Y%m)

   # Restore latest backup
   psql test_restore_$(date +%Y%m) < latest-backup.sql

   # Verify tables and data
   psql test_restore_$(date +%Y%m) -c "\dt"
   psql test_restore_$(date +%Y%m) -c "SELECT COUNT(*) FROM newsletter_subscribers;"

   # Cleanup
   dropdb test_restore_$(date +%Y%m)
   ```

2. **Verify Git repository:**
   ```bash
   # Clone to temporary location
   git clone https://github.com/your-org/project.git /tmp/backup-test

   # Verify build
   cd /tmp/backup-test
   npm install
   npm run build

   # Cleanup
   rm -rf /tmp/backup-test
   ```

3. **Test environment variable recovery:**
   - Retrieve from password manager
   - Verify all critical variables present
   - Test decryption if using encrypted backup

4. **Document test results:**
   - Date tested
   - Components tested
   - Issues found
   - Actions taken

### Quarterly Disaster Recovery Drill

**Full Simulation:**

1. **Scenario planning:** Choose disaster scenario
2. **Team briefing:** Notify team of drill
3. **Execute recovery:** Follow disaster recovery procedures
4. **Time tracking:** Measure actual recovery time
5. **Post-drill review:** Identify improvements
6. **Update procedures:** Based on lessons learned

**Document in:** `docs/dr-drill-YYYY-MM.md`

---

## Backup Checklist

### Daily (Automated)
- [ ] Supabase automatic backup runs
- [ ] Verify backup completion
- [ ] Check backup storage availability

### Weekly (Manual)
- [ ] Review backup logs
- [ ] Verify backup sizes (check for anomalies)
- [ ] Test one random backup restore
- [ ] Update backup documentation if needed

### Monthly
- [ ] Full backup restoration test
- [ ] Archive monthly backup to long-term storage
- [ ] Review and update backup procedures
- [ ] Verify all backup locations accessible
- [ ] Check backup storage usage and costs

### Quarterly
- [ ] Disaster recovery drill
- [ ] Review and update recovery procedures
- [ ] Test alternative deployment platform
- [ ] Audit team access to backups
- [ ] Review retention policy and adjust if needed

### Annually
- [ ] Complete system recovery test
- [ ] Review and update backup strategy
- [ ] Evaluate new backup tools/services
- [ ] Compliance audit (if applicable)
- [ ] Create yearly archive

---

## Best Practices

1. **3-2-1 Rule:** 3 copies, 2 different media, 1 off-site
2. **Automate:** Reduce human error
3. **Test regularly:** Backups are useless if they don't restore
4. **Document:** Procedures should be executable by anyone
5. **Encrypt:** Sensitive data should be encrypted
6. **Monitor:** Set up alerts for backup failures
7. **Version control:** Code in Git, always
8. **Separate environments:** Never restore production to development
9. **Access control:** Limit who can delete/modify backups
10. **Update procedures:** As system changes, update backup strategy

---

## Additional Resources

**Internal Documentation:**
- [Deployment Guide](./deployment-guide.md)
- [Rollback Procedures](./rollback-procedures.md)
- [Security Checklist](./security-checklist.md)

**External Resources:**
- Supabase Backups: https://supabase.com/docs/guides/platform/backups
- PostgreSQL Backup: https://www.postgresql.org/docs/current/backup.html
- Cloudinary Backup: https://cloudinary.com/documentation/backups_and_version_control

---

**Document Version:** 1.0.0
**Last Updated:** October 2025
**Next Review:** January 2026
**Backup Strategy Owner:** DevOps Team
