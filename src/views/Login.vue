<script setup>
import { ref } from 'vue'
import { useBaseStore } from '@/stores/base'
import { useRouter } from 'vue-router'

const email = ref('test@example.com')
const password = ref('password')
const errors = ref(null)
const { login } = useBaseStore()
const router = useRouter()

const submitLogin = async () => {
  try {
    await login({
      email: email.value,
      password: password.value
    });
    router.push('/');
  } catch (error) {
    errors.value = error.message || '登录失败'
    alert(errors.value);
  }
}
</script>


<template>
  <div class="form-box">
    <h1 style="margin-bottom: 20px;">登录</h1>
    <form @submit.prevent="submitLogin">
      <input v-model="email" type="email" placeholder="请输入您的邮箱">
      <input v-model="password" type="password" placeholder="请输入您的密码">
      <button type="submit">登录</button>
    </form>
  </div>

</template>

<style scoped>
.form-box {
  background-color: #fff;
  padding: 20px;
  width: 300px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;

}

input {
  margin-bottom: 20px;
  padding: 5px 10px;
  width: calc(100% - 20px);
  border: none;
  outline: none;
  height: 40px;
  background-color: #efefef;
  border-radius: 5px;
}

button {
  padding: 15px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 8px;
  width: 100%;
}
</style>
