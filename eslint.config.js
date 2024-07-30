import astro from 'eslint-plugin-astro';
import markdown from 'eslint-plugin-markdown';
import regexp from 'eslint-plugin-regexp';
// import wc from 'eslint-plugin-wc';
// import lit from 'eslint-plugin-lit';
import jsxA11y from 'eslint-plugin-jsx-a11y';

import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

import react from 'eslint-plugin-react';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...astro.configs.recommended,
  // jsxA11y.flatConfigs.recommended,

  regexp.configs['flat/recommended'],
  // wc.configs['flat/recommended'],
  // lit.configs['flat/recommended'],

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
    },
    // 'lit/no-invalid-html': 'warn',
  },

  {
    files: ['**/*.js', '**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },

  {
    files: [
      'src/astro-custom-layout-components/**/*',
      'src/ui/web-components/**/*',
    ],
    rules: {
      'wc/no-constructor-attributes': 'off',
    },
  },

  {
    plugins: {
      markdown,
      'jsx-a11y': jsxA11y,
      react,
      // 'react-hooks': fixupPluginRules(reactHooks),
    },
  },
  {
    rules: {
      // ...
      // ...reactHooks.configs.recommended.rules,
    },
  },

  {
    files: ['**/*.tsx', '**/*.jsx'],
    rules: {
      'jsx-a11y/alt-text': [
        2,
        {
          elements: ['img', 'object', 'area', 'input[type="image"]'],
          img: ['Image'],
          object: ['Object'],
          area: ['Area'],
          'input[type="image"]': ['InputImage'],
        },
      ],
      'jsx-a11y/no-autofocus': [
        2,
        {
          ignoreNonDOM: true,
        },
      ],
    },
  },

  {
    files: ['**/*.md'],
    processor: 'markdown/markdown',
  },
  {
    files: ['**/*.md/*.js'],
    ...tseslint.configs.disableTypeChecked,
    // ...
    rules: {
      'no-console': 'off',
      'import/no-unresolved': 'off',
    },
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
      '**/_*.*',
      '**/temp.js',
      '*lock.yaml',
      '.astro/',
      'dist/',
      'my-custom-cache-directory',
      'src/env.d.ts',
      '.vercel/',
      'src/pages/demo/modal-demo.astro',
      'src/web-component/astro-modal/index.astro',
    ],
  },
  eslintConfigPrettier,
);
