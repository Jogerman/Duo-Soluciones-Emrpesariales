import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Get database URL from environment
const connectionString = process.env.DATABASE_URL

// Only create database connection if URL is available
// This allows the build process to succeed without DATABASE_URL
let client: postgres.Sql | undefined
let dbInstance: ReturnType<typeof drizzle> | undefined

if (connectionString) {
  // For production, use a connection pool
  // For development/migrations, use a simple connection
  client = postgres(connectionString, {
    max: process.env.NODE_ENV === 'production' ? 10 : 1,
    idle_timeout: 20,
    connect_timeout: 10,
  })

  // Create Drizzle instance
  dbInstance = drizzle(client, { schema })
}

// Export db - will be undefined if DATABASE_URL not set
export const db = dbInstance as ReturnType<typeof drizzle>

// Export all schemas for convenience
export * from './schema'

// Helper function to close database connection
export const closeDb = async () => {
  if (client) {
    await client.end()
  }
}
