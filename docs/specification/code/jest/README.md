---
sidebar_position: 9
---

# Jest 规范

```js
// .eslintrc.js

module.exports = {
  extends: [
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
};
```

:::warning
在编写 Jest 代码时，可以适当关闭一些规则，避免过于严格的检查影响开发效率。但是，仍然鼓励遵循这些规范，以提高代码质量和可维护性。
:::

## 推荐规则

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|---------|---------|---------|-----|
|  [jest/expect-expect](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/expect-expect.md) | warn | - | 强制在测试中至少有一个 `expect` 断言 |
|  [jest/no-alias-methods](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-alias-methods.md) | error | - | 禁止使用 Jasmine 的别名方法（如 `toHaveBeenCalled` 代替 `toBeCalled`） |
|  [jest/no-commented-out-tests](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-commented-out-tests.md) | warn | - | 禁止注释掉的测试代码 |
|  [jest/no-conditional-expect](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-conditional-expect.md) | error | - | 禁止在条件语句中使用 `expect` |
|  [jest/no-deprecated-functions](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-deprecated-functions.md) | error | - | 禁止使用已弃用的 Jest 函数 |
|  [jest/no-disabled-tests](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-disabled-tests.md) | warn | - | 禁止使用 `describe.skip` 或 `test.skip` 禁用测试 |
|  [jest/no-done-callback](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-done-callback.md) | error | - | 禁止在异步测试中使用 `done` 回调（推荐使用 Promise/async） |
|  [jest/no-export](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-export.md) | error | - | 禁止从测试文件中导出内容 |
|  [jest/no-focused-tests](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-focused-tests.md) | error | - | 禁止提交 focused 测试（如 `describe.only` 或 `test.only`） |
|  [jest/no-identical-title](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-identical-title.md) | error | - | 禁止测试用例/描述块使用相同标题 |
|  [jest/no-interpolation-in-snapshots](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-interpolation-in-snapshots.md) | error | - | 禁止在快照中使用字符串插值 |
|  [jest/no-jasmine-globals](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-jasmine-globals.md) | error | - | 禁止使用 Jasmine 全局变量 |
|  [jest/no-mocks-import](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-mocks-import.md) | error | - | 禁止手动从 `jest-mocks` 路径导入 mock 模块 |
|  [jest/no-standalone-expect](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-standalone-expect.md) | error | - | 禁止在测试块/钩子函数外使用 `expect` |
|  [jest/no-test-prefixes](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-test-prefixes.md) | error | - | 强制使用规范的测试别名（如 `test` 代替 `it`） |
|  [jest/valid-describe-callback](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-describe-callback.md) | error | - | 强制 `describe` 回调函数的正确用法 |
|  [jest/valid-expect](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-expect.md) | error | - | 强制 `expect` 调用的有效性 |
|  [jest/valid-expect-in-promise](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-expect-in-promise.md) | error | - | 确保 Promise 中的 `expect` 被正确处理 |
|  [jest/valid-title](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-title.md) | error | - | 强制测试标题符合指定格式要求 |

## 风格

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|---------|---------|---------|-----|
|  [jest/no-alias-methods](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-alias-methods.md) | warn | - | 禁止使用别名方法（如 `toHaveBeenCalled` 代替 `toBeCalled`） |
|  [jest/prefer-to-be](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-to-be.md) | error | - | 强制使用 `toBe()` 替代 `toEqual()` 进行原始类型值的断言（如数字、布尔值） |
|  [jest/prefer-to-contain](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-to-contain.md) | error | - | 强制使用 `toContain()` 替代 `indexOf()` 检查数组/字符串包含关系 |
|  [jest/prefer-to-have-length](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-to-have-length.md) | error | - | 强制使用 `toHaveLength()` 替代直接访问 `length` 属性断言长度 |
