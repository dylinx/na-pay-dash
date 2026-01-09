<template>
  <div class="relative" ref="selectRef">
    <div
      @click="toggleDropdown"
      class="dark:bg-dark-900 h-11 flex items-center w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 cursor-pointer"
      :class="{ 'border-brand-300 ring-3 ring-brand-500/10 dark:border-brand-800': isOpen }"
    >
      <span v-if="!selectedLabel" class="text-gray-400"> {{ props.placeholder }} </span>
      <span v-else class="text-gray-800 dark:text-white/90">{{ selectedLabel }}</span>
      
      <svg
        class="ml-auto transition-transform duration-200"
        :class="{ 'transform rotate-180': isOpen }"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-800"
      >
        <ul
          class="overflow-y-auto divide-y divide-gray-100 custom-scrollbar max-h-60 dark:divide-gray-800"
          role="listbox"
        >
          <li
            v-for="option in props.options"
            :key="option.value"
            @click="selectOption(option)"
            class="relative flex items-center w-full px-4 py-2.5 border-transparent cursor-pointer first:rounded-t-lg last:rounded-b-lg dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
            :class="[
                isSelected(option) ? 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400' : '',
                option.disabled ? 'opacity-60 cursor-not-allowed bg-gray-50/50 dark:bg-white/[0.02]' : '',
                option.class || ''
            ]"
            role="option"
            :aria-selected="isSelected(option)"
          >
            <span class="grow text-sm flex items-center gap-2">
                {{ option.label }}
                <svg v-if="option.disabled" class="w-3.5 h-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </span>
            <svg
              v-if="isSelected(option)"
              class="w-4 h-4 text-brand-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

interface Option {
  label: string
  value: any
  disabled?: boolean
  class?: string
}

const props = defineProps({
  options: {
    type: Array as () => Option[],
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Select option...',
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const selectRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  const option = props.options.find((opt) => opt.value === props.modelValue)
  return option ? option.label : ''
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: Option) => {
  if (option.disabled) return
  
  emit('update:modelValue', option.value)
  emit('change', option)
  isOpen.value = false
}

const isSelected = (option: Option) => {
  return props.modelValue === option.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
