import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
// https://astro.build/config
export default defineConfig({
  // redirects: {
  //   '/index': '/about',
  // },
  site: 'https://example.com',

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['open-props'],
    },
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist('>= 0.25%')),
        drafts: {
          customMedia: true,
        },
      },
    },
  },

  image: {
    domains: ['astro.build', 'picsum.photos', 'tailwindcss.com'],
    experimentalLayout: 'constrained',
  },
  integrations: [mdx(), sitemap(), react()],
  cacheDir: './my-custom-cache-directory',
  experimental: {
    responsiveImages: true,
  },
});
