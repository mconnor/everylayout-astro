/// <reference types="vitest" />
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
// import sentry from '@sentry/astro'
// import spotlightjs from '@spotlightjs/astro'
// import { loadEnv } from 'vite'
import react from '@astrojs/react'

// import vercel from '@astrojs/vercel/serverless'
// import lit from '@astrojs/lit'
// const { SECRET_TOKEN } = loadEnv(
//  proceess.env.SENTRY_AUTH_TOKEN,
//   process.cwd(),
//   '',
// )

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  output: 'static',
  image: {
    domains: ['astro.build', 'picsum.photos'],
  },
  integrations: [
    mdx(),
    sitemap(),
    // sentry({
    //   dsn: 'https://17bdb94a63b43e26f623fb84e54a100e@o4506328206802944.ingest.sentry.io/4506770353356800',
    //   release: '1.0.0',
    //   environment: import.meta.env.MODE,
    //   sourceMapsUploadOptions: {
    //     project: 'every-layout-1',
    //     org: 'mike-connor',
    //     authToken: SECRET_TOKEN,
    //   },
    // }),
    // spotlightjs(),
    react(),
    // lit(),
  ],
  vite: {
    ssr: {
      noExternal: ['date-fns', 'open-props'],
    },
  },
})
