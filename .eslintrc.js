module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'space-before-function-paren': 0,
    semi: ['error', 'always'],
    'no-tabs': 0,
    'no-unused-vars': 0,
    // 有没有使用的表达式报错，0或者'off'表示关闭验证 1或者'warn'表示警告，不影响执行代码
    // 2或者'error'表示验证规则生效，不符合规则报错
    'no-unused-expressions': 0,
    singleQuote: 0,
    // 关闭缩进几个空格的检查
    indent: 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
