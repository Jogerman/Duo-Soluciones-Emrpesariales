import { NextRequest, NextResponse } from 'next/server'
import { blogPosts } from '@/lib/mock-data/blog-posts'
import { podcastEpisodes } from '@/lib/mock-data/podcast-episodes'
import { searchAll, getSearchSuggestions, SearchResult } from '@/lib/utils/search'

/**
 * GET /api/search
 * Search across blog posts and podcast episodes
 *
 * Query parameters:
 * - q: search query (required)
 * - type: 'all' | 'blog' | 'podcast' (default: 'all')
 * - limit: number of results (default: 10, max: 50)
 * - sortBy: 'relevance' | 'date' (default: 'relevance')
 * - suggestions: 'true' | 'false' (default: 'false') - for autocomplete
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const type = (searchParams.get('type') || 'all') as 'all' | 'blog' | 'podcast'
    const limitParam = searchParams.get('limit')
    const sortBy = (searchParams.get('sortBy') || 'relevance') as 'relevance' | 'date'
    const isSuggestions = searchParams.get('suggestions') === 'true'

    // Validate query parameter
    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Query parameter "q" is required',
        },
        { status: 400 }
      )
    }

    // Validate and set limit
    let limit = 10
    if (limitParam) {
      const parsedLimit = parseInt(limitParam, 10)
      if (isNaN(parsedLimit) || parsedLimit < 1) {
        return NextResponse.json(
          {
            success: false,
            error: 'Limit must be a positive number',
          },
          { status: 400 }
        )
      }
      limit = Math.min(parsedLimit, 50) // Max 50 results
    }

    // Validate type
    if (type !== 'all' && type !== 'blog' && type !== 'podcast') {
      return NextResponse.json(
        {
          success: false,
          error: 'Type must be "all", "blog", or "podcast"',
        },
        { status: 400 }
      )
    }

    // Validate sortBy
    if (sortBy !== 'relevance' && sortBy !== 'date') {
      return NextResponse.json(
        {
          success: false,
          error: 'SortBy must be "relevance" or "date"',
        },
        { status: 400 }
      )
    }

    let results: SearchResult[]

    // Get suggestions for autocomplete or full search
    if (isSuggestions) {
      results = getSearchSuggestions(blogPosts, podcastEpisodes, query, Math.min(limit, 10))
    } else {
      results = searchAll(blogPosts, podcastEpisodes, {
        query,
        type,
        limit,
        sortBy,
      })
    }

    // Group results by type
    const blogResults = results.filter(r => r.type === 'blog')
    const podcastResults = results.filter(r => r.type === 'podcast')

    return NextResponse.json(
      {
        success: true,
        query,
        type,
        sortBy,
        totalResults: results.length,
        results,
        breakdown: {
          blog: blogResults.length,
          podcast: podcastResults.length,
        },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    )
  } catch (error) {
    console.error('Search API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    )
  }
}
