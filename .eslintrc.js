module.exports ={
  root: true,
  env: {
    node: true,
    browser: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceMap: 'module',
    ecmaVersion: 7
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  rules: {
    'space-before-function-paren': 'error', // 关闭函数函数声明在小括号前必须加空格的规则
    'no-trailing-spaces': 'off', // 关闭禁用行尾空格
    'eol-last': 'off', // 关闭要求或禁止文件末尾存在空行
    'comma-dangle': 'warn', // 出现拖尾逗号仅反馈警告，而不是报错
    'no-console': 'off',
    indent: ['error', 2],
    quotes: ['error', 'single']
  },
  globals: {
    Vue: true
  }
}
