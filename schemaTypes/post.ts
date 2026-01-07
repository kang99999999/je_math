import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Study', value: 'study' },
          { title: 'News', value: 'news' },
          { title: 'Scrap', value: 'scrap' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt (optional)',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'studyDate',
      title: 'Study Date',
      type: 'date',
      description: '스터디 로그용 날짜 (study 타입일 때)',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    // ⭐️ 핵심: body에서 image 허용
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
  ],
})
