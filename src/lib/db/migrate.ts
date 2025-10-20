import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

// Load environment variables
dotenv.config({ path: '.env.local' })

/**
 * Database Migration Script
 * Applies SQL migrations from the drizzle folder to the database
 */

const runMigrations = async () => {
  const connectionString = process.env.DATABASE_URL

  // Validation
  if (!connectionString) {
    console.error('❌ ERROR: DATABASE_URL is not defined in .env.local')
    console.error('📝 Please copy .env.example to .env.local and configure your database URL')
    console.error('📖 See docs/supabase-setup.md for detailed instructions')
    throw new Error('DATABASE_URL is not defined')
  }

  // Verify migrations folder exists
  const migrationsFolder = path.resolve(process.cwd(), 'drizzle')
  if (!fs.existsSync(migrationsFolder)) {
    console.warn('⚠️  No migrations folder found at:', migrationsFolder)
    console.log('ℹ️  Run "npm run db:generate" first to create migrations')
    console.log('ℹ️  Or use "npm run db:push" to push schema directly without migrations')
    return
  }

  console.log('🚀 Starting database migration...')
  console.log(`📂 Migrations folder: ${migrationsFolder}`)
  console.log(`🔗 Connecting to database...`)

  let migrationClient: postgres.Sql<any> | null = null

  try {
    // Create connection for migrations (single connection)
    migrationClient = postgres(connectionString, {
      max: 1,
      onnotice: () => {}, // Suppress notices during migration
    })

    const db = drizzle(migrationClient)

    console.log('✅ Database connection established')
    console.log('🔄 Applying migrations...')

    // Run migrations
    await migrate(db, { migrationsFolder })

    console.log('✅ All migrations applied successfully!')
    console.log('📊 Database schema is now up to date')
  } catch (error: unknown) {
    console.error('❌ Migration failed!')

    if (error instanceof Error) {
      // Check for common errors and provide helpful messages
      if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
        console.error('🌐 Connection Error: Cannot reach database server')
        console.error('   - Check your internet connection')
        console.error('   - Verify DATABASE_URL is correct')
        console.error('   - Ensure database server is running')
      } else if (error.message.includes('password authentication failed')) {
        console.error('🔐 Authentication Error: Invalid database credentials')
        console.error('   - Check your database password in .env.local')
        console.error('   - Verify connection string format')
      } else if (error.message.includes('database') && error.message.includes('does not exist')) {
        console.error('💾 Database Error: Database does not exist')
        console.error('   - Create the database first')
        console.error('   - Or use "npm run db:push" to auto-create tables')
      } else {
        console.error('Error details:', error.message)
        if (error.stack) {
          console.error('Stack trace:', error.stack)
        }
      }
    } else {
      console.error('Unknown error:', error)
    }

    throw error
  } finally {
    // Ensure connection is closed
    if (migrationClient) {
      console.log('🔌 Closing database connection...')
      await migrationClient.end()
    }
  }
}

// Self-executing when run directly
if (require.main === module) {
  console.log('═══════════════════════════════════════════════════════')
  console.log('   DUO Soluciones - Database Migration Tool')
  console.log('═══════════════════════════════════════════════════════')

  runMigrations()
    .then(() => {
      console.log('═══════════════════════════════════════════════════════')
      console.log('✅ Migration process completed successfully')
      console.log('═══════════════════════════════════════════════════════')
      console.log('Next steps:')
      console.log('  1. Run "npm run db:seed" to populate initial data')
      console.log('  2. Run "npm run db:studio" to browse your database')
      console.log('  3. Run "npm run dev" to start the development server')
      process.exit(0)
    })
    .catch(() => {
      console.log('═══════════════════════════════════════════════════════')
      console.log('❌ Migration process failed')
      console.log('═══════════════════════════════════════════════════════')
      console.log('Troubleshooting:')
      console.log('  1. Check .env.local file exists and has DATABASE_URL')
      console.log('  2. Verify database credentials are correct')
      console.log('  3. See docs/supabase-setup.md for setup guide')
      console.log('  4. Try "npm run db:push" as an alternative')
      process.exit(1)
    })
}

export default runMigrations
