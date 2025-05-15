---
sidebar_position: 5
lang: zh-cmn-Hans-CN
title: 部署
---

# 部署

## 项目构建和环境部署

使用 **Docker** 进行项目构建和环境部署，所有的构建和部署操作，均在 **Gitlab CI** 执行操作。

### 构建和部署流程

主要依赖于下面两个镜像：

- [Node.js](https://nodejs.org/)：用于安装依赖、构建和启动
- [nginx](https://nginx.org/)：作为 HTTP 服务器，或者充当反向代理

:::tip
- [nginx 配置](/docs/reference/configuration/#nginx)
- [Docker 配置](/docs/reference/configuration/#docker)
  :::

| 镜像      | 步骤                                                                         | React/Vue | Next.js |
|---------|----------------------------------------------------------------------------|-----------|---------|
| Node.js | 执行 `pnpm i --frozen-lockfile` 安装依赖                                         | ✔️        | ✔️      |
|         | 执行 `npm run build` 构建项目                                                    | ✔️        | ✔️      |
|         | 构建完成后生成 `/dist` 目录                                                         | ✔️        |         |
|         | 将静态资源文件上传至 CDN/OSS 存储                                                      | ✔️        | ✔️      |
|         | 执行 `npm run start` 启动 Node.js 服务                                           |           | ✔️      |
| nginx   | 编译 [Brotli nginx 模块](https://github.com/google/ngx_brotli)                 | ✔️        | ✔️      |
|         | 编译 [ModSecurity nginx 模块](https://github.com/SpiderLabs/ModSecurity-nginx) | ✔️        | ✔️      |
|         | 将编译完成后模块复制到 nginx 的模块目录                                                    | ✔️        | ✔️      |
|         | 复制 `/dist` 目录到 nginx 的服务器目录                                                | ✔️        |         |
|         | 复制 `nginx.conf` 文件替换镜像的 nginx 配置文件                                         | ✔️        | ✔️      |
|         | 更新 nginx 配置以使用 CDN/OSS 域名作为静态资源引用                                          | ✔️        | ✔️      |
|         | 执行 `nginx -s reload` 重新加载 nginx 配置                                         | ✔️        | ✔️      |
|         | 启动 nginx                                                                   | ✔️        | ✔️      |

### 前端构建优化

构建过程中应注意以下前端优化点：

1. **资源优化**
   - 启用代码分割（Code Splitting）减小初始加载体积
   - 配置 Tree Shaking 移除未使用代码
   - 图片压缩和转换为现代格式（WebP、AVIF）
   - SVG 优化和合并为雪碧图（适用场景）

2. **CDN 资源处理**
   - 为静态资源设置长期缓存策略
   - 确保文件名包含内容哈希以便缓存失效
   - 配置资源预加载（`preload`）和预连接（`preconnect`）
   - 添加 SRI (Subresource Integrity) 哈希以增强安全性

3. **框架特定优化**
   - **React**: 启用懒加载组件、使用 `React.memo()` 减少重渲染
   - **Vue**: 启用异步组件、适当使用 keep-alive
   - **Next.js**: 优化图片处理、配置合适的渲染策略（SSG/ISR/SSR）

:::warning
- 安装依赖和构建项目的步骤，均在 Gitlab CI 中执行，不需要配置在 Dockerfile 中
- Dockerfile 仅需要配置 nginx 的相关步骤
  - 如果需要使用 Node.js 启动服务，则需要在 Dockerfile 中配置 Node.js 的相关步骤，并运行 Node.js 服务。此时，需要使用 `docker-compose` 来启动服务，并配置 nginx 的反向代理
:::

## 部署验证与回滚

### 部署后验证

部署完成后，前端开发者应重点关注以下验证点：

1. **前端健康检查**
   - 验证 CSR/SSR 是否正常工作
   - 检查 API 健康端点响应状态（如 /health 或 /api/health 接口返回 200）
   - 确认前端路由是否正常运作（特别是 history 模式）
   - 检查浏览器控制台是否有错误或警告

2. **静态资源验证**
   - 确认所有静态资源是否成功从 CDN 加载
   - 验证资源完整性（无 404 错误）
   - 检查资源压缩是否生效（Gzip/Brotli）
   - 验证字体文件是否正确加载（无 FOUT/FOIT 问题）

3. **多环境兼容性测试**
   - 在主要目标浏览器中测试（Chrome、Firefox、Safari、Edge）
   - 在关键移动设备上验证响应式设计
   - 检查在不同网络条件下的性能（可使用 Chrome DevTools 的网络节流功能）
   - 验证不同 DPR 设备上的图像显示质量

4. **前端性能检查**
   - 测量核心 Web 指标：LCP、FID/INP、CLS
   - 验证首次内容绘制（FCP）时间是否在目标范围内
   - 检查 JavaScript 执行时间和主线程阻塞情况
   - 验证关键渲染路径是否已优化

### 部署回滚策略

当前端部署出现问题时，应考虑以下专门针对前端的回滚策略：

1. **前端版本控制**
   - 使用内容哈希命名文件实现安全回滚（如 `main.a1b2c3.js`）
   - 保留前 3-5 个版本的静态资源在 CDN 上
   - 在 HTML 中添加版本元信息便于调试（如 `<meta name="app-version" content="1.2.3">`)
   - 考虑使用 [import-map](https://github.com/WICG/import-maps) 实现模块级回滚

2. **回滚触发条件（前端视角）**
   - 前端错误率超过阈值（如 Sentry 报告的错误激增）
   - 核心 Web 指标显著劣化
   - 关键用户流程失败率上升
   - 特定浏览器或设备类型的兼容性问题

3. **前端回滚执行**
   - 更新 CDN 配置指向上一个版本的资源
   - 清除可能导致问题的缓存（CDN 缓存、Service Worker 缓存）
   - 考虑发布临时修复解决关键问题
   - 通过客户端健康检查验证回滚是否成功

4. **前端缓存处理**
   - 制定 Service Worker 更新策略防止缓存问题
   - 考虑使用版本化 API 路径确保数据结构兼容性
   - 在紧急情况下可添加特殊查询参数强制刷新（如 `?flush=true`）
   - 监控回滚后的资源请求模式确认缓存状态

### 高级前端部署策略

#### 蓝绿部署（前端应用视角）

对前端应用实施蓝绿部署：

1. **资源准备**
   - 维护两套完整的前端资源集合（蓝版本和绿版本）
   - 在 CDN 上保持两个版本的并行可用性
   - 确保 HTML 入口文件可以快速切换

2. **无缝切换机制**
   - 通过 CDN 规则或负载均衡器实现流量切换
   - 对于 SPA，可以考虑运行时版本检测实现热切换
   - 使用共享的用户会话确保体验连续性
   - 为更复杂的应用考虑使用 [Module Federation](https://webpack.js.org/concepts/module-federation/) 技术

3. **前端特有优势**
   - 实现零感知的前端应用更新
   - 消除部署期间的体验不一致
   - 支持 A/B 测试和功能实验
   - 降低前端回归风险

#### 金丝雀发布（前端实现）

前端应用的金丝雀发布策略：

1. **客户端分流设置**
   - 使用特征标记系统（Feature Flags）控制功能可用性
   - 基于用户 ID、地理位置或其他属性进行精确流量分配
   - 配置渐进式 rollout 计划（5%、20%、50%、100%）
   - 使用 Cookie/LocalStorage 确保用户体验一致性

2. **前端监控指标**
   - 跟踪 JavaScript 错误率
   - 监控核心 Web 指标随流量变化的趋势
   - 收集用户反馈和行为变化
   - 特别关注关键用户旅程完成率

3. **前端专用实践**
   - 实施运行时切换功能避免页面刷新
   - 收集前端性能数据（使用 [Web Vitals](https://github.com/GoogleChrome/web-vitals) 库）
   - 在发布后监控前端资源加载成功率
   - 监控 API 调用成功率和响应时间变化

## 服务器架构推荐

![服务器架构](./server.svg)

服务器产品推荐使用[阿里云](https://cn.aliyun.com/)产品

### 安全层

- [SSL 证书](https://www.aliyun.com/product/cas)：为网站提供 HTTPS 访问，保障数据的安全
- [DDoS 防护](https://www.aliyun.com/product/security/ddos)：降低潜在DDoS攻击风险，减少业务损失
- [Web 应用防火墙 WAF](https://www.aliyun.com/product/waf)：避免网站服务器被恶意入侵，保障业务的核心数据安全

### 应用层

- [负载均衡 SLB](https://www.aliyun.com/product/slb)：通过对多台云服务器进行均衡的流量分发调度，消除单点故障提升应用系统的可靠性与吞吐力
- [云服务器 ECS](https://www.aliyun.com/product/ecs)：部署 HTTP 服务器和项目代码
  - CPU 内存比为 1:2，推荐使用 2vCPU 和 4GB 内存以上配置
  - 推荐使用 5MB 带宽
  - 建议支持 IPv6
  - 推荐使用 [Rocky Linux](https://rockylinux.org/) 或 [AlmaLinux](https://almalinux.org/) 操作系统

### 存储层

- [CDN](https://www.aliyun.com/product/cdn)：部署静态资源，将网站、音视频、下载等内容分发至接近用户的节点，使用户可就近取得所需内容，提高用户访问的响应速度和成功率
  - 配置合理的缓存策略（长缓存 + 版本化文件名）
  - 启用 HTTP/2 和 HTTP/3（QUIC）支持
  - 配置适当的 CORS 策略允许跨域资源共享
  - 启用 Brotli 压缩获得更高的压缩率
  - 考虑使用自动 WebP/AVIF 转换功能

- [对象存储 OSS](https://www.aliyun.com/product/oss)：优化资源存储成本
  - 设置适当的生命周期策略管理旧版本资源
  - 利用存储类型策略（标准、低频、归档）降低成本
  - 配合 CDN 使用提高访问性能

### 数据层

（数据层不是前端关注的重点，这里不做说明）
