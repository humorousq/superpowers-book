import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  title: "Superpowers: AI 编码代理的完整工作流",
  description: "深入学习如何使用 Superpowers 系统提升你的 AI 编码代理效率",
  lang: 'zh-CN',

  // GitHub Pages 部署配置
  base: '/superpowers-book/',

  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'og:type', content: 'book' }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: 'GitHub', link: 'https://github.com/obra/superpowers' }
    ],

    sidebar: [
      {
        text: '开始',
        items: [
          { text: '简介', link: '/' }
        ]
      },
      {
        text: '基础篇',
        collapsed: false,
        items: [
          { text: '第一章：Superpowers 简介', link: '/chapter-01' },
          { text: '第二章：平台适配', link: '/chapter-02' },
          { text: '第三章：核心 Skills 详解', link: '/chapter-03' },
          { text: '第四章：工作流深入理解', link: '/chapter-04' }
        ]
      },
      {
        text: '进阶篇',
        collapsed: false,
        items: [
          { text: '第五章：设计文档解析', link: '/chapter-05' },
          { text: '第六章：实施计划示例', link: '/chapter-06' },
          { text: '第七章：测试与质量保证', link: '/chapter-07' },
          { text: '第八章：跨平台兼容性', link: '/chapter-08' }
        ]
      },
      {
        text: '高级篇',
        collapsed: false,
        items: [
          { text: '第九章：高级主题与扩展', link: '/chapter-09' },
          { text: '第十章：实战案例', link: '/chapter-10' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/my-book' }
    ],

    footer: {
      message: '基于 CC BY 4.0 许可发布',
      copyright: 'Copyright 2025 作者'
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3]
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    }
  },

  markdown: {
    lineNumbers: true
  }
}), {
  // Mermaid 配置选项
  mermaid: {
    theme: 'default',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'basis'
    },
    themeVariables: {
      fontSize: '16px'
    }
  }
})
