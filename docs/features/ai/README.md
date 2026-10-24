---
description: AI 编程生态梳理，涵盖主流工具、核心模型、Agent 范式、MCP 协议与项目上下文标准化约定
---

# AI 编程

:::warning
AI 领域发展迅速，本章内容具有时效性，部分信息可能随生态演进而滞后。
:::

## 1. 背景与演进

AI 编程工具从行级代码补全起步，发展为对话即编辑的 AI 原生 IDE，再到以终端为载体的自主编程 Agent。工具形态演进的同时，模型能力、协议标准、项目上下文规范也在升级。

当前 AI 编程生态可归纳为三层结构：

| 层级 | 内容 | 决定的问题 |
| --- | --- | --- |
| 模型层 | Claude Sonnet、GPT Codex、GLM 5.3、Kimi K3 等 | 方案生成与推理能力 |
| 工具层 | Cursor、Claude Code、Codex、Trae 等 | 任务执行能力 |
| 协议与约定层 | MCP、AGENTS.md、llms.txt、Skills | 可控性、可复用性、可协作性 |

三层共同决定 AI 编程的实际效果。

## 2. 主流工具

当前 AI 编程工具大致分为三类形态：嵌入式 IDE、AI 原生 IDE、终端 Agent。

### 2.1 Cursor

Anysphere 推出的 AI 原生 IDE，基于 VS Code 分叉构建。将 AI 能力集成到编辑器内核，提供 Tab 智能补全、Cmd+K 行内编辑、Composer 多文件改动、Agent 模式自主执行等能力。

交互体验成熟，上下文管理精细，可通过 `@file`、`@codebase`、`@docs` 等符号控制上下文范围，适合对话式开发场景。

### 2.2 Claude Code

Anthropic 官方推出的命令行 AI 编程工具。与 IDE 解耦，直接运行在终端中，能够读取项目文件、执行命令、运行测试、提交代码，以 Agent 形式自主完成多步骤任务。

执行过程中人工介入较少，适合长流程的重构、迁移、批量改动等场景，也可与任意编辑器组合使用。

### 2.3 Codex

OpenAI 推出的编程 Agent 工具，以 CLI 为核心载体，结合云端的 Codex 模型执行任务。支持在仓库中并行处理多个任务，采用任务委派模式：描述意图后，Codex 在隔离环境中规划并执行改动，再返回结果供审查。

提供 IDE 插件，但核心思路仍是云端 Agent。

### 2.4 Trae

字节跳动推出的 AI 原生 IDE 国内版，面向中文开发者。在 Cursor 式的对话编辑体验基础上，接入国产模型（如 GLM、Doubao 等），并对中文语境、国内开发工作流做了适配。

适用于受网络与合规限制、需要使用国产模型栈的团队。

## 3. 核心模型

工具的能力由背后的模型决定。当前在编程任务上表现突出的模型主要有以下几类。

### 3.1 Claude Sonnet

Anthropic 的 Claude Sonnet 系列是性能与成本均衡的主力模型。在编程任务上长期处于第一梯队，尤其在长上下文理解、代码重构、Agent 多步推理方面表现稳定。Claude Code 默认即基于 Claude Sonnet 系列模型。

### 3.2 GPT Codex

OpenAI 面向软件工程优化的模型，专为 Agent 化的编程任务训练。在理解大型代码库、规划跨文件改动、执行测试与验证方面具有较强能力，是 Codex 工具的默认模型。

### 3.3 GLM 5.3

智谱 AI 推出的编程向模型，在中文代码场景、国产化技术栈适配上具有优势。常作为 Trae 等国产工具的后端模型之一，提供符合国内合规要求的编程能力。

### 3.4 Kimi K3

月之暗面推出的模型，以超长上下文窗口见长，适合一次性分析整个仓库或长篇技术文档的任务。

### 3.5 模型选型参考

| 模型 | 强项 | 典型场景 |
| --- | --- | --- |
| Claude Sonnet | 长上下文、Agent 推理 | 重构、迁移、多步任务 |
| GPT Codex | 大仓库理解、跨文件规划 | 任务委派、批量改动 |
| GLM 5.3 | 中文场景、国产适配 | 国内合规项目 |
| Kimi K3 | 超长上下文 | 超大仓库、长文档分析 |

## 4. AGENT 智能体

AGENT（智能体）是当前 AI 编程的核心范式。与传统“单轮问答”不同，Agent 能够：

- **自主规划**：将高层目标拆解为可执行步骤
- **调用工具**：读写文件、执行命令、调用 API、访问网络
- **观察反馈**：根据执行结果（报错、测试输出）调整后续行动
- **循环迭代**：在多次尝试中逐步逼近目标

Agent 将开发方式从逐行编写代码转变为描述意图并审查结果。Claude Code、Codex 是典型的 Agent 形态工具。

Agent 也带来新的挑战：可控性、安全性、成本控制，以及对项目上下文的依赖。后续的 MCP、AGENTS.md、Skills 等约定，都是针对这些挑战提出的方案。

## 5. MCP Server

MCP（Model Context Protocol）是 Anthropic 于 2024 年底提出并开源的协议，用于标准化 AI 模型与外部数据源、工具之间的连接方式。

### 5.1 架构

MCP 采用 Client–Server 架构：

- **MCP Server**：暴露特定能力（如读数据库、查文档、操作飞书、调浏览器）给 AI
- **MCP Client**：内嵌在 AI 工具中（Claude Code、Cursor、Trae 等均支持），消费 Server 提供的能力

### 5.2 价值

MCP 的核心作用是解耦：

- 工具厂商不必为每个外部系统单独写集成
- 外部系统也不必为每个 AI 工具做适配
- 任何符合 MCP 协议的 Server，都能被任何支持 MCP 的 Client 调用

这降低了生态碎片化，Agent 可通过统一协议接入外部系统。

### 5.3 典型场景

- 通过 MCP Server 让 AI 读写数据库
- 操作云服务（OSS、CDN、容器）
- 检索企业知识库
- 控制浏览器执行 E2E 测试
- 对接协同工具（飞书、Jira、Git）

### 5.4 前端常用 MCP Server

| MCP Server | 能力 |
| --- | --- |
| [ESLint](https://eslint.org/docs/head/use/mcp) | 对指定文件执行 lint、返回诊断结果、查询规则详情，辅助 AI 定位与修复问题 |
| [shadcn](https://ui.shadcn.com/docs/mcp) | 浏览、搜索并安装组件注册表中的组件，支持多注册表与命名空间 |
| [Orval](https://www.npmjs.com/package/@orval/mcp) | 从 OpenAPI 规范生成业务 MCP Server，将 API 操作暴露为 Agent 可调用的工具 |
| [Playwright](https://github.com/microsoft/playwright-mcp) | 基于无障碍树驱动浏览器：导航、点击、填写表单、截图与页面检查 |
| [GraphOS（Apollo）](https://www.apollographql.com/docs/graphos/platform/graphos-mcp-tools) | 检索 Apollo 文档、执行 Schema 检查与 graph 构建辅助，具体能力取决于 GraphOS 服务与权限 |
| [Handsontable](https://dev.handsontable.com/docs/react-data-grid/docs-mcp-server/) | 对 Handsontable 与 HyperFormula 文档做语义检索，返回权威 API 说明 |
| [SVAR](https://docs.svar.dev/ai/) | 检索 SVAR 最新文档、API 参考与代码示例 |

## 6. 项目上下文标准化

Agent 在具体项目中高效工作的前提是理解项目上下文。围绕这一需求，社区形成了几项约定。

### 6.1 AGENTS.md

`AGENTS.md` 是一项开放标准，约定在项目根目录放置一份 Markdown 文件，向 AI Agent 提供项目级的指令与上下文，例如：

- 项目结构与目录约定
- 编码规范、命名规则
- 构建、测试、部署命令
- 不应触碰的敏感文件
- 特定的技术决策与原因

`AGENTS.md` 的作用类似于面向新成员的项目说明文档，让 Agent 在执行任务前了解项目约定。与 Claude Code 的 `CLAUDE.md`、Cursor 的 `.cursorrules` 思路一致，但追求跨工具通用。

<details>
<summary>AGENTS.md 示例（React 项目）</summary>

````markdown
# AGENTS.md

AI 编码代理在本仓库的唯一操作契约，每次任务前完整阅读。
只写 AI 无法从代码、配置或 `package.json` 推断的规则；本文件与 lint 配置冲突时，以配置为准。

技术栈：React 19 + TypeScript + Rsbuild + shadcn/ui + Tailwind CSS。
TanStack Query 管服务端状态，Zustand 管客户端状态，API 客户端由 orval 生成，
表单用 React Hook Form + zod。测试：Vitest + Playwright。

## 1. 命令

命令一律通过 `package.json` 的 script 调用，执行前先读 `package.json`。
禁止用 `npx` / `pnpm dlx` 绕过脚本直接调 `vitest`、`eslint`、`tsc` 等二进制；脚本未覆盖时用 `pnpm exec <bin>`。

- **只读**：`pnpm run lint`、`pnpm run type-check`、`pnpm run test:unit`、`pnpm run test:e2e`
- **改文件**：`pnpm run fix`
- **起进程**：`pnpm run dev`（不自动打开浏览器）
- **不要用**：
  - `pnpm run test`（全量 unit + e2e，需 dev server，耗时）
  - `pnpm run dev:open`（会自动打开浏览器，AI 环境用不到）

指定文件：

- JS/TS 可精确到文件：`pnpm run lint:js <file>`、`pnpm run fix:js <file>`。
- **不要给 `pnpm run lint` / `pnpm run fix` 传文件**：内部是 `run-p` / `run-s`，会把参数当任务名报 `Task not found`。

## 2. 完成定义

按序执行，全部通过才算完成：

1. `pnpm run fix:js <受影响文件>`
2. `pnpm run type-check`
3. `pnpm run lint:js <受影响文件>`
4. `pnpm run test:unit <受影响文件>`
5. 用户可见流程追加 `pnpm run test:e2e`

**改动了 CSS/SCSS 时**，第 1、3 步改为全量 `pnpm run fix` 与 `pnpm run lint`（Stylelint 暂不支持单文件入口）。

**提交前追加一次全量 `pnpm run fix && pnpm run lint`**，捕获跨文件的 lint 问题；跑完用 `git diff` 确认没有越界改动，有则还原。

ESLint 若启用 type-aware 规则，先 `pnpm run type-check` 再 `pnpm run fix:js`。
任何失败必须修复重跑，不得跳过或注释规则。

## 3. 参考资料

以下为各库官方 `llms.txt`，**按需读取**：只在与该库相关的任务中打开，不要一次性全部加载。
无法访问网络时，以 `node_modules` 类型定义为准，不得凭记忆猜 API。

- React https://react.dev/llms.txt
- Zustand https://zustand.docs.pmnd.rs/llms.txt
- Rsbuild https://rsbuild.rs/llms.txt
- Module Federation https://module-federation.io/llms.txt
- Rsdoctor https://rsdoctor.rs/llms.txt
- Vitest https://vitest.dev/llms.txt
- shadcn/ui https://ui.shadcn.com/llms.txt
- Lucide https://lucide.dev/llms.txt
- Handsontable https://handsontable.com/docs/llms.txt
- Orval https://orval.dev/llms.txt
- Zod https://zod.dev/llms.txt
- Apollo https://www.apollographql.com/docs/llms.txt
- i18next https://www.i18next.com/llms.txt
- @dnd-kit https://dndkit.com/llms.txt
- React Hook Form https://react-hook-form.com/llms.txt

涉及 orval 配置或生成物时，**不得凭记忆猜配置项与生成结构**；以 `docs` 与 `node_modules` 类型定义为准。

## 4. 目录与导入

按文件类型分层，非 feature-based：

```
src/
├── assets/                # 全局静态资源
├── components/            # 公共组件
│   ├── ui/                # shadcn/ui 组件，直接从 @/components/ui 导入
│   ├── Editor/            # 业务组件，每个组件一个目录
│   │   ├── index.tsx
│   │   ├── components/    # 私有子组件
│   │   └── assets/        # 私有资源
│   └── index.ts           # 桶文件，仅导出非 shadcn/ui 组件
├── hooks/                 # 跨页面复用的 hooks
├── layouts/               # 页面布局组件
├── services/              # HTTP 封装
│   ├── mutator/
│   │   └── axios.ts       # orval 运行时注入的请求封装，允许修改
│   ├── orders/            # orval 生成物（按服务分目录），禁止手改
│   └── users/             # 同上
├── router/                # 路由表与路由配置
├── stores/                # Zustand 客户端状态
├── utils/                 # 纯函数工具
├── pages/                 # 页面组件，每个页面一个目录
├── App.tsx
└── main.tsx
```

- 新文件归入现有目录，不新建顶层目录（确需新建先确认）。
- 导入统一用 `@/` 别名，禁止三层以上相对路径；类型用 `import type`。
- 业务组件从 `@/components` 桶文件导入，**不引用组件深层路径**。
  新增业务组件必须同步更新 `src/components/index.ts`，否则视为未完成。
- shadcn/ui 组件位于 `src/components/ui/`，直接从 `@/components/ui/xxx` 导入，**不经过桶文件**；桶文件只导出业务组件。
- `pages/<Page>/` 与 `components/<Component>/` 结构一致：`index.tsx`、私有 `components/`（含桶文件 `index.ts`）、私有 `assets/`。页面私有子组件不导出到全局桶文件，只在页面内部引用。
- `src/router/` 放路由表与路由配置；`src/pages/` 只放页面组件，页面组件不自行注册路由。
- 布局组件放 `src/layouts/`。

## 5. 架构边界

- **禁止手改 orval 生成物**（`src/services/` 下除 `mutator/` 外的目录）；改契约须改 OpenAPI 源文件后重新生成。
- **API 调用只走 orval 生成的 TanStack Query hooks + zod**：组件内禁止直接 `fetch` / `axios`；手写封装只放 `src/services/` 非生成文件。
- **服务端状态只归 TanStack Query**：不存 `useState` / Zustand，Zustand 仅用于纯客户端状态。query key 用集中工厂函数，mutation 成功后精确 invalidate，不全局 invalidate。
- **异步三态必须写全** loading / error / empty，禁止只写 happy path。
- 表单统一 React Hook Form + `zodResolver`，类型由 `z.infer` 导出。
- 变更范围最小化：不顺手重构无关代码，不碰 workflow、迁移、锁文件。
- **新增 npm 依赖必须先确认**，实现前先查 `package.json` 已有依赖。

## 6. 路由

CRUD 页面按以下模式命名 URL 与组件：

- 列表页：`/example`，组件为模块名（如 `Product`）
- 详情页：`/example/:id`，组件为模块名 + `Detail`（如 `ProductDetail`）
- 新增页：`/example/new`，组件为模块名 + `New`（如 `ProductNew`）
- 编辑页：`/example/:id/edit`，组件为模块名 + `Edit`（如 `ProductEdit`）
- 操作页：`/example/:id/action`，按操作语义命名

必选参数用 `params`，可选参数用 `query`。
登录 / 注册 / 改密固定用 `/login`、`/register`、`/change-password`。

## 7. 日期、金额与工具

- 日期全部用 `date-fns`，禁止 `Date` 做业务运算。时间戳以 UTC 存储传输，仅展示层转本地时区。
- 金额计算全部用 `math.js`（`BigNumber`），禁止 JS 四则运算与 `parseFloat` 浮点计算。边界处以字符串或 `BigNumber` 传递，展示用 `Intl.NumberFormat`。
- 能用 `es-toolkit` / `ahooks` 明显简化代码时优先使用，但不为用库而包装。纯函数放 `src/utils/`，复用 hooks 放 `src/hooks/`。

## 8. 安全

- 用户输入或外部 API 的 URL 放入 `href` / `src` / `window.open` 前，必须经 `@braintree/sanitize-url`。**以 `/` 开头的内部路由放行，不经过该函数。**
- 禁止 `dangerouslySetInnerHTML`。确需渲染 HTML 时须 `DOMPurify.sanitize` + `trustedTypes`，返回值保持 TrustedHTML，并注释说明为何无法用组件替代。
- 禁止 `eval`、`new Function`、`document.write`、动态 `<script>`。
- 不读不提交 `.env*` 中未在 `.env.example` 声明的变量，不硬编码密钥。
- 禁止 `--force` 推送或重写已共享分支；不捏造路径、命令、包名。

## 9. 代码风格与注释

`eslint.config.ts` 与 `stylelint.config.js` 是唯一真相来源（已含 Airbnb、Unicorn、TS ESLint、jsx-a11y 等规则组）。
**规则冲突时以 Airbnb 为准**；不得自行修改或禁用这些规则，确需例外时先说明理由并等待确认。

- 不用 `forEach` 做映射或收集；异步不混用 `.then` 与 `async`；不留浮空 Promise。
- 导出的公共函数写 JSDoc；注释解释「为什么」，不复述代码，不写翻译式注释。
- 复杂正则与晦涩公式必须注释；技术债用 `TODO` 标明原因与移除条件。
- 禁止提交 `console.log`、注释掉的代码、无 issue 的 `TODO`、未使用变量。
- Tailwind class 用 `cn()` 合并；shadcn 组件不改源码，需要时外层包装。

**格式工具**：仓库不提供业务代码格式化脚本。不要手动调用 Biome 或 Prettier，也不要另建格式化流程；业务代码格式由 ESLint（`pnpm run fix`）负责，Biome 仅由 Orval 生成流程调用以格式化生成物。

更详细的代码风格规则位于 `.trae/rules/`，仅作补充；与本文件或 lint 实际结果冲突时，以 lint 结果为准。

## 10. 资源

图片优先 `?as=avif`（经 RSbuild 转换）；SVG 优先经 SVGR 作为组件引用。

## 11. 测试与本地运行

- **改动任何代码必须新增或更新测试**，即使任务未要求。
- Vitest 与实现 co-locate，mock API；Playwright 走真实流程，用 `getByRole` / `getByLabel` 选择器。修 bug 先写失败测试复现。
- 单测用 `pnpm run test:unit <文件>`；E2E 用 `pnpm run test:e2e`。
- 涉及 URL / 富文本渲染的改动必须补 XSS 用例；涉及视觉改动须用 Playwright 跑通并说明验证了哪些状态。
- 浏览器验证前先检测 `curl -sf http://localhost:3000`：可响应则复用，不重复启动；不可响应则 `pnpm run dev` 后再次验证。`dev` 不带 `--open`，不会自动打开浏览器。
- 项目开启 `strictPort`，3000 被占时启动会直接失败。**禁止改用 3001 或其他端口继续**——E2E 的 `baseURL` 固定为 3000，漂移会误过或产生误导性失败。遇到冲突停止并报告，不 kill 该进程，不将错就错。
- 任务结束**主动 kill 本次任务启动的 dev server**，需要时再手动重启。
````
</details>

### 6.2 llms.txt

`llms.txt` 借鉴 `robots.txt` 的思路，是面向大语言模型的网站信息标准（由 llmstxt.org 推动）。网站在根路径放置 `llms.txt`，以 Markdown 格式提供：

- 站点概览与核心价值
- 关键页面链接
- 文档摘要
- 对 LLM 友好的内容索引

目标是让 LLM 在被问及某网站/产品时，能快速获取权威、结构化的信息，而非依赖训练数据中可能过时的片段。对文档站点、API 平台、开源项目尤其有用。

前端主流库已陆续提供官方 llms.txt，例如：

- React https://react.dev/llms.txt
- Zustand https://zustand.docs.pmnd.rs/llms.txt
- Rsbuild https://rsbuild.rs/llms.txt
- Module Federation https://module-federation.io/llms.txt
- Rsdoctor https://rsdoctor.rs/llms.txt
- Vitest https://vitest.dev/llms.txt
- shadcn/ui https://ui.shadcn.com/llms.txt
- Lucide https://lucide.dev/llms.txt
- Handsontable https://handsontable.com/docs/llms.txt
- Orval https://orval.dev/llms.txt
- Zod https://zod.dev/llms.txt
- Apollo https://www.apollographql.com/docs/llms.txt
- i18next https://www.i18next.com/llms.txt
- @dnd-kit https://dndkit.com/llms.txt
- React Hook Form https://react-hook-form.com/llms.txt

在 AGENTS.md 中登记项目依赖对应的 llms.txt 地址并约定按需读取，Agent 处理相关任务时可直接获取权威文档，而非依赖训练记忆。

### 6.3 Skills

Skills 是“可复用能力封装”的统称，不同工具实现略有差异，核心思路一致：将一类常见任务（如“生成 REST 接口”“发飞书消息”“跑测试并修复”）封装为带描述、参数、执行逻辑的技能单元，供 Agent 按需调用。

Skills 的作用包括：

- **复用**：把团队沉淀的工作流固化为可调用的能力
- **可控**：明确定义 Agent 能做什么、不能做什么
- **组合**：多个 Skill 可被 Agent 串联完成复杂任务

与 MCP Server 形成互补：MCP 偏向连接外部系统，Skills 偏向封装内部工作流。

**技能分发**：[skills.sh](https://www.skills.sh/) 是 Vercel 维护的开放技能注册表，收录社区发布的 Skills，供 Claude Code、Cursor、Codex 等主流 Agent 安装使用，命令统一为 `npx skills add <仓库地址> --skill <名称>`。

前端开发常用的 Skills：

| Skill | 用途 | 安装命令 |
| --- | --- | --- |
| find-skills | 在 Agent 会话内搜索并安装 skills.sh 上的技能，免切换到浏览器查找 | `npx skills add vercel-labs/skills --skill find-skills` |
| grill-me | 需求拷问：对方案做系统性提问，逐分支走查决策树，能从代码库找到答案的问题不重复询问，直到形成共识 | `npx skills add mattpocock/skills --skill grill-me` |
| grill-with-docs | grill-me 的领域文档版：结合 CONTEXT.md、ADR 等文档拷问方案，澄清模糊术语、解决命名冲突，并在决策后更新文档 | `npx skills add mattpocock/skills --skill grill-with-docs` |
| prototype | 可抛弃原型：UI 分支在同一路由生成多套可切换的界面方案，逻辑分支用终端应用验证状态机；问题得到回答后删除原型或将结论并入正式代码 | `npx skills add mattpocock/skills --skill prototype` |
| frontend-design | Anthropic 官方设计技能：先确定美学方向，再围绕排版、配色、动效、空间构图产出前端界面，避免 AI 生成界面同质化 | `npx skills add anthropics/skills --skill frontend-design` |
| tdd | 测试驱动开发：垂直切片推进（一个测试、一段实现循环），测试面向公共接口验证行为而非实现细节，全部通过后再重构 | `npx skills add mattpocock/skills --skill tdd` |
| agent-browser | 浏览器自动化 CLI：支持无头 Chromium、真实 Chrome 与云端浏览器，会话跨命令持久，供 Agent 检查页面实际效果 | `npx skills add vercel-labs/agent-browser --skill agent-browser` |
| vercel-react-best-practices | React / Next.js 性能规则集：70 条规则按影响分级，覆盖数据获取、重渲染优化、包体积，供编码与重构参考 | `npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices` |
| web-design-guidelines | 按 Vercel Web Interface Guidelines 审查 UI 代码的设计与可访问性问题，输出 file:line 格式的问题清单 | `npx skills add vercel-labs/agent-skills --skill web-design-guidelines` |
| design-mobile-apps | 对接 sleek.design：通过 REST API 以自然语言描述移动端界面需求，获取渲染后的设计稿 | `npx skills add designed-by-ai/skills --skill design-mobile-apps` |

上述 Skills 可串联为前端从需求到验收的完整链路：

1. grill-me / grill-with-docs 拷问需求，澄清边界条件与领域术语
2. prototype 在同一路由切换多套 UI 方案，确定设计方向
3. frontend-design 锁定美学方向编写正式代码，编码时参考 vercel-react-best-practices
4. tdd 补齐测试并执行红绿重构循环修复
5. agent-browser 启动浏览器验证页面实际效果，web-design-guidelines 审查设计合规

该链路的各环节均有成熟工程实践对应（需求评审、原型探索、测试补齐与回归修复、端到端验证），作为整体属于 Agent Skills 生态的社区实践，而非正式标准。

除通用工作流 Skills 外，主流前端库也官方维护了覆盖自身生态的 Skills：

| 库 | Skill | 覆盖内容 | 安装命令 |
| --- | --- | --- | --- |
| Apollo Client | apollo-client | Apollo Client 4.x 的安装配置、缓存策略、hooks 与 React 集成 | `npx skills add apollographql/skills --skill apollo-client` |
| es-toolkit | guide、recommend、migrate | 安装与导入指南、按场景推荐函数、lodash 迁移 | `npx skills add toss/es-toolkit` |
| Handsontable | handsontable、hyperformula | 数据表格与公式引擎的配置、插件与版本迁移，按产品版本发布 | `/plugin marketplace add handsontable/handsontable-skills`（Claude Code） |
| Module Federation | mf | 统一入口：查阅文档、检查配置、排查 Remote、Shared 与运行时加载问题 | `npx skills add module-federation/agent-skills --skill mf` |
| Rsbuild | rsbuild-best-practices、migrate-to-rsbuild | 构建配置、CLI 工作流、类型检查、产物优化、调试与迁移 | `npx skills add rstackjs/agent-skills --skill rsbuild-best-practices`、`npx skills add rstackjs/agent-skills --skill migrate-to-rsbuild` |
| shadcn/ui | shadcn | 组件搜索、安装与组合规则（表单、Card、图标等），自动读取项目配置与已装组件清单 | `npx skills add shadcn/ui --skill shadcn` |
| SVAR | svar-react（另有 svar-svelte、svar-vue） | SVAR React 组件（Gantt、Grid 等）的配置与开发 | `npx skills add svar-widgets/skills --skill svar-react` |
| TanStack Table | 随 npm 包分发的版本化 Skills | v9 表格架构、功能注册、状态管理、devtools 与 v8 迁移 | `npx @tanstack/intent@latest install` |

### 6.4 约定对比

| 约定 | 作用范围 | 核心目标 |
| --- | --- | --- |
| AGENTS.md | 项目内 | 向 Agent 提供项目约定 |
| llms.txt | 网站根路径 | 让 LLM 获取站点权威信息 |
| Skills | 工具/团队级 | 封装可复用工作流 |
| MCP Server | 跨系统 | 标准化连接外部能力 |

## 7. 实践建议

### 7.1 工具与模型组合

工具与模型的组合取决于项目特征与团队约束：

- 受合规限制的国内项目：Trae + GLM 5.3 / Doubao
- 长流程重构与迁移：Claude Code + Claude Sonnet
- 对话式日常开发：Cursor + 多模型按需切换
- 超大代码库一次性分析：Kimi K3 长上下文能力

### 7.2 项目上下文建设

无论选择哪款工具，都应重视项目上下文建设：

1. 维护 `AGENTS.md`（或对应工具的等价文件），明确项目约定
2. 对外文档站点补充 `llms.txt`，提升 LLM 可读性
3. 将高频工作流封装为 Skills，沉淀团队经验
4. 通过 MCP Server 接入外部系统，扩展 Agent 能力边界

### 7.3 可控性与成本

Agent 模式下需关注：

- **可控性**：明确 Agent 的权限边界（可读写哪些路径、可执行哪些命令）
- **安全性**：避免 Agent 触碰密钥、生产环境、敏感数据
- **成本控制**：长流程任务消耗 token 较多，需结合预算与任务价值评估

## 8. 结语

构建 AI 编程工作流的核心，是围绕项目特征组合模型、工具、协议与约定。模型层决定方案生成与推理能力，工具层决定任务执行能力，协议与约定层决定可控性、可复用性与可协作性。
