# Event Tracking Documentation
## DUO Soluciones Empresariales

**Document Version:** 1.0
**Last Updated:** October 2025
**Sprint:** Sprint 5 - Wave 2

---

## Table of Contents

1. [Overview](#overview)
2. [Event Tracking Architecture](#event-tracking-architecture)
3. [Standard Events](#standard-events)
4. [Custom Sprint 5 Events](#custom-sprint-5-events)
5. [Implementation Examples](#implementation-examples)
6. [Testing Events](#testing-events)
7. [Best Practices](#best-practices)
8. [Event Reference](#event-reference)

---

## Overview

This document provides comprehensive documentation for all analytics events tracked on the DUO Soluciones Empresariales website. Events are tracked using Google Analytics 4 (GA4) through a centralized analytics module.

### Key Features

- **Centralized tracking**: All events managed through `/src/lib/analytics.ts`
- **TypeScript support**: Full type safety for event parameters
- **Development logging**: Events logged to console in dev mode
- **Production only**: Tracking only occurs in production environment
- **DNT respect**: Honors Do Not Track browser setting

---

## Event Tracking Architecture

### File Structure

```
src/
├── lib/
│   └── analytics.ts          # Main analytics module
├── components/
│   ├── seo/
│   │   └── GoogleAnalytics.tsx   # GA4 component
│   └── marketing/
│       └── [components with tracking]
```

### How It Works

1. **GoogleAnalytics component** loads GA4 scripts in `layout.tsx`
2. **Page views** are tracked automatically on route changes
3. **Custom events** are tracked via imported functions
4. **Events** are sent to GA4 dataLayer
5. **Development mode** logs events to console instead

---

## Standard Events

These events are included in the base analytics module:

### 1. Page Views

**Function**: `trackPageView(params?)`

**Automatic**: Yes - Called on every route change

**Parameters**:
- `page_title` - Document title
- `page_location` - Full URL
- `page_path` - Path only

**Usage**:
```typescript
// Automatic - no manual calls needed
// Tracked in GoogleAnalytics component
```

---

### 2. Form Submissions

**Function**: `trackFormSubmit(formName, formData?)`

**Parameters**:
- `formName` (required): String - Form identifier
- `formData` (optional): Object - Additional form data

**Example**:
```typescript
import { trackFormSubmit } from '@/lib/analytics'

const handleSubmit = (data) => {
  // Process form...
  trackFormSubmit('contact_form', {
    service_type: data.service,
    source: 'contact_page'
  })
}
```

**GA4 Event**:
```javascript
{
  event: 'form_submit',
  category: 'engagement',
  label: formName,
  form_name: formName,
  ...formData
}
```

---

### 3. Button/Link Clicks

**Function**: `trackClick(elementName, elementType, destination?)`

**Parameters**:
- `elementName` (required): String - Button/link label
- `elementType` (required): 'button' | 'link'
- `destination` (optional): String - Target URL

**Example**:
```typescript
import { trackClick } from '@/lib/analytics'

<button onClick={() => {
  trackClick('cta_services', 'button', '/services')
  router.push('/services')
}}>
  Ver Servicios
</button>
```

---

### 4. File Downloads

**Function**: `trackDownload(fileName, fileType?)`

**Example**:
```typescript
import { trackDownload } from '@/lib/analytics'

const handleDownload = () => {
  trackDownload('company-profile.pdf', 'pdf')
}
```

---

### 5. Outbound Links

**Function**: `trackOutboundLink(url, linkText?)`

**Example**:
```typescript
import { trackOutboundLink } from '@/lib/analytics'

<a
  href="https://microsoft.com"
  onClick={() => trackOutboundLink('https://microsoft.com', 'Microsoft Partner')}
  target="_blank"
>
  Microsoft Partner
</a>
```

---

### 6. Video Interactions

**Function**: `trackVideo(action, videoTitle, currentTime?)`

**Actions**: 'play' | 'pause' | 'complete'

**Example**:
```typescript
import { trackVideo } from '@/lib/analytics'

<video
  onPlay={() => trackVideo('play', 'Company Overview')}
  onPause={(e) => trackVideo('pause', 'Company Overview', e.currentTarget.currentTime)}
  onEnded={() => trackVideo('complete', 'Company Overview')}
>
  {/* ... */}
</video>
```

---

### 7. Scroll Depth

**Function**: `trackScrollDepth(depth)` or `initScrollTracking()`

**Auto-tracking**:
```typescript
// In layout or app component
import { initScrollTracking } from '@/lib/analytics'

useEffect(() => {
  initScrollTracking() // Auto-tracks 25%, 50%, 75%, 100%
}, [])
```

---

### 8. Errors

**Function**: `trackError(errorName, errorMessage?, errorStack?)`

**Example**:
```typescript
import { trackError } from '@/lib/analytics'

try {
  // ... code
} catch (error) {
  trackError('API_FAILURE', error.message, error.stack)
  console.error(error)
}
```

---

### 9. Service Inquiries

**Function**: `trackServiceInquiry(serviceName)`

**Example**:
```typescript
import { trackServiceInquiry } from '@/lib/analytics'

const handleServiceClick = (service) => {
  trackServiceInquiry('Desarrollo Organizacional')
  router.push('/services/desarrollo-organizacional')
}
```

---

## Custom Sprint 5 Events

These 5 custom events were added in Sprint 5 - Wave 2:

### 1. Newsletter Signup ⭐

**Function**: `trackNewsletterSignup(method)`

**When to Use**: User successfully subscribes to newsletter

**Parameters**:
- `method` (optional, default: 'footer_form'): Signup form location

**Possible Methods**:
- `footer_form` - Footer newsletter form
- `blog_inline` - Inline form in blog post
- `popup` - Newsletter popup
- `exit_intent` - Exit intent popup
- `homepage_hero` - Hero section form

**Implementation**:
```typescript
import { trackNewsletterSignup } from '@/lib/analytics'

// In NewsletterSignup component
const handleSubmit = async (email: string) => {
  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email })
    })

    if (response.ok) {
      trackNewsletterSignup('footer_form') // ✅ Track after success
      toast.success('¡Suscripción exitosa!')
    }
  } catch (error) {
    console.error(error)
  }
}
```

**GA4 Event Structure**:
```javascript
{
  event: 'newsletter_signup',
  category: 'engagement',
  label: 'Newsletter Signup',
  method: 'footer_form'
}
```

**GA4 Custom Dimensions**:
- Create dimension: `Newsletter Method` (Event scope) → parameter: `method`

**Key Event**: ✅ Yes - Mark as conversion in GA4

---

### 2. Search Queries ⭐

**Function**: `trackSearch(searchTerm, params?)`

**When to Use**: User performs a search

**Parameters**:
- `searchTerm` (required): String - The search query
- `params.results_count` (optional): Number - Results found
- `params.category` (optional): String - Search category filter

**Implementation**:
```typescript
import { trackSearch } from '@/lib/analytics'

// In SearchPage component
const handleSearch = async (query: string) => {
  const results = await searchContent(query)

  trackSearch(query, {
    results_count: results.length,
    category: selectedCategory
  })

  setSearchResults(results)
}
```

**Full Example** (with debouncing):
```typescript
'use client'

import { useState, useEffect } from 'react'
import { trackSearch } from '@/lib/analytics'
import { useDebounce } from '@/hooks/useDebounce'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const [results, setResults] = useState([])

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery)
    }
  }, [debouncedQuery])

  const performSearch = async (searchTerm: string) => {
    const data = await fetch(`/api/search?q=${searchTerm}`).then(r => r.json())

    setResults(data.results)

    // Track after results are received
    trackSearch(searchTerm, {
      results_count: data.results.length,
      category: data.category
    })
  }

  return (
    <input
      type="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Buscar..."
    />
  )
}
```

**GA4 Event Structure**:
```javascript
{
  event: 'search',
  category: 'engagement',
  label: searchTerm,
  search_term: searchTerm,
  results_count: 5,
  category: 'blog'
}
```

**GA4 Custom Dimensions**:
- `Search Term` (Event) → `search_term`
- `Search Results Count` (Event) → `results_count`
- `Search Category` (Event) → `category`

---

### 3. Social Shares ⭐

**Function**: `trackShare(platform, contentType, contentId)`

**When to Use**: User clicks social share button

**Parameters**:
- `platform` (required): 'linkedin' | 'twitter' | 'facebook' | 'whatsapp' | 'email'
- `contentType` (required): 'blog' | 'podcast' | 'service' | 'page'
- `contentId` (required): String - Content slug or ID

**Implementation**:
```typescript
import { trackShare } from '@/lib/analytics'

// In ShareButtons component
interface ShareButtonsProps {
  content: {
    id: string
    type: 'blog' | 'podcast' | 'service' | 'page'
    title: string
    url: string
  }
}

export function ShareButtons({ content }: ShareButtonsProps) {
  const handleShare = (platform: string) => {
    // Track the share
    trackShare(platform, content.type, content.id)

    // Open share dialog
    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${content.url}`,
      twitter: `https://twitter.com/intent/tweet?url=${content.url}&text=${content.title}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${content.url}`,
      whatsapp: `https://wa.me/?text=${content.title} ${content.url}`,
      email: `mailto:?subject=${content.title}&body=${content.url}`
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => handleShare('linkedin')}>LinkedIn</button>
      <button onClick={() => handleShare('twitter')}>Twitter</button>
      <button onClick={() => handleShare('facebook')}>Facebook</button>
      <button onClick={() => handleShare('whatsapp')}>WhatsApp</button>
      <button onClick={() => handleShare('email')}>Email</button>
    </div>
  )
}
```

**GA4 Event Structure**:
```javascript
{
  event: 'share',
  category: 'engagement',
  label: 'Share on linkedin',
  method: 'linkedin',
  content_type: 'blog',
  content_id: 'mejora-procesos-lean-six-sigma'
}
```

**GA4 Custom Dimensions**:
- `Share Method` (Event) → `method`
- `Content Type` (Event) → `content_type`
- `Content ID` (Event) → `content_id`

---

### 4. Recommendation Clicks ⭐

**Function**: `trackRecommendationClick(contentId, contentType)`

**When to Use**: User clicks on recommended/related content

**Parameters**:
- `contentId` (required): String - ID or slug of content
- `contentType` (required): 'blog' | 'podcast' | 'service'

**Implementation**:
```typescript
import { trackRecommendationClick } from '@/lib/analytics'

// In RelatedPosts component
interface RelatedPost {
  id: string
  slug: string
  title: string
}

export function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  const handleClick = (post: RelatedPost) => {
    trackRecommendationClick(post.slug, 'blog')
    // Navigation happens via Link component
  }

  return (
    <div>
      {posts.map(post => (
        <Link
          key={post.id}
          href={`/blog/${post.slug}`}
          onClick={() => handleClick(post)}
        >
          {post.title}
        </Link>
      ))}
    </div>
  )
}
```

**Use Cases**:
- Related blog posts
- Recommended podcasts
- Suggested services
- "You might also like" sections
- Algorithm-based recommendations

**GA4 Event Structure**:
```javascript
{
  event: 'recommendation_click',
  category: 'engagement',
  label: 'Recommendation: blog-post-123',
  content_id: 'blog-post-123',
  content_type: 'blog'
}
```

**Analysis in GA4**:
- Which content generates most clicks?
- Which content types are recommended most?
- Recommendation click-through rate

---

### 5. Contact Form Submission ⭐

**Function**: `trackContactFormSubmit(params?)`

**When to Use**: User successfully submits contact form

**Parameters**:
- `params.service_interest` (optional): String - Selected service
- `params.source` (optional): String - Form location

**Implementation**:
```typescript
import { trackContactFormSubmit } from '@/lib/analytics'

// In ContactForm component
const handleSubmit = async (data: ContactFormData) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data)
    })

    if (response.ok) {
      // Track after successful submission
      trackContactFormSubmit({
        service_interest: data.serviceType,
        source: 'contact_page'
      })

      toast.success('Mensaje enviado correctamente')
      reset()
    }
  } catch (error) {
    trackError('CONTACT_FORM_ERROR', error.message)
  }
}
```

**Possible Sources**:
- `contact_page` - Main contact page
- `service_page` - Service detail page form
- `footer_cta` - Footer CTA form
- `popup` - Contact popup
- `blog_inline` - Inline contact form in blog

**GA4 Event Structure**:
```javascript
{
  event: 'contact_form_submit',
  category: 'lead',
  label: 'Contact Form Submission',
  service_interest: 'Desarrollo Organizacional',
  source: 'contact_page'
}
```

**GA4 Custom Dimensions**:
- `Service Interest` (Event) → `service_interest`
- `Form Source` (Event) → `source`

**Key Event**: ✅ Yes - High-value conversion

---

## Implementation Examples

### Example 1: Blog Post with All Events

```typescript
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  trackPageView,
  trackShare,
  trackRecommendationClick,
  initScrollTracking
} from '@/lib/analytics'

export function BlogPostPage({ post, relatedPosts }) {
  const pathname = usePathname()

  // Track page view on mount
  useEffect(() => {
    trackPageView({
      page_title: post.title,
      page_path: pathname
    })
  }, [post.title, pathname])

  // Initialize scroll tracking
  useEffect(() => {
    initScrollTracking()
  }, [])

  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>

      {/* Share buttons */}
      <ShareButtons
        onShare={(platform) => trackShare(platform, 'blog', post.slug)}
      />

      {/* Related posts */}
      <aside>
        {relatedPosts.map(related => (
          <Link
            key={related.id}
            href={`/blog/${related.slug}`}
            onClick={() => trackRecommendationClick(related.slug, 'blog')}
          >
            {related.title}
          </Link>
        ))}
      </aside>
    </article>
  )
}
```

---

### Example 2: Search with Filters

```typescript
'use client'

import { useState } from 'react'
import { trackSearch } from '@/lib/analytics'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [results, setResults] = useState([])

  const handleSearch = async () => {
    const data = await fetch(
      `/api/search?q=${query}&category=${category}`
    ).then(r => r.json())

    setResults(data.results)

    // Track with all parameters
    trackSearch(query, {
      results_count: data.results.length,
      category: category !== 'all' ? category : undefined
    })
  }

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">Todos</option>
        <option value="blog">Blog</option>
        <option value="podcast">Podcast</option>
        <option value="services">Servicios</option>
      </select>
      <button onClick={handleSearch}>Buscar</button>

      <div>
        {results.map(result => (
          <div key={result.id}>{result.title}</div>
        ))}
      </div>
    </div>
  )
}
```

---

## Testing Events

### Development Mode

Events are logged to console in development:

```javascript
// Console output
[Analytics Event] newsletter_signup {
  category: 'engagement',
  label: 'Newsletter Signup',
  method: 'footer_form'
}
```

### Production Testing

1. **Build production**:
   ```bash
   npm run build
   npm start
   ```

2. **Use GA4 DebugView**:
   - Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger)
   - Enable extension
   - Open DebugView in GA4
   - Trigger events on site

3. **Network Tab**:
   - Open DevTools > Network
   - Filter: `google-analytics`
   - Watch for `collect` requests

---

## Best Practices

### 1. Track After Success ✅

```typescript
// ❌ Wrong - track before knowing result
trackContactFormSubmit()
await submitForm()

// ✅ Correct - track after success
const result = await submitForm()
if (result.ok) {
  trackContactFormSubmit()
}
```

### 2. Meaningful Event Names

```typescript
// ❌ Generic
trackClick('button', 'button')

// ✅ Specific
trackClick('cta_services_hero', 'button', '/services')
```

### 3. Consistent Naming

```typescript
// Use consistent parameter names
trackSearch(query, {
  results_count: count,  // ✅ Always use 'results_count'
  // Not 'resultCount', 'count', 'num_results'
})
```

### 4. Don't Track PII

```typescript
// ❌ Never track personal information
trackFormSubmit('contact', {
  email: user.email,  // ❌ PII
  name: user.name     // ❌ PII
})

// ✅ Track anonymized data
trackFormSubmit('contact', {
  service: formData.service,
  source: 'contact_page'
})
```

### 5. Handle Errors Gracefully

```typescript
// Wrap tracking in try-catch if needed
try {
  trackCustomEvent('complex_event', data)
} catch (error) {
  console.error('Analytics tracking failed:', error)
  // Don't break user experience
}
```

---

## Event Reference

### Quick Reference Table

| Event Name | Function | Key Event | Custom Dimensions |
|------------|----------|-----------|-------------------|
| newsletter_signup | `trackNewsletterSignup()` | ✅ Yes | method |
| search | `trackSearch()` | Optional | search_term, results_count, category |
| share | `trackShare()` | No | method, content_type, content_id |
| recommendation_click | `trackRecommendationClick()` | No | content_id, content_type |
| contact_form_submit | `trackContactFormSubmit()` | ✅ Yes | service_interest, source |
| form_submit | `trackFormSubmit()` | Optional | form_name, ...custom |
| click | `trackClick()` | No | element_type, destination |
| file_download | `trackDownload()` | No | file_name, file_type |
| outbound_link | `trackOutboundLink()` | No | destination, link_text |
| video_play/pause/complete | `trackVideo()` | No | video_title, video_current_time |
| scroll | `trackScrollDepth()` | No | scroll_depth |
| exception | `trackError()` | No | error_name, error_message |
| service_inquiry | `trackServiceInquiry()` | Optional | service_name |

---

## Additional Resources

- **Analytics Setup Guide**: `analytics-setup-guide.md`
- **SEO Audit**: `seo-audit-final.md`
- **Search Console Setup**: `google-search-console-setup.md`
- **Analytics Module**: `/src/lib/analytics.ts`
- **GA4 Documentation**: https://support.google.com/analytics/

---

**Document maintained by**: Development Team
**For**: DUO Soluciones Empresariales
**Sprint**: Sprint 5 - Wave 2 - Agent 4
