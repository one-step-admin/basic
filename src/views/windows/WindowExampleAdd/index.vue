<script setup lang="ts">
const appWindow = useWindow()
</script>

<template>
  <div>
    <el-button @click="appWindow.add({ title: '新窗口', name: 'WindowExampleNewWindow' })">
      打开一个新窗口（该窗口非导航栏菜单）
    </el-button>
  </div>
</template>
