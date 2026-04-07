<script lang='ts'>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { setIsLogin } from '@/utils/login'
import { login } from '@/api'

export default {
  setup() {
    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const loading = ref(false)

    const submitLogin = () => {
      loading.value = true;
      // 判断用户名和密码是否为空
      if (!username.value || !password.value) {
        loading.value = false
        ElMessage({
          message: '用户名和密码不能为空',
          type: 'warning',
        })
        return;
      }
      // 判断用户名和密码是否正确
      login({ username: username.value, password: password.value }).then(res => {
        loading.value = false
        if (res === '登录失败') {
          ElMessage({
            message: '用户名或密码错误',
            type: 'error',
          })
          return
        }
        else if (res === '用户不存在') {
          ElMessage({
            message: '用户不存在',
            type: 'error',
          })
          return
        }
        // 登录成功，暂定将用户信息存储到localStorage
        localStorage.setItem('username', username.value)
        localStorage.setItem('userId', res.slice(0, -1))
        ElMessage({
          message: '登录成功',
          type: 'success',
        })
        setTimeout(() => {
          loading.value = false
          router.push('/home')
        }, 1000)
      })
    }

    const goHome = () => {
      router.push('/home')
    }

    return {
      User,
      Lock,
      username,
      password,
      loading,
      submitLogin,
      setIsLogin,
      goHome
    }
  }
}

</script>
<template>
  <div class="login">
    <el-input class="input" v-model="username" placeholder="用户名" :prefix-icon="User" autofocus size="large" />
    <el-input class="input" v-model="password" type="password" placeholder="密码" :prefix-icon="Lock" show-password
      size="large" @keyup.enter.native="submitLogin" />
    <div class="button">
      <div>
        <span>返回</span>
        <el-button type="primary" link @click="goHome" style="margin-top: -1px;">首页</el-button>
      </div>
      <el-button type="primary" :loading="loading" @click="submitLogin" style="margin: 0 1rem 0 1.5rem;">登录</el-button>
      <div>
        <span>还没账号，去</span>
        <el-button type="primary" link @click="setIsLogin" style="margin-top: -1px;">注册</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;

  .button {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .input {
    width: 300px;
    margin-bottom: 20px;
  }
}
</style>
