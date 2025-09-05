// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  plugins: [
    'prettier-plugin-toml',
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss',
  ],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  tailwindStylesheet: './src/styles/global.css',
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
};
