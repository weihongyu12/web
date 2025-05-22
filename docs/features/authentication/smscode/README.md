# 手机验证码登录

手机验证码登录为用户提供了无需记忆密码的安全认证方式，特别适合移动场景与重视安全性的应用。

## 核心功能

- 手机号格式智能验证
- 验证码发送与倒计时管理
- 防刷机制与流量控制
- 多场景验证码登录支持（注册、登录、找回）
- 完整的错误处理与用户反馈

## 代码实现

```tsx
import React, { useState, useEffect, useRef } from 'react';
import { z } from 'zod';

// 定义验证规则
const smsLoginSchema = z.object({
  phone: z.string()
    .required('请输入手机号')
    .regex(/^1[3-9]\d{9}$/, '请输入有效的手机号'),
  code: z.string()
    .required('请输入验证码')
    .length(6, '验证码为 6 位数字'),
  remember: z.boolean()
});

type SmsLoginData = z.infer<typeof smsLoginSchema>;

const SmsLoginForm: React.FC = () => {
  const [formData, setFormData] = useState<SmsLoginData>({
    phone: '',
    code: '',
    remember: false
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SmsLoginData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [codeStatus, setCodeStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);

  // 清理倒计时
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // 倒计时处理
  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [countdown]);

  // 检查凭据 API 并尝试自动登录
  useEffect(() => {
    // 检查浏览器是否支持凭据 API
    if ('credentials' in navigator) {
      // 尝试获取已保存的凭据
      navigator.credentials.get({
        password: true,
        mediation: 'optional' // 可选的凭据请求
      })
      .then(cred => {
        // 如果找到凭据且满足条件（这里检查 id 是否为手机号格式）
        if (cred && 'id' in cred && /^1[3-9]\d{9}$/.test(cred.id)) {
          console.log('找到保存的凭据，尝试自动登录');
          // 自动填充手机号
          setFormData(prev => ({
            ...prev,
            phone: cred.id,
            remember: true
          }));
          
          // 这里可以选择引导用户获取验证码
          // 或者如果有其他自动登录机制可以触发
        }
      })
      .catch(err => {
        console.error('获取凭据失败:', err);
      });
    }
  }, []);

  const validateField = <K extends keyof SmsLoginData>(
    field: K, 
    value: SmsLoginData[K]
  ) => {
    try {
      smsLoginSchema.pick({ [field]: true }).parse({ [field]: value });
      setErrors(prev => ({ ...prev, [field]: '' }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({
          ...prev,
          [field]: error.errors[0].message
        }));
      }
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    // 验证码输入限制为 6 位数字
    if (name === 'code' && typeof fieldValue === 'string') {
      const sanitizedValue = fieldValue.replace(/[^\d]/g, '').slice(0, 6);
      setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: fieldValue }));
    }
    
    if (errors[name as keyof SmsLoginData]) {
      validateField(name as keyof SmsLoginData, fieldValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    validateField(name as keyof SmsLoginData, fieldValue);
  };

  const sendVerificationCode = async () => {
    if (countdown > 0) return;
    
    const isPhoneValid = validateField('phone', formData.phone);
    if (!isPhoneValid) return;
    
    setCodeStatus('sending');
    
    try {
      // 实际发送验证码的 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟 API 请求
      
      // 发送成功
      setCodeStatus('sent');
      setCountdown(60); // 60 秒倒计时
      
      // 自动聚焦到验证码输入框
      setTimeout(() => {
        codeInputRef.current?.focus();
      }, 100);
    } catch (error) {
      console.error('发送验证码失败:', error);
      setCodeStatus('error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      smsLoginSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);
      
      // 实际登录逻辑
      console.log('登录信息:', formData);
      
      // 模拟 API 请求
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 登录成功后保存凭据
      if (formData.remember && 'credentials' in navigator) {
        try {
          // 创建新凭据对象 - 对于 SMS 登录，我们只存储手机号码
          const cred = new PasswordCredential({
            id: formData.phone, // 手机号作为 ID
            password: '', // 验证码不保存
            name: `手机用户-${formData.phone.substring(7)}` // 可选的显示名称
          });
          
          // 存储凭据
          await navigator.credentials.store(cred);
          console.log('凭据已保存');
        } catch (err) {
          console.error('保存凭据失败:', err);
        }
      }
      
      // 如果用户选择了记住登录状态，可以存储令牌
      if (formData.remember) {
        localStorage.setItem('auth_token', 'sample-token-value');
      }
      
      // 登录成功后的重定向逻辑
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof SmsLoginData, string>> = {};
        error.errors.forEach(err => {
          const field = err.path[0] as keyof SmsLoginData;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error('登录失败:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sms-login-container">
      <h2>手机验证码登录</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">手机号码</label>
          <div className="phone-input-wrapper">
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="请输入手机号码"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.phone}
            />
          </div>
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="code">验证码</label>
          <div className="code-input-wrapper">
            <input
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="请输入 6 位验证码"
              value={formData.code}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.code}
              ref={codeInputRef}
              maxLength={6}
            />
            <button
              type="button"
              onClick={sendVerificationCode}
              disabled={countdown > 0 || codeStatus === 'sending'}
            >
              {countdown > 0 ? `${countdown} 秒后重发` :
               codeStatus === 'sending' ? '发送中...' : '获取验证码'}
            </button>
          </div>
          {errors.code && <p className="error-message">{errors.code}</p>}
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            记住登录状态
          </label>
        </div>
        
        <button 
          type="submit" 
          className="submit-button" 
          disabled={isSubmitting}
        >
          {isSubmitting ? '登录中...' : '登录'}
        </button>
      </form>
    </div>
  );
};

export default SmsLoginForm;
```

## 交互流程

```mermaid
sequenceDiagram
    actor User as 用户
    participant Form as 登录表单
    participant Client as 客户端逻辑
    participant Server as 服务端 API
    
    User->>Form: 输入手机号
    Form->>Client: 验证手机号格式
    alt 手机号格式有误
        Client-->>Form: 显示错误提示
    else 手机号格式正确
        User->>Form: 点击 "获取验证码"
        Form->>Client: 禁用按钮，启动倒计时
        Client->>Server: 请求发送验证码
        Server-->>Client: 返回发送结果
        
        alt 发送成功
            Client-->>Form: 显示倒计时，聚焦验证码输入框
            Server->>User: 短信发送到用户手机
            User->>Form: 输入收到的验证码
        else 发送失败
            Client-->>Form: 显示错误，重置按钮状态
        end
    end
    
    User->>Form: 提交表单
    Form->>Client: 验证所有字段
    
    alt 验证失败
        Client-->>Form: 显示具体错误
    else 验证通过
        Client->>Server: 提交登录请求
        Server-->>Client: 返回认证结果
        
        alt 认证成功
            Client-->>User: 登录成功，跳转或刷新
        else 认证失败
            Client-->>Form: 显示登录失败信息
        end
    end
```

## 用户体验

### 输入优化

1. **智能输入类型** - 手机号使用 `inputMode="tel"`，验证码使用 `inputMode="numeric"` 优化移动键盘
2. **自动聚焦流程** - 验证码发送成功后自动将焦点切换到验证码输入框
3. **输入限制** - 验证码输入限制为 6 位纯数字，实时过滤无效输入
4. **自动完成支持** - 适当使用 `autoComplete` 属性，支持浏览器自动填充功能

### 状态反馈

1. **倒计时显示** - 直观的倒计时显示防止用户频繁请求验证码
2. **多状态按钮** - 验证码按钮根据不同状态（空闲、发送中、倒计时中）显示不同文本
3. **加载状态** - 登录提交时显示加载状态，防止重复提交
4. **错误位置** - 错误信息紧随相关字段显示，便于用户快速定位问题

### 凭据 API 集成

1. **自动填充** - 使用浏览器的 Credential Management API 存储和检索用户手机号
2. **智能识别** - 基于保存的凭据类型提供不同级别的自动完成体验
3. **无缝体验** - 用户再次访问时自动填充手机号，减少输入步骤
4. **用户控制** - 通过 "记住登录状态" 选项，让用户决定是否保存凭据
5. **兼容性处理** - 优雅降级，在不支持凭据 API 的浏览器中依然提供基础功能

### 安全考量

1. **流量控制** - 验证码发送频率限制防止恶意请求
2. **验证码时效性** - 验证码设置合理的有效期
3. **防刷保护** - 服务端实现防刷机制，限制单一 IP 或设备的请求次数
4. **敏感信息保护** - 验证码不在客户端存储，仅在服务端进行验证

## 实施注意事项

1. **短信服务集成** - 需要集成可靠的短信服务提供商，处理发送失败、重试等逻辑
2. **国际化支持** - 如需支持国际用户，考虑添加国家/地区代码选择
3. **兼容性处理** - 确保在不同浏览器和设备上的一致体验
4. **可访问性** - 确保表单符合 WCAG 可访问性标准
5. **风控系统** - 实现风险控制逻辑，检测异常登录行为
6. **多场景复用** - 设计时考虑验证码功能在注册、找回密码等场景的复用
7. **凭据管理** - Credential Management API 要求在 HTTPS 环境下使用
8. **安全平衡** - 在便捷性和安全性之间找到平衡点，考虑业务场景需求

## 最佳实践

1. 验证码长度通常为 4-6 位，建议使用 6 位提升安全性
2. 验证码有效期建议设置为 5-10 分钟，平衡安全性和用户体验
3. 为提升用户体验，可考虑客户端保存手机号（但不保存验证码）
4. 针对高频用户的场景，可实现短信验证码智能判断功能（自动读取）
5. 考虑添加图形验证码作为发送短信前的预验证，降低短信成本