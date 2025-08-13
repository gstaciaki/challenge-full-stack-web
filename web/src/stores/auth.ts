import { defineStore } from 'pinia'
import { useApiClient, type LoginData } from '@/composables/useApiClient'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
  },
  actions: {
    setTokens(token: string) {
      this.accessToken = token
      localStorage.setItem('accessToken', token)
    },
    logout() {
      this.accessToken = null
      localStorage.removeItem('accessToken')
    },
    async login(data: LoginData) {
      const apiClient = useApiClient()
      const response = await apiClient.login(data)
      const { accessToken } = response.data
      this.setTokens(accessToken)
    },
  },
})
