import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import TypeNav from "@/components/TypeNav"
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import '@/mock/mockServer.js'
import 'swiper/css/swiper.css'
Vue.config.productionTip = false
Vue.component('TypeNav', TypeNav);
Vue.component("CarouselComp", Carousel);
Vue.component('PaginationComp', Pagination);
new Vue({
    beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: h => h(App),
  router,
  store

}).$mount('#app')
