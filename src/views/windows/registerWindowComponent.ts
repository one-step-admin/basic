import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export default function registerWindowComponent(app: App) {
  const componentsContext = import.meta.glob('./*/index.vue')
  for (const path in componentsContext) {
    let name = path.replace('./', '')
    name = name.slice(0, name.indexOf('/'))
    app.component(name, defineAsyncComponent(componentsContext[path] as any))
  }
}
