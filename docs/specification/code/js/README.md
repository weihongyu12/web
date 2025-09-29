# JavaScript/TypeScript 规范

import TOCInline from '@theme/TOCInline';



本文档旨在为前端 JavaScript 和 TypeScript 项目提供一套统一的编码风格和最佳实践，以提高代码质量、可读性和可维护性。规范主要基于 [Airbnb JavaScript Style Guide](https://airbnb.io/javascript/)，并结合了 TypeScript 的特性和一系列优秀的 ESLint 插件规则。

<TOCInline toc={toc} />

## 1. 变量与常量 (Variables & Constants)

1.1 优先使用 `const` 声明常量，对于需要重新赋值的变量则使用 `let`。避免使用 `var`。

:::tip 建议 👍
```ts
const name = 'Alice';
let age = 30;
age = 31;
```
:::

:::danger 不建议 👎
```ts
var name = 'Alice'; // 不推荐
```
:::

1.2 每个 `const` 或 `let` 声明一个变量。

:::tip 建议 👍
```ts
const user = 'test';
const age = 25;
```
:::

:::danger 不建议 👎
```ts
const user = 'test', age = 25;
```
:::

1.3 在使用变量之前必须先定义。

1.4 禁止删除变量。


:::danger 不建议 👎
```ts
let name = 'test';
// delete name; // 编译错误
```
:::

1.5 避免将变量初始化为 `undefined`。

:::tip 建议 👍
```ts
let name: string;
```
:::

:::danger 不建议 👎
```ts
let name = undefined;
```
:::

## 2. 数据类型 (Types)

2.1 使用字面量创建原始类型。

:::tip 建议 👍
```ts
const str = 'hello';
const num = 118;
const bool = true;
```
:::

:::danger 不建议 👎
```ts
const str = new String('hello');
const num = new Number(118);
const bool = new Boolean(true);
```
:::

2.2 明确类型时，使用 `as const` 来创建只读的常量，而不是 `const` 断言。

:::tip 建议 👍
```ts
const config = {
  host: 'localhost',
  port: 8080,
} as const;
```
:::

2.3 禁止使用 `any` 类型，除非在绝对必要的情况下。`any` 会绕过 TypeScript 的类型检查，降低代码安全性。

:::danger 不建议 👎
```ts
let data: any; // 危险！
data = 'string';
data = 118;
```
:::

2.4 禁止使用 `Function`、`Object`、`String`、`Number`、`Boolean` 等大写的基本类型。

:::tip 建议 👍
```ts
let name: string;
let age: number;
let user: object;
let callback: () => void;
```
:::

:::danger 不建议 👎
```ts
let name: String;
let age: Number;
let user: Object;
let callback: Function;
```
:::

## 3. 对象 (Objects)

3.1 使用对象字面量 `{}` 创建对象。

:::tip 建议 👍
```ts
const item = {};
```
:::

:::danger 不建议 👎
```ts
const item = new Object();
```
:::

3.2 使用对象方法的简写语法。

:::tip 建议 👍
```ts
const person = {
  name: 'Alice',
  sayHi() {
    console.log('Hi!');
  },
};
```
:::

:::danger 不建议 👎
```ts
const person = {
  name: 'Alice',
  sayHi: function() {
    console.log('Hi!');
  },
};
```
:::

3.3 使用对象属性值的简写语法。

:::tip 建议 👍
```ts
const name = 'Alice';
const person = { name };
```
:::

:::danger 不建议 👎
```ts
const name = 'Alice';
const person = { name: name };
```
:::

3.4 将简写属性放在对象声明的开头。

:::tip 建议 👍
```ts
const name = 'Alice';
const person = {
  name,
  age: 30,
  gender: 'female',
};
```
:::

3.5 只对无效的标识符（例如包含特殊字符）使用引号。

:::tip 建议 👍
```ts
const obj = {
  id: 1,
  'data-test': 'value',
};
```
:::

:::danger 不建议 👎
```ts
const obj = {
  'id': 1,
  'name': 'test',
};
```
:::

3.6 不要直接使用 `Object.prototype` 上的内置方法，如 `hasOwnProperty`。

:::tip 建议 👍
```ts
const hasProperty = Object.prototype.hasOwnProperty.call(obj, 'key');
// 更好的方式是:
const hasProp = Object.hasOwn(obj, 'key');
```
:::

:::danger 不建议 👎
```ts
const hasProperty = obj.hasOwnProperty('key');
```
:::

3.7 优先使用对象展开运算符 `...` 来进行浅拷贝，而不是 `Object.assign`。

:::tip 建议 👍
```ts
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 };
```
:::

:::danger 不建议 👎
```ts
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 });
```
:::

## 4. 数组 (Arrays)

4.1 使用数组字面量 `[]` 创建数组。

:::tip 建议 👍
```ts
const items: string[] = [];
```
:::

:::danger 不建议 👎
```ts
const items = new Array();
```
:::

4.2 使用 `Array.from()` 将类数组对象转换为数组。

4.3 数组的回调函数中必须有 `return` 语句，除非是隐式返回。

4.4 使用展开运算符 `...` 进行数组浅拷贝。

:::tip 建议 👍
```ts
const items = [1, 2, 3];
const itemsCopy = [...items];
```
:::

:::danger 不建议 👎
```ts
const items = [1, 2, 3];
const itemsCopy = [];
for (let i = 0; i < items.length; i += 1) {
  itemsCopy[i] = items[i];
}
```
:::

4.5 避免使用 `for...in` 遍历数组。

4.6 优先使用高阶函数（如 `map`, `filter`, `reduce`）替代 `for` 循环。

## 5. 解构 (Destructuring)

5.1 使用对象解构来访问和使用对象的多个属性。

:::tip 建议 👍
```ts
function getFullName(user: { firstName: string; lastName: string }) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}
```
:::

:::danger 不建议 👎
```ts
function getFullName(user: { firstName: string; lastName: string }) {
  const firstName = user.firstName;
  const lastName = user.lastName;
  return `${firstName} ${lastName}`;
}
```
:::

5.2 对数组也使用解构。

:::tip 建议 👍
```ts
const numbers = [1, 2, 3, 4, 5];
const [first, second] = numbers;
```
:::

5.3 在函数参数中，当需要对象的多个属性时，使用解构。

:::tip 建议 👍
```ts
function sayHi({ name, age }: { name: string, age: number }) {
  console.log(`Hello, ${name}. You are ${age} years old.`);
}
```
:::

## 6. 字符串 (Strings)

6.1 字符串统一使用单引号 `''`。

:::tip 建议 👍
```ts
const name = 'Alice';
```
:::

:::danger 不建议 👎
```ts
const name = "Alice";
```
:::

6.2 优先使用模板字符串进行字符串拼接，而不是 `+` 操作符。

:::tip 建议 👍
```ts
const name = 'Alice';
const message = `Hello, ${name}!`;
```
:::

:::danger 不建议 👎
```ts
const name = 'Alice';
const message = 'Hello, ' + name + '!';
```
:::

6.3 避免不必要的转义字符。

## 7. 函数 (Functions)

7.1 使用函数声明或函数表达式，而不是 `new Function` 构造函数。

7.2 不要在非函数块（`if`, `while` 等）中声明函数。

7.3 为函数参数设置默认值，而不是在函数体内进行赋值。

:::tip 建议 👍
```ts
function greet(name = 'Guest', punctuation = '!') {
  return `Hello, ${name}${punctuation}`;
}
```
:::

:::danger 不建议 👎
```ts
function greet(name: string | undefined, punctuation: string | undefined) {
  name = name || 'Guest';
  punctuation = punctuation || '!';
  return `Hello, ${name}${punctuation}`;
}
```
:::

7.4 带有默认值的参数应放在参数列表的末尾。

7.5 避免修改函数参数。如果需要修改，请先复制一份。

7.6 优先使用剩余参数 `...` 语法，而不是 `arguments` 对象。

:::tip 建议 👍
```ts
function log(...args: any[]) {
  console.log(args);
}
```
:::

:::danger 不建议 👎
```ts
function log() {
  const args = Array.prototype.slice.call(arguments);
  console.log(args);
}
```
:::

7.7 函数调用的括号前不加空格。

:::tip 建议 👍
```ts
console.log('hello');
```
:::

:::danger 不建议 👎
```ts
console.log ('hello');
```
:::

## 8. 箭头函数 (Arrow Functions)

8.1 当需要使用匿名函数时（例如传递内联回调），使用箭头函数。

8.2 如果函数体只有一条返回语句，并且没有副作用，可以省略花括号和 `return`。

:::tip 建议 👍
```ts
const square = (x: number) => x * x;
```
:::

:::danger 不建议 👎
```ts
const square = (x: number) => {
  return x * x;
};
```
:::

8.3 如果参数只有一个，可以省略括号。但为了保持一致性，推荐总是使用括号。

:::tip 建议 👍
```ts
const log = (message: string) => console.log(message);
```
:::

## 9. 类与接口 (Classes & Interfaces)

9.1 总是使用 `class`。避免直接操作 `prototype`。

9.2 使用 `extends` 来实现继承。

9.3 如果不是空的构造函数，请确保调用 `super()`。

9.4 一个文件只定义一个类。

9.5 类成员之间空一行以增加可读性。

9.6 优先使用接口（`interface`）来定义对象形状，而不是类型别名（`type`）。当需要联合类型或元组类型时，使用 `type`。

:::tip 建议 👍
```ts
interface User {
  name: string;
  age: number;
}
```
:::

:::danger 不建议 👎
```ts
type User = {
  name: string;
  age: number;
};
```
:::

## 10. 模块 (Modules)

10.1 始终使用 ES6 模块 (`import`/`export`)。

:::tip 建议 👍
```ts
import { foo } from './foo';

export default foo;
```
:::

:::danger 不建议 👎
```ts
const foo = require('./foo');

module.exports = foo;
```
:::

10.2 不要在 `import` 路径中使用文件扩展名。

10.3 只有一个导出的模块，应使用 `export default`。

10.4 `import` 语句应放在文件的顶部。

10.5 按照以下顺序组织 `import`：

- 内置模块 (如 `fs`)
- 外部模块 (如 `react`)
- 内部模块 (绝对路径)
- 父级目录相对路径 (`../`)
- 同级目录相对路径 (`./`)

## 11. 迭代器与生成器 (Iterators and Generators)

11.1 不要使用 `for...of` 或 `for...in` 循环，优先使用数组的高阶函数。这有助于代码的不可变性。

## 12. 属性 (Properties)

12.1 访问属性时，优先使用点 `.` 操作符。

:::tip 建议 👍
```ts
const person = { name: 'Alice' };
console.log(person.name);
```
:::

12.2 只有当属性是变量时，才使用 `[]` 访问。

:::tip 建议 👍
```ts
const person = { name: 'Alice' };
const propName = 'name';
console.log(person[propName]);
```
:::

## 13. 比较操作符与相等性 (Comparison Operators & Equality)

13.1 始终使用 `===` 和 `!==`，而不是 `==` 和 `!=`。

13.2 条件语句中的布尔值不需要与 `true` 或 `false` 进行显式比较。

## 14. 代码块与条件语句 (Blocks & Conditionals)

14.1 如果 `if` 块中包含 `return` 语句，则后续的 `else` 块是不必要的。

:::tip 建议 👍
```ts
function check(value: number) {
  if (value > 10) {
    return 'greater';
  }
  return 'less or equal';
}
```
:::

:::danger 不建议 👎
```ts
function check(value: number) {
  if (value > 10) {
    return 'greater';
  } else {
    return 'less or equal';
  }
}
```
:::

14.2 使用大括号包裹所有的多行代码块。

14.3 避免嵌套的三元表达式。

14.4 避免不必要的三元表达式。

:::tip 建议 👍
```ts
const isAdult = age >= 18;
```
:::

:::danger 不建议 👎
```ts
const isAdult = age >= 18 ? true : false;
```
:::

## 15. 代码格式化 (Formatting)

15.1 使用 2 个空格进行缩进。

15.2 在代码块的 `{` 前保留一个空格。

15.3 在控制语句（`if`, `while` 等）的括号前保留一个空格。

15.4 在函数声明或表达式的参数列表括号前不加空格。

:::tip 建议 👍
```ts
function greet(name: string) {
  // ...
}
const greet = function(name: string) {
  // ...
};
```
:::

15.5 操作符两边各有一个空格。

15.6 文件末尾保留一个空行。

15.7 链式调用超过 3 层时，应换行并缩进。

15.8 在 `switch` 的 `case` 语句中使用花括号创建块级作用域。

15.9 使用 Unix 风格的换行符 (`\n`)。

15.10 语句末尾必须有分号。

## 16. 注释 (Comments)

16.1 使用 `/** ... */` 进行多行注释，特别是 JSDoc。

16.2 使用 `//` 进行单行注释。

16.3 在注释的 `//` 或 `/*` 后加一个空格。

16.4 在文件顶部使用注释来解释文件用途。


## 17. JSDoc

17.1 为所有可导出的函数、类和方法编写 JSDoc 注释。

:::tip 建议 👍
```ts
/**
 * 根据给定的名字和年龄生成问候语。
 * @param name - 用户的名字。
 * @param age - 用户的年龄。
 * @returns 返回格式化的问候字符串。
 */
function createGreeting(name: string, age: number): string {
  return `Hello ${name}, you are ${age} years old.`;
}
```
:::

17.2 JSDoc 注释必须包含对参数 (`@param`) 和返回值 (`@returns`) 的描述和类型。

:::tip 建议 👍
```js
/**
  * Greets a user.
  * @param name The name of the user.
  * @returns A greeting message.
  */
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```
:::
    
17.3 在 TypeScript 项目中，避免在 JSDoc 中重复声明类型，因为类型已经由代码本身定义。

:::tip 建议 👍
```ts
/**
 * Greets a user.
 * @param name The name of the user.
 * @returns A greeting message.
 */
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```
:::

:::danger 不建议 👎
```ts
/**
 * @param {string} name
 * @returns {string}
 */
function greet(name: string): string { // 类型重复
  return `Hello, ${name}!`;
}
```
:::

17.4 确保 JSDoc 标签 (`@param`, `@returns` 等) 书写正确且对齐。

## 18. ESLint 注释 (ESLint Comments)

18.1 当需要禁用某条 ESLint 规则时，必须指定要禁用的具体规则名称。

:::tip 建议 👍
```ts
// eslint-disable-next-line no-console
console.log('Special log for debugging');
```
:::

:::danger 不建议 👎
```ts
// eslint-disable-next-line
console.log('Which rule is disabled?');
```
:::

18.2 在禁用规则时，应提供明确的注释说明原因。

:::tip 建议 👍
```ts
// eslint-disable-next-line no-param-reassign -- This is a legacy API that requires parameter mutation.
acc.total += item.value;
```
:::

:::danger 不建议 👎
```ts
// eslint-disable-next-line no-param-reassign
acc.total += item.value;
```
:::

18.3 仅在必要的最小范围内禁用规则，优先使用 `eslint-disable-next-line`。

18.4 避免提交包含未使用 `eslint-disable` 注释的代码。

## 19. 类型转换 (Type Casting & Coercion)

19.1 避免隐式类型转换。

19.2 在语句开头使用 `parseInt` 时，总是指定基数。

19.3 优先使用 `Number.isNaN` 而不是全局的 `isNaN`。

19.4 优先使用 `Number.isFinite` 而不是全局的 `isFinite`。

19.5 TypeScript 中，使用 `as` 进行类型断言。

:::tip 建议 👍
```ts
const value: unknown = 'hello world';
const len = (value as string).length;
```
:::

## 20. 命名规范 (Naming Conventions)

20.1 变量、函数名使用小驼峰命名法 (camelCase)。

20.2 类、接口、类型别名、枚举使用大驼峰命名法 (PascalCase)。

20.3 常量使用全大写蛇形命名法 (UPPER_CASE_SNAKE_CASE)。

20.4 不要使用前导或后导下划线。

20.5 文件名使用小驼峰命名法或 kebab-case。

## 21. 存取器 (Accessors)

21.1 如果需要，请为属性提供 `get` 和 `set` 存取器。

21.2 `getter` 必须有返回值。

21.3 `setter` 不能有返回值。

## 22. Promise 与异步编程 (Promises & Async Programming)

22.1 优先使用 `async/await` 语法处理异步操作。

22.2 `Promise` 的 `reject` 原因应该是一个 `Error` 对象。

22.3 确保 `Promise` 链中总是有 `.catch()` 或在 `async` 函数中使用 `try...catch`。

22.4 避免在 `finally` 块中使用 `return`, `throw`, `break` 或 `continue`。

22.5 避免不必要的 `await`。

:::tip 建议 👍
```ts
async function fetchData() {
  return fetch('/api/data');
}
```
:::

:::danger 不建议 👎
```ts
async function fetchData() {
  return await fetch('/api/data');
}
```
:::

22.6 避免在循环中 `await`。如果需要并行处理，使用 `Promise.all`。

22.7 避免 `Promise` 的嵌套。

## 23. 正则表达式 (Regular Expressions)

23.1 优先使用正则表达式字面量，而不是 `new RegExp()`。

23.2 避免在正则表达式中使用不必要的转义。

23.3 避免在正则表达式中出现控制字符。

23.4 避免使用可能导致灾难性回溯的复杂正则表达式。

23.5 对所有非简单正则添加 `g` 标志，防止死循环。

## 24. 安全性 (Security)

24.1 绝对禁止使用 `eval()` 和 `new Function()`。

24.2 避免使用 `javascript: URL`。

24.3 警惕 `setTimeout` 和 `setInterval` 中的字符串参数，它们等同于 `eval`。

24.4 在将用户输入的内容插入到 DOM 之前，必须进行清理或转义，以防止 XSS 攻击。禁止直接使用 `innerHTML`, `outerHTML` 等属性来插入未经验证的内容。

:::danger 不建议 👎
```ts
const element = document.getElementById('container');
const userInput = '<img src=x onerror=alert(1)>';
// 危险! 这会导致 XSS 攻击
if (element) {
  element.innerHTML = userInput;
}
```
:::
