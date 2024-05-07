<template>
  <div>
    <PageHeader title="图片预览" content="ImagePreview" />
    <PageMain>
      <div>
        <ImagePreview src="https://one-step-admin.github.io/logo.png" :width="200" />
      </div>
    </PageMain>
    <PageMain title="图片加载失败时">
      <div>
        <ImagePreview src="http://www.baidu.com" width="100px" height="100px" />
      </div>
    </PageMain>
  </div>
</template>
