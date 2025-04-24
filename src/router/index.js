import { createRouter, createWebHistory } from 'vue-router'
import { useBaseStore } from '@/stores/base'
import Login from '@/views/Login.vue'
import Home from '@/views/Index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  console.log('router.beforeEach', to, from)
  const baseStore = useBaseStore()
  if (baseStore.hasAuth) {
    console.log('router.beforeEach', baseStore.isLogin, baseStore.hasAuth)
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
