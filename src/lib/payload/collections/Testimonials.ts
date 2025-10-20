import { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'company', 'rating', 'featured', 'isActive'],
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
      name: 'clientName',
      type: 'text',
      required: true,
      label: 'Client Name',
    },
    {
      name: 'clientTitle',
      type: 'text',
      label: 'Job Title',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company Name',
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'clients',
      label: 'Linked Client',
      admin: {
        description: 'Link to client if exists in system',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Testimonial Quote',
      admin: {
        description: 'The actual testimonial text',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
      label: 'Rating (1-5 stars)',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Client Photo',
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      label: 'Related Service',
      admin: {
        description: 'Which service was this testimonial for?',
      },
    },
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      label: 'Related Project',
    },
    {
      name: 'dateReceived',
      type: 'date',
      label: 'Date Received',
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video Testimonial URL',
      admin: {
        description: 'YouTube or Vimeo URL if video testimonial',
      },
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
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
    },
  ],
  timestamps: true,
}
