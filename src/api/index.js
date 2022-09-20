import requests from './request'

export const reqCategoryList = () => {
    return requests({url:'product/getBaseCategoryList'})
}
export const doSearch = (query) => {
    return requests({url:'search',query})
}