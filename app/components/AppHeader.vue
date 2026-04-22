<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";

const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");
const router = useRouter();

const { header } = useAppConfig();

// 处理导航路径，确保正确映射
function getNavigationPath(item: ContentNavigationItem) {
  console.log("getNavigationPath item:", item);
  console.log("getNavigationPath item._path:", item._path);
  console.log("getNavigationPath item.path:", item.path);
  console.log("getNavigationPath item.to:", item.to);

  // 优先使用to属性，其次使用_path，最后使用path
  let path = item.to || item._path || item.path || "/";
  
  console.log("getNavigationPath before processing:", path);

  // 如果路径以数字和点开头，去掉数字前缀
  if (path && /^\/\d+\./.test(path)) {
    path = path.replace(/^\/\d+\./, "/");
  }
  
  console.log("getNavigationPath after processing:", path);
  return path;
}

// 处理导航点击事件
function handleNavigation(item: ContentNavigationItem) {
  const path = getNavigationPath(item);
  console.log("Navigating to:", path);
  router.push(path);
}

// 调试：输出导航数据
console.log("Navigation data:", navigation.value);
</script>

<template>
  <UHeader
    :ui="{
      center: 'flex-1',
      wrapper:
        'border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900',
    }"
    :to="header?.to || ''"
  >
    <template #left>
      <NuxtLink :to="header?.to || ''" class="flex items-center gap-2">
        <div
          class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"
        >
          <span class="text-white font-bold text-lg">随</span>
        </div>
        <span class="text-xl font-bold">随心博客</span>
      </NuxtLink>

      <div class="hidden lg:flex items-center gap-1 ml-6">
        <UButton
          v-for="(item, index) in navigation"
          :key="index"
          :label="item.title"
          color="neutral"
          variant="ghost"
          size="md"
          class="font-medium"
          @click="handleNavigation(item)"
        />
      </div>
    </template>

    <template #center>
      <UContentSearchButton
        v-if="header?.search"
        :collapsed="false"
        class="w-full max-w-md"
        placeholder="搜索文章..."
      />
    </template>

    <template #right>
      <UContentSearchButton v-if="header?.search" class="lg:hidden" />

      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #body>
      <UContentNavigation highlight :navigation="navigation" />
    </template>
  </UHeader>
</template>
