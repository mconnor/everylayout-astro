// import eslintConfigPrettier from 'eslint-config-prettier';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import js from '@eslint/js';

import tseslint from 'typescript-eslint';

import eslintPluginAstro from 'eslint-plugin-astro';
import markdown from 'eslint-plugin-markdown';
import regex from 'eslint-plugin-regexp';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import wc from 'eslint-plugin-wc';
// import lit from 'eslint-plugin-lit';

// import { FlatCompat } from '@eslint/eslintrc';
// import path from 'path';
// import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname, // optional; default: process.cwd()
//   resolvePluginsRelativeTo: __dirname, // optional
//   recommendedConfig: js.configs.recommended, // optional unless you're using "eslint:recommended"
//   allConfig: js.configs.all, // optional unless you're using "eslint:all"
// });

export default tseslint.config(
  js.configs.recommended, // Recommended config applied to all files
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...eslintPluginAstro.configs.recommended,

  // ...markdown.configs.recommended,
  ...fixupConfigRules(markdown.configs.recommended),
  ...fixupConfigRules(regex.configs['flat/recommended']),

  // ...fixupConfigRules(hooks.configs.recommended),
  ...fixupConfigRules(wc.configs['flat/recommended']),
  // ...fixupConfigRules(lit.configs['flat/recommended']),

  // ...compat.extends('plugin:react/jsx-runtime'),
  // ...compat.extends('plugin:react-hooks/recommended'),
  // ...compat.extends('plugin:jsx-a11y/recommended'),
  // ...compat.extends('plugin:lit/recommended'),
  // ...compat.extends('plugin:wc/recommended'),

  {
    files: ['src/**/*.tsx'],
    plugins: {
      // insert the fixed plugin instead of the original

      react: fixupPluginRules(react),
      hooks: fixupPluginRules(hooks),
      // ...fixupPluginRules(hooks),
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // ... any rules you want
      // ...fixupConfigRules(react.configs['jsx-runtime']),
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
  },

  {
    ignores: ['src/**/_*.*', 'dist/'],
  },

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      // 'lit/no-invalid-html': 'warn',
    },
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },

  {
    files: ['src/astro-custom-layout-components/**/*.js'],
    rules: {
      'wc/no-constructor-attributes': 'off',
    },
  },

  {
    // 1. Target ```js code blocks in .md files.
    files: ['**/*.md/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  // {
  //   files: ['tests/**'],
  //   languageOptions: {
  //     globals: {
  //       ...globals.mocha,
  //     },
  //   },
  // },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
  },
  {
    ignores: [
      '**/temp.js',
      'config/*',
      'pnpm-lock.yaml',
      '.astro/',
      'dist/',
      '**/test.ts',
      'my-custom-cache-directory',
      'src/env.d.ts',
    ],
  },
);
