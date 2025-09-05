import {  glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

import {
  // astroComponentSchema,
  authorSchema,
  blogSchema,
} from '#schemas/index.ts';

// import { categorySchema } from '#schemas/store.ts';

const blog = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '**/*.mdx'],
    base: './src/data/blog',
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
  loader: glob({ pattern: '**/[^_]*.json', base: './src/data/authors' }),
  schema: authorSchema,
});

// const categoriesCollection = defineCollection({
//   loader: file('./src/data/store/categories.toml'),
//   schema: categorySchema,
// });

// 3. Export multiple collections to register them
export const collections = {
  // astroComponents,
  // categoriesCollection,
  blog,
  authors,
};
