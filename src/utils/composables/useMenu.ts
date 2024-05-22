import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'

export default function useMenu() {
  const settingsStore = useSettingsStore()
  const menuStore = useMenuStore()

  const appWindow = useWindow()

  function switchTo(index: number) {
    menuStore.setActived(index)
    if (settingsStore.settings.menu.switchMainMenuAndOpenWindow) {
      const windowName = getDeepestWindow(menuStore.sidebarMenus[0]).windowName
      if (windowName) {
        if (/^(?:https?:|mailto:|tel:)/.test(windowName)) {
          window.open(windowName)
        }
        else {
          appWindow.add(windowName)
        }
      }
    }
  }

  function getDeepestWindow(menu: Menu.recordRaw): Menu.recordRaw {
    return menu.children ? getDeepestWindow(menu.children[0]) : menu
  }

  return {
    switchTo,
  }
}
