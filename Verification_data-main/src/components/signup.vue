<script lang='ts'>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, Check } from '@element-plus/icons-vue'
import { setIsLogin } from '@/utils/login'
import { sendMail, register } from '@/api'

export default {
  setup() {
    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const loading = ref(false)
    const inputCode = ref('')
    const code = ref('')
    let isGetCode = false

    const signup = () => {
      loading.value = true
      // 判断验证码是否正确
      if (inputCode.value.length !== 6) {
        loading.value = false
        ElMessage({
          message: '验证码错误',
          type: 'error',
        })
        return;
      }
      // 判断用户名和密码是否为空
      if (!username.value || !password.value || !confirmPassword.value) {
        loading.value = false
        ElMessage({
          message: '用户名和密码不能为空',
          type: 'warning',
        })
        return;
      }
      // 判断两次密码是否一致
      if (password.value !== confirmPassword.value) {
        loading.value = false
        ElMessage({
          message: '两次密码不一致',
          type: 'warning',
        })
        return;
      }
      // 密码必须大于八位且包含数字字母及特殊字符:"/^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{8,}$/"
      if (password.value.length < 8) {
        loading.value = false
        ElMessage({
          message: '密码必须大于八位且包含数字字母及特殊字符',
          type: 'warning',
        })
        return;
      }
      register({ username: username.value, password: password.value }).then(res => {
        loading.value = false
        if (res === '用户已存在') {
          ElMessage({
            message: '用户已存在',
            type: 'error',
          })
          return;
        }
        ElMessage({
          message: '注册成功',
          type: 'success',
        })
        // 注册完自动登录，登录暂定将用户信息存储到localStorage
        localStorage.setItem('username', username.value)
        localStorage.setItem('userId', res.slice(0, -1))
        setTimeout(() => {
          loading.value = false
          router.push('/home')
        }, 1000)
      })
    }
    const getCode = () => {
      sendMail(username.value).then(res => {
        if (!res) return
        code.value = res.toString();
        ElMessage({
          message: '验证码已发送，请注意查收',
          type: 'success',
        });
        isGetCode = true;
        let count = 60;
        const timer = setInterval(() => {
          count--;
          document.getElementById('code').innerText = `${count}s`;
          if (count === 0) {
            clearInterval(timer);
            document.getElementById('code').innerText = '获取验证码';
            isGetCode = false;     // 但是目前恢复后颜色未恢复
          }
        }, 1000);
      })
    }

    const goHome = () => {
      router.push('/home')
    }

    return {
      User,
      Lock,
      Check,
      username,
      password,
      inputCode,
      confirmPassword,
      loading,
      isGetCode,
      signup,
      getCode,
      setIsLogin,
      goHome
    }
  }
}

</script>
<template>
  <div class="signup">
    <el-input class="input" v-model="username" placeholder="邮箱" :prefix-icon="User" autofocus size="large" />
    <div>
      <el-input class="input code-input" v-model="inputCode" placeholder="验证码" :prefix-icon="Check" size="large" />
      <el-button id="code" class="code-button" type="primary" :loading="loading" @click="getCode"
        :disabled="isGetCode">获取验证码</el-button>
    </div>
    <el-input class="input" v-model="password" type="password" placeholder="密码" :prefix-icon="Lock" show-password
      size="large" />
    <el-input class="input" v-model="confirmPassword" type="password" placeholder="确认密码" :prefix-icon="Lock"
      show-password size="large" @keyup.enter.native="signup" />
    <div class="button">
      <div>
        <span>返回</span>
        <el-button type="primary" link @click="goHome" style="margin-top: -1px;">首页</el-button>
      </div>
      <el-button type="primary" :loading="loading" @click="signup" style="margin: 0 1rem 0 1.5rem;">注册</el-button>
      <div>
        <span>已有账号，去</span>
        <el-button type="primary" link @click="setIsLogin" style="margin-top: -1px;">登录</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .input {
    width: 300px;
    margin-bottom: 20px;
  }

  .button {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .code-input {
    width: 198px;
  }

  .code-button {
    position: relative;
    top: -10px;
    height: 40px;
    margin-left: 2px;
    min-width: 100px;
  }
}
</style>
