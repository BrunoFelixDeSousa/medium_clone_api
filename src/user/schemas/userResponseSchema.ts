import { z } from 'zod';

export const userResponseSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string(),
  bio: z.string(),
  image: z.string(),
});

export const userResponseBody = z.object({
  user: userResponseSchema,
});

export type UserResponse = z.infer<typeof userResponseBody>;
