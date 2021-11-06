<template>
    <div
        ref="windows" class="dashboard" :class="{
            'preview-all': $store.state.settings.previewAllWindows
        }" @click="exitPreviewAllWindows"
    >
        <div class="preview-all-mode">
            <div class="title">预览</div>
            <el-tooltip content="可以通过快捷键 Alt + W 快速进入窗口预览界面" placement="left" :append-to-body="false">
                <svg-icon name="el-icon-question" class="help" />
            </el-tooltip>
        </div>
        <transition-group v-if="$store.state.window.list.length > 0" name="window" tag="div" class="dashboard-container">
            <div v-for="element in $store.state.window.list" :key="element.name" :ref="`window-${element.name}`" class="window" @click.stop>
                <div
                    class="window-container" :class="{
                        'preview': $store.state.settings.previewAllWindows
                    }"
                >
                    <div class="header" @dblclick="scrollToWindow(element.name)">
                        <div class="titles">
                            <el-tooltip v-if="element.title" effect="dark" :content="element.breadcrumbNeste.map(bc => bc.title).join(' / ')" placement="bottom-start" :show-after="500" :disabled="element.breadcrumbNeste.map(b => b.title).length == 0">
                                <span class="title">
                                    {{ element.title }}
                                </span>
                            </el-tooltip>
                        </div>
                        <div class="btns" @dblclick.stop>
                            <div class="btn" @click="$window.remove(element.name)">
                                <el-icon>
                                    <el-icon-close-bold />
                                </el-icon>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <el-scrollbar>
                            <Component :is="element.name" v-if="!element.reload" :params="element.params" />
                        </el-scrollbar>
                    </div>
                    <div class="mask" @click="maskClick(element.name)" />
                </div>
            </div>
        </transition-group>
        <Empty v-else />
    </div>
</template>

<script setup name="Dashboard">
import Empty from './Empty/index.vue'

const { proxy } = getCurrentInstance()
const store = useStore()

proxy.$eventBus.on('scrollToWindow', windowName => scrollToWindow(windowName))

// 记录进入窗口预览界面前 scrollLeft 的值，退出的时候可以进行复原
const originalScrollLeft = ref(0)
watch(() => store.state.settings.previewAllWindows, val => {
    if (val) {
        originalScrollLeft.value = proxy.$refs['windows'].scrollLeft
    }
})

onMounted(() => {
    proxy.$hotkeys('alt+w', e => {
        if (store.state.window.list.length > 1) {
            e.preventDefault()
            if (store.state.settings.previewAllWindows) {
                exitPreviewAllWindows()
            } else {
                store.commit('settings/updateThemeSetting', {
                    previewAllWindows: true
                })
            }
        }
    })
})

function scrollToOriginal(scrollLeft) {
    nextTick(() => {
        proxy.$refs['windows'].scroll(scrollLeft, 0)
    })
}
function scrollToWindow(windowName) {
    nextTick(() => {
        const offsetLeft = proxy.$refs[`window-${windowName}`].offsetLeft
        proxy.$refs['windows'].scrollTo({
            left: offsetLeft,
            behavior: 'smooth'
        })
    })
}

function exitPreviewAllWindows() {
    if (store.state.settings.previewAllWindows) {
        store.commit('settings/updateThemeSetting', {
            previewAllWindows: false
        })
        scrollToOriginal(originalScrollLeft.value)
    }
}
function maskClick(windowName) {
    exitPreviewAllWindows()
    setTimeout(() => {
        scrollToWindow(windowName)
    }, 0)
}
</script>

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
        background-color: rgb(0 0 0 / 50%);
        backdrop-filter: blur(10px);
        .preview-all-mode {
            display: block;
        }
        .dashboard-container {
            flex-wrap: wrap;
            justify-content: center;
            bottom: auto;
            padding-bottom: 8px;
            height: max-content;
            align-items: center;
            .window {
                width: 800;
                height: 800px;
                margin-right: calc(800px * ($g-window-perview-scale - 1));
                margin-bottom: calc(800px * ($g-window-perview-scale - 1));
                transform-origin: top left;
                transform: scale($g-window-perview-scale);
                user-select: none;
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
        width: 800px;
        margin-right: -16px;
        .window-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            width: calc(100% - 32px);
            margin: 16px;
            background-color: #fff;
            box-shadow: 0 0 1px 0 #ccc;
            transition: 0.3s;
            &:hover {
                box-shadow: 0 0 5px 0 #ccc;
            }
            &.preview {
                .mask {
                    display: block;
                }
            }
            .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px;
                height: 40px;
                border-bottom: 1px solid #eee;
                .titles {
                    display: flex;
                    align-items: center;
                    .title {
                        font-weight: bold;
                        font-size: 14px;
                    }
                    .title + .btns {
                        margin-left: 10px;
                    }
                }
                .btns {
                    display: flex;
                    .btn {
                        transition: 0.3s;
                        opacity: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 5px;
                        font-size: 16px;
                        border-radius: 3px;
                        background-color: rgb(238 238 238 / 50%);
                        cursor: pointer;
                        &.disabled {
                            color: #ccc;
                            cursor: not-allowed;
                        }
                        &:not(.disabled):hover {
                            opacity: 100%;
                            background-color: #eee;
                        }
                    }
                }
            }
            .container {
                flex: 1;
                overflow: auto;
                overscroll-behavior: contain;
                :deep(.el-scrollbar__wrap) {
                    padding: $g-window-container-padding;
                }
            }
            .mask {
                display: none;
                position: absolute;
                z-index: 1000;
                margin: 16px;
                top: 0;
                left: 0;
                width: calc(100% - 32px);
                height: calc(100% - 32px);
                background-color: rgb(255 255 255 / 50%);
                cursor: pointer;
                transition: 0.3s;
                &:hover {
                    background-color: rgb(64 158 255 / 30%);
                }
            }
        }
        &:last-child {
            margin-right: 0;
        }
    }
}
.window-enter-from {
    opacity: 0%;
    transform: translateY(100px);
}
.window-enter-active {
    transition: all 0.5s;
}
</style>
