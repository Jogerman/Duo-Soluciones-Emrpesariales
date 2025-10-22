/**
 * Unit Tests for Social Share Utilities
 *
 * Tests include:
 * - URL builders for each platform
 * - Share message generation
 * - Clipboard functionality
 * - Native share API
 * - Platform configurations
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  buildLinkedInShareUrl,
  buildTwitterShareUrl,
  buildFacebookShareUrl,
  buildWhatsAppShareUrl,
  buildEmailShareUrl,
  generateShareMessages,
  copyToClipboard,
  isNativeShareAvailable,
  nativeShare,
  openShareWindow,
  getCurrentUrl,
  PLATFORM_CONFIG,
  type ShareData,
  type ContentShareData,
} from '@/lib/utils/social-share'

describe('Social Share Utilities', () => {
  describe('LinkedIn Share URL', () => {
    it('should build correct LinkedIn share URL', () => {
      const url = 'https://example.com/article'
      const shareUrl = buildLinkedInShareUrl(url)

      expect(shareUrl).toContain('linkedin.com/sharing/share-offsite')
      expect(shareUrl).toContain(encodeURIComponent(url))
    })

    it('should properly encode URL with special characters', () => {
      const url = 'https://example.com/article?id=123&lang=es'
      const shareUrl = buildLinkedInShareUrl(url)

      expect(shareUrl).toContain(encodeURIComponent(url))
    })
  })

  describe('Twitter Share URL', () => {
    it('should build correct Twitter share URL with text and URL', () => {
      const data: ShareData = {
        url: 'https://example.com/article',
        title: 'Check out this article',
      }

      const shareUrl = buildTwitterShareUrl(data)

      expect(shareUrl).toContain('twitter.com/intent/tweet')
      expect(shareUrl).toContain('text=')
      expect(shareUrl).toContain('url=')
    })

    it('should include hashtags when provided', () => {
      const data: ShareData = {
        url: 'https://example.com/article',
        title: 'Test article',
        hashtags: ['tech', 'business'],
      }

      const shareUrl = buildTwitterShareUrl(data)

      expect(shareUrl).toContain('hashtags=tech%2Cbusiness')
    })

    it('should include via parameter when provided', () => {
      const data: ShareData = {
        url: 'https://example.com/article',
        title: 'Test article',
        via: 'DUOSoluciones',
      }

      const shareUrl = buildTwitterShareUrl(data)

      expect(shareUrl).toContain('via=DUOSoluciones')
    })

    it('should handle all parameters together', () => {
      const data: ShareData = {
        url: 'https://example.com/article',
        title: 'Amazing article about business',
        hashtags: ['business', 'tech'],
        via: 'DUOSoluciones',
      }

      const shareUrl = buildTwitterShareUrl(data)

      expect(shareUrl).toContain('twitter.com/intent/tweet')
      expect(shareUrl).toContain('text=')
      expect(shareUrl).toContain('url=')
      expect(shareUrl).toContain('hashtags=')
      expect(shareUrl).toContain('via=')
    })
  })

  describe('Facebook Share URL', () => {
    it('should build correct Facebook share URL', () => {
      const url = 'https://example.com/article'
      const shareUrl = buildFacebookShareUrl(url)

      expect(shareUrl).toContain('facebook.com/sharer/sharer.php')
      expect(shareUrl).toContain(encodeURIComponent(url))
    })

    it('should properly encode URL', () => {
      const url = 'https://example.com/article?id=123'
      const shareUrl = buildFacebookShareUrl(url)

      expect(shareUrl).toContain(encodeURIComponent(url))
    })
  })

  describe('WhatsApp Share URL', () => {
    it('should build correct WhatsApp share URL with title and URL', () => {
      const data: ShareData = {
        url: 'https://example.com/article',
        title: 'Check this out',
      }

      const shareUrl = buildWhatsAppShareUrl(data)

      expect(shareUrl).toContain('wa.me')
      expect(shareUrl).toContain('text=')
    })

    it('should combine title and URL in message', () => {
      const data: ShareData = {
        url: 'https://example.com/article',
        title: 'Great article',
      }

      const shareUrl = buildWhatsAppShareUrl(data)
      const decodedUrl = decodeURIComponent(shareUrl)

      expect(decodedUrl).toContain('Great article')
      expect(decodedUrl).toContain('https://example.com/article')
    })
  })

  describe('Email Share URL', () => {
    it('should build correct mailto URL', () => {
      const data: ShareData = {
        url: 'https://example.com/article',
        title: 'Interesting article',
        description: 'This is a great read',
      }

      const shareUrl = buildEmailShareUrl(data)

      expect(shareUrl).toContain('mailto:')
      expect(shareUrl).toContain('subject=')
      expect(shareUrl).toContain('body=')
    })

    it('should include title in subject', () => {
      const data: ShareData = {
        url: 'https://example.com/article',
        title: 'Test Article',
      }

      const shareUrl = buildEmailShareUrl(data)
      const decodedUrl = decodeURIComponent(shareUrl)

      expect(decodedUrl).toContain('subject=Test Article')
    })

    it('should include description and URL in body', () => {
      const data: ShareData = {
        url: 'https://example.com/article',
        title: 'Test',
        description: 'Check this out',
      }

      const shareUrl = buildEmailShareUrl(data)
      const decodedUrl = decodeURIComponent(shareUrl)

      expect(decodedUrl).toContain('Check this out')
      expect(decodedUrl).toContain('https://example.com/article')
    })

    it('should include branding in email body', () => {
      const data: ShareData = {
        url: 'https://example.com/article',
        title: 'Test',
      }

      const shareUrl = buildEmailShareUrl(data)
      const decodedUrl = decodeURIComponent(shareUrl)

      expect(decodedUrl).toContain('DUO Soluciones')
    })
  })

  describe('Generate Share Messages', () => {
    const blogContent: ContentShareData = {
      id: 'blog-1',
      type: 'blog',
      title: 'Transformación Digital en Empresas',
      excerpt: 'Una guía completa sobre transformación digital',
      category: 'Transformación Digital',
      tags: ['Digital', 'Empresas'],
    }

    const podcastContent: ContentShareData = {
      id: 'pod-1',
      type: 'podcast',
      title: 'El Futuro del Trabajo',
      excerpt: 'Conversamos sobre el futuro',
      category: 'Liderazgo',
      tags: ['Trabajo', 'Futuro'],
    }

    const currentUrl = 'https://example.com/content/1'

    it('should generate messages for all platforms', () => {
      const messages = generateShareMessages(blogContent, currentUrl)

      expect(messages).toHaveProperty('linkedin')
      expect(messages).toHaveProperty('twitter')
      expect(messages).toHaveProperty('facebook')
      expect(messages).toHaveProperty('whatsapp')
      expect(messages).toHaveProperty('email')
    })

    it('should generate appropriate LinkedIn message for blog', () => {
      const messages = generateShareMessages(blogContent, currentUrl)

      expect(messages.linkedin.url).toBe(currentUrl)
      expect(messages.linkedin.title).toContain(blogContent.title)
      expect(messages.linkedin.description).toContain('artículo')
    })

    it('should generate appropriate Twitter message with hashtags for blog', () => {
      const messages = generateShareMessages(blogContent, currentUrl)

      expect(messages.twitter.hashtags).toBeDefined()
      expect(messages.twitter.hashtags).toContain('DUOSoluciones')
      expect(messages.twitter.via).toBe('DUOSoluciones')
    })

    it('should limit Twitter hashtags to 3 plus DUOSoluciones', () => {
      const contentWithManyTags: ContentShareData = {
        ...blogContent,
        tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5'],
      }

      const messages = generateShareMessages(contentWithManyTags, currentUrl)

      expect(messages.twitter.hashtags!.length).toBeLessThanOrEqual(4) // 3 + DUOSoluciones
    })

    it('should generate different messages for podcast type', () => {
      const messages = generateShareMessages(podcastContent, currentUrl)

      expect(messages.linkedin.description).toContain('podcast')
      expect(messages.twitter.title).toContain('Podcast DUO')
    })

    it('should include category in messages when available', () => {
      const messages = generateShareMessages(blogContent, currentUrl)

      expect(messages.linkedin.description).toContain(blogContent.category!)
    })

    it('should handle content without excerpt', () => {
      const contentWithoutExcerpt: ContentShareData = {
        id: 'test-1',
        type: 'blog',
        title: 'Test Title',
      }

      const messages = generateShareMessages(contentWithoutExcerpt, currentUrl)

      expect(messages.email.description).toBeDefined()
    })

    it('should handle content without category', () => {
      const contentWithoutCategory: ContentShareData = {
        id: 'test-1',
        type: 'blog',
        title: 'Test Title',
      }

      const messages = generateShareMessages(contentWithoutCategory, currentUrl)

      expect(messages.linkedin.description).toContain('transformación empresarial')
    })

    it('should handle content without tags', () => {
      const contentWithoutTags: ContentShareData = {
        id: 'test-1',
        type: 'blog',
        title: 'Test Title',
      }

      const messages = generateShareMessages(contentWithoutTags, currentUrl)

      expect(messages.twitter.hashtags).toContain('DUOSoluciones')
    })
  })

  describe('Clipboard Functions', () => {
    beforeEach(() => {
      // Mock navigator.clipboard
      Object.assign(navigator, {
        clipboard: {
          writeText: vi.fn().mockResolvedValue(undefined),
        },
      })
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should copy text to clipboard using modern API', async () => {
      const text = 'https://example.com/article'

      await copyToClipboard(text)

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text)
    })

    it('should handle clipboard write success', async () => {
      const text = 'test text'

      await expect(copyToClipboard(text)).resolves.toBeUndefined()
    })

    it('should fall back to execCommand when clipboard API is not available', async () => {
      // Remove clipboard API
      const originalClipboard = navigator.clipboard
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
      })

      // Mock document methods
      const createElementSpy = vi.spyOn(document, 'createElement')
      const execCommandSpy = vi.spyOn(document, 'execCommand').mockReturnValue(true)

      const text = 'fallback text'
      await copyToClipboard(text)

      expect(createElementSpy).toHaveBeenCalledWith('textarea')
      expect(execCommandSpy).toHaveBeenCalledWith('copy')

      // Restore
      Object.defineProperty(navigator, 'clipboard', {
        value: originalClipboard,
        writable: true,
      })
      vi.restoreAllMocks()
    })
  })

  describe('Native Share API', () => {
    it('should detect native share availability', () => {
      // Mock navigator.share
      Object.assign(navigator, {
        share: vi.fn(),
      })

      const available = isNativeShareAvailable()
      expect(available).toBe(true)

      vi.restoreAllMocks()
    })

    it('should return false when native share is not available', () => {
      const originalShare = (navigator as any).share
      delete (navigator as any).share

      const available = isNativeShareAvailable()
      expect(available).toBe(false)

      // Restore
      if (originalShare) {
        (navigator as any).share = originalShare
      }
    })

    it('should call native share with correct data', async () => {
      const mockShare = vi.fn().mockResolvedValue(undefined)
      Object.assign(navigator, {
        share: mockShare,
      })

      const data: ShareData = {
        url: 'https://example.com',
        title: 'Test Title',
        description: 'Test Description',
      }

      await nativeShare(data)

      expect(mockShare).toHaveBeenCalledWith({
        title: data.title,
        text: data.description,
        url: data.url,
      })

      vi.restoreAllMocks()
    })

    it('should throw error when native share is not available', async () => {
      const originalShare = (navigator as any).share
      delete (navigator as any).share

      const data: ShareData = {
        url: 'https://example.com',
        title: 'Test',
      }

      await expect(nativeShare(data)).rejects.toThrow('Native share not available')

      // Restore
      if (originalShare) {
        (navigator as any).share = originalShare
      }
    })
  })

  describe('Open Share Window', () => {
    it('should call window.open with correct parameters', () => {
      const mockOpen = vi.fn()
      global.window.open = mockOpen
      global.window.screen = {
        width: 1920,
        height: 1080,
      } as any

      const url = 'https://twitter.com/share?url=test'
      openShareWindow(url, 'twitter')

      expect(mockOpen).toHaveBeenCalledWith(
        url,
        'share-twitter',
        expect.stringContaining('width=600')
      )
    })

    it('should center the window on screen', () => {
      const mockOpen = vi.fn()
      global.window.open = mockOpen
      global.window.screen = {
        width: 1920,
        height: 1080,
      } as any

      const url = 'https://linkedin.com/share'
      openShareWindow(url, 'linkedin')

      const callArgs = mockOpen.mock.calls[0][2]
      expect(callArgs).toContain('left=')
      expect(callArgs).toContain('top=')
    })
  })

  describe('Get Current URL', () => {
    it('should return current window URL', () => {
      global.window = {
        location: {
          href: 'https://example.com/current-page',
        },
      } as any

      const url = getCurrentUrl()
      expect(url).toBe('https://example.com/current-page')
    })

    it('should return empty string on server side', () => {
      const originalWindow = global.window
      ;(global as any).window = undefined

      const url = getCurrentUrl()
      expect(url).toBe('')

      // Restore
      global.window = originalWindow
    })
  })

  describe('Platform Configuration', () => {
    it('should have configuration for all platforms', () => {
      expect(PLATFORM_CONFIG).toHaveProperty('linkedin')
      expect(PLATFORM_CONFIG).toHaveProperty('twitter')
      expect(PLATFORM_CONFIG).toHaveProperty('facebook')
      expect(PLATFORM_CONFIG).toHaveProperty('whatsapp')
      expect(PLATFORM_CONFIG).toHaveProperty('email')
      expect(PLATFORM_CONFIG).toHaveProperty('copy')
      expect(PLATFORM_CONFIG).toHaveProperty('native')
    })

    it('should have required properties for each platform', () => {
      Object.values(PLATFORM_CONFIG).forEach(config => {
        expect(config).toHaveProperty('name')
        expect(config).toHaveProperty('color')
        expect(config).toHaveProperty('ariaLabel')
      })
    })

    it('should have valid color values', () => {
      Object.values(PLATFORM_CONFIG).forEach(config => {
        expect(config.color).toMatch(/^#[0-9A-F]{6}$/i)
      })
    })

    it('should have descriptive aria labels', () => {
      Object.values(PLATFORM_CONFIG).forEach(config => {
        expect(config.ariaLabel.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty URL in share data', () => {
      const data: ShareData = {
        url: '',
        title: 'Test',
      }

      const linkedInUrl = buildLinkedInShareUrl(data.url)
      expect(linkedInUrl).toContain('linkedin.com')
    })

    it('should handle special characters in title', () => {
      const data: ShareData = {
        url: 'https://example.com',
        title: 'Title with & special <characters>',
      }

      const twitterUrl = buildTwitterShareUrl(data)
      expect(twitterUrl).toContain('twitter.com')
    })

    it('should handle very long titles', () => {
      const longTitle = 'A'.repeat(500)
      const data: ShareData = {
        url: 'https://example.com',
        title: longTitle,
      }

      const shareUrl = buildTwitterShareUrl(data)
      expect(shareUrl).toContain('twitter.com')
    })

    it('should handle URLs with query parameters', () => {
      const url = 'https://example.com/page?param1=value1&param2=value2'
      const shareUrl = buildLinkedInShareUrl(url)

      expect(shareUrl).toContain(encodeURIComponent(url))
    })

    it('should handle URLs with hash fragments', () => {
      const url = 'https://example.com/page#section-1'
      const shareUrl = buildFacebookShareUrl(url)

      expect(shareUrl).toContain(encodeURIComponent(url))
    })

    it('should handle missing optional fields in share data', () => {
      const data: ShareData = {
        url: 'https://example.com',
        title: 'Test',
        // description, hashtags, via are optional
      }

      expect(() => buildTwitterShareUrl(data)).not.toThrow()
      expect(() => buildWhatsAppShareUrl(data)).not.toThrow()
      expect(() => buildEmailShareUrl(data)).not.toThrow()
    })
  })
})
