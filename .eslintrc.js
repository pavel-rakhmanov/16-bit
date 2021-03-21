module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint-config-airbnb-base',
    'eslint-config-airbnb-typescript',
    'eslint-config-prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  globals: {
    ENV: true,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
  },
};
