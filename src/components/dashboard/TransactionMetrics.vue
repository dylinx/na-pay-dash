<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
    <!-- Collections -->
    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 text-brand-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
          />
        </svg>
      </div>

      <div class="flex items-end justify-between mt-5">
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Collections</span>
          <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {{ formatNumber(collectionCount) }}
          </h4>
        </div>

        <span
          class="flex items-center gap-1 rounded-full bg-success-50 py-0.5 pl-2 pr-2.5 text-sm font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500"
        >
          <svg
            class="fill-current"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.56462 1.62393C5.70193 1.47072 5.90135 1.37432 6.12329 1.37432C6.1236 1.37432 6.12391 1.37432 6.12422 1.37432C6.31631 1.37415 6.50845 1.44731 6.65505 1.59381L9.65514 4.5918C9.94814 4.88459 9.94831 5.35947 9.65552 5.65246C9.36273 5.94546 8.88785 5.94562 8.59486 5.65283L6.87329 3.93247L6.87329 10.125C6.87329 10.5392 6.53751 10.875 6.12329 10.875C5.70908 10.875 5.37329 10.5392 5.37329 10.125L5.37329 3.93578L3.65516 5.65282C3.36218 5.94562 2.8873 5.94547 2.5945 5.65248C2.3017 5.35949 2.30185 4.88462 2.59484 4.59182L5.56462 1.62393Z"
              fill=""
            />
          </svg>
          11.01%
        </span>
      </div>
    </div>

    <!-- Disbursements -->
    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 text-orange-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      </div>

      <div class="flex items-end justify-between mt-5">
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Disbursements</span>
          <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {{ formatNumber(disbursementCount) }}
          </h4>
        </div>

        <span
          class="flex items-center gap-1 rounded-full bg-error-50 py-0.5 pl-2 pr-2.5 text-sm font-medium text-error-600 dark:bg-error-500/15 dark:text-error-500"
        >
          <svg
            class="fill-current"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.31462 10.3761C5.45194 10.5293 5.65136 10.6257 5.87329 10.6257C5.8736 10.6257 5.8739 10.6257 5.87421 10.6257C6.0663 10.6259 6.25845 10.5527 6.40505 10.4062L9.40514 7.4082C9.69814 7.11541 9.69831 6.64054 9.40552 6.34754C9.11273 6.05454 8.63785 6.05438 8.34486 6.34717L6.62329 8.06753L6.62329 1.875C6.62329 1.46079 6.28751 1.125 5.87329 1.125C5.45908 1.125 5.12329 1.46079 5.12329 1.875L5.12329 8.06422L3.40516 6.34719C3.11218 6.05439 2.6373 6.05454 2.3445 6.34752C2.0517 6.64051 2.05185 7.11538 2.34484 7.40818L5.31462 10.3761Z"
              fill=""
            />
          </svg>
          9.05%
        </span>
      </div>
    </div>

    <!-- Refunds -->
    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 text-red-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
      </div>

      <div class="flex items-end justify-between mt-5">
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Refunds</span>
          <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {{ formatNumber(refundCount) }}
          </h4>
        </div>

        <span
          class="flex items-center gap-1 rounded-full bg-blue-50 py-0.5 pl-2 pr-2.5 text-sm font-medium text-blue-600 dark:bg-blue-500/15 dark:text-blue-500"
        >
          <svg
            class="fill-current"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.56462 1.62393C5.70193 1.47072 5.90135 1.37432 6.12329 1.37432C6.1236 1.37432 6.12391 1.37432 6.12422 1.37432C6.31631 1.37415 6.50845 1.44731 6.65505 1.59381L9.65514 4.5918C9.94814 4.88459 9.94831 5.35947 9.65552 5.65246C9.36273 5.94546 8.88785 5.94562 8.59486 5.65283L6.87329 3.93247L6.87329 10.125C6.87329 10.5392 6.53751 10.875 6.12329 10.875C5.70908 10.875 5.37329 10.5392 5.37329 10.125L5.37329 3.93578L3.65516 5.65282C3.36218 5.94562 2.8873 5.94547 2.5945 5.65248C2.3017 5.35949 2.30185 4.88462 2.59484 4.59182L5.56462 1.62393Z"
              fill=""
            />
          </svg>
          2.5%
        </span>
      </div>
    </div>

    <!-- Settlements -->
    <div
      class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 text-green-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75m0 1.5v.75m0 1.5v.75m0 1.5V15m1.5 1.5h1.5m1.5-1.5V15m-1.5 1.5H7.5m1.5-1.5h1.5m1.5 1.5V15m-1.5 1.5H12m1.5-1.5h1.5"
          />
        </svg>
      </div>

      <div class="flex items-end justify-between mt-5">
        <div>
          <span class="text-sm text-gray-500 dark:text-gray-400">Settlements</span>
          <h4 class="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {{ formatNumber(settlementCount) }}
          </h4>
        </div>

        <span
          class="flex items-center gap-1 rounded-full bg-success-50 py-0.5 pl-2 pr-2.5 text-sm font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500"
        >
          <svg
            class="fill-current"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.56462 1.62393C5.70193 1.47072 5.90135 1.37432 6.12329 1.37432C6.1236 1.37432 6.12391 1.37432 6.12422 1.37432C6.31631 1.37415 6.50845 1.44731 6.65505 1.59381L9.65514 4.5918C9.94814 4.88459 9.94831 5.35947 9.65552 5.65246C9.36273 5.94546 8.88785 5.94562 8.59486 5.65283L6.87329 3.93247L6.87329 10.125C6.87329 10.5392 6.53751 10.875 6.12329 10.875C5.70908 10.875 5.37329 10.5392 5.37329 10.125L5.37329 3.93578L3.65516 5.65282C3.36218 5.94562 2.8873 5.94547 2.5945 5.65248C2.3017 5.35949 2.30185 4.88462 2.59484 4.59182L5.56462 1.62393Z"
              fill=""
            />
          </svg>
          5.2%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  collectionCount: number
  disbursementCount: number
  refundCount: number
  settlementCount: number
}

defineProps<Props>()

const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num)
}
</script>


