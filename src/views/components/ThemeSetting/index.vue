<template>
    <div>
        <el-drawer v-model="isShow" title="主题配置" direction="rtl" :size="350">
            <el-alert title="主题配置可实时预览效果，更多设置请在 src/settings.js 中进行设置，建议在生产环境隐藏主题配置功能" type="error" :closable="false" />
            <el-divider>导航栏模式</el-divider>
            <div class="menu-mode">
                <el-tooltip content="侧边栏模式（含主导航）" placement="top" :show-after="500" :append-to-body="false">
                    <div class="mode mode-side" :class="{'active': menuMode === 'side'}" @click="menuMode = 'side'">
                        <svg-icon name="ri-checkbox-circle-fill" />
                    </div>
                </el-tooltip>
                <el-tooltip content="顶部模式" placement="top" :show-after="500" :append-to-body="false">
                    <div class="mode mode-head" :class="{'active': menuMode === 'head'}" @click="menuMode = 'head'">
                        <svg-icon name="ri-checkbox-circle-fill" />
                    </div>
                </el-tooltip>
                <el-tooltip content="侧边栏模式（不含主导航）" placement="top" :show-after="500" :append-to-body="false">
                    <div class="mode mode-single" :class="{'active': menuMode === 'single'}" @click="menuMode = 'single'">
                        <svg-icon name="ri-checkbox-circle-fill" />
                    </div>
                </el-tooltip>
            </div>
            <el-divider>侧边栏</el-divider>
            <div class="setting-item">
                <div class="label">折叠按钮</div>
                <el-switch v-model="enableSidebarCollapse" />
            </div>
            <div class="setting-item">
                <div class="label">是否折叠</div>
                <el-switch v-model="sidebarCollapse" />
            </div>
            <div class="setting-item">
                <div class="label">
                    切换跳转
                    <el-tooltip content="开启该功能后，切换侧边栏时，页面自动跳转至该侧边栏导航下第一个路由地址" placement="top" :append-to-body="false">
                        <svg-icon name="el-icon-question-filled" />
                    </el-tooltip>
                </div>
                <el-switch v-model="switchSidebarAndOpenWindow" :disabled="settingsStore.menuMode === 'single'" />
            </div>
            <div class="setting-item">
                <div class="label">
                    保持展开一个
                    <el-tooltip content="开启该功能后，侧边栏只保持一个子菜单的展开" placement="top" :append-to-body="false">
                        <svg-icon name="el-icon-question-filled" />
                    </el-tooltip>
                </div>
                <el-switch v-model="sidebarUniqueOpened" />
            </div>
            <el-divider>功能按钮</el-divider>
            <div class="setting-item">
                <div class="label">
                    导航栏搜索
                    <el-tooltip content="对导航栏进行快捷搜索" placement="top" :append-to-body="false">
                        <svg-icon name="el-icon-question-filled" />
                    </el-tooltip>
                </div>
                <el-switch v-model="enableNavSearch" />
            </div>
            <div class="setting-item">
                <div class="label">
                    全屏
                    <el-tooltip content="该功能使用场景极少，用户习惯于通过窗口“最大化”功能来扩大显示区域，以显示更多内容，并且使用 F11 键也可以进入全屏效果" placement="top" :append-to-body="false">
                        <svg-icon name="el-icon-question-filled" />
                    </el-tooltip>
                </div>
                <el-switch v-model="enableFullscreen" />
            </div>
            <el-divider>其它</el-divider>
            <div class="setting-item">
                <div class="label">
                    组件尺寸
                    <el-tooltip content="全局设置 Element Plus 组件的默认尺寸大小" placement="top" :append-to-body="false">
                        <svg-icon name="el-icon-question-filled" />
                    </el-tooltip>
                </div>
                <el-radio-group v-model="elementSize" size="small">
                    <el-radio-button label="large">较大</el-radio-button>
                    <el-radio-button label="default">默认</el-radio-button>
                    <el-radio-button label="small">稍小</el-radio-button>
                </el-radio-group>
            </div>
            <div class="setting-item">
                <div class="label">底部版权</div>
                <el-switch v-model="showCopyright" />
            </div>
        </el-drawer>
    </div>
</template>

<script setup name="ThemeSetting">
const { proxy } = getCurrentInstance()

import { useSettingsStore } from '@/store/modules/settings'
const settingsStore = useSettingsStore()
import { useMenuStore } from '@/store/modules/menu'
const menuStore = useMenuStore()

const isShow = ref(false)

const menuMode = computed({
    get: function() {
        return settingsStore.menuMode
    },
    set: function(newValue) {
        menuStore.switchHeaderActived(0)
        settingsStore.updateThemeSetting({
            'menuMode': newValue
        })
    }
})
const elementSize = computed({
    get: function() {
        return settingsStore.elementSize
    },
    set: function(newValue) {
        settingsStore.updateThemeSetting({
            'elementSize': newValue
        })
    }
})
const enableSidebarCollapse = computed({
    get: function() {
        return settingsStore.enableSidebarCollapse
    },
    set: function(newValue) {
        settingsStore.updateThemeSetting({
            'enableSidebarCollapse': newValue
        })
    }
})
const sidebarCollapse = computed({
    get: function() {
        return settingsStore.sidebarCollapse
    },
    set: function(newValue) {
        settingsStore.updateThemeSetting({
            'sidebarCollapse': newValue
        })
    }
})
const switchSidebarAndOpenWindow = computed({
    get: function() {
        return settingsStore.switchSidebarAndOpenWindow
    },
    set: function(newValue) {
        settingsStore.updateThemeSetting({
            'switchSidebarAndOpenWindow': newValue
        })
    }
})
const sidebarUniqueOpened = computed({
    get: function() {
        return settingsStore.sidebarUniqueOpened
    },
    set: function(newValue) {
        settingsStore.updateThemeSetting({
            'sidebarUniqueOpened': newValue
        })
    }
})
const showCopyright = computed({
    get: function() {
        return settingsStore.showCopyright
    },
    set: function(newValue) {
        settingsStore.updateThemeSetting({
            'showCopyright': newValue
        })
    }
})
const enableNavSearch = computed({
    get: function() {
        return settingsStore.enableNavSearch
    },
    set: function(newValue) {
        settingsStore.updateThemeSetting({
            'enableNavSearch': newValue
        })
    }
})
const enableFullscreen = computed({
    get: function() {
        return settingsStore.enableFullscreen
    },
    set: function(newValue) {
        settingsStore.updateThemeSetting({
            'enableFullscreen': newValue
        })
    }
})

onMounted(() => {
    proxy.$eventBus.on('global-theme-toggle', () => {
        isShow.value = !isShow.value
    })
})
</script>

<style lang="scss" scoped>
:deep(.el-drawer__body) {
    padding: 0 15px 20px;
    overflow: auto;
}
:deep(.el-input) {
    width: 150px;
}
.menu-mode {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 10px;
    .mode {
        position: relative;
        width: 50px;
        height: 40px;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
        background-color: #e1e3e6;
        box-shadow: 0 0 15px 1px #aaa;
        transition: 0.3s;
        &:hover {
            box-shadow: 0 0 15px 1px #666;
        }
        &.active {
            box-shadow: 0 0 0 2px #409eff;
        }
        &::before,
        &::after {
            pointer-events: none;
        }
        &-side {
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 10px;
                height: 100%;
                background-color: #222b45;
            }
            &::after {
                content: "";
                position: absolute;
                top: 0;
                left: 10px;
                width: 15px;
                height: 100%;
                background-color: #fff;
            }
        }
        &-head {
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 10px;
                background-color: #222b45;
            }
            &::after {
                content: "";
                position: absolute;
                top: 10px;
                left: 0;
                width: 15px;
                height: calc(100% - 10px);
                background-color: #fff;
            }
        }
        &-single {
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 15px;
                height: 100%;
                background-color: #fff;
            }
        }
        i {
            position: absolute;
            right: 2px;
            bottom: 2px;
            display: none;
        }
        &.active i {
            display: block;
            color: #409eff;
        }
    }
}
.setting-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
    padding: 5px 10px;
    border-radius: 5px;
    transition: all 0.3s;
    &:hover {
        background: #f1f1f1;
    }
    .label {
        font-size: 14px;
        color: #666;
        display: flex;
        align-items: center;
        i {
            margin-left: 4px;
            font-size: 17px;
            color: #e6a23c;
            cursor: help;
        }
    }
}
</style>
