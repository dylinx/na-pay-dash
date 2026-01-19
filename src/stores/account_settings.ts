import { defineStore } from 'pinia'
import axios from 'axios'

export const useAccountSettingsStore = defineStore('account_settings', {
  state: () => ({
    apiKey: null as string | null,
    webhooks: {
      collection: '',
      disbursement: '',
    },
    mid: JSON.parse(localStorage.getItem('np_metadata') || '{}').currentMid,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async getWebhooks() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${this.mid}/account/webhooks`)
        if (response.data.success) {
          this.webhooks = {
            collection: response.data.data.collection,
            disbursement: response.data.data.disursment, // Correcting typo from API payload if it exists there too
          }
        }
      } catch (err: any) {
        this.error = err.response?.data?.message || err.message || 'Failed to fetch webhooks'
      } finally {
        this.loading = false
      }
    },

    async updateWebhook(type: 'collection' | 'disbursement', url: string) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post(`${this.mid}/account/webhooks/${type}`, { url })
        if (response.data.success) {
          // Update local state after successful POST
          if (type === 'collection') {
            this.webhooks.collection = url
          } else {
            this.webhooks.disbursement = url
          }
          return response.data.data?.message || 'Webhook updated successfully'
        } else {
          throw new Error(response.data.message || 'Failed to update webhook')
        }
      } catch (err: any) {
        this.error = err.response?.data?.message || err.message || 'An error occurred while updating the webhook'
        throw err
      } finally {
        this.loading = false
      }
    },

    async generateApiKey() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post(`${this.mid}/account/api-key`)
    
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
