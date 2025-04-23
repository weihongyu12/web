---
sidebar_position: 6
---

# 监控

前端监控是现代Web应用程序开发中不可或缺的一部分。它帮助开发团队追踪应用性能、错误和用户行为，以便持续改进产品质量和用户体验。本文将介绍三种主流的前端监控工具：Sentry、LogRocket和Google Analytics。

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

```javascript
// React应用中集成Sentry
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

// 捕获自定义错误
try {
  someFunctionThatMightFail();
} catch (error) {
  Sentry.captureException(error);
}
```

### 优势
- 开源且有云托管版本
- 详细的错误追踪能力
- 强大的集成能力
- 适合开发和质量团队使用

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

```javascript
// 在React应用中集成LogRocket
import LogRocket from 'logrocket';
LogRocket.init('app/id');

// 添加用户标识
LogRocket.identify('user_id', {
  name: '用户名',
  email: 'user@example.com',
});

// 与Redux集成
import { createStore } from 'redux';
const store = createStore(reducer);
LogRocket.reduxMiddleware(store);
```

### 优势
- 提供完整的用户会话回放
- 精确重现错误发生时的状态
- 结合定量和定性数据
- 适合产品团队和开发人员

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

```javascript
// GA4基本集成
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
  
  // 跟踪自定义事件
  gtag('event', '按钮点击', {
    'event_category': '交互',
    'event_label': '注册按钮'
  });
</script>
```

### 优势
- 免费且功能强大
- 提供全面的用户行为和流量数据
- 与Google其他产品无缝集成
- 适合营销团队和业务分析人员

## 对比与选择指南

| 特性 | Sentry | LogRocket | Google Analytics |
|------|--------|-----------|-----------------|
| 主要用途 | 错误监控 | 用户会话回放 | 用户行为分析 |
| 价格 | 开源，有付费计划 | 付费，有有限的免费计划 | 基础版免费 |
| 技术焦点 | 开发者导向 | 开发与产品导向 | 营销与业务导向 |
| 数据粒度 | 详细的错误报告 | 完整的会话记录 | 汇总的用户行为数据 |
| 设置复杂度 | 中等 | 中等 | 简单 |

## 各框架集成指南

### React 项目集成

#### Sentry 在 React 中的集成

```jsx
// 安装依赖
// npm install @sentry/react @sentry/tracing

// src/index.js 或 App.js 中初始化
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import App from './App';

Sentry.init({
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  // 可选: 设置发布版本
  release: "my-project-name@" + process.env.npm_package_version,
  // 环境标记
  environment: process.env.NODE_ENV
});

// 使用错误边界组件包装应用
const SentryFallback = () => <div>应用发生错误，请稍后重试</div>;

ReactDOM.render(
  <Sentry.ErrorBoundary fallback={SentryFallback}>
    <App />
  </Sentry.ErrorBoundary>,
  document.getElementById('root')
);
```

#### LogRocket 在 React 中的集成

```jsx
// 安装依赖
// npm install logrocket logrocket-react

// src/index.js 中初始化
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

// 初始化 LogRocket
LogRocket.init('app/id');
setupLogRocketReact(LogRocket);

// 集成 React Router (可选)
LogRocket.getSessionURL(sessionURL => {
  console.log(sessionURL);
});

// 可选: 用户标识
const identifyUser = (user) => {
  LogRocket.identify(user.id, {
    name: user.name,
    email: user.email,
  });
}

// 在用户登录后调用 identifyUser

ReactDOM.render(<App />, document.getElementById('root'));
```

#### Google Analytics 在 React 中的集成

```jsx
// 方法一: 使用 react-ga 库
// npm install react-ga

// src/index.js 或 App.js
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

// 初始化
ReactGA.initialize('UA-XXXXX-Y');

// 与 React Router 集成
const history = createBrowserHistory();
history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

// 跟踪事件
const trackEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
}

// 在组件中使用
// onClick={() => trackEvent('User', 'Click', 'Submit Button')}
```

### Next.js 项目集成

#### Sentry 在 Next.js 中的集成

```jsx
// 安装依赖
// npm install @sentry/nextjs

// 使用 Sentry wizard 自动配置
// npx @sentry/wizard -i nextjs

// next.config.js
const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  // 你的Next.js配置
};

const SentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);

// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
  tracesSampleRate: 1.0,
});

// sentry.server.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
  tracesSampleRate: 1.0,
});

// 在页面中使用错误边界
// pages/_app.js
import { ErrorBoundary } from '@sentry/nextjs';

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary fallback={<p>应用发生错误</p>}>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
```

#### LogRocket 在 Next.js 中的集成

```jsx
// 安装依赖
// npm install logrocket

// pages/_app.js
import LogRocket from 'logrocket';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 仅在客户端初始化
    if (typeof window !== 'undefined') {
      LogRocket.init('app/id');
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;

// 可选: API路由中捕获后端错误
// pages/api/example.js
import LogRocket from 'logrocket';

export default function handler(req, res) {
  try {
    // API 逻辑
  } catch (error) {
    LogRocket.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
```

#### Google Analytics 在 Next.js 中的集成

```jsx
// 安装依赖
// npm install next-ga

// pages/_app.js
import Router from 'next/router';
import withGA from 'next-ga';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// 使用 GA4
export default withGA('G-XXXXXXXXXX', Router)(MyApp);

// 或者手动实现
// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXXXXX');
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

// pages/_app.js 中捕获路由变化
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: url,
      });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}
```

### Vue 项目集成

#### Sentry 在 Vue 中的集成

```javascript
// 安装依赖
// npm install @sentry/vue @sentry/tracing

// main.js (Vue 3)
import { createApp } from 'vue';
import * as Sentry from '@sentry/vue';
import { BrowserTracing } from '@sentry/tracing';
import App from './App.vue';
import router from './router';

const app = createApp(App);

Sentry.init({
  app,
  dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost', 'my-site-url.com', /^\//],
    }),
  ],
  tracesSampleRate: 1.0,
  logErrors: true,
});

app.use(router).mount('#app');

// Vue 2 版本
// import Vue from 'vue';
// import * as Sentry from '@sentry/vue';
// import Router from 'vue-router';
//
// const router = new Router({ ... });
//
// Sentry.init({
//   Vue,
//   dsn: 'https://examplePublicKey@o0.ingest.sentry.io/0',
//   integrations: [
//     new BrowserTracing({
//       routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//     }),
//   ],
// });
```

#### LogRocket 在 Vue 中的集成

```javascript
// 安装依赖
// npm install logrocket

// main.js (Vue 3)
import { createApp } from 'vue';
import LogRocket from 'logrocket';
import App from './App.vue';

// 初始化
LogRocket.init('app/id');

// 可选: 集成 Vue Router
import router from './router';
router.afterEach((to) => {
  LogRocket.getSessionURL(sessionURL => {
    // 可以将 URL 发送到其他服务
    console.log(sessionURL);
  });
});

const app = createApp(App);
app.use(router).mount('#app');

// Vue 2 版本
// import Vue from 'vue';
// import LogRocket from 'logrocket';
// LogRocket.init('app/id');
//
// new Vue({
//   router,
//   render: h => h(App),
// }).$mount('#app');
```

#### Google Analytics 在 Vue 中的集成

```javascript
// 方法一: 使用 vue-gtag 库
// npm install vue-gtag

// main.js (Vue 3)
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueGtag from 'vue-gtag';

const app = createApp(App);

app.use(VueGtag, {
  config: { id: 'G-XXXXXXXXXX' }
}, router);

app.use(router).mount('#app');

// 方法二: 直接在 index.html 中集成
// public/index.html
// <head>
//   <!-- Google Analytics -->
//   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
//   <script>
//     window.dataLayer = window.dataLayer || [];
//     function gtag(){dataLayer.push(arguments);}
//     gtag('js', new Date());
//     gtag('config', 'G-XXXXXXXXXX');
//   </script>
// </head>

// Vue 2 版本
// import Vue from 'vue';
// import VueGtag from 'vue-gtag';
// import router from './router';
//
// Vue.use(VueGtag, {
//   config: { id: 'G-XXXXXXXXXX' }
// }, router);
```

## 集成最佳实践

### 多工具组合
在实际应用中，通常会结合使用这些工具以获得全面的监控能力：
- Sentry处理错误监控
- LogRocket提供用户会话回放
- Google Analytics分析用户行为和转化

### 性能考虑
集成多个监控工具可能对应用性能产生影响，应注意以下几点：
- 合理设置采样率
- 延迟初始化非关键监控
- 监控工具本身的性能消耗

### 数据隐私
在实施监控时，务必考虑用户隐私：
- 遵守GDPR、CCPA等数据保护法规
- 明确告知用户数据收集的范围和用途
- 避免收集敏感个人信息
- 实现数据脱敏措施

## 结论

选择合适的前端监控工具需要考虑团队的具体需求和资源限制。Sentry适合关注应用稳定性的开发团队，LogRocket适合需要深入了解用户体验的产品团队，而Google Analytics则适合关注用户获取和转化的营销团队。在大型项目中，这三种工具可以协同工作，提供全面的应用监控解决方案。
