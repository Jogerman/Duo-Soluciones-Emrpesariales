# Railway Deployment - Quick Start Guide

**DUO Soluciones Empresariales** - Next.js 15 Deployment to Railway

---

## Prerequisites Checklist

Before you begin, ensure you have:

- [ ] Railway account (https://railway.app)
- [ ] Supabase PostgreSQL database created
- [ ] Cloudinary account for media storage
- [ ] GitHub repository pushed and up-to-date

---

## 1. Generate Secrets (5 minutes)

Run these commands locally to generate required secrets:

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate PAYLOAD_SECRET
openssl rand -base64 32
```

Save these values - you'll need them in step 3.

---

## 2. Get Service Credentials (10 minutes)

### Supabase Database URL

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to: Settings > Database
4. Copy "Connection String" in **Pooler mode** (important!)
5. Format: `postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true`

### Cloudinary Credentials

1. Go to https://cloudinary.com/console
2. Dashboard shows:
   - Cloud Name
   - API Key
   - API Secret
3. Copy all three values

---

## 3. Deploy to Railway (15 minutes)

### Step 1: Create Railway Project

1. Go to https://railway.app/dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway with GitHub
5. Select repository: `Jogerman/Duo-Soluciones-Emrpesariales`
6. Click "Deploy Now"

### Step 2: Configure Environment Variables

Click on your service > Variables tab > Add these variables:

#### Required Variables (Must configure all)

```env
# App
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://[your-project].railway.app

# Database (from Supabase - Pooler mode!)
DATABASE_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true

# Authentication
NEXTAUTH_URL=https://[your-project].railway.app
NEXTAUTH_SECRET=[your-generated-secret-from-step-1]

# CMS
PAYLOAD_SECRET=[your-generated-secret-from-step-1]

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
```

**Important Notes:**

- Replace `[your-project]` with your actual Railway project name
- Use Supabase **Pooler** connection string (port 6543, not 5432)
- NEXTAUTH_URL must match NEXT_PUBLIC_APP_URL exactly
- Don't include trailing slashes in URLs

### Step 3: Deploy

1. After adding all variables, click "Deploy" button
2. Monitor deployment logs in Railway dashboard
3. Wait for deployment to complete (typically 3-5 minutes)

---

## 4. Verify Deployment (5 minutes)

### Test Your Deployment

1. **Visit your site**: `https://[your-project].railway.app`
2. **Check homepage loads** without errors
3. **Check Payload CMS**: `https://[your-project].railway.app/admin`
4. **Review logs**: Railway Dashboard > Deployments > View Logs

### Look for Success Indicators

- [ ] Homepage loads correctly
- [ ] No 500 or database connection errors in logs
- [ ] "Ready on http://..." message in logs
- [ ] Admin panel accessible (may need to create first user)

---

## 5. Optional: Custom Domain (10 minutes)

### Add Your Domain

1. Railway Dashboard > Service > Settings > Domains
2. Click "Add Domain"
3. Enter your domain: `duo-soluciones.com`

### Configure DNS

Add these DNS records at your domain registrar:

```
Type: A or CNAME
Name: @
Value: [Railway provides this]
TTL: 3600
```

```
Type: CNAME
Name: www
Value: [your-project].railway.app
TTL: 3600
```

### Update Environment Variables

After DNS propagation:

```env
NEXT_PUBLIC_APP_URL=https://duo-soluciones.com
NEXTAUTH_URL=https://duo-soluciones.com
```

Click "Deploy" to apply changes.

---

## 6. Optional: Configure Monitoring (15 minutes)

### Uptime Monitoring (Free)

1. Sign up at https://uptimerobot.com
2. Add monitor:
   - Type: HTTPS
   - URL: `https://[your-domain]`
   - Interval: 5 minutes
3. Configure email alerts

### Error Tracking (Optional)

1. Sign up at https://sentry.io
2. Create Next.js project
3. Get DSN from project settings
4. Add to Railway variables:

```env
SENTRY_DSN=https://xxxx@xxxx.ingest.sentry.io/xxxx
```

---

## Common Issues & Quick Fixes

### Issue: Build Fails

**Fix:**

- Check Railway logs for specific error
- Verify all dependencies in package.json
- Ensure Node version 20.x+ (Railway auto-detects)

### Issue: "Cannot connect to database"

**Fix:**

- Verify you're using **Pooler** connection string (port 6543)
- Check DATABASE_URL format is correct
- Ensure Supabase project is active
- Test connection: Railway Dashboard > Service > Shell > `node -e "console.log(process.env.DATABASE_URL)"`

### Issue: "Invalid URL" from NextAuth

**Fix:**

- NEXTAUTH_URL must match deployment URL exactly
- No trailing slash
- Must include https://

### Issue: Images Not Loading

**Fix:**

- Verify all 4 Cloudinary environment variables are set
- Check `next.config.ts` has Cloudinary in `remotePatterns`
- Test in Railway Shell: `node -e "console.log(process.env.CLOUDINARY_CLOUD_NAME)"`

---

## Cost Estimate

**Railway Pricing:**

- Starter: $5/month (includes $5 credit)
- Your estimated cost: $5-15/month for low-medium traffic

**Other Services:**

- Supabase: Free tier (500MB database)
- Cloudinary: Free tier (25GB storage, 25GB bandwidth)

**Total estimated monthly cost: $5-15**

---

## Support Resources

**Documentation:**

- Full deployment guide: `docs/deployment-railway.md`
- Detailed checklist: `docs/deployment-checklist.md`
- Environment variables: `railway.env.example`

**Help:**

- Railway Discord: https://discord.gg/railway
- Railway Docs: https://docs.railway.app
- Supabase Docs: https://supabase.com/docs

---

## Next Steps After Deployment

1. **Create Admin User**
   - Visit `/admin`
   - Create first admin account

2. **Add Content**
   - Login to Payload CMS
   - Start adding services, team members, blog posts

3. **Configure SEO**
   - Add meta descriptions
   - Configure sitemap
   - Submit to Google Search Console

4. **Performance Check**
   - Run Lighthouse audit
   - Optimize based on recommendations

5. **Security**
   - Enable 2FA on Railway account
   - Rotate secrets quarterly
   - Monitor error logs weekly

---

## Rollback Procedure

If something goes wrong:

```bash
# Via Railway Dashboard
Railway > Deployments > [Previous Successful Deployment] > Redeploy

# Or via Railway CLI
railway rollback
```

---

## Emergency Contacts

- **Railway Status**: https://status.railway.app
- **Supabase Status**: https://status.supabase.com
- **Support Discord**: https://discord.gg/railway

---

**Total Time Required:** 45-60 minutes
**Difficulty:** Beginner-Intermediate
**Last Updated:** October 2025

---

## Quick Command Reference

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link to existing project
railway link

# View logs
railway logs

# Deploy manually
railway up

# Open in browser
railway open

# View environment variables
railway variables

# Run command in Railway environment
railway run [command]
```

---

**Ready to deploy?** Start with Step 1 above!

For detailed information, see `docs/deployment-railway.md`
