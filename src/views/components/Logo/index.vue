<script setup lang="ts">
import imgLogo from '@/assets/images/logo.png'

defineOptions({
  name: 'Logo',
})

withDefaults(
  defineProps<{
    showLogo?: boolean
    showTitle?: boolean
  }>(),
  {
    showLogo: true,
    showTitle: true,
  },
)

const title = ref(import.meta.env.VITE_APP_TITLE)
const logo = ref(imgLogo)
</script>

<template>
  <div class="flex-center gap-2 w-inherit h-[var(--g-sidebar-logo-height)] px-3 text-inherit" :title="title">
    <img v-if="showLogo" :src="logo" class="logo w-[30px] h-[30px] object-contain">
    <span v-if="showTitle" class="block font-bold truncate">{{ title }}</span>
  </div>
</template>
