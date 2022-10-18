import { reqLogin, reqRegister, } from "@/api";

const state = {
    token:''
};

const mutations = {
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