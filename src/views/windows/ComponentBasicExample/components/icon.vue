<script setup lang="ts">
import { icons } from '@iconify-json/ep'
</script>

<template>
  <div>
    <div class="demo">
      <ElIcon><SvgIcon name="ep:edit" /></ElIcon>
      <ElIcon><SvgIcon name="ep:share" /></ElIcon>
      <ElIcon><SvgIcon name="ep:delete" /></ElIcon>
      <ElButton type="primary">
        <template #icon>
          <ElIcon>
            <SvgIcon name="ep:search" />
          </ElIcon>
        </template>
        搜索
      </ElButton>
    </div>
    <ElDivider content-position="left">
      图标集合
    </ElDivider>
    <div v-for="(item, index) in icons.icons" :key="index" class="list-icon">
      <ElTooltip class="item" effect="dark" :content="`ep:${index}`" placement="top">
        <ElIcon>
          <SvgIcon :name="`ep:${index}`" />
        </ElIcon>
      </ElTooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  > .el-icon {
    color: #606266;
    margin: 0 20px;
    font-size: 1.5em;
    vertical-align: middle;
  }

  button {
    margin: 0 20px;
  }
}

.list-icon {
  display: inline-block;
  margin: 10px;

  .el-icon {
    font-size: 32px;
    color: #606266;
  }
}
</style>
