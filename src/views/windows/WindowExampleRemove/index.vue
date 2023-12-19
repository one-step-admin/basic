<script setup lang="ts">
const appWindow = useWindow()
</script>

<template>
  <PageMain>
    <ElButton @click="appWindow.remove('WindowExampleRemove')">
      关闭当前窗口
    </ElButton>
  </PageMain>
</template>
