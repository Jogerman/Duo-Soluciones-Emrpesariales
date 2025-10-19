# DUO Soluciones Empresariales - Web App

Plataforma web institucional para DUO Soluciones Empresariales, una consultora especializada en desarrollo organizacional, mejora de procesos, implementación ERP y gobernanza corporativa.

## Stack Tecnológico

### Frontend
- **Next.js 15** - React Framework con App Router
- **TypeScript 5.6** - Type Safety
- **TailwindCSS 3.4** - Utility-first CSS
- **Shadcn/ui** - Component Library
- **Framer Motion 11** - Animations
- **React Hook Form + Zod** - Form Validation

### Backend
- **Payload CMS 3.0** - Headless CMS
- **PostgreSQL 16** - Database
- **Drizzle ORM** - Type-safe ORM
- **NextAuth.js v5** - Authentication
- **Next.js API Routes** - Backend APIs

### DevOps & Hosting
- **Vercel** - Hosting & Edge Functions
- **Neon/PlanetScale** - Database Hosting
- **Cloudinary** - Media Storage
- **GitHub Actions** - CI/CD

## Comenzando

### Prerequisitos

- Node.js 20+
- npm 10+ o pnpm 9+
- PostgreSQL 16+ (local o Docker)
- Git

### Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/Jogerman/Duo-Soluciones-Emrpesariales.git
cd Duo-Soluciones-Emrpesariales
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales.

4. Configurar base de datos:
```bash
npm run db:migrate
npm run db:seed
```

5. Iniciar servidor de desarrollo:
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Build para producción
npm run start        # Inicia servidor de producción
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Corrige errores de ESLint automáticamente
npm run format       # Formatea código con Prettier
npm run type-check   # Verifica tipos de TypeScript
npm run test         # Ejecuta tests con Vitest
npm run test:ui      # Abre UI de testing
npm run db:generate  # Genera migraciones de base de datos
npm run db:migrate   # Ejecuta migraciones
npm run db:studio    # Abre Drizzle Studio
npm run db:seed      # Pobla base de datos con datos de prueba
```

## Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Marketing pages
│   ├── (payload)/         # CMS admin
│   └── api/              # API routes
├── components/            # React components
│   ├── ui/               # Base UI components (Shadcn)
│   ├── marketing/        # Marketing components
│   ├── layout/           # Layout components
│   └── forms/            # Form components
├── lib/                  # Utilities & configurations
│   ├── db/              # Database configuration
│   ├── auth/            # Authentication utilities
│   └── integrations/    # External APIs
├── collections/          # Payload CMS collections
├── types/               # TypeScript type definitions
└── styles/              # Global styles
```

## Características Principales

- **CMS Headless**: Gestión de contenido con Payload CMS
- **Blog Integrado**: Publicación de artículos
- **Podcast Section**: Integración con Spotify
- **Servicios**: 4 áreas de servicio detalladas
- **Formulario de Contacto**: Sistema de contacto funcional
- **SEO Optimizado**: Meta tags y structured data
- **Performance**: Lighthouse score >95
- **Responsive**: Mobile-first design
- **Accesible**: WCAG 2.1 AA compliant
- **Multilenguaje**: Español e Inglés (próximamente)

## Workflow de Desarrollo

1. Crear branch desde `develop`:
```bash
git checkout develop
git pull
git checkout -b feature/nombre-feature
```

2. Desarrollar con commits descriptivos:
```bash
git add .
git commit -m "feat: descripción del cambio"
```

3. Push y crear Pull Request:
```bash
git push origin feature/nombre-feature
```

4. Code review y merge a `develop`
5. Deploy automático a staging
6. Testing en staging
7. Merge a `main` para producción

## Convenciones de Código

- **Componentes**: PascalCase (`ServiceCard.tsx`)
- **Archivos**: kebab-case (`service-card.tsx`)
- **Variables**: camelCase (`isLoading`)
- **Constantes**: SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes**: kebab-case (`hero-section`)

## Testing

Ejecutar tests:
```bash
npm run test
```

Con coverage:
```bash
npm run test:coverage
```

UI de testing:
```bash
npm run test:ui
```

## Deployment

### Staging (Automático desde `develop`)
```bash
git push origin develop
```

### Producción (Automático desde `main`)
```bash
git push origin main
```

## Documentación Adicional

- [Plan de Desarrollo](./Setup_Docs/PLANNING.md)
- [Desglose de Tareas](./Setup_Docs/TASK.md)
- [Guía de Desarrollo](./Setup_Docs/CLAUDE.md)
- [Plan de Ejecución Sprint 1](./EXECUTION_PLAN_SPRINT1.md)

## Contacto

**DUO Soluciones Empresariales**
- Website: https://duo-soluciones.com (próximamente)
- LinkedIn: [DUO Soluciones](https://linkedin.com/company/duo-soluciones)
- Email: info@duo-soluciones.com

## Licencia

Todos los derechos reservados - DUO Soluciones Empresariales © 2025
