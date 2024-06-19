import { z, reference } from 'astro:content';

const urlzod = z.string().url();

const dims = z
  .number()
  .gte(5, { message: 'this👏is👏too👏small' })
  .lt(2000, { message: 'this👏is👏too👏big' });

export const getRandomPic = (w: typeof dims, h: typeof dims) => {
  const random = Math.floor(Math.random() * 1000).toString();

  return `https://picsum.photos/${w}/${h}?random=${random}`;
};
