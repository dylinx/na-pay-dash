<template>
  <div class="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-white/[0.03]">
    <div class="mb-6">
      <h4 class="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">Webhook Settings</h4>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Configure your callback URLs for transaction notifications.
      </p>
    </div>

    <div class="space-y-6">
      <!-- Collection Webhook -->
      <div class="space-y-3">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Collection Webhook URL
        </label>
        <div class="flex gap-3">
          <input
            v-model="collectionUrl"
            type="url"
            placeholder="https://your-domain.com/webhook/collection"
            class="flex-1 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            :disabled="loadingType === 'collection' || !canEdit"
          />
          <button
            v-if="canEdit"
            @click="handleUpdate('collection')"
            :disabled="loadingType === 'collection' || !collectionUrl"
            class="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50 transition-colors"
          >
            {{ loadingType === 'collection' ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </div>

      <!-- Disbursement Webhook -->
      <div class="space-y-3">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Disbursement Webhook URL
        </label>
        <div class="flex gap-3">
          <input
            v-model="disbursementUrl"
            type="url"
            placeholder="https://your-domain.com/webhook/disbursement"
            class="flex-1 px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            :disabled="loadingType === 'disbursement' || !canEdit"
          />
          <button
            v-if="canEdit"
            @click="handleUpdate('disbursement')"
            :disabled="loadingType === 'disbursement' || !disbursementUrl"
            class="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 disabled:opacity-50 transition-colors"
          >
            {{ loadingType === 'disbursement' ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Error/Success Messages -->
    <div v-if="localError" class="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-sm text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/50 flex items-center gap-2">
      <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>
      {{ localError }}
    </div>
    <div v-if="successMsg" class="mt-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-sm text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800/50 flex items-center gap-2">
      <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
      {{ successMsg }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useAccountSettingsStore } from '@/stores/account_settings'
import { useAuthStore } from '@/stores/auth'

const settingsStore = useAccountSettingsStore()
const authStore = useAuthStore()
const collectionUrl = ref('')
const disbursementUrl = ref('')
const loadingType = ref<'collection' | 'disbursement' | null>(null)
const localError = ref('')
const successMsg = ref('')

const canEdit = computed(() => {
  return authStore.metaData?.permissions?.includes('account-configs:crud')
})

onMounted(async () => {
  await settingsStore.getWebhooks()
  collectionUrl.value = settingsStore.webhooks.collection
  disbursementUrl.value = settingsStore.webhooks.disbursement
})

// Sync if store updates (e.g. from another component or initial load)
watch(() => settingsStore.webhooks, (newVal) => {
  collectionUrl.value = newVal.collection
  disbursementUrl.value = newVal.disbursement
}, { deep: true })

const handleUpdate = async (type: 'collection' | 'disbursement') => {
  loadingType.value = type
  localError.value = ''
  successMsg.value = ''
  
  const url = type === 'collection' ? collectionUrl.value : disbursementUrl.value
  
  try {
    const msg = await settingsStore.updateWebhook(type, url)
    successMsg.value = msg
    setTimeout(() => { successMsg.value = '' }, 3000)
  } catch (err: any) {
    localError.value = err.message || 'Failed to update webhook'
  } finally {
    loadingType.value = null
  }
}
</script>
