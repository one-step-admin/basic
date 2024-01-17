<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'

defineOptions({
  name: 'Fullscreen',
})

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <span class="flex-center cursor-pointer px-2 py-1" @click="toggle">
    <SvgIcon :name="isFullscreen ? 'i-ri:fullscreen-exit-line' : 'i-ri:fullscreen-line'" />
  </span>
</template>
