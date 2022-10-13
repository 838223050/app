import { reqItem,reqAddCart } from '@/api/index';

const state = {
    itemData: {},
};

const mutations = {
    GETITEM(state, itemData) {    
        state.itemData = itemData;
    },

};

const actions = {
    async getItem({ commit },id) {
        let result = await reqItem(id);
        if (result.code == 200) {
            commit('GETITEM', result.data)
            console.log(result.data)
        }
    },
    async addCart({ commit },data) {
        console.log(commit,data)
        let result = await reqAddCart(data.id, data.num);
        console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject("fail to add cart");
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