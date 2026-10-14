---
description: 支付宝支付接入指南，介绍电脑网站支付流程与代码实现，支持网页跳转收银台完成付款
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 支付宝支付

## 简介

支付宝支付是蚂蚁集团旗下的第三方支付平台，为商户和用户提供安全、便捷的支付解决方案。支持电脑网站支付、手机网站支付、APP支付、当面付等多种支付方式。本文档主要介绍电脑网站支付的接入流程和代码实现。

电脑网站支付是在电脑上打开的网站中集成支付宝支付功能，买家使用电脑上网时，通过浏览器跳转到支付宝收银台完成付款。支付完成后会跳转回商户指定的页面。

## 参考资料
- [支付宝开放平台](https://opendocs.alipay.com/)
- [电脑网站支付](https://opendocs.alipay.com/open/270)
- [手机网站支付](https://opendocs.alipay.com/open/203)
- [支付宝SDK下载](https://opendocs.alipay.com/open/54)
- [Easy SDK](https://github.com/alipay/alipay-easysdk)

## 支付流程

```mermaid
sequenceDiagram
    participant 用户 as 用户
    participant 前端 as 前端
    participant 后端 as 后端
    participant 支付宝 as 支付宝

    用户->>前端: 1. 点击支付按钮
    前端->>后端: 2. 请求创建订单（商品信息、金额等）
    后端-->>前端: 3. 返回订单号（out_trade_no）
    前端->>后端: 4. 提交支付请求（含订单号）
    后端->>后端: 5. 生成签名并组装支付参数（totalAmount、subject等）
    后端->>支付宝: 6. 调用alipay.trade.page.pay接口
    支付宝-->>后端: 7. 返回支付跳转链接/表单
    后端-->>前端: 8. 返回支付跳转链接
    前端->>支付宝: 9. 自动跳转至支付宝收银台
    支付宝-->>用户: 10. 展示支付页面
    用户->>支付宝: 11. 输入密码完成支付
    支付宝-->>前端: 12. 同步跳转至return_url（前端页面）
    支付宝->>后端: 13. 异步通知支付结果（POST到notify_url）
    后端->>后端: 14. 验签并更新订单状态为已支付
    后端-->>支付宝: 15. 返回"success"（通知处理成功）
    前端->>后端: 16. 轮询查询订单状态（可选）
    后端-->>前端: 17. 返回支付成功状态
    前端-->>用户: 18. 展示支付成功页面
```

## 关键代码实现

### 前端调用（JavaScript）

```javascript
// 引入方式（仅手机网站支付 JSAPI 需要）：
// CDN: <script src="https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.inc.min.js"></script>
// npm: @alipay/alipayjsapi，引入后通过全局 ap 对象调用

// 电脑网站支付：创建订单后跳转收银台
async function createAlipayOrder(orderData) {
  const response = await fetch('/api/alipay/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });

  const result = await response.json();

  if (result.payUrl) {
    // 后端以 method 'get' 组装参数时返回收银台 URL
    window.location.href = result.payUrl;
    return;
  }

  // 后端返回自动提交表单时（EasySDK / page_execute），注入页面并提交
  const container = document.createElement('div');
  container.innerHTML = result.formHtml;
  document.body.appendChild(container);
  container.querySelector('form')?.submit();
}

// 手机网站支付（支付宝客户端内）
async function createMobileAlipayOrder(orderData) {
  const response = await fetch('/api/alipay/create-wap-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  const result = await response.json();

  const isAlipayClient = /alipayclient/i.test(navigator.userAgent);
  if (isAlipayClient) {
    ap.tradePay(
      { tradeNO: result.tradeNo },
      (res) => {
        // res.resultCode '9000' 表示支付成功，最终状态以后端异步通知为准
        if (res.resultCode === '9000') {
          window.location.href = '/pay/success';
        }
      }
    );
  } else {
    window.location.href = result.payUrl;
  }
}
```

### 后端实现

<Tabs>
<TabItem value="nodejs" label="Node.js" default>

```javascript
// 使用支付宝官方SDK（alipay-sdk v2）
const AlipaySdk = require('alipay-sdk').default;
const AlipayFormData = require('alipay-sdk/lib/form').default;

class AlipayService {
  constructor(config) {
    this.alipaySdk = new AlipaySdk({
      appId: config.appId,
      privateKey: config.privateKey,
      alipayPublicKey: config.alipayPublicKey,
      gateway: config.gateway || 'https://openapi.alipay.com/gateway.do'
    });
  }
  
  // 创建支付订单：method 'get' 时返回收银台 URL
  async createPagePay(orderData) {
    const formData = new AlipayFormData();
    formData.setMethod('get');
    
    formData.addField('bizContent', {
      out_trade_no: orderData.outTradeNo,
      product_code: 'FAST_INSTANT_TRADE_PAY',
      total_amount: orderData.totalAmount,
      subject: orderData.subject,
      body: orderData.body
    });
    
    formData.addField('returnUrl', orderData.returnUrl);
    formData.addField('notifyUrl', orderData.notifyUrl);
    
    return this.alipaySdk.exec('alipay.trade.page.pay', {}, {
      formData: formData
    });
  }
  
  // 验证回调签名
  checkNotifySign(postData) {
    return this.alipaySdk.checkNotifySign(postData);
  }
  
  // 查询订单状态
  async queryOrder(outTradeNo) {
    return this.alipaySdk.exec('alipay.trade.query', {
      bizContent: {
        out_trade_no: outTradeNo
      }
    });
  }
}

// 服务单例，避免每次请求重建
const alipayService = new AlipayService(config);

// 支付回调：报文为 form-urlencoded，需启用 express.urlencoded({ extended: false }) 中间件
app.post('/api/alipay/notify', (req, res) => {
  if (!alipayService.checkNotifySign(req.body)) {
    return res.send('fail');
  }

  const { out_trade_no, trade_status } = req.body;

  if (trade_status === 'TRADE_SUCCESS' || trade_status === 'TRADE_FINISHED') {
    // 更新前须与本地订单核对金额；写入需幂等，防止重复通知重复处理
    updateOrderStatus(out_trade_no, 'paid');
  }

  // 验签通过的通知一律返回 success，否则支付宝会按间隔重发（最多 8 次）
  res.send('success');
});
```

</TabItem>
<TabItem value="java" label="Java">

```java
// 使用支付宝官方SDK
import com.alipay.easysdk.factory.Factory;
import com.alipay.easysdk.kernel.Config;
import com.alipay.easysdk.payment.page.models.AlipayTradePagePayResponse;

public class AlipayService {
  
  public AlipayService(AlipayConfig config) {
    Config options = new Config();
    options.protocol = "https";
    options.gatewayHost = "openapi.alipay.com";
    options.signType = "RSA2";
    options.appId = config.getAppId();
    options.merchantPrivateKey = config.getPrivateKey();
    options.alipayPublicKey = config.getAlipayPublicKey();
    options.notifyUrl = config.getNotifyUrl();
    options.encryptKey = config.getEncryptKey();
    
    Factory.setOptions(options);
  }
  
  // 创建支付订单
  public String createPagePay(OrderData orderData) throws Exception {
    AlipayTradePagePayResponse response = Factory.Payment.Page()
      .pay(orderData.getSubject(), orderData.getOutTradeNo(), 
           orderData.getTotalAmount(), orderData.getReturnUrl());
    
    return response.getBody();
  }
  
  // 验证回调签名
  public boolean verifyNotify(Map<String, String> params) {
    try {
      return Factory.Payment.Common().verifyNotify(params);
    } catch (Exception e) {
      return false;
    }
  }
  
  // 查询订单
  public AlipayTradeQueryResponse queryOrder(String outTradeNo) throws Exception {
    return Factory.Payment.Common().query(outTradeNo);
  }
}
```

</TabItem>
<TabItem value="php" label="PHP">

```php
<?php
// 使用支付宝官方SDK
require_once 'vendor/autoload.php';

use Alipay\EasySDK\Kernel\Factory;
use Alipay\EasySDK\Kernel\Config;

class AlipayService {
  
  public function __construct($config) {
    $options = new Config();
    $options->protocol = 'https';
    $options->gatewayHost = 'openapi.alipay.com';
    $options->signType = 'RSA2';
    $options->appId = $config['appId'];
    $options->merchantPrivateKey = $config['privateKey'];
    $options->alipayPublicKey = $config['alipayPublicKey'];
    $options->notifyUrl = $config['notifyUrl'];
    
    Factory::setOptions($options);
  }
  
  // 创建支付订单
  public function createPagePay($orderData) {
    $response = Factory::payment()->page()->pay(
      $orderData['subject'],
      $orderData['outTradeNo'],
      $orderData['totalAmount'],
      $orderData['returnUrl']
    );
    
    return $response->body;
  }
  
  // 验证回调签名
  public function verifyNotify($params) {
    try {
      return Factory::payment()->common()->verifyNotify($params);
    } catch (Exception $e) {
      return false;
    }
  }
  
  // 查询订单
  public function queryOrder($outTradeNo) {
    return Factory::payment()->common()->query($outTradeNo);
  }
}
```

</TabItem>
<TabItem value="dotnet" label=".NET">

```csharp
// 使用支付宝官方SDK
using Alipay.EasySDK.Factory;
using Alipay.EasySDK.Kernel;
using Alipay.EasySDK.Payment.Page.Models;

public class AlipayService
{
  public AlipayService(AlipayConfig config)
  {
    Factory.SetOptions(new Config()
    {
      Protocol = "https",
      GatewayHost = "openapi.alipay.com",
      SignType = "RSA2",
      AppId = config.AppId,
      MerchantPrivateKey = config.PrivateKey,
      AlipayPublicKey = config.AlipayPublicKey,
      NotifyUrl = config.NotifyUrl
    });
  }
  
  // 创建支付订单
  public string CreatePagePay(OrderData orderData)
  {
    var response = Factory.Payment.Page().Pay(
      orderData.Subject,
      orderData.OutTradeNo,
      orderData.TotalAmount,
      orderData.ReturnUrl
    );
    
    return response.Body;
  }
  
  // 验证回调签名
  public bool VerifyNotify(Dictionary<string, string> parameters)
  {
    try
    {
      return Factory.Payment.Common().VerifyNotify(parameters);
    }
    catch
    {
      return false;
    }
  }
  
  // 查询订单
  public AlipayTradeQueryResponse QueryOrder(string outTradeNo)
  {
    return Factory.Payment.Common().Query(outTradeNo);
  }
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
# 使用支付宝官方SDK
from alipay.aop.api.AlipayClientConfig import AlipayClientConfig
from alipay.aop.api.DefaultAlipayClient import DefaultAlipayClient
from alipay.aop.api.request.AlipayTradePagePayRequest import AlipayTradePagePayRequest
from alipay.aop.api.request.AlipayTradeQueryRequest import AlipayTradeQueryRequest
from alipay.aop.api.util.SignatureUtils import verify_with_rsa

class AlipayService:
  def __init__(self, config):
    alipay_client_config = AlipayClientConfig()
    alipay_client_config.server_url = 'https://openapi.alipay.com/gateway.do'
    alipay_client_config.app_id = config['app_id']
    alipay_client_config.app_private_key = config['private_key']
    alipay_client_config.alipay_public_key = config['alipay_public_key']

    self.alipay_public_key = config['alipay_public_key']
    self.client = DefaultAlipayClient(alipay_client_config)
  
  # 创建支付订单
  def create_page_pay(self, order_data):
    request = AlipayTradePagePayRequest()
    request.biz_content = {
      "out_trade_no": order_data['out_trade_no'],
      "product_code": "FAST_INSTANT_TRADE_PAY",
      "total_amount": order_data['total_amount'],
      "subject": order_data['subject'],
      "body": order_data.get('body', '')
    }
    request.return_url = order_data['return_url']
    request.notify_url = order_data['notify_url']
    
    # page_execute 返回自动提交表单的 HTML
    return self.client.page_execute(request)
  
  # 验证回调签名：通知参数去除 sign/sign_type 后按 key 排序拼接
  def verify_notify(self, params):
    try:
      sign = params.get('sign')
      data = {k: v for k, v in params.items() if k not in ('sign', 'sign_type')}
      message = '&'.join(f'{k}={v}' for k, v in sorted(data.items()))
      return verify_with_rsa(self.alipay_public_key, message, sign)
    except Exception:
      return False
  
  # 查询订单
  def query_order(self, out_trade_no):
    request = AlipayTradeQueryRequest()
    request.biz_content = {
      "out_trade_no": out_trade_no
    }
    
    return self.client.execute(request)
```

</TabItem>
</Tabs>

### 配置文件

```json
{
  "alipay": {
    "appId": "your_app_id",
    "privateKey": "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----",
    "alipayPublicKey": "-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----",
    "gateway": "https://openapi.alipay.com/gateway.do",
    "returnUrl": "https://your-domain.com/pay/success",
    "notifyUrl": "https://your-domain.com/api/alipay/notify"
  }
}
```
