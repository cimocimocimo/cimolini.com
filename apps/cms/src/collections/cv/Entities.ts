import type { CollectionConfig } from 'payload'

export const Entities: CollectionConfig = {
  slug: 'cv-entities',
  labels: {
    singular: 'Entity',
    plural: 'Entities',
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
      required: true,
      options: [
        { label: 'Project', value: 'project' },
        { label: 'Employer', value: 'employer' },
        { label: 'Position', value: 'position' },
        { label: 'Client', value: 'client' },
        { label: 'School/University', value: 'school' },
        { label: 'Experience', value: 'experience' },
        { label: 'Individual', value: 'person' },
      ],
    },
    {
      name: 'relations',
      type: 'array',
      admin: {
        description: 'Relationships to other Entities (e.g., student of University, employee of Business)',
      },
      fields: [
        {
          name: 'relatedEntity',
          type: 'relationship',
          relationTo: 'cv-entities',
          required: true,
        },
        {
          name: 'relationType',
          type: 'text',
          required: true,
          admin: {
            description: 'The type of relationship (e.g., attending, employed by, parent project)',
          },
        },
      ],
    },
    {
      name: 'attributes',
      type: 'relationship',
      relationTo: 'cv-attributes',
      hasMany: true,
      admin: {
        description: 'Attributes describing this Entity',
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
