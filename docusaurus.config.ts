import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '老魏的工作笔记',
  tagline: '前端架构与开发最佳实践',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://weihongyu12.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/web/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'weihongyu12', // Usually your GitHub org/user name.
  projectName: 'weihongyu12.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '老魏的工作笔记',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'gettingStartedSidebar',
          position: 'left',
          label: 'Getting Started',
        },
        {
          type: 'docSidebar',
          sidebarId: 'specificationSidebar',
          position: 'left',
          label: '规范',
        },
        {
          type: 'docSidebar',
          sidebarId: 'referenceSidebar',
          position: 'left',
          label: '参考',
        },
        {
          type: 'docSidebar',
          sidebarId: 'pipelineSidebar',
          position: 'left',
          label: '流水线',
        },
        {
          type: 'docSidebar',
          sidebarId: 'featuresSidebar',
          position: 'left',
          label: '功能设计',
        },
        {
          to: '/docs/support',
          position: 'left',
          label: '支持',
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://weihongyu12.github.io/miniprogram/',
          label: '小程序版',
          position: 'right',
        },
        {
          href: 'https://weihongyu12.github.io/node/',
          label: 'Node.js 版',
          position: 'right',
        },
        {
          href: 'https://github.com/weihongyu12',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/',
            },
            {
              label: '规范',
              to: '/docs/specification/code/',
            },
            {
              label: '代码规则',
              to: '/docs/specification/rule/',
            },
          ],
        },
        {
          title: 'Reference',
          items: [
            {
              label: '性能优化',
              to: '/docs/reference/performance/',
            },
            {
              label: '安全',
              to: '/docs/reference/security/',
            },
            {
              label: 'SEO',
              to: '/docs/reference/seo/',
            },
            {
              label: '配置参考',
              to: '/docs/reference/configuration/',
            },
            {
              label: '流水线',
              to: '/docs/pipeline/branch-commit/',
            },
            {
              label: '功能设计',
              to: '/docs/features/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: '小程序版',
              href: 'https://weihongyu12.github.io/miniprogram/',
            },
            {
              label: 'Node.js 版',
              href: 'https://weihongyu12.github.io/node/',
            },
            {
              label: 'Blog',
              href: 'https://weihongyu.com/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/weihongyu12',
            },
            {
              label: 'Donation 捐赠',
              to: '/docs/support',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Wei Hongyu. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'json5',
        'scss',
        'http',
        'docker',
        'nginx',
        'java',
        'php',
        'csharp',
      ],
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    '@docusaurus/plugin-pwa',
  ],

  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
    mermaid: true,
  },

  future: {
    faster: true,
    v4: true,
  },
};

export default config;
