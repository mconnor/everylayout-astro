/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';
// import { sentryVitePlugin } from '@sentry/vite-plugin';

export default getViteConfig({
  test: {
    // Vitest configuration options
  },
  build: {
    minify: 'esbuild',
    sourcemap: true, // Source map generation must be turned on
  },
  // plugins: [
  //   // Put the Sentry vite plugin after all other plugins
  //   sentryVitePlugin({
  //     authToken: import.meta.env.SENTRY_AUTH_TOKEN,
  //     org: 'mike-connor',
  //     project: 'astro-openprops-blog-w-tags',
  //   }),
  // ],
});
