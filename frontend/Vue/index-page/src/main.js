import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'

require('dotenv').config()

// import dotenv from 'dotenv'
// dotenv.config()

//css
import './assets/reset.css'
import './assets/global.css'
//components
import HeaderDefault from './components/HeaderDefault.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


Vue.component("HeaderDefault", HeaderDefault)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
