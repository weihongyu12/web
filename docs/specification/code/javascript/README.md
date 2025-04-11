---
sidebar_position: 4
---

# JavaScript 规范

## 最佳实践

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|---------|---------|---------|------|
| [`accessor-pairs`](https://eslint.org/docs/rules/accessor-pairs) | off | - | 强制 getter/setter 成对出现 |
| [`array-callback-return`](https://eslint.org/docs/rules/array-callback-return) | error | `{ allowImplicit: true }` | 强制数组方法的回调函数中有 return 语句 |
| [`block-scoped-var`](https://eslint.org/docs/rules/block-scoped-var) | error | - | 禁止在块作用域外使用变量 |
| [`complexity`](https://eslint.org/docs/rules/complexity) | off | `20` | 限制代码圈复杂度 |
| [`class-methods-use-this`](https://eslint.org/docs/rules/class-methods-use-this) | error | `{ exceptMethods: [] }` | 强制类方法使用 this |
| [`consistent-return`](https://eslint.org/docs/rules/consistent-return) | error | - | 要求函数返回类型一致 |
| [`curly`](https://eslint.org/docs/rules/curly) | error | `multi-line` | 强制使用大括号控制流语句 |
| [`default-case`](https://eslint.org/docs/rules/default-case) | error | `{ commentPattern: '^no default$' }` | 要求 switch 语句必须有 default |
| [`default-case-last`](https://eslint.org/docs/rules/default-case-last) | error | - | 要求 default case 放在最后 |
| [`default-param-last`](https://eslint.org/docs/rules/default-param-last) | error | - | 要求默认参数放在最后 |
| [`dot-notation`](https://eslint.org/docs/rules/dot-notation) | error | `{ allowKeywords: true }` | 强制使用点号访问属性 |
| [`dot-location`](https://eslint.org/docs/rules/dot-location) | error | `property` | 强制点号与属性同一行 |
| [`eqeqeq`](https://eslint.org/docs/rules/eqeqeq) | error | `always`, `{ null: 'ignore' }` | 强制使用 === 和 !== |
| [`grouped-accessor-pairs`](https://eslint.org/docs/rules/grouped-accessor-pairs) | error | - | 要求 getter/setter 成组出现 |
| [`guard-for-in`](https://eslint.org/docs/rules/guard-for-in) | error | - | 要求 for-in 循环包含 if 语句 |
| [`max-classes-per-file`](https://eslint.org/docs/rules/max-classes-per-file) | error | `1` | 限制每个文件的类数量 |
| [`no-alert`](https://eslint.org/docs/rules/no-alert) | warn | - | 禁止使用 alert |
| [`no-caller`](https://eslint.org/docs/rules/no-caller) | error | - | 禁止使用 arguments.caller/callee |
| [`no-case-declarations`](https://eslint.org/docs/rules/no-case-declarations) | error | - | 禁止 case 语句中声明变量 |
| [`no-constructor-return`](https://eslint.org/docs/rules/no-constructor-return) | error | - | 禁止构造函数返回值 |
| [`no-div-regex`](https://eslint.org/docs/rules/no-div-regex) | off | - | 禁止在正则表达式中使用除法符号 |
| [`no-else-return`](https://eslint.org/docs/rules/no-else-return) | error | `{ allowElseIf: false }` | 禁止在 else 前有 return |
| [`no-empty-function`](https://eslint.org/docs/rules/no-empty-function) | error | `{ allow: [...] }` | 禁止空函数 |
| [`no-empty-pattern`](https://eslint.org/docs/rules/no-empty-pattern) | error | - | 禁止空解构模式 |
| [`no-empty-static-block`](https://eslint.org/docs/rules/no-empty-static-block) | off | - | 禁止空静态块 |
| [`no-eq-null`](https://eslint.org/docs/rules/no-eq-null) | off | - | 禁止与 null 比较 |
| [`no-eval`](https://eslint.org/docs/rules/no-eval) | error | - | 禁止使用 eval |
| [`no-extend-native`](https://eslint.org/docs/rules/no-extend-native) | error | - | 禁止扩展原生对象 |
| [`no-extra-bind`](https://eslint.org/docs/rules/no-extra-bind) | error | - | 禁止不必要的 bind |
| [`no-extra-label`](https://eslint.org/docs/rules/no-extra-label) | error | - | 禁止不必要的标签 |
| [`no-fallthrough`](https://eslint.org/docs/rules/no-fallthrough) | error | - | 禁止 case 穿透 |
| [`no-floating-decimal`](https://eslint.org/docs/rules/no-floating-decimal) | error | - | 禁止浮点小数 |
| [`no-global-assign`](https://eslint.org/docs/rules/no-global-assign) | error | `{ exceptions: [] }` | 禁止覆盖原生对象 |
| [`no-native-reassign`](https://eslint.org/docs/rules/no-native-reassign) | off | - | 禁止覆盖原生对象 (已弃用) |
| [`no-implicit-coercion`](https://eslint.org/docs/rules/no-implicit-coercion) | off | `{ boolean: false, ... }` | 禁止隐式类型转换 |
| [`no-implicit-globals`](https://eslint.org/docs/rules/no-implicit-globals) | off | - | 禁止隐式全局变量 |
| [`no-implied-eval`](https://eslint.org/docs/rules/no-implied-eval) | error | - | 禁止隐式 eval |
| [`no-invalid-this`](https://eslint.org/docs/rules/no-invalid-this) | off | - | 禁止无效的 this 上下文 |
| [`no-iterator`](https://eslint.org/docs/rules/no-iterator) | error | - | 禁止使用 __iterator__ |
| [`no-labels`](https://eslint.org/docs/rules/no-labels) | error | `{ allowLoop: false, ... }` | 禁止标签语句 |
| [`no-lone-blocks`](https://eslint.org/docs/rules/no-lone-blocks) | error | - | 禁止不必要的嵌套块 |
| [`no-loop-func`](https://eslint.org/docs/rules/no-loop-func) | error | - | 禁止循环中创建函数 |
| [`no-magic-numbers`](https://eslint.org/docs/rules/no-magic-numbers) | off | `{ ignore: [], ... }` | 禁止魔法数字 |
| [`no-multi-spaces`](https://eslint.org/docs/rules/no-multi-spaces) | error | `{ ignoreEOLComments: false }` | 禁止多个空格 |
| [`no-multi-str`](https://eslint.org/docs/rules/no-multi-str) | error | - | 禁止多行字符串 |
| [`no-new`](https://eslint.org/docs/rules/no-new) | error | - | 禁止 new 操作符副作用 |
| [`no-new-func`](https://eslint.org/docs/rules/no-new-func) | error | - | 禁止 new Function |
| [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers) | error | - | 禁止 new 包装对象 |
| [`no-nonoctal-decimal-escape`](https://eslint.org/docs/rules/no-nonoctal-decimal-escape) | error | - | 禁止非八进制十进制转义 |
| [`no-object-constructor`](https://eslint.org/docs/rules/no-object-constructor) | off | - | 禁止 Object 构造函数 |
| [`no-octal`](https://eslint.org/docs/rules/no-octal) | error | - | 禁止八进制字面量 |
| [`no-octal-escape`](https://eslint.org/docs/rules/no-octal-escape) | error | - | 禁止八进制转义序列 |
| [`no-param-reassign`](https://eslint.org/docs/rules/no-param-reassign) | error | `{ props: true, ... }` | 禁止参数重新赋值 |
| [`no-proto`](https://eslint.org/docs/rules/no-proto) | error | - | 禁止 __proto__ |
| [`no-redeclare`](https://eslint.org/docs/rules/no-redeclare) | error | - | 禁止重复声明变量 |
| [`no-restricted-properties`](https://eslint.org/docs/rules/no-restricted-properties) | error | 多对象配置 | 限制特定对象属性 |
| [`no-return-assign`](https://eslint.org/docs/rules/no-return-assign) | error | `always` | 禁止 return 中赋值 |
| [`no-return-await`](https://eslint.org/docs/rules/no-return-await) | error | - | 禁止不必要的 return await |
| [`no-script-url`](https://eslint.org/docs/rules/no-script-url) | error | - | 禁止 javascript: URL |
| [`no-self-assign`](https://eslint.org/docs/rules/no-self-assign) | error | `{ props: true }` | 禁止自我赋值 |
| [`no-self-compare`](https://eslint.org/docs/rules/no-self-compare) | error | - | 禁止自我比较 |
| [`no-sequences`](https://eslint.org/docs/rules/no-sequences) | error | - | 禁止逗号操作符 |
| [`no-throw-literal`](https://eslint.org/docs/rules/no-throw-literal) | error | - | 禁止抛出字面量 |
| [`no-unmodified-loop-condition`](https://eslint.org/docs/rules/no-unmodified-loop-condition) | off | - | 禁止未修改的循环条件 |
| [`no-unused-expressions`](https://eslint.org/docs/rules/no-unused-expressions) | error | `{ allowShortCircuit: false, ... }` | 禁止未使用的表达式 |
| [`no-unused-labels`](https://eslint.org/docs/rules/no-unused-labels) | error | - | 禁止未使用的标签 |
| [`no-useless-call`](https://eslint.org/docs/rules/no-useless-call) | off | - | 禁止不必要的 .call/.apply |
| [`no-useless-catch`](https://eslint.org/docs/rules/no-useless-catch) | error | - | 禁止不必要的 catch |
| [`no-useless-concat`](https://eslint.org/docs/rules/no-useless-concat) | error | - | 禁止不必要的字符串连接 |
| [`no-useless-escape`](https://eslint.org/docs/rules/no-useless-escape) | error | - | 禁止不必要的转义 |
| [`no-useless-return`](https://eslint.org/docs/rules/no-useless-return) | error | - | 禁止不必要的 return |
| [`no-void`](https://eslint.org/docs/rules/no-void) | error | - | 禁止 void 操作符 |
| [`no-warning-comments`](https://eslint.org/docs/rules/no-warning-comments) | off | `{ terms: [...], location: 'start' }` | 禁止警告注释 |
| [`no-with`](https://eslint.org/docs/rules/no-with) | error | - | 禁止 with 语句 |
| [`prefer-promise-reject-errors`](https://eslint.org/docs/rules/prefer-promise-reject-errors) | error | `{ allowEmptyReject: true }` | 要求 Promise reject 错误对象 |
| [`prefer-named-capture-group`](https://eslint.org/docs/rules/prefer-named-capture-group) | off | - | 建议命名捕获组 |
| [`prefer-object-has-own`](https://eslint.org/docs/rules/prefer-object-has-own) | off | - | 建议使用 Object.hasOwn() |
| [`prefer-regex-literals`](https://eslint.org/docs/rules/prefer-regex-literals) | error | `{ disallowRedundantWrapping: true }` | 建议使用正则字面量 |
| [`radix`](https://eslint.org/docs/rules/radix) | error | - | 要求 parseInt 使用基数 |
| [`require-await`](https://eslint.org/docs/rules/require-await) | off | - | 要求 async 函数有 await |
| [`require-unicode-regexp`](https://eslint.org/docs/rules/require-unicode-regexp) | off | - | 要求正则表达式使用 u 标志 |
| [`vars-on-top`](https://eslint.org/docs/rules/vars-on-top) | error | - | 要求变量声明在作用域顶部 |
| [`wrap-iife`](https://eslint.org/docs/rules/wrap-iife) | error | `outside`, `{ functionPrototypeMethods: false }` | 要求立即执行函数使用括号包裹 |
| [`yoda`](https://eslint.org/docs/rules/yoda) | error | - | 禁止 Yoda 条件 |

## 错误

| 规则名 | 错误级别 | 配置选项 | 描述 |
|--------|----------|----------|------|
| [`for-direction`](https://eslint.org/docs/rules/for-direction) | error | - | 防止循环条件错误导致无限循环 |
| [`getter-return`](https://eslint.org/docs/rules/getter-return) | error | `{ allowImplicit: true }` | 强制 `getter` 函数必须有返回值 |
| [`no-async-promise-executor`](https://eslint.org/docs/rules/no-async-promise-executor) | error | - | 禁止使用异步函数作为 Promise 执行器 |
| [`no-await-in-loop`](https://eslint.org/docs/rules/no-await-in-loop) | error | - | 禁止在循环内使用 `await` |
| [`no-compare-neg-zero`](https://eslint.org/docs/rules/no-compare-neg-zero) | error | - | 禁止与 `-0` 进行比较 |
| [`no-cond-assign`](https://eslint.org/docs/rules/no-cond-assign) | error | `"always"` | 禁止在条件语句中进行赋值操作 |
| [`no-console`](https://eslint.org/docs/rules/no-console) | warn | - | 警告使用 `console` 语句 |
| [`no-constant-binary-expression`](https://eslint.org/docs/rules/no-constant-binary-expression) | off | - | 关闭检测常量二进制表达式问题 |
| [`no-constant-condition`](https://eslint.org/docs/rules/no-constant-condition) | warn | - | 警告在条件中使用常量值 |
| [`no-control-regex`](https://eslint.org/docs/rules/no-control-regex) | error | - | 禁止在正则表达式中使用控制字符 |
| [`no-debugger`](https://eslint.org/docs/rules/no-debugger) | error | - | 禁止使用 `debugger` 语句 |
| [`no-dupe-args`](https://eslint.org/docs/rules/no-dupe-args) | error | - | 禁止函数参数重复定义 |
| [`no-dupe-else-if`](https://eslint.org/docs/rules/no-dupe-else-if) | error | - | 禁止 `else if` 中有重复条件 |
| [`no-dupe-keys`](https://eslint.org/docs/rules/no-dupe-keys) | error | - | 禁止对象字面量中重复的键 |
| [`no-duplicate-case`](https://eslint.org/docs/rules/no-duplicate-case) | error | - | 禁止 `switch` 语句中有重复的 `case` |
| [`no-empty`](https://eslint.org/docs/rules/no-empty) | error | - | 禁止空块语句 |
| [`no-empty-character-class`](https://eslint.org/docs/rules/no-empty-character-class) | error | - | 禁止正则表达式中出现空字符类 |
| [`no-ex-assign`](https://eslint.org/docs/rules/no-ex-assign) | error | - | 禁止对 `catch` 子句中的异常重新赋值 |
| [`no-extra-boolean-cast`](https://eslint.org/docs/rules/no-extra-boolean-cast) | error | - | 禁止不必要的布尔类型转换 |
| [`no-extra-parens`](https://eslint.org/docs/rules/no-extra-parens) | off | `"all", { conditionalAssign: true, nestedBinaryExpressions: false, returnAssign: false, ignoreJSX: "all", enforceForArrowConditionals: false }` | 关闭检测多余的括号（配置保留） |
| [`no-extra-semi`](https://eslint.org/docs/rules/no-extra-semi) | error | - | 禁止不必要的分号 |
| [`no-func-assign`](https://eslint.org/docs/rules/no-func-assign) | error | - | 禁止对函数声明重新赋值 |
| [`no-import-assign`](https://eslint.org/docs/rules/no-import-assign) | error | - | 禁止对导入的绑定进行赋值 |
| [`no-inner-declarations`](https://eslint.org/docs/rules/no-inner-declarations) | error | - | 禁止在嵌套块中声明函数或变量 |
| [`no-invalid-regexp`](https://eslint.org/docs/rules/no-invalid-regexp) | error | - | 禁止无效的正则表达式 |
| [`no-irregular-whitespace`](https://eslint.org/docs/rules/no-irregular-whitespace) | error | - | 禁止不规则的空白字符 |
| [`no-loss-of-precision`](https://eslint.org/docs/rules/no-loss-of-precision) | error | - | 禁止数字精度丢失 |
| [`no-misleading-character-class`](https://eslint.org/docs/rules/no-misleading-character-class) | error | - | 禁止正则中可能导致误解的字符类 |
| [`no-obj-calls`](https://eslint.org/docs/rules/no-obj-calls) | error | - | 禁止将全局对象当作函数调用 |
| [`no-new-native-nonconstructor`](https://eslint.org/docs/rules/no-new-native-nonconstructor) | off | - | 关闭检测无法作为构造函数的内置对象调用 |
| [`no-promise-executor-return`](https://eslint.org/docs/rules/no-promise-executor-return) | error | - | 禁止在 Promise 执行器中返回值 |
| [`no-prototype-builtins`](https://eslint.org/docs/rules/no-prototype-builtins) | error | - | 禁止直接调用对象的原型方法（如 `hasOwnProperty`） |
| [`no-regex-spaces`](https://eslint.org/docs/rules/no-regex-spaces) | error | - | 禁止正则表达式中出现多个空格 |
| [`no-setter-return`](https://eslint.org/docs/rules/no-setter-return) | error | - | 强制 `setter` 函数必须有返回值 |
| [`no-sparse-arrays`](https://eslint.org/docs/rules/no-sparse-arrays) | error | - | 禁止稀疏数组（如 `[1,,2]`） |
| [`no-template-curly-in-string`](https://eslint.org/docs/rules/no-template-curly-in-string) | error | - | 禁止字符串中出现模板字面量占位符语法 |
| [`no-unexpected-multiline`](https://eslint.org/docs/rules/no-unexpected-multiline) | error | - | 禁止出现意外的多行表达式 |
| [`no-unreachable`](https://eslint.org/docs/rules/no-unreachable) | error | - | 禁止不可达的代码 |
| [`no-unreachable-loop`](https://eslint.org/docs/rules/no-unreachable-loop) | error | `{ ignore: [] }` | 禁止无法正常退出的循环 |
| [`no-unsafe-finally`](https://eslint.org/docs/rules/no-unsafe-finally) | error | - | 禁止在 `finally` 块中使用控制流语句 |
| [`no-unsafe-negation`](https://eslint.org/docs/rules/no-unsafe-negation) | error | - | 禁止不安全的取反操作（如 `!obj in expr`） |
| [`no-unsafe-optional-chaining`](https://eslint.org/docs/rules/no-unsafe-optional-chaining) | error | `{ disallowArithmeticOperators: true }` | 禁止不安全的可选链操作 |
| [`no-unused-private-class-members`](https://eslint.org/docs/rules/no-unused-private-class-members) | off | - | 关闭检测未使用的私有类成员 |
| [`no-useless-backreference`](https://eslint.org/docs/rules/no-useless-backreference) | error | - | 禁止正则表达式中无用的反向引用 |
| [`no-negated-in-lhs`](https://eslint.org/docs/rules/no-negated-in-lhs) | off | - | 关闭检测 `in` 操作符的左操作符是否被取反（已弃用） |
| [`require-atomic-updates`](https://eslint.org/docs/rules/require-atomic-updates) | off | - | 关闭要求异步操作必须是原子性的 |
| [`use-isnan`](https://eslint.org/docs/rules/use-isnan) | error | - | 必须使用 `isNaN()` 检查 `NaN` |
| [`valid-jsdoc`](https://eslint.org/docs/rules/valid-jsdoc) | off | - | 关闭强制有效的 JSDoc 注释 |
| [`valid-typeof`](https://eslint.org/docs/rules/valid-typeof) | error | `{ requireStringLiterals: true }` | 强制 `typeof` 操作符必须与有效字符串字面量比较 |

## node.js

| 规则名称 | 错误级别 | 配置选项      | 描述 |
|---------|---------|-----------|-----|
| [`callback-return`](https://eslint.org/docs/rules/callback-return) | off | -         | 强制在回调函数中使用 return 语句 |
| [`global-require`](https://eslint.org/docs/rules/global-require) | error | -         | 强制 `require()` 在模块顶部调用 |
| [`handle-callback-err`](https://eslint.org/docs/rules/handle-callback-err) | off | -         | 强制回调函数的错误处理 |
| [`no-buffer-constructor`](https://eslint.org/docs/rules/no-buffer-constructor) | error | -         | 禁用 `Buffer()` 构造函数（已废弃，建议迁移到 `eslint-plugin-node`） |
| [`no-mixed-requires`](https://eslint.org/docs/rules/no-mixed-requires) | off | `[false]` | 禁止混合常规变量和模块引入 |
| [`no-new-require`](https://eslint.org/docs/rules/no-new-require) | error | -         | 禁止对 `require` 使用 `new` |
| [`no-path-concat`](https://eslint.org/docs/rules/no-path-concat) | error | -         | 禁止路径字符串拼接 |
| [`no-process-env`](https://eslint.org/docs/rules/no-process-env) | off | -         | 禁用 `process.env` |
| [`no-process-exit`](https://eslint.org/docs/rules/no-process-exit) | off | -         | 禁用 `process.exit()` |
| [`no-restricted-modules`](https://eslint.org/docs/rules/no-restricted-modules) | off | -         | 禁止使用特定模块（已废弃，建议改用 `no-restricted-imports`） |
| [`no-sync`](https://eslint.org/docs/rules/no-sync) | off | -         | 禁用同步方法 |

## 风格

| 规则名 | 错误级别 | 配置选项 | 描述 |
|--------|----------|----------|------|
| [`array-bracket-newline`](https://eslint.org/docs/rules/array-bracket-newline) | off | `'consistent'` | 强制数组括号的换行风格一致 |
| [`array-element-newline`](https://eslint.org/docs/rules/array-element-newline) | off | `{ multiline: true, minItems: 3 }` | 多行或超过最小项时换行（已关闭） |
| [`array-bracket-spacing`](https://eslint.org/docs/rules/array-bracket-spacing) | error | `'never'` | 禁止数组括号内添加空格 |
| [`block-spacing`](https://eslint.org/docs/rules/block-spacing) | error | `'always'` | 强制块内保留空格 |
| [`brace-style`](https://eslint.org/docs/rules/brace-style) | error | `'1tbs', { allowSingleLine: true }` | 大括号风格为 `1tbs`，允许单行块 |
| [`camelcase`](https://eslint.org/docs/rules/camelcase) | error | `{ properties: 'never', ignoreDestructuring: false }` | 强制驼峰命名（属性名除外） |
| [`capitalized-comments`](https://eslint.org/docs/rules/capitalized-comments) | off | `'never', { line: {...}, block: {...} }` | 关闭注释首字母大写检查 |
| [`comma-dangle`](https://eslint.org/docs/rules/comma-dangle) | error | `{ arrays: 'always-multiline', ... }` | 多行结构强制拖尾逗号 |
| [`comma-spacing`](https://eslint.org/docs/rules/comma-spacing) | error | `{ before: false, after: true }` | 逗号后必须空格，前无空格 |
| [`comma-style`](https://eslint.org/docs/rules/comma-style) | error | `'last', { exceptions: {...} }` | 逗号置于行尾 |
| [`computed-property-spacing`](https://eslint.org/docs/rules/computed-property-spacing) | error | `'never'` | 禁止计算属性内空格 |
| [`consistent-this`](https://eslint.org/docs/rules/consistent-this) | off | - | 关闭强制统一 `this` 别名 |
| [`eol-last`](https://eslint.org/docs/rules/eol-last) | error | `'always'` | 文件末尾强制换行 |
| [`function-call-argument-newline`](https://eslint.org/docs/rules/function-call-argument-newline) | error | `'consistent'` | 函数调用参数换行风格一致 |
| [`func-call-spacing`](https://eslint.org/docs/rules/func-call-spacing) | error | `'never'` | 禁止函数名与括号间空格 |
| [`func-name-matching`](https://eslint.org/docs/rules/func-name-matching) | off | `'always', { includeCommonJSModuleExports: false }` | 关闭函数名匹配检查 |
| [`func-names`](https://eslint.org/docs/rules/func-names) | warn | - | 警告未命名函数表达式 |
| [`func-style`](https://eslint.org/docs/rules/func-style) | off | `'expression'` | 关闭函数声明风格检查 |
| [`function-paren-newline`](https://eslint.org/docs/rules/function-paren-newline) | error | `'multiline-arguments'` | 多行参数时括号换行 |
| [`id-denylist`](https://eslint.org/docs/rules/id-denylist) | off | - | 关闭标识符黑名单检查 |
| [`id-length`](https://eslint.org/docs/rules/id-length) | off | - | 关闭标识符长度检查 |
| [`id-match`](https://eslint.org/docs/rules/id-match) | off | - | 关闭标识符命名模式检查 |
| [`implicit-arrow-linebreak`](https://eslint.org/docs/rules/implicit-arrow-linebreak) | error | `'beside'` | 箭头函数返回值与箭头同行 |
| [`indent`](https://eslint.org/docs/rules/indent) | error | `2, { SwitchCase: 1, ... }` | 强制2空格缩进，处理不同语法结构 |
| [`jsx-quotes`](https://eslint.org/docs/rules/jsx-quotes) | off | `'prefer-double'` | 关闭JSX引号偏好检查 |
| [`key-spacing`](https://eslint.org/docs/rules/key-spacing) | error | `{ beforeColon: false, afterColon: true }` | 键后必须空格，键前无空格 |
| [`keyword-spacing`](https://eslint.org/docs/rules/keyword-spacing) | error | `{ before: true, after: true, ... }` | 关键字前后保留空格 |
| [`line-comment-position`](https://eslint.org/docs/rules/line-comment-position) | off | `{ position: 'above' }` | 关闭行注释位置检查 |
| [`linebreak-style`](https://eslint.org/docs/rules/linebreak-style) | error | `'unix'` | 强制Unix换行符（`\n`） |
| [`lines-between-class-members`](https://eslint.org/docs/rules/lines-between-class-members) | error | `'always', { exceptAfterSingleLine: false }` | 类成员间保留空行 |
| [`lines-around-comment`](https://eslint.org/docs/rules/lines-around-comment) | off | - | 关闭注释周围空行检查 |
| [`lines-around-directive`](https://eslint.org/docs/rules/lines-around-directive) | error | `{ before: 'always', after: 'always' }` | 指令周围保留空行 |
| [`logical-assignment-operators`](https://eslint.org/docs/rules/logical-assignment-operators) | off | `'always', { enforceForIfStatements: true }` | 关闭逻辑赋值操作符检查 |
| [`max-depth`](https://eslint.org/docs/rules/max-depth) | off | `4` | 关闭代码块嵌套深度检查 |
| [`max-len`](https://eslint.org/docs/rules/max-len) | error | `100, 2, { ignoreUrls: true, ... }` | 单行最大长度100字符 |
| [`max-lines`](https://eslint.org/docs/rules/max-lines) | off | `{ max: 300, ... }` | 关闭文件最大行数检查 |
| [`max-lines-per-function`](https://eslint.org/docs/rules/max-lines-per-function) | off | `{ max: 50, ... }` | 关闭函数最大行数检查 |
| [`max-nested-callbacks`](https://eslint.org/docs/rules/max-nested-callbacks) | off | - | 关闭回调嵌套深度检查 |
| [`max-params`](https://eslint.org/docs/rules/max-params) | off | `3` | 关闭函数最大参数检查 |
| [`max-statements`](https://eslint.org/docs/rules/max-statements) | off | `10` | 关闭函数最大语句数检查 |
| [`max-statements-per-line`](https://eslint.org/docs/rules/max-statements-per-line) | off | `{ max: 1 }` | 关闭单行最大语句数检查 |
| [`multiline-comment-style`](https://eslint.org/docs/rules/multiline-comment-style) | off | `'starred-block'` | 关闭多行注释风格检查 |
| [`multiline-ternary`](https://eslint.org/docs/rules/multiline-ternary) | off | `'never'` | 关闭多行三元表达式检查 |
| [`new-cap`](https://eslint.org/docs/rules/new-cap) | error | `{ newIsCap: true, capIsNew: false, ... }` | 构造函数首字母大写限制 |
| [`new-parens`](https://eslint.org/docs/rules/new-parens) | error | - | 构造函数调用必须带括号 |
| [`newline-after-var`](https://eslint.org/docs/rules/newline-after-var) | off | - | 关闭变量声明后空行检查 |
| [`newline-before-return`](https://eslint.org/docs/rules/newline-before-return) | off | - | 关闭return前空行检查 |
| [`newline-per-chained-call`](https://eslint.org/docs/rules/newline-per-chained-call) | error | `{ ignoreChainWithDepth: 4 }` | 链式调用超过4层需换行 |
| [`no-array-constructor`](https://eslint.org/docs/rules/no-array-constructor) | error | - | 禁止使用数组构造函数 |
| [`no-bitwise`](https://eslint.org/docs/rules/no-bitwise) | error | - | 禁止位运算符 |
| [`no-continue`](https://eslint.org/docs/rules/no-continue) | error | - | 禁止使用`continue` |
| [`no-inline-comments`](https://eslint.org/docs/rules/no-inline-comments) | off | - | 关闭禁止行内注释检查 |
| [`no-lonely-if`](https://eslint.org/docs/rules/no-lonely-if) | error | - | 禁止单独的`if`语句 |
| [`no-mixed-operators`](https://eslint.org/docs/rules/no-mixed-operators) | error | `{ groups: [...], allowSamePrecedence: false }` | 禁止混合使用不同优先级操作符 |
| [`no-mixed-spaces-and-tabs`](https://eslint.org/docs/rules/no-mixed-spaces-and-tabs) | error | - | 禁止混用空格和制表符 |
| [`no-multi-assign`](https://eslint.org/docs/rules/no-multi-assign) | error | - | 禁止连续赋值 |
| [`no-multiple-empty-lines`](https://eslint.org/docs/rules/no-multiple-empty-lines) | error | `{ max: 1, maxBOF: 0, maxEOF: 0 }` | 最多1个连续空行 |
| [`no-negated-condition`](https://eslint.org/docs/rules/no-negated-condition) | off | - | 关闭禁止否定条件检查 |
| [`no-nested-ternary`](https://eslint.org/docs/rules/no-nested-ternary) | error | - | 禁止嵌套三元表达式 |
| [`no-new-object`](https://eslint.org/docs/rules/no-new-object) | error | - | 禁止使用`new Object` |
| [`no-plusplus`](https://eslint.org/docs/rules/no-plusplus) | error | - | 禁止`++`和`--` |
| [`no-restricted-syntax`](https://eslint.org/docs/rules/no-restricted-syntax) | error | `ForInStatement, ForOfStatement, ...` | 禁用特定语法结构（如`for-in`） |
| [`no-spaced-func`](https://eslint.org/docs/rules/no-spaced-func) | off | - | 关闭禁止函数名与括号间空格检查 |
| [`no-tabs`](https://eslint.org/docs/rules/no-tabs) | error | - | 禁止使用制表符 |
| [`no-ternary`](https://eslint.org/docs/rules/no-ternary) | off | - | 关闭禁止三元操作符检查 |
| [`no-trailing-spaces`](https://eslint.org/docs/rules/no-trailing-spaces) | error | `{ skipBlankLines: false, ... }` | 禁止行尾空格 |
| [`no-underscore-dangle`](https://eslint.org/docs/rules/no-underscore-dangle) | error | `{ allow: [], ... }` | 禁止下划线开头或结尾的标识符 |
| [`no-unneeded-ternary`](https://eslint.org/docs/rules/no-unneeded-ternary) | error | `{ defaultAssignment: false }` | 禁止不必要的三元表达式 |
| [`no-whitespace-before-property`](https://eslint.org/docs/rules/no-whitespace-before-property) | error | - | 禁止属性前的空格 |
| [`nonblock-statement-body-position`](https://eslint.org/docs/rules/nonblock-statement-body-position) | error | `'beside', { overrides: {} }` | 单行非块语句与声明同行 |
| [`object-curly-spacing`](https://eslint.org/docs/rules/object-curly-spacing) | error | `'always'` | 对象花括号内保留空格 |
| [`object-curly-newline`](https://eslint.org/docs/rules/object-curly-newline) | error | `{ ObjectExpression: { minProperties: 4, ... } }` | 对象属性超过3项时换行 |
| [`object-property-newline`](https://eslint.org/docs/rules/object-property-newline) | error | `{ allowAllPropertiesOnSameLine: true }` | 允许对象属性同行 |
| [`one-var`](https://eslint.org/docs/rules/one-var) | error | `'never'` | 禁止合并变量声明 |
| [`one-var-declaration-per-line`](https://eslint.org/docs/rules/one-var-declaration-per-line) | error | `'always'` | 每行一个变量声明 |
| [`operator-assignment`](https://eslint.org/docs/rules/operator-assignment) | error | `'always'` | 强制操作符简写形式 |
| [`operator-linebreak`](https://eslint.org/docs/rules/operator-linebreak) | error | `'before', { overrides: { '=': 'none' } }` | 操作符置于行首（等号例外） |
| [`padded-blocks`](https://eslint.org/docs/rules/padded-blocks) | error | `'never', { allowSingleLineBlocks: true }` | 块内不填充空行（单行块允许） |
| [`padding-line-between-statements`](https://eslint.org/docs/rules/padding-line-between-statements) | off | - | 关闭语句间空行检查 |
| [`prefer-exponentiation-operator`](https://eslint.org/docs/rules/prefer-exponentiation-operator) | error | - | 使用指数操作符替代`Math.pow` |
| [`prefer-object-spread`](https://eslint.org/docs/rules/prefer-object-spread) | error | - | 使用对象展开替代`Object.assign` |
| [`quote-props`](https://eslint.org/docs/rules/quote-props) | error | `'as-needed', { keywords: false, ... }` | 按需引用对象属性名 |
| [`quotes`](https://eslint.org/docs/rules/quotes) | error | `'single', { avoidEscape: true }` | 使用单引号（允许转义） |
| [`require-jsdoc`](https://eslint.org/docs/rules/require-jsdoc) | off | - | 关闭JSDoc注释检查 |
| [`semi`](https://eslint.org/docs/rules/semi) | error | `'always'` | 强制分号结尾 |
| [`semi-spacing`](https://eslint.org/docs/rules/semi-spacing) | error | `{ before: false, after: true }` | 分号后空格，前无空格 |
| [`semi-style`](https://eslint.org/docs/rules/semi-style) | error | `'last'` | 分号置于行尾 |
| [`sort-keys`](https://eslint.org/docs/rules/sort-keys) | off | `'asc', { caseSensitive: false, ... }` | 关闭对象键排序检查 |
| [`sort-vars`](https://eslint.org/docs/rules/sort-vars) | off | - | 关闭变量排序检查 |
| [`space-before-blocks`](https://eslint.org/docs/rules/space-before-blocks) | error | - | 块前必须空格 |
| [`space-before-function-paren`](https://eslint.org/docs/rules/space-before-function-paren) | error | `{ anonymous: 'always', named: 'never', ... }` | 函数名后无空格，匿名函数后有空格 |
| [`space-in-parens`](https://eslint.org/docs/rules/space-in-parens) | error | `'never'` | 括号内不保留空格 |
| [`space-infix-ops`](https://eslint.org/docs/rules/space-infix-ops) | error | - | 中缀操作符周围保留空格 |
| [`space-unary-ops`](https://eslint.org/docs/rules/space-unary-ops) | error | `{ words: true, nonwords: false }` | 单词类一元操作符后空格 |
| [`spaced-comment`](https://eslint.org/docs/rules/spaced-comment) | error | `'always', { line: {...}, block: {...} }` | 注释前保留空格 |
| [`switch-colon-spacing`](https://eslint.org/docs/rules/switch-colon-spacing) | error | `{ after: true, before: false }` | `switch` case冒号后空格，前无空格 |
| [`template-tag-spacing`](https://eslint.org/docs/rules/template-tag-spacing) | error | `'never'` | 模板标签后无空格 |
| [`unicode-bom`](https://eslint.org/docs/rules/unicode-bom) | error | `'never'` | 禁止Unicode BOM头 |
| [`wrap-regex`](https://eslint.org/docs/rules/wrap-regex) | off | - | 关闭正则表达式括号包裹检查 |

## 变量

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|----------|----------|----------|------|
| [`init-declarations`](https://eslint.org/docs/rules/init-declarations) | off | - | 强制或禁止变量声明时初始化 |
| [`no-catch-shadow`](https://eslint.org/docs/rules/no-catch-shadow) | off | - | 禁止`catch`子句参数与外部变量同名 |
| [`no-delete-var`](https://eslint.org/docs/rules/no-delete-var) | error | - | 禁止使用`delete`删除变量 |
| [`no-label-var`](https://eslint.org/docs/rules/no-label-var) | error | - | 禁止标签与变量同名 |
| [`no-restricted-globals`](https://eslint.org/docs/rules/no-restricted-globals) | error | `[ { name: "isFinite", message: "Use Number.isFinite instead" }, { name: "isNaN", message: "Use Number.isNaN instead" }, "addEventListener", "blur", ..., "top" ]` | 禁止使用特定全局变量并提供替代建议 |
| [`no-shadow`](https://eslint.org/docs/rules/no-shadow) | error | - | 禁止变量声明覆盖外部作用域变量 |
| [`no-shadow-restricted-names`](https://eslint.org/docs/rules/no-shadow-restricted-names) | error | - | 禁止覆盖受限标识符（如`undefined`）|
| [`no-undef`](https://eslint.org/docs/rules/no-undef) | error | - | 禁止使用未声明变量 |
| [`no-undef-init`](https://eslint.org/docs/rules/no-undef-init) | error | - | 禁止初始化变量为`undefined` |
| [`no-undefined`](https://eslint.org/docs/rules/no-undefined) | off | - | 禁止使用`undefined`变量 |
| [`no-unused-vars`](https://eslint.org/docs/rules/no-unused-vars) | error | `{ vars: "all", args: "after-used", ignoreRestSiblings: true }` | 禁止未使用变量，可配置检测范围 |
| [`no-use-before-define`](https://eslint.org/docs/rules/no-use-before-define) | error | `{ functions: true, classes: true, variables: true }` | 禁止在定义前使用变量/函数/类 |

> **配置选项说明**：
> - `no-restricted-globals` 的完整受限列表包含：  
    `isFinite`/`isNaN`（带自定义提示）及 `addEventListener`, `blur`, `close`, `closed`, `confirm`, `defaultStatus`, ..., `top` 等全局变量
> - `no-unused-vars` 配置表示：检查所有变量、参数从使用位置后开始检测、忽略剩余属性
> - `no-use-before-define` 配置表示：检查函数/类/变量均需先定义后使用

## ECMAScript 6

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|---------|---------|----------|------|
| [`arrow-body-style`](https://eslint.org/docs/rules/arrow-body-style) | error | `"as-needed"`, `{ requireReturnForObjectLiteral: false }` | 要求箭头函数体在可能的情况下省略大括号 |
| [`arrow-parens`](https://eslint.org/docs/rules/arrow-parens) | error | `"always"` | 要求箭头函数参数始终使用括号 |
| [`arrow-spacing`](https://eslint.org/docs/rules/arrow-spacing) | error | `{ before: true, after: true }` | 强制箭头函数的箭头前后空格一致性 |
| [`constructor-super`](https://eslint.org/docs/rules/constructor-super) | error | - | 禁止在构造函数中在调用 super() 之前使用 this/super |
| [`generator-star-spacing`](https://eslint.org/docs/rules/generator-star-spacing) | error | `{ before: false, after: true }` | 强制 generator 函数中星号周围空格的一致性 |
| [`no-class-assign`](https://eslint.org/docs/rules/no-class-assign) | error | - | 禁止修改类声明 |
| [`no-confusing-arrow`](https://eslint.org/docs/rules/no-confusing-arrow) | error | `{ allowParens: true }` | 禁止可能与比较操作符混淆的箭头函数语法 |
| [`no-const-assign`](https://eslint.org/docs/rules/no-const-assign) | error | - | 禁止修改 const 声明的变量 |
| [`no-dupe-class-members`](https://eslint.org/docs/rules/no-dupe-class-members) | error | - | 禁止类成员中的重复名称 |
| [`no-duplicate-imports`](https://eslint.org/docs/rules/no-duplicate-imports) | off | - | 禁止重复模块导入（已禁用） |
| [`no-new-symbol`](https://eslint.org/docs/rules/no-new-symbol) | error | - | 禁止使用 new 操作符创建 Symbol 实例 |
| [`no-restricted-exports`](https://eslint.org/docs/rules/no-restricted-exports) | error | `{ restrictedNamedExports: ["default", "then"] }` | 限制指定的命名导出 |
| [`no-restricted-imports`](https://eslint.org/docs/rules/no-restricted-imports) | off | `{ paths: [], patterns: [] }` | 限制指定的模块导入（已禁用） |
| [`no-this-before-super`](https://eslint.org/docs/rules/no-this-before-super) | error | - | 禁止在构造函数中在 super() 调用前使用 this |
| [`no-useless-computed-key`](https://eslint.org/docs/rules/no-useless-computed-key) | error | - | 禁止不必要的计算属性键 |
| [`no-useless-constructor`](https://eslint.org/docs/rules/no-useless-constructor) | error | - | 禁止不必要的构造函数 |
| [`no-useless-rename`](https://eslint.org/docs/rules/no-useless-rename) | error | `{ ignoreDestructuring: false, ignoreImport: false, ignoreExport: false }` | 禁止不必要的重命名解构 |
| [`no-var`](https://eslint.org/docs/rules/no-var) | error | - | 要求使用 let 或 const 代替 var |
| [`object-shorthand`](https://eslint.org/docs/rules/object-shorthand) | error | `"always"`, `{ ignoreConstructors: false, avoidQuotes: true }` | 强制对象字面量简写语法 |
| [`prefer-arrow-callback`](https://eslint.org/docs/rules/prefer-arrow-callback) | error | `{ allowNamedFunctions: false, allowUnboundThis: true }` | 要求回调函数使用箭头函数 |
| [`prefer-const`](https://eslint.org/docs/rules/prefer-const) | error | `{ destructuring: "any", ignoreReadBeforeAssign: true }` | 要求使用 const 声明不会被重新赋值的变量 |
| [`prefer-destructuring`](https://eslint.org/docs/rules/prefer-destructuring) | error | `{ VariableDeclarator: { array: false, object: true }, AssignmentExpression: { array: true, object: false } }`, `{ enforceForRenamedProperties: false }` | 强制使用解构赋值 |
| [`prefer-numeric-literals`](https://eslint.org/docs/rules/prefer-numeric-literals) | error | - | 禁用 parseInt() 而使用二进制、八进制和十六进制字面量 |
| [`prefer-reflect`](https://eslint.org/docs/rules/prefer-reflect) | off | - | 要求使用 Reflect 方法（已禁用） |
| [`prefer-rest-params`](https://eslint.org/docs/rules/prefer-rest-params) | error | - | 要求使用 rest 参数代替 arguments |
| [`prefer-spread`](https://eslint.org/docs/rules/prefer-spread) | error | - | 要求使用扩展运算符代替 .apply() |
| [`prefer-template`](https://eslint.org/docs/rules/prefer-template) | error | - | 要求使用模板字面量代替字符串拼接 |
| [`require-yield`](https://eslint.org/docs/rules/require-yield) | error | - | 要求 generator 函数内包含 yield 语句 |
| [`rest-spread-spacing`](https://eslint.org/docs/rules/rest-spread-spacing) | error | `"never"` | 强制剩余和扩展运算符周围空格的一致性 |
| [`sort-imports`](https://eslint.org/docs/rules/sort-imports) | off | `{ ignoreCase: false, ignoreDeclarationSort: false, ignoreMemberSort: false, memberSyntaxSortOrder: ["none", "all", "multiple", "single"] }` | 强制导入声明排序（已禁用） |
| [`symbol-description`](https://eslint.org/docs/rules/symbol-description) | error | - | 要求 Symbol 描述参数 |
| [`template-curly-spacing`](https://eslint.org/docs/rules/template-curly-spacing) | error | - | 强制模板字符串中花括号内的空格 |
| [`yield-star-spacing`](https://eslint.org/docs/rules/yield-star-spacing) | error | `"after"` | 强制 yield* 表达式中星号周围空格 |

## 模块导入

| 规则名 | 错误级别 | 配置选项 | 描述 |
|--------|----------|----------|------|
| [`import/no-unresolved`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md) | error | `{ commonjs: true, caseSensitive: true }` | 确保导入的模块路径可解析 |
| [`import/named`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/named.md) | error | - | 验证命名导出是否存在 |
| [`import/default`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/default.md) | off | - | 关闭默认导出的验证 |
| [`import/namespace`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/namespace.md) | off | - | 关闭命名空间导入验证 |
| [`import/export`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/export.md) | error | - | 确保文件内所有导出语法有效 |
| [`import/no-named-as-default`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-as-default.md) | error | - | 禁止将命名导出与默认导出混淆 |
| [`import/no-named-as-default-member`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-as-default-member.md) | error | - | 禁止通过默认导出访问命名导出 |
| [`import/no-deprecated`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-deprecated.md) | off | - | 关闭对废弃模块的检查 |
| [`import/no-extraneous-dependencies`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md) | error | `{ devDependencies: [...], optionalDependencies: false }` | 禁止引入无关依赖 |
| [`import/no-mutable-exports`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-mutable-exports.md) | error | - | 禁止导出可变变量 |
| [`import/no-commonjs`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-commonjs.md) | off | - | 关闭对 CommonJS 语法的限制 |
| [`import/no-amd`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-amd.md) | error | - | 禁止 AMD 语法 |
| [`import/no-nodejs-modules`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-nodejs-modules.md) | off | - | 关闭对 Node.js 内置模块的限制 |
| [`import/first`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md) | error | - | 确保所有导入语句在模块顶部 |
| [`import/imports-first`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/imports-first.md) | off | - | 关闭“导入必须置顶”的旧规则 |
| [`import/no-duplicates`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md) | error | - | 禁止重复导入同一模块 |
| [`import/no-namespace`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-namespace.md) | off | - | 关闭对命名空间导入的限制 |
| [`import/extensions`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md) | error | `'ignorePackages', { js: 'never', mjs: 'never', jsx: 'never' }` | 强制文件扩展名规范 |
| [`import/order`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md) | error | `{ groups: [['builtin', 'external', 'internal']] }` | 控制导入顺序和分组 |
| [`import/newline-after-import`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md) | error | - | 导入语句后需有空行 |
| [`import/prefer-default-export`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md) | error | - | 建议使用默认导出 |
| [`import/no-restricted-paths`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-restricted-paths.md) | off | - | 关闭对特定路径的限制 |
| [`import/max-dependencies`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/max-dependencies.md) | off | `{ max: 10 }` | 限制单个文件的最大依赖数 |
| [`import/no-absolute-path`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-absolute-path.md) | error | - | 禁止使用绝对路径导入 |
| [`import/no-dynamic-require`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-dynamic-require.md) | error | - | 禁止动态 `require()` 语法 |
| [`import/no-internal-modules`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-internal-modules.md) | off | `{ allow: [] }` | 禁止导入内部模块 |
| [`import/unambiguous`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/unambiguous.md) | off | - | 关闭对非 ES 模块的检测 |
| [`import/no-webpack-loader-syntax`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-webpack-loader-syntax.md) | error | - | 禁止 Webpack 特有的加载语法 |
| [`import/no-unassigned-import`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unassigned-import.md) | off | - | 禁止未赋值的导入 |
| [`import/no-named-default`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-default.md) | error | - | 禁止命名默认导出别名 |
| [`import/no-anonymous-default-export`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-anonymous-default-export.md) | off | `{ allowArray: false, ... }` | 禁止匿名默认导出 |
| [`import/exports-last`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/exports-last.md) | off | - | 确保导出语句在文件末尾 |
| [`import/group-exports`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/group-exports.md) | off | - | 强制分组导出语句 |
| [`import/no-default-export`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md) | off | - | 禁止默认导出 |
| [`import/no-named-export`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-export.md) | off | - | 禁止命名导出 |
| [`import/no-self-import`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-self-import.md) | error | - | 禁止模块导入自身 |
| [`import/no-cycle`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md) | error | `{ maxDepth: '∞' }` | 禁止模块循环依赖 |
| [`import/no-useless-path-segments`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-useless-path-segments.md) | error | `{ commonjs: true }` | 禁止冗余路径片段 |
| [`import/dynamic-import-chunkname`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/dynamic-import-chunkname.md) | off | `{ webpackChunknameFormat: '[0-9a-zA-Z-_/.]+' }` | 控制动态导入的代码块命名 |
| [`import/no-relative-parent-imports`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-relative-parent-imports.md) | off | - | 禁止相对父级目录导入 |
| [`import/no-unused-modules`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unused-modules.md) | off | `{ missingExports: true, ... }` | 检测未使用的模块 |
| [`import/no-import-module-exports`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-import-module-exports.md) | error | `{ exceptions: [] }` | 禁止混合 `import` 和 `module.exports` |
| [`import/no-relative-packages`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-relative-packages.md) | error | - | 禁止相对路径导入其他包 |

## 严格模式

以下是整理后的ESLint规则表格：

| 规则名 | 错误级别 | 配置选项 | 描述 |
|--------|----------|----------|------|
| [`strict`](https://eslint.org/docs/rules/strict) | error | `'never'` | 禁止使用`'use strict'`指令。当使用 Babel 等转译工具时，它会自动添加`'use strict'`指令 |

