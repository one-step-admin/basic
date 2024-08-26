<script setup lang="ts">
import Copyright from '@/views/components/Copyright/index.vue'

defineOptions({
  name: 'Login',
})

const route = useRoute()
const router = useRouter()

const redirect = ref(route.query.redirect?.toString() ?? '/')
const account = ref<string>()
// 表单类型
const formType = ref<'login' | 'register' | 'resetPassword'>('login')
const formRef = ref()
</script>

<template>
  <div class="bg-banner" />
  <div class="login-box">
    <div class="login-banner">
      <img src="@/assets/images/logo.png" class="absolute left-4 top-4 h-30px rounded ring ring-stone-2 dark-ring-stone-8">
      <img src="@/assets/images/login-banner.png" class="banner">
    </div>
    <div class="login-form flex-col-center">
      <Transition name="fade" mode="out-in">
        <LoginForm
          v-if="formType === 'login'"
          ref="formRef"
          :account
          @on-login="router.push(redirect)"
          @on-register="(account) => { formType = 'register'; account = account }"
          @on-reset-password="(account) => { formType = 'resetPassword'; account = account }"
        />
        <RegisterForm
          v-else-if="formType === 'register'"
          ref="formRef"
          :account
          @on-register="(account) => { formType = 'login'; account = account }"
          @on-login="formType = 'login'"
        />
        <ResetPasswordForm
          v-else-if="formType === 'resetPassword'"
          ref="formRef"
          :account
          @on-reset-password="(account) => { formType = 'login'; account = account }"
          @on-login="formType = 'login'"
        />
      </Transition>
    </div>
  </div>
  <Copyright />
</template>

<style scoped>
.bg-banner {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, var(--g-app-bg), var(--g-main-bg));
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  overflow: hidden;
  background-color: var(--g-app-bg);
  border-radius: 10px;
  box-shadow: var(--el-box-shadow);
  transform: translateX(-50%) translateY(-50%);

  .login-banner {
    position: relative;
    width: 450px;
    overflow: hidden;
    background-color: var(--g-main-bg);

    .banner {
      position: absolute;
      top: 50%;
      width: 100%;
      transform: translateY(-50%);
    }
  }

  .login-form {
    width: 500px;
    transition: height 0.15s ease;
  }
}

.copyright {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
