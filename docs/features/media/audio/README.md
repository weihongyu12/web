# 音频

```html
<audio controls preload="metadata">
  <!-- 免专利格式（优先） -->
  <source src="audio.opus.ogg" type="audio/ogg; codecs=opus">  <!-- Ogg容器Opus -->
  <source src="audio.opus.webm" type="audio/webm; codecs=opus"> <!-- WebM容器Opus -->
  <source src="audio.vorbis.ogg" type="audio/ogg; codecs=vorbis">

  <!-- 无损格式（按需添加） -->
  <source src="audio.flac" type="audio/flac">
  <source src="audio.flac.ogg" type="audio/ogg; codecs=flac">

  <!-- 专利格式（兜底） -->
  <source src="audio.aac.m4a" type="audio/mp4">
  <source src="audio.mp3" type="audio/mpeg">

  <p>您的浏览器不支持HTML5音频，请下载文件或升级浏览器。</p>
</audio>
```

```bash
# 生成 Opus（Ogg容器）
ffmpeg -i input.wav -c:a libopus -b:a 128k -vn audio.opus.ogg

# 生成 Opus（WebM容器）
ffmpeg -i input.wav -c:a libopus -b:a 128k -vn audio.opus.webm

# 生成 Vorbis
ffmpeg -i input.wav -c:a libvorbis -q:a 5 -vn audio.vorbis.ogg

# 生成 AAC（MP4容器）
ffmpeg -i input.wav -c:a aac -b:a 192k -vn audio.aac.m4a

# 生成 FLAC无损
ffmpeg -i input.wav -c:a flac -compression_level 8 -vn audio.flac
```