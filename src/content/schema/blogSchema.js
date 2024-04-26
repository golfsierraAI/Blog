import { z } from "astro:content";

export const blogSchema = z.object({
  title: z.string(),
  date: z.date(),
  author: z.string(),
  tags: z.array(z.string()),
  description: z.string(),
  imageUrl: z.string().optional(),
  authorImageUrl: z.string().optional(),
});
