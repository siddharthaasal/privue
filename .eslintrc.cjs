// .eslintrc.cjs
module.exports = {
    root: true,
    env: { browser: true, node: true, es2021: true },

    // use the TS parser so ESLint understands `: string`, `interface`, etc.
    parser: '@typescript-eslint/parser',

    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        // NOTE: do NOT set `project: './tsconfig.json'` here unless you want type-aware rules.
    },

    plugins: ['@typescript-eslint', 'import', 'unused-imports'],

    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // non-type-aware recommended rules
        'plugin:import/recommended',
        'prettier'
    ],

    rules: {
        // 'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-console': 'error',
        'no-debugger': 'warn',

        // relax some TS rules you explicitly wanted off
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
        ],

        // unused imports plugin (keeps imports clean)
        'unused-imports/no-unused-imports': 'error',

        // import ordering (non-fatal)
        'import/order': [
            'warn',
            {
                groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
                'newlines-between': 'always',
                alphabetize: { order: 'asc', caseInsensitive: true }
            }
        ]
    },

    settings: {
        'import/resolver': {
            node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
            typescript: { alwaysTryTypes: true }
        }
    },

    overrides: [
        // Allow node configs to run as node env
        { files: ['*.cjs', '*.config.js'], env: { node: true } },

        // If you want different rules for tests:
        {
            files: ['**/*.test.ts', '**/*.spec.ts'],
            rules: { '@typescript-eslint/no-explicit-any': 'off' }
        }
    ]
};
