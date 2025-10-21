# Guía de Deployment - Railway + Supabase

Esta guía proporciona instrucciones paso a paso para desplegar la aplicación DUO Soluciones Empresariales en Railway con base de datos Supabase.

## Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Configuración de Supabase](#configuración-de-supabase)
3. [Configuración de Railway](#configuración-de-railway)
4. [Variables de Entorno](#variables-de-entorno)
5. [Deployment](#deployment)
6. [Post-Deployment](#post-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener:

- [ ] Cuenta en [Railway](https://railway.app/) (gratis)
- [ ] Cuenta en [Supabase](https://supabase.com/) (gratis)
- [ ] Repositorio en GitHub con el código
- [ ] Node.js 18+ instalado localmente (para testing)

### Servicios Opcionales

- [ ] Cuenta en [Resend](https://resend.com/) - Para emails del formulario de contacto
- [ ] Cuenta en [Upstash](https://upstash.com/) - Para rate limiting de API
- [ ] Cuenta en [Cloudinary](https://cloudinary.com/) - Para gestión de imágenes (si se usa CMS)

---

## Configuración de Supabase

### 1. Crear Proyecto

1. Ve a [Supabase Dashboard](https://app.supabase.com/)
2. Click en "New Project"
3. Completa los datos:
   - **Name**: `duo-soluciones-production`
   - **Database Password**: Guarda esta contraseña de forma segura
   - **Region**: `East US (North Virginia)` (más cercano a DR)
   - **Pricing Plan**: Free (suficiente para iniciar)
4. Click "Create new project" (toma 2-3 minutos)

### 2. Obtener Connection String

1. En el Dashboard de tu proyecto, ve a **Settings** > **Database**
2. Busca la sección **Connection String**
3. Selecciona el modo **Transaction** (puerto 5432)
4. Copia la cadena de conexión:
   ```
   postgresql://postgres.[PROJECT_REF]:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
   ```
5. Reemplaza `[YOUR-PASSWORD]` con la contraseña que creaste
6. Guarda esta cadena - la necesitarás para Railway

### 3. Ejecutar Migraciones (Cuando estés listo)

```bash
# Configurar DATABASE_URL local apuntando a Supabase
export DATABASE_URL="tu-connection-string-aqui"

# Ejecutar migraciones
npm run db:push

# Opcional: Seed inicial
npm run db:seed
```

---

## Configuración de Railway

### 1. Crear Nuevo Proyecto

1. Ve a [Railway Dashboard](https://railway.app/dashboard)
2. Click en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Autoriza Railway a acceder a tu GitHub
5. Selecciona el repositorio `Duo-Soluciones-Empresariales`

### 2. Configurar Servicio

Railway detectará automáticamente que es un proyecto Next.js.

**Configuración automática:**

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Port**: Detectado automáticamente

### 3. Configurar Dominio

Railway te asignará un dominio automático:

```
https://duo-soluciones-production.up.railway.app
```

**Para dominio personalizado (opcional):**

1. Ve a **Settings** > **Domains**
2. Click "Custom Domain"
3. Ingresa tu dominio (ej: `www.duo-soluciones.com`)
4. Configura los DNS records según las instrucciones de Railway

---

## Variables de Entorno

### Variables Requeridas (ALTA PRIORIDAD)

Configura estas variables en Railway Dashboard > Variables:

```bash
# Node Environment
NODE_ENV=production

# App URL (Actualiza con tu dominio de Railway)
NEXT_PUBLIC_APP_URL=https://duo-soluciones-production.up.railway.app

# Database (Supabase)
DATABASE_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres

# NextAuth
NEXTAUTH_URL=https://duo-soluciones-production.up.railway.app
NEXTAUTH_SECRET=GENERAR_CON_COMANDO_ABAJO

# Payload CMS
PAYLOAD_SECRET=GENERAR_CON_COMANDO_ABAJO
```

**Generar Secrets:**

```bash
# En tu terminal local, ejecuta:
openssl rand -base64 32
# Copia el resultado para NEXTAUTH_SECRET

openssl rand -base64 32
# Copia el resultado para PAYLOAD_SECRET (diferente al anterior)
```

### Variables Opcionales (MEDIA PRIORIDAD)

```bash
# Email Service (Resend) - Para formulario de contacto
RESEND_API_KEY=re_tu_api_key_aqui
RESEND_FROM_EMAIL=contacto@duo-soluciones.com

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=https://tu-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=tu_token_aqui
```

**Obtener Resend API Key:**

1. Ve a [Resend.com](https://resend.com/)
2. Regístrate / Inicia sesión
3. Ve a **API Keys** > **Create API Key**
4. Copia la clave

**Obtener Upstash Redis:**

1. Ve a [Upstash Console](https://console.upstash.com/)
2. Crea una nueva base de datos Redis (región: US East)
3. Copia **UPSTASH_REDIS_REST_URL** y **UPSTASH_REDIS_REST_TOKEN**

### Variables de Analytics (BAJA PRIORIDAD)

```bash
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### Configurar Variables en Railway

1. En Railway Dashboard, selecciona tu servicio
2. Ve a la pestaña **Variables**
3. Click en **+ New Variable**
4. Ingresa cada variable una por una
5. Click "Add" después de cada una

**Tip:** Puedes usar "Raw Editor" para pegar múltiples variables a la vez.

---

## Deployment

### 1. Deployment Automático (Recomendado)

Railway está configurado para auto-deploy en cada push a `main`:

```bash
# Hacer commit de tus cambios
git add .
git commit -m "chore: prepare for production deployment"

# Push a GitHub
git push origin main
```

Railway detectará el push y comenzará el deployment automáticamente.

### 2. Monitorear el Deployment

1. Ve a Railway Dashboard > Tu Proyecto
2. Observa la pestaña **Deployments**
3. Verás el progreso en tiempo real:
   - ⏳ Building...
   - ⏳ Deploying...
   - ✅ Success

**Tiempo estimado:** 3-5 minutos

### 3. Verificar el Deployment

Una vez completado:

1. Click en el enlace del dominio Railway
2. Verifica que la página carga correctamente
3. Revisa la consola del navegador (F12) para errores
4. Prueba la navegación entre páginas

---

## Post-Deployment

### Checklist de Verificación

- [ ] Homepage carga correctamente
- [ ] Navegación funciona (About, Services, Contact)
- [ ] Imágenes cargan correctamente
- [ ] Formulario de contacto funciona
- [ ] No hay errores en la consola
- [ ] SEO metadata es correcta (inspeccionar con F12)
- [ ] Open Graph images se generan

### Ejecutar Migraciones de Base de Datos

Si es el primer deployment y aún no has ejecutado migraciones:

```bash
# Opción 1: Desde local con DATABASE_URL de producción
export DATABASE_URL="tu-supabase-url-produccion"
npm run db:push

# Opción 2: Usar Railway CLI
railway run npm run db:push
```

### Configurar Dominio Personalizado

1. En Railway: **Settings** > **Domains** > **Custom Domain**
2. Ingresa tu dominio: `www.duo-soluciones.com`
3. Configura DNS en tu proveedor:
   ```
   Type: CNAME
   Name: www
   Value: duo-soluciones-production.up.railway.app
   TTL: 3600
   ```
4. Actualiza variables de entorno:
   ```bash
   NEXT_PUBLIC_APP_URL=https://www.duo-soluciones.com
   NEXTAUTH_URL=https://www.duo-soluciones.com
   ```

### Configurar Analytics

1. Crea una propiedad en [Google Analytics 4](https://analytics.google.com/)
2. Obtén el Measurement ID (formato: `G-XXXXXXXXXX`)
3. Agrégalo a Railway Variables:
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_ENABLE_ANALYTICS=true
   ```

---

## Troubleshooting

### Build Failures

**Error: "Module not found"**

```bash
# Solución: Verifica que todas las dependencias estén en package.json
npm install
git add package.json package-lock.json
git commit -m "fix: update dependencies"
git push
```

**Error: "Out of memory"**

```bash
# Solución: Aumenta NODE_OPTIONS en Railway Variables
NODE_OPTIONS=--max-old-space-size=4096
```

### Runtime Errors

**Error: "Database connection failed"**

- Verifica que DATABASE_URL esté configurado correctamente
- Asegúrate de usar el puerto correcto (5432 para Transaction mode)
- Revisa que la contraseña no contenga caracteres especiales sin escapar

**Error: "NEXTAUTH_URL mismatch"**

- Asegúrate de que NEXTAUTH_URL coincida exactamente con tu dominio
- No incluyas barra final: ❌ `https://domain.com/` ✅ `https://domain.com`

**Error: "CSRF token mismatch"**

- Verifica NEXTAUTH_SECRET esté configurado
- Asegúrate de usar un secret único (no el del .env.local)

### Performance Issues

**Página carga lenta**

1. Revisa Railway Metrics para identificar cuellos de botella
2. Considera upgrade de plan Railway si CPU/Memory es alto
3. Optimiza imágenes con next/image
4. Habilita caché de Cloudinary

**Base de datos lenta**

1. Revisa Supabase Dashboard > Reports
2. Considera usar Pooler mode (puerto 6543) en lugar de Transaction
3. Agrega índices a tablas frecuentemente consultadas

### Logs y Debugging

**Ver logs en Railway:**

```bash
# Opción 1: Dashboard
Railway Dashboard > Deployments > View Logs

# Opción 2: CLI
railway logs
```

**Ver logs de Supabase:**

```bash
Supabase Dashboard > Logs Explorer
```

---

## Recursos Adicionales

- [Railway Documentation](https://docs.railway.app/)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Railway + Next.js Guide](https://docs.railway.app/guides/nextjs)

---

## Soporte

Si encuentras problemas durante el deployment:

1. Revisa los logs en Railway Dashboard
2. Consulta la sección de Troubleshooting arriba
3. Revisa issues en el repositorio de GitHub
4. Contacta al equipo de desarrollo

---

**Última actualización:** 2025-10-20
**Versión:** 1.0.0
