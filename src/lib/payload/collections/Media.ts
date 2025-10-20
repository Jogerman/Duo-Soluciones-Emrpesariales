import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'video/*', 'audio/*', 'application/pdf'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Describe the image for accessibility and SEO',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Services', value: 'services' },
        { label: 'Team', value: 'team' },
        { label: 'Projects', value: 'projects' },
        { label: 'Blog', value: 'blog' },
        { label: 'Logos', value: 'logos' },
        { label: 'General', value: 'general' },
      ],
      label: 'Category',
      admin: {
        description: 'Organize media by category',
      },
    },
    {
      name: 'cloudinaryId',
      type: 'text',
      label: 'Cloudinary Public ID',
      admin: {
        readOnly: true,
        description: 'Auto-populated by Cloudinary plugin',
      },
    },
    {
      name: 'cloudinaryUrl',
      type: 'text',
      label: 'Cloudinary URL',
      admin: {
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}
