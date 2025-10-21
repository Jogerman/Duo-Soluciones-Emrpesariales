/**
 * SEO Module - Central Export Point
 *
 * This module provides comprehensive SEO utilities for:
 * - JSON-LD structured data schemas
 * - Metadata generation for blog and podcast content
 * - Reading time and word count calculations
 * - URL and image utilities
 */

// Re-export all schemas
export * from './schemas'

// Re-export all utils
export * from './utils'

// Re-export from main seo file for backwards compatibility
export { SITE_CONFIG, generateSEO, generateStructuredDataScript } from '@/lib/seo'
