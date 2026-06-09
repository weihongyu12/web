---
sidebar_position: 5
---

# 测试代码规范

import TOCInline from '@theme/TOCInline';

本文档旨在为前端团队提供一套统一的测试代码编写标准，以提高测试质量、可读性和可维护性。

<TOCInline toc={toc} />

## 1. 通用规范

这些是适用于所有测试代码的基本规范。

- 使用 `const` 和 `let`: 避免使用 `var`，优先使用 `const`。
- 箭头函数: 在回调函数中使用箭头函数。
- 模板字符串: 优先使用模板字符串进行字符串拼接。
- 解构赋值: 积极使用对象和数组的解构赋值。
- Promises: Promise 的最后必须有 `.catch()` 或 `return`。避免在 `finally` 中返回值。
- 正则表达式: 编写清晰、高效且无歧义的正则表达式，避免使用可能导致性能问题的模式。

## 2. Jest (单元/集成测试)

Jest 是我们进行单元测试和集成测试的基础框架。以下规范确保测试用例的一致性和可靠性。

### 测试结构

#### 2.1 测试套件和用例应有清晰的描述

测试套件（`describe`）和测试用例（`it` 或 `test`）的标题应该是明确的字符串，不应包含插值或模板字符串。标题需要清晰地描述测试的目标。

:::tip[建议 👍]
```ts
describe('sum', () => {
  it('should return the sum of two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```
:::

:::danger[不建议 👎]
```ts
const componentName = 'sum';
describe(componentName, () => {
  it(`should correctly sum 1 and 2`, () => {
    // ...
  });
});
```
:::

#### 2.2 避免重复的测试标题

在同一个测试套件中，测试用例的标题不应重复。

:::tip[建议 👍]
```ts
describe('auth service', () => {
  it('should allow login with correct credentials', () => { /* ... */ });
  it('should prevent login with incorrect credentials', () => { /* ... */ });
});
```
:::

:::danger[不建议 👎]
```ts
describe('auth service', () => {
  it('should handle login', () => { /* ... */ });
  it('should handle login', () => { /* ... */ });
});
```
:::

#### 2.3 测试套件回调函数必须正确

`describe` 块的回调函数应该是无参数的，并且不能是 `async` 的。

:::tip[建议 👍]
```ts
describe('my component', () => {
  // ...
});
```
:::

:::danger[不建议 👎]
```ts
describe('my component', async (done) => { // 错误：不能是 async 或带参数
  // ...
});
```
:::

#### 2.4 避免在测试文件中导出内容

测试文件（例如 `*.test.ts`）应只包含测试逻辑，不应 `export`任何值。`__mocks__` 目录下的文件除外。

:::tip[建议 👍 (user.test.ts)]
```ts
import { getUser } from './user';

it('should return a user object', () => {
  expect(getUser(1)).toBeDefined();
});
```
:::

:::danger[不建议 👎 (user.test.ts)]
```ts
export const testUser = { id: 1, name: 'John Doe' }; // 错误

it('should return a user object', () => { /* ... */ });
```
:::

### 断言

#### 2.5 每个测试用例至少包含一个断言

确保每个 `it` 或 `test` 块中都执行了至少一个 `expect` 断言。

:::tip[建议 👍]
```ts
it('should be true', () => {
  expect(true).toBe(true);
});
```
:::

:::danger[不建议 👎]
```ts
it('should run without errors', () => {
  // 没有断言，即使代码不抛出错误，测试也无意义
  myFunction();
});
```
:::

#### 2.6 在 `expect` 中直接进行断言

`expect` 应该包裹断言的目标值，而不是断言本身。

:::tip[建议 👍]
```ts
expect(myFunction()).toBe(true);
```
:::

:::danger[不建议 👎]
```ts
expect(myFunction() === true); // 错误
```
:::

#### 2.7 使用更语义化的匹配器

优先使用表达意图更清晰的匹配器，而不是通用的 `toBe` 或 `toEqual`。

- 检查数组是否包含某元素，使用 `toContain`。
  - 建议 👍：`expect([1, 2, 3]).toContain(2);`
  - 不建议 👎：`expect([1, 2, 3].includes(2)).toBe(true);`
- 检查数组或字符串长度，使用 `toHaveLength`。
  - 建议 👍：`expect([1, 2]).toHaveLength(2);`
  - 不建议 👎：`expect([1, 2].length).toBe(2);`
- 检查 `null`, `undefined`, `true`, `false` 时，使用 `toBeNull`, `toBeUndefined`, `toBeDefined`, `toBeTruthy`, `toBeFalsy`。
  - 建议 👍：`expect(myVar).toBeNull()`;
  - 不建议 👎：`expect(myVar).toBe(null)`;

#### 2.8 异步测试中断言必须正确处理

当处理 Promise 时，确保断言在 `then` 或 `async/await` 结构中被正确 `return` 或 `await`。

:::tip[建议 👍 (`async/await`):]
```ts
it('should resolve with data', async () => {
  await expect(fetchData()).resolves.toEqual({ data: 'success' });
});
```
:::

:::tip[建议 👍 (`then`):]
```ts
it('should resolve with data', () => {
  return fetchData().then(data => {
    expect(data).toEqual({ data: 'success' });
  });
});
```
:::

:::danger[不建议 👎]
```ts
it('should resolve with data', () => {
  fetchData().then(data => { // 错误：没有 return
    expect(data).toEqual({ data: 'success' });
  });
});
```
:::

### 最佳实践

#### 2.9 禁止使用被禁用的或已废弃的测试方法

- 禁止使用 `f` 或 `x` 前缀来跳过或聚焦测试，如 `fit`, `ftest`, `xit`, `xtest`。提交代码前应移除这些。
- 禁止使用 `test.only` 或 `describe.only`。
- 禁止使用 `test.skip` 或 `describe.skip` 来禁用测试，除非有明确的临时理由。
- 禁止使用被注释掉的测试代码。
- 禁止使用 Jasmine 的全局变量，如 `fail`, `pending`, `spyOn`。
- 禁止使用别名方法，如 `toBeCalled()` 而不是 `toHaveBeenCalled()`。

#### 2.10 避免在测试逻辑中使用条件语句

测试应该是确定性的。在 `it` 块中避免使用 `if/else` 或三元表达式来决定是否执行断言。如果需要测试多种情况，应该拆分为多个测试用例。

:::tip[建议 👍]
```ts
it('should return true for positive numbers', () => {
  expect(isPositive(5)).toBe(true);
});

it('should return false for negative numbers', () => {
  expect(isPositive(-5)).toBe(false);
});
```
:::

:::danger[不建议 👎]
```ts
it('should handle numbers correctly', () => {
  const num = 5;
  if (num > 0) {
    expect(isPositive(num)).toBe(true);
  } else {
    expect(isPositive(num)).toBe(false);
  }
});
```
:::

#### 2.11 异步测试中避免使用 done 回调

优先使用 `async/await` 或返回 Promise 的方式来处理异步测试。

:::tip[建议 👍]
```ts
it('works with async/await', async () => {
  const result = await doSomethingAsync();
  expect(result).toBe('done');
});
```
:::

:::danger[不建议 👎]
```ts
it('works with done', (done) => { // 避免
  doSomethingAsync().then(result => {
    expect(result).toBe('done');
    done();
  });
});
```
:::

## 3. React Testing Library (组件测试)

React Testing Library (RTL) 鼓励我们像用户一样测试组件。

### 查询元素

#### 3.1 优先使用 `screen` 进行查询

总是从 `screen` 对象上调用查询函数，这能确保你测试的是用户实际看到的内容。

:::tip[建议 👍]
```tsx
import { render, screen } from '@testing-library/react';

render(<MyComponent />);
const button = screen.getByRole('button', { name: /submit/i });
```
:::

:::danger[不建议 👎]
```tsx
import { render } from '@testing-library/react';

const { getByRole } = render(<MyComponent />); // 避免解构
const button = getByRole('button', { name: /submit/i });
```
:::

#### 3.2 使用最符合用户行为的查询方式

查询元素的优先级如下：

1. `getByRole`: 能被辅助技术识别的元素。
2. `getByLabelText`: 表单元素。
3. `getByPlaceholderText`: 表单元素。
4. `getByText`: 可见文本。
5. `getByDisplayValue`: 表单元素的当前值。
6. `getByAltText`: 图片。
7. `getByTitle`: 具有 `title` 属性的元素。
8. `getByTestId`: 最后的备选方案，用于无法通过其他方式定位的元素。

#### 3.3 使用正确的查询类型 (`getBy`, `queryBy`, `findBy`)

- `getBy*`: 用于断言元素 **必须存在**，如果不存在会立即抛出错误。
- `queryBy*`: 用于断言元素 **不存在**，如果不存在会返回 `null`。
- `findBy*`: 用于断言元素 **最终会出现**（异步），它会等待元素出现，超时则抛出错误。

:::tip[建议 👍]
```ts
// 断言元素存在
expect(screen.getByText('Welcome')).toBeInTheDocument();

// 断言元素不存在
expect(screen.queryByText('Error')).not.toBeInTheDocument();

// 断言元素异步出现
await expect(screen.findByText('Loaded Data')).resolves.toBeInTheDocument();
```
:::

### 异步操作

#### 3.4 异步查询必须使用 `await`

所有 `findBy*` 查询和 `waitFor` 工具都返回 Promise，必须使用 `await`。

:::tip[建议 👍]
```ts
const loadedItem = await screen.findByText(/loaded/i);
expect(loadedItem).toBeInTheDocument();
```
:::

:::danger[不建议 👎]
```ts
// 错误：没有 await，测试会在元素出现前就执行断言
const loadedItem = screen.findByText(/loaded/i);
```
:::

#### 3.5 避免在 `waitFor` 中执行多个断言

`waitFor` 的回调函数应该只包含一个最终状态的断言。它会不断重试直到成功或超时。

:::tip[建议 👍]
```ts
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```
:::

:::danger[不建议 👎]
```ts
await waitFor(() => {
  // 错误：waitFor 应该只用于等待状态变化，而不是执行多个断言
  expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```
:::

### 用户交互

#### 3.6 用户事件交互必须使用 `await`

使用 `@testing-library/user-event` 模拟的用户交互是异步的，必须使用 `await`。

:::tip[建议 👍]
```ts
import userEvent from '@testing-library/user-event';

await userEvent.click(screen.getByRole('button'));
```
:::

:::danger[不建议 👎]
```ts
userEvent.click(screen.getByRole('button')); // 错误：交互可能未完成
```
:::

### 避免的实践

#### 3.7 不要直接操作 DOM 节点或 `container`

测试应该模拟用户行为，而不是直接访问和操作组件内部的 DOM 结构。

:::tip[建议 👍]
```ts
// 通过用户可见的文本来定位
const element = screen.getByText('Hello World');
```
:::

:::danger[不建议 👎]
```ts
const { container } = render(<MyComponent />);
// 错误：依赖于内部 DOM 结构，很脆弱
const element = container.querySelector('.my-class > span');
```
:::

#### 3.8 避免在生命周期方法中调用 `render`

例如，不要在 `beforeEach` 中调用 `render`，因为它会使测试逻辑变得不清晰。每个测试用例应该独立渲染它所需要的组件。

#### 3.9 避免手动调用 `cleanup`

RTL 会在每个测试用例结束后自动清理 DOM，无需手动调用 `cleanup()`。

#### 3.10 避免使用调试工具

提交代码前移除 `screen.debug()` 等调试函数。

## 4. Playwright (E2E 测试)

Playwright 用于端到端（E2E）测试，模拟真实用户在浏览器中的完整操作流程。

### 测试结构

#### 4.1 测试标题必须清晰、唯一

与 Jest 类似，`test` 和 `describe` 的标题应为静态字符串，清晰描述测试场景。

:::tip[建议 👍]
```ts
import { test, expect } from '@playwright/test';

test('should allow a user to log in and see the dashboard', async ({ page }) => {
  // ...
});
```
:::

#### 4.2 避免过度嵌套 `describe`

`describe` 的嵌套层级不宜过深，以保持测试结构扁平化和易读性。

#### 4.3 禁止使用 `test.only`, `test.skip`

提交到代码库的测试不应包含 `.only` 或 `.skip`，这些只应用于本地开发调试。

### 断言与交互

#### 4.4 所有 Playwright 操作都必须 `await`

几乎所有的 Playwright API 调用（如 `page.goto`, `locator.click`）都是异步的，必须使用 `await` 等待其完成。

:::tip[建议 👍]
```ts
await page.goto('[https://example.com](https://example.com)');
await page.getByRole('button', { name: 'Sign in' }).click();
```
:::

:::danger[不建议 👎]
```ts
page.goto('[https://example.com](https://example.com)'); // 错误：页面可能还未加载完成
```
:::

#### 4.5 优先使用 Web-First断言

使用 `expect(locator).toBeVisible()` 而不是 `expect(await locator.isVisible()).toBe(true)`。Web-First 断言内置了自动等待机制，使测试更稳定。

:::tip[建议 👍]
```ts
const button = page.getByRole('button');
await expect(button).toBeEnabled();
```
:::

:::danger[不建议 👎]
```ts
const button = page.getByRole('button');
const isEnabled = await button.isEnabled();
expect(isEnabled).toBe(true);
```
:::

#### 4.6 每个测试至少包含一个断言

确保 `test` 函数中至少有一个 `expect` 断言。

#### 4.7 `expect` 必须在测试函数内部

`expect` 调用必须在 `test` 函数的回调函数内部，而不能在 `describe` 层级。

:::tip[建议 👍]
```ts
test('should show title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/My App/);
});
```
:::

:::danger[不建议 👎]
```ts
test.describe('Homepage', () => {
  // 错误：expect 不能在这里
  await expect(page).toHaveTitle(/My App/);

  test('...', async ({ page }) => { /* ... */ });
});
```
:::

### 禁止的实践

#### 4.8 避免使用 `page.waitForTimeout`

硬编码的等待时间（`page.waitForTimeout()`）会使测试变得不稳定和缓慢。应使用 Web-First 断言或等待特定网络/DOM状态的 API。

#### 4.9 避免使用 `page.waitForSelector`

优先使用 `locator` API 和 Web-First断言，它们会自动等待元素出现。

:::tip[建议 👍]
```ts
await expect(page.locator('#my-element')).toBeVisible();
```
:::

:::danger[不建议 👎]
```ts
await page.waitForSelector('#my-element'); // 避免
```
:::

#### 4.10 避免使用 `element handle` ($)

`ElementHandle` API 不会自动等待，且更冗长。优先使用 `Locator` API (`page.locator`, `page.getBy`...)。

:::tip[建议 👍]
```ts
await page.locator('.submit-button').click();
```
:::

:::danger[不建议 👎]
```ts
const handle = await page.$('.submit-button'); // 避免
await handle?.click();
```
:::

#### 4.11 避免在测试逻辑中使用条件判断

与单元测试一样，E2E 测试的逻辑应该是线性和确定的。如果需要根据不同条件进行测试，请创建独立的测试用例。

#### 4.12 禁止使用 `page.pause()`

此方法用于本地调试，提交前必须移除。
