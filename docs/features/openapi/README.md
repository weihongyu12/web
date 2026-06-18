# OpenAPI 前端集成

## 概述

本指南将介绍如何使用 OpenAPI 规范、Orval 工具、Axios 和 TanStack Query 来构建类型安全的前端数据请求解决方案。通过这套工具链，您可以：

- 基于 OpenAPI 规范自动生成 TypeScript 类型定义和 Zod 校验 Schema
- 按业务模块（Tags）自动生成 API 接口函数
- 使用 TanStack Query 进行高效的数据请求和状态管理
- 严格遵循团队的 **RESTful API 规范**，保持前后端接口的一致性和类型安全

:::tip
[TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)（原 React Query）是一个用于管理、缓存和更新服务器状态的库。通过使用 TanStack Query，您可以轻松实现：

- **数据获取：** 利用 useQuery 和 useMutation 等 Hook 来简化 API 请求。
- **缓存机制：** 自动管理请求的数据缓存，减少不必要的重复请求。
- **错误处理：** 结合 axios 拦截器，优雅处理全局和局部的业务错误。
:::

## 核心配置与使用方法

### 1. 安装依赖

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools axios
pnpm add -D orval biome
```

_(注：根据配置使用了 Biome 作为代码格式化工具)_

### 2. 配置 Orval

在项目根目录配置 `orval.config.ts`。我们采用 `tags-split` 模式将 API 按标签拆分为多个文件，并同时生成 Zod Schema 用于前端数据校验：

```typescript
import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: './openapi.yaml', // 您的 OpenAPI 规范文件路径
    },
    output: {
      mode: 'tags-split', // 按 Tag 拆分生成文件，适合大型项目
      target: 'src/api',
      schemas: 'src/api/model', // 生成的 TypeScript 接口类型
      client: 'react-query',
      httpClient: 'axios',
      override: {
        mutator: {
          path: './src/api/mutator/axios.ts', // 自定义 Axios 实例
          name: 'axios',
        },
      },
      formatter: 'biome',
      mock: true, // 自动生成 MSW Mock 数据
      allParamsOptional: true,
      urlEncodeParameters: true,
    },
  },
  apiZod: {
    input: {
      target: './openapi.yaml',
    },
    output: {
      mode: 'tags-split',
      client: 'zod',
      target: 'src/api',
      fileExtension: '.zod.ts',
      formatter: 'biome',
    },
  },
});
```

### 3. 创建 Axios 拦截器与自定义 Mutator

深度结合我们的 **RESTful API 规范**，创建 `src/api/mutator/axios.ts`，定义标准的错误体结构并处理异常：

```typescript
import Axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';

// 结合 RESTful 规范定义的统一错误响应格式
export interface ApiErrorResponse {
  code: string;
  message: string;
  error: string;
}

export const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  adapter: 'fetch', // 默认使用 fetch adapter (Axios v1.7+)
});

// 请求拦截器：自动携带 OAuth 2.0 Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      // 避免直接修改函数参数 (Airbnb)，但在 Axios 拦截器中通常通过合并或重新赋值属性处理
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 响应拦截器：处理全局 HTTP 错误状态码
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // 401 Unauthorized 处理
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          // 可以在此处集成全局 Toast 通知无权限
          console.error('访问被拒绝:', data.message || '没有操作权限');
          break;
        case 500:
          console.error('服务器内部错误:', data.error || '系统异常');
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  },
);

// Orval 自定义请求函数
export const axios = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> =>
  axiosInstance({
    ...config,
    ...options,
  }).then(({ data }) => data);

// 覆盖 react-query 的返回错误类型，明确关联我们的 ApiErrorResponse
export type ErrorType<Error = ApiErrorResponse> = AxiosError<Error>;
export type BodyType<BodyData> = BodyData;
```

### 4. 配置 TanStack Query 全局 Provider

创建 `src/providers/QueryProvider.tsx`

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 失败默认重试 1 次
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 数据 5 分钟内视为新鲜
    },
  },
});

export default function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

在 `src/App.tsx` 中使用：

```tsx
import QueryProvider from '@/providers/QueryProvider';

function App() {
  return (
    <QueryProvider>
      <div className="App">
        {/* 应用内容 */}
      </div>
    </QueryProvider>
  );
}

export default App;
```

### 5. 生成代码

在 `package.json` 中配置脚本并运行：

```json
{
  "scripts": {
    "orval": "orval"
  }
}
```

## 业务实战指南

### 1. 基础查询 (GET)

```tsx
import { AlertCircle } from 'lucide-react';
import { useGetUserById } from '@/api/user/user';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface UserDetailProps {
  userId: string;
}

function UserDetail({ userId }: UserDetailProps) {
  const { data: user, isLoading, error } = useGetUserById(userId);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-[100px] w-full rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>加载失败</AlertTitle>
        <AlertDescription>
          {error.response?.data?.message || error.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>用户信息</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">姓名：{user?.name}</p>
      </CardContent>
    </Card>
  );
}

export default UserDetail;
```

### 2. 标准分页查询与列表渲染

使用 `page`（从 `0` 开始）和 `size` 请求，并接收 `{ content, meta }` 响应结构：

```tsx
import { useState } from 'react';
import { useGetProducts } from '@/api/product/product';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function ProductListWithPagination() {
  const [page, setPage] = useState<number>(0);
  const size = 20;

  const { data, isLoading } = useGetProducts({ page, size });

  const handlePrevPage = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const totalPages = data?.meta?.pages ?? 1;
  const isNextDisabled = page >= totalPages - 1;

  if (isLoading) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        加载列表中...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>产品名称</TableHead>
              <TableHead className="text-right">库存</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.content?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePrevPage} disabled={page === 0}>
          上一页
        </Button>
        <span className="text-sm text-muted-foreground">
          当前页: {page + 1} / 共 {totalPages} 页
        </span>
        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={isNextDisabled}
        >
          下一页
        </Button>
      </div>
    </div>
  );
}

export default ProductListWithPagination;
```

### 3. 数据变更 (POST / PUT / DELETE)

```tsx
import { useQueryClient } from '@tanstack/react-query';
import { useCreateUser } from '@/api/user/user';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function UserManager() {
  const queryClient = useQueryClient();

  const createUser = useCreateUser({
    mutation: {
      onSuccess: () => {
        // 创建成功后，失效 user 相关的缓存以重新拉取
        queryClient.invalidateQueries({ queryKey: ['users'] });
        toast.success('操作成功', {
          description: '新建用户已成功创建。',
        });
      },
      onError: (error) => {
        toast.error('操作失败', {
          description: error.response?.data?.message || '发生未知错误',
        });
      },
    },
  });

  const handleCreateSubmit = () => {
    createUser.mutate({ data: { username: 'tarzan', password: '***' } });
  };

  return (
    <div className="flex space-x-2">
      <Button onClick={handleCreateSubmit} disabled={createUser.isPending}>
        {createUser.isPending ? '创建中...' : '新建用户'}
      </Button>
    </div>
  );
}

export default UserManager;
```

### 4. 结合 Zod 进行数据转换与防御性编程

利用 Orval 自动生成的 Zod Schema 拦截脏数据，显示状态：

```tsx
import { z } from 'zod';
import { getUserByIdResponseItem } from '@/api/user/user.zod';
import { useGetUserById } from '@/api/user/user';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

// 扩展自动生成的 Schema，添加前端特有的计算属性
const UserWithComputedSchema = getUserByIdResponseItem
  .extend({ isActive: z.boolean().optional() })
  .transform((data) => ({
    ...data,
    isActive: data.lastLoginAt
      ? new Date(data.lastLoginAt)
        > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      : false,
  }));

interface UserCardProps {
  userId: string;
}

function UserCard({ userId }: UserCardProps) {
  const { data: rawUser, isLoading } = useGetUserById(userId);

  if (isLoading) {
    return <Skeleton className="h-32 w-full" />;
  }

  // 严格校验和转换数据
  const userResult = UserWithComputedSchema.safeParse(rawUser);

  if (!userResult.success) {
    console.error('API 数据格式异常', userResult.error);
    return (
      <div className="p-4 text-red-500">数据格式异常，无法渲染卡片</div>
    );
  }

  const user = userResult.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{user.username}</span>
          <Badge variant={user.isActive ? 'default' : 'secondary'}>
            {user.isActive ? '活跃' : '不活跃'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">ID: {user.id}</p>
      </CardContent>
    </Card>
  );
}

export default UserCard;
```

### 5. 规范化错误处理

基于 RESTful 规范提取精确的错误代码 (`code`) 来处理特定业务逻辑：

```tsx
import { AlertCircle } from 'lucide-react';
import { useGetUserById } from '@/api/user/user';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface UserProfileProps {
  userId: string;
}

function UserProfile({ userId }: UserProfileProps) {
  const { data, error, isLoading } = useGetUserById(userId, {
    query: {
      retry: (failureCount, err) => {
        // AxiosError 已经在 global types 被定义关联到了 ApiErrorResponse
        if (err.response?.status === 404) {
          return false; // 404 错误不进行重试
        }
        return failureCount < 3;
      },
    },
  });

  if (isLoading) {
    return (
      <div className="text-sm text-muted-foreground">加载配置中...</div>
    );
  }

  if (error) {
    const apiCode = error.response?.data?.code;
    const apiMessage = error.response?.data?.message || '未知服务错误';

    // 基于业务状态码（来自 RESTful 规范）执行特定视图逻辑
    if (apiCode === 'A0201') {
      return (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>账户异常</AlertTitle>
          <AlertDescription>
            检测到当前用户账户不存在，请联系管理员。
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <Alert variant="destructive">
        <AlertDescription>请求错误: {apiMessage}</AlertDescription>
      </Alert>
    );
  }

  return <div>配置拥有者：{data?.name}</div>;
}

export default UserProfile;
```

## 推荐的目录架构

基于 `tags-split` 模式生成后，推荐的项目结构如下：

```
src/
├── api/
│   ├── mutator/
│   │   └── axios.ts         # Axios 实例、ApiErrorResponse 及拦截器配置
│   ├── model/               # Orval 生成的所有 TS Interface
│   │   ├── user.ts
│   │   └── index.ts
│   └── user/                # 按 Tag 生成的接口目录
│       ├── user.ts          # Hook 及请求方法
│       └── user.zod.ts      # Zod 校验结构
├── providers/
│   └── QueryProvider.tsx    # TanStack Query 全局配置
└── pages/
```
