<template>
    <div class="title" :title="title">
        <img v-if="showLogo" :src="logo" class="logo">
        <span v-if="showTitle">{{ title }}</span>
    </div>
</template>

<script setup name="Logo">
import imgLogo from '@/assets/images/logo.png'

defineProps({
    showLogo: {
        type: Boolean,
        default: true
    },
    showTitle: {
        type: Boolean,
        default: true
    }
})

const title = ref(import.meta.env.VITE_APP_TITLE)
const logo = ref(imgLogo)
</script>

<style lang="scss" scoped>
.title {
    position: fixed;
    z-index: 1000;
    top: 0;
    width: inherit;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: $g-sidebar-logo-height;
    text-align: center;
    overflow: hidden;
    text-decoration: none;
    .logo {
        width: 30px;
        height: 30px;
        & + span {
            margin-left: 10px;
        }
    }
    span {
        display: block;
        font-weight: bold;
        color: #fff;
        @include text-overflow;
    }
}
</style>
