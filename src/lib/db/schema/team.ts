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
 * Team Table
 * Stores information about team members, consultants, and leadership
 */
export const team = pgTable('team', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 255 }).notNull(),
  bio: text('bio').notNull(),

  // Contact information
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  linkedin: varchar('linkedin', { length: 500 }),

  // Visual assets
  image: varchar('image', { length: 500 }),

  // Professional details
  experienceYears: integer('experience_years'),
  specialties: jsonb('specialties').$type<string[]>().default([]),
  certifications: jsonb('certifications')
    .$type<
      {
        name: string
        issuer: string
        year?: number
        credential?: string
      }[]
    >()
    .default([]),

  // Education
  education: jsonb('education')
    .$type<
      {
        degree: string
        institution: string
        year?: number
      }[]
    >()
    .default([]),

  // Industries expertise
  industries: jsonb('industries').$type<string[]>().default([]),

  // Metadata
  featured: boolean('featured').default(false),
  order: integer('order').default(0),
  isActive: boolean('is_active').default(true),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type TeamMember = typeof team.$inferSelect
export type NewTeamMember = typeof team.$inferInsert
