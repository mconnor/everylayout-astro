import { z, reference, type SchemaContext } from 'astro:content';

// The context object that defineCollection uses for the function shape of schema. This type can be useful when building reusable schemas for multiple collections.

// This includes the following property:

// image - The image() schema helper that allows you to use local images in Content Collections
export const imageSchema = ({ image }: SchemaContext) =>
  z.object({
    image: image(),
    description: z.string().optional(),
  });

export const blogSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string(),
    pubDate: z.date({
      required_error: 'Please select a date and time',
      invalid_type_error: "That's not a date!",
    }),
    description: z.string(),
    author: reference('authors').optional(),
    relatedPosts: z.array(reference('blog')).optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    cover: z.object({ src: z.string(), description: z.string() }),
    // cover: imageSchema({ image }),
  });

export const authorSchema = z.object({
  id: z.string(),
  name: z.string().default('Anonymous'),
  email: z.string().email().optional(),
  portfolio: z.string().url().optional(),
  bio: z.string().optional(),
});

// const blogSchema = blogCollection.schema

// export type BlogSchemaType = z.infer<typeof blogSchema>
export type AurthorSchemaType = z.infer<typeof authorSchema>;
