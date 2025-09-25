# JavaScript/TypeScript 规范

本规范基于Airbnb JavaScript Style Guide，结合TypeScript最佳实践和现代化JavaScript开发规范制定。

本规范涵盖了现代 JavaScript/TypeScript 开发的核心原则：

1. **类型安全**：充分利用 TypeScript 的类型系统
2. **现代化语法**：使用 ES6+ 的特性和语法
3. **代码清晰**：保持代码的可读性和可维护性
4. **性能优化**：避免常见的性能陷阱
5. **安全性**：防止常见的安全漏洞
6. **异步处理**：正确处理异步操作和错误
7. **模块化**：使用标准的模块系统
8. **一致性**：保持代码风格的一致性

## 1. 类型系统与变量声明

### 1.1 优先使用TypeScript

在所有新项目中优先使用TypeScript，充分利用类型系统提供的安全性和开发体验。

```typescript
// ✅ 推荐
interface User {
  id: number;
  name: string;
  email: string;
}

const createUser = (userData: User): User => {
  return { ...userData };
};

// ❌ 避免
const createUser = (userData) => {
  return { ...userData };
};
```

### 1.2 变量声明

使用 `const` 声明不会重新赋值的变量，使用 `let` 声明会重新赋值的变量，完全避免使用 `var`。

```typescript
// ✅ 推荐
const config = { apiUrl: 'https://api.example.com' };
let counter = 0;

// ❌ 避免
var config = { apiUrl: 'https://api.example.com' };
var counter = 0;
```

### 1.3 类型注解

为函数参数、返回值和复杂变量提供显式类型注解。

```typescript
// ✅ 推荐
const calculateTotal = (items: Array<{ price: number; quantity: number }>): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// ❌ 避免
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
```

## 2. 函数

### 2.1 函数声明与表达式

优先使用箭头函数表达式，特别是用作回调函数时。对于需要提升的函数使用函数声明。

```typescript
// ✅ 推荐 - 箭头函数
const processData = (data: string[]): string[] => {
  return data.map(item => item.trim());
};

// ✅ 推荐 - 函数声明（需要提升时）
function initializeApp(): void {
  // 初始化逻辑
}

// ❌ 避免
const processData = function(data) {
  return data.map(function(item) {
    return item.trim();
  });
};
```

### 2.2 函数参数

使用默认参数而不是在函数体内修改参数。

```typescript
// ✅ 推荐
const createConnection = (host: string = 'localhost', port: number = 3000): Connection => {
  return new Connection(host, port);
};

// ❌ 避免
const createConnection = (host?: string, port?: number): Connection => {
  host = host || 'localhost';
  port = port || 3000;
  return new Connection(host, port);
};
```

### 2.3 剩余参数

使用剩余参数语法而不是 arguments 对象。

```typescript
// ✅ 推荐
const sum = (...numbers: number[]): number => {
  return numbers.reduce((total, num) => total + num, 0);
};

// ❌ 避免
function sum(): number {
  const args = Array.prototype.slice.call(arguments);
  return args.reduce((total, num) => total + num, 0);
}
```

## 3. 对象

### 3.1 对象字面量

使用对象字面量语法创建对象，避免使用 Object 构造函数。

```typescript
// ✅ 推荐
const user: User = {
  name: 'John Doe',
  email: 'john@example.com'
};

// ❌ 避免
const user = new Object();
user.name = 'John Doe';
user.email = 'john@example.com';
```

### 3.2 计算属性名

在对象字面量中使用计算属性名。

```typescript
// ✅ 推荐
const createObject = (key: string, value: any) => ({
  [key]: value
});

// ❌ 避免
const createObject = (key: string, value: any) => {
  const obj = {};
  obj[key] = value;
  return obj;
};
```

### 3.3 对象方法简写

使用对象方法的简写语法。

```typescript
// ✅ 推荐
const calculator = {
  add(a: number, b: number): number {
    return a + b;
  },
  
  multiply(a: number, b: number): number {
    return a * b;
  }
};

// ❌ 避免
const calculator = {
  add: function(a: number, b: number): number {
    return a + b;
  },
  
  multiply: function(a: number, b: number): number {
    return a * b;
  }
};
```

### 3.4 属性简写

当对象属性名与变量名相同时使用简写语法。

```typescript
// ✅ 推荐
const createUser = (name: string, email: string) => {
  return { name, email };
};

// ❌ 避免
const createUser = (name: string, email: string) => {
  return { name: name, email: email };
};
```

## 4. 数组

### 4.1 数组创建

使用数组字面量语法创建数组。

```typescript
// ✅ 推荐
const items: string[] = [];
const numbers: number[] = [1, 2, 3, 4, 5];

// ❌ 避免
const items = new Array();
const numbers = new Array(1, 2, 3, 4, 5);
```

### 4.2 数组方法

使用数组的展开语法进行数组复制，使用现代数组方法进行数据处理。

```typescript
// ✅ 推荐
const itemsCopy = [...items];
const activeUsers = users.filter(user => user.active);
const userNames = users.map(user => user.name);

// ❌ 避免
const itemsCopy = Array.prototype.slice.call(items);
const activeUsers: User[] = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].active) {
    activeUsers.push(users[i]);
  }
}
```

### 4.3 数组访问

优先使用数组的 `at()` 方法访问数组元素，特别是从末尾开始的索引。

```typescript
// ✅ 推荐
const lastItem = items.at(-1);
const secondLastItem = items.at(-2);

// ❌ 避免
const lastItem = items[items.length - 1];
const secondLastItem = items[items.length - 2];
```

## 5. 解构赋值

### 5.1 对象解构

使用对象解构访问对象的多个属性。

```typescript
// ✅ 推荐
const { name, email, age } = user;

const displayUser = ({ name, email }: User): string => {
  return `${name} <${email}>`;
};

// ❌ 避免
const name = user.name;
const email = user.email;
const age = user.age;

const displayUser = (user: User): string => {
  return `${user.name} <${user.email}>`;
};
```

### 5.2 数组解构

使用数组解构赋值。

```typescript
// ✅ 推荐
const [first, second] = items;
const [, , third] = items; // 跳过前两个元素

// ❌ 避免
const first = items[0];
const second = items[1];
const third = items[2];
```

## 6. 字符串

### 6.1 模板字符串

使用模板字符串进行字符串插值和多行字符串。

```typescript
// ✅ 推荐
const greeting = `Hello, ${user.name}!`;
const multiLine = `
  This is a multi-line
  string using template literals.
`;

// ❌ 避免
const greeting = 'Hello, ' + user.name + '!';
const multiLine = 'This is a multi-line\n' +
  'string using concatenation.';
```

### 6.2 字符串方法

使用现代字符串方法。

```typescript
// ✅ 推荐
const isEmailValid = email.includes('@');
const fileName = 'document.pdf';
const isPdf = fileName.endsWith('.pdf');
const isDocument = fileName.startsWith('document');

// ❌ 避免
const isEmailValid = email.indexOf('@') !== -1;
const isPdf = fileName.indexOf('.pdf') === fileName.length - 4;
```

## 7. 类

### 7.1 类定义

使用 class 语法定义类，优先使用 TypeScript 的访问修饰符。

```typescript
// ✅ 推荐
class User {
  private _id: number;
  public name: string;
  protected email: string;

  constructor(id: number, name: string, email: string) {
    this._id = id;
    this.name = name;
    this.email = email;
  }

  public getId(): number {
    return this._id;
  }
}

// ❌ 避免
function User(id, name, email) {
  this.id = id;
  this.name = name;
  this.email = email;
}

User.prototype.getId = function() {
  return this.id;
};
```

### 7.2 类字段

使用类字段语法声明类属性。

```typescript
// ✅ 推荐
class Component {
  private isActive = false;
  private readonly maxRetries = 3;
  
  public toggle(): void {
    this.isActive = !this.isActive;
  }
}

// ❌ 避免
class Component {
  constructor() {
    this.isActive = false;
    this.maxRetries = 3;
  }
  
  public toggle(): void {
    this.isActive = !this.isActive;
  }
}
```

## 8. 模块

### 8.1 导入导出

使用标准的 ES6 模块语法，优先使用命名导出。

```typescript
// ✅ 推荐
// utils.ts
export const formatDate = (date: Date): string => {
  return date.toISOString();
};

export const validateEmail = (email: string): boolean => {
  return email.includes('@');
};

// main.ts
import { formatDate, validateEmail } from './utils';

// ❌ 避免
// utils.js
module.exports = {
  formatDate: function(date) {
    return date.toISOString();
  }
};

// main.js
const utils = require('./utils');
```

### 8.2 动态导入

对于代码分割，使用动态导入。

```typescript
// ✅ 推荐
const loadModule = async (): Promise<void> => {
  const { heavyFunction } = await import('./heavy-module');
  heavyFunction();
};

// ❌ 避免
import { heavyFunction } from './heavy-module'; // 同步导入所有模块
```

## 9. 异步编程

### 9.1 Promise 和 async/await

优先使用 async/await 语法，确保正确的错误处理。

```typescript
// ✅ 推荐
const fetchUser = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};

// ❌ 避免
const fetchUser = (id: number): Promise<User> => {
  return fetch(`/api/users/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('User not found');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Failed to fetch user:', error);
      throw error;
    });
};
```

### 9.2 Promise 处理

避免在 Promise 中包装不必要的代码，正确处理 Promise 链。

```typescript
// ✅ 推荐
const processData = async (data: any[]): Promise<any[]> => {
  return data.map(item => transform(item));
};

// ❌ 避免
const processData = async (data: any[]): Promise<any[]> => {
  return Promise.resolve(data.map(item => transform(item)));
};
```

### 9.3 并发控制

避免不必要的 await 等待，合理使用 Promise.all 处理并发。

```typescript
// ✅ 推荐
const loadUserData = async (userId: number): Promise<{user: User, posts: Post[]}> => {
  const [user, posts] = await Promise.all([
    fetchUser(userId),
    fetchUserPosts(userId)
  ]);
  return { user, posts };
};

// ❌ 避免
const loadUserData = async (userId: number): Promise<{user: User, posts: Post[]}> => {
  const user = await fetchUser(userId);
  const posts = await fetchUserPosts(userId);
  return { user, posts };
};
```

## 10. 错误处理

### 10.1 异常抛出

抛出错误对象而不是字符串或其他类型。

```typescript
// ✅ 推荐
const validateAge = (age: number): void => {
  if (age < 0) {
    throw new Error('Age cannot be negative');
  }
  if (age > 150) {
    throw new RangeError('Age seems unrealistic');
  }
};

// ❌ 避免
const validateAge = (age: number): void => {
  if (age < 0) {
    throw 'Age cannot be negative';
  }
  if (age > 150) {
    throw { message: 'Age seems unrealistic' };
  }
};
```

### 10.2 错误捕获

在 finally 块中不要返回值。

```typescript
// ✅ 推荐
const processFile = async (filePath: string): Promise<void> => {
  let file: FileHandle | null = null;
  try {
    file = await openFile(filePath);
    await processContent(file);
  } catch (error) {
    console.error('Processing failed:', error);
    throw error;
  } finally {
    if (file) {
      await file.close();
    }
  }
};

// ❌ 避免
const processFile = async (filePath: string): Promise<string> => {
  try {
    const file = await openFile(filePath);
    return await processContent(file);
  } catch (error) {
    return 'Error occurred';
  } finally {
    return 'Always returns this'; // 会覆盖 try/catch 的返回值
  }
};
```

## 11. 代码格式化

### 11.1 缩进和空格

使用 2 个空格进行缩进，在操作符周围添加空格。

```typescript
// ✅ 推荐
const calculate = (a: number, b: number): number => {
  if (a > 0 && b > 0) {
    return a + b;
  }
  return 0;
};

// ❌ 避免
const calculate = (a: number, b: number): number => {
    if(a>0&&b>0){
        return a+b;
    }
    return 0;
};
```

### 11.2 行长度

限制每行代码长度为 100 个字符。

```typescript
// ✅ 推荐
const veryLongFunctionName = (
  parameterOne: string,
  parameterTwo: number,
  parameterThree: boolean
): string => {
  return 'result';
};

// ❌ 避免
const veryLongFunctionName = (parameterOne: string, parameterTwo: number, parameterThree: boolean): string => {
  return 'result';
};
```

### 11.3 分号

总是使用分号结束语句。

```typescript
// ✅ 推荐
const user = { name: 'John' };
const getName = () => user.name;

// ❌ 避免
const user = { name: 'John' }
const getName = () => user.name
```

### 11.4 引号

使用单引号表示字符串。

```typescript
// ✅ 推荐
const message = 'Hello, world!';
const template = `Hello, ${name}!`;

// ❌ 避免
const message = "Hello, world!";
```

## 12. 命名规范

### 12.1 变量和函数

使用 camelCase 命名变量和函数。

```typescript
// ✅ 推荐
const userName = 'john_doe';
const isUserActive = true;

const getUserById = (id: number): User => {
  // implementation
};

// ❌ 避免
const user_name = 'john_doe';
const IsUserActive = true;

const get_user_by_id = (id: number): User => {
  // implementation
};
```

### 12.2 常量

使用 UPPER_CASE 命名常量。

```typescript
// ✅ 推荐
const MAX_RETRY_COUNT = 3;
const API_BASE_URL = 'https://api.example.com';

// ❌ 避免
const maxRetryCount = 3;
const apiBaseUrl = 'https://api.example.com';
```

### 12.3 类和接口

使用 PascalCase 命名类、接口和类型别名。

```typescript
// ✅ 推荐
interface UserProfile {
  id: number;
  name: string;
}

class UserService {
  // implementation
}

type ApiResponse<T> = {
  data: T;
  status: number;
};

// ❌ 避免
interface userProfile {
  id: number;
  name: string;
}

class userService {
  // implementation
}
```

## 13. 注释和文档

### 13.1 JSDoc 注释

为公共 API 提供 JSDoc 注释。

```typescript
/**
 * 计算两个数字的和
 * @param a - 第一个数字
 * @param b - 第二个数字
 * @returns 两个数字的和
 * @throws {Error} 当参数不是数字时抛出错误
 * @example
 * ```typescript
 * const result = add(2, 3); // 返回 5
 * ```
*/
const add = (a: number, b: number): number => {
if (typeof a !== 'number' || typeof b !== 'number') {
throw new Error('Both arguments must be numbers');
}
return a + b;
};
```

### 13.2 内联注释

使用单行注释解释复杂的业务逻辑。

```typescript
// ✅ 推荐
const processPayment = (amount: number, currency: string): PaymentResult => {
  // 转换为最小货币单位（如美分）
  const amountInCents = Math.round(amount * 100);
  
  // 验证金额范围
  if (amountInCents < 100 || amountInCents > 99999999) {
    throw new Error('Amount out of valid range');
  }
  
  return submitPayment(amountInCents, currency);
};

// ❌ 避免
const processPayment = (amount: number, currency: string): PaymentResult => {
  const amountInCents = Math.round(amount * 100); // convert to cents
  if (amountInCents < 100 || amountInCents > 99999999) { // check range
    throw new Error('Amount out of valid range');
  }
  return submitPayment(amountInCents, currency);
};
```

## 14. 安全性

### 14.1 DOM 操作安全

避免直接使用可能导致 XSS 攻击的 DOM 方法。

```typescript
// ✅ 推荐
const displayUserName = (name: string): void => {
  const element = document.getElementById('username');
  if (element) {
    element.textContent = name; // 安全的文本设置
  }
};

const createSafeHtml = (content: string): string => {
  return DOMPurify.sanitize(content); // 使用可信的清理库
};

// ❌ 避免
const displayUserName = (name: string): void => {
  const element = document.getElementById('username');
  if (element) {
    element.innerHTML = name; // 可能导致 XSS
  }
};

const createHtml = (content: string): void => {
  document.write(content); // 危险的方法
};
```

## 15. 性能优化

### 15.1 避免不必要的计算

缓存计算结果，避免在循环中进行重复计算。

```typescript
// ✅ 推荐
const processItems = (items: Item[]): ProcessedItem[] => {
  const itemsLength = items.length; // 缓存长度
  const result: ProcessedItem[] = [];
  
  for (let i = 0; i < itemsLength; i++) {
    result.push(processItem(items[i]));
  }
  
  return result;
};

// ❌ 避免
const processItems = (items: Item[]): ProcessedItem[] => {
  const result: ProcessedItem[] = [];
  
  for (let i = 0; i < items.length; i++) { // 每次都访问 length 属性
    result.push(processItem(items[i]));
  }
  
  return result;
};
```

### 15.2 使用现代 JavaScript 特性

利用现代 JavaScript 特性提高代码性能和可读性。

```typescript
// ✅ 推荐
const findUser = (users: User[], id: number): User | undefined => {
  return users.find(user => user.id === id);
};

const hasActiveUser = (users: User[]): boolean => {
  return users.some(user => user.active);
};

// ❌ 避免
const findUser = (users: User[], id: number): User | undefined => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      return users[i];
    }
  }
  return undefined;
};
```

## 16. 类型安全

### 16.1 避免 any 类型

尽量避免使用 `any` 类型，使用更具体的类型或泛型。

```typescript
// ✅ 推荐
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const fetchData = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response = await fetch(url);
  return response.json() as ApiResponse<T>;
};

// ❌ 避免
const fetchData = async (url: string): Promise<any> => {
  const response = await fetch(url);
  return response.json();
};
```

### 16.2 类型断言

谨慎使用类型断言，优先使用类型守卫。

```typescript
// ✅ 推荐
const isUser = (obj: any): obj is User => {
  return obj && typeof obj.id === 'number' && typeof obj.name === 'string';
};

const processUser = (data: unknown): void => {
  if (isUser(data)) {
    console.log(data.name); // TypeScript 知道这是 User 类型
  }
};

// ❌ 避免
const processUser = (data: unknown): void => {
  const user = data as User; // 强制类型断言，可能不安全
  console.log(user.name);
};
```
