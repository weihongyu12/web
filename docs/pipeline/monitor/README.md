---
sidebar_position: 8
description: 前端监控方案，集成 Sentry 错误监控、LogRocket 会话回放与 Google Analytics 用户行为分析
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 监控

前端监控是现代Web应用程序开发中不可或缺的一部分。它帮助开发团队追踪应用性能、错误和用户行为，以便持续改进产品质量和用户体验。本文将介绍三种主流的前端监控工具：Sentry、LogRocket和Google Analytics。

在实际应用中，通常会结合使用这些工具以获得全面的监控能力：

- Sentry：错误监控与性能追踪
- LogRocket：用户会话回放
- Google Analytics：用户行为与转化分析

## Sentry

### 概述
Sentry 是开源的实时错误跟踪系统，用于错误监控和崩溃报告，提供 React、Vue、Angular 等前端框架的 SDK。

### 主要功能
- **实时错误跟踪**：自动捕获代码中的异常和错误
- **错误上下文**：包括用户信息、运行环境、浏览器版本等
- **源代码映射**：通过 sourcemap 定位到原始代码中的错误位置
- **性能监控**：页面加载、API 请求耗时等
- **问题分类与分配**：将问题分配给团队成员并设置优先级

### 集成示例

<Tabs>
  <TabItem value="react" label="React" default>
```js
// pnpm add @sentry/react
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#sendDefaultPii
  sendDefaultPii: false,

  integrations: [
    // If you're using react router, use the integration for your react router version instead.
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
    Sentry.browserTracingIntegration(),
    // Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,

  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: [/^\//, /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
  // replaysSessionSampleRate: 0.1,
  // replaysOnErrorSampleRate: 1.0,
});
```
  </TabItem>
  <TabItem value="vue" label="Vue">
```js
// main.ts
import { createApp } from "vue";
import { createRouter } from "vue-router";
// pnpm add @sentry/vue
import * as Sentry from "@sentry/vue";

const app = createApp({
  // ...
});
const router = createRouter({
  // ...
});

Sentry.init({
  app,
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/#sendDefaultPii
  sendDefaultPii: false,

  integrations: [
    Sentry.browserTracingIntegration({ router }),
    // Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,

  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
  // replaysSessionSampleRate: 0.1,
  // replaysOnErrorSampleRate: 1.0,
});

app.use(router);
app.mount("#app");
```
  </TabItem>
  <TabItem value="next.js" label="Next.js">

在 `next.config.mjs` 中使用 `withSentryConfig` 包装 Next.js 配置：

```js
// next.config.mjs
// pnpm add @sentry/nextjs
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  // Your existing Next.js configuration
};

  // Make sure adding Sentry options is the last code to run before exporting
export default withSentryConfig(nextConfig, {
  org: "example-org",
  project: "example-project",

  // sourcemap 上传依赖 SENTRY_AUTH_TOKEN 环境变量，建议在 GitLab CI Variables 中配置
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#upload-source-maps

  // Only print logs for uploading source maps in CI
  // Set to `true` to suppress logs
  silent: !process.env.CI,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
});
```

在项目根目录创建 `sentry.server.config.ts`、`sentry.edge.config.ts` 和 `instrumentation-client.ts` 三个文件，分别添加初始化代码：

  <Tabs>
    <TabItem value="client" label="Client" default>
```ts
// instrumentation-client.ts

// pnpm add @sentry/nextjs
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: false,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,
  // Replay may only be enabled for the client-side
  integrations: [
    // Sentry.replayIntegration(),
  ],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
  // replaysSessionSampleRate: 0.1,
  // replaysOnErrorSampleRate: 1.0,

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});

// This export will instrument router navigations, and is only relevant if you enable tracing.
// `captureRouterTransitionStart` is available from SDK version 9.12.0 onwards
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
```
    </TabItem>
    <TabItem value="server" label="Server">
```ts
// sentry.server.config.ts

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: false,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});

```
    </TabItem>
    <TabItem value="edge" label="Edge">
```ts
// sentry.edge.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",

  // 会随事件发送用户 IP 等标识信息，默认关闭，确认合规需求后再开启
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: false,

  // 开发环境全量采样便于排查，生产环境按流量下调
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});

```
    </TabItem>
  </Tabs>
  
  </TabItem>
</Tabs>

## LogRocket

### 概述
LogRocket 提供会话回放服务，记录用户在站点上的完整操作过程，供事后回放排查。

### 主要功能
- **会话回放**：记录并回放用户会话，包括点击、滚动、页面变化等
- **网络监控**：记录所有网络请求和响应
- **错误追踪**：捕获 JavaScript 错误和异常
- **状态管理集成**：支持 Redux、MobX 等状态管理库
- **用户反馈工具**：收集用户反馈

### 集成示例

#### 基本集成

```javascript
// pnpm add logrocket
import LogRocket from 'logrocket';

LogRocket.init('your-app-id');
```

#### 与 Sentry 集成

将 LogRocket 会话 URL 附加到每条 Sentry 异常事件：

```javascript
Sentry.getCurrentScope().setExtra("sessionURL", LogRocket.sessionURL);
```

LogRocket SDK 未完成初始化时，`LogRocket.sessionURL` 返回 `null`。要确保拿到会话 URL，改用回调形式：

```javascript
LogRocket.getSessionURL((sessionURL) => {
  Sentry.getCurrentScope().setExtra("sessionURL", sessionURL);
});
```

若要在错误发生时刻获取带时间戳的会话 URL，在 `beforeSend()` 回调中读取：

```javascript
Sentry.init({
  beforeSend(event) {
    const sessionURL = LogRocket.sessionURL;
    if (sessionURL) {
      event.extra = { ...event.extra, LogRocket: sessionURL };
    }
    return event;
  },
});
```

## Google Analytics

### 概述

Google Analytics（GA）是 Google 提供的网站流量分析服务，当前主版本为 GA 4，基于事件模型记录用户行为。

### 主要功能
- **用户行为分析**：页面浏览、停留时间、跳出率等
- **转化跟踪**：跟踪特定目标的完成情况
- **自定义事件**：追踪按钮点击、表单提交等用户交互
- **受众分析**：了解用户的地理位置、设备类型等
- **实时数据**：查看当前正在访问网站的用户

### 集成示例

<Tabs>
  <TabItem value="react" label="React" default>
```js
// pnpm add react-ga4
import ReactGA from 'react-ga4';

ReactGA.initialize('G-00000000');
```

发送事件

```js
import ReactGA from 'react-ga4';

ReactGA.event('created_an_account');
```
  </TabItem>
  <TabItem value="vue" label="Vue">
:::warning
Work In Progress
:::
  </TabItem>
  <TabItem value="next.js" label="Next.js">
```tsx
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
     <body>{children}</body>
     <GoogleAnalytics gaId="G-XYZ" />
    </html>
  );
}
```

发送事件

```tsx
'use client'
 
import { sendGAEvent } from '@next/third-parties/google'
 
export function EventButton() {
  return (
    <div>
      <button
        onClick={() => sendGAEvent('event', 'buttonClicked', { value: 'xyz' })}
      >
        Send Event
      </button>
    </div>
  )
}
```
  </TabItem>
</Tabs>

## 最佳实践

### 性能考虑

多个监控 SDK 同时加载会拖慢首屏：

- 按环境设置采样率：开发环境可全量（`1.0`），生产环境按流量下调（如 `tracesSampleRate: 0.2`）
- 非关键监控延迟或按需初始化
- 关注 SDK 体积与运行时开销，监控本身不应成为新的性能问题

### 数据隐私

在实施监控时，务必考虑用户隐私：

- 遵守 PIPL、GDPR、CCPA 等数据保护法规
- 明确告知用户数据收集的范围和用途
- 避免收集敏感个人信息
- 实现数据脱敏措施

:::danger
《个人信息保护法》要求，向境外提供个人信息需通过安全评估、签订标准合同或获得专业机构认证。
Sentry、LogRocket 和 Google Analytics 的数据中心均在境外，接入前需完成合规评估；也可选用境内服务商（如腾讯云、阿里云）的同类产品。
:::
