import components from 'unplugin-vue-components/vite'

export default function createComponents() {
  return components({
    dirs: [
      'src/components',
      'src/views/ui-kit',
    ],
    dts: './src/types/components.d.ts',
  })
}
