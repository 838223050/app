import { reqSearchList } from "@/api";
const state = {
    searchList:{}
};

const mutations = {
    SETSEARCHLIST(state,searchList) {
        state.searchList = searchList;
    }
};

const actions = {
    async getSearchList({ commit }, params = {}) {
        console.log('update',params)
        let res = await reqSearchList(params);
        if (res.code == 200) {
            commit('SETSEARCHLIST', res.data);
            console.log(res.data);
        }
    }
};

const getters = {
    attrsList(state) {
        return state.searchList.attrsList||[];
    },
    goodsList(state) {
        return state.searchList.goodsList||[];
    },
    trademarkList(state) {
        return state.searchList.trademarkList||[];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}