module.exports = {
    root: true,
    extends: ['airbnb-typescript'],
    parserOptions: {
      project: './tsconfig.json',
    },
    plugins: ['react', 'react-hooks'],
    rules: {
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: true, classes: true, variables: false },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
          json: 'always',
        },
      ],
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks: 'useRecoilCallback',
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  };
  