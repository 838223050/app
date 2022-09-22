import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import TypeNav from "@/components/TypeNav";
import '@/mock/mockServer.js'
import 'swiper/css/swiper.css'
Vue.config.productionTip = false
Vue.component('TypeNav',TypeNav);
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
