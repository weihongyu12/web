---
sidebar_position: 4
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TOCInline from '@theme/TOCInline';

# 参考配置

<TOCInline toc={toc} />

## package.json

```json
{
  "scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js",
    "lint": "npm run lint:js && npm run lint:css",
    "lint:js": "eslint ./src/**/*.{js,jsx,ts,tsx}",
    "lint:css": "stylelint ./src/**/*.{css,scss,jsx,tsx}",
    "format": "npm run format:js && npm run format:css",
    "format:js": "npm run lint:js -- --fix",
    "format:css": "npm run lint:css -- --fix",
    "styleguidist": "styleguidist server",
    "styleguidist:build": "styleguidist build",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s",
    "analyze": "source-map-explorer 'build/static/js/*.js'"
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,json,css,scss}": ["npm run format", "git add"]
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

## Webpack/Vite

:::tip
- [https://webpack.js.org/configuration/](https://webpack.js.org/configuration/)
:::

### Preload/Prefetch 配置

```js
// webpack.config.js

// $ pnpm install @vue/preload-webpack-plugin --save-dev
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');

module.exports = {
  plugins: [
    // 启用preload
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'initial',
      fileBlacklist: [
        /\.map$/,
        /hot-update\.js$/,
      ],
    }),
    // 启用prefetch
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      include: 'asyncChunks'
    }),
  ],
};
```

### Brotli & Gzip 预压缩配置

<Tabs>
  <TabItem value="webpack" label="Webpack" default>
```js
// webpack.config.js

// $ pnpm install compression-webpack-plugin --save-dev
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [
    // brotli 预压缩
    new CompressionPlugin({
      filename: '[path][base].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(html|js|css|svg|ico|xml|json|wasm|eot|otf|ttf|bmp|md)$/,
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 0.8,
    }),
    // gzip 预压缩
    new CompressionPlugin({
      filename: '[path][base].gz[query]',
      algorithm: 'gzip',
      test: /\.(html|js|css|svg|ico|xml|json|wasm|eot|otf|ttf|bmp|md)$/,
      compressionOptions: { level: 9 },
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};
```
  </TabItem>
  <TabItem value="vite" label="Vite">
```ts
// vite.config.ts
import { defineConfig } from 'vite';

// $ pnpm install vite-plugin-compression --save-dev
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    // brotli 预压缩
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // gzip 预压缩
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
});
```
  </TabItem>
</Tabs>

### Crossorigin & SRI 配置

<Tabs>
  <TabItem value="webpack" label="Webpack" default>
```js
// webpack.config.js

// $ pnpm install webpack-subresource-integrity --save-dev
const { SubresourceIntegrityPlugin } = require('webpack-subresource-integrity');

module.exports = {
  plugins: [
    new SubresourceIntegrityPlugin({
      hashFuncNames: ['sha384'],
    }),
  ],
};
```
  </TabItem>
  <TabItem value="vite" label="Vite">
```ts
import { defineConfig } from 'vite';

// $ pnpm install vite-plugin-sri --save-dev
import sri from 'vite-plugin-sri';

export default defineConfig({
  plugins: [
    sri({
      algorithms: ['sha384'],
      crossorigin: 'anonymous',
      modulePreload: true,
      assets: true,
    }),
  ],
});
```
  </TabItem>
</Tabs>

### Imagemin 图片压缩配置 & 图片格式转换配置

<Tabs>
  <TabItem value="webpack" label="Webpack" default>
```js
// webpack.config.js

// pnpm install image-minimizer-webpack-plugin imagemin sharp --save-dev
//
// 无损压缩（推荐）：
// pnpm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
//
// 有损压缩：
// pnpm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo --save-dev
//
// WebP格式转化（推荐）：
// pnpm install imagemin-webp --save-dev
//
// AVIF格式转化（推荐，基于sharp）：
// pnpm install sharp --save-dev
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // 使用自定义选项进行无损压缩优化
            plugins: [
              ['gifsicle', { optimizationLevel: 3, interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 7 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: 'http://www.w3.org/2000/svg' },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
        generator: [
          {
            // 可以使用“?as=webp”生成器，生成 WebP 图片格式
            preset: 'webp',
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: [['imagemin-webp', { quality: 100, lossless: true }]],
            },
          },
          {
            // 可以使用“?as=avif”生成器，生成 WebP 图片格式
            preset: 'avif',
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: {
                avif: { lossless: false },
              },
            },
          },
        ],
      }),
    ],
  },
};
```
  </TabItem>
  <TabItem value="vite" label="Vite">
```ts
// vite.config.ts
import { defineConfig } from 'vite';

// $ pnpm install vite-plugin-image-optimizer vite-imagetools svgo --save-dev
import { ViteImageOptimizer as imageOptimizer } from 'vite-plugin-image-optimizer';
import { imagetools } from 'vite-imagetools';
import type { PluginConfig } from 'svgo';

const svgoPlugins: PluginConfig[] = [
  {
    name: 'preset-default',
    params: {
      overrides: {
        removeViewBox: false,
      },
    },
  },
  'sortAttrs',
  {
    name: 'addAttributesToSVGElement',
    params: {
      attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
    },
  },
];

export default defineConfig({
  plugins: [
    imagetools(),
    imageOptimizer({
      svg: {
        multipass: true,
        plugins: [...svgoPlugins],
      },
      avif: {
        quality: 100,
        lossless: true,
      },
      webp: {
        quality: 100,
        lossless: true,
      },
      png: {
        quality: 100,
        progressive: true,
      },
      jpeg: {
        quality: 100,
        progressive: true,
      },
      jpg: {
        quality: 100,
        progressive: true,
      },
    }),
  ],
});
```
  </TabItem>
</Tabs>

## Nginx

:::tip
可参考 [HTML5 Boilerplate nginx 配置](https://github.com/h5bp/server-configs-nginx)
:::

<details>
<summary>完整版 nginx.conf 配置</summary>

```nginx
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
# include /usr/share/nginx/modules/*.conf;

load_module /usr/lib/nginx/modules/ngx_http_brotli_filter_module.so;
load_module /usr/lib/nginx/modules/ngx_http_brotli_static_module.so;
load_module /usr/lib/nginx/modules/ngx_http_modsecurity_module.so;

events {
    worker_connections 1024;
}

http {
    server_tokens off;

    charset       utf-8;
    charset_types text/css text/plain text/vnd.wap.wml text/javascript text/markdown text/calendar text/x-component text/vcard text/cache-manifest text/vtt application/json application/manifest+json;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See https://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    set $compression_types
      application/atom+xml
      application/geo+json
      application/javascript
      application/x-javascript
      application/json
      application/ld+json
      application/manifest+json
      application/rdf+xml
      application/rss+xml
      application/vnd.ms-fontobject
      application/wasm
      application/x-web-app-manifest+json
      application/xhtml+xml
      application/xml
      font/eot
      font/otf
      font/ttf
      image/bmp
      image/svg+xml
      image/vnd.microsoft.icon
      image/x-icon
      text/cache-manifest
      text/calendar
      text/css
      text/javascript
      text/markdown
      text/plain
      text/xml
      text/vcard
      text/vnd.rim.location.xloc
      text/vtt
      text/x-component
      text/x-cross-domain-policy;

    map $sent_http_content_type $cache_control {
        default                           "public, immutable, stale-while-revalidate";

        # No content
        ""                                "no-store";

        # Manifest files
        ~*application/manifest\+json      "public";
        ~*text/cache-manifest             ""; # `no-cache` (*)

        # Assets
        ~*image/svg\+xml                  "public, immutable, stale-while-revalidate";

        # Data interchange
        ~*application/(atom|rdf|rss)\+xml "public, stale-while-revalidate";

        # Documents
        ~*text/html                       "private, must-revalidate";
        ~*text/markdown                   "private, must-revalidate";
        ~*text/calendar                   "private, must-revalidate";

        # Data
        ~*json                            ""; # `no-cache` (*)
        ~*xml                             ""; # `no-cache` (*)
    }

    map $sent_http_content_type $expires {
        # Default: Fallback
        default                       1y;

        # Default: No content
        ""                            off;

        # Specific: Assets
        ~*image/svg\+xml              max;
        ~*image/vnd.microsoft.icon    1w;
        ~*image/x-icon                1w;

        # Specific: Manifests
        ~*application/manifest\+json  1w;
        ~*text/cache-manifest         epoch;

        # Specific: Data interchange
        ~*application/atom\+xml       1h;
        ~*application/rdf\+xml        1h;
        ~*application/rss\+xml        1h;

        # Specific: Documents
        ~*text/html                   epoch;
        ~*text/markdown               epoch;
        ~*text/calendar               epoch;

        # Specific: Other
        ~*text/x-cross-domain-policy  1w;

        # Generic: Data
        ~*json                        epoch;
        ~*xml                         epoch;

        # Generic: WebAssembly
        ~*application/wasm            max;

        # Generic: Assets
        ~*application/javascript      max;
        ~*application/x-javascript    max;
        ~*text/javascript             max;
        ~*text/css                    max;

        # Generic: Medias
        ~*audio/                      max;
        ~*image/                      max;
        ~*video/                      max;
        ~*font/                       max;
    }

    map $sent_http_content_type $x_xss_protection {
        ~*text/html "1; mode=block";
    }

    map $sent_http_content_type $x_frame_options {
        ~*text/html DENY;
    }

    map $sent_http_content_type $content_security_policy {
        ~*text/(html|javascript)|application/pdf|xml "default-src 'self' 'https://*.example.com'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests";
    }

    map $sent_http_content_type $permissions_policy {
        ~*text/(html|javascript)|application/pdf|xml "accelerometer=(),autoplay=(),browsing-topics=(),camera=(),display-capture=(),document-domain=(),encrypted-media=(),fullscreen=(),geolocation=(),gyroscope=(),magnetometer=(),microphone=(),midi=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),sync-xhr=(self),usb=(),web-share=(),xr-spatial-tracking=()";
    }

    map $sent_http_content_type $referrer_policy {
        ~*text/(css|html|javascript)|application\/pdf|xml "strict-origin-when-cross-origin";
    }

    map $sent_http_content_type $coep_policy {
        ~*text/(html|javascript)|application/pdf|xml "require-corp";
    }

    map $sent_http_content_type $coop_policy {
        ~*text/(html|javascript)|application/pdf|xml "same-origin";
    }

    map $sent_http_content_type $corp_policy {
        ~*text/(html|javascript)|application/pdf|xml "same-origin";
    }

    map $sent_http_content_type $cors {
        # Images
        ~*image/ "*";

        # Web fonts
        ~*font/                         "*";
        ~*application/vnd.ms-fontobject "*";
        ~*application/x-font-ttf        "*";
        ~*application/font-woff         "*";
        ~*application/x-font-woff       "*";
        ~*application/font-woff2        "*";
    }

    open_file_cache          max=1000 inactive=20s;
    open_file_cache_valid    30s;
    open_file_cache_min_uses 2;
    open_file_cache_errors   on;

    brotli_static     on;
    brotli            on;
    brotli_comp_level 11;
    brotli_types      $compression_types;

    gzip_static     on;
    gzip            on;
    gzip_comp_level 9;
    gzip_min_length 256;
    gzip_proxied    any;
    gzip_types      $compression_types;
    gzip_vary       on;

    expires $expires;
    etag    on;

    modsecurity            on;
    modsecurity_rules_file /etc/modsecurity.d/modsecurity.conf;
    
    ssl_protocols TLSv1.3;
    ssl_ecdh_curve X25519:prime256v1:secp384r1;
    ssl_prefer_server_ciphers off;

    # uncomment to enable if ssl_protocols includes TLSv1.2 or earlier;
    # see also ssl_session_ticket_key alternative to stateful session cache
    #ssl_session_timeout 1d;
    #ssl_session_cache shared:MozSSL:10m;  # about 40000 sessions

    # OCSP stapling
    ssl_stapling on;
    ssl_stapling_verify on;

    # verify chain of trust of OCSP response using Root CA and Intermediate certs
    ssl_trusted_certificate /path/to/root_CA_cert_plus_intermediates;

    # replace with the IP address of your resolver;
    # async 'resolver' is important for proper operation of OCSP stapling
    resolver 127.0.0.1;

    # If certificates are marked OCSP Must-Staple, consider managing the
    # OCSP stapling cache with an external script, e.g. certbot-ocsp-fetcher

    server {
        listen 80 default_server;
        listen [::]:80 default_server;

        return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;
        server_name  _;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;
        
        http2 on;
        http2_push_preload on;
        
        ssl_certificate /path/to/signed_cert_plus_intermediates;
        ssl_certificate_key /path/to/private_key;
    
        # HSTS (ngx_http_headers_module is required) (63072000 seconds)
        add_header Strict-Transport-Security "max-age=63072000" always;
        
        add_header Cache-Control $cache_control;

        add_header Content-Security-Policy $content_security_policy always;
        add_header Referrer-Policy $referrer_policy always;
        add_header Permissions-Policy $permissions_policy always;
        add_header Cross-Origin-Embedder-Policy $coep_policy always;
        add_header Cross-Origin-Opener-Policy $coop_policy always;
        add_header Cross-Origin-Resource-Policy $corp_policy always;
        add_header X-Content-Type-Options nosniff always;
        add_header X-Frame-Options $x_frame_options always;
        add_header X-XSS-Protection $x_xss_protection always;
        add_header X-Download-Options noopen;

        add_header Access-Control-Allow-Origin $cors;
        add_header Timing-Allow-Origin "*";

        location / {
        }

        location ~* /\.(?!well-known\/) {
            deny all;
        }

        location ~* (?:#.*#|\.(?:bak|conf|dist|fla|in[ci]|log|orig|psd|sh|sql|sw[op])|~)$ {
            deny all;
        }

        error_page 404 /404.html;
            location = /404.html {
        }
    }
}
```

</details>

### 伪静态配置

```
# nginx.conf
server {
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

:::warning
如果使用 History 路由才需要伪静态配置
:::

### 缓存配置

:::tip
- [ngx_http_headers_module](https://nginx.org/en/docs/http/ngx_http_headers_module.html)
- [ngx_http_core_module](https://nginx.org/en/docs/http/ngx_http_core_module.html)
:::

:::tip
- [Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)
- [Expires](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Expires)
- [ETag](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Etag)
:::

```
# nginx.conf
http {
    map $sent_http_content_type $cache_control {
        default                           "public, immutable, stale-while-revalidate";

        # No content
        ""                                "no-store";

        # Manifest files
        ~*application/manifest\+json      "public";
        ~*text/cache-manifest             ""; # `no-cache` (*)

        # Assets
        ~*image/svg\+xml                  "public, immutable, stale-while-revalidate";

        # Data interchange
        ~*application/(atom|rdf|rss)\+xml "public, stale-while-revalidate";

        # Documents
        ~*text/html                       "private, must-revalidate";
        ~*text/markdown                   "private, must-revalidate";
        ~*text/calendar                   "private, must-revalidate";

        # Data
        ~*json                            ""; # `no-cache` (*)
        ~*xml                             ""; # `no-cache` (*)
    }

    map $sent_http_content_type $expires {
        # Default: Fallback
        default                       1y;

        # Default: No content
        ""                            off;

        # Specific: Assets
        ~*image/svg\+xml              max;
        ~*image/vnd.microsoft.icon    1w;
        ~*image/x-icon                1w;

        # Specific: Manifests
        ~*application/manifest\+json  1w;
        ~*text/cache-manifest         epoch;

        # Specific: Data interchange
        ~*application/atom\+xml       1h;
        ~*application/rdf\+xml        1h;
        ~*application/rss\+xml        1h;

        # Specific: Documents
        ~*text/html                   epoch;
        ~*text/markdown               epoch;
        ~*text/calendar               epoch;

        # Specific: Other
        ~*text/x-cross-domain-policy  1w;

        # Generic: Data
        ~*json                        epoch;
        ~*xml                         epoch;

        # Generic: WebAssembly
        ~*application/wasm            max;

        # Generic: Assets
        ~*application/javascript      max;
        ~*application/x-javascript    max;
        ~*text/javascript             max;
        ~*text/css                    max;

        # Generic: Medias
        ~*audio/                      max;
        ~*image/                      max;
        ~*video/                      max;
        ~*font/                       max;
    }

    expires $expires;
    etag    on;

    add_header Cache-Control $cache_control;
}
```

### HTTP/2 配置

:::tip
- [ngx_http_v2_module](https://nginx.org/en/docs/http/ngx_http_v2_module.html)
- [ngx_http_ssl_module](https://nginx.org/en/docs/http/ngx_http_ssl_module.html)
:::

```
# nginx.conf
http {
    ssl_protocols TLSv1.3;
    ssl_ecdh_curve X25519:prime256v1:secp384r1;
    ssl_prefer_server_ciphers off;

    # uncomment to enable if ssl_protocols includes TLSv1.2 or earlier;
    # see also ssl_session_ticket_key alternative to stateful session cache
    #ssl_session_timeout 1d;
    #ssl_session_cache shared:MozSSL:10m;  # about 40000 sessions

    # OCSP stapling
    ssl_stapling on;
    ssl_stapling_verify on;

    # verify chain of trust of OCSP response using Root CA and Intermediate certs
    ssl_trusted_certificate /path/to/root_CA_cert_plus_intermediates;

    # replace with the IP address of your resolver;
    # async 'resolver' is important for proper operation of OCSP stapling
    resolver 127.0.0.1;

    # If certificates are marked OCSP Must-Staple, consider managing the
    # OCSP stapling cache with an external script, e.g. certbot-ocsp-fetcher
    
    server {
        listen 80 default_server;
        listen [::]:80 default_server;

        return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;
    
        http2 on;
        http2_push_preload on;
        
        ssl_certificate /path/to/signed_cert_plus_intermediates;
        ssl_certificate_key /path/to/private_key;
    
        # HSTS (ngx_http_headers_module is required) (63072000 seconds)
        add_header Strict-Transport-Security "max-age=63072000" always;
    }
}

```

:::tip
开启 HTTP/2 必须开启 HTTPS，建议 HTTPS 使用 TLS v1.3 协议。

可以参考 [Mozilla SSL 配置生成器](https://ssl-config.mozilla.org/) 生成配置
:::

### Brotli & GZIP 配置

:::tip
- [ngx_brotli](https://github.com/google/ngx_brotli)
- [ngx_http_gzip_module](https://nginx.org/en/docs/http/ngx_http_gzip_module.html)
- [ngx_http_gzip_static_module](https://nginx.org/en/docs/http/ngx_http_gzip_static_module.html)
:::

```
# nginx.conf
load_module /usr/lib/nginx/modules/ngx_http_brotli_filter_module.so;
load_module /usr/lib/nginx/modules/ngx_http_brotli_static_module.so;

http {
  $compression_types
    application/atom+xml
    application/geo+json
    application/javascript
    application/x-javascript
    application/json
    application/ld+json
    application/manifest+json
    application/rdf+xml
    application/rss+xml
    application/vnd.ms-fontobject
    application/wasm
    application/x-web-app-manifest+json
    application/xhtml+xml
    application/xml
    font/eot
    font/otf
    font/ttf
    image/bmp
    image/svg+xml
    image/vnd.microsoft.icon
    image/x-icon
    text/cache-manifest
    text/calendar
    text/css
    text/javascript
    text/markdown
    text/plain
    text/xml
    text/vcard
    text/vnd.rim.location.xloc
    text/vtt
    text/x-component
    text/x-cross-domain-policy;

  brotli_static     on;
  brotli            on;
  brotli_comp_level 11;
  brotli_types      $compression_types;

  gzip_static     on;
  gzip            on;
  gzip_comp_level 9;
  gzip_min_length 256;
  gzip_proxied    any;
  gzip_types      $compression_types;
  gzip_vary       on;
}
```

:::tip
启用 Brotli 应该先安装 [ngx_brotli](https://github.com/google/ngx_brotli) 模块，该模块并非 nginx 官方模块。同时，Brotli 只能在 HTTPS 下运行。
:::

### 安全配置

:::tip
- [Content-Security-Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy)
- [Subresource Integrity](https://developer.mozilla.org/zh-CN/docs/Web/Security/Subresource_Integrity)
- [Referrer-Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referrer-Policy)
- [Permissions-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy)
- [Access-Control-Allow-Origin](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)
- [Timing-Allow-Origin](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Timing-Allow-Origin)
- [Cross-Origin-Embedder-Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy)
- [Cross-Origin-Opener-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy)
- [Cross-Origin-Resource-Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy)
- [X-Content-Type-Options](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-Content-Type-Options)
- [X-Frame-Options](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/X-Frame-Options)
- [X-XSS-Protection](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-XSS-Protection)
- X-Download-Options
:::

:::tip
- [ModSecurity](https://github.com/SpiderLabs/ModSecurity)
- [ngx_modsecurity](https://github.com/SpiderLabs/ModSecurity-nginx)
:::

```
# nginx.conf
load_module /usr/lib/nginx/modules/ngx_http_modsecurity_module.so;

http {
  server_tokens off;

  modsecurity on;
  modsecurity_rules_file /path/to/modsecurity/modsecurity.conf;

  map $sent_http_content_type $x_xss_protection {
    ~*text/html "1; mode=block";
  }

  map $sent_http_content_type $x_frame_options {
    ~*text/html DENY;
  }

  map $sent_http_content_type $content_security_policy {
    ~*text/(html|javascript)|application/pdf|xml "default-src 'self' 'https://cdn.example.com'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests;";
  }

  map $sent_http_content_type $referrer_policy {
    ~*text/(css|html|javascript)|application\/pdf|xml "strict-origin-when-cross-origin";
  }

  map $sent_http_content_type $permissions_policy {
    ~*text/(html|javascript)|application/pdf|xml "accelerometer=(),autoplay=(),camera=(),display-capture=(),document-domain=(),encrypted-media=(),fullscreen=(),geolocation=(),gyroscope=(),magnetometer=(),microphone=(),midi=(),payment=(),picture-in-picture=(),publickey-credentials-get=(),screen-wake-lock=(),sync-xhr=(self),usb=(),web-share=(),xr-spatial-tracking=()";
  }

  map $sent_http_content_type $cors {
    # Images
    ~*image/                        "*";

    # Web fonts
    ~*font/                         "*";
    ~*application/vnd.ms-fontobject "*";
    ~*application/x-font-ttf        "*";
    ~*application/font-woff         "*";
    ~*application/x-font-woff       "*";
    ~*application/font-woff2        "*";
  }

  map $sent_http_content_type $coep_policy {
    ~*text/(html|javascript)|application/pdf|xml "require-corp";
  }

  map $sent_http_content_type $coop_policy {
    ~*text/(html|javascript)|application/pdf|xml "same-origin";
  }

  map $sent_http_content_type $corp_policy {
    ~*text/(html|javascript)|application/pdf|xml "same-origin";
  }

  add_header Content-Security-Policy $content_security_policy always;
  add_header Referrer-Policy $referrer_policy always;
  add_header Permissions-Policy $permissions_policy always;

  add_header Access-Control-Allow-Origin $cors;
  add_header Timing-Allow-Origin "*";
  add_header Cross-Origin-Embedder-Policy $coep_policy always;
  add_header Cross-Origin-Opener-Policy $coop_policy always;
  add_header Cross-Origin-Resource-Policy $corp_policy always;

  add_header X-Content-Type-Options nosniff always;
  add_header X-Frame-Options $x_frame_options always;
  add_header X-XSS-Protection $x_xss_protection always;
  add_header X-Download-Options noopen;

  server {
    location ~* /\.(?!well-known\/) {
      deny all;
    }

    location ~* (?:#.*#|\.(?:bak|conf|dist|fla|in[ci]|log|orig|psd|sh|sql|sw[op])|~)$ {
      deny all;
    }
  }
}
```

:::tip
[ModSecurity](https://github.com/SpiderLabs/ModSecurity) 是一个开源的、跨平台的Web应用防火墙（WAF），它提供一个 [nginx 模块](https://github.com/SpiderLabs/ModSecurity-nginx)，建议在生产环境使用并使用 [OWASP ModSecurity Core Rule Set](https://coreruleset.org/) 的配置
:::

### 代理配置

:::tip
- [ngx_http_proxy_module](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)
:::

```
# 代理路径、IP、端口，请根据实际情况进行配置
server {
  listen 443;
  server_name example.com www.example.com;
  set $proxy_port 8021;

  location ^~ /proxy-path/ {
    proxy_http_version 1.1;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_pass http://127.0.0.1:$proxy_port$request_uri;
    proxy_redirect off;
  }
}
```

:::warning
尽量使用多域名的部署方式，减少代理的使用
:::

### 其他配置

```
client_body_buffer_size     10K;
client_header_buffer_size   1k;
client_max_body_size        8m;
large_client_header_buffers 4 32k;

limit_zone slimits $binary_remote_addr 5m;
limit_conn slimits 5;

limit_req           zone=ratelimit burst=30 nodelay;
limit_req_log_level warn;
```

## ESLint

:::tip
[https://eslint.org/docs/user-guide/configuring](https://eslint.org/docs/user-guide/configuring)
:::

<Tabs>
  <TabItem value="react" label="React/Next.js" default>
```js
// .eslintrc.js

const airbnbReactRules = require('eslint-config-airbnb/rules/react');

module.exports = {
  root: true,
  parserOptions: {
    project: [
      './tsconfig.json',
      './tsconfig.node.json',
      './tsconfig.test.json',
    ],
  },
  // $ pnpm add -D eslint@^8.0.0 eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-config-airbnb-typescript  @typescript-eslint/eslint-plugin@^7.0.0 @typescript-eslint/parser@^7.0.0 eslint-plugin-no-unsanitized eslint-plugin-react-perf @tanstack/eslint-plugin-query eslint-plugin-unicorn eslint-plugin-promise eslint-plugin-jsdoc eslint-plugin-eslint-comments
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    // 仅 Next.js 项目需要引入
    // 'plugin:@next/next/recommended',
    'plugin:no-unsanitized/recommended-legacy',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-perf/recommended',
    'plugin:@tanstack/query/recommended',
    // 以下为实验性功能
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:jsdoc/recommended-typescript',
    'plugin:eslint-comments/recommended',
  ],
  rules: {
    // React 17+ 不用再引入 React
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    // 常见的缩写是众所周知且易于阅读的
    'unicorn/prevent-abbreviations': 'off',
    // Airbnb 更喜欢使用 forEach
    'unicorn/no-array-for-each': 'off',
  },
  overrides: [
    {
      files: '*.tsx',
      rules: {
        // 优化 .tsx 文件处理 props 默认值的方式
        // 'react/require-default-props': ['error', { forbidDefaultForRequired: true, functions: 'defaultArguments' }]
        'react/require-default-props': [airbnbReactRules.rules['react/require-default-props'][0], {
          ...airbnbReactRules.rules['react/require-default-props'][1],
          functions: 'defaultArguments',
        }],
      },
    },
  ],
};
```
  </TabItem>
  <TabItem value="vue" label="Vue">
```js
// .eslintrc.js

module.exports = {
  root: true,
  extends: [
    'plugin:vue/recommended',
    '@vue/eslint-config-airbnb-with-typescript',
    // '@vue/eslint-config-airbnb-with-typescript/allow-tsx-in-vue',
    'plugin:no-unsanitized/recommended-legacy',
  ],
};
```
  </TabItem>
  <TabItem value="jest" label="Jest">
```js
// .eslintrc.js
// 继承于主项目规则，仅用于 Jest 单元测试

module.exports = {
  // $ pnpm add -D eslint-plugin-jest eslint-plugin-testing-library
  extends: [
    'plugin:jest/recommended',
    'plugin:jest/style',
    // 根据项目框架，选择 React/Vue
    'plugin:testing-library/react',
    // 'plugin:testing-library/vue',
  ],
};
```
  </TabItem>
  <TabItem value="playwright" label="Playwright">
```js
// .eslintrc.js
// 继承于主项目规则，仅用于 Playwright E2E 测试

module.exports = {
  // $ pnpm add -D eslint-plugin-playwright
  extends: [
    'plugin:playwright/recommended',
  ],
};
```
  </TabItem>
</Tabs>

## stylelint

:::tip
[https://stylelint.io/user-guide/configure](https://stylelint.io/user-guide/configure)
:::

```js
// stylelint.config.js

// $ npm install stylelint stylelint-config-twbs-bootstrap stylelint-config-recommended-vue postcss-html --save-dev
module.exports = {
  extends: [
    'stylelint-config-twbs-bootstrap',
    'stylelint-config-recommended-vue',
    'stylelint-config-recommended-vue/scss',
  ],
  overrides: [
    {
      files: ['*/**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
};
```

```js
// vue.config.js

const { defineConfig } = require('@vue/cli-service');
// $ pnpm install stylelint-webpack-plugin --save-dev
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = defineConfig({
  configureWebpack: (config) => {
    const basePlugins = [
      new StylelintPlugin({
        extensions: ['css', 'scss', 'sass', 'vue'],
      }),
    ];
    let productionPlugins = [];

    if (process.env.NODE_ENV === 'production') {
      // ...
    }

    return {
      plugins: [
        ...basePlugins,
        ...productionPlugins,
      ],
    };
  },
});
```

## browserslist

:::tip
[https://github.com/browserslist/browserslist#browserslistrc](https://github.com/browserslist/browserslist#browserslistrc)
:::

```
# browserslistrc

[production]
last 2 version
> 0.3%
> 0.3% in CN
not dead
not ie <= 11
not op_mini all

[development]
last 1 chrome version
last 1 firefox version
last 1 safari version
```

:::tip
支持的浏览器列表可通过访问 [https://browsersl.ist/](https://browsersl.ist/) 查看
:::

## Jest

:::tip
[https://jestjs.io/docs/zh-Hans/configuration](https://jestjs.io/docs/zh-Hans/configuration)

Jest 可使用 CRA 提供的默认配置，如需修改配置可修改 `jest.config.js` 文件
:::

## Commitlint & Conventional Changelog

:::tip
[https://commitlint.js.org/#/reference-configuration](https://commitlint.js.org/#/reference-configuration)
:::

```js
// commitlint.config.js

// $ pnpm install @commitlint/cli @commitlint/config-conventional --save-dev
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

## Docker

<Tabs>
  <TabItem value="react" label="React/Vue" default>
```dockerfile
# Dockerfile

# 运行 nginx
FROM nginx:stable AS deploy

WORKDIR /app

COPY dist /app/usr/share/nginx/html
COPY nginx.conf /app/etc/nginx/nginx.conf

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
```

<details>
<summary>最完整配置（包括 Brotli 和 ModSecurity）</summary>

```dockerfile
# Dockerfile

FROM nginx:stable-alpine

# Install build dependencies
RUN apk update && apk upgrade \
    && apk add --no-cache \
    gcc \
    libc-dev \
    make \
    pcre-dev \
    zlib-dev \
    linux-headers \
    curl \
    gnupg \
    libxml2-dev \
    git \
    openssl-dev \
    geoip-dev \
    perl-dev \
    libedit-dev \
    mercurial \
    alpine-sdk \
    findutils \
    autoconf \
    automake \
    libtool \
    yajl-dev \
    lmdb-dev \
    libmaxminddb-dev \
    pcre2-dev \
    curl-dev \
    lua-dev \
    && rm -rf /var/cache/apk/*

# Install brotli
RUN cd /opt \
    && git clone --depth 1 https://github.com/google/ngx_brotli.git \
    && cd ngx_brotli \
    && git submodule update --init

# Install ModSecurity
RUN cd /opt \
    && git clone --depth 1 -b v3/master --single-branch https://github.com/SpiderLabs/ModSecurity \
    && cd ModSecurity \
    && git submodule init \
    && git submodule update \
    && ./build.sh \
    && ./configure \
    && make \
    && make install

# Download and compile Nginx with modules
RUN cd /opt \
    && git clone --depth 1 https://github.com/SpiderLabs/ModSecurity-nginx.git \
    && NGINX_VERSION=$(nginx -v 2>&1 | sed 's/nginx version: nginx\///') \
    && curl -fSL https://nginx.org/download/nginx-$NGINX_VERSION.tar.gz -o nginx.tar.gz \
    && tar -zxf nginx.tar.gz \
    && cd nginx-$NGINX_VERSION \
    && ./configure \
        --with-compat \
        --add-dynamic-module=/opt/ngx_brotli \
        --add-dynamic-module=/opt/ModSecurity-nginx \
    && make modules

# Copy compiled modules
RUN cp /opt/nginx-$(nginx -v 2>&1 | sed 's/nginx version: nginx\///')/objs/*.so /etc/nginx/modules/

# Install OWASP CRS
RUN mkdir -p /etc/nginx/modsecurity \
    && cd /etc/nginx/modsecurity \
    && git clone -b v4.15.0 https://github.com/coreruleset/coreruleset.git \
    && mv coreruleset/crs-setup.conf.example coreruleset/crs-setup.conf \
    && mv coreruleset/rules/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf.example coreruleset/rules/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf

# Configure ModSecurity
RUN cp /opt/ModSecurity/modsecurity.conf-recommended /etc/nginx/modsecurity/modsecurity.conf \
    && echo 'Include /etc/nginx/modsecurity/coreruleset/crs-setup.conf' >> /etc/nginx/modsecurity/modsecurity.conf \
    && echo 'Include /etc/nginx/modsecurity/coreruleset/rules/*.conf' >> /etc/nginx/modsecurity/modsecurity.conf \
    && sed -i 's/SecRuleEngine DetectionOnly/SecRuleEngine On/' /etc/nginx/modsecurity/modsecurity.conf \
    && cp /opt/ModSecurity/unicode.mapping /etc/nginx/modsecurity/unicode.mapping

# Clean up
RUN apk del gcc libc-dev make pcre-dev zlib-dev linux-headers curl gnupg libxml2-dev git openssl-dev \
    geoip-dev perl-dev libedit-dev mercurial alpine-sdk findutils autoconf automake libtool yajl-dev \
    lmdb-dev libmaxminddb-dev pcre2-dev curl-dev lua-dev \
    && rm -rf /opt/* \
    && rm -rf /var/cache/apk/*

# Copy application files
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
```

</details>
  </TabItem>
  <TabItem value="next" label="Next.js">
```dockerfile
FROM node:lts-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable pnpm && pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

<details>
<summary>最完整配置（Docker Compose + Nginx 反向代理 + Next.js 服务）</summary>

**docker-compose.yml**

```yaml
version: '3.8'

services:
  nextjs:
    build:
      context: .
      dockerfile: Dockerfile.nextjs
    container_name: nextjs-app
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
    networks:
      - app-network

  nginx:
    build:
      context: .
      dockerfile: Dockerfile.nginx
    container_name: nginx-proxy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./ssl:/etc/ssl/certs
    depends_on:
      - nextjs
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

**Dockerfile.nextjs**

```dockerfile
FROM node:lts-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable pnpm && pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

**Dockerfile.nginx**

```dockerfile
FROM nginx:stable-alpine

# Install build dependencies
RUN apk update && apk upgrade \
    && apk add --no-cache \
    gcc \
    libc-dev \
    make \
    pcre-dev \
    zlib-dev \
    linux-headers \
    curl \
    gnupg \
    libxml2-dev \
    git \
    openssl-dev \
    geoip-dev \
    perl-dev \
    libedit-dev \
    mercurial \
    alpine-sdk \
    findutils \
    autoconf \
    automake \
    libtool \
    yajl-dev \
    lmdb-dev \
    libmaxminddb-dev \
    pcre2-dev \
    curl-dev \
    lua-dev \
    && rm -rf /var/cache/apk/*

# Install brotli
RUN cd /opt \
    && git clone --depth 1 https://github.com/google/ngx_brotli.git \
    && cd ngx_brotli \
    && git submodule update --init

# Install ModSecurity
RUN cd /opt \
    && git clone --depth 1 -b v3/master --single-branch https://github.com/SpiderLabs/ModSecurity \
    && cd ModSecurity \
    && git submodule init \
    && git submodule update \
    && ./build.sh \
    && ./configure \
    && make \
    && make install

# Download and compile Nginx with modules
RUN cd /opt \
    && git clone --depth 1 https://github.com/SpiderLabs/ModSecurity-nginx.git \
    && NGINX_VERSION=$(nginx -v 2>&1 | sed 's/nginx version: nginx\///') \
    && curl -fSL https://nginx.org/download/nginx-$NGINX_VERSION.tar.gz -o nginx.tar.gz \
    && tar -zxf nginx.tar.gz \
    && cd nginx-$NGINX_VERSION \
    && ./configure \
        --with-compat \
        --add-dynamic-module=/opt/ngx_brotli \
        --add-dynamic-module=/opt/ModSecurity-nginx \
    && make modules

# Copy compiled modules
RUN cp /opt/nginx-$(nginx -v 2>&1 | sed 's/nginx version: nginx\///')/objs/*.so /etc/nginx/modules/

# Install OWASP CRS
RUN mkdir -p /etc/nginx/modsecurity \
    && cd /etc/nginx/modsecurity \
    && git clone -b v4.15.0 https://github.com/coreruleset/coreruleset.git \
    && mv coreruleset/crs-setup.conf.example coreruleset/crs-setup.conf \
    && mv coreruleset/rules/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf.example coreruleset/rules/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf

# Configure ModSecurity
RUN cp /opt/ModSecurity/modsecurity.conf-recommended /etc/nginx/modsecurity/modsecurity.conf \
    && echo 'Include /etc/nginx/modsecurity/coreruleset/crs-setup.conf' >> /etc/nginx/modsecurity/modsecurity.conf \
    && echo 'Include /etc/nginx/modsecurity/coreruleset/rules/*.conf' >> /etc/nginx/modsecurity/modsecurity.conf \
    && sed -i 's/SecRuleEngine DetectionOnly/SecRuleEngine On/' /etc/nginx/modsecurity/modsecurity.conf \
    && cp /opt/ModSecurity/unicode.mapping /etc/nginx/modsecurity/unicode.mapping

# Clean up
RUN apk del gcc libc-dev make pcre-dev zlib-dev linux-headers curl gnupg libxml2-dev git openssl-dev \
    geoip-dev perl-dev libedit-dev mercurial alpine-sdk findutils autoconf automake libtool yajl-dev \
    lmdb-dev libmaxminddb-dev pcre2-dev curl-dev lua-dev \
    && rm -rf /opt/* \
    && rm -rf /var/cache/apk/*

# Copy nginx configuration
COPY nginx-nextjs.conf /etc/nginx/nginx.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
```

</details>
  </TabItem>
</Tabs>
