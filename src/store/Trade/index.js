import { reqUserAddress, reqUserTradeList } from "@/api";

const state = {
    addressInfo: null,
    tradeInfo: null,
};

const mutations = {
    GETUSERADDRESS(state,data) {
        state.addressInfo = data;
    },
    GETUSERTRADELIST(state,data) {
        state.tradeInfo = data;
    }
};

const actions = {
    async getUserAddressInfo({ commit },data) {
        let result = await reqUserAddress(data);
        console.log(result.message);
        if (result.code == 200)
        {
            commit('GETUSERADDRESS',result.data)
            return 'ok'
        }
        else {
            return Promise.reject(result.message)
        }
    },
    async getUserTradeList({ commit },data) {
        let result = await reqUserTradeList(data);
        console.log(result.message);
        if (result.code == 200)
        {
            commit('GETUSERTRADELIST',result.data)
            return 'ok'
        }
        else {
            return Promise.reject(result.message)
        }
    },

};

const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}