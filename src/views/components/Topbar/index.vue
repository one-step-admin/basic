<script setup lang="ts">
import Tools from '../Tools/index.vue'
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'Topbar',
})

const settingsStore = useSettingsStore()
</script>

<template>
  <div class="topbar-container" data-fixed-calc-width>
    <div class="left-box">
      <div v-if="(['side', 'head', 'single'].includes(settingsStore.settings.menu.menuMode) && settingsStore.settings.menu.enableSubMenuCollapseButton)" class="sidebar-collapse" :class="{ 'is-collapse': settingsStore.settings.menu.subMenuCollapse }" @click="settingsStore.toggleSidebarCollapse()">
        <el-icon>
          <svg-icon name="toolbar-collapse" />
        </el-icon>
      </div>
    </div>
    <Tools />
  </div>
</template>

<style lang="scss" scoped>
.topbar-container {
  position: fixed;
  z-index: 999;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--g-topbar-height);
  background-color: var(--g-toolbar-bg);
  transition: 0.3s, box-shadow 0.2s;
  box-shadow: 0 0 1px 0 var(--g-box-shadow-color);

  .left-box {
    display: flex;
    align-items: center;
    padding-right: 50px;
    overflow: hidden;

    .sidebar-collapse {
      display: flex;
      align-items: center;
      padding: 0 20px;
      height: 50px;
      cursor: pointer;

      .el-icon {
        color: var(--el-text-color-primary);
        transition: var(--el-transition-color), var(--el-transition-md-fade);
      }

      &:hover .el-icon {
        color: var(--el-color-primary);
      }

      &.is-collapse .el-icon {
        transform: rotateZ(-180deg);
      }
    }
  }
}
</style>
