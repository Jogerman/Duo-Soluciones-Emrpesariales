import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { BlogPostHero } from '@/components/marketing/blog/BlogPostHero'
import { BlogPostMeta } from '@/components/marketing/blog/BlogPostMeta'
import { RelatedPosts } from '@/components/marketing/blog/RelatedPosts'
import { ShareButtonsSection, ShareButtonsSticky } from '@/components/marketing/social'
import { blogPosts, getBlogPostBySlug } from '@/lib/mock-data/blog-posts'
import { getRelatedPosts } from '@/lib/utils/blog'
import { BlogPostContentWrapper } from '@/components/marketing/blog/BlogPostContentWrapper'

export const dynamic = 'force-dynamic'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Artículo no encontrado | DUO Soluciones',
    }
  }

  const metaTitle = post.seo?.metaTitle || `${post.title} | Blog DUO Soluciones`
  const metaDescription =
    post.seo?.metaDescription || post.excerpt || 'Artículo del blog de DUO Soluciones Empresariales'

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: post.seo?.keywords || [
      post.category.name,
      ...post.tags.map(tag => tag.name),
      'DUO Soluciones',
      'consultoría empresarial',
    ],
    ...(post.author && { authors: [{ name: post.author.name }] }),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      ...(post.author && { authors: [post.author.name] }),
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [post.coverImage],
      ...(post.author?.twitter && { creator: post.author.twitter }),
    },
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Get related posts
  const relatedPosts = getRelatedPosts(post.id, post.category, blogPosts, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <BlogPostHero post={post} />

      {/* Sticky Share Buttons (Desktop) */}
      <ShareButtonsSticky
        content={{
          id: post.id,
          type: 'blog',
          title: post.title,
          excerpt: post.excerpt,
          category: post.category.name,
          tags: post.tags.map(tag => tag.name),
        }}
      />

      {/* Main Content */}
      <article className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Article Content */}
            <div className="lg:col-span-8">
              <BlogPostContentWrapper content={post.content} />

              {/* Share Buttons Section (After Content) */}
              <div className="mt-12">
                <ShareButtonsSection
                  content={{
                    id: post.id,
                    type: 'blog',
                    title: post.title,
                    excerpt: post.excerpt,
                    category: post.category.name,
                    tags: post.tags.map(tag => tag.name),
                  }}
                  title="¿Te gustó este artículo?"
                  subtitle="Compártelo con tu equipo y colegas"
                />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-8">
                <BlogPostMeta post={post} />
              </div>
            </aside>
          </div>
        </Container>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-900 text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Necesitas ayuda con tu proyecto?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Nuestro equipo de expertos está listo para acompañarte en tu proceso de transformación
              empresarial.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-white text-primary-600 font-semibold hover:bg-neutral-100 transition-colors"
            >
              Contáctanos
            </a>
          </div>
        </Container>
      </section>
    </div>
  )
}
