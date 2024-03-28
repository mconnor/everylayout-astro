import { z, reference } from 'astro:content'

export const blogSchema = z.object({
  title: z.string(),
  pubDate: z.date({
    required_error: 'Please select a date and time',
    invalid_type_error: "That's not a date!",
  }),
  description: z.string(),

  // Reference a single author from the `authors` collection by `id`
  author: reference('authors').optional(),
  // Reference an array of related posts from the `blog` collection by `slug`
  relatedPosts: z.array(reference('blog')).optional(),
  draft: z.boolean().optional(),
  tags: z.array(z.string()).optional(),

  cover: z.object({ url: z.string(), alt: z.string() }),
})

export const authorSchema = z.object({
  id: z.string(),
  name: z.string().default('Anonymous'),
  email: z.string().email().optional(),
  portfolio: z.string().url().optional(),
  bio: z.string().optional(),
})

// const blogSchema = blogCollection.schema

export type BlogSchemaType = z.infer<typeof blogSchema>
export type AurthorSchemaType = z.infer<typeof authorSchema>
