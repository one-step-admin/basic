import { defaultsDeep } from 'lodash-es'
import settingsCustom from '@/settings'
import settingsDefault from '@/settings.default'

export const useSettingsStore = defineStore(
  // 唯一ID
  'settings',
  () => {
    const mergeSettings: RecursiveRequired<Settings.all> = defaultsDeep(settingsCustom, settingsDefault)
    const settings = ref(mergeSettings)
    watch(() => settings.value.app.colorScheme, (val) => {
      if (val === '') {
        val = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      switch (val) {
        case 'dark':
          document.documentElement.classList.add('dark')
          break
        case 'light':
          document.documentElement.classList.remove('dark')
          break
      }
    }, {
      immediate: true,
    })
    watch(() => settings.value.menu.menuMode, (val) => {
      document.body.setAttribute('data-menu-mode', val)
    }, {
      immediate: true,
    })

    const title = ref('')
    const previewAllWindows = ref(false)

    // 切换侧边栏导航展开/收起
    function toggleSidebarCollapse() {
      settings.value.menu.subMenuCollapse = !settings.value.menu.subMenuCollapse
    }
    // 设置主题颜色模式
    function setColorScheme(color: Required<Settings.app>['colorScheme']) {
      settings.value.app.colorScheme = color
    }
    // 更新主题配置
    function updateSettings(data: Settings.all) {
      settings.value = defaultsDeep(data, settings.value)
    }

    return {
      settings,
      title,
      previewAllWindows,
      toggleSidebarCollapse,
      setColorScheme,
      updateSettings,
    }
  },
)

export default useSettingsStore
