import { CollectionConfig } from 'payload'

export const Podcast: CollectionConfig = {
  slug: 'podcast',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'episodeNumber', 'publishedAt', 'duration'],
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
      label: 'Episode Title',
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
      name: 'episodeNumber',
      type: 'number',
      required: true,
      label: 'Episode Number',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Episode Description',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Show Notes',
      admin: {
        description: 'Detailed show notes and content',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Episode Cover Image',
    },
    {
      name: 'audioFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Audio File',
      admin: {
        description: 'Upload MP3 file',
      },
    },
    {
      name: 'duration',
      type: 'number',
      label: 'Duration (minutes)',
    },
    {
      name: 'hosts',
      type: 'relationship',
      relationTo: 'team',
      hasMany: true,
      label: 'Hosts',
    },
    {
      name: 'guests',
      type: 'array',
      label: 'Guests',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Job Title',
        },
        {
          name: 'company',
          type: 'text',
        },
        {
          name: 'bio',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'topics',
      type: 'array',
      label: 'Topics Discussed',
      fields: [
        {
          name: 'topic',
          type: 'text',
          required: true,
        },
        {
          name: 'timestamp',
          type: 'text',
          label: 'Timestamp',
          admin: {
            description: 'e.g., "05:30"',
          },
        },
      ],
    },
    {
      name: 'transcript',
      type: 'richText',
      label: 'Transcript',
    },
    {
      name: 'resources',
      type: 'array',
      label: 'Resources & Links',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      label: 'Publish Date',
      admin: {
        date: {
          displayFormat: 'MMM dd, yyyy',
        },
      },
    },
    {
      name: 'spotifySynced',
      type: 'checkbox',
      defaultValue: false,
      label: 'Synced from Spotify',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'spotifyEpisodeId',
      type: 'text',
      label: 'Spotify Episode ID',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'externalLinks',
      type: 'group',
      label: 'External Platform Links',
      fields: [
        {
          name: 'spotify',
          type: 'text',
          label: 'Spotify URL',
        },
        {
          name: 'apple',
          type: 'text',
          label: 'Apple Podcasts URL',
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube URL',
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
