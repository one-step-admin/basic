<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import useWindowStore from '@/store/modules/window'
import eventBus from '@/utils/eventBus'

defineOptions({
  name: 'UserMenu',
})

const router = useRouter()
const settingsStore = useSettingsStore()
const userStore = useUserStore()
const windowStore = useWindowStore()
const { isFullscreen, toggle } = useFullscreen()
const appWindow = useWindow()

function previewAllWindows() {
  settingsStore.$patch({
    previewAllWindows: true,
  })
}

function userCommand(command: 'setting' | 'hotkeys' | 'logout') {
  switch (command) {
    case 'setting':
      appWindow.add({
        title: '个人设置',
        name: 'PersonalSetting',
      })
      break
    case 'hotkeys':
      eventBus.emit('global-hotkeys-intro-toggle')
      break
    case 'logout':
      userStore.logout().then(() => {
        router.push({
          name: 'login',
        })
      })
      break
  }
}
</script>

<template>
  <div class="tools">
    <div class="buttons">
      <span v-if="windowStore.list.length > 1" class="item">
        <ElIcon @click="previewAllWindows">
          <SvgIcon name="toolbar-preview-windows" />
        </ElIcon>
      </span>
      <span v-if="settingsStore.settings.navSearch.enable" class="item" @click="eventBus.emit('global-search-toggle')">
        <ElIcon>
          <SvgIcon name="ep:search" />
        </ElIcon>
      </span>
      <span v-if="settingsStore.settings.toolbar.enableFullscreen" class="item" @click="toggle">
        <ElIcon>
          <SvgIcon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
        </ElIcon>
      </span>
      <span v-if="settingsStore.settings.toolbar.enableColorScheme" class="item" @click="settingsStore.setColorScheme(settingsStore.settings.app.colorScheme === 'dark' ? 'light' : 'dark')">
        <ElIcon>
          <SvgIcon :name="settingsStore.settings.app.colorScheme === 'light' ? 'ep:sunny' : 'ep:moon'" />
        </ElIcon>
      </span>
    </div>
    <ElDropdown class="user-container" @command="userCommand">
      <div class="user-wrapper">
        <ElAvatar size="small">
          <ElIcon>
            <SvgIcon name="ep:user-filled" />
          </ElIcon>
        </ElAvatar>
        {{ userStore.account }}
        <ElIcon>
          <SvgIcon name="ep:caret-bottom" />
        </ElIcon>
      </div>
      <template #dropdown>
        <ElDropdownMenu class="user-dropdown">
          <ElDropdownItem command="setting">
            个人设置
          </ElDropdownItem>
          <ElDropdownItem divided command="hotkeys">
            快捷键介绍
          </ElDropdownItem>
          <ElDropdownItem divided command="logout">
            退出登录
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>

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
      height: 26px;
      width: 34px;
      cursor: pointer;
      vertical-align: middle;

      .el-icon {
        color: var(--el-text-color-primary);
        transition: var(--el-transition-color);
      }

      .el-badge {
        display: flex;
        align-items: center;
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
}
</style>
