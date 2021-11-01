import { deepClone } from '@/util'
import api from '@/api'
import menu from '@/menu'

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
        const tmp = { ...menu }
        if (hasPermission(permissions, tmp)) {
            if (tmp.children) {
                tmp.children = filterMenus(tmp.children, permissions)
                tmp.children.length && res.push(tmp)
            } else {
                res.push(tmp)
            }
        }
    })
    return res
}

function formatBackMenus(menus, views = import.meta.glob('../../views/**/*.vue')) {
    return menus.map(route => {
        switch (route.component) {
            default:
                if (route.component) {
                    route.component = views[`../../views/${route.component}`]
                }
        }
        if (route.children) {
            route.children = formatBackMenus(route.children, views)
        }
        return route
    })
}

function flatMenu(menus, breadcrumb = [], icon = '') {
    let res = []
    menus.forEach(menu => {
        let tmpMenu = deepClone(menu)
        // 处理面包屑导航
        let tmpBreadcrumb = deepClone(breadcrumb)
        if (tmpMenu.breadcrumb !== false) {
            tmpBreadcrumb.push({
                title: tmpMenu.title,
                i18n: tmpMenu.i18n
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

const state = () => ({
    isGenerate: false,
    menus: [],
    headerActived: 0
})

const getters = {
    // FIXME: 由于 getter 的结果不会被缓存，导致导航栏切换时有明显的延迟，该问题会在 Vue 3.2 版本中修复，详看 https://github.com/vuejs/vuex/pull/1883
    menus: (state, getters, rootState) => {
        let menus
        if (rootState.settings.menuMode === 'single') {
            menus = [{ children: [] }]
            state.menus.map(item => {
                menus[0].children.push(...item.children)
            })
        } else {
            menus = state.menus
        }
        return menus
    },
    sidebarMenus: (state, getters) => {
        return getters.menus.length > 0 ? getters.menus[state.headerActived].children : []
    },
    flatMenu: state => {
        let arr = []
        state.menus.map(item => {
            arr.push(...flatMenu(item.children))
        })
        let map = {}
        arr.map(item => {
            map[item.windowName] = item
        })
        return map
    }
}

const actions = {
    // 生成菜单（前端生成）
    generateMenusAtFront({ rootState, dispatch, commit }) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async resolve => {
            let accessedMenus
            // 如果权限功能开启，则需要对路由数据进行筛选过滤
            if (rootState.settings.enablePermission) {
                const permissions = await dispatch('user/getPermissions', null, { root: true })
                accessedMenus = filterMenus(menu, permissions)
            } else {
                accessedMenus = menu
            }
            commit('setMenus', accessedMenus)
            let menus = []
            accessedMenus.map(item => {
                menus.push(...item.children)
            })
            resolve(menus)
        })
    },
    // 生成菜单（后端获取）
    generateMenusAtBack({ rootState, dispatch, commit }) {
        return new Promise(resolve => {
            api.get('menu/list', {
                baseURL: '/mock/'
            }).then(async res => {
                let asyncMenus = formatBackMenus(res.data)
                let accessedMenus
                // 如果权限功能开启，则需要对路由数据进行筛选过滤
                if (rootState.settings.enablePermission) {
                    const permissions = await dispatch('user/getPermissions', null, { root: true })
                    accessedMenus = filterMenus(asyncMenus, permissions)
                } else {
                    accessedMenus = asyncMenus
                }
                commit('setMenus', accessedMenus)
                let menus = []
                accessedMenus.map(item => {
                    menus.push(...item.children)
                })
                resolve(menus)
            })
        })
    }
}

const mutations = {
    setMenus(state, menus) {
        state.isGenerate = true
        let newMenus = deepClone(menus)
        state.menus = newMenus.filter(item => {
            return item.children.length != 0
        })
    },
    // 切换头部导航
    switchHeaderActived(state, index) {
        state.headerActived = index
    },
    removeMenus(state) {
        state.isGenerate = false
        state.menus = []
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
