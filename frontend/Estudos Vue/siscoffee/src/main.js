import Vue from 'vue'
import App from './App.vue'

import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

Vue.component('font-awesome-icon', FontAwesomeIcon)
import HeaderSiscoffee from './components/HeaderSiscoffee.vue'
Vue.component("HeaderSiscoffee", HeaderSiscoffee)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
