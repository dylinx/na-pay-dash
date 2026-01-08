import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useUserRoleStore = defineStore('userRole', {
    state: () => ({
        roles: [],
        users: [],
        loading: false,
        error: null as string | null,
        pagination: {
            has_next: false,
            has_prev: false,
            next_cursor: null as string | number | null,
            prev_cursor: null as string | number | null,
            limit: 10
        }
    }),

    actions: {
        async getRoles(params: {
            direction?: string,
            limit?: number,
            lastSeenId?: string | number,
            format?: string,
            name?: string
        } = {}) {
            this.loading = true
            this.error = null
            try {
                const mid = JSON.parse(localStorage.getItem('np_metadata') || '{}').currentMid
                const response = await axios.get(`${mid}/roles`, { params })
                this.roles = response.data.data.data
                this.pagination = {
                    has_next: response.data.data.has_next,
                    has_prev: response.data.data.has_prev,
                    next_cursor: response.data.data.next_cursor,
                    prev_cursor: response.data.data.prev_cursor,
                    limit: response.data.data.limit
                }
            } catch (err: any) {
                this.error = err.response?.data?.message || err.message || 'Failed to fetch user roles'
                throw err
            } finally {
                this.loading = false
            }
        },

        async getUsers() {
            this.loading = true
            this.error = null
            try {
                const response = await axios.get('/users')
                this.users = response.data.data
            } catch (err: any) {
                this.error = err.response?.data?.message || err.message || 'Failed to fetch users'
                throw err
            } finally {
                this.loading = false
            }
        },
    },
})