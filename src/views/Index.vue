<script setup>
import { ref, onMounted } from 'vue';
import { useBaseStore } from '@/stores/base';
import { useRouter } from 'vue-router';

const router = useRouter();

const { loginOut, getUser, user, loginInfo } = useBaseStore();

//user

onMounted(async () => {
  await getUser();
});

const loginOutFn = async () => {
  await loginOut();
  router.push('/login');
};
</script>

<template>
  <div>
    恭喜你！登录成功！<button @click="loginOutFn">退出登录</button>
  </div>
  <div>登录信息：{{ loginInfo }}</div>
  <div>用户信息：{{ user }}</div>
</template>
