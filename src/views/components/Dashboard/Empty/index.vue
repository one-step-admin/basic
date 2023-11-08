<script setup lang="ts">
const versionType = ref('basic')
function handelVersionTypeChange(val?: string | number) {
  if (val === 'pro') {
    location.href = location.href.replace('basic-example', 'pro-example')
  }
}

const fantasticStartkitInfo = ref({
  feature: [
    '支持 TypeScript',
    '默认集成 vue-router 和 pinia',
    '支持基于文件系统的路由',
    '全局组件自动引入',
    '全局 SCSS 资源引入',
    '支持 Unocss',
    '支持 SVG 文件图标、Iconify 图标、UnoCSS 图标',
    '支持 mock 数据，可脱离后端束缚独立开发',
    '支持 gzip / brotli 优化项目体积，提高加载速度',
    '结合 IDE 插件、ESlint 、stylelint 、Git 钩子，轻松实现团队代码规范',
  ],
})

const fantasticAdminInfo = ref({
  imageVisible: false,
  index: 0,
  data: [
    'https://fantastic-admin.gitee.io/preview1.png',
    'https://fantastic-admin.gitee.io/preview2.png',
    'https://fantastic-admin.gitee.io/preview3.png',
    'https://fantastic-admin.gitee.io/preview4.png',
    'https://fantastic-admin.gitee.io/preview5.png',
    'https://fantastic-admin.gitee.io/preview6.png',
  ],
})

const oneStepAdminInfo = ref({
  imageVisible: false,
  index: 0,
  data: [
    'https://one-step-admin.gitee.io/preview1.png',
    'https://one-step-admin.gitee.io/preview2.png',
    'https://one-step-admin.gitee.io/preview3.png',
    'https://one-step-admin.gitee.io/preview4.png',
    'https://one-step-admin.gitee.io/preview5.png',
    'https://one-step-admin.gitee.io/preview6.png',
  ],
})

function open(url: string) {
  window.open(url, 'top')
}
</script>

<template>
  <div class="empty-container">
    <PageHeader title="欢迎使用 One-step-admin">
      <template #title>
        <div class="flex items-center gap-4">
          欢迎使用 One-step-admin
          <HTabList
            v-model="versionType"
            :options="[
              { label: '基础版', value: 'basic' },
              { label: '专业版', value: 'pro' },
            ]" @change="handelVersionTypeChange"
          />
        </div>
      </template>
      <template #content>
        <div class="text-sm/6">
          <div>
            这是一款<b class="text-emphasis">干啥都快人一步</b>的中后台框架，它拥有<b>全新的交互方式</b>，只为<b>提升操作效率</b>而生。
          </div>
          <div class="op-70">
            如果你只是需要一款通用的中后台框架，可以了解下 <a href="https://fantastic-admin.gitee.io" target="_blank" class="no-underline border-b-(~ dashed blue) text-blue">Fantastic-admin</a> ，它同样是一款非常优秀且开箱即用的中后台框架。
          </div>
        </div>
      </template>
      <ElButtonGroup style="margin-right: 10px;">
        <ElButton type="success" size="large" plain @click="open('https://one-step-admin.gitee.io')">
          <template #icon>
            <ElIcon>
              <SvgIcon name="i-ri:file-text-line" />
            </ElIcon>
          </template>
          开发文档
        </ElButton>
        <ElDropdown>
          <ElButton type="primary" size="large">
            <template #icon>
              <ElIcon>
                <SvgIcon name="i-ri:code-s-slash-line" />
              </ElIcon>
            </template>
            代码仓库
            <ElIcon class="el-icon--right">
              <SvgIcon name="ep:arrow-down" />
            </ElIcon>
          </ElButton>
          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem @click="open('https://gitee.com/one-step-admin/basic')">
                Gitee
              </ElDropdownItem>
              <ElDropdownItem @click="open('https://github.com/one-step-admin/basic')">
                Github
              </ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </ElDropdown>
      </ElButtonGroup>
    </PageHeader>
    <div class="w-full flex flex-col xl:flex-row gap-[20px] px-[20px]">
      <PageMain class="ecology">
        <template #title>
          <div class="title-info">
            <img src="https://cn.vuejs.org/logo.svg">
            <div>
              <h1 class="c-[#41b883]">
                Fantastic-startkit
              </h1>
              <h2>一款简单好用的 Vue3 项目启动套件</h2>
            </div>
          </div>
          <ElDropdown split-button type="primary" @click="open('https://hooray.gitee.io/fantastic-startkit/')">
            访问官网
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem @click="open('https://hooray.github.io/fantastic-startkit/')">
                  备用地址
                </ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
        </template>
        <ul class="m-0 pr-8 text-size-sm leading-6">
          <li v-for="item in fantasticStartkitInfo.feature" :key="item">
            {{ item }}
          </li>
        </ul>
      </PageMain>
      <PageMain class="ecology">
        <template #title>
          <div class="title-info">
            <img src="https://fantastic-admin.gitee.io/logo.png">
            <div>
              <h1 class="c-[#e60000]">
                Fantastic-admin
              </h1>
              <h2>一款开箱即用的 Vue 中后台管理系统框架</h2>
            </div>
          </div>
          <ElDropdown split-button type="primary" @click="open('https://fantastic-admin.gitee.io')">
            访问官网
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem @click="open('https://fantastic-admin.github.io')">
                  备用地址
                </ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
        </template>
        <ElCarousel trigger="click" indicator-position="none" :interval="5000" height="250px">
          <ElCarouselItem v-for="(item, index) in fantasticAdminInfo.data" :key="item">
            <ElImage :src="item" fit="cover" style="cursor: pointer; width: 100%; height: 250px; margin: auto;" @click="fantasticAdminInfo.imageVisible = true; fantasticAdminInfo.index = index" />
          </ElCarouselItem>
        </ElCarousel>
        <ElImageViewer v-if="fantasticAdminInfo.imageVisible" :url-list="fantasticAdminInfo.data" :initial-index="fantasticAdminInfo.index" @close="fantasticAdminInfo.imageVisible = false" />
      </PageMain>
      <PageMain class="ecology">
        <template #title>
          <div class="title-info">
            <img src="https://one-step-admin.gitee.io/logo.png">
            <div>
              <h1 class="c-[#67c23a]">
                One-step-admin
              </h1>
              <h2>一款干啥都快人一步的 Vue 中后台系统框架</h2>
            </div>
          </div>
          <ElDropdown split-button type="primary" @click="open('https://one-step-admin.gitee.io')">
            访问官网
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem @click="open('https://one-step-admin.github.io')">
                  备用地址
                </ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
        </template>
        <ElCarousel trigger="click" indicator-position="none" :interval="5000" height="250px">
          <ElCarouselItem v-for="(item, index) in oneStepAdminInfo.data" :key="item">
            <ElImage :src="item" fit="cover" style="cursor: pointer; width: 100%; height: 250px; margin: auto;" @click="oneStepAdminInfo.imageVisible = true; oneStepAdminInfo.index = index" />
          </ElCarouselItem>
        </ElCarousel>
        <ElImageViewer v-if="oneStepAdminInfo.imageVisible" :url-list="oneStepAdminInfo.data" :initial-index="oneStepAdminInfo.index" @close="oneStepAdminInfo.imageVisible = false" />
      </PageMain>
    </div>
    <PageMain title="应用场景">
      <div class="question">
        <ol class="answer">
          <li><span>没有前端开发人员的小型公司。</span>据了解，有些小型公司没有前端开发人员，而这些公司在开发中后台系统的时候，直接要求后端开发人员来进行开发工作。所以借助 Vue 的易学习易上手特性，再加上本框架的加持，可以让后端开发人员能在短时间内转型成为全栈开发。</li>
          <li><span>前端开发人员不足的中小型公司。</span>根据招聘网站统计，几乎所有公司都缺前端，其中有很大一部分中小型公司标配只有1-2名前端开发人员，而这些公司在开发中后台系统的时候，如果能有一套现成的中后台框架系统，不仅能提高项目开发效率，同时还大大减轻前端开发人员工作压力。</li>
          <li><span>项目型公司。</span>特点为项目多，周期短，甲方对页面布局和主题风格有绝对话语权，而通过专业版提供的布局和主题风格，可应对绝大部分甲方需求，并且可自定义扩展主题风格的样式，实现高度定制化。</li>
          <li><span>产品型公司。</span>产品型公司最担心的就是产品开发中代码不可控的因素，本框架除了提供完善的开发文档和代码注释外，作者还提供一对一的技术支持，确保开发人员尽可能理解整套框架源码的方方面面，为产品保驾护航。</li>
          <li><span>个人开发者。</span>手里有一套可高度定制化的中后台框架，什么项目都不用担心啦~</li>
        </ol>
      </div>
    </PageMain>
    <PageMain title="优势">
      <div class="question">
        <ol class="answer">
          <li><span>作者拥有10年+的前后端开发经验。</span>部分框架的作者由于缺少后端开发经验，可能会在设计框架的时候，很少或者没有考虑后端的实现逻辑，导致框架在实际使用中，业务场景无法落地，开发人员得通过修改源码自行实现业务。</li>
          <li><span>丰富的组件库。</span>除了支持 Element Plus 自带的组件外，框架还扩充了部分业务组件，以及第三方插件。借助以往的项目经验，提供最佳实践方案，方便开发人员直接使用。</li>
          <li><span>持续更新的业务应用静态页面。</span>通过项目积累，沉淀出数十个业务应用的静态页面，做到开发人员拿来即可使用，极大提升开发效率的同时，还省去了产品和设计人员的工作。</li>
          <li><span>长期维护。</span>无论是免费的基础版，还是付费的专业版，均提供长期维护。区别在于基础版侧重于稳定性维护，主要在修复 bug ，不定期增加新特性；专业版侧重于新特性开发，在确保稳定的基础上，会长期深挖中后台系统框架，持续产出可落地的特性或开发规范。</li>
        </ol>
      </div>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
.empty-container {
  height: 100%;
  overflow: auto;

  .text-emphasis {
    text-emphasis-style: "❤";
  }

  .page-main {
    --at-apply: m-5 shadow;
  }

  .ecology {
    --at-apply: flex-1 m-0;

    :deep(.title-container) {
      --at-apply: flex items-center justify-between flex-wrap gap-4;

      .title-info {
        --at-apply: flex items-center gap-4;

        img {
          --at-apply: block w-12 h-12;
        }

        h1 {
          --at-apply: m-0 text-2xl;
        }

        h2 {
          --at-apply: m-0 text-base text-stone-5 font-normal;
        }
      }
    }
  }

  .question {
    .answer {
      --at-apply: m-0 pl-6 text-stone-5;

      li {
        --at-apply: mb-2 lh-6 last:mb-0;
      }

      span {
        --at-apply: text-stone-7 dark:text-stone-3 font-bold;
      }
    }
  }
}
</style>
