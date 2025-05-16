---
sidebar_position: 1
---

# 代码规范

本文档集合定义了项目中所有编程语言和框架的代码规范，旨在保证代码质量、提高团队协作效率、降低维护成本。每个开发者都应当熟悉并遵循这些规范。

## 通用原则

无论使用何种语言或框架，以下原则适用于所有代码：

1. **一致性** - 遵循团队已有的代码风格和约定
2. **可读性** - 编写易于理解和维护的代码
3. **简洁性** - 避免冗余和重复代码
4. **可测试性** - 编写便于测试的代码结构
5. **可扩展性** - 设计灵活、可扩展的代码架构

## 规范执行工具

项目使用多种工具自动执行规范检查：

- **[ESLint](https://eslint.org/)** - JavaScript/TypeScript 代码检查
- **[Stylelint](https://stylelint.io/)** - CSS/Sass 代码检查
- **[html-validate](https://html-validate.org/)** - HTML 代码检查
- **[Prettier](https://prettier.io/)** - 代码格式化
- **[husky](https://typicode.github.io/husky/)/[lint-staged](https://github.com/lint-staged/lint-staged)** - 提交前代码检查

每个规范文档中都详细说明了相关工具配置和使用方法。

## 规范概览

以下是各类技术栈的规范文档：

### HTML

HTML 规范专注于标签语义化和优化 DOM 结构，确保页面代码的可读性和可访问性：

- 强调语义化标签使用（如 `<article>`, `<section>`, `<nav>` 等）
- 减少不必要的 DOM 层级，优化页面性能
- 遵循 `html-validate:recommended` 标准进行验证
- 确保正确的元素嵌套关系和属性使用
- 标签闭合和属性格式的一致性

[查看 HTML 规范详情](./html/)

### CSS

CSS 规范基于 `stylelint-config-twbs-bootstrap` 配置，注重代码组织和性能优化：

- 使用 CSS 命名规范（如 BEM 或 OOCSS）
- 避免过度特定的选择器，减少选择器嵌套
- 优先使用类选择器而非标签或属性选择器
- 避免使用 `!important`
- 采用简写属性提高代码简洁性
- 遵循移动优先的响应式设计原则

[查看 CSS 规范详情](./css/)

:::tip
参见 [Airbnb CSS/Sass 风格指南](https://github.com/airbnb/css) 和 [Airbnb CSS-in-JS 风格指南](https://airbnb.io/javascript/css-in-javascript/)
:::

### Sass

Sass 规范继承自 CSS 规范，并扩展了预处理器特有的最佳实践：

- 合理组织变量、Mixin 和函数
- 避免深层次的选择器嵌套（不超过 3 层）
- 按功能拆分文件，使用部分文件（_partial）
- 使用 `@import` 和 `@use` 合理组织模块
- 采用一致的变量命名方式（kebab-case）
- 避免在 Mixin 中生成大量重复代码

[查看 Sass 规范详情](./sass/)

### JavaScript

JavaScript 规范采用 `eslint-config-airbnb-base` 作为基础配置，强调现代 JS 特性和最佳实践：

- 优先使用 ES6+ 语法特性（箭头函数、解构、模板字符串等）
- 避免副作用，倾向于函数式编程理念
- 变量使用 `const` 和 `let`，避免 `var`
- 严格的错误处理和异步编程规范
- 一致的代码格式化（缩进、空格、分号等）
- 模块化设计，明确的导入/导出规则

[查看 JavaScript 规范详情](./javascript/)

:::tip
参见 [Airbnb JavaScript 风格指南](https://airbnb.io/javascript/)
:::

### TypeScript

TypeScript 规范基于 `eslint-config-airbnb-typescript`，聚焦于类型安全和 TS 特性正确使用：

- 严格的类型检查（启用 `strict` 模式）
- 合理使用接口（Interface）和类型别名（Type）
- 避免过度使用 `any` 类型
- 利用泛型增强代码复用性和类型安全
- 类型和值的清晰分离
- 正确处理 null 和 undefined 值
- 适当使用高级类型（联合类型、交叉类型、映射类型等）

[查看 TypeScript 规范详情](./typescript/)

### React

React 规范基于 `eslint-config-airbnb` 和 React 团队推荐实践，关注组件设计和性能：

- 函数组件和 Hooks 优先
- 组件职责单一，提倡组合而非继承
- Props 和 State 的合理使用和验证
- 性能优化策略（React.memo、useMemo、useCallback）
- JSX 格式规范和最佳实践
- 可访问性（a11y）规则的严格遵守
- 合理的文件和目录结构组织
- 测试友好的组件设计

:::tip
参见 [Airbnb React 风格指南](https://airbnb.io/javascript/react/)
:::

[查看 React 规范详情](./react/)

### Vue

Vue 规范采用 Vue 官方推荐的最佳实践，适配 Vue 3 的新特性：

- 组合式 API 与选项式 API 的使用场景区分
- 单文件组件（SFC）的格式规范
- 组件通信最佳实践（props、emit、provide/inject）
- 响应式系统的正确使用（ref/reactive）
- 生命周期钩子的合理应用
- 性能优化指南（如异步组件、keep-alive）
- Vue Router 和 Pinia/Vuex 的集成规范
- 可测试性设计考量

[查看 Vue 规范详情](./vue/)

:::tip
参见 [Vue 风格指南](https://vuejs.org/style-guide/)
:::

### Next.js

Next.js 规范聚焦于服务端渲染和性能优化的最佳实践：

- 页面路由和布局组织方式
- 数据获取策略（SSR、SSG、ISR、CSR）
- 图像和字体等资源的优化处理
- 服务端与客户端代码分离管理
- API 路由的设计和安全考量
- 环境变量和配置管理
- 合理使用 Next.js 特有组件（如 Image, Link, Script）
- SEO 和性能优化策略

[查看 Next.js 规范详情](./nextjs/)

### Jest

Jest 测试规范定义了单元测试和集成测试的编写准则：

- 测试文件组织和命名约定
- 测试套件和用例的结构设计
- Mock 和 Stub 的合理使用
- 异步测试的正确写法
- 快照测试的适用场景
- 测试覆盖率要求和报告方式
- 持续集成中的测试策略
- 测试驱动开发（TDD）的实践指南

[查看 Jest 规范详情](./jest/)

### Playwright

Playwright 端到端测试规范定义了 E2E 测试的编写和组织方式：

- 页面对象模式的实现
- 测试环境和浏览器配置
- 稳定性策略（等待、重试、超时）
- 数据管理和测试隔离
- 视觉测试和截图比对
- 性能测试指标采集
- 并行测试执行策略
- 测试报告和失败分析方法

[查看 Playwright 规范详情](./playwright/)
