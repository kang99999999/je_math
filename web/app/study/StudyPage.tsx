'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  studyDate?: string
  publishedAt?: string
  _createdAt?: string
}

type PostsByDate = Record<string, Post[]>

export default function StudyPage({ posts }: { posts: Post[] }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const recordsRef = useRef<Record<string, HTMLDivElement | null>>({})

  /* 오늘 날짜 (YYYY-MM-DD) */
  const today = new Date()
  const todayKey = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  /* 날짜별 post 묶기 */
  const postsByDate: PostsByDate = posts.reduce((acc, post) => {
  const base =
    post.studyDate ||
    post.publishedAt ||
    post._createdAt

  if (!base) return acc

  const date = base.slice(0, 10)
  acc[date] = acc[date] || []
  acc[date].push(post)
  return acc
}, {} as PostsByDate)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const days: (number | null)[] = [
    ...Array(firstDay.getDay()).fill(null),
    ...Array.from({ length: lastDay.getDate() }, (_, i) => i + 1),
  ]

  const formatDate = (day: number) =>
    `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  const handleDayClick = (dateKey: string) => {
    if (!postsByDate[dateKey]) return
    setSelectedDate(dateKey)

    const target = recordsRef.current[dateKey]
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6">Study Log</h1>

      {/* 연/월 이동 (가운데 정렬) */}
      <div className="grid grid-cols-3 items-center mb-4">
        <button
          className="justify-self-start"
          onClick={() => setCurrentDate(new Date(year, month - 1))}
        >
          ◀
        </button>

        <div className="text-xl font-medium justify-self-center">
          {year}.{month + 1}
        </div>

        <button
          className="justify-self-end"
          onClick={() => setCurrentDate(new Date(year, month + 1))}
        >
          ▶
        </button>
      </div>

      {/* 요일 */}
      <div className="grid grid-cols-7 text-center text-sm text-gray-400 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* 달력 */}
      <div className="grid grid-cols-7 gap-3">
        {days.map((day, idx) => {
          if (!day) return <div key={idx} />

          const dateKey = formatDate(day)
          const dayPosts = postsByDate[dateKey] || []
          const isToday = dateKey === todayKey

          return (
            <div
              key={idx}
              onClick={() => handleDayClick(dateKey)}
              className={`
                rounded-lg p-3 min-h-[120px] cursor-pointer transition
                border
                ${
                  isToday
                    ? 'border-white bg-white/10'
                    : 'border-white/30 hover:border-white'
                }
              `}
            >
              <div
                className={`font-semibold mb-1 ${
                  isToday ? 'text-white' : ''
                }`}
              >
                {day}
              </div>

              {dayPosts.slice(0, 2).map(post => (
                <div key={post._id} className="text-xs truncate">
                  • {post.title}
                </div>
              ))}

              {dayPosts.length > 2 && (
                <div className="text-xs text-gray-400">
                  +{dayPosts.length - 2} more
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Records */}
      <section className="mt-12">
      <h2 className="text-xl font-semibold mb-4">Records</h2>

      {Object.entries(postsByDate)
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([date, items]) => (
          <div
              key={date}
              ref={el => {
              recordsRef.current[date] = el
              }}
              className="mb-4"
          >
              <div className="text-sm text-gray-500 mb-1">{date}</div>
              <ul className="list-disc list-inside space-y-1">
              {items.map(post => (
                  <li key={post._id}>
                  <Link
                      href={`/posts/${post.slug.current}`}
                      className="hover:underline"
                  >
                      {post.title}
                  </Link>
                  </li>
              ))}
              </ul>
          </div>
          ))}
      </section>

      {/* 모달 */}
      {selectedDate && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setSelectedDate(null)}
        >
          <div
            className="bg-black border rounded-lg p-6 w-[90%] max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-sm text-gray-400 mb-3">
              {selectedDate}
            </div>
            <ul className="space-y-2">
              {postsByDate[selectedDate]?.map(post => (
                <li key={post._id}>
                  <Link
                    href={`/posts/${post.slug.current}`}
                    className="hover:underline"
                  >
                    • {post.title}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 text-sm text-gray-400 hover:text-white"
              onClick={() => setSelectedDate(null)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
