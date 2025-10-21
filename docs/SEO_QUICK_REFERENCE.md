# SEO Quick Reference Guide

**Quick start guide for developers implementing blog posts and podcast episodes.**

---

## TL;DR - What You Need to Know

1. **Sitemap**: Automatically includes all blog/podcast routes ✅
2. **Schemas**: Use utility functions to generate JSON-LD ✅
3. **Metadata**: Use generators for Next.js Metadata ✅
4. **Breadcrumbs**: Add component to pages ✅
5. **Images**: 1200x630px with alt text ✅

---

## Blog Post Page Template

```typescript
// app/blog/[slug]/page.tsx
import { Metadata } from 'next'
import { getBlogPostBySlug } from '@/lib/mock-data/blog-posts'
import {
  generateBlogPostMetadata,
  generateBlogArticleSchema,
  generateStructuredDataScript,
} from '@/lib/seo'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

// Generate metadata for SEO
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }
  return generateBlogPostMetadata(post)
}

// Page component
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return <div>Post not found</div>
  }

  // Generate JSON-LD schema
  const articleSchema = generateBlogArticleSchema(post)

  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateStructuredDataScript(articleSchema)}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Page Content */}
      <article>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  )
}
```

---

## Podcast Episode Page Template

```typescript
// app/podcast/[slug]/page.tsx
import { Metadata } from 'next'
import { getPodcastEpisodeBySlug } from '@/lib/mock-data/podcast-episodes'
import {
  generatePodcastEpisodeMetadata,
  generatePodcastEpisodeSchema,
  generateStructuredDataScript,
} from '@/lib/seo'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

// Generate metadata for SEO
export async function generateMetadata({ params }): Promise<Metadata> {
  const episode = getPodcastEpisodeBySlug(params.slug)
  if (!episode) return { title: 'Episode Not Found' }
  return generatePodcastEpisodeMetadata(episode)
}

// Page component
export default function PodcastEpisodePage({ params }: { params: { slug: string } }) {
  const episode = getPodcastEpisodeBySlug(params.slug)

  if (!episode) {
    return <div>Episode not found</div>
  }

  // Generate JSON-LD schema
  const episodeSchema = generatePodcastEpisodeSchema(episode)

  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={generateStructuredDataScript(episodeSchema)}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Page Content */}
      <div>
        <h1>{episode.title}</h1>
        <p>{episode.description}</p>
        <audio src={episode.audioUrl} controls />
      </div>
    </>
  )
}
```

---

## Listing Page Templates

### Blog Listing

```typescript
// app/blog/page.tsx
import { Metadata } from 'next'
import { generateBlogListingMetadata } from '@/lib/seo'
import { getAllBlogPosts } from '@/lib/mock-data/blog-posts'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

export const metadata: Metadata = generateBlogListingMetadata()

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <>
      <Breadcrumbs />
      <h1>Blog</h1>
      <div>
        {posts.map(post => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </div>
    </>
  )
}
```

### Podcast Listing

```typescript
// app/podcast/page.tsx
import { Metadata } from 'next'
import { generatePodcastListingMetadata } from '@/lib/seo'
import { getAllPodcastEpisodes } from '@/lib/mock-data/podcast-episodes'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

export const metadata: Metadata = generatePodcastListingMetadata()

export default function PodcastPage() {
  const episodes = getAllPodcastEpisodes()

  return (
    <>
      <Breadcrumbs />
      <h1>Podcast DUO</h1>
      <div>
        {episodes.map(episode => (
          <article key={episode.id}>
            <h2>{episode.title}</h2>
            <p>{episode.description}</p>
          </article>
        ))}
      </div>
    </>
  )
}
```

---

## Common Tasks

### Calculate Reading Time

```typescript
import { calculateReadingTime } from '@/lib/seo'

const content = 'Long blog post content...'
const readingTime = calculateReadingTime(content) // Returns: 8 (minutes)
```

### Generate Excerpt

```typescript
import { generateExcerpt } from '@/lib/seo'

const content = 'Very long content with markdown...'
const excerpt = generateExcerpt(content, 160) // Max 160 chars
```

### Format Podcast Duration

```typescript
import { formatDuration } from '@/lib/seo'

const seconds = 2850 // 47 minutes 30 seconds
const formatted = formatDuration(seconds) // Returns: "47:30"
```

### Validate SEO Metadata

```typescript
import { validateSEOMetadata } from '@/lib/seo'

const errors = validateSEOMetadata({
  title: 'My Title',
  description: 'My description',
  keywords: ['keyword1', 'keyword2'],
  image: '/images/featured.jpg',
})

if (errors.length > 0) {
  console.error('SEO Issues:', errors)
}
```

---

## Breadcrumbs Usage

### Auto-generated (Recommended)

```typescript
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

// Automatically generates from URL path
<Breadcrumbs />
```

### With Custom Labels

```typescript
<Breadcrumbs
  customLabels={{
    'implementacion-erp': 'Implementación ERP',
    'custom-slug': 'Custom Title'
  }}
/>
```

### Preset Builders

```typescript
import {
  buildBlogPostBreadcrumbs,
  buildPodcastEpisodeBreadcrumbs,
} from '@/components/seo/Breadcrumbs'

const breadcrumbItems = buildBlogPostBreadcrumbs(
  'Sistemas ERP', // category name
  'sistemas-erp', // category slug
  'Cómo implementar ERP', // post title
  'como-implementar-erp' // post slug
)
```

---

## Testing Checklist

Before deploying:

1. **Test in Rich Results Tool**

   ```
   https://search.google.com/test/rich-results
   ```

2. **Validate Schema**

   ```
   https://validator.schema.org/
   ```

3. **Check Sitemap**

   ```
   http://localhost:3000/sitemap.xml
   ```

4. **Verify Metadata**
   - View page source
   - Look for `<meta>` tags
   - Check Open Graph tags
   - Verify JSON-LD script

5. **Test Social Sharing**
   - Facebook Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

---

## File Locations

```
src/
├── app/
│   ├── sitemap.ts                    # Dynamic sitemap (UPDATED)
│   └── robots.ts                     # Robots.txt config
├── components/
│   └── seo/
│       └── Breadcrumbs.tsx           # Breadcrumbs component (UPDATED)
├── lib/
│   ├── seo.ts                        # Main SEO config (existing)
│   └── seo/
│       ├── index.ts                  # Central exports (NEW)
│       ├── schemas.ts                # JSON-LD schemas (NEW)
│       └── utils.ts                  # Metadata generators (NEW)
└── types/
    └── content.ts                    # Type definitions

docs/
├── seo-content-checklist.md         # Content creation checklist (NEW)
├── SEO_IMPLEMENTATION_SUMMARY.md    # Full implementation docs (NEW)
└── SEO_QUICK_REFERENCE.md           # This file (NEW)
```

---

## Import Paths

### All-in-one Import

```typescript
import {
  // Schemas
  generateBlogArticleSchema,
  generatePodcastEpisodeSchema,
  generateBreadcrumbSchema,
  generateStructuredDataScript,
  combineSchemas,

  // Metadata Generators
  generateBlogPostMetadata,
  generatePodcastEpisodeMetadata,
  generateBlogListingMetadata,
  generatePodcastListingMetadata,

  // Utilities
  calculateReadingTime,
  estimateWordCount,
  formatDuration,
  generateExcerpt,
  validateSEOMetadata,
  getCanonicalUrl,
  getAbsoluteImageUrl,

  // Config
  SITE_CONFIG,
  generateSEO,
} from '@/lib/seo'
```

### Component Imports

```typescript
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
```

### Data Imports

```typescript
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/mock-data/blog-posts'
import { getAllPodcastEpisodes, getPodcastEpisodeBySlug } from '@/lib/mock-data/podcast-episodes'
```

---

## SEO Data Requirements

### Blog Post (BlogPost type)

```typescript
{
  id: string
  title: string                    // 50-60 chars
  slug: string                     // URL-friendly
  excerpt: string                  // 150-160 chars
  content: string                  // 1000+ words
  coverImage: string               // 1200x630px
  author: Author                   // With name, role
  category: Category               // With name, slug
  tags: Tag[]                      // 3-7 tags
  publishedAt: string              // ISO 8601
  updatedAt?: string               // ISO 8601
  readingTime: number              // Minutes
  seo?: {
    metaTitle?: string             // Override title
    metaDescription?: string       // Override description
    keywords?: string[]            // Override keywords
  }
}
```

### Podcast Episode (PodcastEpisode type)

```typescript
{
  id: string
  title: string                    // 50-60 chars
  slug: string                     // URL-friendly
  description: string              // 150-200 chars
  coverImage: string               // 1200x630px
  audioUrl: string                 // Audio file URL
  duration: number                 // Seconds
  publishedAt: string              // ISO 8601
  season?: number
  episode: number
  hosts: Author[]                  // Array of hosts
  guests?: PodcastGuest[]          // Optional guests
  category: Category
  tags: Tag[]                      // 3-7 tags
  transcript?: string              // Full transcript
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
}
```

---

## Performance Tips

1. **Image Optimization**
   - Use Next/Image component
   - WebP format preferred
   - Lazy load below fold
   - Compress to <200KB

2. **JSON-LD**
   - Inline scripts (not external)
   - Minimal data (no bloat)
   - Single script tag per schema

3. **Metadata**
   - Generate at build time
   - Cache when possible
   - Use static metadata for listing pages

---

## Troubleshooting

### Schema Not Showing in Rich Results

1. Check JSON syntax (no errors in console)
2. Verify all required fields present
3. Wait 24-48 hours for Google to recrawl
4. Use "Request Indexing" in Search Console

### Metadata Not Appearing

1. Clear browser cache
2. Check page source (not React DevTools)
3. Verify metadata function exports correctly
4. Check for duplicate metadata definitions

### Breadcrumbs Not Rendering

1. Ensure component is client-side ('use client')
2. Check pathname is not '/'
3. Verify imports are correct
4. Look for console errors

---

## Need Help?

- **Full Documentation**: `docs/SEO_IMPLEMENTATION_SUMMARY.md`
- **Content Checklist**: `docs/seo-content-checklist.md`
- **Code Examples**: This file
- **Type Definitions**: `src/types/content.ts`
- **Implementation**: `src/lib/seo/` directory

---

**Last Updated**: October 20, 2025
**Version**: 1.0
