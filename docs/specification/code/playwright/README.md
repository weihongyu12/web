---
sidebar_position: 9
---

# Playwright 规范

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|---------|---------|---------|-----|
| [`no-empty-pattern`](https://eslint.org/docs/latest/rules/no-empty-pattern) | off | - | 禁止对象/数组解构中使用空模式（ESLint 核心规则） |
| [`playwright/expect-expect`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/expect-expect.md) | warn | - | 强制在测试中至少有一个 `expect` 断言 |
| [`playwright/max-nested-describe`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/max-nested-describe.md) | warn | - | 限制 `describe` 块的嵌套层级深度 |
| [`playwright/missing-playwright-await`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/missing-playwright-await.md) | error | - | 强制对 Playwright 异步操作使用 `await` |
| [`playwright/no-conditional-expect`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-conditional-expect.md) | warn | - | 禁止在条件语句中使用 `expect` |
| [`playwright/no-conditional-in-test`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-conditional-in-test.md) | warn | - | 禁止在测试块中使用条件语句 |
| [`playwright/no-element-handle`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-element-handle.md) | warn | - | 禁止使用已弃用的 `ElementHandle`（推荐使用 `Locator`） |
| [`playwright/no-eval`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-eval.md) | warn | - | 禁止在 Playwright 脚本中使用 `evaluate()` 执行不安全代码 |
| [`playwright/no-focused-test`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-focused-test.md) | error | - | 禁止提交 focused 测试（如 `test.only()`） |
| [`playwright/no-force-option`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-force-option.md) | warn | - | 禁止使用 `{ force: true }` 强制操作选项 |
| [`playwright/no-nested-step`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-nested-step.md) | warn | - | 禁止在 `test.step()` 中嵌套使用 `test.step()` |
| [`playwright/no-networkidle`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-networkidle.md) | error | - | 禁止使用不可靠的 `networkidle` 导航选项 |
| [`playwright/no-page-pause`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-page-pause.md) | warn | - | 禁止提交调试用的 `page.pause()` 调用 |
| [`playwright/no-skipped-test`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-skipped-test.md) | warn | - | 禁止提交跳过的测试（如 `test.skip()`） |
| [`playwright/no-standalone-expect`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-standalone-expect.md) | error | - | 禁止在测试块/钩子函数外使用 `expect` |
| [`playwright/no-unsafe-references`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-unsafe-references.md) | error | - | 禁止跨测试文件共享不安全引用（如 `page` 对象） |
| [`playwright/no-useless-await`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-useless-await.md) | warn | - | 禁止对非异步操作使用冗余的 `await` |
| [`playwright/no-useless-not`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-useless-not.md) | warn | - | 禁止使用冗余的 `.not` 断言修饰符 |
| [`playwright/no-wait-for-selector`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-wait-for-selector.md) | warn | - | 禁止使用 `page.waitForSelector`（推荐使用 `locator.waitFor()`） |
| [`playwright/no-wait-for-timeout`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-wait-for-timeout.md) | warn | - | 禁止使用固定的 `page.waitForTimeout`（推荐使用事件驱动等待） |
| [`playwright/prefer-web-first-assertions`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/prefer-web-first-assertions.md) | error | - | 强制使用 Web 优先断言（如 `expect(locator).toHaveText()`） |
| [`playwright/valid-describe-callback`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/valid-describe-callback.md) | error | - | 强制 `describe` 回调函数的正确用法 |
| [`playwright/valid-expect`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/valid-expect.md) | error | - | 强制 `expect` 调用的有效性 |
| [`playwright/valid-expect-in-promise`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/valid-expect-in-promise.md) | error | - | 确保 Promise 中的 `expect` 被正确处理 |
| [`playwright/valid-title`](https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/valid-title.md) | error | - | 强制测试标题符合指定格式要求 |
