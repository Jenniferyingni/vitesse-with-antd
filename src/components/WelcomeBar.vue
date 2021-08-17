<template>
  <div class="flex justify-between w-full h-24 p-4 enter-x bg-white dark:bg-gray-90 mb-4 rounded-lg shadow-md">
    <div class="flex flex-row w-2/3 justify-between items-center">
      <div class="w-1/2">
        <h1 class="text-lg font-semibold">
          {{ sayHi }},
        </h1>
        <p class="mb-0">
          {{ `欢迎回来，xxxx 😊` }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// import { useStore } from "vuex";
// const store = useStore();
// const userInfo = computed(() => store.state.userInfo)

const today = ref<Date>(new Date())
const sayHi = computed(() => {
  const currentHour = today.value.getHours()
  return currentHour < 12 ? '早上好' : currentHour < 18 ? '下午好' : '晚上好'
})
</script>