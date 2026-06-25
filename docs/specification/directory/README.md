---
sidebar_position: 3
description: 前端项目目录结构规范，统一项目组织方式，提升代码可维护性与团队协作效率
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 目录规范

## 项目根目录

```:no-line-numbers
project/
├── dist/
├── public/
├── src/
│   └── ...
├── tests/
|   ├── e2e/
│   └── unit/
├── .browserslistrc
├── .editorconfig
├── .env.development
├── .env.production
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .gitlab-ci.yml
├── .lighthouserc.js
├── commitlint.config.js
├── jest.config.js
├── package.json
├── package-lock.json
├── stylelint.config.js
└── tsconfig.json
```

- `dist/`：项目构建结果
- `public/`：静态文件，不受构建工具影响
- `src/`：项目源代码，见 [`src` 目录](#src-目录)
- `tests/`：测试源代码
  - `e2e/`：E2E 测试代码
  - `unit/`：单元测试代码
- `.browserslistrc`：Browserslist 配置文件，配置浏览器兼容性
- `.editorconfig`：编辑器配置
- `.env.development` `.env.production`：环境配置
- `.eslintignore`：忽略不需要 ESLint 检查的目录或文件
- `.eslintrc.js`：ESLint 配置
- `.gitignore`：忽略不需要 Git 提交的目录或文件
- `.gitlab-ci.yml`：Gitlab CI 配置
- `.lighthouserc.js`：lighthouse 检查配置，在 CI 环境下运行
- `commitlint.config.js`：commitlint 配置
- `lint-staged.config.js`：lint-staged 配置
- `jest.config.js`：Jest 配置
- `package.json`
- `pnpm-lock.yaml`
- `stylelint.config.js`：stylelint 配置
- `tsconfig.json`：TypeScript 配置

## `src` 目录

<Tabs>
  <TabItem value="react" label="React" default>
```:no-line-numbers
project/
└── src/
    ├── assets/
    ├── components/
    ├── hooks/
    ├── layouts/
    ├── service/
    ├── store/
    ├── utils/
    ├── pages/
    ├── App.tsx
    ├── main.tsx
    └── react-env.d.ts
```
<>
- `assets/`：静态文件目录
- `components/`：项目公共组件
- `hooks/`：自定义 React Hooks
- `layouts/`：页面布局组件
- `services/`：HTTP 请求封装方法
- `store/`：Zustand 相关代码
- `utils/`：工具 JS 函数
- `pages/`：页面组件
- `App.tsx`：根组件
- `main.tsx`：页面入口文件
- `react-env.d.ts`：React Types 类型文件
</>
  </TabItem>
  <TabItem value="next" label="Next.js">
```:no-line-numbers
project/
└── src/
    ├── app/
    │   ├── page.tsx 
    │   ├── layout.tsx
    │   ├── loading.tsx
    │   ├── error.tsx
    │   ├── error.tsx
    │   └── .../
    ├── assets/
    ├── components/
    ├── hooks/
    ├── service/
    └── utils/
```

<>
- `app/`：App Router 的根目录
  - `page.tsx` - 定义路由的 UI，比如 `/app/dashboard/page.tsx` 对应 `/dashboard` 路由
  - `layout.tsx` - 定义共享布局，嵌套在各级路由中
  - `loading.tsx` - 路由加载状态
  - `error.tsx` - 错误处理组件
  - `not-found.tsx` - 404 页面
- `assets/`：静态文件目录
- `components/`：项目公共组件
- `hooks/`：自定义 React Hooks
- `services/`：HTTP 请求封装方法
- `utils/`：工具 JS 函数
</>
  </TabItem>
  <TabItem value="vue" label="Vue">
```:no-line-numbers
project/
└── src/
    ├── assets/
    ├── components/
    ├── composables/
    ├── directives/
    ├── layouts/
    ├── plugins/
    ├── router/
    ├── service/
    ├── store/
    ├── utils/
    ├── views/
    ├── App.vue
    ├── main.ts
    └── vite-env.d.ts
```
<>
- `assets/`：静态文件目录
- `components/`：项目公共组件
- `composables/`：项目 Composition API
- `directives/`：项目公共指令
- `layouts/`：页面布局组件
- `plugins/`：Vue 全局插件
- `router/`：路由配置
- `services/`：HTTP 请求封装方法
- `store/`：Pinia 相关代码
- `utils/`：工具 JS 函数
- `views/`：页面组件
- `App.vue`：根组件
- `main.ts`：页面入口文件
- `vite-env.d.ts`：Vue Types类型文件
</>
  </TabItem>
</Tabs>

## 模块的导出

<Tabs>
  <TabItem value="react" label="React" default>
模块应该使用统一入口进行导出，以 `components/` 为例

目录结构，注意这里 `HelloWorld/` 下的 `assets/` 为组件私有资源，`components/` 为私有组件。我们会把 `components/index.ts` 作为统一的组件入口。

```:no-line-numbers
components/
├── HelloWorld/
|   ├── assets/
|   ├── components/
|   └── index.tsx
└── index.ts
```

在把模块导出成统一入口：

```js
// components/index.ts
export { default as HelloWorld } from './HelloWorld';
```

在页面组件中使用：

```tsx
import React from 'react';
import { HelloWorld } from '@/components';

const Page: React.FC = function Page() {
  return (
    <HelloWorld />
  );
};

export default Page;
```
  </TabItem>
  <TabItem value="vue" label="Vue">
模块应该使用统一入口进行导出，以 `components/` 为例

目录结构，注意这里 `HelloWorld/` 下的 `assets/` 为组件私有资源，`components/` 为私有组件。我们会把 `components/index.ts` 作为统一的组件入口。

```:no-line-numbers
components/
├── HelloWorld/
|   ├── assets/
|   ├── components/
|   ├── HelloWorld.vue
|   └── index.ts
└── index.ts
```

先把 Vue 组件导出成模块：

```js
// components/HelloWorld/index.ts
import HelloWorld from './HelloWorld.vue'

export default HelloWorld;
```

在把模块导出成统一入口：

```js
// components/index.ts
export { default as HelloWorld } from './HelloWorld';
```

在页面组件中使用：

```vue
<script>
import { HelloWorld } from '@/components';

export default {
  components: {
    HelloWorld,
  },
};
</script>
```

这样做的好处是可以方便的管理和引用组件，无需再组件的使用过程中频繁的寻找组件的代码路径。由于构建工具已经支持 TreeShaking，这里无需过多的考虑性能优化的问题。
  </TabItem>
</Tabs>
