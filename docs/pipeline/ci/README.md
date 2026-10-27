---
sidebar_position: 7
description: GitLab CI/CD 流水线配置，包含 7 个阶段的自动化构建、测试、质量检查与部署流程
---

# CI/CD

本项目使用 **GitLab CI/CD** 自动化构建、测试、质量检查和部署流程。Pipeline 配置文件为项目根目录下的 `.gitlab-ci.yml`。

## Pipeline 总览

整个 Pipeline 由 **7 个阶段**顺序执行：

![Gitlab CI 流水线总览](./assets/gitlab-ci-pipeline.avif)

阶段顺序按反馈成本排列：越靠前的阶段越轻量，问题越早暴露，修复成本越低。

## 各阶段说明

### 1. install — 安装依赖

| Job | 说明 |
|-----|------|
| `setup` | 使用 `pnpm install --frozen-lockfile` 安装项目依赖，并将 `.pnpm-store/` 和 `node_modules/` 写入缓存，供后续阶段复用 |

### 2. lint — 代码规范检查

| Job | 工具 | 说明 |
|-----|------|------|
| `eslint` | ESLint（Airbnb 规范） | 检查 JavaScript / TypeScript 代码规范 |
| `stylelint` | stylelint（twbs-bootstrap 规范） | 检查 CSS / SCSS 样式代码规范 |

lint 失败时 Pipeline 中止，不会进入后续阶段。

:::tip
Lint 规范与提交前的 husky + lint-staged 钩子保持一致，本地提交和 CI 用同一套规则，不会出现本地通过、CI 挂掉的情况。
:::

规范统一后，Code Review 的注意力可以放在逻辑和边界情况上，而不是格式细节。Airbnb 规则集还包含对常见运行时问题的检测，比如未处理的 Promise、写错的依赖数组。

### 3. build — 构建

| Job | 说明 |
|-----|------|
| `build_app` | 执行 `pnpm run build`，产物输出到 `dist/` |
| `build_docker` | 基于 `build_app` 的产物构建 Docker 镜像，推送到私有镜像仓库 |

`build_app` 产物通过 GitLab Artifacts 传递给后续 Job，E2E 测试、Lighthouse、部署拿到的是同一份构建产物，保证测试的对象和线上运行的一致。

构建同时起到验证作用：TypeScript 类型错误、模块引用错误、循环依赖都会在这一步暴露。镜像以 commit SHA 打 tag，版本可定位、可回滚。

### 4. test — 测试

| Job | 工具 | 触发条件 |
|-----|------|---------|
| `unit tests` | Vitest | 每次 Pipeline |
| `coverage tests` | Vitest（coverage 模式） | 每次 Pipeline，并上报覆盖率 |
| `e2e tests` | Playwright | 仅在 MR 和默认分支上触发 |

单元测试每次 Pipeline 都跑，回归问题当场暴露。覆盖率上报到 GitLab 后，MR 页面会显示本次改动对覆盖率的影响。

E2E 用真实浏览器和构建产物（而非开发服务器）执行完整用户流程，覆盖单元测试覆盖不到的场景：组件组装后的交互、页面跳转，以及懒加载、代码分割等构建优化对运行时的影响。

### 5. quality — 质量检查

| Job | 工具 | 触发条件 |
|-----|------|---------|
| `qodana` | JetBrains Qodana | MR 和默认分支 |
| `lighthouse` | Lighthouse CI | 仅默认分支 |

Qodana 做比 lint 更深层的静态分析：死代码、复杂度过高的函数、潜在空指针。它的趋势追踪可以显示技术债随合并的变化，作为安排还债的依据。

:::warning
Qodana 是 JetBrains 的商业产品，使用前请确保团队有相应的许可证。
:::

Lighthouse 关注 LCP、CLS、TBT 等直接影响用户体验的性能指标。依赖升级或代码改动可能让首屏慢几百毫秒且不易察觉，默认分支每次合并自动执行，性能变化有数据可查。

建议在 MR review 时参考这两份报告，重点关注趋势变化。

### 6. security — 安全扫描

本阶段引入 GitLab 官方安全扫描模板，提供四种扫描能力：

| Job | 说明 |
|-----|------|
| `sast` | 静态应用安全测试，扫描源码中的安全漏洞（如 XSS、注入风险） |
| `secret_detection` | 检测代码中意外提交的密钥、API Token、私钥等敏感信息 |
| `dependency_scanning` | 扫描依赖包中的已知 CVE 安全漏洞 |
| `container_scanning` | 扫描 Docker 镜像中的操作系统和软件包漏洞 |

:::danger
密钥一旦进了 Git 历史，即使后续提交删掉了，也可能已经被拿走了。`secret_detection` 发现问题后应立即轮换相关密钥，不能只是把文件改掉就完事。
:::

`dependency_scanning` 针对的是第三方依赖中的已知 CVE。这类漏洞不是自己写代码引入的，扫描结果可以作为升级依赖的时机依据。

### 7. deploy — 部署

| Job | 目标环境 | 触发方式 | URL |
|-----|---------|---------|-----|
| `deploy_dev` | development | 自动，默认分支推送时触发 | `https://dev.example.com` |
| `deploy_production` | production | **手动触发** | `https://example.com` |

部署方式为拉取对应 commit SHA 的镜像，重新打环境 tag（`dev` / `prod`）后推送到私有镜像仓库。

开发环境自动部署，代码合并后即可验收，不依赖开发手动操作。生产环境手动触发，在合并与上线之间保留一个人工确认节点。

## 触发规则汇总

| Job | 默认分支 | Merge Request | 其他分支 |
|-----|:-------:|:------------:|:-------:|
| setup | ✔️ | ✔️ | ✔️ |
| lint | ✔️ | ✔️ | ✔️ |
| build_app / build_docker | ✔️ | ✔️ | ✔️ |
| unit tests / coverage tests | ✔️ | ✔️ | ✔️ |
| e2e tests | ✔️ | ✔️ | ❌ |
| qodana | ✔️ | ✔️ | ❌ |
| lighthouse | ✔️ | ❌ | ❌ |
| deploy_dev | ✔️（自动）| ❌ | ❌ |
| deploy_production | ✔️（手动）| ❌ | ❌ |

:::tip
建议在 GitLab 项目设置中为 `main`、`pre-production`、`production` 分支开启保护规则，配合 Pipeline 的触发规则共同确保代码质量和发布安全。
:::
