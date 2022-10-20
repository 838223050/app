import {  reqLogin, reqRegister,reqGetUserInfo, reqLogout } from "@/api";

const state = {
    userinfo: null
};

const mutations = {
    GETUSERINFO(state,data) {
        state.userinfo = data;
    },
    DOLOGOUT(state) {
        state.userinfo = null;
    }
};

const actions = {
    async doRegister(_,data) {
        let result = await reqRegister(data);
        console.log(result.message);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(result.message)
        }
    },
    async doLogin(_,data) {
        let result = await reqLogin(data);
        console.log(result.message);
        if (result.code == 200) {
            console.log(result)
            localStorage.setItem('k1', result.data.token);
            return 'ok'
        } else {
            return Promise.reject(result.message)
        }
    },
    async getUserInfo({ commit }) {
        let result = await reqGetUserInfo();
        if (result.code == 200) {
            console.log(result)
            commit("GETUSERINFO", result.data);
            return 'ok'
        } else {
            return Promise.reject(result.message)
        }
    },
    async doLogout({ commit }) {
        let result = await reqLogout();
        if (result.code == 200) {
            localStorage.removeItem('k1');
            commit('DOLOGOUT');
            return 'ok'
        } else {
            return Promise.reject(result.message)
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