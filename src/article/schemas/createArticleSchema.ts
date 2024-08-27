import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z.string().min(1, 'Title field cannot be empty'),
  description: z.string().optional(),
  body: z.string().optional(),
  tagList: z.array(z.string()),
});

export type CreateArticleSchema = z.infer<typeof createArticleSchema>;
