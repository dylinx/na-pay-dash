<template>
  <router-link to="/" class="lg:hidden">
    <img class="dark:hidden" src="/images/logo/logo.svg" width="100" height="100" alt="Logo" />
    <img class="hidden dark:block" src="/images/logo/logo.svg" width="100" height="100" alt="Logo" />
  </router-link>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
