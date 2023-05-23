<script setup lang="ts">
defineProps({
  params: {
    type: Object,
  },
})
</script>

<template>
  <div>
    Params: {{ params }}
  </div>
</template>
