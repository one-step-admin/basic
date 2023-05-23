<script setup lang="ts">
const appWindow = useWindow()
</script>

<template>
  <div>
    <el-button @click="appWindow.remove('WindowExampleRemove')">
      关闭当前窗口
    </el-button>
  </div>
</template>
