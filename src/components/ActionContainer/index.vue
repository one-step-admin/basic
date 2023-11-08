<template>
  <div class="action-container absolute top-0 left-0 w-full h-full flex flex-col">
    <div class="flex-1 of-hidden">
      <ElScrollbar>
        <slot />
      </ElScrollbar>
    </div>
    <div v-if="$slots.action" class="flex-center z-1 p-4 border-t-(~ solid stone-2) dark:border-t-stone-8 bg-[var(--g-app-bg)] transition-background-color-300">
      <slot name="action" />
    </div>
  </div>
</template>
