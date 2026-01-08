<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th
              v-for="col in columns"
              :key="col.key"
              class="px-5 py-3 text-left sm:px-6"
              :class="col.class"
            >
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                {{ col.header }}
              </p>
            </th>
            <th v-if="actions && actions.length" class="px-5 py-3 text-left sm:px-6">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                Actions
              </p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(row, rowIndex) in data"
            :key="rowIndex"
            class="border-t border-gray-100 dark:border-gray-800"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              class="px-5 py-4 sm:px-6"
              :class="col.rowClass"
            >
              <slot :name="col.key" :row="row">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                  {{ row[col.key] }}
                </p>
              </slot>
            </td>
            
            <td v-if="actions && actions.length" class="px-5 py-4 sm:px-6">
                <div class="flex items-center gap-2">
                    <button
                        v-for="(action, actionIndex) in actions"
                        :key="actionIndex"
                        @click="action.onClick(row)"
                        class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        :class="action.className"
                    >
                        <component :is="action.icon" v-if="action.icon" class="w-5 h-5" />
                        <span v-else>{{ action.label }}</span>
                    </button>
                </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Pagination -->
    <div v-if="pagination" class="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 dark:border-gray-800">
      <div class="flex flex-1 justify-between sm:hidden">
        <button
          :disabled="!pagination.has_prev"
          @click="$emit('pageChange', { cursor: pagination.prev_cursor, direction: 'prev' })"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          :class="{ 'opacity-50 cursor-not-allowed': !pagination.has_prev }"
        >
          Previous
        </button>
        <button
          :disabled="!pagination.has_next"
          @click="$emit('pageChange', { cursor: pagination.next_cursor, direction: 'next' })"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          :class="{ 'opacity-50 cursor-not-allowed': !pagination.has_next }"

        >
          Next
        </button>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700 dark:text-gray-400">
            Showing
            <span class="font-medium">{{ pagination.limit }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
                :disabled="!pagination.has_prev"
                @click="$emit('pageChange', { cursor: pagination.prev_cursor, direction: 'prev' })"
                class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-700 dark:hover:bg-gray-700"
                :class="{ 'opacity-50 cursor-not-allowed': !pagination.has_prev }"
            >
              <span class="sr-only">Previous</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
              </svg>
            </button>
            <button
                :disabled="!pagination.has_next"
                @click="$emit('pageChange', { cursor: pagination.next_cursor, direction: 'next' })"
                class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-700 dark:hover:bg-gray-700"
                :class="{ 'opacity-50 cursor-not-allowed': !pagination.has_next }"
            >
              <span class="sr-only">Next</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


const props = defineProps<{
  columns: { header: string; key: string; class?: string; rowClass?: string }[];
  data: any[];
  actions?: { label: string; onClick: (row: any) => void; icon?: any; className?: string }[];
  pagination?: {
      has_next: boolean;
      has_prev: boolean;
      next_cursor: number | string | null;
      prev_cursor: number | string | null;
      limit: number;
  };
}>()

defineEmits(['pageChange'])
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
