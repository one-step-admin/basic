<script setup lang="ts">
import Logo from '../Logo/index.vue'
import Tools from '../Tools/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'

defineOptions({
  name: 'LayoutHeader',
})

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const menu = useMenu()
</script>

<template>
  <transition name="header">
    <header v-if="['head'].includes(settingsStore.settings.menu.menuMode)">
      <div class="header-container">
        <div class="main">
          <Logo />
          <!-- 顶部模式 -->
          <div v-if="settingsStore.settings.menu.menuMode === 'head'" class="nav">
            <template v-for="(item, index) in menuStore.allMenus" :key="index">
              <div v-if="item.children && item.children.length !== 0" class="item-container" :class="{ active: index === menuStore.actived }">
                <div class="item" @click="menu.switchTo(index)">
                  <el-icon v-if="item.icon">
                    <svg-icon :name="item.icon" />
                  </el-icon>
                  <span v-if="item.title">{{ item.title }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
        <Tools />
      </div>
    </header>
  </transition>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: var(--g-header-height);
  color: var(--g-header-color);
  background-color: var(--g-header-bg);
  transition: background-color 0.3s, var(--el-transition-color);

  .header-container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .main {
      flex: 1;
      display: flex;
      align-items: center;
      height: 100%;
    }
  }

  :deep(div.title) {
    position: relative;
    width: inherit;
    height: inherit;
    padding: inherit;
    background-color: inherit;

    .logo {
      width: 50px;
      height: 50px;
    }

    span {
      font-size: 24px;
      letter-spacing: 1px;
      color: var(--g-header-color);
    }
  }

  .nav {
    display: flex;
    height: 100%;
    margin-left: 50px;

    .item-container {
      position: relative;
      display: flex;
      width: initial;
      transition: var(--el-transition-all);

      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 5px;
        width: 80px;
        cursor: pointer;
        color: var(--g-header-menu-color);
        background-color: var(--g-header-bg);
        transition: background-color 0.3s, var(--el-transition-color);

        &:hover {
          color: var(--g-header-menu-hover-color);
          background-color: var(--g-header-menu-hover-bg);
        }

        .el-icon {
          font-size: 24px;
          vertical-align: middle;
        }

        span {
          text-align: center;
          word-break: break-all;

          @include text-overflow(1, false);
        }
      }

      &.active .item {
        color: var(--g-header-menu-active-color);
        background-color: var(--g-header-menu-active-bg);
      }
    }
  }

  :deep(.tools) {
    padding: 0;

    .buttons .item .el-icon {
      color: var(--g-header-color);
    }

    .user-container {
      font-size: 16px;
      color: var(--g-header-color);
    }
  }
}
// 头部动画
.header-enter-active,
.header-leave-active {
  transition: transform 0.3s;
}

.header-enter-from,
.header-leave-to {
  transform: translateY(calc(var(--g-header-height) * -1));
}
</style>
