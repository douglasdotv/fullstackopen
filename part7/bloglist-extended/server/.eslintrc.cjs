module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parserOptions: { ecmaVersion: 'latest' },
  rules: {
    'prettier/prettier': 'error',
  },
}
