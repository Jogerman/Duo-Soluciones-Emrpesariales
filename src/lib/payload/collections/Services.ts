import { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'isActive', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true, // Public
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Service Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'URL-friendly identifier (e.g., desarrollo-organizacional)',
      },
      index: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'AS1 - Desarrollo Organizacional', value: 'AS1' },
        { label: 'AS2 - Mejora de Procesos', value: 'AS2' },
        { label: 'AS3 - Implementación ERP', value: 'AS3' },
        { label: 'AS4 - Gobernanza Corporativa', value: 'AS4' },
      ],
      admin: {
        description: 'Service category/code',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 200,
      label: 'Short Description',
      admin: {
        description: 'Brief description for cards and listings (max 200 chars)',
      },
    },
    {
      name: 'longDescription',
      type: 'richText',
      required: true,
      label: 'Full Description',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icon Name',
      admin: {
        description: 'Lucide icon name (e.g., Building2, GitBranch)',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Image Gallery',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured',
      admin: {
        description: 'Display on homepage',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        description: 'Lower numbers appear first',
      },
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Key Benefits',
      fields: [
        {
          name: 'benefit',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'deliverables',
      type: 'array',
      label: 'Deliverables',
      fields: [
        {
          name: 'deliverable',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'keyFeatures',
      type: 'array',
      label: 'Key Features',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      label: 'Pricing Information',
      fields: [
        {
          name: 'pricingType',
          type: 'select',
          options: [
            { label: 'Fixed Price', value: 'fixed' },
            { label: 'Hourly Rate', value: 'hourly' },
            { label: 'Quote Required', value: 'quote' },
          ],
        },
        {
          name: 'basePrice',
          type: 'number',
        },
        {
          name: 'currency',
          type: 'text',
          defaultValue: 'USD',
        },
      ],
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
          label: 'Meta Description',
          maxLength: 160,
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Keywords',
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
      admin: {
        description: 'Inactive services are hidden from public view',
      },
    },
  ],
  timestamps: true,
}
