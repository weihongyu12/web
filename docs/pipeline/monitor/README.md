---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 监控

前端监控是现代Web应用程序开发中不可或缺的一部分。它帮助开发团队追踪应用性能、错误和用户行为，以便持续改进产品质量和用户体验。本文将介绍三种主流的前端监控工具：Sentry、LogRocket和Google Analytics。

在实际应用中，通常会结合使用这些工具以获得全面的监控能力：

- Sentry处理错误监控
- LogRocket提供用户会话回放
- Google Analytics分析用户行为和转化

## Sentry

### 概述
Sentry是一个开源的实时错误跟踪系统，专注于错误监控和应用程序崩溃报告。它支持多种编程语言和框架，包括JavaScript、React、Vue、Angular等。

### 主要功能
- **实时错误跟踪**：自动捕获代码中的异常和错误
- **详细的错误上下文**：包括用户信息、环境变量、浏览器版本等
- **源代码映射**：通过sourcemap定位到原始代码中的错误位置
- **性能监控**：包括页面加载性能、API请求性能等
- **问题分类与分配**：将问题分配给团队成员并设置优先级

### 集成示例

<Tabs>
  <TabItem value="react" label="React" default>
```js
// pnpm install @sentry/react
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  integrations: [
    // If you're using react router, use the integration for your react router version instead.
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: [/^\//, /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```
  </TabItem>
  <TabItem value="vue" label="Vue">
```js
// main.ts
import { createApp } from "vue";
import { createRouter } from "vue-router";
// pnpm install @sentry/vue
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
  sendDefaultPii: true,

  integrations: [
    Sentry.browserTracingIntegration({ router }),
    Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

app.use(router);
app.mount("#app");
```
  </TabItem>
  <TabItem value="next.js" label="Next.js">

通过添加扩展应用的默认 Next.js 选项 `withSentryConfig` 到 `next.config.mjs`

```js
// next.config.mjs
// pnpm install @sentry/nextjs
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  // Your existing Next.js configuration
};

  // Make sure adding Sentry options is the last code to run before exporting
export default withSentryConfig(nextConfig, {
  org: "example-org",
  project: "example-project",

  // Only print logs for uploading source maps in CI
  // Set to `true` to suppress logs
  silent: !process.env.CI,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
});
```

初始化 Sentry 客户端和服务器端 SDK，在应用程序的根目录中创建三个文件：`sentry.server.config.ts`，`sentry.edge.config.ts` 以及 `instrumentation-client.ts`，将以下初始化代码添加到每个文件中：

  <Tabs>
    <TabItem value="client" label="Client" default>
```ts
// instrumentation-client.ts

// pnpm install @sentry/nextjs
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,
  // Replay may only be enabled for the client-side
  integrations: [Sentry.replayIntegration()],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

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
  sendDefaultPii: true,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,

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

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,

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
LogRocket提供会话回放和前端监控服务，允许开发者回放用户在网站上的完整会话，就像"DVR播放器"一样查看用户的操作过程。

### 主要功能
- **会话回放**：记录并回放用户会话，包括点击、滚动、页面变化等
- **网络监控**：记录所有网络请求和响应
- **错误追踪**：捕获JavaScript错误和异常
- **状态管理集成**：与Redux、MobX等状态管理库的集成
- **用户反馈工具**：收集用户反馈

### 集成示例

#### 基本集成

```javascript
// pnpm i logrocket
import LogRocket from 'logrocket';

LogRocket.init(YOUR_APP_ID);
```

#### 与 Sentry 集成

将记录 URL 的 LogRocket 会话添加到每个 Sentry 异常报表

```javascript
Sentry.configureScope(scope => {
  scope.setExtra("sessionURL", LogRocket.sessionURL);
});
```

LogRocket.sessionURL 返回 null 在 LogRocket SDK 尚未完全初始化并开始将会话数据发送回 LogRocket 服务器的情况下。要保证会话 URL 的存在,请将回调传递给 LogRocket.getSessionURL()

```javascript
LogRocket.getSessionURL((sessionURL) => {
  Sentry.configureScope((scope) => {
    scope.setExtra("sessionURL", sessionURL);
  });
});
```

要将带有时间戳的会话 URL 传递给 Sentry 捕获错误的那一刻,LogRocket URL 可以包含在 Sentry 的 `beforeSend()` 行动

```javascript
Sentry.init({
  beforeSend(event) {
    const logRocketSession = LogRocket.sessionURL;
    if (logRocketSession !== null) {
      event.extra["LogRocket"] = logRocketSession;
      return event;
    } else {
      return event;
    }
  },
});
```

## Google Analytics

### 概述

Google Analytics (GA)是Google提供的网站流量分析服务，是最广泛使用的网络分析工具之一。GA 4是其最新版本，提供了更强大的事件跟踪和用户行为分析能力。

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
// pnpm install react-ga
import ReactGA from 'react-ga';

ReactGA.initialize('UA-000000-01');
```

发送事件

```js
import ReactGA from 'react-ga';

ReactGA.event({
  category: 'User',
  action: 'Created an Account'
});
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

集成多个监控工具可能对应用性能产生影响，应注意以下几点：

- 合理设置采样率
- 延迟初始化非关键监控
- 监控工具本身的性能消耗

### 数据隐私

在实施监控时，务必考虑用户隐私：

- 遵守 GDPR、CCPA 等数据保护法规
- 明确告知用户数据收集的范围和用途
- 避免收集敏感个人信息
- 实现数据脱敏措施
