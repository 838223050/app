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
    async deleteCart(_, id) {
        let result = await reqDeleteCart(id);
        if (result.code == 200) {
            console.log(result)
        } else
            return result;
    },
    async changeIsChecked(_,{id,isChecked}) {
        let result = await reqCheckedChange(id, isChecked==true?'1':'0');
        if (result.code == 200) {
            console.log('@@',result)
        }
    },
    async deleteAllSelectedCart({ dispatch }, toBeDeleted) {
        let res = [];
        toBeDeleted.forEach(element => {
            let temp = dispatch('deleteCart', element.skuId);
            res.push(temp);
        });
        console.log(res)
        return Promise.all(res);
    }
};

const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}