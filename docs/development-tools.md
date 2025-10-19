# Development Tools Documentation

## Overview

This document describes the development tools, linting, formatting, and testing setup for DUO Soluciones Empresariales.

## Tools Stack

### Code Quality

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Husky**: Git hooks
- **lint-staged**: Run linters on git staged files

### Testing

- **Vitest**: Unit and integration testing
- **React Testing Library**: Component testing
- **jsdom**: DOM environment for tests

## Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript compiler check
```

### Testing

```bash
npm test             # Run tests in watch mode
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage report
```

## Configuration Files

### ESLint (`eslint.config.mjs`)

- Extends Next.js and TypeScript recommended rules
- Custom rules for unused variables and React hooks
- Configured to work with Next.js 15 and React 19

### Prettier (`.prettierrc.json`)

Configuration:

- No semicolons
- Single quotes
- 2 spaces indentation
- Trailing commas (ES5)
- 100 character line width
- Auto end-of-line handling

### Vitest (`vitest.config.ts`)

- jsdom environment for React components
- Global test utilities
- Code coverage with v8 provider
- Path alias `@` for `src/`
- Setup file for testing utilities

### Husky (`.husky/pre-commit`)

Pre-commit hook runs:

1. lint-staged (ESLint + Prettier on staged files)

### lint-staged (`package.json`)

- `.{js,jsx,ts,tsx}`: ESLint + Prettier
- `.{json,css,md}`: Prettier only

## Git Workflow

When you commit code:

1. Husky triggers pre-commit hook
2. lint-staged runs on staged files only
3. ESLint fixes code issues
4. Prettier formats code
5. If all pass, commit proceeds
6. If any fail, fix issues and try again

## Testing Guidelines

### Writing Tests

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component />)
    expect(screen.getByText('Text')).toBeInTheDocument()
  })
})
```

### Running Tests

- Watch mode: `npm test`
- Single run: `npm test -- --run`
- Coverage: `npm run test:coverage`
- UI mode: `npm run test:ui`

### Coverage Reports

Generated in `coverage/` directory:

- HTML report: `coverage/index.html`
- JSON report: `coverage/coverage-final.json`

## Best Practices

### Code Style

1. Use TypeScript strict mode
2. Prefer named exports over default exports (except Next.js pages/layouts)
3. Use const for variables that don't change
4. Use arrow functions for React components
5. Keep components small and focused

### Commit Messages

Follow conventional commits:

- `feat:` New features
- `fix:` Bug fixes
- `chore:` Maintenance tasks
- `docs:` Documentation
- `test:` Tests
- `refactor:` Code refactoring
- `style:` Code style changes

### File Organization

```
src/
├── app/              # Next.js app router
├── components/       # React components
│   ├── ui/          # UI primitives
│   ├── layout/      # Layout components
│   └── sections/    # Page sections
├── lib/             # Utilities and helpers
├── styles/          # Global styles
├── types/           # TypeScript types
└── test/            # Test utilities
```

## Troubleshooting

### ESLint errors on commit

```bash
npm run lint:fix
```

### Prettier formatting issues

```bash
npm run format
```

### Type errors

```bash
npm run type-check
```

### Test failures

```bash
npm test -- --run
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/react)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
