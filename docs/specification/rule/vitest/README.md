---
sidebar_position: 6
description: Vitest 测试框架 ESLint 规则，基于官方 @vitest/eslint-plugin 插件，确保测试代码符合最佳实践
---

# Vitest 规则

[`@vitest/eslint-plugin`](https://github.com/vitest-dev/eslint-plugin-vitest) 是 Vitest 官方维护的 ESLint 插件，针对 Vitest 测试框架提供推荐规则，用于确保测试文件的语法和最佳实践符合 Vitest 的要求，例如检查测试用例的命名、断言的使用等。

## 配置

Flat Config（ESLint v9+）：

```js
// eslint.config.js
// $ pnpm add -D @vitest/eslint-plugin
import vitest from '@vitest/eslint-plugin';

export default [
  {
    files: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
];
```

Legacy Config（ESLint v8 及以下）：

```js
// .eslintrc.js

module.exports = {
  extends: [
    'plugin:@vitest/legacy-recommended',
  ],
};
```

:::tip
在 Flat Config 中，规则以 `vitest/` 为前缀（如 `vitest/valid-title`）；在 Legacy Config 中，规则以 `@vitest/` 为前缀（如 `@vitest/valid-title`）。
:::

:::tip
若在 `vitest.config.ts` 中开启了 `globals: true`，可在 Flat Config 中声明全局测试 API，避免 `no-undef` 报错：

```js
{
  files: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
  plugins: { vitest },
  rules: { ...vitest.configs.recommended.rules },
  languageOptions: {
    globals: {
      ...vitest.environments.env.globals,
    },
  },
}
```
:::

:::warning
在编写 Vitest 测试代码时，可以适当关闭一些规则，避免过于严格的检查影响开发效率。但是，仍然鼓励遵循这些规范，以提高代码质量和可维护性。
:::

## 推荐规则

以下规则由 `vitest.configs.recommended`（Legacy Config 中为 `plugin:@vitest/legacy-recommended`）默认开启：

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|---------|---------|---------|-----|
| [vitest/expect-expect](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/expect-expect.md) | error | - | 强制测试用例中至少有一个 `expect` 断言 |
| [vitest/no-commented-out-tests](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-commented-out-tests.md) | error | - | 禁止注释掉的测试代码 |
| [vitest/no-conditional-expect](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-conditional-expect.md) | error | - | 禁止在条件语句中使用 `expect` |
| [vitest/no-disabled-tests](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-disabled-tests.md) | warn | - | 禁止使用 `describe.skip` / `test.skip` 等方式禁用测试 |
| [vitest/no-focused-tests](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-focused-tests.md) | error | - | 禁止提交 focused 测试（如 `describe.only` / `test.only`） |
| [vitest/no-identical-title](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-identical-title.md) | error | - | 禁止测试用例/描述块使用相同标题 |
| [vitest/no-import-node-test](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-import-node-test.md) | error | - | 禁止导入 `node:test` 模块，应使用 Vitest 提供的 API |
| [vitest/no-interpolation-in-snapshots](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-interpolation-in-snapshots.md) | error | - | 禁止在快照中使用字符串插值 |
| [vitest/no-mocks-import](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-mocks-import.md) | error | - | 禁止手动从 `__mocks__` 目录导入 mock 模块 |
| [vitest/no-standalone-expect](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-standalone-expect.md) | error | - | 禁止在 `it` / `test` 块或钩子函数外使用 `expect` |
| [vitest/no-unneeded-async-expect-function](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-unneeded-async-expect-function.md) | error | - | 禁止为 `resolves` / `rejects` 断言包裹多余的 `async` 函数 |
| [vitest/prefer-called-exactly-once-with](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-called-exactly-once-with.md) | error | - | 优先使用 `toHaveBeenCalledExactlyOnceWith` 断言函数被精确调用一次且参数匹配 |
| [vitest/require-local-test-context-for-concurrent-snapshots](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/require-local-test-context-for-concurrent-snapshots.md) | error | - | 并发测试中使用快照断言时，必须使用局部测试上下文 |
| [vitest/valid-describe-callback](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/valid-describe-callback.md) | error | - | 强制 `describe` 回调函数的正确用法 |
| [vitest/valid-expect](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/valid-expect.md) | error | - | 强制 `expect` 调用的有效性 |
| [vitest/valid-expect-in-promise](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/valid-expect-in-promise.md) | error | - | 确保 Promise 中的 `expect` 被正确处理 |
| [vitest/valid-title](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/valid-title.md) | error | - | 强制测试标题符合指定格式要求 |

## 可选规则

以下规则未包含在推荐配置中，可按需在 `rules` 中手动开启。使用 `vitest.configs.all` 可以 warn 级别开启全部规则：

| 规则名称 | 建议级别 | 配置选项 | 描述 |
|---------|---------|---------|-----|
| [vitest/max-nested-describe](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/max-nested-describe.md) | error | `max` | 限制 `describe` 的最大嵌套层数（如 `{ max: 3 }`） |
| [vitest/no-alias-methods](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-alias-methods.md) | error | - | 禁止使用别名断言方法（如使用 `toBeCalled` 代替 `toHaveBeenCalled`） |
| [vitest/no-conditional-tests](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-conditional-tests.md) | error | - | 禁止使用条件语句包裹测试逻辑 |
| [vitest/no-duplicate-hooks](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-duplicate-hooks.md) | error | - | 禁止在同一个测试套件中重复定义钩子函数 |
| [vitest/no-large-snapshots](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-large-snapshots.md) | warn | `maxSize` | 限制快照的大小与行数，保持快照文件可读 |
| [vitest/no-test-prefixes](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-test-prefixes.md) | error | - | 禁止使用 `x` / `f` 前缀别名，应使用 `.skip` / `.only` |
| [vitest/no-test-return-statement](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-test-return-statement.md) | error | - | 禁止在测试回调中使用 `return` 语句返回值，应使用断言 |
| [vitest/prefer-hooks-on-top](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-hooks-on-top.md) | warn | - | 强制钩子函数位于 `describe` 块顶部 |
| [vitest/prefer-to-be](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-be.md) | error | - | 强制使用 `toBe()` 替代 `toEqual()` 进行原始类型值的断言（如数字、布尔值） |
| [vitest/prefer-to-contain](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-contain.md) | error | - | 强制使用 `toContain()` 替代 `indexOf()` 检查数组/字符串包含关系 |
| [vitest/prefer-to-have-length](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-have-length.md) | error | - | 强制使用 `toHaveLength()` 替代直接访问 `length` 属性断言长度 |
