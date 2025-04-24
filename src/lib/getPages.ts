import type { AstroInstance } from 'astro';

const topLevelPages = Object.values(
  import.meta.glob<AstroInstance>(`../pages/*.astro`, {
    eager: true,
  }),
);

const layoutDemoPages = Object.values(
  import.meta.glob<AstroInstance>(`../pages/demo/*.astro`, {
    eager: true,
  }),
);

// const mainPages = topLevelPages.filter((page) => !page.includes('/_'));

export { layoutDemoPages, topLevelPages };
