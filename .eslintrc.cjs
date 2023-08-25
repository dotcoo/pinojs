module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    // node: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    pinojs: true,
    pino: true,
    axios: true,
    $: true,
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': ['warn', 'always'],
    'no-lone-blocks': 'off',
    'space-before-function-paren': ['warn', 'never'],
    'comma-dangle': ['warn', 'always-multiline'],
    'no-prototype-builtins': 'off',
    'space-before-function-paren': 'off',
    'camelcase': 'off',
    // 'node/no-deprecated-api': 'off',
  }
}
