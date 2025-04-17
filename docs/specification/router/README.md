---
sidebar_position: 4
---

# 路由规范

## 总览

针对业务开发 CRUD 较多的模式，页面总体可以分以下几种：

| 页面        | 	URL                  | 	映射组件名             |
|-----------|-----------------------|--------------------|
| 功能首页（列表页） | 	`/example`           | 	`<Example>`       |
| 详情页面      | 	`/example/:id`       | 	`<ExampleDetail>` |
| 新增页面      | 	`/example/new`       | 	`<ExampleNew>`    |
| 编辑页面      | 	`/example/:id/edit`  | 	`<ExampleEdit>`   |
| 其他操作页面    | `/example/:id/action` | 	`<ExampleAction>` |

### 功能首页（列表页）

功能首页是指一个功能模块的入口页面，通常是个列表页，URL 使用**模块名**，比如 `/product`；组件名则使用**模块名**，比如 `<Product>`。

此页面通常没有必须的参数，如果需要特别的参数，可以使用 query 的模式作为可选参数（通常是作为搜索的附加条件使用）。

### 详情页面

详情页面是指从列表页点击进去查看详细信息的页面，URL 使用**模块名 + 业务ID**，比如 `/product/7jzMqJxeVQEVrDG9gPbv`；组件名则使用**模块名 + `Detail`** 的方式，比如 `<ProductDetail>`。

通常需要一个业务ID作为查询数据的必选参数。

### 新增页面

新增页面是指为某个功能创建数据的页面，通常是个表单，URL 使用**模块名 + `New`**，比如 `/product/new`；组件名则使用**模块名 + `new`** 的方式，比如 `<ProductNew>`。

此页面通常没有必须的参数，如果需要特别的参数，可以使用 query 的模式作为可选参数（通常是为了回填某些参数）。

### 编辑页面

编辑页面是指为某个功能修改数据的页面，通常是个表单，URL 使用**模块名 + 业务ID + `edit`**，比如 `/product/43PvQ8YOVlvkLJGxpjmW/edit`；组件名则使用**模块名 + `Edit`** 的方式，比如 `<ProductEdit>`。

通常需要一个业务ID作为查询数据的必选参数。如果需要特别的参数，可以使用 query 的模式作为可选参数（通常是为了回填某些参数）。

### 其他操作页面

上述页面通常是适用于有 CRUD 全功能的场景，但是在一些场景下，URL 和组件的命名可以适当调整。比如审批，可以用 `/order/mvd89zxbVWvapQZB7JAO/approval` 作为 URL。

还有一些比较固定的页面，应该使用常见的页面进行处理，比如：登录（`/login`）、注册（`/register`）、修改密码（`/change-password`）

## 参数规范

### 必选参数

必选参数用 params，params 在 Router 中会回填至 URL，这给了 URL 语义化上的保证，也符合 RESTful 参数的规范。

**尽量避免隐藏式的 params**，因为它是不可调试的。

### 可选参数

必选参数用 query，params 在 Router 中表示 URL 查询参数（querystring），这是一个在 URL 中可选的参数。

在业务开发中，通常用来定义搜索条件和回填数据。

:::warning
使用 query 回填数据时，需要防范 XSS 攻击。
:::

## 路由模式

Router 一共有两种模式：**hash 模式**和**history 模式**。在项目开发中应该注意不同场景下应该使用不同的模式。

### Hash 模式

Hash 模式使用 URL 的 hash 来模拟一个完整的 URL，表现形式为 `/#/example`。

这种模式下的 URL 比较丑，并且对 SEO 的支持不友好，但是它不需要依赖于服务器的支持。所以通常用于不需要 SEO 的场景或者无法提供服务器支持的场景。

使用 Hash 模式的常见场景有：B端产品、手机APP（capacitor）、桌面APP（electron） 等。

### History 模式

History 模式使用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面，表现形式为 `/example`。

这种模式需要服务器提供支持（否则刷新时会出现404），但是相对的，它的 URL 比较符合搜索引起的抓取习惯，SEO 较友好，并且 URL 也比较美观。

通常C端产品（比如商城）比较适合 History 模式。
