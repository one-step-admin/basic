import useWindowStore from '@/store/modules/window'
import eventBus from '@/utils/eventBus'

export default function useAuth() {
  const windowStore = useWindowStore()

  // 新增窗口
  function add(windowName: string | window) {
    windowStore.add(windowName)
    eventBus.emit('scrollToWindow', typeof windowName === 'string' ? windowName : windowName.name)
  }

  // 关闭窗口
  function remove(windowName: string) {
    windowStore.remove(windowName)
  }

  // 窗口刷新
  function reload(windowName: string) {
    windowStore.reload(windowName)
    setTimeout(() => {
      windowStore.reload(windowName)
    }, 0)
  }

  return {
    add,
    remove,
    reload,
  }
}
