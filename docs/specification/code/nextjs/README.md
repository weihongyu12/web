---
sidebar_position: 4
description: Next.js 项目开发规范，基于 App Router、Image 与 Font Optimization 等框架特性的最佳实践
---

# Next.js 规范

本规范旨在统一前端 Next.js 项目的开发风格，提高代码质量、可读性和可维护性。规范基于项目配置的 ESLint 规则集（包括 Next.js Core, Airbnb, TypeScript, React Hooks 等）制定。

**核心原则**：

- **Next.js First**：充分利用框架特性（App Router, Image Optimization, Font Optimization）。 
- **优先使用 TypeScript**：利用强类型系统减少运行时错误。 
- **区分服务端与客户端组件**：默认使用 Server Components，仅在交互必要时使用 Client Components。 
- **性能导向**：关注 Core Web Vitals，避免阻塞渲染和布局偏移。

## 服务端组件与客户端组件 (Server vs Client Components)

Next.js App Router 默认组件为 Server Components。为了减小客户端 Bundle 体积并提升性能，应遵循以下原则：

- **默认服务端**：页面 (`page.tsx`)、布局 (`layout.tsx`) 和无交互的展示型组件应保留为 Server Component。 
- **按需客户端**：仅在组件需要使用 React Hooks (`useState`, `useEffect`)、浏览器 API 或事件监听 (`onClick`) 时，才在文件顶部添加 `use client`。 
- **异步限制**：Client Components 不能是 `async` 函数。

:::tip[建议]
```tsx
// app/components/SubmitButton.tsx
'use client'; // ✅ 只有交互组件才标记为 client

import { useState } from 'react';

export default function SubmitButton() {
  const [loading, setLoading] = useState(false);
  return (
    <button onClick={() => setLoading(true)}>
      {loading ? 'Loading...' : 'Submit'}
    </button>
  );
}
```

```tsx
// app/page.tsx
// 默认是 Server Component，无需标记
import SubmitButton from './components/SubmitButton';

export default async function Page() {
  const data = await getData(); // ✅ Server Component 可以是 async
  return (
    <main>
      <h1>{data.title}</h1>
      <SubmitButton />
    </main>
  );
}
```
:::

:::danger[不建议]
```tsx
// ❌ 错误：在 Client Component 中使用 async
'use client';

export default async function ClientPage() {
  return <div>Error</div>;
}
```
:::

## 图片优化 (Image Optimization)

为了优化 LCP (Largest Contentful Paint) 和防止 CLS (Cumulative Layout Shift)，必须使用 `next/image`。

- **强制使用 `<Image />`**：禁止使用 HTML `<img>` 标签。 
- **首屏图片优先级**：对于页面顶部可见区域（LCP 元素）的图片，**必须**添加 `priority` 属性，以取消懒加载。 
- **尺寸占位**：必须指定 `width` 和 `height`（或使用 `fill`），以防止布局偏移。

:::tip[建议]
```tsx
import Image from 'next/image';
import heroImage from '../public/hero.png';

export default function Hero() {
  return (
    <section>
      {/* ✅ LCP 元素添加 priority */}
      <Image
        src={heroImage}
        alt="Hero Banner"
        priority
        width={1200}
        height={600}
        placeholder="blur"
      />
      {/* ✅ 非首屏图片自动懒加载 */}
      <Image
        src="/icon.png"
        alt="Icon"
        width={50}
        height={50}
      />
    </section>
  );
}
```
:::


:::danger[不建议]
```tsx
// ❌ 违反 ESLint 规则，且会导致性能问题
<img src="/hero.png" alt="Hero" />
```
:::

## 脚本加载 (Script Loading)

第三方脚本（如 Google Analytics, 广告 SDK）必须使用 `next/script` 优化加载时机。

- **禁止同步脚本**：禁止使用普通的 `<script src="...">` 标签，防止阻塞页面渲染。 
- **内联脚本 ID**：内联脚本必须包含 `id` 属性，以便 Next.js 追踪和优化。 
- **位置控制**：不要将 `<Script>` 组件放在 `next/head` 或 `Metadata` 中，应直接放在组件树里。

:::tip[建议]
```tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <>
      {/* ✅ 策略加载，不阻塞 UI */}
      <Script
        src="https://example.com/analytics.js"
        strategy="lazyOnload"
      />

      {/* ✅ 内联脚本必须带 id */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        `}
      </Script>
      {children}
    </>
  );
}
```
:::

## Metadata 与 SEO

在 App Router 中，废弃传统的 `<head>` 标签管理方式。

- **使用 Metadata API**：使用导出的 `metadata` 对象或 `generateMetadata` 函数来定义 `<title>`、`<meta>` 等标签。 
- **禁止手动 Head**：禁止使用 `<head>` 标签或 `next/head`（在 App Router 中）。

:::tip[建议]
```tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | My App',
    default: 'My App Home', // ✅ 默认标题
  },
  description: 'Application description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```
:::

:::danger[不建议]
```tsx
// ❌ 不要在 App Router 页面中手动写 head
export default function Page() {
  return (
    <>
      <head>
        <title>My Page</title>
      </head>
      <div>Content</div>
    </>
  );
}
```
:::

## 字体优化 (Font Optimization)

使用 `next/font` 自动托管和优化字体文件，消除布局偏移（CLS）。

- **Google Fonts**：使用 `next/font/google`，严禁通过 `<link rel="stylesheet">` 引入 Google Fonts。

:::tip[建议]
```tsx
import { Inter } from 'next/font/google';

// ✅ 配置 swap 策略
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```
:::

## 链接与路由 (Links and Routing)

- **内部跳转**：必须使用 Next.js 提供的 `<Link>` 组件进行页面间跳转，以实现单页应用体验（避免全页刷新）。禁止使用 `<a>` 标签跳转内部页面。 
- **外部链接**：跳转外部网站时使用普通的 `<a>` 标签。如果使用 `target="_blank"`，必须添加 `rel="noopener noreferrer"`。 
- **编程式导航**： 
  - 在 Client Components 中，使用 `useRouter` hook。 
  - **注意**：App Router 中禁止导入 `next/router`。 
- **服务端重定向**：在 Server Components、Server Actions 或 Route Handlers 中，使用 `redirect` 函数 。 
- **预加载**：`<Link>` 组件在视口可见时会自动预加载目标路由。如果目标页面数据更新非常频繁或资源消耗极大，可视情况设置 `prefetch={false}`，但在大多数情况下应保持默认以提升用户体验。

:::tip[建议]
```tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // ✅ App Router 正确导入

export default function NavigationBar() {
  const router = useRouter();

  return (
    <nav>
      {/* ✅ 内部跳转 */}
      <Link href="/dashboard">Dashboard</Link>
      
      {/* ✅ 外部链接带安全属性 */}
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        External Site
      </a>

      {/* ✅ 编程式跳转 */}
      <button onClick={() => router.push('/settings')}>
        Go to Settings
      </button>
    </nav>
  );
}
```
:::

:::danger[不建议]
```tsx
import { useRouter } from 'next/router'; // ❌ App Router 中不能使用 next/router

export default function Nav() {
  // ❌ 内部跳转使用了 a 标签，导致页面刷新
  return <a href="/dashboard">Dashboard</a>;
}
```
:::
