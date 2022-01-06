<template>
    <div class="topbar-container" data-fixed-calc-width>
        <div class="left-box">
            <div v-if="(['side', 'head', 'single'].includes(settingsStore.menuMode) && settingsStore.enableSidebarCollapse)" class="sidebar-collapse" :class="{'is-collapse': settingsStore.sidebarCollapse}" @click="settingsStore.toggleSidebarCollapse()">
                <svg-icon name="toolbar-collapse" />
            </div>
        </div>
        <UserMenu />
    </div>
</template>

<script setup name="Topbar">
import UserMenu from '../UserMenu/index.vue'

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
        /* stylelint-disable-next-line property-no-vendor-prefix */
        -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 50px), transparent);
        .sidebar-collapse {
            display: flex;
            align-items: center;
            padding: 0 20px;
            height: 50px;
            cursor: pointer;
            transition: 0.3s;
            .svg-icon {
                transition: 0.3s;
            }
            &:hover .svg-icon {
                color: #5482ee;
            }
            &.is-collapse .svg-icon {
                transform: rotateZ(-180deg);
            }
        }
    }
}
</style>
