# Content Recommendation System

Intelligent content recommendation system for DUO Soluciones Empresariales.

## Features

- **Multi-factor recommendation algorithm** with configurable weights
- **Personalization** based on view history (localStorage)
- **Privacy-friendly** analytics without external tracking
- **Content diversity** rules to ensure varied recommendations
- **Responsive design** with skeleton loaders
- **Performance optimized** with memoization

## Components

### RecommendedContent

Displays "You might also like" section with related content.

#### Usage

```tsx
import { RecommendedContent } from '@/components/marketing/recommendations'
import { blogPosts } from '@/lib/mock-data/blog-posts'
import { podcastEpisodes } from '@/lib/mock-data/podcast-episodes'

// In a blog post detail page
<RecommendedContent
  sourceContent={currentBlogPost}
  blogPosts={blogPosts}
  podcastEpisodes={podcastEpisodes}
  maxResults={6}
  mixContentTypes={true}
  title="También te podría interesar"
  description="Contenido relacionado basado en tus intereses"
/>

// In a podcast episode detail page
<RecommendedContent
  sourceContent={currentPodcastEpisode}
  blogPosts={blogPosts}
  podcastEpisodes={podcastEpisodes}
  maxResults={6}
  mixContentTypes={true}
/>
```

#### Props

- `sourceContent`: BlogPost | PodcastEpisode (required) - The content to base recommendations on
- `blogPosts`: BlogPost[] - Pool of blog posts to recommend from
- `podcastEpisodes`: PodcastEpisode[] - Pool of podcast episodes to recommend from
- `maxResults`: number - Maximum number of recommendations (default: 6)
- `title`: string - Section title (default: "También te podría interesar")
- `description`: string - Section description (optional)
- `mixContentTypes`: boolean - Whether to mix blog posts and podcasts (default: true)
- `className`: string - Additional CSS classes (optional)

### TrendingContent

Displays trending content on homepage.

#### Usage

```tsx
import { TrendingContent } from '@/components/marketing/recommendations'
import { blogPosts } from '@/lib/mock-data/blog-posts'
import { podcastEpisodes } from '@/lib/mock-data/podcast-episodes'

// In homepage
<TrendingContent
  blogPosts={blogPosts}
  podcastEpisodes={podcastEpisodes}
  maxResults={6}
  title="Contenido en Tendencia"
  description="Lo más popular esta semana"
  showCarousel={false}
/>

// Compact version for sidebar
<TrendingContentCompact
  blogPosts={blogPosts}
  podcastEpisodes={podcastEpisodes}
  maxResults={3}
/>
```

#### Props

- `blogPosts`: BlogPost[] (required) - Pool of blog posts
- `podcastEpisodes`: PodcastEpisode[] (required) - Pool of podcast episodes
- `maxResults`: number - Maximum number of trending items (default: 6)
- `title`: string - Section title (default: "Contenido en Tendencia")
- `description`: string - Section description (default: "Lo más popular esta semana")
- `showCarousel`: boolean - Enable carousel mode (default: false)
- `className`: string - Additional CSS classes (optional)

## Recommendation Algorithm

### Scoring Factors

The algorithm uses multiple factors to calculate similarity scores:

| Factor | Weight | Description |
|--------|--------|-------------|
| Same category | 3.0 | Content in the same category |
| Shared tags | 2.0 per tag | Each matching tag adds to score |
| Same author | 1.5 | Content by the same author |
| Similar duration | 1.0 | Similar reading time/duration |
| Recent popularity | 2.0 | Published in last 30 days |
| User history | 1.0 | User viewed similar content |

### Example

For a blog post about "ERP Implementation":
- Category "Sistemas ERP": +3 points per match
- Tags ["ERP", "Software"]: +2 points per matching tag
- Same author: +1.5 points
- Similar reading time (±3 min): +1 point
- Popular (>100 views): +2 points
- User viewed similar ERP content: +1 point

Total score determines ranking.

### Diversity Rules

The algorithm enforces diversity to provide varied recommendations:

1. **No duplicate content** - Each recommendation is unique
2. **Mix content types** - When possible, mix blog posts and podcasts
3. **Author diversity** - Maximum 2 items from same author
4. **Recency preference** - Prioritize content from last 6 months

### Configuration

```tsx
import { getRecommendations } from '@/lib/algorithms/content-recommendations'

const recommendations = getRecommendations(
  sourceItem,
  candidateItems,
  userViewHistory,
  {
    maxResults: 6,          // Maximum recommendations
    diversityEnabled: true, // Apply diversity rules
    maxPerAuthor: 2,        // Max items per author
    recentMonths: 6,        // Only include last N months
    includeViewHistory: true, // Use personalization
    minScore: 0.5,          // Minimum similarity score
  }
)
```

## Personalization

### View History Tracking

```tsx
import { addToViewHistory, getViewHistory } from '@/lib/utils/personalization'

// Track a view
addToViewHistory('blog-1', 'blog', 'How to Implement ERP')

// Get view history
const history = getViewHistory()
console.log(history.items) // Last 20 viewed items

// Get viewed IDs
const viewedIds = getViewedContentIds()
console.log(viewedIds) // ['blog-1', 'podcast-3', ...]
```

### Privacy Features

- **Local storage only** - No external tracking
- **Automatic expiration** - Data expires after 30 days
- **User control** - Clear history option available
- **No PII** - Only stores content IDs and titles

### React Hook

```tsx
import { useViewHistory } from '@/lib/utils/personalization'

function MyComponent() {
  const { history, addView, clearHistory, hasViewed, statistics } = useViewHistory()

  // Track view
  addView('blog-1', 'blog', 'Post Title')

  // Check if viewed
  if (hasViewed('blog-1')) {
    console.log('User already viewed this')
  }

  // Get statistics
  console.log(statistics.totalViews) // Total viewed items
  console.log(statistics.blogViews) // Blog posts viewed
  console.log(statistics.podcastViews) // Podcast episodes viewed

  // Clear history
  clearHistory()
}
```

## Analytics

### Content Analytics Tracking

```tsx
import {
  trackContentView,
  trackRecommendationClick,
  trackRecommendationImpression
} from '@/lib/analytics/content-analytics'

// Track content view
trackContentView('blog-1', 'blog', 'Post Title', { category: 'ERP' })

// Track recommendation click
trackRecommendationClick('blog-2', 'blog', 'blog-1', { position: 1 })

// Track recommendation impression
trackRecommendationImpression(['blog-2', 'blog-3'], 'blog-1')
```

### Analytics Statistics

```tsx
import { getAnalyticsStatistics } from '@/lib/analytics/content-analytics'

const stats = getAnalyticsStatistics(30) // Last 30 days
console.log(stats)
// {
//   totalViews: 150,
//   blogViews: 90,
//   podcastViews: 60,
//   recommendationClicks: 45,
//   recommendationImpressions: 200,
//   clickThroughRate: 22.5
// }
```

## Integration Examples

### Blog Detail Page

```tsx
// app/(marketing)/blog/[slug]/page.tsx
import { RecommendedContent } from '@/components/marketing/recommendations'
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/mock-data/blog-posts'
import { getAllPodcastEpisodes } from '@/lib/mock-data/podcast-episodes'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)
  const allPosts = getAllBlogPosts()
  const allEpisodes = getAllPodcastEpisodes()

  return (
    <article>
      {/* Blog post content */}
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* Recommended content */}
      <RecommendedContent
        sourceContent={post}
        blogPosts={allPosts}
        podcastEpisodes={allEpisodes}
        maxResults={6}
        mixContentTypes={true}
      />
    </article>
  )
}
```

### Homepage

```tsx
// app/(marketing)/page.tsx
import { TrendingContent } from '@/components/marketing/recommendations'
import { getAllBlogPosts } from '@/lib/mock-data/blog-posts'
import { getAllPodcastEpisodes } from '@/lib/mock-data/podcast-episodes'

export default function HomePage() {
  const blogPosts = getAllBlogPosts()
  const podcastEpisodes = getAllPodcastEpisodes()

  return (
    <main>
      {/* Hero section */}

      {/* Trending content */}
      <TrendingContent
        blogPosts={blogPosts}
        podcastEpisodes={podcastEpisodes}
        maxResults={6}
        title="Contenido en Tendencia"
        description="Lo más popular esta semana"
      />

      {/* Rest of homepage */}
    </main>
  )
}
```

### Client Component with Analytics

```tsx
'use client'

import { useEffect } from 'react'
import { trackContentView } from '@/lib/analytics/content-analytics'
import { RecommendedContent } from '@/components/marketing/recommendations'

export function BlogPostClient({ post, allPosts, allEpisodes }) {
  // Track view on mount
  useEffect(() => {
    trackContentView(post.id, 'blog', post.title, {
      category: post.category.name,
      author: post.author.name,
    })
  }, [post])

  return (
    <>
      {/* Post content */}

      <RecommendedContent
        sourceContent={post}
        blogPosts={allPosts}
        podcastEpisodes={allEpisodes}
      />
    </>
  )
}
```

## Performance Considerations

### Memoization

All recommendation calculations use `useMemo` to prevent unnecessary recalculations:

```tsx
const recommendations = useMemo(() => {
  return getRecommendations(sourceContent, candidateItems, viewHistory, config)
}, [sourceContent, candidateItems, viewHistory, config])
```

### Lazy Loading

Components support loading states with skeleton loaders:

```tsx
import { RecommendedContentSkeleton } from '@/components/marketing/recommendations'

function MyPage() {
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return <RecommendedContentSkeleton maxResults={6} />
  }

  return <RecommendedContent {...props} />
}
```

### Debouncing

For real-time recommendations, consider debouncing:

```tsx
import { debounce } from 'lodash'

const updateRecommendations = debounce((source) => {
  const recs = getRecommendations(source, candidates)
  setRecommendations(recs)
}, 300)
```

## Testing

### Unit Tests

```tsx
import { getRecommendations } from '@/lib/algorithms/content-recommendations'

describe('Content Recommendations', () => {
  it('should recommend content from same category', () => {
    const recs = getRecommendations(sourcePost, candidatePosts)
    expect(recs[0].matchFactors).toContain('Same category')
  })

  it('should apply diversity rules', () => {
    const recs = getRecommendations(sourcePost, candidatePosts, [], {
      maxPerAuthor: 2
    })
    const authorCounts = new Map()
    recs.forEach(rec => {
      const authorId = rec.item.author.id
      authorCounts.set(authorId, (authorCounts.get(authorId) || 0) + 1)
    })
    authorCounts.forEach(count => {
      expect(count).toBeLessThanOrEqual(2)
    })
  })
})
```

## Troubleshooting

### No recommendations showing

1. Check that candidate pools have data
2. Verify `minScore` is not too high
3. Check `recentMonths` filter - try increasing or disabling
4. Ensure content has categories and tags

### Recommendations not personalized

1. Verify localStorage is available
2. Check browser privacy settings
3. Ensure view tracking is implemented
4. Check `includeViewHistory` config option

### Performance issues

1. Use memoization for calculations
2. Limit `maxResults` to reasonable number (6-10)
3. Consider server-side calculation for large datasets
4. Implement lazy loading for below-fold content

## Future Enhancements

Potential improvements for future iterations:

1. **Machine Learning** - Use ML models for better predictions
2. **A/B Testing** - Test different algorithms and weights
3. **Real-time Analytics** - Track engagement in real-time
4. **Collaborative Filtering** - Use data from all users
5. **Context Awareness** - Consider time of day, device, etc.
6. **Content Embeddings** - Use semantic similarity
7. **Feedback Loop** - Learn from clicks and engagement
8. **External Integrations** - Google Analytics, Mixpanel, etc.

## Support

For questions or issues, contact the DUO development team.
