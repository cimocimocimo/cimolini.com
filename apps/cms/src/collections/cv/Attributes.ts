import type { CollectionConfig } from 'payload'

export const Attributes: CollectionConfig = {
  slug: 'cv-attributes',
  labels: {
    singular: 'Attribute',
    plural: 'Attributes',
  },
  admin: {
    useAsTitle: 'name',
    group: 'CV',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Technology', value: 'technology' },
        { label: 'Skill', value: 'skill' },
        { label: 'Achievement', value: 'achievement' },
        { label: 'Metric', value: 'metric' },
        { label: 'General', value: 'general' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Content describing the action or entity.',
      },
    },
  ],
}
