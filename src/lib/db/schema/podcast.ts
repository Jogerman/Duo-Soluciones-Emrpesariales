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
 * Podcast Table
 * Stores podcast episodes with Spotify integration
 */
export const podcast = pgTable('podcast', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 500 }).notNull(),
  slug: varchar('slug', { length: 500 }).notNull().unique(),
  description: text('description').notNull(),

  // Episode details
  episodeNumber: integer('episode_number'),
  season: integer('season'),
  duration: integer('duration'), // Duration in seconds

  // Audio files
  audioUrl: varchar('audio_url', { length: 500 }),
  coverImage: varchar('cover_image', { length: 500 }),

  // Spotify integration
  spotifyEpisodeId: varchar('spotify_episode_id', { length: 255 }),
  spotifyUrl: varchar('spotify_url', { length: 500 }),

  // Hosts and guests
  hosts: jsonb('hosts')
    .$type<
      {
        id: string
        name: string
      }[]
    >()
    .default([]),
  guests: jsonb('guests')
    .$type<
      {
        name: string
        role?: string
        company?: string
      }[]
    >()
    .default([]),

  // Topics and tags
  topics: jsonb('topics').$type<string[]>().default([]),
  tags: jsonb('tags').$type<string[]>().default([]),

  // Transcript
  transcript: text('transcript'),
  hasTranscript: boolean('has_transcript').default(false),

  // Show notes and resources
  showNotes: text('show_notes'),
  resources: jsonb('resources')
    .$type<
      {
        title: string
        url: string
        description?: string
      }[]
    >()
    .default([]),

  // Publishing
  status: varchar('status', { length: 50 }).default('draft'), // draft, published, archived
  publishedAt: timestamp('published_at'),

  // SEO fields
  metaTitle: varchar('meta_title', { length: 255 }),
  metaDescription: text('meta_description'),

  // Metadata
  featured: boolean('featured').default(false),
  playCount: integer('play_count').default(0),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type PodcastEpisode = typeof podcast.$inferSelect
export type NewPodcastEpisode = typeof podcast.$inferInsert
