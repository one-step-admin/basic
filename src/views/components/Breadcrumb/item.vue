<script setup lang="ts">
withDefaults(
  defineProps<{
    replace?: boolean
    separator?: string
  }>(),
  {
    separator: '/',
  },
)
</script>

<template>
  <div class="breadcrumb-item flex items-center text-dark dark:text-white">
    <span class="separator mx-2">
      {{ separator }}
    </span>
    <span class="text flex items-center opacity-60">
      <slot />
    </span>
  </div>
</template>
