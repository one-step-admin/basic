<script setup lang="ts">
function open(url: string) {
  window.open(url, 'top')
}
</script>

<template>
  <div class="empty-container">
    <page-header title="欢迎使用 One-step-admin（基础版）" class="header">
      <template #content>
        <div>
          <div style="margin-bottom: 5px;">
            这是一款<b class="text-emphasis">干啥都快人一步</b>的中后台框架，它拥有<b>全新的交互方式</b>，只为<b>提升操作效率</b>而生。
          </div>
          <div>如果你只是需要一款通用的中后台框架，可以了解下 <a href="https://fantastic-admin.gitee.io" target="_blank">Fantastic-admin</a> ，它同样是一款非常优秀且开箱即用的中后台框架。</div>
        </div>
      </template>
      <el-button-group style="margin-right: 10px;">
        <el-button type="success" size="large" plain @click="open('https://one-step-admin.gitee.io')">
          开发文档
        </el-button>
        <el-dropdown>
          <el-button type="primary" size="large">
            代码仓库
            <el-icon class="el-icon--right">
              <svg-icon name="ep:arrow-down" />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="open('https://gitee.com/one-step-admin/basic')">
                Gitee
              </el-dropdown-item>
              <el-dropdown-item @click="open('https://github.com/one-step-admin/basic')">
                Github
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-button-group>
    </page-header>
  </div>
</template>

<style lang="scss" scoped>
.empty-container {
  height: 100%;
  overflow: auto;

  .header {
    margin: 0 0 20px;

    .text-emphasis {
      text-emphasis-style: "❤";
    }

    a {
      color: inherit;
      text-decoration: none;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
    }
  }
}
</style>
