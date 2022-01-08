let globalSettings = {
    /**
     * 是否开启权限功能，权限功能提供以下鉴权支持：
     * 1、路由鉴权
     * 2、鉴权组件：<Auth></Auth>、<AuthAll></AuthAll>
     * 3、鉴权指令：v-auth、v-auth-all
     * 4、鉴权函数：this.$auth()、this.$authAll()
     */
    enablePermission: false,
    /**
     * 导航栏模式
     * side 侧边栏模式（含主导航）
     * head 顶部模式
     * single 侧边栏模式（无主导航）
     */
    menuMode: 'side',
    /**
     * 主题
     * default 默认
     * vue-cli Vue CLI 风格
     * gitee 码云风格
     * freshness 清新
     * elegant 素雅
     * pure-white 纯白
     */
    theme: 'default',
    // Element 组件默认尺寸，支持：large、default、small
    elementSize: 'default',
    // 是否开启侧边栏展开收起按钮
    enableSidebarCollapse: false,
    // 侧边栏是否收起
    sidebarCollapse: false,
    // 切换侧边栏同时打开窗口
    switchSidebarAndOpenWindow: false,
    // 侧边栏只保持一个子菜单的展开
    sidebarUniqueOpened: true,
    // 是否显示底部版权信息
    showCopyright: true,
    // 版权信息配置，格式为：Copyright © [dates] <company>, All Rights Reserved
    copyrightDates: '2021',
    copyrightCompany: 'One-step-admin',
    copyrightWebsite: 'https://hooray.github.io/one-step-admin',
    // 是否开启导航搜索
    enableNavSearch: true,
    // 是否开启全屏
    enableFullscreen: false,
    // 是否开启后端返回导航数据
    enableBackendReturnMenu: false,
    // 是否开启主题配置（建议在生产环境关闭）
    enableThemeSetting: true
}

// 演示&开发环境开启全部功能（这部分代码可删除，仅方便作者打包演示环境）
if (import.meta.env.VITE_APP_MODE === 'example' || import.meta.env.MODE === 'development') {
    globalSettings.enablePermission = true
    globalSettings.enableSidebarCollapse = true
    globalSettings.enableFullscreen = true
}

export default globalSettings
