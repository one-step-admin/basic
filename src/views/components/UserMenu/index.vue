<template>
    <div class="user">
        <div class="tools">
            <span v-if="$store.state.window.list.length > 1" class="item">
                <svg-icon name="toolbar-preview-windows" @click="previewAllWindows" />
            </span>
            <span v-if="$store.state.settings.enableNavSearch" class="item" @click="$eventBus.emit('global-search-toggle')">
                <svg-icon name="search" />
            </span>
            <span v-if="isFullscreenEnable && $store.state.settings.enableFullscreen" class="item" @click="fullscreen">
                <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
            </span>
            <span v-if="$store.state.settings.enableThemeSetting" class="item" @click="$eventBus.emit('global-theme-toggle')">
                <svg-icon name="toolbar-theme" />
            </span>
        </div>
        <el-dropdown class="user-container" @command="userCommand">
            <div class="user-wrapper">
                <el-avatar size="medium">
                    <i class="el-icon-user-solid" />
                </el-avatar>
                {{ $store.state.user.account }}
                <i class="el-icon-caret-bottom" />
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
import screenfull from 'screenfull'

const { proxy } = getCurrentInstance()
const store = useStore()
const router = useRouter()

const isFullscreenEnable = computed(() => screenfull.isEnabled)
const isFullscreen = ref(false)

onMounted(() => {
    if (isFullscreenEnable.value) {
        screenfull.on('change', fullscreenChange)
    }
})
onBeforeUnmount(() => {
    if (isFullscreenEnable.value) {
        screenfull.off('change', fullscreenChange)
    }
})

function previewAllWindows() {
    store.commit('settings/updateThemeSetting', {
        previewAllWindows: true
    })
}
function fullscreen() {
    screenfull.toggle()
}
function fullscreenChange() {
    isFullscreen.value = screenfull.isFullscreen
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
            store.dispatch('user/logout').then(() => {
                router.push({
                    name: 'login'
                })
            })
            break
    }
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
}
:deep(.language-container) {
    font-size: 16px;
}
:deep(.user-container) {
    display: inline-block;
    height: 50px;
    line-height: 50px;
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
