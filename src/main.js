import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/index'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(function (config) {
  store.dispatch('setLoadingStatus', true)
  store.dispatch('setLoadingMessage', 'Please wait...')
  return config
}, function (error) {
  store.dispatch('setLoadingStatus', false)
  store.dispatch('openSnackbar', { message: error.response.statusText })
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  store.dispatch('setLoadingStatus', false)
  return response
}, function (error) {
  store.dispatch('setLoadingStatus', false)
  store.dispatch('openSnackbar', { message: error.response.statusText })
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
