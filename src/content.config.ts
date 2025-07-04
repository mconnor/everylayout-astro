import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

import {
  // astroComponentSchema,
  authorSchema,
  blogSchema,
} from '#schemas/index.js';

const blog = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '**/*.mdx'],
    base: './src/blog',
  }),
  schema: blogSchema,
});

// const astroComponents = defineCollection({
//   loader: glob({
//     pattern: ['**/*.astro'],
//     base: './src/components',
//   }),
//   schema: astroComponentSchema,
// });

const authors = defineCollection({
  // type: 'data',
 loader: glob({ pattern: '**/[^_]*.toml', base: "./src/content/authors" }),
  schema: authorSchema,
});

// 3. Export multiple collections to register them
export const collections = {
  // astroComponents,
  blog,
  authors,
};
