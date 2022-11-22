import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import { createStore } from 'vuex'

const axiosInstance = axios.create({
  withCredentials: true,
})


// Create a new store instance.
const store = createStore({
  state () {
    return {
      loggedIn:false
    }
  },
  mutations: {
    logStat (state) {
      state.loggedIn = true;
    }
  }
})

const app = createApp(App)
app.config.globalProperties.$axios = { ...axiosInstance }
app.use(router).use(store).mount('#app')
