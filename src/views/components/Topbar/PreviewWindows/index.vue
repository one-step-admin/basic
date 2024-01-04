<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import useWindowStore from '@/store/modules/window'

defineOptions({
  name: 'PreviewWindows',
})

const settingsStore = useSettingsStore()
const windowStore = useWindowStore()

function previewAllWindows() {
  settingsStore.$patch({
    previewAllWindows: true,
  })
}
</script>

<template>
  <span
    class="flex-center cursor-pointer px-2 py-1" :class="{
      'op-30 cursor-not-allowed': windowStore.list.length <= 1,
    }" @click="windowStore.list.length > 1 && previewAllWindows()"
  >
    <SvgIcon name="i-icon-park-outline:all-application" />
  </span>
</template>
