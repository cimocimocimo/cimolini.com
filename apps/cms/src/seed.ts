import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const args = process.argv.slice(2)
const overwrite = args.includes('--overwrite') || args.includes('-f')

// Helper to convert simple strings to lexical richText format
function toLexical(text: string | undefined) {
  if (!text) return undefined
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              mode: 'normal',
              text: text,
              type: 'text',
              style: '',
              detail: 0,
              format: 0,
              version: 1
            }
          ]
        }
      ]
    }
  }
}

async function seed() {
  const payload = await getPayload({ config })

  // 1. Check existing data
  const eventsCount = await payload.count({ collection: 'cv-events' })
  const entitiesCount = await payload.count({ collection: 'cv-entities' })
  const attributesCount = await payload.count({ collection: 'cv-attributes' })
  
  if (!overwrite && (eventsCount.totalDocs > 0 || entitiesCount.totalDocs > 0 || attributesCount.totalDocs > 0)) {
    console.error('Database already contains CV data. Use --overwrite to clear and seed.')
    process.exit(1)
  }

  // 2. Clear existing data if overwriting
  if (overwrite) {
    console.log('Clearing existing data...')
    await payload.delete({ collection: 'cv-events', where: { id: { exists: true } } })
    await payload.delete({ collection: 'cv-entities', where: { id: { exists: true } } })
    await payload.delete({ collection: 'cv-attributes', where: { id: { exists: true } } })
  }

  // 3. Read JSON files
  console.log('Loading JSON data files...')
  const attrRaw = JSON.parse(fs.readFileSync(path.join(dirname, 'seed-data/attributes.json'), 'utf-8'))
  const entRaw = JSON.parse(fs.readFileSync(path.join(dirname, 'seed-data/entities.json'), 'utf-8'))
  const evtRaw = JSON.parse(fs.readFileSync(path.join(dirname, 'seed-data/events.json'), 'utf-8'))

  const idMap = new Map<string, string | number>()

  // 4. Seed Attributes
  console.log('Seeding Attributes...')
  for (const attr of attrRaw) {
    const { _ref, content, ...rest } = attr
    const created = await payload.create({
      collection: 'cv-attributes',
      data: {
        ...rest,
        content: content ? toLexical(content) : undefined
      }
    })
    idMap.set(_ref, created.id)
  }

  // 5. Seed Entities (Two passes to resolve self-references)
  console.log('Seeding Entities (Pass 1/2)...')
  for (const ent of entRaw) {
    const { _ref, relations, attributes, links, ...rest } = ent
    const mappedAttributes = attributes?.map((ref: string) => idMap.get(ref)).filter(Boolean)
    const created = await payload.create({
      collection: 'cv-entities',
      data: {
        ...rest,
        attributes: mappedAttributes,
        links
      }
    })
    idMap.set(_ref, created.id)
  }

  console.log('Seeding Entities (Pass 2/2: Relations)...')
  for (const ent of entRaw) {
    if (ent.relations && ent.relations.length > 0) {
      const entId = idMap.get(ent._ref)
      if (!entId) continue

      const mappedRelations = ent.relations.map((rel: any) => ({
        relationType: rel.relationType,
        relatedEntity: idMap.get(rel.relatedEntity)
      })).filter((rel: any) => rel.relatedEntity != null)

      await payload.update({
        collection: 'cv-entities',
        id: entId,
        data: {
          relations: mappedRelations
        }
      })
    }
  }

  // 6. Seed Events
  console.log('Seeding Events...')
  for (const evt of evtRaw) {
    const { _ref, entity, attributes, ...rest } = evt
    const entityId = idMap.get(entity)
    const mappedAttributes = attributes?.map((ref: string) => idMap.get(ref)).filter(Boolean)
    
    if (!entityId) {
      console.warn(`Skipping event ${_ref} due to missing entity ref ${entity}`)
      continue
    }

    const created = await payload.create({
      collection: 'cv-events',
      data: {
        ...rest,
        entity: entityId,
        attributes: mappedAttributes
      }
    })
    idMap.set(_ref, created.id)
  }

  console.log('Seeding complete! 🐾')
  process.exit(0)
}

seed().catch(err => {
  console.error('Error during seeding:', err)
  process.exit(1)
})
