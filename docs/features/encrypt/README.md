# 敏感数据加密

```mermaid
sequenceDiagram
    participant 前端
    participant 后端

    前端->>后端: 请求RSA公钥
    后端-->>前端: 返回RSA公钥（PUBLIC_KEY）
    前端->>前端: 生成随机AES密钥（AES_KEY）
    前端->>后端: 用RSA公钥加密 AES_KEY，同时使用 AES_KEY 加密敏感数据，并发送
    后端->>后端: 用RSA私钥解密获取 AES_KEY
    后端->>后端: 用aesKey解密业务数据，并做后续处理
```



```ts
  // 1. 获取后端RSA公钥
  const { publicKey: rsaPublicKey } = await fetch("/api/public-key").then(res => res.json());

  // 2. 生成随机AES密钥
  const aesKey = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  // 3. 用RSA公钥加密AES密钥
  const exportedAesKey = await crypto.subtle.exportKey("raw", aesKey);
  const encryptedAesKey = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    await crypto.subtle.importKey(
      "spki",
      Buffer.from(rsaPublicKey, "base64"),
      { name: "RSA-OAEP", hash: "SHA-256" },
      false,
      ["encrypt"]
    ),
    exportedAesKey
  );
```