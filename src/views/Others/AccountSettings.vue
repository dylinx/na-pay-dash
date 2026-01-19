<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6"
    >
      <AccountProfileCard />
      <ApiKeyCard />
      <WebhookSettingsCard />
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AccountProfileCard from '@/components/profile/AccountProfileCard.vue'
import ApiKeyCard from '@/components/profile/ApiKeyCard.vue'
import WebhookSettingsCard from '@/components/profile/WebhookSettingsCard.vue'

const currentPageTitle = ref('Account Settings')
</script>
