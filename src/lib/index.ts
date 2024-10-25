// import type { AstroInstance } from 'astro';
// const regexAstro = /\.astro$/;

export const getRandomPic = (w = '300', h = '300') => {
  return `https://picsum.photos/${w}/${h}?random=${Math.floor(Math.random() * 100)}`;
};

// export const getPathLinks = (
//   pages: AstroInstance[],
//   containerFolder: string,
// ) => {
//   return pages
//     .map((page) => {
//       const match = page.file.match(/{containerFolder}\/(.+)/);
//       return match?.[1];
//     })
//     .filter((path: string) => !/\[.*\]/.test(path))
//     .map((path: string | undefined) => path?.replace(regexAstro, ''))
//     .map(
//       (filteredPath: string | undefined) =>
//         `<li><a href="./${filteredPath}">${filteredPath}</a></li>`,
//     );
// };
