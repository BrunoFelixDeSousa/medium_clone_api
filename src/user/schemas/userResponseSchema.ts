import { z } from 'zod'

export const userResponseSchema = z.object({
  user: z.object({
    id: z.string().uuid(),
    username: z.string(),
    email: z.string(),
    bio: z.string(),
    image: z.string(),
  }),
})

export type UserResponse = z.infer<typeof userResponseSchema>
