# Quick Integration Guide - Content Recommendation System

## 3-Step Integration

### Step 1: Import Components

```tsx
import {
  RecommendedContent,
  TrendingContent
} from '@/components/marketing/recommendations'
```

### Step 2: Get Data

```tsx
import { getAllBlogPosts } from '@/lib/mock-data/blog-posts'
import { getAllPodcastEpisodes } from '@/lib/mock-data/podcast-episodes'

const blogPosts = getAllBlogPosts()
const podcastEpisodes = getAllPodcastEpisodes()
```

### Step 3: Add to Pages

#### Blog Detail Page
```tsx
<RecommendedContent
  sourceContent={currentBlogPost}
  blogPosts={blogPosts}
  podcastEpisodes={podcastEpisodes}
  maxResults={6}
/>
```

#### Podcast Detail Page
```tsx
<RecommendedContent
  sourceContent={currentPodcastEpisode}
  blogPosts={blogPosts}
  podcastEpisodes={podcastEpisodes}
  maxResults={6}
/>
```

#### Homepage
```tsx
<TrendingContent
  blogPosts={blogPosts}
  podcastEpisodes={podcastEpisodes}
  maxResults={6}
/>
```

## Complete Example

### Blog Post Page with Analytics

```tsx
'use client'

import { useEffect } from 'react'
import { notFound } from 'next/navigation'
import { RecommendedContent } from '@/components/marketing/recommendations'
import { trackContentView } from '@/lib/analytics/content-analytics'
import {
  getBlogPostBySlug,
  getAllBlogPosts
} from '@/lib/mock-data/blog-posts'
import { getAllPodcastEpisodes } from '@/lib/mock-data/podcast-episodes'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)
  const allPosts = getAllBlogPosts()
  const allEpisodes = getAllPodcastEpisodes()

  useEffect(() => {
    if (post) {
      trackContentView(post.id, 'blog', post.title)
    }
  }, [post])

  if (!post) notFound()

  return (
    <main>
      {/* Your blog post content */}
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

      {/* Recommendations */}
      <RecommendedContent
        sourceContent={post}
        blogPosts={allPosts}
        podcastEpisodes={allEpisodes}
        maxResults={6}
        mixContentTypes={true}
        title="También te podría interesar"
        description="Contenido relacionado basado en tus intereses"
      />
    </main>
  )
}
```

## That's it!

The recommendation system is now fully integrated and will:
- ✅ Show personalized recommendations
- ✅ Track user views
- ✅ Display trending content
- ✅ Work responsively on all devices

For more details, see `RECOMMENDATION_SYSTEM_SUMMARY.md` and `src/components/marketing/recommendations/README.md`
