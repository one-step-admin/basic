import useMenuStore from './menu'

const useWindowStore = defineStore(
    // 唯一ID
    'windows',
    {
        state: () => ({
            list: []
        }),
        actions: {
            add(data) {
                let preData
                if (typeof data === 'string') {
                    const menuStore = useMenuStore()
                    preData = {
                        name: data,
                        title: menuStore.flatMenu[data]?.title ?? '',
                        params: menuStore.flatMenu[data]?.params ?? null,
                        breadcrumbNeste: menuStore.flatMenu[data]?.breadcrumbNeste ?? [],
                        reload: false
                    }
                } else {
                    preData = {
                        name: data.name,
                        title: data.title,
                        params: data.params ?? null,
                        breadcrumbNeste: [],
                        reload: false
                    }
                }
                // 无则添加，有则更新
                let index = this.list.findIndex(item => item.name === preData.name)
                if (index < 0) {
                    this.list.push(preData)
                } else {
                    Object.assign(this.list[index], preData)
                }
            },
            remove(name) {
                this.list = this.list.filter(item => item.name !== name)
            },
            removeAll() {
                this.list = []
            },
            reload(name) {
                this.list.map(item => {
                    if (item.name === name) {
                        item.reload = !item.reload
                    }
                })
            }
        }
    }
)

export default useWindowStore
