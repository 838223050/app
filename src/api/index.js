import requests from './request'
import mockRequests from './mockajax.js'
// 获取相关分类商品
export const reqCategoryList = () => {
    return requests.get('product/getBaseCategoryList');
}
// 商品搜索接口
// export const doSearch = (query) => {
//     return requests({url:'search',query})
// }
// 获取轮播图
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取首页推荐商品数据
export const reqFloorList = () => mockRequests.get('/floor')
// 搜索页面相关数据，包括商标，属性，和相关商品的信息
export const reqSearchList = (params) => requests({
    method: 'post',
    url: '/list',
    data:params
});
// 获取商品详情
export const reqItem = (id) => requests({
    method: 'get',
    url: `/item/${id}`,
})
// 添加到购物车
export const reqAddCart = (id, num) => {
    return requests({
        method: 'post',
        url: `/cart/addToCart/${id}/${num}`,
    
    })
}
// 获取购物车列表
export const reqCartList = () => requests({
    method: 'get',
    url:'/cart/cartList'
})

export const reqDeleteCart = (id) => requests({
    method: 'delete',
    url:`/cart/deleteCart/${id}`
})

export const reqCheckedChange = (id, isChecked) => requests({
    method: 'get',
    url:`/cart/checkCart/${id}/${isChecked}`
})