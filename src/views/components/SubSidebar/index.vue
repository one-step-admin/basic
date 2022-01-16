<template>
    <div v-if="['side', 'head', 'single'].includes(settingsStore.menu.menuMode)" class="sub-sidebar-container" :class="{'is-collapse': settingsStore.menu.sidebarCollapse}" @scroll="onSidebarScroll">
        <Logo
            :show-logo="settingsStore.menu.menuMode === 'single'" :class="{
                'sidebar-logo': true,
                'sidebar-logo-bg': settingsStore.menu.menuMode === 'single',
                'shadow': sidebarScrollTop
            }"
        />
        <!-- 侧边栏模式（无主导航）或侧边栏精简模式 -->
        <el-menu
            :unique-opened="settingsStore.menu.subMenuUniqueOpened" :collapse="settingsStore.menu.sidebarCollapse" :collapse-transition="false" :class="{
                'is-collapse-without-logo': settingsStore.menu.menuMode !== 'single' && settingsStore.menu.sidebarCollapse
            }"
        >
            <transition-group name="sub-sidebar">
                <template v-for="route in menuStore.sidebarMenus" :key="JSON.stringify(route)">
                    <SidebarItem :item="route" />
                </template>
            </transition-group>
        </el-menu>
    </div>
</template>

<script setup name="SubSidebar">
import Logo from '../Logo/index.vue'
import SidebarItem from '../SidebarItem/index.vue'

import { useSettingsStore } from '@/store/modules/settings'
const settingsStore = useSettingsStore()
import { useMenuStore } from '@/store/modules/menu'
const menuStore = useMenuStore()

const sidebarScrollTop = ref(0)

function onSidebarScroll(e) {
    sidebarScrollTop.value = e.target.scrollTop
}
</script>

<style lang="scss" scoped>
// 次侧边栏动画
.sub-sidebar-enter-active {
    transition: 0.3s;
}
.sub-sidebar-enter-from,
.sub-sidebar-leave-active {
    opacity: 0;
    transform: translateY(30px) skewY(10deg);
}
.sub-sidebar-leave-active {
    position: absolute;
}
.sub-sidebar-container {
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    // firefox隐藏滚动条
    scrollbar-width: none;
    // chrome隐藏滚动条
    &::-webkit-scrollbar {
        display: none;
    }

    width: var(--g-sub-sidebar-width);
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    transition: 0.3s;
    background-color: $g-sub-sidebar-bg;
    box-shadow: 10px 0 10px -10px darken($g-sub-sidebar-bg, 20);
    &.is-collapse {
        width: 64px;
        .sidebar-logo {
            &:not(.sidebar-logo-bg) {
                display: none;
            }
            :deep(span) {
                display: none;
            }
        }
    }
    .sidebar-logo {
        transition: box-shadow 0.2s, background-color 0.3s, color 0.3s;
        background-color: $g-sub-sidebar-bg;
        &:not(.sidebar-logo-bg) {
            :deep(span) {
                color: $g-sub-sidebar-menu-color;
            }
        }
        &.sidebar-logo-bg {
            background-color: $g-main-sidebar-bg;
        }
        &.shadow {
            box-shadow: 0 10px 10px -10px darken($g-sub-sidebar-bg, 20);
        }
    }
    .el-menu {
        border-right: 0;
        padding-top: $g-sidebar-logo-height;
        transition: border-color 0.3s, background-color 0.3s, color 0.3s;
        background-color: $g-sub-sidebar-bg;
        &:not(.el-menu--collapse) {
            width: inherit;
        }
        &.is-collapse-without-logo {
            padding-top: 0;
        }
        &.el-menu--collapse {
            :deep(.icon) {
                margin-right: 0;
            }
            :deep(.el-menu-item),
            :deep(.el-sub-menu__title) {
                span {
                    display: none;
                }
                .el-sub-menu__icon-arrow {
                    right: 7px;
                    margin-top: -5px;
                }
            }
        }
    }
}
</style>
