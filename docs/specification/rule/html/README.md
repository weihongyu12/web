---
sidebar_position: 1
---


# HTML 规则

:::warning
HTML Validate 规则参考 `html-validate:recommended`，但是由于需要整理的内容非常多，在开发过程中，仍以实际的 HTML Validate 检查为准。本章内容仅供参考
:::

## HTML语法与概念

与HTML语法和概念相关的规则。

|   | 规则 | 描述 |
|---|---|---|
| ✔️ | [attr-delimiter](https://html-validate.org/rules/attr-delimiter.html) | 禁止在属性键和值之间存在空格 |
| ✔️ | [attr-spacing](https://html-validate.org/rules/attr-spacing.html) | 要求属性之间用空格分隔 |
| ✔️ | [close-attr](https://html-validate.org/rules/close-attr.html) | 禁止结束标签包含属性 |
| ✔️ | [close-order](https://html-validate.org/rules/close-order.html) | 要求元素以正确的顺序关闭 |
| ✔️ | [element-name](https://html-validate.org/rules/element-name.html) | 禁止使用无效的元素名称 |
| ✔️ | [form-dup-name](https://html-validate.org/rules/form-dup-name.html) | 要求表单控件具有唯一的名称 |
| ✔️ | [map-dup-name](https://html-validate.org/rules/map-dup-name.html) | 要求 `<map name>` 是唯一的 |
| ✔️ | [map-id-name](https://html-validate.org/rules/map-id-name.html) | 要求 `<map>` 元素上的 name 和 id 匹配 |
| ✔️ | [no-dup-attr](https://html-validate.org/rules/no-dup-attr.html) | 禁止重复的属性 |
| ✔️ | [no-dup-class](https://html-validate.org/rules/no-dup-class.html) | 禁止重复的类 |
| ✔️ | [no-raw-characters](https://html-validate.org/rules/no-raw-characters.html) | 禁止使用未转义的特殊字符 |
| ✔️ | [no-redundant-for](https://html-validate.org/rules/no-redundant-for.html) | 禁止使用冗余的 label for 属性 |
| ✔️ | [script-type](https://html-validate.org/rules/script-type.html) | 要求 `<script>` 元素具有有效的类型 |
| ✔️ | [unrecognized-char-ref](https://html-validate.org/rules/unrecognized-char-ref.html) | 禁止无法识别的字符引用 |
| ✔️ | [valid-autocomplete](https://html-validate.org/rules/valid-autocomplete.html) | 要求 autocomplete 属性有效 |
| ✔️ | [valid-id](https://html-validate.org/rules/valid-id.html) | 要求 `id` 是一个有效的标识符 |

## 内容模型

|   | 规则 | 描述 |
|---|---|---|
| ✔️ | [attribute-allowed-values](https://html-validate.org/rules/attribute-allowed-values.html) | 验证允许的属性值 |
| ✔️ | [attribute-misuse](https://html-validate.org/rules/attribute-misuse.html) | 要求属性在正确的上下文中使用 |
| ✔️ | [element-permitted-content](https://html-validate.org/rules/element-permitted-content.html) | 验证允许的内容 |
| ✔️ | [element-permitted-occurrences](https://html-validate.org/rules/element-permitted-occurrences.html) | 验证允许的元素出现次数 |
| ✔️ | [element-permitted-order](https://html-validate.org/rules/element-permitted-order.html) | 验证所需的元素顺序 |
| ✔️ | [element-permitted-parent](https://html-validate.org/rules/element-permitted-parent.html) | 验证允许的父元素 |
| ✔️ | [element-required-ancestor](https://html-validate.org/rules/element-required-ancestor.html) | 验证所需的祖先元素 |
| ✔️ | [element-required-attributes](https://html-validate.org/rules/element-required-attributes.html) | 确保设置了必需的属性 |
| ✔️ | [element-required-content](https://html-validate.org/rules/element-required-content.html) | 确保存在必需的元素 |
| ✔️ | [input-attributes](https://html-validate.org/rules/input-attributes.html) | 验证输入属性的使用 |
| ✔️ | [no-multiple-main](https://html-validate.org/rules/no-multiple-main.html) | 禁止多个 `<main>` |
| ✔️ | [script-element](https://html-validate.org/rules/script-element.html) | 要求 `<script>` 有结束标签 |
| ✔️ | [void-content](https://html-validate.org/rules/void-content.html) | 禁止空元素包含内容 |

## 已弃用

与使用已弃用或过时功能相关的规则。

|   | 规则 | 描述 |
|---|---|---|
| ✔️ | [deprecated](https://html-validate.org/rules/deprecated.html) | 禁止使用已弃用的元素 |
| ✔️ | [deprecated-rule](https://html-validate.org/rules/deprecated-rule.html) | 禁止使用已弃用的规则 |
| ✔️ | [no-conditional-comment](https://html-validate.org/rules/no-conditional-comment.html) | 禁止使用条件注释 |
| ✔️ | [no-deprecated-attr](https://html-validate.org/rules/no-deprecated-attr.html) | 禁止使用已弃用的属性 |

## 可访问性

|   | 规则 | 描述 |
|---|---|---|
| ✔️ | [area-alt](https://html-validate.org/rules/area-alt.html) | 要求 `<area>` 元素提供替代文本 |
| ✔️ | [aria-hidden-body](https://html-validate.org/rules/aria-hidden-body.html) | 禁止在 `<body>` 上设置 `aria-hidden` |
| ✔️ | [aria-label-misuse](https://html-validate.org/rules/aria-label-misuse.html) | 禁止误用 `aria-label` |
| ✔️ | [empty-heading](https://html-validate.org/rules/empty-heading.html) | 要求标题具有文本内容 |
| ✔️ | [empty-title](https://html-validate.org/rules/empty-title.html) | 要求 title 具有文本内容 |
| ✔️ | [hidden-focusable](https://html-validate.org/rules/hidden-focusable.html) | 禁止对可聚焦元素使用 `aria-hidden` |
| 📃 | [input-missing-label](https://html-validate.org/rules/input-missing-label.html) | 要求输入框有标签 |
| ✔️ | [meta-refresh](https://html-validate.org/rules/meta-refresh.html) | 要求 meta refresh 的延迟时间为 0 秒 |
| ✔️ | [multiple-labeled-controls](https://html-validate.org/rules/multiple-labeled-controls.html) | 禁止标签与多个控件关联 |
| ✔️ | [no-abstract-role](https://html-validate.org/rules/no-abstract-role.html) | 禁止使用抽象的 WAI-ARIA 角色 |
| ✔️ | [no-autoplay](https://html-validate.org/rules/no-autoplay.html) | 禁止媒体元素自动播放 |
| ✔️ | [no-implicit-button-type](https://html-validate.org/rules/no-implicit-button-type.html) | 禁止隐式的按钮类型 |
| ✔️ | [no-redundant-aria-label](https://html-validate.org/rules/no-redundant-aria-label.html) | 禁止 aria-label 和 label 具有相同的文本内容 |
| ✔️ | [no-redundant-role](https://html-validate.org/rules/no-redundant-role.html) | 禁止使用冗余的角色 |
| ✔️ | [prefer-native-element](https://html-validate.org/rules/prefer-native-element.html) | 倾向于使用原生 HTML 元素而不是角色 |
| ✔️ | [tel-non-breaking](https://html-validate.org/rules/tel-non-breaking.html) | 要求电话号码中使用非换行字符 |
| ✔️ | [text-content](https://html-validate.org/rules/text-content.html) | 要求元素具有有效的文本内容 |
| ✔️ | [unique-landmark](https://html-validate.org/rules/unique-landmark.html) | 要求地标具有唯一的名称 |
| ✔️ | [wcag/h30](https://html-validate.org/rules/wcag/h30.html) | WCAG H30: 提供链接文本 |
| ✔️ | [wcag/h32](https://html-validate.org/rules/wcag/h32.html) | WCAG H32: 提供提交按钮 |
| ✔️ | [wcag/h36](https://html-validate.org/rules/wcag/h36.html) | WCAG H36: 要求用作提交按钮的图像提供替代文本 |
| ✔️ | [wcag/h37](https://html-validate.org/rules/wcag/h37.html) | WCAG H37: 在 img 元素上使用 alt 属性 |
| ✔️ | [wcag/h63](https://html-validate.org/rules/wcag/h63.html) | WCAG H63: 使用 scope 属性关联表头单元格和数据单元格 |
| ✔️ | [wcag/h67](https://html-validate.org/rules/wcag/h67.html) | WCAG H67: 在 img 元素上使用空 alt 文本且无 title 属性 |
| ✔️ | [wcag/h71](https://html-validate.org/rules/wcag/h71.html) | WCAG H71: 为表单控件组提供描述 |

## 安全

|   | 规则 | 描述 |
|---|---|---|
| 📃 | [require-sri](https://html-validate.org/rules/require-sri.html) | 要求资源具有 SRI (子资源完整性) |

## SEO

|   | 规则 | 描述 |
|---|---|---|
| ✔️ | [long-title](https://html-validate.org/rules/long-title.html) | 要求 title 文本不能过长 |

## 风格

|   | 规则 | 描述 |
|---|---|---|
| ✔️ | [attr-case](https://html-validate.org/rules/attr-case.html) | 要求属性名称使用特定的大小写 |
| ✔️ | [attr-quotes](https://html-validate.org/rules/attr-quotes.html) | 要求属性使用引号 |
| ✔️ | [attribute-boolean-style](https://html-validate.org/rules/attribute-boolean-style.html) | 要求布尔属性使用特定样式 |
| ✔️ | [attribute-empty-style](https://html-validate.org/rules/attribute-empty-style.html) | 要求空属性使用特定样式 |
| ✔️ | [doctype-style](https://html-validate.org/rules/doctype-style.html) | 要求 DOCTYPE 使用特定的大小写 |
| ✔️ | [element-case](https://html-validate.org/rules/element-case.html) | 要求元素名称使用特定的大小写 |
| ✔️ | [no-implicit-close](https://html-validate.org/rules/no-implicit-close.html) | 要求具有可选结束标签的元素被显式关闭 |
| ✔️ | [no-implicit-input-type](https://html-validate.org/rules/no-implicit-input-type.html) | 禁止隐式的输入类型 |
| ✔️ | [no-inline-style](https://html-validate.org/rules/no-inline-style.html) | 禁止内联样式 |
| ✔️ | [no-self-closing](https://html-validate.org/rules/no-self-closing.html) | 禁止自闭合元素 |
| ✔️ | [no-trailing-whitespace](https://html-validate.org/rules/no-trailing-whitespace.html) | 禁止尾部空白 |
| ✔️ | [prefer-button](https://html-validate.org/rules/prefer-button.html) | 倾向于使用 `<button>` 而不是 `<input>` 作为按钮 |
| ✔️ | [prefer-tbody](https://html-validate.org/rules/prefer-tbody.html) | 倾向于将 `<tr>` 包裹在 `<tbody>` 内 |
| ✔️ | [void-style](https://html-validate.org/rules/void-style.html) | 要求空元素使用特定的闭合样式 |

## 文档

这些规则用于完整的文档。

|   | 规则 | 描述 |
|---|---|---|
| ✔️ | [doctype-html](https://html-validate.org/rules/doctype-html.html) | 要求使用 "html" 文档类型 |
| 📃 | [heading-level](https://html-validate.org/rules/heading-level.html) | 要求标题从 h1 开始并逐级递增 |
| 📃 | [missing-doctype](https://html-validate.org/rules/missing-doctype.html) | 要求文档具有文档类型 |
| ✔️ | [no-dup-id](https://html-validate.org/rules/no-dup-id.html) | 禁止重复的 ID |
| 📃 | [no-missing-references](https://html-validate.org/rules/no-missing-references.html) | 要求所有元素引用都存在 |
| ✔️ | [no-utf8-bom](https://html-validate.org/rules/no-utf8-bom.html) | 禁止文档包含 UTF-8 BOM |

## 未分类

|   | 规则 | 描述 |
|---|---|---|
| ✔️ | [no-unused-disable](https://html-validate.org/rules/no-unused-disable.html) | 禁止未使用的禁用指令 |
