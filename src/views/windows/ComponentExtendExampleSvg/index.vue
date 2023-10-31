<script setup lang="ts">
const flip = ref<'horizontal' | 'vertical' | 'both' | ''>('')
const rotate = ref(0)
</script>

<template>
  <div>
    <PageHeader title="SVG Icon" content="除了使用 Element Plus 提供的图标外，你还可以使用自己的 SVG 图标" />
    <PageMain>
      <p>单色 SVG Icon</p>
      <ElIcon class="example-icon">
        <SvgIcon name="example-emotion-line" :flip="flip" :rotate="rotate" />
      </ElIcon>
      <ElIcon class="example-icon">
        <SvgIcon name="example-emotion-laugh-line" :flip="flip" :rotate="rotate" />
      </ElIcon>
      <ElIcon class="example-icon">
        <SvgIcon name="example-emotion-unhappy-line" :flip="flip" :rotate="rotate" />
      </ElIcon>
      <p>彩色 SVG Icon</p>
      <ElIcon class="example-icon">
        <SvgIcon name="example-crown" :flip="flip" :rotate="rotate" />
      </ElIcon>
      <ElIcon class="example-icon">
        <SvgIcon name="example-star" :flip="flip" :rotate="rotate" />
      </ElIcon>
      <ElIcon class="example-icon">
        <SvgIcon name="example-vip" :flip="flip" :rotate="rotate" />
      </ElIcon>
      <div>
        <p>翻转：</p>
        <ElRadioGroup v-model="flip">
          <ElRadioButton label="">
            无
          </ElRadioButton>
          <ElRadioButton label="horizontal">
            水平翻转
          </ElRadioButton>
          <ElRadioButton label="vertical">
            垂直翻转
          </ElRadioButton>
          <ElRadioButton label="both">
            水平垂直翻转
          </ElRadioButton>
        </ElRadioGroup>
        <p>旋转：</p>
        <ElSlider v-model="rotate" :min="0" :max="360" style="width: 50%;" />
      </div>
      <p>使用方法：</p>
      <ol>
        <li>上 <a href="https://www.iconfont.cn/" target="_blank">Iconfont</a> 下载需要的 svg 图标</li>
        <li>将 svg 文件放入 ./src/assets/icons 目录下，文件名即为 name</li>
      </ol>
    </PageMain>
  </div>
</template>

<style scoped>
.example-icon {
  font-size: 48px;
}
</style>
