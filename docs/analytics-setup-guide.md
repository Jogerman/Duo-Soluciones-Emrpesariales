# Google Analytics 4 Setup Guide
## DUO Soluciones Empresariales

**Document Version:** 1.0
**Last Updated:** October 2025
**Sprint:** Sprint 5 - Wave 2

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [GA4 Account Setup](#ga4-account-setup)
4. [Environment Configuration](#environment-configuration)
5. [Implementation Verification](#implementation-verification)
6. [Custom Events Configuration](#custom-events-configuration)
7. [Enhanced Measurements](#enhanced-measurements)
8. [Conversion Tracking](#conversion-tracking)
9. [Custom Dimensions & Metrics](#custom-dimensions--metrics)
10. [Data Streams Configuration](#data-streams-configuration)
11. [Troubleshooting](#troubleshooting)

---

## Overview

This guide provides step-by-step instructions for setting up Google Analytics 4 (GA4) for the DUO Soluciones Empresariales website. The implementation uses Next.js 15 with custom event tracking for key user interactions.

### Implementation Features

- Page view tracking (automatic)
- Custom event tracking (newsletter, search, shares, etc.)
- Do Not Track (DNT) respect
- Production-only tracking
- TypeScript support
- Performance monitoring (Core Web Vitals)

---

## Prerequisites

Before starting, ensure you have:

- [ ] Google Account with admin access
- [ ] Access to Google Analytics (analytics.google.com)
- [ ] Access to project `.env.local` file
- [ ] Basic understanding of GA4 concepts

---

## GA4 Account Setup

### Step 1: Create GA4 Property

1. **Go to Google Analytics**: https://analytics.google.com/
2. **Click Admin** (gear icon in bottom left)
3. **Create Property**:
   - Property name: `DUO Soluciones Empresariales`
   - Reporting time zone: `(GMT-04:00) Atlantic Time - Santo Domingo`
   - Currency: `Dominican Peso (DOP)`
4. **Click Next**
5. **Business Information**:
   - Industry category: `Professional Services`
   - Business size: `Small` (adjust as needed)
   - Intended use: `Measure website and app performance`, `Get insights into my users`
6. **Click Create**
7. **Accept Terms of Service**

### Step 2: Create Data Stream

1. **Select platform**: `Web`
2. **Website URL**: `https://duo-soluciones.com`
3. **Stream name**: `DUO Soluciones Website`
4. **Enable Enhanced measurement**: ✓ (recommended)
5. **Click Create stream**

### Step 3: Get Measurement ID

1. After creating the stream, you'll see your **Measurement ID**
2. Format: `G-XXXXXXXXXX`
3. **Copy this ID** - you'll need it for environment configuration

---

## Environment Configuration

### Step 1: Add to .env.local

Open or create `.env.local` in the project root:

```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional: Google Tag Manager
# NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

**Important**:
- Replace `G-XXXXXXXXXX` with your actual Measurement ID
- The `NEXT_PUBLIC_` prefix makes it available in the browser
- Never commit `.env.local` to version control

### Step 2: Restart Development Server

```bash
npm run dev
```

The analytics component will automatically load with your configuration.

---

## Implementation Verification

### Method 1: Google Analytics DebugView (Recommended)

1. **Install Chrome Extension**: [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger)
2. **Enable the extension** (icon turns blue)
3. **Navigate to your website**: http://localhost:3000 (dev) or https://duo-soluciones.com (prod)
4. **In GA4**:
   - Go to **Configure** > **DebugView**
   - You should see events in real-time

### Method 2: Browser Console

Open browser DevTools (F12) and check the Console:

```javascript
// In development, you'll see:
[Analytics Event] page_view { page_path: "/", page_title: "Home" }
```

### Method 3: GA4 Realtime Reports

1. Go to **Reports** > **Realtime**
2. Open your website in another tab
3. Within 30 seconds, you should see yourself in the realtime report

### Method 4: Network Tab

1. Open DevTools > Network
2. Filter by "google-analytics" or "gtag"
3. Navigate pages and watch for requests to:
   - `https://www.google-analytics.com/g/collect`
   - `https://www.googletagmanager.com/gtag/js`

---

## Custom Events Configuration

Our implementation includes 5 custom events for Sprint 5:

### 1. Newsletter Signup

**Event Name**: `newsletter_signup`

**When Triggered**: User successfully subscribes to newsletter

**Parameters**:
- `method`: Location of signup form (e.g., "footer_form", "blog_inline")

**Implementation**:
```typescript
import { trackNewsletterSignup } from '@/lib/analytics'

// In your newsletter component
const handleSubmit = async (data) => {
  // ... form submission logic
  trackNewsletterSignup('footer_form')
}
```

**Setup in GA4**:
1. Go to **Configure** > **Events**
2. Event should appear automatically after first trigger
3. Mark as **Key Event** (optional)

---

### 2. Search Queries

**Event Name**: `search`

**When Triggered**: User performs a search

**Parameters**:
- `search_term`: The query string
- `results_count`: Number of results (optional)
- `category`: Search category filter (optional)

**Implementation**:
```typescript
import { trackSearch } from '@/lib/analytics'

// In search component
const handleSearch = (query: string, results: any[]) => {
  trackSearch(query, {
    results_count: results.length,
    category: selectedCategory
  })
}
```

**Setup in GA4**:
1. Go to **Configure** > **Custom definitions**
2. Click **Create custom dimension**:
   - Dimension name: `Search Term`
   - Scope: Event
   - Event parameter: `search_term`
3. Repeat for `results_count` and `category`

---

### 3. Social Shares

**Event Name**: `share`

**When Triggered**: User clicks social share button

**Parameters**:
- `method`: Social platform (linkedin, twitter, facebook, whatsapp, email)
- `content_type`: Type of content (blog, podcast, service, page)
- `content_id`: Unique identifier (slug)

**Implementation**:
```typescript
import { trackShare } from '@/lib/analytics'

// In share button component
const handleShare = (platform: string) => {
  trackShare('linkedin', 'blog', post.slug)
}
```

**Setup in GA4**:
1. Event appears automatically
2. Create custom dimensions for `method`, `content_type`, `content_id`
3. Analyze in **Reports** > **Engagement** > **Events**

---

### 4. Recommendation Clicks

**Event Name**: `recommendation_click`

**When Triggered**: User clicks on recommended content

**Parameters**:
- `content_id`: ID or slug of recommended content
- `content_type`: Type (blog, podcast, service)

**Implementation**:
```typescript
import { trackRecommendationClick } from '@/lib/analytics'

// In recommendations component
const handleClick = (content) => {
  trackRecommendationClick(content.slug, 'blog')
}
```

---

### 5. Contact Form Submission

**Event Name**: `contact_form_submit`

**When Triggered**: User successfully submits contact form

**Parameters**:
- `service_interest`: Selected service (optional)
- `source`: Form location (optional)

**Implementation**:
```typescript
import { trackContactFormSubmit } from '@/lib/analytics'

// In contact form
const handleSubmit = async (data) => {
  // ... form submission
  trackContactFormSubmit({
    service_interest: data.service,
    source: 'contact_page'
  })
}
```

---

## Enhanced Measurements

GA4 automatically tracks these interactions when Enhanced Measurement is enabled:

### Included by Default

- ✅ Page views
- ✅ Scrolls (90% depth)
- ✅ Outbound clicks
- ✅ Site search
- ✅ Video engagement (YouTube)
- ✅ File downloads

### To Verify/Enable

1. Go to **Admin** > **Data Streams**
2. Click your web stream
3. Click **Enhanced measurement**
4. Ensure these are enabled:
   - Page views
   - Scrolls
   - Outbound clicks
   - Site search
   - File downloads

---

## Conversion Tracking

Mark important events as **Key Events** (formerly Conversions):

### Recommended Key Events

1. **newsletter_signup** - Lead generation
2. **contact_form_submit** - High-value interaction
3. **search** - Content engagement (optional)

### How to Mark as Key Event

1. Go to **Configure** > **Events**
2. Find the event in the list
3. Toggle **Mark as key event** to ON
4. Key events appear in **Reports** > **Monetization** > **Key events**

---

## Custom Dimensions & Metrics

### Recommended Custom Dimensions

Create these in **Configure** > **Custom definitions**:

| Dimension Name | Scope | Event Parameter | Use Case |
|---------------|-------|-----------------|----------|
| Search Term | Event | `search_term` | Search analysis |
| Content Type | Event | `content_type` | Content performance |
| Share Method | Event | `method` | Social engagement |
| Service Interest | Event | `service_interest` | Lead qualification |
| Newsletter Method | Event | `method` | Signup sources |

### How to Create

1. **Configure** > **Custom definitions** > **Create custom dimension**
2. Fill in:
   - Dimension name
   - Scope: `Event`
   - Description (optional)
   - Event parameter (must match code)
3. Click **Save**

---

## Data Streams Configuration

### Configure Data Stream Settings

1. **Admin** > **Data Streams** > Select your stream

2. **Enhanced measurement settings**:
   - ✅ Page views
   - ✅ Scrolls
   - ✅ Outbound clicks
   - ✅ Site search
   - ✅ Video engagement
   - ✅ File downloads

3. **Additional settings**:
   - Session timeout: 30 minutes (default)
   - Engaged session timeout: 10 seconds (default)

4. **Configure tag settings**:
   - Click **Configure tag settings**
   - **Settings** > **Show all** > **Internal Traffic**
   - Define internal traffic (your office IP, if applicable)

---

## Troubleshooting

### Events Not Showing Up

**Problem**: Events aren't appearing in GA4

**Solutions**:

1. **Check Measurement ID**:
   ```bash
   # Verify in .env.local
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. **Verify Production Mode**:
   - Analytics only runs in production (`NODE_ENV=production`)
   - To test locally: `npm run build && npm start`

3. **Check Browser Console**:
   - In development, events are logged to console
   - Look for `[Analytics Event]` messages

4. **Verify DNT**:
   - Check if "Do Not Track" is enabled in browser
   - Our implementation respects DNT

5. **Wait for Processing**:
   - GA4 can take 24-48 hours to show in reports
   - Use **DebugView** for real-time verification

---

### GA4 DebugView Shows Nothing

**Problem**: DebugView is empty

**Solutions**:

1. **Enable debug mode**:
   - Install Google Analytics Debugger extension
   - OR add `?debug_mode=true` to URL
   - Refresh page

2. **Check if logged in**:
   - Must be logged into same Google account
   - That has access to the GA4 property

3. **Verify data stream**:
   - Ensure data stream is active
   - Check measurement ID matches

---

### Events Fire Multiple Times

**Problem**: Same event fires repeatedly

**Solutions**:

1. **Check component mounting**:
   - Ensure `useEffect` has proper dependencies
   - Consider using `useRef` to prevent duplicates

2. **Verify event handlers**:
   - Don't call track functions directly in render
   - Use callbacks/handlers instead

---

### Custom Dimensions Not Available

**Problem**: Custom dimensions don't show in reports

**Solutions**:

1. **Wait 24-48 hours** - New dimensions take time to populate

2. **Check parameter names**:
   - Must exactly match what's in code
   - Case-sensitive

3. **Verify data is being sent**:
   - Use DebugView to see event parameters
   - Ensure parameters are included in events

---

## Next Steps

After completing setup:

1. ✅ Verify all custom events are firing
2. ✅ Create custom dimensions for key parameters
3. ✅ Mark important events as Key Events
4. ✅ Set up internal traffic filter
5. ✅ Configure Google Search Console integration (see `google-search-console-setup.md`)
6. ✅ Create custom reports and dashboards
7. ✅ Set up alerts for key metrics
8. ✅ Train team on GA4 interface

---

## Additional Resources

- **GA4 Documentation**: https://support.google.com/analytics/answer/9304153
- **Event Tracking Guide**: `event-tracking-documentation.md`
- **SEO Setup**: `seo-audit-final.md`
- **Search Console**: `google-search-console-setup.md`
- **Analytics Code**: `/src/lib/analytics.ts`
- **GA Component**: `/src/components/seo/GoogleAnalytics.tsx`

---

## Support

For questions or issues with analytics setup:

1. Check this documentation first
2. Review `/src/lib/analytics.ts` for implementation details
3. Check browser console for debug messages
4. Use GA4 DebugView for real-time verification
5. Contact development team if issues persist

---

**Document maintained by**: Development Team
**For**: DUO Soluciones Empresariales
**Sprint**: Sprint 5 - Wave 2 - Agent 4
