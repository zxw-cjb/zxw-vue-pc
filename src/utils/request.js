// import axios from "axios";

// const instance = axios.create({
//     baseURL: "/api", //公共的基础路径
//     headers: {

//     }
// })

// //设置请求拦截器
// instance.interceptors.request.use(
//     (config) => {
//         return config;
//     })

// instance.interceptors.response.use(
//     (response) => {
//         if (response.data.code === 200) {
//             return response.data.data;
//         }

//         return Promise.reject(response.data.message)
//     },

//     (error) => {
//         const message = error.message || "网络错误";

//         return Promise.reject(message)
//     }
// )

// export default instance;

/* 
  封装axios拦截器
    1. 设置公共的请求地址前缀
    2. 请求拦截器：添加公共参数
    3. 响应拦截器: 
      成功：返回成功的Promise，值为成功的数据
      失败：返回失败的Promise，值为失败的原因
*/
import axios from "axios";
import {
  Message,
} from "element-ui"

//引入进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const instance = axios.create({
  //  / 就是当前服务器地址
  baseURL: "/api", // 公共的基础路径
  headers: {
    // token: 'xxx' // 不行，登录接口不需要
  },
});

// 设置请求拦截器
instance.interceptors.request.use(
  (config) => {
    // config 请求的配置对象
    // 将来发送请求（请求地址，请求参数，请求方式等）都会在config中找

    // 修改config，用来添加公共的请求参数
    // if (token) {
    //   config.headers.token = token;
    // }

    //开始进度条
    NProgress.start();

    return config;
  }
  // 初始化Promise.resolve()返回默认成功的Promise，只会触发成功的回调
  // () => {},
);
// 设置响应拦截器
instance.interceptors.response.use(
  // 响应成功：当响应状态码为 2xx
  (response) => {
    /* 
      响应成功不能代表功能成功，只是代表有响应结果
        功能成功是否成功看 code
          成功：200
          失败：201 202
      
      返回一个具体为
        成功：成功的数据
        失败：失败的原因
      的结果   

      response的数据结构：
        {
          headers: {},
          status: {},
          request: {},
          data: { // 响应的数据
            code: 200,
            message: "成功",
            data:{
              nickName:"Administrator",
              name:"Admin",
              token: 90aa16f24d04c7d882051412f9ec45b"
            },
            ok: true 
          } 
        }
    */

    //进度条结束
    NProgress.done();

    // console.log("response", response);
    // 判断响应的code是否是200
    if (response.data.code === 200) {
      // 返回成功的响应数据
      return response.data.data;
    }

    //提示错误
    const {
      message
    } = response.data
    Message.error(message)

    // 功能失败 --> 返回失败的Promise
    return Promise.reject(message);
  },
  // 响应失败：当响应状态码不是 2xx
  (error) => {
    // console.dir(error);

    //进度条结束
    NProgress.done();

    const message = error.message || "网络错误";
    // 提示错误
    Message.error(message);
    return Promise.reject(message);
  }
);

export default instance;