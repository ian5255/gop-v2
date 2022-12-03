
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:vue/vue3-essential',
    // 'plugin:vue/vue3-strongly-recommended', // 使用Vue3驗證規則
    'plugin:vue-pug/vue3-recommended',
    'eslint:recommended',
    '@vue/standard'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      globalReturn: false,
      impliedStrict: false
    },
    requireConfigFile: false,
    parser: '@babel/eslint-parser'
  },
  rules: {
    'dot-notation': 'off', // Object 不強制用 "."
    'no-console': 'off', // 可以使用 console
    quotes: ['error', 'single'], // 使用單引號
    'semi-style': ['error', 'last'], // 强制分号出现在句子末尾。
    'no-extra-semi': 'error', // 禁用不必要的分号。
    semi: ['error', 'always'], // 強制使用分號
    'no-empty-function': 'error', // 禁止空function
    'no-unused-labels': 'error',
    'no-alert': 'error', // alert、confirm 和 prompt 禁止使用
    'arrow-parens': ['error', 'always'], // ()=>箭頭
    curly: 'off', // 可用return 簡寫
    'vue/no-mutating-props': 'off'
  }
};
