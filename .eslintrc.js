module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
  },

  extends: [
    // 'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react',
  ],

  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly'
  },

  parser: 'babel-eslint',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },

    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: [
    'react',
    'prettier',
  ],

  rules: {
    'prettier/prettier': 'error',

    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.js'],
      }
    ],

    'important/prefer-default-export': 'off',
  },
};
