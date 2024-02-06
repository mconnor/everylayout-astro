import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  image: {
    domains: ['astro.build', 'picsum.photos'],
  },
  integrations: [mdx(), sitemap()],
  vite: {
    ssr: {
      noExternal: ['open-props'],
    },
  },
})
