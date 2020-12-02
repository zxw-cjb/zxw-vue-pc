import Vue from 'vue'
import App from './App.vue'

import router from "./router"
import store from './store'

import './styles/reset.css'

import './plugins/element.js'


//引入mockServer，为了加载里面代码
//里面的代码一但加载，就去启动mock服务器，从而拦截相应的请求
import './mock/mokeServer'

//引入iconfont图标
import './styles/iconfont.css'

Vue.config.productionTip = false

/* esline-disable no-new */
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: h => h(App),
  router,
  store,
}).$mount('#app')