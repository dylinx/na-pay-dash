import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('np_access') || null,
    user: ((): any => {
        const meta = localStorage.getItem('np_metadata')
        if (meta) {
            const parsed = JSON.parse(meta)
            return { data: parsed.profile } // Wrap in data to match API response structure
        }
        return null
    })(),
    currentAccount: ((): any => {
        const meta = localStorage.getItem('np_metadata')
        if (meta) {
            const parsed = JSON.parse(meta)
            return { data: {name: parsed.currentMidName, logo: parsed.currentMidLogo, mid: parsed.currentMid, country: parsed.currentMidCountry} } // Wrap in data to match API response structure
        }
        return null
    })(),
    accounts: ((): any => {
        const meta = localStorage.getItem('np_metadata')
        if (meta) {
            const parsed = JSON.parse(meta)
            return { data: parsed.accounts as [{mname: string, logo: string, mid: string, country: string, mainAccount: boolean, }]} // Wrap in data to match API response structure
        }
        return null
    })(),
    metaData: JSON.parse(localStorage.getItem('np_metadata') || 'null'),
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async accountRequest(fname: string, lname: string, email: string, phone: string, country: string, website: string, postalAddress: string, postalCode: string, physicalLocation: string) {
      this.loading = true
      this.error = null
      try {
            const response = await axios.post('/account-request', { 
                fname,
                lname,
                email,
                phone,
                country,
                website,
                postalAddress,
                postalCode,
                physicalLocation,
            })
            if (response.data.success) {
                return response.data.data.message
            } else {
                throw new Error(response.data.message || 'Action failed')
            }
        } catch (err: any) {
            this.error = err.response?.data?.message || err.message || 'Failed to send reset link'
            throw err
        } finally {
            this.loading = false
        }
    },

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
                        avatar: response.data.data.avatar,
                    },
                    accounts: response.data.data.accounts,
                    currentMid: response.data.data.defaultMid,
                    currentMidName: response.data.data.defaultMname,
                    currentMidLogo: response.data.data.defaultLogo,
                    currentMidCountry: response.data.data?.defaultCountry ?? 'KE',
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
            
            // Handle different API response structures and preserve existing data if needed
            const freshData = response.data.data || response.data
            
            // Ensure we always have the { data: { ... } } structure for consistency
            this.user = { data: freshData }

            // Sync back to localStorage metaData
            const currentMeta = JSON.parse(localStorage.getItem('np_metadata') || '{}')
            currentMeta.profile = {
                name: freshData.name,
                email: freshData.email,
                avatar: freshData.avatar ?? currentMeta.profile?.avatar ?? '/images/user/robot.png',
            }
            localStorage.setItem('np_metadata', JSON.stringify(currentMeta))
            this.metaData = currentMeta
            
            return true
        } catch (error) {
            console.error('Auth check failed:', error)
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

    async verifyEmail(token: string, password: string, confirmPassword: string) {
        this.loading = true
        this.error = null
        try {
            const response = await axios.post(`/verify-email?token=${token}`, {
                password,
                confirmPassword
            })
            if (response.data.success) {
                return response.data.data.message
            } else {
                throw new Error(response.data.error?.message || response.data.message || 'Verification failed')
            }
        } catch (err: any) {
            this.error = err.response?.data?.error?.message || err.message || 'Failed to verify email'
            throw err
        } finally {
            this.loading = false
        }
    },

    async switchAccount(mid: string) {
        this.loading = true
        this.error = null
        try {
            const response = await axios.get(`/${mid}/account/switch`)
            if (response.data.success) {
                const data = response.data.data
                localStorage.setItem('np_metadata', JSON.stringify({
                    profile: {
                        name: data.name,
                        email: data.email || this.metaData?.profile?.email, // Keep email if not returned
                        avatar: data.avatar || this.metaData?.profile?.avatar, // Keep avatar if not returned
                    },
                    accounts: data.accounts,
                    currentMid: data.defaultMid,
                    currentMidName: data.defaultMname,
                    currentMidLogo: data.defaultLogo,
                    currentMidCountry: data?.defaultCountry ?? this.metaData?.currentMidCountry ?? 'KE',
                    permissions: data.permissions,
                    isAdmin: data.isAdmin,
                    timezone: data.timeZone, // Updated to match payload "timeZone"
                }))
                
                // Reload the application to apply changes
                window.location.reload()
            } else {
                throw new Error(response.data.message || 'Switching account failed')
            }
        } catch (err: any) {
            this.error = err.response?.data?.message || err.message || 'Failed to switch account'
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
