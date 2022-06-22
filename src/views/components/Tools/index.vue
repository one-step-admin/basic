<template>
    <div class="tools">
        <div class="buttons">
            <span v-if="windowStore.list.length > 1" class="item" @click="previewAllWindows">
                <el-icon>
                    <svg-icon name="toolbar-preview-windows" />
                </el-icon>
            </span>
            <span v-if="settingsStore.topbar.enableNavSearch" class="item" @click="$eventBus.emit('global-search-toggle')">
                <el-icon>
                    <svg-icon name="ep:search" />
                </el-icon>
            </span>
            <span v-if="settingsStore.topbar.enableFullscreen" class="item" @click="toggle">
                <el-icon>
                    <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
                </el-icon>
            </span>
            <span v-if="settingsStore.topbar.enableColorScheme" class="item" @click="settingsStore.setColorScheme(settingsStore.app.colorScheme === 'dark' ? 'light' : 'dark')">
                <el-icon>
                    <svg-icon v-show="settingsStore.app.colorScheme === 'light'" name="ep:sunny" />
                    <svg-icon v-show="settingsStore.app.colorScheme === 'dark'" name="ep:moon" />
                </el-icon>
            </span>
            <span v-if="settingsStore.topbar.enableAppSetting" class="item" @click="$eventBus.emit('global-theme-toggle')">
                <el-icon>
                    <svg-icon name="ep:setting" />
                </el-icon>
            </span>
        </div>
        <el-dropdown class="user-container" size="default" @command="userCommand">
            <div class="user-wrapper">
                <el-avatar size="small">
                    <el-icon>
                        <svg-icon name="ep:user-filled" />
                    </el-icon>
                </el-avatar>
                {{ userStore.account }}
                <el-icon>
                    <svg-icon name="ep:caret-bottom" />
                </el-icon>
            </div>
            <template #dropdown>
                <el-dropdown-menu class="user-dropdown">
                    <el-dropdown-item command="setting">个人设置</el-dropdown-item>
                    <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup name="UserMenu">
const { proxy } = getCurrentInstance()
const router = useRouter()

import useSettingsStore from '@/store/modules/settings'
const settingsStore = useSettingsStore()
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
import useWindowStore from '@/store/modules/window'
const windowStore = useWindowStore()

import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()

function previewAllWindows() {
    settingsStore.updateThemeSetting({
        previewAllWindows: true
    })
}

function userCommand(command) {
    switch (command) {
        case 'setting':
            proxy.$window.add({
                title: '个人设置',
                name: 'PersonalSetting'
            })
            break
        case 'logout':
            userStore.logout().then(() => {
                router.push({
                    name: 'login'
                })
            })
            break
    }
}
</script>

<style lang="scss" scoped>
.tools {
    display: flex;
    align-items: center;
    padding: 0 20px;
    white-space: nowrap;
    .buttons {
        margin-right: 20px;
        .item {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 24px;
            width: 34px;
            cursor: pointer;
            vertical-align: middle;
            .el-icon {
                color: var(--el-text-color-primary);
                transition: var(--el-transition-color);
            }
        }
    }
}
:deep(.language-container) {
    font-size: 16px;
}
:deep(.user-container) {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    cursor: pointer;
    .user-wrapper {
        .el-avatar {
            vertical-align: middle;
            margin-top: -2px;
            margin-right: 4px;
        }
    }
}
</style>
