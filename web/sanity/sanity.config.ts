import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

import { apiVersion, dataset, projectId } from './env'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'JE Math',

  projectId,
  dataset,
  apiVersion,

  basePath: '/studio',

  plugins: [
    deskTool(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
  },
})
