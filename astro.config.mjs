import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

import sentry from '@sentry/astro'
import spotlightjs from '@spotlightjs/astro'
import process from 'process'

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  image: {
    domains: ['astro.build', 'picsum.photos'],
  },
  integrations: [
    mdx(),
    sitemap(),
    sentry({
      dsn: 'https://f1c193eae695e0d5f652cb876dc1aa08@o4506328206802944.ingest.sentry.io/4506707699171328',
      sourceMapsUploadOptions: {
        project: 'sentry-astro',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
    spotlightjs(),
  ],
  vite: {
    ssr: {
      noExternal: ['open-props'],
    },
  },
})
