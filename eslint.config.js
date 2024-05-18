// ver 2.0.0

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import eslintPluginAstro from 'eslint-plugin-astro'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
import js from '@eslint/js'
import markdown from 'eslint-plugin-markdown'
import tseslint from 'typescript-eslint'
import { FlatCompat } from '@eslint/eslintrc'
import regexpEslint from 'eslint-plugin-regexp'

// import tsPlugin from '@typescript-eslint/eslint-plugin';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ref: https://eslint.org/docs/latest/use/configure/migration-guide#using-eslintrc-configs-in-flat-config
// mimic CommonJS variables -- not needed if using CommonJS
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // ...tseslint.configs.recommendedTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,
  ...eslintPluginAstro.configs.recommended,
  // ...compat.extends('plugin:lit/recommended'),
  // ...compat.extends('plugin:wc/recommended'),
  ...compat.extends('plugin:regexp/recommended'),
  {
    ignores: [
      'pnpm-lock.yaml',
      '.astro/',
      'dist/',
      '**/test.ts',
      'my-custom-cache-directory',
      'src/env.d.ts',
    ],
  },

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },

      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: './',
      },
    },
    plugins: {
      regexp: regexpEslint,
    },
    rules: {
      // In some cases, using explicit letter-casing is more performant than the `i` flag
      'regexp/use-ignore-case': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-duplicate-type-constituents': 'warn',
      '@typescript-eslint/unbound-method': 'warn',
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
  },

  {
    // disable type-aware linting on JS files
    files: ['**/*.js', '**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    // 1. Add the plugin
    plugins: {
      markdown,
    },
  },

  {
    files: ['src/**/*.md'],

    processor: 'markdown/markdown',
    rules: {
      // ...
    },
  },
  {
    // 1. Target ```js code blocks in .md files.
    files: ['**/*.md/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    // disable type-aware linting on JS files
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  eslintConfigPrettier, // eslint-config-prettier last
)
