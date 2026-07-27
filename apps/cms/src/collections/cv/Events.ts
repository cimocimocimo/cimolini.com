import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'cv-events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  admin: {
    useAsTitle: 'date',
    group: 'CV',
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
