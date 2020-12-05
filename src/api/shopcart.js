import request from '@utils/request';

//获取购物车数据
export const reqGetCartList = () => {
    return request({
        method: "GET",
        url: `/cart/cartList`
    })
}

//增加，减少购物车数据
export const reqUpdateCartCount = (skuId, skuNum) => {
    return request({
        method: "POST",
        url: `/cart/addToCart/${ skuId }/${ skuNum }`
    })
}

//切换商品选中状态
export const reqCheckShowCartList = (skuId, isChecked) => {
    return request({
        method: "GET",
        url: `/cart/checkCart/${skuId}/${isChecked}`
    })
}

//删除商品数据
export const reqDelShowCartList = (skuId) => {
    return request({
        method: "DELETE",
        url: `/cart/deleteCart/${skuId}`
    })
}