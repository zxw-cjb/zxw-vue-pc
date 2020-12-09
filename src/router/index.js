import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "../store";

//路由懒加载
const Home = () => import( /* webpackChunkName: "Home" */ "../views/Home");
const Login = () => import( /* webpackChunkName: "Login" */ "../views/Login");
const Register = () => import( /* webpackChunkName: "Register" */ "../views/Register");
const Search = () => import( /* webpackChunkName: "Search" */ "../views/Search");
const Detail = () => import( /* webpackChunkName: "Detail" */ "../views/Detail");
const AddCartSuccess = () => import( /* webpackChunkName: "AddCartSuccess" */ "../views/AddCartSuccess");
const ShopCart = () => import( /* webpackChunkName: "ShopCart" */ "../views/ShopCart");
const Trade = () => import( /* webpackChunkName: "Trade" */ "../views/Trade");
const Pay = () => import( /* webpackChunkName: "Pay" */ "../views/Pay");
const PaySuccess = () => import( /* webpackChunkName: "PaySuccess" */ "../views/PaySuccess");
const Center = () => import( /* webpackChunkName: "Center" */ "../views/Center");

// import Home from '../views/Home';
// import Login from '../views/Login';
// import Register from '../views/Register';
// import Search from '../views/Search';
// import Detail from '@views/Detail'
// import ShopCart from '@views/ShopCart'
// import AddCartSuccess from '@views/AddCartSuccess'
// import Trade from '@views/Trade'
// import Pay from '@views/Pay'
// import PaySuccess from '@views/PaySuccess'
// import Center from '@views/Center'



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

const router = new VueRouter({
    //vue-routre默认使用hash模式来显示
    //hash地址上有#
    //history没有#
    mode: "history",
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
        },
        //命名路由
        {
            name: "detail",
            path: "/detail/:id",
            component: Detail
        },
        {
            name: "shopcart",
            path: "/shopcart",
            component: ShopCart
        },
        {
            name: "addcartsuccess",
            path: "/addcartsuccess",
            component: AddCartSuccess,
            //路由独享守卫,只有当在detail页面添加到了购物车才可以访问addcartsuccess页面
            /*  beforeEnter: (to, from, next) => {
                 console.log(to, from, next);
                 //能看到addcartsuccess页面的条件
                 //1.是从datail中跳转过来的 2.有数据
                 //1.是从detail中跳转过来 2.sessionStorage中有商品的数据
                 if (from.name === "detail" && sessionStorage.getItem("cart")) {
                     return next()
                 }

                 next("/shopcart")
             } */
        },
        //核对订单信息
        {
            name: "trade",
            path: "/trade",
            component: Trade
        },
        //提交订单
        {
            name: "pay",
            path: "/pay",
            component: Pay
        },
        //支付成功页面
        {
            name: "paysuccess",
            path: "/paysuccess",
            component: PaySuccess
        },
        //查看其他订单页面
        {
            name: "center",
            path: "/center",
            component: Center
        },
    ],

    //每次切换路由页面滚动条位置
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        }
    }
})

const permissionPaths = ["/trade", "/pay", "/center"]

router.beforeEach((to, from, next) => {
    // console.log(to);
    // console.log(from);
    // console.log(next);
    //to.path指url地址上的showcart  paysuccess  pay等等
    //如果URL地址上有数组中的任意一个，没有登录，不然就跳转到登录页面
    if (permissionPaths.indexOf(to.path) > -1 && !store.state.user.token) {
        return next("/login")
    }

    next()
})

export default router