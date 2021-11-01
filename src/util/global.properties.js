import api from '@/api'
import { auth, authAll } from '@/util'
import store from '@/store'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import Cookies from 'js-cookie'
import hotkeys from 'hotkeys-js'
import mitt from 'mitt'

const eventBus = mitt()

export default function globalProperties(app) {
    // 请求
    app.config.globalProperties.$api = api
    // 鉴权
    app.config.globalProperties.$auth = auth
    app.config.globalProperties.$authAll = authAll
    // 窗口
    app.config.globalProperties.$window = {
        // 新增窗口
        add: windowName => {
            store.dispatch('window/add', windowName)
            eventBus.emit('scrollToWindow', typeof windowName === 'string' ? windowName : windowName.name)
        },
        // 关闭窗口
        remove: windowName => {
            store.commit('window/remove', windowName)
        },
        // 窗口刷新
        reload: windowName => {
            store.commit('window/reload', windowName)
            setTimeout(() => {
                store.commit('window/reload', windowName)
            }, 0)
        }
    }
    dayjs.locale('zh-cn')
    app.config.globalProperties.$dayjs = dayjs
    app.config.globalProperties.$cookies = Cookies
    app.config.globalProperties.$hotkeys = hotkeys
    app.config.globalProperties.$eventBus = eventBus
}
