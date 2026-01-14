import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserRoleStore = defineStore('userRole', {
    state: () => ({
        roles: [],
        users: [],
        permissions: [],
        rolesSelect: [] as { label: string, value: string, disabled?: boolean }[],
        activities: [],
        loading: false,
        error: null as string | null,
        mid: JSON.parse(localStorage.getItem('np_metadata') || '{}').currentMid,
        pagination: {
            has_next: false,
            has_prev: false,
            next_cursor: null as string | number | null,
            prev_cursor: null as string | number | null,
            limit: 10
        }
    }),

    actions: {
        // Roles
        async getRoles(params: {
            direction?: string,
            limit?: number,
            lastSeenId?: string | number,
            format?: string,
            qr?: string
        } = {}) {
            this.loading = true
            this.error = null
            try {
                const response = await axios.get(`${this.mid}/roles`, { params })
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

        async createRole(name: string, description: string, permissions: string[]) {
            this.loading = true
            this.error = null
            try {
                await axios.post(`${this.mid}/roles`, { name, description, permissions })
            } catch (err: any) {
                this.error = err.response?.data?.message || err.message || 'Failed to create role'
                throw err
            } finally {
                this.loading = false
            }
        },

        async updateRole(roleId: string, name: string, description: string, permissions: string[]) {
            this.loading = true
            this.error = null
            try {
                await axios.put(`${this.mid}/roles/${roleId}`, { name, description, permissions })
            } catch (err: any) {
                this.error = err.response?.data?.message || err.message || 'Failed to update role'
                throw err
            } finally {
                this.loading = false
            }
        },

        async deleteRole(roleId: string) {
            this.loading = true
            this.error = null
            try {
                const response = await axios.delete(`${this.mid}/roles/${roleId}`)
                return response.data.data.message
            } catch (err: any) {
                this.error = err.response?.data?.error?.message || err.message || 'Failed to delete role'
                throw err
            } finally {
                this.loading = false
            }
        },

        async getRolesSelect() {
            this.loading = true
            this.error = null
            try {
                const response = await axios.get(`${this.mid}/roles/select`)
                this.rolesSelect = response.data.data!.map((role: {roleId: string, name: string}) => ({
                    label: role.name,
                    value: role.roleId,
                    disabled: role.name === 'Admin'
                }))
            } catch (err: any) {
                this.error = err.response?.data?.message || err.message || 'Failed to fetch roles'
                throw err
            } finally {
                this.loading = false
            }
        },

        // Permissions
        async getPermissions() {
            this.loading = true
            this.error = null
            try {
                const response = await axios.get('/permissions')
                this.permissions = response.data.data!.map((permission: {uid: string, name: string}) => ({
                    label: permission.name,
                    value: permission.name
                }))
            } catch (err: any) {
                this.error = err.response?.data?.message || err.message || 'Failed to fetch permissions'
                throw err
            } finally {
                this.loading = false
            }
        },

        // Users
        async getUsers(params: {
            direction?: string,
            limit?: number,
            lastSeenId?: string | number,
            format?: string,
            qr?: string
        } = {}) {
            this.loading = true
            this.error = null
            try {
                const response = await axios.get(`${this.mid}/users`, { params })
                this.users = response.data.data.data
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

        async createUser(name: string, email: string, role: string) {
            this.loading = true
            this.error = null
            try {
                await axios.post(`${this.mid}/users`, { name, email, role })
            } catch (err: any) {
                this.error = err.response?.data?.message || err.message || 'Failed to create user'
                throw err
            } finally {
                this.loading = false
            }
        },

        async updateUser(userId: string, name: string, email: string, role: string) {
            this.loading = true
            this.error = null
            try {
                await axios.put(`${this.mid}/users/${userId}`, { name, email, role })
            } catch (err: any) {
                this.error = err.response?.data?.message || err.message || 'Failed to update user'
                throw err
            } finally {
                this.loading = false
            }
        },

        async deleteUser(userId: string) {
            this.loading = true
            this.error = null
            try {
                const response = await axios.delete(`${this.mid}/users/${userId}`)
                return response.data.data.message
            } catch (err: any) {
                this.error = err.response?.data?.error?.message || err.message || 'Failed to delete user'
                throw err
            } finally {
                this.loading = false
            }
        },

        async getUserActivities(params: {
            direction?: string,
            limit?: number,
            lastSeenId?: string | number,
            format?: string,
            qr?: string
        } = {}) {
            this.loading = true
            this.error = null
            try {
                const response = await axios.get(`${this.mid}/activities`, { params })
                this.activities = response.data.data.data
                this.pagination = { 
                    has_next: response.data.data.has_next,
                    has_prev: response.data.data.has_prev,
                    next_cursor: response.data.data.next_cursor,
                    prev_cursor: response.data.data.prev_cursor,
                    limit: response.data.data.limit
                }
            } catch (err: any) {
                this.error = err.response?.data?.message || err.message || 'Failed to fetch user'
                throw err
            } finally {
                this.loading = false
            }
        },

    },
})