<script setup lang="ts">
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
</script>

<template>
  <div class="action-container absolute left-0 top-0 h-full w-full flex flex-col">
    <div class="flex-1 of-hidden">
      <OverlayScrollbarsComponent :options="{ scrollbars: { autoHide: 'leave', autoHideDelay: 300 } }" defer class="h-full">
        <slot />
      </OverlayScrollbarsComponent>
    </div>
    <div v-if="$slots.action" class="z-1 flex-center border-t border-t-(stone-2 solid) bg-[var(--g-app-bg)] p-4 transition-background-color-300 dark:border-t-stone-8">
      <slot name="action" />
    </div>
  </div>
</template>
