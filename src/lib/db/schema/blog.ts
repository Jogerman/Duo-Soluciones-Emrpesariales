import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  jsonb,
  boolean,
  integer,
} from 'drizzle-orm/pg-core'

/**
 * Blog Table
 * Stores blog posts, articles, and LinkedIn content sync
 */
export const blog = pgTable('blog', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  slug: varchar('slug', { length: 500 }).notNull().unique(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(), // Rich text content (HTML or Markdown)

  // Author info (simplified - will add relation later)
  authorName: varchar('author_name', { length: 255 }),

  // Visual assets
  featuredImage: varchar('featured_image', { length: 500 }),
  featuredImageAlt: varchar('featured_image_alt', { length: 255 }),

  // Categorization
  categories: jsonb('categories').$type<string[]>().default([]),
  tags: jsonb('tags').$type<string[]>().default([]),

  // LinkedIn sync
  linkedinPostId: varchar('linkedin_post_id', { length: 255 }),
  linkedinUrl: varchar('linkedin_url', { length: 500 }),

  // Publishing
  status: varchar('status', { length: 50 }).default('draft'), // draft, published, archived
  publishedAt: timestamp('published_at'),

  // Reading time estimation (in minutes)
  readingTime: integer('reading_time'),

  // SEO fields
  metaTitle: varchar('meta_title', { length: 255 }),
  metaDescription: text('meta_description'),
  metaKeywords: jsonb('meta_keywords').$type<string[]>().default([]),
  canonicalUrl: varchar('canonical_url', { length: 500 }),

  // Metadata
  featured: boolean('featured').default(false),
  viewCount: integer('view_count').default(0),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type BlogPost = typeof blog.$inferSelect
export type NewBlogPost = typeof blog.$inferInsert
