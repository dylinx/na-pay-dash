<template>
  <FullScreenLayout>
    <div class="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div
        class="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900"
      >
        <div class="flex flex-col flex-1 w-full lg:w-1/2">
          <div class="w-full max-w-md pt-10 mx-auto">
            <router-link
              to="/"
              class="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg
                class="stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M12.7083 5L7.5 10.2083L12.7083 15.4167"
                  stroke=""
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Back to dashboard
            </router-link>
          </div>
          <!-- Form -->
          <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div class="mb-5 sm:mb-8">
              <h1
                class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md"
              >
                Request a new account
              </h1>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Fill in the form below to request a new account!
              </p>
            </div>
            <div>
              <form @submit.prevent="handleSubmit">
                <div class="space-y-5">
                  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <!-- First Name -->
                    <div class="sm:col-span-1">
                      <label
                        for="fname"
                        class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                      >
                        First Name<span class="text-error-500">*</span>
                      </label>
                      <input
                        v-model="firstName"
                        type="text"
                        id="fname"
                        name="fname"
                        placeholder="Enter your first name"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      />
                    </div>
                    <!-- Last Name -->
                    <div class="sm:col-span-1">
                      <label
                        for="lname"
                        class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                      >
                        Last Name<span class="text-error-500">*</span>
                      </label>
                      <input
                        v-model="lastName"
                        type="text"
                        id="lname"
                        name="lname"
                        placeholder="Enter your last name"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      />
                    </div>
                  </div>
                  <!-- Email -->
                  <div>
                    <label
                      for="email"
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Email<span class="text-error-500">*</span>
                    </label>
                    <input
                      v-model="email"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>
                  <!-- Phone Number -->
                  <div>
                    <label
                      for="phone_number"
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Phone Number<span class="text-error-500">*</span>
                    </label>
                    <input
                      v-model="phone_number"
                      type="number"
                      id="phone_number"
                      name="phone_number"
                      placeholder="Enter your phone number"
                      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>
                  <!-- Postal Address -->
                  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <!-- postal_address -->
                    <div class="sm:col-span-1">
                      <label
                        for="postal_address"
                        class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                      >
                        Postal Address<span class="text-error-500">*</span>
                      </label>
                      <input
                        v-model="postal_address"
                        type="text"
                        id="postal_address"
                        name="postal_address"
                        placeholder="Enter your postal address"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      />
                    </div>
                    <!-- postal_code -->
                    <div class="sm:col-span-1">
                      <label
                        for="postal_code"
                        class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                      >
                        Postal Code<span class="text-error-500">*</span>
                      </label>
                      <input
                        v-model="postal_code"
                        type="text"
                        id="postal_code"
                        name="postal_code"
                        placeholder="Enter your postal code"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      />
                    </div>
                  </div>
                  <!-- Physical Location -->
                  <div>
                    <label
                      for="physical_location"
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Physical Location<span class="text-error-500">*</span>
                    </label>
                    <input
                      v-model="physical_location"
                      type="text"
                      id="physical_location"
                      name="physical_location"
                      placeholder="Enter your physical location"
                      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>

                  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <!-- Country -->
                    <div>
                      <label
                        for="country"
                        class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                      >
                        Country<span class="text-error-500">*</span>
                      </label>
                      <select
                        v-model="country"
                        type="text"
                        id="country"
                        name="country"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      >
                        <option value="">Select Country</option>
                        <option value="KE">Kenya</option>
                        <option value="NG">Nigeria</option>
                        <option value="GH">Ghana</option>
                        <option value="ZW">Zimbabwe</option>
                        <option value="ZM">Zambia</option>
                        <option value="MW">Malawi</option>
                        <option value="MZ">Mozambique</option>
                      </select>
                    </div>
                    <!-- website -->
                    <div>
                      <label
                        for="website"
                        class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                      >
                        Website<span class="text-error-500">*</span>
                      </label>
                      <input
                        v-model="website"
                        type="text"
                        id="website"
                        name="website"
                        placeholder="Enter your website"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      />
                    </div>
                  </div>
                  <!-- Button -->
                  <div>
                    <button
                      type="submit"
                      class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
              <div class="mt-5">
                <p
                  class="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start"
                >
                  Already have an account?
                  <router-link
                    to="/signin"
                    class="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >Sign In</router-link
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="relative items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid"
        >
          <div class="flex items-center justify-center z-1">
            <common-grid-shape />
            <div class="flex flex-col items-center max-w-xs">
              <router-link to="/" class="block mb-4">
                <img width="{231}" height="{48}" src="/images/logo/auth-logo.svg" alt="Logo" />
              </router-link>
              <p class="text-center text-gray-400 dark:text-white/60">
                fast, secure and reliable payment services
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FullScreenLayout>
</template>

<script setup lang="ts">
import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
import CommonGridShape from '@/components/common/CommonGridShape.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone_number = ref('')
const country = ref('')
const website = ref('')
const postal_address = ref('')
const postal_code = ref('')
const physical_location = ref('')

const loading = ref(false)

const router = useRouter()
const authStore = useAuthStore()


const handleSubmit = async () => {
  if (loading.value) return
  
  loading.value = true
  try {
    const otpToken = await authStore.accountRequest(
      firstName.value,
      lastName.value,
      email.value,
      phone_number.value,
      country.value,
      website.value,
      postal_address.value,
      postal_code.value,
      physical_location.value
    )
    router.push({ path: '/signin'})
    // Do not set loading = false here, keep it disabled until redirect completes
  } catch (error) {
    console.error('Signup failed:', error)
    loading.value = false
    // Optional: Show error message to user
    alert('Signup failed.')
  }
}
</script>
