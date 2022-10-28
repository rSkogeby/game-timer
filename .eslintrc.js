// FIXME:
// This file is not being used by the testing infrastructure, it's only here to tell VS Code which settings to use.
// https://github.com/microsoft/vscode-eslint/issues/498

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
      'newlines-between': 'always'
    }]
  }
}
