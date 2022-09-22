import requests from './request'
import mockRequests from './mockajax.js'

export const reqCategoryList = () => {
    return requests.get('product/getBaseCategoryList');
}
export const doSearch = (query) => {
    return requests({url:'search',query})
}

export const reqGetBannerList = () => {
    return mockRequests.get('/banner')
}