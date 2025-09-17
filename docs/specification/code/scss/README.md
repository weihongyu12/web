---
sidebar_position: 3
---

# SCSS 规范

:::warning
stylelint 规则参考 `stylelint-config-twbs-bootstrap`，但是由于需要整理的内容非常多，在开发过程中，仍以实际的 stylelint 检查为准。本章内容仅供参考
:::

## 规则一览

:::tip
SCSS 的 stylelint 规则继承于 [CSS 规则](/docs/specification/code/css)
:::

:::danger
使用 `.scss` 语法，永远不要使用原始的 `.sass` 语法！
:::

| 来源 | 规则名称 | 配置值 | 描述 |
|------|----------|---------|------|
| stylelint-config-recommended-scss | [annotation-no-unknown](https://stylelint.io/user-guide/rules/annotation-no-unknown) | `null` | 禁止未知的注解 |
| stylelint-config-recommended-scss | [at-rule-no-unknown](https://stylelint.io/user-guide/rules/at-rule-no-unknown) | `null` | 禁止未知的 at 规则 |
| stylelint-config-recommended-scss | [comment-no-empty](https://stylelint.io/user-guide/rules/comment-no-empty) | `null` | 禁止空注释 |
| stylelint-config-recommended-scss | [function-no-unknown](https://stylelint.io/user-guide/rules/function-no-unknown) | `null` | 禁止未知的函数 |
| stylelint-config-recommended-scss | [media-query-no-invalid](https://stylelint.io/user-guide/rules/media-query-no-invalid) | `null` | 禁止无效的媒体查询 |
| stylelint-config-recommended-scss | [scss/at-rule-no-unknown](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-rule-no-unknown/README.md) | `true` | 禁止未知的 SCSS at 规则 |
| stylelint-config-recommended-scss | [scss/declaration-nested-properties-no-divided-groups](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/declaration-nested-properties-no-divided-groups/README.md) | `true` | 禁止嵌套属性被分成多个组 |
| stylelint-config-recommended-scss | [scss/dollar-variable-no-missing-interpolation](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-no-missing-interpolation/README.md) | `true` | 禁止缺少插值的美元变量 |
| stylelint-config-recommended-scss | [scss/function-unquote-no-unquoted-strings-inside](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/function-unquote-no-unquoted-strings-inside/README.md) | `true` | 在 unquote 函数中禁止未引号的字符串 inside |
| stylelint-config-recommended-scss | [scss/load-no-partial-leading-underscore](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/load-no-partial-leading-underscore/README.md) | `true` | 禁止加载带有前导下划线的部分文件 |
| stylelint-config-recommended-scss | [scss/load-partial-extension](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/load-partial-extension/README.md) | `'never'` | 禁止部分文件扩展名 |
| stylelint-config-recommended-scss | [scss/no-duplicate-mixins](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/no-duplicate-mixins/README.md) | `true` | 禁止重复的 mixin |
| stylelint-config-recommended-scss | [scss/operator-no-newline-after](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/operator-no-newline-after/README.md) | `true` | 禁止操作符后换行 |
| stylelint-config-recommended-scss | [scss/operator-no-newline-before](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/operator-no-newline-before/README.md) | `true` | 禁止操作符前换行 |
| stylelint-config-recommended-scss | [scss/operator-no-unspaced](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/operator-no-unspaced/README.md) | `true` | 禁止操作符没有空格 |
| stylelint-config-standard-scss | [at-rule-empty-line-before](https://stylelint.io/user-guide/rules/at-rule-empty-line-before) | `["always", {"except": ["blockless-after-blockless", "first-nested"], "ignore": ["after-comment"], "ignoreAtRules": ["else"]}]` | at 规则前需要空行 |
| stylelint-config-standard-scss | [import-notation](https://stylelint.io/user-guide/rules/import-notation) | `'string'` | 导入 notation 使用字符串 |
| stylelint-config-standard-scss | [scss/at-else-closing-brace-newline-after](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-else-closing-brace-newline-after/README.md) | `'always-last-in-chain'` | else 关闭括号后换行 |
| stylelint-config-standard-scss | [scss/at-else-closing-brace-space-after](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-else-closing-brace-space-after/README.md) | `'always-intermediate'` | else 关闭括号后空格 |
| stylelint-config-standard-scss | [scss/at-else-empty-line-before](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-else-empty-line-before/README.md) | `'never'` | else 前禁止空行 |
| stylelint-config-standard-scss | [scss/at-else-if-parentheses-space-before](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-else-if-parentheses-space-before/README.md) | `'always'` | else if 括号前空格 |
| stylelint-config-standard-scss | [scss/at-function-parentheses-space-before](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-function-parentheses-space-before/README.md) | `'never'` | 函数括号前禁止空格 |
| stylelint-config-standard-scss | [scss/at-function-pattern](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-function-pattern/README.md) | `["^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$"]` | 函数名称模式 |
| stylelint-config-standard-scss | [scss/at-mixin-parentheses-space-before](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-mixin-parentheses-space-before/README.md) | `'never'` | mixin 括号前禁止空格 |
| stylelint-config-standard-scss | [scss/dollar-variable-colon-space-before](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-colon-space-before/README.md) | `'never'` | 美元变量冒号前禁止空格 |
| stylelint-config-standard-scss | [scss/dollar-variable-pattern](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-pattern/README.md) | `["^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$"]` | 美元变量名称模式 |
| stylelint-config-standard-scss | [scss/percent-placeholder-pattern](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/percent-placeholder-pattern/README.md) | `["^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$"]` | 占位符模式 |
| stylelint-config-twbs-bootstrap | [no-invalid-position-at-import-rule](https://stylelint.io/user-guide/rules/no-invalid-position-at-import-rule) | `null` | 禁止无效位置的 @import 规则 |
| stylelint-config-twbs-bootstrap | [scss/at-extend-no-missing-placeholder](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-extend-no-missing-placeholder/README.md) | `null` | 禁止 extend 缺少占位符 |
| stylelint-config-twbs-bootstrap | [scss/at-function-named-arguments](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-function-named-arguments/README.md) | `'never'` | 禁止函数使用命名参数 |
| stylelint-config-twbs-bootstrap | [scss/at-if-closing-brace-newline-after](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-if-closing-brace-newline-after/README.md) | `null` | if 关闭括号后换行 |
| stylelint-config-twbs-bootstrap | [scss/at-if-closing-brace-space-after](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-if-closing-brace-space-after/README.md) | `null` | if 关闭括号后空格 |
| stylelint-config-twbs-bootstrap | [scss/at-if-no-null](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-if-no-null/README.md) | `null` | 禁止 if 中使用 null |
| stylelint-config-twbs-bootstrap | [scss/at-mixin-argumentless-call-parentheses](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-mixin-argumentless-call-parentheses/README.md) | `'always'` | 无参数 mixin 调用时需要括号 |
| stylelint-config-twbs-bootstrap | [scss/at-mixin-pattern](https://github/stylelint-scss/stylelint-scss/blob/master/src/rules/at-mixin-pattern/README.md) | `null` | mixin 名称模式 |
| stylelint-config-twbs-bootstrap | [scss/at-rule-conditional-no-parentheses](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/at-rule-conditional-no-parentheses/README.md) | `null` | 条件 at 规则禁止括号 |
| stylelint-config-twbs-bootstrap | [scss/comment-no-empty](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/comment-no-empty/README.md) | `null` | 禁止空注释 |
| stylelint-config-twbs-bootstrap | [scss/dimension-no-non-numeric-values](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dimension-no-non-numeric-values/README.md) | `true` | 禁止尺寸使用非数字值 |
| stylelint-config-twbs-bootstrap | [scss/dollar-variable-colon-space-after](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-colon-space-after/README.md) | `'at-least-one-space'` | 美元变量冒号后至少一个空格 |
| stylelint-config-twbs-bootstrap | [scss/dollar-variable-empty-line-before](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/dollar-variable-empty-line-before/README.md) | `null` | 美元变量前空行 |
| stylelint-config-twbs-bootstrap | [scss/double-slash-comment-empty-line-before](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/double-slash-comment-empty-line-before/README.md) | `null` | 双斜杠注释前空行 |
| stylelint-config-twbs-bootstrap | [scss/double-slash-comment-whitespace-inside](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/double-slash-comment-whitespace-inside/README.md) | `null` | 双斜杠注释内部空格 |
| stylelint-config-twbs-bootstrap | [scss/function-quote-no-quoted-strings-inside](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/function-quote-no-quoted-strings-inside/README.md) | `null` | 在 quote 函数中禁止引号字符串 inside |
| stylelint-config-twbs-bootstrap | [scss/media-feature-value-dollar-variable](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/media-feature-value-dollar-variable/README.md) | `null` | 媒体特征值使用美元变量 |
| stylelint-config-twbs-bootstrap | [scss/no-global-function-names](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/no-global-function-names/README.md) | `null` | 禁止全局函数名 |
| stylelint-config-twbs-bootstrap | [scss/selector-no-redundant-nesting-selector](https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/selector-no-redundant-nesting-selector/README.md) | `true` | 禁止冗余的嵌套选择器 |
