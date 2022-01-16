<template>
    <div class="user">
        <div class="tools">
            <span class="item item-pro" @click="pro">
                <svg-icon name="pro" />
                <span class="title">查看专业版</span>
            </span>
            <span v-if="windowStore.list.length > 1" class="item">
                <svg-icon name="toolbar-preview-windows" @click="previewAllWindows" />
            </span>
            <span v-if="settingsStore.topbar.enableNavSearch" class="item" @click="$eventBus.emit('global-search-toggle')">
                <svg-icon name="search" />
            </span>
            <span v-if="settingsStore.topbar.enableFullscreen" class="item" @click="toggle">
                <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
            </span>
            <span v-if="settingsStore.topbar.enableAppSetting" class="item" @click="$eventBus.emit('global-theme-toggle')">
                <svg-icon name="toolbar-theme" />
            </span>
        </div>
        <el-dropdown class="user-container" size="default" @command="userCommand">
            <div class="user-wrapper">
                <el-avatar size="small">
                    <el-icon><el-icon-user-filled /></el-icon>
                </el-avatar>
                {{ userStore.account }}
                <el-icon><el-icon-caret-bottom /></el-icon>
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

import { useSettingsStore } from '@/store/modules/settings'
const settingsStore = useSettingsStore()
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
import { useWindowStore } from '@/store/modules/window'
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
function pro() {
    window.open(`https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/one-step-admin/pro`, 'top')
}
</script>

<style lang="scss" scoped>
.user {
    display: flex;
    align-items: center;
    padding: 0 20px;
    white-space: nowrap;
}
.tools {
    margin-right: 20px;
    .item {
        margin-left: 5px;
        padding: 6px 8px;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        vertical-align: middle;
        transition: all 0.3s;
        [class^="ri-"] {
            vertical-align: -0.15em;
        }
        .el-badge {
            vertical-align: initial;
        }
    }
    .item-pro {
        display: inline-block;
        transform-origin: right center;
        animation: pro-text 3s ease-out infinite;
        @keyframes pro-text {
            0%,
            20% {
                transform: scale(1);
            }
            50%,
            70% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
        .title {
            padding-left: 5px;
            font-weight: bold;
            font-size: 14px;
            background-image: linear-gradient(to right, #ffa237, #fc455d);
            /* stylelint-disable-next-line property-no-vendor-prefix */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
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
