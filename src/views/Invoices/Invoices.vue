<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Recurring Links" desc="List of all recurring links">
        <TableSkeleton 
          v-if="activityStore.loading && !activityStore.activities.length" 
          :columnCount="3" 
          :rowCount="5" 
        />

        <BasicTableOne
          v-else
          :columns="columns"
          :data="activityStore.activities"
          :pagination="activityStore.pagination"
          @pageChange="handlePageChange"
        >
        </BasicTableOne>
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import ComponentCard from "@/components/common/ComponentCard.vue";
import BasicTableOne from "@/components/tables/basic-tables/BasicTableOne.vue";
import TableSkeleton from "@/components/ui/TableSkeleton.vue";
import { useUserRoleStore } from "@/stores/user_role";

const currentPageTitle = ref("Recurring Links");
const activityStore = useUserRoleStore();
const searchQuery = ref("");
let searchTimeout: ReturnType<typeof setTimeout> | null = null;

const columns = [
    { header: "Activity", key: "action" },
    { header: "IP Address", key: "ip" },
    { header: "Date", key: "createdAt" },
];

onMounted(() => {
    fetchActivities();
});

const fetchActivities = (params: any = {}) => {
    const queryParams = {
        ...params,
        qr: searchQuery.value || undefined
    };
    console.log(queryParams);
    activityStore.getUserActivities(queryParams);
};

const handlePageChange = ({ cursor, direction }: { cursor: string | number, direction: string }) => {
    const params: any = {};
    if (cursor) {
        params.lastSeenId = cursor;
    }
    params.direction = direction;
    fetchActivities(params);
};

const handleSearch = (query: string) => {
    searchQuery.value = query;
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(() => {
        fetchActivities({ qr: searchQuery.value });
    }, 500); // 500ms delay for debouncing
};

</script>