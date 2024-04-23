// ver 2.0.0
import eslintPluginAstro from 'eslint-plugin-astro'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
import js from '@eslint/js'
import markdown from 'eslint-plugin-markdown'
import tseslint from 'typescript-eslint'

// import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    ignores: [
      'pnpm-lock.yaml',
      '.astro/',
      'dist/',
      '**/test.ts',
      'my-custom-cache-directory',
      'env.*',
      'src/env.d.ts',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        // HTMLElement: true,
        // document: true,
        // customElements: true,
        // window: true,
      },
      parserOptions: {
        project: true,
      },
    },
    rules: {
      // add more rules here
      // 'no-console': 'off',
      'astro/no-unused-css-selector': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': 'off',
    },
  },

  {
    files: ['src/**/*.md'],
    plugins: {
      markdown,
    },
    processor: 'markdown/markdown',
    rules: {
      // ...
    },
  },
  {
    // 1. Target ```js code blocks in .md files.
    files: ['**/*.md/*.js'],
    rules: {
      // 2. Disable other rules.
      // 'no-console': 'off',
      // 'import/no-unresolved': 'off',
    },
  },
  {
    // disable type-aware linting on JS files
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  eslintConfigPrettier, // eslint-config-prettier last
]
