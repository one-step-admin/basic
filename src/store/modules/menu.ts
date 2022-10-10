import { cloneDeep } from 'lodash-es'
import useSettingsStore from './settings'
import useUserStore from './user'
import api from '@/api'
import menu from '@/menu'

function hasPermission(permissions: string[], menu: Menu.recordMainRaw | Menu.recordRaw) {
  let isAuth = false
  if (menu.auth) {
    isAuth = permissions.some((auth) => {
      return typeof menu.auth == 'string'
        ? menu.auth === auth
        : typeof menu.auth === 'object'
          ? menu.auth.includes(auth)
          : false
    })
  }
  else {
    isAuth = true
  }
  return isAuth
}

function filterAsyncMenus<T extends Menu.recordMainRaw[] | Menu.recordRaw[]>(menus: T, permissions: string[]): T {
  const res: any = []
  menus.forEach((menu) => {
    const tmpMenu = cloneDeep(menu)
    if (hasPermission(permissions, tmpMenu)) {
      if (tmpMenu.children) {
        tmpMenu.children = filterAsyncMenus(tmpMenu.children, permissions)
        tmpMenu.children.length && res.push(tmpMenu)
      }
      else {
        res.push(tmpMenu)
      }
    }
  })
  return res
}

function flatMenu(menus: Menu.recordRaw[], breadcrumb: Menu.breadcrumb[] = [], icon = '') {
  const res: Menu.recordRaw[] = []
  menus.forEach((menu) => {
    const tmpMenu = cloneDeep(menu)
    // 处理面包屑导航
    const tmpBreadcrumb = cloneDeep(breadcrumb)
    tmpBreadcrumb.push({
      title: tmpMenu.title,
      i18n: tmpMenu.i18n,
    })
    if (!tmpMenu.icon) {
      tmpMenu.icon = icon
    }
    if (tmpMenu.children) {
      const childrenMenu = flatMenu(tmpMenu.children, tmpBreadcrumb, tmpMenu.icon)
      res.push(...childrenMenu)
    }
    else {
      tmpMenu.breadcrumbNeste = tmpBreadcrumb
      res.push(tmpMenu)
    }
  })
  return res
}

const useMenuStore = defineStore(
  // 唯一ID
  'menu',
  {
    state: () => ({
      isGenerate: false,
      menus: [] as Menu.recordMainRaw[],
      actived: 0,
    }),
    getters: {
      allMenus() {
        let menus: Menu.recordMainRaw[]
        const settingsStore = useSettingsStore()
        if (settingsStore.menu.menuMode === 'single') {
          menus = [{ children: [] }]
          this.menus.forEach((item) => {
            menus[0].children.push(...item.children)
          })
        }
        else {
          menus = this.menus
        }
        return menus
      },
      sidebarMenus(): Menu.recordMainRaw['children'] {
        return this.allMenus.length > 0
          ? this.allMenus[this.actived].children
          : []
      },
      flatMenu() {
        const menus: Menu.recordRaw[] = []
        this.menus.forEach((item) => {
          menus.push(...flatMenu(item.children))
        })
        const map: {
          [key: string]: Menu.recordRaw
        } = {}
        menus.forEach((item) => {
          if (item.windowName) {
            map[item.windowName] = item
          }
        })
        return map
      },
    },
    actions: {
      // 根据权限动态生成菜单（前端生成）
      generateMenusAtFront() {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
          const settingsStore = useSettingsStore()
          const userStore = useUserStore()
          let accessedMenus
          // 如果权限功能开启，则需要对路由数据进行筛选过滤
          if (settingsStore.app.enablePermission) {
            const permissions = await userStore.getPermissions()
            accessedMenus = filterAsyncMenus(menu, permissions)
          }
          else {
            accessedMenus = cloneDeep(menu)
          }
          // 设置 menus 数据
          this.isGenerate = true
          const newMenus = cloneDeep(accessedMenus)
          this.menus = newMenus.filter((item) => {
            return item.children.length !== 0
          })
          const menus: Menu.recordRaw[] = []
          accessedMenus.forEach((item) => {
            menus.push(...item.children)
          })
          resolve(menus)
        })
      },
      // 根据权限动态生成菜单（后端获取）
      generateMenusAtBack() {
        return new Promise((resolve) => {
          api.get('menu/list', {
            baseURL: '/mock/',
          }).then(async (res) => {
            const settingsStore = useSettingsStore()
            const userStore = useUserStore()
            let accessedMenus: Menu.recordMainRaw[]
            // 如果权限功能开启，则需要对路由数据进行筛选过滤
            if (settingsStore.app.enablePermission) {
              const permissions = await userStore.getPermissions()
              accessedMenus = filterAsyncMenus(res.data, permissions)
            }
            else {
              accessedMenus = cloneDeep(res.data)
            }
            // 设置 menus 数据
            this.isGenerate = true
            const newMenus = cloneDeep(accessedMenus)
            this.menus = newMenus.filter((item) => {
              return item.children.length !== 0
            })
            const menus: Menu.recordRaw[] = []
            accessedMenus.forEach((item) => {
              menus.push(...item.children)
            })
            resolve(menus)
          })
        })
      },
      // 设置主导航
      setActived(index: number) {
        this.actived = index
      },
      removeMenus() {
        this.isGenerate = false
        this.menus = []
      },
    },
  },
)

export default useMenuStore
