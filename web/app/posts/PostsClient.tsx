'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { urlFor } from '@/lib/sanity'
import type { Post } from './page'

const TYPES = ['all', 'study', 'news', 'scrap'] as const

const TYPE_COLOR = {
  study: 'cyan',
  news: 'violet',
  scrap: 'amber',
}

export default function PostsClient({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<typeof TYPES[number]>('all')

  const filtered =
    filter === 'all'
      ? posts
      : posts.filter(p => p.type === filter)

  return (
    <main className="max-w-7xl mx-auto px-8 py-24">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold mb-4">Posts</h1>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {TYPES.map(type => {
            const active = filter === type
            const color =
              type !== 'all' ? TYPE_COLOR[type] : null

            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-1 rounded-full text-sm border transition
                  ${
                    active
                      ? type === 'all'
                        ? 'bg-white text-black border-white'
                        : `bg-${color}-400 text-black border-${color}-400`
                      : 'border-gray-600 text-gray-300 hover:border-white'
                  }
                `}
              >
                {type.toUpperCase()}
              </button>
            )
          })}
        </div>
      </header>

      {/* Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(post => {
          const color = TYPE_COLOR[post.type]

          return (
            <Link
              key={post._id}
              href={`/posts/${post.slug.current}`}
              className={`group rounded-xl overflow-hidden bg-white/5 border
                transition hover:-translate-y-1
                hover:border-${color}-400/50`}
            >
              {/* Image */}
              <div className="relative aspect-[4/3]">
                <Image
                  src={
                    post.mainImage
                      ? urlFor(post.mainImage)
                          .width(600)
                          .height(450)
                          .url()
                      : '/images/fallback.png'
                  }
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                {/* Type + Date */}
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`text-${color}-400 font-medium`}
                  >
                    {post.type.toUpperCase()}
                  </span>
                  {post.publishedAt && (
                    <span className="text-gray-500">
                      {post.publishedAt.slice(0, 10)}
                    </span>
                  )}  
                </div>

                <h2 className="font-medium leading-snug">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          )
        })}
      </section>
    </main>
  )
}
