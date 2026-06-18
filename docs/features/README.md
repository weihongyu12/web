# 概览

## 认证体系

- **多方式登录**
  - [手机验证码登录](/docs/features/authentication/smscode)：自动注册、防刷机制
  - [微信登录](/docs/features/authentication/wechat)：OpenID集成、自动获取资料
  - [密码登录](/docs/features/authentication/password)：密码强度检测、凭据管理
  - [用户注册](/docs/features/authentication/registration)：自动注册优先、渐进式引导

## 数据安全

- **敏感数据加密**
  - [AES双向加密传输](/docs/features/encrypt)
  - [数据脱敏处理](/docs/features/encrypt#数据脱敏处理)
  - [自动敏感字段识别](/docs/features/encrypt#敏感数据识别)
- **文件安全上传**
  - [分片上传](/docs/features/file-upload#分片上传)
  - [断点续传](/docs/features/file-upload#断点续传)
  - [多层校验](/docs/features/file-upload#文件上传安全性)

## 系统集成

- **OpenAPI 前端集成**
  - [自动生成TS类型定义](/docs/features/openapi#类型安全)
  - [React Query状态管理](/docs/features/openapi#基本用法)
  - [分页查询/错误处理](/docs/features/openapi#分页查询)
- **支付系统**
  - [微信/支付宝/云闪付集成](/docs/features/payment)
  - [订单状态自动同步](/docs/features/payment#支付流程)

## 容灾机制

- [四级容灾策略](/docs/features/recovery)
  - 主域名重试（指数退避）
  - 备用域名切换
  - IndexedDB缓存读取
  - 静态兜底数据展示

## 媒体处理

- 图片优化：
  - [懒加载/响应式/WebP优先](/docs/features/media/image)
- 音视频处理：
  - [格式兜底（MP4/WebM）](/docs/features/media/video)
  - [字幕生成](/docs/features/media/video#无障碍性考虑)
  - [自适应比特率](/docs/features/media/video#自适应码率流)
