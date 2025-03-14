// import { file } from 'astro/loaders';
// import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { AstroInstance } from 'astro';
// import type { MarkdownInstance } from 'astro';
import { reference, z } from 'astro:content';

const urlSchema = z.string().url();
const urlSchemaOptional = urlSchema.optional();
const strSC = z.string();
const strSCOptional = strSC.optional();
const emailSchema = z.string().email();
const emailSchemaOptional = emailSchema.optional();
const astroInstanceSchema = z.ZodType<AstroInstance>;

const imageSrcSchema = z.object({ src: urlSchema, alt: strSC });

const myDateSchema = z.date({
  required_error: 'Please select a date and time',
  invalid_type_error: "That's not a date!",
});

export const blogSchema = z.object({
  title: strSC,
  pubDate: myDateSchema,
  description: strSC,
  author: reference('authors'),
  // relatedPosts: z.array(reference('blog')).optional(),
  draft: z.boolean().optional(),
  tags: z.array(strSC),
  cover: imageSrcSchema,
});

export const authorSchema = z.object({
  id: strSC,
  name: strSC.default('Anonymous'),
  email: emailSchemaOptional,
  portfolio: urlSchemaOptional,
  bio: strSCOptional,
});

export const zTags = z.array(strSC).nonempty();

// type AstroInstanceType = {
//   /* The file path of this file */
//   file: string;
//   /* The URL for this file (if it is in the pages directory) */
//   url: string | undefined;
//   default: AstroComponentFactory;
// };

// export const astroComponentSchema = z.custom<AstroInstanceType>;
// const regexAstro = /[a-z]+.astro/;

export const tagCountTypeSchema = z.record(z.number());

export type AurthorSchemaType = z.infer<typeof authorSchema>;
export type BlogSchemaType = z.infer<typeof blogSchema>;
