---
sidebar_position: 6
description: GitLab CI/CD 流水线配置，包含 7 个阶段的自动化构建、测试、质量检查与部署流程
---

# CI/CD

本项目使用 **GitLab CI/CD** 自动化构建、测试、质量检查和部署流程。Pipeline 配置文件为项目根目录下的 `.gitlab-ci.yml`。

## Pipeline 总览

整个 Pipeline 由 **7 个阶段**顺序执行：

![Gitlab CI 流水线总览](./assets/gitlab-ci-pipeline.avif)

阶段的顺序是刻意设计的：越早的阶段越轻量，发现问题的成本越低。lint 几秒内给出反馈，总比问题混进 main 分支后再排查要省力得多。

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
Lint 规范与提交前的 husky + lint-staged 钩子保持一致，本地提交和 CI 两道关卡用同一套规则，不会出现本地过了 CI 却挂的情况。
:::

lint 解决的其实是一个团队协作问题。每个人写代码都有自己的习惯，没有统一规范的话，Code Review 时一半的讨论都在纠结缩进、引号、空格这些无聊的事。有了自动检查，Review 时大家可以把注意力放在真正重要的地方——逻辑是否合理、边界情况有没有考虑到。另外 Airbnb 规范本身也包含不少对常见 JavaScript 坑的检测，比如忘记处理 Promise、依赖数组写错等，能提前发现一些运行时才会暴露的问题。

### 3. build — 构建

| Job | 说明 |
|-----|------|
| `build_app` | 执行 `pnpm run build`，产物输出到 `dist/` |
| `build_docker` | 基于 `build_app` 的产物构建 Docker 镜像，推送到私有镜像仓库 |

`build_app` 产物通过 GitLab Artifacts 传递给后续 Job，E2E 测试、Lighthouse、部署拿到的都是同一份构建产物，保证"测试的"和"最终跑的"是同一份代码。

构建这一步本身也是一种验证——TypeScript 类型错误、模块引用写错了、循环依赖，这些在构建时就会直接暴露出来。镜像用 commit SHA 打 tag，出了问题可以精确定位到哪次提交，回滚的时候也知道要回到哪个版本。

### 4. test — 测试

| Job | 工具 | 触发条件 |
|-----|------|---------|
| `unit tests` | Jest / Vitest | 每次 Pipeline |
| `coverage tests` | Jest / Vitest（coverage 模式） | 每次 Pipeline，并上报覆盖率 |
| `e2e tests` | Playwright | 仅在 MR 和默认分支上触发 |

单元测试每次 Pipeline 都跑，好处是回归问题会立刻被发现，不会攒到下个迭代再集中爆出来。覆盖率数据上报到 GitLab 后，在 MR 页面可以直接看到这次改动有没有把覆盖率带下去，是个很自然的提醒机制。

E2E 测试用真实浏览器跑完整的用户流程，它能发现单元测试覆盖不到的问题——比如组件拼在一起之后交互是不是正常的，页面跳转有没有问题。用的是真实构建产物而不是开发服务器，所以懒加载、代码分割这类构建优化有没有把运行时搞坏，也能在这里被发现。

### 5. quality — 质量检查

| Job | 工具 | 触发条件 |
|-----|------|---------|
| `qodana` | JetBrains Qodana | MR 和默认分支 |
| `lighthouse` | Lighthouse CI | 仅默认分支 |

Qodana 做的是比 lint 更深层的静态分析，死代码、过度复杂的函数、潜在的空指针风险这些是它的擅长项。更有用的是它的趋势追踪——哪次合并之后技术债务突然变多了，一眼就能看出来，方便团队决定要不要专门花时间来还债。

:::warning
Qodana 是 JetBrains 的商业产品，使用前请确保团队有相应的许可证。
:::

Lighthouse 则是站在用户的角度来看问题的。LCP、CLS、TBT 这些指标直接影响用户的使用感受，而性能劣化往往是悄悄发生的——某个依赖升级了、某段代码改了，不知不觉首屏就慢了几百毫秒。有了每次合并都自动跑的 Lighthouse，性能变化有迹可循，不需要等到用户反馈慢了才去排查。

建议把这两份报告纳入 MR review 时的参考，把它们当成长期趋势来看，而不是一次性的检查项。

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

`dependency_scanning` 值得特别提一下：项目依赖的第三方库本身可能有安全漏洞，而且这类漏洞往往不是自己写代码引入的，很容易被忽视。定期扫描能让团队知道什么时候需要升级依赖，而不是等到漏洞被利用之后才发现。

### 7. deploy — 部署

| Job | 目标环境 | 触发方式 | URL |
|-----|---------|---------|-----|
| `deploy_dev` | development | 自动，默认分支推送时触发 | `https://dev.example.com` |
| `deploy_production` | production | **手动触发** | `https://example.com` |

部署方式为拉取对应 commit SHA 的镜像，重新打环境 tag（`dev` / `prod`）后推送到私有镜像仓库。

开发环境自动部署，代码合并之后 QA 和产品可以马上去验收，不需要等开发手动部署。生产环境设置为手动确认，是因为代码合进了 main 就自动上线这件事风险还是太高，留一个人工判断的节点更稳妥，也给了团队一个在正式发布前做最后确认的机会。

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
