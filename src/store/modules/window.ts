import useMenuStore from './menu'

export const useWindowStore = defineStore(
  // 唯一ID
  'windows',
  {
    state: () => ({
      list: [] as window[],
    }),
    actions: {
      add(data: string | window) {
        let preData: window
        if (typeof data === 'string') {
          const menuStore = useMenuStore()
          preData = {
            name: data,
            title: menuStore.flatMenu[data].title,
            i18n: menuStore.flatMenu[data].i18n,
            noTitle: menuStore.flatMenu[data].noTitle,
            params: menuStore.flatMenu[data].params,
            breadcrumbNeste: menuStore.flatMenu[data].breadcrumbNeste,
            isMaximize: false,
            reload: false,
          }
        }
        else {
          preData = {
            name: data.name,
            title: data.title,
            i18n: data.i18n,
            noTitle: data.noTitle,
            params: data.params,
            breadcrumbNeste: [],
            isMaximize: false,
            reload: false,
          }
        }
        // 无则添加，有则更新
        const index = this.list.findIndex(item => item.name === preData.name)
        if (index < 0) {
          this.list.push(preData)
        }
        else {
          Object.assign(this.list[index], preData)
        }
      },
      remove(name: string) {
        this.list = this.list.filter(item => item.name !== name)
      },
      removeAll() {
        this.list = []
      },
      reload(name: string) {
        this.list.map((item) => {
          if (item.name === name) {
            item.reload = !item.reload
          }
          return item
        })
      },
    },
  },
)

export default useWindowStore
