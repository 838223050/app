import { reqCategoryList, reqFloorList, reqGetBannerList } from "@/api";

const state = {
    categoryList: [],
    bannerList: [],
    floorlist: [],
};

const mutations = {
    CATEGORYLIST(state, categoryList) {    
        state.categoryList = categoryList;
    },
    BANNERLIST(state,bannerlist) {
        state.bannerList = bannerlist;
    },
    FLOORLIST(state,floorlist) {
        state.floorlist = floorlist;
    }

};

const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
            console.log(result.data)
        }
    },
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit('BANNERLIST', result.data)
            console.log(result.data)
        }
    },
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            commit('FLOORLIST', result.data)
            console.log(result.data)
        }
    }
};

const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}