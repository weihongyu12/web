---
sidebar_position: 4
description: 用户注册系统，采用自动注册优先策略，支持手机验证码与微信登录的自动账户创建及传统邮箱注册
---

# 用户注册

用户注册系统采用**自动注册优先**的策略，为用户提供最便捷的注册体验。系统支持手机验证码登录和微信登录时的自动账户创建，同时保留传统邮箱注册作为备选方案。

## 核心策略

### 🎯 自动注册（优先）

- **手机验证码登录** - 首次使用自动创建账户，无需额外注册步骤
- **微信登录** - 一键登录并自动创建账户，获取微信头像和昵称
- **无缝体验** - 用户无需区分登录和注册，系统智能处理

### 📧 邮箱注册（备选）

- **传统方式** - 为需要明确密码管理的用户提供邮箱注册选项
- **完整功能** - 支持智能表单验证、密码强度检测等完整功能

## 推荐注册流程

### 1. 手机验证码登录（推荐）

- ✅ 无需记忆密码
- ✅ 验证码直接登录
- ✅ 首次使用自动创建账户
- ✅ 快速便捷，适合所有用户

### 2. 微信登录（移动端推荐）

- ✅ 一键授权登录
- ✅ 自动获取头像昵称
- ✅ 首次使用自动创建账户
- ✅ 适合微信生态用户

### 3. 邮箱注册（传统方式）

- 📝 需要设置和记忆密码
- 📝 适合需要明确账户管理的用户
- 📝 提供完整的表单验证体验

## 交互流程设计

```mermaid
flowchart TD
    A[用户访问注册页面] --> B{推荐注册方式}
    B -->|优先推荐| C[手机验证码登录]
    B -->|移动端推荐| D[微信登录]
    B -->|传统方式| E[邮箱注册]
    C --> F[首次使用自动注册]
    D --> G[首次使用自动注册]
    E --> H[填写邮箱和密码]
    F --> I[登录成功]
    G --> I
    H --> J[提交注册信息]
    J --> K[注册验证成功]
    K --> I
    I --> L[保存用户信息]
    L --> M[存储认证凭据]
    M --> N[跳转主页]
    style C fill:#e8f5e8
    style D fill:#e8f5e8
    style F fill:#fff3e0
    style G fill:#fff3e0
    style I fill:#e3f2fd
    style N fill:#e3f2fd
```

## 自动注册数据流程

### 手机验证码登录自动注册

```mermaid
sequenceDiagram
    actor User as 用户
    participant System as 系统
    participant DB as 数据库
    participant SMS as 短信服务
    
    User->>System: 输入手机号申请验证码
    System->>SMS: 发送验证码
    SMS-->>System: 确认发送成功
    
    User->>System: 输入验证码进行登录
    System->>System: 验证码校验
    
    alt 验证码正确
        System->>DB: 检查手机号是否存在
        alt 首次使用
            DB-->>System: 用户不存在
            System->>DB: 自动创建用户账户
            Note over System: 生成默认用户信息
            DB-->>System: 返回新用户ID
            System-->>User: 登录成功(新用户标识)
        else 已有账户
            DB-->>System: 返回用户信息
            System-->>User: 登录成功
        end
    else 验证码错误
        System-->>User: 验证失败
    end
```

### 微信登录自动注册

```mermaid
sequenceDiagram
    actor User as 用户
    participant System as 系统
    participant DB as 数据库
    participant WeChat as 微信服务器
    
    User->>System: 发起微信登录
    System->>WeChat: 重定向到微信授权
    User->>WeChat: 确认授权
    WeChat-->>System: 返回授权码和用户信息
    
    System->>WeChat: 获取用户详细信息
    WeChat-->>System: 返回用户信息(昵称、头像等)
    
    System->>DB: 检查微信OpenID是否存在
    alt 首次使用
        DB-->>System: 用户不存在
        System->>DB: 自动创建用户账户
        Note over System: 使用微信信息初始化
        DB-->>System: 返回新用户ID
        System-->>User: 登录成功(新用户标识)
    else 已有账户
        DB-->>System: 返回用户信息
        System-->>User: 登录成功
    end
```

### 邮箱注册流程（备选）

```mermaid
sequenceDiagram
    actor User as 用户
    participant Form as 注册表单
    participant Client as 客户端逻辑
    participant Server as 服务端 API
    participant DB as 数据库
    participant Email as 邮件服务
    
    User->>Form: 填写邮箱、密码信息
    Form->>Client: 验证表单数据
    Client->>Form: 显示验证结果
    
    User->>Form: 提交注册表单
    Form->>Client: 处理注册请求
    Client->>Server: 发送邮箱注册请求
    
    Server->>DB: 检查邮箱是否已存在
    DB-->>Server: 返回检查结果
    
    alt 邮箱已存在
        Server-->>Client: 返回邮箱已注册错误
        Client-->>Form: 显示错误信息
    else 邮箱可用
        Server->>DB: 创建新用户记录
        DB-->>Server: 返回用户ID
        
        Server->>Email: 发送验证邮件
        Email-->>Server: 确认发送状态
        
        Server-->>Client: 返回注册成功
        Client->>Client: 保存用户信息和令牌
        Client-->>User: 直接跳转到主页
    end
```

## 邮箱注册代码实现

```tsx
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PasswordStrength from 'tai-password-strength';
import { cva, type VariantProps } from 'class-variance-authority';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const registrationSchema = z
  .object({
    email: z.string().email('请输入有效的邮箱地址'),
    password: z
      .string()
      .min(6, '密码至少 6 位')
      .max(32, '密码最多 32 位')
      .refine(
        (password) => {
          const passwordStrength = new PasswordStrength();
          const result = passwordStrength.check(password);

          return (
            result.strengthCode !== 'WEAK' && result.strengthCode !== 'VERY_WEAK'
          );
        },
        { message: '密码强度过弱，请设置更复杂的密码' },
      ),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: '请同意服务条款和隐私政策',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  });

type RegistrationData = z.infer<typeof registrationSchema>;

const strengthBarVariants = cva(
  'h-full transition-all duration-300 ease-in-out',
  {
    variants: {
      strength: {
        none: 'w-0 bg-gray-200',
        weak: 'w-1/3 bg-red-500',
        medium: 'w-2/3 bg-amber-500',
        strong: 'w-full bg-emerald-500',
      },
    },
    defaultVariants: {
      strength: 'none',
    },
  },
);

const strengthTextVariants = cva('text-xs font-medium', {
  variants: {
    strength: {
      none: 'text-gray-400',
      weak: 'text-red-500',
      medium: 'text-amber-500',
      strong: 'text-emerald-500',
    },
  },
  defaultVariants: {
    strength: 'none',
  },
});

type StrengthKey = VariantProps<typeof strengthBarVariants>['strength'];

const STRENGTH_LABELS: Record<Exclude<StrengthKey, null>, string> = {
  none: '',
  weak: '弱',
  medium: '中',
  strong: '强',
};

const getPasswordStrengthKey = (password: string): StrengthKey => {
  if (!password) return 'none';

  const tester = new PasswordStrength();
  const result = tester.check(password);

  switch (result.strengthCode) {
    case 'VERY_STRONG':
    case 'STRONG':
      return 'strong';
    case 'REASONABLE':
      return 'medium';
    case 'WEAK':
    case 'VERY_WEAK':
    default:
      return 'weak';
  }
};

function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  const watchPassword = form.watch('password');
  const strengthKey = useMemo(
    () => getPasswordStrengthKey(watchPassword),
    [watchPassword],
  );

  const handleSubmitSuccess = async (data: RegistrationData) => {
    if ('credentials' in navigator) {
      try {
        const cred = new PasswordCredential({
          id: data.email,
          password: data.password,
        });
        await navigator.credentials.store(cred);
      } catch (err) {
        console.error('保存凭据失败:', err);
      }
    }
  };

  const onSubmit = async (data: RegistrationData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'email',
          source: 'web',
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error('注册失败');
      }

      const result = await response.json();

      if (result.success) {
        await handleSubmitSuccess(data);
        localStorage.setItem('auth_token', result.token);
        window.location.href = '/dashboard?welcome=true';
      } else {
        throw new Error(result.message || '注册失败');
      }
    } catch (error: any) {
      console.error('注册错误:', error);
      form.setError('root', {
        message: error.message || '注册失败，请重试',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-8 bg-white rounded-xl shadow-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">邮箱注册</h2>
        <p className="mt-2 text-sm text-gray-600">创建您的账户</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱地址</FormLabel>
                <FormControl>
                  <Input
                    placeholder="请输入邮箱地址"
                    type="email"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>登录密码</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="请设置登录密码"
                      autoComplete="new-password"
                      className="pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      className={cn(
                        'absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700',
                      )}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>

                {watchPassword && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          strengthBarVariants({ strength: strengthKey }),
                        )}
                      />
                    </div>
                    <span
                      className={cn(strengthTextVariants({ strength: strengthKey }))}
                    >
                      {strengthKey ? STRENGTH_LABELS[strengthKey] : ''}
                    </span>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>确认密码</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="请再次输入密码"
                      autoComplete="new-password"
                      className="pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agreeTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-normal text-sm text-gray-600">
                    我已阅读并同意{' '}
                    <a
                      href="/terms"
                      className="text-blue-600 hover:underline"
                    >
                      服务条款
                    </a>{' '}
                    和{' '}
                    <a
                      href="/privacy"
                      className="text-blue-600 hover:underline"
                    >
                      隐私政策
                    </a>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <div className="text-sm font-medium text-red-500 text-center">
              {form.formState.errors.root.message}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? '注册中...' : '立即注册'}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-gray-600 mt-6">
        已有账户？{' '}
        <a
          href="/auth/login"
          className="font-medium text-blue-600 hover:underline"
        >
          立即登录
        </a>
      </div>
    </div>
  );
}

export default RegistrationForm;
```

## 落地指南与综合策略

为确保系统高效、安全且用户友好，在实施过程中请遵循以下综合策略：

### 1. 核心交互策略

- **优先级原则：** 首屏优先推荐手机/微信自动注册，大幅降低门槛。
- **渐进式引导：** 遵循“最小化起步”策略，初始只获取必要信息，利用价值驱动适时引导完善资料。
- **一致性体验：** 无论采用哪种注册方式，后续的登录、主页跳转和用户画像逻辑需完全统一。

### 2. 技术与安全性指南

- **密码安全管理：** 
  - 集成 `tai-password-strength`，通过进度条和颜色实现实时反馈，弱密码严禁提交。 
  - 同时支持客户端预校验与服务端逻辑校验，双重保障。
- **数据合规与合规性：** 
  - 遵循最小化收集原则，确保隐私政策透明。 
  - 提供完整的用户信息删除、绑定管理与撤销授权接口。
- **性能监控：** 
  - 实时追踪各注册方式的转化漏斗，分析用户偏好。 
  - 监控接口响应时间与自动注册成功率，异常情况自动触发邮箱注册降级。

### 3. 持续优化建议

- **场景智能化：** 根据用户设备（移动端/PC端）智能切换推荐的注册方式。 
- **数据驱动改进：** 定期分析转化率，识别注册流失点（如表单填写耗时、验证码失败率等），持续迭代UI交互。 
- **用户信任构建：** 在自动注册环节做好充分的权限说明，明确信息的使用范围与安全保障措施。
