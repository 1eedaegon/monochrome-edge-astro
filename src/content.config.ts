import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    // Basic metadata
    title: z.string(),
    description: z.string().optional(),
    lang: z.enum(['ko', 'en']).default('ko'),

    // Dates (auto-generated from Git if not specified)
    date: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),

    // Classification
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),

    // Author
    author: z.string().optional(),

    // Series
    series: z.string().optional(),
    seriesOrder: z.number().optional(),

    // Status
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),

    // SEO
    ogImage: z.string().optional(),
    canonical: z.string().optional(),

    // Relationships (manual)
    relatedPosts: z.array(z.string()).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  articles,
  pages,
};
