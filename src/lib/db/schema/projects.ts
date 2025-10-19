import {
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  timestamp,
  jsonb,
  boolean,
} from 'drizzle-orm/pg-core'

/**
 * Projects Table
 * Stores case studies and successful project implementations
 */
export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  client: varchar('client', { length: 255 }).notNull(),

  // Project description and details
  shortDescription: text('short_description').notNull(),
  challenge: text('challenge').notNull(),
  solution: text('solution').notNull(),
  results: text('results').notNull(),

  // Relations (foreign keys - will add relations later)
  serviceId: uuid('service_id'),
  teamLeadName: varchar('team_lead_name', { length: 255 }),
  testimonialId: uuid('testimonial_id'),

  // Project details
  industry: varchar('industry', { length: 100 }),
  duration: varchar('duration', { length: 100 }), // e.g., "3 months", "6 weeks"
  year: integer('year'),

  // Visual assets
  images: jsonb('images')
    .$type<
      {
        url: string
        alt: string
        caption?: string
      }[]
    >()
    .default([]),
  featuredImage: varchar('featured_image', { length: 500 }),

  // Key metrics/achievements
  metrics: jsonb('metrics')
    .$type<
      {
        label: string
        value: string
        icon?: string
      }[]
    >()
    .default([]),

  // Technologies/tools used
  technologies: jsonb('technologies').$type<string[]>().default([]),

  // Metadata
  featured: boolean('featured').default(false),
  isActive: boolean('is_active').default(true),

  // SEO fields
  metaTitle: varchar('meta_title', { length: 255 }),
  metaDescription: text('meta_description'),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert
