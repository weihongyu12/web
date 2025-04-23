# 支付宝支付

- [Alipay JSAPI 使用说明](https://opendocs.alipay.com/open/024kz4)
- [Alipay JSAPI 概览](https://opendocs.alipay.com/open/025a4p)
- [JSAPI DEMO](https://opendocs.alipay.com/open/54/104510)
- [Alipay JSSDK](https://myjsapi.alipay.com/alipayjsapi/index.html)

```mermaid
sequenceDiagram
    participant 用户 as 用户
    participant 前端 as 前端
    participant 后端 as 后端
    participant 支付宝 as 支付宝

    用户->>前端: 点击支付按钮
    前端->>后端: 请求创建订单（商品信息、金额等）
    后端-->>前端: 返回订单号（out_trade_no）
    
    前端->>后端: 提交支付请求（含订单号）
    后端->>后端: 1. 生成签名<br>2. 组装支付参数（totalAmount、subject等）
    后端->>支付宝: 调用alipay.trade.page.pay接口
    支付宝-->>后端: 返回支付跳转链接/表单
    后端-->>前端: 返回支付跳转链接
    
    前端->>支付宝: 自动跳转至支付宝收银台
    支付宝->>用户: 展示支付页面
    用户->>支付宝: 输入密码完成支付
    支付宝-->>前端: 同步跳转至return_url（前端页面）
    支付宝->>后端: 异步通知支付结果（POST到notify_url）
    
    后端->>后端: 1. 验签<br>2. 更新订单状态为已支付
    后端-->>支付宝: 返回"success"（通知处理成功）
    前端->>后端: 轮询查询订单状态（可选）
    后端-->>前端: 返回支付成功状态
    前端->>用户: 展示支付成功页面
```