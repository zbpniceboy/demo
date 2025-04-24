import { defineStore } from 'pinia'
import request from '@/api/request'

export const useBaseStore = defineStore('base', {
  state: () => ({
    user: null,
    hasAuth: false,
  }),
  actions: {
    async getUser() {
      const res = await request.get('/api/user')
      this.user = res.data.user
    },
    async loginOut() {
      await request.post('/logout')
      this.user = null
      this.hasAuth = false
    },
    async login(data) {
      const res = await request.get('/login', data)
      if (res.data) {
        this.hasAuth = true
      } else {
        this.hasAuth = false
      }
    },
  },
})
