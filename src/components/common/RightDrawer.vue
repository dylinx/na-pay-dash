<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="ease-in-out duration-500"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in-out duration-500"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[9999] bg-gray-500/50 backdrop-blur-sm transition-opacity"
        @click="$emit('close')"
      ></div>
    </Transition>

    <!-- Drawer Panel -->
    <div
      class="fixed inset-y-0 right-0 z-[99999] flex max-w-full pl-10"
      v-if="isOpen"
    >
      <Transition
        enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
        appear
      >
        <div class="pointer-events-auto w-screen max-w-md">
          <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl dark:bg-gray-900">
            <!-- Header -->
            <div class="px-4 py-6 sm:px-6 border-b border-gray-200 dark:border-gray-800">
              <div class="flex items-start justify-between">
                <h2 class="text-base font-semibold leading-6 text-gray-900 dark:text-white" id="slide-over-title">
                  {{ title }}
                </h2>
                <div class="ml-3 flex h-7 items-center">
                  <button
                    type="button"
                    class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:bg-gray-900 dark:hover:text-gray-300"
                    @click="$emit('close')"
                  >
                    <span class="absolute -inset-2.5"></span>
                    <span class="sr-only">Close panel</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Body -->
            <div class="relative mt-6 flex-1 px-4 sm:px-6">
              <slot></slot>
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="border-t border-gray-200 px-4 py-6 sm:px-6 dark:border-gray-800">
                <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  title: string;
}>();

defineEmits(['close']);
</script>
