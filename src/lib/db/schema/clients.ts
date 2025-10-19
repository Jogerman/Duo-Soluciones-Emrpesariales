import {
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core'

/**
 * Clients Table
 * Stores client companies and their logos for display
 */
export const clients = pgTable('clients', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),

  // Visual assets
  logo: varchar('logo', { length: 500 }),
  logoAlt: varchar('logo_alt', { length: 255 }),

  // Client details
  industry: varchar('industry', { length: 100 }),
  website: varchar('website', { length: 500 }),
  description: text('description'),

  // Relationship details
  servicesProvided: jsonb('services_provided').$type<string[]>().default([]),
  yearStarted: integer('year_started'),
  isActive: boolean('is_active').default(true),

  // Metadata
  featured: boolean('featured').default(false),
  order: integer('order').default(0),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Client = typeof clients.$inferSelect
export type NewClient = typeof clients.$inferInsert
