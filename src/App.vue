<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import hotkeys from 'hotkeys-js'
import Provider from './ui-provider/index.vue'
import eventBus from './utils/eventBus'

const settingsStore = useSettingsStore()

watch(() => settingsStore.title, () => {
  document.title = import.meta.env.VITE_APP_TITLE
}, {
  immediate: true,
})

onMounted(() => {
  hotkeys('alt+i', () => {
    eventBus.emit('global-system-info-toggle')
  })
})
</script>

<template>
  <Provider>
    <RouterView />
    <SystemInfo />
  </Provider>
</template>
