<template>
    <div
        :class="{
            'page-main': true,
            'is-collaspe': collaspeData
        }" :style="{
            'height': collaspeData ? height : ''
        }"
    >
        <div v-if="title" class="title-container">{{ title }}</div>
        <slot />
        <div v-if="collaspeData" class="collaspe" title="展开" @click="unCollaspe">
            <el-icon>
                <svg-icon name="ep:arrow-down" />
            </el-icon>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    collaspe: {
        type: Boolean,
        default: false
    },
    height: {
        type: String,
        default: ''
    }
})

const collaspeData = ref(props.collaspe)

function unCollaspe() {
    collaspeData.value = false
}
</script>

<style lang="scss" scoped>
$padding: 10px;
.page-main {
    position: relative;
    padding: $padding;
    margin-bottom: 20px;
    background-color: var(--g-app-bg);
    transition: background-color 0.3s;
    &.is-collaspe {
        overflow: hidden;
        .collaspe {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            padding: 40px 0 10px;
            text-align: center;
            font-size: 24px;
            color: var(--el-text-color-primary);
            text-shadow: 0 0 1px var(--el-text-color-primary);
            background: linear-gradient(to bottom, transparent, var(--g-app-bg));
            transition: background 0.3s, var(--el-transition-color);
            cursor: pointer;
            &:hover {
                color: #333;
            }
        }
    }
    .title-container {
        width: calc(100% + calc(($padding + var(--g-window-container-padding)) * 2));
        padding: 14px calc($padding + var(--g-window-container-padding));
        margin-left: calc(($padding + var(--g-window-container-padding)) * -1);
        margin-top: calc(($padding + var(--g-window-container-padding)) * -1);
        margin-bottom: 20px;
        border-bottom: 1px solid var(--el-border-color-lighter);
        transition: var(--el-transition-border);
    }
}
</style>
