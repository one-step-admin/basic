<script setup lang="ts">
import { Dialog, DialogDescription, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import type { OverlayScrollbarsComponentRef } from 'overlayscrollbars-vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import hotkeys from 'hotkeys-js'
import Breadcrumb from '../Breadcrumb/index.vue'
import BreadcrumbItem from '../Breadcrumb/item.vue'
import useSettingsStore from '@/store/modules/settings'
import useMenuStore from '@/store/modules/menu'
import eventBus from '@/utils/eventBus'

defineOptions({
  name: 'Search',
})

const overlayTransitionClass = ref({
  enter: 'ease-in-out duration-500',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leave: 'ease-in-out duration-500',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0',
})

const transitionClass = computed(() => {
  return {
    enter: 'ease-out duration-300',
    enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
    enterTo: 'opacity-100 translate-y-0 sm:scale-100',
    leave: 'ease-in duration-200',
    leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
    leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
  }
})

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()
const appWindow = useWindow()

const isShow = ref(false)
const searchInput = ref('')
const actived = ref(-1)

const searchInputRef = ref()
const searchResultRef = ref<OverlayScrollbarsComponentRef>()
const searchResultItemRef = ref<HTMLElement[]>([])
onBeforeUpdate(() => {
  searchResultItemRef.value = []
})

const resultList = computed(() => {
  let result = []
  result = Object.values(menuStore.flatMenu).filter((item) => {
    let flag = false
    if (item.title) {
      if (typeof item.title === 'function') {
        if (item.title().includes(searchInput.value)) {
          flag = true
        }
      }
      else {
        if (item.title.includes(searchInput.value)) {
          flag = true
        }
      }
    }
    if (item.breadcrumbNeste?.some((b) => {
      if (typeof b.title === 'function') {
        if (b.title().includes(searchInput.value)) {
          return true
        }
      }
      else {
        if (b.title?.includes(searchInput.value)) {
          return true
        }
      }
      return false
    })) {
      flag = true
    }
    return flag
  })
  return result
})

watch(() => isShow.value, (val) => {
  if (val) {
    searchInput.value = ''
    actived.value = -1
    // 当搜索显示的时候绑定上、下、回车快捷键，隐藏的时候再解绑。另外当 input 处于 focus 状态时，采用 vue 来绑定键盘事件
    hotkeys('up', keyUp)
    hotkeys('down', keyDown)
    hotkeys('enter', keyEnter)
  }
  else {
    hotkeys.unbind('up', keyUp)
    hotkeys.unbind('down', keyDown)
    hotkeys.unbind('enter', keyEnter)
  }
})
watch(() => resultList.value, () => {
  actived.value = -1
  handleScroll()
})

onMounted(() => {
  eventBus.on('global-search-toggle', () => {
    isShow.value = !isShow.value
  })
  hotkeys('alt+s', (e) => {
    if (settingsStore.settings.toolbar.navSearch && settingsStore.settings.navSearch.enableHotkeys) {
      e.preventDefault()
      isShow.value = true
    }
  })
  hotkeys('esc', (e) => {
    if (settingsStore.settings.toolbar.navSearch && settingsStore.settings.navSearch.enableHotkeys) {
      e.preventDefault()
      eventBus.emit('global-search-toggle')
    }
  })
})

function keyUp() {
  if (resultList.value.length) {
    actived.value -= 1
    if (actived.value < 0) {
      actived.value = resultList.value.length - 1
    }
    handleScroll()
  }
}
function keyDown() {
  if (resultList.value.length) {
    actived.value += 1
    if (actived.value > resultList.value.length - 1) {
      actived.value = 0
    }
    handleScroll()
  }
}
function keyEnter() {
  if (actived.value !== -1) {
    searchResultItemRef.value[actived.value].click()
  }
}
function handleScroll() {
  if (searchResultRef.value) {
    const contentDom = searchResultRef.value.osInstance()!.elements().content
    let scrollTo = 0
    if (actived.value !== -1) {
      scrollTo = contentDom.scrollTop
      const activedOffsetTop = searchResultItemRef.value[actived.value].offsetTop
      const activedClientHeight = searchResultItemRef.value[actived.value].clientHeight
      const searchScrollTop = contentDom.scrollTop
      const searchClientHeight = contentDom.clientHeight
      if (activedOffsetTop + activedClientHeight > searchScrollTop + searchClientHeight) {
        scrollTo = activedOffsetTop + activedClientHeight - searchClientHeight
      }
      else if (activedOffsetTop <= searchScrollTop) {
        scrollTo = activedOffsetTop
      }
    }
    contentDom.scrollTo({
      top: scrollTo,
    })
  }
}

function handleOpen(windowName: string) {
  if (/^(?:https?:|mailto:|tel:)/.test(windowName)) {
    window.open(windowName)
  }
  else {
    appWindow.add(windowName)
  }
  isShow.value = false
}
</script>

<template>
  <TransitionRoot as="template" :show="isShow">
    <Dialog :initial-focus="searchInputRef" class="fixed inset-0 z-2000 flex" @close="isShow && eventBus.emit('global-search-toggle')">
      <TransitionChild as="template" v-bind="overlayTransitionClass">
        <div class="fixed inset-0 bg-stone-200/75 backdrop-blur-sm transition-opacity dark-bg-stone-8/75" />
      </TransitionChild>
      <div class="fixed inset-0">
        <div class="h-full flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" v-bind="transitionClass">
            <DialogPanel class="relative h-full max-h-4/5 w-full flex flex-col text-left sm:max-w-2xl">
              <div class="flex flex-col overflow-y-auto rounded-xl bg-white shadow-xl dark-bg-stone-8">
                <div class="flex items-center px-4 py-3" border-b="~ solid stone-2 dark-stone-7">
                  <SvgIcon name="i-ep:search" :size="18" class="text-stone-5" />
                  <input ref="searchInputRef" v-model="searchInput" placeholder="搜索页面，支持标题、URL模糊查询" class="w-full border-0 rounded-md bg-transparent px-3 text-base text-dark dark-text-white focus-outline-none placeholder-stone-4 dark-placeholder-stone-5" @keydown.esc="eventBus.emit('global-search-toggle')" @keydown.up.prevent="keyUp" @keydown.down.prevent="keyDown" @keydown.enter.prevent="keyEnter">
                </div>
                <DialogDescription class="relative m-0 of-y-hidden">
                  <OverlayScrollbarsComponent ref="searchResultRef" :options="{ scrollbars: { autoHide: 'leave', autoHideDelay: 300 } }" defer class="h-full">
                    <template v-if="resultList.length > 0">
                      <a v-for="(item, index) in resultList" ref="searchResultItemRef" :key="item.windowName" class="flex cursor-pointer items-center" :class="{ 'bg-stone-2/40 dark-bg-stone-7/40': index === actived }" :data-index="index" @click="item.windowName && handleOpen(item.windowName)" @mouseover="actived = index">
                        <SvgIcon v-if="item.icon" :name="item.icon" :size="20" class="basis-16 transition" :class="{ 'scale-120 text-ui-primary': index === actived }" />
                        <div class="flex flex-1 flex-col gap-1 truncate px-4 py-3" border-l="~ solid stone-2 dark-stone-7">
                          <div class="truncate text-base font-bold">{{ item.title }}</div>
                          <Breadcrumb v-if="item.breadcrumbNeste?.length" class="truncate">
                            <BreadcrumbItem v-for="(bc, bcIndex) in item.breadcrumbNeste" :key="bcIndex" class="text-xs">
                              {{ bc.title }}
                            </BreadcrumbItem>
                          </Breadcrumb>
                        </div>
                      </a>
                    </template>
                    <template v-else>
                      <div flex="center col" py-6 text-stone-5>
                        <SvgIcon name="i-tabler:mood-empty" :size="40" />
                        <p m-2 text-base>
                          没有找到你想要的
                        </p>
                      </div>
                    </template>
                  </OverlayScrollbarsComponent>
                </DialogDescription>
                <div class="flex justify-between px-4 py-3" border-t="~ solid stone-2 dark-stone-7">
                  <div class="flex gap-8">
                    <div class="inline-flex items-center gap-1 text-xs">
                      <HKbd>
                        <SvgIcon name="i-ion:md-return-left" :size="14" />
                      </HKbd>
                      <span>访问</span>
                    </div>
                    <div class="inline-flex items-center gap-1 text-xs">
                      <HKbd>
                        <SvgIcon name="i-ant-design:caret-up-filled" :size="14" />
                      </HKbd>
                      <HKbd>
                        <SvgIcon name="i-ant-design:caret-down-filled" :size="14" />
                      </HKbd>
                      <span>切换</span>
                    </div>
                  </div>
                  <div v-if="settingsStore.settings.navSearch.enableHotkeys" class="inline-flex items-center gap-1 text-xs">
                    <HKbd>
                      ESC
                    </HKbd>
                    <span>退出</span>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
