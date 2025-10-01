---
sidebar_position: 1
---

import TOCInline from '@theme/TOCInline';

# HTML 规范

遵循这些 HTML 开发规范将帮助：

- 编写符合 Web 标准的代码
- 提高代码可维护性和可读性
- 确保更好的可访问性
- 减少跨浏览器兼容性问题
- 提升用户体验
  
<TOCInline toc={toc} />

## 1. 文档结构基础

### 文档类型声明

所有 HTML 文档必须以 HTML5 文档类型声明开始，并保持小写格式。

:::tip 建议 👍
```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>页面标题</title>
</head>
<body>
  <!-- 页面内容 -->
</body>
</html>
```
:::

:::danger 不建议 👎
```html
<!DOCTYPE HTML>
<HTML>
<HEAD>
  <TITLE>页面标题</TITLE>
</HEAD>
```
:::

### 必需的文档结构元素

确保所有HTML文档包含必需的结构元素：`<html>`、`<head>` 和 `<body>`。

:::tip 建议 👍
```html
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>完整的文档结构</title>
</head>
<body>
  <main>
    <h1>主要内容</h1>
  </main>
</body>
</html>
:::

:::danger 不建议 👎
```html
<!doctype html>
<meta charset="utf-8">
<title>缺少结构元素</title>
<h1>内容</h1>
```
:::

## 2. 语言和字符编码

### 语言属性设置

在根 HTML 元素上指定语言属性，帮助屏幕阅读器和翻译工具正确处理内容。

:::tip 建议 👍
```html
<html lang="zh-CN">
<!-- 中文内容 -->
</html>

<html lang="en">
<!-- 英文内容 -->
</html>
:::

:::danger 不建议 👎
```html
<html>
<!-- 缺少语言声明 -->
</html>
```
:::

### 字符编码声明

在文档头部明确声明 UTF-8 字符编码，确保内容正确渲染。

:::tip 建议 👍
```html
<head>
  <meta charset="utf-8">
  <title>正确的字符编码</title>
</head>
:::

:::danger 不建议 👎
```html
<head>
  <title>缺少字符编码声明</title>
</head>
```
:::

## 3. 代码格式规范

### 缩进和空格

使用 2 个空格进行缩进，嵌套元素应当缩进一次。

:::tip 建议 👍
```html
<div class="container">
  <header>
    <h1>网站标题</h1>
    <nav>
      <ul>
        <li><a href="#home">首页</a></li>
        <li><a href="#about">关于</a></li>
      </ul>
    </nav>
  </header>
</div>
:::

:::danger 不建议 👎
```html
<div class="container">
<header>
<h1>网站标题</h1>
<nav>
<ul>
<li><a href="#home">首页</a></li>
</ul>
</nav>
</header>
</div>
```
:::

### 标签命名规范
所有HTML标签使用小写字母，包括文档类型声明。

:::tip 建议 👍
```html
<section>
  <article>
    <header>
      <h2>文章标题</h2>
    </header>
    <p>文章内容</p>
  </article>
</section>
:::

:::danger 不建议 👎
```html
<SECTION>
  <Article>
    <HEADER>
      <H2>文章标题</H2>
    </HEADER>
  </Article>
</SECTION>
```
:::

## 4. 属性规范

### 属性引号使用
所有属性值必须使用双引号包围。

:::tip 建议 👍
```html
<img src="images/logo.png" alt="公司标志" class="logo">
<input type="email" placeholder="请输入邮箱地址">
:::

:::danger 不建议 👎
```html
<img src='images/logo.png' alt=公司标志 class="logo">
<input type=email placeholder='请输入邮箱地址'>
```
:::

### 属性排序规范

HTML属性应按以下顺序排列：

1. `class`
2. `id`, `name`
3. `data-*`
4. `src`, `for`, `type`, `href`, `value`
5. `title`, `alt`
6. `role`, `aria-*`
7. `tabindex`
8. `style`

:::tip 建议 👍
```html
<a class="btn btn-primary" id="submit-btn" data-toggle="modal" href="#modal" title="提交表单" role="button">
  提交
</a>
<input class="form-control" type="email" name="email" placeholder="邮箱地址" required>
:::

:::danger 不建议 👎
```html
<a href="#modal" class="btn btn-primary" title="提交表单" id="submit-btn">
  提交
</a>
```
:::

### 布尔属性处理

布尔属性不需要声明值，属性存在即表示`true`。

:::tip 建议 👍
```html
<input type="checkbox" checked>
<input type="text" disabled>
<script src="app.js" defer></script>
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
</audio>
:::

:::danger 不建议 👎
```html
<input type="checkbox" checked="true">
<input type="text" disabled="disabled">
<script src="app.js" defer="defer"></script>
```
:::

### 重复属性禁止

避免在同一元素上出现重复属性。

:::tip 建议 👍
```html
<div class="container main-content" data-role="main">
  内容
</div>
:::

:::danger 不建议 👎
```html
<div class="container" class="main-content" data-role="main">
  内容
</div>
```
:::

## 5. 元素使用规范

### 自闭合元素处理
HTML5自闭合元素不需要尾部斜杠。

:::tip 建议 👍
```html
<img src="image.jpg" alt="描述">
<input type="text" name="username">
<meta charset="utf-8">
<link rel="stylesheet" href="style.css">
<hr>
<br>
:::

:::danger 不建议 👎
```html
<img src="image.jpg" alt="描述" />
<input type="text" name="username" />
<meta charset="utf-8" />
<hr />
<br />
```
:::

### 闭合标签完整性

非空元素必须有对应的闭合标签，包括可选的闭合标签。

:::tip 建议 👍
```html
<ul>
  <li>项目一</li>
  <li>项目二</li>
  <li>项目三</li>
</ul>
<p>这是一个段落。</p>
<p>这是另一个段落。</p>
:::

:::danger 不建议 👎
```html
<ul>
  <li>项目一
  <li>项目二
  <li>项目三
</ul>
<p>这是一个段落。
<p>这是另一个段落。
```
:::

### 元素嵌套规范

确保元素正确嵌套，遵循 HTML 语义化规则。

:::tip 建议 👍
```html
<article>
  <header>
    <h1>文章标题</h1>
  </header>
  <section>
    <h2>章节标题</h2>
    <p>段落内容</p>
  </section>
</article>
:::

:::danger 不建议 👎
```html
<p>
  <div>段落内不能包含块级元素</div>
</p>
<h1>
  <h2>标题不能嵌套其他标题</h2>
</h1>
```
:::

## 6. 标题层级结构

### 标题逻辑层级

确保标题按逻辑层级正确使用，不要跳过级别。

:::tip 建议 👍
```html
<h1>主标题</h1>
  <h2>二级标题</h2>
    <h3>三级标题</h3>
    <h3>另一个三级标题</h3>
  <h2>另一个二级标题</h2>
    <h3>三级标题</h3>
:::

:::danger 不建议 👎
```html
<h1>主标题</h1>
  <h3>跳过了h2直接使用h3</h3>
  <h5>从h3跳到h5</h5>
```
:::

## 7. 表单可访问性

### 表单标签关联

所有表单输入元素必须有适当的标签关联。

:::tip 建议 👍
```html
<label for="username">用户名：</label>
<input type="text" id="username" name="username">

<label>
  邮箱地址：
  <input type="email" name="email">
</label>

<fieldset>
  <legend>性别选择</legend>
  <label><input type="radio" name="gender" value="male"> 男</label>
  <label><input type="radio" name="gender" value="female"> 女</label>
</fieldset>
:::

:::danger 不建议 👎
```html
<input type="text" placeholder="用户名">
<input type="email" placeholder="邮箱">

<input type="radio" name="gender" value="male"> 男
<input type="radio" name="gender" value="female"> 女
```
:::

## 8. 图片和媒体元素

### 图片替代文本

所有图片必须提供适当的替代文本。

:::tip 建议 👍
```html
<img src="chart.png" alt="2023年销售额增长图表，显示同比增长15%">
<img src="decorative-border.png" alt="">
<img src="logo.png" alt="ABC公司">
:::

:::danger 不建议 👎
```html
<img src="chart.png">
<img src="important-graph.png" alt="图片">
```
:::

### 媒体元素地图

图像地图必须有有效的名称和区域定义。

:::tip 建议 👍
```html
<img src="worldmap.png" alt="世界地图" usemap="#worldmap">
<map name="worldmap">
  <area shape="rect" coords="0,0,100,100" href="/asia" alt="亚洲地区">
  <area shape="circle" coords="150,150,50" href="/europe" alt="欧洲地区">
</map>
:::

:::danger 不建议 👎
```html
<img src="worldmap.png" usemap="#worldmap">
<map name="worldmap">
  <area shape="rect" coords="0,0,100,100" href="/asia">
</map>
```
:::

## 9. 链接和引用

### 外部资源引用

CSS 和 JavaScript 文件引用不需要指定 `type` 属性，使用相对或绝对路径。

:::tip 建议 👍
```html
<link rel="stylesheet" href="styles/main.css">
<link rel="stylesheet" href="//cdn.example.com/bootstrap.css">
<script src="scripts/app.js"></script>
:::

:::danger 不建议 👎
```html
<link rel="stylesheet" type="text/css" href="styles/main.css">
<script type="text/javascript" src="scripts/app.js"></script>
```
:::

### 子资源完整性

对于来自 CDN 的外部资源，建议添加完整性验证。

:::tip 建议 👍
```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js" 
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" 
        crossorigin="anonymous"></script>
```
:::

## 10. 语义化和可访问性

### ARIA 属性使用

适当使用 ARIA 属性增强可访问性，但不要滥用。

:::tip 建议 👍
```html
<button aria-expanded="false" aria-controls="menu" id="menu-button">
  菜单
</button>
<ul id="menu" aria-labelledby="menu-button" hidden>
  <li><a href="/home">首页</a></li>
  <li><a href="/about">关于</a></li>
</ul>

<main role="main">
  <article>
    <h1>文章标题</h1>
    <p>文章内容</p>
  </article>
</main>
:::

:::danger 不建议 👎
```html
<div role="button" onclick="openMenu()">菜单</div>
<div role="main">
  <div role="article">
    <div role="heading">文章标题</div>
    <div>文章内容</div>
  </div>
</div>
```
:::

### 多主要内容处理

一个页面只能有一个 `main` 元素，除非其他 `main` 元素被隐藏。

:::tip 建议 👍
```html
<body>
  <header><!-- 页头内容 --></header>
  <main>
    <h1>主要内容标题</h1>
    <article>文章内容</article>
  </main>
  <footer><!-- 页脚内容 --></footer>
</body>
:::

:::danger 不建议 👎
```html
<body>
  <main>第一个主要内容区域</main>
  <main>第二个主要内容区域</main>
</body>
```
:::

## 11. ID 和引用完整性

### 唯一 ID 约束

确保页面中所有 ID 值唯一，被引用的 ID 必须存在。

:::tip 建议 👍
```html
<form>
  <label for="email">邮箱：</label>
  <input type="email" id="email" name="email">
  
  <label for="password">密码：</label>
  <input type="password" id="password" name="password">
</form>

<a href="#section1">跳转到第一节</a>
<section id="section1">
  <h2>第一节内容</h2>
</section>
:::

:::danger 不建议 👎
```html
<div id="content">内容区域1</div>
<div id="content">内容区域2</div> <!-- 重复ID -->

<a href="#nonexistent">跳转链接</a> <!-- 目标不存在 -->
```
:::

## 12. 脚本和样式安全

### 内联脚本规范

避免在 HTML 中直接使用内联事件处理程序，优先使用外部 JavaScript。

:::tip 建议 👍
```html
<button id="submit-btn" class="btn-primary">提交</button>
<script src="scripts/form-handler.js"></script>
:::

:::danger 不建议 👎
```html
<button onclick="submitForm()" class="btn-primary">提交</button>
```
:::

## 13. 字符引用规范

### HTML 实体使用

对于预留的 XML 字符和特殊字符，适当使用 HTML 实体。

:::tip 建议 👍
```html
<p>价格：&lt; 100元 &amp; 免费配送</p>
<p>版权所有 &copy; 2023 公司名称</p>
<p>使用破折号—无需HTML实体</p>
```
:::

:::danger 不建议 👎
```html
<p>价格：< 100元 & 免费配送</p>
<p>版权所有 © 2023 公司名称</p>
```
:::

## 14. 减少冗余标记

### 标记简化原则

尽可能避免不必要的父元素，保持 HTML 结构简洁。

:::tip 建议 👍
```html
<img class="avatar" src="user.jpg" alt="用户头像">
<h1 class="page-title">页面标题</h1>
```
:::

:::danger 不建议 👎
```html
<span class="avatar">
  <img src="user.jpg" alt="用户头像">
</span>
<div class="title-wrapper">
  <h1>页面标题</h1>
</div>
```
:::
