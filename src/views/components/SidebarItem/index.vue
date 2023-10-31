<script setup lang="ts">
defineOptions({
  name: 'SidebarItem',
})

withDefaults(
  defineProps<{
    item: Menu.recordRaw
    isRoot?: boolean
  }>(),
  {
    isRoot: false,
  },
)

const appWindow = useWindow()

function handleOpen(windowName: string) {
  if (/^(https?:|mailto:|tel:)/.test(windowName)) {
    window.open(windowName)
  }
  else {
    appWindow.add(windowName)
  }
}
</script>

<template>
  <div class="sidebar-item">
    <ElSubMenu v-if="isRoot" :index="JSON.stringify(item)">
      <template #title>
        <div class="item">
          <ElIcon v-if="item.icon" class="title-icon">
            <SvgIcon :name="item.icon" />
          </ElIcon>
          <span class="title">{{ item.title }}</span>
        </div>
      </template>
      <template v-for="route in item.children" :key="route.path">
        <SidebarItem :item="route" />
      </template>
    </ElSubMenu>
    <ElMenuItem v-else-if="!item.children" :title="item.title" :index="JSON.stringify(item)" @click="handleOpen(item.windowName!)">
      <ElIcon v-if="item.icon" class="title-icon">
        <SvgIcon :name="item.icon" />
      </ElIcon>
      <span class="title">{{ item.title }}</span>
    </ElMenuItem>
    <ElSubMenu v-else :title="item.title" :index="JSON.stringify(item)">
      <template #title>
        <ElIcon v-if="item.icon" class="title-icon">
          <SvgIcon :name="item.icon" />
        </ElIcon>
        <span class="title">{{ item.title }}</span>
      </template>
      <template v-for="route in item.children" :key="route.path">
        <SidebarItem :item="route" />
      </template>
    </ElSubMenu>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-item {
  transition: padding 0.3s;
}

:deep(.el-menu-item),
:deep(.el-menu-item span.title),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu__title span.title) {
  flex: 1;
  vertical-align: inherit;

  @include text-overflow;
}

:deep(.el-menu-item) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.el-sub-menu),
:deep(.el-menu-item) {
  .title-icon {
    font-size: 20px;
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
