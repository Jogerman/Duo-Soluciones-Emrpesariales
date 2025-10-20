import { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'featured', 'isActive'],
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
      label: 'Full Name',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Job Title/Role',
    },
    {
      name: 'bio',
      type: 'richText',
      required: true,
      label: 'Biography',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Photo',
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter URL',
        },
        {
          name: 'website',
          type: 'text',
          label: 'Personal Website',
        },
      ],
    },
    {
      name: 'experienceYears',
      type: 'number',
      label: 'Years of Experience',
    },
    {
      name: 'specialties',
      type: 'array',
      label: 'Areas of Expertise',
      fields: [
        {
          name: 'specialty',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      label: 'Certifications',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Certification Name',
        },
        {
          name: 'issuer',
          type: 'text',
          label: 'Issuing Organization',
        },
        {
          name: 'year',
          type: 'number',
          label: 'Year Obtained',
        },
      ],
    },
    {
      name: 'education',
      type: 'array',
      label: 'Education',
      fields: [
        {
          name: 'degree',
          type: 'text',
          required: true,
          label: 'Degree/Program',
        },
        {
          name: 'institution',
          type: 'text',
          required: true,
          label: 'Institution',
        },
        {
          name: 'year',
          type: 'number',
          label: 'Graduation Year',
        },
      ],
    },
    {
      name: 'industries',
      type: 'array',
      label: 'Industries Served',
      fields: [
        {
          name: 'industry',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured',
      admin: {
        description: 'Display on homepage team section',
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
