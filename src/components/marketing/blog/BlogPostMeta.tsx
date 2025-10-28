'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/types/content'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils/blog'
import { Linkedin, Twitter, Facebook, Link2, Mail } from 'lucide-react'

interface BlogPostMetaProps {
  post: BlogPost
}

export function BlogPostMeta({ post }: BlogPostMetaProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = post.title

  const handleShare = (platform: string) => {
    let url = ''

    switch (platform) {
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
        break
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`
        break
    }

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400')
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      // Could add a toast notification here
      alert('Enlace copiado al portapapeles')
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  return (
    <div className="space-y-8">
      {/* Author Section - Only show if author exists */}
      {post.author && (
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-bold text-neutral-900 mb-1">{post.author.name}</h3>
              <p className="text-sm text-neutral-600 mb-3">{post.author.role}</p>
              {post.author.bio && (
                <p className="text-sm text-neutral-700 leading-relaxed mb-4">{post.author.bio}</p>
              )}
              {/* Social Links */}
              <div className="flex items-center gap-2">
                {post.author.linkedin && (
                  <a
                    href={post.author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 hover:text-primary-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {post.author.twitter && (
                  <a
                    href={post.author.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 hover:text-primary-600 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Share Section */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-neutral-900 mb-4">Compartir artículo</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('linkedin')}
            className="justify-start"
          >
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('twitter')}
            className="justify-start"
          >
            <Twitter className="w-4 h-4 mr-2" />
            Twitter
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('facebook')}
            className="justify-start"
          >
            <Facebook className="w-4 h-4 mr-2" />
            Facebook
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare('email')}
            className="justify-start"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyLink}
            className="justify-start col-span-2"
          >
            <Link2 className="w-4 h-4 mr-2" />
            Copiar enlace
          </Button>
        </div>
      </Card>

      {/* Tags */}
      {post.tags.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">Etiquetas</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Link key={tag.id} href={`/blog?tag=${tag.slug}`}>
                <Badge variant="outline" className="hover:bg-neutral-100 transition-colors">
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        </Card>
      )}

      {/* Updated Date */}
      {post.updatedAt && post.updatedAt !== post.publishedAt && (
        <Card className="p-4 bg-neutral-50">
          <p className="text-xs text-neutral-600">
            <span className="font-medium">Última actualizaci�n:</span> {formatDate(post.updatedAt)}
          </p>
        </Card>
      )}
    </div>
  )
}
