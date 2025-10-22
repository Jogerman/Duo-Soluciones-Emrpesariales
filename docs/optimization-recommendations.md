# Performance Optimization Recommendations
## DUO Soluciones Empresariales - Sprint 4

**Date:** October 22, 2025
**Priority System:** HIGH (0-2 days) | MEDIUM (3-7 days) | LOW (7+ days)
**Impact System:** HIGH (>20% improvement) | MEDIUM (10-20%) | LOW (<10%)

---

## Quick Reference

| # | Recommendation | Priority | Impact | Effort | ROI |
|---|---------------|----------|--------|--------|-----|
| 1 | Dynamic Import BlogPostContent | HIGH | HIGH | Medium | 95% |
| 2 | Convert Images to Next.js Image | HIGH | HIGH | Low | 90% |
| 3 | Add Bundle Analyzer | HIGH | HIGH | Low | 85% |
| 4 | Dynamic Import ContactForm | MEDIUM | MEDIUM | Low | 80% |
| 5 | Add Image Priority Props | MEDIUM | HIGH | Low | 85% |
| 6 | Implement Loading Skeletons | MEDIUM | MEDIUM | Medium | 70% |
| 7 | Dynamic Import Search Components | MEDIUM | MEDIUM | Low | 75% |
| 8 | Optimize Font Loading | MEDIUM | LOW | Low | 60% |
| 9 | Add Lazy Loading to Images | LOW | MEDIUM | Medium | 65% |
| 10 | Fix TypeScript Build Errors | LOW | LOW | High | 40% |

**Total Expected Improvement:** 35-45% reduction in initial bundle size, 20-30% improvement in LCP

---

## HIGH PRIORITY - Immediate Action Required

### 1. Dynamic Import for BlogPostContent Component

**Impact:** HIGH (Expected 300-500 KB reduction per blog page)
**Effort:** Medium (2-3 hours)
**Priority:** CRITICAL
**Expected ROI:** 95%

#### Problem
The `BlogPostContent` component uses `react-markdown` and `remark-gfm` which add ~300-500 KB to the blog post bundle. Currently, this is loaded eagerly on every blog page, even before the content is needed.

#### Current Code
**File:** `src/components/marketing/blog/BlogPostContent.tsx`
```typescript
'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function BlogPostContent({ content, className }: BlogPostContentProps) {
  return (
    <article className={...}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  )
}
```

**Usage:** `src/app/(marketing)/blog/[slug]/page.tsx`

#### Recommended Solution

**Step 1: Create a Loading Skeleton**

Create `src/components/marketing/blog/BlogPostSkeleton.tsx`:

```typescript
export function BlogPostSkeleton() {
  return (
    <article className="prose prose-lg max-w-none space-y-6">
      {/* Heading skeleton */}
      <div className="h-8 w-3/4 animate-pulse rounded bg-neutral-200" />

      {/* Paragraph skeletons */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-200" />
        </div>
      ))}
    </article>
  )
}
```

**Step 2: Update Blog Post Page with Dynamic Import**

Update `src/app/(marketing)/blog/[slug]/page.tsx`:

```typescript
import dynamic from 'next/dynamic'
import { BlogPostSkeleton } from '@/components/marketing/blog/BlogPostSkeleton'

// Dynamic import with loading state
const BlogPostContent = dynamic(
  () => import('@/components/marketing/blog/BlogPostContent').then(
    mod => ({ default: mod.BlogPostContent })
  ),
  {
    loading: () => <BlogPostSkeleton />,
    ssr: true // Still render on server for SEO
  }
)

export default function BlogPost({ params }: { params: { slug: string } }) {
  // ... existing code ...

  return (
    <div>
      {/* ... hero, meta, etc ... */}

      {/* Content now lazy loaded */}
      <BlogPostContent content={post.content} />

      {/* ... rest of page ... */}
    </div>
  )
}
```

#### Expected Results
- Initial bundle: Reduced by 300-500 KB
- Time to Interactive: Improved by 15-20%
- First Load JS for /blog/[slug]: Reduced from 171 KB to ~100-120 KB

#### Testing
1. Run `npm run build` and verify bundle size reduction
2. Test blog post pages load correctly
3. Verify SEO content is still rendered server-side
4. Check loading skeleton appears briefly on slow connections

---

### 2. Convert Native Images to Next.js Image Component

**Impact:** HIGH (15-25% LCP improvement)
**Effort:** Low (30-60 minutes)
**Priority:** HIGH
**Expected ROI:** 90%

#### Problem
Two components use native `<img>` tags instead of the optimized Next.js `Image` component, resulting in:
- No automatic image optimization
- No responsive image generation
- No lazy loading by default
- Higher LCP scores
- Increased bandwidth usage

#### Issues Identified

##### Issue 2.1: TeamGrid Component

**File:** `src/components/marketing/about/TeamGrid.tsx`
**Line:** 70

**Current Code:**
```typescript
{member.image ? (
  <img
    src={member.image}
    alt={member.name}
    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
  />
) : (
  // ... fallback ...
)}
```

**Recommended Fix:**
```typescript
import Image from 'next/image'

{member.image ? (
  <div className="relative h-full w-full">
    <Image
      src={member.image}
      alt={member.name}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      quality={85}
      loading={index < 3 ? 'eager' : 'lazy'} // First 3 eager, rest lazy
    />
  </div>
) : (
  // ... fallback ...
)}
```

**Note:** Add `index` to the props of `TeamMemberCard` to determine loading strategy.

##### Issue 2.2: TestimonialsCarousel Component

**File:** `src/components/marketing/testimonials/TestimonialsCarousel.tsx`
**Line:** 86

**Current Code:**
```typescript
{currentTestimonial.image && (
  <img
    src={currentTestimonial.image}
    alt={currentTestimonial.clientName}
    className="h-16 w-16 rounded-full object-cover ring-4 ring-primary-100"
  />
)}
```

**Recommended Fix:**
```typescript
import Image from 'next/image'

{currentTestimonial.image && (
  <div className="relative h-16 w-16">
    <Image
      src={currentTestimonial.image}
      alt={currentTestimonial.clientName}
      width={64}
      height={64}
      className="rounded-full object-cover ring-4 ring-primary-100"
      quality={90}
      loading="lazy" // Carousel images below fold
    />
  </div>
)}
```

#### Implementation Steps

1. **Update TeamGrid.tsx:**
   ```bash
   # Edit the file
   # Add Image import
   # Replace <img> with <Image>
   # Add responsive sizes
   # Implement conditional loading
   ```

2. **Update TestimonialsCarousel.tsx:**
   ```bash
   # Edit the file
   # Add Image import
   # Replace <img> with <Image>
   # Set explicit dimensions
   ```

3. **Test Changes:**
   ```bash
   npm run dev
   # Visit /about page - check team photos
   # Visit homepage - check testimonials
   # Verify images load and display correctly
   ```

4. **Verify Build:**
   ```bash
   npm run build
   # Should have no image warnings
   ```

#### Expected Results
- LCP improvement: 15-25%
- Bandwidth savings: 30-50% (due to WebP/AVIF conversion)
- Build warnings: Reduced from 2 to 0
- Lighthouse score: +5-10 points

---

### 3. Add Bundle Analyzer

**Impact:** HIGH (Enables data-driven optimization)
**Effort:** Low (15-30 minutes)
**Priority:** HIGH
**Expected ROI:** 85%

#### Problem
Without bundle analysis, it's difficult to:
- Identify what's inside the 545 KB chunk
- Find duplicate dependencies
- Discover optimization opportunities
- Track bundle size over time

#### Solution

**Step 1: Install Bundle Analyzer**

```bash
npm install --save-dev @next/bundle-analyzer
```

**Step 2: Update next.config.ts**

```typescript
import type { NextConfig } from 'next'

// Bundle analyzer setup
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // ... existing config ...
}

export default withBundleAnalyzer(nextConfig)
```

**Step 3: Add NPM Script**

Update `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:analyze": "ANALYZE=true next build",
    "start": "next start",
    // ... other scripts ...
  }
}
```

**Step 4: Run Analysis**

```bash
npm run build:analyze
```

This will:
1. Build the application
2. Generate bundle analysis
3. Open interactive visualization in browser
4. Show detailed breakdown of all chunks

#### Using the Analyzer

**What to Look For:**

1. **Large Dependencies:**
   - Hover over chunks to see size
   - Identify unexpectedly large libraries
   - Find duplicate dependencies

2. **Optimization Opportunities:**
   - Libraries that can be lazy loaded
   - Unused code that can be removed
   - Dependencies that can be replaced with lighter alternatives

3. **Chunk Distribution:**
   - Verify route-based splitting
   - Check shared chunk size
   - Identify chunks that should be split further

#### Expected Results
- Visual breakdown of all bundles
- Identification of the 545 KB chunk contents
- Discovery of optimization opportunities
- Baseline for tracking future improvements

#### Next Actions After Analysis
Based on analyzer results, you may discover:
- Specific dependencies to lazy load
- Unused dependencies to remove
- Opportunities for code splitting
- Duplicate code that can be deduplicated

---

## MEDIUM PRIORITY - Next Sprint

### 4. Dynamic Import for ContactForm

**Impact:** MEDIUM (Expected 100-150 KB reduction)
**Effort:** Low (1-2 hours)
**Priority:** MEDIUM
**Expected ROI:** 80%

#### Problem
Contact form uses `react-hook-form` and `zod` validation, adding significant weight to the contact page bundle.

#### Solution

**Step 1: Create Loading Skeleton**

Create `src/components/forms/ContactFormSkeleton.tsx`:

```typescript
export function ContactFormSkeleton() {
  return (
    <div className="space-y-6">
      {/* Form fields skeleton */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />
          <div className="h-12 w-full animate-pulse rounded-lg bg-neutral-200" />
        </div>
      ))}

      {/* Submit button skeleton */}
      <div className="h-12 w-full animate-pulse rounded-lg bg-primary-200" />
    </div>
  )
}
```

**Step 2: Update Contact Page**

Update `src/app/(marketing)/contact/page.tsx`:

```typescript
import dynamic from 'next/dynamic'
import { ContactFormSkeleton } from '@/components/forms/ContactFormSkeleton'

const ContactForm = dynamic(
  () => import('@/components/forms/ContactForm').then(
    mod => ({ default: mod.ContactForm })
  ),
  {
    loading: () => <ContactFormSkeleton />,
    ssr: false // Form doesn't need SSR
  }
)

export default function ContactPage() {
  return (
    <div>
      {/* ... page content ... */}
      <ContactForm />
    </div>
  )
}
```

#### Expected Results
- Contact page bundle: Reduced by 100-150 KB
- First Load JS for /contact: Reduced from 139 KB to ~90-110 KB
- Form still fully functional
- Better initial page load

---

### 5. Add Priority Property to Hero Images

**Impact:** HIGH (10-15% LCP improvement)
**Effort:** Low (15-30 minutes)
**Priority:** MEDIUM
**Expected ROI:** 85%

#### Problem
Hero images are critical for LCP but aren't marked as priority, causing them to load with normal priority and potentially delaying LCP.

#### Solution

**Identify Hero Images:**

1. Homepage hero: `src/components/marketing/hero/HeroSection.tsx`
2. About page hero
3. Services page hero
4. Blog/Podcast hero images

**Implementation:**

For each hero image using Next.js Image component, add `priority={true}`:

```typescript
// Before
<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={1200}
  height={630}
/>

// After
<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={1200}
  height={630}
  priority={true}  // Add this
/>
```

#### Expected Results
- LCP improvement: 10-15%
- Hero images load immediately
- No lazy loading delay for above-fold images
- Better perceived performance

---

### 6. Implement Loading Skeletons for Async Content

**Impact:** MEDIUM (Better perceived performance)
**Effort:** Medium (3-5 hours)
**Priority:** MEDIUM
**Expected ROI:** 70%

#### Problem
When content loads asynchronously, users see blank spaces or layout shifts, creating a poor user experience.

#### Solution

**Components Needing Skeletons:**

1. **Blog Post List** (`src/app/(marketing)/blog/page.tsx`)
2. **Podcast Episode List** (`src/app/(marketing)/podcast/page.tsx`)
3. **Search Results** (`src/components/marketing/search/SearchResults.tsx`)
4. **Recommended Content** (already has lazy loading)
5. **Newsletter Form** (on submit)

**Example Implementation:**

Create `src/components/ui/Skeletons.tsx`:

```typescript
export function BlogCardSkeleton() {
  return (
    <div className="rounded-lg border border-neutral-200 p-6">
      {/* Image skeleton */}
      <div className="aspect-video w-full animate-pulse rounded bg-neutral-200" />

      {/* Content skeleton */}
      <div className="mt-4 space-y-3">
        <div className="h-6 w-3/4 animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-neutral-200" />

        {/* Meta skeleton */}
        <div className="mt-4 flex gap-4">
          <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />
        </div>
      </div>
    </div>
  )
}

export function PodcastCardSkeleton() {
  // Similar structure for podcast cards
}

export function SearchResultSkeleton() {
  // Similar structure for search results
}
```

**Usage in Pages:**

```typescript
// In blog page
{isLoading ? (
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <BlogCardSkeleton key={i} />
    ))}
  </div>
) : (
  <BlogGrid posts={posts} />
)}
```

#### Expected Results
- Better perceived performance
- No layout shift (CLS improvement)
- Professional loading states
- Improved user experience

---

### 7. Dynamic Import for Search Components

**Impact:** MEDIUM (Expected 50-100 KB reduction)
**Effort:** Low (1-2 hours)
**Priority:** MEDIUM
**Expected ROI:** 75%

#### Problem
Search functionality is only needed on the search page but contributes to the bundle size of pages that include the global search component.

#### Solution

**Step 1: Lazy Load GlobalSearch in Header**

Update `src/components/layout/Header.tsx`:

```typescript
import dynamic from 'next/dynamic'

// Lazy load search with no SSR (client-only)
const GlobalSearch = dynamic(
  () => import('@/components/marketing/search/GlobalSearch').then(
    mod => ({ default: mod.GlobalSearch })
  ),
  {
    ssr: false,
    loading: () => (
      <button className="flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-600">
        <SearchIcon className="h-4 w-4" />
        Buscar...
      </button>
    )
  }
)
```

**Step 2: Consider Search Dialog Pattern**

Instead of loading search on every page, consider:
- Loading search only when button is clicked
- Using a dialog/modal pattern
- Implementing instant search only on search page

```typescript
'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const SearchDialog = dynamic(
  () => import('@/components/marketing/search/SearchDialog'),
  { ssr: false }
)

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header>
      {/* ... */}
      <button onClick={() => setSearchOpen(true)}>
        Search
      </button>

      {/* Only loads when opened */}
      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
    </header>
  )
}
```

#### Expected Results
- Reduced bundle on non-search pages
- Search still instantly available when needed
- Better code splitting

---

### 8. Optimize Font Loading

**Impact:** LOW-MEDIUM (5-10% FCP improvement)
**Effort:** Low (30-60 minutes)
**Priority:** MEDIUM
**Expected ROI:** 60%

#### Problem
Font loading can cause FOUT (Flash of Unstyled Text) or FOIT (Flash of Invisible Text), impacting FCP and perceived performance.

#### Current Configuration

```typescript
// src/app/layout.tsx
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap', // ✓ Good
  variable: '--font-poppins',
})
```

#### Recommendations

**1. Reduce Font Weights:**

Analyze which weights are actually used:
- Likely only need: 400 (normal), 600 (semibold), 700 (bold)
- Remove unused: 300, 500

```typescript
const poppins = Poppins({
  weight: ['400', '600', '700'], // Reduced from 5 to 3
  subsets: ['latin'], // Remove 'latin-ext' if not needed
  display: 'swap',
  variable: '--font-poppins',
  preload: true, // Preload font
  adjustFontFallback: true, // Reduce layout shift
})
```

**2. Add Font Fallback System:**

Update `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    fontFamily: {
      sans: ['var(--font-poppins)', 'system-ui', '-apple-system', 'sans-serif'],
    },
  },
}
```

**3. Consider Variable Fonts:**

If available, use variable font version of Poppins:

```typescript
import { Poppins_Variable } from 'next/font/google'

const poppins = Poppins_Variable({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})
```

#### Expected Results
- Faster font loading
- Reduced CLS from font loading
- Smaller font file size
- Better FCP score

---

## LOW PRIORITY - Technical Debt

### 9. Add Explicit Lazy Loading to Below-Fold Images

**Impact:** MEDIUM (10-15% bandwidth savings)
**Effort:** Medium (2-3 hours)
**Priority:** LOW
**Expected ROI:** 65%

#### Problem
While Next.js Image has automatic lazy loading, explicit loading strategies ensure optimal loading patterns.

#### Solution

**Identify Below-Fold Images:**

1. Blog post cards (after 3rd post)
2. Team members (after 3rd member)
3. Related posts
4. Testimonials (not current)
5. Service cards (after 2nd card)

**Implementation Pattern:**

```typescript
// For lists/grids
{items.map((item, index) => (
  <Image
    key={item.id}
    src={item.image}
    loading={index < 3 ? 'eager' : 'lazy'}
    priority={index === 0} // Only first image
    // ... other props
  />
))}

// For below-fold sections
<Image
  src="/testimonial.jpg"
  loading="lazy"
  // ... other props
/>
```

#### Expected Results
- Reduced initial bandwidth
- Faster initial page load
- Better mobile performance
- Maintained user experience

---

### 10. Fix TypeScript Build Errors

**Impact:** LOW (Code quality)
**Effort:** High (1-2 days)
**Priority:** LOW
**Expected ROI:** 40%

#### Problem
Build configuration ignores TypeScript errors:

```typescript
// next.config.ts
typescript: {
  ignoreBuildErrors: true  // ⚠ Bad practice
}
```

#### Solution

**Phase 1: Enable Type Checking (Strict Mode)**

```typescript
typescript: {
  ignoreBuildErrors: false
}
```

**Phase 2: Fix Errors Systematically**

1. **Drizzle Adapter Type Errors**
   - Root cause: @auth/drizzle-adapter version mismatch
   - Solution: Update to compatible version or add type declarations

2. **Component Type Errors**
   - Fix empty interfaces
   - Add proper type annotations
   - Remove unsafe `any` types

3. **Mock Data Unused Variables**
   - Remove or prefix with underscore

**Phase 3: Prevent Future Errors**

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

#### Expected Results
- Better type safety
- Catch errors at build time
- Improved IDE experience
- Reduced runtime errors

**Note:** This is marked LOW priority because it doesn't affect runtime performance, but should be addressed for code quality.

---

## Implementation Roadmap

### Week 1 (Immediate - HIGH Priority)

**Day 1-2:**
- ✓ Fix Search page Suspense (DONE)
- Implement #2: Convert native images to Next.js Image
- Implement #3: Add bundle analyzer

**Day 3-4:**
- Implement #1: Dynamic import for BlogPostContent
- Run bundle analysis
- Measure performance improvements

**Day 5:**
- Testing and verification
- Document results
- Plan next phase

**Expected Impact:** 25-35% improvement in key metrics

### Week 2 (Short-term - MEDIUM Priority)

**Day 6-7:**
- Implement #4: Dynamic import ContactForm
- Implement #5: Add priority to hero images

**Day 8-9:**
- Implement #6: Loading skeletons
- Implement #7: Dynamic import search components

**Day 10:**
- Implement #8: Optimize font loading
- Testing and verification

**Expected Impact:** Additional 10-15% improvement

### Week 3+ (Long-term - LOW Priority)

- Implement #9: Explicit lazy loading
- Implement #10: Fix TypeScript errors
- Advanced optimizations
- Monitoring and refinement

---

## Measuring Success

### Before Optimization (Baseline)

| Metric | Current Value |
|--------|--------------|
| Largest Bundle | 545 KB |
| Home First Load | 308 KB |
| Blog First Load | 171 KB |
| Build Time | ~6.2s |
| Image Warnings | 2 |
| Lighthouse Score | ~83 (estimated) |

### After Optimization (Target)

| Metric | Target Value | Improvement |
|--------|-------------|-------------|
| Largest Bundle | <400 KB | 26% reduction |
| Home First Load | <250 KB | 19% reduction |
| Blog First Load | <120 KB | 30% reduction |
| Build Time | ~5.5s | 11% faster |
| Image Warnings | 0 | 100% resolved |
| Lighthouse Score | >90 | 8% improvement |

### Key Performance Indicators (KPIs)

1. **Bundle Size:** Target 25-30% reduction
2. **First Load JS:** Target 20-25% reduction on key pages
3. **LCP:** Target <2.0s (improvement from ~2.5s)
4. **TTI:** Target <3.0s (improvement from ~4.0s)
5. **Lighthouse Score:** Target >90 (improvement from ~83)

### Monitoring Tools

1. **Build Analysis:**
   ```bash
   npm run build:analyze
   ```

2. **Lighthouse CI:**
   ```bash
   # Add to CI/CD pipeline
   npx lighthouse https://duosoluciones.com --output=json
   ```

3. **Real User Monitoring (RUM):**
   - Google Analytics 4 (already configured)
   - Core Web Vitals tracking
   - Custom performance marks

---

## Quick Implementation Checklist

Use this checklist to track implementation:

### HIGH Priority
- [ ] #1: Dynamic import BlogPostContent
  - [ ] Create BlogPostSkeleton component
  - [ ] Update blog post page with dynamic import
  - [ ] Test and verify
  - [ ] Measure bundle size reduction

- [ ] #2: Convert images to Next.js Image
  - [ ] Update TeamGrid.tsx
  - [ ] Update TestimonialsCarousel.tsx
  - [ ] Test image loading
  - [ ] Verify no build warnings

- [ ] #3: Add bundle analyzer
  - [ ] Install @next/bundle-analyzer
  - [ ] Update next.config.ts
  - [ ] Add build:analyze script
  - [ ] Run analysis and document findings

### MEDIUM Priority
- [ ] #4: Dynamic import ContactForm
- [ ] #5: Add priority to hero images
- [ ] #6: Implement loading skeletons
- [ ] #7: Dynamic import search components
- [ ] #8: Optimize font loading

### LOW Priority
- [ ] #9: Add explicit lazy loading
- [ ] #10: Fix TypeScript errors

---

## Testing Procedures

### Performance Testing

**1. Build Testing:**
```bash
# Clean build
rm -rf .next
npm run build

# Analyze output
npm run build:analyze

# Verify bundle sizes
ls -lh .next/static/chunks/*.js
```

**2. Local Testing:**
```bash
# Test production build locally
npm run build
npm run start

# Open in browser and test:
# - Page load times
# - Image loading
# - Form interactions
# - Search functionality
```

**3. Lighthouse Testing:**
```bash
# Desktop
lighthouse http://localhost:3000 --preset=desktop --output=html --output-path=./reports/lighthouse-desktop.html

# Mobile
lighthouse http://localhost:3000 --preset=mobile --output=html --output-path=./reports/lighthouse-mobile.html
```

**4. Network Testing:**
- Test on Fast 3G network (Chrome DevTools)
- Test on Slow 3G network
- Test with cache disabled
- Test with cache enabled

### Functional Testing

**1. Visual Regression:**
- Homepage loads correctly
- All images display properly
- No layout shifts
- Loading states appear and disappear correctly

**2. Interaction Testing:**
- Forms submit successfully
- Search works as expected
- Navigation functions properly
- Links work correctly

**3. Cross-Browser Testing:**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (if available)
- Mobile browsers

---

## Rollback Procedures

If any optimization causes issues:

**1. Immediate Rollback:**
```bash
git revert <commit-hash>
npm run build
npm run start
```

**2. Partial Rollback:**
```bash
# Revert specific file
git checkout HEAD^ -- path/to/file
npm run build
```

**3. Emergency Rollback:**
```bash
# Revert to previous working state
git reset --hard <previous-commit>
npm run build
npm run start
```

**Note:** Always test in development/staging before deploying to production.

---

## Support & Resources

### Documentation
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Dynamic Imports](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading)
- [Next.js Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Core Web Vitals](https://web.dev/vitals/)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

---

## Appendix A: Code Templates

### Dynamic Import Template

```typescript
import dynamic from 'next/dynamic'
import { ComponentSkeleton } from './ComponentSkeleton'

const Component = dynamic(
  () => import('./Component').then(mod => ({ default: mod.Component })),
  {
    loading: () => <ComponentSkeleton />,
    ssr: true // or false, depending on needs
  }
)
```

### Image Optimization Template

```typescript
import Image from 'next/image'

<Image
  src="/path/to/image.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  // OR use fill for responsive
  // fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={85}
  priority={false} // true for LCP images
  loading="lazy" // or "eager"
  className="..."
/>
```

### Loading Skeleton Template

```typescript
export function ComponentSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-4 w-3/4 rounded bg-neutral-200" />
          <div className="mt-2 h-4 w-1/2 rounded bg-neutral-200" />
        </div>
      ))}
    </div>
  )
}
```

---

## Appendix B: Performance Budget

Establish and enforce performance budgets:

```json
// performance-budget.json
{
  "budgets": [
    {
      "route": "/",
      "javascript": "250kb",
      "images": "500kb",
      "total": "1000kb"
    },
    {
      "route": "/blog/*",
      "javascript": "200kb",
      "images": "800kb",
      "total": "1200kb"
    },
    {
      "route": "/*",
      "javascript": "200kb",
      "images": "600kb",
      "total": "1000kb"
    }
  ]
}
```

---

**Document Version:** 1.0
**Last Updated:** October 22, 2025
**Maintained By:** Performance Team

---

**End of Optimization Recommendations**
