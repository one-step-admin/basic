<script setup lang="ts">
defineProps<{
  params: object
}>()
</script>

<template>
  <div>
    Params: {{ params }}
  </div>
</template>
