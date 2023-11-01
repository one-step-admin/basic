<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineOptions({
  name: 'SvgIcon',
})

const props = withDefaults(
  defineProps<{
    name: string
    runtime?: boolean
    flip?: 'horizontal' | 'vertical' | 'both' | ''
    rotate?: number
  }>(),
  {
    runtime: false,
    flip: '',
    rotate: 0,
  },
)

const outputType = computed(() => {
  if (props.name.indexOf('i-') === 0) {
    return props.runtime ? 'svg' : 'css'
  }
  else if (props.name.includes(':')) {
    return 'svg'
  }
  else {
    return 'custom'
  }
})

const outputName = computed(() => {
  if (props.name.indexOf('i-') === 0) {
    let conversionName = props.name
    if (props.runtime) {
      conversionName = conversionName.replace('i-', '')
    }
    return conversionName
  }
  else {
    return props.name
  }
})

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
    style.push(`rotate(${props.rotate % 360}deg)`)
  }
  return `transform: ${style.join(' ')};`
})
</script>

<template>
  <i v-if="outputType === 'css'" :class="outputName" :style="transformStyle" />
  <Icon v-else-if="outputType === 'svg'" :icon="outputName" :style="transformStyle" />
  <svg v-else :style="transformStyle" aria-hidden="true">
    <use :xlink:href="`#icon-${outputName}`" />
  </svg>
</template>
