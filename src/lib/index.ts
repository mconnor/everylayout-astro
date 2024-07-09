export const getRandomPic = (w = '300', h = '300') => {
  return `https://picsum.photos/${w}/${h}?random=${Math.floor(Math.random() * 100)}`;
};
