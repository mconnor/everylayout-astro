// ver 2.0.0
import eslintPluginAstro from 'eslint-plugin-astro'
import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'
import js from '@eslint/js'
import markdown from 'eslint-plugin-markdown'
import tseslint from 'typescript-eslint'

// import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // ...tseslint.configs.recommendedTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
      'astro/no-unused-css-selector': 'warn',
    },
  },
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
        project: true,
      },
    }
  },

  {
    // disable type-aware linting on JS files
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
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
    ...tseslint.configs.disableTypeChecked,
    rules: {
      // 2. Disable other rules.
      // 'no-console': 'off',
      // 'import/no-unresolved': 'off',
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  eslintConfigPrettier, // eslint-config-prettier last
]
