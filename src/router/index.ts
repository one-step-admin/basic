import { createRouter, createWebHashHistory } from 'vue-router'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import useMenuStore from '@/store/modules/menu'

// 路由数据
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '找不到页面',
    },
  },
]

// 免登录白名单
const noLoginWhitelist = [
  '/login',
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const settingsStore = useSettingsStore()
  const userStore = useUserStore()
  const menuStore = useMenuStore()
  if (userStore.isLogin) {
    if (!menuStore.isGenerate) {
      if (settingsStore.settings.menu.baseOn === 'frontend') {
        menuStore.generateMenusAtFront()
      }
      else {
        menuStore.generateMenusAtBack()
      }
    }
    if (to.name) {
      if (to.matched.length !== 0) {
        // 如果已登录状态下，进入登录页会强制跳转到控制台页面
        if (to.name === 'login') {
          next({
            name: 'index',
            replace: true,
          })
        }
        else {
          next()
        }
      }
      else {
        // 如果是通过 name 跳转，并且 name 对应的路由没有权限时，需要做这步处理，手动指向到 404 页面
        next({
          path: '/404',
        })
      }
    }
    else {
      next()
    }
  }
  else {
    if (!noLoginWhitelist.includes(to.path)) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath,
        },
      })
    }
    else {
      next()
    }
  }
})

export default router
