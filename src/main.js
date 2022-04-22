import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import { piniaStore } from './store'
app.use(piniaStore)

import router from './router'
app.use(router)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
app.use(ElementPlus, {
    locale: zhCn
})

// 将 element-plus 的图标库注册到全局
import * as ElementIcons from '@element-plus/icons-vue'
for (var key in ElementIcons) {
    app.component(`ElIcon${ElementIcons[key].name}`, ElementIcons[key])
}

import registerWindowComponent from '@/views/windows/registerWindowComponent'
registerWindowComponent(app)

import globalProperties from '@/util/global.properties'
globalProperties(app)

// 自定义指令
import directive from '@/util/directive'
directive(app)

// 加载 svg 图标
import 'virtual:svg-icons-register'

// 全局样式
import '@/assets/styles/globals.scss'

app.mount('#app')
