# CSS 规范

## 总体原则

### 样式技术优先级
1. **优先使用 UI 组件库** - 使用团队统一的组件库（如 Ant Design、Element Plus 等）
2. **其次使用 Tailwind CSS** - 利用原子化CSS类快速构建界面和微调样式
3. **再次使用原生 CSS/SCSS** - 处理组件库和Tailwind无法覆盖的场景，需要复杂逻辑、嵌套或主题系统时使用

### 代码质量要求
- 保持代码简洁、可读、可维护
- 避免冗余和重复代码
- 优先使用现代CSS语法和最佳实践
- 确保跨浏览器兼容性

## 一、UI 组件库使用规范

### 1.1 组件选择原则
优先使用团队统一的UI组件库，确保界面一致性和开发效率。

**正例：**
```jsx
// 使用组件库的按钮
import { Button } from '@/components/ui/button'

<Button variant="primary" size="lg" className="mt-4">
  提交表单
</Button>
```

**反例：**
```jsx
// 从零开始自定义按钮
<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
  提交表单
</button>
```

### 1.2 组件库样式扩展
当组件库样式不满足需求时，优先使用组件库提供的定制方式（如className、style属性），再考虑Tailwind CSS微调。

**正例：**
```jsx
// 使用组件库的扩展方式
<Card className="shadow-lg border-2 border-blue-200">
  <CardContent className="p-6">
    Content
  </CardContent>
</Card>
```

### 1.3 避免破坏组件库默认行为
不要覆盖组件库的核心样式，避免影响组件的交互和可访问性。

**正例：**
```jsx
<Button className="w-full">  {/* 只修改宽度 */}
  Full Width Button
</Button>
```

**反例：**
```jsx
<Button className="!bg-red-500 !border-none !p-0">  {/* 破坏了按钮的默认样式 */}
  Broken Button
</Button>
```

## 二、Tailwind CSS 规范

### 2.1 类名顺序
按照功能分组排列类名，建议顺序：
1. 布局 (position, display, flex, grid)
2. 盒模型 (width, height, padding, margin)
3. 外观 (color, background, border)
4. 交互 (hover, focus, active)

**正例：**
```html
<div class="flex items-center justify-center w-full h-64 p-4 bg-blue-500 border-2 border-gray-300 rounded-lg hover:bg-blue-600 focus:outline-none">
  Content
</div>
```

**反例：**
```html
<div class="hover:bg-blue-600 bg-blue-500 p-4 flex w-full border-2 items-center h-64 rounded-lg justify-center border-gray-300 focus:outline-none">
  Content
</div>
```

### 2.2 在组件库基础上使用
优先使用设计系统中的预定义值，仅在必要时使用任意值。

**正例：**
```html
<div class="w-64 h-32 p-4 text-lg">Content</div>
```

**反例：**
```html
<div class="w-[256px] h-[128px] p-[16px] text-[18px]">Content</div>
```

### 2.4 避免自定义类名冲突
使用Tailwind类时，避免创建与内置类名冲突的自定义类名。

**正例：**
```html
<div class="custom-card bg-white p-6">Content</div>
```

**反例：**
```html
<div class="bg-white p-6">Content</div>
<style>
.bg-white { background: yellow; } /* 冲突！ */
</style>
```

## 三、CSS 通用规范

### 3.1 命名规范
使用kebab-case命名法，所有类名、ID、自定义属性名都应使用小写字母和连字符。

**正例：**
```css
.header-navigation { }
.user-profile-card { }
#main-content { }
--primary-color: #3b82f6;
```

**反例：**
```css
.headerNavigation { }
.UserProfileCard { }
#mainContent { }
--primaryColor: #3b82f6;
```

### 3.2 选择器规范

#### 避免过度嵌套
选择器嵌套不超过4层，避免过高的特异性。

**正例：**
```css
.card { }
.card .header { }
.card .header .title { }
```

**反例：**
```css
.page .container .sidebar .widget .card .header .title { }
```

#### 选择器类型限制
- 类选择器：最多4个
- ID选择器：避免使用（最多0个）
- 属性选择器：最多2个
- 组合选择器：最多4个
- 通用选择器：最多1个

**正例：**
```css
.btn.btn-primary { }
.form [type="email"] { }
```

**反例：**
```css
#header .nav .item.active.selected.highlighted.special { }
```

#### 类型选择器限制
避免使用类型选择器限定类选择器。

**正例：**
```css
.warning { color: orange; }
```

**反例：**
```css
div.warning { color: orange; }
```

### 3.3 属性值规范

#### 颜色值格式
- 十六进制颜色使用小写字母
- 优先使用短格式
- 现代颜色函数使用新语法

**正例：**
```css
.element {
  color: #fff;
  background-color: #f3f4f6;
  border-color: hsl(220 14% 96%);
  box-shadow: 0 0 0 1px rgb(0 0 0 / 10%);
}
```

**反例：**
```css
.element {
  color: #FFFFFF;
  background-color: #F3F4F6;
  border-color: hsl(220, 14%, 96%);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}
```

#### 长度单位
- 零值不添加单位
- 保留自定义属性中的单位
- 优先使用相对单位

**正例：**
```css
.element {
  margin: 0;
  padding: 1rem 0.5rem;
  --gap: 0px; /* 自定义属性保留单位 */
}
```

**反例：**
```css
.element {
  margin: 0px;
  padding: 16px 8px;
}
```

#### 字体族名称
字体名称在必要时使用引号。

**正例：**
```css
.element {
  font-family: "Times New Roman", serif;
  font-family: system-ui, sans-serif;
}
```

### 3.4 函数和URL
- 函数名使用小写
- URL始终使用引号

**正例：**
```css
.element {
  background-image: url("./image.jpg");
  transform: rotate(45deg);
}
```

**反例：**
```css
.element {
  background-image: url(./image.jpg);
  transform: ROTATE(45deg);
}
```

### 3.5 重要性声明
避免使用 `!important`，优先通过提高选择器特异性解决样式优先级问题。

**正例：**
```css
.modal.is-open { display: block; }
```

**反例：**
```css
.modal { display: block !important; }
```

### 3.6 属性简写
避免不必要的简写属性冗余。

**正例：**
```css
.element {
  margin: 1rem;
  padding: 1rem 0.5rem;
}
```

**反例：**
```css
.element {
  margin: 1rem 1rem 1rem 1rem;
  padding: 1rem 0.5rem 1rem 0.5rem;
}
```

## 四、CSS 格式化规范

### 4.1 缩进和空格
- 使用2个空格缩进
- 冒号后添加一个空格
- 逗号后添加一个空格
- 运算符前后添加空格

**正例：**
```css
.element {
  padding: 1rem 0.5rem;
  font-family: "Helvetica Neue", Arial, sans-serif;
  calc(100% - 2rem);
}

@media (min-width: 768px) {
  .element { padding: 2rem; }
}
```

### 4.2 换行和分号
- 每个声明独占一行
- 始终在声明末尾添加分号
- 块结束大括号前换行

**正例：**
```css
.element {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

**反例：**
```css
.element { display: flex; align-items: center; justify-content: space-between }
```

### 4.3 引号使用
统一使用双引号。

**正例：**
```css
.element {
  content: "Hello World";
  background-image: url("./image.jpg");
}

.element[data-type="button"] { }
```

### 4.4 空行规范
- 文件首行不为空行
- 文件末尾保留换行符
- 规则块之间添加空行
- 去除行末空白字符
- 避免连续空行

**正例：**
```css
.header {
  background: white;
}

.main {
  padding: 2rem;
}

@media (min-width: 768px) {
  .main {
    padding: 3rem;
  }
}
```

## 五、CSS 属性排序

按照以下顺序组织CSS属性：

1. **组合规则** (CSS Modules的composes)
2. **all属性**
3. **定位** (position, top, right, bottom, left, z-index等)
4. **显示模式** (box-sizing, display)
5. **弹性盒子** (flex相关属性)
6. **网格布局** (grid相关属性)
7. **间距** (gap, row-gap, column-gap)
8. **对齐** (align-*, justify-*)
9. **顺序** (order)
10. **盒模型** (width, height, padding, margin, overflow等)
11. **排版** (font-*, color, text-*, line-height等)
12. **交互** (appearance, cursor, pointer-events等)
13. **背景和边框** (background-*, border-*, outline等)
14. **遮罩** (mask相关属性)
15. **SVG属性**
16. **过渡和动画** (transition, animation, transform等)
17. **分页媒体** (break-*, orphans, widows)

**正例：**
```css
.card {
  position: relative;
  z-index: 1;
  
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  width: 100%;
  max-width: 24rem;
  padding: 1.5rem;
  margin: 0 auto;
  
  font-family: system-ui, sans-serif;
  color: #374151;
  
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
  
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
}
```

## 六、SCSS 特定规范

### 6.1 变量命名
SCSS变量使用kebab-case命名，函数和混合器同样使用kebab-case。

**正例：**
```scss
$primary-color: #3b82f6;
$border-radius-lg: 0.5rem;

@function calculate-rem($px) {
  @return #{$px / 16}rem;
}

@mixin button-style($bg-color) {
  background-color: $bg-color;
  border: none;
  padding: 0.75rem 1rem;
}
```

**反例：**
```scss
$primaryColor: #3b82f6;
$BORDER_RADIUS_LG: 0.5rem;

@function calculateRem($px) { }
@mixin ButtonStyle($bgColor) { }
```

### 6.2 嵌套规范
- 避免不必要的选择器嵌套分组
- 合理使用@else语句，避免额外空行
- 条件语句的括号前添加空格

**正例：**
```scss
@if $theme == dark {
  background: black;
} @else if $theme == light {
  background: white;
} @else {
  background: gray;
}
```

**反例：**
```scss
@if $theme == dark {
  background: black;
}

@else if$theme == light {
  background: white;
}

@else {
  background: gray;
}
```

### 6.3 操作符规范
SCSS操作符前后不允许换行，必须添加空格。

**正例：**
```scss
$width: $base-width + 2rem;
$height: $base-height - 1rem;
```

**反例：**
```scss
$width: $base-width+2rem;
$height: $base-width
+ 2rem;
```

### 6.4 混合器和函数调用
函数和混合器调用的括号前不添加空格。

**正例：**
```scss
@include button-style($primary-color);
width: calculate-rem(16);
```

**反例：**
```scss
@include button-style ($primary-color);
width: calculate-rem (16);
```

### 6.5 加载语句
- 使用字符串语法导入
- 省略前导下划线和文件扩展名

**正例：**
```scss
@import "variables";
@import "mixins";
@use "functions";
```

**反例：**
```scss
@import url("_variables.scss");
@import url(_mixins.scss);
```

## 七、注释规范

### 7.1 注释格式
- 注释内容前后添加空格
- 多行注释每行都要有适当的间距
- 在复杂逻辑前添加解释性注释

**正例：**
```css
/* 主导航样式 */
.nav { }

/* 
 * 响应式网格布局
 * 在移动设备上显示单列，桌面设备上显示多列
 */
.grid {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 7.2 自定义属性注释
为复杂的CSS自定义属性添加说明注释。

**正例：**
```css
.component {
  /* 组件内部间距，可通过外部覆盖 */
  --component-padding: 1rem;
  /* 主题色，支持亮暗模式切换 */
  --component-bg: light-dark(white, #1a1a1a);
}
```

## 八、媒体查询规范

### 8.1 媒体查询格式
- 媒体特性名称使用小写
- 括号内不添加空格
- 优先使用现代范围语法

**正例：**
```css
@media (min-width: 768px) {
  .element { padding: 2rem; }
}

@media (768px <= width < 1024px) {
  .element { font-size: 1.125rem; }
}
```

**反例：**
```css
@media ( MIN-WIDTH: 768px ) {
  .element { padding: 2rem; }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .element { font-size: 1.125rem; }
}
```

## 九、性能和维护性建议

### 9.1 组件库优先策略
充分利用组件库的设计系统，保持界面一致性，减少自定义样式的维护成本。

### 9.2 避免深层嵌套
保持选择器的简洁性，避免过深的嵌套影响性能和可维护性。

### 9.3 使用语义化命名
类名应该反映内容的含义而非外观，提高代码的可维护性。

### 9.4 组件化思维
将重复的样式模式提取为可复用的组件类，减少代码重复。

### 9.5 渐进增强
优先保证基础功能，然后通过CSS增强用户体验。
