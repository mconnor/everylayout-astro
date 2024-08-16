/// <reference types="vitest" />
import { getViteConfig } from 'astro/config.js';

export default getViteConfig({
  build: {
    minify: 'esbuild',
    sourcemap: true, // Source map generation must be turned on
  },
  ssr: {
    noExternal: ['date-fns', 'open-props', '@shoelace-style/shoelace'],
  },
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
    exclude: [],
  },
});
