# DUO Soluciones Empresariales - Brand Guidelines

## Identidad de Marca

DUO Soluciones Empresariales es una consultora estratégica especializada en transformación organizacional. Nuestra identidad visual refleja profesionalismo, confianza, innovación y compromiso con la excelencia.

## Color Palette

### Colores Primarios

#### Primary - Verde Azulado (#1b5e5e)

- **Hex**: `#1b5e5e`
- **RGB**: `27, 94, 94`
- **HSL**: `180°, 56%, 24%`
- **Uso**: Botones primarios, enlaces, elementos destacados
- **Significado**: Profesionalismo, confianza, crecimiento sostenible

**Escala de Tonos:**

- 50: `#f0f9f9` - Backgrounds ligeros
- 100: `#d9f0f0` - Hover states sutiles
- 200: `#b7e2e3` - Borders suaves
- 300: `#86cccf` - Disabled states
- 400: `#4eacb3` - Hover secundario
- 500: `#2d8b94` - Active states
- **600: `#1b5e5e`** - **Color principal**
- 700: `#1a5353` - Hover primario
- 800: `#1a4545` - Pressed states
- 900: `#1a3a3b` - Text oscuro
- 950: `#0a2222` - Backgrounds oscuros

#### Secondary - Azul Marino (#1e3a8a)

- **Hex**: `#1e3a8a`
- **RGB**: `30, 58, 138`
- **HSL**: `222°, 77%, 33%`
- **Uso**: Acentos, botones secundarios, navegación
- **Significado**: Autoridad, estabilidad, confianza corporativa

**Escala de Tonos:**

- 50: `#eff6ff` - Backgrounds ligeros
- 100: `#dbeafe` - Hover states sutiles
- 200: `#bfdbfe` - Borders suaves
- 300: `#93bbfd` - Disabled states
- 400: `#609afa` - Links
- 500: `#3b75f6` - Interactive elements
- 600: `#2554eb` - Hover secundario
- **700: `#1e3a8a`** - **Color principal**
- 800: `#1e3a78` - Hover primario
- 900: `#1e326f` - Text oscuro
- 950: `#172044` - Backgrounds oscuros

### Colores Neutrales

Usamos una escala de grises neutral para texto, backgrounds y borders:

- 50-100: Backgrounds muy claros
- 200-300: Borders, dividers
- 400-500: Texto secundario, placeholders
- 600-700: Texto principal
- 800-900: Texto destacado, headings
- 950: Negro corporativo

### Colores Semánticos

#### Success - Verde

- **Color**: `#10b981` (green-500)
- **Uso**: Mensajes de éxito, indicadores positivos

#### Warning - Amarillo

- **Color**: `#f59e0b` (yellow-500)
- **Uso**: Alertas, precauciones

#### Error - Rojo

- **Color**: `#ef4444` (red-500)
- **Uso**: Errores, validaciones fallidas

#### Info - Azul

- **Color**: `#3b82f6` (blue-500)
- **Uso**: Información, tooltips

## Typography

### Fuente Principal: Poppins

**Familia**: Google Fonts - Poppins
**Pesos disponibles**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)

#### Uso de Pesos

- **300 (Light)**: Subtítulos, texto de soporte, captions
- **400 (Regular)**: Texto de cuerpo, párrafos
- **500 (Medium)**: Labels, navigation items
- **600 (Semi-Bold)**: Subtítulos destacados, card titles
- **700 (Bold)**: Headings principales, CTAs

### Escala Tipográfica

```
Display XL:  60px / 72px (3.75rem) - Bold (700)
Display LG:  48px / 56px (3rem)    - Bold (700)
Heading XL:  40px / 48px (2.5rem)  - Bold (700)
Heading LG:  32px / 40px (2rem)    - Bold (700)
Heading MD:  24px / 32px (1.5rem)  - Semi-Bold (600)
Heading SM:  20px / 28px (1.25rem) - Semi-Bold (600)
Body LG:     18px / 28px (1.125rem)- Regular (400)
Body:        16px / 24px (1rem)    - Regular (400)
Body SM:     14px / 20px (0.875rem)- Regular (400)
Caption:     12px / 16px (0.75rem) - Medium (500)
```

### Line Height

- Headings: 1.2 - 1.3 (tight)
- Body text: 1.5 - 1.75 (relaxed)
- Captions: 1.4

### Letter Spacing

- Headings: -0.02em (tight tracking)
- Body: 0 (normal)
- Labels/Buttons: 0.01em
- Uppercase text: 0.05em

## Spacing System

Sistema basado en múltiplos de 4px:

```
Space 1:  4px   (0.25rem)
Space 2:  8px   (0.5rem)
Space 3:  12px  (0.75rem)
Space 4:  16px  (1rem)
Space 5:  20px  (1.25rem)
Space 6:  24px  (1.5rem)
Space 8:  32px  (2rem)
Space 10: 40px  (2.5rem)
Space 12: 48px  (3rem)
Space 16: 64px  (4rem)
Space 20: 80px  (5rem)
Space 24: 96px  (6rem)
```

### Aplicación de Espaciado

- **Component padding**: 16px - 24px
- **Section padding**: 64px - 96px (vertical)
- **Card spacing**: 24px (interno)
- **Gap entre elementos**: 8px - 16px
- **Margins entre secciones**: 48px - 96px

## Border Radius

Sistema de bordes redondeados:

```
radius-sm:  4px   (0.25rem)  - Small elements
radius-md:  6px   (0.375rem) - Inputs, buttons
radius-lg:  8px   (0.5rem)   - Cards, modals
radius-xl:  12px  (0.75rem)  - Large cards
radius-2xl: 16px  (1rem)     - Hero elements
radius-full: 9999px          - Pills, badges
```

## Shadows

Sistema de elevación con sombras:

```css
shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.05)
shadow:     0 1px 3px rgba(0, 0, 0, 0.1)
shadow-md:  0 4px 6px rgba(0, 0, 0, 0.1)
shadow-lg:  0 10px 15px rgba(0, 0, 0, 0.1)
shadow-xl:  0 20px 25px rgba(0, 0, 0, 0.1)
shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25)
```

### Uso de Sombras

- Cards en reposo: `shadow-sm`
- Cards hover: `shadow-md`
- Modals/Dialogs: `shadow-xl`
- Dropdowns: `shadow-lg`
- Hero elements: `shadow-2xl`

## Animations

### Timing Functions

```css
ease-in:     cubic-bezier(0.4, 0, 1, 1)
ease-out:    cubic-bezier(0, 0, 0.2, 1)
ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

### Duration

- **Fast**: 150ms - Hovers, micro-interactions
- **Normal**: 300ms - Transitions, fades
- **Slow**: 500ms - Complex animations
- **Slower**: 700ms - Page transitions

### Animaciones Comunes

- Fade in: opacity 0 → 1
- Slide up: translateY(20px) → 0
- Scale: scale(0.95) → 1
- Hover lift: translateY(0) → translateY(-4px)

## Grid & Layout

### Container Widths

```
max-w-7xl: 1280px (default)
max-w-6xl: 1152px
max-w-5xl: 1024px
```

### Breakpoints

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### Grid Systems

- **2 columns**: md:grid-cols-2
- **3 columns**: lg:grid-cols-3
- **4 columns**: lg:grid-cols-4 (servicios)
- **Gap**: 16px (mobile) - 32px (desktop)

## Tone & Voice

### Personalidad de Marca

- **Profesional**: Lenguaje técnico pero accesible
- **Confiable**: Mensajes claros y directos
- **Innovador**: Enfoque en transformación digital
- **Cercano**: Tono consultivo, no corporativo frío

### Mensajes Clave

1. "Transformamos desafíos en oportunidades sostenibles"
2. "Más de 28 años impulsando el éxito organizacional"
3. "Tu socio estratégico en transformación empresarial"
4. "Excelencia en consultoría, resultados medibles"

### Estilo de Escritura

- Usar voz activa
- Frases concisas y directas
- Evitar jerga innecesaria
- Enfocarse en beneficios, no solo características
- Incluir datos y resultados cuando sea posible

## Imagery Guidelines

### Estilo Fotográfico

- **Preferencia**: Fotografía profesional auténtica
- **Evitar**: Stock photos genéricas
- **Temas**: Equipos trabajando, reuniones estratégicas, tecnología en uso
- **Colores**: Mantener coherencia con palette (tonos teal y navy)

### Uso de Imágenes

- **Hero sections**: Imágenes de alto impacto, 1920x1080
- **Cards**: Aspectos 16:9 o 4:3
- **Team photos**: Headshots profesionales, fondo neutral
- **Case studies**: Screenshots de sistemas, gráficas de resultados

### Optimización

- Formato: WebP con fallback a JPG
- Compresión: Quality 80-85%
- Lazy loading para imágenes below-fold
- Usar Next.js Image component

## Iconografía

### Biblioteca Principal

**Lucide React**: Sistema de iconos consistente y minimalista

### Estilo de Iconos

- **Peso**: 2px stroke
- **Tamaño base**: 24px (1.5rem)
- **Variantes**: 16px, 20px, 24px, 32px
- **Color**: Heredar del texto padre

### Uso de Iconos

- Navegación: 20px
- Buttons: 16px-20px
- Feature cards: 24px-32px
- Social media: 20px
- Status indicators: 16px

## Components Design Patterns

### Buttons

- **Primary**: Fondo primary-600, texto blanco
- **Secondary**: Fondo secondary-700, texto blanco
- **Outline**: Border primary-600, texto primary-600
- **Ghost**: Sin fondo, hover bg-neutral-100
- **Link**: Sin fondo, underline hover

### Cards

- Border: 1px solid neutral-200
- Border radius: 12px (xl)
- Padding: 24px
- Hover: Elevar shadow de sm a md
- Transition: 300ms ease

### Forms

- Input height: 40px (h-10)
- Border: 1px solid neutral-300
- Focus: Ring primary-600, 2px
- Error: Border red-500, ring red-500
- Label: text-sm, font-medium

### Navigation

- Sticky header: backdrop-blur, 95% opacity
- Height: 64px (h-16)
- Hover: text-primary-600
- Active: text-primary-600, font-semibold
- Mobile menu: Full-screen overlay

## Accessibility

### Contraste de Color

- Texto normal: Mínimo 4.5:1
- Texto grande (18px+): Mínimo 3:1
- Elementos UI: Mínimo 3:1

### Focus States

- Visible en todos los elementos interactivos
- Ring de 2px con color primary-600
- Offset de 2px

### Semantic HTML

- Usar elementos semánticos (header, nav, main, section, footer)
- Headings en orden jerárquico (h1→h2→h3)
- Alt text descriptivo en imágenes
- ARIA labels donde sea necesario

## Responsive Design

### Mobile-First Approach

Diseñar primero para móvil, luego escalar:

```
Base (mobile):    Stack vertical, padding reducido
sm (640px+):      Ajustes menores
md (768px+):      2 columnas, navegación horizontal
lg (1024px+):     3-4 columnas, espaciado completo
xl (1280px+):     Layout final, máximo ancho
```

### Touch Targets

- Mínimo: 44x44px
- Recomendado: 48x48px
- Espaciado entre targets: 8px mínimo

## Brand Applications

### Uso del Logo

- **Mínimo tamaño**: 32px de alto
- **Espacio de respeto**: 16px en todos los lados
- **Fondos**: Preferiblemente blanco o muy claros
- **Variantes**: Full logo, solo "DUO" para espacios pequeños

### Gradientes de Marca

```css
/* Primary to Secondary */
background: linear-gradient(135deg, #1b5e5e 0%, #1e3a8a 100%);

/* Light variant */
background: linear-gradient(135deg, #4eacb3 0%, #609afa 100%);

/* Subtle background */
background: linear-gradient(135deg, #f0f9f9 0%, #eff6ff 100%);
```

## Do's and Don'ts

### ✅ Do

- Usar colores de marca consistentemente
- Mantener jerarquía tipográfica clara
- Proveer suficiente contraste
- Usar espaciado del sistema
- Optimizar imágenes
- Testear en múltiples dispositivos
- Seguir patrones establecidos

### ❌ Don't

- Usar colores fuera de la palette
- Mezclar demasiados pesos de fuente
- Ignorar estados hover/focus
- Usar sombras inconsistentes
- Sobrecargar con animaciones
- Romper la grid sin razón
- Usar stock photos genéricas

---

**Versión**: 1.0
**Última actualización**: Octubre 2024
**Contacto**: dev@duosoluciones.com.do
