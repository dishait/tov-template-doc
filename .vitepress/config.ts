import { defineConfig } from "vitepress";
import fg from "fast-glob";

function sortFiles(files: string[]) {
  const reg = /(?<=\/)\d*(?=\.)/g;

  const caches = {};
  function getOrders(v) {
    if (!caches[v]) {
      caches[v] = Array.from(v.match(reg) ?? []).map(Number);
    }
    return caches[v];
  }

  files.sort((a: string, b: string) => {
    if (a.endsWith("index.md")) {
      return 1;
    }
    const [l1, l2] = getOrders(a);
    const [r1, r2] = getOrders(b);
    if (l1 > r1) {
      return 1;
    }
    if (l1 < r1) {
      return -1;
    }

    if (l2 > r2) {
      return 1;
    }
    return -1;
  });

  return files;
}

const guideRoutes = sortFiles(fg.sync("guide/**/*.md")).map((file) => {
  const path = file.replace("guide/", "").replace(".md", "");
  return {
    text: path.replace(/\d*\.?/, ""),
    link: `/guide/${path}`,
  };
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "tov-template",
  description: "vite + vue3 + ts 开箱即用现代开发模板",
  lang: "zh-CN",
  lastUpdated: true,
  metaChunk: true,
  srcExclude: ["README.md"],
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
    [
      "link",
      {
        href: "/global.css",
        rel: "stylesheet",
      },
    ],
  ],
  themeConfig: {
    logo: "/logo.png",
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    nav: [
      { text: "指南", link: guideRoutes[0].link },
    ],
    search: {
      provider: "local",
    },
    sidebar: {
      "/guide/": [...guideRoutes],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/dishait/tov-template" },
      {
        icon: {
          svg:
            '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><g fill="#15be83"><path fill-rule="evenodd" d="M15.328 7.542H8.672c-3.374 0-5.062 0-6.01.987c-.948.987-.725 2.511-.278 5.56l.422 2.892c.35 2.391.525 3.587 1.422 4.303c.898.716 2.22.716 4.867.716h5.81c2.646 0 3.97 0 4.867-.716c.897-.716 1.072-1.912 1.422-4.303l.422-2.892c.447-3.049.67-4.573-.278-5.56c-.948-.987-2.636-.987-6.01-.987Zm-.747 8.252c.559-.346.559-1.242 0-1.588l-3.371-2.09c-.543-.337-1.21.101-1.21.794v4.18c0 .693.667 1.13 1.21.794l3.371-2.09Z" clip-rule="evenodd"/><path d="M8.51 2h6.98c.232 0 .41 0 .566.015c1.108.109 2.015.775 2.4 1.672H5.543c.384-.897 1.291-1.563 2.399-1.672C8.099 2 8.277 2 8.51 2Z" opacity=".4"/><path d="M6.31 4.723c-1.39 0-2.53.84-2.911 1.953a2.587 2.587 0 0 0-.023.07c.398-.12.812-.199 1.232-.253c1.08-.138 2.446-.138 4.032-.138h6.892c1.586 0 2.951 0 4.032.138a7.69 7.69 0 0 1 1.232.253a2.453 2.453 0 0 0-.023-.07c-.38-1.114-1.521-1.953-2.912-1.953H6.311Z" opacity=".7"/></g></svg>',
        },
        link: "https://pc.dishait.cn/",
      },
    ],
    footer: {
      copyright:
        `Copyright © 2023 tov-template-doc.deno.dev All rights reserved 帝莎编程学院 版权所有`,
    },
  },
});
