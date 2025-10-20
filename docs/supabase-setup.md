# Supabase Database Setup Guide

Complete guide to set up and configure the Supabase PostgreSQL database for DUO Soluciones Empresariales.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Creating a Supabase Project](#creating-a-supabase-project)
- [Configuring the Database Connection](#configuring-the-database-connection)
- [Running Database Migrations](#running-database-migrations)
- [Seeding Initial Data](#seeding-initial-data)
- [Verifying the Setup](#verifying-the-setup)
- [Database Management](#database-management)
- [Troubleshooting](#troubleshooting)
- [Production Considerations](#production-considerations)

---

## Prerequisites

Before starting, ensure you have:

- [x] Node.js 18+ installed
- [x] npm or yarn package manager
- [x] Git (to clone the repository)
- [x] A web browser
- [x] This project cloned locally

---

## Creating a Supabase Project

### Step 1: Sign up for Supabase

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign in"**
3. Sign up using:
   - GitHub account (recommended)
   - Google account
   - Email/password

### Step 2: Create a New Project

1. After logging in, click **"New Project"**
2. Fill in the project details:
   - **Name**: `duo-soluciones-dev` (or your preferred name)
   - **Database Password**: Choose a strong password (save this securely!)
   - **Region**: Select the closest region to your users
     - For Dominican Republic: `South America (São Paulo)` or `US East (N. Virginia)`
   - **Pricing Plan**: Free tier is sufficient for development

3. Click **"Create new project"**
4. Wait 2-3 minutes for the project to provision

### Step 3: Access Your Project Dashboard

Once provisioned, you'll see:

- Project URL
- API keys (anon public, service role)
- Database connection strings

---

## Configuring the Database Connection

### Step 1: Get Your Connection String

1. In your Supabase project dashboard, go to:
   - **Settings** (gear icon in sidebar)
   - **Database**
   - Scroll to **"Connection string"** section

2. You'll see two types of connection strings:
   - **Session mode** (port 5432) - Direct connection
   - **Transaction mode** (port 6543) - Connection pooling (recommended)

3. Choose **Transaction mode (Connection pooling)** for better performance

4. Your connection string will look like:
   ```
   postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

### Step 2: Update Environment Variables

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and update the `DATABASE_URL`:

   ```bash
   DATABASE_URL=postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

3. Replace `[YOUR-PASSWORD]` with the password you set during project creation

4. Verify the connection string format:
   - Should start with `postgresql://`
   - Contains your project reference (e.g., `postgres.xxxxxxxxxxxxx`)
   - Has your password
   - Ends with `/postgres`

### Step 3: Test the Connection

Run this command to verify your connection:

```bash
npm run db:push
```

If successful, you should see:

```
✅ Pushing schema to database
✅ Tables created successfully
```

If there's an error:

- Double-check your password (no typos!)
- Ensure the connection string is correctly formatted
- Verify your IP isn't blocked (Supabase allows all IPs by default)

---

## Running Database Migrations

Our project uses Drizzle ORM for database schema management.

### Available Database Scripts

```bash
# Generate migration files from schema changes
npm run db:generate

# Push schema directly to database (no migration files)
npm run db:push

# Open Drizzle Studio (database GUI)
npm run db:studio

# Seed initial data
npm run db:seed
```

### Option 1: Push Schema Directly (Recommended for Development)

This is the fastest way to get started:

```bash
npm run db:push
```

This command:

- Reads your schema definitions from `src/lib/db/schema/`
- Creates all tables in your Supabase database
- Updates existing tables if schema changed
- No migration files generated

### Option 2: Generate and Run Migrations (Recommended for Production)

For version-controlled migrations:

```bash
# Generate migration files
npm run db:generate

# Apply migrations (if using migrate script)
npm run db:migrate
```

This creates SQL migration files in the `drizzle/` folder.

### What Tables Are Created?

After running migrations, these tables will be created:

1. **services** - Consulting services catalog (AS1-AS4)
2. **team** - Team members and consultants
3. **projects** - Case studies and portfolio projects
4. **testimonials** - Client testimonials and reviews
5. **blog** - Blog posts and articles
6. **podcast** - Podcast episodes
7. **clients** - Client companies and logos
8. **media** - Media assets (images, videos, documents)
9. **pages** - Dynamic CMS pages
10. **users** - Admin users for authentication
11. **sessions** - User sessions (NextAuth)
12. **verification_tokens** - Email verification and password reset tokens

---

## Seeding Initial Data

After creating tables, populate them with sample data:

```bash
npm run db:seed
```

This will create:

- **4 Services** (Desarrollo Organizacional, Mejora de Procesos, Implementación ERP, Gobernanza Corporativa)
- **2 Team Members** (Miguel Rodriguez Viñas, Angelina Burgos Dominguez)
- **15 Clients** (Torres 2, Rizek Peralta, Mallen, Hospital Antonio Ochoa, etc.)
- **1 Admin User** (admin@duosoluciones.com / admin123)

**IMPORTANT**: The default admin password is `admin123`. Change it immediately after first login!

---

## Verifying the Setup

### Method 1: Using Drizzle Studio

1. Start Drizzle Studio:

   ```bash
   npm run db:studio
   ```

2. Open your browser to: `http://localhost:4983`

3. You should see all 12 tables in the left sidebar

4. Click on each table to view the seeded data

### Method 2: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Click **"Table Editor"** in the sidebar
3. You should see all created tables
4. Click on any table to view its data

### Method 3: Using SQL Editor

1. In Supabase dashboard, go to **"SQL Editor"**
2. Run this query:
   ```sql
   SELECT table_name
   FROM information_schema.tables
   WHERE table_schema = 'public'
   ORDER BY table_name;
   ```
3. You should see all 12 tables listed

### Verify Data Count

Run this in SQL Editor to count records:

```sql
SELECT
  (SELECT COUNT(*) FROM services) as services_count,
  (SELECT COUNT(*) FROM team) as team_count,
  (SELECT COUNT(*) FROM clients) as clients_count,
  (SELECT COUNT(*) FROM users) as users_count;
```

Expected results:

- services_count: 4
- team_count: 2
- clients_count: 15
- users_count: 1

---

## Database Management

### Accessing Drizzle Studio

Drizzle Studio is a visual database browser:

```bash
npm run db:studio
```

Features:

- Browse all tables and data
- Edit records directly
- Run SQL queries
- View table relationships
- Export data

### Accessing Supabase Dashboard

Your Supabase dashboard provides:

1. **Table Editor** - Visual table browser and editor
2. **SQL Editor** - Write and execute SQL queries
3. **Database** Settings - Connection info, backups, extensions
4. **Logs** - Query logs and error tracking
5. **API Docs** - Auto-generated API documentation

### Common Database Tasks

#### View All Tables

```sql
\dt
-- or
SELECT * FROM pg_tables WHERE schemaname = 'public';
```

#### Count Records in All Tables

```sql
SELECT
  schemaname,
  tablename,
  n_live_tup as row_count
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;
```

#### Reset Database (Delete All Data)

```bash
# BE CAREFUL - This deletes everything!
npm run db:push -- --force
npm run db:seed
```

#### Backup Database

In Supabase Dashboard:

1. Go to **Settings** > **Database**
2. Scroll to **"Database Backups"**
3. Click **"Enable Backups"** (available on paid plans)

For free tier, use `pg_dump`:

```bash
# Install PostgreSQL tools first
pg_dump "your-connection-string-here" > backup.sql
```

---

## Troubleshooting

### Error: "DATABASE_URL is not defined"

**Solution**:

1. Check that `.env.local` exists in project root
2. Verify `DATABASE_URL` is set correctly
3. Restart your development server

### Error: "password authentication failed"

**Solution**:

1. Double-check your database password
2. Get a fresh connection string from Supabase dashboard
3. Ensure no extra spaces in `.env.local`

### Error: "Connection timeout"

**Solution**:

1. Check your internet connection
2. Verify Supabase project is running (not paused)
3. Try using Session mode (port 5432) instead of Transaction mode

### Error: "relation 'table_name' already exists"

**Solution**:
This means tables already exist. Either:

1. Use `npm run db:push` to update existing tables
2. Or drop all tables and recreate:
   ```sql
   -- In Supabase SQL Editor
   DROP SCHEMA public CASCADE;
   CREATE SCHEMA public;
   ```
   Then run `npm run db:push` again

### Error: "Too many connections"

**Solution**:

1. Use Connection Pooling (Transaction mode)
2. Close unused connections
3. Upgrade to paid plan for more connections

### Seed Script Fails

**Solution**:

1. Ensure migrations ran successfully first
2. Check that all tables exist
3. Run seed script with error logging:
   ```bash
   npm run db:seed 2>&1 | tee seed-error.log
   ```

---

## Production Considerations

### Security

1. **Change Default Passwords**
   - Never use `admin123` in production
   - Use strong, randomly generated passwords

2. **Rotate Secrets Regularly**
   - Database passwords
   - API keys
   - JWT secrets

3. **Enable Row Level Security (RLS)**
   In Supabase, enable RLS for sensitive tables:

   ```sql
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ```

4. **Use Environment Variables**
   - Never commit `.env.local` to git
   - Store secrets in your deployment platform
   - Use different databases for dev/staging/production

### Performance Optimization

1. **Enable Connection Pooling**
   - Use Transaction mode connection string (port 6543)
   - Set appropriate pool size in production

2. **Add Database Indexes**
   Critical indexes to add:

   ```sql
   CREATE INDEX idx_services_slug ON services(slug);
   CREATE INDEX idx_blog_slug ON blog(slug);
   CREATE INDEX idx_projects_slug ON projects(slug);
   CREATE INDEX idx_users_email ON users(email);
   ```

3. **Enable Database Extensions**
   Useful extensions:
   ```sql
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for fuzzy search
   ```

### Backups

1. **Enable Automatic Backups** (Pro plan and above)
2. **Manual Backups**:

   ```bash
   pg_dump "connection-string" > backup-$(date +%Y%m%d).sql
   ```

3. **Test Restore Process** regularly

### Monitoring

1. **Enable Supabase Logs**
   - Monitor slow queries
   - Track error rates
   - Set up alerts

2. **Database Metrics to Watch**:
   - Connection count
   - Query performance
   - Table sizes
   - Index usage

### Scaling

When your app grows:

1. **Vertical Scaling**: Upgrade Supabase plan for more resources
2. **Read Replicas**: Set up read replicas for heavy read workloads
3. **Caching**: Implement Redis caching for frequently accessed data
4. **CDN**: Use Cloudinary for media assets

---

## Alternative Database Providers

If you prefer not to use Supabase, these are compatible alternatives:

### Neon (Serverless PostgreSQL)

- URL: https://neon.tech
- Free tier: 10 GB storage, 100 hours compute/month
- Auto-scaling, branching support
- Connection string format same as Supabase

### Railway

- URL: https://railway.app
- Free tier: $5 credit/month
- Easy deployment, built-in PostgreSQL
- One-click database provisioning

### Vercel Postgres

- URL: https://vercel.com/docs/storage/vercel-postgres
- Powered by Neon
- Seamless Vercel integration
- Free tier available

### PlanetScale (MySQL)

- URL: https://planetscale.com
- Note: Requires changing Drizzle adapter to MySQL
- Free tier: 10 GB storage, 100 million reads/month
- Branching and deployment workflow

To switch providers, just update `DATABASE_URL` in `.env.local` with the new connection string.

---

## Additional Resources

### Documentation

- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)
- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Tools

- [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [TablePlus](https://tableplus.com/) - Cross-platform DB client
- [pgAdmin](https://www.pgadmin.org/) - PostgreSQL administration tool

### Community

- [Drizzle Discord](https://discord.gg/drizzle)
- [Supabase Discord](https://discord.supabase.com/)

---

## Quick Reference

### Essential Commands

```bash
# Setup
cp .env.example .env.local         # Copy environment variables
npm run db:push                    # Push schema to database
npm run db:seed                    # Seed initial data

# Development
npm run db:studio                  # Open database GUI
npm run dev                        # Start Next.js dev server

# Schema Changes
npm run db:generate                # Generate migrations
npm run db:push                    # Apply schema changes

# Troubleshooting
npm run type-check                 # Check TypeScript errors
npm run lint                       # Check code quality
```

### Default Credentials

```
Admin User:
Email: admin@duosoluciones.com
Password: admin123

IMPORTANT: Change immediately after first login!
```

### Support

If you encounter issues:

1. Check this guide's [Troubleshooting](#troubleshooting) section
2. Review error logs carefully
3. Consult Drizzle and Supabase documentation
4. Check GitHub issues or create a new one

---

**Document Version**: 1.0
**Last Updated**: October 2025
**Maintained By**: DUO Soluciones Development Team
