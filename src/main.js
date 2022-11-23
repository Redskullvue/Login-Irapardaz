import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'

const axiosInstance = axios.create({
  withCredentials: true,
})

// Edit 
// Create a new store instance.
const app = createApp(App)
app.config.globalProperties.$axios = { ...axiosInstance }
app.use(router).mount('#app')
