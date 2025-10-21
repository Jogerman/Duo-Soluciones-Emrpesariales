import NextAuth, { DefaultSession, NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/lib/db'
import { users, sessions, verificationTokens } from '@/lib/db/schema'
import * as bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'

/**
 * Module augmentation for NextAuth types
 * Extends the built-in session and user types
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      isActive: boolean
    } & DefaultSession['user']
  }

  interface User {
    role: string
    isActive: boolean
  }
}

/**
 * NextAuth.js v5 Configuration
 * Handles authentication for the admin panel and protected routes
 */
export const authConfig: NextAuthConfig = {
  // Database adapter for session storage
  // Only use adapter if DATABASE_URL is available (skip during build)
  ...(process.env.DATABASE_URL && db
    ? {
        adapter: DrizzleAdapter(db, {
          usersTable: users,
          sessionsTable: sessions,
          verificationTokensTable: verificationTokens,
        }),
      }
    : {}),

  // Session strategy (JWT for better scalability)
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'admin@duosoluciones.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        // If no database connection, authentication is not available during build
        if (!db) {
          throw new Error('Database connection not available. Please configure DATABASE_URL.')
        }

        try {
          // Find user by email
          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email as string))
            .limit(1)

          if (!user) {
            throw new Error('Invalid email or password')
          }

          // Check if user is active
          if (!user.isActive) {
            throw new Error('Your account has been deactivated. Please contact an administrator.')
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          if (!isPasswordValid) {
            throw new Error('Invalid email or password')
          }

          // Update last login timestamp
          await db.update(users).set({ lastLogin: new Date() }).where(eq(users.id, user.id))

          // Return user object (password excluded)
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role || 'editor',
            isActive: user.isActive || false,
          }
        } catch (error) {
          console.error('Authentication error:', error)
          throw error
        }
      },
    }),
  ],

  // Callbacks to customize behavior
  callbacks: {
    // JWT callback: Add custom fields to token
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id
        token.role = user.role
        token.isActive = user.isActive
      }

      // Handle session update
      if (trigger === 'update' && session) {
        token = { ...token, ...session }
      }

      return token
    },

    // Session callback: Add custom fields to session
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.isActive = token.isActive as boolean
      }

      return session
    },

    // Redirect callback: Custom redirect logic after sign in
    async redirect({ url, baseUrl }) {
      // Redirect to admin panel after successful login
      if (url.startsWith(baseUrl)) {
        return url
      }
      // Default to admin panel
      return `${baseUrl}/admin`
    },
  },

  // Pages configuration
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    // signOut: '/auth/signout', // Optional custom sign out page
  },

  // Security configuration
  secret: process.env.NEXTAUTH_SECRET,

  // Enable debug in development
  debug: process.env.NODE_ENV === 'development',

  // Events (for logging)
  events: {
    async signIn({ user }) {
      console.log(`User signed in: ${user.email}`)
    },
    async signOut({ token }) {
      console.log(`User signed out: ${token.email}`)
    },
  },

  // Trust host in production
  trustHost: true,
}

// Export NextAuth handlers
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
