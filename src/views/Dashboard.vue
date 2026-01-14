<template>
  <admin-layout>
    <div v-if="dashboardStore.loading && !dashboardStore.summary" class="flex h-[400px] items-center justify-center">
      <div class="h-10 w-10 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
    </div>
    
    <div v-else class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12">
        <transaction-metrics 
          :collection-count="dashboardStore.summary?.collections?.thisMonthTotalCount || 0"
          :disbursement-count="dashboardStore.summary?.disbursement?.thisMonthTotalCount || 0"
          :refund-count="dashboardStore.summary?.collections?.todayTotalCommission || 0"
          :settlement-count="dashboardStore.summary?.collections?.thisMonthTotalCount || 0"
        />
      </div>
      <div class="col-span-12">
        <monthly-transactions 
          :graph-data="dashboardStore.summary?.collections?.graphs?.barGraph || {}"
        />
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import MonthlyTransactions from '../components/dashboard/MonthlyTransactions.vue'
import TransactionMetrics from '../components/dashboard/TransactionMetrics.vue'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

onMounted(async () => {
  try {
    await dashboardStore.fetchSummary()
  } catch (err) {
    console.error('Failed to load dashboard summary:', err)
  }
})
</script>
