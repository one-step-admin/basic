<script setup lang="ts">
const props = defineProps<{
  value: string | number | boolean
}>()

const show = computed(() => {
  switch (typeof props.value) {
    case 'string':
      return props.value.length > 0
    case 'number':
      return props.value > 0
    case 'boolean':
      return props.value
    default:
      return props.value !== undefined && props.value !== null
  }
})

const transitionClass = ref({
  enterActiveClass: 'ease-in-out duration-500',
  enterFromClass: 'opacity-0',
  enterToClass: 'opacity-100',
  leaveActiveClass: 'ease-in-out duration-500',
  leaveFromClass: 'opacity-100',
  leaveToClass: 'opacity-0',
})
</script>

<template>
  <div class="relative inline-flex">
    <slot />
    <Transition v-bind="transitionClass">
      <span
        v-if="show"
        class="absolute top-0 left-[50%] z-20 -translate-y-[50%] whitespace-nowrap bg-ui-primary text-ui-text ring-1 ring-light dark:ring-dark px-1.5 text-xs rounded-full"
        :class="{ '-indent-9999 w-1.5 h-1.5 px-0! left-[100%]! -translate-x-[50%] before:(content-empty block bg-ui-primary w-full h-full rounded-full absolute left-0 top-0 animate-ping)': value === true }"
      >
        {{ value }}
      </span>
    </Transition>
  </div>
</template>
