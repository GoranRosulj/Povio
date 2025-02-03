import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import playwright from 'eslint-plugin-playwright';

export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
            },
            parser: parser,
        },
        plugins: {
            '@typescript-eslint': tseslint,
            'prettier': prettier,
            'playwright': playwright,
        },
        rules: {
            ...pluginJs.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            ...playwright.configs.recommended.rules,
            '@typescript-eslint/no-unused-vars': ['warn', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': true }],
            'semi': ['error', 'always'],
            'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
            'indent': ['error', 4],
            'no-trailing-spaces': 'error',
            'eol-last': ['error', 'always'],
            'curly': ['error', 'all'],
            'prettier/prettier': 'error',
            '@typescript-eslint/semi': ['error', 'always'],
        },
    },
    {
        files: ['**/*.{spec,test}.{ts,tsx}'],
        rules: {
            // Disable no-wait-for-timeout
            'playwright/no-wait-for-timeout': 'off',
        },
    },
];