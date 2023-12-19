type RecursiveRequired<T> = {
  [P in keyof T]-?: RecursiveRequired<T[P]>
}
type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

declare namespace Settings {
  interface app {
    /**
     * 颜色方案
     * @默认值 `''` 跟随系统
     * @可选值 `'light'` 明亮模式
     * @可选值 `'dark'` 暗黑模式
     */
    colorScheme?: '' | 'light' | 'dark'
    /**
     * 是否开启权限功能
     * @默认值 `false`
     */
    enablePermission?: boolean
  }
  interface menu {
    /**
     * 导航栏数据来源，当 `app.routeBaseOn: 'filesystem'` 时生效
     * @默认值 `'frontend'` 前端
     * @可选值 `'backend'` 后端
     */
    baseOn?: 'frontend' | 'backend'
    /**
     * 导航栏模式
     * @默认值 `'side'` 侧边栏模式（有主导航）
     * @可选值 `'head'` 顶部模式
     * @可选值 `'single'` 侧边栏模式（无主导航）
     */
    menuMode?: 'side' | 'head' | 'single'
    /**
     * 切换主导航同时打开窗口
     * @默认值 `false`
     */
    switchMainMenuAndOpenWindow?: boolean
    /**
     * 次导航是否只保持一个子项的展开
     * @默认值 `true`
     */
    subMenuUniqueOpened?: boolean
    /**
     * 次导航是否收起
     * @默认值 `false`
     */
    subMenuCollapse?: boolean
    /**
     * 是否开启次导航的展开/收起按钮
     * @默认值 `false`
     */
    enableSubMenuCollapseButton?: boolean
    /**
     * 是否开启主导航切换快捷键
     * @默认值 `false`
     */
    enableHotkeys?: boolean
  }
  interface toolbar {
    /**
     * 是否开启全屏
     * @默认值 `false`
     */
    enableFullscreen?: boolean
    /**
     * 是否开启颜色主题
     * @默认值 `false`
     */
    enableColorScheme?: boolean
  }
  interface navSearch {
    /**
     * 是否开启导航搜索
     * @默认值 `true`
     */
    enable?: boolean
    /**
     * 是否开启导航搜索快捷键
     * @默认值 `true`
     */
    enableHotkeys?: boolean
  }
  interface window {
    /**
     * 是否开启窗口快捷键
     * @默认值 `true`
     */
    enableHotkeys?: boolean
  }
  interface copyright {
    /**
     * 是否开启底部版权
     * @默认值 `false`
     */
    enable?: boolean
    /**
     * 网站运行日期
     * @默认值 `''`
     */
    dates?: string
    /**
     * 公司名称
     * @默认值 `''`
     */
    company?: string
    /**
     * 网站地址
     * @默认值 `''`
     */
    website?: string
    /**
     * 网站备案号
     * @默认值 `''`
     */
    beian?: string
  }
  interface all {
    /** 应用设置 */
    app?: app
    /** 导航栏设置 */
    menu?: menu
    /** 工具栏设置 */
    toolbar?: toolbar
    /** 导航搜索设置 */
    navSearch?: navSearch
    /** 窗口设置 */
    window?: window
    /** 底部版权设置 */
    copyright?: copyright
  }
}

declare namespace Menu {
  /** 原始 */
  interface recordRaw {
    title?: string | Function
    icon?: string
    auth?: string | string[]
    params?: object
    windowName?: string
    breadcrumbNeste?: Menu.breadcrumb[]
    children?: recordRaw[]
  }
  /** 主导航 */
  interface recordMainRaw {
    title?: string | Function
    icon?: string
    auth?: string | string[]
    children: recordRaw[]
  }
  interface breadcrumb {
    title?: string | Function
  }
}

interface window {
  name: string
  title?: string | Function
  params?: object
  breadcrumbNeste?: any[]
  reload?: boolean
}
