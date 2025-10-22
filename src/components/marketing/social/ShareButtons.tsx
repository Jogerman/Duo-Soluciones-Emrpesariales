'use client'

import * as React from 'react'
import {
  Linkedin,
  Twitter,
  Facebook,
  MessageCircle,
  Mail,
  Link as LinkIcon,
  Share2,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/Toast'
import {
  type ContentShareData,
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
  type SharePlatform,
} from '@/lib/utils/social-share'
import { trackShare } from '@/lib/analytics/share-analytics'

export interface ShareButtonsProps {
  content: ContentShareData
  variant?: 'default' | 'compact' | 'floating'
  showLabels?: boolean
  className?: string
}

/**
 * ShareButtons Component
 * Provides social sharing buttons for blog posts and podcast episodes
 */
export function ShareButtons({
  content,
  variant = 'default',
  showLabels = false,
  className,
}: ShareButtonsProps) {
  const { showToast } = useToast()
  const [loadingPlatform, setLoadingPlatform] = React.useState<SharePlatform | null>(null)
  const [showNativeShare, setShowNativeShare] = React.useState(false)
  const [currentUrl, setCurrentUrl] = React.useState('')

  // Get current URL on mount
  React.useEffect(() => {
    setCurrentUrl(getCurrentUrl())
    setShowNativeShare(isNativeShareAvailable())
  }, [])

  // Generate share messages
  const shareMessages = React.useMemo(() => {
    if (!currentUrl) return null
    return generateShareMessages(content, currentUrl)
  }, [content, currentUrl])

  // Handle share click
  const handleShare = async (platform: SharePlatform) => {
    if (!shareMessages || !currentUrl) return

    setLoadingPlatform(platform)

    try {
      switch (platform) {
        case 'linkedin':
          openShareWindow(buildLinkedInShareUrl(currentUrl), 'linkedin')
          await trackShare(content.id, content.type, platform, currentUrl)
          showToast('Compartiendo en LinkedIn', 'success')
          break

        case 'twitter':
          openShareWindow(buildTwitterShareUrl(shareMessages.twitter), 'twitter')
          await trackShare(content.id, content.type, platform, currentUrl)
          showToast('Compartiendo en Twitter/X', 'success')
          break

        case 'facebook':
          openShareWindow(buildFacebookShareUrl(currentUrl), 'facebook')
          await trackShare(content.id, content.type, platform, currentUrl)
          showToast('Compartiendo en Facebook', 'success')
          break

        case 'whatsapp':
          window.open(buildWhatsAppShareUrl(shareMessages.whatsapp), '_blank')
          await trackShare(content.id, content.type, platform, currentUrl)
          showToast('Compartiendo en WhatsApp', 'success')
          break

        case 'email':
          window.location.href = buildEmailShareUrl(shareMessages.email)
          await trackShare(content.id, content.type, platform, currentUrl)
          showToast('Abriendo cliente de email', 'success')
          break

        case 'copy':
          await copyToClipboard(currentUrl)
          await trackShare(content.id, content.type, platform, currentUrl)
          showToast('Enlace copiado al portapapeles', 'success')
          break

        case 'native':
          await nativeShare(shareMessages.linkedin)
          await trackShare(content.id, content.type, platform, currentUrl)
          showToast('Compartiendo...', 'success')
          break
      }
    } catch (error) {
      console.error(`Error sharing on ${platform}:`, error)
      if (platform === 'copy') {
        showToast('Error al copiar el enlace', 'error')
      } else if (platform === 'native') {
        showToast('Error al compartir', 'error')
      } else {
        showToast(`Error al compartir en ${PLATFORM_CONFIG[platform].name}`, 'error')
      }
    } finally {
      setLoadingPlatform(null)
    }
  }

  // Render button
  const renderButton = (platform: SharePlatform, Icon: React.ElementType, label: string) => {
    const isLoading = loadingPlatform === platform
    const config = PLATFORM_CONFIG[platform]

    if (variant === 'compact') {
      return (
        <button
          key={platform}
          onClick={() => handleShare(platform)}
          disabled={isLoading}
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200',
            'hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2'
          )}
          style={{
            backgroundColor: config.color,
            color: platform === 'twitter' ? '#FFFFFF' : '#FFFFFF',
          }}
          aria-label={config.ariaLabel}
          title={config.name}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Icon className="h-5 w-5" />
          )}
        </button>
      )
    }

    return (
      <button
        key={platform}
        onClick={() => handleShare(platform)}
        disabled={isLoading}
        className={cn(
          'flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-sm text-white transition-all duration-200',
          'hover:shadow-lg hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2'
        )}
        style={{
          backgroundColor: config.color,
        }}
        aria-label={config.ariaLabel}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Icon className="h-5 w-5" />
        )}
        {showLabels && <span>{label}</span>}
      </button>
    )
  }

  if (!currentUrl || !shareMessages) {
    return null
  }

  return (
    <div
      className={cn(
        'flex flex-wrap gap-3',
        variant === 'floating' && 'fixed right-4 top-1/2 z-40 flex-col -translate-y-1/2',
        className
      )}
      role="group"
      aria-label="Opciones para compartir"
    >
      {/* LinkedIn - Primary for B2B */}
      {renderButton('linkedin', Linkedin, 'LinkedIn')}

      {/* Twitter/X */}
      {renderButton('twitter', Twitter, 'Twitter')}

      {/* Facebook */}
      {renderButton('facebook', Facebook, 'Facebook')}

      {/* WhatsApp */}
      {renderButton('whatsapp', MessageCircle, 'WhatsApp')}

      {/* Email */}
      {renderButton('email', Mail, 'Email')}

      {/* Copy Link */}
      {renderButton('copy', LinkIcon, 'Copiar enlace')}

      {/* Native Share (mobile only) */}
      {showNativeShare && renderButton('native', Share2, 'Compartir')}
    </div>
  )
}

/**
 * ShareButtonsSection Component
 * Pre-styled section with title and share buttons
 */
export function ShareButtonsSection({
  content,
  title = '¿Te gustó este contenido?',
  subtitle = 'Compártelo con tu equipo',
  className,
}: {
  content: ContentShareData
  title?: string
  subtitle?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-neutral-200 bg-gradient-to-br from-primary-50 to-white p-6 md:p-8',
        className
      )}
    >
      <div className="mb-6 text-center">
        <h3 className="mb-2 font-bold text-xl text-neutral-900">{title}</h3>
        <p className="text-neutral-600">{subtitle}</p>
      </div>
      <div className="flex justify-center">
        <ShareButtons content={content} showLabels={false} />
      </div>
    </div>
  )
}

/**
 * ShareButtonsSticky Component
 * Sticky share bar that appears on scroll (desktop only)
 */
export function ShareButtonsSticky({ content }: { content: ContentShareData }) {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="rounded-xl bg-white p-3 shadow-lg border border-neutral-200">
        <div className="mb-2 text-center">
          <p className="font-semibold text-xs text-neutral-600 uppercase tracking-wide">
            Compartir
          </p>
        </div>
        <ShareButtons content={content} variant="compact" className="flex-col gap-2" />
      </div>
    </div>
  )
}
