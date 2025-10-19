# 🧭 DUO Soluciones Empresariales - Web App Institucional

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Payload CMS](https://img.shields.io/badge/Payload-3.0-000000?style=flat-square&logo=payload)](https://payloadcms.com/)

> Transformamos desafíos en oportunidades sostenibles.

## 📋 Descripción del Proyecto

Web App institucional moderna y dinámica para DUO Soluciones Empresariales, diseñada como la cara digital de la empresa. Una plataforma viva de comunicación empresarial que integra contenidos de LinkedIn y Spotify, posicionando a DUO como autoridad en desarrollo organizacional, mejora de procesos y gobernanza corporativa.

## 🎯 Objetivos Principales

- ✅ Presentar imagen profesional, confiable y moderna
- ✅ Mostrar claramente quiénes somos y cómo generamos valor
- ✅ Integrar contenido dinámico desde LinkedIn (blog) y Spotify (podcast)
- ✅ Posicionamiento SEO desde el día 0
- ✅ Punto de contacto directo con potenciales clientes
- ✅ Base técnica para futuras integraciones (CRM, Analytics)

## 🏗️ Arquitectura Tecnológica

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript 5.6
- **Styling**: TailwindCSS 3.4 + Shadcn/ui
- **Animaciones**: Framer Motion 11
- **Icons**: Lucide React
- **Formularios**: React Hook Form + Zod

### Backend & CMS
- **CMS**: Payload CMS 3.0 (Headless)
- **Base de Datos**: PostgreSQL 16
- **ORM**: Drizzle ORM
- **Auth**: NextAuth.js v5
- **API**: Next.js API Routes + tRPC

### Hosting & Deploy
- **Frontend**: Vercel (Edge Functions)
- **Base de Datos**: Neon/PlanetScale
- **CDN**: Vercel Edge Network
- **Media Storage**: Cloudinary
- **Monitoring**: Vercel Analytics + Sentry

### APIs & Integraciones
- **LinkedIn API**: Company Updates & Articles
- **Spotify Web API**: Podcast Episodes
- **Analytics**: Google Analytics 4 + Vercel Analytics
- **SEO**: Next.js Metadata API + Structured Data
- **Email**: Resend + React Email

## 📁 Estructura del Proyecto

```
duo-soluciones-web/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── (marketing)/        # Marketing pages
│   │   ├── (admin)/           # Admin dashboard
│   │   ├── api/               # API routes
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── ui/                # Shadcn/ui components
│   │   ├── marketing/         # Marketing components
│   │   └── admin/            # Admin components
│   ├── lib/                   # Utilities & config
│   │   ├── db/               # Database schema
│   │   ├── auth/             # Authentication
│   │   └── integrations/     # API integrations
│   ├── types/                # TypeScript definitions
│   └── styles/               # CSS modules & components
├── payload/                   # Payload CMS config
├── public/                    # Static assets
├── docs/                     # Documentation
└── tests/                    # Test suites
```

## 🚀 Funcionalidades Principales

### Etapa 1 - MVP (4-5 semanas)
- **Páginas Core**: Home, Sobre Nosotros, Servicios, Blog, Podcast, Contacto
- **CMS Dinámico**: Gestión de contenido con Payload CMS
- **SEO Básico**: Metadatos, sitemap, indexación
- **Responsive Design**: Mobile-first approach
- **Formulario de Contacto**: Integración con email
- **Preparación APIs**: Estructura para integraciones futuras

### Etapa 2 - Integraciones (3-4 semanas)
- **LinkedIn API**: Sincronización automática de artículos
- **Spotify API**: Episodios de podcast embebidos
- **SEO Avanzado**: Schema.org, Open Graph, Analytics
- **Multilenguaje**: Español/Inglés
- **Analytics Completo**: GA4 + Custom Events
- **Optimización Performance**: Edge caching, image optimization

## 🛠️ Instalación y Desarrollo

### Prerrequisitos
```bash
Node.js 20+
pnpm 9+
PostgreSQL 16+
```

### Setup Local
```bash
# Clonar repositorio
git clone https://github.com/duo-soluciones/web-app.git
cd web-app

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local

# Configurar base de datos
pnpm db:push
pnpm db:seed

# Iniciar desarrollo
pnpm dev
```

### Variables de Entorno
```env
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."

# APIs
LINKEDIN_CLIENT_ID="..."
LINKEDIN_CLIENT_SECRET="..."
SPOTIFY_CLIENT_ID="..."
SPOTIFY_CLIENT_SECRET="..."

# Services
RESEND_API_KEY="..."
CLOUDINARY_URL="..."
```

## 📊 SEO Strategy

### Arquitectura SEO
- URLs semánticas: `/servicios/desarrollo-organizacional`
- Metadatos completos con Next.js Metadata API
- Schema.org structured data
- Open Graph optimizado
- Sitemap dinámico
- Performance optimizado (Core Web Vitals)

### Palabras Clave Objetivo
- Desarrollo organizacional
- Mejora de procesos
- Gobernanza corporativa
- Inteligencia de negocio
- ERP implementation
- MS Dynamics
- Power BI

## 🔄 Roadmap de Desarrollo

### Fase 1: MVP (Semanas 1-5)
- [ ] Setup del proyecto y arquitectura
- [ ] Diseño UI/UX con Figma
- [ ] Desarrollo de componentes base
- [ ] Implementación de páginas core
- [ ] Integración Payload CMS
- [ ] SEO básico y performance
- [ ] Testing y deployment

### Fase 2: Integraciones (Semanas 6-9)
- [ ] LinkedIn API integration
- [ ] Spotify API integration
- [ ] Sistema de analytics avanzado
- [ ] Multilenguaje (i18n)
- [ ] Optimizaciones finales
- [ ] Documentation completa

## 👥 Equipo de Desarrollo

- **Product Owner**: Dirección General DUO
- **Project Manager**: Coordinación técnica
- **Full-Stack Developer**: Next.js + Payload CMS
- **UI/UX Designer**: Diseño y experiencia
- **Content Strategist**: SEO y contenido
- **DevOps Engineer**: Deploy y monitoreo

## 📈 Métricas y Monitoreo

### Performance Goals
- **Core Web Vitals**: Todos en verde
- **Lighthouse Score**: 95+ en todas las categorías
- **Time to First Byte**: < 200ms
- **First Contentful Paint**: < 1.2s
- **Largest Contentful Paint**: < 2.5s

### Analytics
- Google Analytics 4
- Vercel Analytics
- Hotjar para UX insights
- Sentry para error tracking

## 🔒 Seguridad

- HTTPS obligatorio
- CSP headers
- Rate limiting
- Input validation con Zod
- SQL injection protection
- XSS protection
- Backup automático diario

## 📚 Documentación Adicional

- [Planning de Desarrollo](./PLANNING.md)
- [Lista de Tareas](./TASK.md)
- [Instrucciones Claude](./CLAUDE.md)
- [Guía de Contribución](./CONTRIBUTING.md)
- [Deployment Guide](./DEPLOYMENT.md)

## 📞 Contacto

**DUO Soluciones Empresariales**
- Web: [duo-soluciones.com](https://duo-soluciones.com)
- Email: info@duo-soluciones.com
- LinkedIn: [DUO Soluciones Empresariales](https://linkedin.com/company/duo-soluciones)

---

**Versión**: 1.0  
**Fecha**: Octubre 2025  
**Licencia**: Propietary - DUO Soluciones Empresariales
