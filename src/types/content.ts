// Content types for Blog and Podcast

export interface Author {
  id: string
  name: string
  role: string
  avatar: string
  bio?: string
  linkedin?: string
  twitter?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  author?: Author
  category: Category
  tags: Tag[]
  publishedAt: string
  updatedAt?: string
  readingTime: number
  featured: boolean
  views?: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
}

export interface PodcastGuest {
  id: string
  name: string
  role: string
  company?: string
  avatar: string
  bio?: string
  linkedin?: string
}

export interface PodcastEpisode {
  id: string
  title: string
  slug: string
  description: string
  content: string
  coverImage: string
  audioUrl: string
  spotifyUrl?: string
  applePodcastsUrl?: string
  duration: number // in seconds
  publishedAt: string
  season?: number
  episode: number
  hosts: Author[]
  guests?: PodcastGuest[]
  category: Category
  transcript?: string
  showNotes?: string
  resources?: {
    title: string
    url: string
    description?: string
  }[]
  tags: Tag[]
  featured: boolean
  plays?: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
}

// Pagination types
export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface PaginatedBlogPosts {
  posts: BlogPost[]
  meta: PaginationMeta
}

export interface PaginatedPodcastEpisodes {
  episodes: PodcastEpisode[]
  meta: PaginationMeta
}

// Filter types
export interface BlogFilters {
  category?: string
  tag?: string
  search?: string
  page?: number
}

export interface PodcastFilters {
  season?: number
  tag?: string
  search?: string
  page?: number
}
