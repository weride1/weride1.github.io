import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    link: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

const feed = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string(),
    mood: z.string().optional(),
  }),
});

export const collections = { articles, projects, feed };
