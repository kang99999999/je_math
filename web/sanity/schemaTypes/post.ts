import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',

  fields: [
    /** 제목 */
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    /** 슬러그 */
    defineField({
      name: 'slug',
      title: '슬러그',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    /** 글 타입 */
    defineField({
      name: 'type',
      title: '글 타입',
      type: 'string',
      options: {
        list: [
          { title: '스터디', value: 'study' },
          { title: '뉴스', value: 'news' },
          { title: '스크랩', value: 'scrap' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    /** 공부 날짜 / 생성 날짜 */
    defineField({
      name: 'studyDate',
      title: '공부 날짜',
      type: 'date',
      description: 'Study Log 달력에 표시될 날짜',

    validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = context.document?.type
          if (type === 'study' && !value) {
            return 'Study 글에는 공부 날짜가 필요합니다.'
          }
          return true
        }),
    }),

    /** 대표 이미지 (필수) */
    defineField({
      name: 'mainImage',
      title: '대표 이미지',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
       name: 'publishedAt', 
       title: '작성일', 
       type: 'datetime', 
       initialValue: () => new Date().toISOString(), 
       
    }),

    /** 요약 */
    defineField({
      name: 'excerpt',
      title: '요약',
      type: 'text',
      rows: 3,
    }),

    /** 본문 */
    defineField({
      name: 'body',
      title: '본문',
      type: 'array',
      of: [{ type: 'block' },
        {
        type: 'image',
        options: { hotspot:true }
      }

      ],
      
      validation: (Rule) => Rule.required(),
    }),
  ],

})
