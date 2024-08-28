import { z } from 'zod';

export const updateArticleSchema = z.object({
  title: z.string().min(1, 'Title field cannot be empty'),
  description: z.string().optional(),
  body: z.string().optional(),
});

export type UpdateArticleSchema = z.infer<typeof updateArticleSchema>;
