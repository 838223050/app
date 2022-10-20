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
// 删除购物车项目
export const reqDeleteCart = (id) => requests({
    method: 'delete',
    url:`/cart/deleteCart/${id}`
})
// 改变购物车勾选情况
export const reqCheckedChange = (id, isChecked) => requests({
    method: 'get',
    url:`/cart/checkCart/${id}/${isChecked}`
})
// 获取验证码
export const reqVerifyCode = (phone) => requests({
    method: 'get',
    url:`/user/passport/sendCode/${phone}`
})
// 注册
export const reqRegister = (data) => requests({
    method: 'post',
    url: '/user/passport/register',
    data
})
// 登录
export const reqLogin = (data) => requests({
    method: 'post',
    url: '/user/passport/login',
    data
})
// 获取用户信息（需要header中有token）
export const reqGetUserInfo = () => requests({
    method: 'get',
    url:'/user/passport/auth/getUserInfo'
})
// 登录状态注销
export const reqLogout = () => requests({
    method: 'get',
    url:'/user/passport/logout'
})
// 获取用户地址列表
export const reqUserAddress = () => requests({
    method: 'get',
    url:'/user/userAddress/auth/findUserAddressList'
})

export const reqUserTradeList = () => requests({
    method: 'get',
    url:'order/auth/trade'
})