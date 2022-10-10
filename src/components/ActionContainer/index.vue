<template>
  <div class="action-container">
    <div class="container">
      <el-scrollbar>
        <slot />
      </el-scrollbar>
    </div>
    <div v-if="$slots.action" class="action-bar">
      <slot name="action" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.action-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .container {
    flex: 1;
    overflow: hidden;
  }

  .action-bar {
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: var(--el-fill-color-lighter);
    border-top: 1px solid var(--el-border-color-lighter);
    transition: background-color 0.3s, var(--el-transition-border);
  }
}
</style>
