// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/content",
    "nuxt-og-image",
    "nuxt-llms",
    "@nuxtjs/mcp-toolkit",
  ],

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  content: {
    build: {
      markdown: {
        toc: {
          searchDepth: 1,
        },
      },
    },
    // 新增：在构建时自动处理文件路径，去掉排序数字
    transform: {
      // filename 处理实际的路由路径
      filename: (filename: string) => {
        // 匹配类似 1.start.md, 02.guide.md，替换为 start.md, guide.md
        return filename.replace(/^(\d+[\.\-\_]*)/, "");
      },
    },
  },

  experimental: {
    asyncContext: true,
  },

  compatibilityDate: "2024-07-11",

  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: true,
      autoSubfolderIndex: false,
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },

  icon: {
    provider: "iconify",
  },

  llms: {
    domain: "https://docs-template.nuxt.dev/",
    title: "Nuxt Docs Template",
    description:
      "A template for building documentation with Nuxt UI and Nuxt Content.",
    full: {
      title: "Nuxt Docs Template - Full Documentation",
      description: "This is the full documentation for the Nuxt Docs Template.",
    },
    sections: [
      {
        title: "Getting Started",
        contentCollection: "docs",
        contentFilters: [
          { field: "path", operator: "LIKE", value: "/getting-started%" },
        ],
      },
      {
        title: "Essentials",
        contentCollection: "docs",
        contentFilters: [
          { field: "path", operator: "LIKE", value: "/essentials%" },
        ],
      },
    ],
  },

  mcp: {
    name: "Docs template",
  },
});
