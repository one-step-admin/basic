import useMenuStore from './menu'

export const useWindowStore = defineStore(
  // 唯一ID
  'windows',
  () => {
    const list = ref<window[]>([])

    function add(data: string | window) {
      let preData: window
      if (typeof data === 'string') {
        const menuStore = useMenuStore()
        preData = {
          name: data,
          title: menuStore.flatMenu[data].title,
          params: menuStore.flatMenu[data].params,
          breadcrumbNeste: menuStore.flatMenu[data].breadcrumbNeste,
          reload: false,
        }
      }
      else {
        preData = {
          name: data.name,
          title: data.title,
          params: data.params,
          breadcrumbNeste: [],
          reload: false,
        }
      }
      // 无则添加，有则更新
      const index = list.value.findIndex(item => item.name === preData.name)
      if (index < 0) {
        list.value.push(preData)
      }
      else {
        Object.assign(list.value[index], preData)
      }
    }
    function remove(name: string) {
      list.value = list.value.filter(item => item.name !== name)
    }
    function removeAll() {
      list.value = []
    }
    function reload(name: string) {
      list.value.map((item) => {
        if (item.name === name) {
          item.reload = !item.reload
        }
        return item
      })
    }

    return {
      list,
      add,
      remove,
      removeAll,
      reload,
    }
  },
)

export default useWindowStore
