import { pgTable, uuid, text, varchar, integer, boolean, timestamp } from 'drizzle-orm/pg-core'
import { services } from './services'

/**
 * Testimonials Table
 * Stores client testimonials and reviews
 */
export const testimonials = pgTable('testimonials', {
  id: uuid('id').defaultRandom().primaryKey(),
  clientName: varchar('client_name', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }).notNull(),
  role: varchar('role', { length: 255 }), // Client's position/title
  content: text('content').notNull(),

  // Rating (1-5 stars)
  rating: integer('rating').default(5),

  // Visual assets
  image: varchar('image', { length: 500 }), // Client photo or company logo

  // Relations (optional - testimonial can be general or specific)
  serviceId: uuid('service_id').references(() => services.id),

  // Metadata
  featured: boolean('featured').default(false),
  isActive: boolean('is_active').default(true),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Testimonial = typeof testimonials.$inferSelect
export type NewTestimonial = typeof testimonials.$inferInsert
