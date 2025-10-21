# Database Setup Guide - DUO Soluciones Empresariales

## Overview

This project uses **PostgreSQL** as the database with **Drizzle ORM** for type-safe database operations. The application is currently using **mock data** for all content (blog, podcast) and will migrate to database-driven content in future sprints.

## Current Status

- ✅ Database schemas defined in Drizzle ORM
- ✅ Enhanced seed script ready with comprehensive data
- ✅ Migration utilities created for mock → database transformation
- ⏳ DATABASE_URL not configured (using mock data)
- ⏳ Waiting for database setup (Supabase or local PostgreSQL)

## Prerequisites

Before setting up the database, you need:

- **Node.js 18+** (already installed)
- **PostgreSQL 16+** OR **Supabase account** (recommended)
- **DATABASE_URL** environment variable

## Quick Start

### Option 1: Supabase (Recommended)

Supabase provides a free PostgreSQL database with excellent developer experience.

1. **Create Supabase Account**
   - Visit https://supabase.com
   - Sign up for a free account
   - Create a new project

2. **Get Database URL**
   - Go to **Settings** → **Database**
   - Copy the **Connection String** (URI format)
   - It looks like: `postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres`

3. **Configure Environment**
   - Create or edit `.env.local` in project root:

   ```env
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
   ```

   - Replace `[PASSWORD]` and `[PROJECT_REF]` with your actual values

4. **Initialize Database**

   ```bash
   # Push schema to create all tables
   npm run db:push

   # Seed database with initial data
   npm run db:seed
   ```

### Option 2: Local PostgreSQL

For local development without cloud dependency.

1. **Install PostgreSQL 16**
   - Download from https://www.postgresql.org/download/
   - Install with default settings
   - Remember the password you set for the `postgres` user

2. **Create Database**

   ```bash
   # Open PostgreSQL command line (psql)
   psql -U postgres

   # Create database
   CREATE DATABASE duo_soluciones;

   # Exit psql
   \q
   ```

3. **Configure Environment**
   - Create or edit `.env.local` in project root:

   ```env
   DATABASE_URL=postgresql://postgres:[PASSWORD]@localhost:5432/duo_soluciones
   ```

   - Replace `[PASSWORD]` with your PostgreSQL password

4. **Initialize Database**

   ```bash
   # Push schema to create all tables
   npm run db:push

   # Seed database with initial data
   npm run db:seed
   ```

## Database Schema

The application uses the following tables:

### Core Tables

1. **users** - Admin users for authentication and CMS access
   - Fields: id, name, email, password, role, isActive, image
   - Includes NextAuth.js support with sessions and verification tokens

2. **categories** - Content categories (blog, podcast)
   - Fields: id, name, slug, description, color
   - 6 predefined categories (Desarrollo Organizacional, Mejora de Procesos, etc.)

3. **tags** - Content tags for better organization
   - Fields: id, name, slug
   - 20 predefined tags (Estrategia, KPIs, Lean Manufacturing, etc.)

### Content Tables

4. **blog** - Blog posts and articles
   - Fields: title, slug, excerpt, content, featuredImage, authorName
   - Includes: categories (jsonb), tags (jsonb), SEO fields, reading time
   - LinkedIn sync support: linkedinPostId, linkedinUrl

5. **podcast** - Podcast episodes
   - Fields: title, slug, description, episodeNumber, season, duration
   - Audio: audioUrl, spotifyEpisodeId, spotifyUrl
   - Metadata: hosts (jsonb), guests (jsonb), topics (jsonb), tags (jsonb)
   - Includes: transcript, showNotes, resources (jsonb)

### Business Tables

6. **services** - 4 main service areas (AS1-AS4)
   - Development Organizational, Process Improvement, ERP Implementation, Corporate Governance
   - Fields: title, slug, description, benefits, deliverables, keyFeatures

7. **team** - Team members and consultants
   - Fields: name, role, bio, email, linkedin, image
   - Professional details: specialties, certifications, education, industries

8. **clients** - Client companies
   - Fields: name, slug, industry, logo, description, website
   - 15+ clients including Torres 2, Hospital Antonio Ochoa, etc.

9. **projects** - Case studies and success stories
   - Fields: title, client, industry, challenge, solution, results
   - Metrics (jsonb), technologies (jsonb), images (jsonb)

10. **testimonials** - Client testimonials and reviews
    - Fields: clientName, company, role, content, rating, image

### Supporting Tables

11. **newsletter_subscribers** - Email newsletter subscribers
    - Fields: email, name, source, isActive, confirmedAt

12. **media** - Uploaded media files (images, documents, videos)
    - Cloudinary integration support
    - Fields: filename, url, cloudinaryId, mimeType, dimensions

13. **pages** - CMS-managed dynamic pages
    - Fields: title, slug, content, sections (jsonb), template
    - SEO and OpenGraph support

## Available Scripts

### Database Commands

```bash
# Generate migration files (when schema changes)
npm run db:generate

# Push schema to database (create/update tables)
npm run db:push

# Open Drizzle Studio (visual database browser)
npm run db:studio

# Seed database with initial data
npm run db:seed
```

### What Gets Seeded

When you run `npm run db:seed`, the following data is created:

- **6 Categories** (Desarrollo Organizacional, Mejora de Procesos, etc.)
- **20 Tags** (Estrategia, KPIs, Lean Manufacturing, etc.)
- **4 Services** (AS1-AS4 service areas)
- **2 Team Members** (Miguel Rodriguez, Angelina Burgos)
- **15 Clients** (Torres 2, Hospital Antonio Ochoa, etc.)
- **2 Admin Users** (admin@duosoluciones.com, editor@duosoluciones.com)
- **6 Blog Posts** (ERP implementation, Lean Six Sigma, etc.)
- **4 Podcast Episodes** (PYME transformation, Lean Manufacturing, etc.)
- **5 Testimonials** (From real clients)
- **3 Case Studies** (Supply chain optimization, ERP hospital, Corporate governance)
- **3 Newsletter Subscribers** (Sample data)

### Default Credentials

After seeding, you can log in with:

- **Admin**: admin@duosoluciones.com / admin123
- **Editor**: editor@duosoluciones.com / admin123

⚠️ **IMPORTANT**: Change these passwords immediately in production!

## Migration Path from Mock Data to Database

### Current State (Sprint 1-2)

The application currently uses mock data files:

- `src/lib/mock-data/blog-posts.ts`
- `src/lib/mock-data/podcast-episodes.ts`
- `src/lib/mock-data/categories.ts`
- `src/lib/mock-data/tags.ts`
- `src/lib/mock-data/authors.ts`

### Future State (Sprint 3+)

Once database is set up and tested:

1. **Update API Routes** (replace mock data imports with database queries)

   ```typescript
   // Before (using mock data)
   import { blogPosts } from '@/lib/mock-data/blog-posts'

   // After (using database)
   import { db } from '@/lib/db'
   import { blog } from '@/lib/db/schema'
   const blogPosts = await db.select().from(blog).where(eq(blog.status, 'published'))
   ```

2. **Use Migration Utilities**
   - Utilities are available in `src/lib/utils/migrate-mock-to-db.ts`
   - Functions: `transformBlogPost()`, `transformPodcastEpisode()`, etc.

3. **Activate Placeholder API Routes**
   - Routes created in `src/app/api/`
   - Currently commented out, ready to activate

### Migration Steps (When Ready)

```bash
# 1. Set up database (Supabase or local)
# 2. Configure DATABASE_URL in .env.local
# 3. Push schema
npm run db:push

# 4. Seed database
npm run db:seed

# 5. Test database queries
npm run db:studio

# 6. Update API routes to use database
# 7. Test application end-to-end
# 8. Deploy with database connection
```

## Database Tools

### Drizzle Studio

Visual database browser and editor:

```bash
npm run db:studio
```

This opens a web interface at `https://local.drizzle.studio` where you can:

- Browse all tables and data
- Run SQL queries
- Edit records visually
- View relationships

### Direct PostgreSQL Access

#### Using psql (Command Line)

```bash
# Connect to local database
psql -U postgres -d duo_soluciones

# Common commands
\dt                    # List all tables
\d tablename          # Describe table structure
SELECT * FROM blog;   # Query data
\q                    # Quit
```

#### Using pgAdmin (GUI)

- Download from https://www.pgadmin.org/
- Add connection with your DATABASE_URL credentials
- Visual query builder and data browser

### Supabase Dashboard

If using Supabase:

- Go to **Table Editor** to view/edit data
- Use **SQL Editor** for custom queries
- Monitor performance in **Database** → **Reports**

## Troubleshooting

### Error: "DATABASE_URL environment variable is not set"

**Solution**: Create `.env.local` file with valid DATABASE_URL

### Error: "Connection refused"

**For Local PostgreSQL**:

- Ensure PostgreSQL service is running
- Check if port 5432 is not blocked by firewall
- Verify password and database name

**For Supabase**:

- Check internet connection
- Verify PROJECT_REF and password are correct
- Ensure IP is not blocked (Supabase allows all IPs by default)

### Error: "relation does not exist"

**Solution**: Run `npm run db:push` to create tables

### Seed Script Fails

**Check**:

- DATABASE_URL is set correctly
- Database is accessible
- Tables have been created (`npm run db:push`)
- No existing data conflicts (drop and recreate tables if needed)

### TypeScript Errors After Schema Changes

**Solution**:

```bash
# Regenerate types
npm run db:generate

# Restart TypeScript server in your IDE
```

## Best Practices

### Development

1. **Use Drizzle Studio** for visual database inspection
2. **Run seeds locally** to test with realistic data
3. **Use transactions** for multi-step operations
4. **Index frequently queried columns** (slug, email, status)

### Production

1. **Always use environment variables** for DATABASE_URL
2. **Never commit `.env.local`** to version control
3. **Use connection pooling** (handled automatically by Drizzle)
4. **Enable SSL** for production databases (Supabase does this by default)
5. **Regular backups** (Supabase provides automatic daily backups)

### Security

1. **Never expose DATABASE_URL** in client-side code
2. **Use parameterized queries** (Drizzle does this automatically)
3. **Implement rate limiting** on API routes
4. **Validate all inputs** before database operations
5. **Hash passwords** using bcryptjs (already implemented)

## Next Steps

Once database is set up:

1. ✅ Push schema: `npm run db:push`
2. ✅ Seed database: `npm run db:seed`
3. ✅ Open Drizzle Studio: `npm run db:studio`
4. ⏳ Test API routes with database queries
5. ⏳ Implement CMS for content management
6. ⏳ Add search functionality (full-text search on blog/podcast)
7. ⏳ Implement caching layer (Redis) for performance

## Resources

- **Drizzle ORM Docs**: https://orm.drizzle.team/
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Supabase Docs**: https://supabase.com/docs
- **NextAuth.js + Drizzle**: https://authjs.dev/reference/adapter/drizzle

## Support

For issues or questions:

- Check this documentation first
- Review Drizzle ORM docs
- Contact development team

---

**Last Updated**: Sprint 1 (Database Foundation Prep)
**Status**: Ready for database connection
**Next Sprint**: Connect to Supabase and migrate from mock data
