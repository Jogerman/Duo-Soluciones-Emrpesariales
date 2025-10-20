# Playwright E2E Testing Documentation

## Overview

This document provides comprehensive documentation for the Playwright end-to-end testing suite implemented for DUO Soluciones Empresariales.

**Test Framework**: Playwright 1.56.1
**Test Runner**: @playwright/test
**Accessibility Tool**: @axe-core/playwright 4.10.2
**Total Test Files**: 7
**Total Test Cases**: 200+
**Coverage**: Layout, UI Components, Accessibility, Performance, Responsive Design

---

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Project Structure](#project-structure)
3. [Running Tests](#running-tests)
4. [Test Suites](#test-suites)
5. [Configuration](#configuration)
6. [CI/CD Integration](#cicd-integration)
7. [Troubleshooting](#troubleshooting)
8. [Best Practices](#best-practices)

---

## Installation & Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Development server running on `http://localhost:3000`

### Installation Steps

```bash
# 1. Install Playwright dependencies
npm install --save-dev @playwright/test @axe-core/playwright

# 2. Install browser binaries
npx playwright install chromium

# Optional: Install all browsers (chromium, firefox, webkit)
npx playwright install
```

### Initial Configuration

The Playwright configuration is located at `D:\Code\Duo Soluciones\playwright.config.ts`.

**Key Features:**

- Multiple browser testing (Chromium, Firefox, WebKit)
- Responsive viewport testing (mobile, tablet, desktop, ultra-wide)
- Automatic dev server startup
- Screenshot and video capture on failure
- HTML and JSON reporting

---

## Project Structure

```
D:\Code\Duo Soluciones\
├── tests/
│   └── e2e/
│       ├── layout.spec.ts          # Header, Footer, Navigation tests
│       ├── ui-components.spec.ts   # Button, Input, Card, Badge tests
│       ├── styleguide.spec.ts      # Style guide page tests
│       ├── homepage.spec.ts        # Homepage and Hero section tests
│       ├── responsive.spec.ts      # Multi-viewport responsive tests
│       ├── accessibility.spec.ts   # WCAG compliance and a11y tests
│       └── performance.spec.ts     # Core Web Vitals and performance tests
├── playwright.config.ts            # Playwright configuration
├── playwright-report/              # HTML test reports (generated)
└── test-results/                   # Test artifacts and screenshots (generated)
```

---

## Running Tests

### NPM Scripts

```bash
# Run all E2E tests (headless mode)
npm run test:e2e

# Run tests in UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run tests in debug mode
npm run test:e2e:debug

# View last test report
npm run test:e2e:report

# Generate test code (Codegen)
npm run test:e2e:codegen
```

### Running Specific Test Files

```bash
# Run only layout tests
npx playwright test tests/e2e/layout.spec.ts

# Run only accessibility tests
npx playwright test tests/e2e/accessibility.spec.ts

# Run specific test by name
npx playwright test -g "should render header"
```

### Running on Specific Browsers

```bash
# Run on Chromium only
npx playwright test --project=chromium-desktop

# Run on Firefox
npx playwright test --project=firefox-desktop

# Run on mobile viewport
npx playwright test --project=mobile-portrait
```

### Running in Different Modes

```bash
# Run in parallel (default)
npx playwright test

# Run sequentially
npx playwright test --workers=1

# Run with specific number of workers
npx playwright test --workers=4

# Run in debug mode with Playwright Inspector
npx playwright test --debug
```

---

## Test Suites

### 1. Layout Tests (`layout.spec.ts`)

**Purpose**: Test header, footer, and navigation components

**Test Coverage**:

- Header component rendering and sticky positioning
- Desktop vs mobile navigation
- Mobile menu toggle functionality
- Footer 4-column layout
- Contact information and social media links
- Responsive behavior across viewports
- Semantic HTML and accessibility

**Key Tests**:

```typescript
- ✓ Header should render with logo and navigation
- ✓ Header should have sticky positioning
- ✓ Mobile menu should toggle on click
- ✓ Footer should have 4 columns
- ✓ Social media links should open in new tab
- ✓ No horizontal scroll on any viewport
```

**Run**: `npx playwright test tests/e2e/layout.spec.ts`

---

### 2. UI Components Tests (`ui-components.spec.ts`)

**Purpose**: Test all reusable UI components

**Components Tested**:

- Button (5 variants, 4 sizes, disabled state)
- Input (default, error, disabled states)
- Card (simple, with icon)
- Badge (6 variants: default, secondary, outline, success, warning, error)
- ServiceCard
- StatCard
- TestimonialCard
- GradientBox

**Key Tests**:

```typescript
- ✓ All button variants render correctly
- ✓ Disabled buttons are not clickable
- ✓ Inputs accept text and can be cleared
- ✓ Error inputs have visual indicators
- ✓ Cards display header and content
- ✓ All badge variants have different styles
- ✓ Service cards have icons and descriptions
- ✓ Stat cards display values and trends
- ✓ Testimonials show author information
```

**Run**: `npx playwright test tests/e2e/ui-components.spec.ts`

---

### 3. Style Guide Tests (`styleguide.spec.ts`)

**Purpose**: Test the `/styleguide` page and visual regression

**Test Coverage**:

- Page load and structure
- Color palette display (Primary and Secondary colors, all shades)
- Typography system (5 levels)
- All component showcases
- Visual regression screenshots
- Responsive grid layouts

**Visual Regression**:

```typescript
- Desktop full page screenshot (1920x1080)
- Mobile full page screenshot (375x667)
- Tablet full page screenshot (768x1024)
- Individual section screenshots:
  - Color palette
  - Typography
  - Buttons showcase
  - Service cards
  - Stat cards
  - Testimonials
```

**Run**: `npx playwright test tests/e2e/styleguide.spec.ts`

---

### 4. Homepage Tests (`homepage.spec.ts`)

**Purpose**: Test main landing page functionality

**Test Coverage**:

- Page structure (header, main, footer)
- Hero section rendering
- Main heading and description
- CTA buttons
- Content sections
- Interactive elements
- SEO metadata
- Visual regression

**Key Tests**:

```typescript
- ✓ Homepage loads successfully
- ✓ Hero section is prominent
- ✓ Page has meaningful content
- ✓ All links have valid href attributes
- ✓ CTA buttons are clickable
- ✓ Proper heading hierarchy (h1, h2, h3)
- ✓ Page has meta description
- ✓ Language attribute is set
```

**Run**: `npx playwright test tests/e2e/homepage.spec.ts`

---

### 5. Responsive Design Tests (`responsive.spec.ts`)

**Purpose**: Test responsive behavior across all viewports

**Viewports Tested**:

```typescript
- Mobile Portrait:     375x667px
- Mobile Landscape:    667x375px
- Tablet Portrait:     768x1024px
- Tablet Landscape:    1024x768px
- Laptop:              1366x768px
- Desktop:             1920x1080px
- Ultra-wide:          2560x1440px
- 4K Display:          3840x2160px
```

**Test Coverage**:

- No horizontal scrolling on any viewport
- Mobile menu accessibility
- Text readability (minimum font sizes)
- Touch target sizes (44x44px minimum)
- Image responsiveness
- Grid layout adaptations
- Content containment
- Breakpoint testing

**Key Tests**:

```typescript
- ✓ No horizontal scroll on mobile (375px)
- ✓ Touch targets are large enough (44x44px)
- ✓ Content is contained on ultra-wide (2560px)
- ✓ Text line length remains readable
- ✓ Footer stacks vertically on mobile
- ✓ All viewports render without errors
```

**Run**: `npx playwright test tests/e2e/responsive.spec.ts`

---

### 6. Accessibility Tests (`accessibility.spec.ts`)

**Purpose**: Ensure WCAG 2.1 AA compliance

**Test Coverage**:

- Automated axe-core audits
- Keyboard navigation
- ARIA attributes
- Color contrast (4.5:1 ratio)
- Focus management
- Semantic HTML
- Screen reader support
- Touch target sizes (mobile)

**Key Tests**:

```typescript
- ✓ No WCAG violations on homepage
- ✓ No WCAG violations on style guide
- ✓ Keyboard navigation works (Tab/Shift+Tab)
- ✓ Enter and Space keys activate buttons
- ✓ All navigation landmarks present (header, main, footer)
- ✓ Buttons have accessible names
- ✓ Links have accessible names
- ✓ Images have alt text
- ✓ Form inputs have labels
- ✓ Sufficient color contrast (WCAG AA)
- ✓ Focused elements have visible indicators
- ✓ Proper heading hierarchy
- ✓ Icons are hidden or labeled for screen readers
```

**Accessibility Tools**:

- **@axe-core/playwright**: Automated WCAG testing
- **Manual keyboard testing**: Tab navigation
- **ARIA validation**: Proper landmark and label usage

**Run**: `npx playwright test tests/e2e/accessibility.spec.ts`

---

### 7. Performance Tests (`performance.spec.ts`)

**Purpose**: Measure Core Web Vitals and performance metrics

**Metrics Tested**:

**Core Web Vitals**:

- **LCP** (Largest Contentful Paint): < 2.5s (Good)
- **FID** (First Input Delay): < 100ms (Good)
- **CLS** (Cumulative Layout Shift): < 0.1 (Good)
- **TTFB** (Time to First Byte): < 600ms (Good)
- **FCP** (First Contentful Paint): < 1.8s (Good)

**Additional Metrics**:

- Page load time
- DOM Content Loaded time
- Network idle time
- JavaScript bundle size (< 500KB)
- CSS bundle size (< 100KB)
- Number of HTTP requests (< 50)
- Image optimization
- Resource compression (gzip/br)

**Key Tests**:

```typescript
- ✓ Homepage loads within 2 seconds
- ✓ LCP under 4 seconds
- ✓ CLS under 0.25
- ✓ TTFB under 1 second
- ✓ No unoptimized large images (> 500KB)
- ✓ JS bundle under 500KB
- ✓ CSS bundle under 100KB
- ✓ Static assets are cacheable
- ✓ Text resources are compressed
- ✓ Minimal redirects
```

**Run**: `npx playwright test tests/e2e/performance.spec.ts`

---

## Configuration

### Playwright Config (`playwright.config.ts`)

```typescript
{
  testDir: './tests/e2e',
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium-desktop', use: { viewport: { width: 1920, height: 1080 } } },
    { name: 'firefox-desktop', use: { viewport: { width: 1920, height: 1080 } } },
    { name: 'webkit-desktop', use: { viewport: { width: 1920, height: 1080 } } },
    { name: 'tablet-portrait', use: { viewport: { width: 768, height: 1024 } } },
    { name: 'mobile-portrait', use: { viewport: { width: 375, height: 667 } } },
    { name: 'ultra-wide', use: { viewport: { width: 2560, height: 1440 } } },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  }
}
```

### Environment Variables

```bash
# Run tests in CI mode (with retries)
CI=true npx playwright test

# Change base URL
BASE_URL=http://localhost:4000 npx playwright test
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### Running Tests in Docker

```dockerfile
FROM mcr.microsoft.com/playwright:v1.56.1-jammy

WORKDIR /app
COPY . .

RUN npm ci
RUN npx playwright install chromium

CMD ["npm", "run", "test:e2e"]
```

---

## Troubleshooting

### Common Issues

**1. Tests fail with "baseURL not reachable"**

```bash
# Make sure dev server is running
npm run dev

# Or run tests with auto-start
npm run test:e2e  # (config has webServer.command)
```

**2. Browser binary not found**

```bash
# Install browser binaries
npx playwright install chromium
```

**3. Tests timeout**

```typescript
// Increase timeout in playwright.config.ts
timeout: 60000 // 60 seconds
```

**4. Screenshot differences in visual regression**

```bash
# Update baseline screenshots
npx playwright test --update-snapshots
```

**5. Tests fail on CI but pass locally**

- Ensure consistent viewport sizes
- Check for timing issues (add proper waits)
- Use `page.waitForLoadState('networkidle')`

### Debug Mode

```bash
# Run with Playwright Inspector
npx playwright test --debug

# Run specific test in debug mode
npx playwright test -g "should render header" --debug

# Pause test execution
await page.pause()
```

### Viewing Test Reports

```bash
# Open HTML report
npx playwright show-report

# Generate report manually
npx playwright test --reporter=html
```

---

## Best Practices

### 1. Selector Strategy

**Preferred selectors** (in order):

1. `getByRole()` - Semantic and accessible
2. `getByLabel()` - For form elements
3. `getByText()` - For unique text
4. `getByTestId()` - Last resort

```typescript
// Good
await page.getByRole('button', { name: 'Submit' }).click()

// Avoid
await page.locator('.btn-submit').click()
```

### 2. Wait for Elements

```typescript
// Always wait for elements
await expect(page.locator('h1')).toBeVisible()

// Wait for network idle
await page.waitForLoadState('networkidle')

// Wait for specific element
await page.waitForSelector('header')
```

### 3. Test Independence

- Each test should be independent
- Don't rely on test execution order
- Clean up after tests if needed

### 4. Page Object Pattern

```typescript
// Create page objects for reusable logic
class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/')
  }

  async clickCTA() {
    await this.page.getByRole('button', { name: 'Contact' }).click()
  }
}
```

### 5. Accessibility Testing

- Run axe-core audits on all pages
- Test keyboard navigation manually
- Ensure proper ARIA attributes
- Verify color contrast

### 6. Performance Monitoring

- Monitor Core Web Vitals regularly
- Set performance budgets
- Track bundle sizes
- Optimize images

---

## Test Statistics

### Coverage Summary

```
Total Test Files: 7
Total Test Cases: 200+

Breakdown:
- Layout:          24 tests
- UI Components:   60 tests
- Style Guide:     30 tests
- Homepage:        25 tests
- Responsive:      50 tests
- Accessibility:   40 tests
- Performance:     30 tests

Pass Rate: 95%+ (target)
Execution Time: ~5 minutes (all browsers)
```

### Browser Coverage

- Chromium (Chrome, Edge): ✓
- Firefox: ✓
- WebKit (Safari): ✓

### Viewport Coverage

- Mobile (375px): ✓
- Tablet (768px): ✓
- Desktop (1920px): ✓
- Ultra-wide (2560px): ✓

---

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Axe-core Documentation](https://www.deque.com/axe/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Core Web Vitals](https://web.dev/vitals/)

---

## Maintenance

### Updating Playwright

```bash
# Update to latest version
npm install --save-dev @playwright/test@latest

# Update browser binaries
npx playwright install
```

### Reviewing Test Results

1. Check HTML report: `npm run test:e2e:report`
2. Review failed test screenshots in `test-results/`
3. Watch video recordings of failures
4. Update tests if UI changes

### Adding New Tests

1. Create test file in `tests/e2e/`
2. Follow existing test structure
3. Use descriptive test names
4. Add to this documentation
5. Run locally before committing

---

**Document Version**: 1.0
**Last Updated**: October 19, 2025
**Author**: Frontend Developer
**Next Review**: Sprint 2
