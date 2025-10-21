import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core'

/**
 * Tags Table
 * Stores tags for blog posts and podcast episodes for better content organization
 */
export const tags = pgTable('tags', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Tag = typeof tags.$inferSelect
export type NewTag = typeof tags.$inferInsert
