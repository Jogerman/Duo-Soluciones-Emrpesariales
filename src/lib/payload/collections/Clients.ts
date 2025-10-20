import { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'industry', 'status', 'featured'],
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
      name: 'name',
      type: 'text',
      required: true,
      label: 'Client Name',
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
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Company Logo',
    },
    {
      name: 'industry',
      type: 'text',
      required: true,
      label: 'Industry',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Company Description',
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website URL',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'current',
      options: [
        { label: 'Current Client', value: 'current' },
        { label: 'Past Client', value: 'past' },
        { label: 'Prospective', value: 'prospective' },
      ],
    },
    {
      name: 'partnershipStart',
      type: 'date',
      label: 'Partnership Start Date',
    },
    {
      name: 'location',
      type: 'group',
      label: 'Location',
      fields: [
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'country',
          type: 'text',
          defaultValue: 'República Dominicana',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Client',
      admin: {
        description: 'Display logo on homepage',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Display Order',
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
