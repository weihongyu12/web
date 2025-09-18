---
sidebar_position: 4
---

# Tailwind CSS 规范

```js
// .eslintrc.js

module.exports = {
  extends: [
    'plugin:tailwindcss/recommended',
  ],
};
```

:::warning
截止目前 `eslint-plugin-tailwindcss` 需要 beta 版才支持 Tailwind CSS v4，请执行以下命令安装，并等待最终正式版

```bash
pnpm add eslint-plugin-tailwindcss@beta -D
```
:::

| 规则名称 | 错误级别 | 配置选项 | 描述 |
|---|---|---|---|
| [classnames-order](https://github.com/francoismassart/eslint-plugin-tailwindcss/blob/master/docs/rules/classnames-order.md) | warn | - | 使用基于官方推荐顺序的 Tailwind CSS 类名一致排序 |
| [enforces-negative-arbitrary-values](https://github.com/francoismassart/eslint-plugin-tailwindcss/blob/master/docs/rules/enforces-negative-arbitrary-values.md) | warn | - | 警告使用任意值时带有 `-` 前缀的类名 |
| [enforces-shorthand](https://github.com/francoismassart/eslint-plugin-tailwindcss/blob/master/docs/rules/enforces-shorthand.md) | warn | - | 将多个 Tailwind CSS 类名替换为其简写形式 |
| [migration-from-tailwind-2](https://github.com/francoismassart/eslint-plugin-tailwindcss/blob/master/docs/rules/migration-from-tailwind-2.md) | off | - | 检测升级到 Tailwind CSS v3 时的过时类名 |
| [no-arbitrary-value](https://github.com/francoismassart/eslint-plugin-tailwindcss/blob/master/docs/rules/no-arbitrary-value.md) | off | - | 禁止在类名中使用任意值 |
| [no-custom-classname](https://github.com/francoismassart/eslint-plugin-tailwindcss/blob/master/docs/rules/no-custom-classname.md) | warn | - | 检测不属于 Tailwind CSS 的类名 |
| [no-contradicting-classname](https://github.com/francoismassart/eslint-plugin-tailwindcss/blob/master/docs/rules/no-contradicting-classname.md) | off | - | 避免使用相互矛盾的Tailwind CSS类名（例如"w-3 w-5"） |
| [no-unnecessary-arbitrary-value](https://github.com/francoismassart/eslint-plugin-tailwindcss/blob/master/docs/rules/no-unnecessary-arbitrary-value.md) | warn | - | 避免使用不必要的任意类名 |
