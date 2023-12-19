<script setup lang="ts">
defineProps<{
  params: object
}>()
</script>

<template>
  <PageMain>
    Params: {{ params }}
  </PageMain>
</template>
