// ver 1.0.0
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import js from '@eslint/js';
import markdown from 'eslint-plugin-markdown';
import tsParser from '@typescript-eslint/parser';

// import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  js.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    ignores: ['pnpm-lock.yaml', '.astro/', 'dist/'],
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,

        // alert: 'readonly',
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        // myCustomGlobal: "readonly"
      },
      // sourceType: string;
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      // "prettier/prettier"?: undefined;
    },
    // processor: string;
    // plugins?: undefined;
  },

  {
    files: ['**/*.astro'],

    // Parse the script in `.astro` as TypeScript by adding the following configuration.
    // It's the setting you need when using TypeScript.

    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
      'no-unused-vars': 'error',
      // semi: 'warn',  this rule gets tossed out by eslintConfigPrettier
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
  eslintConfigPrettier, // eslint-config-prettier last
];
