import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Events as CVEvents } from './collections/cv/Events'
import { Entities as CVEntities } from './collections/cv/Entities'
import { Attributes as CVAttributes } from './collections/cv/Attributes'
import { Site } from './globals/Site/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    autoLogin:
      process.env.NODE_ENV === 'development'
        ? {
            email: 'aaron@cimolini.com',
            password: 'password',
            prefillOnly: false,
          }
        : false,
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Categories, CVEvents, CVEntities, CVAttributes],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:cms.db',
    },
  }),
  editor: lexicalEditor(),
  globals: [Site],
  plugins: [],
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  telemetry: false,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
