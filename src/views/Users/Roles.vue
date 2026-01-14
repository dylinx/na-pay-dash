<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Roles" desc="Group permissions under one role and easily assign users" @search="handleSearch">
        <template #actions>
          <button 
            @click="handleAddClick"
            class="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600"
          >
            <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4.16666V15.8333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4.16669 10H15.8334" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Add Role
          </button>
        </template>

        <div v-if="tableSuccessMessage || tableError" class="mb-6">
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
          v-if="roleStore.loading && !roleStore.roles.length" 
          :columnCount="3" 
          :rowCount="5" 
        />

        <BasicTableOne
          v-else
          :columns="columns"
          :data="roleStore.roles"
          :pagination="roleStore.pagination"
          :actions="tableActions"
          @pageChange="handlePageChange"
        >
          <template #permissions="{ row }">
            <div class="flex flex-wrap gap-1.5 max-w-[300px]">
              <Badge
                v-for="permission in row.permissions.slice(0, 3)"
                :key="permission"
                variant="light"
                color="primary"
                size="sm"
              >
                {{ permission }}
              </Badge>
              <Badge
                v-if="row.permissions.length > 3"
                variant="light"
                color="light"
                size="sm"
              >
                +{{ row.permissions.length - 3 }} more
              </Badge>
            </div>
          </template>
        </BasicTableOne>
      </ComponentCard>
    </div>

    <!-- Add/Edit Role Drawer -->
    <RightDrawer
      :isOpen="isDrawerOpen"
      :title="isEditing ? 'Update Role' : 'Create New Role'"
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

      <form @submit.prevent="handleFormSubmit" class="space-y-6">
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
            :disabled="roleStore.loading"
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
            :disabled="roleStore.loading"
          ></textarea>
        </div>

        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Permissions
          </label>
          <MultipleSelect
            v-model="form.permissions"
            :options="roleStore.permissions"
            :disabled="roleStore.loading"
          />
        </div>
      </form>

      <template #footer>
        <div class="flex items-center justify-end gap-3">
            <button
                type="button"
                @click="closeDrawer"
                class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
                Cancel
            </button>
            <button
                type="submit"
                @click="handleFormSubmit"
                :disabled="roleStore.loading"
                class="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
                <svg v-if="roleStore.loading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ roleStore.loading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Role' : 'Create Role') }}
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
import TableSkeleton from "@/components/ui/TableSkeleton.vue";
import Alert from "@/components/ui/Alert.vue";
import Badge from "@/components/ui/Badge.vue";
import { HorizontalDots, TrashIcon } from "@/icons";
import { useUserRoleStore } from "@/stores/user_role";

const currentPageTitle = ref("Roles");
const roleStore = useUserRoleStore();
const isDrawerOpen = ref(false);
const isEditing = ref(false);
const currentRoleId = ref("");

// Alert states
const tableSuccessMessage = ref("");
const tableError = ref("");
const drawerSuccessMessage = ref("");
const drawerError = ref("");

const searchQuery = ref("");
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

const form = reactive({
    name: '',
    description: '',
    permissions: [] as { label: string, value: string }[]
});

const columns = [
    { header: "Name", key: "name" },
    { header: "Description", key: "description" },
    { header: "Permissions", key: "permissions" },
];

const tableActions = [
    {
        label: "Edit",
        icon: HorizontalDots,
        onClick: (row: any) => handleEditClick(row),
    },
    {
        label: "Delete",
        icon: TrashIcon,
        onClick: (row: any) => handleDeleteClick(row),
    }
];

onMounted(() => {
    fetchRoles();
    roleStore.getPermissions();
});

const fetchRoles = (params: any = {}) => {
    const queryParams = {
        ...params,
        qr: searchQuery.value || undefined
    };
    roleStore.getRoles(queryParams);
};

const handlePageChange = ({ cursor, direction }: { cursor: string | number, direction: string }) => {
    const params: any = {};
    if (cursor) {
        params.lastSeenId = cursor;
    }
    params.direction = direction;
    fetchRoles(params);
};

const handleSearch = (query: string) => {
    searchQuery.value = query;
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(() => {
        fetchRoles();
    }, 500); // 500ms delay for debouncing
};

const handleAddClick = () => {
    isEditing.value = false;
    currentRoleId.value = "";
    resetForm();
    isDrawerOpen.value = true;
};

const handleEditClick = (row: { name: string, roleId: string, description: string, permissions: string[] }) => {
    isEditing.value = true;
    currentRoleId.value = row.roleId;
    form.name = row.name;
    form.description = row.description || "";
    form.permissions = row.permissions.map((p: string) => ({
        label: p,
        value: p
    }));
    isDrawerOpen.value = true;
};

const handleDeleteClick = async (row: { name: string, roleId: string }) => {
    if (confirm(`Are you sure you want to delete the role "${row.name}"?`)) {
        tableSuccessMessage.value = "";
        tableError.value = "";
        try {
            const message = await roleStore.deleteRole(row.roleId);
            tableSuccessMessage.value = message || "Role deleted successfully!";
            fetchRoles();
            
            setTimeout(() => {
                tableSuccessMessage.value = "";
            }, 5000);
        } catch (err: any) {
            tableError.value = err.response?.data?.error?.message || err.message || "Failed to delete role";
            console.error("Failed to delete role:", err);
        }
    }
};

const resetForm = () => {
    form.name = '';
    form.description = '';
    form.permissions = [];
    drawerSuccessMessage.value = "";
    drawerError.value = "";
    tableSuccessMessage.value = "";
    tableError.value = "";
    roleStore.error = null;
};

const closeDrawer = () => {
    isDrawerOpen.value = false;
    resetForm();
};

const handleFormSubmit = async () => {
    if (roleStore.loading) return;
    
    drawerSuccessMessage.value = "";
    drawerError.value = "";
    roleStore.error = null;

    try {
        const permissionNames = form.permissions.map(p => p.value);
        if (isEditing.value) {
            await roleStore.updateRole(currentRoleId.value, form.name, form.description, permissionNames);
            drawerSuccessMessage.value = "Role updated successfully!";
        } else {
            await roleStore.createRole(form.name, form.description, permissionNames);
            resetForm();
            drawerSuccessMessage.value = "Role created successfully!";
        }
        
        // Refresh the list
        fetchRoles();

        if (!isEditing.value) {
            // Hide success message after 5 seconds for creation
            setTimeout(() => {
                drawerSuccessMessage.value = "";
            }, 5000);
        }
    } catch (err: any) {
        drawerError.value = err.response?.data?.error?.message || err.response?.data?.message || err.message || "Failed to process role";
        console.error("Failed to process role:", err);
    }
};
</script>