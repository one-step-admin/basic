import { cloneDeep } from 'lodash-es'
import useSettingsStore from './settings'
import useUserStore from './user'
import apiApp from '@/api/modules/app'
import menu from '@/menu'

const useMenuStore = defineStore(
  // 唯一ID
  'menu',
  () => {
    const isGenerate = ref(false)
    const menus = ref<Menu.recordMainRaw[]>([])
    const actived = ref(0)

    function flatMenus(menus: Menu.recordRaw[], breadcrumb: Menu.breadcrumb[] = [], icon = '') {
      const res: Menu.recordRaw[] = []
      menus.forEach((menu) => {
        const tmpMenu = cloneDeep(menu)
        // 处理面包屑导航
        const tmpBreadcrumb = cloneDeep(breadcrumb)
        tmpBreadcrumb.push({
          title: tmpMenu.title,
        })
        if (!tmpMenu.icon) {
          tmpMenu.icon = icon
        }
        if (tmpMenu.children) {
          const childrenMenu = flatMenus(tmpMenu.children, tmpBreadcrumb, tmpMenu.icon)
          res.push(...childrenMenu)
        }
        else {
          tmpMenu.breadcrumbNeste = tmpBreadcrumb
          res.push(tmpMenu)
        }
      })
      return res
    }
    // 判断是否有权限
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
    // 根据权限过滤导航
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

    const allMenus = computed(() => {
      let returnMenus: Menu.recordMainRaw[]
      const settingsStore = useSettingsStore()
      if (settingsStore.settings.menu.menuMode === 'single') {
        returnMenus = [{ children: [] }]
        menus.value.forEach((item) => {
          returnMenus[0].children.push(...item.children)
        })
      }
      else {
        returnMenus = menus.value
      }
      return returnMenus
    })
    const sidebarMenus = computed(() => {
      return allMenus.value.length > 0
        ? allMenus.value[actived.value].children
        : []
    })
    const flatMenu = computed(() => {
      const returnMenus: Menu.recordRaw[] = []
      menus.value.forEach((item) => {
        returnMenus.push(...flatMenus(item.children))
      })
      const map: {
        [key: string]: Menu.recordRaw
      } = {}
      returnMenus.forEach((item) => {
        if (item.windowName) {
          map[item.windowName] = item
        }
      })
      return map
    })

    // 根据权限动态生成菜单（前端生成）
    async function generateMenusAtFront() {
      const settingsStore = useSettingsStore()
      const userStore = useUserStore()
      let accessedMenus
      // 如果权限功能开启，则需要对路由数据进行筛选过滤
      if (settingsStore.settings.app.enablePermission) {
        const permissions = await userStore.getPermissions()
        accessedMenus = filterAsyncMenus(menu, permissions)
      }
      else {
        accessedMenus = cloneDeep(menu)
      }
      // 设置 menus 数据
      isGenerate.value = true
      const newMenus = cloneDeep(accessedMenus)
      menus.value = newMenus.filter((item) => {
        return item.children.length !== 0
      })
    }
    // 根据权限动态生成菜单（后端获取）
    async function generateMenusAtBack() {
      await apiApp.menuList().then(async (res) => {
        const settingsStore = useSettingsStore()
        const userStore = useUserStore()
        let accessedMenus: Menu.recordMainRaw[]
        // 如果权限功能开启，则需要对路由数据进行筛选过滤
        if (settingsStore.settings.app.enablePermission) {
          const permissions = await userStore.getPermissions()
          accessedMenus = filterAsyncMenus(res.data, permissions)
        }
        else {
          accessedMenus = cloneDeep(res.data)
        }
        // 设置 menus 数据
        isGenerate.value = true
        const newMenus = cloneDeep(accessedMenus)
        menus.value = newMenus.filter((item) => {
          return item.children.length !== 0
        })
      })
    }
    // 设置主导航
    function setActived(index: number) {
      actived.value = index
    }
    function removeMenus() {
      isGenerate.value = false
      menus.value = []
    }

    return {
      isGenerate,
      menus,
      actived,
      allMenus,
      sidebarMenus,
      flatMenu,
      generateMenusAtFront,
      generateMenusAtBack,
      setActived,
      removeMenus,
    }
  },
)

export default useMenuStore
