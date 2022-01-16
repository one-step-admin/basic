import { defineStore } from 'pinia'
import { piniaStore } from '@/store'
import { deepClone } from '@/util'
import api from '@/api'
import menu from '@/menu'

import { useSettingsStore } from './settings'
import { useUserStore } from './user'

function hasPermission(permissions, route) {
    let isAuth = false
    if (route.auth) {
        isAuth = permissions.some(auth => {
            if (typeof route.auth == 'string') {
                return route.auth === auth
            } else {
                return route.auth.some(routeAuth => {
                    return routeAuth === auth
                })
            }
        })
    } else {
        isAuth = true
    }
    return isAuth
}

function filterMenus(menus, permissions) {
    const res = []
    menus.forEach(menu => {
        let tmpMenu = deepClone(menu)
        if (hasPermission(permissions, tmpMenu)) {
            if (tmpMenu.children) {
                tmpMenu.children = filterMenus(tmpMenu.children, permissions)
                tmpMenu.children.length && res.push(tmpMenu)
            } else {
                res.push(tmpMenu)
            }
        }
    })
    return res
}

function flatMenu(menus, breadcrumb = [], icon = '') {
    let res = []
    menus.forEach(menu => {
        let tmpMenu = deepClone(menu)
        // 处理面包屑导航
        let tmpBreadcrumb = deepClone(breadcrumb)
        if (tmpMenu.breadcrumb !== false) {
            tmpBreadcrumb.push({
                title: tmpMenu.title
            })
        }
        if (!tmpMenu.icon) {
            tmpMenu.icon = icon
        }
        if (tmpMenu.children) {
            let childrenMenu = flatMenu(tmpMenu.children, tmpBreadcrumb, tmpMenu.icon)
            res.push(...childrenMenu)
        } else {
            tmpMenu.breadcrumbNeste = tmpBreadcrumb
            res.push(tmpMenu)
        }
    })
    return res
}

export const useMenuStore = defineStore(
    // 唯一ID
    'menu',
    {
        state: () => ({
            isGenerate: false,
            menus: [],
            headerActived: 0
        }),
        getters: {
            transformMenus: state => {
                let menus
                const settingsStore = useSettingsStore()
                if (settingsStore.menu.menuMode === 'single') {
                    menus = [{ children: [] }]
                    state.menus.map(item => {
                        menus[0].children.push(...item.children)
                    })
                } else {
                    menus = state.menus
                }
                return menus
            },
            sidebarMenus() {
                return this.transformMenus.length > 0 ? this.transformMenus[this.headerActived].children : []
            },
            flatMenu() {
                let arr = []
                this.menus.map(item => {
                    arr.push(...flatMenu(item.children))
                })
                let map = {}
                arr.map(item => {
                    map[item.windowName] = item
                })
                return map
            }
        },
        actions: {
            // 根据权限动态生成菜单（前端生成）
            generateMenusAtFront() {
                // eslint-disable-next-line no-async-promise-executor
                return new Promise(async resolve => {
                    const settingsStore = useSettingsStore()
                    const userStore = useUserStore()
                    let accessedMenus
                    // 如果权限功能开启，则需要对路由数据进行筛选过滤
                    if (settingsStore.app.enablePermission) {
                        const permissions = await userStore.getPermissions()
                        accessedMenus = filterMenus(menu, permissions)
                    } else {
                        accessedMenus = deepClone(menu)
                    }
                    // 设置 menus 数据
                    this.isGenerate = true
                    let newMenus = deepClone(accessedMenus)
                    this.menus = newMenus.filter(item => {
                        return item.children.length != 0
                    })
                    let menus = []
                    accessedMenus.map(item => {
                        menus.push(...item.children)
                    })
                    resolve(menus)
                })
            },
            // 根据权限动态生成菜单（后端获取）
            generateMenusAtBack() {
                return new Promise(resolve => {
                    api.get('menu/list', {
                        baseURL: '/mock/'
                    }).then(async res => {
                        const settingsStore = useSettingsStore()
                        const userStore = useUserStore()
                        let accessedMenus
                        // 如果权限功能开启，则需要对路由数据进行筛选过滤
                        if (settingsStore.app.enablePermission) {
                            const permissions = await userStore.getPermissions()
                            accessedMenus = filterMenus(res.data, permissions)
                        } else {
                            accessedMenus = deepClone(res.data)
                        }
                        // 设置 menus 数据
                        this.isGenerate = true
                        let newMenus = deepClone(accessedMenus)
                        this.menus = newMenus.filter(item => {
                            return item.children.length != 0
                        })
                        let menus = []
                        accessedMenus.map(item => {
                            menus.push(...item.children)
                        })
                        resolve(menus)
                    })
                })
            },
            // 切换头部导航
            switchHeaderActived(index) {
                this.headerActived = index
            },
            removeMenus() {
                this.isGenerate = false
                this.menus = []
            }
        }
    }
)

export function useMenuOutsideStore() {
    return useMenuStore(piniaStore)
}
