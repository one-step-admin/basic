<template>
    <RouterView />
</template>

<script setup>
const store = useStore()

watch(() => store.state.settings.theme, () => {
    document.body.setAttribute('data-theme', store.state.settings.theme)
}, {
    immediate: true
})

watch([
    () => store.state.settings.menuMode,
    () => store.state.settings.sidebarCollapse
], () => setMenuMode(), {
    immediate: true
})

function setMenuMode() {
    document.body.removeAttribute('data-sidebar-no-collapse')
    document.body.removeAttribute('data-sidebar-collapse')
    if (['side', 'head', 'single'].includes(store.state.settings.menuMode)) {
        if (store.state.settings.sidebarCollapse) {
            document.body.setAttribute('data-sidebar-collapse', '')
        } else {
            document.body.setAttribute('data-sidebar-no-collapse', '')
        }
    }
    document.body.setAttribute('data-menu-mode', store.state.settings.menuMode)
}

watch(() => store.state.settings.title, () => setDocumentTitle(), {
    immediate: true
})

function setDocumentTitle() {
    document.title = import.meta.env.VITE_APP_TITLE
}
</script>
