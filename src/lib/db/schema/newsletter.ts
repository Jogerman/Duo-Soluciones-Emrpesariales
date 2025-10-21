import { pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core'

/**
 * Newsletter Subscribers Table
 * Stores email subscribers for the newsletter
 */
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),

  // Subscription status
  isActive: boolean('is_active').default(true),
  confirmedAt: timestamp('confirmed_at'), // Email confirmation timestamp

  // Source tracking
  source: varchar('source', { length: 100 }), // e.g., 'blog', 'homepage', 'footer'

  // Unsubscribe tracking
  unsubscribedAt: timestamp('unsubscribed_at'),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect
export type NewNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert
