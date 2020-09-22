module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    eqeqeq: ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
      },
    ],
  },
  env: {
    node: true,
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
      ],
      plugins: ['prettier', '@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './config/tsconfig.json',
      },
    },
    {
      files: ['*.test.ts'],
      parserOptions: {
        project: './config/tsconfig.test.json',
      },
    },
  ],
};
