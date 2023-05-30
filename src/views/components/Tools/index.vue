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

function pro() {
  window.open('https://one-step-admin.gitee.io/pro-example', 'top')
}
</script>

<template>
  <div class="tools">
    <div class="buttons">
      <span class="item item-pro" @click="pro">
        <el-icon>
          <svg-icon name="pro" />
        </el-icon>
        <span class="title">查看专业版</span>
      </span>
      <span v-if="windowStore.list.length > 1" class="item">
        <el-icon @click="previewAllWindows">
          <svg-icon name="toolbar-preview-windows" />
        </el-icon>
      </span>
      <span v-if="settingsStore.settings.navSearch.enable" class="item" @click="eventBus.emit('global-search-toggle')">
        <el-icon>
          <svg-icon name="ep:search" />
        </el-icon>
      </span>
      <span v-if="settingsStore.settings.toolbar.enableFullscreen" class="item" @click="toggle">
        <el-icon>
          <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
        </el-icon>
      </span>
      <span v-if="settingsStore.settings.toolbar.enableColorScheme" class="item" @click="settingsStore.setColorScheme(settingsStore.settings.app.colorScheme === 'dark' ? 'light' : 'dark')">
        <el-icon>
          <svg-icon :name="settingsStore.settings.app.colorScheme === 'light' ? 'ep:sunny' : 'ep:moon'" />
        </el-icon>
      </span>
    </div>
    <el-dropdown class="user-container" @command="userCommand">
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
          <el-dropdown-item command="setting">
            个人设置
          </el-dropdown-item>
          <el-dropdown-item divided command="hotkeys">
            快捷键介绍
          </el-dropdown-item>
          <el-dropdown-item divided command="logout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
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

    .item-pro {
      display: inline-block;
      width: auto;
      padding: 0 10px;
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

      .el-icon {
        vertical-align: middle;
      }

      .title {
        padding-left: 5px;
        font-weight: bold;
        font-size: 14px;
        background-image: linear-gradient(to right, #ffa237, #fc455d);
        background-clip: text;
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
}
</style>
