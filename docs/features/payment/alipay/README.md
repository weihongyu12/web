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
// 1. 引入支付宝JSSDK（可选，用于手机网站支付）
// 方式一：通过CDN引入
// <script src="https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.inc.min.js"></script>

// 方式二：通过npm安装
// npm install @alipay/alipayjsapi
// import alipayjsapi from '@alipay/alipayjsapi'

// 2. 发起支付请求（电脑网站支付）
async function createAlipayOrder(orderData) {
  const response = await fetch('/api/alipay/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  
  const result = await response.json();
  
  // 直接跳转到支付宝收银台
  window.location.href = result.payUrl;
}

// 3. 手机网站支付示例（使用JSSDK）
function createMobileAlipayOrder(orderData) {
  // 检测是否在支付宝客户端内
  if (alipayjsapi.isAlipayClient()) {
    // 在支付宝客户端内，可以使用JSAPI
    alipayjsapi.ready(function(res) {
      alipayjsapi.tradePay({
        tradeNO: orderData.tradeNo, // 支付宝交易号
        bizType: 'trade'
      }, function(result) {
        if (result.resultCode === '9000') {
          console.log('支付成功');
        }
      });
    });
  } else {
    // 不在支付宝客户端内，跳转到支付页面
    window.location.href = result.payUrl;
  }
}
```

### 后端实现

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="nodejs" label="Node.js" default>

```javascript
// 使用支付宝官方SDK
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
  
  // 创建支付订单
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
    
    const result = await this.alipaySdk.exec('alipay.trade.page.pay', {}, {
      formData: formData
    });
    
    return result;
  }
  
  // 验证回调签名
  checkNotifySign(postData) {
    return this.alipaySdk.checkNotifySign(postData);
  }
  
  // 查询订单状态
  async queryOrder(outTradeNo) {
    const result = await this.alipaySdk.exec('alipay.trade.query', {
      bizContent: {
        out_trade_no: outTradeNo
      }
    });
    
    return result;
  }
}

// 支付回调处理
app.post('/api/alipay/notify', (req, res) => {
  const alipayService = new AlipayService(config);
  
  if (alipayService.checkNotifySign(req.body)) {
    const { out_trade_no, trade_status } = req.body;
    
    if (trade_status === 'TRADE_SUCCESS') {
      // 更新订单状态为已支付
      updateOrderStatus(out_trade_no, 'paid');
    }
    
    res.send('success');
  } else {
    res.send('fail');
  }
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
?>
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

class AlipayService:
  def __init__(self, config):
    alipay_client_config = AlipayClientConfig()
    alipay_client_config.server_url = 'https://openapi.alipay.com/gateway.do'
    alipay_client_config.app_id = config['app_id']
    alipay_client_config.app_private_key = config['private_key']
    alipay_client_config.alipay_public_key = config['alipay_public_key']
    
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
    
    response = self.client.page_execute(request)
    return response
  
  # 验证回调签名
  def verify_notify(self, params):
    try:
      return self.client.verify(params)
    except:
      return False
  
  # 查询订单
  def query_order(self, out_trade_no):
    request = AlipayTradeQueryRequest()
    request.biz_content = {
      "out_trade_no": out_trade_no
    }
    
    response = self.client.execute(request)
    return response
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
