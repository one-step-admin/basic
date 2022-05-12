<template>
    <transition name="header">
        <header v-if="settingsStore.menu.menuMode === 'head'">
            <div class="header-container">
                <div class="main">
                    <Logo />
                    <!-- 顶部模式 -->
                    <div class="nav">
                        <template v-for="(item, index) in menuStore.transformMenus" :key="index">
                            <div v-if="item.children && item.children.length !== 0" class="item" :class="{'active': index == menuStore.headerActived}" @click="switchMenu(index)">
                                <el-icon v-if="item.icon">
                                    <svg-icon :name="item.icon" />
                                </el-icon>
                                <span v-if="item.title">{{ item.title }}</span>
                            </div>
                        </template>
                    </div>
                </div>
                <Tools />
            </div>
        </header>
    </transition>
</template>

<script setup name="Header">
import Logo from '../Logo/index.vue'
import Tools from '../Tools/index.vue'

import { useSettingsStore } from '@/store/modules/settings'
const settingsStore = useSettingsStore()
import { useMenuStore } from '@/store/modules/menu'
const menuStore = useMenuStore()

const switchMenu = inject('switchMenu')
</script>

<style lang="scss" scoped>
// 头部动画
.header-enter-active {
    transition: 0.2s;
}
.header-enter-from {
    transform: translateY(-#{$g-header-height});
}
header {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: $g-header-height;
    color: $g-header-color;
    background-color: $g-header-bg;
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
    :deep(.title) {
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
            color: $g-header-color;
        }
    }
    .nav {
        display: flex;
        height: 100%;
        margin-left: 50px;
        .item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 0 5px;
            width: 80px;
            cursor: pointer;
            transition: all 0.3s;
            color: $g-header-menu-color;
            background-color: $g-header-bg;
            &:hover {
                color: $g-header-menu-hover-color;
                background-color: $g-header-menu-hover-bg;
            }
            &.active {
                color: $g-header-menu-active-color;
                background-color: $g-header-menu-active-bg;
            }
            .el-icon {
                font-size: 24px;
                vertical-align: middle;
            }
            span {
                text-align: center;
                vertical-align: middle;
                word-break: break-all;
                @include text-overflow(1, false);
            }
        }
    }
    :deep(.user) {
        padding: 0;
        .tools [class^="ri-"] {
            color: $g-header-color;
        }
        .user-container {
            font-size: 16px;
            color: $g-header-color;
        }
    }
}
</style>
