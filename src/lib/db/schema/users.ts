import { pgTable, uuid, varchar, timestamp, boolean } from 'drizzle-orm/pg-core'

/**
 * Users Table
 * Stores admin users for authentication and CMS access
 */
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(), // Hashed password

  // User role
  role: varchar('role', { length: 50 }).default('editor'), // admin, editor, viewer

  // Profile
  image: varchar('image', { length: 500 }),

  // Account status
  isActive: boolean('is_active').default(true),
  emailVerified: timestamp('email_verified'),

  // Security
  lastLogin: timestamp('last_login'),
  passwordChangedAt: timestamp('password_changed_at'),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

/**
 * Sessions Table
 * Stores user sessions for NextAuth.js
 */
export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionToken: varchar('session_token', { length: 255 }).notNull().unique(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  expires: timestamp('expires').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

/**
 * Verification Tokens Table
 * Stores verification tokens for email verification, password reset, etc.
 */
export const verificationTokens = pgTable('verification_tokens', {
  identifier: varchar('identifier', { length: 255 }).notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expires: timestamp('expires').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Session = typeof sessions.$inferSelect
export type NewSession = typeof sessions.$inferInsert
export type VerificationToken = typeof verificationTokens.$inferSelect
export type NewVerificationToken = typeof verificationTokens.$inferInsert
