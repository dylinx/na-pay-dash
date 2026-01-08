<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Roles">
        <template #actions>
          <button 
            @click="isDrawerOpen = true"
            class="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600"
          >
            <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4.16666V15.8333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4.16669 10H15.8334" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Add Role
          </button>
        </template>
        <BasicTableOne
          :columns="columns"
          :data="roleStore.roles"
          :pagination="roleStore.pagination"
          @pageChange="handlePageChange"
        />
      </ComponentCard>
    </div>

    <!-- Add Role Drawer -->
    <RightDrawer
      :isOpen="isDrawerOpen"
      title="Create New Role"
      @close="isDrawerOpen = false"
    >
      <form @submit.prevent="handleCreateRole" class="space-y-6">
        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Role Name
          </label>
          <input
            type="text"
            v-model="form.name"
            placeholder="e.g. Admin, Editor"
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            required
          />
        </div>

        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Description
          </label>
          <textarea
            v-model="form.description"
            placeholder="Enter role description..."
            rows="4"
            class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          ></textarea>
        </div>

        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Permissions
          </label>
          <MultipleSelect
            v-model="form.permissions"
            :options="permissionOptions"
          />
        </div>
      </form>

      <template #footer>
        <div class="flex items-center justify-end gap-3">
            <button
                type="button"
                @click="isDrawerOpen = false"
                class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
                Cancel
            </button>
            <button
                type="submit"
                @click="handleCreateRole"
                class="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
            >
                Create Role
            </button>
        </div>
      </template>
    </RightDrawer>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import ComponentCard from "@/components/common/ComponentCard.vue";
import BasicTableOne from "@/components/tables/basic-tables/BasicTableOne.vue";
import RightDrawer from "@/components/common/RightDrawer.vue";
import MultipleSelect from "@/components/forms/FormElements/MultipleSelect.vue";
import { useUserRoleStore } from "@/stores/user_role";

const currentPageTitle = ref("Roles");
const roleStore = useUserRoleStore();
const isDrawerOpen = ref(false);

const form = reactive({
    name: '',
    description: '',
    permissions: [] as { label: string, value: string }[]
});

const permissionOptions = [
    { label: "View Collections", value: "collections:view" },
    { label: "Initiate Refunds", value: "collections-refund:initiate" },
    { label: "Approve Refunds", value: "collections-refund:approve" },
    { label: "View Disbursements", value: "disbursements:view" },
    { label: "Approve Disbursements", value: "disbursements:approve" },
    { label: "Manage Users", value: "users:crud" },
    { label: "Manage Account Configs", value: "account-configs:crud" },
];

const columns = [
    { header: "Name", key: "name" },
    { header: "Description", key: "description" },
    { header: "Created At", key: "createdAt" },
];

onMounted(() => {
    roleStore.getRoles();
});

const handlePageChange = ({ cursor, direction }: { cursor: string | number, direction: string }) => {
    const params: any = {};
    if (cursor) {
        params.lastSeenId = cursor;
    }
    params.direction = direction;
    roleStore.getRoles(params);
};

const handleCreateRole = async () => {
    console.log("Creating role:", form);
    // Add API call here via store
    isDrawerOpen.value = false;
    // Reset form
    form.name = '';
    form.description = '';
    form.permissions = [];
};
</script>