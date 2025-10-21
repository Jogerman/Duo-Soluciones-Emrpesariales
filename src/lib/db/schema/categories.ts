import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core'

/**
 * Categories Table
 * Stores content categories for blog posts and podcast episodes
 */
export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),

  // Visual customization
  color: varchar('color', { length: 7 }), // Hex color code (e.g., #1b5e5e)

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert
