<template>
    <div>
        Params: {{ params }}
    </div>
</template>

<script setup>
defineProps({
    params: {
        type: Object
    }
})
</script>
