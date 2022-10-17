import { reqCartList,reqDeleteCart,reqCheckedChange } from "@/api";

const state = {
    cartList: [{}],
};

const mutations = {
    GETCARTLIST(state, cartList) {    
        state.cartList = cartList;
    },
};

const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
            console.log(result.data)
        }
    },
    async deleteCart({ commit }, id) {
        let result = await reqDeleteCart(id);
        console.log(commit)
        if (result.code == 200) {
            console.log(result)
        }
    },
    async changeIsChecked({ commit },{id,isChecked}) {
        let result = await reqCheckedChange(id, isChecked==true?'1':'0');
        console.log(commit)
        if (result.code == 200) {
            console.log('@@',result)
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