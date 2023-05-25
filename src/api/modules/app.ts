import api from '../index'

export default {
  // 后端获取导航数据
  menuList: () => api.get('app/menu/list', {
    baseURL: '/mock/',
  }),
}
