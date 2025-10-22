// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// Define the schema for the 'blog' collection
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Use z.coerce.date() to safely convert string dates to Date objects
    pubDate: z.coerce.date(),
    // Make heroImage a required string
    heroImage: z.string(),
    // Make category an optional string, since not all your posts have it
    category: z.string().optional(),
  }),
});

// Export the collections object
export const collections = {
  blog: blogCollection,
};