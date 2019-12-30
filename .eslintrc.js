module.exports = {
  root: true,
  //指定解析器选项
  parserOptions: {
      sourceType: 'module',
      ecmaVersion: 2015,
      jsx: true
  },
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended'
  ],
  //指定脚本的运行环境
  env: {
      browser: true,
      node: true
  },
  // 启用的规则及其各自的错误级别
  rules: {
    'indent': ['error', 2],//缩进风格
    'quotes': ['error', 'single'],//引号类型 
    'semi': ['error', 'never'],//关闭语句强制分号结尾
    'no-console': 0,//禁止使用console
    'arrow-parens': 0 //箭头函数用小括号括起来
  },
  plugins: [
    'html'
  ],
  globals: {
    window: true,
    $: true,
    jQuery: true,
    XX: true
  }
}