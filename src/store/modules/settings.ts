import settings from '@/settings'
import settingsDefault from '@/settings.default'

interface SettingsStore extends RecursiveRequired<Settings.all> {
  title: string
  previewAllWindows: boolean
}
interface SettingsStorePartial extends RecursivePartial<Settings.all> {
  title?: string
  previewAllWindows?: boolean
}

// 合并配置
Object.keys(settingsDefault).forEach((key) => {
  Object.assign(settingsDefault[key as keyof Settings.all], settings[key as keyof Settings.all])
})

export const useSettingsStore = defineStore(
  // 唯一ID
  'settings',
  {
    state: (): SettingsStore => ({
      ...settingsDefault,
      // 页面标题
      title: '',
      // 预览全部窗口
      previewAllWindows: false,
    }),
    actions: {
      // 切换侧边栏导航展开/收起
      toggleSidebarCollapse() {
        this.menu.subMenuCollapse = !this.menu.subMenuCollapse
      },
      // 设置主题颜色模式
      setColorScheme(color: Required<Settings.app>['colorScheme']) {
        this.app.colorScheme = color
      },
      // 更新主题配置
      updateSettings(data: SettingsStorePartial) {
        Object.assign(this, data)
      },
    },
  },
)

export default useSettingsStore
