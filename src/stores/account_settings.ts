import { defineStore } from 'pinia'
import axios from 'axios'

export const useAccountSettingsStore = defineStore('account_settings', {
  state: () => ({
    apiKey: null as any,
    mid: JSON.parse(localStorage.getItem('np_metadata') || '{}').currentMid,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async generateApiKey() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post(`${this.mid}/account-settings/api-key`)
    
        if (response.data.success) {
          this.apiKey = response.data.data.apiKey
        } else {
          throw new Error(response.data.message || 'Failed to generate API key')
        }
      } catch (err: any) {
        this.error = err.response?.data?.message || err.message || 'An error occurred while generating the API key'
      } finally {
        this.loading = false
      } 
    },
  },
})
