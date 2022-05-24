import { defineStore } from 'pinia'
import { piniaStore } from '@/store'
import settings from '@/settings'

export const useSettingsStore = defineStore(
    // 唯一ID
    'settings',
    {
        state: () => ({
            ...settings,
            // 页面标题
            title: '',
            // 预览全部窗口
            previewAllWindows: false
        }),
        actions: {
            // 切换侧边栏导航展开/收起
            toggleSidebarCollapse() {
                this.menu.sidebarCollapse = !this.menu.sidebarCollapse
            },
            // 设置主题颜色模式
            setColorScheme(color) {
                this.app.colorScheme = color
            },
            // 更新主题配置
            updateThemeSetting(data) {
                Object.assign(this, data)
            }
        }
    }
)

export function useSettingsOutsideStore() {
    return useSettingsStore(piniaStore)
}
