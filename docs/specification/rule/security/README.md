---
sidebar_position: 8
---

# 安全规则

## no-unsanitized

[`eslint-plugin-no-unsanitized`](https://github.com/mozilla/eslint-plugin-no-unsanitized) 旨在防止 XSS。它会扫描代码中可能将未净化的用户输入渲染到 DOM 中的危险模式。例如，它会警告你直接将用户输入传递给 `innerHTML`、`document.write` 或其他可能执行恶意脚本的 API。

```js
// .eslintrc.js

module.exports = {
  extends: [
    'plugin:no-unsanitized/recommended-legacy',
  ],
};
```

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|----------|----------|----------|------|
| [no-unsanitized/method](https://github.com/mozilla/eslint-plugin-no-unsanitized/blob/main/docs/rules/method.md) | error | - | 检查 JavaScript 中不安全的 DOM 方法调用（如 `insertAdjacentHTML`），防止未经消毒的内容被插入页面，以避免 XSS 攻击 |
| [no-unsanitized/property](https://github.com/mozilla/eslint-plugin-no-unsanitized/blob/main/docs/rules/property.md) | error | - | 检查 JavaScript 中不安全的 DOM 属性赋值（如 `innerHTML` 和 `outerHTML`），防止未经消毒的内容被插入页面，以避免 XSS 攻击 |

## RisXSS

[`eslint-plugin-risxss`](https://github.com/theodo/RisXSS) 是一个专门用于检测和预防 XSS 的 ESLint 插件。它的核心目标是在前端框架（如 React 和 Vue）中，自动识别出可能导致安全漏洞的代码模式。

```js
// .eslintrc.js

module.exports = {
  plugin: [
    'risxss',
  ],
  rules: {
    'risxss/catch-potential-xss-react': 'error',
    // 'risxss/catch-potential-xss-vue': 'error',
  },
};
```

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|----------|----------|----------|------|
| [risxss/catch-potential-xss-react](https://github.com/theodo/RisXSS/blob/master/docs/rules/catch-potential-xss-react.md) | error | - | 用于检测 React 应用中潜在的 XSS 风险，例如对 `dangerouslySetInnerHTML` 的不安全使用。 |
| [risxss/catch-potential-xss-vue](https://github.com/theodo/RisXSS/blob/master/docs/rules/catch-potential-xss-vue.md) | error | - | 用于检测 Vue 应用中潜在的 XSS 风险，例如对 `v-html` 指令的不安全使用。 |

