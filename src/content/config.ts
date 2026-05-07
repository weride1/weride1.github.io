import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    cover: z.string().optional(),
    link: z.string().url().optional(),
    date: z.coerce.date(),
  }),
});

export const collections = { projects };
