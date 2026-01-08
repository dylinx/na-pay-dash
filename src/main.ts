import './assets/main.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import axios from 'axios'

//axios.defaults.baseURL = 'https://74d135259eec.ngrok-free.app/v1'
axios.defaults.baseURL = 'https://napay.dylinx.com/v1'

// Add global 401 interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('np_access')
      localStorage.removeItem('np_metadata')
      // Use window.location as router might not be fully available or circular dependency
      if (window.location.pathname !== '/signin') {
        window.location.href = '/signin'
      }
    }
    return Promise.reject(error)
  }
)
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(axios)
app.use(VueApexCharts)

app.mount('#app')
