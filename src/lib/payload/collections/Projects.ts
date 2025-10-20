import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'industry', 'featured', 'publishedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      index: true,
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'clients',
      label: 'Client',
      admin: {
        description: 'Link to client (if public)',
      },
    },
    {
      name: 'clientName',
      type: 'text',
      label: 'Client Name (if confidential)',
      admin: {
        description: 'Use this if client relationship is confidential',
      },
    },
    {
      name: 'industry',
      type: 'text',
      required: true,
      label: 'Industry',
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Related Services',
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Project Overview',
    },
    {
      name: 'challenge',
      type: 'richText',
      required: true,
      label: 'The Challenge',
      admin: {
        description: 'What problem did the client face?',
      },
    },
    {
      name: 'solution',
      type: 'richText',
      required: true,
      label: 'Our Solution',
      admin: {
        description: 'How did you solve it?',
      },
    },
    {
      name: 'results',
      type: 'richText',
      required: true,
      label: 'Results & Impact',
      admin: {
        description: 'What were the measurable outcomes?',
      },
    },
    {
      name: 'metrics',
      type: 'array',
      label: 'Key Metrics',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Metric Name',
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Value',
        },
        {
          name: 'unit',
          type: 'text',
          label: 'Unit',
          admin: {
            description: 'e.g., %, days, USD',
          },
        },
      ],
    },
    {
      name: 'duration',
      type: 'group',
      label: 'Project Duration',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          label: 'Start Date',
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'End Date',
        },
        {
          name: 'timeframe',
          type: 'text',
          label: 'Timeframe Description',
          admin: {
            description: 'e.g., "6 months", "Q1 2024"',
          },
        },
      ],
    },
    {
      name: 'technologies',
      type: 'array',
      label: 'Technologies/Methodologies Used',
      fields: [
        {
          name: 'tech',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'teamMembers',
      type: 'relationship',
      relationTo: 'team',
      hasMany: true,
      label: 'Team Members',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Project Images',
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
      name: 'testimonial',
      type: 'relationship',
      relationTo: 'testimonials',
      label: 'Client Testimonial',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Project',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Publish Date',
      admin: {
        date: {
          displayFormat: 'MMM dd, yyyy',
        },
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
    },
  ],
  timestamps: true,
}
