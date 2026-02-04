---
lang: zh-cmn-Hans-CN
title: 指南
description: 架构指南和总览
---

# 架构

![前端架构](./assets/architecture.png?as=avif)

## 总览

| 特性/平台         | C端 - PC端              | C端 - 移动端（React）       | C端 - 移动端（Vue）          | B端 - PC端              |
|---------------|-----------------------|-----------------------|------------------------|-----------------------|
| 框架            | Next.js               | Next.js               | Vue                    | React                 |
| 打包工具          | RSpack                | RSpack                | Vite                   | RSpack                |
| UI 组件/框架      | Tailwind CSS          | Tailwind CSS          | Tailwind CSS           | Ant Design Pro        |
| 路由            | -                     | -                     | Vue Router             | React Router          |
| 路由模式          | history               | history               | hash                   | hash                  |
| 状态管理          | -                     | -                     | Pinia                  | Zustand               |
| TypeScript    | ✔️                    | ✔️                    | ✔️                     | ✔️                    |
| ESLint        | airbnb                | airbnb                | @vue/airbnb-typescript | airbnb                |
|               | airbnb-typescript     | airbnb-typescript     | vue3/recommended       | airbnb-typescript     |
|               | next/recommended      | next/recommended      |                        |                       |
| Sass          | ✔️                    | ✔️                    | ✔️                     | ✔️                    |
| stylelint     | Bootstrap             | Bootstrap             | Bootstrap              | Bootstrap             |
| HTML Validate | ✔️                    | ✔️                    | ✔️                     | ❌                     |
| PWA           | ✔️                    | ✔️                    | ✔️                     | ✔️                    |
| SSR           | ✔️                    | ✔️                    | ❌                      | ❌                     |
| Electron      | ❌                     | ❌                     | ❌                      | ✔️                    |
| Capacitor     | ❌                     | ❌                     | ✔️                     | ❌                     |
| 单元测试          | Jest                  | Jest                  | Vitest                 | Jest                  |
| 组件挂载库         | React Testing Library | React Testing Library | Vue Test Utils         | React Testing Library |
| E2E测试         | Playwright            | Playwright            | Playwright             | Playwright            |

**核心特点**

- **场景导向**：根据C端/B端不同需求特点，选择合适的框架和工具链
- **性能优先**：C端项目普遍支持 SSR 和 PWA，注重 SEO 和用户体验
- **开发效率**：统一采用 TypeScript、现代化打包工具（RSpack/Vite）和代码规范工具
- **质量保障**：全面的测试覆盖（单元测试、E2E 测试）和代码检查工具链
- **跨平台能力**：支持桌面应用（Electron）和移动应用（Capacitor）扩展

**技术选型逻辑**

- **框架选择**：根据 SSR 需求选择 Next.js 或传统 SPA 框架
- **UI方案**：C端使用灵活的 Tailwind CSS，B端采用成熟的 Ant Design Pro
- **状态管理**：轻量化策略，React 生态使用 Zustand，Vue 生态使用 Pinia
- **代码规范**：统一的 ESLint 配置和 stylelint 规范，确保代码质量一致性

:::info C端与B端项目差异
**C端项目（Consumer）**
- **用户群体**：面向大量普通消费者
- **核心诉求**：用户体验、易用性、个性化服务
- **典型场景**：电商平台、新闻资讯、社交媒体、生活服务等
- **技术特点**：注重UI/UX设计、SEO优化、性能体验

**B端项目（Business）**
- **用户群体**：企业内部员工或特定业务人员
- **核心诉求**：功能完整性、系统稳定性、数据安全性
- **典型场景**：企业管理系统、CRM、ERP、数据分析平台等
- **技术特点**：重视功能性和可维护性，UI设计相对简洁实用

**技术选型说明**
- B端项目用户群体相对固定，对系统稳定性要求更高
- 如非面向客户的产品，建议采用成熟的组件库而非定制UI设计
- 本架构中的 Ant Design Pro 已优化：移除 umi 依赖，仅保留核心的 Ant Design 和 Pro Components
:::

## 技术运用

### 运行环境

- **[Node.js](https://nodejs.org/)**：JavaScript 运行时环境，支持服务端 JavaScript 执行
- **[pnpm](https://pnpm.io/zh/)**：高效的包管理器，提供快速安装和磁盘空间节省

### 核心语言

- **[ECMAScript](https://tc39.es/ecma262/)**：现代 JavaScript 标准（ES6+），提供模块化、箭头函数、Promise 等特性
- **[TypeScript](https://www.typescriptlang.org/zh/)**：JavaScript 的超集，提供静态类型检查和更好的开发体验

### 构建工具

- **[RSpack](https://rspack.rs/zh/)**：基于 Rust 的高性能打包工具，兼容 Webpack 生态
- **[Vite](https://cn.vite.dev/)**：现代前端构建工具，提供极速的开发服务器和构建速度

### 开发工具链

- **[ESLint](https://zh-hans.eslint.org/)**：代码质量和风格检查工具，确保代码规范一致性
- **[Sass](https://sass-lang.com/)**：CSS 预处理器，提供变量、嵌套、混入等编程特性
- **[stylelint](https://stylelint.io/)**：CSS 代码检查工具，确保样式代码质量
- **[Tailwind CSS](https://tailwindcss.com/)**：实用优先的 CSS 框架，通过组合原子类快速构建界面

### React 框架

| 特性          | 框架                                                           | 说明                                    |
|-------------|--------------------------------------------------------------|---------------------------------------|
| 框架          | [React](https://zh-hans.react.dev/)                          | 用于构建用户界面的 JavaScript 库                |
| 路由          | [React Router](https://reactrouter.com/)                     | 为 React 应用提供声明式路由功能                   |
| 状态管理        | [Zustand](https://zustand-demo.pmnd.rs/)                     | 轻量级的状态管理库，API 简洁易用                    |
| React Hooks | [ahooks](https://ahooks.js.org/zh-CN/)                       | React Hooks 库，提供常用的自定义 Hooks          |
| 数据请求        | [TanStack Query](https://tanstack.com/query/)                | 强大的异步状态管理库，用于数据获取、缓存和同步               |
| 表格          | [TanStack Table](https://tanstack.com/table/)                | 无头表格库，提供灵活的表格构建能力                     |
| 虚拟滚动        | [TanStack Virtual](https://tanstack.com/virtual/)            | 虚拟化滚动库，用于高性能渲染大量列表数据                  |
| 表单          | [React Hook Form](https://react-hook-form.com/)              | 高性能表单库，基于 Hooks 实现表单验证和状态管理           |
| 拖拽          | [@dnd-kit](https://dndkit.com/)                              | 现代化的拖拽工具库，提供可访问性友好的拖放功能               |
| 虚拟滚动        | [React Virtuoso](https://virtuoso.dev/)                      | 功能丰富的虚拟滚动组件，支持动态高度和复杂布局               |
| PDF渲染       | [React PDF](https://projects.wojtekmaj.pl/react-pdf/)        | PDF 文档渲染库，用于在 React 中显示 PDF 文件        |
| Markdown渲染  | [react-markdown](https://remarkjs.github.io/react-markdown/) | Markdown 渲染组件，将 Markdown 转换为 React 组件 |

### Vue 框架

| 特性          | 框架                                         | 说明                               |
|-------------|--------------------------------------------|----------------------------------|
| 框架          | [Vue](https://cn.vuejs.org/)               |                                  |
| 路由          | [Vue Router](https://router.vuejs.org/zh/) | 为 Vue 提供页面切换功能                   |
| 状态管理        | [Pinia](https://pinia.vuejs.org/)          | 为多个 Vue 组件提供共享的状态                |
| Vue 组合式 API | [VueUse](https://vueuse.org/)              | Vue 组合式 API（Composition API）程序集合 |

### JS 库

| 包名                                                                               | 作用                                                                                 |
|----------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| [@braintree/sanitize-url](https://www.npmjs.com/package/@braintree/sanitize-url) | 适用于 Url 的 XSS 清理器，用于防御针对 Url 的 XSS 攻击                                              |
| [async-es](https://caolan.github.io/async/v3/)                                   | 异步函数功能函数，提供类似 map、reduce、filter 等功能，同时提供 parallel、series、waterfall、queue 等常见的异步控制流 |
| [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight)       | 自动建议高亮工具，用于在搜索建议中高亮匹配的文本部分                                                         |
| [axios](https://axios-http.com/)                                                 | HTTP 客户端，XmlHttpRequest API 的封装                                                    |
| [crypto-js](http://github.com/brix/crypto-js)                                    | 实现 MD5、SHA1、RSA 等常用加密算法                                                            |
| [date-fns](https://date-fns.org/)                                                | 日期/时间处理函数，提供时间日期格式化、计算操作等功能                                                        |
| [dompurify](https://www.npmjs.com/package/dompurify)                             | 适用于 DOM 的 XSS 清理器，用于防御针对 HTML 的 XSS 攻击                                             |
| [es-toolkit](https://es-toolkit.dev/zh_hans/)                                    | JavaScript 工具库，Lodash 的现代化替代品                                                      |
| [file-saver-es](https://github.com/eligrey/FileSaver.js)                         | 文件下载库，提供浏览器端文件保存功能                                                                 |
| [fingerprintjs](https://fingerprintjs.github.io/fingerprintjs/)                  | 浏览器指纹识别库，用于唯一标识用户浏览器                                                               |
| [framer-motion](https://motion.dev/)                                             | 动画库，提供声明式动画和手势交互功能                                                                 |
| [html2canvas](https://html2canvas.hertzen.com/)                                  | 将 HTML 元素转换为 Canvas，用于网页截图和导出图片                                                    |
| [js-cookie](https://github.com/js-cookie/js-cookie)                              | 浏览器 cookie 操作                                                                      |
| [localforage](https://localforage.github.io/localForage/)                        | 浏览器本地存储（IndexedDB、Storage、~~WebSQL~~），常用于IndexedDB的操作                              |
| [lexical](https://lexical.dev/)                                                  | Meta 开发的可扩展文本编辑器框架，提供丰富的编辑功能                                                       |
| ~~[lodash](https://lodash.com/)~~                                                | JS 工具函数集，提供诸如数据类型判断、转换、节流、防抖等函数                                                    |
| [mathjs](https://mathjs.org/)                                                    | JS 数学计算函数，能有效避免 JS 数学计算中可能出现的数值精度问题                                                |
| [nanoid](https://zelark.github.io/nano-id-cc/)                                   | 轻量级唯一 ID 生成器，生成 URL 友好的短 ID 字符串，比 UUID 更小更快                                        |
| [nzh](http://cnwhy.github.io/nzh)                                                | 实现数值转中文大写字符功能                                                                      |
| [print-js](http://printjs.crabbly.com/)                                          | 为浏览器提供原生打印功能，可以打印 HTML、JSON、PDF、图片等                                                |
| [qs](https://github.com/ljharb/qs)                                               | 序列化和反序列化 querystring                                                               |
| [socket.io-client](https://socket.io/)                                           | WebSocket 客户端库，用于实现实时双向通信                                                          |
| [uuid](https://github.com/uuidjs/uuid)                                           | 通用唯一标识符生成器，用于生成符合 RFC4122 标准的 UUID                                                 |
| [xlsx](https://docs.sheetjs.com/)                                                | Excel 文件读写库，支持多种表格格式的解析和生成                                                         |
| [xstate](https://stately.ai/docs)                                                | 状态机和状态图库，用于管理复杂的应用状态逻辑                                                             |
| [zod](https://zod.dev/)                                                          | 数据验证库，用于验证、转换数据结构                                                                  |

## 关注点

![关注点模型](./assets/focus.png?as=avif)

开发时，应该把**性能**、**安全**、**代码维护**、**用户体验**作为前端开发工作的关注点。

### 性能

性能是指网站的加载和渲染速度，高性能的网站比表现不佳的网站更好地吸引和留住用户。

:::note Lighthouse 性能指标
下表是 Lighthouse 工具衡量性能指标，可作为参考。

| 项目  | 权重  | 快（绿色）   | 中等（橙色）    | 慢（红）    |
|-----|-----|---------|-----------|---------|
| FCP | 10% | 0-0.9s  | 0.9-1.6s  | > 1.6s  |
| SI  | 10% | 0-1.3s  | 1.3-2.3s  | > 2.3s  |
| LCP | 25% | 0-1.2s  | 1.2-2.4s  | > 2.4s  |
| TTI | 10% | 0-2.5s  | 2.5-4.5s  | > 4.5s  |
| TBT | 30% | 0-150ms | 150-350ms | > 350ms |
| CLS | 10% | 0-0.1   | 0.1-0.25  | > 0.25  |

概念解释：

- **First Contentful Paint (FCP)**：**首次绘制内容**，测量在用户打开页面后浏览器呈现第一段 DOM 内容所需的时间。
- **Speed Index (SI)**：**速度指数**，衡量页面加载期间内容的视觉显示速度。
- **Largest Contentful Paint (LCP)**：**最大的内容绘制**，测量视口中最大的内容元素何时呈现到屏幕上。这大约是页面的主要内容对用户可见的时间。
- **Time to Interactive (TTI)**：**交互时间**，衡量一个页面需要多长时间才能完全交互。
- **Total Blocking Time (TBT)** ：**总阻塞时间**，衡量页面被阻止响应用户输入（例如鼠标点击、屏幕点击或键盘按下）的总时间。总和是通过在 First Contentful Paint 和 Time to Interactive 之间添加所有长任务的阻塞部分来计算的。任何执行时间超过 50 毫秒的任务都是长任务。50 毫秒后的时间量是阻塞部分。例如，如果 Lighthouse 检测到一个 70 毫秒长的任务，则阻塞部分将为 20 毫秒。
- **Cumulative Layout Shift (CLS)**：**累积布局偏移**，测量整个页面生命周期内发生的所有意外布局偏移中最大一连串的布局偏移分数。每当一个可见元素的位置从一个已渲染帧变更到下一个已渲染帧时，就发生了布局偏移 。分数计算公式较为复杂。
:::

### 安全

网站应全力保障用户的隐私和数据安全，能正确应对客户端攻击和服务端攻击，确保用户、内容和业务安全。

### 代码维护

网站代码应该能尽快上手维护开发，以便快速的开发需求和修复缺陷。

代码维护的要求包括：

- **代码规范**：代码需要符合 ESLint 等检查工具和规范的检查
- **SOLID 原则**
  - S – **单一职责原则**：不应该有多种情况需要修改某个类的对象
  - O – **开放封闭原则**：软件实体应该对扩展开放，对修改封闭
  - L – **里氏替换原则**：函数使用基类的引用，必须能够在不知不觉的情况下使用派生类的对象
  - I – **接口分离原则**：多个客户端特定的接口比使用一个通用的接口要好
  - D – **依赖倒置原则**：依赖抽象。不要依赖于具体实现
- DRY 原则

### 用户体验

网站需要把保障用户的用户体验放在首位，可以使用一些前端手段提升用户体验的内容。

用户体验包括：

- **设备兼容性**：网站是否能在主流的设备大小打开
- **浏览器兼容性**：网站是否能在不同的浏览器下正常使用，是否需要兼容 IE11
- **无障碍可访问性**：网站是否能使用键盘快速访问，是否能被屏幕阅读器阅读
- **SEO**：网站是否能被搜索引擎抓取
- **性能**：网站加载是否快速

## 核心

![工作核心](./assets/work-core.png?as=avif)

- **代码：** 如何实现系统架构中的逻辑
- **流程：** 构建高效并防止出错的工作流程
- **测试：** 为网站搭建稳固基础
- **文档：** 规划好系统蓝图设计

## 能力模型

![三角能力模型](./assets/capability.png?as=avif)

- **专业深度：** 完成本职工作的专业技术能力
- **owner意识/能力：** 更加主动的去关心项目上下游，更关注项目整体
- **业务/产品价值导向：** 不仅关注功能和项目本身，更多往上关注需求背后的用户，关注产品能给他们带来的价值，进而思考业务上有哪些收益

## 思维方式

![工作核心](./assets/thinking.png?as=avif)

掌握好思维方式，不仅仅对自己的工作大有帮助，还可以有效的跟产品经理、后端开发等其他岗位进行沟通。

- **逻辑思维**
  - 这段代码会用在哪里，会重复用吗？
  - 以后会不会变，如果会变，那可以怎样变？
  - 接手代码的人，能看得懂吗？
  - 这段代码的运行是否高效？
  - ...
- **商业思维**
  - 需要多少时间完成这项工作？
  - 项目上线后需要如何进行推广？
  - 这样的推广是否可行，是否有成本更低的推广方案？
  - ...
- **设计思维**
  - 这个界面设计方案是否合理，操作是否便捷？
  - 如果你自己是用户，你会满意你自己做的网站或者应用吗？
  - ...
