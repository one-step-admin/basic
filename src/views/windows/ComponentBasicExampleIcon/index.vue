<template>
    <div>
        <ComponentBasicExampleAlert />
        <page-main class="demo">
            <el-icon><el-icon-edit /></el-icon>
            <el-icon><el-icon-share /></el-icon>
            <el-icon><el-icon-delete /></el-icon>
            <el-button type="primary" :icon="Search">
                搜索
            </el-button>
        </page-main>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
</script>

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
</style>
