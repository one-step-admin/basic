<script setup lang="ts">
defineOptions({
  name: 'PageHeader',
})

defineProps<{
  title?: string
  content?: string
}>()

const slots = useSlots()
</script>

<template>
  <div class="page-header flex items-center justify-between flex-wrap gap-5 mb-5 px-5 py-4 border-b-(~ solid stone-2) dark:border-b-stone-8 bg-[var(--g-app-bg)] transition-background-color-300">
    <div class="main flex-[1_1_70%]">
      <div class="text-2xl">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="mt-2 text-sm text-stone-5 empty:hidden">
        <slot name="content">
          {{ content }}
        </slot>
      </div>
    </div>
    <div v-if="slots.default" class="flex-none ml-a">
      <slot />
    </div>
  </div>
</template>
