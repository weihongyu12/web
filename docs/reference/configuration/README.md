---
sidebar_position: 5
toc_min_heading_level: 2
toc_max_heading_level: 5
description: 前端项目参考配置，包含 package.json、构建工具、ESLint、Stylelint 等核心配置文件示例
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
    "dev": "rsbuild dev",
    "dev:open": "rsbuild dev --open",
    "build": "run-p type-check build-only",
    "analyze": "cross-env RSDOCTOR=true rsbuild build",
    "preview": "rsbuild preview",
    "build-only": "rsbuild build",
    "type-check": "tsc --build --noEmit",
    "lint": "run-p lint:js lint:css",
    "lint:js": "eslint --cache",
    "lint:css": "stylelint \"./src/**/*.{css,scss,sass,less}\" --cache",
    "fix": "run-s fix:js fix:css",
    "fix:js": "eslint --cache --fix",
    "fix:css": "stylelint \"./src/**/*.{css,scss,sass,less}\" --cache --fix",
    "test": "run-p test:unit test:e2e",
    "test:unit": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "styleguidist": "styleguidist server",
    "styleguidist:build": "styleguidist build",
    "changelog": "conventional-changelog -p conventional -i CHANGELOG.md -s",
    "lighthouse": "lhci autorun --config=lighthouse.config.js"
  }
}
```

## tsconfig.json

<Tabs>
  <TabItem value="tsconfig.json" label="tsconfig.json" default>
  ```json
  {
    "files": [],
    "references": [
      {
        "path": "./tsconfig.node.json"
      },
      {
        "path": "./tsconfig.app.json"
      },
      {
        "path": "./tsconfig.test.json"
      }
    ]
  }
  ```
  </TabItem>
  <TabItem value="tsconfig.app.json" label="tsconfig.app.json">
  ```json
  {
    "compilerOptions": {
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
      "lib": ["DOM", "ES2023"],
      "jsx": "react-jsx",
      "target": "ES2023",
      "noEmit": true,
      "skipLibCheck": true,
      "useDefineForClassFields": true,

      /* modules */
      "module": "ESNext",
      "resolveJsonModule": true,
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,

      /* type checking */
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,

      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      }
    },
    "include": ["src"],
    "ts-node": {
      "compilerOptions": {
        "module": "CommonJS"
      }
    }
  }
  ```
  </TabItem>
  <TabItem value="tsconfig.node.json" label="tsconfig.node.json">
  ```json
  {
    /* $ pnpm add @tsconfig/node24 --save-dev */
    "extends": "@tsconfig/node24/tsconfig.json",
    "compilerOptions": {
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
      "noEmit": true,
      "module": "ESNext",
      "moduleResolution": "Bundler",
      "types": ["node"],

      "paths": {
        "@/*": ["src/*"]
      }
    },
    "include": [
      "*.config.{js,ts,mjs,cjs}",
      "**/vite.config.*",
      "**/vitest.config.*",
      "**/webpack.config.*",
      "**/rspack.config.*",
      "**/rollup.config.*",
      "**/eslint.config.*",
      "**/prettier.config.*",
      "**/tailwind.config.*",
      "**/tsup.config.*",
      "**/tsdown.config.*"
    ]
  }
  ```
  </TabItem>
  <TabItem value="tsconfig.test.json" label="tsconfig.test.json">
  ```json
  {
    "extends": "./tsconfig.app.json",
    "compilerOptions": {
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.test.tsbuildinfo",
      "strict": true,
      "strictNullChecks": true,
      "noImplicitAny": true,
      "types": [
        "node",
        "vitest/globals",
        "@testing-library/jest-dom",
        "@playwright/test"
      ],

      "paths": {
        "@/*": ["src/*"]
      }
    },
    "include": [
      "src/**/*.test.ts",
      "src/**/*.test.tsx",
      "src/**/*.spec.ts",
      "src/**/*.spec.tsx",
      "src/__tests__/**/*",
      "src/setupTests.ts",
      "e2e/**/*.ts",
      "e2e/**/*.spec.ts",
      "vitest.config.ts"
    ],
    "exclude": ["node_modules", "dist", "coverage"]
  }
  ```
  </TabItem>
</Tabs>

## Rsbuild

:::tip
[Rsbuild](https://rsbuild.rs/zh/) 是基于 [Rspack](https://rspack.rs/zh/) 的现代化构建工具，提供开箱即用的配置和最佳实践，Rspack 基于 Rust 编写，具有极快的构建速度和优秀的性能表现。它支持现代 JavaScript 和 TypeScript 特性，并且与 Webpack 兼容，可以无缝迁移现有项目。
:::

```ts
// rsbuild.config.ts

// pnpm add @rsbuild/core @rsbuild/plugin-react @rsbuild/plugin-svgr @rsbuild/plugin-tailwindcss @rsbuild/plugin-assets-retry @rsbuild/plugin-node-polyfill @rsbuild/plugin-check-syntax @rsbuild/plugin-eslint @rsbuild/plugin-type-check -D
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';
// import { pluginAssetsRetry } from '@rsbuild/plugin-assets-retry';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';
import { pluginCheckSyntax } from '@rsbuild/plugin-check-syntax';
// import { pluginEslint } from '@rsbuild/plugin-eslint';
// import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

// pnpm add compression-webpack-plugin @aaroon/workbox-rspack-plugin image-minimizer-webpack-plugin -D
import CompressionPlugin from 'compression-webpack-plugin';
import { InjectManifest } from '@aaroon/workbox-rspack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [
    pluginReact({
      reactCompiler: true,
    }),
    pluginSvgr({
      parallel: true,
    }),
    pluginTailwindcss(),
    
    // 用于注入 Node 核心模块在浏览器端的 polyfills
    pluginNodePolyfill(),
    
    // 用于在编译过程中运行 ESLint 检查，需要在构建/开发过程中实时输出 ESLint 错误时开启
    // ⚠️ 构建时运行 ESLint 会显著增加构建时间，建议使用独立的 `pnpm run lint` 命令
    // pluginEslint(),
    
    // 用于在单独的进程中运行 TypeScript 类型检查，需要在 dev server 错误覆盖层中显示类型错误时开启
    // pluginTypeCheck(),
    
    // 静态资源加载失败自动重试，适用于 CDN 部署/多域名容灾场景
    // pluginAssetsRetry({
    //   test: /cdn\.example\.com/,
    //   domain: ['cdn.example.com', 'cdn-backup.example.com'],
    // }),
    
    // 检查构建产物的语法兼容性，判断是否存在导致兼容性问题的高级语法
    pluginCheckSyntax({
      ecmaVersion: 2023,
    }),
  ],
  server: {
    publicDir: [
      {
        ignore: ['mockServiceWorker.js'],
      },
    ],
  },
  output: {
    module: isProd,
    manifest: isProd,
    polyfill: 'usage',
    dataUriLimit: 0,
    // ⚠️ 注意：不要将 .map 文件部署到公网服务器或 CDN ，否则会暴露源码！！
    sourceMap: {
      js: isDev ? 'cheap-module-source-map' : 'hidden-source-map',
      css: isDev,
    },
  },
  html: isProd ? { crossorigin: 'anonymous' } : undefined,
  security: isProd ? { sri: { enable: 'auto' } } : undefined,
  performance: {
    buildCache: isDev,
    preload: isProd ? { type: 'initial' } : undefined,
    prefetch: isProd ? { type: 'async-chunks' } : undefined,
  },
  tools: {
    rspack: {
      module: {
        rules: [
          ...(isProd ? [{
            test: /\.(jpe?g|png|gif|tif|webp|svg|avif)$/i,
            enforce: 'pre' as const,
            use: [
              {
                loader: ImageMinimizerPlugin.loader,
                options: {
                  minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
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
                              },
                              {
                                name: 'addAttributesToSVGElement',
                                params: {
                                  attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
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
                      preset: 'webp',
                      implementation: ImageMinimizerPlugin.imageminGenerate,
                      options: {
                        plugins: [['imagemin-webp', { quality: 100, lossless: true }]],
                      },
                    },
                    {
                      preset: 'avif',
                      implementation: ImageMinimizerPlugin.sharpGenerate,
                      options: {
                        encodeOptions: {
                          avif: { lossless: false },
                        },
                      },
                    },
                  ],
                },
              },
            ],
          }] : []),
        ],
      },
      plugins: [
        ...(isProd
          ? [
            new CompressionPlugin({
              filename: '[path][base].br[query]',
              algorithm: 'brotliCompress',
              test: /\.(html|js|css|svg|ico|xml|json|wasm|eot|otf|ttf|bmp|md)$/,
              compressionOptions: { level: 11 },
              // threshold: 10240,
              minRatio: 1,
            }),
            new CompressionPlugin({
              filename: '[path][base].gz[query]',
              algorithm: 'gzip',
              test: /\.(html|js|css|svg|ico|xml|json|wasm|eot|otf|ttf|bmp|md)$/,
              compressionOptions: { level: 9 },
              // threshold: 10240,
              minRatio: 1,
            }),
            new InjectManifest({
              swSrc: './src/service-worker.ts',
              dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
              exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
              // Bump up the default maximum size (2mb) that's precached,
              // to make lazy-loading failure scenarios less likely.
              // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
              maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
            }),
          ]
          : []),
      ],
    },
  },
});
```

## Webpack/Vite

:::tip
- [https://webpack.js.org/configuration/](https://webpack.js.org/configuration/)
:::

### Preload/Prefetch 配置

```js
// webpack.config.js

// $ pnpm add @vue/preload-webpack-plugin --save-dev
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

// $ pnpm add compression-webpack-plugin --save-dev
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

// $ pnpm add vite-plugin-compression --save-dev
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

// $ pnpm add webpack-subresource-integrity --save-dev
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

// $ pnpm add vite-plugin-sri --save-dev
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

// pnpm add image-minimizer-webpack-plugin imagemin sharp --save-dev
//
// 无损压缩（推荐）：
// pnpm add imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
//
// 有损压缩：
// pnpm add imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo --save-dev
//
// WebP格式转化（推荐）：
// pnpm add imagemin-webp --save-dev
//
// AVIF格式转化（推荐，基于sharp）：
// pnpm add sharp --save-dev
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
            // 可以使用“?as=avif”生成器，生成 AVIF 图片格式
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

// $ pnpm add vite-plugin-image-optimizer vite-imagetools svgo --save-dev
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
  <TabItem value="react" label="React/Next.js(Flat Config)" default>
:::warning
Airbnb ESLint Config 是非常流行的代码风格指南，但存在以下问题：

- Airbnb 配置已经 4 年多没有更新了；
- 与 ESLint 9（及更高版本）配合得不好；
- 缺乏对 TypeScript 的支持。

为了解决这些问题，推荐使用 [eslint-config-airbnb-extended](https://eslint-airbnb-extended.nishargshah.dev/) 作为替代方案，它是 Airbnb 配置的现代化版本，支持最新的 ESLint 版本和 TypeScript。直到 Airbnb 官方更新其配置之前，建议使用此替代方案。
:::


```ts
// eslint.config.ts
import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import { configs, plugins, rules } from 'eslint-config-airbnb-extended';
import unicorn from 'eslint-plugin-unicorn';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import noUnsanitized from 'eslint-plugin-no-unsanitized';
import promise from 'eslint-plugin-promise';
import regexp from 'eslint-plugin-regexp';
import jsdoc from 'eslint-plugin-jsdoc';

import reactHooks from 'eslint-plugin-react-hooks';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import reactRefresh from 'eslint-plugin-react-refresh';
// @ts-ignore
import risXss from 'eslint-plugin-risxss';

import node from 'eslint-plugin-n';

const gitignorePath = path.resolve('.', '.gitignore');

const jsConfig = defineConfig([
  // ESLint recommended config
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  // Stylistic plugin
  plugins.stylistic,
  // Import X plugin
  plugins.importX,
  // Airbnb base recommended config
  ...configs.base.recommended,

  unicorn.configs.recommended,
  promise.configs['flat/recommended'],
  regexp.configs.recommended,
  comments.recommended,
  noUnsanitized.configs.recommended,

  {
    rules: {
      // 常见的缩写是众所周知且易于阅读的
      'unicorn/prevent-abbreviations': 'off',
      // Airbnb 更喜欢使用 forEach
      'unicorn/no-for-each': 'off',
      // Airbnb 更喜欢使用 reduce
      'unicorn/no-array-reduce': 'off',
      // null 在项目中是常见场景
      'unicorn/no-null': 'off',
      // Airbnb 风格指南要求“基本文件名应该完全匹配其默认导出的名称”
      'unicorn/filename-case': 'off',
      // react/require-default-props 需要 = undefined 作为可选 prop 的默认值，二者冲突
      'unicorn/no-useless-undefined': 'off',
      // airbnb no-restricted-globals 要求使用 window，与 unicorn/prefer-global-this 冲突
      'unicorn/prefer-global-this': 'off',
    },
  },

  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    ...jsdoc.configs['flat/recommended'],
  },
]);

const reactConfig = defineConfig([
  // React plugin
  plugins.react,
  // React hooks plugin
  plugins.reactHooks,
  // React JSX A11y plugin
  plugins.reactA11y,
  // Airbnb React recommended config
  ...configs.react.recommended,

  reactHooks.configs.flat['recommended-latest'],
  ...tanstackQuery.configs['flat/recommended'],
  reactRefresh.configs.recommended,

  {
    rules: {
      // React 17+ 不用再引入 React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },

  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      risxss: risXss,
    },
    rules: {
      'risxss/catch-potential-xss-react': 'error',
    },
  },
]);

const typescriptConfig = defineConfig([
  // TypeScript ESLint plugin
  plugins.typescriptEslint,
  // Airbnb base TypeScript config
  ...configs.base.typescript,
  // Airbnb React TypeScript config
  ...configs.react.typescript,

  {
    files: ['**/*.{ts,tsx}'], // 只对 TS 文件
    ...jsdoc.configs['flat/recommended-typescript'],
  },

  {
    files: ['**/*.tsx'],
    rules: {
      'react/require-default-props': (() => {
        const baseRule = rules?.react?.base?.rules?.['react/require-default-props'];
        if (baseRule && Array.isArray(baseRule) && baseRule.length >= 2) {
          const [ruleLevel, ruleConfig] = baseRule;
          return [
            ruleLevel,
            {
              ...(typeof ruleConfig === 'object' && ruleConfig !== null ? ruleConfig : {}),
              functions: 'defaultArguments',
            },
          ];
        }
        return 'off';
      })(),
    },
  },
]);

const nodeConfig = defineConfig([
  {
    files: [
      'rspack.config.ts',
      'vitest.config.ts',
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
    ],

    ...node.configs['flat/recommended-script'],
    rules: {
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
    },
  },
]);

export default defineConfig([
  // Ignore files and folders listed in .gitignore
  includeIgnoreFile(gitignorePath),
  // JavaScript config
  ...jsConfig,
  // React config
  ...reactConfig,
  // TypeScript config
  ...typescriptConfig,
  // Node.js config
  ...nodeConfig,
]);
```
  </TabItem>
  <TabItem value="react-legacy" label="React/Next.js(Legacy Config )">
```js
// .eslintrc.js

const airbnbReactRules = require('eslint-config-airbnb/rules/react');

module.exports = {
  root: true,
  parserOptions: {
    project: [
      './tsconfig.json',
    ],
  },
  // $ pnpm add -D eslint@^8.0.0 eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-config-airbnb-typescript  @typescript-eslint/eslint-plugin@^7.0.0 @typescript-eslint/parser@^7.0.0 eslint-plugin-no-unsanitized eslint-plugin-risxss @tanstack/eslint-plugin-query eslint-plugin-unicorn eslint-plugin-promise eslint-plugin-regexp eslint-plugin-jsdoc @eslint-community/eslint-plugin-eslint-comments
  extends: [
    'airbnb',
    'airbnb-typescript',
    // 仅 Next.js 项目需要引入
    // 'plugin:@next/next/recommended',
    'plugin:react-hooks/recommended-latest',
    'plugin:no-unsanitized/recommended-legacy',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@tanstack/query/recommended',
    'plugin:promise/recommended',
    'plugin:regexp/recommended',
    'plugin:jsdoc/recommended-typescript',
    'plugin:@eslint-community/eslint-comments/recommended',
    // 以下为实验性功能
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:unicorn/recommended',
    // 'plugin:tailwindcss/recommended',
  ],
  plugin: [
    'risxss',
    'react-refresh',
  ],
  rules: {
    // React 17+ 不用再引入 React
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    // 常见的缩写是众所周知且易于阅读的
    'unicorn/prevent-abbreviations': 'off',
    // Airbnb 更喜欢使用 forEach
    'unicorn/no-array-for-each': 'off',
    // null 在项目中是常见场景
    'unicorn/no-null': 'off',
    // airbnb风格指南要求"基本文件名应该完全匹配其默认导出的名称"
    'unicorn/filename-case': 'off',
    // RisXSS 规则，预防 XSS 攻击
    'risxss/catch-potential-xss-react': 'error',
    // React Refresh 规则，确保热更新时仅导出组件
    'react-refresh/only-export-components': 'error',
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
    'plugin:vue-scoped-css/vue3-recommended',
    'plugin:no-unsanitized/recommended-legacy',
    'plugin:tailwindcss/recommended',
  ],
  plugin: [
    'risxss',
  ],
  rules: {
    // RisXSS 规则，预防 XSS 攻击
    'risxss/catch-potential-xss-vue': 'error',
  },
};
```
  </TabItem>
  <TabItem value="vitest" label="Vitest">
```js
// .eslintrc.js
// 继承于主项目规则，仅用于 Vitest 单元测试

module.exports = {
  // $ pnpm add -D @vitest/eslint-plugin eslint-plugin-testing-library
  extends: [
    'plugin:@vitest/legacy-recommended',
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

:::tip
优先使用以下方案，减少 CSS 代码的编写：

- **原子化 CSS**：如Tailwind CSS，通过 utility 类直接在 HTML 中编写样式，减少了自定义 CSS 的需求。
- **UI 组件库**：主流的 UI 组件库（如 Ant Design、Material-UI）通常已经内置了良好的组件化和样式隔离方案，开发者直接使用即可。
:::

<Tabs>
  <TabItem value="css" label="CSS" default>
:::info
**OOCSS**（面向对象 CSS）主张将样式按「结构」与「外观」分离，把重复的视觉模式抽象为可复用的独立类，避免冗余与层级过深的选择器。

**BEM**（Block Element Modifier）在 OOCSS 的复用思想基础上，进一步规定了类名的命名规范：`block__element--modifier`，通过 `__`（元素）和 `--`（修饰符）明确表达选择器的层级与用途，可读性高且便于组件化开发。
:::

```js
// stylelint.config.js

// $ pnpm add stylelint stylelint-config-twbs-bootstrap stylelint-selector-bem-pattern --save-dev
module.exports = {
  extends: [
    'stylelint-config-twbs-bootstrap',
  ],
  plugins: [
    'stylelint-selector-bem-pattern',
  ],
  rules: {
    // BEM 命名规范 (via postcss-bem-linter)
    // 格式: .block, .block__element, .block--modifier, .block__element--modifier
    // 示例: .card, .card__title, .card--featured, .card__title--large
    'plugin/selector-bem-pattern': {
      // BEM 预设: block__element--modifier，kebab-case
      preset: 'bem',
    },
  },
};
```
  </TabItem>
  <TabItem value="vue" label="Vue">
```js
// stylelint.config.js

// $ pnpm add stylelint stylelint-config-twbs-bootstrap stylelint-config-recommended-vue postcss-html --save-dev
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
  </TabItem>
</Tabs>

## Commitlint & Conventional Changelog

:::tip
[https://commitlint.js.org/#/reference-configuration](https://commitlint.js.org/#/reference-configuration)
:::

```ts
// commitlint.config.ts

// $ pnpm add @commitlint/cli @commitlint/config-conventional @commitlint/types --save-dev
import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
};

export default Configuration;
```

## Lint Staged

:::tip
[https://github.com/lint-staged/lint-staged#configuration](https://github.com/lint-staged/lint-staged#configuration)
:::

```js
// lint-staged.config.js

// $ pnpm add lint-staged @biomejs/biome eslint stylelint --save-dev
export default {
  '**/*.{js,ts,jsx,tsx,vue}': ['biome format --write', 'eslint --fix --cache'],
  '**/*.{css,scss,sass,less}': ['biome format --write', 'stylelint --fix --cache'],
};
```

## husky

### pre-commit

```
npx lint-staged
```

### commit-msg

```
npx --no -- commitlint --edit $1
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

## Vitest

:::tip
[https://cn.vitest.dev/config/](https://cn.vitest.dev/config/)
:::

<Tabs>
  <TabItem value="vitest.config.ts" label="vitest.config.ts" default>
  ```ts
  // vitest.config.ts

  // $ pnpm add vitest jsdom @vitejs/plugin-react @vitest/coverage-v8 --save-dev
  import { defineConfig } from 'vitest/config';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
    test: {
      environment: 'jsdom',
      // 开启后可直接使用 describe/it/expect 等全局 API，需在 tsconfig 中引入 vitest/globals 类型
      globals: true,
      setupFiles: ['./src/setupTests.ts'],
      include: [
        'src/**/__tests__/**/*.{js,jsx,ts,tsx}',
        'src/**/*.{spec,test}.{js,jsx,ts,tsx}',
      ],
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{js,jsx,ts,tsx}'],
        exclude: ['src/**/*.d.ts'],
      },
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  });
  ```
  </TabItem>
  <TabItem value="setupTests" label="setupTests">
  ```ts
  // 为 DOM 节点添加自定义断言匹配器（matchers），
  // 允许你编写如下断言：
  // expect(element).toHaveTextContent(/react/i)
  // 了解更多：https://github.com/testing-library/jest-dom

  // $ pnpm add @testing-library/jest-dom @testing-library/react @testing-library/user-event --save-dev
  import '@testing-library/jest-dom/vitest';
  ```
  </TabItem>
</Tabs>

:::info
与 Jest 不同，Vitest 由 Vite 驱动，CSS、CSS Modules、图片、字体、SVG 等静态资源由 Vite 原生处理，无需配置 `moduleNameMapper` 及各类资源 mock 文件。
:::

## Playwright

```ts
// playwright.config.ts

import process from 'node:process';
// $ pnpm add @playwright/test --save-dev
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// $ pnpm add dotenv --save-dev
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.CI ? 'http://localhost:8080' : 'http://localhost:8080',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Only on CI systems run the tests headless */
    headless: !!process.env.CI,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  webServer: {
    /**
     * Use the dev server by default for faster feedback loop.
     * Use the preview server on CI for more realistic testing.
     * Playwright will re-use the local server if there is already a dev-server running.
     */
    command: process.env.CI ? 'pnpm run preview' : 'pnpm run dev',
    port: process.env.CI ? 8080 : 8080,
    reuseExistingServer: !process.env.CI,
  },
});
```

## Lighthouse CI

```js
// lint-staged.config.js

// $ pnpm add @lhci/cli --save-dev
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --headless',
        onlyCategories: [
          'performance',
          'accessibility',
          'best-practices',
          'seo',
        ],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
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
COPY nginx/nginx-nextjs.conf /etc/nginx/nginx.conf

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
```

</details>
  </TabItem>
</Tabs>


## Gitlab CI/CD

```yaml
# .gitlab-ci.yml

include:
  # GitLab 安全扫描工具
  - template: Security/SAST.gitlab-ci.yml
  - template: Security/Secret-Detection.gitlab-ci.yml
  - template: Security/Dependency-Scanning.gitlab-ci.yml
  - template: Security/Container-Scanning.gitlab-ci.yml

image: node:lts

stages:
  - install
  - lint
  - build
  - test
  - quality
  - security
  - deploy

# 全局变量
variables:
  PNPM_CACHE_FOLDER: .pnpm-store

# 全局缓存策略
cache:
  key:
    files:
      - pnpm-lock.yaml
  paths:
    - .pnpm-store/
    - node_modules/
  policy: pull-push

# 基础模板
.install_template: &install_template
  before_script:
    - corepack enable
    - corepack prepare pnpm@latest --activate
    - pnpm config set store-dir $PNPM_CACHE_FOLDER
    - pnpm config set package-import-method copy

.docker_template: &docker_template
  image: docker:29-cli
  services:
    - name: docker:29-dind
      alias: docker
  variables:
    DOCKER_HOST: tcp://docker:2376
    DOCKER_TLS_CERTDIR: "/certs"
    DOCKER_TLS_VERIFY: 1
    DOCKER_CERT_PATH: "$DOCKER_TLS_CERTDIR/client"
  before_script:
    # 登录 GitLab Container Registry
    - echo "$CI_REGISTRY_PASSWORD" | docker login -u "$CI_REGISTRY_USER" --password-stdin "$CI_REGISTRY"

.ssh_template: &ssh_template
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    # 首次连接时自动信任服务器主机指纹
    - mkdir -p ~/.ssh && printf "Host *\n  StrictHostKeyChecking accept-new\n" > ~/.ssh/config
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -

# 安装依赖
setup:
  stage: install
  <<: *install_template
  script:
    - pnpm install --frozen-lockfile --prefer-offline
  cache:
    key:
      files:
        - pnpm-lock.yaml
    paths:
      - .pnpm-store/
      - node_modules/
    policy: pull-push

# ESLint
eslint:
  stage: lint
  needs: ["setup"]
  <<: *install_template
  script:
    - pnpm run lint

# stylelint
stylelint:
  stage: lint
  needs: ["setup"]
  <<: *install_template
  script:
    - pnpm run lint:css

# 构建应用
build_app:
  stage: build
  needs: ["setup"]
  <<: *install_template
  script:
    - pnpm run build
    - npx @sentry/cli releases new $CI_COMMIT_SHA
    - npx @sentry/cli releases set-commits --auto $CI_COMMIT_SHA || true
    - npx @sentry/cli releases files $CI_COMMIT_SHA upload-sourcemaps ./dist --rewrite
    - npx @sentry/cli releases finalize $CI_COMMIT_SHA
    - find ./dist -name "*.map" -type f -delete
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

# 构建镜像
build_docker:
  <<: *docker_template
  stage: build
  needs: ["build_app"]
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA -t $CI_REGISTRY_IMAGE:latest .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker push $CI_REGISTRY_IMAGE:latest

# 单元测试
unit_tests:
  stage: test
  needs: ["setup"]
  <<: *install_template
  script:
    - pnpm run test:unit --watchAll=false --ci

# 覆盖率测试
coverage_tests:
  stage: test
  needs: ["setup"]
  <<: *install_template
  script:
    - pnpm run test:coverage --watchAll=false --ci
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'

# E2E 测试
e2e_tests:
  stage: test
  image: mcr.microsoft.com/playwright:v1.64.0-noble
  needs: ["build_app"]
  before_script:
    - corepack enable
    - corepack prepare pnpm@latest --activate
    - pnpm config set store-dir $PNPM_CACHE_FOLDER
    - pnpm config set package-import-method copy
  script:
    - pnpm install --frozen-lockfile --prefer-offline
    - pnpm run test:e2e
  cache:
    key:
      files:
        - pnpm-lock.yaml
      prefix: e2e
    paths:
      - .pnpm-store/
      - node_modules/
    policy: pull-push
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

# 质量检查
qodana:
  stage: quality
  image:
    name: jetbrains/qodana-js:latest
    entrypoint: [""]
  needs: ["setup"]
  cache:
    - key: qodana-latest-$CI_DEFAULT_BRANCH-$CI_COMMIT_REF_SLUG
      fallback_keys:
        - qodana-latest-$CI_DEFAULT_BRANCH-
        - qodana-latest-
      paths:
        - .qodana/cache
  variables:
    QODANA_TOKEN: $QODANA_TOKEN
    QODANA_ENDPOINT: "https://qodana.cloud"
  script:
    - qodana --cache-dir=$CI_PROJECT_DIR/.qodana/cache
  allow_failure: true
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

# Lighthouse CI
lighthouse:
  stage: quality
  image: cypress/browsers:latest
  needs: ["build_app"]
  variables:
    CI: true
  before_script:
    - corepack enable
    - corepack prepare pnpm@latest --activate
    - pnpm config set store-dir $PNPM_CACHE_FOLDER
    - pnpm config set package-import-method copy
  script:
    - pnpm install --frozen-lockfile --prefer-offline
    - pnpm run lighthouse
  allow_failure: true
  cache:
    key:
      files:
        - pnpm-lock.yaml
    paths:
      - .pnpm-store/
      - node_modules/
    policy: pull-push
  artifacts:
    paths:
      - .lighthouseci/
    expire_in: 1 week
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

# 安全扫描
sast:
  stage: security

# 密钥检测
secret_detection:
  stage: security

# 依赖扫描
dependency_scanning:
  stage: security

# 容器扫描
container_scanning:
  stage: security
  needs: ['build_docker']
  variables:
    CS_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    CS_DOCKERFILE_PATH: Dockerfile
    GIT_STRATEGY: fetch
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

# 部署分支预览环境（泛解析域名：https://<分支slug>.example.dev，nginx 正则块免维护，仅上传文件）
deploy_dev:
  <<: *ssh_template
  stage: deploy
  needs: ["build_app"]
  script:
    - ssh $REVIEW_SSH "mkdir -p /srv/preview/$CI_COMMIT_REF_SLUG"
    - scp -r ./dist/* $REVIEW_SSH:/srv/preview/$CI_COMMIT_REF_SLUG/
  environment:
    name: dev/$CI_COMMIT_REF_SLUG
    url: https://$CI_COMMIT_REF_SLUG.example.dev
    on_stop: stop_dev
    auto_stop_in: 15 days
  # 预览环境仅覆盖保留分支（main/pre-production/production）之外的分支
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
      when: never
    - if: $CI_COMMIT_BRANCH == "pre-production"
      when: never
    - if: $CI_COMMIT_BRANCH == "production"
      when: never
    - if: $CI_COMMIT_BRANCH

# 下线分支预览环境（环境停止时由 GitLab 触发执行，when: manual 仅避免其在普通流水线中自动执行）
stop_dev:
  <<: *ssh_template
  stage: deploy
  variables:
    GIT_STRATEGY: none
  script:
    - ssh $REVIEW_SSH "rm -rf /srv/preview/$CI_COMMIT_REF_SLUG"
  environment:
    name: dev/$CI_COMMIT_REF_SLUG
    action: stop
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
      when: never
    - if: $CI_COMMIT_BRANCH == "pre-production"
      when: never
    - if: $CI_COMMIT_BRANCH == "production"
      when: never
    - if: $CI_COMMIT_BRANCH
      when: manual

# 同步 nginx 配置（staging/pre/review 配置与公共片段 scp 到各机器宿主机，容器只读挂载；nginx 为容器名，重复 scp 幂等）
sync_nginx_config:
  <<: *ssh_template
  stage: deploy
  script:
    - scp nginx/conf.d/10-staging.conf $STAGING_SSH:/etc/nginx/conf.d/
    - scp nginx/conf.d/20-pre-production.conf $PRE_SSH:/etc/nginx/conf.d/
    - scp nginx/conf.d/90-review.conf $REVIEW_SSH:/etc/nginx/conf.d/
    - scp nginx/snippets/common.conf $STAGING_SSH:/etc/nginx/snippets/
    - scp nginx/snippets/common.conf $PRE_SSH:/etc/nginx/snippets/
    - scp nginx/snippets/common.conf $REVIEW_SSH:/etc/nginx/snippets/
    - ssh $STAGING_SSH "docker exec nginx nginx -t && docker exec nginx nginx -s reload"
    - ssh $PRE_SSH "docker exec nginx nginx -t && docker exec nginx nginx -s reload"
    - ssh $REVIEW_SSH "docker exec nginx nginx -t && docker exec nginx nginx -s reload"
  # 配置变更仅随保留分支晋升流水同步
  rules:
    - changes: ["nginx/**/*"]
      if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
    - changes: ["nginx/**/*"]
      if: $CI_COMMIT_BRANCH == "pre-production"
    - changes: ["nginx/**/*"]
      if: $CI_COMMIT_BRANCH == "production"

# 部署内网测试环境（main 分支，固定测试域名，静态文件由 CI 上传）
deploy_staging:
  <<: *ssh_template
  stage: deploy
  needs: ["build_app"]
  script:
    - ssh $STAGING_SSH "mkdir -p /srv/apps/$CI_PROJECT_NAME"
    - scp -r ./dist/* $STAGING_SSH:/srv/apps/$CI_PROJECT_NAME/
  environment:
    name: staging
    url: https://dev.example.com
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

# 部署灰度环境（pre-production 分支，正式服务器，暂无外网访问）
deploy_pre_production:
  <<: *docker_template
  stage: deploy
  needs: ["build_docker"]
  environment:
    name: pre-production
    url: https://pre.example.com
  script:
    # 上传静态资源到阿里云 OSS（目录按 $CI_ENVIRONMENT_SLUG 与生产隔离）
    - apk add --no-cache curl
    - curl -fsSL https://gosspublic.alicdn.com/ossutil/install.sh | bash
    - ossutil config -i $ALI_ACCESS_KEY_ID -k $ALI_ACCESS_KEY_SECRET -e $OSS_ENDPOINT
    - ossutil cp -rf ./dist oss://$OSS_BUCKET/$CI_ENVIRONMENT_SLUG/ --exclude "index.html,service-worker.js" --meta
    - docker pull $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:pre
    - docker push $CI_REGISTRY_IMAGE:pre
  rules:
    - if: $CI_COMMIT_BRANCH == "pre-production"

# 部署到生产环境（production 分支，手动触发）
deploy_production:
  <<: *docker_template
  stage: deploy
  needs: ["build_docker"]
  environment:
    name: production
    url: https://example.com
  script:
    # 上传静态资源到阿里云 OSS（目录按 $CI_ENVIRONMENT_SLUG 与灰度隔离）
    - apk add --no-cache curl
    - curl -fsSL https://gosspublic.alicdn.com/ossutil/install.sh | bash
    - ossutil config -i $ALI_ACCESS_KEY_ID -k $ALI_ACCESS_KEY_SECRET -e $OSS_ENDPOINT
    - ossutil cp -rf ./dist oss://$OSS_BUCKET/$CI_ENVIRONMENT_SLUG/ --exclude "index.html,service-worker.js" --meta
    # 上传静态资源到腾讯云 COS
    # - apk add --no-cache python3 py3-pip
    # - pip install coscmd
    # - coscmd config -a $TENCENT_SECRET_ID -s $TENCENT_SECRET_KEY -b $COS_BUCKET -r $COS_REGION
    # - coscmd upload -r ./dist /$CI_ENVIRONMENT_SLUG/ --ignore "index.html,service-worker.js"
    - docker pull $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:prod
    - docker push $CI_REGISTRY_IMAGE:prod
  when: manual
  rules:
    - if: $CI_COMMIT_BRANCH == "production"
```

<details>
<summary>四层环境说明与 nginx 配置</summary>

四层环境与分支的对应关系：

| 分支 | Job | 环境域名 | 说明 |
| --- | --- | --- | --- |
| 其他分支 | `deploy_dev` | `https://<分支slug>.example.dev` | 分支预览环境，15 天自动下线 |
| `main` | `deploy_staging` | `https://dev.example.com` | 内网测试环境，仅内网 DNS 解析 |
| `pre-production` | `deploy_pre_production` | `https://pre.example.com` | 正式服务器灰度环境，暂无外网访问 |
| `production` | `deploy_production` | `https://example.com` | 正式环境，手动触发 |

nginx 配置与环境分离：正式环境 server 块位于主 `nginx.conf`，随镜像分发；其余三个环境各一个文件，存放于 `nginx/conf.d/`，由 `sync_nginx_config` 上传到对应机器宿主机，容器只读挂载，每台机器只加载自己的环境配置。

环境配置：

- `conf.d/10-staging.conf`：`server_name dev.example.com`，`allow <内网网段>; deny all;`
- `conf.d/20-pre-production.conf`：`server_name pre.example.com`，`allow <内网网段>; deny all;`
- `conf.d/90-review.conf`：`server_name ~^(?<branch>[a-z0-9-]+)\.example\.dev$`，一个正则块覆盖所有分支预览域名，`root /srv/preview/$branch`

前置条件：

- DNS：`*.example.dev` 泛解析指向预览服务器；泛域名证书须通过 DNS-01 挑战签发
- 证书：`example.com`、`*.example.com`（staging/pre 共用）、`*.example.dev`（review）
- GitLab CI/CD Variables：`SSH_PRIVATE_KEY`（部署私钥，按机器拆分受限 deploy 用户）、`STAGING_SSH`、`PRE_SSH`、`REVIEW_SSH`（各机器登录目标，如 `deploy@example.dev`）

<Tabs>
  <TabItem value="layout" label="目录布局" default>
  ```text
  nginx/
  ├── nginx.conf              # 主配置，含正式环境 server 块
  ├── conf.d/
  │   ├── 10-staging.conf
  │   ├── 20-pre-production.conf
  │   └── 90-review.conf
  └── snippets/
      └── common.conf
  ```
  </TabItem>
  <TabItem value="staging" label="10-staging.conf">
  `20-pre-production.conf` 仅 `server_name`、`root` 不同：

  ```nginx
  server {
      listen 443 ssl;
      http2 on;
      server_name dev.example.com;

      # 仅内网访问
      allow 10.0.0.0/8;
      deny all;

      ssl_certificate     /etc/nginx/certs/example.com.crt;
      ssl_certificate_key /etc/nginx/certs/example.com.key;

      root /srv/staging/smart-factory-web;
      index index.html;

      include /etc/nginx/snippets/common.conf;

      location / {
          try_files $uri $uri/ /index.html;
      }
  }
  ```
  </TabItem>
  <TabItem value="review" label="90-review.conf">
  ```nginx
  server {
      listen 443 ssl;
      http2 on;
      # 捕获子域名作为目录名：feat-a.example.dev → /srv/preview/feat-a
      server_name ~^(?<branch>[a-z0-9-]+)\.example\.dev$;

      ssl_certificate     /etc/nginx/certs/example.dev.crt;
      ssl_certificate_key /etc/nginx/certs/example.dev.key;

      root /srv/preview/$branch;
      index index.html;

      include /etc/nginx/snippets/common.conf;

      location / {
          try_files $uri $uri/ /index.html;
      }
  }
  ```
  </TabItem>
  <TabItem value="common" label="snippets/common.conf">
  add_header 与 location 不跨 server 块继承，公共部分抽到此文件，各环境块 include 复用：

  ```nginx
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

  location ~* /\.(?!well-known\/) {
      deny all;
  }

  location ~* (?:#.*#|\.(?:bak|conf|dist|fla|in[ci]|log|orig|psd|sh|sql|sw[op])|~)$ {
      deny all;
  }
  ```
  </TabItem>
  <TabItem value="volumes" label="容器挂载">
  ```yaml
  volumes:
    - /etc/nginx/conf.d:/etc/nginx/conf.d:ro     # 环境配置，sync_nginx_config 上传
    - /etc/nginx/snippets:/etc/nginx/snippets:ro # 公共片段，sync_nginx_config 上传
    - /etc/nginx/certs:/etc/nginx/certs:ro       # 证书，不进镜像
    - /srv/preview:/srv/preview:ro              # 静态文件，CI scp；staging 机器为 /srv/staging
  ```
  </TabItem>
</Tabs>

- 文件名数字前缀控制 `include conf.d/*.conf` 的字典序加载顺序，便于排错；请求命中哪个块由 `server_name` 匹配规则（精确 > 通配符 > 正则）决定
- `CI_COMMIT_REF_SLUG` 将分支名转换为小写 DNS 标签（`feat/a` → `feat-a`），最长 63 字符，与 review 块字符类 `[a-z0-9-]` 一致；清洗结果相同的分支共享同一环境
- review 正则块配置后不再改动，`deploy_dev`/`stop_dev` 只做静态文件上传与删除，不触碰 nginx
- 灰度环境暂无外网访问，由 server 块内 `allow/deny`、仅内部 DNS 解析、防火墙限制来源三种方式任选
- `pre-production` 与 `production` 的 OSS 目录通过 `$CI_ENVIRONMENT_SLUG` 隔离，镜像标签分别为 `:pre`、`:prod`；灰度验收通过后将 `pre-production` 合并至 `production` 手动发布，两个环境部署同一 commit
- `auto_stop_in: 15 days` 到期后 GitLab 自动调度 `stop_dev` 清理并下线环境；下线 job 失败遗留的目录由服务器 cron 清理：

```bash
# 每天 3 点清理 16 天未更新的预览目录
0 3 * * * find /srv/preview -maxdepth 1 -mindepth 1 -type d -mtime +16 -exec rm -rf {} +
```

</details>

## Orval

:::info
[Orval](https://orval.dev/) 是一个根据 OpenAPI/Swagger 规范自动生成 TypeScript 类型定义、 API 客户端代码和 Zod 校验层的工具，可减少手写样板代码并保证类型与后端契约一致。

TypeScript 类型仅保证编译期静态安全，运行时数据可能不符合约定，Zod 则通过在运行时校验并转换接口返回数据，校验失败时可安全降级，且 Schema 与类型同源，确保前后端契约一致。
:::

<Tabs>
  <TabItem value="orval.config.ts" label="orval.config.ts" default>
  ```ts
  // orval.config.ts
  import { defineConfig } from 'orval';

  export default defineConfig({
    api: {
      output: {
        mode: 'tags-split',
        target: 'src/api/',
        schemas: 'src/api/model',
        client: 'react-query',
        httpClient: 'axios',
        mock: true,
        override: {
          mutator: {
          path: 'src/api/mutator/axiosInstance.ts',
          name: 'axiosInstance',
        },
        allParamsOptional: true,
        urlEncodeParameters: true,
        indexFiles: true,
        tagsSplitDeduplication: true,
        clean: true,
      },
      input: {
        target: 'https://openapi-v3-specification.example.com',
      },
    },
    apiZod: {
      output: {
        mode: 'tags-split',
        target: 'src/api/zod',
        client: 'zod',
        indexFiles: true,
        tagsSplitDeduplication: true,
        clean: true,
      },
      input: {
        target: 'https://openapi-v3-specification.example.com',
      },
    },
  });
   ```
  </TabItem>
  <TabItem value="axiosInstance.ts" label="axiosInstance.ts">
  ```ts
  import Axios from 'axios';
  import type { AxiosRequestConfig, AxiosError } from 'axios';
  import { useAuthStore } from '@/stores/auth';

  export const AXIOS_INSTANCE = Axios.create({
    baseURL: import.meta.env.BASE_API_URL,
    adapter: 'fetch'
  });

  // Request interceptor for auth
  AXIOS_INSTANCE.interceptors.request.use(
    (config) => {
      const authStore = useAuthStore.getState();
      const token = authStore?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Response interceptor for error handling
  AXIOS_INSTANCE.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized
        window.location.href = '/login';
      }
      return Promise.reject(error);
    },
  );

  export const axiosInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
  ): Promise<T> => {
    return AXIOS_INSTANCE({
      ...config,
      ...options,
    }).then(({ data }) => data);
  };

  export type ErrorType<Error> = AxiosError<Error>;
  export type BodyType<BodyData> = BodyData;
  ```
  </TabItem>
</Tabs>

## Electron

:::tip
Electron 项目推荐使用 Vite 作为构建工具，使用 Electron 官方提供的 [electron-builder](https://www.electron.build/) 进行打包和发布。
:::


<Tabs>
  <TabItem value="electron-builder.json5" label="electron-builder.json5" default>
   ```json5
   {
     "$schema": "https://raw.githubusercontent.com/electron-userland/electron-builder/master/packages/app-builder-lib/scheme.json",
     "appId": "com.example.app",
     "asar": true,
     "asarUnpack": [
       "dist-electron/**/*.node"
     ],
     "electronFuses": {
       runAsNode: false,
       enableCookieEncryption: true,
       enableNodeOptionsEnvironmentVariable: false,
       enableNodeCliInspectArguments: false,
       enableEmbeddedAsarIntegrityValidation: true,
       onlyLoadAppFromAsar: true
     },
     "productName": "ExampleAppName",
     "directories": {
       "output": "release/${version}"
     },
     "files": [
       "dist",
       "dist-electron",
       "!dist-electron/**/*.map"
     ],
     "extraResources": [],
     "mac": {
       "target": [
          "dmg"
       ],
       "artifactName": "${productName}-Mac-${version}-Installer.${ext}"
     },
     "win": {
       "target": [
         {
           "target": "nsis",
           "arch": [
             "x64"
           ]
         }
       ],
       "artifactName": "${productName}-Windows-${version}-Setup.${ext}"
     },
     "nsis": {
       "oneClick": false,
       "perMachine": false,
       "allowToChangeInstallationDirectory": true,
       "deleteAppDataOnUninstall": false
     },
     "linux": {
       "target": [
         "AppImage"
       ],
       "artifactName": "${productName}-Linux-${version}.${ext}"
     }
   }
   ```
  </TabItem>
  <TabItem value="vite.config.ts" label="vite.config.ts">
  ```ts
  // vite.config.ts
  import electron from 'vite-plugin-electron/simple';

  // https://vite.dev/config/
  export default defineConfig({
    plugins: [
      // ...
      electron({
        main: {
          entry: 'electron/main.ts',
        },
        preload: {
          input: 'electron/preload.ts',
        },
      }),
    ],
  });
  ```
  </TabItem>
  <TabItem value="vite.main.config.ts" label="vite.main.config.ts">
  ```ts
  // vite.main.config.ts
  import { defineConfig } from 'vite';

  export default defineConfig({
    build: {
      lib: {
        entry: 'electron/main.ts',
        formats: ['es'],
      },
      rollupOptions: {
        output: {
          entryFileNames: 'main.js',
        },
      },
    },
  });
  ```
  </TabItem>
  <TabItem value="vite.preload.config.ts" label="vite.preload.config.ts">
  ```ts
  // vite.preload.config.ts
  import { defineConfig } from 'vite';

  export default defineConfig({
    build: {
      lib: {
        entry: 'electron/preload.ts',
        formats: ['cjs'],
      },
    },
  });
  ```
  </TabItem>
</Tabs>
