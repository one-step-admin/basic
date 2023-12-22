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
      <div v-if="(['side', 'head', 'single'].includes(settingsStore.settings.menu.menuMode) && settingsStore.settings.menu.enableSubMenuCollapseButton)" class="flex-center cursor-pointer px-2 py-1 transition-transform" :class="{ '-rotate-z-180': settingsStore.settings.menu.subMenuCollapse }" @click="settingsStore.toggleSidebarCollapse()">
        <SvgIcon name="toolbar-collapse" class="icon" />
      </div>
    </div>
    <Tools />
  </div>
</template>

<style lang="scss" scoped>
.topbar-container {
  position: fixed;
  top: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--g-topbar-height);
  background-color: var(--g-toolbar-bg);
  box-shadow: 0 1px 0 0 var(--g-border-color);
  transition: width 0.3s, top 0.3s, transform 0.3s, background-color 0.3s;

  .left-box {
    display: flex;
    align-items: center;
    padding-right: 50px;
    padding-left: 10px;
    overflow: hidden;
  }
}
</style>
