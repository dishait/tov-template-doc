import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "tov-template",
  description: "vite + vue3 + ts 开箱即用现代开发模板",
  lang: "zh-CN",
  lastUpdated: true,
  metaChunk: true,
  srcExclude: ['README.md'],
  head: [
    [
      "meta",
      {
        name: "Keywords",
        content: "tov-template,ts,vite,vue3,开箱即用模板",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/logo.png",
      },
    ],
  ],
  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "指南", link: "/guide/what-is-tov-template" },
      { text: "分享", link: "/shared" },
    ],
    search: {
      provider: "local",
    },
    sidebar: {
      "/guide/": {
        base: "/guide/",
        items: [
          { text: "起步", link: "/getting-started" },
          {
            text: "tov-template 是什么？",
            link: "/what-is-tov-template",
          },
        ],
      },
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/dishait/tov-template" },
    ],
    footer: {
      copyright: `Copyright © 2023 tov-template-doc.deno.dev All rights reserved 帝莎编程学院 版权所有`,
    },
  },
});
