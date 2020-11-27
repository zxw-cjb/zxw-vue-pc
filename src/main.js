import Vue from 'vue'
import App from './App.vue'

import router from "./router"

import './styles/reset.css'
Vue.config.productionTip = false

/* esline-disable no-new */
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')