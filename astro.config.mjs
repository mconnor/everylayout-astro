import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      PUBLIC_EMAIL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PORT: envField.number({
        context: 'server',
        access: 'public',
        default: 4325,
      }),
      API_SECRET: envField.string({ context: 'server', access: 'secret' }),
    },
  },
  site: 'https://example.com',

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['open-props'],
    },
  },

  image: {
    domains: ['astro.build', 'picsum.photos', 'tailwindcss.com'],
    experimentalLayout: 'constrained',
  },
  integrations: [mdx(), sitemap(), react()],
  cacheDir: './my-custom-cache-directory',
  experimental: {},
  adapter: vercel({
    imageService: true,
    devImageService: 'sharp',
  }),
});
