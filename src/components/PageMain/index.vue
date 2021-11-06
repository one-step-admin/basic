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
            <el-icon><el-icon-arrow-down /></el-icon>
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
            color: #ccc;
            text-shadow: 0 0 1px #fff;
            background: linear-gradient(to bottom, transparent, #fff);
            cursor: pointer;
            transition: 0.3s;
            &:hover {
                color: #333;
            }
        }
    }
    .title-container {
        width: calc(100% + calc(($padding + $g-window-container-padding) * 2));
        padding: 14px calc($padding + $g-window-container-padding);
        margin-left: calc(($padding + $g-window-container-padding) * -1);
        margin-top: calc(($padding + $g-window-container-padding) * -1);
        margin-bottom: 20px;
        border-bottom: 1px solid #eee;
    }
}
</style>
