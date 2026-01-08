import { groq } from 'next-sanity'

/**
 * 전체 Post 목록 (Draft 제외)
 * - slug는 객체 형태 유지
 */
export const postsQuery = groq`
  *[
    _type == "post" &&
    !(_id in path("drafts.**"))
  ]
  | order(publishedAt desc) {
    _id,
    title,
    slug,
    type,
    excerpt,
    publishedAt,
    studyDate,
    mainImage
  }
`

/**
 * slug로 단일 Post 조회
 * ⚠ slug.current를 string으로 변환하지 말 것
 */
export const postBySlugQuery = groq`
  *[
    _type == "post" &&
    slug.current == $slug &&
    !(_id in path("drafts.**"))
  ][0] {
    _id,
    title,
    slug,
    type,
    excerpt,
    publishedAt,
    studyDate,
    mainImage,
    body[]{
      ...,
      _type == "image" => {
        asset->{
          _id,
          url
        },
        alt
      }
    }
  }
`

/**
 * Study Log 달력용
 * - study 타입만
 * - 날짜 정렬용
 */
export const studyDatesQuery = groq`
  *[
    _type == "post" &&
    type == "study" &&
    !(_id in path("drafts.**"))
  ]
  | order(coalesce(studyDate, publishedAt, _createdAt) asc) {
    _id,
    title,
    slug,
    type,
    studyDate,
    publishedAt,
    _createdAt
  }
`
