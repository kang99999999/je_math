import { sanityClient } from '@/lib/sanity'
import { studyDatesQuery } from '@/lib/queries'
import StudyPage from './StudyPage'

export default async function StudyPageWrapper() {
    const posts = await sanityClient.fetch(
    studyDatesQuery,
    {},
    { cache: 'no-store' } // ⭐ 이게 핵심
  )
  return <StudyPage posts={posts} />
}
