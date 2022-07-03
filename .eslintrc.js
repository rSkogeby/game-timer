module.exports = {
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  extends: [
    'standard-with-typescript',
    'standard-jsx'
  ],
  rules: {
    'sort-imports': [1, {
      ignoreDeclarationSort: true
    }],
    'import/order': [1, {
      alphabetize: {
        order: 'asc'
      },
      groups: [
        ['builtin', 'external'],
        ['internal', 'unknown'],
        ['parent'],
        ['sibling', 'index']
      ],
      'newlines-between': 'always',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false
        }
      ]
    }]
  }
}
