//汇总所有的vuex组件模块

import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'

//统一暴露出去
export default {
    home,
    search,
    detail,
    shopcart
}