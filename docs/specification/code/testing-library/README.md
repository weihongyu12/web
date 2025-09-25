---
sidebar_position: 6
---

# Testing Library 规范

[`eslint-plugin-testing-library`](https://github.com/testing-library/eslint-plugin-testing-library) 插件专注于 React/Vue 组件的测试，特别是当你在使用 Testing Library 时。它会强制执行一些最佳实践，编写出更符合用户行为、更可维护的 React/Vue 测试。

:::warning
在编写测试代码时，可以适当关闭一些规则，避免过于严格的检查影响开发效率。但是，仍然鼓励遵循这些规范，以提高代码质量和可维护性。
:::

## React Testing Library

```js
// .eslintrc.js

module.exports = {
  extends: [
    'plugin:testing-library/react',
  ],
};
```

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|----------|----------|----------|------|
| [testing-library/await-async-events](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/await-async-events.md) | error | `{ eventModule: 'userEvent' }` | 强制异步事件操作（如 `userEvent`) 必须使用 `await` |
| [testing-library/await-async-queries](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/await-async-queries.md) | error | - | 强制异步查询（如 `findBy*`) 必须使用 `await` |
| [testing-library/await-async-utils](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/await-async-utils.md) | error | - | 强制异步工具函数（如 `waitFor`) 必须使用 `await` |
| [testing-library/no-await-sync-events](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-await-sync-events.md) | error | `{ eventModules: ['fire-event'] }` | 禁止对同步事件（如 `fireEvent`) 使用 `await` |
| [testing-library/no-await-sync-queries](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-await-sync-queries.md) | error | - | 禁止对同步查询（如 `getBy*`/`queryBy*`) 使用 `await` |
| [testing-library/no-container](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-container.md) | error | - | 禁止直接使用 `container` 操作 DOM 节点 |
| [testing-library/no-debugging-utils](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-debugging-utils.md) | warn | - | 避免提交代码中遗留调试工具（如 `debug()`） |
| [testing-library/no-dom-import](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-dom-import.md) | error | `'react'` | 强制使用框架专用库（如 `@testing-library/react`）代替通用 DOM 库 |
| [testing-library/no-global-regexp-flag-in-query](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-global-regexp-flag-in-query.md) | error | - | 禁止在查询中使用正则表达式全局匹配标志（`/g`） |
| [testing-library/no-manual-cleanup](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-manual-cleanup.md) | error | - | 强制使用自动清理机制代替手动清理 |
| [testing-library/no-node-access](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-node-access.md) | error | - | 禁止通过 `container` 访问非 React 节点 |
| [testing-library/no-promise-in-fire-event](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-promise-in-fire-event.md) | error | - | 禁止在 `fireEvent` 方法中返回 Promise |
| [testing-library/no-render-in-lifecycle](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-render-in-lifecycle.md) | error | - | 禁止在生命周期方法中调用 `render` |
| [testing-library/no-unnecessary-act](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-unnecessary-act.md) | error | - | 避免不必要的 `act` 方法包裹 |
| [testing-library/no-wait-for-multiple-assertions](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-multiple-assertions.md) | error | - | 禁止在单个 `waitFor` 中包含多个断言 |
| [testing-library/no-wait-for-side-effects](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-side-effects.md) | error | - | 禁止在 `waitFor` 回调中执行副作用 |
| [testing-library/no-wait-for-snapshot](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-snapshot.md) | error | - | 禁止在 `waitFor` 中使用快照断言 |
| [testing-library/prefer-find-by](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-find-by.md) | error | - | 推荐使用 `findBy*` 代替 `waitFor` + `getBy*` |
| [testing-library/prefer-presence-queries](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-presence-queries.md) | error | - | 推荐使用 `getBy*` 代替 `queryBy*` 检查元素存在 |
| [testing-library/prefer-query-by-disappearance](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-query-by-disappearance.md) | error | - | 推荐使用 `queryBy*` 检查元素消失 |
| [testing-library/prefer-screen-queries](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-screen-queries.md) | error | - | 推荐使用 `screen` 对象进行查询 |
| [testing-library/render-result-naming-convention](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/render-result-naming-convention.md) | error | - | 强制 `render` 结果变量使用统一命名规范 |

## Vue Testing Library

```js
// .eslintrc.js

module.exports = {
  extends: [
    'plugin:testing-library/vue',
  ],
};
```

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|----------|----------|----------|------|
| [testing-library/await-async-events](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/await-async-events.md) | error | `{ eventModule: ['fireEvent', 'userEvent'] }` | 强制异步事件操作（包括 fireEvent 和 userEvent）必须使用 `await` |
| [testing-library/await-async-queries](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/await-async-queries.md) | error | - | 强制异步查询（如 `findBy*`) 必须使用 `await` |
| [testing-library/await-async-utils](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/await-async-utils.md) | error | - | 强制异步工具函数（如 `waitFor`) 必须使用 `await` |
| [testing-library/no-await-sync-queries](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-await-sync-queries.md) | error | - | 禁止对同步查询（如 `getBy*`/`queryBy*`) 使用 `await` |
| [testing-library/no-container](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-container.md) | error | - | 禁止直接使用 `container` 操作 DOM 节点 |
| [testing-library/no-debugging-utils](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-debugging-utils.md) | warn | - | 避免提交代码中遗留调试工具（如 `debug()`） |
| [testing-library/no-dom-import](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-dom-import.md) | error | `'vue'` | 强制使用 Vue 专用库（`@testing-library/vue`）代替通用 DOM 库 |
| [testing-library/no-global-regexp-flag-in-query](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-global-regexp-flag-in-query.md) | error | - | 禁止在查询中使用正则表达式全局匹配标志（`/g`） |
| [testing-library/no-manual-cleanup](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-manual-cleanup.md) | error | - | 强制使用自动清理机制代替手动清理 |
| [testing-library/no-node-access](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-node-access.md) | error | - | 禁止通过 `container` 访问非框架节点 |
| [testing-library/no-promise-in-fire-event](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-promise-in-fire-event.md) | error | - | 禁止在 `fireEvent` 方法中返回 Promise |
| [testing-library/no-render-in-lifecycle](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-render-in-lifecycle.md) | error | - | 禁止在生命周期方法中调用 `render` |
| [testing-library/no-wait-for-multiple-assertions](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-multiple-assertions.md) | error | - | 禁止在单个 `waitFor` 中包含多个断言 |
| [testing-library/no-wait-for-side-effects](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-side-effects.md) | error | - | 禁止在 `waitFor` 回调中执行副作用 |
| [testing-library/no-wait-for-snapshot](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-snapshot.md) | error | - | 禁止在 `waitFor` 中使用快照断言 |
| [testing-library/prefer-find-by](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-find-by.md) | error | - | 推荐使用 `findBy*` 代替 `waitFor` + `getBy*` |
| [testing-library/prefer-presence-queries](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-presence-queries.md) | error | - | 推荐使用 `getBy*` 代替 `queryBy*` 检查元素存在 |
| [testing-library/prefer-query-by-disappearance](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-query-by-disappearance.md) | error | - | 推荐使用 `queryBy*` 检查元素消失 |
| [testing-library/prefer-screen-queries](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-screen-queries.md) | error | - | 推荐使用 `screen` 对象进行查询 |
| [testing-library/render-result-naming-convention](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/render-result-naming-convention.md) | error | - | 强制 `render` 结果变量使用统一命名规范 |
