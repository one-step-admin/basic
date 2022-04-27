<template>
    <div class="topbar-container" data-fixed-calc-width>
        <div class="left-box">
            <div v-if="(['side', 'head', 'single'].includes(settingsStore.menu.menuMode) && settingsStore.topbar.enableSidebarCollapse)" class="sidebar-collapse" :class="{'is-collapse': settingsStore.menu.sidebarCollapse}" @click="settingsStore.toggleSidebarCollapse()">
                <el-icon>
                    <svg-icon name="toolbar-collapse" />
                </el-icon>
            </div>
        </div>
        <Tools />
    </div>
</template>

<script setup name="Topbar">
import Tools from '../Tools/index.vue'

import { useSettingsStore } from '@/store/modules/settings'
const settingsStore = useSettingsStore()
</script>

<style lang="scss" scoped>
.topbar-container {
    position: fixed;
    z-index: 999;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $g-topbar-height;
    background-color: #fff;
    transition: 0.3s, box-shadow 0.2s;
    box-shadow: 0 0 1px 0 #ccc;
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
            transition: 0.3s;
            .el-icon {
                transition: 0.3s;
            }
            &:hover .el-icon {
                color: #5482ee;
            }
            &.is-collapse .el-icon {
                transform: rotateZ(-180deg);
            }
        }
    }
}
</style>
