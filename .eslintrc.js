module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'expo',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { semi: true, singleQuote: true }],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/ban-types': 'off',
  },
};
