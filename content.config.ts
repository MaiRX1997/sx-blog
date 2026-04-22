import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: 'page',
      source: 'index.md'
    }),
    docs: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: ['index.md']
      },
      schema: z.object({
        links: z.array(z.object({
          label: z.string(),
          icon: z.string(),
          to: z.string(),
          target: z.string().optional()
        })).optional()
      }),
      // 转换路径，去掉数字前缀
      transform: (content) => {
        if (content._path && /^\/\d+\./.test(content._path)) {
          content._path = content._path.replace(/^\/\d+\./, '/')
        }
        return content
      }
    })
  }
})
