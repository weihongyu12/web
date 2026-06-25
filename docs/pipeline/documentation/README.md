---
sidebar_position: 8
description: 前端文档规范，涵盖 JSDoc、TSDoc 注释标准与 Storybook 组件文档生成
---

# 文档

良好的文档是高质量前端项目的重要组成部分，能够帮助团队成员快速理解代码逻辑、API 规范和组件用法。

## JSDoc

[JSDoc](https://jsdoc.app/) 是一个用于 JavaScript 的 API 文档生成器，通过在代码中添加特定格式的注释，可以自动生成标准化的 HTML 文档。

### 特点与价值

- **类型提示**：提供静态类型信息，增强代码可读性
- **IDE 智能提示**：与现代编辑器集成，提供实时代码补全和参数提示
- **自动化文档**：从代码注释直接生成 HTML 文档网站
- **维护便捷**：代码与文档共存，降低文档过时风险

### 常用注释标签

| 标签 | 描述 | 示例 |
|------|------|------|
| `@param` | 描述函数参数 | `@param {string} name - 用户名称` |
| `@returns` | 描述返回值 | `@returns {boolean} 操作是否成功` |
| `@typedef` | 定义复杂类型 | `@typedef {Object} User` |
| `@property` | 描述对象属性 | `@property {string} id - 用户ID` |
| `@example` | 提供使用示例 | `@example getUserById('123')` |
| `@throws` | 描述可能抛出的异常 | `@throws {Error} 如果ID不存在` |

### JSDoc 在 TypeScript 中的应用

在 TypeScript 项目中，虽然类型系统已经提供了类型标注能力，但 JSDoc 仍然具有重要价值：

- **增强文档完整性**：TypeScript 类型表达语法信息，而 JSDoc 提供更丰富的描述性内容
- **跨语言兼容性**：可被非 TS 环境识别的文档格式
- **配合 TS 类型检查**：通过 `@template`、`@satisfies` 等标签增强类型系统

#### TypeScript 特有的 JSDoc 扩展

| 标签 | 描述 | 示例 |
|------|------|------|
| `@template` | 定义泛型参数 | `@template T - 集合元素类型` |
| `@satisfies` | 验证类型符合接口 | `@satisfies {EventHandler<T>}` |
| `@implements` | 声明接口实现 | `@implements {Iterator<T>}` |
| `@public` / `@private` | 访问控制 | `@private 仅内部使用` |
| `@override` | 标记覆盖父类方法 | `@override 重写父类方法` |

#### TS 项目中 JSDoc 的使用场景

1. **公共 API 接口**：为库和框架的公共 API 提供详细文档
2. **复杂算法解释**：解释难以从类型中推断的实现逻辑
3. **代码示例**：提供使用示例，即使类型已经明确
4. **废弃提醒**：使用 `@deprecated` 标记过时 API
5. **类型断言说明**：解释为何需要类型断言（Type Assertion）

#### 示例：结合 TS 与 JSDoc

```typescript
/**
 * 用于处理分页数据的工具函数
 * 
 * @template T - 列表项类型
 * @param {Array<T>} items - 完整数据列表
 * @param {number} page - 当前页码（从1开始）
 * @param {number} pageSize - 每页项目数
 * @returns {{
 *   data: Array<T>,
 *   total: number,
 *   currentPage: number,
 *   totalPages: number
 * }} 分页结果对象
 * 
 * @example
 * // 返回第2页，每页10项的数据
 * const result = paginate(allUsers, 2, 10);
 * console.log(`显示 ${result.data.length} 项，共 ${result.total} 项`);
 */
function paginate<T>(
  items: T[], 
  page: number = 1, 
  pageSize: number = 10
): {
  data: T[];
  total: number;
  currentPage: number;
  totalPages: number;
} {
  // 实现细节...
}
```

### 最佳实践

1. **为公共 API 添加文档**：所有导出的函数、类和变量都应有注释
2. **描述参数与返回值**：明确函数的输入与输出
3. **提供使用示例**：通过 `@example` 展示典型用法
4. **记录特殊情况**：如边界条件、错误处理等
5. **遵循项目规范**：保持注释风格一致

## RESTful API 文档

RESTful API 文档推荐使用 [Open API](https://www.openapis.org/)，Open API（前身是 Swagger）是用于 RESTful API 描述的规范标准，它使用结构化的 JSON 或 YAML 文件定义 API 的各个方面。

## 组件库文档

[React Styleguidist](https://react-styleguidist.js.org/) 是一个独立的组件开发环境和文档生成工具，它提供交互式组件预览和自动从组件代码和注释中提取文档。

![React Styleguidist截图](./assets/react-styleguide.avif)

### 特点与价值

- **实时预览**：组件示例可交互，支持实时编辑
- **代码示例**：自动展示组件用法示例
- **Props 文档**：自动从 PropTypes、TypeScript 类型或 Flow 注释中生成 props 表格
- **定制化**：支持自定义主题和布局
- **独立环境**：可与任何 React 项目集成

### 最佳实践

1. **分类组织组件**：按功能或类型分组展示
2. **丰富使用示例**：提供多种使用场景和配置选项
3. **交互式演示**：利用 Styleguidist 的实时编辑功能展示组件响应能力
4. **明确组件目的**：在文档开头简明描述组件功能和适用场景
5. **边界情况**：展示组件在极端情况下的表现（如空数据、错误状态）

### 示例文档

可以参考以下示例文档了解规范的组件库文档结构和最佳实践：
- [示例组件库文档](https://weihongyu12.github.io/styleguide/)

## README 文档

`README.md` 文档是项目的门面，应该简洁明了地介绍项目的目的、安装和使用方法。

### 内容建议

- **项目名称**：项目的名称和简短描述
- **安装说明**：如何安装和配置项目
- **使用示例**：简单的代码示例，展示如何使用项目
- **部署说明**：如何部署项目到生产环境
- **API 文档链接**：指向详细的 API 文档
- **组件库链接**：指向组件库的文档
- **许可证信息**：项目的许可证类型
- **联系方式**：项目维护者的联系方式
- **致谢**：感谢参与项目的人员和组织
- **常见问题**：常见问题及解决方案
- **故障排除**：常见问题及解决方案
- **参考资料**：引用的文献、工具和库

除了 `README.md`，还可以创建其他文档，例如： 

- `CONTRIBUTING.md`： 贡献指南，指导外部开发者如何参与项目
- `CHANGELOG.md`：变更日志，记录项目的版本更新和变更历史
- `LICENSE.md`：许可证，项目的使用和分发条款

## 其他文档

在项目中，可能还需要其他类型的文档，例如：

- **产品文档**：描述产品的功能、特性和使用场景
- **设计文档**：描述系统架构、模块划分和设计决策
- **用户手册**：为最终用户提供的操作指南
- **开发手册**：为开发者提供的技术细节和实现说明
- **API 文档**：详细描述 API 的使用方法和参数
- ...

这些文档可以使用 Markdown 格式编写，并使用 [GitLab Wiki](https://docs.gitlab.com/ee/user/project/wiki/)，方便团队成员查阅和维护。
