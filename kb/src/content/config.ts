import { defineCollection, z } from 'astro:content';

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    section: z.string(),
    subsection: z.string(),
    description: z.string(),
    updated: z.string().optional(),
    readingTime: z.string().optional(),
    related: z.array(z.string()).optional(),
    prev: z.string().optional(),
    next: z.string().optional(),
  }),
});

export const collections = {
  docs: docsCollection,
};
