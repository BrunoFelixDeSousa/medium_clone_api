import { z } from 'zod'

export const updateUserSchema = z.object({
  username: z.string().min(1, 'Username is required').optional(),
  email: z.string().email('Invalid email format').optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .optional(),
  image: z.string().optional(),
  bio: z.string().optional(),
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>
