import { defineStore } from 'pinia'
import axios from 'axios'

export const useCollectionStore = defineStore('collection', {
    state: () => ({
        collections: [],
        selectedCollection: null as any,
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
        // Collections
        async getCollections(params: {
            direction?: string,
            limit?: number,
            lastSeenId?: string | number,
            format?: string,
            qr?: string
        } = {}) {
            this.loading = true
            this.error = null
            try {
                const response = await axios.get(`${this.mid}/collections`, { params })
                this.collections = response.data.data.data
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

        async getCollectionById(collectionId: string) {
            this.loading = true
            this.error = null
            try {
                const response = await axios.get(`${this.mid}/collections/${collectionId}`)
                this.selectedCollection = response.data.data
                return this.selectedCollection
            } catch (err: any) {
                this.error = err.response?.data?.message || err.message || 'Failed to fetch collection details'
                throw err
            } finally {
                this.loading = false
            }
        },

        async exportCollections(params: {
            direction?: string,
            limit?: number,
            lastSeenId?: string | number,
            format?: string,
            qr?: string,
            from?: string,
            to?: string
        } = {}) {
            this.loading = true
            this.error = null
            try {
                const response = await axios.get(`${this.mid}/collections/export`, { 
                    params,
                    responseType: 'blob'
                })
                return response.data
            } catch (err: any) {
                this.error = err.response?.data?.message || err.message || 'Failed to export collections'
                throw err
            } finally {
                this.loading = false
            }
        },

    }
})