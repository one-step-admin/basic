<template>
    <div>
        <ComponentBasicExampleAlert />
        <page-main title="基础用法" class="demo">
            <el-rate v-model="value1" />
        </page-main>
        <page-main title="辅助文字" class="demo">
            <el-rate v-model="value2" show-text :texts="['极差', '差', '一般', '好', '极好']" />
        </page-main>
        <page-main title="只读" class="demo">
            <el-rate v-model="value3" disabled show-score text-color="#ff9900" score-template="{value}" />
        </page-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value1: null,
            value2: null,
            value3: 3.7
        }
    }
}
</script>
