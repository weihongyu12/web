---
sidebar_position: 5
---

# JavaScript 规范

## Airbnb

Airbnb 是 ESLint 中最流行的规则集之一。由 Airbnb 团队维护，被广泛认可和使用。Airbnb 规则以其严苛著称，它强制要求代码风格、变量命名、函数定义等各个方面的高度一致性，是许多项目的基石和起点。

```js
// .eslintrc.js

module.exports = {
  extends: [
    'airbnb-base',
  ],
};
```

:::warning
- 截止至目前，`eslint-config-airbnb-base` 仍不支持 ESLint 9.x 版本，使用时请注意。使用时请使用 ESLint 8.x 版本，耐心等待 `eslint-config-airbnb-base` 升级。
- 由于 `eslint-config-airbnb-base` 项目的一些管理问题，导致其更新比较缓慢，后续需要持续关注项目情况。
:::

### 最佳实践

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|---------|---------|---------|------|
| [accessor-pairs](https://eslint.org/docs/rules/accessor-pairs) | off | - | 强制 `getter`/`setter` 成对出现 |
| [array-callback-return](https://eslint.org/docs/rules/array-callback-return) | error | `{ allowImplicit: true }` | 强制数组方法的回调函数中有 `return` 语句 |
| [block-scoped-var](https://eslint.org/docs/rules/block-scoped-var) | error | - | 禁止在块作用域外使用变量 |
| [complexity](https://eslint.org/docs/rules/complexity) | off | `20` | 限制代码圈复杂度 |
| [class-methods-use-this](https://eslint.org/docs/rules/class-methods-use-this) | error | `{ exceptMethods: [] }` | 强制类方法使用 `this` |
| [consistent-return](https://eslint.org/docs/rules/consistent-return) | error | - | 要求函数返回类型一致 |
| [curly](https://eslint.org/docs/rules/curly) | error | `multi-line` | 强制使用大括号控制流语句 |
| [default-case](https://eslint.org/docs/rules/default-case) | error | `{ commentPattern: '^no default$' }` | 要求 `switch` 语句必须有 `default` |
| [default-case-last](https://eslint.org/docs/rules/default-case-last) | error | - | 要求 `default case` 放在最后 |
| [default-param-last](https://eslint.org/docs/rules/default-param-last) | error | - | 要求默认参数放在最后 |
| [dot-notation](https://eslint.org/docs/rules/dot-notation) | error | `{ allowKeywords: true }` | 强制使用点号访问属性 |
| [dot-location](https://eslint.org/docs/rules/dot-location) | error | `property` | 强制点号与属性同一行 |
| [eqeqeq](https://eslint.org/docs/rules/eqeqeq) | error | `always`, `{ null: 'ignore' }` | 强制使用 `===` 和 `!==` |
| [grouped-accessor-pairs](https://eslint.org/docs/rules/grouped-accessor-pairs) | error | - | 要求 `getter`/`setter` 成组出现 |
| [guard-for-in](https://eslint.org/docs/rules/guard-for-in) | error | - | 要求 `for-in` 循环包含 `if` 语句 |
| [max-classes-per-file](https://eslint.org/docs/rules/max-classes-per-file) | error | `1` | 限制每个文件的类数量 |
| [no-alert](https://eslint.org/docs/rules/no-alert) | warn | - | 禁止使用 `alert` |
| [no-caller](https://eslint.org/docs/rules/no-caller) | error | - | 禁止使用 `arguments.caller`/`callee` |
| [no-case-declarations](https://eslint.org/docs/rules/no-case-declarations) | error | - | 禁止 `case` 语句中声明变量 |
| [no-constructor-return](https://eslint.org/docs/rules/no-constructor-return) | error | - | 禁止构造函数返回值 |
| [no-div-regex](https://eslint.org/docs/rules/no-div-regex) | off | - | 禁止在正则表达式中使用除法符号 |
| [no-else-return](https://eslint.org/docs/rules/no-else-return) | error | `{ allowElseIf: false }` | 禁止在 `else` 前有 `return` |
| [no-empty-function](https://eslint.org/docs/rules/no-empty-function) | error | `{ allow: [...] }` | 禁止空函数 |
| [no-empty-pattern](https://eslint.org/docs/rules/no-empty-pattern) | error | - | 禁止空解构模式 |
| [no-empty-static-block](https://eslint.org/docs/rules/no-empty-static-block) | off | - | 禁止空静态块 |
| [no-eq-null](https://eslint.org/docs/rules/no-eq-null) | off | - | 禁止与 `null` 比较 |
| [no-eval](https://eslint.org/docs/rules/no-eval) | error | - | 禁止使用 `eval` |
| [no-extend-native](https://eslint.org/docs/rules/no-extend-native) | error | - | 禁止扩展原生对象 |
| [no-extra-bind](https://eslint.org/docs/rules/no-extra-bind) | error | - | 禁止不必要的 `bind` |
| [no-extra-label](https://eslint.org/docs/rules/no-extra-label) | error | - | 禁止不必要的标签 |
| [no-fallthrough](https://eslint.org/docs/rules/no-fallthrough) | error | - | 禁止 `case` 穿透 |
| [no-floating-decimal](https://eslint.org/docs/rules/no-floating-decimal) | error | - | 禁止浮点小数 |
| [no-global-assign](https://eslint.org/docs/rules/no-global-assign) | error | `{ exceptions: [] }` | 禁止覆盖原生对象 |
| [no-native-reassign](https://eslint.org/docs/rules/no-native-reassign) | off | - | 禁止覆盖原生对象 (已弃用) |
| [no-implicit-coercion](https://eslint.org/docs/rules/no-implicit-coercion) | off | `{ boolean: false, ... }` | 禁止隐式类型转换 |
| [no-implicit-globals](https://eslint.org/docs/rules/no-implicit-globals) | off | - | 禁止隐式全局变量 |
| [no-implied-eval](https://eslint.org/docs/rules/no-implied-eval) | error | - | 禁止隐式 `eval` |
| [no-invalid-this](https://eslint.org/docs/rules/no-invalid-this) | off | - | 禁止无效的 `this` 上下文 |
| [no-iterator](https://eslint.org/docs/rules/no-iterator) | error | - | 禁止使用 `__iterator__` |
| [no-labels](https://eslint.org/docs/rules/no-labels) | error | `{ allowLoop: false, ... }` | 禁止标签语句 |
| [no-lone-blocks](https://eslint.org/docs/rules/no-lone-blocks) | error | - | 禁止不必要的嵌套块 |
| [no-loop-func](https://eslint.org/docs/rules/no-loop-func) | error | - | 禁止循环中创建函数 |
| [no-magic-numbers](https://eslint.org/docs/rules/no-magic-numbers) | off | `{ ignore: [], ... }` | 禁止魔法数字 |
| [no-multi-spaces](https://eslint.org/docs/rules/no-multi-spaces) | error | `{ ignoreEOLComments: false }` | 禁止多个空格 |
| [no-multi-str](https://eslint.org/docs/rules/no-multi-str) | error | - | 禁止多行字符串 |
| [no-new](https://eslint.org/docs/rules/no-new) | error | - | 禁止 `new` 操作符副作用 |
| [no-new-func](https://eslint.org/docs/rules/no-new-func) | error | - | 禁止 `new Function` |
| [no-new-wrappers](https://eslint.org/docs/rules/no-new-wrappers) | error | - | 禁止 `new` 包装对象 |
| [no-nonoctal-decimal-escape](https://eslint.org/docs/rules/no-nonoctal-decimal-escape) | error | - | 禁止非八进制十进制转义 |
| [no-object-constructor](https://eslint.org/docs/rules/no-object-constructor) | off | - | 禁止 `Object` 构造函数 |
| [no-octal](https://eslint.org/docs/rules/no-octal) | error | - | 禁止八进制字面量 |
| [no-octal-escape](https://eslint.org/docs/rules/no-octal-escape) | error | - | 禁止八进制转义序列 |
| [no-param-reassign](https://eslint.org/docs/rules/no-param-reassign) | error | `{ props: true, ... }` | 禁止参数重新赋值 |
| [no-proto](https://eslint.org/docs/rules/no-proto) | error | - | 禁止 `__proto__` |
| [no-redeclare](https://eslint.org/docs/rules/no-redeclare) | error | - | 禁止重复声明变量 |
| [no-restricted-properties](https://eslint.org/docs/rules/no-restricted-properties) | error | 多对象配置 | 限制特定对象属性 |
| [no-return-assign](https://eslint.org/docs/rules/no-return-assign) | error | `always` | 禁止 `return` 中赋值 |
| [no-return-await](https://eslint.org/docs/rules/no-return-await) | error | - | 禁止不必要的 `return await` |
| [no-script-url](https://eslint.org/docs/rules/no-script-url) | error | - | 禁止 `javascript: URL` |
| [no-self-assign](https://eslint.org/docs/rules/no-self-assign) | error | `{ props: true }` | 禁止自我赋值 |
| [no-self-compare](https://eslint.org/docs/rules/no-self-compare) | error | - | 禁止自我比较 |
| [no-sequences](https://eslint.org/docs/rules/no-sequences) | error | - | 禁止逗号操作符 |
| [no-throw-literal](https://eslint.org/docs/rules/no-throw-literal) | error | - | 禁止抛出字面量 |
| [no-unmodified-loop-condition](https://eslint.org/docs/rules/no-unmodified-loop-condition) | off | - | 禁止未修改的循环条件 |
| [no-unused-expressions](https://eslint.org/docs/rules/no-unused-expressions) | error | `{ allowShortCircuit: false, ... }` | 禁止未使用的表达式 |
| [no-unused-labels](https://eslint.org/docs/rules/no-unused-labels) | error | - | 禁止未使用的标签 |
| [no-useless-call](https://eslint.org/docs/rules/no-useless-call) | off | - | 禁止不必要的 `.call`/`.apply` |
| [no-useless-catch](https://eslint.org/docs/rules/no-useless-catch) | error | - | 禁止不必要的 `catch` |
| [no-useless-concat](https://eslint.org/docs/rules/no-useless-concat) | error | - | 禁止不必要的字符串连接 |
| [no-useless-escape](https://eslint.org/docs/rules/no-useless-escape) | error | - | 禁止不必要的转义 |
| [no-useless-return](https://eslint.org/docs/rules/no-useless-return) | error | - | 禁止不必要的 `return` |
| [no-void](https://eslint.org/docs/rules/no-void) | error | - | 禁止 `void` 操作符 |
| [no-warning-comments](https://eslint.org/docs/rules/no-warning-comments) | off | `{ terms: [...], location: 'start' }` | 禁止警告注释 |
| [no-with](https://eslint.org/docs/rules/no-with) | error | - | 禁止 `with` 语句 |
| [prefer-promise-reject-errors](https://eslint.org/docs/rules/prefer-promise-reject-errors) | error | `{ allowEmptyReject: true }` | 要求 Promise reject 错误对象 |
| [prefer-named-capture-group](https://eslint.org/docs/rules/prefer-named-capture-group) | off | - | 建议命名捕获组 |
| [prefer-object-has-own](https://eslint.org/docs/rules/prefer-object-has-own) | off | - | 建议使用 `Object.hasOwn()` |
| [prefer-regex-literals](https://eslint.org/docs/rules/prefer-regex-literals) | error | `{ disallowRedundantWrapping: true }` | 建议使用正则字面量 |
| [radix](https://eslint.org/docs/rules/radix) | error | - | 要求 `parseInt` 使用基数 |
| [require-await](https://eslint.org/docs/rules/require-await) | off | - | 要求 `async` 函数有 `await` |
| [require-unicode-regexp](https://eslint.org/docs/rules/require-unicode-regexp) | off | - | 要求正则表达式使用 `u` 标志 |
| [vars-on-top](https://eslint.org/docs/rules/vars-on-top) | error | - | 要求变量声明在作用域顶部 |
| [wrap-iife](https://eslint.org/docs/rules/wrap-iife) | error | `outside`, `{ functionPrototypeMethods: false }` | 要求立即执行函数使用括号包裹 |
| [yoda](https://eslint.org/docs/rules/yoda) | error | - | 禁止 Yoda 条件 |

### 错误

| 规则名 | 错误级别 | 配置选项 | 描述 |
|--------|----------|----------|------|
| [for-direction](https://eslint.org/docs/rules/for-direction) | error | - | 防止循环条件错误导致无限循环 |
| [getter-return](https://eslint.org/docs/rules/getter-return) | error | `{ allowImplicit: true }` | 强制 `getter` 函数必须有返回值 |
| [no-async-promise-executor](https://eslint.org/docs/rules/no-async-promise-executor) | error | - | 禁止使用异步函数作为 Promise 执行器 |
| [no-await-in-loop](https://eslint.org/docs/rules/no-await-in-loop) | error | - | 禁止在循环内使用 `await` |
| [no-compare-neg-zero](https://eslint.org/docs/rules/no-compare-neg-zero) | error | - | 禁止与 `-0` 进行比较 |
| [no-cond-assign](https://eslint.org/docs/rules/no-cond-assign) | error | `"always"` | 禁止在条件语句中进行赋值操作 |
| [no-console](https://eslint.org/docs/rules/no-console) | warn | - | 警告使用 `console` 语句 |
| [no-constant-binary-expression](https://eslint.org/docs/rules/no-constant-binary-expression) | off | - | 关闭检测常量二进制表达式问题 |
| [no-constant-condition](https://eslint.org/docs/rules/no-constant-condition) | warn | - | 警告在条件中使用常量值 |
| [no-control-regex](https://eslint.org/docs/rules/no-control-regex) | error | - | 禁止在正则表达式中使用控制字符 |
| [no-debugger](https://eslint.org/docs/rules/no-debugger) | error | - | 禁止使用 `debugger` 语句 |
| [no-dupe-args](https://eslint.org/docs/rules/no-dupe-args) | error | - | 禁止函数参数重复定义 |
| [no-dupe-else-if](https://eslint.org/docs/rules/no-dupe-else-if) | error | - | 禁止 `else if` 中有重复条件 |
| [no-dupe-keys](https://eslint.org/docs/rules/no-dupe-keys) | error | - | 禁止对象字面量中重复的键 |
| [no-duplicate-case](https://eslint.org/docs/rules/no-duplicate-case) | error | - | 禁止 `switch` 语句中有重复的 `case` |
| [no-empty](https://eslint.org/docs/rules/no-empty) | error | - | 禁止空块语句 |
| [no-empty-character-class](https://eslint.org/docs/rules/no-empty-character-class) | error | - | 禁止正则表达式中出现空字符类 |
| [no-ex-assign](https://eslint.org/docs/rules/no-ex-assign) | error | - | 禁止对 `catch` 子句中的异常重新赋值 |
| [no-extra-boolean-cast](https://eslint.org/docs/rules/no-extra-boolean-cast) | error | - | 禁止不必要的布尔类型转换 |
| [no-extra-parens](https://eslint.org/docs/rules/no-extra-parens) | off | `"all", { conditionalAssign: true, nestedBinaryExpressions: false, returnAssign: false, ignoreJSX: "all", enforceForArrowConditionals: false }` | 关闭检测多余的括号（配置保留） |
| [no-extra-semi](https://eslint.org/docs/rules/no-extra-semi) | error | - | 禁止不必要的分号 |
| [no-func-assign](https://eslint.org/docs/rules/no-func-assign) | error | - | 禁止对函数声明重新赋值 |
| [no-import-assign](https://eslint.org/docs/rules/no-import-assign) | error | - | 禁止对导入的绑定进行赋值 |
| [no-inner-declarations](https://eslint.org/docs/rules/no-inner-declarations) | error | - | 禁止在嵌套块中声明函数或变量 |
| [no-invalid-regexp](https://eslint.org/docs/rules/no-invalid-regexp) | error | - | 禁止无效的正则表达式 |
| [no-irregular-whitespace](https://eslint.org/docs/rules/no-irregular-whitespace) | error | - | 禁止不规则的空白字符 |
| [no-loss-of-precision](https://eslint.org/docs/rules/no-loss-of-precision) | error | - | 禁止数字精度丢失 |
| [no-misleading-character-class](https://eslint.org/docs/rules/no-misleading-character-class) | error | - | 禁止正则中可能导致误解的字符类 |
| [no-obj-calls](https://eslint.org/docs/rules/no-obj-calls) | error | - | 禁止将全局对象当作函数调用 |
| [no-new-native-nonconstructor](https://eslint.org/docs/rules/no-new-native-nonconstructor) | off | - | 关闭检测无法作为构造函数的内置对象调用 |
| [no-promise-executor-return](https://eslint.org/docs/rules/no-promise-executor-return) | error | - | 禁止在 Promise 执行器中返回值 |
| [no-prototype-builtins](https://eslint.org/docs/rules/no-prototype-builtins) | error | - | 禁止直接调用对象的原型方法（如 `hasOwnProperty`） |
| [no-regex-spaces](https://eslint.org/docs/rules/no-regex-spaces) | error | - | 禁止正则表达式中出现多个空格 |
| [no-setter-return](https://eslint.org/docs/rules/no-setter-return) | error | - | 强制 `setter` 函数必须有返回值 |
| [no-sparse-arrays](https://eslint.org/docs/rules/no-sparse-arrays) | error | - | 禁止稀疏数组（如 `[1,,2]`） |
| [no-template-curly-in-string](https://eslint.org/docs/rules/no-template-curly-in-string) | error | - | 禁止字符串中出现模板字面量占位符语法 |
| [no-unexpected-multiline](https://eslint.org/docs/rules/no-unexpected-multiline) | error | - | 禁止出现意外的多行表达式 |
| [no-unreachable](https://eslint.org/docs/rules/no-unreachable) | error | - | 禁止不可达的代码 |
| [no-unreachable-loop](https://eslint.org/docs/rules/no-unreachable-loop) | error | `{ ignore: [] }` | 禁止无法正常退出的循环 |
| [no-unsafe-finally](https://eslint.org/docs/rules/no-unsafe-finally) | error | - | 禁止在 `finally` 块中使用控制流语句 |
| [no-unsafe-negation](https://eslint.org/docs/rules/no-unsafe-negation) | error | - | 禁止不安全的取反操作（如 `!obj in expr`） |
| [no-unsafe-optional-chaining](https://eslint.org/docs/rules/no-unsafe-optional-chaining) | error | `{ disallowArithmeticOperators: true }` | 禁止不安全的可选链操作 |
| [no-unused-private-class-members](https://eslint.org/docs/rules/no-unused-private-class-members) | off | - | 关闭检测未使用的私有类成员 |
| [no-useless-backreference](https://eslint.org/docs/rules/no-useless-backreference) | error | - | 禁止正则表达式中无用的反向引用 |
| [no-negated-in-lhs](https://eslint.org/docs/rules/no-negated-in-lhs) | off | - | 关闭检测 `in` 操作符的左操作符是否被取反（已弃用） |
| [require-atomic-updates](https://eslint.org/docs/rules/require-atomic-updates) | off | - | 关闭要求异步操作必须是原子性的 |
| [use-isnan](https://eslint.org/docs/rules/use-isnan) | error | - | 必须使用 `isNaN()` 检查 `NaN` |
| [valid-jsdoc](https://eslint.org/docs/rules/valid-jsdoc) | off | - | 关闭强制有效的 JSDoc 注释 |
| [valid-typeof](https://eslint.org/docs/rules/valid-typeof) | error | `{ requireStringLiterals: true }` | 强制 `typeof` 操作符必须与有效字符串字面量比较 |

### node.js

| 规则名称 | 错误级别 | 配置选项      | 描述 |
|---------|---------|-----------|-----|
| [callback-return](https://eslint.org/docs/rules/callback-return) | off | -         | 强制在回调函数中使用 return 语句 |
| [global-require](https://eslint.org/docs/rules/global-require) | error | -         | 强制 `require()` 在模块顶部调用 |
| [handle-callback-err](https://eslint.org/docs/rules/handle-callback-err) | off | -         | 强制回调函数的错误处理 |
| [no-buffer-constructor](https://eslint.org/docs/rules/no-buffer-constructor) | error | -         | 禁用 `Buffer()` 构造函数（已废弃，建议迁移到 `eslint-plugin-node`） |
| [no-mixed-requires](https://eslint.org/docs/rules/no-mixed-requires) | off | `[false]` | 禁止混合常规变量和模块引入 |
| [no-new-require](https://eslint.org/docs/rules/no-new-require) | error | -         | 禁止对 `require` 使用 `new` |
| [no-path-concat](https://eslint.org/docs/rules/no-path-concat) | error | -         | 禁止路径字符串拼接 |
| [no-process-env](https://eslint.org/docs/rules/no-process-env) | off | -         | 禁用 `process.env` |
| [no-process-exit](https://eslint.org/docs/rules/no-process-exit) | off | -         | 禁用 `process.exit()` |
| [no-restricted-modules](https://eslint.org/docs/rules/no-restricted-modules) | off | -         | 禁止使用特定模块（已废弃，建议改用 `no-restricted-imports`） |
| [no-sync](https://eslint.org/docs/rules/no-sync) | off | -         | 禁用同步方法 |

### 风格

| 规则名 | 错误级别 | 配置选项 | 描述 |
|--------|----------|----------|------|
| [array-bracket-newline](https://eslint.org/docs/rules/array-bracket-newline) | off | `'consistent'` | 强制数组括号的换行风格一致 |
| [array-element-newline](https://eslint.org/docs/rules/array-element-newline) | off | `{ multiline: true, minItems: 3 }` | 多行或超过最小项时换行（已关闭） |
| [array-bracket-spacing](https://eslint.org/docs/rules/array-bracket-spacing) | error | `'never'` | 禁止数组括号内添加空格 |
| [block-spacing](https://eslint.org/docs/rules/block-spacing) | error | `'always'` | 强制块内保留空格 |
| [brace-style](https://eslint.org/docs/rules/brace-style) | error | `'1tbs', { allowSingleLine: true }` | 大括号风格为 `1tbs`，允许单行块 |
| [camelcase](https://eslint.org/docs/rules/camelcase) | error | `{ properties: 'never', ignoreDestructuring: false }` | 强制驼峰命名（属性名除外） |
| [capitalized-comments](https://eslint.org/docs/rules/capitalized-comments) | off | `'never', { line: {...}, block: {...} }` | 关闭注释首字母大写检查 |
| [comma-dangle](https://eslint.org/docs/rules/comma-dangle) | error | `{ arrays: 'always-multiline', ... }` | 多行结构强制拖尾逗号 |
| [comma-spacing](https://eslint.org/docs/rules/comma-spacing) | error | `{ before: false, after: true }` | 逗号后必须空格，前无空格 |
| [comma-style](https://eslint.org/docs/rules/comma-style) | error | `'last', { exceptions: {...} }` | 逗号置于行尾 |
| [computed-property-spacing](https://eslint.org/docs/rules/computed-property-spacing) | error | `'never'` | 禁止计算属性内空格 |
| [consistent-this](https://eslint.org/docs/rules/consistent-this) | off | - | 关闭强制统一 `this` 别名 |
| [eol-last](https://eslint.org/docs/rules/eol-last) | error | `'always'` | 文件末尾强制换行 |
| [function-call-argument-newline](https://eslint.org/docs/rules/function-call-argument-newline) | error | `'consistent'` | 函数调用参数换行风格一致 |
| [func-call-spacing](https://eslint.org/docs/rules/func-call-spacing) | error | `'never'` | 禁止函数名与括号间空格 |
| [func-name-matching](https://eslint.org/docs/rules/func-name-matching) | off | `'always', { includeCommonJSModuleExports: false }` | 关闭函数名匹配检查 |
| [func-names](https://eslint.org/docs/rules/func-names) | warn | - | 警告未命名函数表达式 |
| [func-style](https://eslint.org/docs/rules/func-style) | off | `'expression'` | 关闭函数声明风格检查 |
| [function-paren-newline](https://eslint.org/docs/rules/function-paren-newline) | error | `'multiline-arguments'` | 多行参数时括号换行 |
| [id-denylist](https://eslint.org/docs/rules/id-denylist) | off | - | 关闭标识符黑名单检查 |
| [id-length](https://eslint.org/docs/rules/id-length) | off | - | 关闭标识符长度检查 |
| [id-match](https://eslint.org/docs/rules/id-match) | off | - | 关闭标识符命名模式检查 |
| [implicit-arrow-linebreak](https://eslint.org/docs/rules/implicit-arrow-linebreak) | error | `'beside'` | 箭头函数返回值与箭头同行 |
| [indent](https://eslint.org/docs/rules/indent) | error | `2, { SwitchCase: 1, ... }` | 强制2空格缩进，处理不同语法结构 |
| [jsx-quotes](https://eslint.org/docs/rules/jsx-quotes) | off | `'prefer-double'` | 关闭JSX引号偏好检查 |
| [key-spacing](https://eslint.org/docs/rules/key-spacing) | error | `{ beforeColon: false, afterColon: true }` | 键后必须空格，键前无空格 |
| [keyword-spacing](https://eslint.org/docs/rules/keyword-spacing) | error | `{ before: true, after: true, ... }` | 关键字前后保留空格 |
| [line-comment-position](https://eslint.org/docs/rules/line-comment-position) | off | `{ position: 'above' }` | 关闭行注释位置检查 |
| [linebreak-style](https://eslint.org/docs/rules/linebreak-style) | error | `'unix'` | 强制Unix换行符（`\n`） |
| [lines-between-class-members](https://eslint.org/docs/rules/lines-between-class-members) | error | `'always', { exceptAfterSingleLine: false }` | 类成员间保留空行 |
| [lines-around-comment](https://eslint.org/docs/rules/lines-around-comment) | off | - | 关闭注释周围空行检查 |
| [lines-around-directive](https://eslint.org/docs/rules/lines-around-directive) | error | `{ before: 'always', after: 'always' }` | 指令周围保留空行 |
| [logical-assignment-operators](https://eslint.org/docs/rules/logical-assignment-operators) | off | `'always', { enforceForIfStatements: true }` | 关闭逻辑赋值操作符检查 |
| [max-depth](https://eslint.org/docs/rules/max-depth) | off | `4` | 关闭代码块嵌套深度检查 |
| [max-len](https://eslint.org/docs/rules/max-len) | error | `100, 2, { ignoreUrls: true, ... }` | 单行最大长度100字符 |
| [max-lines](https://eslint.org/docs/rules/max-lines) | off | `{ max: 300, ... }` | 关闭文件最大行数检查 |
| [max-lines-per-function](https://eslint.org/docs/rules/max-lines-per-function) | off | `{ max: 50, ... }` | 关闭函数最大行数检查 |
| [max-nested-callbacks](https://eslint.org/docs/rules/max-nested-callbacks) | off | - | 关闭回调嵌套深度检查 |
| [max-params](https://eslint.org/docs/rules/max-params) | off | `3` | 关闭函数最大参数检查 |
| [max-statements](https://eslint.org/docs/rules/max-statements) | off | `10` | 关闭函数最大语句数检查 |
| [max-statements-per-line](https://eslint.org/docs/rules/max-statements-per-line) | off | `{ max: 1 }` | 关闭单行最大语句数检查 |
| [multiline-comment-style](https://eslint.org/docs/rules/multiline-comment-style) | off | `'starred-block'` | 关闭多行注释风格检查 |
| [multiline-ternary](https://eslint.org/docs/rules/multiline-ternary) | off | `'never'` | 关闭多行三元表达式检查 |
| [new-cap](https://eslint.org/docs/rules/new-cap) | error | `{ newIsCap: true, capIsNew: false, ... }` | 构造函数首字母大写限制 |
| [new-parens](https://eslint.org/docs/rules/new-parens) | error | - | 构造函数调用必须带括号 |
| [newline-after-var](https://eslint.org/docs/rules/newline-after-var) | off | - | 关闭变量声明后空行检查 |
| [newline-before-return](https://eslint.org/docs/rules/newline-before-return) | off | - | 关闭return前空行检查 |
| [newline-per-chained-call](https://eslint.org/docs/rules/newline-per-chained-call) | error | `{ ignoreChainWithDepth: 4 }` | 链式调用超过4层需换行 |
| [no-array-constructor](https://eslint.org/docs/rules/no-array-constructor) | error | - | 禁止使用数组构造函数 |
| [no-bitwise](https://eslint.org/docs/rules/no-bitwise) | error | - | 禁止位运算符 |
| [no-continue](https://eslint.org/docs/rules/no-continue) | error | - | 禁止使用`continue` |
| [no-inline-comments](https://eslint.org/docs/rules/no-inline-comments) | off | - | 关闭禁止行内注释检查 |
| [no-lonely-if](https://eslint.org/docs/rules/no-lonely-if) | error | - | 禁止单独的`if`语句 |
| [no-mixed-operators](https://eslint.org/docs/rules/no-mixed-operators) | error | `{ groups: [...], allowSamePrecedence: false }` | 禁止混合使用不同优先级操作符 |
| [no-mixed-spaces-and-tabs](https://eslint.org/docs/rules/no-mixed-spaces-and-tabs) | error | - | 禁止混用空格和制表符 |
| [no-multi-assign](https://eslint.org/docs/rules/no-multi-assign) | error | - | 禁止连续赋值 |
| [no-multiple-empty-lines](https://eslint.org/docs/rules/no-multiple-empty-lines) | error | `{ max: 1, maxBOF: 0, maxEOF: 0 }` | 最多1个连续空行 |
| [no-negated-condition](https://eslint.org/docs/rules/no-negated-condition) | off | - | 关闭禁止否定条件检查 |
| [no-nested-ternary](https://eslint.org/docs/rules/no-nested-ternary) | error | - | 禁止嵌套三元表达式 |
| [no-new-object](https://eslint.org/docs/rules/no-new-object) | error | - | 禁止使用`new Object` |
| [no-plusplus](https://eslint.org/docs/rules/no-plusplus) | error | - | 禁止`++`和`--` |
| [no-restricted-syntax](https://eslint.org/docs/rules/no-restricted-syntax) | error | `ForInStatement, ForOfStatement, ...` | 禁用特定语法结构（如`for-in`） |
| [no-spaced-func](https://eslint.org/docs/rules/no-spaced-func) | off | - | 关闭禁止函数名与括号间空格检查 |
| [no-tabs](https://eslint.org/docs/rules/no-tabs) | error | - | 禁止使用制表符 |
| [no-ternary](https://eslint.org/docs/rules/no-ternary) | off | - | 关闭禁止三元操作符检查 |
| [no-trailing-spaces](https://eslint.org/docs/rules/no-trailing-spaces) | error | `{ skipBlankLines: false, ... }` | 禁止行尾空格 |
| [no-underscore-dangle](https://eslint.org/docs/rules/no-underscore-dangle) | error | `{ allow: [], ... }` | 禁止下划线开头或结尾的标识符 |
| [no-unneeded-ternary](https://eslint.org/docs/rules/no-unneeded-ternary) | error | `{ defaultAssignment: false }` | 禁止不必要的三元表达式 |
| [no-whitespace-before-property](https://eslint.org/docs/rules/no-whitespace-before-property) | error | - | 禁止属性前的空格 |
| [nonblock-statement-body-position](https://eslint.org/docs/rules/nonblock-statement-body-position) | error | `'beside', { overrides: {} }` | 单行非块语句与声明同行 |
| [object-curly-spacing](https://eslint.org/docs/rules/object-curly-spacing) | error | `'always'` | 对象花括号内保留空格 |
| [object-curly-newline](https://eslint.org/docs/rules/object-curly-newline) | error | `{ ObjectExpression: { minProperties: 4, ... } }` | 对象属性超过3项时换行 |
| [object-property-newline](https://eslint.org/docs/rules/object-property-newline) | error | `{ allowAllPropertiesOnSameLine: true }` | 允许对象属性同行 |
| [one-var](https://eslint.org/docs/rules/one-var) | error | `'never'` | 禁止合并变量声明 |
| [one-var-declaration-per-line](https://eslint.org/docs/rules/one-var-declaration-per-line) | error | `'always'` | 每行一个变量声明 |
| [operator-assignment](https://eslint.org/docs/rules/operator-assignment) | error | `'always'` | 强制操作符简写形式 |
| [operator-linebreak](https://eslint.org/docs/rules/operator-linebreak) | error | `'before', { overrides: { '=': 'none' } }` | 操作符置于行首（等号例外） |
| [padded-blocks](https://eslint.org/docs/rules/padded-blocks) | error | `'never', { allowSingleLineBlocks: true }` | 块内不填充空行（单行块允许） |
| [padding-line-between-statements](https://eslint.org/docs/rules/padding-line-between-statements) | off | - | 关闭语句间空行检查 |
| [prefer-exponentiation-operator](https://eslint.org/docs/rules/prefer-exponentiation-operator) | error | - | 使用指数操作符替代`Math.pow` |
| [prefer-object-spread](https://eslint.org/docs/rules/prefer-object-spread) | error | - | 使用对象展开替代`Object.assign` |
| [quote-props](https://eslint.org/docs/rules/quote-props) | error | `'as-needed', { keywords: false, ... }` | 按需引用对象属性名 |
| [quotes](https://eslint.org/docs/rules/quotes) | error | `'single', { avoidEscape: true }` | 使用单引号（允许转义） |
| [require-jsdoc](https://eslint.org/docs/rules/require-jsdoc) | off | - | 关闭JSDoc注释检查 |
| [semi](https://eslint.org/docs/rules/semi) | error | `'always'` | 强制分号结尾 |
| [semi-spacing](https://eslint.org/docs/rules/semi-spacing) | error | `{ before: false, after: true }` | 分号后空格，前无空格 |
| [semi-style](https://eslint.org/docs/rules/semi-style) | error | `'last'` | 分号置于行尾 |
| [sort-keys](https://eslint.org/docs/rules/sort-keys) | off | `'asc', { caseSensitive: false, ... }` | 关闭对象键排序检查 |
| [sort-vars](https://eslint.org/docs/rules/sort-vars) | off | - | 关闭变量排序检查 |
| [space-before-blocks](https://eslint.org/docs/rules/space-before-blocks) | error | - | 块前必须空格 |
| [space-before-function-paren](https://eslint.org/docs/rules/space-before-function-paren) | error | `{ anonymous: 'always', named: 'never', ... }` | 函数名后无空格，匿名函数后有空格 |
| [space-in-parens](https://eslint.org/docs/rules/space-in-parens) | error | `'never'` | 括号内不保留空格 |
| [space-infix-ops](https://eslint.org/docs/rules/space-infix-ops) | error | - | 中缀操作符周围保留空格 |
| [space-unary-ops](https://eslint.org/docs/rules/space-unary-ops) | error | `{ words: true, nonwords: false }` | 单词类一元操作符后空格 |
| [spaced-comment](https://eslint.org/docs/rules/spaced-comment) | error | `'always', { line: {...}, block: {...} }` | 注释前保留空格 |
| [switch-colon-spacing](https://eslint.org/docs/rules/switch-colon-spacing) | error | `{ after: true, before: false }` | `switch` case冒号后空格，前无空格 |
| [template-tag-spacing](https://eslint.org/docs/rules/template-tag-spacing) | error | `'never'` | 模板标签后无空格 |
| [unicode-bom](https://eslint.org/docs/rules/unicode-bom) | error | `'never'` | 禁止Unicode BOM头 |
| [wrap-regex](https://eslint.org/docs/rules/wrap-regex) | off | - | 关闭正则表达式括号包裹检查 |

### 变量

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|----------|----------|----------|------|
| [init-declarations](https://eslint.org/docs/rules/init-declarations) | off | - | 强制或禁止变量声明时初始化 |
| [no-catch-shadow](https://eslint.org/docs/rules/no-catch-shadow) | off | - | 禁止`catch`子句参数与外部变量同名 |
| [no-delete-var](https://eslint.org/docs/rules/no-delete-var) | error | - | 禁止使用`delete`删除变量 |
| [no-label-var](https://eslint.org/docs/rules/no-label-var) | error | - | 禁止标签与变量同名 |
| [no-restricted-globals](https://eslint.org/docs/rules/no-restricted-globals) | error | `[ { name: "isFinite", message: "Use Number.isFinite instead" }, { name: "isNaN", message: "Use Number.isNaN instead" }, "addEventListener", "blur", ..., "top" ]` | 禁止使用特定全局变量并提供替代建议 |
| [no-shadow](https://eslint.org/docs/rules/no-shadow) | error | - | 禁止变量声明覆盖外部作用域变量 |
| [no-shadow-restricted-names](https://eslint.org/docs/rules/no-shadow-restricted-names) | error | - | 禁止覆盖受限标识符（如`undefined`）|
| [no-undef](https://eslint.org/docs/rules/no-undef) | error | - | 禁止使用未声明变量 |
| [no-undef-init](https://eslint.org/docs/rules/no-undef-init) | error | - | 禁止初始化变量为`undefined` |
| [no-undefined](https://eslint.org/docs/rules/no-undefined) | off | - | 禁止使用`undefined`变量 |
| [no-unused-vars](https://eslint.org/docs/rules/no-unused-vars) | error | `{ vars: "all", args: "after-used", ignoreRestSiblings: true }` | 禁止未使用变量，可配置检测范围 |
| [no-use-before-define](https://eslint.org/docs/rules/no-use-before-define) | error | `{ functions: true, classes: true, variables: true }` | 禁止在定义前使用变量/函数/类 |

> **配置选项说明**：
> - `no-restricted-globals` 的完整受限列表包含：  
    `isFinite`/`isNaN`（带自定义提示）及 `addEventListener`, `blur`, `close`, `closed`, `confirm`, `defaultStatus`, ..., `top` 等全局变量
> - `no-unused-vars` 配置表示：检查所有变量、参数从使用位置后开始检测、忽略剩余属性
> - `no-use-before-define` 配置表示：检查函数/类/变量均需先定义后使用

### ECMAScript 6

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|---------|---------|----------|------|
| [arrow-body-style](https://eslint.org/docs/rules/arrow-body-style) | error | `"as-needed"`, `{ requireReturnForObjectLiteral: false }` | 要求箭头函数体在可能的情况下省略大括号 |
| [arrow-parens](https://eslint.org/docs/rules/arrow-parens) | error | `"always"` | 要求箭头函数参数始终使用括号 |
| [arrow-spacing](https://eslint.org/docs/rules/arrow-spacing) | error | `{ before: true, after: true }` | 强制箭头函数的箭头前后空格一致性 |
| [constructor-super](https://eslint.org/docs/rules/constructor-super) | error | - | 禁止在构造函数中在调用 `super()` 之前使用 `this`/`super` |
| [generator-star-spacing](https://eslint.org/docs/rules/generator-star-spacing) | error | `{ before: false, after: true }` | 强制 `generator` 函数中星号周围空格的一致性 |
| [no-class-assign](https://eslint.org/docs/rules/no-class-assign) | error | - | 禁止修改类声明 |
| [no-confusing-arrow](https://eslint.org/docs/rules/no-confusing-arrow) | error | `{ allowParens: true }` | 禁止可能与比较操作符混淆的箭头函数语法 |
| [no-const-assign](https://eslint.org/docs/rules/no-const-assign) | error | - | 禁止修改 `const` 声明的变量 |
| [no-dupe-class-members](https://eslint.org/docs/rules/no-dupe-class-members) | error | - | 禁止类成员中的重复名称 |
| [no-duplicate-imports](https://eslint.org/docs/rules/no-duplicate-imports) | off | - | 禁止重复模块导入（已禁用） |
| [no-new-symbol](https://eslint.org/docs/rules/no-new-symbol) | error | - | 禁止使用 `new` 操作符创建 Symbol 实例 |
| [no-restricted-exports](https://eslint.org/docs/rules/no-restricted-exports) | error | `{ restrictedNamedExports: ["default", "then"] }` | 限制指定的命名导出 |
| [no-restricted-imports](https://eslint.org/docs/rules/no-restricted-imports) | off | `{ paths: [], patterns: [] }` | 限制指定的模块导入（已禁用） |
| [no-this-before-super](https://eslint.org/docs/rules/no-this-before-super) | error | - | 禁止在构造函数中在 `super()` 调用前使用 `this` |
| [no-useless-computed-key](https://eslint.org/docs/rules/no-useless-computed-key) | error | - | 禁止不必要的计算属性键 |
| [no-useless-constructor](https://eslint.org/docs/rules/no-useless-constructor) | error | - | 禁止不必要的构造函数 |
| [no-useless-rename](https://eslint.org/docs/rules/no-useless-rename) | error | `{ ignoreDestructuring: false, ignoreImport: false, ignoreExport: false }` | 禁止不必要的重命名解构 |
| [no-var](https://eslint.org/docs/rules/no-var) | error | - | 要求使用 let 或 const 代替 var |
| [object-shorthand](https://eslint.org/docs/rules/object-shorthand) | error | `"always"`, `{ ignoreConstructors: false, avoidQuotes: true }` | 强制对象字面量简写语法 |
| [prefer-arrow-callback](https://eslint.org/docs/rules/prefer-arrow-callback) | error | `{ allowNamedFunctions: false, allowUnboundThis: true }` | 要求回调函数使用箭头函数 |
| [prefer-const](https://eslint.org/docs/rules/prefer-const) | error | `{ destructuring: "any", ignoreReadBeforeAssign: true }` | 要求使用 const 声明不会被重新赋值的变量 |
| [prefer-destructuring](https://eslint.org/docs/rules/prefer-destructuring) | error | `{ VariableDeclarator: { array: false, object: true }, AssignmentExpression: { array: true, object: false } }`, `{ enforceForRenamedProperties: false }` | 强制使用解构赋值 |
| [prefer-numeric-literals](https://eslint.org/docs/rules/prefer-numeric-literals) | error | - | 禁用 `parseInt()` 而使用二进制、八进制和十六进制字面量 |
| [prefer-reflect](https://eslint.org/docs/rules/prefer-reflect) | off | - | 要求使用 Reflect 方法（已禁用） |
| [prefer-rest-params](https://eslint.org/docs/rules/prefer-rest-params) | error | - | 要求使用 rest 参数代替 `arguments` |
| [prefer-spread](https://eslint.org/docs/rules/prefer-spread) | error | - | 要求使用扩展运算符代替 `.apply()` |
| [prefer-template](https://eslint.org/docs/rules/prefer-template) | error | - | 要求使用模板字面量代替字符串拼接 |
| [require-yield](https://eslint.org/docs/rules/require-yield) | error | - | 要求 `generator` 函数内包含 `yield` 语句 |
| [rest-spread-spacing](https://eslint.org/docs/rules/rest-spread-spacing) | error | `"never"` | 强制剩余和扩展运算符周围空格的一致性 |
| [sort-imports](https://eslint.org/docs/rules/sort-imports) | off | `{ ignoreCase: false, ignoreDeclarationSort: false, ignoreMemberSort: false, memberSyntaxSortOrder: ["none", "all", "multiple", "single"] }` | 强制导入声明排序（已禁用） |
| [symbol-description](https://eslint.org/docs/rules/symbol-description) | error | - | 要求 Symbol 描述参数 |
| [template-curly-spacing](https://eslint.org/docs/rules/template-curly-spacing) | error | - | 强制模板字符串中花括号内的空格 |
| [yield-star-spacing](https://eslint.org/docs/rules/yield-star-spacing) | error | `"after"` | 强制 `yield*` 表达式中星号周围空格 |

### 模块导入

| 规则名 | 错误级别 | 配置选项 | 描述 |
|--------|----------|----------|------|
| [import/no-unresolved](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md) | error | `{ commonjs: true, caseSensitive: true }` | 确保导入的模块路径可解析 |
| [import/named](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/named.md) | error | - | 验证命名导出是否存在 |
| [import/default](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/default.md) | off | - | 关闭默认导出的验证 |
| [import/namespace](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/namespace.md) | off | - | 关闭命名空间导入验证 |
| [import/export](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/export.md) | error | - | 确保文件内所有导出语法有效 |
| [import/no-named-as-default](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-as-default.md) | error | - | 禁止将命名导出与默认导出混淆 |
| [import/no-named-as-default-member](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-as-default-member.md) | error | - | 禁止通过默认导出访问命名导出 |
| [import/no-deprecated](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-deprecated.md) | off | - | 关闭对废弃模块的检查 |
| [import/no-extraneous-dependencies](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md) | error | `{ devDependencies: [...], optionalDependencies: false }` | 禁止引入无关依赖 |
| [import/no-mutable-exports](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-mutable-exports.md) | error | - | 禁止导出可变变量 |
| [import/no-commonjs](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-commonjs.md) | off | - | 关闭对 CommonJS 语法的限制 |
| [import/no-amd](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-amd.md) | error | - | 禁止 AMD 语法 |
| [import/no-nodejs-modules](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-nodejs-modules.md) | off | - | 关闭对 Node.js 内置模块的限制 |
| [import/first](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md) | error | - | 确保所有导入语句在模块顶部 |
| [import/imports-first](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/imports-first.md) | off | - | 关闭“导入必须置顶”的旧规则 |
| [import/no-duplicates](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md) | error | - | 禁止重复导入同一模块 |
| [import/no-namespace](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-namespace.md) | off | - | 关闭对命名空间导入的限制 |
| [import/extensions](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md) | error | `'ignorePackages', { js: 'never', mjs: 'never', jsx: 'never' }` | 强制文件扩展名规范 |
| [import/order](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md) | error | `{ groups: [['builtin', 'external', 'internal']] }` | 控制导入顺序和分组 |
| [import/newline-after-import](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md) | error | - | 导入语句后需有空行 |
| [import/prefer-default-export](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md) | error | - | 建议使用默认导出 |
| [import/no-restricted-paths](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-restricted-paths.md) | off | - | 关闭对特定路径的限制 |
| [import/max-dependencies](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/max-dependencies.md) | off | `{ max: 10 }` | 限制单个文件的最大依赖数 |
| [import/no-absolute-path](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-absolute-path.md) | error | - | 禁止使用绝对路径导入 |
| [import/no-dynamic-require](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-dynamic-require.md) | error | - | 禁止动态 `require()` 语法 |
| [import/no-internal-modules](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-internal-modules.md) | off | `{ allow: [] }` | 禁止导入内部模块 |
| [import/unambiguous](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/unambiguous.md) | off | - | 关闭对非 ES 模块的检测 |
| [import/no-webpack-loader-syntax](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-webpack-loader-syntax.md) | error | - | 禁止 Webpack 特有的加载语法 |
| [import/no-unassigned-import](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unassigned-import.md) | off | - | 禁止未赋值的导入 |
| [import/no-named-default](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-default.md) | error | - | 禁止命名默认导出别名 |
| [import/no-anonymous-default-export](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-anonymous-default-export.md) | off | `{ allowArray: false, ... }` | 禁止匿名默认导出 |
| [import/exports-last](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/exports-last.md) | off | - | 确保导出语句在文件末尾 |
| [import/group-exports](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/group-exports.md) | off | - | 强制分组导出语句 |
| [import/no-default-export](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md) | off | - | 禁止默认导出 |
| [import/no-named-export](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-export.md) | off | - | 禁止命名导出 |
| [import/no-self-import](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-self-import.md) | error | - | 禁止模块导入自身 |
| [import/no-cycle](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md) | error | `{ maxDepth: '∞' }` | 禁止模块循环依赖 |
| [import/no-useless-path-segments](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-useless-path-segments.md) | error | `{ commonjs: true }` | 禁止冗余路径片段 |
| [import/dynamic-import-chunkname](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/dynamic-import-chunkname.md) | off | `{ webpackChunknameFormat: '[0-9a-zA-Z-_/.]+' }` | 控制动态导入的代码块命名 |
| [import/no-relative-parent-imports](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-relative-parent-imports.md) | off | - | 禁止相对父级目录导入 |
| [import/no-unused-modules](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unused-modules.md) | off | `{ missingExports: true, ... }` | 检测未使用的模块 |
| [import/no-import-module-exports](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-import-module-exports.md) | error | `{ exceptions: [] }` | 禁止混合 `import` 和 `module.exports` |
| [import/no-relative-packages](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-relative-packages.md) | error | - | 禁止相对路径导入其他包 |

### 严格模式

| 规则名 | 错误级别 | 配置选项 | 描述 |
|--------|----------|----------|------|
| [strict](https://eslint.org/docs/rules/strict) | error | `'never'` | 禁止使用`'use strict'`指令。当使用 Babel 等转译工具时，它会自动添加`'use strict'`指令 |

## Unicorn

[`eslint-plugin-unicorn`](https://github.com/sindresorhus/eslint-plugin-unicorn) 提供了许多现代、实用的规则，用于提升代码质量和可读性，例如强制使用新的 JavaScript 语法（如 `Array.prototype.flat` ）、简化代码逻辑等。它帮助开发者编写更“干净”的代码。

```js
// .eslintrc.js

module.exports = {
  extends: [
    'plugin:unicorn/recommended',
  ],
};
```

:::danger
这是一个实验性功能，请谨慎使用！部分规则和 Airbnb 规则有冲突，目前仍在整理中。如遇规则冲突，请以**Airbnb 规则**为准。
:::

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|--------|----------|----------|------|
| [unicorn/better-regex](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/better-regex.md) | off | - | 强制正则表达式更加优化和简洁 |
| [unicorn/catch-error-name](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/catch-error-name.md) | error | - | 强制错误变量在 `catch` 子句中命名为 error |
| [unicorn/consistent-assert](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-assert.md) | error | - | 强制使用一致的断言方法（例如 `assert.strictEqual` 而不是 `assert.equal`） |
| [unicorn/consistent-date-clone](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-date-clone.md) | error | - | 强制使用一致的方法来克隆日期（例如 `new Date(date)`） |
| [unicorn/consistent-destructuring](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-destructuring.md) | off | - | 强制使用一致的结构分配方式 |
| [unicorn/consistent-empty-array-spread](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-empty-array-spread.md) | error | - | 强制空数组展开时使用一致的方式 |
| [unicorn/consistent-existence-index-check](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-existence-index-check.md) | error | - | 强制使用一致的索引存在性检查（例如 `index in array` 而不是 `array[index] !== undefined`） |
| [unicorn/consistent-function-scoping](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-function-scoping.md) | error | - | 强制将没有依赖外部变量的函数提升到更高作用域 |
| [unicorn/custom-error-definition](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/custom-error-definition.md) | off | - | 强制自定义错误必须继承自 error |
| [unicorn/empty-brace-spaces](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/empty-brace-spaces.md) | error | - | 强制在花括号内使用一致的空格 |
| [unicorn/error-message](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/error-message.md) | error | - | 强制在 `throw` 语句中提供错误信息 |
| [unicorn/escape-case](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/escape-case.md) | error | - | 强制转义序列使用大写或小写（例如 `\n` 而不是 `\N`） |
| [unicorn/expiring-todo-comments](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/expiring-todo-comments.md) | error | - | 强制 `TODO` 注释包含过期日期 |
| [unicorn/explicit-length-check](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/explicit-length-check.md) | error | - | 强制显式地检查长度（例如 `array.length > 0` 而不是 `array.length`） |
| [unicorn/filename-case](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md) | error | - | 强制文件名使用特定的大小写风格（如驼峰、短横线等） |
| [unicorn/import-style](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/import-style.md) | error | - | 强制使用特定的导入风格（例如只使用默认导入或命名导入） |
| [unicorn/new-for-builtins](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/new-for-builtins.md) | error | - | 强制对内置对象使用 `new`（例如 `new Error()` 而不是 `Error()`） |
| [unicorn/no-abusive-eslint-disable](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-abusive-eslint-disable.md) | error | - | 禁止滥用 `eslint-disable` 注释 |
| [unicorn/no-accessor-recursion](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-accessor-recursion.md) | error | - | 禁止在访问器中递归调用自身（会导致栈溢出） |
| [unicorn/no-anonymous-default-export](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-anonymous-default-export.md) | error | - | 禁止匿名默认导出 |
| [unicorn/no-array-callback-reference](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-callback-reference.md) | error | - | 禁止在数组方法中传递回调函数的引用（应使用内联函数） |
| [unicorn/no-array-for-each](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-for-each.md) | error | - | 禁止使用 `Array.prototype.forEach`，推荐使用 `for...of` |
| [unicorn/no-array-method-this-argument](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-method-this-argument.md) | error | - | 禁止在数组方法中使用 `this` 参数（应使用箭头函数） |
| [unicorn/no-array-reduce](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reduce.md) | error | - | 尽量避免使用 `Array.prototype.reduce`，除非有特定需求 |
| [unicorn/no-array-reverse](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reverse.md) | error | - | 禁止使用 `Array.prototype.reverse`，除非非常必要 |
| [unicorn/no-array-sort](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-sort.md) | error | - | 禁止使用 `Array.prototype.sort` 而不带比较函数（对数字排序会出错） |
| [unicorn/no-await-expression-member](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-await-expression-member.md) | error | - | 禁止在 `await` 表达式后直接使用成员表达式（可能导致意外行为） |
| [unicorn/no-await-in-promise-methods](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-await-in-promise-methods.md) | error | - | 禁止在 Promise 方法（如 `then`、`catch`）中使用 `await` |
| [unicorn/no-console-spaces](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-console-spaces.md) | error | - | 禁止在 `console.log` 等方法的参数中添加多余空格 |
| [unicorn/no-document-cookie](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-document-cookie.md) | error | - | 禁止直接使用 `document.cookie`，应使用封装好的方法 |
| [unicorn/no-empty-file](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-empty-file.md) | error | - | 禁止空文件 |
| [unicorn/no-for-loop](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-for-loop.md) | error | - | 禁止使用 `for` 循环，推荐使用高阶数组方法或 `for...of` |
| [unicorn/no-hex-escape](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-hex-escape.md) | error | - | 禁止在字符串中使用十六进制转义序列（应使用 Unicode 转义） |
| [unicorn/no-instanceof-builtins](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-instanceof-builtins.md) | error | - | 禁止对内置类型（如 `Array`, error）使用 `instanceof`（在不同 realm 中可能失效） |
| [unicorn/no-invalid-fetch-options](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-invalid-fetch-options.md) | error | - | 禁止在 `fetch` 中使用无效的选项（例如 `body` 与 `GET` 一起用） |
| [unicorn/no-invalid-remove-event-listener](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-invalid-remove-event-listener.md) | error | - | 禁止无效的 `removeEventListener`（传递的函数必须与添加时相同） |
| [unicorn/no-keyword-prefix](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-keyword-prefix.md) | off | - | 禁止使用关键字作为变量名的前缀（例如 `var classValue`） |
| [unicorn/no-lonely-if](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-lonely-if.md) | error | - | 禁止孤独的 `if` 语句作为 `else` 块（应使用 `else if`） |
| [unicorn/no-magic-array-flat-depth](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-magic-array-flat-depth.md) | error | - | 禁止在 `Array.prototype.flat` 中使用魔数（magic number）作为深度参数 |
| [unicorn/no-named-default](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-named-default.md) | error | - | 禁止导入命名默认导出（例如 `import {default as foo} from 'bar'`） |
| [unicorn/no-negated-condition](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-negated-condition.md) | error | - | 禁止否定的条件（应反转 `if` 和 `else` 块来避免否定） |
| [unicorn/no-negation-in-equality-check](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-negation-in-equality-check.md) | error | - | 禁止在相等检查中使用否定（例如 `!==` 代替 `!(==)`） |
| [unicorn/no-nested-ternary](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-nested-ternary.md) | error | - | 禁止嵌套的三元表达式 |
| [unicorn/no-new-array](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-array.md) | error | - | 禁止使用 `new Array()`，推荐使用字面量 `[]` |
| [unicorn/no-new-buffer](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-buffer.md) | error | - | 禁止使用 `new Buffer()`（出于安全考虑） |
| [unicorn/no-null](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-null.md) | error | - | 禁止使用 `null`，推荐使用 `undefined` |
| [unicorn/no-object-as-default-parameter](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-object-as-default-parameter.md) | error | - | 禁止使用对象作为默认参数（会导致共享引用问题） |
| [unicorn/no-process-exit](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-process-exit.md) | error | - | 禁止使用 `process.exit()`，应让进程正常退出 |
| [unicorn/no-single-promise-in-promise-methods](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-single-promise-in-promise-methods.md) | error | - | 禁止在 `Promise.all` 等方法中传递单个 Promise（无需包装） |
| [unicorn/no-static-only-class](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-static-only-class.md) | error | - | 禁止只有静态方法的类（应使用普通对象） |
| [unicorn/no-thenable](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-thenable.md) | error | - | 禁止使用 thenable 对象（非 Promise 但有 `then` 方法） |
| [unicorn/no-this-assignment](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-this-assignment.md) | error | - | 禁止将 `this` 赋值给变量（应使用箭头函数或绑定） |
| [unicorn/no-typeof-undefined](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-typeof-undefined.md) | error | - | 禁止 `typeof undefined`（总是返回 `'undefined'`，是多余的） |
| [unicorn/no-unnecessary-array-flat-depth](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-array-flat-depth.md) | error | - | 禁止在 `Array.prototype.flat` 中使用不必要的深度参数（深度为 1 时可省略） |
| [unicorn/no-unnecessary-array-splice-count](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-array-splice-count.md) | error | - | 禁止在 `Array.prototype.splice` 中使用不必要的计数参数（计数为 0 时可省略） |
| [unicorn/no-unnecessary-await](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-await.md) | error | - | 禁止不必要的 `await`（在非 Promise 前或可并行操作时） |
| [unicorn/no-unnecessary-polyfills](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-polyfills.md) | error | - | 禁止不必要的 polyfills（针对现代浏览器或环境） |
| [unicorn/no-unnecessary-slice-end](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-slice-end.md) | error | - | 禁止在 `Array.prototype.slice` 中使用不必要的结束参数（例如 `array.length`, `Infinity`） |
| [unicorn/no-unreadable-array-destructuring](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unreadable-array-destructuring.md) | error | - | 禁止难以阅读的数组解构（例如过深的嵌套） |
| [unicorn/no-unreadable-iife](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unreadable-iife.md) | error | - | 禁止难以阅读的立即调用函数表达式（IIFE） |
| [unicorn/no-unused-properties](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unused-properties.md) | off | - | 禁止未使用的对象属性 |
| [unicorn/no-useless-error-capture-stack-trace](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-error-capture-stack-trace.md) | error | - | 禁止无用的错误堆栈捕获（例如在 `Error.captureStackTrace` 中传递自身） |
| [unicorn/no-useless-fallback-in-spread](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-fallback-in-spread.md) | error | - | 禁止在展开运算符中使用无用的回退 |
| [unicorn/no-useless-length-check](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-length-check.md) | error | - | 禁止无用的长度检查（例如 `array.length === 0` 检查空数组） |
| [unicorn/no-useless-promise-resolve-reject](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-promise-resolve-reject.md) | error | - | 禁止在 Promise 中无使用 `resolve` 或 `reject`（例如 `new Promise((resolve) => resolve())`） |
| [unicorn/no-useless-spread](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-spread.md) | error | - | 禁止无用的展开运算符（例如 `[...array]` 当 `array` 已是数组时） |
| [unicorn/no-useless-switch-case](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-switch-case.md) | error | - | 禁止无用的 `switch case`（例如多个 `case` 执行相同操作且无 `break`） |
| [unicorn/no-useless-undefined](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-undefined.md) | error | - | 禁止返回无用的 `undefined`（函数默认返回 `undefined`） |
| [unicorn/no-zero-fractions](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-zero-fractions.md) | error | - | 禁止数字中无用的小数部分（例如 `1.0` 应写为 `1`） |
| [unicorn/number-literal-case](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/number-literal-case.md) | error | - | 强制数字字面量使用小写字母（例如 `0x10` 而不是 `0X10`） |
| [unicorn/numeric-separators-style](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/numeric-separators-style.md) | error | - | 强制数值分隔符使用一致的风格（例如 `1_000_000`） |
| [unicorn/prefer-add-event-listener](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-add-event-listener.md) | error | - | 强制使用 `addEventListener` 而不是 `onclick` 等属性 |
| [unicorn/prefer-array-find](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-find.md) | error | - | 强制使用 `Array.prototype.find` 来查找数组元素 |
| [unicorn/prefer-array-flat](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat.md) | error | - | 强制使用 `Array.prototype.flat` 而不是递归展开或其它方法 |
| [unicorn/prefer-array-flat-map](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat-map.md) | error | - | 强制使用 `Array.prototype.flatMap` 而不是 `map` 后接 `flat` |
| [unicorn/prefer-array-index-of](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-index-of.md) | error | - | 强制使用 `Array.prototype.indexOf` 而不是循环查找索引 |
| [unicorn/prefer-array-some](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-some.md) | error | - | 强制使用 `Array.prototype.some` 而不是循环检查存在性 |
| [unicorn/prefer-at](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-at.md) | error | - | 强制使用 `.at()` 方法进行负索引访问（例如 `array[-1]` 不行，但 `array.at(-1)` 可以） |
| [unicorn/prefer-bigint-literals](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-bigint-literals.md) | error | - | 强制使用 BigInt 字面量（例如 `1n`）而不是 `BigInt(1)` |
| [unicorn/prefer-blob-reading-methods](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-blob-reading-methods.md) | error | - | 强制使用 `Blob` 的读取方法（例如 `text()`, `arrayBuffer()`）而不是 `FileReader` |
| [unicorn/prefer-class-fields](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-class-fields.md) | error | - | 强制使用类字段语法而不是在构造函数中赋值 |
| [unicorn/prefer-classlist-toggle](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-classlist-toggle.md) | error | - | 强制使用 `classList.toggle` 的第二个参数（强制添加/移除）而不是条件判断 |
| [unicorn/prefer-code-point](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-code-point.md) | error | - | 强制使用 `String.prototype.codePointAt` 和 `String.fromCodePoint` 来处理 Unicode |
| [unicorn/prefer-date-now](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-date-now.md) | error | - | 强制使用 `Date.now()` 而不是 `new Date().getTime()` |
| [unicorn/prefer-default-parameters](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-default-parameters.md) | error | - | 强制使用默认参数而不是在函数体内设置默认值 |
| [unicorn/prefer-dom-node-append](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-append.md) | error | - | 强制使用 `Node.append` 而不是 `Node.appendChild`（支持多个参数） |
| [unicorn/prefer-dom-node-dataset](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-dataset.md) | error | - | 强制使用 `dataset` 来访问和设置 data-* 属性 |
| [unicorn/prefer-dom-node-remove](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-remove.md) | error | - | 强制使用 `ChildNode.remove` 而不是 `parentNode.removeChild` |
| [unicorn/prefer-dom-node-text-content](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-text-content.md) | error | - | 强制使用 `Node.textContent` 而不是 `Node.innerText`（性能更好，更可预测） |
| [unicorn/prefer-event-target](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-event-target.md) | error | - | 强制使用 `EventTarget` 而不是 `EventEmitter`（用于自定义事件） |
| [unicorn/prefer-export-from](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-export-from.md) | error | - | 强制使用 `export {foo} from 'bar'` 而不是先导入再导出 |
| [unicorn/prefer-global-this](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-global-this.md) | error | - | 强制使用 `globalThis` 来访问全局对象（而不是 `window`, `global` 等） |
| [unicorn/prefer-import-meta-properties](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-import-meta-properties.md) | off | - | 强制使用 `import.meta` 对象的属性（如 `import.meta.url`）而不是传统的替代方案 |
| [unicorn/prefer-includes](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-includes.md) | error | - | 强制使用 `String.prototype.includes` 而不是 `indexOf !== -1` |
| [unicorn/prefer-json-parse-buffer](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-json-parse-buffer.md) | off | - | 强制使用 `JSON.parse` 时传入 Buffer 而不是字符串（性能考虑） |
| [unicorn/prefer-keyboard-event-key](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-keyboard-event-key.md) | error | - | 强制使用 `KeyboardEvent.key` 而不是 `keyCode` 或 `which`（已废弃） |
| [unicorn/prefer-logical-operator-over-ternary](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-logical-operator-over-ternary.md) | error | - | 强制使用逻辑运算符（`&&`, `||`）而不是三元运算符（`? :`） |
| [unicorn/prefer-math-min-max](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-math-min-max.md) | error | - | 强制使用 `Math.min` 和 `Math.max` 而不是手写条件判断 |
| [unicorn/prefer-math-trunc](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-math-trunc.md) | error | - | 强制使用 `Math.trunc` 来取整而不是 `bitwise operators` 或其它方法 |
| [unicorn/prefer-modern-dom-apis](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-modern-dom-apis.md) | error | - | 强制使用现代 DOM API（例如 `DocumentFragment` 而不是 `innerHTML`） |
| [unicorn/prefer-modern-math-apis](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-modern-math-apis.md) | error | - | 强制使用现代的 Math API（例如 `Math.clz32`） |
| [unicorn/prefer-module](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md) | error | - | 强制使用 ES 模块（`import/export`）而不是 CommonJS（`require/module.exports`） |
| [unicorn/prefer-native-coercion-functions](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-native-coercion-functions.md) | error | - | 强制使用原生类型转换函数（例如 `String(x)`, `Number(x)`）而不是 `x.toString()`, `+x` |
| [unicorn/prefer-negative-index](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-negative-index.md) | error | - | 强制使用负索引来从数组末尾访问元素（结合 `.at()` 或 `slice`） |
| [unicorn/prefer-node-protocol](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md) | error | - | 强制在导入 Node.js 内置模块时使用 `node:` 协议（例如 `import fs from 'node:fs'`） |
| [unicorn/prefer-number-properties](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-number-properties.md) | error | - | 强制使用 `Number` 上的属性（例如 `Number.isNaN` 而不是 `isNaN`） |
| [unicorn/prefer-object-from-entries](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-object-from-entries.md) | error | - | 强制使用 `Object.fromEntries` 来将键值对列表转换为对象 |
| [unicorn/prefer-optional-catch-binding](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-optional-catch-binding.md) | error | - | 强制在 `catch` 子句中省略不必要的参数（当不需要错误对象时） |
| [unicorn/prefer-prototype-methods](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-prototype-methods.md) | error | - | 强制在原型上调用方法而不是在实例上（例如 `Array.prototype.slice.call`） |
| [unicorn/prefer-query-selector](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-query-selector.md) | error | - | 强制使用 `document.querySelector` 和 `document.querySelectorAll` 而不是 `getElementById`, `getElementsByClassName` 等 |
| [unicorn/prefer-reflect-apply](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-reflect-apply.md) | error | - | 强制使用 `Reflect.apply` 而不是 `Function.prototype.apply` |
| [unicorn/prefer-regexp-test](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-regexp-test.md) | error | - | 强制使用 `RegExp.prototype.test` 而不是 `String.prototype.match` 来检查匹配 |
| [unicorn/prefer-set-has](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-set-has.md) | error | - | 强制使用 `Set.prototype.has` 来检查 Set 中是否存在某个值（而不是数组的 `includes`） |
| [unicorn/prefer-set-size](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-set-size.md) | error | - | 强制使用 `Set.prototype.size` 而不是将 Set 转换为数组再取长度 |
| [unicorn/prefer-single-call](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-single-call.md) | error | - | 强制合并多次数组方法调用为单次调用（例如多次 `push` 改为一次 `push` 多个元素） |
| [unicorn/prefer-spread](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md) | error | - | 强制使用展开运算符（`...`）而不是 `Function.prototype.apply` 来传递数组参数 |
| [unicorn/prefer-string-raw](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-raw.md) | error | - | 强制使用 `String.raw` 来获取模板字符串的原始字符串 |
| [unicorn/prefer-string-replace-all](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-replace-all.md) | error | - | 强制使用 `String.prototype.replaceAll` 而不是正则表达式带 `g` 标志的 `replace` |
| [unicorn/prefer-string-slice](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-slice.md) | error | - | 强制使用 `String.prototype.slice` 而不是 `substring` 或 `substr`（行为更一致） |
| [unicorn/prefer-string-starts-ends-with](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-starts-ends-with.md) | error | - | 强制使用 `String.prototype.startsWith` 和 `endsWith` 而不是 `indexOf` 或正则表达式 |
| [unicorn/prefer-string-trim-start-end](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-trim-start-end.md) | error | - | 强制使用 `String.prototype.trimStart` 和 `trimEnd` 而不是 `trimLeft` 和 `trimRight`（标准名称） |
| [unicorn/prefer-structured-clone](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-structured-clone.md) | error | - | 强制使用 `structuredClone` 而不是其他深度克隆方法（如 `JSON.parse(JSON.stringify())`） |
| [unicorn/prefer-switch](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-switch.md) | error | - | 强制使用 `switch` 语句而不是多个 `if-else if` 语句 |
| [unicorn/prefer-ternary](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-ternary.md) | error | - | 强制使用三元运算符而不是简单的 `if-else` 语句 |
| [unicorn/prefer-top-level-await](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-top-level-await.md) | error | - | 强制在模块顶层使用 `await` 而不是包裹在 `async` 函数中（需在 ES 模块中） |
| [unicorn/prefer-type-error](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-type-error.md) | error | - | 强制抛出 `TypeError` 而不是 error 用于类型错误 |
| [unicorn/prevent-abbreviations](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md) | error | - | 防止使用缩写（例如 `e` 代替 `event`, `cb` 代替 `callback`） |
| [unicorn/relative-url-style](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/relative-url-style.md) | error | - | 强制相对 URL 使用一致的风格（例如 `./` 开头或不开头） |
| [unicorn/require-array-join-separator](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-array-join-separator.md) | error | - | 强制 `Array.prototype.join` 方法提供分隔符参数（显式传递空字符串如果需要） |
| [unicorn/require-module-attributes](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-module-attributes.md) | error | - | 强制导入模块时声明属性（例如 `import json from './data.json' assert {type: 'json'};`） |
| [unicorn/require-module-specifiers](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-module-specifiers.md) | error | - | 强制模块标识符使用特定风格（例如相对路径还是绝对路径） |
| [unicorn/require-number-to-fixed-digits-argument](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-number-to-fixed-digits-argument.md) | error | - | 强制 `Number.prototype.toFixed` 提供参数（避免浏览器差异） |
| [unicorn/require-post-message-target-origin](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-post-message-target-origin.md) | off | - | 强制 `window.postMessage` 提供 `targetOrigin` 参数（安全考虑） |
| [unicorn/string-content](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/string-content.md) | off | - | 强制字符串内容使用特定风格（例如禁止或要求使用某些字符） |
| [unicorn/switch-case-braces](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/switch-case-braces.md) | error | - | 强制 `switch case` 使用大括号 |
| [unicorn/template-indent](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/template-indent.md) | error | - | 强制模板字符串的缩进保持一致 |
| [unicorn/text-encoding-identifier-case](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/text-encoding-identifier-case.md) | error | - | 强制文本编码标识符使用特定的大小写（例如 `'utf-8'` 而不是 `'utf8'`） |
| [unicorn/throw-new-error](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/throw-new-error.md) | error | - | 强制抛出错误时使用 `new`（例如 `throw new Error()` 而不是 `throw Error()`） |

## Promise

[`eslint-plugin-promise`](https://github.com/eslint-community/eslint-plugin-promise) 专注于 Promise 的规则，用于确保 Promise 的正确使用，例如检查 `then` / `catch` 的链式调用、防止未处理的 Promise 拒绝等，有助于编写更健壮的异步代码。

```js
// .eslintrc.js

module.exports = {
  extends: [
    'plugin:promise/recommended',
  ],
};
```

:::danger
这是一个实验性功能，请谨慎使用！
:::

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|--------|----------|----------|------|
| [promise/always-return](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/always-return.md) | error | - | 要求在 Promise 链中的 `then()` 方法里必须返回一个值，以确保函数有返回值，避免意外错误 |
| [promise/no-return-wrap](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-return-wrap.md) | error | - | 禁止不必要的包装返回值，例如直接返回一个Promise或使用`Promise.resolve`/`Promise.reject`包装值，应直接返回值或错误 |
| [promise/param-names](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/param-names.md) | error | - | 要求 Promise 的 executor 函数的参数名必须为 `resolve` 和 `reject`，以防止参数名拼写错误导致的问题 |
| [promise/catch-or-return](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/catch-or-return.md) | error | `allowFinally`, `allowThen`, `terminationMethod` | 要求Promise必须使用`catch()`方法处理错误或被返回以便在其他地方处理，以避免未处理的Promise拒绝 |
| [promise/no-native](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-native.md) | off| - | 禁止使用原生的 `Promise` 全局对象，强制使用如 `bluebird` 这样的库。通常在你不使用原生 Promise 时开启 |
| [promise/no-nesting](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-nesting.md) | off | - | 尽可能禁止不必要的 Promise 嵌套，建议使用 `async/await` 或扁平化 Promise 链来简化代码 |
| [promise/no-promise-in-callback](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-promise-in-callback.md) | off | - | 警告在回调函数中返回 Promise 的情况，这可能导致 Promise 被忽略且错误未被处理，常见于类似 `then()` 的回调中 |
| [promise/no-callback-in-promise](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-callback-in-promise.md) | off | - | 不建议在 Promise 中使用回调函数模式（即 `done`、`next` 等参数），因为这可能绕过 Promise 的错误捕获机制 |
| [promise/avoid-new](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/avoid-new.md) | off| - | 禁止使用 `new Promise` 构造函数，建议在可能的情况下使用`Promise` 的工厂函数或 `async` 函数 |
| [promise/no-new-statics](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-new-statics.md) | error | - | 禁止调用 `Promise` 的静态方法（如`Promise.resolve`、`Promise.reject`）时使用 `new` 操作符（例如 `new Promise.resolve(...)` ），这是不必要的 |
| [promise/no-return-in-finally](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-return-in-finally.md) | off | - | 禁止在 `Promise.prototype.finally()` 方法中返回值，因为 `finally` 处理程序中的返回值会被忽略，不会影响 Promise 的最终状态 |
| [promise/valid-params](https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/valid-params.md) | off | - | 确保 `Promise` 的静态方法（如 `all`, `race`, `allSettled`, `any` ）接收的参数是有效的（例如，是一个可迭代对象） |

## JSDoc

[`eslint-plugin-jsdoc`](https://github.com/gajus/eslint-plugin-jsdoc) 是针对 JSDoc 注释的规则集，专门为 JavaScript/TypeScript 设计。它强制要求函数、类等代码结构有清晰的文档注释，并检查注释的格式和类型信息是否与代码一致，从而提高代码的可维护性和文档化水平。

```js
// .eslintrc.js

module.exports = {
  extends: [
    'plugin:jsdoc/recommended-typescript',
  ],
};
```

:::danger
这是一个实验性功能，请谨慎使用！
:::

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|--------|----------|----------|------|
| [jsdoc/check-access](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-access.md) | warn | - | 检查 JSDoc 注释中 `@access` 标签的使用是否正确 |
| [jsdoc/check-alignment](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-alignment.md) | warn | - | 检查 JSDoc 注释中星号 (`*`) 的缩进和对齐方式 |
| [jsdoc/check-examples](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-examples.md) | off | - | 检查 `@example` 标签中的代码片段是否符合语法规范 |
| [jsdoc/check-indentation](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-indentation.md) | off | - | 检查 JSDoc 注释内部的缩进是否一致 |
| [jsdoc/check-line-alignment](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-line-alignment.md) | off | - | 检查 JSDoc 注释标签是否对齐 |
| [jsdoc/check-param-names](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-param-names.md) | warn | - | 检查 `@param` 标签指定的参数名称是否与函数定义中的参数名称匹配 |
| [jsdoc/check-property-names](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-property-names.md) | warn | - | 检查 `@property` 标签指定的属性名称是否与对象定义中的属性名称匹配 |
| [jsdoc/check-syntax](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-syntax.md) | off | - | 检查 JSDoc 注释中是否存在基本的语法错误 |
| [jsdoc/check-template-names](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-template-names.md) | off | - | 检查 JSDoc 注释中使用的模板标签名称（如 `@template`）是否有效 |
| [jsdoc/check-types](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-types.md) | warn | - | 检查 JSDoc 注释中类型注释（如 `{string}`, `{number}`）的语法和有效性 |
| [jsdoc/check-values](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-values.md) | warn | - | 检查 JSDoc 注释中特定标签（如 `@version`, `@since`）的值是否符合预期格式 |
| [jsdoc/convert-to-jsdoc-comments](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/convert-to-jsdoc-comments.md) | off | - | 尝试将普通的多行注释 (`/* ... */`) 转换为 JSDoc 注释 (`/** ... */`) |
| [jsdoc/empty-tags](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/empty-tags.md) | warn | - | 检查 JSDoc 注释中不应包含内容的标签（如 `@abstract`, `@async`）后面是否确实没有内容 |
| [jsdoc/implements-on-classes](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/implements-on-classes.md) | warn | - | 检查 `@implements` 标签是否只用于类（Class）上 |
| [jsdoc/imports-as-dependencies](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/imports-as-dependencies.md) | off | - | 检查导入语句是否被正确标记为依赖 |
| [jsdoc/informative-docs](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/informative-docs.md) | off | - | 鼓励或要求 JSDoc 注释提供更具信息性的描述 |
| [jsdoc/lines-before-block](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/lines-before-block.md) | off | - | 强制或禁止在 JSDoc 注释块之前有空行 |
| [jsdoc/match-description](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/match-description.md) | off | - | 强制 JSDoc 注释的描述部分符合特定的正则表达式模式 |
| [jsdoc/match-name](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/match-name.md) | off | - | 强制 JSDoc 注释所附着的代码元素的名称符合特定的正则表达式模式 |
| [jsdoc/multiline-blocks](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/multiline-blocks.md) | warn | - | 强制多行 JSDoc 注释的特定格式 |
| [jsdoc/no-bad-blocks](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-bad-blocks.md) | off | - | 禁止在注释中使用可能被误解析为 JSDoc 注释的特定模式或标签 |
| [jsdoc/no-blank-block-descriptions](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-blank-block-descriptions.md) | off | - | 禁止 JSDoc 注释块的顶部的描述部分为空 |
| [jsdoc/no-blank-blocks](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-blank-blocks.md) | off | - | 禁止出现完全空白的 JSDoc 注释块 |
| [jsdoc/no-defaults](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-defaults.md) | warn | - | 禁止在 `@param` 或 `@property` 标签中指定默认值 |
| [jsdoc/no-missing-syntax](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-missing-syntax.md) | off | - | 检查代码中是否缺少预期的 JSDoc 注释 |
| [jsdoc/no-multi-asterisks](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-multi-asterisks.md) | warn | - | 禁止在 JSDoc 注释中使用多个连续的星号（`**`） |
| [jsdoc/no-restricted-syntax](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-restricted-syntax.md) | off | - | 允许定义并禁止使用特定的 JSDoc 标签或语法模式 |
| [jsdoc/reject-any-type](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/reject-any-type.md) | warn | - | 禁止在 JSDoc 类型注释中使用 `any` 或 `*` 这种不明确的类型 |
| [jsdoc/reject-function-type](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/reject-function-type.md) | warn | - | 禁止在 JSDoc 类型注释中使用 `Function` 这种不明确的函数类型 |
| [jsdoc/require-asterisk-prefix](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-asterisk-prefix.md) | off | - | 强制 JSDoc 注释中除第一行和最后一行外，每一行都以一个星号 (`*`) 开头 |
| [jsdoc/require-description](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-description.md) | off | - | 强制 JSDoc 注释必须包含描述文本（在标签之前） |
| [jsdoc/require-description-complete-sentence](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-description-complete-sentence.md) | off | - | 强制 JSDoc 注释中的描述部分必须是一个完整的句子 |
| [jsdoc/require-example](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-example.md) | off | - | 强制要求 JSDoc 注释中包含 `@example` 标签 |
| [jsdoc/require-file-overview](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-file-overview.md) | off | - | 强制在每个文件顶部有一个特定的 JSDoc 注释，用于提供文件概述 |
| [jsdoc/require-hyphen-before-param-description](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-hyphen-before-param-description.md) | off | - | 强制在 `@param` 标签的描述文本前必须有一个连字符（`-`）或空格等 |
| [jsdoc/require-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-jsdoc.md) | warn | - | 强制为特定的代码结构（如函数、类、方法）添加 JSDoc 注释 |
| [jsdoc/require-next-type](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-next-type.md) | warn | - | 检查迭代器next方法的返回类型 |
| [jsdoc/require-param](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param.md) | warn | - | 强制为函数声明或表达式中的每一个参数添加 `@param` 标签 |
| [jsdoc/require-param-description](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param-description.md) | warn | - | 强制每一个 `@param` 标签都必须包含对该参数的描述 |
| [jsdoc/require-param-name](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param-name.md) | warn | - | 强制每一个 `@param` 标签都必须指定参数的名称 |
| [jsdoc/require-property](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property.md) | warn | - | 强制为使用 `@typedef` 定义的类型的每一个属性在 JSDoc 注释中添加 `@property` 标签 |
| [jsdoc/require-property-description](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property-description.md) | warn | - | 强制每一个 `@property` 标签都必须包含对该属性的描述 |
| [jsdoc/require-property-name](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property-name.md) | warn | - | 强制每一个 `@property` 标签都必须指定属性的名称 |
| [jsdoc/require-returns](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns.md) | warn | - | 强制为有返回值的函数（非 `void`）添加 `@returns` 标签 |
| [jsdoc/require-returns-check](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns-check.md) | warn | - | 强制如果函数返回一个值（非 `void`），则必须存在 `@returns` 标签 |
| [jsdoc/require-returns-description](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns-description.md) | warn | - | 强制 `@returns` 标签必须包含对返回值的描述 |
| [jsdoc/require-template](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-template.md) | off | - | 强制使用模板标签 |
| [jsdoc/require-throws](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-throws.md) | off | - | 强制为函数中可能抛出错误的情况添加 `@throws` 标签 |
| [jsdoc/require-throws-type](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-throws-type.md) | warn | - | 强制 `@throws` 标签必须指定所抛出错误的类型 |
| [jsdoc/require-yields](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-yields.md) | warn | - | 强制生成器函数或使用 `yield` 的函数添加 `@yields` 标签 |
| [jsdoc/require-yields-check](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-yields-check.md) | warn | - | 强制如果函数中有 `yield` 语句，则必须存在 `@yields` 标签 |
| [jsdoc/require-yields-type](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-yields-type.md) | warn | - | 强制 `@yields` 标签必须指定产出值的类型 |
| [jsdoc/sort-tags](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/sort-tags.md) | off | - | 强制 JSDoc 注释中的标签按特定的顺序排列 |
| [jsdoc/tag-lines](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/tag-lines.md) | warn | - | 强制规定每个 JSDoc 标签之前或之后应有多少空行 |
| [jsdoc/text-escaping](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/text-escaping.md) | off | - | 检查文本转义是否正确 |
| [jsdoc/type-formatting](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/type-formatting.md) | off | - | 强制 JSDoc 类型注释的格式 |
| [jsdoc/valid-types](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/valid-types.md) | warn | - | 验证 JSDoc 注释中特定标签（如 `@typedef`, `@callback`）后的类型声明是否符合语法规范 |
| [jsdoc/check-tag-names](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-tag-names.md) | warn | `{typed: true}` | 检查 JSDoc 注释中所有标签的名称是否拼写正确且是已知的标准标签或配置允许的标签 |
| [jsdoc/no-types](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-types.md) | warn | - | 禁止在 JSDoc 注释中使用类型注解（如 `{string}`），鼓励使用 TypeScript 或其他类型系统 |
| [jsdoc/no-undefined-types](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-undefined-types.md) | off | - | 检查 JSDoc 注释中使用的类型名称是否已定义或是已知的类型（如内置类型、全局类型或导入的类型） |
| [jsdoc/require-param-type](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param-type.md) | off | - | 强制每一个 `@param` 标签都必须指定参数的类型 |
| [jsdoc/require-property-type](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property-type.md) | off | - | 强制每一个 `@property` 标签都必须指定属性的类型 |
| [jsdoc/require-returns-type](https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns-type.md) | off | - | 强制 `@returns` 标签必须指定返回值的类型 |

## ESLint 注释

[`eslint-plugin-eslint-comments`](https://github.com/mysticatea/eslint-plugin-eslint-comments) 用于规范代码中 ESLint 注释（例如 `/* eslint-disable */`）的使用，防止不必要的禁用规则注释，确保规则禁用的原因清晰。

```js
// .eslintrc.js

module.exports = {
  extends: [
    'plugin:eslint-comments/recommended',
  ],
};
```

:::danger
这是一个实验性功能，请谨慎使用！
:::

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|--------|----------|----------|------|
| [eslint-comments/disable-enable-pair](https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/docs/rules/disable-enable-pair.md) | error | - | 要求 `/* eslint-disable */` 注释必须有一个对应的 `/* eslint-enable */` 注释成对出现，防止规则被意外地全局禁用 |
| [eslint-comments/no-aggregating-enable](https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/docs/rules/no-aggregating-enable.md) | error | - | 禁止使用一个 `/* eslint-enable */` 注释来同时启用多个之前被禁用的规则，要求逐一明确启用 |
| [eslint-comments/no-duplicate-disable](https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/docs/rules/no-duplicate-disable.md) | error | - | 禁止对同一个规则进行重复的禁用注释，避免冗余 |
| [eslint-comments/no-unlimited-disable](https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/docs/rules/no-unlimited-disable.md) | error | - | 禁止不使用任何规则名参数的 `/* eslint-disable */` 注释（即禁用所有规则），要求禁用注释必须明确指定要禁用的规则列表，防止无意中关闭所有检查 |
| [eslint-comments/no-unused-enable](https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/docs/rules/no-unused-enable.md) | error | - | 禁止存在没有对应禁用注释的 `/* eslint-enable */` 注释，确保启用的有效性 |


