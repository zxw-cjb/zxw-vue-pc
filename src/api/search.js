import request from '@utils/request';

//获取所有的商品数据
export const reqGetProductList = (data) => {
    return request({
        method: "POST",
        url: "/list",
        data
    })
}