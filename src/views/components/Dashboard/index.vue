<script setup lang="ts">
import hotkeys from 'hotkeys-js'
import { ElMessageBox } from 'element-plus'
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

function windowScrollTip() {
  if (windowsRef.value.scrollWidth > windowsRef.value.clientWidth && localStorage.getItem('windowScrollTip') === null) {
    ElMessageBox.confirm(`
      <div style="text-align: left;">
        当前窗口数量已超过浏览器展示区域，你可以通过拖动窗口下方的滚动条进行定位，除此之外，我们推荐使用以下两种更高效的方式进行窗口定位：
        <ol>
          <li>在窗口展示区域内，按住 Shift 键，滑动鼠标滚轮</li>
          <li>使用 Alt + W 快捷键进入预览界面</li>
        </ol>
      </div>
    `, '温馨提示', {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '知道了',
      showCancelButton: false,
      showClose: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      type: 'info',
      center: true,
    }).then(() => {
      localStorage.setItem('windowScrollTip', '')
    })
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
    if (settingsStore.settings.window.enableHotkeys && windowStore.list.length > 1 && windowStore.list.every(item => !item.isMaximize)) {
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
      <el-tooltip content="可以通过快捷键 Alt + W 快速进入窗口预览界面" placement="left" :append-to-body="false">
        <el-icon v-show="settingsStore.settings.window.enableHotkeys" class="help">
          <svg-icon name="ep:question-filled" />
        </el-icon>
      </el-tooltip>
    </div>
    <transition-group v-show="windowStore.list.length > 0" name="window" tag="div" class="dashboard-container">
      <div v-for="element in windowStore.list" :key="element.name" :ref="setWindowItemRef" class="window">
        <div
          class="window-container" :class="{
            maximize: element.isMaximize,
            preview: settingsStore.previewAllWindows,
          }"
        >
          <div v-if="!element.noTitle" class="header" @dblclick="scrollToWindow(element.name)">
            <div class="titles">
              <el-tooltip v-if="element.title" effect="dark" :content="element.breadcrumbNeste?.map(bc => bc.title).join(' / ')" placement="bottom-start" :show-after="500" :disabled="element.breadcrumbNeste?.map(b => b.title).length === 0">
                <span class="title">
                  {{ element.title }}
                </span>
              </el-tooltip>
            </div>
            <div class="btns" @dblclick.stop>
              <div class="btn" @click="appWindow.remove(element.name)">
                <el-icon>
                  <svg-icon name="ep:close-bold" />
                </el-icon>
              </div>
            </div>
          </div>
          <div class="container">
            <el-scrollbar>
              <Component :is="element.name" v-if="!element.reload" :is-maximize="element.isMaximize" :params="element.params" />
            </el-scrollbar>
          </div>
          <div class="mask" @click="maskClick(element.name)">
            点击进入该窗口
          </div>
        </div>
      </div>
    </transition-group>
    <Empty v-show="windowStore.list.length === 0" />
  </div>
</template>

<style lang="scss">
.contextmenu-custom {
  .mx-context-menu-items .mx-context-menu-item {
    .text {
      display: flex;
      align-items: center;
    }

    &.disabled .text .icon {
      color: #9f9f9f;
    }
  }
}
</style>

<style lang="scss" scoped>
.dashboard {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  transition: 0.3s;

  &.preview-all {
    position: fixed;
    z-index: 2000;
    top: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    background-color: var(--el-overlay-color-lighter);
    backdrop-filter: blur(10px);

    .preview-all-mode {
      display: block;
    }

    .dashboard-container {
      flex-wrap: wrap;
      justify-content: center;
      bottom: auto;
      height: max-content;
      padding-bottom: 80px;

      &:not(.mode-drag) {
        align-items: center;

        .window {
          height: var(--g-window-height);
          margin-right: calc(var(--g-window-width) * (var(--g-window-perview-scale) - 1));
          margin-bottom: calc(var(--g-window-height) * (var(--g-window-perview-scale) - 1));
          transform-origin: top left;
          transform: scale(var(--g-window-perview-scale));
          user-select: none;
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
    position: relative;

    .title {
      font-size: 24px;
      color: #fff;
    }

    .help {
      color: #ccc;
      right: 20px;
      font-size: 18px;

      @include position-center(y);
    }
  }

  .dashboard-container {
    display: flex;
    height: 100%;
  }

  .window {
    flex: none;
    display: flex;
    width: var(--g-window-width);
    margin-right: -16px;

    &.window-ghost {
      opacity: 0;
    }

    .window-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      width: calc(100% - 32px);
      margin: 16px;
      background-color: var(--g-app-bg);
      box-shadow: 0 0 1px 0 var(--g-box-shadow-color);
      transition: background-color 0.3s, var(--el-transition-box-shadow);

      &:hover {
        box-shadow: 0 0 5px 0 var(--g-box-shadow-color);
      }

      &.maximize {
        position: fixed;
        z-index: 2000;
        margin: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        .header {
          display: none;
        }
      }

      &.preview {
        .mask {
          display: flex;
        }
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        height: 40px;
        border-bottom: 1px solid var(--el-border-color-lighter);
        transition: var(--el-transition-border);

        .titles {
          display: flex;
          align-items: center;

          .title {
            font-weight: bold;
            font-size: 14px;
            color: var(--el-text-color-primary);
            transition: var(--el-transition-color);
          }

          .title + .btns {
            margin-left: 10px;
          }
        }

        .btns {
          display: flex;

          .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            font-size: 16px;
            border-radius: 3px;
            color: var(--el-text-color-regular);
            background-color: var(--el-fill-color-light);
            transition: background-color 0.3s, var(--el-transition-color);
            cursor: pointer;

            &.disabled {
              background-color: var(--el-fill-color-darker);
              cursor: not-allowed;
            }

            &:not(.disabled):hover {
              background-color: var(--el-fill-color);
            }
          }
        }
      }

      .container {
        flex: 1;
        overflow: auto;
        overscroll-behavior: contain;

        > .el-scrollbar {
          > :deep(.el-scrollbar__wrap) {
            padding: var(--g-window-container-padding);
          }
        }
      }

      .mask {
        opacity: 0;
        display: none;
        align-items: center;
        justify-content: center;
        position: absolute;
        z-index: 1000;
        margin: 16px;
        top: 0;
        left: 0;
        width: calc(100% - 32px);
        height: calc(100% - 32px);
        background-color: var(--el-mask-color-extra-light);
        font-size: 48px;
        color: rgb(0 0 0 / 0%);
        text-shadow: 0 0 0 rgb(0 0 0 / 0%);
        cursor: pointer;
        transition: var(--el-transition-fade-linear), var(--el-transition-color), text-shadow 0.3s;

        &:hover {
          opacity: 1;
          color: var(--el-color-primary);
          text-shadow: 0 0 5px rgb(0 0 0 / 50%);
        }
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
