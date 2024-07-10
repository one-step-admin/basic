// 该文件为系统默认配置，请勿修改！！！
const globalSettingsDefault: RecursiveRequired<Settings.all> = {
  app: {
    colorScheme: 'light',
    enableMournMode: false,
    enableColorAmblyopiaMode: false,
    enablePermission: false,
  },
  menu: {
    baseOn: 'frontend',
    mode: 'side',
    switchMainMenuAndOpenWindow: false,
    subMenuUniqueOpened: true,
    subMenuCollapse: false,
    enableSubMenuCollapseButton: false,
    enableHotkeys: false,
  },
  toolbar: {
    previewWindows: true,
    navSearch: true,
    fullscreen: false,
    colorScheme: false,
  },
  navSearch: {
    enableHotkeys: true,
  },
  window: {
    defaultWidth: 1000,
    enableHotkeys: true,
  },
  copyright: {
    enable: false,
    dates: '',
    company: '',
    website: '',
    beian: '',
  },
}

export default globalSettingsDefault
