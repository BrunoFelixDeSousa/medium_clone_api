import { z } from 'zod'

export const authorSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email format'),
  bio: z.string().optional(),
  image: z.string().optional(),
})

export const articleSchema = z.object({
  article: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    body: z.string().optional(),
    tagList: z.array(z.string()).optional(),
    slug: z.string().min(1, 'Slug is required'),
    id: z.string().uuid('Invalid UUID format'),
    createdAt: z.date(),
    updatedAt: z.date(),
    favoritesCount: z.number().int().nonnegative(),
    author: authorSchema,
  }),
})

export type ArticleResponse = z.infer<typeof articleSchema>
