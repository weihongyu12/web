---
sidebar_position: 4
---

# Vue 规则

[`eslint-plugin-vue`](https://eslint.vuejs.org/) 是 Vue 官方推荐的规则集。它专注于 Vue 单文件组件（`.vue`文件）的特定规则，来确保Vue组件的正确性和最佳实践。

[`@vue/eslint-config-airbnb-with-typescript`](https://github.com/vuejs/eslint-config-airbnb/tree/main/packages/eslint-config-airbnb-with-typescrip) 是 Airbnb 风格指南的 Vue 和 TypeScript 版本。它将 Airbnb 久经考验的 JavaScript 和 TypeScript 最佳实践应用于 Vue 项目。

:::tip
参看 [Vue Style Guide](https://vuejs.org/style-guide/)
:::

```js
// .eslintrc.js
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: [
    'plugin:vue/recommended',
    '@vue/eslint-config-airbnb-with-typescript', 
    // '@vue/eslint-config-airbnb-with-typescript/allow-tsx-in-vue',
  ],
};
```

:::warning
- 由于上游依赖关系，`@vue/eslint-config-airbnb-with-typescript` 仍不支持 ESLint 9.x 版本，使用时请注意。使用时请使用 ESLint 8.x 版本，后续请及时关注版本变化。
- 根据项目实际情况，决定是否开启 tsx 支持。
:::

## 基础规则 JavaScript

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|---------|---------|---------|------|
| [import/extensions](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md) | error | `["ignorePackages", { js: "never", mjs: "never", jsx: "never", vue: "always" }]` | 强制文件扩展名规范 |
| [import/no-extraneous-dependencies](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md) | error | `{ devDependencies: [...] }` | 禁止引入无关依赖 |
| [jsx-quotes](https://eslint.org/docs/rules/jsx-quotes) | error | `"prefer-double"` | 强制JSX属性使用双引号 |
| [react/jsx-boolean-value](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-boolean-value.md) | error | `["never", { always: [] }]` | 禁止布尔属性显式值 |
| [react/jsx-closing-bracket-location](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-closing-bracket-location.md) | error | `"line-aligned"` | 闭合括号对齐规则 |
| [react/jsx-closing-tag-location](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-closing-tag-location.md) | error | - | 闭合标签位置校验 |
| [react/jsx-curly-spacing](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-curly-spacing.md) | error | `["never", { allowMultiline: true }]` | 禁止大括号内空格 |
| [react/jsx-indent-props](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-indent-props.md) | error | `2` | JSX属性缩进2空格 |
| [react/jsx-max-props-per-line](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-max-props-per-line.md) | error | `{ maximum: 1, when: "multiline" }` | 每行最多1个属性（多行时）|
| [react/jsx-no-bind](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-no-bind.md) | error | `{ ignoreRefs: false, allowArrowFunctions: true }` | 禁止JSX中不必要的函数绑定 |
| [react/jsx-no-duplicate-props](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-no-duplicate-props.md) | error | `{ ignoreCase: true }` | 禁止重复属性 |
| [react/jsx-pascal-case](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-pascal-case.md) | error | `{ allowAllCaps: true, ignore: [] }` | 强制组件帕斯卡命名 |
| [vue/jsx-uses-vars](https://eslint.vuejs.org/rules/jsx-uses-vars.html) | error | - | 防止JSX变量未使用 |
| [vue/comment-directive](https://eslint.vuejs.org/rules/comment-directive.html) | error | - | 强制Vue注释指令格式 |
| [vue/require-render-return](https://eslint.vuejs.org/rules/require-render-return.html) | error | - | 要求render函数返回内容 |
| [react/self-closing-comp](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/self-closing-comp.md) | error | - | 强制自闭合组件格式 |
| [react/jsx-wrap-multilines](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-wrap-multilines.md) | error | `{ declaration: "parens-new-line" }` | 多行JSX包裹格式 |
| [react/jsx-first-prop-new-line](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-first-prop-new-line.md) | error | `"multiline-multiprop"` | 多属性换行格式 |
| [react/jsx-equals-spacing](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-equals-spacing.md) | error | `"never"` | 禁止等号周围空格 |
| [react/jsx-indent](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-indent.md) | error | `2` | JSX缩进2空格 |
| [react/jsx-no-target-blank](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-no-target-blank.md) | error | `{ allowReferrer: true }` | 安全空白target校验 |
| [react/jsx-filename-extension](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-filename-extension.md) | error | `{ extensions: [".jsx", ".vue"] }` | 限制JSX文件扩展名 |
| [react/jsx-no-comment-textnodes](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-no-comment-textnodes.md) | error | - | 禁止注释作为文本节点 |
| [react/style-prop-object](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/style-prop-object.md) | error | - | 强制style属性为对象 |
| [react/no-unescaped-entities](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/no-unescaped-entities.md) | error | - | 禁止未转义HTML实体 |
| [react/no-children-prop](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/no-children-prop.md) | error | - | 禁止直接传递children属性 |
| [react/jsx-tag-spacing](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-tag-spacing.md) | error | `{ closingSlash: "never" }` | 标签空格规范 |
| [react/no-array-index-key](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/no-array-index-key.md) | error | - | 禁止数组索引作为key |
| [react/void-dom-elements-no-children](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/void-dom-elements-no-children.md) | error | - | 禁止void元素包含子元素 |
| [react/jsx-curly-brace-presence](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-curly-brace-presence.md) | error | `{ props: "never" }` | 禁止不必要的大括号 |
| [react/jsx-one-expression-per-line](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-one-expression-per-line.md) | error | `{ allow: "single-child" }` | 每行单个表达式 |
| [react/button-has-type](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/button-has-type.md) | error | `{ reset: false }` | 强制按钮类型声明 |
| [react/jsx-props-no-multi-spaces](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-props-no-multi-spaces.md) | error | - | 禁止属性多个空格 |
| [react/jsx-fragments](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-fragments.md) | error | `"syntax"` | 强制使用简写片段语法 |
| [react/jsx-curly-newline](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-curly-newline.md) | error | `{ multiline: "consistent" }` | 大括号换行一致性 |
| [react/jsx-props-no-spreading](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-props-no-spreading.md) | error | `{ html: "enforce" }` | 限制属性展开使用 |
| [react/jsx-no-script-url](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-no-script-url.md) | error | - | 禁止javascript: URL |
| [react/jsx-no-useless-fragment](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/jsx-no-useless-fragment.md) | error | - | 禁止不必要的片段 |
| [react/no-namespace](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/no-namespace.md) | error | - | 禁止命名空间组件 |
| [react/no-invalid-html-attribute](https://github.com/jsx-eslint/eslint-plugin-react/blob/main/docs/rules/no-invalid-html-attribute.md) | error | - | 禁止无效HTML属性 |
| [jsx-a11y/accessible-emoji](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/accessible-emoji.md) | off | - | 禁用表情可访问性校验 |
| [jsx-a11y/alt-text](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/alt-text.md) | error | `{ elements: [...] }` | 强制替代文本 |
| [jsx-a11y/anchor-has-content](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-has-content.md) | error | `{ components: [] }` | 锚点必须包含内容 |
| [jsx-a11y/anchor-is-valid](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-is-valid.md) | error | `{ components: ["Link"] }` | 锚点有效性校验 |
| [jsx-a11y/aria-activedescendant-has-tabindex](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-activedescendant-has-tabindex.md) | error | - | activeDescendant需要tabindex |
| [jsx-a11y/aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-props.md) | error | - | 校验合法ARIA属性 |
| [jsx-a11y/aria-proptypes](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-proptypes.md) | error | - | ARIA属性类型校验 |
| [jsx-a11y/aria-role](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-role.md) | error | `{ ignoreNonDOM: false }` | 校验合法ARIA角色 |
| [jsx-a11y/aria-unsupported-elements](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-unsupported-elements.md) | error | - | 禁止不支持ARIA的元素 |
| [jsx-a11y/autocomplete-valid](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/autocomplete-valid.md) | off | - | 禁用自动完成校验 |
| [jsx-a11y/click-events-have-key-events](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/click-events-have-key-events.md) | error | - | 点击事件需对应键盘事件 |
| [jsx-a11y/control-has-associated-label](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/control-has-associated-label.md) | error | `{ ignoreElements: [...] }` | 控件需关联标签 |
| [jsx-a11y/heading-has-content](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/heading-has-content.md) | error | `{ components: [""] }` | 标题必须包含内容 |
| [jsx-a11y/iframe-has-title](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/iframe-has-title.md) | error | - | iframe必须包含标题 |
| [jsx-a11y/interactive-supports-focus](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/interactive-supports-focus.md) | error | - | 交互元素需可聚焦 |
| [jsx-a11y/label-has-associated-control](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/label-has-associated-control.md) | off | - | 禁用标签关联控件校验 |
| [jsx-a11y/media-has-caption](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/media-has-caption.md) | error | `{ audio: [] }` | 媒体元素需包含字幕 |
| [jsx-a11y/mouse-events-have-key-events](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/mouse-events-have-key-events.md) | error | - | 鼠标事件需对应键盘事件 |
| [jsx-a11y/no-access-key](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-access-key.md) | error | - | 禁止使用accessKey |
| [jsx-a11y/no-autofocus](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-autofocus.md) | error | `{ ignoreNonDOM: true }` | 禁止自动聚焦 |
| [jsx-a11y/no-distracting-elements](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-distracting-elements.md) | error | `{ elements: [...] }` | 禁止干扰性元素 |
| [jsx-a11y/no-interactive-element-to-noninteractive-role](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-interactive-element-to-noninteractive-role.md) | error | `{ tr: [...] }` | 交互元素角色限制 |
| [jsx-a11y/no-noninteractive-element-interactions](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-interactions.md) | error | `{ handlers: [...] }` | 非交互元素事件限制 |
| [jsx-a11y/no-noninteractive-element-to-interactive-role](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-to-interactive-role.md) | error | `{ ul: [...] }` | 角色转换限制 |
| [jsx-a11y/no-noninteractive-tabindex](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-tabindex.md) | error | `{ roles: [...] }` | 非交互元素tabindex限制 |
| [jsx-a11y/no-onchange](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-onchange.md) | off | - | 禁用onChange校验 |
| [jsx-a11y/no-redundant-roles](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-redundant-roles.md) | error | - | 禁止冗余ARIA角色 |
| [jsx-a11y/role-has-required-aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/role-has-required-aria-props.md) | error | - | 角色需必要ARIA属性 |
| [jsx-a11y/role-supports-aria-props](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/role-supports-aria-props.md) | error | - | ARIA属性与角色匹配 |
| [jsx-a11y/scope](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/scope.md) | error | - | scope属性限制 |
| [jsx-a11y/tabindex-no-positive](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/tabindex-no-positive.md) | error | - | 禁止正数tabindex |
| [vue/max-len](https://eslint.vuejs.org/rules/max-len.html) | error | `[100, 2, { ignoreUrls: true }]` | 行最大长度限制 |
| [vue/html-indent](https://eslint.vuejs.org/rules/html-indent.html) | error | `[2, { attribute: 1 }]` | HTML缩进规则 |
| [vue/max-attributes-per-line](https://eslint.vuejs.org/rules/max-attributes-per-line.html) | error | `{ multiline: { max: 1 } }` | 每行最大属性数 |
| [vue/no-duplicate-attributes](https://eslint.vuejs.org/rules/no-duplicate-attributes.html) | error | `{ allowCoexistClass: true }` | 禁止重复属性 |
| [vue/html-self-closing](https://eslint.vuejs.org/rules/html-self-closing.html) | error | `{ html: { void: "any" } }` | 自闭合标签规则 |
| [vue/first-attribute-linebreak](https://eslint.vuejs.org/rules/first-attribute-linebreak.html) | error | `{ multiline: "below" }` | 首属性换行规则 |
| [vue/no-spaces-around-equal-signs-in-attribute](https://eslint.vuejs.org/rules/no-spaces-around-equal-signs-in-attribute.html) | error | - | 属性等号无空格 |
| [vue/no-template-target-blank](https://eslint.vuejs.org/rules/no-template-target-blank.html) | error | `{ allowReferrer: true }` | 安全target="_blank"校验 |
| [vue/no-child-content](https://eslint.vuejs.org/rules/no-child-content.html) | error | - | 禁止子内容 |
| [vue/html-closing-bracket-spacing](https://eslint.vuejs.org/rules/html-closing-bracket-spacing.html) | error | `{ selfClosingTag: "always" }` | 闭合括号空格规则 |
| [vue/html-button-has-type](https://eslint.vuejs.org/rules/html-button-has-type.html) | error | `{ reset: false }` | 按钮类型声明 |
| [vue/no-multi-spaces](https://eslint.vuejs.org/rules/no-multi-spaces.html) | error | - | 禁止多个空格 |
| [vuejs-accessibility/alt-text](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/alt-text.md) | error | `{ elements: [...] }` | 可访问性替代文本 |
| [vuejs-accessibility/anchor-has-content](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/anchor-has-content.md) | error | `{ components: [] }` | 锚点内容校验 |
| [vuejs-accessibility/aria-props](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/aria-props.md) | error | - | ARIA属性校验 |
| [vuejs-accessibility/aria-role](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/aria-role.md) | error | `{ ignoreNonDOM: false }` | ARIA角色校验 |
| [vuejs-accessibility/aria-unsupported-elements](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/aria-unsupported-elements.md) | error | - | 不支持ARIA的元素校验 |
| [vuejs-accessibility/click-events-have-key-events](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/click-events-have-key-events.md) | error | - | 点击事件键盘支持 |
| [vuejs-accessibility/form-control-has-label](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/form-control-has-label.md) | error | - | 表单控件标签关联 |
| [vuejs-accessibility/heading-has-content](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/heading-has-content.md) | error | - | 标题内容校验 |
| [vuejs-accessibility/iframe-has-title](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/iframe-has-title.md) | error | - | iframe标题校验 |
| [vuejs-accessibility/interactive-supports-focus](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/interactive-supports-focus.md) | error | - | 交互元素聚焦支持 |
| [vuejs-accessibility/label-has-for](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/label-has-for.md) | error | `{ required: { some: [...] } }` | 标签关联控件 |
| [vuejs-accessibility/media-has-caption](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/media-has-caption.md) | error | - | 媒体字幕校验 |
| [vuejs-accessibility/mouse-events-have-key-events](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/mouse-events-have-key-events.md) | error | - | 鼠标事件键盘支持 |
| [vuejs-accessibility/no-access-key](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/no-access-key.md) | error | - | 禁止accessKey |
| [vuejs-accessibility/no-autofocus](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/no-autofocus.md) | error | `{ ignoreNonDOM: true }` | 禁止自动聚焦 |
| [vuejs-accessibility/no-distracting-elements](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/no-distracting-elements.md) | error | `{ elements: [...] }` | 禁止干扰元素 |
| [vuejs-accessibility/no-onchange](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/no-onchange.md) | off | - | 禁用onChange校验 |
| [vuejs-accessibility/no-redundant-roles](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/no-redundant-roles.md) | error | - | 禁止冗余角色 |
| [vuejs-accessibility/role-has-required-aria-props](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/role-has-required-aria-props.md) | error | - | 角色必要属性校验 |
| [vuejs-accessibility/tabindex-no-positive](https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility/blob/main/docs/tabindex-no-positive.md) | error | - | 禁止正数tabindex |
| [vue/require-default-prop](https://eslint.vuejs.org/rules/require-default-prop.html) | error | - | 要求默认prop值 |
| [vue/no-potential-component-option-typo](https://eslint.vuejs.org/rules/no-potential-component-option-typo.html) | error | - | 组件选项拼写校验 |

## 基础规则 Vue

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|----------|----------|----------|------|
| [vue/comment-directive](https://eslint.vuejs.org/rules/comment-directive.html) | error | - | 强制 Vue 模板注释指令（如 `<!-- eslint-disable -->`）的正确使用，避免 ESLint 解析冲突。 |
| [vue/jsx-uses-vars](https://eslint.vuejs.org/rules/jsx-uses-vars.html) | error | - | 防止在 Vue JSX 中使用的变量被 ESLint 误判为未使用，需配合变量引用检测。 |

## 优先级 A：必要的

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|---------|---------|---------|------|
| [vue/multi-word-component-names](https://eslint.vuejs.org/rules/multi-word-component-names.html) | error | - | 强制组件名使用多单词，避免与HTML元素冲突 |
| [vue/no-arrow-functions-in-watch](https://eslint.vuejs.org/rules/no-arrow-functions-in-watch.html) | error | - | 禁止在`watch`中使用箭头函数（避免`this`指向问题） |
| [vue/no-async-in-computed-properties](https://eslint.vuejs.org/rules/no-async-in-computed-properties.html) | error | - | 禁止在计算属性中使用异步操作 |
| [vue/no-child-content](https://eslint.vuejs.org/rules/no-child-content.html) | error | - | 禁止子组件使用`content`属性（已废弃） |
| [vue/no-computed-properties-in-data](https://eslint.vuejs.org/rules/no-computed-properties-in-data.html) | error | - | 禁止在`data`中引用计算属性 |
| [vue/no-deprecated-data-object-declaration](https://eslint.vuejs.org/rules/no-deprecated-data-object-declaration.html) | error | - | 禁止使用已弃用的`data`对象声明方式 |
| [vue/no-deprecated-delete-set](https://eslint.vuejs.org/rules/no-deprecated-delete-set.html) | error | - | 禁止使用`Vue.delete`/`Vue.set`（Vue 3已内置） |
| [vue/no-deprecated-destroyed-lifecycle](https://eslint.vuejs.org/rules/no-deprecated-destroyed-lifecycle.html) | error | - | 禁止使用已弃用的`destroyed`生命周期钩子（改用`unmounted`） |
| [vue/no-deprecated-dollar-listeners-api](https://eslint.vuejs.org/rules/no-deprecated-dollar-listeners-api.html) | error | - | 禁止使用已弃用的`$listeners` API |
| [vue/no-deprecated-dollar-scopedslots-api](https://eslint.vuejs.org/rules/no-deprecated-dollar-scopedslots-api.html) | error | - | 禁止使用已弃用的`$scopedSlots` API |
| [vue/no-deprecated-events-api](https://eslint.vuejs.org/rules/no-deprecated-events-api.html) | error | - | 禁止使用已弃用的`events` API（Vue 3已移除） |
| [vue/no-deprecated-filter](https://eslint.vuejs.org/rules/no-deprecated-filter.html) | error | - | 禁止使用已弃用的过滤器（Vue 3移除） |
| [vue/no-deprecated-functional-template](https://eslint.vuejs.org/rules/no-deprecated-functional-template.html) | error | - | 禁止使用已弃用的函数式模板语法 |
| [vue/no-deprecated-html-element-is](https://eslint.vuejs.org/rules/no-deprecated-html-element-is.html) | error | - | 禁止使用已弃用的`is`属性语法（如`<div is="...">`） |
| [vue/no-deprecated-inline-template](https://eslint.vuejs.org/rules/no-deprecated-inline-template.html) | error | - | 禁止使用已弃用的`inline-template`属性 |
| [vue/no-deprecated-model-definition](https://eslint.vuejs.org/rules/no-deprecated-model-definition.html) | error | - | 禁止使用Vue 2风格的`model`选项定义 |
| [vue/no-deprecated-props-default-this](https://eslint.vuejs.org/rules/no-deprecated-props-default-this.html) | error | - | 禁止在`props`的`default`函数中使用`this` |
| [vue/no-deprecated-router-link-tag-prop](https://eslint.vuejs.org/rules/no-deprecated-router-link-tag-prop.html) | error | - | 禁止使用已弃用的`<router-link>`的`tag`属性 |
| [vue/no-deprecated-scope-attribute](https://eslint.vuejs.org/rules/no-deprecated-scope-attribute.html) | error | - | 禁止使用已弃用的`scope`属性（改用`slot-scope`） |
| [vue/no-deprecated-slot-attribute](https://eslint.vuejs.org/rules/no-deprecated-slot-attribute.html) | error | - | 禁止使用已弃用的`slot`属性（改用`v-slot`） |
| [vue/no-deprecated-slot-scope-attribute](https://eslint.vuejs.org/rules/no-deprecated-slot-scope-attribute.html) | error | - | 禁止使用已弃用的`slot-scope`属性（改用`v-slot`） |
| [vue/no-deprecated-v-bind-sync](https://eslint.vuejs.org/rules/no-deprecated-v-bind-sync.html) | error | - | 禁止使用已弃用的`.sync`修饰符（Vue 3改用`v-model`参数） |
| [vue/no-deprecated-v-is](https://eslint.vuejs.org/rules/no-deprecated-v-is.html) | error | - | 禁止使用已弃用的`v-is`指令（改用`is`属性） |
| [vue/no-deprecated-v-on-native-modifier](https://eslint.vuejs.org/rules/no-deprecated-v-on-native-modifier.html) | error | - | 禁止使用已弃用的`.native`修饰符（Vue 3移除） |
| [vue/no-deprecated-v-on-number-modifiers](https://eslint.vuejs.org/rules/no-deprecated-v-on-number-modifiers.html) | error | - | 禁止在`v-on`指令中使用数字修饰符（如`v-on:keyup.13`） |
| [vue/no-deprecated-vue-config-keycodes](https://eslint.vuejs.org/rules/no-deprecated-vue-config-keycodes.html) | error | - | 禁止使用已弃用的`Vue.config.keyCodes` |
| [vue/no-dupe-keys](https://eslint.vuejs.org/rules/no-dupe-keys.html) | error | - | 禁止在对象属性中重复键名 |
| [vue/no-dupe-v-else-if](https://eslint.vuejs.org/rules/no-dupe-v-else-if.html) | error | - | 禁止重复的`v-else-if`条件 |
| [vue/no-duplicate-attributes](https://eslint.vuejs.org/rules/no-duplicate-attributes.html) | error | - | 禁止重复的属性声明 |
| [vue/no-export-in-script-setup](https://eslint.vuejs.org/rules/no-export-in-script-setup.html) | error | - | 禁止在`<script setup>`中使用`export` |
| [vue/no-expose-after-await](https://eslint.vuejs.org/rules/no-expose-after-await.html) | error | - | 禁止在`await`后使用`expose` |
| [vue/no-lifecycle-after-await](https://eslint.vuejs.org/rules/no-lifecycle-after-await.html) | error | - | 禁止在`await`后调用生命周期钩子 |
| [vue/no-mutating-props](https://eslint.vuejs.org/rules/no-mutating-props.html) | error | - | 禁止直接修改`props` |
| [vue/no-parsing-error](https://eslint.vuejs.org/rules/no-parsing-error.html) | error | - | 禁止模板解析错误 |
| [vue/no-ref-as-operand](https://eslint.vuejs.org/rules/no-ref-as-operand.html) | error | - | 禁止将`ref`直接作为操作数（需用`.value`） |
| [vue/no-reserved-component-names](https://eslint.vuejs.org/rules/no-reserved-component-names.html) | error | - | 禁止使用保留的组件名（如HTML/SVG标签名） |
| [vue/no-reserved-keys](https://eslint.vuejs.org/rules/no-reserved-keys.html) | error | - | 禁止使用保留的键名（如`$el`、`$props`等） |
| [vue/no-reserved-props](https://eslint.vuejs.org/rules/no-reserved-props.html) | error | - | 禁止使用保留的`props`名称（如`key`、`ref`等） |
| [vue/no-shared-component-data](https://eslint.vuejs.org/rules/no-shared-component-data.html) | error | - | 禁止组件间共享数据对象（应使用函数返回） |
| [vue/no-side-effects-in-computed-properties](https://eslint.vuejs.org/rules/no-side-effects-in-computed-properties.html) | error | - | 禁止计算属性产生副作用 |
| [vue/no-template-key](https://eslint.vuejs.org/rules/no-template-key.html) | error | - | 禁止在`<template>`上使用`key`属性 |
| [vue/no-textarea-mustache](https://eslint.vuejs.org/rules/no-textarea-mustache.html) | error | - | 禁止在`<textarea>`中使用双花括号插值 |
| [vue/no-unused-components](https://eslint.vuejs.org/rules/no-unused-components.html) | error | - | 禁止注册未使用的组件 |
| [vue/no-unused-vars](https://eslint.vuejs.org/rules/no-unused-vars.html) | error | - | 禁止声明未使用的变量 |
| [vue/no-use-computed-property-like-method](https://eslint.vuejs.org/rules/no-use-computed-property-like-method.html) | error | - | 禁止像方法一样使用计算属性 |
| [vue/no-use-v-if-with-v-for](https://eslint.vuejs.org/rules/no-use-v-if-with-v-for.html) | error | - | 禁止在同一元素上同时使用`v-if`和`v-for` |
| [vue/no-useless-template-attributes](https://eslint.vuejs.org/rules/no-useless-template-attributes.html) | error | - | 禁止无效的模板属性（如非响应式属性） |
| [vue/no-v-for-template-key-on-child](https://eslint.vuejs.org/rules/no-v-for-template-key-on-child.html) | error | - | 禁止在子组件上使用`v-for`的`key` |
| [vue/no-v-text-v-html-on-component](https://eslint.vuejs.org/rules/no-v-text-v-html-on-component.html) | error | - | 禁止在组件上使用`v-text`/`v-html` |
| [vue/no-watch-after-await](https://eslint.vuejs.org/rules/no-watch-after-await.html) | error | - | 禁止在`await`后调用`watch` |
| [vue/prefer-import-from-vue](https://eslint.vuejs.org/rules/prefer-import-from-vue.html) | error | - | 强制从`vue`导入API（而非直接访问`Vue`） |
| [vue/require-component-is](https://eslint.vuejs.org/rules/require-component-is.html) | error | - | 强制`<component>`元素使用`is`属性 |
| [vue/require-prop-type-constructor](https://eslint.vuejs.org/rules/require-prop-type-constructor.html) | error | - | 强制`props`类型使用构造函数（如`String`而非`'string'`） |
| [vue/require-render-return](https://eslint.vuejs.org/rules/require-render-return.html) | error | - | 强制`render`函数返回内容 |
| [vue/require-slots-as-functions](https://eslint.vuejs.org/rules/require-slots-as-functions.html) | error | - | 强制插槽以函数形式声明（兼容Vue 3） |
| [vue/require-toggle-inside-transition](https://eslint.vuejs.org/rules/require-toggle-inside-transition.html) | error | - | 强制在`<transition>`内使用`v-show`/`v-if` |
| [vue/require-v-for-key](https://eslint.vuejs.org/rules/require-v-for-key.html) | error | - | 强制`v-for`使用`key`属性 |
| [vue/require-valid-default-prop](https://eslint.vuejs.org/rules/require-valid-default-prop.html) | error | - | 强制`props`的`default`函数返回有效值 |
| [vue/return-in-computed-property](https://eslint.vuejs.org/rules/return-in-computed-property.html) | error | - | 强制计算属性必须有`return`语句 |
| [vue/return-in-emits-validator](https://eslint.vuejs.org/rules/return-in-emits-validator.html) | error | - | 强制`emits`验证函数返回布尔值 |
| [vue/use-v-on-exact](https://eslint.vuejs.org/rules/use-v-on-exact.html) | error | - | 强制使用`.exact`修饰符处理精确按键事件 |
| [vue/valid-attribute-name](https://eslint.vuejs.org/rules/valid-attribute-name.html) | error | - | 强制属性名有效性（如不含空格） |
| [vue/valid-define-emits](https://eslint.vuejs.org/rules/valid-define-emits.html) | error | - | 强制`defineEmits`宏的正确使用 |
| [vue/valid-define-options](https://eslint.vuejs.org/rules/valid-define-options.html) | error | - | 强制`defineOptions`宏的正确使用 |
| [vue/valid-define-props](https://eslint.vuejs.org/rules/valid-define-props.html) | error | - | 强制`defineProps`宏的正确使用 |
| [vue/valid-next-tick](https://eslint.vuejs.org/rules/valid-next-tick.html) | error | - | 强制`nextTick`的正确使用 |
| [vue/valid-template-root](https://eslint.vuejs.org/rules/valid-template-root.html) | error | - | 强制模板根元素有效性（单元素/组件） |
| [vue/valid-v-bind](https://eslint.vuejs.org/rules/valid-v-bind.html) | error | - | 强制`v-bind`指令语法正确性 |
| [vue/valid-v-cloak](https://eslint.vuejs.org/rules/valid-v-cloak.html) | error | - | 强制`v-cloak`指令无参数/值 |
| [vue/valid-v-else-if](https://eslint.vuejs.org/rules/valid-v-else-if.html) | error | - | 强制`v-else-if`必须跟在`v-if`后 |
| [vue/valid-v-else](https://eslint.vuejs.org/rules/valid-v-else.html) | error | - | 强制`v-else`必须跟在`v-if`/`v-else-if`后 |
| [vue/valid-v-for](https://eslint.vuejs.org/rules/valid-v-for.html) | error | - | 强制`v-for`指令语法正确性 |
| [vue/valid-v-html](https://eslint.vuejs.org/rules/valid-v-html.html) | error | - | 强制`v-html`指令无参数 |
| [vue/valid-v-if](https://eslint.vuejs.org/rules/valid-v-if.html) | error | - | 强制`v-if`指令语法正确性 |
| [vue/valid-v-is](https://eslint.vuejs.org/rules/valid-v-is.html) | error | - | 强制`v-is`指令语法正确性 |
| [vue/valid-v-memo](https://eslint.vuejs.org/rules/valid-v-memo.html) | error | - | 强制`v-memo`指令语法正确性 |
| [vue/valid-v-model](https://eslint.vuejs.org/rules/valid-v-model.html) | error | - | 强制`v-model`指令语法正确性 |
| [vue/valid-v-on](https://eslint.vuejs.org/rules/valid-v-on.html) | error | - | 强制`v-on`指令语法正确性 |
| [vue/valid-v-once](https://eslint.vuejs.org/rules/valid-v-once.html) | error | - | 强制`v-once`指令无参数/值 |
| [vue/valid-v-pre](https://eslint.vuejs.org/rules/valid-v-pre.html) | error | - | 强制`v-pre`指令无参数/值 |
| [vue/valid-v-show](https://eslint.vuejs.org/rules/valid-v-show.html) | error | - | 强制`v-show`指令语法正确性 |
| [vue/valid-v-slot](https://eslint.vuejs.org/rules/valid-v-slot.html) | error | - | 强制`v-slot`指令语法正确性 |
| [vue/valid-v-text](https://eslint.vuejs.org/rules/valid-v-text.html) | error | - | 强制`v-text`指令无参数 |

## 优先级 B：强烈推荐

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|---------|---------|---------|-----|
| [vue/attribute-hyphenation](https://eslint.vuejs.org/rules/attribute-hyphenation.html) | warn | - | 强制组件属性名使用连字符格式（kebab-case） |
| [vue/component-definition-name-casing](https://eslint.vuejs.org/rules/component-definition-name-casing.html) | warn | - | 强制组件定义名称的大小写（默认 PascalCase） |
| [vue/first-attribute-linebreak](https://eslint.vuejs.org/rules/first-attribute-linebreak.html) | warn | - | 控制第一个属性的换行位置 |
| [vue/html-closing-bracket-newline](https://eslint.vuejs.org/rules/html-closing-bracket-newline.html) | warn | - | 强制闭合标签的括号换行格式 |
| [vue/html-closing-bracket-spacing](https://eslint.vuejs.org/rules/html-closing-bracket-spacing.html) | warn | - | 强制闭合标签括号内外的空格规则 |
| [vue/html-end-tags](https://eslint.vuejs.org/rules/html-end-tags.html) | warn | - | 要求 HTML 标签必须有闭合标签 |
| [vue/html-indent](https://eslint.vuejs.org/rules/html-indent.html) | warn | - | 统一 HTML 元素的缩进规则 |
| [vue/html-quotes](https://eslint.vuejs.org/rules/html-quotes.html) | warn | - | 强制 HTML 属性值使用双引号 |
| [vue/html-self-closing](https://eslint.vuejs.org/rules/html-self-closing.html) | warn | - | 强制自闭合标签的格式（无内容时自动闭合） |
| [vue/max-attributes-per-line](https://eslint.vuejs.org/rules/max-attributes-per-line.html) | warn | - | 限制每行允许的最大属性数量 |
| [vue/multiline-html-element-content-newline](https://eslint.vuejs.org/rules/multiline-html-element-content-newline.html) | warn | - | 多行 HTML 元素内容前后需要换行 |
| [vue/mustache-interpolation-spacing](https://eslint.vuejs.org/rules/mustache-interpolation-spacing.html) | warn | - | 强制 Mustache 插值内的空格规则 |
| [vue/no-multi-spaces](https://eslint.vuejs.org/rules/no-multi-spaces.html) | warn | - | 禁止模板中出现连续多个空格 |
| [vue/no-spaces-around-equal-signs-in-attribute](https://eslint.vuejs.org/rules/no-spaces-around-equal-signs-in-attribute.html) | warn | - | 属性等号周围禁止空格 |
| [vue/no-template-shadow](https://eslint.vuejs.org/rules/no-template-shadow.html) | warn | - | 禁止模板内变量与父作用域变量同名（避免遮蔽） |
| [vue/one-component-per-file](https://eslint.vuejs.org/rules/one-component-per-file.html) | warn | - | 每个文件只能包含一个组件 |
| [vue/prop-name-casing](https://eslint.vuejs.org/rules/prop-name-casing.html) | warn | - | 强制 Prop 名称的格式（默认 camelCase） |
| [vue/require-default-prop](https://eslint.vuejs.org/rules/require-default-prop.html) | warn | - | 要求 Prop 必须有默认值 |
| [vue/require-explicit-emits](https://eslint.vuejs.org/rules/require-explicit-emits.html) | warn | - | 要求 `emits` 选项中明确声明触发的事件 |
| [vue/require-prop-types](https://eslint.vuejs.org/rules/require-prop-types.html) | warn | - | 要求 Prop 必须定义类型 |
| [vue/singleline-html-element-content-newline](https://eslint.vuejs.org/rules/singleline-html-element-content-newline.html) | warn | - | 单行 HTML 元素内容前后禁止换行 |
| [vue/v-bind-style](https://eslint.vuejs.org/rules/v-bind-style.html) | warn | - | 强制 `v-bind` 指令的简写或完整格式 |
| [vue/v-on-event-hyphenation](https://eslint.vuejs.org/rules/v-on-event-hyphenation.html) | warn | `"always", { autofix: true }` | 强制事件名使用连字符格式（kebab-case） |
| [vue/v-on-style](https://eslint.vuejs.org/rules/v-on-style.html) | warn | - | 强制 `v-on` 指令的简写或完整格式 |
| [vue/v-slot-style](https://eslint.vuejs.org/rules/v-slot-style.html) | warn | - | 强制 `v-slot` 指令的格式（默认缩写为 `#`） |

## 优先级 C：推荐

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|---------|---------|---------|-----|
| [vue/attributes-order](https://eslint.vuejs.org/rules/attributes-order.html) | warn | - | 强制组件属性的顺序 |
| [vue/block-order](https://eslint.vuejs.org/rules/block-order.html) | warn | - | 强制模板中块级元素的顺序 |
| [vue/no-lone-template](https://eslint.vuejs.org/rules/no-lone-template.html) | warn | - | 禁止没有内容的空模板标签 |
| [vue/no-multiple-slot-args](https://eslint.vuejs.org/rules/no-multiple-slot-args.html) | warn | - | 禁止在作用域插槽中使用多个参数 |
| [vue/no-required-prop-with-default](https://eslint.vuejs.org/rules/no-required-prop-with-default.html) | warn | - | 禁止在必需属性中设置默认值 |
| [vue/no-v-html](https://eslint.vuejs.org/rules/no-v-html.html) | warn | - | 禁止使用潜在危险的v-html指令 |
| [vue/order-in-components](https://eslint.vuejs.org/rules/order-in-components.html) | warn | - | 强制组件选项的顺序 |
| [vue/this-in-template](https://eslint.vuejs.org/rules/this-in-template.html) | warn | - | 禁止在模板中使用this上下文 |
