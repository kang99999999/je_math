import { groq } from 'next-sanity'

export const postsQuery = groq`
  *[
    _type == "post" &&
    !(_id in path("drafts.**"))
  ] | order(publishedAt desc) {
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



export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
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


export const studyDatesQuery = `
*[_type == "post" && type == "study"] | order(coalesce(publishedAt, _createdAt) asc) {
  _id,
  title,
  "slug": slug.current,
  type,
  publishedAt,
  _createdAt
}
`

