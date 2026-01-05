<template>
  <ThemeProvider>
    <SidebarProvider>
      <RouterView />
    </SidebarProvider>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import ThemeProvider from './components/layout/ThemeProvider.vue'
import SidebarProvider from './components/layout/SidebarProvider.vue'

const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
    const isAuthenticated = await authStore.checkAuth()
    if (!isAuthenticated) {
        router.push('/signin')
    } else {
        // If we are at signin page but authenticated, go to dashboard
        if (router.currentRoute.value.path === '/signin' || router.currentRoute.value.path === '/auth/otp') {
            router.push('/')
        }
    }
})
</script>
