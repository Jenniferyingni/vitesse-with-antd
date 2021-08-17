<template>
  <main
    class="w-full min-h-full flex flex-col bg-gray-10 dark:bg-black text-gray-70 dark:text-gray-20 overflow-hidden"
  >
    <Header class="w-full fixed top-0 z-50"/>
    <div class="flex-1 flex min-h-0 mt-16">
      <article class="overflow-auto w-full py-4 px-18 dark:bg-gray-80">
        <router-view v-slot="{ Component }">
          <transition
            name="fade"
            enter-active-class="transition easing-entrance duration-250"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition easing-exit duration-150"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </article>
    </div>
  </main>
</template>