<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import hotkeys from 'hotkeys-js'
import eventBus from './utils/eventBus'

import useSettingsStore from '@/store/modules/settings'

const settingsStore = useSettingsStore()

// 侧边栏主导航当前实际宽度
const mainSidebarActualWidth = computed(() => {
  let actualWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-main-sidebar-width'))
  if (['head', 'single'].includes(settingsStore.menu.menuMode)) {
    actualWidth = 0
  }
  return `${actualWidth}px`
})

// 侧边栏次导航当前实际宽度
const subSidebarActualWidth = computed(() => {
  let actualWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-width'))
  if (settingsStore.menu.subMenuCollapse) {
    actualWidth = 64
  }
  return `${actualWidth}px`
})

watch(() => settingsStore.app.colorScheme, (val) => {
  if (val === '') {
    settingsStore.$patch((state) => {
      state.app.colorScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    })
  }
  else {
    if (settingsStore.app.colorScheme === 'dark') {
      document.documentElement.classList.add('dark')
    }
    else {
      document.documentElement.classList.remove('dark')
    }
  }
}, {
  immediate: true,
})

watch(() => settingsStore.menu.menuMode, () => {
  document.body.setAttribute('data-menu-mode', settingsStore.menu.menuMode)
}, {
  immediate: true,
})

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
  <el-config-provider :locale="zhCn" :size="settingsStore.app.elementSize">
    <RouterView
      :style="{
        '--g-main-sidebar-actual-width': mainSidebarActualWidth,
        '--g-sub-sidebar-actual-width': subSidebarActualWidth,
      }"
    />
    <system-info />
  </el-config-provider>
</template>
