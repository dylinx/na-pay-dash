<template>
  <div class="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-white/[0.03]">
    <div class="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between mb-6">
      <div>
        <h4 class="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">API Keys</h4>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Manage your API keys for programmatic access to your account.
        </p>
      </div>
      <button v-if="canEdit" @click="settingsStore.generateApiKey" :disabled="settingsStore.loading" class="edit-button">
          <svg
            class="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          New API Key
        </button>
    </div>

    <!-- Generated API Key Display -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
    >
      <div v-if="settingsStore.apiKey" class="mt-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Your New API Key
          </span>
          <span class="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-900/20 text-[10px] font-medium text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50">
            <InfoIcon class="h-3 w-3" />
            Displaying only once
          </span>
        </div>
        
        <div class="flex items-center gap-3">
          <div class="flex-1 font-mono text-sm p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg break-all text-gray-800 dark:text-white/90">
            {{ settingsStore.apiKey }}
          </div>
          <button
            @click="copyApiKey"
            class="flex items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-900 transition-all shadow-sm active:scale-95"
            title="Copy to clipboard"
          >
            <CheckIcon v-if="copied" class="h-5 w-5 text-green-500" />
            <svg
              v-else
              class="h-5 w-5 fill-current"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.58822 4.58398C6.58822 4.30784 6.81207 4.08398 7.08822 4.08398H15.4154C15.6915 4.08398 15.9154 4.30784 15.9154 4.58398L15.9154 12.9128C15.9154 13.189 15.6916 13.4128 15.4154 13.4128H7.08821C6.81207 13.4128 6.58822 13.189 6.58822 12.9128V4.58398ZM7.08822 2.58398C5.98365 2.58398 5.08822 3.47942 5.08822 4.58398V5.09416H4.58496C3.48039 5.09416 2.58496 5.98959 2.58496 7.09416V15.4161C2.58496 16.5207 3.48039 17.4161 4.58496 17.4161H12.9069C14.0115 17.4161 14.9069 16.5207 14.9069 15.4161L14.9069 14.9128H15.4154C16.52 14.9128 17.4154 14.0174 17.4154 12.9128L17.4154 4.58398C17.4154 3.47941 16.52 2.58398 15.4154 2.58398H7.08822ZM13.4069 14.9128H7.08821C5.98364 14.9128 5.08822 14.0174 5.08822 12.9128V6.59416H4.58496C4.30882 6.59416 4.08496 6.81801 4.08496 7.09416V15.4161C4.08496 15.6922 4.30882 15.9161 4.58496 15.9161H12.9069C13.183 15.9161 13.4069 15.6922 13.4069 15.4161L13.4069 14.9128Z"
              />
            </svg>
          </button>
        </div>
        
        <p class="mt-3 text-xs text-amber-600 dark:text-amber-400 flex items-start gap-1.5">
          <WarningIcon class="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          <span>Make sure to copy your API key now. You won't be able to see it again for security reasons.</span>
        </p>
      </div>
    </transition>

    <div v-if="settingsStore.error" class="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-sm text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/50 flex items-center gap-2">
      <ErrorIcon class="h-4 w-4" />
      {{ settingsStore.error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { PlusIcon, CheckIcon, InfoIcon, WarningIcon, ErrorIcon } from "@/icons"
import { useAccountSettingsStore } from '@/stores/account_settings'
import { useAuthStore } from '@/stores/auth'

const settingsStore = useAccountSettingsStore()
const authStore = useAuthStore()
const copied = ref(false)

const canEdit = computed(() => {
  return authStore.metaData?.permissions?.includes('account-configs:crud')
})

const copyApiKey = async () => {
  if (!settingsStore.apiKey) return
  
  try {
    await navigator.clipboard.writeText(settingsStore.apiKey)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy API key:', err)
  }
}
</script>
