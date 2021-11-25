<template>
    <div class="empty-container">
        <page-header title="欢迎使用 One-step-admin（基础版）" class="header">
            <template #content>
                <div>
                    <div style="margin-bottom: 5px;">这是一款具备<b class="text-emphasis">全新交互方式</b>的中后台框架，为了<b>提高使用人员的操作效率</b>与<b>减轻开发人员的开发成本</b>而生。</div>
                    <div>如果你需要的是通用的中后台框架，可以了解下 <a :href="`https://hooray.${locationOrigin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin`" target="_blank">Fantastic-admin</a> ，它同样是一款非常优秀的中后台框架。</div>
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
