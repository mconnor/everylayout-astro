import type { AstroInstance } from 'astro';
const regexAstro = /\.astro$/;

export const pagePaths = Object.values(
  import.meta.glob<AstroInstance>('../pages/**/*.astro', {
    eager: true,
  }),
)
  .filter((astroInst) => astroInst?.url && !/\[.*\]/.test(astroInst.url))
  .map((astroInst) => {
    if (astroInst.url) {
      return astroInst?.url.replace(regexAstro, '');
    }
  });
