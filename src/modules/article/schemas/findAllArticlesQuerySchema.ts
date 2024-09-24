import { z } from 'zod'

export const findAllArticlesQuery = z.object({
  tag: z.string().optional(),
  author: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
})

export type FindAllArticlesQuery = z.infer<typeof findAllArticlesQuery>
