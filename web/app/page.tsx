import Link from 'next/link'
import { sanityClient } from '@/lib/sanity'
import { postsQuery } from '@/lib/queries'

type Post = {
  _id: string
  title: string
  slug: string
  type: string
}

export default async function HomePage() {
  const posts: Post[] = await sanityClient.fetch(postsQuery)

  const recentStudies = posts
    .filter(p => p.type === 'study')
    .slice(0, 3)

  return (
    <main className="max-w-3xl mx-auto px-6 mt-20 mb-32">
      {/* Intro */}
      <section className="mb-20">
        <h1 className="text-4xl font-semibold leading-tight mb-6">
          Mathematics, 
          <br />
          one page at a time.
        </h1>

        <p className="text-base text-gray-300 max-w-xl">
          기록하고, 정리하고, 다시 돌아보기 위한 공부 노트.
          <br />

          해석학과 위상수학을 중심으로 공부한 내용을 정리합니다.
          <br />
          결과보다 구조와 직관을 남기는 것을 목표로 합니다.
        </p>
      </section>

      {/* Recent */}
      <section>
        <h2 className="text-sm text-gray-400 uppercase tracking-wide mb-4">
          Recent study Logs
        </h2>

        <ul className="space-y-2">
          {recentStudies.map(post => (
            <li key={post._id}>
              <Link
                href={`/posts/${post.slug}`}
                className="hover:underline"
              >
                • {post.title}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/study"
          className="inline-block mt-6 text-sm text-gray-400 hover:text-white"
        >
          <br />
          View full study log →
        </Link>
      </section>
    </main>
  )
}
