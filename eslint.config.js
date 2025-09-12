const tsPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.idea/**', 'tsconfig.tsbuildinfo', '**/*.js'],
  },
  // TypeScript files only
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: require('@typescript-eslint/parser')
    },
    rules: {
      'indent': ['error', 2, { SwitchCase: 1 }],
      'no-trailing-spaces': 'error',
      'quotes': ['error', 'single', { avoidEscape: true }],
      'linebreak-style': ['error', 'unix'],
      'semi': ['error', 'always'],
      'no-invalid-this': 'error',
      'no-unused-vars': 'off', // Use TypeScript's no-unused-vars instead
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
      'no-console': 'error',
      'block-scoped-var': 'error',
      'curly': ['error', 'all'],
      'dot-location': ['error', 'property'],
      'dot-notation': 'error',
      'no-else-return': 'error',
      'no-eq-null': 'error',
      'no-fallthrough': 'error',
      'no-return-assign': 'error',
      'no-use-before-define': ['error', { functions: false }],
      'no-path-concat': 'error'
    }
  }
];
