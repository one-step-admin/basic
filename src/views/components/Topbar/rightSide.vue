<script setup lang="ts">
import NavSearch from './NavSearch/index.vue'
import Fullscreen from './Fullscreen/index.vue'
import ColorScheme from './ColorScheme/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import eventBus from '@/utils/eventBus'

defineOptions({
  name: 'ToolbarRightSide',
})

const settingsStore = useSettingsStore()
const userStore = useUserStore()
const appWindow = useWindow()

const avatarError = ref(false)
watch(() => userStore.avatar, () => {
  if (avatarError.value) {
    avatarError.value = false
  }
})
</script>

<template>
  <div class="flex items-center">
    <NavSearch v-if="settingsStore.settings.toolbar.navSearch" />
    <Fullscreen v-if="settingsStore.settings.toolbar.fullscreen" />
    <ColorScheme v-if="settingsStore.settings.toolbar.colorScheme" />
    <HDropdownMenu
      :items="[
        [
          { label: '个人设置', handle: () => appWindow.add({ title: '个人设置', name: 'PersonalSetting' }) },
        ],
        [
          { label: '快捷键介绍', handle: () => eventBus.emit('global-hotkeys-intro-toggle') },
        ],
        [
          { label: '退出登录', handle: () => userStore.logout() },
        ],
      ]" class="flex-center cursor-pointer px-2"
    >
      <div flex-center gap-1>
        <img v-if="userStore.avatar && !avatarError" :src="userStore.avatar" :onerror="() => (avatarError = true)" class="h-[24px] w-[24px] rounded-full">
        <SvgIcon v-else name="i-carbon:user-avatar-filled-alt" :size="24" class="text-gray-400" />
        {{ userStore.account }}
        <SvgIcon name="i-ep:caret-bottom" />
      </div>
    </HDropdownMenu>
  </div>
</template>
