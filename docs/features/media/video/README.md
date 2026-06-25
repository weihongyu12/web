---
description: HTML5 视频元素使用指南，采用免专利优先的编解码策略，支持 AV1、VP9、H.264 等多格式兼容方案
---

# 视频

## 视频元素

视频资源采用了 **“免专利优先，效率其次，兼容性保底”** 的多层次编解码策略：

- 首选 AV1 作为主要编解码器（最高压缩比，支持现代浏览器）
- 其次是 VP9（良好压缩比，广泛支持）
- 再次是专利格式 H.265/HEVC 和 H.264/AVC（作为兜底方案）
- 最后是 VP8 和 Theora（为极少数旧浏览器提供支持）

采用 HTML5 `<source>` 标签提供多格式视频源，按优先级排列：

- WebM 容器格式配合开源编解码器（AV1/VP9/VP8）
- MP4 容器格式配合各类编解码器（AV1/H.265/H.264）
- OGV 格式作为旧浏览器的兜底选项

```html
<video controls width="800" height="450" poster="preview.jpg">
  <!-- 免专利格式（优先） -->
  <source src="video.av1.webm" type='video/webm; codecs="av01.0.05M.08,opus"'>
  <source src="video.av1.mp4" type='video/mp4; codecs="av01.0.05M.08,opus"'>
  <source src="video.vp9.webm" type='video/webm; codecs="vp9,opus"'>

  <!-- 专利格式（兜底） -->
  <source src="video.h265.mp4" type='video/mp4; codecs="hev1.1.6.L93.B0"'>
  <source src="video.h264.mp4" type='video/mp4; codecs="avc1.64001E"'>

  <!-- 老旧浏览器兜底 -->
  <source src="video.vp8.webm" type='video/webm; codecs="vp8,vorbis"'>
  <source src="video.theora.ogv" type='video/ogg; codecs="theora,vorbis"'>

  <p>您的浏览器不支持视频播放，请升级至 Chrome/Firefox/Edge/Safari 等现代浏览器。</p>
</video>
```

:::warning
在实际项目中，可能无法使用所有的编解码器和视频格式。但还是建议按照 **“免专利优先，效率其次，兼容性保底”** 的原则来选择视频格式和编解码器。这样可以确保在大多数现代浏览器中获得最佳性能和兼容性。
:::

## 视频格式与编解码器

在 Web 开发中，视频格式和编解码器的选择对性能、兼容性和用户体验有重大影响。了解视频容器格式和编解码器的区别对于优化视频内容至关重要。

### 视频容器格式

视频容器格式是一种文件格式，用于存储视频数据、音频数据、字幕和元数据。常见的容器格式包括：

1. **WebM**：
   - Google 支持的开源容器格式
   - 专为网络优化，文件体积小，加载速度快
   - 主要用于存储 VP8、VP9 和 AV1 编码的视频
   - 支持 Opus 和 Vorbis 音频编码

2. **MP4 (MPEG-4 Part 14)**：
   - 最广泛使用的视频容器格式
   - 几乎所有设备和平台都支持
   - 可包含多种编解码器，最常见是 H.264，也支持 H.265 和 AV1
   - 通常使用 AAC 音频编码

3. **OGG/OGV**：
   - 完全开源的容器格式
   - 主要用于 Theora 视频编码和 Vorbis 音频编码
   - 作为开源替代方案出现，但现已被 WebM 在大多数场景取代

### 视频编解码器

视频解码是将压缩的视频数据转换回可显示图像序列的过程。浏览器需要内置或调用系统解码器才能播放特定格式的视频。不同的解码算法在压缩效率、画质、处理速度和硬件要求等方面各有优劣。

现代网页应用中常用的视频编解码器按压缩效率排序：

1. **AV1**：
   - 由 Alliance for Open Media 开发的开源、免专利费的视频编码格式
   - 比 VP9 提供约 30% 的压缩效率提升
   - 在 Chrome、Firefox、Edge 和 Safari 17+ 中得到支持
   - 适合高清和 4K 内容，文件体积小

2. **H.265/HEVC**：
   - H.264 的后继者，提供约 50% 的压缩效率提升
   - 需要支付专利许可费用
   - 适合 4K 和 HDR 内容
   - iOS 和 macOS 设备原生支持，但在网页浏览器中支持有限

3. **VP9**：
   - Google 开发的开源、免专利费的视频编解码器
   - 比 H.264 提供约 50% 的压缩效率提升
   - 在大多数现代浏览器中得到广泛支持
   - 适合流媒体服务

4. **H.264/AVC**：
   - 广泛使用的标准，但需支付专利使用费
   - 几乎所有浏览器都支持
   - 常作为兼容性的最后选择

5. **VP8**：
   - 较早的开源编解码器，被 WebM 项目采用
   - 兼容性较好，但压缩效率低于 VP9 和 AV1
  
6. **Theora**：
   - 最早的开源、免专利视频编解码器之一
   - 在旧版浏览器中作为后备选项

### 容器格式与编解码器兼容性表格

| 容器格式 | 支持的视频编解码器 | 支持的音频编解码器 | 浏览器兼容性 | 最适用场景 |
|---------|-----------------|-----------------|------------|------------|
| **WebM** | AV1, VP9, VP8 | Opus, Vorbis | Chrome, Firefox, Edge, Safari 17+ | 高效网络传输，开源项目 |
| **MP4** | AV1, H.265/HEVC, H.264/AVC | AAC, MP3, Opus | 全部现代浏览器 | 通用视频，最佳兼容性 |
| **OGV** | Theora | Vorbis | Firefox, Chrome, Opera | 开源项目，旧浏览器支持 |

### 编解码器性能与兼容性比较

| 编解码器 | 压缩效率 | 质量 | 编码速度 | 解码复杂度 | 浏览器支持 | 专利状态 |
|---------|--------|------|--------|-----------|-----------|---------|
| **AV1** | 极高 | 极高 | 慢 | 中等 | Chrome, Firefox, Edge, Safari 17+ | 免费开源 |
| **H.265/HEVC** | 很高 | 很高 | 中等 | 高 | Safari, 部分移动浏览器 | 需付费许可 |
| **VP9** | 高 | 高 | 中等 | 中等 | Chrome, Firefox, Edge, Safari 14+ | 免费开源 |
| **H.264/AVC** | 中等 | 中等 | 快 | 低 | 几乎所有浏览器 | 需付费许可 |
| **VP8** | 低 | 中等 | 快 | 低 | 大多数现代浏览器 | 免费开源 |
| **Theora** | 很低 | 低 | 很快 | 很低 | Firefox, Chrome (旧版) | 免费开源 |

:::tip
可以使用 [Can I Use](https://caniuse.com/) 检查浏览器对不同视频格式和编解码器的支持情况：

- [AV1](https://caniuse.com/av1)
- [WebM](https://caniuse.com/webm)
- [Ogg/Theora](https://caniuse.com/ogv)
- [MPEG-4/H.264](https://caniuse.com/mpeg4)
- [HEVC/H.265](https://caniuse.com/hevc)
:::

### 视频转码

使用 [FFmpeg](https://ffmpeg.org/) 进行视频转码，确保视频在不同浏览器和设备上兼容：

```bash
# 生成 AV1 WebM（FFmpeg）
ffmpeg -i input.mp4 -c:v libaom-av1 -crf 30 -cpu-used 4 -c:a libopus -b:a 128k output.av1.webm

# 生成 AV1 MP4（SVT-AV1 加速编码）
ffmpeg -i input.mp4 -c:v libsvtav1 -preset 6 -crf 35 -c:a aac -b:a 128k output.av1.mp4

# 生成 VP9 WebM
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -row-mt 1 -c:a libopus output.vp9.webm

# 生成 VP8 WebM（兼容旧设备）
ffmpeg -i input.mp4 -c:v libvpx -crf 30 -c:a libvorbis output.vp8.webm
```

## 最佳实践

### 响应式视频设计

确保视频在各种设备上正常显示：

```css
video {
  max-width: 100%;
  height: auto;
}
```

配合 CSS media queries 可以根据屏幕尺寸调整视频尺寸和质量。

### 性能优化

- **适当的编码参数**: 选择合适的比特率、分辨率和帧率
- **自适应码率流**: 根据用户带宽提供不同质量版本
- **懒加载**: 当视频接近视口时才加载
- **视频压缩**: 使用现代编解码器（如 AV1）减小文件大小
- **CDN 分发**: 利用内容分发网络提高加载速度

### 用户体验

- 提供 controls 让用户控制播放
- 使用 poster 属性提供视频预览图
- 避免自动播放有声视频
- 在移动设备上使用 playsinline 提供更好的体验

### 无障碍性考虑

#### 字幕和转录文本

- **WebVTT 字幕**: 使用 `<track>` 元素提供多语言字幕和描述文本
  ```html
  <video controls width="800" height="450">
    <source src="video.webm" type="video/webm">
    <track kind="subtitles" src="captions.zh.vtt" srclang="zh" label="中文" default>
    <track kind="subtitles" src="captions.en.vtt" srclang="en" label="English">
    <track kind="descriptions" src="descriptions.zh.vtt" srclang="zh" label="视频描述">
  </video>
  ```

- **提供文字稿**: 在视频下方或通过链接提供完整文字稿，帮助使用辅助技术的用户和搜索引擎

#### 键盘可访问性

- 确保所有视频控制可通过键盘操作
- 实现自定义控件时遵循以下规范:
  - 使用正确的 `tabindex` 值确保合理的导航顺序 
  - 为每个控件提供清晰的焦点状态
  - 实现标准的键盘快捷键 (空格暂停/播放，左右箭头快退/快进等)

#### ARIA 属性和角色

- 为自定义视频播放器添加适当的 ARIA 角色和属性:
  ```html
  <div role="application" aria-label="视频播放器">
    <video aria-describedby="video-description"></video>
    <div id="video-description" class="sr-only">
      本视频展示了产品的主要功能和使用方法
    </div>
    <button aria-label="播放视频" aria-pressed="false">播放</button>
  </div>
  ```

#### 自动播放和动画考虑

- 遵循 WCAG 2.1 指南，避免自动播放有声内容
- 为光敏性癫痫患者考虑，避免频闪内容 (每秒不超过3次闪烁)
- 提供暂停/停止所有动画内容的选项

#### 颜色和对比度

- 确保视频控件有足够的颜色对比度 (WCAG AA级至少4.5:1)
- 避免仅使用颜色传达信息，同时使用形状、文本或图标

#### 遵循标准和法规

- 遵循 WCAG 2.1 AA 级或更高标准
- 在某些地区可能需要遵循特定法规:
  - 美国: ADA 和 Section 508 合规
  - 欧盟: EN 301 549
  - 中国: GB/T 29262-2012
