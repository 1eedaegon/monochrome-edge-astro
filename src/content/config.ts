import { defineCollection, z } from 'astro:content';

// Articles collection schema
const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date().optional(),
    updatedDate: z.date().optional(),
    draft: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional().default([]),
    category: z.string().optional(),
    ogImage: z.string().optional(),
    canonical: z.string().optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

// Profile sections collection schema
const profileSectionsCollection = defineCollection({
  type: 'content',
  schema: z.discriminatedUnion('type', [
    // Education
    z.object({
      type: z.literal('education'),
      order: z.number().optional().default(0),
      institution: z.string(),
      degree: z.string(),
      period: z.string(),
      description: z.string().optional(),
      focus: z.string().optional(),
    }),
    // Experience
    z.object({
      type: z.literal('experience'),
      order: z.number().optional().default(0),
      company: z.string(),
      position: z.string(),
      period: z.string(),
      description: z.string(),
      technologies: z.array(z.string()).optional().default([]),
      achievements: z.array(z.string()).optional().default([]),
    }),
    // Contribution
    z.object({
      type: z.literal('contribution'),
      order: z.number().optional().default(0),
      project: z.string(),
      role: z.string(),
      period: z.string(),
      description: z.string(),
      link: z.string().url(),
      technologies: z.array(z.string()).optional().default([]),
    }),
    // Research
    z.object({
      type: z.literal('research'),
      order: z.number().optional().default(0),
      title: z.string(),
      organization: z.string(),
      period: z.string(),
      description: z.string(),
      links: z.array(z.object({
        label: z.string(),
        url: z.string().url(),
      })).optional().default([]),
    }),
    // Vitae (CV/Resume PDF)
    z.object({
      type: z.literal('vitae'),
      order: z.number().optional().default(0),
      title: z.string(),
      description: z.string().optional(),
      url: z.string(),
    }),
    // Repository
    z.object({
      type: z.literal('repo'),
      order: z.number().optional().default(0),
      name: z.string(),
      description: z.string(),
      status: z.enum(['active', 'archived', 'maintenance']).optional().default('active'),
      tags: z.array(z.string()).optional().default([]),
      links: z.object({
        github: z.string().url().optional(),
        demo: z.string().url().optional(),
        docs: z.string().url().optional(),
      }).optional(),
    }),
    // Service
    z.object({
      type: z.literal('service'),
      order: z.number().optional().default(0),
      name: z.string(),
      description: z.string(),
      status: z.enum(['active', 'beta', 'development']).optional().default('active'),
      tags: z.array(z.string()).optional().default([]),
      link: z.string().url(),
    }),
    // Model (Hugging Face, etc.)
    z.object({
      type: z.literal('model'),
      order: z.number().optional().default(0),
      name: z.string(),
      description: z.string(),
      tags: z.array(z.string()).optional().default([]),
      link: z.string().url(),
      platform: z.string().optional().default('Hugging Face'),
    }),
    // Chain (Smart Contract)
    z.object({
      type: z.literal('chain'),
      order: z.number().optional().default(0),
      name: z.string(),
      chain: z.string(),
      address: z.string(),
      explorer: z.string().url(),
      description: z.string().optional(),
    }),
  ]),
});

export const collections = {
  articles: articlesCollection,
  pages: pagesCollection,
  'profile-sections': profileSectionsCollection,
};
