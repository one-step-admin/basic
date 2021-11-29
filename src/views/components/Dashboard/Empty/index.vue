<template>
    <div class="empty-container">
        <page-header title="欢迎使用 One-step-admin（基础版）" class="header">
            <template #content>
                <div>
                    <div style="margin-bottom: 5px;">这是一款<b class="text-emphasis">干啥都快人一步</b>的中后台框架，它拥有<b>全新的交互方式</b>，只为<b>提升操作效率</b>而生。</div>
                    <div>如果你只是需要一款通用的中后台框架，可以了解下 <a :href="`https://hooray.${locationOrigin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin`" target="_blank">Fantastic-admin</a> ，它同样是一款非常优秀且开箱即用的中后台框架。</div>
                </div>
            </template>
        </page-header>
    </div>
</template>

<script setup>
const locationOrigin = ref(location.href)
</script>

<style lang="scss" scoped>
.empty-container {
    height: 100%;
    overflow: auto;
    .header {
        margin: 0;
        .text-emphasis {
            /* stylelint-disable-next-line property-no-vendor-prefix */
            -webkit-text-emphasis-style: "❤";
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
