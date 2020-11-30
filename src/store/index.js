import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

import modules from './modules'

//存储状态的数据容器
const state = {

}

//储存只读的计算属性数据容器
const getters = {

}

//包含n个用来间接修改state的函数对象
const actions = {

}

//包含n个直接修改state的函数对象
const mutations = {

}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules
})