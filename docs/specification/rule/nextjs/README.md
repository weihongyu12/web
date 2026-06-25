---
sidebar_position: 5
description: Next.js 框架 ESLint 规则，基于 @next/eslint-plugin-next 官方推荐规则集
---

# Next.js 规则

[`@next/eslint-plugin-next`](https://nextjs.org/docs/app/api-reference/config/eslint) 是针对 Next.js 框架的官方推荐规则集。它会检查 Next.js 项目中的常见错误和最佳实践，例如确保 `next/image` 组件的正确使用，或者 `Link` 组件的 `href` 属性格式正确等，有助于编写符合 Next.js 规范的代码。

```js
// .eslintrc.js

module.exports = {
  extends: [
    'plugin:@next/next/recommended',
  ],
};
```

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|----------|----------|----------|------|
| [@next/next/google-font-display](https://nextjs.org/docs/messages/google-font-display) | warn | - | 强制在Google Font链接中指定`display`属性 |
| [@next/next/google-font-preconnect](https://nextjs.org/docs/messages/google-font-preconnect) | warn | - | 检测缺失的Google Font预连接 |
| [@next/next/next-script-for-ga](https://nextjs.org/docs/messages/next-script-for-ga) | warn | - | 要求Google Analytics使用Next.js的`Script`组件 |
| [@next/next/no-async-client-component](https://nextjs.org/docs/messages/no-async-client-component) | warn | - | 禁止在客户端组件中使用异步函数 |
| [@next/next/no-before-interactive-script-outside-document](https://nextjs.org/docs/messages/no-before-interactive-script-outside-document) | warn | - | 检测在文档外使用`beforeInteractive`脚本 |
| [@next/next/no-css-tags](https://nextjs.org/docs/messages/no-css-tags) | warn | - | 禁止手动添加CSS标签 |
| [@next/next/no-head-element](https://nextjs.org/docs/messages/no-head-element) | warn | - | 要求使用Next.js的`Head`组件代替原生`<head>` |
| [@next/next/no-html-link-for-pages](https://nextjs.org/docs/messages/no-html-link-for-pages) | warn | - | 要求使用Next.js路由代替静态`<a>`标签 |
| [@next/next/no-img-element](https://nextjs.org/docs/messages/no-img-element) | warn | - | 强制使用Next.js的`Image`组件代替`<img>` |
| [@next/next/no-page-custom-font](https://nextjs.org/docs/messages/no-page-custom-font) | warn | - | 禁止在页面中直接添加自定义字体 |
| [@next/next/no-styled-jsx-in-document](https://nextjs.org/docs/messages/no-styled-jsx-in-document) | warn | - | 禁止在`_document`中使用`styled-jsx` |
| [@next/next/no-sync-scripts](https://nextjs.org/docs/messages/no-sync-scripts) | warn | - | 检测同步加载的脚本 |
| [@next/next/no-title-in-document-head](https://nextjs.org/docs/messages/no-title-in-document-head) | warn | - | 要求使用`<Head>`组件设置标题 |
| [@next/next/no-typos](https://nextjs.org/docs/messages/no-typos) | warn | - | 检测Next.js API名称拼写错误 |
| [@next/next/no-unwanted-polyfillio](https://nextjs.org/docs/messages/no-unwanted-polyfillio) | warn | - | 防止不必要的Polyfill.io使用 |
| [@next/next/inline-script-id](https://nextjs.org/docs/messages/inline-script-id) | error | - | 强制内联脚本必须包含ID |
| [@next/next/no-assign-module-variable](https://nextjs.org/docs/messages/no-assign-module-variable) | error | - | 禁止修改`module`变量 |
| [@next/next/no-document-import-in-page](https://nextjs.org/docs/messages/no-document-import-in-page) | error | - | 禁止在页面组件中导入`_document` |
| [@next/next/no-duplicate-head](https://nextjs.org/docs/messages/no-duplicate-head) | error | - | 防止重复的`<Head>`组件 |
| [@next/next/no-head-import-in-document](https://nextjs.org/docs/messages/no-head-import-in-document) | error | - | 禁止在`_document`中导入`Head`组件 |
| [@next/next/no-script-component-in-head](https://nextjs.org/docs/messages/no-script-component-in-head) | error | - | 禁止在`<head>`中使用`Script`组件 |
