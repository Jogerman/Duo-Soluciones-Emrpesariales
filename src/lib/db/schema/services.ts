import {
  pgTable,
  uuid,
  text,
  varchar,
  boolean,
  integer,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core'

/**
 * Services Table
 * Stores the 4 main service areas (AS1-AS4) offered by DUO Soluciones
 */
export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  shortDescription: text('short_description').notNull(),
  longDescription: text('long_description').notNull(),

  // Service category: AS1, AS2, AS3, AS4
  category: varchar('category', { length: 10 }).notNull(),

  // Visual assets
  icon: varchar('icon', { length: 255 }), // Lucide icon name or custom icon URL
  image: varchar('image', { length: 500 }), // Featured image URL

  // Service details stored as JSON arrays
  benefits: jsonb('benefits').$type<string[]>().default([]),
  deliverables: jsonb('deliverables').$type<string[]>().default([]),
  keyFeatures: jsonb('key_features').$type<string[]>().default([]),

  // Metadata
  featured: boolean('featured').default(false),
  order: integer('order').default(0), // For sorting
  isActive: boolean('is_active').default(true),

  // SEO fields
  metaTitle: varchar('meta_title', { length: 255 }),
  metaDescription: text('meta_description'),
  metaKeywords: jsonb('meta_keywords').$type<string[]>().default([]),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Service = typeof services.$inferSelect
export type NewService = typeof services.$inferInsert
