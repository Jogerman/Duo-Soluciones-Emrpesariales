/**
 * Social Share Utilities
 * Provides URL builders and share functionality for various social platforms
 */

export type SharePlatform =
  | 'linkedin'
  | 'twitter'
  | 'facebook'
  | 'whatsapp'
  | 'email'
  | 'copy'
  | 'native'

export interface ShareData {
  url: string
  title: string
  description?: string
  hashtags?: string[]
  via?: string
}

export interface ContentShareData {
  id: string
  type: 'blog' | 'podcast'
  title: string
  excerpt?: string
  category?: string
  tags?: string[]
}

/**
 * Build LinkedIn share URL
 * LinkedIn uses a simple URL parameter
 */
export function buildLinkedInShareUrl(url: string): string {
  const encodedUrl = encodeURIComponent(url)
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
}

/**
 * Build Twitter/X share URL
 * Includes text, URL, hashtags, and via parameters
 */
export function buildTwitterShareUrl(data: ShareData): string {
  const params = new URLSearchParams()

  // Create tweet text
  const text = data.title
  params.append('text', text)
  params.append('url', data.url)

  // Add hashtags if provided
  if (data.hashtags && data.hashtags.length > 0) {
    params.append('hashtags', data.hashtags.join(','))
  }

  // Add via parameter (Twitter handle without @)
  if (data.via) {
    params.append('via', data.via)
  }

  return `https://twitter.com/intent/tweet?${params.toString()}`
}

/**
 * Build Facebook share URL
 * Facebook uses a simple URL parameter
 */
export function buildFacebookShareUrl(url: string): string {
  const encodedUrl = encodeURIComponent(url)
  return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
}

/**
 * Build WhatsApp share URL
 * Combines text and URL in the message
 */
export function buildWhatsAppShareUrl(data: ShareData): string {
  const text = `${data.title}\n\n${data.url}`
  const encodedText = encodeURIComponent(text)
  return `https://wa.me/?text=${encodedText}`
}

/**
 * Build Email share URL
 * Uses mailto: protocol with subject and body
 */
export function buildEmailShareUrl(data: ShareData): string {
  const subject = encodeURIComponent(data.title)
  const body = encodeURIComponent(
    `${data.description || data.title}\n\nLeer más: ${data.url}\n\n---\nCompartido desde DUO Soluciones Empresariales`
  )
  return `mailto:?subject=${subject}&body=${body}`
}

/**
 * Generate custom share messages for each platform based on content type
 */
export function generateShareMessages(content: ContentShareData, currentUrl: string): {
  linkedin: ShareData
  twitter: ShareData
  facebook: ShareData
  whatsapp: ShareData
  email: ShareData
} {
  const baseUrl = currentUrl

  // LinkedIn - Professional tone, focus on insights
  const linkedinMessage: ShareData = {
    url: baseUrl,
    title: content.title,
    description:
      content.type === 'blog'
        ? `Interesante artículo sobre ${content.category || 'transformación empresarial'}: ${content.title}`
        : `Nuevo episodio de podcast: ${content.title}`,
  }

  // Twitter - Concise with hashtags
  const twitterHashtags = content.tags?.slice(0, 3) || []
  if (!twitterHashtags.includes('DUOSoluciones')) {
    twitterHashtags.push('DUOSoluciones')
  }

  const twitterMessage: ShareData = {
    url: baseUrl,
    title:
      content.type === 'blog'
        ? `${content.title} - Insights sobre transformación empresarial`
        : `${content.title} - Podcast DUO`,
    hashtags: twitterHashtags,
    via: 'DUOSoluciones',
  }

  // Facebook - Engaging, community-focused
  const facebookMessage: ShareData = {
    url: baseUrl,
    title: content.title,
    description:
      content.type === 'blog'
        ? `Te comparto este artículo interesante de DUO Soluciones: ${content.title}`
        : `Escucha este episodio del Podcast DUO: ${content.title}`,
  }

  // WhatsApp - Personal, direct
  const whatsappMessage: ShareData = {
    url: baseUrl,
    title:
      content.type === 'blog'
        ? `Te recomiendo este artículo:\n${content.title}`
        : `Escucha este podcast interesante:\n${content.title}`,
    description: content.excerpt,
  }

  // Email - Formal, complete context
  const emailMessage: ShareData = {
    url: baseUrl,
    title:
      content.type === 'blog'
        ? `Artículo recomendado: ${content.title} | DUO Soluciones`
        : `Podcast recomendado: ${content.title} | DUO Soluciones`,
    description:
      content.excerpt ||
      (content.type === 'blog'
        ? `Te comparto este artículo de DUO Soluciones sobre ${content.category || 'transformación empresarial'} que puede ser de tu interés.`
        : `Te comparto este episodio del Podcast DUO sobre ${content.category || 'transformación empresarial'}.`),
  }

  return {
    linkedin: linkedinMessage,
    twitter: twitterMessage,
    facebook: facebookMessage,
    whatsapp: whatsappMessage,
    email: emailMessage,
  }
}

/**
 * Copy text to clipboard
 * Returns a promise that resolves when successful
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (!navigator.clipboard) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    document.body.appendChild(textArea)
    textArea.select()

    try {
      document.execCommand('copy')
      document.body.removeChild(textArea)
    } catch {
      document.body.removeChild(textArea)
      throw new Error('Failed to copy to clipboard')
    }
  } else {
    await navigator.clipboard.writeText(text)
  }
}

/**
 * Check if native share is available
 * Returns true if navigator.share is supported
 */
export function isNativeShareAvailable(): boolean {
  return typeof navigator !== 'undefined' && 'share' in navigator
}

/**
 * Share using native share API
 * Only works on mobile/compatible browsers
 */
export async function nativeShare(data: ShareData): Promise<void> {
  if (!isNativeShareAvailable()) {
    throw new Error('Native share not available')
  }

  await navigator.share({
    title: data.title,
    text: data.description || data.title,
    url: data.url,
  })
}

/**
 * Open share URL in new window
 * Used for LinkedIn, Twitter, Facebook
 */
export function openShareWindow(url: string, platform: string): void {
  const width = 600
  const height = 600
  const left = window.screen.width / 2 - width / 2
  const top = window.screen.height / 2 - height / 2

  window.open(
    url,
    `share-${platform}`,
    `width=${width},height=${height},left=${left},top=${top},toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1`
  )
}

/**
 * Get current page URL
 * Ensures we have the complete URL including protocol and domain
 */
export function getCurrentUrl(): string {
  if (typeof window === 'undefined') {
    return ''
  }
  return window.location.href
}

/**
 * Platform configuration
 * Contains metadata for each social platform
 */
export const PLATFORM_CONFIG = {
  linkedin: {
    name: 'LinkedIn',
    color: '#0A66C2',
    ariaLabel: 'Compartir en LinkedIn',
  },
  twitter: {
    name: 'Twitter/X',
    color: '#000000',
    ariaLabel: 'Compartir en Twitter/X',
  },
  facebook: {
    name: 'Facebook',
    color: '#1877F2',
    ariaLabel: 'Compartir en Facebook',
  },
  whatsapp: {
    name: 'WhatsApp',
    color: '#128C7E', // Darker shade for better contrast (was #25D366)
    ariaLabel: 'Compartir en WhatsApp',
  },
  email: {
    name: 'Email',
    color: '#C5221F', // Darker shade for better contrast (was #EA4335)
    ariaLabel: 'Compartir por email',
  },
  copy: {
    name: 'Copiar enlace',
    color: '#6B7280',
    ariaLabel: 'Copiar enlace',
  },
  native: {
    name: 'Compartir',
    color: '#6366F1',
    ariaLabel: 'Compartir',
  },
} as const
