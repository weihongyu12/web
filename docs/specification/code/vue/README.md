---
sidebar_position: 4
---

# Vue 规范

import TOCInline from '@theme/TOCInline';

本文档旨在为 Vue 项目提供一套统一的代码风格和开发规范，以提高代码质量、可读性和可维护性。规范结合了 Vue 官方风格指南、Airbnb JavaScript 风格指南以及一系列最佳实践。

<TOCInline toc={toc} />

## A - 必要 (Essential)

这些规则有助于避免错误，因此请务必学习并遵守。

### 1. 组件命名

组件名应始终由多个单词组成，以避免与现有和未来的 HTML 元素冲突。

:::tip 建议 👍
```vue
// components/BaseButton.vue
export default {
  name: 'BaseButton',
  // ...
}
```
:::

:::danger 不建议 👎
```vue
// components/Button.vue
export default {
  name: 'Button',
  // ...
}
```
:::

在 `<script setup>` 中，文件名即为组件名，因此文件名也应为多个单词。

- 正例: `BaseButton.vue`
- 反例: `Button.vue`

### 2. Prop 定义

Prop 定义应尽可能详细，至少指定其类型、默认值，并按需提供校验。

:::tip 建议 👍
```vue
import type { PropType } from 'vue';

type ButtonStatus = 'success' | 'warning' | 'danger';

defineProps({
  status: {
    type: String as PropType<ButtonStatus>,
    required: true,
    default: 'success',
    validator: (value: ButtonStatus) => ['success', 'warning', 'danger'].includes(value),
  },
});
```
:::

:::danger 不建议 👎
```vue
// props: ['status']
defineProps({
  status: String,
});
```
:::

### 3. `v-for` 设置 `key`

在使用 `v-for` 时，必须为每个元素提供唯一的、稳定的 `key` 属性。绝对不能使用数组的 `index` 作为 `key`，因为这会在列表项顺序改变时导致不必要的 DOM 操作和状态混乱。

:::tip 建议 👍
```vue
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
    </li>
  </ul>
</template>
```
:::

:::danger 不建议 👎
```vue
<template>
  <ul>
    <!-- 错误：缺少 key -->
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>

    <!-- 错误：使用数组索引作为 key -->
    <li v-for="(todo, index) in todos" :key="index">
      {{ todo.text }}
    </li>
  </ul>
</template>
```
:::

### 4. 避免 `v-if` 和 `v-for` 同时使用

永远不要在同一个元素上同时使用 `v-if` 和 `v-for`。`v-for` 的优先级高于 `v-if`，这意味着 `v-if` 会在每次循环中都执行一次，导致不必要的性能开销。

:::tip 建议 👍 通过计算属性预先过滤列表，或将 `v-if` 移至外层容器元素
```vue
<template>
  <ul>
    <li v-for="user in activeUsers" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface User {
  id: number;
  name: string;
  isActive: boolean;
}

const props = defineProps<{ users: User[] }>();

const activeUsers = computed(() => {
  return props.users.filter(user => user.isActive);
});
</script>
```
:::

:::danger 不建议 👎
```vue
<template>
  <ul>
    <li v-for="user in users" v-if="user.isActive" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
</template>
```
:::

### 5. 组件 `style` 作用域

对于组件来说，样式应该是有作用域的 (`scoped`)，以避免一个组件的样式泄露并意外地影响到另一个组件。

:::tip 建议 👍
```vue
<style scoped>
.button {
  border: 1px solid #ccc;
}
</style>
```
:::

:::danger 不建议 👎
```vue
<style>
.button {
  border: 1px solid #ccc;
}
</style>
```
:::

### 6. 私有属性命名

插件、mixin 等提供的非公共的自定义属性，应使用 `$_` 或 `_` 作为前缀，以明确表示其为私有属性，避免与组件自身状态或官方 API 冲突。

:::tip 建议 👍
```vue
const myPlugin = {
  install(app) {
    // 使用独特的前缀来避免与其他插件冲突
    app.config.globalProperties.$_myPlugin_myProperty = '...';
  }
};
```
:::

:::danger 不建议 👎
```vue
const myPlugin = {
  install(app) {
    app.config.globalProperties.myProperty = '...';
  }
};
```
:::

## B - 强烈推荐 (Strongly Recommended)

这些规则在绝大多数项目中都能提升可读性和开发者体验。

### 1. 组件文件

一个文件应该只包含一个组件定义。这使得组件更容易查找、理解和测试。

:::danger 不建议 👎
```vue
// MyComponents.vue
export default {
  name: 'ComponentA',
  // ...
}

export const ComponentB = {
  name: 'ComponentB',
  // ...
}
```
:::

:::tip 建议 👍
将每个组件拆分到单独的文件中：`ComponentA.vue` 和 `ComponentB.vue`。
:::

### 2. 组件名大小写

在单文件组件中，组件名应始终使用帕斯卡命名法 (PascalCase)。这与 JS/TS 中类的命名约定保持一致，并有助于在模板中区分自定义组件和原生 HTML 元素。

- 建议 👍: `MyComponent.vue`
- 不建议 👎: `my-component.vue`, `myComponent.vue`

### 3. Prop 命名

在声明 prop 时，其名称应始终使用驼峰式命名法 (camelCase)。在模板中使用时，应使用短横线分隔命名法 (kebab-case)。

> **为什么？** HTML 属性名是不区分大小写的，所以浏览器会把所有大写字符解释为小写。camelCase 的 prop 名需要转换为 kebab-case 才能在 DOM 模板中正确匹配。

:::tip 建议 👍
```vue
// prop 定义
defineProps({
  greetingText: String
});

<!-- 模板使用 -->
<WelcomeMessage :greeting-text="'hi'"/>
```
:::

:::danger 不建议 👎
```vue
// prop 定义
defineProps({
'greeting-text': String
});

<!-- 模板使用 -->
<WelcomeMessage :greetingText="'hi'"/>
```
:::

### 4. 属性顺序

组件/实例的选项和模板中的元素属性应该有统一的顺序，以方便查找和阅读。

1. `<script setup>`:
   1. `defineOptions({ name: '...' })` (组件命名)
   2. `defineProps` (Props 接口)
   3. `defineEmits` (Emits 接口)
   4. `defineExpose` (暴露公共属性)
   5. 响应式状态 (`ref`, `reactive`)
   6. 计算属性 (`computed`)
   7. `watch` / `watchEffect` (侦听器)
   8. 生命周期钩子
   9. 普通函数 (事件处理、业务逻辑)
2. `<template>` 元素属性顺序:
   1. `is` (定义)
   2. `v-for` (列表渲染)
   3. `v-if`, `v-else-if`, `v-else`, `v-show` (条件渲染)
   4. `v-slot` (插槽)
   5. `key` (唯一标识)
   6. `ref` (模板引用)
   7. `v-model` (双向绑定)
   8. 其他属性 (如 `id`, `class`, `title`)
   9. `v-on` 事件 (如 `@click`)

### 5. 模板中简单的表达式

组件模板应只包含简单的、声明式的表达式。复杂的逻辑应移至计算属性或方法中。

> **为什么？** 将复杂逻辑放在模板中会使其变得臃肿且难以维护。计算属性和方法更易于测试和复用。

:::tip 建议 👍
```vue
<template>
  <p>{{ reversedMessage }}</p>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const message = ref('Hello');
const reversedMessage = computed(() => message.value.split('').reverse().join(''));
</script>
```
:::

:::danger 不建议 👎
```vue
<template>
  <p>
    {{ message.split('').reverse().join('') }}
  </p>
</template>
```
:::

### 6. 指令缩写

指令应始终使用缩写形式 (`:` 用于 `v-bind:`, `@` 用于 `v-on:` 和 `#` 用于 `v-slot`)，以保持代码简洁。

:::tip 建议 👍
```vue
<input :value="value" @input="onInput">
<template #header>
  <h1>Header</h1>
</template>
```
:::

:::danger 不建议 👎
```vue
<input v-bind:value="value" v-on:input="onInput">
<template v-slot:header>
  <h1>Header</h1>
</template>
```
:::

## C - 推荐 (Recommended)

这些规则在权衡和考量后可以被采纳，以确保代码风格的一致性。

### 1. 组件选项顺序 (Options API)

如果未使用 `<script setup>`，组件选项应遵循统一的顺序。

1. `name`
2. `components`
3. `props`
4. `emits`
5. `data`
6. `computed`
7. `watch`
8. 生命周期钩子
9. `methods`

### 2. `v-html` 的使用

`v-html` 可能会导致 XSS (跨站脚本) 攻击，应该谨慎使用。只在受信任的内容上使用，并且永远不要用于用户提交的内容。

:::tip 建议 👍 总是对用户输入内容进行清理和转义
```vue
<template>
  <div v-html="sanitizedContent"></div>
</template>

<script setup lang="ts">
import DOMPurify from 'dompurify';

const userInputContent = '<img src="x" onerror="alert(\'XSS\')">';
const sanitizedContent = DOMPurify.sanitize(userInputContent);
</script>
```
:::

:::danger 不建议 👎
```vue
<div v-html="userInputContent"></div>
```
:::

### 3. 单文件组件顶级元素顺序

单文件组件 (`.vue` 文件) 的顶级标签顺序应为 `<script>`, `<template>`, `<style>`。

> **为什么？** 将 `<script>` 放在首位，可以让你在打开文件时首先看到组件的逻辑和依赖，这通常是最重要的部分。

:::tip 建议 👍
```vue
<script setup lang="ts">
// ...
</script>

<template>
  <!-- ... -->
</template>

<style scoped>
/* ... */
</style>
```
:::

## D - 谨慎使用 (Use with Caution)

这些特性存在潜在的风险，只在特殊情况下谨慎使用。

### 1. `scoped` 中使用全局选择器

在 `scoped` 样式中使用 `:deep()` 或 `::v-deep` 等深度选择器应谨慎，因为它会破坏样式的封装性，使得样式规则变得难以追踪和维护。

:::tip 建议 👍 优先通过 prop 控制子组件样式。如果必须覆盖，请添加一个外层 class 来约束范围，以减少影响
```vue
<template>
  <div class="custom-wrapper">
    <ChildComponent />
  </div>
</template>

<style scoped>
.custom-wrapper :deep(.child-component-class) {
  font-size: 20px;
}
</style>
```
:::

:::danger 不建议 👎
```vue
<style scoped>
:deep(.child-component-class) {
  font-size: 20px;
}
</style>
```
:::

### 2. 访问 `this`

在 Composition API (`<script setup>`) 中，`this` 不再指向组件实例 (其值为 `undefined`)。应避免使用 `this`。

:::tip 建议 👍 直接访问 `ref` 或 `reactive` 对象。对于 `ref`，记得使用 `.value`。
```vue
import { ref } from 'vue';

const message = ref('Hello');

function handleClick() {
  console.log(message.value);
}
```
:::

:::danger 不建议 👎
```vue
// 在 <script setup> 中，this 是 undefined
function handleClick() {
  console.log(this.message); // Error
}
```
:::

## CSS 作用域  (CSS Scoped)


### 1. 强制样式类型

单文件组件中的 `<style>` 标签必须使用 `scoped` 或 `module` 属性，以防止样式污染全局。

:::tip 建议 👍
```vue
<style scoped>
/* 仅作用于当前组件 */
.title { color: red; }
</style>
```
:::

:::danger 不建议 👎
```vue
<style>
/* 污染全局 */
.title { color: red; }
</style>
```
:::

### 2. 移除未使用的 CSS 

定义的 CSS 选择器或关键帧 (`keyframes`) 必须在模板中被使用。这有助于保持代码库的轻量和整洁。

:::tip 建议 👍
```vue
<template>
  <div class="active"></div>
</template>

<style scoped>
.active { color: blue; }
</style>
```
:::

:::danger 不建议 👎
```vue
<template>
  <div class="active"></div>
</template>

<style scoped>
/* 警告：未使用的选择器 */
.inactive { color: grey; } 
</style>
```
:::

### 3. 废弃的深度选择器

不要使用 `>>>` 或 `/deep/`，它们已被废弃。请使用 Vue 3 推荐的 `:deep()` 伪类。

:::tip 建议 👍
```vue
<style scoped>
.a :deep(.b) { /* ... */ }
</style>
```
:::

:::danger 不建议 👎
```vue
<style scoped>
.a >>> .b { /* ... */ }
.a /deep/ .b { /* ... */ }
</style>
```
:::

### 4. 伪类参数要求

伪类 `:deep`, `:global`, 和 `:slotted` 必须包含选择器参数。

:::tip 建议 👍
```vue
<style scoped>
:deep(.a) { /* ... */ }
</style>
```
:::

:::danger 不建议 👎
```vue
<style scoped>
.:deep { /* ... */ }
</style>
```
:::

## 安全性 (Security)

### 1. 避免潜在的 XSS 攻击

永远不要将不可信的数据直接传递给可能执行代码的指令或属性，例如 `v-html` 或 `:href`。

:::tip 建议 👍 对数据进行严格的验证和清理
```vue
<template>
  <a :href="validatedUrl">Click me</a>
  <div v-html="sanitizedHtml"></div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { sanitizeUrl } from '@braintree/sanitize-url';
import DOMPurify from 'dompurify';

const userProvidedUrl = ref('javascript:alert("XSS")');
const userHtml = ref('<img src=x onerror=alert("XSS") />');

const validatedUrl = sanitizeUrl(userProvidedUrl.value);
const sanitizedHtml = computed(() => DOMPurify.sanitize(userHtml.value));
</script>
```
:::

:::danger 不建议 👎 潜在的 XSS 风险
```vue
<template>
  <a :href="userProvidedUrl">Click me</a>
  <div v-html="userHtml"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const userProvidedUrl = ref('javascript:alert("XSS")');
const userHtml = ref('<img src=x onerror=alert("XSS") />');
</script>
```
:::
