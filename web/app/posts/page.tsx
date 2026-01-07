import { sanityClient } from '@/lib/sanity'
import { postsQuery } from '@/lib/queries'
import PostsClient from './PostsClient'

export type Post = {
  _id: string
  title: string
  slug: string
  type: 'study' | 'news' | 'scrap'
  excerpt?: string
  publishedAt: string
  mainImage?: any
}

export default async function PostsPage() {
  const posts: Post[] = await sanityClient.fetch(postsQuery)

  return <PostsClient posts={posts} />
}
