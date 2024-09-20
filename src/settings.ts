import settingsDefault from '@/settings.default'
import { defaultsDeep } from 'lodash-es'

const globalSettings: Settings.all = {
  app: {
    enablePermission: true,
  },
  menu: {
    enableSubMenuCollapseButton: true,
    enableHotkeys: true,
  },
  toolbar: {
    fullscreen: true,
    colorScheme: true,
  },
  copyright: {
    enable: true,
    dates: '2021-present',
    company: 'One-step-admin',
    website: 'https://one-step-admin.hurui.me',
  },
}

export default defaultsDeep(globalSettings, settingsDefault) as RecursiveRequired<Settings.all>
