//路由配置文件
import Vue from 'vue';
import VueRouter from 'vue-router'
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
Vue.use(VueRouter);
let originPush = VueRouter.prototype.push

let router = new VueRouter({
    //config
    routes: [
        {
            path: '/home',
            component: Home,
            meta:{show:true}
        },
        {
            path: '/search/:keyword?',
            component: Search,
            name: 'search',
            meta:{show:true}
        },
        {
            path: '/login',
            component: Login,
            meta:{show:false}
        },
        {
            path: '/register',
            component: Register,
            meta:{show:false}
        },
        {
            path: '/',
            redirect:'/home'
        }
    ]
})
VueRouter.prototype.push = function (path,resolve,reject) {
    console.log(this);
    if (resolve && reject) {
        originPush.call(this, path,resolve,reject).catch(err=>err);
    } else {
        originPush.call(this, path).catch(err=>err);
    } 
}
export default router