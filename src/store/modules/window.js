const state = () => ({
    list: []
})

const getters = {}

const actions = {
    add({ rootGetters, commit }, data) {
        if (typeof data === 'string') {
            commit('add', {
                name: data,
                title: rootGetters['menu/flatMenu'][data]?.title ?? '',
                params: rootGetters['menu/flatMenu'][data]?.params ?? null,
                breadcrumbNeste: rootGetters['menu/flatMenu'][data]?.breadcrumbNeste ?? [],
                reload: false
            })
        } else {
            commit('add', {
                name: data.name,
                title: data.title,
                params: data.params ?? null,
                breadcrumbNeste: [],
                reload: false
            })
        }
    }
}

const mutations = {
    add(state, data) {
        // 无则添加，有则更新
        let index = state.list.findIndex(item => item.name === data.name)
        if (index < 0) {
            state.list.push(data)
        } else {
            Object.assign(state.list[index], data)
        }
    },
    remove(state, name) {
        state.list = state.list.filter(item => item.name !== name)
    },
    removeAll(state) {
        state.list = []
    },
    reload(state, name) {
        state.list.map(item => {
            if (item.name === name) {
                item.reload = !item.reload
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}
