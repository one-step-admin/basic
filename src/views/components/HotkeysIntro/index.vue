<script setup lang="ts">
import eventBus from '@/utils/eventBus'
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'HotkeysIntro',
})

const isShow = ref(false)

const settingsStore = useSettingsStore()

onMounted(() => {
  eventBus.on('global-hotkeys-intro-toggle', () => {
    isShow.value = !isShow.value
  })
})
</script>

<template>
  <div>
    <ElDrawer v-model="isShow" title="快捷键介绍" direction="rtl" :size="360">
      <ElDescriptions title="全局" :column="1" border>
        <ElDescriptionsItem label="查看系统信息">
          Alt + I
        </ElDescriptionsItem>
        <ElDescriptionsItem v-if="settingsStore.settings.navSearch.enable && settingsStore.settings.navSearch.enableHotkeys" label="唤起导航搜索">
          Alt + S
        </ElDescriptionsItem>
      </ElDescriptions>
      <ElDescriptions v-if="settingsStore.settings.menu.enableHotkeys && ['side', 'head'].includes(settingsStore.settings.menu.menuMode)" title="主导航" :column="1" border>
        <ElDescriptionsItem label="激活下一个主导航">
          Alt + `
        </ElDescriptionsItem>
      </ElDescriptions>
      <ElDescriptions v-if="settingsStore.settings.window.enableHotkeys" title="窗口" :column="1" border>
        <ElDescriptionsItem label="唤起多窗口预览">
          Alt + W
        </ElDescriptionsItem>
      </ElDescriptions>
    </ElDrawer>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-drawer__header) {
  margin-bottom: initial;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--el-border-color);
  transition: var(--el-transition-border);
}

:deep(.el-descriptions) {
  margin-bottom: 20px;

  .el-descriptions__label {
    width: 200px;
  }
}
</style>
