import Vue from 'vue'
import Vuex from 'vuex'
import Home from './Home'
import Search from './Search'
import Item from './Item'
import CartList from './CartList'
import User from './User'

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        Home,
        Search,
        Item,
        CartList,
        User
    }
})