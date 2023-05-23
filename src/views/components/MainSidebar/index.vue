<script setup lang="ts">
import Logo from '../Logo/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'

defineOptions({
  name: 'MainSidebar',
})

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const menu = useMenu()
</script>

<template>
  <transition name="main-sidebar">
    <div v-if="['side'].includes(settingsStore.settings.menu.menuMode)" class="main-sidebar-container">
      <Logo :show-title="false" class="sidebar-logo" />
      <!-- 侧边栏模式（含主导航） -->
      <div v-if="settingsStore.settings.menu.menuMode === 'side'" class="nav">
        <template v-for="(item, index) in menuStore.allMenus" :key="index">
          <div v-if="item.children && item.children.length !== 0" class="item-container" :class="{ active: index === menuStore.actived }">
            <div class="item" :title="item.title" @click="menu.switchTo(index)">
              <el-icon v-if="item.icon">
                <svg-icon :name="item.icon" />
              </el-icon>
              <span>{{ item.title }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.main-sidebar-container {
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  // firefox隐藏滚动条
  scrollbar-width: none;
  // chrome隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }

  position: relative;
  z-index: 1;
  width: var(--g-main-sidebar-width);
  color: var(--g-main-sidebar-menu-color);
  background-color: var(--g-main-sidebar-bg);
  transition: background-color 0.3s, var(--el-transition-color);

  .sidebar-logo {
    background-color: var(--g-main-sidebar-bg);
    transition: background-color 0.3s;
  }

  .nav {
    width: inherit;
    padding-top: var(--g-sidebar-logo-height);

    .item-container {
      position: relative;
      display: flex;
      transition: var(--el-transition-all);

      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 60px;
        padding: 0 5px;
        cursor: pointer;
        color: var(--g-main-sidebar-menu-color);
        background-color: var(--g-main-sidebar-bg);
        transition: var(--el-transition-all), background-color 0.3s, var(--el-transition-color);

        &:hover {
          color: var(--g-main-sidebar-menu-hover-color);
          background-color: var(--g-main-sidebar-menu-hover-bg);
        }

        .el-icon {
          font-size: 24px;
        }

        span {
          font-size: 14px;
          text-align: center;
          word-break: break-all;

          @include text-overflow(1, false);
        }
      }

      &.active .item {
        color: var(--g-main-sidebar-menu-active-color);
        background-color: var(--g-main-sidebar-menu-active-bg);
      }
    }
  }
}
// 主侧边栏动画
.main-sidebar-enter-active,
.main-sidebar-leave-active {
  transition: 0.3s;
}

.main-sidebar-enter-from,
.main-sidebar-leave-to {
  transform: translateX(calc(var(--g-main-sidebar-width) * -1));
}
</style>
