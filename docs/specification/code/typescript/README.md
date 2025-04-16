---
sidebar_position: 5
---

# TypeScript 规范

```js
// .eslintrc.js

module.exports = {
  extends: [
    // ...
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
};
```

:::warning
- 截止至目前，`eslint-config-airbnb-typescript` 仍不支持 ESLint 9.x 版本，使用时请注意。使用时请使用 ESLint 8.x 版本，耐心等待 `eslint-config-airbnb-typescript` 升级。
- 由于 `eslint-config-airbnb-typescript` 需要搭配 `eslint-config-airbnb` 或 `eslint-config-airbnb-base` 使用。
- 由于 `eslint-config-airbnb-typescript` 需要搭配 `@typescript-eslint/parser` 和 `@typescript-eslint/eslint-plugin` 使用，截止目前仅支持 7.x 版本。
- 由于 `eslint-config-airbnb-typescript` 目前是只读状态，后续需要持续关注项目情况，或寻求其他替代项目。
:::

## 基础规则

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|----------|----------|----------|------|
| [`@typescript-eslint/brace-style`](https://typescript-eslint.io/rules/brace-style) | error | `["1tbs", { allowSingleLine: true }]` | 强制大括号样式使用1tbs风格，允许单行形式 |
| [`@typescript-eslint/naming-convention`](https://typescript-eslint.io/rules/naming-convention) | error | `[{selector: "variable", format: ["camelCase", "PascalCase", "UPPER_CASE"]}, {selector: "function", format: ["camelCase", "PascalCase"]}, {selector: "typeLike", format: ["PascalCase"]}]` | 强制命名约定规范 |
| [`@typescript-eslint/comma-dangle`](https://typescript-eslint.io/rules/comma-dangle) | error | `[{arrays: "always-multiline", objects: "always-multiline", imports: "always-multiline", exports: "always-multiline", functions: "always-multiline", enums: "always-multiline", generics: "always-multiline", tuples: "always-multiline"}]` | 强制在多行结构中使用尾随逗号 |
| [`@typescript-eslint/comma-spacing`](https://typescript-eslint.io/rules/comma-spacing) | error | `[{ before: false, after: true }]` | 控制逗号前后空格 |
| [`@typescript-eslint/default-param-last`](https://typescript-eslint.io/rules/default-param-last) | error | - | 强制默认参数放在最后 |
| [`@typescript-eslint/dot-notation`](https://typescript-eslint.io/rules/dot-notation) | error | `[{ allowKeywords: true }]` | 强制使用点号表示法访问属性 |
| [`@typescript-eslint/func-call-spacing`](https://typescript-eslint.io/rules/func-call-spacing) | error | `["never"]` | 禁止函数名与调用括号之间的空格 |
| [`@typescript-eslint/indent`](https://typescript-eslint.io/rules/indent) | error | `[2, { SwitchCase: 1, VariableDeclarator: 1, outerIIFEBody: 1, FunctionDeclaration: { parameters: 1, body: 1 }, FunctionExpression: { parameters: 1, body: 1 }, CallExpression: { arguments: 1 }, ArrayExpression: 1, ObjectExpression: 1, ImportDeclaration: 1, flatTernaryExpressions: false, ignoredNodes: ["JSXElement..."] }]` | 强制缩进为2个空格 |
| [`@typescript-eslint/keyword-spacing`](https://typescript-eslint.io/rules/keyword-spacing) | error | `[{ before: true, after: true, overrides: { return: { after: true }, throw: { after: true }, case: { after: true } }]` | 强制关键字周围空格一致性 |
| [`@typescript-eslint/lines-between-class-members`](https://typescript-eslint.io/rules/lines-between-class-members) | error | `["always", { exceptAfterSingleLine: false }]` | 强制类成员之间有空行 |
| [`@typescript-eslint/no-array-constructor`](https://typescript-eslint.io/rules/no-array-constructor) | error | - | 禁止使用Array构造函数 |
| [`@typescript-eslint/no-dupe-class-members`](https://typescript-eslint.io/rules/no-dupe-class-members) | error | - | 禁止重复类成员 |
| [`@typescript-eslint/no-empty-function`](https://typescript-eslint.io/rules/no-empty-function) | error | `[{ allow: ["arrowFunctions", "functions", "methods"] }]` | 禁止空函数 |
| [`@typescript-eslint/no-extra-semi`](https://typescript-eslint.io/rules/no-extra-semi) | error | - | 禁止不必要的分号 |
| [`@typescript-eslint/no-implied-eval`](https://typescript-eslint.io/rules/no-implied-eval) | error | - | 禁止隐式eval用法 |
| [`@typescript-eslint/no-loss-of-precision`](https://typescript-eslint.io/rules/no-loss-of-precision) | error | - | 禁止精度丢失的数字字面量 |
| [`@typescript-eslint/no-loop-func`](https://typescript-eslint.io/rules/no-loop-func) | error | - | 禁止在循环中创建函数 |
| [`@typescript-eslint/no-redeclare`](https://typescript-eslint.io/rules/no-redeclare) | error | - | 禁止重复声明变量 |
| [`@typescript-eslint/no-shadow`](https://typescript-eslint.io/rules/no-shadow) | error | - | 禁止变量声明覆盖外层作用域 |
| [`@typescript-eslint/space-before-blocks`](https://typescript-eslint.io/rules/space-before-blocks) | error | - | 强制块之前的空格 |
| [`@typescript-eslint/no-throw-literal`](https://typescript-eslint.io/rules/no-throw-literal) | error | - | 禁止抛出非Error对象 |
| [`@typescript-eslint/no-unused-expressions`](https://typescript-eslint.io/rules/no-unused-expressions) | error | `[{ allowShortCircuit: false, allowTernary: false, allowTaggedTemplates: false }]` | 禁止未使用的表达式 |
| [`@typescript-eslint/no-unused-vars`](https://typescript-eslint.io/rules/no-unused-vars) | error | `[{ vars: "all", args: "after-used", ignoreRestSiblings: true }]` | 禁止未使用的变量 |
| [`@typescript-eslint/no-use-before-define`](https://typescript-eslint.io/rules/no-use-before-define) | error | `[{ functions: true, classes: true, variables: true }]` | 禁止在定义前使用 |
| [`@typescript-eslint/no-useless-constructor`](https://typescript-eslint.io/rules/no-useless-constructor) | error | - | 禁止不必要的构造函数 |
| [`@typescript-eslint/quotes`](https://typescript-eslint.io/rules/quotes) | error | `["single", { avoidEscape: true }]` | 强制使用单引号 |
| [`@typescript-eslint/semi`](https://typescript-eslint.io/rules/semi) | error | `["always"]` | 强制使用分号 |
| [`@typescript-eslint/space-before-function-paren`](https://typescript-eslint.io/rules/space-before-function-paren) | error | `[{ anonymous: "always", named: "never", asyncArrow: "always" }]` | 强制函数括号前的空格 |
| [`@typescript-eslint/return-await`](https://typescript-eslint.io/rules/return-await) | error | `["in-try-catch"]` | 强制在try-catch中使用return await |
| [`@typescript-eslint/space-infix-ops`](https://typescript-eslint.io/rules/space-infix-ops) | error | - | 强制操作符周围空格 |
| [`@typescript-eslint/object-curly-spacing`](https://typescript-eslint.io/rules/object-curly-spacing) | error | `["always"]` | 强制对象大括号内空格 |
| [`import/extensions`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md) | error | `["ignorePackages", { js: "never", mjs: "never", jsx: "never", ts: "never", tsx: "never" }]` | 禁止文件扩展名在导入语句中使用 |
| [`import/no-extraneous-dependencies`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md) | error | `[{ devDependencies: [...] }]` | 禁止无关的依赖引入 |

### 原生 ESLint 规则覆盖说明

以下 ESLint 规则，已被 `@typescript-eslint` 替代：

| 规则名称 | 错误级别 | 说明 |
|---------|---------|------|
| `brace-style` | off | 被 `@typescript-eslint/brace-style` 替代 |
| `camelcase` | off | 被 `@typescript-eslint/naming-convention` 替代 |
| `comma-dangle` | off | 被 `@typescript-eslint/comma-dangle` 替代 |
| `comma-spacing` | off | 被 `@typescript-eslint/comma-spacing` 替代 |
| `default-param-last` | off | 被 `@typescript-eslint/default-param-last` 替代 |
| `dot-notation` | off | 被 `@typescript-eslint/dot-notation` 替代 |
| `func-call-spacing` | off | 被 `@typescript-eslint/func-call-spacing` 替代 |
| `indent` | off | 被 `@typescript-eslint/indent` 替代 |
| `keyword-spacing` | off | 被 `@typescript-eslint/keyword-spacing` 替代 |
| `lines-between-class-members` | off | 被 `@typescript-eslint/lines-between-class-members` 替代 |
| `no-array-constructor` | off | 被 `@typescript-eslint/no-array-constructor` 替代 |
| `no-dupe-class-members` | off | 被 `@typescript-eslint/no-dupe-class-members` 替代 |
| `no-empty-function` | off | 被 `@typescript-eslint/no-empty-function` 替代 |
| `no-extra-parens` | off | 被 `@typescript-eslint/no-extra-parens` 替代 |
| `no-extra-semi` | off | 被 `@typescript-eslint/no-extra-semi` 替代 |
| `no-implied-eval` | off | 被 `@typescript-eslint/no-implied-eval` 替代 |
| `no-new-func` | off | 被 `@typescript-eslint/no-implied-eval` 替代 |
| `no-loss-of-precision` | off | 被 `@typescript-eslint/no-loss-of-precision` 替代 |
| `no-loop-func` | off | 被 `@typescript-eslint/no-loop-func` 替代 |
| `no-magic-numbers` | off | 被 `@typescript-eslint/no-magic-numbers` 替代 |
| `no-redeclare` | off | 被 `@typescript-eslint/no-redeclare` 替代 |
| `no-shadow` | off | 被 `@typescript-eslint/no-shadow` 替代 |
| `space-before-blocks` | off | 被 `@typescript-eslint/space-before-blocks` 替代 |
| `no-throw-literal` | off | 被 `@typescript-eslint/no-throw-literal` 替代 |
| `no-unused-expressions` | off | 被 `@typescript-eslint/no-unused-expressions` 替代 |
| `no-unused-vars` | off | 被 `@typescript-eslint/no-unused-vars` 替代 |
| `no-use-before-define` | off | 被 `@typescript-eslint/no-use-before-define` 替代 |
| `no-useless-constructor` | off | 被 `@typescript-eslint/no-useless-constructor` 替代 |
| `quotes` | off | 被 `@typescript-eslint/quotes` 替代 |
| `semi` | off | 被 `@typescript-eslint/semi` 替代 |
| `space-before-function-paren` | off | 被 `@typescript-eslint/space-before-function-paren` 替代 |
| `require-await` | off | 被 `@typescript-eslint/require-await` 替代 |
| `no-return-await` | off | 被 `@typescript-eslint/return-await` 替代 |
| `space-infix-ops` | off | 被 `@typescript-eslint/space-infix-ops` 替代 |
| `object-curly-spacing` | off | 被 `@typescript-eslint/object-curly-spacing` 替代 |

以下 ESLint 规则，在 `*.ts` / `*.tsx` 已被关闭：

| 规则名称 | 错误级别 | 描述 |
|----------|----------|------|
| [`constructor-super`](https://eslint.org/docs/latest/rules/constructor-super) | off | 禁用构造函数中 `super()` 调用检查（由 TypeScript 编译器处理） |
| [`getter-return`](https://eslint.org/docs/latest/rules/getter-return) | off | 禁用 Getter 返回值检查（TS 类型系统已覆盖） |
| [`no-const-assign`](https://eslint.org/docs/latest/rules/no-const-assign) | off | 禁用 `const` 变量重新赋值检查（TS 编译器直接报错） |
| [`no-dupe-args`](https://eslint.org/docs/latest/rules/no-dupe-args) | off | 禁用函数参数重复检查（TS 类型系统已覆盖） |
| [`no-dupe-class-members`](https://eslint.org/docs/latest/rules/no-dupe-class-members) | off | 禁用类成员重复检查（由 `@typescript-eslint/no-dupe-class-members` 替代） |
| [`no-dupe-keys`](https://eslint.org/docs/latest/rules/no-dupe-keys) | off | 禁用对象属性重复检查（TS 类型系统已覆盖） |
| [`no-func-assign`](https://eslint.org/docs/latest/rules/no-func-assign) | off | 禁用函数重新赋值检查（TS 编译器直接报错） |
| [`no-import-assign`](https://eslint.org/docs/latest/rules/no-import-assign) | off | 禁用 `import` 导入值重新赋值检查（TS 类型系统已限制） |
| [`no-new-symbol`](https://eslint.org/docs/latest/rules/no-new-symbol) | off | 禁用 `Symbol` 构造函数检查（TS 类型系统已覆盖） |
| [`no-obj-calls`](https://eslint.org/docs/latest/rules/no-obj-calls) | off | 禁用全局对象函数调用检查（如 `Math()`，TS 编译器报错） |
| [`no-redeclare`](https://eslint.org/docs/latest/rules/no-redeclare) | off | 禁用变量重复声明检查（由 `@typescript-eslint/no-redeclare` 替代） |
| [`no-setter-return`](https://eslint.org/docs/latest/rules/no-setter-return) | off | 禁用 Setter 返回值检查（TS 类型系统已覆盖） |
| [`no-this-before-super`](https://eslint.org/docs/latest/rules/no-this-before-super) | off | 禁用 `super()` 前使用 `this` 检查（TS 编译器直接报错） |
| [`no-undef`](https://eslint.org/docs/latest/rules/no-undef) | off | 禁用未定义变量检查（TS 类型系统替代此功能） |
| [`no-unreachable`](https://eslint.org/docs/latest/rules/no-unreachable) | off | 禁用不可达代码检查（TS 编译器直接报错） |
| [`no-unsafe-negation`](https://eslint.org/docs/latest/rules/no-unsafe-negation) | off | 禁用不安全取反操作检查（TS 类型系统已覆盖） |
| [`valid-typeof`](https://eslint.org/docs/latest/rules/valid-typeof) | off | 禁用 `typeof` 校验（TS 类型系统替代此功能） |
| [`import/named`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/named.md) | off | 禁用具名导入校验（TS 类型系统已覆盖） |
| [`import/no-named-as-default-member`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-as-default-member.md) | off | 禁用默认导入成员的校验（TS 类型系统处理更精确） |
| [`import/no-unresolved`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md) | off | 禁用模块路径解析校验（由 TS 编译器处理） |

## recommended-type-checked

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|---------|---------|---------|------|
| [`@typescript-eslint/await-thenable`](https://typescript-eslint.io/rules/await-thenable) | error | - | 禁止对非 Promise（thenable）值使用 `await` |
| [`@typescript-eslint/ban-ts-comment`](https://typescript-eslint.io/rules/ban-ts-comment) | error | 默认配置 | 禁止使用 `@ts-<directive>` 注释 |
| [`@typescript-eslint/ban-types`](https://typescript-eslint.io/rules/ban-types) | error | 默认配置 | 禁止使用特定 TypeScript 类型（如 `Object`、`String` 等） |
| [`no-array-constructor`](https://eslint.org/docs/latest/rules/no-array-constructor) | off | - | 原生 ESLint 规则：禁止使用 `Array` 构造函数 |
| [`@typescript-eslint/no-array-constructor`](https://typescript-eslint.io/rules/no-array-constructor) | error | - | TypeScript 版本：禁止使用 `Array` 构造函数 |
| [`@typescript-eslint/no-base-to-string`](https://typescript-eslint.io/rules/no-base-to-string) | error | - | 强制要求对象必须实现有效的 `toString()` 方法 |
| [`@typescript-eslint/no-duplicate-enum-values`](https://typescript-eslint.io/rules/no-duplicate-enum-values) | error | - | 禁止枚举成员有重复值 |
| [`@typescript-eslint/no-duplicate-type-constituents`](https://typescript-eslint.io/rules/no-duplicate-type-constituents) | error | - | 禁止类型中出现重复的组成部分（如联合类型中的重复子类型） |
| [`@typescript-eslint/no-explicit-any`](https://typescript-eslint.io/rules/no-explicit-any) | error | - | 禁止显式使用 `any` 类型 |
| [`@typescript-eslint/no-extra-non-null-assertion`](https://typescript-eslint.io/rules/no-extra-non-null-assertion) | error | - | 禁止不必要的非空断言（如 `!!` 或连续 `!`） |
| [`@typescript-eslint/no-floating-promises`](https://typescript-eslint.io/rules/no-floating-promises) | error | - | 禁止未处理的 Promise（需显式处理或 `await`） |
| [`@typescript-eslint/no-for-in-array`](https://typescript-eslint.io/rules/no-for-in-array) | error | - | 禁止对数组使用 `for-in` 循环（建议用 `for-of`） |
| [`no-implied-eval`](https://eslint.org/docs/latest/rules/no-implied-eval) | off | - | 原生 ESLint 规则：禁止隐式 eval（如 `setTimeout('code')`） |
| [`@typescript-eslint/no-implied-eval`](https://typescript-eslint.io/rules/no-implied-eval) | error | - | TypeScript 版本：禁止隐式 eval |
| [`no-loss-of-precision`](https://eslint.org/docs/latest/rules/no-loss-of-precision) | off | - | 原生 ESLint 规则：禁止数字精度丢失 |
| [`@typescript-eslint/no-loss-of-precision`](https://typescript-eslint.io/rules/no-loss-of-precision) | error | - | TypeScript 版本：禁止数字精度丢失 |
| [`@typescript-eslint/no-misused-new`](https://typescript-eslint.io/rules/no-misused-new) | error | - | 禁止误用 `new` 操作符（如接口定义中的构造函数） |
| [`@typescript-eslint/no-misused-promises`](https://typescript-eslint.io/rules/no-misused-promises) | error | - | 禁止在非 Promise 上下文中使用 Promise（如 `if (promise)`） |
| [`@typescript-eslint/no-namespace`](https://typescript-eslint.io/rules/no-namespace) | error | - | 禁止使用 TypeScript 的命名空间（`namespace`） |
| [`@typescript-eslint/no-non-null-asserted-optional-chain`](https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain) | error | - | 禁止在可选链后使用非空断言（如 `obj?.prop!`） |
| [`@typescript-eslint/no-redundant-type-constituents`](https://typescript-eslint.io/rules/no-redundant-type-constituents) | error | - | 禁止类型中出现冗余的组成部分（如联合类型中的 `string \| string`） |
| [`@typescript-eslint/no-this-alias`](https://typescript-eslint.io/rules/no-this-alias) | error | - | 禁止将 `this` 赋值给变量（需使用箭头函数或类属性） |
| [`@typescript-eslint/no-unnecessary-type-assertion`](https://typescript-eslint.io/rules/no-unnecessary-type-assertion) | error | - | 禁止不必要的类型断言（如 `x as number` 当类型已明确时） |
| [`@typescript-eslint/no-unnecessary-type-constraint`](https://typescript-eslint.io/rules/no-unnecessary-type-constraint) | error | - | 禁止泛型约束中的不必要类型（如 `<T extends unknown>`） |
| [`@typescript-eslint/no-unsafe-argument`](https://typescript-eslint.io/rules/no-unsafe-argument) | error | - | 禁止将不安全的值（如 `any`）作为函数参数传递 |
| [`@typescript-eslint/no-unsafe-assignment`](https://typescript-eslint.io/rules/no-unsafe-assignment) | error | - | 禁止将不安全的值（如 `any`）赋值给变量 |
| [`@typescript-eslint/no-unsafe-call`](https://typescript-eslint.io/rules/no-unsafe-call) | error | - | 禁止调用类型不安全的函数（如 `any` 类型的函数） |
| [`@typescript-eslint/no-unsafe-declaration-merging`](https://typescript-eslint.io/rules/no-unsafe-declaration-merging) | error | - | 禁止不安全的声明合并（如接口与类合并导致类型冲突） |
| [`@typescript-eslint/no-unsafe-enum-comparison`](https://typescript-eslint.io/rules/no-unsafe-enum-comparison) | error | - | 禁止枚举与非枚举值的比较（避免类型错误） |
| [`@typescript-eslint/no-unsafe-member-access`](https://typescript-eslint.io/rules/no-unsafe-member-access) | error | - | 禁止访问 `any` 类型对象的成员（需明确类型） |
| [`@typescript-eslint/no-unsafe-return`](https://typescript-eslint.io/rules/no-unsafe-return) | error | - | 禁止返回 `any` 类型或未知类型的值 |
| [`no-unused-vars`](https://eslint.org/docs/latest/rules/no-unused-vars) | off | - | 原生 ESLint 规则：禁止未使用的变量 |
| [`@typescript-eslint/no-unused-vars`](https://typescript-eslint.io/rules/no-unused-vars) | error | - | TypeScript 版本：禁止未使用的变量 |
| [`@typescript-eslint/no-var-requires`](https://typescript-eslint.io/rules/no-var-requires) | error | - | 禁止使用 `require()` 导入（需用 ES6 `import`） |
| [`@typescript-eslint/prefer-as-const`](https://typescript-eslint.io/rules/prefer-as-const) | error | - | 强制使用 `as const` 替代类型断言（保留字面量类型） |
| [`require-await`](https://eslint.org/docs/latest/rules/require-await) | off | - | 原生 ESLint 规则：要求异步函数内有 `await` |
| [`@typescript-eslint/require-await`](https://typescript-eslint.io/rules/require-await) | error | - | TypeScript 版本：要求异步函数内有 `await` |
| [`@typescript-eslint/restrict-plus-operands`](https://typescript-eslint.io/rules/restrict-plus-operands) | error | - | 限制 `+` 操作符的操作数类型（必须为数字或字符串） |
| [`@typescript-eslint/restrict-template-expressions`](https://typescript-eslint.io/rules/restrict-template-expressions) | error | - | 限制模板字符串中的表达式类型（需可安全转换为字符串） |
| [`@typescript-eslint/triple-slash-reference`](https://typescript-eslint.io/rules/triple-slash-reference) | error | - | 禁止使用三斜线引用指令（`/// <reference />`） |
| [`@typescript-eslint/unbound-method`](https://typescript-eslint.io/rules/unbound-method) | error | - | 禁止未绑定的方法调用（需先绑定 `this` 上下文） |

## stylistic-type-checked

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|---------|---------|---------|------|
| [`@typescript-eslint/await-thenable`](https://typescript-eslint.io/rules/await-thenable) | error | - | 禁止 `await` 非 Promise 的值 |
| [`@typescript-eslint/ban-ts-comment`](https://typescript-eslint.io/rules/ban-ts-comment) | error | `{ minimumDescriptionLength: 10 }` | 禁止使用 TypeScript 注释指令（如 `@ts-ignore`） |
| [`@typescript-eslint/ban-types`](https://typescript-eslint.io/rules/ban-types) | error | - | 禁止使用特定危险类型（如 `Object`/`{}`） |
| [`@typescript-eslint/no-array-constructor`](https://typescript-eslint.io/rules/no-array-constructor) | error | - | 禁止使用 `Array` 构造函数 |
| [`@typescript-eslint/no-array-delete`](https://typescript-eslint.io/rules/no-array-delete) | error | - | 禁止使用 `delete` 操作符删除数组元素 |
| [`@typescript-eslint/no-base-to-string`](https://typescript-eslint.io/rules/no-base-to-string) | error | - | 强制对象必须有有意义的 `toString()` 方法 |
| [`@typescript-eslint/no-confusing-void-expression`](https://typescript-eslint.io/rules/no-confusing-void-expression) | error | - | 禁止在返回 `void` 的地方误用表达式 |
| [`@typescript-eslint/no-duplicate-enum-values`](https://typescript-eslint.io/rules/no-duplicate-enum-values) | error | - | 禁止枚举成员有重复值 |
| [`@typescript-eslint/no-duplicate-type-constituents`](https://typescript-eslint.io/rules/no-duplicate-type-constituents) | error | - | 禁止类型中出现重复的组成部分 |
| [`@typescript-eslint/no-dynamic-delete`](https://typescript-eslint.io/rules/no-dynamic-delete) | error | - | 禁止使用动态计算的键进行 `delete` 操作 |
| [`@typescript-eslint/no-explicit-any`](https://typescript-eslint.io/rules/no-explicit-any) | error | - | 禁止显式使用 `any` 类型 |
| [`@typescript-eslint/no-extra-non-null-assertion`](https://typescript-eslint.io/rules/no-extra-non-null-assertion) | error | - | 禁止多余的非空断言（`!!`） |
| [`@typescript-eslint/no-extraneous-class`](https://typescript-eslint.io/rules/no-extraneous-class) | error | - | 禁止冗余的类定义 |
| [`@typescript-eslint/no-floating-promises`](https://typescript-eslint.io/rules/no-floating-promises) | error | - | 禁止未处理的 Promise |
| [`@typescript-eslint/no-for-in-array`](https://typescript-eslint.io/rules/no-for-in-array) | error | - | 禁止在数组上使用 `for-in` 循环 |
| [`@typescript-eslint/no-implied-eval`](https://typescript-eslint.io/rules/no-implied-eval) | error | - | 禁止隐式的 `eval()` 用法 |
| [`@typescript-eslint/no-invalid-void-type`](https://typescript-eslint.io/rules/no-invalid-void-type) | error | - | 禁止无效的 `void` 类型使用 |
| [`@typescript-eslint/no-loss-of-precision`](https://typescript-eslint.io/rules/no-loss-of-precision) | error | - | 禁止数字字面量精度丢失 |
| [`@typescript-eslint/no-meaningless-void-operator`](https://typescript-eslint.io/rules/no-meaningless-void-operator) | error | - | 禁止无意义的 `void` 操作符 |
| [`@typescript-eslint/no-misused-new`](https://typescript-eslint.io/rules/no-misused-new) | error | - | 禁止误用 `new` 关键字 |
| [`@typescript-eslint/no-misused-promises`](https://typescript-eslint.io/rules/no-misused-promises) | error | - | 禁止误用 Promise |
| [`@typescript-eslint/no-mixed-enums`](https://typescript-eslint.io/rules/no-mixed-enums) | error | - | 禁止混合类型的枚举成员 |
| [`@typescript-eslint/no-namespace`](https://typescript-eslint.io/rules/no-namespace) | error | - | 禁止使用 `namespace` 自定义模块 |
| [`@typescript-eslint/no-non-null-asserted-nullish-coalescing`](https://typescript-eslint.io/rules/no-non-null-asserted-nullish-coalescing) | error | - | 禁止在空值合并操作符后使用非空断言 |
| [`@typescript-eslint/no-non-null-asserted-optional-chain`](https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain) | error | - | 禁止在可选链后使用非空断言 |
| [`@typescript-eslint/no-non-null-assertion`](https://typescript-eslint.io/rules/no-non-null-assertion) | error | - | 禁止非空断言（`!`） |
| [`@typescript-eslint/no-redundant-type-constituents`](https://typescript-eslint.io/rules/no-redundant-type-constituents) | error | - | 禁止类型中的冗余组成部分 |
| [`@typescript-eslint/no-this-alias`](https://typescript-eslint.io/rules/no-this-alias) | error | - | 禁止将 `this` 赋值给变量 |
| [`@typescript-eslint/no-unnecessary-boolean-literal-compare`](https://typescript-eslint.io/rules/no-unnecessary-boolean-literal-compare) | error | - | 禁止不必要的布尔字面量比较 |
| [`@typescript-eslint/no-unnecessary-condition`](https://typescript-eslint.io/rules/no-unnecessary-condition) | error | - | 禁止不必要的条件判断 |
| [`@typescript-eslint/no-unnecessary-template-expression`](https://typescript-eslint.io/rules/no-unnecessary-template-expression) | error | - | 禁止模板字符串中的冗余表达式 |
| [`@typescript-eslint/no-unnecessary-type-arguments`](https://typescript-eslint.io/rules/no-unnecessary-type-arguments) | error | - | 禁止不必要的泛型类型参数 |
| [`@typescript-eslint/no-unnecessary-type-assertion`](https://typescript-eslint.io/rules/no-unnecessary-type-assertion) | error | - | 禁止不必要的类型断言 |
| [`@typescript-eslint/no-unnecessary-type-constraint`](https://typescript-eslint.io/rules/no-unnecessary-type-constraint) | error | - | 禁止不必要的类型约束 |
| [`@typescript-eslint/no-unsafe-argument`](https://typescript-eslint.io/rules/no-unsafe-argument) | error | - | 禁止不安全的函数参数传递 |
| [`@typescript-eslint/no-unsafe-assignment`](https://typescript-eslint.io/rules/no-unsafe-assignment) | error | - | 禁止不安全的变量赋值 |
| [`@typescript-eslint/no-unsafe-call`](https://typescript-eslint.io/rules/no-unsafe-call) | error | - | 禁止不安全的函数调用 |
| [`@typescript-eslint/no-unsafe-declaration-merging`](https://typescript-eslint.io/rules/no-unsafe-declaration-merging) | error | - | 禁止不安全的声明合并 |
| [`@typescript-eslint/no-unsafe-enum-comparison`](https://typescript-eslint.io/rules/no-unsafe-enum-comparison) | error | - | 禁止不安全的枚举比较 |
| [`@typescript-eslint/no-unsafe-member-access`](https://typescript-eslint.io/rules/no-unsafe-member-access) | error | - | 禁止不安全的成员访问 |
| [`@typescript-eslint/no-unsafe-return`](https://typescript-eslint.io/rules/no-unsafe-return) | error | - | 禁止不安全的返回值 |
| [`@typescript-eslint/no-unused-vars`](https://typescript-eslint.io/rules/no-unused-vars) | error | - | 禁止未使用的变量 |
| [`@typescript-eslint/no-useless-constructor`](https://typescript-eslint.io/rules/no-useless-constructor) | error | - | 禁止冗余的构造函数 |
| [`@typescript-eslint/no-var-requires`](https://typescript-eslint.io/rules/no-var-requires) | error | - | 禁止使用 `require()` 导入模块 |
| [`@typescript-eslint/only-throw-error`](https://typescript-eslint.io/rules/only-throw-error) | error | - | 强制 `throw` 必须是 `Error` 实例 |
| [`@typescript-eslint/prefer-as-const`](https://typescript-eslint.io/rules/prefer-as-const) | error | - | 推荐使用 `as const` 断言字面量类型 |
| [`@typescript-eslint/prefer-includes`](https://typescript-eslint.io/rules/prefer-includes) | error | - | 推荐使用 `.includes()` 替代 `indexOf` 检查存在性 |
| [`@typescript-eslint/prefer-literal-enum-member`](https://typescript-eslint.io/rules/prefer-literal-enum-member) | error | - | 推荐枚举成员使用字面量值 |
| [`@typescript-eslint/prefer-promise-reject-errors`](https://typescript-eslint.io/rules/prefer-promise-reject-errors) | error | - | 推荐 `Promise.reject()` 必须使用 `Error` 实例 |
| [`@typescript-eslint/prefer-reduce-type-parameter`](https://typescript-eslint.io/rules/prefer-reduce-type-parameter) | error | - | 推荐使用 `Array.reduce` 的类型参数 |
| [`@typescript-eslint/prefer-return-this-type`](https://typescript-eslint.io/rules/prefer-return-this-type) | error | - | 推荐方法返回 `this` 类型 |
| [`@typescript-eslint/require-await`](https://typescript-eslint.io/rules/require-await) | error | - | 强制异步函数必须有 `await` |
| [`@typescript-eslint/restrict-plus-operands`](https://typescript-eslint.io/rules/restrict-plus-operands) | error | `{ allowAny: false, allowBoolean: false, allowNullish: false, allowNumberAndString: false, allowRegExp: false }` | 限制 `+` 操作符的操作数类型 |
| [`@typescript-eslint/restrict-template-expressions`](https://typescript-eslint.io/rules/restrict-template-expressions) | error | `{ allowAny: false, allowBoolean: false, allowNullish: false, allowNumber: false, allowRegExp: false, allowNever: false }` | 限制模板字符串中的表达式类型 |
| [`@typescript-eslint/triple-slash-reference`](https://typescript-eslint.io/rules/triple-slash-reference) | error | - | 禁止使用三斜线引用指令 |
| [`@typescript-eslint/unbound-method`](https://typescript-eslint.io/rules/unbound-method) | error | - | 禁止未绑定的方法调用 |
| [`@typescript-eslint/unified-signatures`](https://typescript-eslint.io/rules/unified-signatures) | error | - | 强制合并重载函数签名 |
| [`@typescript-eslint/use-unknown-in-catch-callback-variable`](https://typescript-eslint.io/rules/use-unknown-in-catch-callback-variable) | error | - | 强制 `catch` 变量类型为 `unknown` |

### 原生 ESLint 规则覆盖说明

以下 ESLint 规则，已被 `@typescript-eslint` 替代：

| 规则名称 | 错误级别 | 说明 |
|---------|---------|------|
| `no-array-constructor` | off | 被 `@typescript-eslint/no-array-constructor` 替代 |
| `no-implied-eval` | off | 被 `@typescript-eslint/no-implied-eval` 替代 |
| `no-loss-of-precision` | off | 被 `@typescript-eslint/no-loss-of-precision` 替代 |
| `no-throw-literal` | off | 被 `@typescript-eslint/only-throw-error` 替代 |
| `no-unused-vars` | off | 被 `@typescript-eslint/no-unused-vars` 替代 |
| `no-useless-constructor` | off | 被 `@typescript-eslint/no-useless-constructor` 替代 |
| `prefer-promise-reject-errors` | off | 被 `@typescript-eslint/prefer-promise-reject-errors` 替代 |
| `require-await` | off | 被 `@typescript-eslint/require-await` 替代 |
