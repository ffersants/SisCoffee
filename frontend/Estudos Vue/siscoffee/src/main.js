import Vue from 'vue'
import App from './App.vue'

import HeaderSiscoffee from './components/HeaderSiscoffee.vue'
Vue.component("HeaderSiscoffee", HeaderSiscoffee)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
