import '@/utils/baidu'

import '@/utils/system.copyright'

import ElementPlus from 'element-plus'
import App from './App.vue'
import pinia from './store'
import router from './router'
import registerWindowComponent from '@/views/windows/registerWindowComponent'

// 自定义指令
import directive from '@/utils/directive'

// 加载 svg 图标
import 'virtual:svg-icons-register'

// 加载 iconify 图标
import { downloadAndInstall } from '@/iconify'
import icons from '@/iconify/index.json'

import 'virtual:uno.css'

// 全局样式
import '@/assets/styles/globals.scss'

const app = createApp(App)
app.use(ElementPlus)
app.use(pinia)
app.use(router)
registerWindowComponent(app)
directive(app)
if (icons.isOfflineUse) {
  for (const info of icons.collections) {
    downloadAndInstall(info)
  }
}

app.mount('#app')
