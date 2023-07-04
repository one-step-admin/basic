<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineOptions({
  name: 'SvgIcon',
})

const props = withDefaults(
  defineProps<{
    name: string
    flip?: 'horizontal' | 'vertical' | 'both' | ''
    rotate?: number
  }>(),
  {
    flip: '',
    rotate: 0,
  },
)

const transformStyle = computed(() => {
  const style = []
  if (props.flip !== '') {
    switch (props.flip) {
      case 'horizontal':
        style.push('rotateY(180deg)')
        break
      case 'vertical':
        style.push('rotateX(180deg)')
        break
      case 'both':
        style.push('rotateX(180deg)')
        style.push('rotateY(180deg)')
        break
    }
  }
  if (props.rotate !== 0) {
    style.push(`rotate(${props.rotate}deg)`)
  }
  return `transform: ${style.join(' ')};`
})
</script>

<template>
  <Icon v-if="name.indexOf('ep:') === 0" :icon="name" :style="transformStyle" />
  <svg v-else :style="transformStyle" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>
