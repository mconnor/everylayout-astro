// @ts-check

import eslintPluginAstro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import js from '@eslint/js';
import markdown from 'eslint-plugin-markdown';
import tseslint from 'typescript-eslint';

import * as regexpPlugin from 'eslint-plugin-regexp';

import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,                  // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname,       // optional
  // recommendedConfig: js.configs.recommended, // optional unless you're using "eslint:recommended"
  // allConfig: js.configs.all,                 // optional unless you're using "eslint:all"
});


export default tseslint.config(
  js.configs.recommended, // Recommended config applied to all files
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...eslintPluginAstro.configs.recommended,
  // @ts-ignore
  ...markdown.configs.recommended,

  regexpPlugin.configs['flat/recommended'],




  // ...compat.extends('plugin:react/jsx-runtime'),
  // ...compat.extends('plugin:react-hooks/recommended'),
  // ...compat.extends('plugin:jsx-a11y/recommended'),
  // ...compat.extends('plugin:lit/recommended'),
  // ...compat.extends('plugin:wc/recommended'),

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      parserOptions: {
        parser: '@typescript-eslint/parser',
        processor: eslintPluginAstro.processors.astro,
        project: true,
        tsconfigDirName: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },

  {
    files: ['**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: true,
        tsconfigDirName: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Not needed for newer React versions
      'react/prop-types': 'off', // Disable if not using PropTypes
      'react-hooks/rules-of-hooks': 'error', // Enforces the rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    },

    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },

  {
    files: ['**/*.tsx'],
    rules: {
      'react/display-name': 1,
      'react/no-array-index-key': 0,
      'react/react-in-jsx-scope': 0,
      'react/prefer-stateless-function': 0,
      'react/forbid-prop-types': 0,
      'react/no-unescaped-entities': 0,
      'react/function-component-definition': 0,
    },
  },

  {
    files: [
      'scr/web-components/**/*.js',
      'src/astro-custom-layout-components/**/*.js',
    ],
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
      'src/pages/demo/grid-demo.astro',
      '**/temp.js',
      'config/*',
      'pnpm-lock.yaml',
      '.astro/',
      'dist/',
      '**/test.ts',
      'my-custom-cache-directory',
      'src/env.d.ts',
      'src/components/Hamburger.astro',
      'src/pages/kitchensink.astro',
      'src/pages/splash.astro',
    ],
  },
  eslintConfigPrettier, // eslint-config-prettier last
);
