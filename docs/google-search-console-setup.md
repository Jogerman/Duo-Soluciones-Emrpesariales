# Google Search Console Setup Guide
## DUO Soluciones Empresariales

**Document Version:** 1.0
**Last Updated:** October 2025
**Sprint:** Sprint 5 - Wave 2

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Property Setup](#property-setup)
4. [Domain Verification](#domain-verification)
5. [Sitemap Submission](#sitemap-submission)
6. [Search Appearance Configuration](#search-appearance-configuration)
7. [URL Inspection](#url-inspection)
8. [Performance Monitoring](#performance-monitoring)
9. [Index Coverage](#index-coverage)
10. [Linking with Google Analytics](#linking-with-google-analytics)
11. [Troubleshooting](#troubleshooting)
12. [Ongoing Maintenance](#ongoing-maintenance)

---

## Overview

Google Search Console (GSC) is a free tool that helps you monitor, maintain, and troubleshoot your site's presence in Google Search results. This guide walks through the complete setup process for the DUO Soluciones Empresariales website.

### What Google Search Console Does

- **Monitors indexing status** - See which pages Google has crawled
- **Submits sitemaps** - Help Google find all your pages
- **Identifies issues** - Alerts for errors, mobile usability, security issues
- **Tracks performance** - See which queries bring users to your site
- **Tests rich results** - Validate structured data implementation
- **Removes URLs** - Temporarily remove pages from search results

---

## Prerequisites

Before starting, ensure you have:

- [ ] Google Account (same one used for Analytics)
- [ ] Website deployed and live
- [ ] HTTPS enabled
- [ ] Sitemap generated and accessible
- [ ] FTP/DNS access to website (for verification)

---

## Property Setup

### Step 1: Access Google Search Console

1. Go to: https://search.google.com/search-console/
2. Sign in with your Google Account
3. Click **"Start now"** or **"Add property"**

### Step 2: Choose Property Type

You have two options:

#### Option A: Domain Property (Recommended)

**Covers:**
- All protocols (http, https)
- All subdomains (www, blog, etc.)

**Example:** `duo-soluciones.com`

**Verification Method:** DNS record

**Advantages:**
- ✅ Covers entire domain
- ✅ No need to add www separately
- ✅ Includes all subdomains

**Disadvantages:**
- ⚠️ Requires DNS access
- ⚠️ More technical setup

#### Option B: URL Prefix Property

**Covers:**
- Specific URL prefix only

**Example:** `https://duo-soluciones.com`

**Verification Methods:** Multiple options

**Advantages:**
- ✅ Easier to verify
- ✅ Multiple verification methods
- ✅ No DNS access needed

**Disadvantages:**
- ⚠️ Must add www separately
- ⚠️ Only covers HTTPS or HTTP

### Step 3: Enter Property Details

**For Domain Property:**
```
duo-soluciones.com
```

**For URL Prefix:**
```
https://duo-soluciones.com
```

**Recommended:** Use Domain Property if you have DNS access.

---

## Domain Verification

### Method 1: DNS Verification (Domain Property)

This is required for Domain properties and recommended for complete coverage.

#### Step 1: Copy TXT Record

After entering your domain, Google will provide a TXT record:

```
google-site-verification=abcd1234efgh5678ijkl9012mnop3456
```

#### Step 2: Add to DNS

1. **Log in to your DNS provider** (GoDaddy, Namecheap, Cloudflare, etc.)
2. **Find DNS Management** or DNS Records section
3. **Add new TXT record**:
   - **Type**: TXT
   - **Name/Host**: @ (or leave empty for root domain)
   - **Value**: `google-site-verification=abcd1234...`
   - **TTL**: 3600 (or default)
4. **Save changes**

#### Step 3: Verify

1. **Wait 5-10 minutes** for DNS propagation
2. **Return to Search Console**
3. **Click "Verify"**

**If verification fails:**
- Wait longer (DNS can take up to 48 hours)
- Check for typos in TXT record
- Ensure no extra spaces or quotes
- Try `nslookup -type=TXT duo-soluciones.com` to verify DNS record

---

### Method 2: HTML File Upload (URL Prefix)

#### Step 1: Download Verification File

Google provides a file like:
```
google123abc456def789.html
```

#### Step 2: Upload to Website Root

Place file in:
```
/public/google123abc456def789.html
```

File should be accessible at:
```
https://duo-soluciones.com/google123abc456def789.html
```

#### Step 3: Verify in Next.js

**Option A: Place in Public Folder**
```bash
# Simply place file in public/
public/
  google123abc456def789.html
```

**Option B: Create Route Handler**
```typescript
// src/app/google123abc456def789/route.ts
export async function GET() {
  return new Response('google-site-verification: google123abc456def789.html', {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
```

#### Step 4: Verify

1. Test file is accessible in browser
2. Return to Search Console
3. Click "Verify"

---

### Method 3: HTML Meta Tag (URL Prefix)

#### Step 1: Copy Meta Tag

Google provides:
```html
<meta name="google-site-verification" content="abcd1234..." />
```

#### Step 2: Add to Next.js Layout

**File:** `src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  // ... existing metadata
  verification: {
    google: 'abcd1234efgh5678ijkl9012mnop3456',
  },
}
```

This automatically generates:
```html
<meta name="google-site-verification" content="abcd1234..." />
```

#### Step 3: Deploy and Verify

1. **Deploy changes** to production
2. **Wait for deployment** to complete
3. **Verify tag is in source** (View Page Source)
4. **Return to Search Console** and click "Verify"

**Note:** This is already set up in the codebase! Just add your verification code to the environment variable:

```env
# .env.local
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abcd1234efgh5678
```

---

### Method 4: Google Analytics (URL Prefix)

If you have Google Analytics already set up:

1. **Use the same Google Account** for Search Console
2. **Select "Google Analytics" method**
3. **Search Console auto-verifies** via GA tracking code

**Requirements:**
- ✅ GA4 tracking code on all pages
- ✅ Same Google Account
- ✅ "Edit" permission in Analytics

---

### Method 5: Google Tag Manager (URL Prefix)

If you have Google Tag Manager:

1. **Select "Google Tag Manager" method**
2. **Search Console auto-verifies** via GTM container
3. **Must have "Publish" permission** in GTM

---

## Sitemap Submission

### Step 1: Verify Sitemap is Accessible

Test your sitemap:
```
https://duo-soluciones.com/sitemap.xml
```

Should return valid XML with all URLs.

### Step 2: Submit to Search Console

1. **In Search Console**, go to **"Sitemaps"** (left sidebar)
2. **Enter sitemap URL**: `sitemap.xml`
3. **Click "Submit"**

### Step 3: Verify Submission

After submission:
- **Status**: "Success" (green checkmark)
- **Type**: Sitemap
- **Last read**: Date/time
- **Discovered URLs**: Number of URLs found

**Possible Statuses:**

| Status | Meaning | Action |
|--------|---------|--------|
| ✅ Success | Sitemap processed | None needed |
| ⚠️ Couldn't fetch | Can't access sitemap | Check URL, server |
| ❌ Error | Invalid sitemap | Validate XML format |
| ⏳ Pending | Processing | Wait 24-48 hours |

### Step 4: Monitor Indexing

- **Submitted**: Total URLs in sitemap
- **Indexed**: URLs actually indexed by Google

**Note:** Not all submitted URLs will be indexed immediately. This is normal.

---

## Search Appearance Configuration

### Enhanced Search Results

Verify your structured data appears correctly:

1. **Go to**: **"Enhancements"** → **"Unparsed structured data"** (or specific types)
2. **Check for**:
   - BlogPosting
   - PodcastEpisode
   - Organization
   - LocalBusiness
   - Breadcrumbs
   - FAQPage

### Test Rich Results

1. **Go to**: **"URL Inspection"**
2. **Enter a URL**: e.g., `https://duo-soluciones.com/blog/post-slug`
3. **Click "Test Live URL"**
4. **View**: "More Info" → "Structured data"
5. **Verify**: Schemas are detected

### Breadcrumbs

1. **Check**: **"Enhancements"** → **"Breadcrumbs"**
2. **Verify**: Breadcrumbs are detected and valid
3. **Fix any errors**: If reported

---

## URL Inspection

The URL Inspection tool lets you check individual pages.

### How to Inspect a URL

1. **Enter URL** in the search bar at top: `https://duo-soluciones.com/page`
2. **View results**:
   - **Coverage**: Is page indexed?
   - **Mobile usability**: Mobile-friendly?
   - **Structured data**: Schemas detected?
   - **Last crawl**: When Google last visited

### Request Indexing

For new or updated pages:

1. **Inspect the URL**
2. **Click "Request Indexing"**
3. **Wait** for confirmation (1-2 minutes)
4. **Result**: "Indexing requested"

**Note:**
- Google will prioritize crawling, but not immediate
- Limit: ~10 requests per day
- Use for important pages only

### Interpreting Results

**URL is on Google:**
- ✅ Page is indexed
- ✅ Appears in search results
- No action needed

**URL is not on Google:**
- ❌ Page not indexed
- Reasons:
  - Recently published (not crawled yet)
  - Blocked by robots.txt
  - Noindex tag present
  - Technical error
  - Low quality/duplicate content

---

## Performance Monitoring

### Access Performance Report

1. **Go to**: **"Performance"** (left sidebar)
2. **View data** for:
   - Total clicks
   - Total impressions
   - Average CTR (Click-Through Rate)
   - Average position

### Key Metrics to Track

**Clicks:**
- Number of times users clicked your site in search results
- **Goal**: Increase over time

**Impressions:**
- Number of times your site appeared in search results
- **Goal**: Increase visibility

**CTR (Click-Through Rate):**
- Clicks ÷ Impressions
- **Good**: 3-5% (varies by position)
- **Great**: 5-10%

**Average Position:**
- Average ranking in search results
- **Goal**: Position 1-10 (first page)

### Filter by Query

See which search queries bring traffic:

1. **Click "Queries" tab**
2. **See**:
   - Which keywords users searched
   - Impressions per keyword
   - CTR per keyword
   - Average position

**Use this data to:**
- Identify top-performing keywords
- Find keywords with high impressions but low CTR
- Optimize content for underperforming queries

### Filter by Page

See which pages get the most traffic:

1. **Click "Pages" tab**
2. **Analyze** which pages:
   - Get most clicks
   - Have best CTR
   - Need optimization

### Date Range

- Default: Last 3 months
- Change: Click date selector
- Compare: Enable "Compare" to see trends

---

## Index Coverage

### Access Index Coverage Report

1. **Go to**: **"Coverage"** or **"Pages"** (left sidebar)
2. **View**:
   - **Indexed**: Pages successfully indexed
   - **Excluded**: Pages not indexed (with reasons)
   - **Error**: Pages with indexing errors
   - **Valid with warnings**: Indexed but with issues

### Categories Explained

**Valid (Indexed):**
- ✅ Submitted and indexed
- ✅ Discovered and indexed
- ✅ Indexed, not submitted in sitemap

**Excluded:**
- ⚠️ Noindex tag
- ⚠️ Blocked by robots.txt
- ⚠️ Redirect
- ⚠️ Duplicate content
- ⚠️ Soft 404

**Error:**
- ❌ Server error (5xx)
- ❌ Not found (404)
- ❌ Redirect error

### Common Exclusion Reasons

**Crawled - currently not indexed:**
- Google crawled but chose not to index
- **Reasons**: Low quality, thin content, or low priority
- **Action**: Improve content quality

**Discovered - currently not indexed:**
- Google found URL but hasn't crawled yet
- **Action**: Request indexing or wait

**Excluded by noindex tag:**
- Page has `<meta name="robots" content="noindex">`
- **Action**: Remove tag if you want it indexed

**Duplicate, Google chose different canonical:**
- Google thinks page is duplicate
- **Action**: Check canonical tags, ensure unique content

---

## Linking with Google Analytics

### Benefits of Linking

- See Search Console data in Google Analytics
- Cross-reference organic search with other traffic sources
- Enhanced reporting

### How to Link

**From Google Analytics:**

1. **Go to**: Google Analytics → **Admin**
2. **Select property**: DUO Soluciones Empresariales
3. **Under Property**: Click **"Product Links"** → **"Search Console links"**
4. **Click**: "Link"
5. **Choose**: Your Search Console property
6. **Select**: Data streams to link
7. **Submit**

**From Google Search Console:**

1. **Go to**: **"Settings"** (gear icon)
2. **Click**: "Associations"
3. **Click**: "Associate" next to Google Analytics
4. **Select**: Your GA4 property
5. **Confirm**

### Verify Link

In Google Analytics:
- **Reports** → **Life cycle** → **Acquisition** → **Traffic acquisition**
- Filter by: `google organic` source
- Should see Search Console data integrated

---

## Troubleshooting

### Property Not Verified

**Problem:** Verification fails

**Solutions:**

1. **DNS Method**:
   - Wait 24-48 hours for propagation
   - Use `nslookup -type=TXT duo-soluciones.com` to check
   - Remove any duplicate TXT records
   - Ensure no quotes around value

2. **HTML File Method**:
   - Verify file is accessible publicly
   - Check file content (no changes to filename or content)
   - Ensure no redirects to HTTPS if file is on HTTP

3. **Meta Tag Method**:
   - Check tag is in `<head>` section
   - Verify tag matches exactly (no spaces)
   - Deploy to production
   - Clear CDN cache if applicable

### Sitemap Not Indexed

**Problem:** Sitemap submitted but not processing

**Solutions:**

1. **Check sitemap URL** is correct and accessible
2. **Validate XML** at https://www.xml-sitemaps.com/validate-xml-sitemap.html
3. **Check for errors**:
   - Must be valid XML
   - UTF-8 encoding
   - Less than 50MB
   - Max 50,000 URLs per sitemap
4. **Check robots.txt** isn't blocking sitemap
5. **Wait 24-48 hours** for processing

### Pages Not Indexed

**Problem:** Pages submitted but not appearing in search

**Solutions:**

1. **Use URL Inspection Tool** to check specific pages
2. **Check for**:
   - Noindex tags (`<meta name="robots" content="noindex">`)
   - Robots.txt blocks
   - Canonical tags pointing elsewhere
   - Duplicate content
3. **Request indexing** for important pages
4. **Wait 2-4 weeks** for new sites (normal)
5. **Create quality content** - thin content won't index
6. **Build backlinks** - signals importance

### Coverage Errors

**Problem:** "Error" status in Index Coverage

**Solutions:**

1. **Server error (5xx)**:
   - Check server logs
   - Ensure site is stable
   - Check hosting resources

2. **Not found (404)**:
   - Remove from sitemap
   - Set up 301 redirect if page moved
   - Return 410 if permanently gone

3. **Redirect error**:
   - Check redirect chains (should be single redirect)
   - Ensure redirects return 301/302 status
   - Update internal links

---

## Ongoing Maintenance

### Weekly Tasks

- [ ] Check **Performance Report** for trends
- [ ] Review any new **Coverage issues**
- [ ] Monitor **Core Web Vitals** report

### Monthly Tasks

- [ ] Deep dive into **top-performing queries**
- [ ] Identify **low-CTR high-impression queries** to optimize
- [ ] Check **Mobile Usability** for issues
- [ ] Review **Security Issues** (should always be 0)
- [ ] Update sitemap if new pages added

### Quarterly Tasks

- [ ] Export **Performance data** for reporting
- [ ] Compare quarter-over-quarter growth
- [ ] Review **Links report** for backlinks
- [ ] Check **Experience report** (Page Experience)
- [ ] Audit and optimize low-performing pages

### Annual Tasks

- [ ] Comprehensive **site audit**
- [ ] Review and update **meta descriptions** based on performance
- [ ] Evaluate **schema markup** for new opportunities
- [ ] Check for **manual actions** (penalties)

---

## Key Reports to Monitor

### 1. Performance Report ⭐

**Frequency:** Weekly

**Metrics:**
- Total clicks (goal: increase)
- Total impressions (goal: increase)
- Average CTR (goal: 3-5%+)
- Average position (goal: top 10)

**Actions:**
- Identify high-impression, low-CTR queries → optimize titles/descriptions
- Find page 2 rankings (positions 11-20) → push to page 1
- Track seasonal trends

---

### 2. Index Coverage / Pages ⭐

**Frequency:** Weekly

**Metrics:**
- Indexed pages count
- Errors
- Excluded pages
- Warnings

**Actions:**
- Fix any errors immediately
- Investigate unexpected exclusions
- Request indexing for important new pages

---

### 3. Core Web Vitals

**Frequency:** Monthly

**Metrics:**
- LCP (Largest Contentful Paint)
- INP (Interaction to Next Paint)
- CLS (Cumulative Layout Shift)

**Actions:**
- Keep all metrics in "Good" range
- Fix any "Poor" URLs
- Monitor mobile vs desktop differences

---

### 4. Mobile Usability

**Frequency:** Monthly

**Checks:**
- Text too small
- Clickable elements too close
- Content wider than screen
- Viewport not set

**Actions:**
- Fix any mobile usability errors
- Maintain 0 errors

---

### 5. Links Report

**Frequency:** Quarterly

**View:**
- Top linking sites
- Top linked pages
- Internal links

**Actions:**
- Identify backlink opportunities
- Disavow spammy links if needed
- Strengthen internal linking

---

## Best Practices

### 1. Regular Monitoring ✅

- Check Search Console weekly
- Set up email alerts for critical issues
- Don't ignore warnings

### 2. Act on Data 📊

- Use performance data to guide content strategy
- Optimize pages with high impressions but low CTR
- Create content for high-volume queries you're not ranking for

### 3. Fix Errors Quickly 🔧

- Address coverage errors within 24-48 hours
- Request re-indexing after fixes
- Document fixes for team knowledge

### 4. Keep Sitemap Updated 🗺️

- Regenerate sitemap when adding pages
- Remove deleted pages promptly
- Submit updated sitemap to GSC

### 5. Monitor Competitors 👀

- Track your position vs competitors
- Identify keywords they rank for that you don't
- Analyze their content strategy

---

## Getting Help

### Google Search Console Help

- **Help Center**: https://support.google.com/webmasters/
- **Community**: https://support.google.com/webmasters/community
- **Twitter**: @googlesearchc

### Internal Documentation

- `analytics-setup-guide.md` - Google Analytics setup
- `seo-audit-final.md` - Complete SEO audit
- `event-tracking-documentation.md` - Event tracking reference
- `/src/app/sitemap.ts` - Sitemap implementation
- `/src/lib/seo.ts` - SEO utilities

### Support Contacts

For technical issues with Search Console setup:
1. Check this documentation
2. Review Google's official help docs
3. Contact development team
4. Post in Google Search Central community

---

## Checklist

### Initial Setup

- [ ] Create Search Console property (Domain or URL Prefix)
- [ ] Verify domain ownership (DNS, HTML file, or meta tag)
- [ ] Submit sitemap.xml
- [ ] Link with Google Analytics
- [ ] Set up users/permissions for team members
- [ ] Configure email notifications

### Post-Setup

- [ ] Monitor indexing progress (2-4 weeks for full index)
- [ ] Test rich results appear correctly
- [ ] Check for coverage errors
- [ ] Verify mobile usability
- [ ] Review first performance data (after 7-14 days)

### Ongoing

- [ ] Weekly performance review
- [ ] Monthly coverage check
- [ ] Quarterly deep-dive analysis
- [ ] Annual comprehensive audit

---

## Success Metrics

### Month 1
- ✅ Property verified
- ✅ Sitemap submitted and processed
- ✅ Initial pages indexed (expect 60-80%)
- ✅ No critical errors

### Month 2-3
- ✅ 90%+ pages indexed
- ✅ Performance data showing impressions
- ✅ Average position < 50 (any visibility)
- ✅ Some clicks from organic search

### Month 4-6
- ✅ Consistent organic traffic growth
- ✅ Average position improving
- ✅ CTR optimization showing results
- ✅ Rich results appearing

### Long-term (6+ months)
- ✅ Top 10 rankings for target keywords
- ✅ CTR 3-5%+ average
- ✅ Steady traffic growth month-over-month
- ✅ Strong presence in target market (República Dominicana)

---

**Document prepared by**: Development Team
**For**: DUO Soluciones Empresariales
**Sprint**: Sprint 5 - Wave 2 - Agent 4
**Date**: October 2025
