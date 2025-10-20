import { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'status', 'publishedAt'],
    group: 'Content',
  },
  access: {
    read: ({ req: { user } }) => {
      // Public can only see published posts
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
      label: 'Post Title',
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
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 300,
      label: 'Excerpt',
      admin: {
        description: 'Short summary for listings (max 300 chars)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Post Content',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'team',
      required: true,
      label: 'Author',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Desarrollo Organizacional', value: 'desarrollo-organizacional' },
        { label: 'Mejora de Procesos', value: 'mejora-procesos' },
        { label: 'Tecnología y ERP', value: 'tecnologia-erp' },
        { label: 'Gobernanza Corporativa', value: 'gobernanza-corporativa' },
        { label: 'Tendencias de Industria', value: 'tendencias-industria' },
        { label: 'Casos de Estudio', value: 'casos-estudio' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Related Services',
    },
    {
      name: 'relatedProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      label: 'Related Projects',
    },
    {
      name: 'readingTime',
      type: 'number',
      label: 'Reading Time (minutes)',
      admin: {
        description: 'Estimated reading time in minutes',
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
        { label: 'Scheduled', value: 'scheduled' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Publish Date',
      admin: {
        date: {
          displayFormat: 'MMM dd, yyyy h:mm a',
        },
      },
    },
    {
      name: 'linkedinSynced',
      type: 'checkbox',
      defaultValue: false,
      label: 'Synced to LinkedIn',
      admin: {
        readOnly: true,
        description: 'Automatically updated when post is synced',
      },
    },
    {
      name: 'linkedinPostId',
      type: 'text',
      label: 'LinkedIn Post ID',
      admin: {
        readOnly: true,
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
          label: 'Meta Title',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
        },
        {
          name: 'keywords',
          type: 'text',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Social Media Image',
        },
      ],
    },
  ],
  timestamps: true,
}
