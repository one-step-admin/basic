<script setup lang="ts">
import eventBus from '@/utils/eventBus'

const isShow = ref(false)

const { pkg, lastBuildTime } = __SYSTEM_INFO__

onMounted(() => {
  eventBus.on('global-system-info-toggle', () => {
    isShow.value = !isShow.value
  })
})
</script>

<template>
  <div>
    <ElDrawer v-model="isShow" title="系统信息" direction="rtl" :size="360">
      <ElDescriptions direction="vertical" :column="1" border>
        <ElDescriptionsItem label="版本号" align="center">
          {{ pkg.version }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="最后编译时间" align="center">
          {{ lastBuildTime }}
        </ElDescriptionsItem>
      </ElDescriptions>
      <ElDescriptions title="生产环境依赖" :column="1" size="small" border>
        <ElDescriptionsItem v-for="(val, key) in (pkg.dependencies as object)" :key="key" :label="key">
          {{ val }}
        </ElDescriptionsItem>
      </ElDescriptions>
      <ElDescriptions title="开发环境依赖" :column="1" size="small" border>
        <ElDescriptionsItem v-for="(val, key) in (pkg.devDependencies as object)" :key="key" :label="key">
          {{ val }}
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
}
</style>
