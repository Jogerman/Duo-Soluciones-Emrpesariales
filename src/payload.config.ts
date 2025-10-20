import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { cloudinaryAdapter } from '@payloadcms/plugin-cloud-storage/cloudinary'
import path from 'path'

// Import collections (we'll create these next)
import { Services } from './lib/payload/collections/Services'
import { Team } from './lib/payload/collections/Team'
import { Projects } from './lib/payload/collections/Projects'
import { Testimonials } from './lib/payload/collections/Testimonials'
import { Blog } from './lib/payload/collections/Blog'
import { Podcast } from './lib/payload/collections/Podcast'
import { Clients } from './lib/payload/collections/Clients'
import { Media } from './lib/payload/collections/Media'
import { Pages } from './lib/payload/collections/Pages'
import { Users } from './lib/payload/collections/Users'

export default buildConfig({
  // Unique server URL
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',

  // Admin panel configuration
  admin: {
    // Admin panel route
    user: 'users', // Collection to use for admin users
    meta: {
      titleSuffix: '- DUO Soluciones',
      favicon: '/favicon.ico',
      ogImage: '/og-image.png',
    },
    // Customize admin UI
    components: {
      // You can add custom components here later
    },
  },

  // Collections (database tables)
  collections: [
    // Core content collections
    Services,
    Team,
    Projects,
    Testimonials,
    Blog,
    Podcast,
    Clients,
    Pages,
    Media,

    // Users (authentication)
    Users,
  ],

  // Global settings (if needed)
  globals: [
    // You can add global settings here later
    // Example: Site settings, SEO defaults, etc.
  ],

  // Database adapter (PostgreSQL via Drizzle)
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // Enable migrations
    migrationDir: path.resolve(process.cwd(), 'src/lib/payload/migrations'),
  }),

  // Rich text editor (Lexical)
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      // Add custom features here if needed
    ],
  }),

  // Secret for JWT encryption
  secret: process.env.PAYLOAD_SECRET || 'your-secret-here',

  // TypeScript configuration
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },

  // Plugins
  plugins: [
    // Cloudinary storage plugin for media files
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter({
            cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
            apiKey: process.env.CLOUDINARY_API_KEY || '',
            apiSecret: process.env.CLOUDINARY_API_SECRET || '',
            folder: 'duo-soluciones',
          }),
          generateFileURL: ({ filename }) => {
            return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/duo-soluciones/${filename}`
          },
        },
      },
    }),
  ],

  // CORS configuration
  cors: [process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'].filter(Boolean),

  // CSRF protection
  csrf: [process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'].filter(Boolean),

  // Rate limiting
  rateLimit: {
    trustProxy: true,
    window: 15 * 60 * 1000, // 15 minutes
    max: 500, // 500 requests per window
  },

  // Telemetry (set to false if you want to disable)
  telemetry: false,

  // GraphQL configuration
  graphQL: {
    disable: false, // Enable GraphQL API
    schemaOutputFile: path.resolve(process.cwd(), 'schema.graphql'),
  },
})
