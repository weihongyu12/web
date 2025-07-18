# OpenAPI 前端集成

## 概述

本指南将介绍如何使用 OpenAPI 规范、Orval 工具和 React Query 来构建类型安全的前端数据请求解决方案。通过这套工具链，您可以：

- 基于 OpenAPI 规范自动生成 TypeScript 类型定义
- 自动生成 API 接口函数
- 使用 React Query 进行高效的数据请求和状态管理
- 保持前后端接口的一致性和类型安全

:::tip
[React Query](https://tanstack.com/query/latest/docs/framework/react/overview) 是一个用于管理、缓存和更新服务器状态的库。它可以帮助您在 React 应用中更高效地处理数据获取、分页、过滤等常见问题。通过使用 React Query，您可以轻松实现以下功能：

- **数据获取**：利用 `useQuery` 和 `useMutation` 等 Hook 来简化 API 请求。
- **缓存机制**：自动管理请求的数据缓存，减少不必要的重复请求。
- **错误处理**：提供简单的方式来处理请求过程中的错误。
- **实时更新**：支持订阅实时更新的数据源。

React Query 提供了丰富的配置选项以及强大的数据管理能力，使得前端应用能够更加灵活高效地与后端服务交互。结合 Orval 工具自动生成的 API 接口，可以构建出既简洁又类型安全的数据请求解决方案。
:::

## 使用方法

### 安装依赖

```bash
pnpm install @tanstack/react-query @tanstack/react-query-devtools
pnpm install -D orval
```

### 配置 Orval

创建 `orval.config.ts`：

```typescript
import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: './swagger.json',
      // 或远程: 'http://localhost:3000/api/swagger.json'
    },
    output: {
      target: 'src/api/index.ts',
      client: 'react-query',
      httpClient: 'fetch',
      override: {
        mutator: {
          path: 'src/api/fetch-instance.ts',
          name: 'fetchInstance',
        },
      },
      schemas: 'src/api/models',
    },
  },
});
```

### 创建 Fetch 实例

创建 `src/api/fetch-instance.ts`：

```typescript
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export const fetchInstance = async <T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  // 构建完整 URL
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  
  // 默认请求头
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // 添加认证 token
  const token = localStorage.getItem('token');
  if (token) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  // 处理错误
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw new Error(`HTTP ${response.status}`);
  }

  // 处理空响应
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
};

export default fetchInstance;
```

### 配置 React Query

创建 `src/providers/QueryProvider.tsx`：

```tsx
import { type FC, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface QueryProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5分钟
    },
  },
});

const QueryProvider: FC<QueryProviderProps> = function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryProvider;
```

在 `src/App.tsx` 中使用：

```tsx
import { type FC, type ReactNode } from 'react';
import QueryProvider from '@/providers/QueryProvider';

const App: FC = function App() {
  return (
    <QueryProvider>
      <div className="App">
        {/* 应用内容 */}
      </div>
    </QueryProvider>
  );
}
```

### 生成 API 代码

在 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "openapi": "orval"
  }
}
```

运行生成命令：

```bash
npm run openapi
```

### 基本用法

#### 查询数据

```tsx
import { type FC } from 'react';
import { useGetUsers, useGetUserById } from '@/api';

// 用户列表
const UserList: FC = function UserList() {
  const { data: users, isLoading, error } = useGetUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

// 用户详情
const UserDetail = ({ userId }: { userId: string }) => {
  const { data: user, isLoading } = useGetUserById(userId);

  if (isLoading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
};
```

#### 6.2 变更数据

```tsx
import { type FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateUser, useUpdateUser, useDeleteUser } from '@/api';

const UserForm: FC = function UserForm() {
  const queryClient = useQueryClient();
  
  const createUser = useCreateUser({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const updateUser = useUpdateUser({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const deleteUser = useDeleteUser({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return (
    <div>
      <button 
        onClick={() => createUser.mutate({ data: { name: 'John' } })}
        disabled={createUser.isPending}
      >
        {createUser.isPending ? 'Creating...' : 'Create User'}
      </button>
    </div>
  );
};
```

#### 分页查询

```tsx
import { useState, type FC } from 'react';
import { useGetUsers } from '@/api';

const UserListWithPagination: FC = function UserListWithPagination() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useGetUsers({ page, limit: pageSize });

  return (
    <div>
      {data?.items?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      
      <div>
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button 
          onClick={() => setPage(p => p + 1)}
          disabled={!data?.hasMore}
        >
          Next
        </button>
      </div>
    </div>
  );
};
```

### 高级用法

#### 数据转换和验证

```tsx
import { type FC } from 'react';
import { z } from 'zod';
import { UserSchema } from '../api/generated/zod-schemas';

interface UserCardProps {
    userId: string
}

// 扩展 schema 添加计算字段
const UserWithComputedSchema = UserSchema.extend({
  displayName: z.string(),
  isActive: z.boolean(),
}).transform(data => ({
  ...data,
  displayName: data.firstName ? `${data.firstName} ${data.lastName}` : data.email,
  isActive: data.lastLoginAt ? new Date(data.lastLoginAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) : false,
}));

// 使用转换后的数据
const UserCard: FC<UserCardProps> = ({ userId }) => {
  const { data: rawUser, isLoading } = useGetUserById(userId);

  if (isLoading) return <div>Loading...</div>;

  // 验证和转换数据
  const userResult = UserWithComputedSchema.safeParse(rawUser);
  if (!userResult.success) {
    return <div>Invalid user data</div>;
  }

  const user = userResult.data;

  return (
    <div>
      <h3>{user.displayName}</h3>
      <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};
```

#### 错误处理

```tsx
import { type FC } from 'react';

interface UserProfileProps {
  userId: string
}

const UserProfile: FC<UserProfileProps> = function UserProfile({ userId }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    retry: (failureCount, error) => {
      // 404 错误不重试
      if (error instanceof Error && error.message.includes('404')) {
        return false;
      }
      return failureCount < 3;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  
  if (error) {
    if (error instanceof Error && error.message.includes('404')) {
      return <div>User not found</div>;
    }
    return <div>Error: {error.message}</div>;
  }

  return <div>{data?.name}</div>;
};
```

### 最佳实践

#### 文件结构

```
src/
├── api/
│   ├── models              # TS 类型定义
│   │ ├── ..               
│   │ └── index.ts          # Orval 生成 TS 类型定义文件
│   ├── index.ts            # Orval 生成 API 接口函数的文件
│   └── fetch-instance.ts   # Fetch 配置
├── components/
├── providers/
│   └── QueryProvider.tsx
└── pages/
```

#### 类型安全

```tsx
import { type User, type CreateUserDto } from '@/api/models';

interface UserFormProps {
  user?: User;
  onSubmit: (data: CreateUserDto) => void;
}

const UserForm: React.FC<UserFormProps> = function UserForm({ 
  user = undefined, 
  onSubmit
}) {
  // 组件实现
};
```

#### 缓存策略

```typescript
// 不同数据不同缓存时间
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 用户数据 5 分钟
    },
  },
});

// 配置数据缓存更长时间
const { data: config } = useQuery({
  queryKey: ['config'],
  queryFn: getConfig,
  staleTime: 30 * 60 * 1000, // 30 分钟
});
```

## 参考资源

- [OpenAPI 规范](https://swagger.io/specification/)
- [Orval 文档](https://orval.dev/)
- [React Query 文档](https://tanstack.com/query/latest)
- [Fetch API 文档](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

:::tip
- 如果是 Vue 项目，可以使用 [Vue Query](https://tanstack.com/query/latest/docs/framework/vue/overview) 替代 React Query
- 在 Ant Design Pro 中，已经内置了[类似的功能](https://pro.ant.design/zh-CN/docs/openapi/)，可以直接使用
:::
