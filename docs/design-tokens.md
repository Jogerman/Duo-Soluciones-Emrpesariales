# Design Tokens - DUO Soluciones Empresariales

Design tokens son las decisiones de diseño fundamentales expresadas como variables reutilizables.

## Colors

### Brand Colors

| Token             | Value         | RGB              | Usage                   |
| ----------------- | ------------- | ---------------- | ----------------------- |
| `primary-50`      | `#f0f9f9`     | `240, 249, 249`  | Light backgrounds       |
| `primary-100`     | `#d9f0f0`     | `217, 240, 240`  | Subtle hover states     |
| `primary-200`     | `#b7e2e3`     | `183, 226, 227`  | Soft borders            |
| `primary-300`     | `#86cccf`     | `134, 204, 207`  | Disabled elements       |
| `primary-400`     | `#4eacb3`     | `78, 172, 179`   | Interactive hover       |
| `primary-500`     | `#2d8b94`     | `45, 139, 148`   | Active states           |
| **`primary-600`** | **`#1b5e5e`** | **`27, 94, 94`** | **Primary brand color** |
| `primary-700`     | `#1a5353`     | `26, 83, 83`     | Primary hover           |
| `primary-800`     | `#1a4545`     | `26, 69, 69`     | Pressed states          |
| `primary-900`     | `#1a3a3b`     | `26, 58, 59`     | Dark text               |
| `primary-950`     | `#0a2222`     | `10, 34, 34`     | Darkest backgrounds     |

| Token               | Value         | RGB               | Usage                     |
| ------------------- | ------------- | ----------------- | ------------------------- |
| `secondary-50`      | `#eff6ff`     | `239, 246, 255`   | Light backgrounds         |
| `secondary-100`     | `#dbeafe`     | `219, 234, 254`   | Subtle hover states       |
| `secondary-200`     | `#bfdbfe`     | `191, 219, 254`   | Soft borders              |
| `secondary-300`     | `#93bbfd`     | `147, 187, 253`   | Disabled elements         |
| `secondary-400`     | `#609afa`     | `96, 154, 250`    | Links                     |
| `secondary-500`     | `#3b75f6`     | `59, 117, 246`    | Interactive elements      |
| `secondary-600`     | `#2554eb`     | `37, 84, 235`     | Secondary hover           |
| **`secondary-700`** | **`#1e3a8a`** | **`30, 58, 138`** | **Secondary brand color** |
| `secondary-800`     | `#1e3a78`     | `30, 58, 120`     | Secondary hover dark      |
| `secondary-900`     | `#1e326f`     | `30, 50, 111`     | Dark text                 |
| `secondary-950`     | `#172044`     | `23, 32, 68`      | Darkest backgrounds       |

### Neutral Colors

| Token         | Value     | Usage               |
| ------------- | --------- | ------------------- |
| `neutral-50`  | `#f8fafc` | Lightest background |
| `neutral-100` | `#f1f5f9` | Light background    |
| `neutral-200` | `#e2e8f0` | Subtle borders      |
| `neutral-300` | `#cbd5e1` | Borders             |
| `neutral-400` | `#94a3b8` | Placeholders        |
| `neutral-500` | `#64748b` | Secondary text      |
| `neutral-600` | `#475569` | Primary text        |
| `neutral-700` | `#334155` | Headings            |
| `neutral-800` | `#1e293b` | Dark headings       |
| `neutral-900` | `#0f172a` | Darkest text        |
| `neutral-950` | `#020617` | True black          |

### Semantic Colors

| Token         | Value     | Usage                                 |
| ------------- | --------- | ------------------------------------- |
| `success-500` | `#10b981` | Success messages, positive indicators |
| `warning-500` | `#f59e0b` | Warning messages, alerts              |
| `error-500`   | `#ef4444` | Error messages, destructive actions   |
| `info-500`    | `#3b82f6` | Information, tooltips                 |

## Typography

### Font Families

```typescript
font-sans: ['Poppins', 'system-ui', 'sans-serif']
font-mono: ['JetBrains Mono', 'monospace'] // For code
```

### Font Sizes

| Token       | Size            | Line Height    | Usage                  |
| ----------- | --------------- | -------------- | ---------------------- |
| `text-xs`   | 0.75rem (12px)  | 1rem (16px)    | Captions, small labels |
| `text-sm`   | 0.875rem (14px) | 1.25rem (20px) | Small body text        |
| `text-base` | 1rem (16px)     | 1.5rem (24px)  | Body text              |
| `text-lg`   | 1.125rem (18px) | 1.75rem (28px) | Large body text        |
| `text-xl`   | 1.25rem (20px)  | 1.75rem (28px) | Small headings         |
| `text-2xl`  | 1.5rem (24px)   | 2rem (32px)    | Medium headings        |
| `text-3xl`  | 1.875rem (30px) | 2.25rem (36px) | Large headings         |
| `text-4xl`  | 2.25rem (36px)  | 2.5rem (40px)  | XL headings            |
| `text-5xl`  | 3rem (48px)     | 1              | Display text           |
| `text-6xl`  | 3.75rem (60px)  | 1              | Large display          |

### Font Weights

| Token           | Value | Usage                 |
| --------------- | ----- | --------------------- |
| `font-light`    | 300   | Subtle text, captions |
| `font-normal`   | 400   | Body text             |
| `font-medium`   | 500   | Labels, navigation    |
| `font-semibold` | 600   | Subheadings, emphasis |
| `font-bold`     | 700   | Headings, CTAs        |

### Letter Spacing

| Token              | Value    | Usage          |
| ------------------ | -------- | -------------- |
| `tracking-tighter` | -0.05em  | Large display  |
| `tracking-tight`   | -0.025em | Headings       |
| `tracking-normal`  | 0em      | Body text      |
| `tracking-wide`    | 0.025em  | Labels         |
| `tracking-wider`   | 0.05em   | Uppercase text |

## Spacing

Base unit: 4px (0.25rem)

| Token       | Value    | Pixels | Usage                 |
| ----------- | -------- | ------ | --------------------- |
| `space-0`   | 0        | 0px    | Reset                 |
| `space-0.5` | 0.125rem | 2px    | Tight spacing         |
| `space-1`   | 0.25rem  | 4px    | Very small gaps       |
| `space-2`   | 0.5rem   | 8px    | Small gaps            |
| `space-3`   | 0.75rem  | 12px   | Medium-small gaps     |
| `space-4`   | 1rem     | 16px   | Base spacing          |
| `space-5`   | 1.25rem  | 20px   | Medium gaps           |
| `space-6`   | 1.5rem   | 24px   | Large gaps            |
| `space-8`   | 2rem     | 32px   | XL gaps               |
| `space-10`  | 2.5rem   | 40px   | Section spacing       |
| `space-12`  | 3rem     | 48px   | Large section spacing |
| `space-16`  | 4rem     | 64px   | Very large spacing    |
| `space-20`  | 5rem     | 80px   | Hero spacing          |
| `space-24`  | 6rem     | 96px   | Maximum spacing       |

## Border Radius

| Token          | Value    | Pixels | Usage            |
| -------------- | -------- | ------ | ---------------- |
| `rounded-none` | 0        | 0px    | Sharp corners    |
| `rounded-sm`   | 0.125rem | 2px    | Subtle rounding  |
| `rounded`      | 0.25rem  | 4px    | Default          |
| `rounded-md`   | 0.375rem | 6px    | Inputs, buttons  |
| `rounded-lg`   | 0.5rem   | 8px    | Cards            |
| `rounded-xl`   | 0.75rem  | 12px   | Large cards      |
| `rounded-2xl`  | 1rem     | 16px   | Hero elements    |
| `rounded-3xl`  | 1.5rem   | 24px   | Special elements |
| `rounded-full` | 9999px   | ∞      | Pills, avatars   |

## Shadows

| Token        | Value                                                                 | Usage             |
| ------------ | --------------------------------------------------------------------- | ----------------- |
| `shadow-sm`  | `0 1px 2px 0 rgb(0 0 0 / 0.05)`                                       | Subtle elevation  |
| `shadow`     | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`       | Default elevation |
| `shadow-md`  | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`    | Cards hover       |
| `shadow-lg`  | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`  | Dropdowns         |
| `shadow-xl`  | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Modals            |
| `shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)`                                 | Hero elements     |

## Animations

### Duration

| Token          | Value | Usage               |
| -------------- | ----- | ------------------- |
| `duration-75`  | 75ms  | Instant feedback    |
| `duration-150` | 150ms | Fast transitions    |
| `duration-300` | 300ms | Default transitions |
| `duration-500` | 500ms | Slow transitions    |
| `duration-700` | 700ms | Complex animations  |

### Timing Functions

| Token         | Value                          | Usage          |
| ------------- | ------------------------------ | -------------- |
| `ease-linear` | `linear`                       | Constant speed |
| `ease-in`     | `cubic-bezier(0.4, 0, 1, 1)`   | Accelerating   |
| `ease-out`    | `cubic-bezier(0, 0, 0.2, 1)`   | Decelerating   |
| `ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth curve   |

### Custom Animations

```typescript
// Fade In
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

// Slide Up
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Bounce Gentle
@keyframes bounceGentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

## Breakpoints

| Token | Value  | Description    |
| ----- | ------ | -------------- |
| `sm`  | 640px  | Small tablets  |
| `md`  | 768px  | Tablets        |
| `lg`  | 1024px | Small desktops |
| `xl`  | 1280px | Desktops       |
| `2xl` | 1536px | Large desktops |

## Z-Index Scale

| Token    | Value | Usage            |
| -------- | ----- | ---------------- |
| `z-0`    | 0     | Default          |
| `z-10`   | 10    | Dropdown         |
| `z-20`   | 20    | Sticky elements  |
| `z-30`   | 30    | Fixed headers    |
| `z-40`   | 40    | Overlays         |
| `z-50`   | 50    | Modals           |
| `z-auto` | auto  | Reset to default |

## Opacity Scale

| Token         | Value | Usage         |
| ------------- | ----- | ------------- |
| `opacity-0`   | 0     | Hidden        |
| `opacity-5`   | 0.05  | Very subtle   |
| `opacity-10`  | 0.1   | Subtle        |
| `opacity-20`  | 0.2   | Light         |
| `opacity-40`  | 0.4   | Medium        |
| `opacity-60`  | 0.6   | Prominent     |
| `opacity-80`  | 0.8   | Strong        |
| `opacity-100` | 1     | Fully visible |

## Grid & Layout

### Container Max Widths

| Token        | Value  | Usage                  |
| ------------ | ------ | ---------------------- |
| `max-w-sm`   | 640px  | Small containers       |
| `max-w-md`   | 768px  | Medium containers      |
| `max-w-lg`   | 1024px | Large containers       |
| `max-w-xl`   | 1280px | XL containers          |
| `max-w-2xl`  | 1536px | 2XL containers         |
| `max-w-7xl`  | 1280px | Main content (default) |
| `max-w-full` | 100%   | Full width             |

### Gap Sizes

| Token   | Value         | Usage         |
| ------- | ------------- | ------------- |
| `gap-2` | 0.5rem (8px)  | Tight grid    |
| `gap-4` | 1rem (16px)   | Default grid  |
| `gap-6` | 1.5rem (24px) | Spacious grid |
| `gap-8` | 2rem (32px)   | Large grid    |

## Component-Specific Tokens

### Buttons

```typescript
height: 40px (h-10)
padding-x: 16px (px-4)
border-radius: 6px (rounded-md)
font-size: 14px (text-sm)
font-weight: 500 (font-medium)
transition: 200ms (duration-200)
```

### Inputs

```typescript
height: 40px (h-10)
padding-x: 12px (px-3)
border-width: 1px
border-color: neutral-300
border-radius: 6px (rounded-md)
focus-ring: 2px primary-600
```

### Cards

```typescript
padding: 24px (p-6)
border-radius: 12px (rounded-xl)
border: 1px solid neutral-200
shadow: shadow-sm
hover-shadow: shadow-md
transition: 300ms (duration-300)
```

## Usage Examples

### TailwindCSS Classes

```tsx
// Primary Button
className =
  'bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors duration-200'

// Card
className =
  'p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-300'

// Heading
className = 'text-4xl font-bold text-neutral-900 tracking-tight'

// Body Text
className = 'text-base text-neutral-600 leading-relaxed'
```

### CSS Variables (Optional)

```css
:root {
  --color-primary: #1b5e5e;
  --color-secondary: #1e3a8a;
  --spacing-unit: 0.25rem;
  --border-radius-default: 0.5rem;
  --transition-default: 300ms ease-in-out;
}
```

---

**Versión**: 1.0
**Última actualización**: Octubre 2024
**Mantenido por**: Equipo de Diseño DUO
