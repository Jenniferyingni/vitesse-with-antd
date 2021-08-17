<template>
  <div class="flex flex-col h-full">
    <WelcomeBar />
    <div class="flex w-full">
      <div class="flex w-2/3 enter-x">
        <div class="flex flex-col w-full">
          <BlockOne />
          <BlockTwo />
        </div>
      </div>
      <div class="flex flex-col w-1/3 pl-4 enter-x">
        <BlockThree/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
