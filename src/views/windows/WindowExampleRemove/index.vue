<script setup lang="ts">
const appWindow = useWindow()
</script>

<template>
  <PageMain>
    <HButton @click="appWindow.remove('WindowExampleRemove')">
      关闭当前窗口
    </HButton>
  </PageMain>
</template>
