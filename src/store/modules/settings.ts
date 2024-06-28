import { defaultsDeep } from 'lodash-es'
import settingsDefault from '@/settings'

export const useSettingsStore = defineStore(
  // 唯一ID
  'settings',
  () => {
    const settings = ref(settingsDefault)

    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    const currentColorScheme = ref<Exclude<Settings.app['colorScheme'], ''>>()
    watch(() => settings.value.app.colorScheme, (val) => {
      if (val === '') {
        prefersColorScheme.addEventListener('change', updateTheme)
      }
      else {
        prefersColorScheme.removeEventListener('change', updateTheme)
      }
    }, {
      immediate: true,
    })
    watch(() => settings.value.app.colorScheme, updateTheme, {
      immediate: true,
    })
    function updateTheme() {
      let colorScheme = settings.value.app.colorScheme
      if (colorScheme === '') {
        colorScheme = prefersColorScheme.matches ? 'dark' : 'light'
      }
      currentColorScheme.value = colorScheme
      switch (colorScheme) {
        case 'dark':
          document.documentElement.classList.add('dark')
          break
        case 'light':
          document.documentElement.classList.remove('dark')
          break
      }
    }
    watch([
      () => settings.value.app.enableMournMode,
      () => settings.value.app.enableColorAmblyopiaMode,
    ], (val) => {
      document.documentElement.style.removeProperty('filter')
      if (val[0] && val[1]) {
        document.documentElement.style.setProperty('filter', 'grayscale(100%) invert(80%)')
      }
      else if (val[0]) {
        document.documentElement.style.setProperty('filter', 'grayscale(100%)')
      }
      else if (val[1]) {
        document.documentElement.style.setProperty('filter', 'invert(80%)')
      }
    }, {
      immediate: true,
    })

    watch(() => settings.value.menu.mode, (val) => {
      document.body.setAttribute('data-menu-mode', val)
    }, {
      immediate: true,
    })

    // 操作系统
    const os = ref<'mac' | 'windows' | 'linux' | 'other'>('other')
    const agent = navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.includes('mac os'):
        os.value = 'mac'
        break
      case agent.includes('windows'):
        os.value = 'windows'
        break
      case agent.includes('linux'):
        os.value = 'linux'
        break
    }

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
      currentColorScheme,
      os,
      title,
      previewAllWindows,
      toggleSidebarCollapse,
      setColorScheme,
      updateSettings,
    }
  },
)

export default useSettingsStore
