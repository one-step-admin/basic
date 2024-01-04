<script setup lang="ts">
import PreviewWindows from './PreviewWindows/index.vue'
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'ToolbarLeftSide',
})

const settingsStore = useSettingsStore()
</script>

<template>
  <div class="flex items-center">
    <PreviewWindows v-if="settingsStore.settings.toolbar.previewWindows" />
  </div>
</template>
