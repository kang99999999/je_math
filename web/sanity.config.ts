import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure' // ✅ 여기

export default defineConfig({
  name: 'default',
  title: 'JE Math',

  projectId,
  dataset,
  apiVersion,

  basePath: '/studio',

  plugins: [
    deskTool({structure}),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },
})
