import type { AstroInstance } from 'astro';

// const regexAstro = /\.astro$/;

// const zObjWithUrl = z.object({ url: z.string() });
const regexDynamicRoute = /\[.*\]/;

const topLevelPages = Object.values(
  import.meta.glob<AstroInstance>(`../pages/*.astro`, {
    eager: true,
  }),
).filter(
  (astroInst) => astroInst?.url && !regexDynamicRoute.test(astroInst.url),
);
// .map((astroInst) => astroInst?.url);

const layoutDemoPages = Object.values(
  import.meta.glob<AstroInstance>(`../pages/demo/*.astro`, {
    eager: true,
  }),
);

// const mainPages = topLevelPages.filter((page) => !page.includes('/_'));

export { layoutDemoPages, topLevelPages };
