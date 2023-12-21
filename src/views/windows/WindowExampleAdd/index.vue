<script setup lang="ts">
const appWindow = useWindow()
</script>

<template>
  <PageMain>
    <HButton @click="appWindow.add({ title: '新窗口', name: 'WindowExampleNewWindow' })">
      打开一个新窗口（该窗口非导航栏菜单）
    </HButton>
  </PageMain>
</template>
