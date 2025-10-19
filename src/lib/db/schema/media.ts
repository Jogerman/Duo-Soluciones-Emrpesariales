import { pgTable, uuid, varchar, integer, timestamp, jsonb, text } from 'drizzle-orm/pg-core'

/**
 * Media Table
 * Stores all uploaded media files (images, documents, videos, etc.)
 */
export const media = pgTable('media', {
  id: uuid('id').defaultRandom().primaryKey(),
  filename: varchar('filename', { length: 255 }).notNull(),
  originalFilename: varchar('original_filename', { length: 255 }).notNull(),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),

  // File details
  fileSize: integer('file_size').notNull(), // Size in bytes
  width: integer('width'), // For images
  height: integer('height'), // For images

  // Storage details
  url: varchar('url', { length: 500 }).notNull(),
  cloudinaryId: varchar('cloudinary_id', { length: 255 }), // Cloudinary public_id
  folder: varchar('folder', { length: 255 }), // Storage folder path

  // Alternative text and metadata
  alt: varchar('alt', { length: 255 }),
  caption: text('caption'),
  description: text('description'),

  // Categorization
  category: varchar('category', { length: 50 }), // image, document, video, audio
  tags: jsonb('tags').$type<string[]>().default([]),

  // Cloudinary transformations
  transformations: jsonb('transformations').$type<{
    [key: string]: string
  }>(),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Media = typeof media.$inferSelect
export type NewMedia = typeof media.$inferInsert
