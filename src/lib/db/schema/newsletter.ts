import { pgTable, uuid, varchar, timestamp, boolean, text } from 'drizzle-orm/pg-core'

/**
 * Newsletter Subscribers Table
 * Stores email subscribers for the newsletter with GDPR compliance
 */
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),

  // Subscription status
  isActive: boolean('is_active').default(false).notNull(), // Default false until confirmed
  confirmedAt: timestamp('confirmed_at'), // Email confirmation timestamp

  // GDPR Compliance
  consentGiven: boolean('consent_given').default(false).notNull(), // Explicit consent checkbox
  consentGivenAt: timestamp('consent_given_at'), // When consent was given

  // Double opt-in tokens
  verificationToken: text('verification_token'), // Token for email confirmation
  verificationTokenExpiry: timestamp('verification_token_expiry'), // Token expiration
  unsubscribeToken: text('unsubscribe_token').notNull(), // Unique token for unsubscribe link

  // Source tracking
  source: varchar('source', { length: 100 }), // e.g., 'blog', 'homepage', 'footer'

  // Unsubscribe tracking
  unsubscribedAt: timestamp('unsubscribed_at'),
  unsubscribeReason: text('unsubscribe_reason'), // Optional feedback

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect
export type NewNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert
