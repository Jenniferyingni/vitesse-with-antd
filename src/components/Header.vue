<template>
  <header class="flex bg-white shadow-md">
    <div
      class="flex items-center justify-between w-full px-20 border-gray-100 dark:bg-gray-900 dark:border-b-0 border-b-1"
    >
      <div class="flex items-center w-3/4">
        <div class="flex mr-10 mt-2">
          <logos:webplatform class="text-2xl mr-3" />
          <span class="text-blue-900 dark:text-white font-semibold text-xs">
            Website
            <br />logo
          </span>
        </div>
        <a-tabs
          v-model:activeKey="activeKey"
          class="w-2/3 pt-2"
          tab-bar-style="margin-bottom: 0; border-bottom: none"
        >
          <a-tab-pane key="/">
            <template #tab>
              <div class="py-2">
                <dashicons:index-card class="mr-2" />
                <strong class="align-top">Tab1</strong>
              </div>
            </template>
          </a-tab-pane>
          <a-tab-pane key="/tab2">
            <template #tab>
              <span class="py-2">
                <gg:menu-boxed class="mr-2" />
                <strong class="align-top">Tab2</strong>
              </span>
            </template>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div>
        <a-switch v-model:checked="darkSwitch" class="bg-purple-500 my-switch">
          <template #checkedChildren>
            <noto-v1:sun-with-face class="mt-0.5" />
          </template>
          <template #unCheckedChildren>
            <noto-v1:last-quarter-moon-face class="mt-0.5" />
          </template>
        </a-switch>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useToggleDark } from "~/hooks";
const { isDark, toggleDark } = useToggleDark();

const router = useRouter()
const store = useStore()

import { useStore } from "vuex";

//tab相关逻辑
const activeKey = ref('/')
watch(activeKey, (activeKey) => {
  router.push(activeKey)
})

//暗黑模式开关逻辑
const darkSwitch = ref(isDark.value)
watch(darkSwitch, () => {
  toggleDark()
})


onMounted(() => {
  activeKey.value = router.currentRoute.value.path
  store.dispatch("actionGetUserInfo")
})

</script>