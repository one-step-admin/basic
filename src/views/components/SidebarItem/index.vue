<template>
    <div class="sidebar-item">
        <el-menu-item v-if="!item.children" :title="item.title" :index="JSON.stringify(item)" @click="handleOpen(item.windowName)">
            <el-icon v-if="item.icon" class="title-icon">
                <svg-icon :name="item.icon" />
            </el-icon>
            <span class="title">{{ item.title }}</span>
        </el-menu-item>
        <el-sub-menu v-else :title="item.title" :index="JSON.stringify(item)">
            <template #title>
                <el-icon v-if="item.icon" class="title-icon">
                    <svg-icon :name="item.icon" />
                </el-icon>
                <span class="title">{{ item.title }}</span>
            </template>
            <SidebarItem v-for="route in item.children" :key="route.path" :item="route" />
        </el-sub-menu>
    </div>
</template>

<script setup name="SidebarItem">
import SidebarItem from './index.vue'

const { proxy } = getCurrentInstance()

defineProps({
    item: {
        type: Object,
        required: true
    }
})

function handleOpen(windowName) {
    if (/^(https?:|mailto:|tel:)/.test(windowName)) {
        window.open(windowName)
    } else {
        proxy.$window.add(windowName)
    }
}
</script>

<style lang="scss" scoped>
:deep(.el-menu-item),
:deep(.el-menu-item span.title),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu__title span.title) {
    flex: 1;
    vertical-align: inherit;
    @include text-overflow;
}
:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
    display: flex;
    align-items: center;
    justify-content: center;
}
:deep(.el-sub-menu),
:deep(.el-menu-item) {
    .title-icon {
        width: 20px;
        font-size: 20px;
        vertical-align: -0.25em;
        transition: transform 0.3s;
        color: unset;
    }
    .title-icon + .title {
        margin-left: 10px;
    }
    &:hover > .title-icon,
    .el-sub-menu__title:hover > .title-icon {
        transform: scale(1.2);
    }
}
a {
    cursor: pointer;
    color: inherit;
    text-decoration: none;
}
</style>
