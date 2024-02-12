import useMenuStore from './menu'
import useWindowStore from './window'
import router from '@/router'
import apiUser from '@/api/modules/user'

export const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const account = ref(sessionStorage.getItem('account') ?? '')
    const token = ref(sessionStorage.getItem('token') ?? '')
    const avatar = ref(sessionStorage.getItem('avatar') ?? '')
    const permissions = ref<string[]>([])
    const isLogin = computed(() => {
      if (token.value) {
        return true
      }
      return false
    })

    async function login(data: {
      account: string
      password: string
    }) {
      const res = await apiUser.login(data)
      sessionStorage.setItem('account', res.data.account)
      sessionStorage.setItem('token', res.data.token)
      sessionStorage.setItem('avatar', res.data.avatar)
      account.value = res.data.account
      token.value = res.data.token
      avatar.value = res.data.avatar
    }
    async function logout() {
      const menuStore = useMenuStore()
      const windowStore = useWindowStore()
      sessionStorage.removeItem('account')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('avatar')
      account.value = ''
      token.value = ''
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
