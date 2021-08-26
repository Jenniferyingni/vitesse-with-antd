<template>
  <div class="w-full h-30 mt-4">
    <a-button type="primary" shape="round" size="large" class="mb-2">操作按钮</a-button>
    <a-button type="primary" shape="round" size="large" class="mb-2" @click="toggleTheme">切换主题</a-button>
    <div class="w-full min-h-80 shadow-md p-4">
      <h1 class="text-lg font-semibold">BlockTwo</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToggleTheme } from "~/hooks"
const { toggleTheme } = useToggleTheme();
</script>