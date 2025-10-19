import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Get database URL from environment
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined. Please add it to your .env.local file.')
}

// For production, use a connection pool
// For development/migrations, use a simple connection
const client = postgres(connectionString, {
  max: process.env.NODE_ENV === 'production' ? 10 : 1,
  idle_timeout: 20,
  connect_timeout: 10,
})

// Create Drizzle instance
export const db = drizzle(client, { schema })

// Export all schemas for convenience
export * from './schema'

// Helper function to close database connection
export const closeDb = async () => {
  await client.end()
}
