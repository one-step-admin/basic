<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()

const formRef = ref<FormInstance>()
const form = ref({
  password: '',
  newpassword: '',
  checkpassword: '',
})

const rules = ref<FormRules>({
  password: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
  ],
  newpassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
  checkpassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value !== form.value.newpassword) {
          callback(new Error('请确认新密码'))
        }
        else {
          callback()
        }
      },
    },
  ],
})

function onSubmit() {
  formRef.value && formRef.value.validate((valid) => {
    if (valid) {
      userStore.editPassword(form.value).then(() => {
        ElMessage({
          type: 'success',
          message: '模拟修改成功，请重新登录',
        })
        userStore.logout().then(() => {
          router.push({
            name: 'login',
            query: {
              redirect: route.fullPath,
            },
          })
        })
      }).catch(() => {})
    }
  })
}
</script>

<template>
  <div>
    <ActionContainer>
      <PageHeader title="修改密码" content="定期修改密码可以提高帐号安全性噢~" />
      <ElRow>
        <ElCol :md="24" :lg="12">
          <ElForm ref="formRef" :model="form" :rules="rules" label-width="120px">
            <ElFormItem label="原密码" prop="password">
              <ElInput v-model="form.password" type="password" placeholder="请输入原密码" />
            </ElFormItem>
            <ElFormItem label="新密码" prop="newpassword">
              <ElInput v-model="form.newpassword" type="password" placeholder="请输入原密码" />
            </ElFormItem>
            <ElFormItem label="确认新密码" prop="checkpassword">
              <ElInput v-model="form.checkpassword" type="password" placeholder="请输入原密码" />
            </ElFormItem>
          </ElForm>
        </ElCol>
      </ElRow>
      <template #action>
        <ElButton type="primary" size="small" @click="onSubmit">
          提交
        </ElButton>
      </template>
    </ActionContainer>
  </div>
</template>
