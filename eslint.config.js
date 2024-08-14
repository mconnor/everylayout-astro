import astro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import markdown from 'eslint-plugin-markdown';
import regexp from 'eslint-plugin-regexp';
// import wc from 'eslint-plugin-wc';
// import lit from 'eslint-plugin-lit';
// import jsxA11y from 'eslint-plugin-jsx-a11y';

import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

import react from 'eslint-plugin-react';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...astro.configs.recommended,
  // jsxA11y.flatConfigs.recommended,

  regexp.configs['flat/recommended'],
  // wc.configs['flat/recommended'],
  // lit.configs['flat/recommended'],

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.eslint.json',

        // For example, if you use a specific tsconfig.eslint.json for linting, you'd specify:
        tsconfigRootDir: import.meta.dirname,

        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
    },
    // 'lit/no-invalid-html': 'warn',
  },

  //   rules: {
  //     '@typescript-eslint/no-unsafe-assignment': 'warn',
  //     '@typescript-eslint/no-unsafe-call': 'warn',
  //     '@typescript-eslint/no-unsafe-member-access': 'warn',
  //   },

  {
    files: ['**/*.js', '**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },

  {
    files: ['src/astro-custom-layout-components/**/*.js'],
    ...tseslint.configs.disableTypeChecked,
    rules: {
      'wc/no-constructor-attributes': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },

  {
    plugins: {
      markdown,
      // 'jsx-a11y': jsxA11y,
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
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
    },
  },

  {
    files: ['**/*.tsx', '**/*.jsx'],
    rules: {
      // 'jsx-a11y/alt-text': [
      //   2,
      //   {
      //     elements: ['img', 'object', 'area', 'input[type="image"]'],
      //     img: ['Image'],
      //     object: ['Object'],
      //     area: ['Area'],
      //     'input[type="image"]': ['InputImage'],
      //   },
      // ],
      // 'jsx-a11y/no-autofocus': [
      //   2,
      //   {
      //     ignoreNonDOM: true,
      //   },
      // ],
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
      '*.config.*',
      'src/components/ComponentLibrary.astro',
    ],
  },
  eslintConfigPrettier,
);
