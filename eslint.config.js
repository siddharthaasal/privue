import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    // <<< added rules block to relax TypeScript checks for .ts/.tsx files >>>
    // Turn off `no-explicit-any` and relax a couple of other strict rules.
    // Adjust 'warn' / 'off' as you prefer.
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },

  },
  {
    // target the shadcn/ui generated components — adjust path if needed
    files: ['src/components/ui/**', 'src/components/ui/**/*.{ts,tsx}'],
    rules: {
      // silence the fast-refresh-only-export-components error for these generated files
      'react-refresh/only-export-components': 'off'
    }
  }
]);
