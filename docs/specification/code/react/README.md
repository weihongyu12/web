---
sidebar_position: 4
---

# React 规范

import TOCInline from '@theme/TOCInline';

本文档旨在为 React 项目提供一套统一的编码规范和最佳实践，以提高代码质量、可读性、可维护性，并保障应用的性能和安全。规范结合了 [Airbnb React/JSX Style Guide](https://airbnb.io/javascript/react/)，并根据项目集成的 ESLint 规则（包括 JS/TS 基础规则和 React 特定规则）进行了定制。

<TOCInline toc={toc} />

## 1. 基本约定

### 1.1 文件扩展名

React 组件文件应使用 `.tsx` 扩展名。

:::tip 建议 👍
```
MyComponent.tsx;
```
:::

:::danger 不建议 👎
```
MyComponent.js;
MyComponent.ts;
```
:::

### 1.2 组件定义

- 优先使用函数声明或函数表达式来定义具名组件。 
- 匿名组件（例如，作为参数传递时）可以使用箭头函数表达式。

:::tip 建议 👍
```tsx
interface MyComponentProps {
  name: string;
}

// 一个简单的组件示例
function MyComponent(props: MyComponentProps) {
  const { name } = props;
  return <div>{name}</div>;
}
```
:::

:::tip 建议 👍 使用函数表达式
```tsx
const MyComponentAsExpression = function(props: MyComponentProps) {
  const { name } = props;
  return <div>{name}</div>;
};

// 默认导出的组件
export default function DefaultComponent() {
  // ...
  return <div>Default</div>;
}
```
:::

:::danger 不建议 👎 在需要命名组件的场景使用箭头函数
```tsx
const MyArrowComponent = (props: MyComponentProps) => (
  <div>{props.name}</div>
);
```
:::

### 1.3 避免在 JSX 中引入 React

从 React 17 开始，新的 JSX 转换不再需要 `import React from 'react'`。项目中已禁用此规则，请勿在文件中引入未使用的 `React`。

:::tip 建议 👍 无需引入 React
```tsx
function Greeting({ name }: { name: string }) {
  return <div>Hello, {name}</div>;
}
```
:::

:::danger 不建议 👎 引入了未使用的 React
```tsx
import React from 'react';

function GreetingWithUnusedReact({ name }: { name: string }) {
  return <div>Hello, {name}</div>;
}
```
:::

## 2. 代码风格

### 2.1 JSX 语法

#### 2.1.1 引号

JSX 属性值优先使用双引号 (`"`)。

普通 JS/TS 字符串优先使用单引号 (`'`)。

对于不需要转义的字符串常量，可以直接使用，不需要花括号。

:::tip 建议 👍
```tsx
<Greeting name="John" message={'Hello World'} />;
```
:::

:::danger 不建议 👎
```tsx
<Greeting name='John' />;
<Greeting name={"John"} />;
```
:::

#### 2.1.2 布尔属性

如果属性值为 `true`，请省略该值。

:::tip 建议 👍
```tsx
<Checkbox checked />;
```
:::

:::danger 不建议 👎
```tsx
<Checkbox checked={true} />;
```
:::

#### 2.1.3 标签闭合

- 没有子元素的组件应使用自闭合标签。
- 自闭合标签的斜杠前应有一个空格。

:::tip 建议 👍
```tsx
<MyComponent />;
```
:::

:::danger 不建议 👎
```tsx
<MyComponent></MyComponent>;
<MyComponent/>;
```
:::

#### 2.1.4 括号包裹多行 JSX

当 JSX 结构跨越多行时，必须用括号 `()` 包裹起来。

:::tip 建议 👍
```tsx
function MyComponent() {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  );
}
```
:::

:::danger 不建议 👎
```tsx
function MyComponent() {
  return <div>
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>;
}
```
:::

#### 2.1.5 属性换行和缩进

- 当组件有多个属性时，建议每个属性占一行。
- 第一个属性不应换行。
- 属性使用两个空格进行缩进。

:::tip 建议 👍
```tsx
<MyComponent
  propA="valueA"
  propB="valueB"
  propC="valueC"
/>;
```
:::

:::danger 不建议 👎
```tsx
<MyComponent propA="valueA" propB="valueB" />;
```
:::

:::danger 不建议 👎 属性缩进错误
```tsx
<MyComponent
    propA="valueA"
    propB="valueB"
/>;
```
:::

### 2.2 花括号间距

JSX 的花括号内侧不应有空格。

:::tip 建议 👍
```tsx
<MyComponent name={userName} />;
```
:::

:::danger 不建议 👎
```tsx
<MyComponent name={ userName } />;
```
:::

## 3. 组件与 Props

### 3.1 Props 解构

在函数组件的参数中直接解构 `props`。

:::tip 建议 👍
```tsx
interface MyComponentProps {
    name: string;
    age: number;
}

function MyComponent({ name, age }: MyComponentProps) {
  return <div>{`${name} is ${age} years old.`}</div>;
}
```
:::

:::danger 不建议 👎
```tsx
interface MyComponentProps {
    name: string;
    age: number;
}

function MyComponent(props: MyComponentProps) {
  return <div>{`${props.name} is ${props.age} years old.`}</div>;
}
```
:::

### 3.2 默认值

对于非必需的 props，优先使用 TypeScript 的可选链和默认参数来设置默认值。

:::tip 建议 👍 使用默认参数
```tsx
interface GreetingProps {
  name?: string;
}

function Greeting({ name = 'Guest' }: GreetingProps) {
  return <div>Hello, {name}</div>;
}
```
:::

:::danger 不建议 👎 在函数体内使用逻辑或
```tsx
function Greeting({ name }: GreetingProps) {
  const finalName = name || 'Guest';
  return <div>Hello, {finalName}</div>;
}
```
:::

### 3.3 禁止 Props 扩散

避免使用 `...` 扩展操作符传递 props，除非是明确为了透传 `props` 到子组件（例如在高阶组件或样式化组件中）。明确地列出每个 `prop` 可以让代码更清晰，也更容易进行类型检查和重构。

:::tip 建议 👍
```tsx
interface UserProfileProps {
  name: string;
  avatar: string;
}

/**
 * 仅显示用户头像。
 * @param props 包含头像 URL。
 */
function UserAvatar({ avatar }: { avatar: string }) {
  return <img src={avatar} alt="User Avatar" />;
}

/**
 * 显示完整的用户资料。
 * @param props 包含用户名和头像。
 */
function UserProfile({ name, avatar }: UserProfileProps) {
  return (
    <div>
      <span>{name}</span>
      <UserAvatar avatar={avatar} />
    </div>
  );
}
```
:::

:::danger 不建议 👎
```tsx
function UserProfileWithSpread(props: UserProfileProps) {
  return (
    <div>
      <span>{props.name}</span>
      {/* 不应将所有 props 都传递下去 */}
      <UserAvatar {...props} />
    </div>
  );
}
```
:::


### 3.4 避免使用数组索引作为 `key`

在渲染列表时，应使用稳定且唯一的标识符作为 `key`，避免使用数组的索引。

:::tip 建议 👍
```tsx
items.map((item) => <ListItem key={item.id} item={item} />);
```
:::

:::danger 不建议 👎
```tsx
items.map((item, index) => <ListItem key={index} item={item} />);
```
:::

### 3.5 组件命名

组件名称使用帕斯卡命名法 (PascalCase)。

:::tip 建议 👍
```tsx
function UserProfile() { /* ... */ }
```
:::

:::danger 不建议 👎
```tsx
function userProfile() { /* ... */ }
```
:::

## 4. State 与 Hooks

### 4.1 Hooks 使用规则

- **只在顶层调用 Hooks**：不要在循环、条件或嵌套函数中调用 Hooks。
- **只在 React 函数中调用 Hooks**：只能在函数组件或自定义 Hooks 中调用 Hooks。

:::tip 建议 👍
```tsx
import { useState, useEffect } from 'react';

function MyComponent({ condition }: { condition: boolean }) {
  const [name, setName] = useState('John'); // 在顶层调用

  useEffect(() => {
    // ...
  }, [condition]); // 在顶层调用

  if (!condition) {
    return null;
  }

  // ...
}
```
:::

:::danger 不建议 👎
```tsx
import { useState, useEffect } from 'react';

function MyComponentWithBadHooks({ condition }: { condition: boolean }) {
  if (condition) {
    const [name, setName] = useState('John'); // 错误：在条件语句中调用
  }

  useEffect(() => {
    // ...
  });
}
```
:::

### 4.2 `useEffect` 依赖项

`useEffect`、`useCallback`、`useMemo` 等 Hooks 必须包含所有外部依赖项。ESLint 会自动检查并提示。

:::tip 建议 👍 依赖项数组中包含了 `userId`

```tsx
interface User {
  id: string;
  name: string;
}

declare function fetchUser(userId: string): Promise<User>;

function UserInfo({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser(userId).then(setUser).catch(console.error);
  }, [userId]);

  return <div>{user?.name}</div>;
}
```
:::

:::danger 不建议 👎 缺少依赖项 `userId`

```tsx
interface User {
  id: string;
  name: string;
}

declare function fetchUser(userId: string): Promise<User>;

function UserInfo({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser).catch(console.error);
  }, []); // 这会导致 userId 变化时，数据不会重新获取

  return <div>{user?.name}</div>;
}
```
:::

### 4.3 `useState` 命名

使用数组解构，并为 state 变量和其设置函数采用对称命名（例如 `[name, setName]`）。

:::tip 建议 👍
```tsx
const [count, setCount] = useState(0);
```
:::

:::danger 不建议 👎
```tsx
const [countValue, updateCount] = useState(0);
```
:::

## 5. 性能优化

### 5.1 避免在 Props 中创建新对象、数组或函数

在渲染过程中，每次都创建新的对象、数组或函数实例会导致子组件不必要的重新渲染。

#### 5.1.1 对象

:::tip 建议 👍 在组件外部定义或使用 `useMemo`
```tsx
const containerStyle = { padding: '10px' };

function MyComponent() {
  return <div style={containerStyle}>Content</div>;
}
```
:::

:::tip 建议 👍 使用 `useMemo`
```tsx
import { useMemo } from 'react';

function MyComponentWithMemo({ theme }: { theme: { color: string } }) {
  const memoizedStyle = useMemo(() => ({
    backgroundColor: theme.color,
  }), [theme.color]);
  
  return <div style={memoizedStyle}>Content</div>;
}
```
:::

:::danger 不建议 👎 每次渲染都创建新对象
```tsx
function MyComponentWithNewObject() {
  return <div style={{ padding: '10px' }}>Content</div>;
}
```
:::

#### 5.1.2 数组

:::tip 建议 👍
```tsx
const defaultOptions = ['Option 1', 'Option 2'];

function MySelectComponent() {
  return <Select options={defaultOptions} />;
}
```
:::

:::danger 不建议 👎
```tsx
function MySelectComponentWithNewArray() {
  return <Select options={['Option 1', 'Option 2']} />;
}
```
:::

#### 5.1.3 函数

使用 `useCallback` 来记忆化函数，或者将函数定义在组件外部。


:::tip 建议 👍 使用 `useCallback`

```tsx
import { useCallback } from 'react';

function MyComponent() {
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []);

  return <MyButton onClick={handleClick} />;
}
```
:::

:::danger 不建议 👎 每次渲染都创建新函数
```tsx
function MyComponentWithNewFunction() {
  return <MyButton onClick={() => console.log('Clicked!')} />;
}
```
:::

### 5.2 避免定义不稳定的嵌套组件

不要在另一个组件的渲染函数内部定义组件。这会导致嵌套组件在每次父组件渲染时都被重新创建，从而丢失其所有状态。

:::tip 建议 👍
```tsx
function ListItem({ item }: { item: { id: string; name: string } }) {
  return <li>{item.name}</li>;
}

function MyList({ items }: { items: { id: string; name: string }[] }) {
  return (
    <ul>
      {items.map((item) => <ListItem key={item.id} item={item} />)}
    </ul>
  );
}
```
:::

:::danger 不建议 👎
```tsx
function MyListWithNestedComponent({ items }: { items: { id: string; name: string }[] }) {
  // ListItem 在每次 MyList 渲染时都会被重新创建
  function NestedListItem({ item }: { item: { name: string } }) {
    return <li>{item.name}</li>;
  }

  return (
    <ul>
      {items.map((item) => <NestedListItem key={item.id} item={item} />)}
    </ul>
  );
}
```
:::

## 6. 可访问性 (a11y)

### 6.1 图像 `alt` 属性

所有 `<img>` 标签必须有一个 `alt` 属性。对于装饰性图片，可以设置为空字符串 `alt=""`。

:::tip 建议 👍
```tsx
<img src="avatar.png" alt="User's avatar" />;
<img src="divider.png" alt="" />;
```
:::

:::danger 不建议 👎
```tsx
<img src="avatar.png" />;
```
:::

### 6.2 锚点 `<a>` 标签

- `<a>` 标签必须有内容。
- `<a>` 标签必须具有有效的 `href` 属性，或者用 `<button>` 代替。

:::tip 建议 👍
```tsx
<a href="/about">About Us</a>;
<button type="button" onClick={handleClick}>Click Me</button>;
```
:::

:::danger 不建议 👎
```tsx
<a href="#">Click Me</a>;
<a onClick={handleClick}>Click Me</a>;
```
:::

### 6.3 ARIA 属性

- 使用有效的 ARIA 属性。
- 不要使用不支持的 ARIA 属性。

:::tip 建议 👍
```tsx
<div role="button" aria-pressed="false">Press me</div>;
```
:::

:::danger 不建议 👎
```tsx
<div role="datepicker">Invalid Role</div>;
<div aria-lorem="ipsum">Invalid ARIA attribute</div>;
```
:::

### 6.4 交互元素

具有点击事件的可见非交互元素（如 `<div>`、`<span>`）应具有 `role` 属性，并处理键盘事件。通常，最好直接使用 `<button>` 或 `<a>`。

:::tip 建议 👍
```tsx
<button type="button" onClick={handleClick}>Action</button>;
```
:::

:::danger 不建议 👎 div 难以被键盘用户和屏幕阅读器访问
```tsx
<div onClick={handleClick}>Action</div>;
```
:::

## 7. 数据请求 (TanStack Query)

### 7.1 Hooks 依赖

`useQuery` 和 `useMutation` 的 `queryKey` 和其他依赖项必须是稳定的。避免在 `queryKey` 中使用非序列化的值，如函数或非稳定对象。

:::tip 建议 👍 `queryKey` 是稳定的

```tsx
function TodoList({ listId }: { listId: string }) {
  const { data } = useQuery({
    queryKey: ['todos', listId],
    queryFn: () => fetchTodos(listId),
  });
  // ...
}
```
:::

:::danger 不建议 👎 `queryKey` 包含了不稳定的对象引用

```tsx
function TodoListWithUnstableKey({ filter }: { filter: object }) {
  // filter 对象每次渲染都可能是新的引用
  const { data } = useQuery({
    queryKey: ['todos', filter],
    queryFn: () => fetchTodos(filter),
  });
  // ...
}
```
:::

:::tip 修正反例
```tsx
function TodoListWithStableKey({ filter }: { filter: object }) {
  const queryKey = useMemo(() => ['todos', filter], [filter]);
  const { data } = useQuery({
    queryKey,
    queryFn: () => fetchTodos(filter),
  });
  // ...
}
```
:::

### 7.2 `queryClient` 稳定性

`QueryClient` 实例应该是稳定的，通常在应用顶层创建一次，并通过 React Context 提供。

:::tip 建议 👍 在应用顶层创建 `client`
```tsx
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}
```
:::

:::danger 不建议 👎 在组件内部创建 `client`
```tsx
function YourAppWithUnstableClient() {
  // 每次渲染都会创建新的 client 实例，导致缓存丢失
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* ... */}
    </QueryClientProvider>
  );
}
```
:::

### 7.3 查询函数 `queryFn`

查询函数 `queryFn` 必须返回一个 `Promise`。不要使用返回 `void` 的函数。

:::tip 建议 👍
```tsx
useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos, // fetchTodos 返回一个 Promise
});
```
:::

:::danger 不建议 👎
```tsx
useQuery({
  queryKey: ['todos'],
  queryFn: () => {
    // 只是调用函数，没有返回 Promise
    fetchTodos();
  },
});
```
:::

## 8. 安全性

### 8.1 警惕 XSS 攻击

避免使用可能导致跨站脚本（XSS）攻击的属性和函数，如 `dangerouslySetInnerHTML`。如果必须使用，请确保内容是经过严格清理和消毒的。

:::tip 建议 👍 直接渲染文本内容，React 会自动转义
```tsx
function SafeComponent({ content }: { content: string }) {
  return <div>{content}</div>;
}
```
:::

:::danger 不建议 👎 潜在的 XSS 风险
```tsx
function UnsafeComponent({ rawHTML }: { rawHTML: string }) {
  return <div dangerouslySetInnerHTML={{ __html: rawHTML }} />;
}
```
:::

### 8.2 `javascript:` URL

禁止在 `href` 等属性中使用 `javascript:` 协议的 URL。

:::tip 建议 👍
```tsx
<a href="/some/path">Navigate</a>;
<button type="button" onClick={doSomething}>Do Something</button>;
```
:::

:::danger 不建议 👎
```tsx
<a href="javascript:doSomething()">Do Something</a>;
```
:::

### 8.3 `target="_blank"`

当使用 `target="_blank"` 打开新标签页时，必须同时添加 `rel="noopener noreferrer"` 以防止安全漏洞。

:::tip 建议 👍
```tsx
<a href={url} target="_blank" rel="noopener noreferrer">
  Open in new tab
</a>;
```
:::

:::danger 不建议 👎
```tsx
<a href={url} target="_blank">
  Open in new tab
</a>;
```
:::
