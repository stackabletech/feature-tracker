import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser
      }
    }
  },
  {
    rules: {
      'svelte/no-unused-svelte-ignore': 'off', // only false positives
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_'
        }
      ],
      'svelte/no-at-html-tags': 'off', // used for markdown rendering
      '@typescript-eslint/no-unused-expressions': 'off' // prevents e.key === 'Enter' && action() pattern
    }
  },
  {
    ignores: [
      'build/',
      '.svelte-kit/',
      'dist/',
      '.vercel/',
      '.vercel_build_output/',
      '.netlify',
      'node_modules/'
    ]
  }
];
