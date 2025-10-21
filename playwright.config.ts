import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright Configuration for DUO Soluciones Empresariales
 *
 * This configuration sets up comprehensive E2E testing with:
 * - Multi-browser testing (Chromium, Firefox, WebKit)
 * - Multiple viewport sizes for responsive testing
 * - Screenshot and video capture on failure
 * - HTML reporter for test results
 * - Accessibility testing support
 */

export default defineConfig({
  // Test directory
  testDir: './tests/e2e',

  // Maximum time one test can run
  timeout: 30 * 1000,

  // Fail fast on CI
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: 'http://localhost:3000',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // Default timeout for actions
    actionTimeout: 15 * 1000,

    // Default navigation timeout
    navigationTimeout: 30 * 1000,
  },

  // Configure projects for major browsers and viewports
  projects: [
    // Desktop browsers
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'firefox-desktop',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'webkit-desktop',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    // Tablet viewports
    {
      name: 'tablet-portrait',
      use: {
        ...devices['iPad Pro'],
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: 'tablet-landscape',
      use: {
        ...devices['iPad Pro landscape'],
        viewport: { width: 1024, height: 768 },
      },
    },

    // Mobile viewports
    {
      name: 'mobile-portrait',
      use: {
        ...devices['iPhone 12'],
        viewport: { width: 375, height: 667 },
      },
    },
    {
      name: 'mobile-landscape',
      use: {
        ...devices['iPhone 12 landscape'],
        viewport: { width: 667, height: 375 },
      },
    },

    // Ultra-wide desktop
    {
      name: 'ultra-wide',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 2560, height: 1440 },
      },
    },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  },

  // Output directory for test artifacts
  outputDir: 'test-results/',
})
