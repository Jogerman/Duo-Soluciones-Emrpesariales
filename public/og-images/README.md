# Open Graph (OG) Images Directory

This directory contains Open Graph images for social media sharing across the DUO Soluciones Empresariales website.

## OG Image Specifications

### Required Dimensions
- **Standard OG Image**: 1200x630 pixels (1.91:1 aspect ratio)
- **Twitter Card**: 1200x675 pixels (16:9 aspect ratio) - optional, can use standard
- **Facebook/LinkedIn**: 1200x630 pixels (recommended)

### File Format
- **Format**: PNG or JPEG
- **Max file size**: 8MB (recommended under 1MB for performance)
- **Color mode**: RGB
- **Compression**: Optimize for web

### Design Guidelines

1. **Safe Zone**: Keep important content within center 1000x500px area
2. **Text**: Use large, legible fonts (minimum 60px)
3. **Branding**: Include DUO Soluciones logo
4. **Contrast**: Ensure high contrast for readability
5. **Mobile**: Consider how it looks at small sizes

## Required OG Images

### 1. Homepage OG Image
- **Filename**: `home.png` or `home.jpg`
- **Size**: 1200x630px
- **Content**:
  - DUO Soluciones logo
  - Tagline: "Transformamos desafíos en oportunidades sostenibles"
  - Brand colors: Primary blue (#1E40AF), accent orange
- **Usage**: Homepage and default fallback

### 2. Services OG Images
- **Filename pattern**: `service-[slug].png`
- **Size**: 1200x630px
- **Required images**:
  - `service-desarrollo-organizacional.png`
  - `service-mejora-procesos.png`
  - `service-implementacion-erp.png`
  - `service-gobernanza-corporativa.png`
- **Content**:
  - Service name
  - Brief description or key benefit
  - Service icon/illustration
  - DUO Soluciones branding

### 3. Blog Default OG Image
- **Filename**: `blog-default.png`
- **Size**: 1200x630px
- **Content**:
  - "Blog DUO Soluciones"
  - Minimalist design
  - Brand colors and logo
- **Usage**: Default for blog posts without custom OG image

### 4. Podcast Default OG Image
- **Filename**: `podcast-default.png`
- **Size**: 1200x630px
- **Content**:
  - Podcast name/logo
  - "Podcast DUO Soluciones"
  - Audio wave or microphone icon
  - Brand colors

### 5. About Page OG Image
- **Filename**: `about.png`
- **Size**: 1200x630px
- **Content**:
  - Team photo or office image
  - "Sobre DUO Soluciones"
  - Mission statement snippet

### 6. Contact Page OG Image
- **Filename**: `contact.png`
- **Size**: 1200x630px
- **Content**:
  - "Contáctanos"
  - Contact methods icons
  - Location: Santo Domingo, RD

## Temporary Placeholder Images

Until custom OG images are designed, you can use:

1. **Online OG Image Generators**:
   - https://www.opengraph.xyz/
   - https://www.canva.com/create/open-graph-images/
   - https://metatags.io/

2. **Placeholder Service**:
   - Use `/logo-duo.png` as temporary fallback
   - Update SITE_CONFIG.defaultImage in `/src/lib/seo.ts`

3. **Quick Design Tools**:
   - Figma (free)
   - Canva (free templates)
   - Adobe Express

## Implementation

### In Next.js Metadata

```typescript
// In page.tsx
export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: '/og-images/home.png',
        width: 1200,
        height: 630,
        alt: 'DUO Soluciones Empresariales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-images/home.png'],
  },
}
```

### Using SEO Helper Function

```typescript
import { generateSEO } from '@/lib/seo'

export const metadata = generateSEO({
  title: 'Desarrollo Organizacional',
  description: 'Servicios de desarrollo organizacional...',
  path: '/services/desarrollo-organizacional',
  image: '/og-images/service-desarrollo-organizacional.png',
})
```

## Testing OG Images

### 1. Social Media Debuggers
- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/

### 2. Preview Tools
- **Metatags.io**: https://metatags.io/
- **OpenGraph.xyz**: https://www.opengraph.xyz/

### 3. Testing Checklist
- [ ] Image loads correctly
- [ ] Correct dimensions (1200x630)
- [ ] Text is readable at small sizes
- [ ] File size is optimized
- [ ] Alt text is descriptive
- [ ] Cache is cleared (use ?v=timestamp if needed)

## File Organization

```
public/og-images/
├── README.md (this file)
├── home.png
├── about.png
├── contact.png
├── blog-default.png
├── podcast-default.png
├── service-desarrollo-organizacional.png
├── service-mejora-procesos.png
├── service-implementacion-erp.png
├── service-gobernanza-corporativa.png
└── [custom blog/podcast images]
```

## Next Steps

1. **Design Phase**:
   - Create design templates in Figma/Canva
   - Define color palette and typography
   - Create reusable components (logo placement, text styles)

2. **Implementation Phase**:
   - Generate OG images for all pages
   - Optimize images for web
   - Upload to /public/og-images/

3. **Testing Phase**:
   - Test on Facebook, Twitter, LinkedIn
   - Verify image loading
   - Check mobile preview

4. **Maintenance**:
   - Update OG images when content changes
   - Create custom images for important blog posts
   - Monitor social share performance

## Resources

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Sharing Best Practices](https://developers.facebook.com/docs/sharing/best-practices)
- [LinkedIn Share Debugger](https://www.linkedin.com/post-inspector/)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

## Support

For questions about OG image implementation, contact the development team or refer to the SEO documentation in `/docs/seo-guide.md`.
