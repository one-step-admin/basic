import useMenuStore from './menu'
import useWindowStore from './window'
import router from '@/router'
import apiUser from '@/api/modules/user'

export const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const account = ref(localStorage.getItem('account') ?? '')
    const token = ref(localStorage.getItem('token') ?? '')
    const failure_time = ref(localStorage.getItem('failure_time') ?? '')
    const avatar = ref(localStorage.getItem('avatar') ?? '')
    const permissions = ref<string[]>([])
    const isLogin = computed(() => {
      let retn = false
      if (token.value) {
        if (new Date().getTime() < Number.parseInt(failure_time.value) * 1000) {
          retn = true
        }
      }
      return retn
    })

    async function login(data: {
      account: string
      password: string
    }) {
      const res = await apiUser.login(data)
      localStorage.setItem('account', res.data.account)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('failure_time', res.data.failure_time)
      localStorage.setItem('avatar', res.data.avatar)
      account.value = res.data.account
      token.value = res.data.token
      failure_time.value = res.data.failure_time
      avatar.value = res.data.avatar
    }
    async function logout() {
      const menuStore = useMenuStore()
      const windowStore = useWindowStore()
      localStorage.removeItem('account')
      localStorage.removeItem('token')
      localStorage.removeItem('failure_time')
      localStorage.removeItem('avatar')
      account.value = ''
      token.value = ''
      failure_time.value = ''
      avatar.value = ''
      menuStore.setActived(0)
      menuStore.removeMenus()
      windowStore.removeAll()
      router.push({
        name: 'login',
      })
    }
    // 获取我的权限
    async function getPermissions() {
      const res = await apiUser.permission()
      permissions.value = res.data.permissions
      return permissions.value
    }
    async function editPassword(data: {
      password: string
      newpassword: string
    }) {
      await apiUser.passwordEdit(data)
    }

    return {
      account,
      token,
      avatar,
      permissions,
      isLogin,
      login,
      logout,
      getPermissions,
      editPassword,
    }
  },
)

export default useUserStore
