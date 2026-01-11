import { defineStore } from 'pinia'
import axios from 'axios'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    summary: null as any,
    mid: JSON.parse(localStorage.getItem('np_metadata') || '{}').currentMid,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchSummary() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${this.mid}/summary`)
        if (response.data.success) {
          this.summary = response.data.data
        } else {
          throw new Error(response.data.message || 'Failed to fetch dashboard summary')
        }
      } catch (err: any) {
        this.error = err.response?.data?.message || err.message || 'Failed to fetch dashboard summary'
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
