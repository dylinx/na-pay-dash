<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] animate-pulse">
    <div class="max-w-full overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th
              v-for="i in props.columnCount"
              :key="'th-' + i"
              class="px-5 py-3 text-left sm:px-6"
            >
              <div class="h-4 w-20 bg-gray-200 rounded dark:bg-gray-700"></div>
            </th>
            <th v-if="props.showActions" class="px-5 py-3 text-left sm:px-6">
              <div class="h-4 w-16 bg-gray-200 rounded dark:bg-gray-700"></div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="rowIndex in props.rowCount"
            :key="'row-' + rowIndex"
            class="border-t border-gray-100 dark:border-gray-800"
          >
            <td
              v-for="colIndex in props.columnCount"
              :key="'td-' + rowIndex + '-' + colIndex"
              class="px-5 py-4 sm:px-6"
            >
              <div class="h-4 w-full bg-gray-100 rounded dark:bg-gray-800/50"></div>
            </td>
            
            <td v-if="props.showActions" class="px-5 py-4 sm:px-6">
                <div class="flex items-center gap-2">
                    <div class="h-5 w-5 bg-gray-100 rounded dark:bg-gray-800/50"></div>
                    <div class="h-5 w-5 bg-gray-100 rounded dark:bg-gray-800/50"></div>
                </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TableSkeletonProps {
  columnCount?: number
  rowCount?: number
  showActions?: boolean
}

const props = withDefaults(defineProps<TableSkeletonProps>(), {
  columnCount: 3,
  rowCount: 5,
  showActions: true
})
</script>
