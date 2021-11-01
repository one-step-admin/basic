<template>
    <div class="action-container">
        <div class="container">
            <el-scrollbar>
                <slot />
            </el-scrollbar>
        </div>
        <div v-if="$slots.action" class="action-bar">
            <slot name="action" />
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.action-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .container {
        flex: 1;
        overflow: hidden;
    }
    .action-bar {
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        background-color: #f9f9f9;
        border-top: 1px solid #eee;
    }
}
</style>
