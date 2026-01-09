<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Collections" desc="Payment made into your account" @search="handleSearch">
        <template #actions>
          <button 
            @click="isExportModalOpen = true"
            class="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M16.6661 13.3333V15.4166C16.6661 16.1069 16.1064 16.6666 15.4161 16.6666H4.58203C3.89168 16.6666 3.33203 16.1069 3.33203 15.4166V13.3333M10.0004 3.33325L10.0004 13.3333M6.14456 7.18708L9.9986 3.33549L13.8529 7.18708" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            Export CSV
          </button>
        </template>
        <div v-if="tableSuccessMessage || tableError" class="mb-4">
          <Alert
            v-if="tableSuccessMessage"
            variant="success"
            title="Success"
            :message="tableSuccessMessage"
          />
          <Alert
            v-if="tableError"
            variant="error"
            title="Error"
            :message="tableError"
          />
        </div>

        <TableSkeleton 
          v-if="collectionStore.loading && !collectionStore.collections.length" 
          :columnCount="columns.length" 
          :rowCount="5" 
        />

        <BasicTableOne 
        v-else
          :columns="columns"
          :data="collectionStore.collections"
          :pagination="collectionStore.pagination"
          :actions="tableActions"
          @pageChange="handlePageChange"
          >
           <template #transactionRef="{ row }">
            <span class="font-mono text-xs font-medium text-gray-800 dark:text-white/90">
              {{ row.transactionRef }}
            </span>
          </template>

          <template #merchantRef="{ row }">
            <span class="font-mono text-xs text-gray-500 dark:text-gray-400">
              {{ row.merchantRef }}
            </span>
          </template>

          <template #amount="{ row }">
            <div class="flex flex-col">
              <span class="font-semibold text-gray-800 dark:text-white/90">
                {{ formatAmount(row.expectedAmount, row.currency) }}
              </span>
              <span v-if="row.receivedAmount !== row.expectedAmount" class="text-[10px] text-gray-500">
                Rec: {{ formatAmount(row.receivedAmount, row.currency) }}
              </span>
            </div>
          </template>

          <template #status="{ row }">
            <Badge 
              :color="getStatusColor(row.status)" 
              variant="light"
            >
              {{ row.status }}
            </Badge>
          </template>

          <template #createdAt="{ row }">
            <span class="text-xs text-gray-500 dark:text-gray-400">
              {{ row.createdAt }}
            </span>
          </template>
        </BasicTableOne>
      </ComponentCard>
    </div>

    <!-- Add/Edit Role Drawer -->
    <RightDrawer
      :isOpen="isDrawerOpen"
      title="Transaction Details"
      @close="closeDrawer"
    >
      <div v-if="drawerSuccessMessage || drawerError" class="mb-6">
        <Alert
          v-if="drawerSuccessMessage"
          variant="success"
          title="Success"
          :message="drawerSuccessMessage"
        />
        <Alert
          v-if="drawerError"
          variant="error"
          title="Error"
          :message="drawerError"
        />
      </div>

      <div v-if="collectionStore.loading && !collectionStore.selectedCollection" class="flex items-center justify-center py-12">
        <svg class="animate-spin h-8 w-8 text-brand-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <div v-else-if="collectionStore.selectedCollection" class="space-y-6 pb-20">
        <!-- Status -->
        <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Transaction Status</span>
            <Badge :color="getStatusColor(collectionStore.selectedCollection.status)" variant="light">
              {{ collectionStore.selectedCollection.status }}
            </Badge>
        </div>

        <!-- IDs -->
        <div class="grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-white/[0.02]">
          <div>
            <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Transaction Ref</p>
            <p class="text-sm font-semibold text-gray-800 dark:text-white/90 font-mono">{{ collectionStore.selectedCollection.transactionRef }}</p>
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Merchant Ref</p>
            <div class="flex items-center gap-2">
                <p class="text-sm font-semibold text-gray-800 dark:text-white/90 font-mono">{{ collectionStore.selectedCollection.merchantRef }}</p>
                <button @click="copyToClipboard(collectionStore.selectedCollection.merchantRef)" class="text-gray-400 hover:text-brand-500 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
            </div>
          </div>
        </div>

        <!-- Money -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Transaction Description</h4>
          <div class="rounded-xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-white/[0.02]">
            <p class="text-sm text-gray-800 dark:text-white/90 italic">
                "{{ collectionStore.selectedCollection.description || 'No description provided' }}"
            </p>
          </div>
        </div>

        <!-- Money -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Financial Summary</h4>
          <div class="grid grid-cols-2 gap-x-4 gap-y-4">
            <div v-for="(val, label) in { 
                'Expected': formatAmount(collectionStore.selectedCollection.expectedAmount, collectionStore.selectedCollection.currency),
                'Received': formatAmount(collectionStore.selectedCollection.receivedAmount, collectionStore.selectedCollection.currency),
                'Commission': formatAmount(collectionStore.selectedCollection.commission, collectionStore.selectedCollection.currency),
                'VAT': formatAmount(collectionStore.selectedCollection.vatAmount, collectionStore.selectedCollection.currency),
                'Settled': formatAmount(collectionStore.selectedCollection.settledAmount, collectionStore.selectedCollection.currency),
                'Refunded': formatAmount(collectionStore.selectedCollection.refundedAmount, collectionStore.selectedCollection.currency)
            }" 
            :key="label"
            class="border-b border-gray-100 dark:border-gray-800 pb-2">
                <p class="text-[10px] font-medium text-gray-500 dark:text-gray-400">{{ label }}</p>
                <p class="text-sm font-semibold text-gray-800 dark:text-white/90">{{ val }}</p>
            </div>
          </div>
        </div>

        <!-- Customer -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Customer Details</h4>
          <div class="grid grid-cols-1 gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-white/[0.02]">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Name</p>
                    <p class="text-sm font-semibold text-gray-800 dark:text-white/90">{{ collectionStore.selectedCollection.customerName || 'N/A' }}</p>
                </div>
                <div>
                    <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                    <p class="text-sm font-semibold text-gray-800 dark:text-white/90">{{ collectionStore.selectedCollection.customerPhone || 'N/A' }}</p>
                </div>
                <div class="col-span-2">
                    <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Email</p>
                    <p class="text-sm font-semibold text-gray-800 dark:text-white/90 break-all">{{ collectionStore.selectedCollection.customerEmail || 'N/A' }}</p>
                </div>
                <div>
                    <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Account No</p>
                    <p class="text-sm font-semibold text-gray-800 dark:text-white/90">{{ collectionStore.selectedCollection.accountNumber || 'N/A' }}</p>
                </div>
                <div>
                    <p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Payment Type</p>
                    <p class="text-sm font-semibold text-gray-800 dark:text-white/90">{{ collectionStore.selectedCollection.type }}</p>
                </div>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="space-y-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Event Timeline</h4>
            <div class="relative space-y-6 pl-6 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%_-_16px)] before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800">
                <div v-for="event in collectionStore.selectedCollection.events" :key="event.id" class="relative group">
                    <div class="absolute -left-[23px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-brand-500 dark:border-gray-900 group-last:bg-brand-600"></div>
                    <div>
                        <p class="text-sm font-semibold text-gray-800 dark:text-white/90 capitalize leading-none">{{ event.eventType }}</p>
                        <p class="text-[10px] text-gray-500 dark:text-gray-400 mt-1">{{ event.createdAt }}</p>
                        <p v-if="event.description" class="text-xs text-gray-600 dark:text-gray-400 mt-1.5 line-clamp-2">
                            {{ event.description }}
                        </p>
                        <div v-if="event.mnoRef" class="mt-2 text-[10px]">
                            <span class="inline-block px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 font-mono text-gray-500 dark:text-gray-400">
                                MNO: {{ event.mnoRef }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <template #footer>
        <div class="flex items-center justify-end gap-3">
            <button
                type="button"
                @click="closeDrawer"
                class="grow rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
                Close
            </button>
            <button
                v-if="collectionStore.selectedCollection && collectionStore.selectedCollection.status === 'succeeded' && Number(collectionStore.selectedCollection.refundedAmount) === 0"
                type="button"
                @click="handleFullRefund"
                class="grow rounded-lg bg-error-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-error-700 transition-colors flex items-center justify-center gap-2"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10h10a5 5 0 0 1 5 5v2"></path><path d="m3 10 3-3"></path><path d="m3 10 3 3"></path></svg>
                Refund Transaction
            </button>
        </div>
      </template>
    </RightDrawer>

    <!-- Export Modal -->
    <Modal v-if="isExportModalOpen" fullScreenBackdrop @close="isExportModalOpen = false">
      <template #body>
        <div class="relative w-full max-w-[400px] rounded-2xl bg-white p-6 dark:bg-gray-900 shadow-2xl border border-gray-100 dark:border-gray-800">
          <div class="mb-6 flex items-center justify-between">
            <h3 class="text-lg font-bold text-gray-800 dark:text-white">Export Collections</h3>
            <button @click="isExportModalOpen = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>

          <div class="space-y-4">
            <p class="text-sm text-gray-500 dark:text-gray-400">Select a date range to filter your export. Leave blank to export all records.</p>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-xs font-semibold uppercase tracking-wider text-gray-400">From Date</label>
                <div class="relative">
                  <flat-pickr 
                    v-model="fromDate"
                    :config="flatpickrConfig"
                    class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="Select date"
                  />
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg class="fill-current" width="16" height="16" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.66659 1.5415C7.0808 1.5415 7.41658 1.87729 7.41658 2.2915V2.99984H12.5833V2.2915C12.5833 1.87729 12.919 1.5415 13.3333 1.5415C13.7475 1.5415 14.0833 1.87729 14.0833 2.2915V2.99984L15.4166 2.99984C16.5212 2.99984 17.4166 3.89527 17.4166 4.99984V7.49984V15.8332C17.4166 16.9377 16.5212 17.8332 15.4166 17.8332H4.58325C3.47868 17.8332 2.58325 16.9377 2.58325 15.8332V7.49984V4.99984C2.58325 3.89527 3.47868 2.99984 4.58325 2.99984L5.91659 2.99984V2.2915C5.91659 1.87729 6.25237 1.5415 6.66659 1.5415ZM6.66659 4.49984H4.58325C4.30711 4.49984 4.08325 4.7237 4.08325 4.99984V6.74984H15.9166V4.99984C15.9166 4.7237 15.6927 4.49984 15.4166 4.49984H13.3333H6.66659ZM15.9166 8.24984H4.08325V15.8332C4.08325 16.1093 4.30711 16.3332 4.58325 16.3332H15.4166C15.6927 16.3332 15.9166 16.1093 15.9166 15.8332V8.24984Z"/></svg>
                  </span>
                </div>
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-semibold uppercase tracking-wider text-gray-400">To Date</label>
                <div class="relative">
                  <flat-pickr 
                    v-model="toDate"
                    :config="flatpickrConfig"
                    class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="Select date"
                  />
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg class="fill-current" width="16" height="16" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.66659 1.5415C7.0808 1.5415 7.41658 1.87729 7.41658 2.2915V2.99984H12.5833V2.2915C12.5833 1.87729 12.919 1.5415 13.3333 1.5415C13.7475 1.5415 14.0833 1.87729 14.0833 2.2915V2.99984L15.4166 2.99984C16.5212 2.99984 17.4166 3.89527 17.4166 4.99984V7.49984V15.8332C17.4166 16.9377 16.5212 17.8332 15.4166 17.8332H4.58325C3.47868 17.8332 2.58325 16.9377 2.58325 15.8332V7.49984V4.99984C2.58325 3.89527 3.47868 2.99984 4.58325 2.99984L5.91659 2.99984V2.2915C5.91659 1.87729 6.25237 1.5415 6.66659 1.5415ZM6.66659 4.49984H4.58325C4.30711 4.49984 4.08325 4.7237 4.08325 4.99984V6.74984H15.9166V4.99984C15.9166 4.7237 15.6927 4.49984 15.4166 4.49984H13.3333H6.66659ZM15.9166 8.24984H4.08325V15.8332C4.08325 16.1093 4.30711 16.3332 4.58325 16.3332H15.4166C15.6927 16.3332 15.9166 16.1093 15.9166 15.8332V8.24984Z"/></svg>
                  </span>
                </div>
              </div>
            </div>

            <div class="mt-8 flex flex-col gap-3">
              <button 
                @click="handleExportClick"
                :disabled="collectionStore.loading"
                class="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 py-3 text-sm font-semibold text-white hover:bg-brand-600 transition-colors disabled:opacity-50"
              >
                <svg v-if="collectionStore.loading" class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                {{ collectionStore.loading ? 'Exporting...' : 'Download CSV Report' }}
              </button>
              <button 
                @click="isExportModalOpen = false"
                class="w-full rounded-lg border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800/50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </template>
    </Modal>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import ComponentCard from "@/components/common/ComponentCard.vue";
import BasicTableOne from "@/components/tables/basic-tables/BasicTableOne.vue";
import RightDrawer from "@/components/common/RightDrawer.vue";
import Modal from "@/components/ui/Modal.vue";
import Alert from "@/components/ui/Alert.vue";
import Badge from "@/components/ui/Badge.vue";
import TableSkeleton from "@/components/ui/TableSkeleton.vue";
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { HorizontalDots, TrashIcon, ArrowsPointOutIcon } from "@/icons";
import { useCollectionStore } from "@/stores/collection";

const currentPageTitle = ref("Collections");
const collectionStore = useCollectionStore();
const isDrawerOpen = ref(false);
const isExportModalOpen = ref(false);
const isEditing = ref(false);
const currentUserId = ref("");

const flatpickrConfig = {
    dateFormat: 'Y-m-d',
    altInput: true,
    altFormat: 'M j, Y',
    allowInput: true
}

// Alert states
const tableSuccessMessage = ref("");
const tableError = ref("");
const drawerSuccessMessage = ref("");
const drawerError = ref("");

const searchQuery = ref("");
const fromDate = ref("");
const toDate = ref("");
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

const columns = [
    { header: 'Txn Ref', key: 'transactionRef', class: 'whitespace-nowrap' },
    { header: 'Mer Ref', key: 'merchantRef', class: 'whitespace-nowrap' },
    { header: 'Amount', key: 'amount', class: 'whitespace-nowrap' },
    { header: 'Type', key: 'type', class: 'whitespace-nowrap uppercase' },
    { header: 'Status', key: 'status', class: 'whitespace-nowrap' },
    { header: 'Created At', key: 'createdAt', class: 'whitespace-nowrap' },
]

const tableActions = [
    {
        label: "Edit",
        icon: HorizontalDots,
        onClick: (row: any) => handleEditClick(row),
    }
];

onMounted(() => {
    fetchCollections();
});

const fetchCollections = (params: any = {}) => {
    const queryParams = {
        ...params,
        qr: searchQuery.value || undefined
    };
    collectionStore.getCollections(queryParams);
};

const handlePageChange = ({ cursor, direction }: { cursor: string | number, direction: string }) => {
    const params: any = {};
    if (cursor) {
        params.lastSeenId = cursor;
    }
    params.direction = direction;
    fetchCollections(params);
};

const handleSearch = (query: string) => {
    searchQuery.value = query;
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(() => {
        fetchCollections();
    }, 500); // 500ms delay for debouncing
};

const handleEditClick = (row: any) => {
    collectionStore.selectedCollection = null;
    isDrawerOpen.value = true;
    collectionStore.getCollectionById(row.collectionId);
};

const closeDrawer = () => {
    isDrawerOpen.value = false;
    collectionStore.selectedCollection = null;
};

const formatAmount = (amount: string | number, currency: string) => {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: currency || 'KES'
    }).format(Number(amount));
};

const getStatusColor = (status: string) => {
    const s = status?.toLowerCase();
    if (s === 'succeeded' || s === 'active') return 'success';
    if (s === 'pending' || s === 'processing') return 'warning';
    if (s === 'cancel' || s === 'failed') return 'error';
    return 'primary';
};

const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text);
        // We could add a toast here if available, but for now console is fine or simple alert
        alert('Merchant Ref copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
};

const handleFullRefund = async () => {

};

const handlePartialRefund = async () => {

};

const handleExportClick = async () => {
    try {
        const queryParams = {
            qr: searchQuery.value || undefined,
            format: 'csv',
            from: fromDate.value || undefined,
            to: toDate.value || undefined
        };
        
        const blob = await collectionStore.exportCollections(queryParams);
        
        // Create download link
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        
        // Format filename: collections-export-YYYY-MM-DD.csv
        const date = new Date().toISOString().split('T')[0];
        link.setAttribute('download', `collections-export-${date}.csv`);
        
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        isExportModalOpen.value = false;
        tableSuccessMessage.value = "Collections exported successfully";
        setTimeout(() => tableSuccessMessage.value = "", 3000);
    } catch (err: any) {
        tableError.value = err.message || "Failed to export collections";
        setTimeout(() => tableError.value = "", 5000);
    }
};

</script>