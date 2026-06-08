---
sidebar_position: 2
---

# 注释规范

## JavaScript注释规范

#### 单行注释

总是在 `//` 后留一个空格

```javascript
// 这是一行注释
```

#### 多行注释

- 总是保持星号纵向对齐（结束符前留一个空格）
- 不要在开始符、结束符所在行写注释
- 尽量使用单行注释代替多行注释
- 注释函数时，推荐使用多行注释

```javascript
/*
 *  这里有一行注释
 *  这里有一行注释
 *  这里有一行注释
 */
```

多行注释一般用于需要备注的信息过多的情况，常用于 `JavaScript` 函数

#### 函数注释

- 非必传参数需给参数名加上 `[]`
- 参数如有默认值需用 `=` 表示
- 如果参数是 `Object`，可继续用 `@param` 对其属性进行详细说明

点击这里了解更多  [JSDoc](https://jsdoc.app/)

```javascript
/**
 * @desc 一个带参数的函数
 * Convert a data object to FormData
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 * @returns {Object}
 **/
 function toFormData(obj, formData, options) {

 }
```
:::tip
可通过编辑器的语法高亮功能，确保JS文件中注释语法正确
:::

## 需要写注释的场景

- 晦涩难懂的公式，如长正则

  ```javascript
  // 身份证号（2代，18位数字），最后一位是校验位，可能为数字或字符X
  const reg = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
  ```

- 可以重构，开发中的技术债务可以通过注释标明便于以后重构或者清除

  ```javascript
  // TODO: use native Array.find, Array.findIndex when IE support is dropped
  ```

- 业务逻辑复杂
- 有一定的问题，待加补丁或通过hack解决的方式

## 注释的原则

- 避免无意义或者翻译式注释


- 不要出现过期的注释，修改代码应同步修改注释，否则会起到反作用
- 注释简述功能或实现逻辑即可，无需每行代码都添加注释

无意义或者翻译式注释

:::danger[反面例子 👎]

```javascript
// 保存
function save(){}
```

:::

这是典型的无意义注释，本身方法名就表达了保存的意思，并且注释也不会给我们提供更多有效的信息。
