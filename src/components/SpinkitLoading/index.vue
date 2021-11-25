<template>
    <transition name="spinkit-transition">
        <div class="spinkit-container">
            <div class="spinkit" :style="{'--sk-size': `${size}px`, '--sk-color': color}">
                <div v-if="type == 'plane'" class="sk-plane" />
                <div v-if="type == 'chase'" class="sk-chase">
                    <div class="sk-chase-dot" />
                    <div class="sk-chase-dot" />
                    <div class="sk-chase-dot" />
                    <div class="sk-chase-dot" />
                    <div class="sk-chase-dot" />
                    <div class="sk-chase-dot" />
                </div>
                <div v-if="type == 'bounce'" class="sk-bounce">
                    <div class="sk-bounce-dot" />
                    <div class="sk-bounce-dot" />
                </div>
                <div v-if="type == 'wave'" class="sk-wave">
                    <div class="sk-wave-rect" />
                    <div class="sk-wave-rect" />
                    <div class="sk-wave-rect" />
                    <div class="sk-wave-rect" />
                    <div class="sk-wave-rect" />
                </div>
                <div v-if="type == 'pulse'" class="sk-pulse" />
                <div v-if="type == 'flow'" class="sk-flow">
                    <div class="sk-flow-dot" />
                    <div class="sk-flow-dot" />
                    <div class="sk-flow-dot" />
                </div>
                <div v-if="type == 'swing'" class="sk-swing">
                    <div class="sk-swing-dot" />
                    <div class="sk-swing-dot" />
                </div>
                <div v-if="type == 'circle'" class="sk-circle">
                    <div class="sk-circle-dot" />
                    <div class="sk-circle-dot" />
                    <div class="sk-circle-dot" />
                    <div class="sk-circle-dot" />
                    <div class="sk-circle-dot" />
                    <div class="sk-circle-dot" />
                    <div class="sk-circle-dot" />
                    <div class="sk-circle-dot" />
                    <div class="sk-circle-dot" />
                    <div class="sk-circle-dot" />
                    <div class="sk-circle-dot" />
                    <div class="sk-circle-dot" />
                </div>
                <div v-if="type == 'circle-fade'" class="sk-circle-fade">
                    <div class="sk-circle-fade-dot" />
                    <div class="sk-circle-fade-dot" />
                    <div class="sk-circle-fade-dot" />
                    <div class="sk-circle-fade-dot" />
                    <div class="sk-circle-fade-dot" />
                    <div class="sk-circle-fade-dot" />
                    <div class="sk-circle-fade-dot" />
                    <div class="sk-circle-fade-dot" />
                    <div class="sk-circle-fade-dot" />
                    <div class="sk-circle-fade-dot" />
                    <div class="sk-circle-fade-dot" />
                    <div class="sk-circle-fade-dot" />
                </div>
                <div v-if="type == 'grid'" class="sk-grid">
                    <div class="sk-grid-cube" />
                    <div class="sk-grid-cube" />
                    <div class="sk-grid-cube" />
                    <div class="sk-grid-cube" />
                    <div class="sk-grid-cube" />
                    <div class="sk-grid-cube" />
                    <div class="sk-grid-cube" />
                    <div class="sk-grid-cube" />
                    <div class="sk-grid-cube" />
                </div>
                <div v-if="type == 'fold'" class="sk-fold">
                    <div class="sk-fold-cube" />
                    <div class="sk-fold-cube" />
                    <div class="sk-fold-cube" />
                    <div class="sk-fold-cube" />
                </div>
                <div v-if="type == 'wander'" class="sk-wander">
                    <div class="sk-wander-cube" />
                    <div class="sk-wander-cube" />
                    <div class="sk-wander-cube" />
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import 'spinkit/spinkit.min.css'

defineProps({
    type: {
        type: String,
        default: 'plane'
    },
    size: {
        type: Number,
        default: 50
    },
    color: {
        type: String,
        default: '#fff'
    }
})
</script>

<style lang="scss" scoped>
.spinkit-container {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 2001;
    background-color: rgb(0 0 0 / 70%);
}
.spinkit {
    @include position-center(xy);
}
.spinkit-transition-leave-active,
.spinkit-transition-enter-active {
    transition: all 0.3s;
}
.spinkit-transition-enter,
.spinkit-transition-leave-to {
    opacity: 0;
}
</style>
