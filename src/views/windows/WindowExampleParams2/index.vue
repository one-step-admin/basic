<script lang="ts" setup>
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
