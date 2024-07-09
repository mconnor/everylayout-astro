import eslintPluginAstro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { fixupConfigRules } from '@eslint/compat';

import markdown from 'eslint-plugin-markdown';
import regex from 'eslint-plugin-regexp';

// import reactPlugin from 'eslint-plugin-react';
// import configReactRecommended from 'eslint-plugin-react/configs/recommended.js';
// import configJSXruntime from 'eslint-plugin-react/configs/jsx-runtime.js';

// import hooks from 'eslint-plugin-react-hooks/';
import wc from 'eslint-plugin-wc';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...eslintPluginAstro.configs.recommended,

  // ...markdown.configs.recommended,
  ...fixupConfigRules(markdown.configs.recommended),
  ...fixupConfigRules(regex.configs['flat/recommended']),

  ...fixupConfigRules(wc.configs['flat/recommended']),

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
  // {
  //   files: ['src/**/*.tsx'],
  //   plugins: {
  //     react: fixupPluginRules(reactPlugin),
  //   },

  //   rules: {
  //     // react
  //     ...fixupConfigRules(configReactRecommended),
  //     ...fixupConfigRules(configJSXruntime),
  //   },
  // },
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
      'src/**/_*.*',
      'dist/',
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
  eslintConfigPrettier,
);
