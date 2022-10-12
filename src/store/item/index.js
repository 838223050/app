import { reqItem } from '@/api/index';

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
};

const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}