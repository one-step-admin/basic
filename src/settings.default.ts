// 该文件为系统默认配置，请勿修改！！！
const globalSettingsDefault: RecursiveRequired<Settings.all> = {
  app: {
    colorScheme: 'light',
    elementSize: 'default',
    enablePermission: false,
    iconifyOfflineUse: false,
  },
  menu: {
    baseOn: 'frontend',
    menuMode: 'side',
    switchMainMenuAndOpenWindow: false,
    subMenuUniqueOpened: true,
    subMenuCollapse: false,
    enableSubMenuCollapseButton: false,
    enableHotkeys: false,
  },
  toolbar: {
    enableFullscreen: false,
    enableColorScheme: false,
    enableAppSetting: false,
  },
  navSearch: {
    enable: true,
    enableHotkeys: true,
  },
  window: {
    enableHotkeys: true,
  },
  copyright: {
    enable: true,
    dates: '2021-2022',
    company: 'One-step-admin',
    website: 'https://hooray.gitee.io/one-step-admin/',
    beian: '',
  },
}

export default globalSettingsDefault
