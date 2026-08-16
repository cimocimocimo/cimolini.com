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
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MMMM yyyy',
        },
      },
    },
    {
      name: 'entity',
      type: 'relationship',
      relationTo: 'cv-entities',
      required: true,
      admin: {
        description: 'Relation to an Entity',
      },
    },
    {
      name: 'entityName',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            if (data?.entity && typeof data.entity === 'object' && 'name' in data.entity) {
              return data.entity.name
            }
            return null
          },
        ],
      },
    },
    {
      name: 'attributes',
      type: 'relationship',
      relationTo: 'cv-attributes',
      hasMany: true,
      admin: {
        description: 'Relation to an Attribute',
      },
    },
    {
      name: 'attributeNames',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          ({ data }) => {
            if (data?.attributes && Array.isArray(data.attributes)) {
              return data.attributes
                .map((attr: any) => (typeof attr === 'object' && attr !== null ? attr.name : null))
                .filter(Boolean)
                .join(', ')
            }
            return null
          },
        ],
      },
    },
    {
      name: 'eventType',
      type: 'select',
      required: true,
      options: [
        { label: 'Start', value: 'start' },
        { label: 'End', value: 'end' },
        { label: 'Point in Time', value: 'single' },
      ],
      admin: {
        description:
          'Type of Event. Start or end or single event in time. How the event is described is defined by the related Entity.',
      },
    },
  ],
}
