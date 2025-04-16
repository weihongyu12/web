---
sidebar_position: 6
---

# React 规范

```js
// .eslintrc.js

module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
  ],
};
```

:::warning
- 截止至目前，`eslint-config-airbnb` 仍不支持 ESLint 9.x 版本，使用时请注意。使用时请使用 ESLint 8.x 版本，耐心等待 `eslint-config-airbnb` 升级。
- 由于 `eslint-config-airbnb` 项目的一些管理问题，导致其更新比较缓慢，后续需要持续关注项目情况。部分规则可能不适用于现在项目的实际情况，请根据实际情况进行覆盖。
:::

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|--------------|------------|--------------|----------|
| [`jsx-quotes`](https://eslint.org/docs/rules/jsx-quotes) | error | `prefer-double` | 强制 JSX 属性使用双引号（如 `<Component prop="value" />`） |
| [`class-methods-use-this`](https://eslint.org/docs/rules/class-methods-use-this) | error | `exceptMethods: [...]`（包含 React 生命周期方法） | 类方法必须使用 `this`，但排除 React 生命周期方法（如 `render`, `componentDidMount` 等） |
| [`react/display-name`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md) | off | `ignoreTranspilerName: false` | 关闭组件必须定义 `displayName` 的检查 |
| [`react/forbid-prop-types`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md) | error | `forbid: ['any', 'array', 'object']` | 禁止使用 `PropTypes.any`、`array`、`object` |
| [`react/forbid-dom-props`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-dom-props.md) | off | `forbid: []` | 关闭禁止特定 DOM 属性的检查 |
| [`react/jsx-boolean-value`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md) | error | `never` | 布尔属性值必须显式写为 `={true}`（如 `<Component active={true} />`） |
| [`react/jsx-closing-bracket-location`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md) | error | `line-aligned` | JSX 闭合括号必须与标签开始对齐 |
| [`react/jsx-closing-tag-location`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md) | error | - | 闭合标签必须与开始标签对齐 |
| [`react/jsx-curly-spacing`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md) | error | `never`, `allowMultiline: true` | JSX 花括号内禁止空格，但允许多行内容 |
| [`react/jsx-handler-names`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md) | off | `eventHandlerPrefix: 'handle'`, `eventHandlerPropPrefix: 'on'` | 关闭事件处理函数命名检查 |
| [`react/jsx-indent-props`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md) | error | `2` | JSX 属性缩进为 2 个空格 |
| [`react/jsx-key`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-key.md) | off | - | 关闭检查列表元素缺少 `key` 属性 |
| [`react/jsx-max-props-per-line`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md) | error | `maximum: 1`, `when: 'multiline'` | 单行最多 1 个属性，多行时不受限制 |
| [`react/jsx-no-bind`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md) | error | 允许箭头函数、忽略 DOM 组件等 | 禁止在 JSX 中使用 `.bind()` 或箭头函数（性能优化） |
| [`react/jsx-no-duplicate-props`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md) | error | `ignoreCase: true` | 禁止重复的 JSX 属性（不区分大小写） |
| [`react/jsx-no-literals`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md) | off | `noStrings: true` | 关闭禁止 JSX 中使用字符串字面量的检查 |
| [`react/jsx-no-undef`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md) | error | - | 禁止使用未定义的 JSX 组件 |
| [`react/jsx-pascal-case`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md) | error | `allowAllCaps: true` | 组件名必须使用帕斯卡命名法（如 `MyComponent`） |
| [`react/sort-prop-types`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-prop-types.md) | off | 忽略大小写、回调函数位置等 | 关闭对 `propTypes` 排序的检查 |
| [`react/jsx-sort-props`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md) | off | 保留属性优先（如 `key`, `ref`） | 关闭对 JSX 属性排序的检查 |
| [`react/jsx-uses-react`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md) | error | - | 防止 `React` 被标记为未使用（React 17+ 需注意） |
| [`react/jsx-uses-vars`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md) | error | - | 防止 JSX 中使用的变量被标记为未使用 |
| [`react/no-danger`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger.md) | warn | - | 警告使用 `dangerouslySetInnerHTML`（XSS 风险） |
| [`react/no-deprecated`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md) | error | - | 禁止使用已废弃的 React API（如 `componentWillMount`） |
| [`react/no-did-update-set-state`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md) | error | - | 禁止在 `componentDidUpdate` 中调用 `setState`（可能导致循环） |
| [`react/no-will-update-set-state`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-will-update-set-state.md) | error | - | 禁止在 `componentWillUpdate` 中调用 `setState` |
| [`react/no-is-mounted`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md) | error | - | 禁止使用已废弃的 `this.isMounted()` |
| [`react/no-string-refs`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md) | error | - | 禁止使用字符串类型的 `ref`（推荐函数或 `createRef`） |
| [`react/prefer-es6-class`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md) | error | `always` | 强制使用 ES6 类组件（而非 `React.createClass`） |
| [`react/prefer-stateless-function`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md) | error | `ignorePureComponents: true` | 优先使用无状态函数组件（允许 `PureComponent`） |
| [`react/prop-types`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md) | error | 必须声明 `propTypes` | 强制组件定义 PropTypes |
| [`react/react-in-jsx-scope`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md) | error | - | 确保 JSX 中 `React` 在作用域内（React 17+ 可关闭） |
| [`react/self-closing-comp`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md) | error | - | 强制没有子组件的标签自闭合（如 `<Component />`） |
| [`react/sort-comp`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-comp.md) | error | 定义生命周期方法的顺序和分组 | 强制组件方法按约定顺序排列 |
| [`react/jsx-wrap-multilines`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md) | error | 多行 JSX 用括号包裹并换行 | 强制多行 JSX 用括号包裹并换行 |
| [`react/jsx-no-target-blank`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md) | error | `enforceDynamicLinks: 'always'` | 强制 `target="_blank"` 时包含 `rel="noopener noreferrer"` |
| [`react/jsx-filename-extension`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md) | error | `extensions: ['.jsx']` | 仅允许在 `.jsx` 文件中编写 JSX |
| [`react/no-unescaped-entities`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md) | error | - | 禁止未转义的 HTML 实体（如 `>` 应写为 `&gt;`） |
| [`react/no-array-index-key`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md) | error | - | 禁止用数组索引作为 `key`（可能导致渲染问题） |
| [`react/no-unused-state`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unused-state.md) | error | - | 禁止未使用的 `state` 字段 |
| [`react/jsx-curly-brace-presence`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md) | error | `props: 'never'`, `children: 'never'` | 禁止 JSX 属性或子元素中不必要的花括号 |
| [`react/function-component-definition`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md) | error | 强制函数组件使用函数声明或箭头函数 | 统一函数组件的定义方式 |
| [`react/jsx-no-constructed-context-values`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md) | error | - | 禁止将未缓存的直接创建的对象/数组作为 Context 值 |

## React Hooks

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|----------|-------|----------|------|
| [`react-hooks/rules-of-hooks`](https://github.com/facebook/react/blob/c11015ff4f610ac2924d1fc6d569a17657a404fd/packages/eslint-plugin-react-hooks/src/RulesOfHooks.js) | error | - | 确保 Hooks 在函数组件或自定义 Hook 的最顶层调用，禁止在循环、条件或嵌套函数中使用。 |
| [`react-hooks/exhaustive-deps`](https://github.com/facebook/react/blob/1204c789776cb01fbaf3e9f032e7e2ba85a44137/packages/eslint-plugin-react-hooks/src/ExhaustiveDeps.js)                  | error | - | 检查 `useEffect`、`useMemo` 等 Hook 的依赖项是否完整，避免因依赖缺失导致逻辑错误。  |

## a11y

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|----------|----------|----------|------|
| [`jsx-a11y/accessible-emoji`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/accessible-emoji.md) | off | - | 已废弃，要求 Emoji 包含无障碍提示（推荐用 `<span role="img">` 替代） |
| [`jsx-a11y/alt-text`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/alt-text.md) | error | `elements: ['img', 'object', 'area', 'input[type="image"]` | 强制图片等媒体元素必须有 `alt` 属性 |
| [`jsx-a11y/anchor-has-content`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-has-content.md) | error | `components: []` | 强制 `<a>` 标签必须有内容（可配置自定义组件） |
| [`jsx-a11y/anchor-is-valid`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-is-valid.md) | error | `components: ['Link'], specialLink: ['to'], aspects: [...]` | 强制 `<a>` 标签使用有效 `href` 或路由属性（如 React Router 的 `to`） |
| [`jsx-a11y/aria-activedescendant-has-tabindex`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-activedescendant-has-tabindex.md) | error | - | 使用 `aria-activedescendant` 时必须定义 `tabIndex` |
| [`jsx-a11y/aria-props`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-props.md) | error | - | 强制 ARIA 属性名称合法 |
| [`jsx-a11y/aria-proptypes`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-proptypes.md) | error | - | 强制 ARIA 属性值类型合法 |
| [`jsx-a11y/aria-role`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-role.md) | error | `ignoreNonDOM: false` | 强制 ARIA `role` 值合法（默认检查非 DOM 元素） |
| [`jsx-a11y/aria-unsupported-elements`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-unsupported-elements.md) | error | - | 禁止在非交互元素上使用 ARIA 角色/属性 |
| [`jsx-a11y/autocomplete-valid`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/autocomplete-valid.md) | off | `inputComponents: []` | 强制 `autocomplete` 属性合法（已关闭） |
| [`jsx-a11y/click-events-have-key-events`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/click-events-have-key-events.md) | error | - | 强制点击事件（如 `onClick`）绑定键盘事件（如 `onKeyUp`） |
| [`jsx-a11y/control-has-associated-label`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/control-has-associated-label.md) | error | `ignoreElements: [...], ignoreRoles: [...], depth: 5` | 强制交互控件（如按钮）关联标签 |
| [`jsx-a11y/heading-has-content`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/heading-has-content.md) | error | `components: ['']` | 强制标题标签（如 `<h1>`）包含内容 |
| [`jsx-a11y/html-has-lang`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/html-has-lang.md) | error | - | 强制 `<html>` 标签定义 `lang` 属性 |
| [`jsx-a11y/iframe-has-title`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/iframe-has-title.md) | error | - | 强制 `<iframe>` 包含 `title` 属性 |
| [`jsx-a11y/img-redundant-alt`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/img-redundant-alt.md) | error | - | 禁止冗余的 `alt` 文本（如 "image of..."） |
| [`jsx-a11y/interactive-supports-focus`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/interactive-supports-focus.md) | error | - | 强制交互元素（如按钮）支持聚焦 |
| [`jsx-a11y/label-has-associated-control`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/label-has-associated-control.md) | error | `assert: 'both', depth: 25` | 强制 `<label>` 关联表单控件（如 `input`） |
| [`jsx-a11y/lang`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/lang.md) | error | - | 强制 `lang` 属性值符合语言代码规范 |
| [`jsx-a11y/media-has-caption`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/media-has-caption.md) | error | `audio: [], video: [], track: []` | 强制 `<audio>`/`<video>` 包含字幕 |
| [`jsx-a11y/mouse-events-have-key-events`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/mouse-events-have-key-events.md) | error | - | 强制鼠标事件（如 `onMouseOver`）绑定键盘事件 |
| [`jsx-a11y/no-access-key`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-access-key.md) | error | - | 禁止使用 `accessKey`（易与辅助技术快捷键冲突） |
| [`jsx-a11y/no-autofocus`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-autofocus.md) | error | `ignoreNonDOM: true` | 禁止使用 `autoFocus`（允许非原生 DOM 元素） |
| [`jsx-a11y/no-distracting-elements`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-distracting-elements.md) | error | `elements: ['marquee', 'blink']` | 禁止干扰性元素（如 `<marquee>`） |
| [`jsx-a11y/no-noninteractive-element-interactions`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-interactions.md) | error | `handlers: [...]` | 禁止非交互元素（如 `<div>`）绑定交互事件 |
| [`jsx-a11y/no-noninteractive-tabindex`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-tabindex.md) | error | `roles: ['tabpanel']` | 禁止非交互元素使用 `tabIndex`（允许 `tabpanel` 角色） |
| [`jsx-a11y/no-onchange`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-onchange.md) | off | - | 已关闭，推荐用 `onBlur` 替代 `onChange` |
| [`jsx-a11y/no-redundant-roles`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-redundant-roles.md) | error | - | 禁止冗余 ARIA 角色（如 `<button role="button">`） |
| [`jsx-a11y/no-static-element-interactions`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-static-element-interactions.md) | error | `handlers: [...]` | 禁止静态元素（如 `<div>`）绑定交互事件 |
| [`jsx-a11y/role-has-required-aria-props`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/role-has-required-aria-props.md) | error | - | 强制 ARIA 角色具备必要属性（如 `checkbox` 需 `aria-checked`） |
| [`jsx-a11y/role-supports-aria-props`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/role-supports-aria-props.md) | error | - | 强制 ARIA 属性与角色兼容（如 `aria-hidden` 不能用于 `role="alert"`） |
| [`jsx-a11y/scope`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/scope.md) | error | - | 强制 `<th>` 使用 `scope` 属性（如 `scope="col"`） |
| [`jsx-a11y/tabindex-no-positive`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/tabindex-no-positive.md) | error | - | 禁止 `tabIndex > 0`（破坏自然键盘导航顺序） |
| [`jsx-a11y/label-has-for`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/label-has-for.md) | off | `components: [], required: { every: [...] }` | 已废弃，强制 `<label>` 关联控件（改用 `label-has-associated-control`） |

