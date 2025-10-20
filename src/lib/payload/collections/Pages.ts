import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'template', 'status', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: ({ req: { user } }) => {
      // Public can only see published pages
      if (!user) {
        return {
          status: {
            equals: 'published',
          },
        }
      }
      return true
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      index: true,
      admin: {
        description: 'URL path for this page (e.g., "about-us", "contact")',
      },
    },
    {
      name: 'template',
      type: 'select',
      required: true,
      defaultValue: 'default',
      options: [
        { label: 'Default Page', value: 'default' },
        { label: 'Landing Page', value: 'landing' },
        { label: 'Service Page', value: 'service' },
        { label: 'About Page', value: 'about' },
        { label: 'Contact Page', value: 'contact' },
      ],
      label: 'Page Template',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Page Content',
    },
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
          label: 'Show Hero Section',
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Hero Heading',
        },
        {
          name: 'subheading',
          type: 'text',
          label: 'Hero Subheading',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Image',
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'CTA Button Text',
        },
        {
          name: 'ctaLink',
          type: 'text',
          label: 'CTA Button Link',
        },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Content Sections',
      fields: [
        {
          name: 'sectionType',
          type: 'select',
          required: true,
          options: [
            { label: 'Text Block', value: 'text' },
            { label: 'Image + Text', value: 'image-text' },
            { label: 'CTA Block', value: 'cta' },
            { label: 'Statistics', value: 'stats' },
            { label: 'Team Grid', value: 'team' },
            { label: 'Services Grid', value: 'services' },
          ],
          label: 'Section Type',
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Section Content',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Section Image',
        },
      ],
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Parent Page',
      admin: {
        description: 'Create page hierarchy (optional)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Publish Date',
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
          label: 'Meta Description',
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Keywords',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Social Media Image',
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          defaultValue: false,
          label: 'No Index',
          admin: {
            description: 'Prevent search engines from indexing this page',
          },
        },
      ],
    },
  ],
  timestamps: true,
}
