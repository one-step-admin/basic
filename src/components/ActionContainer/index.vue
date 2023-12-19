<template>
  <div class="action-container absolute left-0 top-0 h-full w-full flex flex-col">
    <div class="flex-1 of-hidden">
      <ElScrollbar>
        <slot />
      </ElScrollbar>
    </div>
    <div v-if="$slots.action" class="z-1 flex-center border-t border-t-(stone-2 solid) bg-[var(--g-app-bg)] p-4 transition-background-color-300 dark:border-t-stone-8">
      <slot name="action" />
    </div>
  </div>
</template>
