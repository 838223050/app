import requests from './request'
import mockRequests from './mockajax.js'

export const reqCategoryList = () => {
    return requests.get('product/getBaseCategoryList');
}
export const doSearch = (query) => {
    return requests({url:'search',query})
}

export const reqGetBannerList = () => mockRequests.get('/banner')


export const reqFloorList = () => mockRequests.get('/floor')

export const reqSearchList = (params) => requests({
    method: 'post',
    url: '/list',
    data:params
});

export const reqItem = (id) => requests({
    method: 'get',
    url: `/item/${id}`,
})

export const reqAddCart = (id, num) => {
    return requests({
        method: 'post',
        url: `/cart/addToCart/${id}/${num}`,
    
    })
}