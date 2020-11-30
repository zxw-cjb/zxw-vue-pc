import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home';
import Login from '../views/Login';
import Register from '../views/Register';
import Search from '../views/Search';



//重写push和replace方法
//目的：为了让编程式导航重复点击时不再报错
const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (localaction, onComplete, onAbort) {
    //如果用户想处理失败，就处理
    if (onComplete && onAbort) {
        return push.call(this, localaction, onComplete, onAbort)
    }
    //如果用户想不处理失败，给默认值：空函数
    return push.call(this, localaction, onComplete, () => {})
}

VueRouter.prototype.replace = function (localaction, onComplete, onAbort) {
    //如果用户想处理失败，就处理
    if (onComplete && onAbort) {
        return replace.call(this, localaction, onComplete, onAbort)
    }
    //如果用户想不处理失败，给默认值：空函数
    return replace.call(this, localaction, onComplete, () => {})
}
Vue.use(VueRouter);

export default new VueRouter({
    routes: [{
            path: "/",
            component: Home
        },
        {
            path: "/login",
            component: Login,
            //当组件加载显示时，meta中的参数会传到$route中
            //当组件不加载显示时，meta中的参数不会传
            meta: {
                isFooterHide: true,
            }
        },
        {
            path: "/register",
            component: Register,
            meta: {
                isFooterHide: true,
            }
        },
        {
            name: "search", //这里没有定义，定义URL地址parmas时会出现错误
            path: "/search/:searchText?",
            component: Search
        }
    ]
})