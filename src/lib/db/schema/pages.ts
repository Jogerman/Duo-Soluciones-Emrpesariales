import { pgTable, uuid, text, varchar, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core'

/**
 * Pages Table
 * Stores dynamic page content for CMS-managed pages
 */
export const cmsPages = pgTable('pages', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),

  // Page content
  content: text('content').notNull(), // Rich text content
  excerpt: text('excerpt'),

  // Page sections (for complex layouts)
  sections: jsonb('sections')
    .$type<
      {
        type: string
        data: Record<string, unknown>
        order: number
      }[]
    >()
    .default([]),

  // Visual assets
  featuredImage: varchar('featured_image', { length: 500 }),

  // Page type
  template: varchar('template', { length: 50 }).default('default'), // default, landing, service, about, contact

  // Publishing
  status: varchar('status', { length: 50 }).default('draft'), // draft, published, archived
  publishedAt: timestamp('published_at'),

  // SEO fields
  metaTitle: varchar('meta_title', { length: 255 }),
  metaDescription: text('meta_description'),
  metaKeywords: jsonb('meta_keywords').$type<string[]>().default([]),
  canonicalUrl: varchar('canonical_url', { length: 500 }),

  // OpenGraph fields
  ogTitle: varchar('og_title', { length: 255 }),
  ogDescription: text('og_description'),
  ogImage: varchar('og_image', { length: 500 }),

  // Metadata
  isHomePage: boolean('is_home_page').default(false),
  parentPageId: uuid('parent_page_id'), // Self-reference for nested pages

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Page = typeof cmsPages.$inferSelect
export type NewPage = typeof cmsPages.$inferInsert
