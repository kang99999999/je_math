import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-10-01', // ⭐️ 반드시 하드코딩
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source: any) => builder.image(source)
