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
  <div class="h-[var(--g-sidebar-logo-height)] w-inherit flex-center gap-2 px-3 text-inherit" :title="title">
    <img v-if="showLogo" :src="logo" class="logo h-[30px] w-[30px] object-contain">
    <span v-if="showTitle" class="block truncate font-bold">{{ title }}</span>
  </div>
</template>
