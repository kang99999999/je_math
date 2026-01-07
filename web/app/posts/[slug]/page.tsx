import Image from 'next/image'
import { sanityClient, urlFor } from '@/lib/sanity'
import { postBySlugQuery } from '@/lib/queries'
import { notFound } from 'next/navigation'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

type Post = {
  _id: string
  title: string
  slug: string
  type: 'study' | 'news' | 'scrap'
  excerpt?: string
  publishedAt: string
  studyDate?: string
  mainImage?: any
  body: any[]
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post: Post | null = await sanityClient.fetch(postBySlugQuery, { slug })

  if (!post) notFound()

  const colorMap = {
    study: 'text-cyan-400',
    news: 'text-violet-400',
    scrap: 'text-amber-400',
  }

  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(900).url()}
            alt={value.alt || ''}
            width={900}
            height={500}
            className="rounded-xl"
          />
        </figure>
      ),
    },

    marks: {
      math: ({ value }) => <InlineMath math={value} />,
    },

    block: {
      normal: ({ children }) => {
        const text = children
          .map(c => (typeof c === 'string' ? c : ''))
          .join('')

        if (text.startsWith('$$') && text.endsWith('$$')) {
          return <BlockMath math={text.slice(2, -2)} />
        }

        return <p>{children}</p>
      },
    },
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      {/* Meta */}
      <div className="mb-6 text-sm text-gray-400">
        <span className={colorMap[post.type]}>
          {post.type.toUpperCase()}
        </span>
        <span className="mx-2">·</span>
        <span>{post.publishedAt.slice(0, 10)}</span>
      </div>

      <h1 className="text-3xl font-semibold mb-10">{post.title}</h1>

      {post.mainImage && (
        <div className="relative aspect-[4/3] mb-12 rounded-xl overflow-hidden">
          <Image
            src={urlFor(post.mainImage).width(1200).url()}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <article className="prose prose-invert max-w-none leading-relaxed">
        <PortableText value={post.body} components={components} />
      </article>
    </main>
  )
}
