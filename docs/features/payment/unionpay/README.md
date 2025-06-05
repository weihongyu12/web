# 云闪付

## 简介

云闪付是中国银联推出的移动支付APP，也是银联推广的非接触式支付产品的统一品牌。银联在线支付为商户提供统一的支付接口，支持各大银行的借记卡和信用卡支付。本文档主要介绍银联网关支付的接入流程和代码实现。

银联网关支付是用户在商户网站选择银联支付后，跳转到银联收银台，选择相应的银行卡完成支付。支持各大银行的借记卡、信用卡，以及云闪付APP等多种支付方式。

## 参考资料

- [中国银联开放平台](https://open.unionpay.com/)
- [全渠道产品技术文档](https://open.unionpay.com/tjweb/acproduct/list?apiservId=448)
- [网关支付产品介绍](https://open.unionpay.com/tjweb/acproduct/APIList?acpAPIId=754&apiservId=448&version=V2.2)
- [银联SDK下载](https://open.unionpay.com/tjweb/support/faq/mchlist?faqId=3384)

## 支付流程

```mermaid
sequenceDiagram
    participant 用户 as 用户
    participant 前端 as 前端
    participant 后端 as 后端
    participant 云闪付 as 云闪付

    用户->>前端: 1. 点击支付按钮
    前端->>后端: 2. 提交订单请求（商品信息、金额）
    后端->>云闪付: 3. 调用统一下单API（生成支付订单）
    云闪付-->>后端: 4. 返回支付跳转链接
    后端-->>前端: 5. 返回支付参数
    前端->>云闪付: 6. 跳转至云闪付收银台
    云闪付-->>用户: 7. 展示支付页面（银行卡/云闪付APP）
    用户->>云闪付: 8. 选择支付方式并完成支付
    云闪付->>后端: 9. 异步通知支付结果（回调URL）
    后端-->>云闪付: 10. 返回SUCCESS响应
    云闪付-->>前端: 11. 同步跳转至成功页面
    前端-->>用户: 12. 展示支付成功页面
```

## 关键代码实现

### 前端调用（JavaScript）

```javascript
// 注意：银联云闪付没有提供前端JSSDK
// 支付流程是通过页面跳转到银联收银台完成

// 发起支付请求
async function createUnionpayOrder(orderData) {
  const response = await fetch('/api/unionpay/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  
  const result = await response.json();
  
  // 跳转到云闪付收银台
  window.location.href = result.payUrl;
}

// 或者直接提交表单（如果后端返回的是HTML表单）
function submitUnionpayForm(formHtml) {
  // 将表单HTML插入到页面中
  document.body.innerHTML += formHtml;
  // 自动提交表单
  document.forms['unionpaysubmit'].submit();
}

// 监听支付结果（通过URL参数或本地存储）
function checkPaymentResult() {
  const urlParams = new URLSearchParams(window.location.search);
  const respCode = urlParams.get('respCode');
  
  if (respCode === '00') {
    console.log('支付成功');
    // 处理支付成功逻辑
  } else {
    console.log('支付失败或取消');
    // 处理支付失败逻辑
  }
}

// 页面加载时检查支付结果
window.onload = function() {
  checkPaymentResult();
};
```

### 后端实现

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="java" label="Java" default>

```java
// 使用银联官方SDK
import com.unionpay.acp.sdk.AcpService;
import com.unionpay.acp.sdk.LogUtil;
import com.unionpay.acp.sdk.SDKConfig;

public class UnionpayService {
  
  public UnionpayService() {
    // 初始化SDK配置
    SDKConfig.getConfig().loadPropertiesFromSrc();
  }
  
  // 创建支付订单
  public String createPayOrder(OrderData orderData) {
    Map<String, String> requestData = new HashMap<String, String>();
    
    // 版本号
    requestData.put("version", "5.1.0");
    // 字符集编码
    requestData.put("encoding", "UTF-8");
    // 签名方法
    requestData.put("signMethod", "01");
    // 交易类型
    requestData.put("txnType", "01");
    // 交易子类
    requestData.put("txnSubType", "01");
    // 业务类型
    requestData.put("bizType", "000201");
    // 渠道类型
    requestData.put("channelType", "08");
    // 接入类型
    requestData.put("accessType", "0");
    // 货币代码
    requestData.put("currencyCode", "156");
    
    // 商户号码
    requestData.put("merId", orderData.getMerId());
    // 商户订单号
    requestData.put("orderId", orderData.getOrderId());
    // 订单发送时间
    requestData.put("txnTime", getCurrentTime());
    // 交易金额，单位分
    requestData.put("txnAmt", String.valueOf(orderData.getTxnAmt()));
    // 订单描述
    requestData.put("orderDesc", orderData.getOrderDesc());
    
    // 前台通知地址
    requestData.put("frontUrl", orderData.getFrontUrl());
    // 后台通知地址
    requestData.put("backUrl", orderData.getBackUrl());
    
    // 报文签名
    requestData = AcpService.sign(requestData, "UTF-8");
    
    // 获取请求银联的前台地址
    String requestFrontUrl = SDKConfig.getConfig().getFrontRequestUrl();
    
    // 生成自动跳转的Html表单
    String html = AcpService.createAutoFormHtml(requestFrontUrl, requestData, "UTF-8");
    
    return html;
  }
  
  // 验证签名
  public boolean verifySignature(Map<String, String> respParam) {
    return AcpService.validate(respParam, "UTF-8");
  }
  
  // 查询订单
  public Map<String, String> queryOrder(String orderId, String txnTime) {
    Map<String, String> requestData = new HashMap<String, String>();
    
    requestData.put("version", "5.1.0");
    requestData.put("encoding", "UTF-8");
    requestData.put("signMethod", "01");
    requestData.put("txnType", "00");
    requestData.put("txnSubType", "00");
    requestData.put("bizType", "000201");
    requestData.put("accessType", "0");
    requestData.put("channelType", "07");
    
    requestData.put("orderId", orderId);
    requestData.put("merId", SDKConfig.getConfig().getMerId());
    requestData.put("txnTime", txnTime);
    
    requestData = AcpService.sign(requestData, "UTF-8");
    String requestUrl = SDKConfig.getConfig().getSingleQueryUrl();
    Map<String, String> rspData = AcpService.post(requestData, requestUrl, "UTF-8");
    
    return rspData;
  }
  
  // 获取当前时间
  private String getCurrentTime() {
    return new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
  }
}
```

</TabItem>
</Tabs>

### 配置文件

```json
{
  "unionpay": {
    "merId": "your_merchant_id",
    "privateKey": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----",
    "publicKey": "-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----",
    "gateway": "https://gateway.95516.com/gateway/api/frontTransReq.do",
    "frontUrl": "https://your-domain.com/pay/success",
    "backUrl": "https://your-domain.com/api/unionpay/notify"
  }
}
```
