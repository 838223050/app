import Vue from 'vue'
import Vuex from 'vuex'
import Home from './home'
import Search from './search'
import Item from './item'

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        Home,
        Search,
        Item
    }
})