/// <reference types="vitest" />
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/index': '/about',
  },
  site: 'https://example.com',
  output: 'static',
  image: {
    domains: ['astro.build', 'picsum.photos'],
  },
  integrations: [mdx(), sitemap(), react()],
  cacheDir: './my-custom-cache-directory',
});
