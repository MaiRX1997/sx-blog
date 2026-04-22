<script setup lang="ts">
const { seo } = useAppConfig();

// 处理导航路径，去掉数字前缀
function processNavigation(navigation: any[]) {
  if (!navigation) return [];
  return navigation.map((item) => {
    // 处理当前项的路径
    if (item._path && /^\/\d+\./.test(item._path)) {
      item._path = item._path.replace(/^\/\d+\./, "/");
    }
    // 递归处理子项
    if (item.children && item.children.length > 0) {
      item.children = processNavigation(item.children);
    }
    return item;
  });
}

const { data: navigation } = await useAsyncData("navigation", () =>
  queryCollectionNavigation("docs"),
);
const { data: files } = useLazyAsyncData(
  "search",
  () => queryCollectionSearchSections("docs"),
  {
    server: false,
  },
);

// 处理导航数据
if (navigation.value) {
  navigation.value = processNavigation(navigation.value);
}

// 调试：输出导航数据
console.log("Navigation data APP:", navigation.value);

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});

useSeoMeta({
  titleTemplate: `%s - ${seo?.siteName}`,
  ogSiteName: seo?.siteName,
  ogImage: "https://ui.nuxt.com/assets/templates/nuxt/docs-light.png",
  twitterCard: "summary_large_image",
});

provide("navigation", navigation);
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <AppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" />
    </ClientOnly>
  </UApp>
</template>
