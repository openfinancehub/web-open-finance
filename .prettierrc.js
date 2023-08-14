module.exports = {
  // 强制使用单引号
  singleQuote: true,
  printWidth: 80, // 行长规则通常设置为100或120
  tabWidth: 2, // tab缩进大小, 默认为2
  useTabs: false, // 使用tab缩进, 默认false
  // 字符串使用单引号
  singleQuote: true,
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // 末尾不需要逗号
  trailingComma: 'none',
  // 箭头函数参数括号
  arrowParens: 'avoid',
  // 在jsx中把'>' 是否单独放一行
  jsxBracketSameLine: true,
  // 使用默认的折行标准
  // proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 crlf/lf/auto
  // endOfLine: 'auto',
  overrides: [{ files: '.prettierrc', options: { parser: 'json' } }],
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-packagejson']
};
