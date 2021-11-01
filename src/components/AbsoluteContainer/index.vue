<template>
    <div class="absolute-container">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.absolute-container {
    position: absolute;
    width: calc(100% - 20px);
    height: 100%;
}
</style>
