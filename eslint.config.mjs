import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'no-console': 'off', // Desactivado para reducir warnings
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['tests/**/*.js', '**/__tests__/**/*.js', '**/*.test.js', '**/*.test.jsx'],
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off', // Desactivar en tests
    },
  },
  {
    files: ['scripts/**/*.js', 'scripts/**/*.mjs'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      '*.config.js',
      '*.config.mjs',
      '**/*.test.js',
      '**/*.test.jsx',
      '**/useGSAP.js', // Tiene reglas no definidas
      '**/animations.js', // Tiene reglas no definidas
      '**/malNetProxy.mjs', // Tiene reglas no definidas
      '**/proxy.mjs', // Tiene reglas no definidas
    ],
  },
];
