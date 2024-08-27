<script setup lang="ts">
import hotkeys from 'hotkeys-js'
import Header from './components/Header/index.vue'
import MainSidebar from './components/MainSidebar/index.vue'
import SubSidebar from './components/SubSidebar/index.vue'
import Topbar from './components/Topbar/index.vue'
import Dashboard from './components/Dashboard/index.vue'
import Search from './components/Search/index.vue'
import AppSetting from './components/AppSetting/index.vue'
import HotkeysIntro from './components/HotkeysIntro/index.vue'
import Copyright from './components/Copyright/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'
import eventBus from '@/utils/eventBus'

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

// 侧边栏主导航当前实际宽度
const mainSidebarActualWidth = computed(() => {
  let actualWidth = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-main-sidebar-width'))
  if (['head', 'single'].includes(settingsStore.settings.menu.mode)) {
    actualWidth = 0
  }
  return `${actualWidth}px`
})

// 侧边栏次导航当前实际宽度
const subSidebarActualWidth = computed(() => {
  let actualWidth = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-width'))
  if (settingsStore.settings.menu.subMenuCollapse) {
    actualWidth = 64
  }
  return `${actualWidth}px`
})

const enableToolbar = computed(() => {
  return !(settingsStore.settings.menu.mode === 'head' && !settingsStore.settings.toolbar.previewWindows)
})

onMounted(() => {
  hotkeys('alt+`', (e) => {
    if (settingsStore.settings.menu.enableHotkeys) {
      e.preventDefault()
      useMenu().switchTo(menuStore.actived + 1 < menuStore.allMenus.length ? menuStore.actived + 1 : 0)
    }
  })
})
onUnmounted(() => {
  hotkeys.unbind('alt+`')
})

const enableAppSetting = import.meta.env.VITE_APP_SETTING === 'true'
</script>

<template>
  <div
    class="layout" :style="{
      '--g-main-sidebar-actual-width': mainSidebarActualWidth,
      '--g-sub-sidebar-actual-width': subSidebarActualWidth,
    }"
  >
    <div id="app-main">
      <Header />
      <div class="wrapper">
        <div class="sidebar-container">
          <MainSidebar />
          <SubSidebar />
        </div>
        <div class="main-container">
          <Topbar v-if="enableToolbar" />
          <div class="main">
            <Dashboard />
          </div>
          <Copyright v-if="settingsStore.settings.copyright.enable" />
        </div>
      </div>
    </div>
    <Search />
    <HotkeysIntro />
    <template v-if="enableAppSetting">
      <div class="app-setting" @click="eventBus.emit('global-app-setting-toggle')">
        <SvgIcon name="i-uiw:setting-o" class="icon" />
      </div>
      <AppSetting />
    </template>
  </div>
</template>

<style scoped>
.layout {
  height: 100%;
}

#app-main {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  transition: all 0.2s;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  transition: padding-top 0.3s;

  .sidebar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 1010;
    display: flex;
    width: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
    box-shadow: -1px 0 0 0 var(--g-border-color), 1px 0 0 0 var(--g-border-color);
    transition: width 0.3s, transform 0.3s, box-shadow 0.3s, top 0.3s;
  }

  .main-sidebar-container:not(.main-sidebar-leave-active) + .sub-sidebar-container {
    left: var(--g-main-sidebar-width);
  }

  .main-container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    margin-left: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
    background-color: var(--g-main-bg);
    transition: margin-left 0.3s, background-color 0.3s;

    .topbar-container {
      top: 0;
      z-index: 998;
    }

    .main {
      position: relative;
      flex: auto;
      height: 100%;
      overflow: hidden;
      transition: 0.3s;
    }

    .topbar-container + .main {
      margin-top: var(--g-topbar-height);
    }
  }

  .copyright {
    position: relative;
    background-color: var(--g-app-bg);
    box-shadow: 0 -1px 0 0 var(--g-border-color);
    transition: background-color 0.3s, box-shadow 0.3s;
  }
}

header:not(.header-leave-active) + .wrapper {
  padding-top: var(--g-header-height);

  .sidebar-container {
    top: var(--g-header-height);

    :deep(.sidebar-logo) {
      display: none;
    }

    :deep(.el-menu) {
      padding-top: 0;
    }
  }

  .main-container {
    .topbar-container {
      top: var(--g-header-height);
    }
  }
}

.app-setting {
  --uno: text-white dark-text-dark bg-ui-primary;

  position: fixed;
  top: calc(50% + 250px);
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

  .icon {
    animation: rotate 5s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
}

/* 主内容区动画 */
.main-enter-active {
  transition: 0.2s;
}

.main-leave-active {
  transition: 0.15s;
}

.main-enter-from {
  margin-left: -20px;
  opacity: 0;
}

.main-leave-to {
  margin-left: 20px;
  opacity: 0;
}
</style>
