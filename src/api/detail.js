import request from '@utils/request';

//获取商品详情数据s
export const reqGetProductDetail = (id) => {
    return request({
        method: "GET",
        url: `/item/${id}`
    })
}