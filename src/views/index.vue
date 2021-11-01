<template>
    <div class="layout">
        <div id="app-main">
            <Header />
            <div class="wrapper">
                <div class="sidebar-container">
                    <MainSidebar />
                    <SubSidebar />
                </div>
                <div class="main-container" :style="{'padding-bottom': $route.meta.paddingBottom}">
                    <Topbar v-if="!($store.state.settings.menuMode === 'head' && !$store.state.settings.enableSidebarCollapse)" />
                    <div class="main">
                        <Dashboard />
                    </div>
                    <Copyright v-if="showCopyright" />
                </div>
            </div>
            <el-backtop :right="20" :bottom="20" title="回到顶部" />
        </div>
        <Search />
        <ThemeSetting />
        <BuyIt />
    </div>
</template>

<script setup>
import Header from './components/Header/index.vue'
import MainSidebar from './components/MainSidebar/index.vue'
import SubSidebar from './components/SubSidebar/index.vue'
import Topbar from './components/Topbar/index.vue'
import Dashboard from './components/Dashboard/index.vue'
import Search from './components/Search/index.vue'
import ThemeSetting from './components/ThemeSetting/index.vue'
import BuyIt from './components/BuyIt/index.vue'

const store = useStore()
const route = useRoute(), router = useRouter()

const showCopyright = computed(() => {
    return typeof route.meta.copyright !== 'undefined' ? route.meta.copyright : store.state.settings.showCopyright
})

provide('switchMenu', switchMenu)
function switchMenu(index) {
    store.commit('menu/switchHeaderActived', index)
    if (store.state.settings.switchSidebarAndPageJump) {
        router.push(store.getters['menu/sidebarMenus'][0].path)
    }
}
</script>

<style lang="scss" scoped>
// 侧边栏未折叠
[data-sidebar-no-collapse] {
    .sidebar-container {
        width: calc(#{$g-main-sidebar-width} + #{$g-sub-sidebar-width});
    }
    .main-container {
        margin-left: calc(#{$g-main-sidebar-width} + #{$g-sub-sidebar-width});
    }
    // 没有主侧边栏
    &[data-menu-mode="head"],
    &[data-menu-mode="single"] {
        .sidebar-container {
            width: $g-sub-sidebar-width;
        }
        .main-container {
            margin-left: $g-sub-sidebar-width;
        }
    }
}
// 侧边栏折叠
[data-sidebar-collapse] {
    .sidebar-container {
        width: calc(#{$g-main-sidebar-width} + 64px);
    }
    .main-container {
        margin-left: calc(#{$g-main-sidebar-width} + 64px);
    }
    // 没有主侧边栏
    &[data-menu-mode="head"],
    &[data-menu-mode="single"] {
        .sidebar-container {
            width: 64px;
        }
        .main-container {
            margin-left: 64px;
        }
    }
}
.layout {
    height: 100%;
}
#app-main {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    transition: all 0.2s;
}
.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .sidebar-container {
        position: fixed;
        z-index: 1010;
        top: 0;
        bottom: 0;
        display: flex;
        transition: transform 0.3s;
    }
    .main-sidebar-container + .sub-sidebar-container {
        left: $g-main-sidebar-width;
    }
    .main-container {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        transition: margin-left 0.3s;
        background-color: $g-main-bg;
        box-shadow: -1px 0 0 0 darken($g-main-bg, 10), 1px 0 0 0 darken($g-main-bg, 10);
        .topbar-container {
            top: 0;
            z-index: 998;
        }
        .main {
            height: 100%;
            flex: auto;
            position: relative;
            overflow: hidden;
            transition: 0.3s;
        }
        .topbar-container + .main {
            margin-top: $g-topbar-height;
        }
    }
    .copyright {
        background-color: #fff;
        box-shadow: 0 0 1px 0 #ccc;
    }
}
header + .wrapper {
    padding-top: $g-header-height;
    .sidebar-container {
        top: $g-header-height;
        :deep(.sidebar-logo) {
            display: none;
        }
        :deep(.el-menu) {
            padding-top: 0;
        }
    }
    .main-container {
        .topbar-container {
            top: $g-header-height;
            :deep(.user) {
                display: none;
            }
        }
    }
}

// 主内容区动画
.main-enter-active {
    transition: 0.2s;
}
.main-leave-active {
    transition: 0.15s;
}
.main-enter-from {
    opacity: 0%;
    margin-left: -20px;
}
.main-leave-to {
    opacity: 0%;
    margin-left: 20px;
}
</style>
