/*
  當規則有改動時，需要到vite.config，把eslintrc.enabled改為true，並且重run，完成後再改回false，
  此舉是為了讓auto-import自動生成 .eslintrc-auto-import.json 文件，
  待文字重新生成後，需要再關閉，否則eslint可能會抓不到，因為每次打包都會重新生成
*/
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
    'plugin:vue-pug/vue3-recommended',
    'eslint:recommended',
    '@vue/standard',
    './src/plugins/unpluginAutoImport/.eslintrc-auto-import.json' // `unplugin-auto-import` 生成的規則設定
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
