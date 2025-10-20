# Authentication System Guide

Complete guide to the authentication system for DUO Soluciones Empresariales using NextAuth.js v5.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Setup Instructions](#setup-instructions)
- [User Management](#user-management)
- [Protected Routes](#protected-routes)
- [Role-Based Access Control](#role-based-access-control)
- [API Reference](#api-reference)
- [Security Best Practices](#security-best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

This project uses **NextAuth.js v5** (beta) for authentication with the following features:

- **Credentials-based authentication** (email/password)
- **Role-based access control** (Admin, Editor, Contributor)
- **Database session storage** using Drizzle ORM
- **Protected routes** via middleware
- **Password hashing** with bcryptjs
- **JWT tokens** for session management
- **Integration with Payload CMS**

---

## Architecture

### Authentication Flow

```
1. User visits /auth/signin
2. User enters email/password
3. Credentials sent to NextAuth API
4. NextAuth verifies credentials against database
5. Password checked with bcrypt
6. If valid, JWT token created
7. User redirected to /admin
8. Middleware validates token on protected routes
```

### Components

- **NextAuth Configuration** (`src/lib/auth/config.ts`)
  - Defines authentication providers
  - Session strategy (JWT)
  - Callbacks for token/session

- **API Route** (`src/app/api/auth/[...nextauth]/route.ts`)
  - Handles all auth requests
  - Sign in, sign out, session endpoints

- **Middleware** (`middleware.ts`)
  - Protects routes before they render
  - Validates sessions
  - Enforces role-based access

- **Auth Components** (`src/components/auth/`)
  - LoginForm: Sign in UI
  - ProtectedRoute: Client-side route guard

---

## Setup Instructions

### Step 1: Environment Variables

Ensure these are set in `.env.local`:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-here

# Database (for user storage)
DATABASE_URL=postgresql://...
```

Generate a secure secret:

```bash
openssl rand -base64 32
```

### Step 2: Run Database Migrations

Ensure the users table exists:

```bash
npm run db:push
```

### Step 3: Seed Admin User

Create initial admin user:

```bash
npm run db:seed
```

This creates:

- Email: `admin@duosoluciones.com`
- Password: `admin123`
- Role: `admin`

**IMPORTANT**: Change this password immediately!

### Step 4: Test Authentication

1. Start dev server:

   ```bash
   npm run dev
   ```

2. Visit: `http://localhost:3000/auth/signin`

3. Log in with default credentials

4. You should be redirected to `/admin`

---

## User Management

### User Roles

1. **Admin**
   - Full system access
   - Can create/edit/delete users
   - Can access all CMS content
   - Can delete any content

2. **Editor**
   - Can create and edit all content
   - Cannot manage users
   - Cannot delete critical content

3. **Contributor**
   - Can create own content
   - Can edit own content only
   - Limited permissions

### Creating Users

#### Via Database Seeding

Edit `src/lib/db/seed.ts`:

```typescript
const hashedPassword = await bcrypt.hash('password123', 10)

await db.insert(users).values({
  name: 'John Doe',
  email: 'john@example.com',
  password: hashedPassword,
  role: 'editor',
  isActive: true,
})
```

#### Via Payload CMS Admin

1. Go to `/admin`
2. Navigate to "Users" collection
3. Click "Create New"
4. Fill in details
5. Password will be auto-hashed

#### Programmatically

```typescript
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import bcrypt from 'bcryptjs'

async function createUser(email: string, password: string, role: string) {
  const hashedPassword = await bcrypt.hash(password, 10)

  await db.insert(users).values({
    name: 'User Name',
    email,
    password: hashedPassword,
    role,
    isActive: true,
  })
}
```

### Deactivating Users

Set `isActive` to `false`:

```typescript
await db.update(users).set({ isActive: false }).where(eq(users.email, 'user@example.com'))
```

Inactive users cannot log in.

---

## Protected Routes

### Server-Side Protection (Middleware)

Protected by middleware automatically:

- `/admin/*` - All admin routes
- `/api/auth/session` - Session endpoint

Add more in `middleware.ts`:

```typescript
const protectedPaths = ['/admin', '/dashboard', '/api/private']
```

### Client-Side Protection

Use the `ProtectedRoute` component:

```tsx
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={['admin', 'editor']}>
      <div>Admin content here</div>
    </ProtectedRoute>
  )
}
```

### Server Component Protection

Use the `auth()` helper:

```tsx
import { auth } from '@/lib/auth/config'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin')
  }

  return <div>Protected content for {session.user.email}</div>
}
```

---

## Role-Based Access Control

### Checking Roles in Middleware

Middleware automatically checks roles for `/admin` routes:

```typescript
if (pathname.startsWith('/admin')) {
  const allowedRoles = ['admin', 'editor', 'contributor']
  if (!allowedRoles.includes(session.user.role)) {
    return NextResponse.redirect(new URL('/auth/unauthorized', request.url))
  }
}
```

### Checking Roles in Components

```tsx
'use client'
import { useSession } from 'next-auth/react'

export function AdminOnlyButton() {
  const { data: session } = useSession()

  if (session?.user?.role !== 'admin') {
    return null
  }

  return <button>Admin Action</button>
}
```

### Checking Roles in Server Components

```tsx
import { auth } from '@/lib/auth/config'

export default async function Page() {
  const session = await auth()

  const isAdmin = session?.user?.role === 'admin'

  return (
    <div>
      {isAdmin && <AdminPanel />}
      <RegularContent />
    </div>
  )
}
```

### Checking Roles in API Routes

```typescript
import { auth } from '@/lib/auth/config'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Admin-only logic here
  return NextResponse.json({ success: true })
}
```

---

## API Reference

### Sign In

```typescript
import { signIn } from 'next-auth/react'

const result = await signIn('credentials', {
  email: 'user@example.com',
  password: 'password123',
  redirect: false,
})

if (result?.ok) {
  // Success
}
```

### Sign Out

```typescript
import { signOut } from 'next-auth/react'

await signOut({
  callbackUrl: '/',
})
```

### Get Session (Client)

```tsx
'use client'
import { useSession } from 'next-auth/react'

export function UserProfile() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <div>Loading...</div>
  if (!session) return <div>Not logged in</div>

  return <div>Welcome, {session.user.name}</div>
}
```

### Get Session (Server)

```tsx
import { auth } from '@/lib/auth/config'

export default async function Page() {
  const session = await auth()

  return <div>{session?.user?.name}</div>
}
```

### Session Object Structure

```typescript
{
  user: {
    id: string
    name: string
    email: string
    image: string | null
    role: 'admin' | 'editor' | 'contributor'
    isActive: boolean
  }
  expires: string // ISO date
}
```

---

## Security Best Practices

### 1. Strong Secrets

```bash
# Generate strong secrets
openssl rand -base64 32

# Never commit secrets to git
# Store in environment variables only
```

### 2. Password Requirements

Enforce strong passwords (implement in signup flow):

```typescript
function isStrongPassword(password: string): boolean {
  return (
    password.length >= 12 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  )
}
```

### 3. Rate Limiting

Prevent brute force attacks:

```typescript
// Implement in auth config or middleware
const loginAttempts = new Map<string, number>()

function checkRateLimit(email: string): boolean {
  const attempts = loginAttempts.get(email) || 0

  if (attempts >= 5) {
    return false // Too many attempts
  }

  loginAttempts.set(email, attempts + 1)
  return true
}
```

### 4. HTTPS Only

In production:

```bash
NEXTAUTH_URL=https://yourdomain.com
```

Never use HTTP in production.

### 5. Secure Cookies

NextAuth automatically sets secure cookies in production:

- `HttpOnly` - Prevents XSS attacks
- `Secure` - HTTPS only
- `SameSite=Lax` - CSRF protection

### 6. Session Expiration

Configure in `src/lib/auth/config.ts`:

```typescript
session: {
  strategy: 'jwt',
  maxAge: 30 * 24 * 60 * 60, // 30 days
}
```

### 7. Password Hashing

Always use bcrypt with cost factor 10+:

```typescript
const hashedPassword = await bcrypt.hash(password, 10)
```

### 8. SQL Injection Prevention

Drizzle ORM prevents SQL injection automatically:

```typescript
// Safe - parameterized query
await db.select().from(users).where(eq(users.email, userInput))

// Never do this:
// await db.execute(sql`SELECT * FROM users WHERE email = '${userInput}'`)
```

---

## Troubleshooting

### Error: "NEXTAUTH_SECRET is not defined"

**Solution**: Add to `.env.local`:

```bash
NEXTAUTH_SECRET=$(openssl rand -base64 32)
```

### Error: "Invalid email or password"

**Possible causes**:

1. Wrong credentials
2. User doesn't exist
3. Password not hashed correctly
4. Database connection issue

**Debug**:

```typescript
// Enable debug mode
debug: true
```

### Error: "Account deactivated"

User's `isActive` field is `false`.

**Solution**: Reactivate in database:

```sql
UPDATE users SET is_active = true WHERE email = 'user@example.com';
```

### Session Not Persisting

**Possible causes**:

1. Cookies blocked
2. Incorrect NEXTAUTH_URL
3. HTTPS/HTTP mismatch

**Solution**:

- Check browser dev tools > Application > Cookies
- Verify NEXTAUTH_URL matches your actual URL
- Use HTTPS in production

### Redirect Loop

**Cause**: Middleware redirecting to protected page

**Solution**: Ensure auth pages are not protected:

```typescript
if (pathname.startsWith('/api/auth') && !pathname.startsWith('/api/auth/session')) {
  return NextResponse.next()
}
```

### "Cannot find module 'next-auth'"

**Solution**:

```bash
npm install next-auth@beta
```

---

## Production Deployment

### Checklist

- [ ] Change default admin password
- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Use HTTPS (update `NEXTAUTH_URL`)
- [ ] Enable rate limiting
- [ ] Set up monitoring for failed login attempts
- [ ] Configure session timeout appropriately
- [ ] Test all protected routes
- [ ] Verify role-based access works
- [ ] Set up password reset flow (optional)
- [ ] Enable 2FA (optional, future enhancement)

### Environment Variables

```bash
# Production .env
NEXTAUTH_URL=https://duo-soluciones.com
NEXTAUTH_SECRET=<strong-random-secret>
DATABASE_URL=postgresql://...
```

### Monitoring

Log authentication events:

```typescript
events: {
  async signIn({ user }) {
    console.log(`[AUTH] User signed in: ${user.email}`)
    // Send to logging service (e.g., Sentry, LogRocket)
  },
  async signOut({ token }) {
    console.log(`[AUTH] User signed out: ${token.email}`)
  },
}
```

---

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [NextAuth.js v5 Guide](https://authjs.dev/getting-started/migrating-to-v5)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)

---

**Document Version**: 1.0
**Last Updated**: October 2025
**Maintained By**: DUO Soluciones Development Team
