# Guía de Contribución - DUO Soluciones Empresariales

Gracias por tu interés en contribuir al proyecto DUO Soluciones Empresariales. Este documento proporciona guidelines para mantener la calidad y consistencia del código.

## Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Convenciones de Código](#convenciones-de-código)
- [Commits](#commits)
- [Pull Requests](#pull-requests)
- [Testing](#testing)
- [Reportar Bugs](#reportar-bugs)

## Código de Conducta

- Sé respetuoso y profesional
- Acepta críticas constructivas
- Enfócate en lo mejor para el proyecto
- Colabora con empatía

## Proceso de Desarrollo

### 1. Fork y Clone

```bash
git clone https://github.com/Jogerman/Duo-Soluciones-Emrpesariales.git
cd Duo-Soluciones-Emrpesariales
```

### 2. Crear Branch

Siempre crea un branch desde `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b tipo/nombre-descriptivo
```

**Tipos de branches**:
- `feature/` - Nueva funcionalidad
- `bugfix/` - Corrección de bug
- `hotfix/` - Fix urgente en producción
- `refactor/` - Refactoring de código
- `docs/` - Cambios en documentación

**Ejemplos**:
- `feature/contact-form`
- `bugfix/navbar-mobile-menu`
- `refactor/database-schema`

### 3. Desarrollar

- Escribe código limpio y bien documentado
- Sigue las convenciones del proyecto
- Añade tests para nueva funcionalidad
- Actualiza documentación si es necesario

### 4. Commits

Sigue la convención de commits:

```
tipo(scope): descripción corta

Descripción larga opcional explicando el cambio en detalle.

Fixes #123
```

**Tipos válidos**:
- `feat` - Nueva funcionalidad
- `fix` - Corrección de bug
- `docs` - Cambios en documentación
- `style` - Formateo, punto y coma faltante, etc
- `refactor` - Refactoring de código
- `perf` - Mejora de performance
- `test` - Añadir o modificar tests
- `chore` - Mantenimiento, deps, config

**Ejemplos**:
```bash
git commit -m "feat(contact): add contact form validation"
git commit -m "fix(navbar): resolve mobile menu overlay issue"
git commit -m "docs(readme): update installation instructions"
```

### 5. Push y Pull Request

```bash
git push origin feature/nombre-feature
```

Luego crea un Pull Request en GitHub.

## Convenciones de Código

### TypeScript

- Usa TypeScript estricto, no `any` sin justificación
- Define interfaces para todas las props
- Usa tipos explícitos en funciones públicas

```typescript
// ✅ BIEN
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>
}

// ❌ MAL
export function Button(props: any) {
  return <button onClick={props.onClick}>{props.label}</button>
}
```

### React Components

- Usa functional components con hooks
- Componentes en PascalCase
- Archivos en kebab-case
- Un componente por archivo

```typescript
// src/components/marketing/service-card.tsx
export function ServiceCard({ service }: ServiceCardProps) {
  return <Card>...</Card>
}
```

### Naming Conventions

- **Componentes**: `PascalCase` (`ServiceCard`)
- **Archivos**: `kebab-case` (`service-card.tsx`)
- **Variables**: `camelCase` (`isLoading`)
- **Constantes**: `SNAKE_CASE` (`API_BASE_URL`)
- **CSS Classes**: `kebab-case` (`hero-section`)
- **Types/Interfaces**: `PascalCase` (`UserProfile`)

### CSS con TailwindCSS

- Usa utility classes de Tailwind
- Evita inline styles
- Usa `cn()` para combinar clases condicionalmente

```typescript
import { cn } from '@/lib/utils'

<div className={cn(
  "base-class",
  featured && "featured-class",
  className
)}>
```

### Imports

Organiza imports en este orden:
1. React y Next.js
2. External libraries
3. Internal components
4. Internal utilities
5. Types
6. Styles

```typescript
import { useState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/date-utils'

import type { Service } from '@/types/database'

import './styles.css'
```

## Testing

### Escribir Tests

- Todos los nuevos features deben incluir tests
- Mínimo 80% de coverage para nuevos archivos
- Tests unitarios con Vitest
- Tests E2E con Playwright

```typescript
// __tests__/components/service-card.test.tsx
import { render, screen } from '@testing-library/react'
import { ServiceCard } from '@/components/marketing/service-card'

describe('ServiceCard', () => {
  it('renders service title', () => {
    const service = { title: 'Test Service' }
    render(<ServiceCard service={service} />)
    expect(screen.getByText('Test Service')).toBeInTheDocument()
  })
})
```

### Ejecutar Tests

```bash
# Todos los tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# UI
npm run test:ui
```

## Pull Requests

### Antes de crear PR

- [ ] Código sigue convenciones del proyecto
- [ ] Tests pasan (`npm run test`)
- [ ] ESLint sin errores (`npm run lint`)
- [ ] TypeScript sin errores (`npm run type-check`)
- [ ] Formateo correcto (`npm run format:check`)
- [ ] Build exitoso (`npm run build`)
- [ ] Documentación actualizada

### Template de PR

```markdown
## Descripción
Breve descripción del cambio

## Tipo de cambio
- [ ] Nueva funcionalidad
- [ ] Corrección de bug
- [ ] Refactoring
- [ ] Documentación

## Testing
Describe cómo se probó este cambio

## Screenshots (si aplica)
Adjunta screenshots o GIFs

## Checklist
- [ ] Tests añadidos/actualizados
- [ ] Documentación actualizada
- [ ] ESLint passing
- [ ] TypeScript passing
- [ ] Build exitoso
```

### Code Review

- Al menos 1 approval requerido
- CI/CD debe estar verde
- Sin conflictos con `develop`
- Comentarios de review deben ser resueltos

## Reportar Bugs

Usa el template de GitHub Issues:

```markdown
## Descripción del Bug
Descripción clara y concisa

## Pasos para Reproducir
1. Ir a '...'
2. Click en '....'
3. Scroll hasta '....'
4. Ver error

## Comportamiento Esperado
Qué debería suceder

## Comportamiento Actual
Qué está sucediendo

## Screenshots
Si aplica

## Entorno
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]

## Información Adicional
Cualquier contexto adicional
```

## Mejores Prácticas

### Performance

- Usa `useMemo` y `useCallback` apropiadamente
- Lazy load componentes pesados
- Optimiza imágenes con Next.js Image
- Implementa code splitting

### Accesibilidad

- Usa semantic HTML
- Incluye aria-labels
- Keyboard navigation
- Test con screen readers
- Mínimo WCAG 2.1 AA

### SEO

- Metadata en todas las páginas
- Structured data (JSON-LD)
- Semantic HTML
- Alt text en imágenes
- Open Graph tags

### Seguridad

- Nunca commitear secrets
- Validar inputs (client + server)
- Sanitizar contenido de usuario
- Usar environment variables
- HTTPS en producción

## Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Payload CMS Docs](https://payloadcms.com/docs)
- [Convenciones de Commits](https://www.conventionalcommits.org/)

## Preguntas

Si tienes preguntas sobre cómo contribuir:

1. Revisa la documentación existente
2. Busca en Issues cerrados
3. Crea un nuevo Issue con tag `question`
4. Contacta al equipo en Slack/Discord

## Agradecimientos

Gracias por contribuir a DUO Soluciones Empresariales. Tu ayuda hace este proyecto mejor para todos.
