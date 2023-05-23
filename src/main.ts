import './utils/system.copyright'
import ElementPlus from 'element-plus'
import App from './App.vue'
import pinia from './store'
import router from './router'
import useSettingsStore from './store/modules/settings'
import registerWindowComponent from '@/views/windows/registerWindowComponent'

// 自定义指令
import directive from '@/utils/directive'

// 加载 svg 图标
import 'virtual:svg-icons-register'

// 全局样式
import '@/assets/styles/globals.scss'

// 加载 iconify 图标（element plus）
import { downloadAndInstall } from '@/iconify-ep'

if (useSettingsStore(pinia).settings.app.iconifyOfflineUse) {
  downloadAndInstall()
}

const app = createApp(App)
app.use(ElementPlus)
app.use(pinia)
app.use(router)
registerWindowComponent(app)
directive(app)

app.mount('#app')
