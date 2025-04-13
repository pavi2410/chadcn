import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

// Define the schema for registry entry validation
const registriesCollection = defineCollection({
  loader: file('./src/content/registries/index.json'),
  schema: z.object({
    url: z.string().url(),
    featured: z.boolean().optional().default(false),
    addedAt: z.string().datetime().optional(),
  })
});

export const collections = {
  'registries': registriesCollection
};
