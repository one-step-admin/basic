<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import useWindowStore from '@/store/modules/window'
import eventBus from '@/utils/eventBus'

defineOptions({
  name: 'UserMenu',
})

const settingsStore = useSettingsStore()
const userStore = useUserStore()
const windowStore = useWindowStore()
const { isFullscreen, toggle } = useFullscreen()
const appWindow = useWindow()

function toggleColorScheme(event: MouseEvent) {
  const { startViewTransition } = useViewTransition(() => {
    settingsStore.setColorScheme(settingsStore.settings.app.colorScheme === 'dark' ? 'light' : 'dark')
  })
  startViewTransition().ready.then(() => {
    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: settingsStore.settings.app.colorScheme !== 'dark' ? clipPath : clipPath.reverse(),
      },
      {
        duration: 300,
        easing: 'ease-out',
        pseudoElement: settingsStore.settings.app.colorScheme !== 'dark' ? '::view-transition-new(root)' : '::view-transition-old(root)',
      },
    )
  })
}

function previewAllWindows() {
  settingsStore.$patch({
    previewAllWindows: true,
  })
}

const avatarError = ref(false)
watch(() => userStore.avatar, () => {
  if (avatarError.value) {
    avatarError.value = false
  }
})
</script>

<template>
  <div class="tools flex items-center gap-4 px-4 whitespace-nowrap">
    <span v-if="settingsStore.settings.navSearch.enable" class="group inline-flex items-center gap-1 px-2 py-1.5 rounded-2 text-dark dark:text-white bg-stone-1 dark:bg-stone-9 ring-inset ring-stone-3 dark:ring-stone-7 hover:ring-1 cursor-pointer transition" @click="eventBus.emit('global-search-toggle')">
      <SvgIcon name="ri:search-line" />
      <span class="text-sm text-stone-5 group-hover:text-dark dark:group-hover:text-white transition">搜索</span>
      <HKbd v-if="settingsStore.settings.navSearch.enableHotkeys" class="ml-2">{{ settingsStore.os === 'mac' ? '⌥' : 'Alt' }} S</HKbd>
    </span>
    <div class="flex items-center empty:hidden">
      <span v-if="windowStore.list.length > 1" class="item" @click="previewAllWindows">
        <SvgIcon name="i-icon-park-outline:all-application" />
      </span>
      <span v-if="settingsStore.settings.toolbar.enableFullscreen" class="item" @click="toggle">
        <SvgIcon :name="isFullscreen ? 'ri:fullscreen-exit-line' : 'ri:fullscreen-line'" />
      </span>
      <span v-if="settingsStore.settings.toolbar.enableColorScheme" class="item" @click="toggleColorScheme">
        <SvgIcon :name="settingsStore.settings.app.colorScheme === 'light' ? 'ri:sun-line' : 'ri:moon-line'" />
      </span>
    </div>
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
      ]"
    >
      <div flex-center gap-1 cursor-pointer>
        <img v-if="userStore.avatar && !avatarError" :src="userStore.avatar" :onerror="() => (avatarError = true)" class="w-[24px] h-[24px] rounded-full">
        <SvgIcon v-else name="carbon:user-avatar-filled-alt" :size="24" class="text-gray-400" />
        {{ userStore.account }}
        <SvgIcon name="ep:caret-bottom" />
      </div>
    </HDropdownMenu>
  </div>
</template>

<style lang="scss" scoped>
.item {
  --at-apply: flex px-2 py-1 cursor-pointer;
}
</style>
