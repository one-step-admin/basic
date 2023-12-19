<script setup lang="ts">
const appWindow = useWindow()

const val = ref('123')
</script>

<template>
  <PageMain>
    <ElInput v-model="val" />
    <ElButton @click="appWindow.add({ title: '新窗口', name: 'WindowExampleParams2', params: { val } })">
      打开并传入一个值到新窗口
    </ElButton>
  </PageMain>
</template>
