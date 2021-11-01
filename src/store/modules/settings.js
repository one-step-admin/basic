/**
 * 存放全局公用状态
 */
import settings from '@/settings'

const state = () => ({
    ...settings,
    // 页面标题
    title: ''
})

const getters = {}

const actions = {}

const mutations = {
    // 切换侧边栏导航展开/收起
    toggleSidebarCollapse(state) {
        state.sidebarCollapse = !state.sidebarCollapse
    },
    // 更新主题配置
    updateThemeSetting(state, data) {
        Object.assign(state, data)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
