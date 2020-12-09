import Vue from 'vue';
import VueLazyload from 'vue-lazyload'


import loading from '../assets/imgs/loading.gif'
Vue.use(VueLazyload, {
    loading: loading,
})