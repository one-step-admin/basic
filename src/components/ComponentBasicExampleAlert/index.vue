<template>
  <div class="alert">
    <el-alert show-icon type="info" :closable="false" close-text="前往 Element Plus 官网">
      <template #title>
        基础组件来自 Element Plus ，更多组件及使用技巧请查看 <el-link type="primary" href="https://element-plus.gitee.io/zh-CN/" target="_blank">
          Element Plus 官网
        </el-link>
      </template>
    </el-alert>
  </div>
</template>

<style lang="scss" scoped>
.alert {
  padding: 10px;
  background-color: var(--g-app-bg);
  transition: background-color 0.3s;
}
</style>
