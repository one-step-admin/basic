import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import createRestart from './restart'
import createAutoImport from './auto-import'
import createComponents from './components'
import createSvgIcon from './svg-icon'
import createMock from './mock'
import createCompression from './compression'
import createSpritesmith from './spritesmith'
import createBanner from './banner'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
  ]
  !isBuild && vitePlugins.push(createRestart())
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents())
  vitePlugins.push(createSvgIcon(isBuild))
  vitePlugins.push(createMock(viteEnv, isBuild))
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  vitePlugins.push(...createSpritesmith(isBuild))
  vitePlugins.push(createBanner())
  return vitePlugins
}
