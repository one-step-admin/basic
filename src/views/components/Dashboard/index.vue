<script setup lang="ts">
import hotkeys from 'hotkeys-js'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import Empty from './Empty/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useWindowStore from '@/store/modules/window'
import eventBus from '@/utils/eventBus'

defineOptions({
  name: 'Dashboard',
})

const settingsStore = useSettingsStore()
const windowStore = useWindowStore()

const appWindow = useWindow()

const windowsRef = ref()
const windowItemRef = ref<any>([])
const setWindowItemRef = (el: any) => windowItemRef.value.push(el)
onBeforeUpdate(() => {
  windowItemRef.value = []
})

watch(() => windowStore.list, (val) => {
  nextTick(() => {
    if (val.length > 0) {
      windowScrollTip()
    }
  })
}, {
  deep: true,
})

const showWindowScrollTip = ref(false)
function windowScrollTip() {
  if (windowsRef.value.scrollWidth > windowsRef.value.clientWidth && localStorage.getItem('windowScrollTip') === null) {
    showWindowScrollTip.value = true
    localStorage.setItem('windowScrollTip', '')
  }
}

// 记录进入窗口预览界面前 scrollLeft 的值，退出的时候可以进行复原
const originalScrollLeft = ref(0)
watch(() => settingsStore.previewAllWindows, (val) => {
  if (val) {
    originalScrollLeft.value = windowsRef.value.scrollLeft
  }
})

onMounted(() => {
  hotkeys('alt+w', (e) => {
    if (settingsStore.settings.window.enableHotkeys && windowStore.list.length > 1) {
      e.preventDefault()
      if (settingsStore.previewAllWindows) {
        exitPreviewAllWindows()
      }
      else {
        settingsStore.$patch({
          previewAllWindows: true,
        })
      }
    }
  })
})

function scrollToOriginal(scrollLeft: number) {
  nextTick(() => {
    windowsRef.value.scroll(scrollLeft, 0)
  })
}
function scrollToWindow(windowName: string | unknown) {
  nextTick(() => {
    const index = windowStore.list.findIndex(item => item.name === windowName)
    const offsetLeft = windowItemRef.value[index].offsetLeft
    windowsRef.value.scrollTo({
      left: offsetLeft,
      behavior: 'smooth',
    })
  })
}
eventBus.on('scrollToWindow', scrollToWindow)

function exitPreviewAllWindows() {
  if (settingsStore.previewAllWindows) {
    settingsStore.$patch({
      previewAllWindows: false,
    })
    scrollToOriginal(originalScrollLeft.value)
  }
}
function maskClick(windowName: string) {
  exitPreviewAllWindows()
  setTimeout(() => {
    scrollToWindow(windowName)
  }, 0)
}
</script>

<template>
  <div
    ref="windowsRef" class="dashboard" :class="{
      'preview-all': settingsStore.previewAllWindows,
    }" @click="exitPreviewAllWindows"
  >
    <div class="preview-all-mode">
      <div class="title">
        预览
      </div>
    </div>
    <TransitionGroup v-show="windowStore.list.length > 0" name="window" tag="div" class="dashboard-container">
      <div v-for="element in windowStore.list" :key="element.name" :ref="setWindowItemRef" class="window" :style="`--g-window-width: ${typeof settingsStore.settings.window.defaultWidth === 'string' ? settingsStore.settings.window.defaultWidth : `${settingsStore.settings.window.defaultWidth}px`};`">
        <div
          class="window-container" :class="{
            preview: settingsStore.previewAllWindows,
          }"
        >
          <div class="header" @dblclick="scrollToWindow(element.name)">
            <div class="titles">
              <HTooltip v-if="element.title" :text="element.breadcrumbNeste?.map(bc => bc.title).join(' / ')" placement="bottom-start" :delay="500">
                <span class="title">
                  {{ element.title }}
                </span>
              </HTooltip>
            </div>
            <div class="btns" @dblclick.stop>
              <div class="btn" @click="appWindow.remove(element.name)">
                <SvgIcon name="i-ep:close-bold" />
              </div>
            </div>
          </div>
          <div class="flex-1 of-auto overscroll-contain">
            <OverlayScrollbarsComponent :options="{ scrollbars: { autoHide: 'leave', autoHideDelay: 300 } }" defer class="h-full">
              <Component :is="element.name" v-if="!element.reload" :params="element.params" />
            </OverlayScrollbarsComponent>
          </div>
          <div class="mask" @click="maskClick(element.name)">
            <div class="w-full flex-center flex-1 cursor-pointer text-5xl c-stone-3 text-shadow transition dark-c-stone-7 hover-c-stone-5">
              点击进入
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
    <Empty v-show="windowStore.list.length === 0" />
  </div>
  <HDialog v-model="showWindowScrollTip" title="温馨提示">
    <div class="text-sm">
      当前窗口数量已超过浏览器展示区域，你可以通过拖动窗口下方的滚动条进行定位，除此之外，我们推荐使用以下三种更高效的方式进行窗口定位：
      <ol>
        <li>在窗口展示区域内，按住 Shift 键，滑动鼠标滚轮</li>
        <li>使用 Alt + W 快捷键进入预览界面</li>
      </ol>
    </div>
  </HDialog>
</template>

<style>
.contextmenu-custom {
  --uno: fixed ring-1 ring-stone-2 dark-ring-stone-7 shadow-2xl;

  background-color: var(--g-app-bg);

  .mx-context-menu-items .mx-context-menu-item {
    --uno: transition-background-color;

    &:not(.disabled):hover {
      --uno: cursor-pointer bg-stone-1 dark-bg-stone-9;
    }

    span {
      color: initial;
    }

    .icon {
      color: initial;
    }

    &.disabled span,
    &.disabled .icon {
      opacity: 0.25;
    }
  }

  .mx-context-menu-item-sperator {
    background-color: var(--g-app-bg);

    &::after {
      --uno: bg-stone-2 dark-bg-stone-7;
    }
  }
}
</style>

<style scoped>
.dashboard {
  --uno: absolute top-0 bottom-0 w-full of-x-auto of-y-hidden transition;

  &.preview-all {
    --uno: fixed z-2000 top-0 bottom-0 left-0 right-0 of-y-auto bg-stone-200/75 dark-bg-stone-8/75 backdrop-blur-sm;

    .preview-all-mode {
      display: block;
    }

    .dashboard-container {
      --uno: flex-wrap justify-center bottom-a h-max pb-15;

      &:not(.mode-drag) {
        align-items: center;

        .window {
          height: var(--g-window-height);
          margin-right: calc(var(--g-window-width) * (var(--g-window-perview-scale) - 1));
          margin-bottom: calc(var(--g-window-height) * (var(--g-window-perview-scale) - 1));
          user-select: none;
          transform: scale(var(--g-window-perview-scale));
          transform-origin: top left;
        }
      }

      &.mode-drag .window {
        width: 200px;
        margin-right: unset;

        .window-container {
          margin: 8px;

          > * {
            display: none;
          }
        }
      }
    }
  }

  .preview-all-mode {
    display: none;
    padding: 20px 0;
    text-align: center;

    .title {
      font-size: 24px;
    }

    .help {
      position: absolute;
      top: 50%;
      right: 20px;
      font-size: 18px;
      color: #ccc;
      transform: translateY(-50%);
    }
  }

  .dashboard-container {
    display: flex;
    height: 100%;
  }

  .window {
    display: flex;
    flex: none;
    width: var(--g-window-width);
    margin-right: -16px;

    &.window-ghost {
      opacity: 0;
    }

    .window-container {
      --uno: shadow hover-shadow-lg transition;

      display: flex;
      flex: 1;
      flex-direction: column;
      width: calc(100% - 32px);
      margin: 16px;
      background-color: var(--g-app-bg);

      &.preview {
        .mask {
          display: flex;
        }
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40px;
        padding: 10px;
        border-bottom: 1px solid var(--g-border-color);

        .titles {
          display: flex;
          align-items: center;

          .title {
            --uno: c-dark dark-c-light;

            font-size: 14px;
            font-weight: bold;
          }

          .title + .btns {
            margin-left: 10px;
          }
        }

        .btns {
          display: flex;

          .btn {
            --uno: c-dark dark-c-light bg-stone-1 hover-bg-stone-2 dark-bg-stone-9 dark-hover-bg-stone-8 transition;

            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 3px;
          }
        }
      }

      .mask {
        --uno: bg-stone-1/75 dark-bg-stone-9/75;

        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: calc(100% - 32px);
        height: calc(100% - 32px);
        margin: 16px;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.window-enter-from {
  opacity: 0;
  transform: translateY(100px);
}

.window-enter-active {
  transition: all 0.5s;
}
</style>
