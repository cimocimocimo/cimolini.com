import type { CollectionConfig } from 'payload'

export const CVEvents: CollectionConfig = {
  slug: 'cv-events',
  admin: {
    useAsTitle: 'date',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'date',
      type: 'date',
      required: true,
    },
  ],
}
