// @ts-check
import astroParser from 'astro-eslint-parser';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';

import markdown from 'eslint-plugin-markdown';
import regexp from 'eslint-plugin-regexp';
import wc from 'eslint-plugin-wc';
import lit from 'eslint-plugin-lit';

const config = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...astro.configs.recommended,
  regexp.configs['flat/recommended'],
  wc.configs['flat/recommended'],
  lit.configs['flat/recommended'],
  {
    languageOptions: {
      // ecmaVersion: 'latest',
      // sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.astro'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        project: true,
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.astro'],
      },
    },
  },
  {
    files: ['**/*js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    files: [
      'src/astro-custom-layout-components/**/*js',
      'src/astro-web-component/**/*js',
    ],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      'no-unused-expressions': 'off',
      'wc/no-constructor-attributes': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
  {
    files: ['src/schemas/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },

  {
    plugins: {
      markdown,
    },
  },
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
);

export default [
  {
    ignores: [
      'dist',
      '.astro',
      '*.cjs',
      '*rss.xml.js',
      'src/env.d.ts',
      'src/components/_Hamburger.astro',
      'cache-directory/',
      '*.d.ts',
      '**/temp.js',
      '*lock.yaml',
      '.vercel/',
      ' test/',
    ],
  },
  ...config,
  eslintConfigPrettier,
];
