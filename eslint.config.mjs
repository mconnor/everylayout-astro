// @ts-check
import 'eslint-plugin-only-warn';

import js from '@eslint/js';
import markdown from '@eslint/markdown';
import astroParser from 'astro-eslint-parser';
import prettier from 'eslint-config-prettier';
import eslintPluginAstro from 'eslint-plugin-astro';
// import regexp from 'eslint-plugin-regexp';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { configs as wc } from 'eslint-plugin-wc';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import reactConfig from './react-lint/react-internal.mjs';
// import type { Linter } from 'eslint';

const mdconfig = [
  {
    // Apply the Markdown processor to all .md files
    files: ['**/*.md'],
    plugins: {
      markdown,
    },
    processor: 'markdown/markdown', // Lint fenced code blocks in Markdown
    language: 'markdown/commonmark', // Or use "markdown/gfm" for GitHub-Flavored Markdown
    rules: {
      // Markdown rules
      'markdown/fenced-code-language': 'warn', // Enforce language specification in fenced code blocks
      'markdown/heading-increment': 'error', // Ensure heading levels increment by one
      'markdown/no-duplicate-headings': 'warn', // Disallow duplicate headings in the same document
      'markdown/no-empty-links': 'warn', // Disallow empty link elements
      'markdown/no-html': 'error', // Disallow HTML in Markdown
      'markdown/no-invalid-label-refs': 'error', // Disallow invalid label references
      'markdown/no-missing-label-refs': 'error', // Disallow missing label references
    },
  },
];

const tsConfig = tseslint.config(
  {
    ignores: [
      'dist/',
      '.astro/',
      'cache-directory/',
      'my-custom-cache-directory/',
      '**/temp.js',
      '*lock.yaml',
      '.vercel/',
      '.turbo/',
      'test/',
      'node_modules/',
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,

  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    files: ['**/*.astro'],
    extends: [
      eslintPluginAstro.configs.recommended,
      tseslint.configs.disableTypeChecked,
    ],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        project: true,
        extraFileExtensions: ['.astro'],
        parser: tseslint.parser,
        ecmaFeatures: {
          jsx: false,
        },
      },
    },
  },
  {
    files: ['**/*js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  // {
  //   files: ['src/content/blog/*.md'],
  //   extends: [markdown.configs.recommended,],
  // },
  { files: ['src/**/*.jsx', 'src/**/*.tsx'], extends: [reactConfig] },
  {
    ...wc['flat/recommended'],
    files: [
      'src/astro-custom-layout-components/**/*js',
      'src/astro-web-component/**/*js',
    ],

    // extends: [tseslint.configs.disableTypeChecked],
    rules: {
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'wc/no-constructor-attributes': 'warn',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
  // {
  //   files: ['src/schemas/**/*.ts'],
  //   rules: {
  //     '@typescript-eslint/no-unsafe-assignment': 'off',
  //     '@typescript-eslint/no-unsafe-call': 'off',
  //   },
  // },

  {
    files: ['**/*.md/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      'no-console': 'off',
      'import/no-unresolved': 'off',
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  },

  prettier,
);

export default [...tsConfig, ...mdconfig];
