// 使用 Mock
var Mock = require('mockjs')

Mock.Random.ctitle()
var data = Mock.mock({
    // // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    // 'list|1-10': [{
    //     // 属性 id 是一个自增数，起始值为 1，每次增 1
    //     'id|+1': 1
    // }]

    //随机中文标题，长度为4位
    title: "@ctitle(4)",
    //"subTitle|3-10"属性为subTitle的值为数组，长度为3-10位
    //@ctitle（1,4）随机中文标题，长度为1到4
    "subTitle|3-10": ["@ctitle(1,4)"],
    //carouclList属性的值为数组，长度为4位
    //@image(大小，背景色，字体色，图片格式，图片内容)
    "caroucelList|4": ["@image('200x200','@color','#fff','png','@cname')"]

})
// 输出结果,
console.log(data)

// {
//     list: [ { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 } ]
//   }