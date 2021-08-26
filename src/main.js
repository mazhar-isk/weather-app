import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueGeolocation from 'vue-browser-geolocation'
import VueAxios from 'vue-axios'
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueGeolocation);

axios.defaults.baseURL = process.env.VUE_APP_API_URL
Vue.use(VueAxios, axios);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
