<template>
    <div class="layout">
        <div id="app-main">
            <Header />
            <div class="wrapper">
                <div class="sidebar-container">
                    <MainSidebar />
                    <SubSidebar />
                </div>
                <div class="main-container" :style="{'padding-bottom': $route.meta.paddingBottom}">
                    <Topbar v-if="!(settingsStore.menu.menuMode === 'head' && !settingsStore.topbar.enableSidebarCollapse)" />
                    <div class="main">
                        <Dashboard />
                    </div>
                    <Copyright v-if="settingsStore.copyright.enable" />
                </div>
            </div>
            <el-backtop :right="20" :bottom="20" title="回到顶部" />
        </div>
        <Search />
        <AppSetting />
    </div>
</template>

<script setup>
import Header from './components/Header/index.vue'
import MainSidebar from './components/MainSidebar/index.vue'
import SubSidebar from './components/SubSidebar/index.vue'
import Topbar from './components/Topbar/index.vue'
import Dashboard from './components/Dashboard/index.vue'
import Search from './components/Search/index.vue'
import AppSetting from './components/AppSetting/index.vue'

const { proxy } = getCurrentInstance()

import { useSettingsStore } from '@/store/modules/settings'
const settingsStore = useSettingsStore()
import { useMenuStore } from '@/store/modules/menu'
const menuStore = useMenuStore()

provide('switchMenu', switchMenu)
function switchMenu(index) {
    menuStore.switchHeaderActived(index)
    if (settingsStore.menu.switchMainMenuAndOpenWindow) {
        const windowName = getDeepestWindowName(menuStore.sidebarMenus[0])
        if (/^(https?:|mailto:|tel:)/.test(windowName)) {
            window.open(windowName)
        } else {
            proxy.$window.add(windowName)
        }
    }
}
function getDeepestWindowName(menus) {
    return menus.children ? getDeepestWindowName(menus.children[0]) : menus.windowName
}
</script>

<style lang="scss" scoped>
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
    box-shadow: -1px 0 0 0 var(--g-box-shadow-color);
    transition: padding-top 0.3s;
    .sidebar-container {
        position: fixed;
        z-index: 1010;
        top: 0;
        bottom: 0;
        display: flex;
        transition: transform 0.3s, top 0.3s;
        width: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
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
            height: 100%;
            flex: auto;
            position: relative;
            overflow: hidden;
            transition: 0.3s;
        }
        .topbar-container + .main {
            margin-top: var(--g-topbar-height);
        }
    }
    .copyright {
        background-color: var(--g-app-bg);
        box-shadow: 0 0 1px 0 var(--g-box-shadow-color);
        transition: background-color 0.3s, var(--el-transition-box-shadow);
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
            :deep(.tools) {
                display: none;
            }
        }
    }
}

// 主内容区动画
.main-enter-active {
    transition: 0.2s;
}
.main-leave-active {
    transition: 0.15s;
}
.main-enter-from {
    opacity: 0;
    margin-left: -20px;
}
.main-leave-to {
    opacity: 0;
    margin-left: 20px;
}
</style>
