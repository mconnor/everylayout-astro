// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: 'src/**/*.astro',
      options: {
        parser: 'astro',
        tabWidth: 2,
      },
    },
  ],
}
