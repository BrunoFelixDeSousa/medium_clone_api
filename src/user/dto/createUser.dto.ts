import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
}).required();

export type  CreateUserDto = z.infer<typeof createUserSchema>;