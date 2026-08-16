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
        { label: 'Experience', value: 'experience' },
        { label: 'Project', value: 'project' },
        { label: 'Position', value: 'position' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Content describing the action or entity.',
      },
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'uri',
          type: 'text',
          label: 'URI',
          required: true,
          validate: (value) => {
            if (value) {
              try {
                new URL(value); // Basic JS URL validation
                return true;
              } catch (error) {
                return 'Must be a valid URI (e.g., https://example.com)';
              }
            }
            return true;
          }
        }
      ]
    }
  ],
}
