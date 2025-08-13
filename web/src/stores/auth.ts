// src/stores/auth.ts
import { defineStore } from 'pinia'
import { useApiClient, type LoginData } from '@/composables/useApiClient'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null as string | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
  },
  actions: {
    setTokens(accessToken: string) {
      this.accessToken = accessToken
    },
    logout() {
      this.accessToken = null
    },
    async login(data: LoginData) {
      const apiClient = useApiClient()
      const response = await apiClient.login(data)
      const { accessToken } = response.data
      this.setTokens(accessToken)
    },
  },
})
