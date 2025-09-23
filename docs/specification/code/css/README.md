---
sidebar_position: 2
---

# CSS 规范

:::tip
优先使用以下方案，减少 CSS 代码的编写：

- **原子化 CSS**：如Tailwind CSS，通过 utility 类直接在 HTML 中编写样式，减少了自定义 CSS 的需求。
- **UI 组件库**：主流的 UI 组件库（如 Ant Design、Material-UI）通常已经内置了良好的组件化和样式隔离方案，开发者直接使用即可。
  :::

```js
// stylelint.config.js

module.exports = {
  extends: [
    'stylelint-config-twbs-bootstrap',
  ],
};
```

:::warning
stylelint 规则参考 `stylelint-config-twbs-bootstrap`，但是由于需要整理的内容非常多，在开发过程中，仍以实际的 stylelint 检查为准。本章内容仅供参考
:::

## 规则一览

| 来源 | 规则名称 | 配置值 | 描述 |
|------|----------|--------|------|
| stylelint-config-recommended | [annotation-no-unknown](https://stylelint.io/user-guide/rules/annotation-no-unknown) | `true` | 禁止未知的注解。 |
| stylelint-config-recommended | [at-rule-no-unknown](https://stylelint.io/user-guide/rules/at-rule-no-unknown) | `true` | 禁止未知的 at 规则。 |
| stylelint-config-recommended | [block-no-empty](https://stylelint.io/user-guide/rules/block-no-empty) | `true` | 禁止空块。 |
| stylelint-config-recommended | [color-no-invalid-hex](https://stylelint.io/user-guide/rules/color-no-invalid-hex) | `true` | 禁止无效的十六进制颜色。 |
| stylelint-config-recommended | [comment-no-empty](https://stylelint.io/user-guide/rules/comment-no-empty) | `true` | 禁止空注释。 |
| stylelint-config-recommended | [custom-property-no-missing-var-function](https://stylelint.io/user-guide/rules/custom-property-no-missing-var-function) | `true` | 禁止在自定义属性中缺少 var 函数。 |
| stylelint-config-recommended | [declaration-block-no-duplicate-custom-properties](https://stylelint.io/user-guide/rules/declaration-block-no-duplicate-custom-properties) | `true` | 禁止在声明块中重复自定义属性。 |
| stylelint-config-recommended | [declaration-block-no-duplicate-properties](https://stylelint.io/user-guide/rules/declaration-block-no-duplicate-properties) | `[true, { ignore: ['consecutive-duplicates-with-different-syntaxes'] }]` | 禁止在声明块中重复属性，忽略具有不同语法的连续重复。 |
| stylelint-config-recommended | [declaration-block-no-shorthand-property-overrides](https://stylelint.io/user-guide/rules/declaration-block-no-shorthand-property-overrides) | `true` | 禁止简写属性覆盖相关longhand属性。 |
| stylelint-config-recommended | [font-family-no-duplicate-names](https://stylelint.io/user-guide/rules/font-family-no-duplicate-names) | `true` | 禁止在 font-family 中重复字体名称。 |
| stylelint-config-recommended | [font-family-no-missing-generic-family-keyword](https://stylelint.io/user-guide/rules/font-family-no-missing-generic-family-keyword) | `true` | 禁止在 font-family 中缺少通用字体系列关键字。 |
| stylelint-config-recommended | [function-calc-no-unspaced-operator](https://stylelint.io/user-guide/rules/function-calc-no-unspaced-operator) | `true` | 禁止在 calc 函数中使用无间隔的运算符。 |
| stylelint-config-recommended | [function-linear-gradient-no-nonstandard-direction](https://stylelint.io/user-guide/rules/function-linear-gradient-no-nonstandard-direction) | `true` | 禁止在 linear-gradient 函数中使用非标准方向。 |
| stylelint-config-recommended | [function-no-unknown](https://stylelint.io/user-guide/rules/function-no-unknown) | `true` | 禁止未知的函数。 |
| stylelint-config-recommended | [keyframe-block-no-duplicate-selectors](https://stylelint.io/user-guide/rules/keyframe-block-no-duplicate-selectors) | `true` | 禁止在关键帧块中重复选择器。 |
| stylelint-config-recommended | [keyframe-declaration-no-important](https://stylelint.io/user-guide/rules/keyframe-declaration-no-important) | `true` | 禁止在关键帧声明中使用 !important。 |
| stylelint-config-recommended | [media-feature-name-no-unknown](https://stylelint.io/user-guide/rules/media-feature-name-no-unknown) | `true` | 禁止未知的媒体特性名称。 |
| stylelint-config-recommended | [named-grid-areas-no-invalid](https://stylelint.io/user-guide/rules/named-grid-areas-no-invalid) | `true` | 禁止无效的命名网格区域。 |
| stylelint-config-recommended | [no-duplicate-at-import-rules](https://stylelint.io/user-guide/rules/no-duplicate-at-import-rules) | `true` | 禁止重复的 @import 规则。 |
| stylelint-config-recommended | [no-duplicate-selectors](https://stylelint.io/user-guide/rules/no-duplicate-selectors) | `true` | 禁止重复的选择器。 |
| stylelint-config-recommended | [no-empty-source](https://stylelint.io/user-guide/rules/no-empty-source) | `true` | 禁止空源。 |
| stylelint-config-recommended | [no-invalid-double-slash-comments](https://stylelint.io/user-guide/rules/no-invalid-double-slash-comments) | `true` | 禁止无效的双斜线注释。 |
| stylelint-config-recommended | [no-invalid-position-at-import-rule](https://stylelint.io/user-guide/rules/no-invalid-position-at-import-rule) | `true` | 禁止 @import 规则位于无效位置。 |
| stylelint-config-recommended | [no-irregular-whitespace](https://stylelint.io/user-guide/rules/no-irregular-whitespace) | `true` | 禁止不规则空白。 |
| stylelint-config-recommended | [property-no-unknown](https://stylelint.io/user-guide/rules/property-no-unknown) | `true` | 禁止未知的属性。 |
| stylelint-config-recommended | [selector-anb-no-unmatchable](https://stylelint.io/user-guide/rules/selector-anb-no-unmatchable) | `true` | 禁止无法匹配的 :nth-child() 等选择器。 |
| stylelint-config-recommended | [selector-pseudo-class-no-unknown](https://stylelint.io/user-guide/rules/selector-pseudo-class-no-unknown) | `true` | 禁止未知的伪类选择器。 |
| stylelint-config-recommended | [selector-pseudo-element-no-unknown](https://stylelint.io/user-guide/rules/selector-pseudo-element-no-unknown) | `true` | 禁止未知的伪元素选择器。 |
| stylelint-config-recommended | [selector-type-no-unknown](https://stylelint.io/user-guide/rules/selector-type-no-unknown) | `[true, { ignore: ['custom-elements'] }]` | 禁止未知的类型选择器，忽略自定义元素。 |
| stylelint-config-recommended | [string-no-newline](https://stylelint.io/user-guide/rules/string-no-newline) | `true` | 禁止字符串中的换行符。 |
| stylelint-config-recommended | [unit-no-unknown](https://stylelint.io/user-guide/rules/unit-no-unknown) | `true` | 禁止未知的单位。 |
| stylelint-config-standard | [at-rule-no-vendor-prefix](https://stylelint.io/user-guide/rules/at-rule-no-vendor-prefix) | `true` | 禁止 at 规则使用供应商前缀。 |
| stylelint-config-standard | [color-hex-length](https://stylelint.io/user-guide/rules/color-hex-length) | `'short'` | 指定十六进制颜色使用短格式。 |
| stylelint-config-standard | [comment-empty-line-before](https://stylelint.io/user-guide/rules/comment-empty-line-before) | `['always', { except: ['first-nested'], ignore: ['stylelint-commands'] }]` | 在注释前要求空行，除了嵌套内的第一条和 stylelint 命令。 |
| stylelint-config-standard | [comment-whitespace-inside](https://stylelint.io/user-guide/rules/comment-whitespace-inside) | `'always'` | 要求注释内部有空白。 |
| stylelint-config-standard | [custom-media-pattern](https://stylelint.io/user-guide/rules/custom-media-pattern) | `['^([a-z][a-z0-9]*)(-[a-z0-9]+)*$']` | 指定自定义媒体查询的模式。 |
| stylelint-config-standard | [declaration-block-single-line-max-declarations](https://stylelint.io/user-guide/rules/declaration-block-single-line-max-declarations) | `1` | 单行声明块中最多允许的声明数量。 |
| stylelint-config-standard | [font-family-name-quotes](https://stylelint.io/user-guide/rules/font-family-name-quotes) | `'always-where-recommended'` | 指定字体系列名称使用引号的情况。 |
| stylelint-config-standard | [function-name-case](https://stylelint.io/user-guide/rules/function-name-case) | `'lower'` | 指定函数名称为小写。 |
| stylelint-config-standard | [function-url-quotes](https://stylelint.io/user-guide/rules/function-url-quotes) | `'always'` | 要求 url 函数使用引号。 |
| stylelint-config-standard | [hue-degree-notation](https://stylelint.io/user-guide/rules/hue-degree-notation) | `'angle'` | 指定色调使用角度表示法。 |
| stylelint-config-standard | [import-notation](https://stylelint.io/user-guide/rules/import-notation) | `'url'` | 指定 @import 规则使用 url 表示法。 |
| stylelint-config-standard | [keyframe-selector-notation](https://stylelint.io/user-guide/rules/keyframe-selector-notation) | `'percentage-unless-within-keyword-only-block'` | 指定关键帧选择器使用百分比表示法，除非在仅关键字块内。 |
| stylelint-config-standard | [keyframes-name-pattern](https://stylelint.io/user-guide/rules/keyframes-name-pattern) | `['^([a-z][a-z0-9]*)(-[a-z0-9]+)*$']` | 指定关键帧名称的模式。 |
| stylelint-config-standard | [length-zero-no-unit](https://stylelint.io/user-guide/rules/length-zero-no-unit) | `[true, { ignore: ['custom-properties'] }]` | 长度为零时禁止使用单位，忽略自定义属性。 |
| stylelint-config-standard | [lightness-notation](https://stylelint.io/user-guide/rules/lightness-notation) | `'percentage'` | 指定亮度使用百分比表示法。 |
| stylelint-config-standard | [media-feature-name-no-vendor-prefix](https://stylelint.io/user-guide/rules/media-feature-name-no-vendor-prefix) | `true` | 禁止媒体特性名称使用供应商前缀。 |
| stylelint-config-standard | [property-no-vendor-prefix](https://stylelint.io/user-guide/rules/property-no-vendor-prefix) | `true` | 禁止属性使用供应商前缀。 |
| stylelint-config-standard | [selector-attribute-quotes](https://stylelint.io/user-guide/rules/selector-attribute-quotes) | `'always'` | 要求属性选择器使用引号。 |
| stylelint-config-standard | [selector-class-pattern](https://stylelint.io/user-guide/rules/selector-class-pattern) | `['^([a-z][a-z0-9]*)(-[a-z0-9]+)*$']` | 指定类选择器的模式。 |
| stylelint-config-standard | [selector-id-pattern](https://stylelint.io/user-guide/rules/selector-id-pattern) | `['^([a-z][a-z0-9]*)(-[a-z0-9]+)*$']` | 指定 ID 选择器的模式。 |
| stylelint-config-standard | [selector-no-vendor-prefix](https://stylelint.io/user-guide/rules/selector-no-vendor-prefix) | `true` | 禁止选择器使用供应商前缀。 |
| stylelint-config-standard | [selector-pseudo-element-colon-notation](https://stylelint.io/user-guide/rules/selector-pseudo-element-colon-notation) | `'double'` | 指定伪元素使用双冒号表示法。 |
| stylelint-config-standard | [selector-type-case](https://stylelint.io/user-guide/rules/selector-type-case) | `'lower'` | 指定类型选择器为小写。 |
| stylelint-config-standard | [shorthand-property-no-redundant-values](https://stylelint.io/user-guide/rules/shorthand-property-no-redundant-values) | `true` | 禁止简写属性中使用冗余值。 |
| stylelint-config-standard | [value-keyword-case](https://stylelint.io/user-guide/rules/value-keyword-case) | `'lower'` | 指定值关键字为小写。 |
| stylelint-config-standard | [value-no-vendor-prefix](https://stylelint.io/user-guide/rules/value-no-vendor-prefix) | `[true, { ignoreValues: ['box', 'inline-box'] }]` | 禁止值使用供应商前缀，忽略 'box' 和 'inline-box'。 |
| @stylistic/stylelint-config | [@stylistic/at-rule-name-case](https://stylelint.io/user-guide/rules/at-rule-name-case) | `'lower'` | 指定 at 规则名称为小写。 |
| @stylistic/stylelint-config | [@stylistic/at-rule-semicolon-newline-after](https://stylelint.io/user-guide/rules/at-rule-semicolon-newline-after) | `'always'` | 在 at 规则分号后要求换行。 |
| @stylistic/stylelint-config | [@stylistic/block-closing-brace-newline-before](https://stylelint.io/user-guide/rules/block-closing-brace-newline-before) | `'always-multi-line'` | 在多行块的关闭大括号前要求换行。 |
| @stylistic/stylelint-config | [@stylistic/block-closing-brace-space-before](https://stylelint.io/user-guide/rules/block-closing-brace-space-before) | `'always-single-line'` | 在单行块的关闭大括号前要求空格。 |
| @stylistic/stylelint-config | [@stylistic/block-opening-brace-newline-after](https://stylelint.io/user-guide/rules/block-opening-brace-newline-after) | `'always-multi-line'` | 在多行块的打开大括号后要求换行。 |
| @stylistic/stylelint-config | [@stylistic/block-opening-brace-space-after](https://stylelint.io/user-guide/rules/block-opening-brace-space-after) | `'always-single-line'` | 在单行块的打开大括号后要求空格。 |
| @stylistic/stylelint-config | [@stylistic/color-hex-case](https://stylelint.io/user-guide/rules/color-hex-case) | `'lower'` | 指定十六进制颜色为小写。 |
| @stylistic/stylelint-config | [@stylistic/declaration-bang-space-after](https://stylelint.io/user-guide/rules/declaration-bang-space-after) | `'never'` | 在声明感叹号后禁止空格。 |
| @stylistic/stylelint-config | [@stylistic/declaration-bang-space-before](https://stylelint.io/user-guide/rules/declaration-bang-space-before) | `'always'` | 在声明感叹号前要求空格。 |
| @stylistic/stylelint-config | [@stylistic/declaration-block-semicolon-newline-after](https://stylelint.io/user-guide/rules/declaration-block-semicolon-newline-after) | `'always-multi-line'` | 在多行声明块分号后要求换行。 |
| @stylistic/stylelint-config | [@stylistic/declaration-block-semicolon-space-after](https://stylelint.io/user-guide/rules/declaration-block-semicolon-space-after) | `'always-single-line'` | 在单行声明块分号后要求空格。 |
| @stylistic/stylelint-config | [@stylistic/declaration-block-semicolon-space-before](https://stylelint.io/user-guide/rules/declaration-block-semicolon-space-before) | `'never'` | 在声明块分号前禁止空格。 |
| @stylistic/stylelint-config | [@stylistic/declaration-block-trailing-semicolon](https://stylelint.io/user-guide/rules/declaration-block-trailing-semicolon) | `'always'` | 要求声明块有尾随分号。 |
| @stylistic/stylelint-config | [@stylistic/declaration-colon-newline-after](https://stylelint.io/user-guide/rules/declaration-colon-newline-after) | `'always-multi-line'` | 在多行声明冒号后要求换行。 |
| @stylistic/stylelint-config | [@stylistic/declaration-colon-space-after](https://stylelint.io/user-guide/rules/declaration-colon-space-after) | `'always-single-line'` | 在单行声明冒号后要求空格。 |
| @stylistic/stylelint-config | [@stylistic/declaration-colon-space-before](https://stylelint.io/user-guide/rules/declaration-colon-space-before) | `'never'` | 在声明冒号前禁止空格。 |
| @stylistic/stylelint-config | [@stylistic/function-comma-newline-after](https://stylelint.io/user-guide/rules/function-comma-newline-after) | `'always-multi-line'` | 在多行函数逗号后要求换行。 |
| @stylistic/stylelint-config | [@stylistic/function-comma-space-after](https://stylelint.io/user-guide/rules/function-comma-space-after) | `'always-single-line'` | 在单行函数逗号后要求空格。 |
| @stylistic/stylelint-config | [@stylistic/function-comma-space-before](https://stylelint.io/user-guide/rules/function-comma-space-before) | `'never'` | 在函数逗号前禁止空格。 |
| @stylistic/stylelint-config | [@stylistic/function-max-empty-lines](https://stylelint.io/user-guide/rules/function-max-empty-lines) | `0` | 函数中最多允许的空行数。 |
| @stylistic/stylelint-config | [@stylistic/function-parentheses-newline-inside](https://stylelint.io/user-guide/rules/function-parentheses-newline-inside) | `'always-multi-line'` | 在多行函数括号内要求换行。 |
| @stylistic/stylelint-config | [@stylistic/function-parentheses-space-inside](https://stylelint.io/user-guide/rules/function-parentheses-space-inside) | `'never-single-line'` | 在单行函数括号内禁止空格。 |
| @stylistic/stylelint-config | [@stylistic/function-whitespace-after](https://stylelint.io/user-guide/rules/function-whitespace-after) | `'always'` | 在函数后要求空白。 |
| @stylistic/stylelint-config | [@stylistic/indentation](https://stylelint.io/user-guide/rules/indentation) | `2` | 指定缩进为 2 个空格。 |
| @stylistic/stylelint-config | [@stylistic/media-feature-colon-space-after](https://stylelint.io/user-guide/rules/media-feature-colon-space-after) | `'always'` | 在媒体特性冒号后要求空格。 |
| @stylistic/stylelint-config | [@stylistic/media-feature-colon-space-before](https://stylelint.io/user-guide/rules/media-feature-colon-space-before) | `'never'` | 在媒体特性冒号前禁止空格。 |
| @stylistic/stylelint-config | [@stylistic/media-feature-name-case](https://stylelint.io/user-guide/rules/media-feature-name-case) | `'lower'` | 指定媒体特性名称为小写。 |
| @stylistic/stylelint-config | [@stylistic/media-feature-parentheses-space-inside](https://stylelint.io/user-guide/rules/media-feature-parentheses-space-inside) | `'never'` | 在媒体特性括号内禁止空格。 |
| @stylistic/stylelint-config | [@stylistic/media-feature-range-operator-space-after](https://stylelint.io/user-guide/rules/media-feature-range-operator-space-after) | `'always'` | 在媒体特性范围运算符后要求空格。 |
| @stylistic/stylelint-config | [@stylistic/media-feature-range-operator-space-before](https://stylelint.io/user-guide/rules/media-feature-range-operator-space-before) | `'always'` | 在媒体特性范围运算符前要求空格。 |
| @stylistic/stylelint-config | [@stylistic/media-query-list-comma-newline-after](https://stylelint.io/user-guide/rules/media-query-list-comma-newline-after) | `'always-multi-line'` | 在多行媒体查询列表逗号后要求换行。 |
| @stylistic/stylelint-config | [@stylistic/media-query-list-comma-space-after](https://stylelint.io/user-guide/rules/media-query-list-comma-space-after) | `'always-single-line'` | 在单行媒体查询列表逗号后要求空格。 |
| @stylistic/stylelint-config | [@stylistic/media-query-list-comma-space-before](https://stylelint.io/user-guide/rules/media-query-list-comma-space-before) | `'never'` | 在媒体查询列表逗号前禁止空格。 |
| @stylistic/stylelint-config | [@stylistic/no-empty-first-line](https://stylelint.io/user-guide/rules/no-empty-first-line) | `true` | 禁止空首行。 |
| @stylistic/stylelint-config | [@stylistic/no-eol-whitespace](https://stylelint.io/user-guide/rules/no-eol-whitespace) | `true` | 禁止行尾空白。 |
| @stylistic/stylelint-config | [@stylistic/no-extra-semicolons](https://stylelint.io/user-guide/rules/no-extra-semicolons) | `true` | 禁止多余的分号。 |
| @stylistic/stylelint-config | [@stylistic/no-missing-end-of-source-newline](https://stylelint.io/user-guide/rules/no-missing-end-of-source-newline) | `true` | 要求源末尾有换行。 |
| @stylistic/stylelint-config | [@stylistic/number-no-trailing-zeros](https://stylelint.io/user-guide/rules/number-no-trailing-zeros) | `true` | 禁止数字中的尾随零。 |
| @stylistic/stylelint-config | [@stylistic/property-case](https://stylelint.io/user-guide/rules/property-case) | `'lower'` | 指定属性为小写。 |
| @stylistic/stylelint-config | [@stylistic/selector-attribute-brackets-space-inside](https://stylelint.io/user-guide/rules/selector-attribute-brackets-space-inside) | `'never'` | 在属性选择器括号内禁止空格。 |
| @stylistic/stylelint-config | [@stylistic/selector-attribute-operator-space-after](https://stylelint.io/user-guide/rules/selector-attribute-operator-space-after) | `'never'` | 在属性选择器运算符后禁止空格。 |
| @stylistic/stylelint-config | [@stylistic/selector-attribute-operator-space-before](https://stylelint.io/user-guide/rules/selector-attribute-operator-space-before) | `'never'` | 在属性选择器运算符前禁止空格。 |
| @stylistic/stylelint-config | [@stylistic/selector-combinator-space-after](https://stylelint.io/user-guide/rules/selector-combinator-space-after) | `'always'` | 在选择器组合器后要求空格。 |
| @stylistic/stylelint-config | [@stylistic/selector-combinator-space-before](https://stylelint.io/user-guide/rules/selector-combinator-space-before) | `'always'` | 在选择器组合器前要求空格。 |
| @stylistic/stylelint-config | [@stylistic/selector-descendant-combinator-no-non-space](https://stylelint.io/user-guide/rules/selector-descendant-combinator-no-non-space) | `true` | 禁止后代组合器使用非空格字符。 |
| @stylistic/stylelint-config | [@stylistic/selector-list-comma-newline-after](https://stylelint.io/user-guide/rules/selector-list-comma-newline-after) | `'always'` | 在选择器列表逗号后要求换行。 |
| @stylistic/stylelint-config | [@stylistic/selector-max-empty-lines](https://stylelint.io/user-guide/rules/selector-max-empty-lines) | `0` | 选择器中最多允许的空行数。 |
| @stylistic/stylelint-config | [@stylistic/selector-pseudo-class-case](https://stylelint.io/user-guide/rules/selector-pseudo-class-case) | `'lower'` | 指定伪类选择器为小写。 |
| @stylistic/stylelint-config | [@stylistic/selector-pseudo-class-parentheses-space-inside](https://stylelint.io/user-guide/rules/selector-pseudo-class-parentheses-space-inside) | `'never'` | 在伪类选择器括号内禁止空格。 |
| @stylistic/stylelint-config | [@stylistic/selector-pseudo-element-case](https://stylelint.io/user-guide/rules/selector-pseudo-element-case) | `'lower'` | 指定伪元素选择器为小写。 |
| @stylistic/stylelint-config | [@stylistic/string-quotes](https://stylelint.io/user-guide/rules/string-quotes) | `'double'` | 指定字符串使用双引号。 |
| @stylistic/stylelint-config | [@stylistic/unit-case](https://stylelint.io/user-guide/rules/unit-case) | `'lower'` | 指定单位为小写。 |
| @stylistic/stylelint-config | [@stylistic/value-list-comma-space-before](https://stylelint.io/user-guide/rules/value-list-comma-space-before) | `'never'` | 在值列表逗号前禁止空格。 |
| @stylistic/stylelint-config | [@stylistic/value-list-max-empty-lines](https://stylelint.io/user-guide/rules/value-list-max-empty-lines) | `0` | 值列表中最多允许的空行数。 |
| stylelint-config-twbs-bootstrap | [alpha-value-notation](https://stylelint.io/user-guide/rules/alpha-value-notation) | `null` | 禁用 alpha 值表示法规则。 |
| stylelint-config-twbs-bootstrap | [at-rule-empty-line-before](https://stylelint.io/user-guide/rules/at-rule-empty-line-before) | `null` | 禁用 at 规则前空行规则。 |
| stylelint-config-twbs-bootstrap | [color-function-notation](https://stylelint.io/user-guide/rules/color-function-notation) | `null` | 禁用颜色函数表示法规则。 |
| stylelint-config-twbs-bootstrap | [color-named](https://stylelint.io/user-guide/rules/color-named) | `'never'` | 禁止使用命名颜色。 |
| stylelint-config-twbs-bootstrap | [custom-property-empty-line-before](https://stylelint.io/user-guide/rules/custom-property-empty-line-before) | `null` | 禁用自定义属性前空行规则。 |
| stylelint-config-twbs-bootstrap | [custom-property-pattern](https://stylelint.io/user-guide/rules/custom-property-pattern) | `null` | 禁用自定义属性模式规则。 |
| stylelint-config-twbs-bootstrap | [declaration-block-no-redundant-longhand-properties](https://stylelint.io/user-guide/rules/declaration-block-no-redundant-longhand-properties) | `null` | 禁用声明块中冗余 longhand 属性规则。 |
| stylelint-config-twbs-bootstrap | [declaration-empty-line-before](https://stylelint.io/user-guide/rules/declaration-empty-line-before) | `null` | 禁用声明前空行规则。 |
| stylelint-config-twbs-bootstrap | [declaration-no-important](https://stylelint.io/user-guide/rules/declaration-no-important) | `true` | 禁止声明中使用 !important。 |
| stylelint-config-twbs-bootstrap | [font-weight-notation](https://stylelint.io/user-guide/rules/font-weight-notation) | `['numeric', { 'ignore': ['relative'] }]` | 指定字体重量使用数字表示法，忽略相对值。 |
| stylelint-config-twbs-bootstrap | [function-url-no-scheme-relative](https://stylelint.io/user-guide/rules/function-url-no-scheme-relative) | `true` | 禁止 url 函数中使用协议相对 URL。 |
| stylelint-config-twbs-bootstrap | [media-feature-range-notation](https://stylelint.io/user-guide/rules/media-feature-range-notation) | `null` | 禁用媒体特性范围表示法规则。 |
| stylelint-config-twbs-bootstrap | [media-query-no-invalid](https://stylelint.io/user-guide/rules/media-query-no-invalid) | `null` | 禁用无效媒体查询规则。 |
| stylelint-config-twbs-bootstrap | [no-descending-specificity](https://stylelint.io/user-guide/rules/no-descending-specificity) | `null` | 禁用特异性降序规则。 |
| stylelint-config-twbs-bootstrap | [number-max-precision](https://stylelint.io/user-guide/rules/number-max-precision) | `null` | 禁用数字最大精度规则。 |
| stylelint-config-twbs-bootstrap | [rule-empty-line-before](https://stylelint.io/user-guide/rules/rule-empty-line-before) | `null` | 禁用规则前空行规则。 |
| stylelint-config-twbs-bootstrap | [selector-max-attribute](https://stylelint.io/user-guide/rules/selector-max-attribute) | `2` | 限制选择器中属性的最大数量。 |
| stylelint-config-twbs-bootstrap | [selector-max-class](https://stylelint.io/user-guide/rules/selector-max-class) | `4` | 限制选择器中类的最大数量。 |
| stylelint-config-twbs-bootstrap | [selector-max-combinators](https://stylelint.io/user-guide/rules/selector-max-combinators) | `4` | 限制选择器中组合器的最大数量。 |
| stylelint-config-twbs-bootstrap | [selector-max-compound-selectors](https://stylelint.io/user-guide/rules/selector-max-compound-selectors) | `4` | 限制选择器中复合选择器的最大数量。 |
| stylelint-config-twbs-bootstrap | [selector-max-id](https://stylelint.io/user-guide/rules/selector-max-id) | `0` | 限制选择器中 ID 的最大数量。 |
| stylelint-config-twbs-bootstrap | [selector-max-specificity](https://stylelint.io/user-guide/rules/selector-max-specificity) | `null` | 禁用选择器最大特异性规则。 |
| stylelint-config-twbs-bootstrap | [selector-max-type](https://stylelint.io/user-guide/rules/selector-max-type) | `2` | 限制选择器中类型的最大数量。 |
| stylelint-config-twbs-bootstrap | [selector-max-universal](https://stylelint.io/user-guide/rules/selector-max-universal) | `1` | 限制选择器中通用选择器的最大数量。 |
| stylelint-config-twbs-bootstrap | [selector-no-qualifying-type](https://stylelint.io/user-guide/rules/selector-no-qualifying-type) | `true` | 禁止选择器中使用限定类型。 |
| stylelint-config-twbs-bootstrap | [selector-not-notation](https://stylelint.io/user-guide/rules/selector-not-notation) | `null` | 禁用 :not() 表示法规则。 |
| stylelint-config-twbs-bootstrap | [@stylistic/at-rule-name-space-after](https://stylelint.io/user-guide/rules/at-rule-name-space-after) | `'always'` | 在 at 规则名称后要求空格。 |
| stylelint-config-twbs-bootstrap | [@stylistic/at-rule-semicolon-space-before](https://stylelint.io/user-guide/rules/at-rule-semicolon-space-before) | `'never'` | 在 at 规则分号前禁止空格。 |
| stylelint-config-twbs-bootstrap | [@stylistic/block-closing-brace-empty-line-before](https://stylelint.io/user-guide/rules/block-closing-brace-empty-line-before) | `null` | 禁用块关闭大括号前空行规则。 |
| stylelint-config-twbs-bootstrap | [@stylistic/block-closing-brace-newline-after](https://stylelint.io/user-guide/rules/block-closing-brace-newline-after) | `null` | 禁用块关闭大括号后换行规则。 |
| stylelint-config-twbs-bootstrap | [@stylistic/block-opening-brace-space-before](https://stylelint.io/user-guide/rules/block-opening-brace-space-before) | `null` | 禁用块打开大括号前空格规则。 |
| stylelint-config-twbs-bootstrap | [@stylistic/declaration-block-semicolon-newline-before](https://stylelint.io/user-guide/rules/declaration-block-semicolon-newline-before) | `'never-multi-line'` | 在多行声明块分号前禁止换行。 |
| stylelint-config-twbs-bootstrap | [@stylistic/max-empty-lines](https://stylelint.io/user-guide/rules/max-empty-lines) | `2` | 最多允许的空行数。 |
| stylelint-config-twbs-bootstrap | [@stylistic/max-line-length](https://stylelint.io/user-guide/rules/max-line-length) | `null` | 禁用最大行长度规则。 |
| stylelint-config-twbs-bootstrap | [@stylistic/number-leading-zero](https://stylelint.io/user-guide/rules/number-leading-zero) | `'never'` | 禁止数字中的前导零。 |
| stylelint-config-twbs-bootstrap | [@stylistic/selector-list-comma-newline-before](https://stylelint.io/user-guide/rules/selector-list-comma-newline-before) | `'never-multi-line'` | 在多行选择器列表逗号前禁止换行。 |
| stylelint-config-twbs-bootstrap | [@stylistic/selector-list-comma-space-after](https://stylelint.io/user-guide/rules/selector-list-comma-space-after) | `'always-single-line'` | 在单行选择器列表逗号后要求空格。 |
| stylelint-config-twbs-bootstrap | [@stylistic/selector-list-comma-space-before](https://stylelint.io/user-guide/rules/selector-list-comma-space-before) | `'never-single-line'` | 在单行选择器列表逗号前禁止空格。 |
| stylelint-config-twbs-bootstrap | [@stylistic/unicode-bom](https://stylelint.io/user-guide/rules/unicode-bom) | `'never'` | 禁止使用 Unicode BOM。 |
| stylelint-config-twbs-bootstrap | [@stylistic/value-list-comma-newline-after](https://stylelint.io/user-guide/rules/value-list-comma-newline-after) | `'never-multi-line'` | 在多行值列表逗号后禁止换行。 |
| stylelint-config-twbs-bootstrap | [@stylistic/value-list-comma-newline-before](https://stylelint.io/user-guide/rules/value-list-comma-newline-before) | `'never-multi-line'` | 在多行值列表逗号前禁止换行。 |
| stylelint-config-twbs-bootstrap | [@stylistic/value-list-comma-space-after](https://stylelint.io/user-guide/rules/value-list-comma-space-after) | `'always'` | 在值列表逗号后要求空格。 |

## 属性排序

### CSS Modules 组合规则

- [`composes`](https://github.com/css-modules/css-modules#composition)

### 全局重置

- [`all`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/all)

### 定位

- [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)
- [`inset`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inset)
- [`inset-block`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inset-block)
- [`inset-block-start`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inset-block-start)
- [`inset-block-end`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inset-block-end)
- [`inset-inline`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inset-inline)
- [`inset-inline-start`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inset-inline-start)
- [`inset-inline-end`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inset-inline-end)
- [`top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/top)
- [`right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/right)
- [`bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/bottom)
- [`left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/left)
- [`z-index`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index)

### 显示模式

- [`box-sizing`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)
- [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)

### 弹性盒子
- [`flex`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)
- [`flex-grow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow)
- [`flex-shrink`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink)
- [`flex-basis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)
- [`flex-flow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-flow)
- [`flex-direction`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-direction)
- [`flex-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap)
- `-webkit-box-orient`

### 网格布局

- [`grid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid)
- [`grid-area`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-area)
- [`grid-template`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template)
- [`grid-template-areas`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-areas)
- [`grid-template-rows`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-rows)
- [`grid-template-columns`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-columns)
- [`grid-row`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-row)
- [`grid-row-start`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-row-start)
- [`grid-row-end`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-row-end)
- [`grid-column`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-column)
- [`grid-column-start`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-column-start)
- [`grid-column-end`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-column-end)
- [`grid-auto-rows`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-auto-rows)
- [`grid-auto-columns`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-auto-columns)
- [`grid-auto-flow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-auto-flow)
- [`grid-gap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-gap)
- [`grid-row-gap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-row-gap)
- [`grid-column-gap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-column-gap)

### 间距

- [`gap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gap)
- [`row-gap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/row-gap)
- [`column-gap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-gap)

### 布局对齐

- [`place-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/place-content)
- [`place-items`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/place-items)
- [`place-self`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/place-self)
- [`align-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-content)
- [`align-items`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items)
- [`align-self`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-self)
- [`justify-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content)
- [`justify-items`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-items)
- [`justify-self`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-self)

### 顺序

- [`order`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/order)

### 盒模型

- [`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float)
- [`inline-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inline-size)
- [`min-inline-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min-inline-size)
- [`max-inline-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/max-inline-size)
- [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width)
- [`min-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min-width)
- [`max-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/max-width)
- [`block-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/block-size)
- [`min-block-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min-block-size)
- [`max-block-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/max-block-size)
- [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height)
- [`min-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min-height)
- [`max-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/max-height)
- [`aspect-ratio`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/aspect-ratio)
- [`padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding)
- [`padding-block`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-block)
- [`padding-block-start`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-block-start)
- [`padding-block-end`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-block-end)
- [`padding-inline`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-inline)
- [`padding-inline-start`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-inline-start)
- [`padding-inline-end`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-inline-end)
- [`padding-top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-top)
- [`padding-right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-right)
- [`padding-bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-bottom)
- [`padding-left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding-left)
- [`margin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin)
- [`margin-block`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-block)
- [`margin-block-start`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-block-start)
- [`margin-block-end`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-block-end)
- [`margin-inline`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-inline)
- [`margin-inline-start`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-inline-start)
- [`margin-inline-end`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-inline-end)
- [`margin-top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-top)
- [`margin-right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-right)
- [`margin-bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-bottom)
- [`margin-left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-left)
- [`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow)
- [`overflow-block`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-block)
- [`overflow-inline`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-inline)
- [`overflow-x`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-x)
- [`overflow-y`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-y)
- `-webkit-overflow-scrolling`
- ~~`-ms-overflow-x`~~
- ~~`-ms-overflow-y`~~
- `-ms-overflow-style`
- [`overscroll-behavior`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overscroll-behavior)
- [`overscroll-behavior-inline`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overscroll-behavior-inline)
- [`overscroll-behavior-block`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overscroll-behavior-block)
- [`overscroll-behavior-x`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overscroll-behavior-x)
- [`overscroll-behavior-y`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overscroll-behavior-y)
- [`clip`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip)
- [`clip-path`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path)
- [`clear`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clear)

### 排版

- [`font`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font)
- [`font-family`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-family)
- [`font-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-size)
- [`font-variation-settings`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-variation-settings)
- [`font-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-style)
- [`font-weight`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-weight)
- [`font-feature-settings`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-feature-settings)
- [`font-optical-sizing`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-optical-sizing)
- [`font-kerning`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-kerning)
- [`font-variant`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-variant)
- [`font-variant-ligatures`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-variant-ligatures)
- [`font-variant-caps`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-variant-caps)
- [`font-variant-alternates`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-variant-alternates)
- [`font-variant-numeric`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-variant-numeric)
- [`font-variant-east-asian`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-variant-east-asian)
- [`font-variant-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-variant-position)
- [`font-size-adjust`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-size-adjust)
- [`font-stretch`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-stretch)
- [`font-effect`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-effect)
- [`font-emphasize`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-emphasize)
- [`font-emphasize-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-emphasize-position)
- [`font-emphasize-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-emphasize-style)
- [`-webkit-font-smoothing`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth)
- [`-moz-osx-font-smoothing`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth)
- [`font-smooth`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-smooth)
- [`hyphens`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/hyphens)
- [`line-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height)
- [`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color)
- [`-webkit-text-fill-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/-webkit-text-fill-color)
- [`-webkit-text-stroke`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/-webkit-text-stroke)
- [`-webkit-text-stroke-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/-webkit-text-stroke-width)
- [`-webkit-stroke-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/-webkit-text-stroke-color)
- [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align)
- [`text-align-last`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align-last)
- [`text-emphasis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-emphasis)
- [`text-emphasis-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-emphasis-color)
- [`text-emphasis-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-emphasis-style)
- [`text-emphasis-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-emphasis-position)
- [`text-decoration`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration)
- [`text-decoration-line`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration-line)
- [`text-decoration-thickness`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration-thickness)
- [`text-decoration-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration-style)
- [`text-decoration-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration-color)
- [`text-underline-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-underline-position)
- [`text-underline-offset`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-underline-offset)
- [`text-indent`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-indent)
- [`text-justify`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-justify)
- [`text-outline`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-outline)
- [`text-overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-overflow)
- [`text-overflow-ellipsis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-overflow-ellipsis)
- [`text-overflow-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-overflow-mode)
- [`-webkit-line-clamp`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/-webkit-line-clamp)
- [`line-clamp`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-clamp)
- [`text-shadow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow)
- [`text-transform`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-transform)
- [`text-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-wrap)
- [`-webkit-text-size-adjust`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-size-adjust)
- [`-ms-text-size-adjust`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-size-adjust)
- [`letter-spacing`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/letter-spacing)
- [`word-break`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break)
- [`word-spacing`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-spacing)
- ~~`word-wrap`~~ (已废弃，使用 `overflow-wrap`)
- [`overflow-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-wrap)
- [`tab-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/tab-size)
- [`white-space`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space)
- [`vertical-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align)
- [`list-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style)
- [`list-style-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-position)
- [`list-style-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-type)
- [`list-style-image`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-image)
- [`src`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/src)
- [`font-display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-display)
- [`unicode-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/unicode-range)
- [`size-adjust`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/size-adjust)
- [`ascent-override`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/ascent-override)
- [`descent-override`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/descent-override)
- [`line-gap-override`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-g-override)

### 可访问性与交互

- [`appearance`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/appearance)
- [`accent-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/accent-color)
- [`color-scheme`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color-scheme)
- [`pointer-events`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events)
- ~~`-ms-touch-action`~~
- [`touch-action`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action)
- [`cursor`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor)
- [`caret-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/caret-color)
- [`visibility`](https://developer.mozilla.org/zh-CN/docs/Web/visibility)
- [`zoom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/zoom)
- [`table-layout`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout)
- [`empty-cells`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/empty-cells)
- [`caption-side`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/caption-side)
- [`border-spacing`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-spacing)
- [`border-collapse`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-collapse)
- [`content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content)
- [`quotes`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/quotes)
- [`counter-res`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/counter-reset)
- [`counter-set`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/counter-set)
- [`counter-increment`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/counter-increment)
- [`resize`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/resize)
- [`scroll-behavior`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-behavior)
- [`scroll-snap-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-snap-type)
- [`scroll-snap-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-snap-align)
- [`scroll-snap-stop`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-snap-stop)
- [`scroll-padding`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-padding)
- [`scroll-padding-inline`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-padding-inline)
- [`scroll-padding-inline-start`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-padding-inline-start)
- [`scroll-padding-inline-end`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-padding-inline-end)
- [`scroll-padding-block`](https://developer.mozilla.org/zh-CN/docs/Web/C/scroll-padding-block)
- [`scroll-padding-block-start`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-padding-block-start)
- [`scroll-padding-block-end`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-padding-block-end)
- [`scroll-padding-top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-padding-top)
- [`scroll-padding-right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-padding-right)
- [`scroll-padding-bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-padding-bottom)
- [`scroll-padding-left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-padding-left)
- [`scroll-margin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-margin)
- [`scroll-margin-inline`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-margin-inline)
- [`scroll-margin-inline-start`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-margin-inline-start)
- [`scroll-margin-inline-end`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-margin-inline-end)
- [`scroll-margin-block`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-margin-block)
- [`scroll-margin-block-start`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-margin-block-start)
- [`scroll-block-end`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-margin-block-end)
- [`scroll-margin-top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-margin-top)
- [`scroll-margin-right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-margin-right)
- [`scroll-margin-bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-margin-bottom)
- [`scroll-margin-left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-margin-left)
- [`scrollbar-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scrollbar-color)
- [`scrollbar-gutter`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scrollbar-gutter)
- [`scrollbar-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scrollbar-width)
- [`user-select`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/user-select)
- `-webkit-user-select`
- [`nav-index`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/nav-index)
- [`nav-up`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/nav-up)
- [`nav-right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/nav-right)
- [`nav-down`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/nav-down)
- [`nav-left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/nav-left)

### 图像、背景和边框

- [`object-fit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)
- [`object-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position)
- ~~`-ms-interpolation-mode`~~
- [`image-orientation`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/image-orientation)
- [`image-rendering`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/image-rendering)
- [`image-resolution`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/image-resolution)
- [`background`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background)
- [`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-color)
- [`background-image`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image)
- ~~`-ms-filter:\\'progid:DXImageTransform.Microsoft.gradient`~~
- ~~`filter:progid:DXImageTransform.Microsoft.gradient`~~
- ~~`filter:progid:DXImageTransform.Microsoft.AlphaImageLoader`~~
- [`filter`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)
- [`background-repeat`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-repeat)
- [`background-attachment`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment)
- [`background-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position)
- [`background-position-x`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position-x)
- [`background-position-y`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position-y)
- [`background-clip`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)
- [`background-origin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-origin)
- [`background-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size)
- [`background-blend-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-blend-mode)
- [`isolation`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/isolation)
- [`backdrop-filter`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/backdrop-filter)
- [`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border)
- [`border-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-color)
- [`border-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style)
- [`border-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width)
- [`border-block`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-block)
- [`border-block-start`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-block-start)
- [`border-block-start-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-block-start-color)
- [`border-block-start-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-block-start-style)
- [`border-block-start-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-block-start-width)
- [`border-block-end`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-block-end)
- [`border-block-end`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-block-end-color)
- [`border-block-end-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-block-end-style)
- [`border-block-end-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-block-end-width)
- [`border-inline`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-inline)
- [`border-inline-start`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-inline-start)
- [`border-inline-start-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-inline-start-color)
- [`border-inline-start-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-inline-start-style)
- [`border-inline-start-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-inline-start-width)
- [`border-inline-end`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-inline-end)
- [`border-inline-end-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-inline-end-color)
- [`border-inline-end-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-inline-end-style)
- [`border-inline-end-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-inline-end-width)
- [`border-top`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-top)
- [`border-top-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-top-color)
- [`border-top-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-top-style)
- [`border-top-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-top-width)
- [`border-right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-right)
- [`border-right-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-right-color)
- [`border-right-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-right-style)
- [`border-right-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-right-width)
- [`border-bottom`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-bottom)
- [`border-bottom-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-bottom-color)
- [`border-bottom-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-bottom-style)
- [`border-bottom-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-bottom-width)
- [`border-left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-left)
- [`border-left-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-left-color)
- [`border-left-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-left-style)
- [`border-left-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-left-width)
- [`border-radius`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-radius)
- [`border-start-start-radius`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-start-start-radius)
- [`border-start-end-radius`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-start-end-radius)
- [`border-end-start-radius`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-end-start-radius)
- [`border-end-end-radius`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-end-end-radius)
- [`border-top-left-radius`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-top-left-radius)
- [`border-top-right-radius`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-top-right-radius)
- [`border-bottom-right-radius`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-bottom-right-radius)
- [`border-bottom-left-radius`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-bottom-left-radius)
- [`border-image`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image)
- [`border-image-source`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image-source)
- [`border-image-slice`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image-slice)
- [`border-image-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image-width)
- [`border-image-outset`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image-outset)
- [`border-image-repeat`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image-repeat)
- [`outline`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline)
- [`outline-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline-width)
- [`outline-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline-style)
- [`outline-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline-color)
- [`outline-offset`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline-offset)
- [`box-shadow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow)
- [`mix-blend-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode)
- ~~`filter:progid:DXImageTransform.Microsoft.Alpha(Opacity`~~
- ~~`-ms-filter:\\'progid:DXImageTransform.Microsoft.Alpha`~~
- [`opacity`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/opacity)

### 遮罩

- [`mask-border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-border)
- [`mask-border-source`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-border-source)
- [`mask-border-slice`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-border-slice)
- [`mask-border-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-border-width)
- [`mask-border-outset`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-border-outset)
- [`mask-border-repeat`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-border-repeat)
- [`mask-border-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-border-mode)
- [`mask`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask)
- [`mask-image`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-image)
- [`mask-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-mode)
- [`mask-repeat`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-repeat)
- [`mask-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-position)
- [`mask-clip`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-clip)
- [`mask-origin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-origin)
- [`mask-size`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-size)
- [`mask-composite`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask-composite)

### SVG 表现

- [`alignment-baseline`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/alignment-baseline)
- [`baseline-shift`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/baseline-shift)
- [`dominant-baseline`](https://developer.mozilla.org/zh-CN/docs/SVG/Attribute/CSS/dominant-baseline)
- [`text-anchor`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/text-anchor)
- [`word-spacing`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/word-spacing)
- [`writing-mode`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/writing-mode)
- [`fill`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/fill)
- [`fill-opacity`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/fill-opacity)
- [`fill-rule`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/fill-rule)
- [`stroke`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke)
- [`stroke-dasharray`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dasharray)
- [`stroke-dashoffset`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-dashoffset)
- [`stroke-linecap`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-linecap)
- [`stroke-linejoin`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-linejoin)
- [`stroke-miterlimit`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-miterlimit)
- [`stroke-opacity`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-opacity)
- [`stroke-width`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-width)
- [`color-interpolation`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/color-interpolation)
- [`color-interpolation-filters`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attributecolor-interpolation-filters)
- [`color-profile`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/color-profile)
- [`color-rendering`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/color-rendering)
- [`flood-color`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attributeflood-color)
- [`flood-opacity`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/flood-opacity)
- [`lighting-color`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/lighting-color)
- [`marker-start`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/marker-start)
- [`marker-mid`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/marker-mid)
- [`marker-end`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/marker-end)
- [`shape-rendering`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/shape-rendering)
- [`stop-color`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stop-color)
- [`stop-opacity`](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stop-opacity)

### 过渡与动画

- [`transition`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition)
- [`transition-delay`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-delay)
- [`transition-timing-function`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function)
- [`transition-duration`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-duration)
- [`transition-property`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-property)
- [`transform`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)
- [`transform-origin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin)
- [`rotate`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/rotate)
- [`scale`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scale)
- [`translate`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/translate)
- [`perspective`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)
- [`perspective-origin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective-origin)
- [`animation`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation)
- [`animation-name`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-name)
- [`animation-duration`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-duration)
- [`animation-play-state`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-play-state)
- [`animation-timing-function`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-timing-function)
- [`animation-delay`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-del)
- [`animation-iteration-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-iteration-count)
- [`animation-direction`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-direction)
- [`will-change`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change)

### 分页媒体

> 参考 [MDN - CSS 分页媒体](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_paged_media)

- [`break-before`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/break-before)
- [`break-inside`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/break-inside)
- [`break-after`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/break-after)
- [`orphans`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/orphans)
- [`widows`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/widows)

## Vue 专属规则

```js
// stylelint.config.js

module.exports = {
  extends: [
    'stylelint-config-recommended-vue',
  ],
};
```

| 来源 | 规则名称 | 配置值 | 描述 |
|---|---|---|---|
| stylelint-config-recommended-vue | [selector-pseudo-class-no-unknown](https://stylelint.io/user-guide/rules/selector-pseudo-class-no-unknown) | `[true, { ignorePseudoClasses: ["deep", "global", "slotted"] }]` | 禁止未知的伪类选择器，但忽略 Vue 特定的伪类（如 `deep`、`global`、`slotted`） |
| stylelint-config-recommended-vue | [selector-pseudo-element-no-unknown](https://stylelint.io/user-guide/rules/selector-pseudo-element-no-unknown) | `[true, { ignorePseudoElements: ["v-deep", "v-global", "v-slotted"] }]` | 禁止未知的伪元素选择器，但忽略 Vue 特定的伪元素（如 `v-deep`、`v-global`、`v-slotted`） |
| stylelint-config-recommended-vue | [declaration-property-value-no-unknown](https://stylelint.io/user-guide/rules/declaration-property-value-no-unknown) | `[true, { ignoreProperties: { "/.*/": "/v-bind\\(.+\\)/" } }]` | 禁止未知的声明属性值，但忽略包含 `v-bind` 表达式的值 |
| stylelint-config-recommended-vue | [function-no-unknown](https://stylelint.io/user-guide/rules/function-no-unknown) | `[true, { ignoreFunctions: ["v-bind"] }]` | 禁止未知的 CSS 函数，但忽略 Vue 的 `v-bind` 函数 |
