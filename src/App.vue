<template>
    <RouterView
        :style="{
            '--g-main-sidebar-actual-width': mainSidebarActualWidth,
            '--g-sub-sidebar-actual-width': subSidebarActualWidth
        }"
    />
</template>

<script setup>
const store = useStore()

// 侧边栏主导航当前实际宽度
const mainSidebarActualWidth = computed(() => {
    let actualWidth = getComputedStyle(document.documentElement).getPropertyValue('--g-main-sidebar-width')
    actualWidth = parseInt(actualWidth)
    if (['head', 'single'].includes(store.state.settings.menuMode)) {
        actualWidth = 0
    }
    return `${actualWidth}px`
})

// 侧边栏次导航当前实际宽度
const subSidebarActualWidth = computed(() => {
    let actualWidth = getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-width')
    actualWidth = parseInt(actualWidth)
    if (store.state.settings.sidebarCollapse) {
        actualWidth = 64
    }
    return `${actualWidth}px`
})

watch(() => store.state.settings.theme, () => {
    document.body.setAttribute('data-theme', store.state.settings.theme)
}, {
    immediate: true
})

watch(() => store.state.settings.menuMode, () => {
    document.body.setAttribute('data-menu-mode', store.state.settings.menuMode)
}, {
    immediate: true
})

watch(() => store.state.settings.title, () => {
    document.title = import.meta.env.VITE_APP_TITLE
}, {
    immediate: true
})
</script>
