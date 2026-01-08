import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('np_access') || null,
    user: null,
    metaData: null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('/clients/sign-in', {
          email,
          password,
        })
        
        if (response.data.success) {
           // Return the OTP token to be used in the next step
           return response.data.data.token
        } else {
            throw new Error(response.data.message || 'Login failed')
        }
      } catch (err: any) {
        this.error = err.response?.data?.message || err.message || 'Login failed'
        throw err
      } finally {
        this.loading = false
      }
    },

    async verifyOtp(token: string, code: string) {
        this.loading = true
        this.error = null
        try {
            const response = await axios.post(`/email-2fa?token=${token}`, {
                code
            })

            if (response.data.success) {
                const accessToken = response.data.data.accessToken

                this.accessToken = accessToken
                localStorage.setItem('np_access', accessToken)
                localStorage.setItem('np_metadata', JSON.stringify({
                    profile: {
                        name: response.data.data.name,
                        email: response.data.data.email,
                        avatar: response.data.data.avatar ?? 'https://gravatar.com/avatar/8e5191909866e795a5f36d675f9f2fa3?s=400&d=robohash&r=x',
                    },
                    accounts: response.data.data.accounts,
                    currentMid: response.data.data.defaultMid,
                    currentMidName: response.data.data.defaultMname,
                    currentMidLogo: response.data.data.defaultLogo,
                    permissions: response.data.data.permissions,
                    isAdmin: response.data.data.isAdmin,
                    timezone: response.data.data.timezone,
                }))

                // Set default header for future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                return true
            } else {
                throw new Error(response.data.message || 'Verification failed')
            }
        } catch (err: any) {
             this.error = err.response?.data?.message || err.message || 'Verification failed'
             throw err
        } finally {
            this.loading = false
        }
    },

    async resendOtp(token: string) {
        this.loading = true
        this.error = null
        try {
            const response = await axios.post(`/resend-email-2fa?token=${token}`)
            return response.data
        } catch(err: any) {
            this.error = err.response?.data?.message || err.message || 'Resend failed'
            throw err
        } finally {
            this.loading = false
        }
    },

    async checkAuth() {
        if (!this.accessToken) return false
        
        try {
            // Ensure header is set if we have a token from localStorage but verified later
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`
            
            const response = await axios.get('/user-profile')
            this.user = response.data
            return true
        } catch {
            // Note: Global interceptor might catch 401 first, but we handle the boolean return here
            this.logout()
            return false
        }
    },

    async signOut() {
        try {
            await axios.post('/sign-out')
        } catch (error) {
            console.error('Sign out error', error)
        } finally {
            this.logout()
        }
    },

    async forgotPassword(email: string) {
        this.loading = true
        this.error = null
        try {
            const response = await axios.post('/forgot-pwd', { email })
            if (response.data.success) {
                return response.data.data.message
            } else {
                throw new Error(response.data.message || 'Action failed')
            }
        } catch (err: any) {
            this.error = err.response?.data?.error?.message || err.message || 'Failed to send reset link'
            throw err
        } finally {
            this.loading = false
        }
    },

    async resetPassword(token: string, password: string, confirmPassword: string) {
        this.loading = true
        this.error = null
        try {
            const response = await axios.post(`/reset-pwd?token=${token}`, {
                password,
                confirmPassword
            })
            if (response.data.success) {
                return response.data.data.message
            } else {
                 throw new Error(response.data.message || 'Reset failed')
            }
        } catch (err: any) {
             this.error = err.response?.data?.error?.message || err.message || 'Failed to reset password'
             throw err
        } finally {
            this.loading = false
        }
    },

    logout() {
        this.accessToken = null
        this.user = null
        localStorage.removeItem('np_access')
        localStorage.removeItem('np_metadata')
        delete axios.defaults.headers.common['Authorization']
        router.push('/signin')
    }
  }
})
